import React, { createContext, useContext, useEffect, useState, useRef, useCallback, useMemo, ReactNode } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
  velocity: number;
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  velocity: 0,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export const useScrollVelocity = () => {
  const { velocity } = useContext(LenisContext);
  return velocity;
};

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const velocityRef = useRef<number>(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Track velocity in ref without causing cascading React re-renders across the entire app
    const handleScroll = (e: any) => {
      velocityRef.current = e.velocity || 0;
    };

    lenis.on('scroll', handleScroll);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: any) => {
    const activeLenis = lenisRef.current;
    if (activeLenis) {
      activeLenis.scrollTo(target, {
        offset: -20,
        duration: 1.2,
        ...options,
      });
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Stabilize context value so consuming components NEVER re-render on scroll
  const contextValue = useMemo<LenisContextType>(() => ({
    lenis: lenisInstance,
    velocity: 0,
    scrollTo,
  }), [lenisInstance, scrollTo]);

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
};
