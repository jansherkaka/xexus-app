import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import selfieFrame from '../assets/selfie-frame.png';
import iconTipPhone from '../assets/icon-tip-phone.svg';
import iconTipSun from '../assets/icon-tip-sun.svg';
import iconTipFace from '../assets/icon-tip-face.png';
import './Screens.css';
import './LiveSelfieScreen.css';

const TIPS = [
  { icon: iconTipPhone, label: 'hold phone upright' },
  { icon: iconTipSun, label: 'well-lit' },
  { icon: iconTipFace, label: 'don’t cover face' },
];

export default function LiveSelfieScreen() {
  const navigate = useNavigate();
  const [selfie, setSelfie] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelfie(URL.createObjectURL(file));
  };

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

      <p className="selfie-heading anim-fade-up anim-d1">live selfie</p>

      <label className="selfie-frame anim-fade-scale anim-d2">
        {selfie && <img src={selfie} alt="" className="selfie-frame__photo" />}
        <img src={selfieFrame} alt="" className="selfie-frame__overlay" />
        {!selfie && <span className="selfie-frame__hint">tap to take selfie</span>}
        <input type="file" accept="image/*" capture="user" className="selfie-frame__input" onChange={handleFile} />
      </label>

      <div className="selfie-group">
        <div className="selfie-info anim-fade-up anim-d3">
          <p className="selfie-info__title">facial recognition</p>
          <p className="selfie-info__body">
            in order to improve the success rate of face recognition, please
            follow these requirements below
          </p>
        </div>

        <div className="selfie-tips anim-fade-up anim-d4">
          {TIPS.map((tip) => (
            <div key={tip.label} className="selfie-tip">
              <span className="selfie-tip__badge">
                <img src={tip.icon} alt="" />
              </span>
              <p className="selfie-tip__label">{tip.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="selfie-cta-wrap">
        <button className="selfie-cta anim-fade-up anim-d5" onClick={() => navigate('/join/gender')}>
          next
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
