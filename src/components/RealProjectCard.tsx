import React, { useState, useRef, MouseEvent } from 'react';
import { RealProject } from '../types/portfolio';
import { ArrowUpRight, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { MagneticElement } from './MagneticElement';
import { useCardParallax } from '../hooks/useCardParallax';

interface RealProjectCardProps {
  project: RealProject;
  onOpenModal: (project: RealProject) => void;
  index: number;
  columnIndex?: number;
  columnSpeed?: number;
  className?: string;
}

export const RealProjectCard: React.FC<RealProjectCardProps> = ({
  project,
  onOpenModal,
  index,
  columnIndex = 0,
  columnSpeed,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax hook driving smooth vertical scroll float & inner media pan
  const effectiveSpeed = columnSpeed ?? (columnIndex === 0 ? 0.08 : -0.07);
  const { containerRef, imageRef } = useCardParallax({
    speed: effectiveSpeed,
    imageSpeed: 0.05,
  });

  // 3D tilt and subtle glare coordinates on mouse move
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, opacity: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (-3deg to +3deg)
    const rotateX = ((y - centerY) / centerY) * -2.8;
    const rotateY = ((x - centerX) / centerX) * 2.8;

    // Glare coordinates as percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      rotateX: Math.round(rotateX * 10) / 10,
      rotateY: Math.round(rotateY * 10) / 10,
      glareX,
      glareY,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, opacity: 0 });
  };

  const projectNumber = String(index + 1).padStart(2, '0');
  const accentColor = project.accentColor || '#38bdf8';

  return (
    <div
      ref={containerRef}
      className={`w-full will-change-transform transform-gpu transition-[transform] duration-75 ${className}`}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(project)}
        className="group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 cursor-pointer overflow-hidden transform-gpu"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          backgroundColor: isHovered ? '#151520' : 'rgba(18, 18, 22, 0.92)',
          borderColor: isHovered ? accentColor : 'rgba(255, 255, 255, 0.08)',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          boxShadow: isHovered
            ? `0 28px 70px -10px ${accentColor}60, 0 0 45px -5px ${accentColor}45, 0 12px 25px -5px rgba(0,0,0,0.8), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)`
            : '0 20px 45px -15px rgba(0, 0, 0, 0.6)',
          transition: 'transform 0.15s ease-out, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {/* Ambient Project Brand Glow on Hover with High-Intensity Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(700px circle at ${tilt.glareX}% ${tilt.glareY}%, ${accentColor}48 0%, ${accentColor}25 35%, transparent 75%)`,
          }}
        />

        {/* Ambient Top Vivid Accent Edge */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] transition-all duration-300 pointer-events-none z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
            boxShadow: `0 0 18px 2px ${accentColor}`,
          }}
        />

        {/* Card Header: Editorial Counter, Category Badge & Magnetic Action */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2.5">
              <span
                className="font-mono text-xs font-semibold tracking-widest transition-colors duration-300"
                style={{ color: isHovered ? accentColor : '#71717a' }}
              >
                /{projectNumber}
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? `${accentColor}22` : 'rgba(255, 255, 255, 0.04)',
                  borderColor: isHovered ? `${accentColor}99` : 'rgba(255, 255, 255, 0.08)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: isHovered ? '#ffffff' : '#d4d4d8',
                  boxShadow: isHovered ? `0 0 14px ${accentColor}40` : 'none',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: isHovered ? `0 0 12px 2px ${accentColor}` : `0 0 6px ${accentColor}`,
                  }}
                />
                {project.category}
              </span>
            </div>

            {/* Magnetic Proximity Action Button (Signature Mathis feel) */}
            <MagneticElement radius={60} strength={0.4} innerStrength={0.2} className="z-20">
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-all duration-300 shadow-sm"
                style={{
                  backgroundColor: isHovered ? accentColor : 'rgba(255, 255, 255, 0.06)',
                  color: isHovered ? '#09090b' : '#a1a1aa',
                  borderColor: isHovered ? accentColor : 'rgba(255, 255, 255, 0.1)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: isHovered ? `0 0 18px ${accentColor}90` : 'none',
                }}
                title="View Case Study Details"
              >
                <span className="hidden sm:inline font-semibold">Explore</span>
                <ArrowUpRight className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
              </div>
            </MagneticElement>
          </div>

          {/* Project Title & Client Strip */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-1.5">
              <span
                className="font-medium transition-colors duration-300"
                style={{ color: isHovered ? accentColor : '#e4e4e7' }}
              >
                {project.client}
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>{project.location}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-500">{project.year}</span>
            </div>

            <h3
              className="text-lg sm:text-xl lg:text-2xl font-display font-medium tracking-tight leading-snug transition-colors duration-300"
              style={{ color: isHovered ? '#ffffff' : '#f4f4f5' }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Media Showcase Container with Mathis Biabiany Style Cinematic Framing & Scroll Parallax */}
        <div
          className="relative z-10 w-full rounded-xl overflow-hidden bg-[#0c0c10] mb-3.5 group/img shadow-2xl transition-all duration-300"
          style={{
            borderColor: isHovered ? `${accentColor}80` : 'rgba(255, 255, 255, 0.08)',
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: isHovered ? `0 14px 35px -8px ${accentColor}35` : 'none',
          }}
        >
          {/* Subtle Browser Minimal Chrome Strip */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#16161b] border-b border-white/[0.06] text-[10px] font-mono text-zinc-400 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-700 group-hover/img:bg-rose-500/80 transition-colors" />
              <span className="w-2 h-2 rounded-full bg-zinc-700 group-hover/img:bg-amber-500/80 transition-colors" />
              <span className="w-2 h-2 rounded-full bg-zinc-700 group-hover/img:bg-emerald-500/80 transition-colors" />
            </div>
            <div className="truncate max-w-[160px] sm:max-w-[220px] text-zinc-400 px-2 py-0.5 rounded-full bg-black/40 border border-white/[0.04] text-center">
              {project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-mono">Live</span>
            </div>
          </div>

          {/* Media Body with Scroll Parallax Pan */}
          <div className="relative aspect-[16/9] w-full bg-[#0a0a0e] flex items-center justify-center overflow-hidden">
            {imageError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white">
                <Globe className="w-8 h-8 text-amber-400 mb-2" />
                <p className="text-base font-display font-medium text-zinc-100">{project.title}</p>
                <p className="text-xs font-mono text-zinc-500 mt-1">{project.technologies.slice(0, 3).join(' · ')}</p>
              </div>
            ) : (
              <>
                <img
                  ref={imageRef}
                  src={project.imageUrl}
                  alt={`${project.title} showcase`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover object-top will-change-transform transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transformOrigin: 'center center',
                  }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center">
                    <span className="text-xs font-mono text-zinc-500">Loading preview...</span>
                  </div>
                )}
              </>
            )}

            {/* Gradient Overlays for Cinematic Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent pointer-events-none" />

            {/* Center Floating "Explore Case Study" Badge on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-zinc-950/85 text-white font-mono text-xs font-medium border border-white/20 backdrop-blur-md shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Inspect Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Technology Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-1.5 mb-4">
          {project.technologies.slice(0, 5).map((tech, tIdx) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-mono rounded-md border transition-all duration-300"
              style={
                tIdx === 0 && isHovered
                  ? {
                      backgroundColor: `${accentColor}30`,
                      color: '#ffffff',
                      borderColor: `${accentColor}99`,
                      boxShadow: `0 0 10px ${accentColor}30`,
                    }
                  : tIdx === 0
                  ? {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  : {
                      backgroundColor: isHovered ? `${accentColor}14` : 'rgba(255, 255, 255, 0.03)',
                      color: isHovered ? '#e4e4e7' : '#a1a1aa',
                      borderColor: isHovered ? `${accentColor}40` : 'rgba(255, 255, 255, 0.06)',
                    }
              }
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span
              className="px-2 py-1 text-[11px] font-mono transition-colors duration-300"
              style={{ color: isHovered ? accentColor : '#71717a' }}
            >
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Card Footer: Role & Direct Action Links */}
        <div
          className="relative z-10 pt-4 border-t transition-colors duration-300 flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
          style={{
            borderColor: isHovered ? `${accentColor}40` : 'rgba(255, 255, 255, 0.06)',
          }}
        >
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="text-zinc-500">Role:</span>
            <span
              className="font-medium truncate max-w-[180px] sm:max-w-[220px] transition-colors duration-300"
              style={{ color: isHovered ? '#ffffff' : '#e4e4e7' }}
            >
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-xs"
                  style={{
                    backgroundColor: isHovered ? `${accentColor}25` : 'rgba(255, 255, 255, 0.05)',
                    color: isHovered ? '#ffffff' : '#d4d4d8',
                    borderColor: isHovered ? `${accentColor}80` : 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    boxShadow: isHovered ? `0 0 12px ${accentColor}35` : 'none',
                  }}
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-xs"
                  style={{
                    backgroundColor: isHovered ? `${accentColor}25` : 'rgba(255, 255, 255, 0.05)',
                    color: isHovered ? '#ffffff' : '#d4d4d8',
                    borderColor: isHovered ? `${accentColor}80` : 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    boxShadow: isHovered ? `0 0 12px ${accentColor}35` : 'none',
                  }}
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
