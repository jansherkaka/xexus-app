import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import targetIcon from '../assets/icon-gender-target.png';
import anchorIcon from '../assets/icon-gender-anchor.svg';
import glowIcon from '../assets/icon-gender-glow.svg';
import lockIcon from '../assets/icon-lock.svg';
import './Screens.css';
import './GenderScreen.css';

const MAX_RADIUS = 108;

const DIRECTIONS = {
  female: { x: 0, y: -1 },
  male: { x: 1, y: 0 },
  'non-binary': { x: 0, y: 1 },
  'trans-other': { x: -1, y: 0 },
};

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
    const dist = Math.hypot(dx, dy);
    const scale = dist > MAX_RADIUS ? MAX_RADIUS / dist : 1;
    setPos({ x: dx * scale, y: dy * scale });
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

        {Object.keys(DIRECTIONS).map((id) => (
          <div key={id} className={`gender-target gender-target--${id}${active === id ? ' gender-target--active' : ''}`}>
            <img src={anchorIcon} alt="" />
            <span>{id === 'trans-other' ? 'trans / other' : id}</span>
          </div>
        ))}

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
