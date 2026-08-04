import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import OnboardingHeader from '../components/OnboardingHeader';
import shieldIcon from '../assets/icon-shield-check.png';
import faceScanIcon from '../assets/icon-face-scan.png';
import phoneIcon from '../assets/icon-phone.png';
import './Screens.css';
import './OnboardingFlow.css';

export default function AgeVerifyScreen() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />
      <OnboardingHeader step={4} onBack={() => navigate('/join/birthday')} />

      <div className="ob-content" style={{ top: '150px' }}>
        <img src={shieldIcon} alt="" style={{ width: 140, height: 140 }} />
        <h1 className="ob-h1">we need to verify you&rsquo;re over 21 to use Xexus</h1>
        <p className="ob-body">
          {
            "To use XEXUS, you’ll need to confirm that you’re 18 or over. This helps us keep the platform adult-only and safer for everyone.\n\nYour age check is used for verification and safety. We keep the process private and designed around control and discretion."
          }
        </p>

        <div className="ob-actions">
          <button className="ob-btn ob-btn--outline" onClick={() => setVerified(true)}>
            <img src={faceScanIcon} alt="" width={20} height={20} />
            Verify with Face ID
          </button>
          <button className="ob-btn ob-btn--outline" onClick={() => setVerified(true)}>
            <img src={phoneIcon} alt="" width={20} height={20} />
            Verify with phone number
          </button>
        </div>
      </div>

      {verified && (
        <div className="ob-modal-backdrop">
          <div className="ob-modal">
            <h2 style={{ color: '#19191a', fontFamily: 'Anton, sans-serif', fontSize: 32 }}>
              You&rsquo;re verified!
            </h2>
            <p>Your age has been confirmed. You&rsquo;re all set to continue.</p>
            <button className="ob-btn ob-btn--black" onClick={() => navigate('/join/identity')}>
              Confirm
            </button>
          </div>
        </div>
      )}

      <HomeIndicator variant="light" />
    </div>
  );
}
