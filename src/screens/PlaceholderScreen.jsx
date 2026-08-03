import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import './Screens.css';

export default function PlaceholderScreen({ title }) {
  const navigate = useNavigate();

  return (
    <div className="screen screen--dark">
      <StatusBar variant="light" />
      <button className="placeholder-back" onClick={() => navigate('/')}>
        ← Back
      </button>
      <div className="placeholder-screen">
        <h1>{title}</h1>
        <p>
          Yeh screen abhi Figma mein design nahi hui. Jaise hi client is flow
          ka design bhejega, hum yahan usko implement kar denge.
        </p>
      </div>
      <HomeIndicator variant="light" />
    </div>
  );
}
