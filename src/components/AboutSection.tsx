import React from 'react';
import { SKILLS_SERVICES } from '../data/portfolioData';
import { TechnicalCapabilitiesMatrix } from './TechnicalCapabilitiesMatrix';
import { ScrollReveal } from './ScrollReveal';
import { SectionParallaxWatermark } from './SectionParallaxWatermark';
import { useSectionParallax } from '../hooks/useSectionParallax';
import { MapPin, Terminal, Layers, Cpu } from 'lucide-react';

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

      {/* 1. Bio & Background — Focused on Full-Stack Developer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-white/[0.08]">
        <div ref={bioColumnParallaxRef} className="lg:col-span-5 space-y-4 will-change-transform">
          <ScrollReveal variant="fade-up" duration={650}>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-medium flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Full-Stack Engineering & Craft</span>
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100} duration={700}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white leading-tight">
              A developer’s precision with a designer’s eye.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={200} duration={650}>
            <div className="pt-2 text-xs font-mono text-zinc-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>Calgary, Alberta, Canada · Remote & Hybrid</span>
              </p>
              <p>Direct: <span className="text-white font-medium">kennyrgrafico@gmail.com</span></p>
              <p>Phone: <span className="text-white font-medium">+1 587 836 9256</span></p>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed font-light">
          <ScrollReveal variant="fade-up" delay={120} duration={650}>
            <p>
              I am a <strong className="text-white font-medium">Full-Stack Web Developer and Digital Solutions Specialist</strong> with over 14 years of hands-on experience engineering high-performance web applications, scalable CMS architectures, and interactive digital products.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={220} duration={650}>
            <p>
              My approach connects end-to-end engineering fundamentals—<strong className="text-white font-medium">React, Node.js, Python, PHP, JavaScript ES6+, TypeScript, and SQL databases</strong>—with cutting-edge AI-assisted development tools (<strong className="text-white font-medium">Claude Code, OpenAI Codex, Copilot, Google AI Studio</strong>). This enables me to scaffold architectures rapidly, automate boilerplate, and solve complex business logic with speed and precision.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={320} duration={650}>
            <p>
              In recent enterprise roles, I have led technical execution for flagship North American brands, notably <strong className="text-white font-medium">Avenue Living Asset Management</strong> (managing 15+ corporate web properties, interactive Mapbox geospatial mapping, and automated HubSpot/GA4 funnels) and <strong className="text-white font-medium">Mini Mall Storage Properties</strong> (scaling location search and conversion flows across 60+ North American sites).
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={420} duration={650}>
            <p>
              Because my background bridges graphic design rigor with full-stack engineering, I deliver solutions that are not only performant and structurally sound under the hood, but also visually refined, accessible (WCAG), and conversion-driven.
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
              Full-Stack Capabilities & Execution
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
