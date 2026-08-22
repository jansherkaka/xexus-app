import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import { useVerification } from '../context/VerificationContext';
import './Screens.css';
import './NameScreen.css';

export default function NameScreen() {
  const navigate = useNavigate();
  const { complete } = useVerification();
  const [name, setName] = useState('');
  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  const handleNext = () => {
    complete('personalDetails');
    navigate('/join/verification-progress');
  };

  return (
    <div className="screen screen--white">
      <div className="name-heading">
        <p className="name-line name-line--what anim-fade-up anim-d1">what</p>
        <p className="name-line name-line--should anim-fade-up anim-d2">should</p>
        <p className="name-line name-line--we anim-fade-up anim-d3">we</p>
        <p className="name-line name-line--call anim-fade-up anim-d4">call</p>
        <p className="name-line name-line--you anim-fade-up anim-d5">you?</p>
      </div>

      <p className="name-body anim-fade-up anim-d6">
        add the name you want people to see.
      </p>

      <div className="name-field anim-fade-up anim-d7">
        <label className="name-field__label" htmlFor="profile-name">
          Name
        </label>
        <input
          id="profile-name"
          className="name-field__input"
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="name-cta-wrap">
        <button
          className="name-cta anim-fade-up anim-d8"
          onClick={handleNext}
        >
          next
        </button>
      </div>
    </div>
  );
}
