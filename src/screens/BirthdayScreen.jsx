import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import OnboardingHeader from '../components/OnboardingHeader';
import './Screens.css';
import './OnboardingFlow.css';

function calcAge(dob) {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age;
}

function formatDate(dob) {
  return new Date(dob).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BirthdayScreen() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null); // null | 'pick' | 'confirm'
  const [dob, setDob] = useState('');
  const [draftDob, setDraftDob] = useState('');

  const openPicker = () => {
    setDraftDob(dob || '2000-01-01');
    setModal('pick');
  };

  const confirmDate = () => {
    setDob(draftDob);
    setModal('confirm');
  };

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />
      <OnboardingHeader step={3} onBack={() => navigate('/join/age-gate')} />

      <div className="ob-content" style={{ top: '172px', width: '344px' }}>
        <h1 className="ob-h1" style={{ fontSize: '96px', lineHeight: 1.05 }}>
          tell us about your birthday
        </h1>
        <p className="ob-body">
          We use your date of birth to confirm you meet the age requirement and to
          personalise your experience.
        </p>
        <div className="ob-actions">
          <button className="ob-btn ob-btn--red" onClick={openPicker}>
            {dob ? formatDate(dob) : 'Select a date'}
          </button>
        </div>
      </div>

      {modal === 'pick' && (
        <div className="ob-modal-backdrop">
          <div className="ob-modal">
            <h2>select a date</h2>
            <input
              type="date"
              className="ob-date-input"
              value={draftDob}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDraftDob(e.target.value)}
            />
            <button className="ob-btn ob-btn--black" onClick={confirmDate} disabled={!draftDob}>
              Confirm
            </button>
            <button className="ob-modal-link" onClick={() => setModal(null)}>
              Reset
            </button>
          </div>
        </div>
      )}

      {modal === 'confirm' && (
        <div className="ob-modal-backdrop">
          <div className="ob-modal">
            <h2>Confirm your age</h2>
            <p>
              You entered {formatDate(dob)} ({calcAge(dob)} years old). Confirm this is
              correct to continue.
            </p>
            <button className="ob-btn ob-btn--black" onClick={() => navigate('/join/verify')}>
              Confirm
            </button>
            <button className="ob-modal-link" onClick={() => setModal('pick')}>
              Change
            </button>
          </div>
        </div>
      )}

      <HomeIndicator variant="light" />
    </div>
  );
}
