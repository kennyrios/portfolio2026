import React, { useRef, useEffect } from 'react';
import { useSectionParallax } from '../hooks/useSectionParallax';

export interface SectionParallaxBridgeProps {
  sectionIndex: string; // e.g. "01 // 04"
  fromLabel: string;    // e.g. "HERO OVERVIEW"
  toLabel: string;      // e.g. "FEATURED WORKS"
  marqueePrimary: string[]; // e.g. ["SELECTED WORKS", "HIGH-VELOCITY CMS", "MAPBOX GL", "DESIGN SYSTEMS"]
  marqueeSecondary?: string[]; // e.g. ["CALGARY, CANADA", "ENTERPRISE ARCHITECTURE", "REACT 19", "TYPESCRIPT"]
  coordinates?: string; // e.g. "51.0447° N · 114.0719° W"
  accent?: 'amber' | 'cyan' | 'emerald';
  id?: string;
}

export const SectionParallaxBridge: React.FC<SectionParallaxBridgeProps> = ({
  sectionIndex,
  fromLabel,
  toLabel,
  marqueePrimary,
  marqueeSecondary = [
    'PERFORMANCE FIRST',
    'WCAG AA ACCESSIBLE',
    'MODULAR ARCHITECTURE',
    '60FPS COMPOSITING',
  ],
  coordinates = '51.0447° N · 114.0719° W',
  accent = 'amber',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const runnerDotRef = useRef<HTMLDivElement>(null);

  // Parallax hooks for counter-directional typographic runways
  const leftMarqueeRef = useSectionParallax<HTMLDivElement>({
    speedX: -0.28,
    speedY: 0.04,
    maxTranslateX: 240,
  });

  const rightMarqueeRef = useSectionParallax<HTMLDivElement>({
    speedX: 0.22,
    speedY: -0.04,
    maxTranslateX: 200,
  });

  const centerFloatingBadgeRef = useSectionParallax<HTMLDivElement>({
    speedY: 0.22,
    maxTranslateY: 70,
  });

  const ambientGlowRef = useSectionParallax<HTMLDivElement>({
    speedY: -0.15,
    maxTranslateY: 90,
  });

  // Track local progress across the bridge threshold for the dynamic ruler runner
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current || !runnerDotRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only update when close to or within the viewport
      if (rect.bottom >= -50 && rect.top <= windowHeight + 50) {
        const totalSpan = windowHeight + rect.height;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / totalSpan));
        runnerDotRef.current.style.left = `${(progress * 92 + 4).toFixed(1)}%`;
      }
    };

    const throttledScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const accentColorMap = {
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-400',
      glow: 'rgba(251, 191, 36, 0.12)',
      border: 'border-amber-400/30',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-400',
      glow: 'rgba(56, 189, 248, 0.12)',
      border: 'border-cyan-400/30',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-400',
      glow: 'rgba(52, 211, 153, 0.12)',
      border: 'border-emerald-400/30',
    },
  }[accent];

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full py-28 sm:py-36 lg:py-44 overflow-hidden select-none pointer-events-none z-10"
      aria-hidden="true"
    >
      {/* Floating Ambient Parallax Glow Portal */}
      <div
        ref={ambientGlowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[720px] h-[180px] rounded-full blur-[90px] -z-10 transition-transform duration-75"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColorMap.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Top Precision Architectural Hairline & Crosshair Grid */}
      <div className="relative max-w-7xl mx-auto px-6 mb-6">
        <div className="relative flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-widest pb-3">
          <div className="flex items-center gap-2">
            <span className={`${accentColorMap.text} font-semibold`}>+</span>
            <span>{fromLabel}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-zinc-600">COORDINATES</span>
            <span className="text-zinc-400">{coordinates}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>{toLabel}</span>
            <span className={`${accentColorMap.text} font-semibold`}>+</span>
          </div>
        </div>

        {/* Dynamic Precision Ruler with Animated Parallax Runner */}
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent">
          {/* Moving Glowing Runner Dot */}
          <div
            ref={runnerDotRef}
            className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${accentColorMap.bg} shadow-[0_0_10px_currentColor] will-change-[left]`}
            style={{ left: '4%' }}
          />
          {/* Micro tick marks */}
          <div className="absolute inset-0 flex justify-between px-8 opacity-40">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-[1px] h-1.5 -translate-y-0.5 bg-white/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Primary Kinetic Parallax Typography Runway (Slides Left) */}
      <div className="relative w-full overflow-hidden my-2">
        <div
          ref={leftMarqueeRef}
          className="flex whitespace-nowrap will-change-transform font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase"
        >
          {Array.from({ length: 4 }).map((_, rep) => (
            <div key={rep} className="flex items-center gap-8 shrink-0 pr-8">
              {marqueePrimary.map((item, idx) => (
                <React.Fragment key={`${rep}-${idx}`}>
                  <span className="text-zinc-700/60 transition-colors hover:text-zinc-400">
                    {item}
                  </span>
                  <span className={`${accentColorMap.text} text-xl sm:text-2xl font-light opacity-50`}>
                    /
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Center Parallax Section Stamp */}
      <div className="relative max-w-7xl mx-auto px-6 my-3">
        <div
          ref={centerFloatingBadgeRef}
          className="flex items-center justify-center will-change-transform"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#121216]/90 border border-white/[0.12] backdrop-blur-xl shadow-2xl">
            <span className={`w-1.5 h-1.5 rounded-full ${accentColorMap.bg} animate-pulse`} />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300 font-medium">
              TRANSITION {sectionIndex}
            </span>
            <span className="text-zinc-600 font-mono text-[10px]">·</span>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              CONTINUE SCROLLING
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Kinetic Parallax Typography Runway (Slides Right - Reverse Shear) */}
      <div className="relative w-full overflow-hidden my-2">
        <div
          ref={rightMarqueeRef}
          className="flex whitespace-nowrap will-change-transform font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-500/70"
          style={{ transform: 'translate3d(-100px, 0, 0)' }}
        >
          {Array.from({ length: 5 }).map((_, rep) => (
            <div key={rep} className="flex items-center gap-6 shrink-0 pr-6">
              {marqueeSecondary.map((item, idx) => (
                <React.Fragment key={`${rep}-${idx}`}>
                  <span className="hover:text-zinc-300 transition-colors">
                    {item}
                  </span>
                  <span className="text-zinc-700 text-xs font-serif">·</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Precision Hairline Ruler */}
      <div className="relative max-w-7xl mx-auto px-6 mt-6">
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};
