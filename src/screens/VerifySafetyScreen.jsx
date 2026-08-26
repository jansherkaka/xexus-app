import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import thumbprintIcon from '../assets/icon-thumbprint.svg';
import './Screens.css';
import './VerifySafetyScreen.css';

export default function VerifySafetyScreen() {
  const navigate = useNavigate();
  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  return (
    <div className="screen screen--white">
      <div className="safety-content">
        <div className="safety-heading-wrap">
          <img src={thumbprintIcon} alt="" className="safety-icon anim-fade-up-deep anim-dd1" />
          <div className="safety-heading">
            <p className="safety-line safety-line--prioritize anim-fade-up-deep anim-dd2">we prioritize</p>
            <p className="safety-line safety-line--safety anim-fade-up-deep anim-dd3">safety</p>
            <p className="safety-line safety-line--at anim-fade-up-deep anim-dd4">at</p>
            <p className="safety-line safety-line--step anim-fade-up-deep anim-dd5">every step</p>
          </div>
        </div>
        <p className="safety-body anim-fade-up-deep anim-dd6">
          xexus encourages safer sexual practices, clear communication, and
          mutual respect. every member is screened against our safety
          database before joining the platform
        </p>
      </div>

      <div className="safety-cta-wrap">
        <button className="safety-cta anim-fade-up-deep anim-dd7" onClick={() => navigate('/join/verify-steps')}>
          next
        </button>
      </div>
    </div>
  );
}
