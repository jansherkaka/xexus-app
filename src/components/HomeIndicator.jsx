import useIsFullBleed from '../hooks/useIsFullBleed';
import './DeviceChrome.css';

export default function HomeIndicator({ variant = 'dark' }) {
  const isFullBleed = useIsFullBleed();

  if (isFullBleed) return null;

  return <div className={`home-indicator home-indicator--${variant}`} />;
}
