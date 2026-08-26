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

// This short age-gate -> verify-consent -> verify-safety -> verify-steps
// chain reads as one continuous flow rather than distinct app sections, so
// navigating between these specific screens crossfades in place instead of
// using the app's usual slide-over - it should feel like the same screen's
// content is advancing, not like you've navigated somewhere new.
const FADE_FLOW_PATHS = new Set([
  '/join/age-gate',
  '/join/verify-consent',
  '/join/verify-safety',
  '/join/verify-steps',
]);

export default function RouteTransition({ children }) {
  const location = useLocation();
  const [layers, setLayers] = useState(() => [{ id: location.key ?? 'initial', location, transition: 'slide' }]);
  const clearTimer = useRef(null);

  useEffect(() => {
    setLayers((prev) => {
      const last = prev[prev.length - 1];
      if (last.location.pathname === location.pathname) {
        const copy = prev.slice();
        copy[copy.length - 1] = { ...last, location };
        return copy;
      }
      const transition =
        FADE_FLOW_PATHS.has(last.location.pathname) && FADE_FLOW_PATHS.has(location.pathname)
          ? 'fade'
          : 'slide';
      return [...prev, { id: location.key ?? `${location.pathname}-${Date.now()}`, location, transition }];
    });
  }, [location]);

  useEffect(() => {
    if (layers.length < 2) return undefined;
    clearTimer.current = setTimeout(() => {
      setLayers((prev) => prev.slice(prev.length - 1));
    }, SLIDE_MS);
    return () => clearTimeout(clearTimer.current);
  }, [layers]);

  const activeTransition = layers[layers.length - 1].transition;
  const isFade = activeTransition === 'fade';

  return layers.map((layer, i) => {
    const isEntering = i === layers.length - 1 && layers.length > 1;
    const isExiting = i < layers.length - 1;
    const enterClass = isFade ? 'route-transition__layer--enter-fade' : 'route-transition__layer--enter';
    // A fade transition leaves the outgoing layer fully visible underneath
    // (no dim) - the incoming layer just crossfades directly on top of it,
    // matching the "same screen advancing" feel instead of a hand-off.
    const exitClass = isFade ? '' : 'route-transition__layer--exit';
    return (
      <div
        key={layer.id}
        className={`route-transition__layer${isEntering ? ' ' + enterClass : ''}${isExiting && exitClass ? ' ' + exitClass : ''}`}
      >
        <Routes location={layer.location}>{children}</Routes>
      </div>
    );
  });
}
