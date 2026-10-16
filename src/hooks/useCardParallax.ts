import { useEffect, useRef } from 'react';

interface UseCardParallaxOptions {
  speed?: number;       // Parallax intensity multiplier, e.g. 0.09 or -0.07
  imageSpeed?: number;  // Inner image pan multiplier, e.g. 0.05
}

export function useCardParallax({ speed = 0.08, imageSpeed = 0.05 }: UseCardParallaxOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let isIntersecting = false;

    const updateParallax = () => {
      if (!isIntersecting || !container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress: 0 when top of card enters bottom of viewport, 1 when bottom leaves top
      const totalTravel = windowHeight + rect.height;
      const currentPosition = windowHeight - rect.top;
      const progress = currentPosition / totalTravel;
      const normalized = progress - 0.5; // ranges from -0.5 to +0.5

      const isMobile = window.innerWidth < 768;
      const effectiveSpeed = isMobile ? speed * 0.35 : speed;
      const effectiveImageSpeed = isMobile ? imageSpeed * 0.4 : imageSpeed;

      // Calculate card offset
      const cardY = normalized * effectiveSpeed * 150;
      container.style.transform = `translate3d(0, ${cardY.toFixed(1)}px, 0)`;

      if (imageRef.current) {
        const imgY = normalized * effectiveImageSpeed * 65;
        imageRef.current.style.transform = `translate3d(0, ${imgY.toFixed(1)}px, 0) scale(1.06)`;
      }
    };

    const handleScroll = () => {
      if (!isIntersecting) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateParallax);
    };

    // Use IntersectionObserver to disable scroll calculations when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          updateParallax();
        }
      },
      { rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(container);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed, imageSpeed]);

  return { containerRef, imageRef };
}
