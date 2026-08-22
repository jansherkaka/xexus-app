import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/xexus-logo-white.png';
import iconSliders from '../assets/icon-sliders.svg';
import iconBell from '../assets/icon-bell.svg';
import iconNotifDot from '../assets/icon-notif-dot.svg';
import './ExploreTopBar.css';

// Shared chrome for the two post-onboarding "explore" screens (discover,
// lust map): filter/notification buttons plus the map<->discover segmented
// switch. Rendered once, outside the sliding route-transition layers, for
// the same reason AppTopbar is - so it doesn't ghost/duplicate mid-slide
// when switching between the two screens.
const ROUTES = { map: '/join/map', discover: '/join/discover' };

export default function ExploreTopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMap = location.pathname === ROUTES.map;
  const isDiscover = location.pathname === ROUTES.discover;

  if (!isMap && !isDiscover) return null;

  const active = isMap ? 'map' : 'discover';

  return (
    <div className="explore-topbar">
      <div className="explore-topbar__actions">
        <button className="explore-topbar__icon-btn" aria-label="Filters" onClick={() => navigate('/join/filters')}>
          <img src={iconSliders} alt="" />
        </button>
        <button className="explore-topbar__icon-btn" aria-label="Notifications">
          <img src={iconBell} alt="" />
          <img src={iconNotifDot} alt="" className="explore-topbar__notif-dot" />
        </button>
      </div>
      <img src={logo} alt="Xexus" className="explore-topbar__logo" />
      <div className="explore-topbar__segment">
        <button
          className={`explore-topbar__segment-btn${active === 'map' ? ' explore-topbar__segment-btn--active' : ''}`}
          onClick={() => navigate(ROUTES.map)}
        >
          lust map
        </button>
        <button
          className={`explore-topbar__segment-btn${active === 'discover' ? ' explore-topbar__segment-btn--active' : ''}`}
          onClick={() => navigate(ROUTES.discover)}
        >
          discover
        </button>
      </div>
    </div>
  );
}
