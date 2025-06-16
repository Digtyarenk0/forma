import 'tailwindcss/tailwind.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { store } from '@/app/store'
import { LanguageProvider } from '@/features/i18n'

import App from './App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </LanguageProvider>
    </Provider>
  </StrictMode>
)
