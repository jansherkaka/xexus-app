import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// StatusBar and HomeIndicator are decorative device-chrome overlays drawn on
// top of each screen (only shown in the desktop phone-mockup preview - real
// devices/installed PWAs show their own). They used to be rendered by every
// screen individually, which meant during a route slide-transition, the
// outgoing and incoming screens' own copies crossed paths mid-slide (two
// clocks / two home-indicator pills ghosting past each other) - the same bug
// class fixed for the logo/progress header. This context lets each screen
// register what it wants shown, while a single persistent pair of
// components (AppStatusBar/AppHomeIndicator), mounted outside the sliding
// transition layers, does the actual rendering.
const DeviceChromeContext = createContext(null);

const DEFAULT_CHROME = {
  statusBarVariant: 'dark',
  statusBarBg: '#ffffff',
  homeIndicatorVariant: 'dark',
  showHomeIndicator: true,
};

export function DeviceChromeProvider({ children }) {
  const [chrome, setChrome] = useState(DEFAULT_CHROME);
  const value = useMemo(() => ({ chrome, setChrome }), [chrome]);
  return <DeviceChromeContext.Provider value={value}>{children}</DeviceChromeContext.Provider>;
}

export function useDeviceChromeContext() {
  const ctx = useContext(DeviceChromeContext);
  if (!ctx) throw new Error('useDeviceChromeContext must be used within DeviceChromeProvider');
  return ctx;
}

// Called by each screen instead of rendering <StatusBar>/<HomeIndicator>
// directly. Pass showHomeIndicator: false for screens (Discovery/Map) that
// use BottomNav instead.
export function useDeviceChrome({
  statusBarVariant = 'dark',
  statusBarBg = '#ffffff',
  homeIndicatorVariant = statusBarVariant,
  showHomeIndicator = true,
}) {
  const { setChrome } = useDeviceChromeContext();
  useEffect(() => {
    setChrome({ statusBarVariant, statusBarBg, homeIndicatorVariant, showHomeIndicator });
  }, [statusBarVariant, statusBarBg, homeIndicatorVariant, showHomeIndicator, setChrome]);
}
