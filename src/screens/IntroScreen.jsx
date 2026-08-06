import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-white.png';
import './Screens.css';

const SUBWORDS = ['into', 'the', 'real', 'world'];

const SPLASH_DURATION = 2000; // logo screen
const WORD_STAGGER = 420; // ms between each word's fade-in start
const WORD_FADE_DURATION = 900; // ms for a whole word to softly fade in
const BUTTONS_DELAY = 400; // pause after the last word before buttons slide in

// "step" fades in first, then the 4 subwords stagger after it
const WORDS_DONE_AT = SUBWORDS.length * WORD_STAGGER + WORD_FADE_DURATION;
const BUTTONS_AT = SPLASH_DURATION + WORDS_DONE_AT + BUTTONS_DELAY;

export default function IntroScreen() {
  const navigate = useNavigate();
  // 'splash' -> 'letters' -> 'buttons'
  const [stage, setStage] = useState('splash');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('letters'), SPLASH_DURATION),
      setTimeout(() => setStage('buttons'), BUTTONS_AT),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (stage === 'splash') {
    return (
      <div className="screen screen--red">
        <StatusBar variant="light" bg="#fd151b" />
        <img src={logo} alt="Xexus" className="splash-logo" />
        <HomeIndicator variant="light" />
      </div>
    );
  }

  return (
    <div className="screen screen--red">
      <StatusBar variant="dark" bg="#fd151b" />

      <p className="intro-headline">step</p>

      <div className={`intro-subwords${stage === 'buttons' ? ' intro-subwords--buttons' : ''}`}>
        {SUBWORDS.map((word, wordIndex) => (
          <p
            key={word}
            className="onboarding-line"
            style={{ animationDelay: `${(wordIndex + 1) * WORD_STAGGER}ms` }}
          >
            {word}
          </p>
        ))}
      </div>

      <div className={`onboarding-actions ${stage === 'buttons' ? 'onboarding-actions--in' : ''}`}>
        <button className="btn-primary" onClick={() => navigate('/join')}>
          Join XEXUS
        </button>
        <button className="btn-secondary" onClick={() => navigate('/login')}>
          log in
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
