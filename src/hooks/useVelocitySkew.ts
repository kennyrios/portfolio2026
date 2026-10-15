import { useMemo } from 'react';
import { useScrollVelocity } from '../context/LenisContext';

interface VelocitySkewOptions {
  maxSkew?: number;    // Maximum skew in degrees (e.g. 3.5 deg)
  intensity?: number;  // Multiplier for velocity (e.g. 0.12)
  scaleEffect?: boolean; // Subtle stretch on rapid scroll
}

export function useVelocitySkew({
  maxSkew = 3.2,
  intensity = 0.14,
  scaleEffect = false,
}: VelocitySkewOptions = {}) {
  const velocity = useScrollVelocity();

  const { skewY, scaleY } = useMemo(() => {
    // Check reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return { skewY: 0, scaleY: 1 };
    }

    const rawSkew = velocity * intensity;
    const clampedSkew = Math.max(Math.min(rawSkew, maxSkew), -maxSkew);

    const rawScale = 1 + Math.min(Math.abs(velocity) * 0.002, 0.03);

    return {
      skewY: Math.round(clampedSkew * 100) / 100,
      scaleY: scaleEffect ? Math.round(rawScale * 1000) / 1000 : 1,
    };
  }, [velocity, intensity, maxSkew, scaleEffect]);

  return { skewY, scaleY, velocity };
}
