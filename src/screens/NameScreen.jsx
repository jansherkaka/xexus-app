import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import OnboardingHeader from '../components/OnboardingHeader';
import './Screens.css';
import './OnboardingFlow.css';

export default function NameScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />
      <OnboardingHeader step={6} onBack={() => navigate('/join/identity')} />

      <div className="ob-content" style={{ top: '163px', width: '363px' }}>
        <h1 className="ob-h1" style={{ fontSize: '64px' }}>
          what should we call you?
        </h1>
        <p className="ob-body">
          Add the name you want people to see. Keep it real, or keep it low-key, your call.
        </p>

        <div className="ob-field">
          <label htmlFor="ob-name">Name</label>
          <input
            id="ob-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <p className="ob-hint">
          Tip: most people use a nickname instead of their legal name &mdash; you don&rsquo;t
          need to use your government name here.
        </p>

        <div className="ob-actions">
          <button
            className="ob-btn ob-btn--red"
            disabled={!name.trim()}
            onClick={() => navigate('/join/photos')}
          >
            Next
          </button>
        </div>
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
