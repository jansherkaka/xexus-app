import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-white.png';
import './Screens.css';

const WORDS = ['step', 'into', 'the', 'real', 'world'];

const SPLASH_DURATION = 2000; // logo screen
const WORD_STAGGER = 420; // ms between each word's fade-in start
const WORD_FADE_DURATION = 900; // ms for a whole word to softly fade in
const SETTLE_DELAY = 350; // pause after the last word before the text settles
const SETTLE_DURATION = 550; // text move-up + bolden transition
const BUTTONS_DELAY = 250; // pause after settle before buttons slide in

const WORDS_DONE_AT = (WORDS.length - 1) * WORD_STAGGER + WORD_FADE_DURATION;
const SETTLE_AT = SPLASH_DURATION + WORDS_DONE_AT + SETTLE_DELAY;
const BUTTONS_AT = SETTLE_AT + SETTLE_DURATION + BUTTONS_DELAY;

export default function IntroScreen() {
  const navigate = useNavigate();
  // 'splash' -> 'letters' -> 'settled' -> 'buttons'
  const [stage, setStage] = useState('splash');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('letters'), SPLASH_DURATION),
      setTimeout(() => setStage('settled'), SETTLE_AT),
      setTimeout(() => setStage('buttons'), BUTTONS_AT),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (stage === 'splash') {
    return (
      <div className="screen screen--red">
        <StatusBar variant="light" />
        <img src={logo} alt="Xexus" className="splash-logo" />
        <HomeIndicator variant="light" />
      </div>
    );
  }

  return (
    <div className="screen screen--red">
      <StatusBar variant="dark" />

      <div className={`onboarding-heading onboarding-heading--${stage}`}>
        {WORDS.map((word, wordIndex) => (
          <p
            key={word}
            className="onboarding-line"
            style={{ animationDelay: `${wordIndex * WORD_STAGGER}ms` }}
          >
            {word}
          </p>
        ))}
      </div>

      <div className={`onboarding-actions ${stage === 'buttons' ? 'onboarding-actions--in' : ''}`}>
        <button className="btn-primary" onClick={() => navigate('/join')}>
          Join Xexus
        </button>
        <button className="btn-secondary" onClick={() => navigate('/login')}>
          Log in
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
