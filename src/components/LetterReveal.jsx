// Splits text into per-letter spans so each character can animate in on its
// own staggered delay. `variant` picks which CSS keyframe set to use (see
// .letter-reveal--v1/v2/v3 in Screens.css) — variant 3 additionally needs an
// overflow-hidden mask wrapper per letter for its slide-up-behind-a-curtain
// effect, which the others don't use.
export default function LetterReveal({ text, variant = 1, startDelay = 0, letterDelay = 45 }) {
  const chars = Array.from(text);

  return (
    <span className={`letter-reveal letter-reveal--v${variant}`} aria-label={text}>
      {chars.map((ch, i) => {
        const glyph = ch === ' ' ? ' ' : ch;
        const style = { animationDelay: `${startDelay + i * letterDelay}ms` };
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
