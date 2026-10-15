import React, { useState, useRef, MouseEvent } from 'react';
import { RealProject } from '../types/portfolio';
import { ArrowUpRight, ExternalLink, Globe, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

interface RealProjectCardProps {
  project: RealProject;
  onOpenModal: (project: RealProject) => void;
  index: number;
}

export const RealProjectCard: React.FC<RealProjectCardProps> = ({ project, onOpenModal, index }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt and glare coordinates on mouse move
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (-4deg to +4deg)
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    // Glare coordinates as percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      rotateX: Math.round(rotateX * 10) / 10,
      rotateY: Math.round(rotateY * 10) / 10,
      glareX,
      glareY,
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, opacity: 0 });
  };

  const projectNumber = String(index + 1).padStart(2, '0');
  const accentColor = project.accentColor || '#f59e0b';

  return (
    <div className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(project)}
        className="group relative h-full flex flex-col justify-between bg-white hover:bg-zinc-50/70 border border-zinc-200/90 hover:border-zinc-300 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-2xl cursor-pointer overflow-hidden transform-gpu"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Subtle dynamic interactive cursor glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-10"
          style={{
            opacity: tilt.opacity,
            background: `radial-gradient(circle 320px at ${tilt.glareX}% ${tilt.glareY}%, ${accentColor}33, transparent 75%)`,
          }}
        />

        {/* Ambient Top Glow Border Accent */}
        <div
          className="absolute top-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />

        {/* Card Header: Editorial Number, Category & Magnetic Trigger */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-zinc-400 group-hover:text-zinc-950 transition-colors">
                /{projectNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-zinc-100 text-zinc-700 border border-zinc-200/80 group-hover:border-zinc-300">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                {project.category}
              </span>
            </div>

            {/* Magnetic Proximity Action Badge */}
            <MagneticElement
              radius={70}
              strength={0.4}
              innerStrength={0.2}
              className="z-20"
            >
              <div
                className="flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full bg-zinc-50 group-hover:bg-zinc-900 border border-zinc-200 group-hover:border-zinc-900 text-zinc-600 group-hover:text-white text-xs font-mono transition-all duration-300 shadow-xs"
                title="View Case Study Details"
              >
                <span className="font-medium hidden sm:inline">Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </MagneticElement>
          </div>

          {/* Project Title & Client Strip */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
              <span className="font-semibold text-zinc-800">{project.client}</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>{project.location}</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span className="text-zinc-400">{project.year}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 group-hover:text-zinc-900 tracking-tight leading-snug">
              {project.title}
            </h3>
          </div>

          {/* Impact Summary */}
          <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6">
            {project.summary}
          </p>
        </div>

        {/* Media Showcase Container with Browser Window Styling */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-950 mb-6 group/img shadow-sm group-hover:shadow-md transition-shadow">
          {/* Browser Chrome Header Strip */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900/90 border-b border-zinc-800 text-[10px] font-mono text-zinc-400 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
            </div>
            <div className="truncate max-w-[180px] sm:max-w-[240px] text-zinc-500 px-2 py-0.5 rounded bg-zinc-950/60 border border-zinc-800/80 text-center">
              {project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.digital
            </div>
            <div className="flex items-center gap-1 text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-emerald-400">Live</span>
            </div>
          </div>

          {/* Media Body */}
          <div className="relative h-56 sm:h-64 w-full bg-zinc-900 flex items-center justify-center overflow-hidden">
            {imageError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 text-white">
                <Globe className="w-8 h-8 text-amber-400 mb-2" />
                <p className="text-base font-display font-semibold text-zinc-100">{project.title}</p>
                <p className="text-xs font-mono text-zinc-400 mt-1">{project.technologies.slice(0, 3).join(' · ')}</p>
              </div>
            ) : (
              <>
                <img
                  src={project.imageUrl}
                  alt={`${project.title} showcase`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center">
                    <span className="text-xs font-mono text-zinc-500">Loading preview...</span>
                  </div>
                )}
              </>
            )}

            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Quick Hover Overlay Badge with Magnetic Proximity */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <MagneticElement radius={60} strength={0.35}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-zinc-900 font-mono text-xs font-semibold shadow-lg backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Inspect Case Study</span>
                </span>
              </MagneticElement>
            </div>
          </div>
        </div>

        {/* Impactful Metrics Ribbon directly on the card to detail the project */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 p-3.5 bg-zinc-50/90 border border-zinc-200/80 rounded-2xl">
            {project.metrics.slice(0, 3).map((m, mIdx) => (
              <div key={mIdx} className="border-l-2 pl-2.5 py-0.5" style={{ borderColor: accentColor }}>
                <p className="text-lg sm:text-xl font-display font-bold text-zinc-950 tabular-nums leading-tight">
                  {m.value}
                </p>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider truncate">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Technology Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech, tIdx) => (
            <span
              key={tech}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-colors ${
                tIdx === 0
                  ? 'bg-zinc-900 text-white border-zinc-900 font-medium'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 group-hover:border-zinc-300'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 text-[11px] font-mono text-zinc-400">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Card Footer: Role & Magnetic Action Links */}
        <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span className="text-zinc-400">Role:</span>
            <span className="text-zinc-800 font-medium truncate max-w-[180px] sm:max-w-[220px]">
              {project.role}
            </span>
          </div>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {project.liveUrl && (
              <MagneticElement radius={60} strength={0.3}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-900 text-zinc-700 hover:text-white border border-zinc-200/90 hover:border-zinc-900 font-medium transition-all duration-200 cursor-pointer"
                >
                  <span>Live Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </MagneticElement>
            )}
            {project.figmaUrl && (
              <MagneticElement radius={60} strength={0.3}>
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-900 text-zinc-700 hover:text-white border border-zinc-200/90 hover:border-zinc-900 font-medium transition-all duration-200 cursor-pointer"
                >
                  <span>Figma</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </MagneticElement>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
