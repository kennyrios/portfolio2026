import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
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
  const [velocity, setVelocity] = useState<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    let currentVelocity = 0;
    let isDecaying = false;

    // Decay velocity smoothly back to zero when user stops scrolling
    const decayVelocity = () => {
      if (Math.abs(currentVelocity) > 0.01) {
        currentVelocity *= 0.88;
        setVelocity(currentVelocity);
        rafIdRef.current = requestAnimationFrame(decayVelocity);
      } else {
        currentVelocity = 0;
        setVelocity(0);
        isDecaying = false;
      }
    };

    const handleScroll = (e: any) => {
      currentVelocity = e.velocity || 0;
      setVelocity(currentVelocity);
      if (!isDecaying) {
        isDecaying = true;
        requestAnimationFrame(decayVelocity);
      }
    };

    lenis.on('scroll', handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (target: string | HTMLElement | number, options?: any) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
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
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, velocity, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};
