import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import shieldIcon from '../assets/icon-shield-check.png';
import phoneIcon from '../assets/icon-phone.png';
import faceScanIcon from '../assets/icon-face-scan.png';
import './Screens.css';
import './VerifyIdentityScreen.css';

export default function VerifyIdentityScreen() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

      <img src={shieldIcon} alt="" className="verify3-icon anim-fade-scale anim-d1" />

      <div className="verify3-text">
        <p className="verify3-heading anim-fade-up anim-d2">
          we need to verify you&rsquo;re over 18 to use xexus
        </p>
        <div className="verify3-body anim-fade-up anim-d3">
          <p>
            to use xexus, you&rsquo;ll need to confirm that you&rsquo;re 18
            or over. this helps us keep the platform adult-only and safer
            for everyone.
          </p>
          <p>
            your age check is used for verification and safety. we keep
            the process private and designed around control and
            discretion.
          </p>
        </div>
      </div>

      <button
        className="verify3-option verify3-option--phone anim-fade-up anim-d4"
        onClick={() => setVerified(true)}
      >
        <img src={phoneIcon} alt="" className="verify3-option__icon" />
        <span>verify with phone number</span>
      </button>

      <button
        className="verify3-option verify3-option--selfie anim-fade-up anim-d5"
        onClick={() => setVerified(true)}
      >
        <img src={faceScanIcon} alt="" className="verify3-option__icon" />
        <span>verify with a selfie</span>
      </button>

      <HomeIndicator variant="dark" />

      {verified && (
        <>
          <div className="verify3-dim anim-fade" />
          <div className="verify3-popup anim-pop-in">
            <div className="verify3-popup-heading">
              <p className="verify3-popup-line verify3-popup-line--youre">you&rsquo;re</p>
              <p className="verify3-popup-line verify3-popup-line--verified">verified!</p>
            </div>
            <p className="verify3-popup-body">
              your age has been confirmed. you&rsquo;re all set to continue.
            </p>
            <button
              className="verify3-popup-cta"
              onClick={() => navigate('/join/gender')}
            >
              finish
            </button>
          </div>
        </>
      )}
    </div>
  );
}
