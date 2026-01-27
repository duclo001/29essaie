import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

import ffmpegPath from 'ffmpeg-static'
import { chromium } from 'playwright'

const ROOT = process.cwd()
const EXPORT_DIR = path.join(ROOT, 'exports')

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function run(command, args, { cwd = ROOT, shell } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
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
  const port = Number(process.env.MP4_PORT ?? 4173)
  const seconds = Number(process.env.MP4_SECONDS ?? 6)
  const width = Number(process.env.MP4_WIDTH ?? 960)
  const crf = Number(process.env.MP4_CRF ?? 23)

  ensureDir(EXPORT_DIR)

  console.log('[export:mp4] Building…')
  await run('npm', ['run', 'build'])

  console.log('[export:mp4] Starting preview server…')
  const preview = spawnPreview({ port })

  const url = `http://localhost:${port}/`
  try {
    await waitForServer(url)

    console.log('[export:mp4] Capturing video…')
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

    await sleep(1000)
    await sleep(seconds * 1000)

    const video = page.video()

    await page.close()
    await context.close()
    await browser.close()

    const videoPath = video ? await video.path() : null
    if (!videoPath) throw new Error('Playwright did not produce a video file')

    if (!ffmpegPath) {
      throw new Error('ffmpeg-static did not provide a binary path')
    }

    const outMp4 = path.join(EXPORT_DIR, 'animation.mp4')

    console.log('[export:mp4] Converting to MP4…')

    // WhatsApp-friendly MP4: H.264 + yuv420p + faststart
    await run(
      ffmpegPath,
      [
        '-y',
        '-i',
        videoPath,
        '-an',
        '-vf',
        `scale=${width}:-2:flags=lanczos`,
        '-c:v',
        'libx264',
        '-preset',
        'veryfast',
        '-crf',
        String(crf),
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        outMp4,
      ],
      { shell: false }
    )

    console.log(`[export:mp4] Done: ${outMp4}`)
  } finally {
    console.log('[export:mp4] Stopping preview server…')
    await killProcessTree(preview)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
