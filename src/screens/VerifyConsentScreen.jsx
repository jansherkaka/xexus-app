import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import shieldIcon from '../assets/icon-shield-check.png';
import './Screens.css';
import './VerifyConsentScreen.css';

export default function VerifyConsentScreen() {
  const navigate = useNavigate();
  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  return (
    <div className="screen screen--white">
      <img src={shieldIcon} alt="" className="consent2-icon anim-fade-up-deep anim-dd1" />

      <div className="consent2-content">
        <div className="consent2-heading">
          <p className="consent2-line consent2-line--start anim-fade-up-deep anim-dd2">start</p>
          <p className="consent2-line consent2-line--with anim-fade-up-deep anim-dd3">with</p>
          <p className="consent2-line consent2-line--clear anim-fade-up-deep anim-dd4">clear</p>
          <p className="consent2-line consent2-line--consent anim-fade-up-deep anim-dd5">consent</p>
        </div>
        <p className="consent2-body anim-fade-up-deep anim-dd6">
          xexus is built around clear boundaries, mutual respect, and
          experiences that benefit all parties
        </p>
      </div>

      <div className="consent2-cta-wrap">
        <button className="consent2-cta anim-fade-up-deep anim-dd7" onClick={() => navigate('/join/verify-safety')}>
          next
        </button>
      </div>
    </div>
  );
}
