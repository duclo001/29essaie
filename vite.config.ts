import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetFallback(): Plugin {
  const prefix = 'figma:asset/'

  return {
    name: 'figma-asset-fallback',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith(prefix)) return id
      return null
    },
    load(id) {
      if (!id.startsWith(prefix)) return null

      const assetId = id.slice(prefix.length)
      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#111827"/>
  <rect x="60" y="60" width="680" height="480" rx="24" fill="#1f2937" stroke="#374151"/>
  <text x="400" y="290" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="22" fill="#e5e7eb">Figma asset not available locally</text>
  <text x="400" y="330" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="14" fill="#9ca3af">${assetId}</text>
</svg>`

      const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`
      return `export default ${JSON.stringify(dataUrl)};`
    },
  }
}

export default defineConfig(({ mode }) => ({
  // Needed for GitHub Pages project sites: https://<user>.github.io/<repo>/
  base: mode === 'production' ? '/29essaie/' : '/',
  plugins: [
    figmaAssetFallback(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
