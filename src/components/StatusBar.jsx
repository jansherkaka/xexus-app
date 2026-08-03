import batteryWhite from '../assets/battery-white.svg';
import wifiWhite from '../assets/wifi-white.svg';
import timeWhite from '../assets/time-white.svg';
import batteryBlack from '../assets/battery-black.svg';
import wifiBlack from '../assets/wifi-black.svg';
import timeBlack from '../assets/time-black.svg';
import './DeviceChrome.css';

const ASSETS = {
  light: { battery: batteryWhite, wifi: wifiWhite, time: timeWhite },
  dark: { battery: batteryBlack, wifi: wifiBlack, time: timeBlack },
};

export default function StatusBar({ variant = 'dark' }) {
  const { battery, wifi, time } = ASSETS[variant];

  return (
    <div className={`status-bar status-bar--${variant}`}>
      <img src={time} alt="" className="status-bar__time" />
      <div className="status-bar__right">
        <span className="status-bar__cellular">
          <span />
          <span />
          <span />
          <span />
        </span>
        <img src={wifi} alt="" className="status-bar__wifi" />
        <img src={battery} alt="" className="status-bar__battery" />
      </div>
    </div>
  );
}
