import { useRef, useEffect, useState } from 'react';

interface MagneticProximityOptions {
  radius?: number;       // Distance in px within which magnetic attraction begins (default: 80)
  strength?: number;     // Magnetic pull factor 0 - 1 (default: 0.35)
  active?: boolean;      // Enable/disable
}

export function useMagneticProximity<T extends HTMLElement = HTMLDivElement>({
  radius = 85,
  strength = 0.35,
  active = true,
}: MagneticProximityOptions = {}) {
  const elementRef = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!active) {
      setPosition({ x: 0, y: 0 });
      setIsNear(false);
      return;
    }

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isTracking = false;

    const animate = () => {
      // Smooth lerp towards target
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      setPosition({
        x: Math.round(currentX * 100) / 100,
        y: Math.round(currentY * 100) / 100,
      });

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(animate);
      } else {
        isTracking = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      // Effective trigger boundary: radius plus half the element's average dimension
      const maxDistance = radius + Math.max(rect.width, rect.height) / 2;

      if (distance < maxDistance) {
        // Proximity factor: stronger attraction the closer cursor is
        const factor = (1 - distance / maxDistance);
        targetX = deltaX * strength * factor;
        targetY = deltaY * strength * factor;
        setIsNear(true);

        if (!isTracking) {
          isTracking = true;
          rafId = requestAnimationFrame(animate);
        }
      } else if (targetX !== 0 || targetY !== 0) {
        targetX = 0;
        targetY = 0;
        setIsNear(false);

        if (!isTracking) {
          isTracking = true;
          rafId = requestAnimationFrame(animate);
        }
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      setIsNear(false);
      if (!isTracking) {
        isTracking = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [radius, strength, active]);

  return { elementRef, position, isNear };
}
