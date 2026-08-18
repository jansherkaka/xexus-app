import { useEffect, useRef, useState } from 'react';
import { useDeviceChromeContext } from '../context/DeviceChromeContext';

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
  const { chrome } = useDeviceChromeContext();

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
        // Plain mobile browser tab: the visible viewport height wobbles as
        // Safari/Chrome show and hide their address bar, so stretching to
        // fill exactly would visibly distort the UI, and cover-fitting would
        // crop real UI (status bar, back button, bottom CTA) off the edges.
        // Scale uniformly to fit the whole design inside the viewport
        // instead — no distortion, nothing cropped, at most a thin bar of
        // the page background on one axis.
        const s = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
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

  // On a real mobile browser tab, the design canvas is scaled uniformly (not
  // stretched) to avoid distorting content, which can leave a sliver of
  // empty space on one axis when the device's aspect ratio doesn't exactly
  // match the design's. phone-outer already spans the full viewport there,
  // so coloring it with the current screen's own background (instead of
  // leaving the page's black showing through) fills that sliver without an
  // extra overlay element - content itself stays untouched.
  const outerStyle = box.fullBleed ? { background: chrome.statusBarBg } : undefined;

  // The desktop demo bezel (border, shadow, padding) only exists to look
  // like a physical phone mockup - on a real device it's fully invisible
  // (background: transparent, no padding/border/shadow), so it's dropped
  // from the DOM entirely rather than kept around as an empty wrapper.
  // Scaling from the center (instead of top-left, which the bezel case
  // relies on to line up with its precisely-sized box) keeps the visual
  // result centered when phone-screen is flex-centered directly.
  const screen = (
    <div
      className="phone-screen"
      style={{
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        transform: `scale(${box.scaleX}, ${box.scaleY})`,
        transformOrigin: box.fullBleed ? 'center' : 'top left',
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="phone-outer" ref={outerRef} style={outerStyle}>
      {box.fullBleed ? (
        screen
      ) : (
        <div
          className="phone-bezel"
          style={{
            width: DESIGN_WIDTH * box.scaleX + box.bezel,
            height: DESIGN_HEIGHT * box.scaleY + box.bezel,
          }}
        >
          {screen}
        </div>
      )}
    </div>
  );
}
