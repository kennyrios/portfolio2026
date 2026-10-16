import React from 'react';
import { useSectionParallax } from '../hooks/useSectionParallax';

export interface SectionParallaxWatermarkProps {
  number: string;        // e.g. "01"
  title: string;         // e.g. "SELECTED WORKS"
  speedY?: number;       // e.g. -0.16 (moves slower upwards as user scrolls down)
  align?: 'left' | 'right' | 'center';
  className?: string;
  accent?: 'amber' | 'cyan' | 'emerald';
}

export const SectionParallaxWatermark: React.FC<SectionParallaxWatermarkProps> = ({
  number,
  title,
  speedY = -0.15,
  align = 'left',
  className = '',
  accent = 'amber',
}) => {
  const parallaxRef = useSectionParallax<HTMLDivElement>({
    speedY,
    maxTranslateY: 140,
  });

  const alignmentClass = {
    left: 'left-0 sm:-left-8 text-left',
    right: 'right-0 sm:-right-8 text-right',
    center: 'left-1/2 -translate-x-1/2 text-center',
  }[align];

  const accentColor = {
    amber: 'text-amber-400/10',
    cyan: 'text-cyan-400/10',
    emerald: 'text-emerald-400/10',
  }[accent];

  return (
    <div
      ref={parallaxRef}
      className={`absolute top-0 ${alignmentClass} pointer-events-none select-none -z-10 overflow-hidden leading-none will-change-transform ${className}`}
      aria-hidden="true"
    >
      <div className="flex flex-col opacity-40">
        <span
          className="font-display font-black text-[9rem] sm:text-[14rem] lg:text-[18rem] tracking-tighter text-transparent stroke-zinc-700/30"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.07)',
          }}
        >
          {number}
        </span>
        <span className={`font-mono text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold -mt-8 sm:-mt-16 ml-2 sm:ml-4 ${accentColor}`}>
          {title}
        </span>
      </div>
    </div>
  );
};
