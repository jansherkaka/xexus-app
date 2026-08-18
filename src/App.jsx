import { BrowserRouter, Route, Navigate } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import RouteTransition from './components/RouteTransition';
import AppTopbar from './components/AppTopbar';
import AppStatusBar from './components/AppStatusBar';
import AppHomeIndicator from './components/AppHomeIndicator';
import { DeviceChromeProvider } from './context/DeviceChromeContext';
import IntroScreen from './screens/IntroScreen';
import LocationScreen from './screens/LocationScreen';
import AgeGateScreen from './screens/AgeGateScreen';
import BirthdayScreen from './screens/BirthdayScreen';
import VerifyConsentScreen from './screens/VerifyConsentScreen';
import VerifySafetyScreen from './screens/VerifySafetyScreen';
import VerifyStepsScreen from './screens/VerifyStepsScreen';
import GovernmentIdScreen from './screens/GovernmentIdScreen';
import GovernmentIdUploadScreen from './screens/GovernmentIdUploadScreen';
import LiveSelfieScreen from './screens/LiveSelfieScreen';
import GenderScreen from './screens/GenderScreen';
import NameScreen from './screens/NameScreen';
import SetToneScreen from './screens/SetToneScreen';
import PhotosScreen from './screens/PhotosScreen';
import GetActiveScreen from './screens/GetActiveScreen';
import DiscoveryScreen from './screens/DiscoveryScreen';
import MapScreen from './screens/MapScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <div className="page-header">
          <span className="brand">xexus</span>
          <span className="tag">Interactive Prototype</span>
        </div>

        <DeviceChromeProvider>
          <PhoneFrame>
            <AppTopbar />
            <AppStatusBar />
            <RouteTransition>
              <Route path="/" element={<IntroScreen />} />
              <Route path="/join" element={<LocationScreen />} />
              <Route path="/join/age-gate" element={<AgeGateScreen />} />
              <Route path="/join/birthday" element={<BirthdayScreen />} />
              <Route path="/join/verify-consent" element={<VerifyConsentScreen />} />
              <Route path="/join/verify-safety" element={<VerifySafetyScreen />} />
              <Route path="/join/verify-steps" element={<VerifyStepsScreen />} />
              <Route path="/join/government-id" element={<GovernmentIdScreen />} />
              <Route path="/join/government-id-upload" element={<GovernmentIdUploadScreen />} />
              <Route path="/join/live-selfie" element={<LiveSelfieScreen />} />
              <Route path="/join/gender" element={<GenderScreen />} />
              <Route path="/join/name" element={<NameScreen />} />
              <Route path="/join/set-tone" element={<SetToneScreen />} />
              <Route path="/join/photos" element={<PhotosScreen />} />
              <Route path="/join/get-active" element={<GetActiveScreen />} />
              <Route path="/join/discover" element={<DiscoveryScreen />} />
              <Route path="/join/map" element={<MapScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </RouteTransition>
            <AppHomeIndicator />
          </PhoneFrame>
        </DeviceChromeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
