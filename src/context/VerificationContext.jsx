import { createContext, useContext, useMemo, useState } from 'react';

// Tracks which of the three checkable verification sub-flows (personal
// details, government ID, live selfie) have been completed, so the
// VerificationProgressScreen hub can render each step's tick/current/
// pending state and each sub-flow's last screen can report itself done
// before returning to the hub.
const VerificationContext = createContext(null);

export function VerificationProvider({ children }) {
  const [progress, setProgress] = useState({
    personalDetails: false,
    governmentId: false,
    liveSelfie: false,
  });

  const value = useMemo(
    () => ({
      progress,
      complete: (key) => setProgress((prev) => ({ ...prev, [key]: true })),
    }),
    [progress],
  );

  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>;
}

export function useVerification() {
  const ctx = useContext(VerificationContext);
  if (!ctx) throw new Error('useVerification must be used within VerificationProvider');
  return ctx;
}
