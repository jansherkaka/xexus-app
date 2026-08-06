import { useEffect, useState } from 'react';

function detect() {
  if (typeof window === 'undefined') return false;
  const displayModeMatch =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.matchMedia?.('(display-mode: fullscreen)').matches ||
    window.matchMedia?.('(display-mode: minimal-ui)').matches;
  const launchedFromTwa = document.referrer?.startsWith('android-app://');
  const iosStandalone = window.navigator?.standalone === true;
  return Boolean(displayModeMatch || launchedFromTwa || iosStandalone);
}

// True when the app is running installed (Android TWA / PWA standalone /
// iOS "Add to Home Screen"), as opposed to inside a regular browser tab.
// Used to hide the fake StatusBar/HomeIndicator design elements so the
// device's own real status bar and home indicator show instead.
export default function useIsInstalledApp() {
  const [isInstalled, setIsInstalled] = useState(detect);

  useEffect(() => {
    const mq = window.matchMedia('(display-mode: standalone)');
    const handler = () => setIsInstalled(detect());
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return isInstalled;
}
