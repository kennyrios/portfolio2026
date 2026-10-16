import { useEffect, useRef } from 'react';

interface LayerConfig {
  ref: React.RefObject<HTMLDivElement | null>;
  speedY: number;
  speedX?: number;
  mouseStrength?: number;
}

export function useParallaxBackground(layers: LayerConfig[]) {
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    let isRunning = false;

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(update);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
      startLoop();
    };

    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY || window.pageYOffset || 0;
      startLoop();
    };

    scrollRef.current.targetY = window.scrollY || window.pageYOffset || 0;
    scrollRef.current.y = scrollRef.current.targetY;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const update = () => {
      // Lerp mouse
      const mouseDiffX = mouseRef.current.targetX - mouseRef.current.x;
      const mouseDiffY = mouseRef.current.targetY - mouseRef.current.y;
      mouseRef.current.x += mouseDiffX * 0.08;
      mouseRef.current.y += mouseDiffY * 0.08;

      // Lerp scroll
      const scrollDiff = scrollRef.current.targetY - scrollRef.current.y;
      scrollRef.current.y += scrollDiff * 0.12;

      const currentScrollY = scrollRef.current.y;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < layers.length; i++) {
        const { ref, speedY, speedX = 0, mouseStrength = 0 } = layers[i];
        if (!ref.current) continue;

        const transY = currentScrollY * speedY + my * mouseStrength;
        const transX = speedX * (currentScrollY * 0.05) + mx * mouseStrength;

        ref.current.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0)`;
      }

      // Check if settled to stop running RAF loop unnecessarily
      const isSettled =
        Math.abs(scrollDiff) < 0.2 &&
        Math.abs(mouseDiffX) < 0.002 &&
        Math.abs(mouseDiffY) < 0.002;

      if (!isSettled) {
        rafId = requestAnimationFrame(update);
      } else {
        isRunning = false;
      }
    };

    // Initial render
    startLoop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [layers]);
}
