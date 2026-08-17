import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import LetterReveal from '../components/LetterReveal';
import logo from '../assets/xexus-logo-white.png';
import './Screens.css';

const SUBWORDS = ['into', 'the', 'real', 'world'];

const SPLASH_DURATION = 2000; // logo screen
const HEADLINE_LETTER_DELAY = 110; // ms between each "step" letter
const WORD_STAGGER = 460; // ms between each subword's cascade start
const LETTER_DELAY = 90; // ms between each letter within a subword
const LETTER_ANIM_DURATION = 950; // longest per-letter animation, for timing budget
const BUTTONS_DELAY = 500; // pause after the last letter before buttons slide in

const MAX_WORD_LETTERS = Math.max(...SUBWORDS.map((w) => w.length));
const WORDS_DONE_AT =
  (SUBWORDS.length - 1) * WORD_STAGGER + MAX_WORD_LETTERS * LETTER_DELAY + LETTER_ANIM_DURATION;
const BUTTONS_AT = SPLASH_DURATION + WORDS_DONE_AT + BUTTONS_DELAY;

export default function IntroScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // ?intro=1-10 lets the same build be compared side by side while picking
  // an animation style; defaults to variant 1 (fast cascade) pending final
  // client sign-off.
  const requestedVariant = Number(searchParams.get('intro'));
  const variant = Array.from({ length: 10 }, (_, i) => i + 1).includes(requestedVariant)
    ? requestedVariant
    : 1;

  // 'splash' -> 'letters' -> 'buttons'
  const [stage, setStage] = useState('splash');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('letters'), SPLASH_DURATION),
      setTimeout(() => setStage('buttons'), BUTTONS_AT),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isSplash = stage === 'splash';
  useDeviceChrome({
    statusBarVariant: isSplash ? 'light' : 'dark',
    statusBarBg: '#fd151b',
    homeIndicatorVariant: isSplash ? 'light' : 'dark',
  });

  if (stage === 'splash') {
    return (
      <div className="screen screen--red">
        <img src={logo} alt="Xexus" className="splash-logo" />
      </div>
    );
  }

  return (
    <div className="screen screen--red">
      <p className="intro-headline">
        <LetterReveal text="step" variant={variant} startDelay={0} letterDelay={HEADLINE_LETTER_DELAY} />
        {variant === 4 && stage === 'letters' && <span className="intro-cursor" />}
      </p>

      <div className={`intro-subwords${stage === 'buttons' ? ' intro-subwords--buttons' : ''}`}>
        {SUBWORDS.map((word, wordIndex) => (
          <p key={word} className="onboarding-line">
            <LetterReveal
              text={word}
              variant={variant}
              startDelay={wordIndex * WORD_STAGGER}
              letterDelay={LETTER_DELAY}
            />
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
    </div>
  );
}
