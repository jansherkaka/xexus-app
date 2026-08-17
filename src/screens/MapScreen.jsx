import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import BottomNav from '../components/BottomNav';
import mapBg from '../assets/map-bg.jpg';
import fadeTop from '../assets/top.png';
import fadeBottom from '../assets/bottom.png';
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
  useDeviceChrome({ statusBarVariant: 'light', statusBarBg: '#2f3133', showHomeIndicator: false });

  return (
    <div className="screen screen--dark map-screen">
      <img src={mapBg} alt="" className="map-bg anim-fade-scale" />
      <div className="map-tint" />
      <img src={fadeTop} alt="" className="map-fade map-fade--top anim-fade" />

      {PINS.map((pin, i) => (
        <div
          key={pin.id}
          className="map-pin anim-pop-in"
          style={{ left: pin.left, top: pin.top, animationDelay: `${0.3 + i * 0.12}s` }}
        >
          <div className="map-pin__glow map-pin__glow--pulse" style={{ background: pin.glow }} />
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

      <div
        className="map-pin map-pin--you anim-pop-in"
        style={{ left: 261, top: 507, animationDelay: '0.78s' }}
      >
        <div className="map-pin__glow map-pin__glow--pulse" style={{ background: '#c5f9a3' }} />
        <div className="map-pin__you-avatar">
          <img src={avatarYou} alt="" />
        </div>
        <div className="map-pin__label">
          <span>you</span>
          <img src={dotGreen} alt="" />
        </div>
      </div>

      <img src={fadeBottom} alt="" className="map-fade map-fade--bottom anim-fade" />

      <div className="map-toggle anim-fade-scale" style={{ animationDelay: '0.5s' }}>
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

      <BottomNav
        className="map-bottom-nav anim-fade-up"
        style={{ animationDelay: '0.6s' }}
        onChat={() => navigate('/join/discover')}
      />
    </div>
  );
}
