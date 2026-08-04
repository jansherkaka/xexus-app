import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import OnboardingHeader from '../components/OnboardingHeader';
import './Screens.css';
import './OnboardingFlow.css';

export default function LiveLustMapScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />
      <OnboardingHeader step={1} onBack={() => navigate(-1)} />

      <div className="ob-content" style={{ top: '283px' }}>
        <h1 className="ob-h1" style={{ color: '#fd151b', fontFamily: "'Berthold Akzidenz Grotesk', 'Anton', sans-serif", fontWeight: 800, fontSize: '58px' }}>
          get activated
        </h1>
        <p className="ob-body">
          Activate the LiveLustMap to see who wants to play near you.
        </p>
        <div className="ob-actions">
          <button className="ob-btn ob-btn--red" onClick={() => navigate(-1)}>
            Activate LiveLustMap
          </button>
        </div>
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
