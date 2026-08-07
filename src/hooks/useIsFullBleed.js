import { useEffect, useState } from 'react';

const QUERY = '(display-mode: standalone), (display-mode: fullscreen), (max-width: 480px)';

function detect() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.(QUERY).matches ?? false;
}

// True whenever the phone frame is rendered edge-to-edge as the real
// device screen — installed app OR a plain mobile browser tab — as
// opposed to the bezeled desktop preview mockup. Used to hide the fake
// StatusBar/HomeIndicator design elements (the real device's own status
// bar and home indicator are already visible in both of those cases) and
// to pick the phone-frame scaling strategy.
export default function useIsFullBleed() {
  const [isFullBleed, setIsFullBleed] = useState(detect);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const handler = () => setIsFullBleed(detect());
    mq.addEventListener?.('change', handler);
    window.addEventListener('resize', handler);
    return () => {
      mq.removeEventListener?.('change', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  return isFullBleed;
}
