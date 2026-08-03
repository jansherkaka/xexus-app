import { useEffect, useRef, useState } from 'react';

const DESIGN_WIDTH = 402;
const DESIGN_HEIGHT = 874;

export default function PhoneFrame({ children }) {
  const outerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="phone-outer" ref={outerRef}>
      <div
        className="phone-bezel"
        style={{
          width: DESIGN_WIDTH * scale + 16,
          height: DESIGN_HEIGHT * scale + 16,
        }}
      >
        <div
          className="phone-screen"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
