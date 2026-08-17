import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import WheelDatePicker from '../components/WheelDatePicker';
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

  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  return (
    <div className="screen screen--white">
      <div className="birthday-heading">
        <p className="birthday-line birthday-line--whatis anim-fade-up anim-d1">what is</p>
        <p className="birthday-line birthday-line--your anim-fade-up anim-d2">your</p>
        <p className="birthday-line birthday-line--date anim-fade-up anim-d3">date</p>
        <p className="birthday-line birthday-line--ofbirth anim-fade-up anim-d4">of birth?</p>
      </div>

      <div className="birthday-body anim-fade-up anim-d5">
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
        <button className="birthday-cta anim-fade-up anim-d6" onClick={openPicker}>
          {dob ? formatDate(dob) : 'select a date'}
        </button>
      </div>

      {modal === 'pick' && (
        <>
          <div className="birthday-dim anim-fade" />
          <div className="birthday-popup anim-pop-in">
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
          <div className="birthday-dim anim-fade" />
          <div className="birthday-confirm-popup anim-pop-in">
            <p className="birthday-confirm-heading">confirm your age</p>
            <p className="birthday-confirm-body">
              looks like you&rsquo;re {calcAge(dob)}.
              <br />
              you entered {formatDate(dob)}.
              <br />
              <br />
              confirm this is correct to continue.
              <br />
              you won&rsquo;t be able to change this later.
            </p>
            <div className="birthday-popup__actions">
              <button
                className="birthday-confirm-popup__confirm"
                onClick={() => navigate('/join/verify-consent')}
              >
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
