import React from 'react';
import { SKILLS_SERVICES } from '../data/portfolioData';
import { TechnicalCapabilitiesMatrix } from './TechnicalCapabilitiesMatrix';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-6 max-w-6xl mx-auto z-10 space-y-24">
      {/* 1. Bio & Background */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-zinc-200">
        <div className="lg:col-span-5 space-y-4">
          <ScrollReveal variant="fade-up" duration={650}>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold">
              About Kenny Rios
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100} duration={700}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-zinc-950">
              A developer’s mind with a designer’s eye.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={200} duration={650}>
            <div className="pt-2 text-xs font-mono text-zinc-500 space-y-1">
              <p>Based in Canada · Remote & Hybrid</p>
              <p>Direct: <span className="text-zinc-800 font-medium">kennyrgrafico@gmail.com</span></p>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7 space-y-5 text-base text-zinc-700 leading-relaxed font-light">
          <ScrollReveal variant="fade-up" delay={120} duration={650}>
            <p>
              I am a <strong className="text-zinc-950 font-medium">Senior Web Developer and UI/UX Designer</strong> with over eight years of hands-on experience designing and engineering conversion-focused websites, customer portals, and brand experiences.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={220} duration={650}>
            <p>
              In my current and recent roles, I have spearheaded major web overhauls for top Canadian and North American enterprises, notably <strong className="text-zinc-950">Avenue Living Asset Management</strong> (one of Canada’s largest real estate asset managers) and <strong className="text-zinc-950">Mini Mall Storage Properties</strong> (spanning 60+ locations across Canada and the US).
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={320} duration={650}>
            <p>
              My work is characterized by clean visual discipline, scalable CMS architecture, dynamic interactive maps (Mapbox), and robust design systems. I operate comfortably across the full lifecycle—from user research and Figma prototyping to production PHP, WordPress, React, and Vue codebases.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* 2. Technical Capabilities Matrix (Detailed 6-Domain Breakdown) */}
      <TechnicalCapabilitiesMatrix />

      {/* 3. Services & Core Disciplines */}
      <div>
        <ScrollReveal variant="fade-up" duration={650}>
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold mb-2">
              Disciplines
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-950">
              Services & Practical Execution
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="p-7 bg-white hover:bg-zinc-50/50 border border-zinc-200/90 hover:border-zinc-300 rounded-2xl transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md h-full"
              >
                <div className="space-y-4">
                  <span className="text-sm font-mono text-amber-700 font-semibold">
                    {serv.number}.
                  </span>
                  <h4 className="text-xl font-display font-bold text-zinc-950">
                    {serv.title}
                  </h4>
                  <p className="text-sm text-zinc-600 font-light leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-1.5">
                  {serv.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[11px] font-mono text-zinc-700"
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
