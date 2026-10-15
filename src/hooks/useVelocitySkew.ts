import { useScrollVelocity } from '../context/LenisContext';

interface VelocitySkewOptions {
  maxSkew?: number;    // Maximum skew in degrees (e.g. 3.5 deg)
  intensity?: number;  // Multiplier for velocity (e.g. 0.12)
  scaleEffect?: boolean; // Subtle stretch on rapid scroll
}

export function useVelocitySkew({}: VelocitySkewOptions = {}) {
  const velocity = useScrollVelocity();

  return { skewY: 0, scaleY: 1, velocity };
}
