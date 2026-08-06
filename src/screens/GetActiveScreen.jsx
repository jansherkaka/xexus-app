import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-red-small.png';
import arrowBack from '../assets/icon-arrow-back.svg';
import './Screens.css';
import './GetActiveScreen.css';

export default function GetActiveScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

      <div className="get-active-topbar">
        <button
          className="get-active-back"
          onClick={() => navigate('/join/photos')}
          aria-label="Back"
        >
          <img src={arrowBack} alt="" />
        </button>
        <div className="get-active-brand">
          <img src={logo} alt="Xexus" className="get-active-brand__logo" />
          <div className="get-active-brand__progress">
            <div className="get-active-brand__progress-fill" />
          </div>
        </div>
      </div>

      <div className="get-active-heading">
        <p className="get-active-line get-active-line--get anim-fade-up anim-d1">get</p>
        <p className="get-active-line get-active-line--active anim-fade-up anim-d2">active</p>
      </div>

      <p className="get-active-body anim-fade-up anim-d3">
        activate the LiveLustMap to see who wants to play near you.
      </p>

      <div className="get-active-cta-wrap">
        <button
          className="get-active-cta get-active-cta--pulse"
          onClick={() => navigate('/join/discover')}
        >
          activate LiveLustMap
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
