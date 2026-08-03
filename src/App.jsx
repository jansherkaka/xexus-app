import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import IntroScreen from './screens/IntroScreen';
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
            <Route path="/join" element={<PlaceholderScreen title="Join Xexus" />} />
            <Route path="/login" element={<PlaceholderScreen title="Log in" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PhoneFrame>

        <div className="page-footer">Figma design se banaya gaya prototype</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
