import useIsFullBleed from '../hooks/useIsFullBleed';
import { useDeviceChromeContext } from '../context/DeviceChromeContext';
import './DeviceChrome.css';

// Single persistent home-indicator pill rendered outside RouteTransition's
// sliding layers - see DeviceChromeContext.jsx for why.
export default function AppHomeIndicator() {
  const { chrome } = useDeviceChromeContext();
  const isFullBleed = useIsFullBleed();

  if (isFullBleed || !chrome.showHomeIndicator) return null;

  return <div className={`home-indicator home-indicator--${chrome.homeIndicatorVariant}`} />;
}
