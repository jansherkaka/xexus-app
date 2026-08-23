import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import BottomNav from '../components/BottomNav';
import onlineDot from '../assets/icon-online-dot.svg';
import iconX from '../assets/icon-x.svg';
import iconHeart from '../assets/icon-heart.svg';
import iconPin from '../assets/icon-pin.svg';
import discovery1 from '../assets/discovery-1-unholyhours.jpg';
import discovery2 from '../assets/discovery-2-playdirty.jpg';
import discovery3 from '../assets/discovery-3-comeovr.jpg';
import discovery4 from '../assets/discovery-4-unholyhours.jpg';
import './Screens.css';
import './DiscoveryScreen.css';

const PROFILES = [
  {
    name: 'DOMEBOY',
    age: 27,
    height: '6’1',
    distance: '4 miles away',
    bio: 'who’s on what',
    tags: ['something casual', 'straight', 'partying'],
    photo: discovery1,
  },
  {
    name: 'UNHOLYHOURS',
    age: 28,
    height: '5’9',
    distance: '2 miles away',
    bio: 'a gracious receiver',
    tags: ['something casual', 'queer', 'hosting tonight'],
    photo: discovery2,
  },
  {
    name: 'BAREEEBONES',
    age: 22,
    height: '5’5',
    distance: '1 miles away',
    bio: 'take care of me',
    tags: ['netflix and chill', 'bi', 'invite me over'],
    photo: discovery3,
  },
  {
    name: 'QUIETONTHECREK',
    age: 19,
    height: '5’8',
    distance: '2 miles away',
    bio: 'i come with friends',
    tags: ['a wild time', 'queer', 'teach me'],
    photo: discovery4,
  },
];

const N = PROFILES.length;
const SLOT = {
  0: { top: 197, height: 526, opacity: 1 },
  '-1': { top: 122, height: 68, opacity: 1 },
  1: { top: 731, height: 68, opacity: 1 },
  '-2': { top: 38, height: 68, opacity: 0 },
  2: { top: 815, height: 68, opacity: 0 },
};

function shortestOffset(i, active) {
  let offset = i - active;
  if (offset > N / 2) offset -= N;
  if (offset < -N / 2) offset += N;
  return offset;
}

export default function DiscoveryScreen() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const lockRef = useRef(false);
  const touchStartY = useRef(null);

  const step = useCallback((dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setActiveIndex((prev) => (prev + dir + N) % N);
    setTimeout(() => {
      lockRef.current = false;
    }, 480);
  }, []);

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) < 12) return;
    step(e.deltaY > 0 ? 1 : -1);
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current == null) return;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 30) step(dy > 0 ? 1 : -1);
    touchStartY.current = null;
  };

  const active = PROFILES[activeIndex];

  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', showHomeIndicator: false });

  return (
    <div className="screen screen--white discovery-screen">
      <div
        className="discovery-stack anim-fade-scale anim-d1"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {PROFILES.map((p, i) => {
          const offset = shortestOffset(i, activeIndex);
          const slot = SLOT[offset] ?? SLOT[offset > 0 ? 2 : -2];
          const isActive = offset === 0;
          return (
            <div
              key={`${p.name}-${i}`}
              className={`discovery-card${isActive ? ' discovery-card--active' : ' discovery-card--peek'}`}
              style={{ top: slot.top, height: slot.height, opacity: slot.opacity }}
            >
              <img src={p.photo} alt="" className="discovery-card__photo" />
              <div className="discovery-card__overlay" style={{ opacity: isActive ? 1 : 0 }}>
                <div className="discovery-card__info">
                  <div className="discovery-card__row">
                    <p className="discovery-card__name">
                      <span className="discovery-card__name-bold">{p.name},</span> {p.age} - {p.height}
                    </p>
                    <p className="discovery-card__distance">{p.distance}</p>
                  </div>
                  <div className="discovery-card__online">
                    <span>Online</span>
                    <img src={onlineDot} alt="" />
                  </div>
                </div>
                <div className="discovery-card__bio">
                  <p className="discovery-card__bio-text">{p.bio}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {active.tags.map((tag, idx) => (
        <div key={idx} className={`discovery-tag discovery-tag--${idx + 1} anim-fade-up anim-d${idx + 3}`}>
          {tag}
        </div>
      ))}

      <button
        className="discovery-action discovery-action--dislike anim-fade-scale anim-d6"
        aria-label="Pass"
        onClick={() => step(1)}
      >
        <img src={iconX} alt="" />
      </button>
      <button
        className="discovery-action discovery-action--like anim-fade-scale anim-d7"
        aria-label="Like"
        onClick={() => step(1)}
      >
        <img src={iconHeart} alt="" />
      </button>
      <button
        className="discovery-action discovery-action--superlike anim-fade-scale anim-d8"
        aria-label="Open LiveLustMap"
        onClick={() => navigate('/join/map')}
      >
        <img src={iconPin} alt="" />
      </button>

      <BottomNav className="discovery-bottom-nav anim-fade-up" style={{ animationDelay: '1.4s' }} />
    </div>
  );
}
