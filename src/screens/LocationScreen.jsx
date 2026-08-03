import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-red-small.png';
import './Screens.css';

export default function LocationScreen() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'granted' | 'denied'

  const handleEnableLocation = () => {
    if (!('geolocation' in navigator)) {
      setStatus('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setStatus('granted'),
      () => setStatus('denied'),
    );
  };

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />

      <div className="location-topbar">
        <img src={logo} alt="Xexus" className="location-topbar__logo" />
        <div className="location-progress">
          <div className="location-progress__fill" />
        </div>
      </div>

      <div className="location-content">
        <div className="location-text">
          <h1 className="location-heading">
            <p>we are a</p>
            <p>location based</p>
            <p>experience</p>
          </h1>
          <p className="location-body">
            Share your location to see who&rsquo;s active nearby and unlock real-time
            discovery around you.
          </p>
        </div>

        <button className="location-cta" onClick={handleEnableLocation}>
          Enable location
        </button>

        {status === 'granted' && (
          <p className="location-status location-status--ok">Location enabled ✓</p>
        )}
        {status === 'denied' && (
          <p className="location-status location-status--err">
            Location permission denied — you can still continue.
          </p>
        )}
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
