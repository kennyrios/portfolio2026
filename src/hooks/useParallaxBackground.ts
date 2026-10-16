import { useEffect, useRef } from 'react';

interface LayerConfig {
  ref: React.RefObject<HTMLDivElement | null>;
  speedY: number; // Vertical scroll parallax multiplier (e.g., 0.12, 0.25, 0.4)
  speedX?: number; // Subtle horizontal drift or mouse reaction
  mouseStrength?: number; // Cursor micro-parallax factor (e.g. 15px)
}

export function useParallaxBackground(layers: LayerConfig[]) {
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to [-1, 1] relative to window center
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY || window.pageYOffset || 0;
    };

    // Initialize with current scroll
    scrollRef.current.targetY = window.scrollY || window.pageYOffset || 0;
    scrollRef.current.y = scrollRef.current.targetY;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth render loop (LERP)
    const update = () => {
      // Lerp mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Lerp scroll for buttery smooth gliding
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.1;

      const currentScrollY = scrollRef.current.y;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      layers.forEach(({ ref, speedY, speedX = 0, mouseStrength = 0 }) => {
        if (!ref.current) return;

        const transY = currentScrollY * speedY + my * mouseStrength;
        const transX = speedX * (currentScrollY * 0.05) + mx * mouseStrength;

        ref.current.style.transform = `translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0)`;
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [layers]);
}
