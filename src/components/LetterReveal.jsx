import { useEffect, useState } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SCRAMBLE_DURATION = 280; // ms of glyph-cycling before a letter settles
const SCRAMBLE_TICK = 40; // ms between glyph swaps

// A single letter for variant 5: cycles through random glyphs for a beat,
// then settles on the real character — needs local state, unlike the other
// (pure-CSS) variants.
function ScrambleChar({ glyph, startDelay }) {
  const [display, setDisplay] = useState(glyph === ' ' ? ' ' : glyph);
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
// own staggered delay. `variant` picks which reveal style to use (see
// .letter-reveal--v1..v4 in Screens.css for the pure-CSS ones):
//   1 - fast cascade (rise + blur-to-focus)
//   2 - springy pop (scale overshoot)
//   3 - rising reveal behind a masked curtain
//   4 - 3D flip-in
//   5 - scramble/decode — cycles random glyphs before settling (JS-driven,
//       handled by ScrambleChar instead of a CSS keyframe)
export default function LetterReveal({ text, variant = 1, startDelay = 0, letterDelay = 45 }) {
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
        if (variant === 3) {
          return (
            <span key={i} className="letter-reveal__mask" aria-hidden="true">
              <span className="letter-reveal__char" style={style}>
                {glyph}
              </span>
            </span>
          );
        }
        return (
          <span key={i} className="letter-reveal__char" style={style} aria-hidden="true">
            {glyph}
          </span>
        );
      })}
    </span>
  );
}
