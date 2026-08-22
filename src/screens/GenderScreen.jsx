import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import targetIcon from '../assets/icon-gender-target.png';
import anchorIcon from '../assets/icon-gender-anchor.svg';
import glowIcon from '../assets/icon-gender-glow.svg';
import lockIcon from '../assets/icon-lock.svg';
import './Screens.css';
import './GenderScreen.css';

const MAX_RADIUS = 95;

function nearestDirection(x, y) {
  if (x === 0 && y === 0) return null;
  return Math.abs(y) >= Math.abs(x) ? (y < 0 ? 'female' : 'non-binary') : x > 0 ? 'male' : 'trans-other';
}

export default function GenderScreen() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  const updateFromPointer = (clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    const clamp = (v) => Math.max(-MAX_RADIUS, Math.min(MAX_RADIUS, v));
    // Constrain to whichever single axis the drag leans toward, instead of
    // free 2D movement - the marker only ever travels along the horizontal
    // or vertical crosshair, snapping between the two as the drag angle
    // crosses the diagonal.
    if (Math.abs(dx) >= Math.abs(dy)) {
      setPos({ x: clamp(dx), y: 0 });
    } else {
      setPos({ x: 0, y: clamp(dy) });
    }
  };

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const active = nearestDirection(pos.x, pos.y);

  return (
    <div className="screen screen--white">
      <div className="gender-heading">
        <p className="gender-line gender-line--how anim-fade-up anim-d1">how</p>
        <p className="gender-line gender-line--doyou anim-fade-up anim-d2">do you</p>
        <p className="gender-line gender-line--identify anim-fade-up anim-d3">identify?</p>
      </div>

      <p className="gender-instructions anim-fade-up anim-d4">
        drag the icon to the area that feels right for <span>you</span>
      </p>

      <div className="gender-axis" ref={containerRef}>
        <div className="gender-axis__dots" />
        <div className="gender-axis__line gender-axis__line--v" />
        <div className="gender-axis__line gender-axis__line--h" />

        <div className={`gender-target gender-target--female${active === 'female' ? ' gender-target--active' : ''}`}>
          <span>female</span>
          <img src={anchorIcon} alt="" />
        </div>
        <div className={`gender-target gender-target--non-binary${active === 'non-binary' ? ' gender-target--active' : ''}`}>
          <img src={anchorIcon} alt="" />
          <span>non-binary</span>
        </div>
        <div className={`gender-target gender-target--trans-other${active === 'trans-other' ? ' gender-target--active' : ''}`}>
          <span>trans / other</span>
          <img src={anchorIcon} alt="" />
        </div>
        <div className={`gender-target gender-target--male${active === 'male' ? ' gender-target--active' : ''}`}>
          <img src={anchorIcon} alt="" />
          <span>male</span>
        </div>

        <img src={glowIcon} alt="" className="gender-glow" />
        <button
          type="button"
          className="gender-marker"
          style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Drag to select"
        >
          <img src={targetIcon} alt="" draggable={false} />
        </button>
      </div>

      <div className="gender-privacy anim-fade-up anim-d5">
        <span className="gender-privacy__icon">
          <img src={lockIcon} alt="" />
        </span>
        <div className="gender-privacy__text">
          <p className="gender-privacy__title">this is private</p>
          <p className="gender-privacy__body">your answer is only visible to you</p>
        </div>
      </div>

      <div className="gender-cta-wrap anim-fade-up anim-d6">
        <button className="gender-cta" onClick={() => navigate('/join/set-tone')}>
          continue
        </button>
      </div>
    </div>
  );
}
