import useIsInstalledApp from '../hooks/useIsInstalledApp';
import './DeviceChrome.css';

export default function HomeIndicator({ variant = 'dark' }) {
  const isInstalledApp = useIsInstalledApp();

  if (isInstalledApp) return null;

  return <div className={`home-indicator home-indicator--${variant}`} />;
}
