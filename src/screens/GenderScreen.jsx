import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-red-small.png';
import arrowBack from '../assets/icon-arrow-back.svg';
import identityIcon from '../assets/icon-identity.png';
import './Screens.css';
import './GenderScreen.css';

const CIRCLE = { cx: 198, cy: 585, r: 160 };

function arcPath({ cx, cy, r }, centerAngleDeg, halfWidthDeg, reverse) {
  const toPoint = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
  };
  const startAngle = centerAngleDeg - halfWidthDeg;
  const endAngle = centerAngleDeg + halfWidthDeg;
  const [x1, y1] = toPoint(reverse ? endAngle : startAngle);
  const [x2, y2] = toPoint(reverse ? startAngle : endAngle);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

const OPTIONS = [
  { id: 'female', label: 'female', centerAngle: -14, halfWidth: 34, reverse: false },
  { id: 'non-binary', label: 'non-binary', centerAngle: 98, halfWidth: 44, reverse: true },
  { id: 'male', label: 'male', centerAngle: 182, halfWidth: 28, reverse: true },
  { id: 'trans-other', label: 'trans/other', centerAngle: -98, halfWidth: 44, reverse: true },
];

export default function GenderScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />

      <div className="gender-topbar">
        <button
          className="gender-back"
          onClick={() => navigate('/join/verify-identity')}
          aria-label="Back"
        >
          <img src={arrowBack} alt="" />
        </button>
        <div className="gender-brand">
          <img src={logo} alt="Xexus" className="gender-brand__logo" />
          <div className="gender-brand__progress">
            <div className="gender-brand__progress-fill" />
          </div>
        </div>
      </div>

      <div className="gender-heading">
        <p className="gender-line gender-line--how">how</p>
        <p className="gender-line gender-line--doyou">do you</p>
        <p className="gender-line gender-line--identify">identify?</p>
      </div>

      <img src={identityIcon} alt="" className="gender-icon" />

      <svg className="gender-svg" viewBox="0 0 402 874">
        <defs>
          {OPTIONS.map((opt) => (
            <path
              key={opt.id}
              id={`gender-arc-${opt.id}`}
              d={arcPath(CIRCLE, opt.centerAngle, opt.halfWidth, opt.reverse)}
              fill="none"
            />
          ))}
        </defs>
        {OPTIONS.map((opt) => (
          <text
            key={opt.id}
            className={`gender-option-text${selected === opt.id ? ' gender-option-text--selected' : ''}`}
            onClick={() => setSelected(opt.id)}
          >
            <textPath href={`#gender-arc-${opt.id}`} startOffset="50%" textAnchor="middle">
              {opt.label}
            </textPath>
          </text>
        ))}
      </svg>

      <HomeIndicator variant="dark" />
    </div>
  );
}
