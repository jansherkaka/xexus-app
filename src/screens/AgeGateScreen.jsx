import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import './Screens.css';
import './AgeGateScreen.css';

export default function AgeGateScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

      <p className="age-gate-number anim-fade-up anim-d1">18</p>

      <div className="age-gate-only">
        <p className="age-gate-only-line anim-fade-up anim-d2">++++</p>
        <p className="age-gate-only-line anim-fade-up anim-d3">only</p>
      </div>

      <p className="age-gate-body anim-fade-up anim-d4">xexus is for people aged 18 and over.</p>

      <div className="age-gate-cta-wrap">
        <button
          className="age-gate-cta anim-fade-up anim-d5"
          onClick={() => navigate('/join/birthday')}
        >
          i&rsquo;m 18 or older
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
