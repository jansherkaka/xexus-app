import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import './Screens.css';
import './GetActiveScreen.css';

export default function GetActiveScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

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
