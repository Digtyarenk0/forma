import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const plugins = [
  [
    react({
      plugins: [
        [
          '@lingui/swc-plugin',
          {
            runtimeModules: {
              i18n: ['@lingui/core', 'i18n'],
              trans: ['@lingui/react', 'Trans']
            }
          }
        ]
      ]
    }),
    lingui(),
    svgr(),
    tsconfigPaths(),
    analyzer({
      openAnalyzer: false, // for CI/CD,
      analyzerMode: 'static', // generate statice repost file
      fileName: 'bundle-report'
    })
  ]
]

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig(() => {
  return {
    base: '/',
    server: {
      port: 5173
    },
    plugins,
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or 'modern'
        }
      }
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: '.vitest/setup',
      include: ['**/test.{ts,tsx}']
    }
  }
})
