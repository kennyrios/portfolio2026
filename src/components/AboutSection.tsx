import React from 'react';
import { SKILLS_SERVICES } from '../data/portfolioData';
import { TechnicalCapabilitiesMatrix } from './TechnicalCapabilitiesMatrix';
import { ScrollReveal } from './ScrollReveal';
import { SectionParallaxWatermark } from './SectionParallaxWatermark';
import { useSectionParallax } from '../hooks/useSectionParallax';

export const AboutSection: React.FC = () => {
  const bioColumnParallaxRef = useSectionParallax<HTMLDivElement>({
    speedY: 0.07,
    maxTranslateY: 40,
  });

  return (
    <section id="about" className="relative py-36 sm:py-44 px-6 sm:px-10 max-w-7xl mx-auto z-10 space-y-36 sm:space-y-44">
      {/* Background Dimensional Parallax Watermark */}
      <SectionParallaxWatermark
        number="02"
        title="PHILOSOPHY & CAPABILITIES"
        speedY={-0.15}
        align="left"
        accent="cyan"
      />

      {/* 1. Bio & Background */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-white/[0.08]">
        <div ref={bioColumnParallaxRef} className="lg:col-span-5 space-y-4 will-change-transform">
          <ScrollReveal variant="fade-up" duration={650}>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-medium">
              About Kenny Rios
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100} duration={700}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white leading-tight">
              A developer’s precision with a designer’s eye.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={200} duration={650}>
            <div className="pt-2 text-xs font-mono text-zinc-400 space-y-1.5">
              <p>Based in Calgary, Canada · Remote & Hybrid</p>
              <p>Direct: <span className="text-white font-medium">kennyrgrafico@gmail.com</span></p>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed font-light">
          <ScrollReveal variant="fade-up" delay={120} duration={650}>
            <p>
              I am a <strong className="text-white font-medium">Senior Web Developer and UI/UX Designer</strong> with over eight years of hands-on experience designing and engineering conversion-focused websites, customer portals, and brand experiences.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={220} duration={650}>
            <p>
              In my current and recent roles, I have spearheaded major web overhauls for top Canadian and North American enterprises, notably <strong className="text-white">Avenue Living Asset Management</strong> (one of Canada’s largest real estate asset managers) and <strong className="text-white">Mini Mall Storage Properties</strong> (spanning 60+ locations across Canada and the US).
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={320} duration={650}>
            <p>
              My work is characterized by clean visual discipline, scalable CMS architecture, dynamic interactive maps (Mapbox), and robust design systems. I operate comfortably across the full lifecycle—from user research and Figma prototyping to production PHP, WordPress, React, and TypeScript codebases.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* 2. Technical Capabilities Matrix (Detailed 6-Domain Breakdown) */}
      <TechnicalCapabilitiesMatrix />

      {/* 3. Services & Core Disciplines */}
      <div>
        <ScrollReveal variant="fade-up" duration={650}>
          <div className="mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-medium mb-2">
              Disciplines
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-white">
              Services & Practical Execution
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SKILLS_SERVICES.map((serv, idx) => (
            <ScrollReveal
              key={serv.number}
              variant="fade-up"
              delay={idx * 140}
              duration={700}
              distance={28}
              className="h-full"
            >
              <div
                className="p-8 bg-[#121216]/80 hover:bg-[#16161c] border border-white/[0.08] hover:border-white/20 rounded-3xl transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl h-full group"
              >
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                    {serv.number}.
                  </span>
                  <h4 className="text-xl font-display font-medium text-white group-hover:text-amber-300 transition-colors">
                    {serv.title}
                  </h4>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {serv.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-[11px] font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
