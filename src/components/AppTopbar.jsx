import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/xexus-logo-red-small.png';
import arrowBack from '../assets/icon-arrow-back.svg';
import './AppTopbar.css';

// One persistent header rendered outside the sliding route-transition
// layers, so it never duplicates/ghosts when a screen slides in over the
// previous one. Screens no longer render their own logo/progress/back
// button - this reads per-route config instead.
const TOPBAR_CONFIG = {
  '/join': { back: '/', progress: 17.4 },
  '/join/age-gate': { back: '/join', progress: 27.2 },
  '/join/birthday': { back: '/join/age-gate', progress: 39.9 },
  '/join/gender': { back: '/join/live-selfie', progress: 57 },
  '/join/name': { back: '/join/gender', progress: 74 },
  '/join/photos': { back: null, progress: 88.6 },
  '/join/get-active': { back: '/join/photos', progress: 68 },
  '/join/discover': { back: '/join/get-active', progress: null },
  '/join/map': { back: '/join/discover', progress: null },
};

export default function AppTopbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = TOPBAR_CONFIG[location.pathname];

  if (!config) return null;

  return (
    <div className="app-topbar">
      {config.back && (
        <button className="app-topbar__back" onClick={() => navigate(config.back)} aria-label="Back">
          <img src={arrowBack} alt="" />
        </button>
      )}
      <div className="app-topbar__brand">
        <img src={logo} alt="Xexus" className="app-topbar__logo" />
        {config.progress != null && (
          <div className="app-topbar__progress">
            <div className="app-topbar__progress-fill" style={{ width: `${config.progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
