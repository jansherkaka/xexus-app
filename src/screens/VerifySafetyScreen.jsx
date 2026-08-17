import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import thumbprintIcon from '../assets/icon-thumbprint.svg';
import './Screens.css';
import './VerifySafetyScreen.css';

export default function VerifySafetyScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

      <div className="safety-content">
        <div className="safety-heading-wrap">
          <img src={thumbprintIcon} alt="" className="safety-icon anim-fade-scale anim-d1" />
          <div className="safety-heading">
            <p className="safety-line safety-line--prioritize anim-fade-up anim-d2">we prioritize</p>
            <p className="safety-line safety-line--safety anim-fade-up anim-d3">safety</p>
            <p className="safety-line safety-line--at anim-fade-up anim-d4">at</p>
            <p className="safety-line safety-line--step anim-fade-up anim-d5">every step</p>
          </div>
        </div>
        <p className="safety-body anim-fade-up anim-d6">
          xexus encourages safer sexual practices, clear communication, and
          mutual respect. every member is screened against our safety
          database before joining the platform
        </p>
      </div>

      <div className="safety-cta-wrap">
        <button className="safety-cta anim-fade-up anim-d7" onClick={() => navigate('/join/verify-steps')}>
          next
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
