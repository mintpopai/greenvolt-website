import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, type Connect, type Plugin } from 'vite'

/**
 * 让 dev / preview 下 `/legal` 也能命中 legal.html。
 * 线上由 nginx 的 `try_files $uri $uri.html` 承担同一件事，两处行为保持一致。
 */
function cleanUrls(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const [path, query] = (req.url ?? '').split('?')
    if (path === '/legal' || path === '/legal/') {
      req.url = query ? `/legal.html?${query}` : '/legal.html'
    }
    next()
  }

  return {
    name: 'gv-clean-urls',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  plugins: [vue(), cleanUrls()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 站点全部资源自托管、同源交付，不引用任何外部 CDN
    assetsInlineLimit: 4096,
    rollupOptions: {
      // 多入口：主站 SPA + 独立法务页（/legal 要能直接访问，不是站内锚点）
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        legal: fileURLToPath(new URL('./legal.html', import.meta.url)),
      },
    },
  },
})
