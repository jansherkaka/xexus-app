import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import shieldIcon from '../assets/icon-shield-check.png';
import phoneIcon from '../assets/icon-phone.png';
import faceScanIcon from '../assets/icon-face-scan.png';
import './Screens.css';
import './VerifyIdentityScreen.css';

export default function VerifyIdentityScreen() {
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

      <button className="verify-option verify-option--phone">
        <img src={phoneIcon} alt="" className="verify-option__icon" />
        <span>verify with phone number</span>
      </button>

      <button className="verify-option verify-option--selfie">
        <img src={faceScanIcon} alt="" className="verify-option__icon" />
        <span>verify with a selfie</span>
      </button>

      <HomeIndicator variant="dark" />
    </div>
  );
}
