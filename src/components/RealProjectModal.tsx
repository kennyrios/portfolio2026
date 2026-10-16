import React, { useEffect } from 'react';
import { RealProject } from '../types/portfolio';
import { X, ExternalLink, MapPin, Calendar, User, TrendingUp, CheckCircle, Code2, Globe } from 'lucide-react';
import { useLenis } from '../context/LenisContext';
import { MagneticElement } from './MagneticElement';

interface RealProjectModalProps {
  project: RealProject | null;
  onClose: () => void;
}

export const RealProjectModal: React.FC<RealProjectModalProps> = ({ project, onClose }) => {
  const { lenis } = useLenis();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, lenis]);

  if (!project) return null;

  const accentColor = project.accentColor || '#38bdf8';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0f0f14] border border-white/10 rounded-3xl shadow-2xl flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#0f0f14]/95 border-b border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.05] text-zinc-300 border border-white/10">
              {project.category}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 font-medium">{project.client}</span>
          </div>

          <MagneticElement radius={60} strength={0.4}>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors cursor-pointer border border-transparent hover:border-white/10"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </MagneticElement>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
              <span>{project.location}</span>
              <span className="text-zinc-600">·</span>
              <span>{project.year}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-amber-400 font-medium">{project.role}</span>
            </div>
            <h2 id="modal-project-title" className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white mb-4">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl">
              {project.summary}
            </p>
          </div>

          {/* Media Showcase with Browser Chrome */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#09090b] shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#141418] border-b border-white/[0.08] text-[11px] font-mono text-zinc-400 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-zinc-400 font-mono text-xs truncate max-w-sm">
                https://{project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/showcase
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase font-mono text-emerald-400">Production</span>
              </div>
            </div>

            <div className="relative w-full max-h-[500px] overflow-hidden flex items-center justify-center bg-[#09090b]">
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-auto max-h-[500px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Impact Metrics Breakdown */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Verified Business & Performance Outcomes</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                  >
                    <p className="text-2xl sm:text-3xl font-display font-semibold text-white tabular-nums">
                      {m.value}
                    </p>
                    <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep Description & Architecture */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>Project Architecture & Strategic Execution</span>
            </h3>
            <p className="text-zinc-300 font-light leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Technologies Used */}
          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-zinc-400" />
              <span>Core Technologies & Tooling</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-zinc-200 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-zinc-400">
              <span>Client: </span>
              <strong className="text-white font-medium">{project.client}</strong>
              <span className="mx-2">·</span>
              <span>Year: </span>
              <strong className="text-white font-medium">{project.year}</strong>
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <MagneticElement radius={60} strength={0.35}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-mono font-semibold transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </MagneticElement>
              )}
              {project.figmaUrl && (
                <MagneticElement radius={60} strength={0.35}>
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white text-zinc-300 hover:text-zinc-950 border border-white/10 hover:border-white text-xs font-mono font-medium transition-colors cursor-pointer"
                  >
                    <span>View Interactive Figma Prototype</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </MagneticElement>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
