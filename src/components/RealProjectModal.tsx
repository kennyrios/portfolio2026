import React, { useEffect } from 'react';
import { RealProject } from '../types/portfolio';
import { X, ExternalLink, MapPin, Calendar, User, TrendingUp, CheckCircle, Code2 } from 'lucide-react';
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

  const accentColor = project.accentColor || '#f59e0b';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-zinc-200 rounded-3xl shadow-2xl flex flex-col text-zinc-900"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-white/95 border-b border-zinc-200 backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span
              className="font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200"
            >
              {project.category}
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-600 font-medium">{project.client}</span>
          </div>

          <MagneticElement radius={60} strength={0.4}>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer border border-transparent hover:border-zinc-200"
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
              <span>·</span>
              <span>{project.year}</span>
            </div>
            <h2 id="modal-project-title" className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-zinc-950 mb-4">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-3xl">
              {project.summary}
            </p>
          </div>

          {/* Media Showcase with Browser Chrome */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-md">
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-zinc-400 font-mono text-xs truncate max-w-sm">
                https://{project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/showcase
              </div>
              <div className="w-12" />
            </div>

            <div className="relative bg-zinc-900 flex items-center justify-center min-h-[320px] sm:min-h-[420px]">
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[500px] object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Metrics & Tangible Outcomes */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Verified Impact & Performance Metrics</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-zinc-50 border border-zinc-200 rounded-2xl">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="border-l-3 pl-4 py-1" style={{ borderColor: accentColor }}>
                    <p className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 tabular-nums">
                      {m.value}
                    </p>
                    <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Narrative & Role */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Engineering Execution & Architecture</span>
            </h3>
            <p className="text-sm sm:text-base text-zinc-700 font-light leading-relaxed bg-zinc-50/50 p-6 rounded-2xl border border-zinc-200/70">
              {project.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs font-mono">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <User className="w-3.5 h-3.5" />
                <span>Design & Dev Role</span>
              </div>
              <p className="text-zinc-900 font-semibold">{project.role}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>Client & Market</span>
              </div>
              <p className="text-zinc-900 font-semibold">{project.client} · {project.location}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Production Period</span>
              </div>
              <p className="text-zinc-900 font-semibold">{project.year}</p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
              Production Stack & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-lg text-xs font-mono text-zinc-800 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links with Magnetic Proximity */}
          <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <MagneticElement radius={70} strength={0.35}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs font-mono rounded-xl transition-all shadow-md hover:shadow-xl cursor-pointer"
                >
                  <span>Visit Production Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </MagneticElement>
            )}

            {project.figmaUrl && (
              <MagneticElement radius={70} strength={0.35}>
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-800 font-medium text-xs font-mono rounded-xl transition-all cursor-pointer"
                >
                  <span>Open Figma System</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </MagneticElement>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
