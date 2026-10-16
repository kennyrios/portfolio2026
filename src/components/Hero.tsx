import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { MagneticElement } from './MagneticElement';
import { useSectionParallax } from '../hooks/useSectionParallax';
import { SectionParallaxWatermark } from './SectionParallaxWatermark';
import { LetterRevealHeadline } from './LetterRevealHeadline';
import bgBlueUrl from '../assets/bg_blue.png';

interface HeroProps {
  onExploreWorks: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWorks, onContactClick }) => {
  const statsParallaxRef = useSectionParallax<HTMLDivElement>({
    speedY: 0.08,
    maxTranslateY: 45,
  });

  const decorWireframeRef = useSectionParallax<HTMLDivElement>({
    speedY: -0.18,
    rotateSpeed: 0.01,
    maxTranslateY: 80,
  });

  return (
    <div className="relative w-full overflow-hidden bg-[#09090b]">
      {/* Attached Artisanal Blue Background (bg_blue.png) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <img
          src={bgBlueUrl}
          alt=""
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top opacity-100 scale-[1.01]"
        />
        {/* Soft bottom vignette to dissolve into dark background */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-transparent" />
        {/* Subtle dark film glaze to preserve pristine typography contrast */}
        <div className="absolute inset-0 bg-[#09090b]/15 mix-blend-multiply" />
      </div>

      <section className="relative min-h-[85vh] flex flex-col justify-between pt-16 sm:pt-24 pb-16 px-6 max-w-7xl mx-auto z-10">
      {/* Background Architectural Parallax Elements */}
      <SectionParallaxWatermark
        number="00"
        title="CALGARY / SENIOR ARCHITECT"
        speedY={-0.12}
        align="right"
        accent="amber"
      />

      {/* Subtle Floating Parallax Architectural Grid lines */}
      <div
        ref={decorWireframeRef}
        className="absolute top-1/4 right-8 w-64 h-64 border border-dashed border-white/[0.06] rounded-full pointer-events-none -z-10 will-change-transform hidden lg:block"
      />

      {/* Top Meta Status Strip */}
      <ScrollReveal variant="fade-up" delay={50} duration={600}>
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-zinc-200 font-medium">Based in Calgary, Canada</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <span>Available for Selected Engagements</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <a
              href="mailto:kennyrgrafico@gmail.com"
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              kennyrgrafico@gmail.com
            </a>
          </div>
          <div className="text-zinc-500 hidden sm:block tracking-wider uppercase text-[11px]">
            <span>Web Architecture · Dynamic Systems · UI/UX Research</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Editorial Hero Headline */}
      <div className="my-auto py-12 lg:py-20">
        <div className="max-w-5xl space-y-8">
          <ScrollReveal variant="fade-up" delay={120} duration={600}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Senior Web Designer & Frontend Architect</span>
            </div>
          </ScrollReveal>

          <LetterRevealHeadline
            text="Crafting conversion-driven web systems & tactile digital experiences."
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-[4.75rem] leading-[1.08]"
            staggerMs={30}
            durationMs={950}
            initialDelayMs={140}
          />

          <ScrollReveal variant="fade-up" delay={280} duration={700}>
            <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl text-balance">
              Over 8 years architecting scalable web ecosystems, dynamic CMS frameworks, interactive map engines, and design systems for premier North American enterprises—including Avenue Living Asset Management and Mini Mall Storage Properties.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={360} duration={650}>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <MagneticElement radius={75} strength={0.35} innerStrength={0.15}>
                <button
                  type="button"
                  onClick={onExploreWorks}
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold font-mono text-xs rounded-full transition-all shadow-xl cursor-pointer hover:scale-[1.02]"
                >
                  <span>Explore Selected Works</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </MagneticElement>

              <MagneticElement radius={75} strength={0.35} innerStrength={0.15}>
                <button
                  type="button"
                  onClick={onContactClick}
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-mono font-medium rounded-full transition-all cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              </MagneticElement>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Impact Metric Ribbons with Subtle Scroll Float */}
      <div ref={statsParallaxRef} className="pt-10 border-t border-white/[0.08] will-change-transform">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <ScrollReveal variant="fade-up" delay={100} duration={600}>
            <div className="border-l border-white/15 pl-4">
              <p className="text-3xl sm:text-4xl font-display font-semibold text-white tabular-nums">
                25+
              </p>
              <p className="text-xs text-zinc-400 font-mono mt-1">Shipped Web Platforms</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={600}>
            <div className="border-l border-white/15 pl-4">
              <p className="text-3xl sm:text-4xl font-display font-semibold text-white tabular-nums">
                8+
              </p>
              <p className="text-xs text-zinc-400 font-mono mt-1">Years Design & Dev Exp</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={300} duration={600}>
            <div className="border-l border-white/15 pl-4">
              <p className="text-3xl sm:text-4xl font-display font-semibold text-white tabular-nums">
                15,000+
              </p>
              <p className="text-xs text-zinc-400 font-mono mt-1">Real Estate Assets Mapped</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={400} duration={600}>
            <div className="border-l border-white/15 pl-4">
              <p className="text-3xl sm:text-4xl font-display font-semibold text-white tabular-nums">
                +55%
              </p>
              <p className="text-xs text-zinc-400 font-mono mt-1">Average Page Speed Gains</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  </div>
);
};
