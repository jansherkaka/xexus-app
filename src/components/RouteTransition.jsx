import { useEffect, useRef, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import './RouteTransition.css';

// Mimics a native iOS-style push transition: the new screen slides in from
// the right and covers the previous one, which stays put underneath (not a
// fade/scale-in-place, which is what this replaced after client feedback
// referencing Hinge's onboarding flow). The outgoing screen also dims
// progressively while it's covered (see .route-transition__layer--exit) -
// without it, a busy/high-contrast outgoing screen (e.g. Location's dark
// photo + bold heading) stays fully legible for the whole slide, which read
// as its content "leaking" into the next screen rather than a clean handoff.
//
// Each screen gets its own layer div keyed on location.key, and that key
// never changes for as long as the layer stays mounted — critical, because
// giving the outgoing screen a *new* wrapper element on the transition
// render would make React tear down and remount its whole subtree (losing
// state, replaying its own internal CSS animations) instead of leaving it
// alone while the incoming screen slides over it. That remount was the
// visible "jhatka" (jolt) - the outgoing screen was flashing back to its own
// entrance animation instead of just sitting still.
const SLIDE_MS = 460;

export default function RouteTransition({ children }) {
  const location = useLocation();
  const [layers, setLayers] = useState(() => [{ id: location.key ?? 'initial', location }]);
  const clearTimer = useRef(null);

  useEffect(() => {
    setLayers((prev) => {
      const last = prev[prev.length - 1];
      if (last.location.pathname === location.pathname) {
        const copy = prev.slice();
        copy[copy.length - 1] = { ...last, location };
        return copy;
      }
      return [...prev, { id: location.key ?? `${location.pathname}-${Date.now()}`, location }];
    });
  }, [location]);

  useEffect(() => {
    if (layers.length < 2) return undefined;
    clearTimer.current = setTimeout(() => {
      setLayers((prev) => prev.slice(prev.length - 1));
    }, SLIDE_MS);
    return () => clearTimeout(clearTimer.current);
  }, [layers]);

  return layers.map((layer, i) => {
    const isEntering = i === layers.length - 1 && layers.length > 1;
    const isExiting = i < layers.length - 1;
    return (
      <div
        key={layer.id}
        className={`route-transition__layer${isEntering ? ' route-transition__layer--enter' : ''}${isExiting ? ' route-transition__layer--exit' : ''}`}
      >
        <Routes location={layer.location}>{children}</Routes>
      </div>
    );
  });
}
