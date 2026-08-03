import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-white.png';
import './Screens.css';

const WORDS = ['step', 'into', 'the', 'real', 'world'];

const SPLASH_DURATION = 2000; // logo screen
const LETTER_STAGGER = 90; // ms between each letter within a word
const LETTER_DURATION = 420; // ms for a single letter to fade/rise in
const WORD_GAP = 260; // extra pause between one word finishing and the next starting
const SETTLE_DELAY = 350; // pause after the last letter before the text settles
const SETTLE_DURATION = 550; // text move-up + bolden transition
const BUTTONS_DELAY = 250; // pause after settle before buttons slide in

// Delay (ms) at which each word's first letter starts animating.
const WORD_START_DELAYS = (() => {
  let cumulative = 0;
  return WORDS.map((word) => {
    const start = cumulative;
    cumulative += (word.length - 1) * LETTER_STAGGER + LETTER_DURATION + WORD_GAP;
    return start;
  });
})();

const LAST_WORD = WORDS[WORDS.length - 1];
const LETTERS_DONE_AT =
  WORD_START_DELAYS[WORD_START_DELAYS.length - 1] +
  (LAST_WORD.length - 1) * LETTER_STAGGER +
  LETTER_DURATION;

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

  return (
    <div className="screen screen--red">
      <StatusBar variant="dark" />

      <div className={`onboarding-heading onboarding-heading--${stage}`}>
        {WORDS.map((word, wordIndex) => (
          <p key={word} className="onboarding-line">
            {[...word].map((ch, i) => {
              const delay = WORD_START_DELAYS[wordIndex] + i * LETTER_STAGGER;
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
