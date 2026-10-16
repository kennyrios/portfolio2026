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

  const maxScroll = 380;
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

  const scale = 1 - progress * 0.45;
  const translateY = progress * -100;
  const opacity = 1 - Math.pow(progress, 2);

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
        <div className="w-[520px] h-[260px] border border-dashed border-white/10 rounded-3xl" />
        <div className="absolute w-[620px] h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute h-[340px] w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
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
            className="w-64 sm:w-80 md:w-96 h-auto drop-shadow-2xl"
            fillColor="#ffffff"
            accentColor="#fbbf24"
          />

          {/* Subtle amber luminous highlight glow */}
          <div
            className="absolute -inset-6 rounded-full bg-amber-400/10 blur-3xl -z-10 transition-opacity duration-500"
            style={{ opacity: 1 - progress }}
          />
        </div>

        {/* Brand Subtitle & Role */}
        <div className="space-y-2 pointer-events-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 font-medium">
            Senior Web Designer & Frontend Architect
          </p>
          <p className="text-sm font-light text-zinc-500">
            Avenue Living · Mini Mall Storage · Able Group
          </p>
        </div>

        {/* Scroll Cue Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="pointer-events-auto mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-mono font-medium transition-all shadow-xl cursor-pointer group"
        >
          <span>Enter Portfolio</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom coordinate tick marks */}
      <div className="absolute bottom-6 flex items-center gap-8 text-[11px] font-mono text-zinc-500">
        <span>01 // MONOGRAM</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>SCROLL PROGRESS: {(progress * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};
