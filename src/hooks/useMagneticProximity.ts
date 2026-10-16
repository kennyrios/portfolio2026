import { useRef, useEffect } from 'react';

interface MagneticProximityOptions {
  radius?: number;       // Distance in px within which magnetic attraction begins
  strength?: number;     // Magnetic pull factor 0 - 1
  innerStrength?: number;
  active?: boolean;
}

/**
 * Ultra-High-Performance Magnetic Attraction Hook
 * - Zero React state re-renders (direct DOM transform updates)
 * - Local pointer events with bounding rect caching
 * - GPU-accelerated translate3d transforms
 * - Automatic spring-back with RAF lerp
 */
export function useMagneticProximity<T extends HTMLElement = HTMLDivElement>({
  radius = 70,
  strength = 0.35,
  innerStrength = 0,
  active = true,
}: MagneticProximityOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const innerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !active) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isAnimating = false;
    let rectCache: DOMRect | null = null;

    const render = () => {
      // Fast lerp interpolation
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      const diffX = targetX - currentX;
      const diffY = targetY - currentY;

      if (Math.abs(diffX) < 0.1 && Math.abs(diffY) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        isAnimating = false;
      }

      if (el) {
        el.style.transform = currentX === 0 && currentY === 0 
          ? '' 
          : `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      if (innerRef.current && innerStrength > 0) {
        const inX = currentX * innerStrength;
        const inY = currentY * innerStrength;
        innerRef.current.style.transform = inX === 0 && inY === 0 
          ? '' 
          : `translate3d(${inX.toFixed(2)}px, ${inY.toFixed(2)}px, 0)`;
      }

      if (isAnimating) {
        rafId = requestAnimationFrame(render);
      }
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const handlePointerEnter = () => {
      rectCache = el.getBoundingClientRect();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!rectCache) {
        rectCache = el.getBoundingClientRect();
      }

      const centerX = rectCache.left + rectCache.width / 2;
      const centerY = rectCache.top + rectCache.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      targetX = deltaX * strength;
      targetY = deltaY * strength;
      startAnimation();
    };

    const handlePointerLeave = () => {
      rectCache = null;
      targetX = 0;
      targetY = 0;
      startAnimation();
    };

    el.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (el) el.style.transform = '';
      if (innerRef.current) innerRef.current.style.transform = '';
    };
  }, [radius, strength, innerStrength, active]);

  return { elementRef, innerRef };
}
