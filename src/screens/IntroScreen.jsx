import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-white.png';
import './Screens.css';

const WORDS = ['step', 'into', 'the', 'real', 'world'];
const TOTAL_LETTERS = WORDS.join('').length;

const SPLASH_DURATION = 2000; // logo screen
const LETTER_STAGGER = 45; // ms between each letter's entrance
const LETTER_DURATION = 260; // ms for a single letter to fade/rise in
const SETTLE_DELAY = 250; // pause after the last letter before the text settles
const SETTLE_DURATION = 550; // text move-up + bolden transition
const BUTTONS_DELAY = 250; // pause after settle before buttons slide in

const LETTERS_DONE_AT = TOTAL_LETTERS * LETTER_STAGGER + LETTER_DURATION;
const SETTLE_AT = SPLASH_DURATION + LETTERS_DONE_AT + SETTLE_DELAY;
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

  let letterIndex = 0;

  return (
    <div className="screen screen--red">
      <StatusBar variant="dark" />

      <div className={`onboarding-heading onboarding-heading--${stage}`}>
        {WORDS.map((word) => (
          <p key={word} className="onboarding-line">
            {[...word].map((ch, i) => {
              const delay = letterIndex * LETTER_STAGGER;
              letterIndex += 1;
              return (
                <span key={i} className="letter" style={{ animationDelay: `${delay}ms` }}>
                  {ch}
                </span>
              );
            })}
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
