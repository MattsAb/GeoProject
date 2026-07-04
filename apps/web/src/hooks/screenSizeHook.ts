// src/hooks/useIsSmallScreen.ts
import { useState, useEffect } from 'react';

export function useIsSmallScreen(breakpoint = 640) {
  const [isSmall, setIsSmall] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isSmall;
}