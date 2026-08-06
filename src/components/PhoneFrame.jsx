import { useEffect, useRef, useState } from 'react';

const DESIGN_WIDTH = 402;
const DESIGN_HEIGHT = 874;
const FULL_BLEED_QUERY = '(display-mode: standalone), (display-mode: fullscreen), (max-width: 480px)';

export default function PhoneFrame({ children }) {
  const outerRef = useRef(null);
  const [box, setBox] = useState({ scaleX: 1, scaleY: 1, bezel: 16, fullBleed: false });

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const fullBleed = window.matchMedia(FULL_BLEED_QUERY).matches;
      if (fullBleed) {
        // On a real device (installed app or any narrow/touch viewport) the
        // device itself is the frame — stretch to fill edge-to-edge instead
        // of aspect-fitting, so slightly-off aspect ratios never letterbox
        // into visible bars on the sides or top/bottom.
        setBox({ scaleX: width / DESIGN_WIDTH, scaleY: height / DESIGN_HEIGHT, bezel: 0, fullBleed: true });
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
    return () => {
      ro.disconnect();
      mq.removeEventListener?.('change', update);
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
