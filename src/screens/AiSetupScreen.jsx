import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import identityIcon from '../assets/icon-identity.png';
import './Screens.css';
import './AiSetupScreen.css';

export default function AiSetupScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen ai-setup-screen">
      <StatusBar variant="light" />

      <div className="ai-setup-content">
        <img src={identityIcon} alt="" className="ai-setup-icon" />
        <h1 className="ai-setup-heading">let&rsquo;s set the tone</h1>
        <p className="ai-setup-body">
          We&rsquo;ll help shape how you show up, what you&rsquo;re into, and what kind of
          energy you want back.
        </p>

        <div className="ai-setup-bubbles">
          <div className="ai-setup-pill ai-setup-pill--1">
            <span className="ai-setup-emoji">🍸</span> Tone setting phrase
          </div>
          <div className="ai-setup-pill ai-setup-pill--2">
            <span className="ai-setup-emoji">🐱</span> Anything people should know before they
            say hello?
          </div>
        </div>

        <button className="ai-setup-cta" onClick={() => navigate('/join/chat')}>
          Start chat with AI
        </button>
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
