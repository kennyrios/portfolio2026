import React from 'react';
import { ArrowDown, ArrowUpRight, Paintbrush } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { MagneticElement } from './MagneticElement';

interface HeroProps {
  onExploreWorks: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWorks, onContactClick }) => {
  return (
    <section className="relative min-h-[86vh] flex flex-col justify-between pt-16 sm:pt-20 pb-12 px-6 max-w-6xl mx-auto z-10">
      {/* Top Location & Email Strip */}
      <ScrollReveal variant="fade-up" delay={50} duration={600}>
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-zinc-800 font-medium">Based in Canada</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span>Available for High-Impact Projects</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <a
              href="mailto:kennyrgrafico@gmail.com"
              className="text-amber-700 hover:text-amber-800 font-medium transition-colors"
            >
              kennyrgrafico@gmail.com
            </a>
          </div>
          <div className="text-zinc-400 hidden sm:block">
            <span>Web Engineering · Product UI/UX · Design Systems</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Editorial Headline */}
      <div className="my-auto py-12 lg:py-16">
        <div className="max-w-4xl space-y-6">
          <ScrollReveal variant="fade-up" delay={120} duration={600}>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold">
              Kenny Rios — Web Developer & UI/UX Designer
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={700}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-zinc-950 text-balance leading-[1.08]">
              Crafting conversion-driven web systems & tactile digital products.
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={280} duration={700}>
            <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl text-balance">
              Over 8 years architecting responsive web platforms, dynamic portals, and design systems for enterprise organizations in Canada and the United States. Currently leading web design and engineering at Avenue Living and Mini Mall Storage.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={360} duration={650}>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticElement radius={75} strength={0.35} innerStrength={0.15}>
                <button
                  type="button"
                  onClick={onExploreWorks}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm cursor-pointer hover:shadow-lg"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </MagneticElement>

              <MagneticElement radius={75} strength={0.35} innerStrength={0.15}>
                <button
                  type="button"
                  onClick={onContactClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 text-xs font-medium rounded-xl transition-all cursor-pointer hover:border-zinc-300 hover:shadow-sm"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              </MagneticElement>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Metric Strips & Thick Brush Prompt */}
      <div className="pt-8 border-t border-zinc-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <ScrollReveal variant="fade-up" delay={100} duration={600}>
            <p className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 tabular-nums">
              25+
            </p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">Shipped Web & UI Projects</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={600}>
            <p className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 tabular-nums">
              8+
            </p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">Years Design & Dev Experience</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={300} duration={600}>
            <p className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 tabular-nums">
              60+
            </p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">Enterprise Locations Mapped</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={400} duration={600}>
            <p className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 tabular-nums">
              100%
            </p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">Design-to-Code Delivery</p>
          </ScrollReveal>
        </div>

        {/* Prompt */}
        <ScrollReveal variant="fade-up" delay={500} duration={600}>
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono pt-4 border-t border-zinc-100">
            <div className="flex items-center gap-2">
              <Paintbrush className="w-3.5 h-3.5 text-amber-700" />
              <span>Scroll down or up to watch the wide artist brush actively paint across the canvas</span>
            </div>
            <span className="hidden sm:inline text-zinc-400">Extra thick flat stroke · Real-time brush head motion</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
