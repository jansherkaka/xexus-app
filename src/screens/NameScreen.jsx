import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-red-small.png';
import arrowBack from '../assets/icon-arrow-back.svg';
import './Screens.css';
import './NameScreen.css';

export default function NameScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

      <div className="name-topbar">
        <button
          className="name-back"
          onClick={() => navigate('/join/gender')}
          aria-label="Back"
        >
          <img src={arrowBack} alt="" />
        </button>
        <div className="name-brand">
          <img src={logo} alt="Xexus" className="name-brand__logo" />
          <div className="name-brand__progress">
            <div className="name-brand__progress-fill" />
          </div>
        </div>
      </div>

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
          onClick={() => navigate('/join/set-tone')}
        >
          next
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
