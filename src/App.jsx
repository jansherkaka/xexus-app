import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import IntroScreen from './screens/IntroScreen';
import LocationScreen from './screens/LocationScreen';
import AgeVerifyScreen from './screens/AgeVerifyScreen';
import AgeGateScreen from './screens/AgeGateScreen';
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
            <Route path="/join/verify" element={<AgeVerifyScreen />} />
            <Route path="/join/age-gate" element={<AgeGateScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PhoneFrame>
      </div>
    </BrowserRouter>
  );
}

export default App;
