import './DeviceChrome.css';

export default function HomeIndicator({ variant = 'dark' }) {
  return <div className={`home-indicator home-indicator--${variant}`} />;
}
