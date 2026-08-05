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
      <StatusBar variant="dark" />

      <img src={shieldIcon} alt="" className="consent-icon" />

      <div className="consent-text">
        <p className="consent-line consent-line--big">pleasure</p>
        <p className="consent-line consent-line--small consent-line--starts">starts</p>
        <p className="consent-line consent-line--small consent-line--with">with</p>
        <p className="consent-line consent-line--big">consent</p>
      </div>

      <p className="consent-body">
        XEXUS is built around clear boundaries, mutual respect, and experiences that
        feel good for everyone involved
      </p>

      <div className="consent-cta-wrap">
        <button className="consent-cta" onClick={() => navigate('/join/age-gate')}>
          next
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
