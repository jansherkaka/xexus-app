import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import WheelDatePicker from '../components/WheelDatePicker';
import logo from '../assets/xexus-logo-red-small.png';
import arrowBack from '../assets/icon-arrow-back.svg';
import './Screens.css';
import './BirthdayScreen.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function calcAge(iso) {
  const birth = new Date(iso);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age;
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

  const resetDate = () => setDraftDob('2000-01-01');

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />

      <div className="birthday-topbar">
        <button
          className="birthday-back"
          onClick={() => navigate('/join/age-gate')}
          aria-label="Back"
        >
          <img src={arrowBack} alt="" />
        </button>
        <div className="birthday-brand">
          <img src={logo} alt="Xexus" className="birthday-brand__logo" />
          <div className="birthday-brand__progress">
            <div className="birthday-brand__progress-fill" />
          </div>
        </div>
      </div>

      <div className="birthday-heading">
        <p className="birthday-line birthday-line--tell">tell us</p>
        <p className="birthday-line birthday-line--about">about</p>
        <p className="birthday-line birthday-line--your">your</p>
        <p className="birthday-line birthday-line--birthday">birthday</p>
      </div>

      <div className="birthday-body">
        <p className="birthday-body__line">
          please enter your date of birth to confirm that you meet the age
          requirement and personalize your experience.
        </p>
        <p className="birthday-body__line">
          your birthday won&rsquo;t be shown on your profile unless you want
          it to.
        </p>
      </div>

      <div className="birthday-cta-wrap">
        <button className="birthday-cta" onClick={openPicker}>
          {dob ? formatDate(dob) : 'select a date'}
        </button>
      </div>

      <HomeIndicator variant="dark" />

      {modal === 'pick' && (
        <>
          <div className="birthday-dim" />
          <div className="birthday-popup">
            <p className="birthday-popup__heading">select a date</p>
            <WheelDatePicker value={draftDob} onChange={setDraftDob} />
            <div className="birthday-popup__actions">
              <button className="birthday-popup__confirm" onClick={confirmDate}>
                confirm
              </button>
              <button className="birthday-popup__reset" onClick={resetDate}>
                reset
              </button>
            </div>
          </div>
        </>
      )}

      {modal === 'confirm' && (
        <>
          <div className="birthday-dim" />
          <div className="birthday-confirm-popup">
            <div className="birthday-confirm-heading">
              <p className="birthday-confirm-line birthday-confirm-line--confirm">confirm</p>
              <p className="birthday-confirm-line birthday-confirm-line--your">your</p>
              <p className="birthday-confirm-line birthday-confirm-line--age">age</p>
              <p className="birthday-confirm-body">
                you entered {formatDate(dob)} ({calcAge(dob)} years old). confirm this
                is correct to continue.
                <br />
                you wont be able to edit this later
              </p>
            </div>
            <div className="birthday-popup__actions">
              <button className="birthday-popup__confirm" onClick={() => setModal(null)}>
                confirm
              </button>
              <button className="birthday-popup__reset" onClick={() => setModal('pick')}>
                change
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
