import React, { useState } from 'react';
import { RealProject } from '../types/portfolio';
import { REAL_PROJECTS } from '../data/portfolioData';
import { RealProjectCard } from './RealProjectCard';
import { ScrollReveal } from './ScrollReveal';
import { MagneticElement } from './MagneticElement';
import { LayoutGrid, List, ArrowUpRight } from 'lucide-react';
import { SectionParallaxWatermark } from './SectionParallaxWatermark';

interface ProjectsSectionProps {
  onSelectProject: (project: RealProject) => void;
}

type FilterCategory = 'All' | 'Web Development' | 'Product & UI/UX' | 'Branding & Packaging';
type ViewMode = 'grid' | 'index';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredProjects = REAL_PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  const categories: { label: FilterCategory; count: number }[] = [
    { label: 'All', count: REAL_PROJECTS.length },
    { label: 'Web Development', count: REAL_PROJECTS.filter((p) => p.category === 'Web Development').length },
    { label: 'Product & UI/UX', count: REAL_PROJECTS.filter((p) => p.category === 'Product & UI/UX').length },
    { label: 'Branding & Packaging', count: REAL_PROJECTS.filter((p) => p.category === 'Branding & Packaging').length },
  ];

  return (
    <section id="works" className="relative py-36 sm:py-44 px-6 sm:px-10 max-w-7xl mx-auto z-10">
      {/* Background Dimensional Parallax Watermark */}
      <SectionParallaxWatermark
        number="01"
        title="SELECTED PRODUCTION WORKS"
        speedY={-0.14}
        align="right"
        accent="amber"
      />

      {/* Section Header with Mathis Biabiany Editorial Precision */}
      <ScrollReveal variant="fade-up" duration={650}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 sm:mb-28 pb-10 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
                (0{REAL_PROJECTS.length}) Selected Works · Production Portfolio
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white">
              Featured Works & Impact
            </h2>
            <p className="text-sm sm:text-base font-light text-zinc-400 max-w-xl">
              High-velocity enterprise platforms, interactive mapping engines, and bespoke digital design systems engineered for scale.
            </p>
          </div>

          {/* Controls: View Mode Toggle & Category Filters */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            {/* View Mode Toggle (Visual Showcase vs Index List) */}
            <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Broken Staggered Visual Cards"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Staggered</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('index')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                  viewMode === 'index'
                    ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Index Archive Table"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Index</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              {categories.map((cat) => {
                const isActive = filter === cat.label;
                return (
                  <MagneticElement key={cat.label} radius={45} strength={0.25} innerStrength={0.1}>
                    <button
                      type="button"
                      onClick={() => setFilter(cat.label)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`ml-1.5 text-[10px] ${isActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
                        [{cat.count}]
                      </span>
                    </button>
                  </MagneticElement>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* VIEW 1: Broken Grid Showcase with Opposing Scroll Parallax Tracks (Mathis Biabiany Style) */}
      {viewMode === 'grid' && (
        <div className="relative">
          {filteredProjects.length === 1 ? (
            /* Single item showcase (e.g. when filtering single category) */
            <div className="max-w-xl mx-auto">
              <ScrollReveal variant="fade-up" duration={700}>
                <RealProjectCard
                  project={filteredProjects[0]}
                  onOpenModal={onSelectProject}
                  index={0}
                  columnSpeed={0.05}
                />
              </ScrollReveal>
            </div>
          ) : (
            /* Broken Asymmetrical Grid with Opposing Scroll Parallax Tracks and Generous Breathing Room */
            <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16 lg:gap-24 xl:gap-28">
              {/* Column 1 (Left Track): Starts at standard baseline */}
              <div className="w-full md:w-[48%] lg:w-[46%] max-w-[500px] flex flex-col space-y-20 sm:space-y-28 lg:space-y-36">
                {filteredProjects
                  .filter((_, idx) => idx % 2 === 0)
                  .map((project, colIdx) => {
                    const actualIdx = colIdx * 2;
                    const delay = (colIdx * 100) % 300;
                    return (
                      <ScrollReveal
                        key={project.id}
                        variant="fade-up"
                        delay={delay}
                        duration={750}
                        distance={32}
                      >
                        <RealProjectCard
                          project={project}
                          onOpenModal={onSelectProject}
                          index={actualIdx}
                          columnIndex={0}
                          columnSpeed={0.09}
                          className="w-full"
                        />
                      </ScrollReveal>
                    );
                  })}
              </div>

              {/* Column 2 (Right Track): Staggered broken offset with downward translation */}
              <div className="w-full md:w-[48%] lg:w-[46%] max-w-[500px] flex flex-col space-y-20 sm:space-y-28 lg:space-y-36 md:pt-28 lg:pt-40 xl:pt-48">
                {filteredProjects
                  .filter((_, idx) => idx % 2 !== 0)
                  .map((project, colIdx) => {
                    const actualIdx = colIdx * 2 + 1;
                    const delay = (colIdx * 100 + 80) % 300;
                    return (
                      <ScrollReveal
                        key={project.id}
                        variant="fade-up"
                        delay={delay}
                        duration={750}
                        distance={32}
                      >
                        <RealProjectCard
                          project={project}
                          onOpenModal={onSelectProject}
                          index={actualIdx}
                          columnIndex={1}
                          columnSpeed={-0.08}
                          className="w-full"
                        />
                      </ScrollReveal>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: Index / Archive Table (Mathis Biabiany Interactive Archive List) */}
      {viewMode === 'index' && (
        <div className="border border-white/[0.08] bg-[#121216]/80 rounded-3xl overflow-hidden backdrop-blur-md divide-y divide-white/[0.06]">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-white/[0.02] text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Project / Client</div>
            <div className="col-span-3">Discipline</div>
            <div className="col-span-2">Year / Place</div>
            <div className="col-span-2 text-right">Details</div>
          </div>

          {/* Table Rows */}
          {filteredProjects.map((project, idx) => {
            const number = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 px-6 sm:px-8 py-5 sm:py-6 items-center hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                {/* Index & Pulse */}
                <div className="md:col-span-1 flex items-center gap-2 font-mono text-xs text-zinc-500 group-hover:text-zinc-200">
                  <span>/{number}</span>
                </div>

                {/* Title & Client */}
                <div className="md:col-span-4 space-y-1">
                  <h4 className="text-lg sm:text-xl font-display font-medium text-white group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400">
                    {project.client}
                  </p>
                </div>

                {/* Category & Tech */}
                <div className="md:col-span-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.accentColor || '#38bdf8' }}
                    />
                    {project.category}
                  </span>
                  <div className="hidden sm:block text-[11px] font-mono text-zinc-500 mt-1 truncate">
                    {project.technologies.slice(0, 3).join(' · ')}
                  </div>
                </div>

                {/* Year & Location */}
                <div className="md:col-span-2 text-xs font-mono text-zinc-400">
                  <p>{project.year}</p>
                  <p className="text-zinc-500">{project.location}</p>
                </div>

                {/* Action Button */}
                <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] group-hover:bg-white text-zinc-300 group-hover:text-zinc-950 font-mono text-xs font-medium border border-white/10 group-hover:border-white transition-all shadow-xs">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
