import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

import ffmpegPath from 'ffmpeg-static'
import { chromium } from 'playwright'

const ROOT = process.cwd()
const EXPORT_DIR = path.join(ROOT, 'exports')

/**
 * Exporte une animation en GIF.
 *
 * Pipeline :
 * 1) `npm run build`
 * 2) démarre un serveur `npm run preview`
 * 3) Playwright (Chromium) enregistre une vidéo de la page
 * 4) ffmpeg convertit la vidéo en GIF (palettegen/paletteuse pour meilleure qualité)
 *
 * Variables d'environnement :
 * - `GIF_PORT` (défaut 4173)
 * - `GIF_SECONDS` (défaut 6)
 * - `GIF_FPS` (défaut 20)
 * - `GIF_WIDTH` (défaut 960)
 */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function run(command, args, { cwd = ROOT, shell } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      // On Windows we typically need a shell for `npm` (npm.cmd), but for tools
      // like ffmpeg we must avoid the shell because it will treat ';' as a
      // command separator and break complex filter args.
      shell: shell ?? process.platform === 'win32',
    })

    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`))
    })
  })
}

function spawnPreview({ port }) {
  const cmd = 'npm'
  const args = ['run', 'preview', '--', '--port', String(port), '--strictPort']
  const child = spawn(cmd, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  return child
}

async function killProcessTree(child) {
  if (!child?.pid) return

  if (process.platform === 'win32') {
    await run('taskkill', ['/pid', String(child.pid), '/t', '/f'])
    return
  }

  child.kill('SIGTERM')
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

async function waitForServer(url, { timeoutMs = 20000 } = {}) {
  const start = Date.now()

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await fetch(url, { method: 'GET' })
      if (res.ok) return
    } catch {
      // ignore
    }

    if (Date.now() - start > timeoutMs) {
      throw new Error(`Server did not become ready within ${timeoutMs}ms: ${url}`)
    }

    await sleep(500)
  }
}

async function main() {
  const port = Number(process.env.GIF_PORT ?? 4173)
  const seconds = Number(process.env.GIF_SECONDS ?? 6)
  const fps = Number(process.env.GIF_FPS ?? 20)
  const width = Number(process.env.GIF_WIDTH ?? 960)

  ensureDir(EXPORT_DIR)

  console.log('[export:gif] Building…')
  await run('npm', ['run', 'build'])

  console.log('[export:gif] Starting preview server…')
  const preview = spawnPreview({ port })

  const url = `http://localhost:${port}/`
  try {
    await waitForServer(url)

    console.log('[export:gif] Capturing video…')
    const browser = await chromium.launch()

    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: EXPORT_DIR,
        size: { width: 1280, height: 720 },
      },
    })

    const page = await context.newPage()
    await page.goto(url, { waitUntil: 'networkidle' })

    // Let initial animations settle a bit
    await sleep(1000)
    await sleep(seconds * 1000)

    const video = page.video()

    await page.close()
    await context.close()
    await browser.close()

    const videoPath = video ? await video.path() : null
    if (!videoPath) throw new Error('Playwright did not produce a video file')

    const outGif = path.join(EXPORT_DIR, 'animation.gif')

    if (!ffmpegPath) {
      throw new Error('ffmpeg-static did not provide a binary path')
    }

    console.log('[export:gif] Converting to GIF…')

    // Palette-based conversion for better quality
    const vf = `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5`

    await run(
      ffmpegPath,
      [
      '-y',
      '-i',
      videoPath,
      '-vf',
      vf,
      '-loop',
      '0',
      outGif,
      ],
      { shell: false }
    )

    console.log(`[export:gif] Done: ${outGif}`)
  } finally {
    console.log('[export:gif] Stopping preview server…')
    await killProcessTree(preview)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
