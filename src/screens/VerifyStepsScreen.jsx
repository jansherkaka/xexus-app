import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import shieldIcon from '../assets/icon-shield-check.png';
import './Screens.css';
import './VerifyStepsScreen.css';

export default function VerifyStepsScreen() {
  const navigate = useNavigate();
  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  return (
    <div className="screen screen--white">
      <img src={shieldIcon} alt="" className="vsteps-icon anim-fade-scale anim-d1" />

      <div className="vsteps-content">
        <div className="vsteps-heading">
          <p className="vsteps-line vsteps-line--verify anim-fade-up anim-d2">verify</p>
          <p className="vsteps-line vsteps-line--youre anim-fade-up anim-d3">you&rsquo;re</p>
          <p className="vsteps-line vsteps-line--over18 anim-fade-up anim-d4">over 18</p>
        </div>
        <p className="vsteps-body anim-fade-up anim-d5">
          to keep xexus adult only and safer for everyone, verification
          requires two steps: a valid government ID and a live selfie.
          <br />
          <br />
          your information is encrypted, securely processed, and used only
          for identity and age verification.
        </p>
      </div>

      <div className="vsteps-cta-wrap">
        <button className="vsteps-cta anim-fade-up anim-d6" onClick={() => navigate('/join/verification-progress')}>
          next
        </button>
      </div>
    </div>
  );
}
