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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;

    const updateParallax = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only compute if card is within or near the viewport
      if (rect.bottom >= -250 && rect.top <= windowHeight + 250) {
        // Progress: 0 when top of card enters bottom of viewport, 1 when bottom of card leaves top
        const totalTravel = windowHeight + rect.height;
        const currentPosition = windowHeight - rect.top;
        const progress = currentPosition / totalTravel;
        const normalized = progress - 0.5; // ranges from -0.5 to +0.5

        const isMobile = window.innerWidth < 768;
        const effectiveSpeed = isMobile ? speed * 0.35 : speed;
        const effectiveImageSpeed = isMobile ? imageSpeed * 0.4 : imageSpeed;

        // Calculate card offset (up to ~60px translation)
        const cardY = normalized * effectiveSpeed * 150;
        
        containerRef.current.style.transform = `translate3d(0, ${cardY.toFixed(2)}px, 0)`;

        if (imageRef.current) {
          // Inner image travels smoothly to create spatial window depth
          const imgY = normalized * effectiveImageSpeed * 65;
          imageRef.current.style.transform = `translate3d(0, ${imgY.toFixed(2)}px, 0) scale(1.08)`;
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial calculation
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed, imageSpeed]);

  return { containerRef, imageRef };
}
