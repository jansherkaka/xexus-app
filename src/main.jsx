import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

// As soon as a new deploy is detected, activate it and reload — so opening
// the link always shows the latest version instead of a stale cached one.
const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true)
  },
  onRegisteredSW(_url, registration) {
    registration?.update()
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
