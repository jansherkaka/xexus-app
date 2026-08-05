import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import shieldIcon from '../assets/icon-shield-check.png';
import phoneIcon from '../assets/icon-phone.png';
import faceScanIcon from '../assets/icon-face-scan.png';
import verifiedBadge from '../assets/icon-verified-badge.png';
import './Screens.css';
import './VerifyIdentityScreen.css';

export default function VerifyIdentityScreen() {
  const [verified, setVerified] = useState(false);

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />

      <img src={shieldIcon} alt="" className="verify-icon" />

      <div className="verify-content">
        <div className="verify-heading">
          <p className="verify-line verify-line--verify">verify</p>
          <p className="verify-line verify-line--youre">you&rsquo;re</p>
          <p className="verify-line verify-line--over18">over 18</p>
        </div>

        <p className="verify-body">
          to use XEXUS, you&rsquo;ll need to confirm that you&rsquo;re 20 or
          over. This helps us keep the platform adult-only and safer for
          everyone.
          <br />
          <br />
          your age check is used for verification and safety. we keep this
          process private.
        </p>
      </div>

      <button className="verify-option verify-option--phone" onClick={() => setVerified(true)}>
        <img src={phoneIcon} alt="" className="verify-option__icon" />
        <span>verify with phone number</span>
      </button>

      <button className="verify-option verify-option--selfie" onClick={() => setVerified(true)}>
        <img src={faceScanIcon} alt="" className="verify-option__icon" />
        <span>verify with a selfie</span>
      </button>

      <HomeIndicator variant="dark" />

      {verified && (
        <>
          <div className="verify-dim" />
          <div className="verify-success-popup">
            <div className="verify-success-heading">
              <p className="verify-success-line verify-success-line--youre">you&rsquo;re</p>
              <p className="verify-success-line verify-success-line--verified">verified!</p>
            </div>
            <p className="verify-success-body">
              your age has been confirmed. you&rsquo;re all set to continue.
            </p>
            <div className="verify-success-icon">
              <span className="verify-success-icon__check">✅</span>
              <img src={verifiedBadge} alt="" className="verify-success-icon__badge" />
            </div>
            <button className="verify-success-confirm" onClick={() => setVerified(false)}>
              confirm
            </button>
          </div>
        </>
      )}
    </div>
  );
}
