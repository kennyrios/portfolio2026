import React, { useEffect, useState, useRef } from 'react';
import { KennyLogo } from './KennyLogo';
import { ArrowDown } from 'lucide-react';

interface IntroScrollHeroProps {
  onScrollDown: () => void;
}

export const IntroScrollHero: React.FC<IntroScrollHeroProps> = ({ onScrollDown }) => {
  const [scrollY, setScrollY] = useState(0);
  const isPastIntro = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // Only update React state while near intro range to prevent redundant renders down-page
          if (currentY <= 480) {
            isPastIntro.current = false;
            setScrollY(currentY);
          } else if (!isPastIntro.current) {
            // Once clamped at or past 480, lock it once so opacity remains 0 and stop re-rendering
            isPastIntro.current = true;
            setScrollY(480);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute scroll-linked progress (0 at top, 1 at 380px scroll)
  const maxScroll = 380;
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

  // Visual transformations linked directly to scroll
  const scale = 1 - progress * 0.45; // scales from 1.0 down to 0.55
  const translateY = progress * -100; // gentle upward translation
  const opacity = 1 - Math.pow(progress, 2); // smooth fade out as user scrolls

  // NEVER return null - keeping container dimensions stable prevents page height collapse & scroll shuddering
  const isHidden = progress >= 1;

  return (
    <div
      className={`relative w-full min-h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden select-none transition-opacity duration-150 z-10 ${
        isHidden ? 'pointer-events-none' : ''
      }`}
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        visibility: isHidden ? 'hidden' : 'visible',
      }}
      aria-hidden={isHidden}
    >
      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[520px] h-[260px] border border-dashed border-zinc-300 rounded-2xl" />
        <div className="absolute w-[620px] h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
        <div className="absolute h-[340px] w-[1px] bg-gradient-to-b from-transparent via-zinc-300 to-transparent" />
      </div>

      {/* Main Logo Intro Container */}
      <div className="relative flex flex-col items-center text-center space-y-8 z-10">
        {/* The Animated Logo */}
        <div
          className="relative transition-transform duration-75"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <KennyLogo
            className="w-64 sm:w-80 md:w-96 h-auto drop-shadow-xs"
            fillColor="#18181b"
            accentColor="#d97706"
          />

          {/* Subtle painterly highlight glow on monogram */}
          <div
            className="absolute -inset-4 rounded-3xl bg-amber-200/25 blur-xl -z-10 transition-opacity duration-500"
            style={{ opacity: 1 - progress }}
          />
        </div>

        {/* Brand Subtitle & Role */}
        <div className="space-y-2 pointer-events-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 font-semibold">
            Product Designer & Web Developer
          </p>
          <p className="text-sm font-light text-zinc-400">
            Avenue Living · Mini Mall Storage · Able Group
          </p>
        </div>

        {/* Scroll Cue Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="pointer-events-auto mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-mono hover:bg-zinc-800 transition-all shadow-md cursor-pointer group"
        >
          <span>Scroll to paint & enter portfolio</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom coordinate tick marks */}
      <div className="absolute bottom-6 flex items-center gap-8 text-[11px] font-mono text-zinc-400">
        <span>01 // MONOGRAM</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span>SCROLL PROGRESS: {(progress * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};
