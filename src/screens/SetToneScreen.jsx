import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import identityIconWhite from '../assets/icon-identity-white.png';
import bgSetTone from '../assets/bg-set-tone.png';
import './Screens.css';
import './SetToneScreen.css';

export default function SetToneScreen() {
  const navigate = useNavigate();
  useDeviceChrome({ statusBarVariant: 'light', statusBarBg: '#ca282a', homeIndicatorVariant: 'light' });

  return (
    <div className="screen set-tone-screen">
      <img src={bgSetTone} alt="" className="set-tone-bg anim-fade-scale" />

      <div className="set-tone-icon-wrap">
        <img src={identityIconWhite} alt="" className="set-tone-icon set-tone-icon--top" />
        <img src={identityIconWhite} alt="" className="set-tone-icon set-tone-icon--bottom" />
      </div>

      <div className="set-tone-heading">
        <p className="set-tone-line set-tone-line--lets anim-fade-up anim-d2">let&rsquo;s</p>
        <p className="set-tone-line set-tone-line--set anim-fade-up anim-d3">set</p>
        <p className="set-tone-line set-tone-line--the anim-fade-up anim-d4">the</p>
        <p className="set-tone-line set-tone-line--tone anim-fade-up anim-d5">tone</p>
      </div>

      <p className="set-tone-body anim-fade-up anim-d6">
        choose your interests, boundaries, and curiosities so the right
        people know what you&rsquo;re into.
      </p>

      <div className="set-tone-cta-wrap">
        <button
          className="set-tone-cta anim-fade-up anim-d7"
          onClick={() => navigate('/join/photos')}
        >
          start chat with AI
        </button>
      </div>
    </div>
  );
}
