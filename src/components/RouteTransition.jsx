import { useEffect, useRef, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import './RouteTransition.css';

// Mimics a native iOS-style push transition: the new screen slides in from
// the right and covers the previous one, which stays put underneath (not a
// fade/scale-in-place, which is what this replaced after client feedback
// referencing Hinge's onboarding flow). React Router officially supports
// rendering <Routes> against an explicit `location` prop that differs from
// the real browser location, which is what lets the outgoing screen keep
// rendering for the duration of the slide instead of unmounting instantly.
const SLIDE_MS = 380;

export default function RouteTransition({ children }) {
  const location = useLocation();
  const [state, setState] = useState({ current: location, previous: null });
  const clearTimer = useRef(null);

  useEffect(() => {
    setState((prev) => {
      if (prev.current.pathname === location.pathname) {
        return { ...prev, current: location };
      }
      return { current: location, previous: prev.current };
    });
  }, [location]);

  useEffect(() => {
    if (!state.previous) return undefined;
    clearTimer.current = setTimeout(() => {
      setState((prev) => ({ current: prev.current, previous: null }));
    }, SLIDE_MS);
    return () => clearTimeout(clearTimer.current);
  }, [state.previous, state.current]);

  if (!state.previous) {
    return <Routes location={state.current}>{children}</Routes>;
  }

  return (
    <>
      <div className="route-transition__layer route-transition__layer--exit">
        <Routes location={state.previous}>{children}</Routes>
      </div>
      <div className="route-transition__layer route-transition__layer--enter">
        <Routes location={state.current}>{children}</Routes>
      </div>
    </>
  );
}
