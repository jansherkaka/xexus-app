import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import ringOuter from '../assets/icon-radar-ring1.svg';
import ringMidOuter from '../assets/icon-radar-ring2.svg';
import ringMid from '../assets/icon-radar-ring3.svg';
import ringInner from '../assets/icon-radar-ring4.png';
import ringCenter from '../assets/icon-radar-ring5.png';
import pinIcon from '../assets/icon-radar-pin.svg';
import './Screens.css';
import './GetActiveScreen.css';

export default function GetActiveScreen() {
  const navigate = useNavigate();
  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  return (
    <div className="screen screen--white">
      <div className="get-active-heading">
        <p className="get-active-line get-active-line--get anim-fade-up anim-d1">get</p>
        <p className="get-active-line get-active-line--active anim-fade-up anim-d2">active</p>
      </div>

      <p className="get-active-promo anim-fade-up anim-d3">LiveLustMap</p>

      <p className="get-active-body anim-fade-up anim-d4">see who wants to play near you.</p>

      <div className="get-active-radar anim-fade-up anim-d5">
        <img src={ringOuter} alt="" className="get-active-radar__ring get-active-radar__ring--1" />
        <img src={ringMidOuter} alt="" className="get-active-radar__ring get-active-radar__ring--2" />
        <img src={ringMid} alt="" className="get-active-radar__ring get-active-radar__ring--3" />
        <img src={ringInner} alt="" className="get-active-radar__ring get-active-radar__ring--4" />
        <img src={ringCenter} alt="" className="get-active-radar__ring get-active-radar__ring--5" />
        <img src={pinIcon} alt="" className="get-active-radar__pin" />
      </div>

      <div className="get-active-cta-wrap">
        <button
          className="get-active-cta get-active-cta--pulse"
          onClick={() => navigate('/join/discover')}
        >
          activate LiveLustMap
        </button>
      </div>
    </div>
  );
}
