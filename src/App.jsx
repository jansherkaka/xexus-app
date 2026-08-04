import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import IntroScreen from './screens/IntroScreen';
import LocationScreen from './screens/LocationScreen';
import AgeGateScreen from './screens/AgeGateScreen';
import BirthdayScreen from './screens/BirthdayScreen';
import AgeVerifyScreen from './screens/AgeVerifyScreen';
import SexScreen from './screens/SexScreen';
import NameScreen from './screens/NameScreen';
import PhotosScreen from './screens/PhotosScreen';
import AiSetupScreen from './screens/AiSetupScreen';
import LiveLustMapScreen from './screens/LiveLustMapScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <div className="page-header">
          <span className="brand">xexus</span>
          <span className="tag">Interactive Prototype</span>
        </div>

        <PhoneFrame>
          <Routes>
            <Route path="/" element={<IntroScreen />} />
            <Route path="/join" element={<LocationScreen />} />
            <Route path="/join/age-gate" element={<AgeGateScreen />} />
            <Route path="/join/birthday" element={<BirthdayScreen />} />
            <Route path="/join/verify" element={<AgeVerifyScreen />} />
            <Route path="/join/identity" element={<SexScreen />} />
            <Route path="/join/name" element={<NameScreen />} />
            <Route path="/join/photos" element={<PhotosScreen />} />
            <Route path="/join/ai-setup" element={<AiSetupScreen />} />
            <Route path="/join/chat" element={<PlaceholderScreen title="AI Chat" />} />
            <Route path="/live-lust-map" element={<LiveLustMapScreen />} />
            <Route path="/login" element={<PlaceholderScreen title="Log in" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PhoneFrame>
      </div>
    </BrowserRouter>
  );
}

export default App;
