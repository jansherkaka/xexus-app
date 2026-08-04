import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import OnboardingHeader from '../components/OnboardingHeader';
import './Screens.css';
import './OnboardingFlow.css';

export default function AgeGateScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />
      <OnboardingHeader step={2} onBack={() => navigate('/join')} />

      <div className="ob-content">
        <h1 className="ob-h1">20+ ONLY</h1>
        <p className="ob-body">XEXSUS is for people aged 20 and over.</p>

        <div className="ob-actions">
          <button className="ob-btn ob-btn--red" onClick={() => navigate('/join/birthday')}>
            I&rsquo;m 20 or older
          </button>
          <button className="ob-btn ob-btn--black" onClick={() => navigate('/')}>
            Exit
          </button>
        </div>
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
