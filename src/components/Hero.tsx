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
              <span>Full-Stack Developer & Solutions Architect</span>
            </div>
          </ScrollReveal>

          <LetterRevealHeadline
            text="Crafting scalable web applications & high-performance digital systems."
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-[4.75rem] leading-[1.08]"
            staggerMs={30}
            durationMs={950}
            initialDelayMs={140}
          />

          <ScrollReveal variant="fade-up" delay={280} duration={700}>
            <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl text-balance">
              Full-Stack Web Developer with 14+ years of experience engineering robust web applications, scalable CMS platforms, custom APIs, and high-conversion digital systems. Combining solid engineering fundamentals (React, Node.js, Python, PHP, JavaScript ES6+) with AI-assisted tools (Copilot, Claude Code, OpenAI Codex, Google AI Studio) to build resilient, performance-tuned platforms for enterprise leaders including Avenue Living Asset Management and Mini Mall Storage Properties.
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

      {/* 14+ Years Design & Dev Trajectory Showcase */}
      <div ref={statsParallaxRef} className="pt-10 border-t border-white/[0.08] will-change-transform">
        <ScrollReveal variant="fade-up" delay={150} duration={600}>
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-2xl space-y-6">
            {/* Header: Core Experience Headline */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
              <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                <div className="border-l-2 border-amber-400 pl-4 shrink-0">
                  <span className="text-4xl sm:text-5xl font-display font-semibold text-white tabular-nums tracking-tight">
                    14+
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-amber-400 font-mono font-medium mt-0.5">
                    Years Design & Dev Trajectory
                  </span>
                </div>
                <div className="hidden sm:block h-12 w-px bg-white/10 shrink-0" />
                <p className="text-sm text-zinc-300 max-w-xl font-light leading-relaxed">
                  A continuous dual-discipline engineering practice bridging scalable web architectures, custom APIs, dynamic geospatial locators, and refined human-centered UI/UX systems.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start lg:self-center px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>2012 — Present · Enterprise & Digital Scale</span>
              </div>
            </div>

            {/* Meaningful Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">01 · Full-Stack Systems</p>
                <p className="text-sm font-medium text-white">Architecture & Backends</p>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  React, TypeScript, Node.js, Python, PHP, custom REST APIs, relational schemas, and enterprise headless CMS.
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">02 · UI/UX & Design Systems</p>
                <p className="text-sm font-medium text-white">Design Systems & Craft</p>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Figma-to-code fidelity, WCAG accessibility, fluid motion, component libraries, and conversion-optimized funnels.
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">03 · Geospatial & Data</p>
                <p className="text-sm font-medium text-white">Dynamic Asset Platforms</p>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Custom Mapbox multi-location locators, dynamic pricing engines, reservation funnels, and CRM pipelines.
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">04 · AI & High Velocity</p>
                <p className="text-sm font-medium text-white">Modern Tooling & Speed</p>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  AI-assisted workflows (Claude Code, Copilot, Codex, Gemini), Core Web Vitals optimization, and CI/CD pipelines.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </div>
);
};
