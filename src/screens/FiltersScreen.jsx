import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import iconXCircle from '../assets/icon-x-circle.svg';
import iconMars from '../assets/icon-mars.svg';
import iconUserRound from '../assets/icon-user-round.svg';
import iconUsers from '../assets/icon-users.svg';
import iconTransgender from '../assets/icon-transgender.svg';
import iconInfinity from '../assets/icon-infinity.svg';
import iconUsersActive from '../assets/icon-users-active.svg';
import iconChevronDown from '../assets/icon-chevron-down.svg';
import iconGhost from '../assets/icon-ghost.svg';
import iconTarget from '../assets/icon-target-outline.svg';
import iconChevronRight from '../assets/icon-chevron-right-small.svg';
import iconPalette from '../assets/icon-palette.svg';
import iconSwitchOn from '../assets/icon-switch-on.svg';
import iconSwitchOff from '../assets/icon-switch-off.svg';
import './Screens.css';
import './FiltersScreen.css';

const LOOKING_FOR = [
  { id: 'men', label: 'men', icon: iconMars },
  { id: 'women', label: 'women', icon: iconUserRound },
  { id: 'couples', label: 'couples', icon: iconUsers },
  { id: 'trans', label: 'trans', icon: iconTransgender },
  { id: 'non-binary', label: 'non-binary', icon: iconInfinity },
  { id: 'everyone', label: 'everyone', icon: iconUsersActive },
];

const INTO_TAGS = ['casual', 'hosting', 'travelling', 'kink', 'queer', 'poly', 'open', 'other'];

function RangeSlider({ min, max, valueMin, valueMax, onChangeMin, onChangeMax }) {
  const pct = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div className="filters-range-row">
      <span className="filters-range-value">{valueMin}</span>
      <div className="filters-range-track">
        <div className="filters-range-track-bg" />
        <div
          className="filters-range-track-active"
          style={{ left: `${pct(valueMin)}%`, right: `${100 - pct(valueMax)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueMin}
          onChange={(e) => onChangeMin(Math.min(Number(e.target.value), valueMax - 1))}
          className="filters-range-input"
          aria-label="Minimum"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueMax}
          onChange={(e) => onChangeMax(Math.max(Number(e.target.value), valueMin + 1))}
          className="filters-range-input"
          aria-label="Maximum"
        />
      </div>
      <span className="filters-range-value filters-range-value--right">{valueMax}</span>
    </div>
  );
}

export default function FiltersScreen() {
  const navigate = useNavigate();
  const [lookingFor, setLookingFor] = useState(['everyone']);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(45);
  const [distMin, setDistMin] = useState(2);
  const [distMax, setDistMax] = useState(20);
  const [into, setInto] = useState(['casual']);
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [shadowMode, setShadowMode] = useState(false);

  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  const toggleInto = (tag) => {
    setInto((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // "everyone" is exclusive - picking it clears any specific selections, and
  // picking a specific one drops "everyone" so multiple specific options can
  // stack instead.
  const toggleLookingFor = (id) => {
    setLookingFor((prev) => {
      if (id === 'everyone') return ['everyone'];
      const specific = prev.filter((v) => v !== 'everyone');
      return specific.includes(id) ? specific.filter((v) => v !== id) : [...specific, id];
    });
  };

  return (
    <div className="screen screen--white filters-screen">
      <div className="filters-scroll">
        <div className="filters-header">
          <p className="filters-heading">filters</p>
          <button className="filters-close" aria-label="Close" onClick={() => navigate(-1)}>
            <img src={iconXCircle} alt="" />
          </button>
        </div>

        <div className="filters-body">
          <div className="filters-section">
            <p className="filters-section__title">who are you looking for?</p>
            <div className="filters-lookingfor-grid">
              {LOOKING_FOR.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`filters-lookingfor${lookingFor.includes(opt.id) ? ' filters-lookingfor--selected' : ''}`}
                  onClick={() => toggleLookingFor(opt.id)}
                >
                  <img src={opt.icon} alt="" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filters-section">
            <p className="filters-section__title filters-section__title--row">age range</p>
            <RangeSlider min={18} max={60} valueMin={ageMin} valueMax={ageMax} onChangeMin={setAgeMin} onChangeMax={setAgeMax} />
          </div>

          <div className="filters-section">
            <p className="filters-section__title filters-section__title--row">distance / miles</p>
            <RangeSlider min={0} max={50} valueMin={distMin} valueMax={distMax} onChangeMin={setDistMin} onChangeMax={setDistMax} />
          </div>

          <div className="filters-section">
            <p className="filters-section__title">what are you into?</p>
            <div className="filters-tags">
              {INTO_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`filters-tag${into.includes(tag) ? ' filters-tag--selected' : ''}`}
                  onClick={() => toggleInto(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-divider" />

          <div className="filters-section">
            <button className="filters-advanced-header" onClick={() => setAdvancedOpen((v) => !v)}>
              <span className="filters-advanced-title">
                advanced
                <span className="filters-plus-badge">xexus+</span>
              </span>
              <img
                src={iconChevronDown}
                alt=""
                className="filters-chevron-down"
                style={{ transform: advancedOpen ? 'rotate(180deg)' : 'none' }}
              />
            </button>

            {advancedOpen && (
              <div className="filters-advanced-list">
                <div className="filters-advanced-row">
                  <span className="filters-advanced-icon">
                    <img src={iconGhost} alt="" />
                  </span>
                  <div className="filters-advanced-text">
                    <p className="filters-advanced-text__title">shadow / incognito mode</p>
                    <p className="filters-advanced-text__body">browse without appearing on the map</p>
                  </div>
                  <button className="filters-advanced-switch" onClick={() => setShadowMode((v) => !v)}>
                    <img src={shadowMode ? iconSwitchOn : iconSwitchOff} alt="" />
                  </button>
                </div>
                <div className="filters-advanced-row">
                  <span className="filters-advanced-icon">
                    <img src={iconTarget} alt="" />
                  </span>
                  <div className="filters-advanced-text">
                    <p className="filters-advanced-text__title">wider search radius</p>
                    <p className="filters-advanced-text__body">available up to 10 miles with xexus+</p>
                  </div>
                  <span className="filters-advanced-value">
                    2 miles
                    <img src={iconChevronRight} alt="" />
                  </span>
                </div>
                <div className="filters-advanced-row">
                  <span className="filters-advanced-icon">
                    <img src={iconPalette} alt="" />
                  </span>
                  <div className="filters-advanced-text">
                    <p className="filters-advanced-text__title">app customisation</p>
                    <p className="filters-advanced-text__body">change app colours and design theme</p>
                  </div>
                  <img src={iconChevronRight} alt="" />
                </div>
              </div>
            )}
          </div>

          <div className="filters-actions">
            <button className="filters-apply" onClick={() => navigate(-1)}>
              apply filters
            </button>
            <button
              className="filters-reset"
              onClick={() => {
                setLookingFor(['everyone']);
                setAgeMin(18);
                setAgeMax(45);
                setDistMin(2);
                setDistMax(20);
                setInto(['casual']);
                setShadowMode(false);
              }}
            >
              reset all filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
