import React, { useState } from 'react';
import { RealProject } from '../types/portfolio';
import { REAL_PROJECTS } from '../data/portfolioData';
import { RealProjectCard } from './RealProjectCard';
import { ScrollReveal } from './ScrollReveal';
import { MagneticElement } from './MagneticElement';
import { Layers } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: RealProject) => void;
}

type FilterCategory = 'All' | 'Web Development' | 'Product & UI/UX' | 'Branding & Packaging' | 'Interactive Apps';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<FilterCategory>('All');

  const filteredProjects = REAL_PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  const categories: FilterCategory[] = [
    'All',
    'Web Development',
    'Product & UI/UX',
    'Branding & Packaging',
    'Interactive Apps',
  ];

  return (
    <section id="works" className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <ScrollReveal variant="fade-up" duration={650}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold">
                Selected Works · Real Client Production
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-zinc-950">
              Featured Projects & Impact Studies
            </h2>
            <p className="text-sm font-mono text-zinc-500 mt-2">
              Detailing live applications, design systems, and business outcomes
            </p>
          </div>

          {/* Clean Filter Controls with Magnetic Proximity */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-100/90 border border-zinc-200 rounded-xl self-start lg:self-auto backdrop-blur-xs">
            {categories.map((cat) => {
              const isActive = filter === cat;
              return (
                <MagneticElement
                  key={cat}
                  radius={50}
                  strength={0.25}
                  innerStrength={0.1}
                >
                  <button
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                </MagneticElement>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Projects Grid with Staggered Scroll Animations & Velocity-Responsive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project, idx) => {
          // Stagger slightly between columns
          const delay = (idx % 2) * 120;
          return (
            <ScrollReveal
              key={project.id}
              variant="fade-up"
              delay={delay}
              duration={700}
              distance={28}
            >
              <RealProjectCard
                project={project}
                onOpenModal={onSelectProject}
                index={idx}
              />
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
