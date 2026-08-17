import { useEffect, useState } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#%&';
const SCRAMBLE_DURATION = 320; // ms of glyph-cycling before a letter settles
const SCRAMBLE_TICK = 30; // ms between glyph swaps

// A single letter for variant 5: cycles through random glyphs for a beat,
// then settles on the real character — needs local state, unlike the other
// (pure-CSS) variants.
function ScrambleChar({ glyph, startDelay }) {
  const [display, setDisplay] = useState(glyph === ' ' ? ' ' : glyph);
  const [phase, setPhase] = useState('idle'); // idle -> scrambling -> settled

  useEffect(() => {
    if (glyph === ' ') return undefined;
    let tickTimer;
    const startTimer = setTimeout(() => {
      setPhase('scrambling');
      const settleAt = Date.now() + SCRAMBLE_DURATION;
      const tick = () => {
        if (Date.now() >= settleAt) {
          setDisplay(glyph);
          setPhase('settled');
          return;
        }
        setDisplay(SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]);
        tickTimer = setTimeout(tick, SCRAMBLE_TICK);
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(tickTimer);
    };
  }, [glyph, startDelay]);

  return (
    <span
      className={`letter-reveal__char letter-reveal__char--scramble letter-reveal__char--${phase}`}
      aria-hidden="true"
    >
      {display}
    </span>
  );
}

// Splits text into per-letter spans so each character can animate in on its
// own staggered delay. `variant` picks which reveal style to use — each one
// uses a meaningfully different mechanism, not just a different easing
// curve, so they read as clearly distinct side by side:
//   1 - fast cascade: per-letter rise + blur-to-focus
//   2 - springy pop: per-letter scale overshoot
//   3 - word wipe: the WHOLE word reveals in one clip-path swipe, no
//       per-letter stagger at all
//   4 - typewriter: letters pop in instantly (no easing/motion) with a
//       trailing blinking cursor, like text being typed
//   5 - glitch/scramble: letters cycle random glyphs with jitter + a
//       chromatic-aberration flicker before locking onto the real character
export default function LetterReveal({ text, variant = 1, startDelay = 0, letterDelay = 45 }) {
  if (variant === 3) {
    return (
      <span
        className="letter-reveal letter-reveal--v3"
        style={{ animationDelay: `${startDelay}ms` }}
        aria-label={text}
      >
        {text}
      </span>
    );
  }

  const chars = Array.from(text);

  return (
    <span className={`letter-reveal letter-reveal--v${variant}`} aria-label={text}>
      {chars.map((ch, i) => {
        const glyph = ch === ' ' ? ' ' : ch;
        const delay = startDelay + i * letterDelay;

        if (variant === 5) {
          return <ScrambleChar key={i} glyph={glyph} startDelay={delay} />;
        }

        const style = { animationDelay: `${delay}ms` };
        return (
          <span key={i} className="letter-reveal__char" style={style} aria-hidden="true">
            {glyph}
          </span>
        );
      })}
    </span>
  );
}
