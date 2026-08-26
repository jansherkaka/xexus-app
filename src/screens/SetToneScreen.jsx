import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import identityIconTop from '../assets/icon-identity-top.svg';
import identityIconBottom from '../assets/icon-identity-bottom.svg';
import bgSetTone from '../assets/bg-set-tone.png';
import './Screens.css';
import './SetToneScreen.css';

export default function SetToneScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // ?logo=1 (default): top/bottom pieces slide in from above/below.
  // ?logo=2: each piece "draws" itself in as a line wipe instead - top
  // left-to-right, bottom right-to-left. Both kept side by side for
  // client comparison rather than replacing one with the other.
  const requestedVariant = Number(searchParams.get('logo'));
  const variant = [1, 2].includes(requestedVariant) ? requestedVariant : 1;
  const iconVariantClass = variant === 2 ? 'set-tone-icon--wipe' : 'set-tone-icon--slide';
  useDeviceChrome({ statusBarVariant: 'light', statusBarBg: '#ca282a', homeIndicatorVariant: 'light' });

  return (
    <div className="screen set-tone-screen">
      <img src={bgSetTone} alt="" className="set-tone-bg anim-fade-scale" />

      <div className="set-tone-icon-wrap">
        <img src={identityIconTop} alt="" className={`set-tone-icon--top ${iconVariantClass}`} />
        <img src={identityIconBottom} alt="" className={`set-tone-icon--bottom ${iconVariantClass}`} />
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
