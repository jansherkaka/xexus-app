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
      <StatusBar variant="dark" />

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
        <p className="name-line name-line--whats">what&rsquo;s</p>
        <p className="name-line name-line--your">your</p>
        <p className="name-line name-line--profile">profile</p>
        <p className="name-line name-line--name">name?</p>
      </div>

      <p className="name-body">
        add the name you want people to see.
        <br />
        keep it low-key.
      </p>

      <div className="name-field">
        <label className="name-field__label" htmlFor="profile-name">
          Name
        </label>
        <input
          id="profile-name"
          className="name-field__input"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="name-cta-wrap">
        <button className="name-cta" onClick={() => navigate('/join/set-tone')}>
          next
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
