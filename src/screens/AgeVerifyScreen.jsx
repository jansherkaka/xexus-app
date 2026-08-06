import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import shieldIcon from '../assets/icon-shield-check.png';
import './Screens.css';
import './AgeVerifyScreen.css';

export default function AgeVerifyScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

      <img src={shieldIcon} alt="" className="consent-icon anim-fade-scale anim-d1" />

      <div className="consent-text">
        <p className="consent-line consent-line--big anim-fade-up anim-d2">pleasure</p>
        <p className="consent-line consent-line--small consent-line--starts anim-fade-up anim-d3">
          starts
        </p>
        <p className="consent-line consent-line--small consent-line--with anim-fade-up anim-d4">
          with
        </p>
        <p className="consent-line consent-line--big anim-fade-up anim-d5">consent</p>
      </div>

      <p className="consent-body anim-fade-up anim-d6">
        XEXUS is built around clear boundaries, mutual respect, and experiences that
        feel good for everyone involved
      </p>

      <div className="consent-cta-wrap">
        <button
          className="consent-cta anim-fade-up anim-d7"
          onClick={() => navigate('/join/age-gate')}
        >
          next
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
