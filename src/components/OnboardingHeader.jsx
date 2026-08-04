import logo from '../assets/xexus-logo-red-small.png';
import './OnboardingHeader.css';

const TOTAL_STEPS = 7;

export default function OnboardingHeader({ step, onBack }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="ob-header">
      {onBack && (
        <button className="ob-header__back" onClick={onBack} aria-label="Back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L11 6M5 12L11 18"
              stroke="#19191A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <div className="ob-header__brand">
        <img src={logo} alt="Xexus" className="ob-header__logo" />
        <div className="ob-header__progress">
          <div className="ob-header__progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
