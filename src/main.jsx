import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

// As soon as a new deploy is detected, activate it and reload — so opening
// the link always shows the latest version instead of a stale cached one.
//
// Browsers only auto-check a registered service worker for updates on
// navigation, throttled to roughly once per 24h — so a tab left open (or
// even a plain reload, not a hard reload) across a deploy can miss the new
// version entirely. Poll the sw.js file directly on an interval so an
// already-open tab picks up a new deploy on its own within a minute,
// without needing any reload at all.
const UPDATE_CHECK_INTERVAL = 60 * 1000

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true)
  },
  onRegisteredSW(swUrl, registration) {
    if (!registration) return
    registration.update()
    setInterval(async () => {
      if (registration.installing || !navigator.onLine) return
      const resp = await fetch(swUrl, { cache: 'no-store' })
      if (resp.status === 200) registration.update()
    }, UPDATE_CHECK_INTERVAL)
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
