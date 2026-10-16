import React, { useEffect, useState, useRef } from 'react';

interface LetterRevealHeadlineProps {
  text?: string;
  className?: string;
  staggerMs?: number; // ms between each character
  durationMs?: number; // duration of individual character reveal
  initialDelayMs?: number; // initial delay before sequence starts
}

export const LetterRevealHeadline: React.FC<LetterRevealHeadlineProps> = ({
  text = 'Crafting conversion-driven web systems & tactile digital experiences.',
  className = '',
  staggerMs = 32,
  durationMs = 950,
  initialDelayMs = 120,
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHasStarted(true);
      return;
    }

    let debounceTimer: any = null;

    // Use IntersectionObserver as primary driver with threshold margin
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            if (!isVisibleRef.current) {
              isVisibleRef.current = true;
              clearTimeout(debounceTimer);
              debounceTimer = setTimeout(() => {
                setHasStarted(true);
              }, 80);
            }
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
            if (isVisibleRef.current) {
              isVisibleRef.current = false;
              clearTimeout(debounceTimer);
              setHasStarted(false);
            }
          }
        });
      },
      {
        threshold: [0, 0.2, 0.5],
        rootMargin: '-30px 0px -30px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, []);

  // Split text into words, then words into characters with running global index from left to right
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <h1
      ref={containerRef}
      className={`font-display font-medium tracking-tight text-white leading-[1.04] text-balance ${className}`}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="inline">
        {words.map((word, wordIdx) => {
          const chars = word.split('');
          const isAmpersand = word === '&';

          return (
            <span
              key={`word-${wordIdx}`}
              className="inline-block whitespace-nowrap align-top mr-[0.24em] last:mr-0"
            >
              {chars.map((char, charIdx) => {
                const currentIndex = globalCharIndex++;
                // Progressive delay from left to right across the sentence
                const delay = hasStarted ? initialDelayMs + currentIndex * staggerMs : 0;

                return (
                  <span
                    key={`char-${wordIdx}-${charIdx}`}
                    className="inline-block pt-[0.06em] pb-[0.18em] -mt-[0.06em] -mb-[0.18em] align-top overflow-visible"
                  >
                    <span
                      className={`inline-block will-change-transform select-none ${
                        isAmpersand
                          ? 'text-amber-400 font-light hover:text-amber-300'
                          : 'text-white hover:text-amber-200'
                      }`}
                      style={{
                        transitionProperty: 'transform, opacity, filter',
                        transitionDuration: hasStarted ? `${durationMs}ms` : '240ms',
                        transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
                        transitionDelay: `${delay}ms`,
                        transformOrigin: 'bottom left',
                        // Slower, artisanal crafty reveal: left-to-right drift, gentle baseline rise & micro-rotation
                        transform: hasStarted
                          ? 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
                          : 'translate3d(-24px, 8px, 0) rotate(-2.5deg) scale(0.95)',
                        opacity: hasStarted ? 1 : 0,
                        filter: hasStarted ? 'blur(0px)' : 'blur(6px)',
                      }}
                    >
                      {char}
                    </span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </h1>
  );
};
