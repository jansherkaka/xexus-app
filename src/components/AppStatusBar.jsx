import { useEffect } from 'react';
import batteryWhite from '../assets/battery-white.svg';
import wifiWhite from '../assets/wifi-white.svg';
import timeWhite from '../assets/time-white.svg';
import batteryBlack from '../assets/battery-black.svg';
import wifiBlack from '../assets/wifi-black.svg';
import timeBlack from '../assets/time-black.svg';
import useIsFullBleed from '../hooks/useIsFullBleed';
import { useDeviceChromeContext } from '../context/DeviceChromeContext';
import './DeviceChrome.css';

const ASSETS = {
  light: { battery: batteryWhite, wifi: wifiWhite, time: timeWhite },
  dark: { battery: batteryBlack, wifi: wifiBlack, time: timeBlack },
};

// Single persistent status bar rendered outside RouteTransition's sliding
// layers - see DeviceChromeContext.jsx for why.
export default function AppStatusBar() {
  const { chrome } = useDeviceChromeContext();
  const isFullBleed = useIsFullBleed();
  const { statusBarVariant: variant, statusBarBg: bg } = chrome;
  const { battery, wifi, time } = ASSETS[variant];

  // Tints the real OS status bar (Android TWA/PWA) to match the current
  // screen's own top background, instead of the one static color baked
  // into the manifest. Also colors mobile Chrome's address bar the same way.
  useEffect(() => {
    if (!bg) return;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', bg);
  }, [bg]);

  if (isFullBleed) return null;

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
