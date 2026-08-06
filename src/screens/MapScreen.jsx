import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import logo from '../assets/xexus-logo-red-small.png';
import arrowBack from '../assets/icon-arrow-back.svg';
import mapBg from '../assets/map-bg.jpg';
import bottomNav from '../assets/icon-bottom-nav.svg';
import iconSquiggle from '../assets/map-icon-camera-asset.png';
import dotYellow from '../assets/icon-dot-yellow.svg';
import dotGreen from '../assets/icon-dot-green.svg';
import avatarDtf from '../assets/map-avatar-dtf.png';
import avatarWys from '../assets/map-avatar-wys-2.png';
import avatarWildgyal from '../assets/map-avatar-wildgyal.png';
import avatarYou from '../assets/map-avatar-you.png';
import avatarComeovr from '../assets/map-avatar-comeovr.png';
import './Screens.css';
import './MapScreen.css';

const PINS = [
  {
    id: 'dtf',
    left: 141,
    top: 215,
    glow: '#f8e266',
    label: 'DTF',
    dot: dotGreen,
    avatar: avatarDtf,
    emoji: '🍸',
  },
  {
    id: 'wys',
    left: 38,
    top: 378,
    glow: '#f8e266',
    label: 'Wys?',
    dot: dotGreen,
    avatar: avatarWys,
    emoji: '🖤',
  },
  {
    id: 'wildgyal',
    left: 201,
    top: 344,
    glow: 'rgba(173,12,82,0.9)',
    label: 'WILDGYAL',
    dot: dotYellow,
    avatar: avatarWildgyal,
    icon: iconSquiggle,
  },
  {
    id: 'comeovr',
    left: 223,
    top: 704,
    glow: 'rgba(173,12,82,0.9)',
    label: 'COMEOVR',
    dot: dotYellow,
    avatar: avatarComeovr,
    emoji: '🦶🏾',
  },
];

export default function MapScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--dark map-screen">
      <img src={mapBg} alt="" className="map-bg" />
      <div className="map-tint" />
      <div className="map-fade map-fade--top" />

      {PINS.map((pin) => (
        <div key={pin.id} className="map-pin" style={{ left: pin.left, top: pin.top }}>
          <div className="map-pin__glow" style={{ background: pin.glow }} />
          <div className="map-pin__badge">
            <img src={pin.avatar} alt="" className="map-pin__avatar" />
            {pin.icon ? (
              <img src={pin.icon} alt="" className="map-pin__icon" />
            ) : (
              <span className="map-pin__emoji">{pin.emoji}</span>
            )}
          </div>
          <div className="map-pin__label">
            <span>{pin.label}</span>
            <img src={pin.dot} alt="" />
          </div>
        </div>
      ))}

      <div className="map-pin map-pin--you" style={{ left: 261, top: 507 }}>
        <div className="map-pin__glow" style={{ background: '#c5f9a3' }} />
        <div className="map-pin__you-avatar">
          <img src={avatarYou} alt="" />
        </div>
        <div className="map-pin__label">
          <span>you</span>
          <img src={dotGreen} alt="" />
        </div>
      </div>

      <div className="map-fade map-fade--bottom" />

      <StatusBar variant="light" />

      <div className="map-topbar">
        <button className="map-back" onClick={() => navigate('/join/discover')} aria-label="Back">
          <img src={arrowBack} alt="" />
        </button>
        <div className="map-brand">
          <img src={logo} alt="Xexus" className="map-brand__logo" />
        </div>
      </div>

      <div className="map-toggle">
        <button className="map-toggle__btn map-toggle__btn--top" aria-label="Photos">
          <img src={iconSquiggle} alt="" />
        </button>
        <button className="map-toggle__btn map-toggle__btn--mid" aria-label="Serious">
          🖤
        </button>
        <button className="map-toggle__btn map-toggle__btn--bottom" aria-label="Casual">
          🍸
        </button>
      </div>

      <img src={bottomNav} alt="" className="map-bottom-nav" />
    </div>
  );
}
