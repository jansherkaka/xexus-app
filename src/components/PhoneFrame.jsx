import { useEffect, useRef, useState } from 'react';

const DESIGN_WIDTH = 402;
const DESIGN_HEIGHT = 874;
const FULL_BLEED_QUERY = '(display-mode: standalone), (display-mode: fullscreen), (max-width: 480px)';
const INSTALLED_QUERY = '(display-mode: standalone), (display-mode: fullscreen), (display-mode: minimal-ui)';

function isInstalledApp() {
  const displayModeMatch = window.matchMedia(INSTALLED_QUERY).matches;
  const launchedFromTwa = document.referrer?.startsWith('android-app://');
  const iosStandalone = window.navigator?.standalone === true;
  return Boolean(displayModeMatch || launchedFromTwa || iosStandalone);
}

export default function PhoneFrame({ children }) {
  const outerRef = useRef(null);
  const [box, setBox] = useState({ scaleX: 1, scaleY: 1, bezel: 16, fullBleed: false });

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const fullBleed = window.matchMedia(FULL_BLEED_QUERY).matches;
      if (fullBleed && isInstalledApp()) {
        // Installed app (Android TWA / iOS "Add to Home Screen"): the
        // viewport is stable, so stretch to fill edge-to-edge instead of
        // aspect-fitting, guaranteeing zero black bars even if the device's
        // aspect ratio is slightly off from the design canvas.
        setBox({ scaleX: width / DESIGN_WIDTH, scaleY: height / DESIGN_HEIGHT, bezel: 0, fullBleed: true });
      } else if (fullBleed) {
        // Plain mobile browser tab: scale uniformly (same factor on both
        // axes, so nothing distorts) based on width alone, so the design
        // always fills the screen edge-to-edge horizontally - no side bars.
        const s = width / DESIGN_WIDTH;
        setBox({ scaleX: s, scaleY: s, bezel: 0, fullBleed: true });
      } else {
        const s = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
        setBox({ scaleX: s, scaleY: s, bezel: 16, fullBleed: false });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const mq = window.matchMedia(FULL_BLEED_QUERY);
    mq.addEventListener?.('change', update);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      mq.removeEventListener?.('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="phone-outer" ref={outerRef}>
      <div
        className="phone-bezel"
        style={{
          width: DESIGN_WIDTH * box.scaleX + box.bezel,
          height: DESIGN_HEIGHT * box.scaleY + box.bezel,
        }}
      >
        <div
          className="phone-screen"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${box.scaleX}, ${box.scaleY})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
