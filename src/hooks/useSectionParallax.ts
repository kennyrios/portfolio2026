import { useEffect, useRef } from 'react';

export interface SectionParallaxConfig {
  speedY?: number;      // Vertical parallax multiplier (e.g. -0.15, 0.2)
  speedX?: number;      // Horizontal parallax multiplier (e.g. 0.35, -0.4)
  rotateSpeed?: number; // Angular tilt (e.g. 0.02)
  scaleDelta?: number;  // Scale variation factor
  maxTranslateY?: number;
  maxTranslateX?: number;
}

/**
 * High-performance viewport-relative scroll parallax hook.
 * Guarded by IntersectionObserver to eliminate off-screen getBoundingClientRect layout calls.
 */
export function useSectionParallax<T extends HTMLElement = HTMLDivElement>(
  config: SectionParallaxConfig = {}
) {
  const {
    speedY = 0.15,
    speedX = 0,
    rotateSpeed = 0,
    scaleDelta = 0,
    maxTranslateY = 160,
    maxTranslateX = 300,
  } = config;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    let rafId: number;
    let isIntersecting = false;

    const update = () => {
      if (!isIntersecting || !el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Normalized progress: -0.5 when at bottom edge, 0 when centered, +0.5 when at top edge
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = viewportCenter - elementCenter;

      // Raw offsets
      let transY = distanceFromCenter * speedY;
      let transX = distanceFromCenter * speedX;

      // Apply clamping if specified
      if (maxTranslateY > 0) {
        transY = Math.max(-maxTranslateY, Math.min(maxTranslateY, transY));
      }
      if (maxTranslateX > 0) {
        transX = Math.max(-maxTranslateX, Math.min(maxTranslateX, transX));
      }

      let transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0)`;

      if (rotateSpeed !== 0) {
        const rotation = (distanceFromCenter * rotateSpeed).toFixed(2);
        transform += ` rotate(${rotation}deg)`;
      }

      if (scaleDelta !== 0) {
        const progress01 = 1 - Math.min(1, Math.abs(distanceFromCenter) / (windowHeight * 0.8));
        const scale = (1 + progress01 * scaleDelta).toFixed(3);
        transform += ` scale(${scale})`;
      }

      el.style.transform = transform;
    };

    const handleScroll = () => {
      if (!isIntersecting) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          update();
        }
      },
      { rootMargin: '150px 0px 150px 0px' }
    );

    observer.observe(el);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speedY, speedX, rotateSpeed, scaleDelta, maxTranslateY, maxTranslateX]);

  return ref;
}
