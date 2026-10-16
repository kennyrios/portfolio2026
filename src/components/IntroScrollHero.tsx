import React, { useEffect, useRef } from 'react';
import { KennyLogo } from './KennyLogo';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useSectionParallax } from '../hooks/useSectionParallax';
import bgSunUrl from '../assets/bg_sun.jpeg';

interface IntroScrollHeroProps {
  onScrollDown: () => void;
}

export const IntroScrollHero: React.FC<IntroScrollHeroProps> = ({ onScrollDown }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLDivElement | null>(null);
  const sunGlowRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const logoWrapperRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);

  // Parallax hook for the background sunlit paper layer (GPU-accelerated)
  const bgParallaxRef = useSectionParallax<HTMLDivElement>({
    speedY: 0.22,
    scaleDelta: 0.04,
    maxTranslateY: 140,
  });

  // Secondary floating particles parallax
  const decorParallaxRef = useSectionParallax<HTMLDivElement>({
    speedY: -0.15,
    rotateSpeed: 0.008,
    maxTranslateY: 90,
  });

  // Zero-rerender interactive mouse & scroll transforms directly applied to DOM nodes
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 16;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 12;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const maxScroll = window.innerHeight || 800;

      // When the second section has completely overlapped and scrolled past
      if (currentY > maxScroll * 1.15) {
        if (containerRef.current && containerRef.current.style.visibility !== 'hidden') {
          containerRef.current.style.visibility = 'hidden';
        }
        return;
      }

      if (containerRef.current && containerRef.current.style.visibility === 'hidden') {
        containerRef.current.style.visibility = 'visible';
      }

      const progress = Math.min(1, Math.max(0, currentY / maxScroll));

      // Direct DOM updates - avoids React reconciliation loop entirely
      if (contentRef.current) {
        const translateY = progress * -80;
        const opacity = Math.max(0, 1 - Math.pow(progress, 1.6));
        contentRef.current.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        contentRef.current.style.opacity = opacity.toFixed(3);
        contentRef.current.style.pointerEvents = progress >= 0.85 ? 'none' : 'auto';
      }

      if (logoWrapperRef.current) {
        const scale = 1 - progress * 0.25;
        logoWrapperRef.current.style.transform = `scale(${scale.toFixed(3)})`;
      }

      if (scrimRef.current) {
        scrimRef.current.style.opacity = (progress * 0.7).toFixed(3);
      }

      if (progressTextRef.current) {
        const pct = Math.round(progress * 100);
        progressTextRef.current.textContent = pct >= 100 ? 'OVERLAPPED: 100%' : `OVERLAP PARALLAX: ${pct}%`;
      }
    };

    // Smooth mouse lerp loop that runs only when mouse is moving
    let isMouseMoving = false;
    let mouseTimeout: any;

    const onMove = (e: MouseEvent) => {
      handleMouseMove(e);
      if (!isMouseMoving) {
        isMouseMoving = true;
        updateMouseMotion();
      }
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 500);
    };

    const updateMouseMotion = () => {
      mouseX += (targetMouseX - mouseX) * 0.12;
      mouseY += (targetMouseY - mouseY) * 0.12;

      if (bgImageRef.current) {
        bgImageRef.current.style.transform = `translate3d(${mouseX.toFixed(2)}px, ${mouseY.toFixed(2)}px, 0)`;
      }

      if (sunGlowRef.current) {
        sunGlowRef.current.style.transform = `translate3d(${(mouseX * 1.5).toFixed(2)}px, ${(mouseY * 1.2).toFixed(2)}px, 0)`;
      }

      if (isMouseMoving || Math.abs(targetMouseX - mouseX) > 0.05 || Math.abs(targetMouseY - mouseY) > 0.05) {
        rafId = requestAnimationFrame(updateMouseMotion);
      } else {
        isMouseMoving = false;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial positioning
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(mouseTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden select-none z-10"
    >
      {/* Parallax Sunlit Paper Layer (bg_sun.jpeg) */}
      <div
        className="absolute inset-[-15%] pointer-events-none select-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          ref={bgParallaxRef}
          className="w-full h-full will-change-transform"
        >
          <div
            ref={bgImageRef}
            className="w-full h-full will-change-transform"
          >
            <img
              src={bgSunUrl}
              alt=""
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top opacity-95 scale-[1.05]"
            />
          </div>
        </div>

        {/* Dynamic Sunbeam Spotlight Glow overlay */}
        <div
          ref={sunGlowRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-gradient-to-b from-amber-200/25 via-amber-400/15 to-transparent blur-3xl pointer-events-none mix-blend-screen will-change-transform"
        />

        {/* Soft top gradient to blend with floating Navigation */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#09090b]/85 via-[#09090b]/35 to-transparent" />

        {/* Bottom seamless dissolution gradient blending into #09090b before Hero */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#09090b] via-[#09090b]/75 to-transparent" />

        {/* Gentle dark glaze for editorial typography contrast */}
        <div className="absolute inset-0 bg-[#09090b]/25 mix-blend-multiply" />

        {/* Parallax Overlap Receding Dark Scrim */}
        <div
          ref={scrimRef}
          className="absolute inset-0 bg-[#09090b] pointer-events-none will-change-[opacity]"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Decorative architectural grid lines with subtle counter-parallax */}
      <div
        ref={decorParallaxRef}
        className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none will-change-transform"
      >
        <div className="w-[560px] h-[280px] border border-dashed border-amber-200/20 rounded-3xl" />
        <div className="absolute w-[680px] h-[1px] bg-gradient-to-r from-transparent via-amber-200/25 to-transparent" />
        <div className="absolute h-[380px] w-[1px] bg-gradient-to-b from-transparent via-amber-200/25 to-transparent" />
      </div>

      {/* Main Foreground Monogram Container */}
      <div
        ref={contentRef}
        className="relative flex flex-col items-center text-center space-y-8 z-10 will-change-transform"
      >
        {/* Curated Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-amber-300/20 text-xs font-mono text-amber-100 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Interactive Monogram · First Intro</span>
        </div>

        {/* The Animated Logo with Dynamic Parallax Scale and Amber Radiance */}
        <div
          ref={logoWrapperRef}
          className="relative will-change-transform"
        >
          {/* Subtle dark backdrop glow behind the monogram for separation */}
          <div className="absolute -inset-8 rounded-3xl bg-black/35 blur-2xl -z-10" />

          <KennyLogo
            className="w-64 sm:w-80 md:w-96 h-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)]"
            fillColor="#ffffff"
            accentColor="#fbbf24"
          />

          {/* Luminous warm sun halo */}
          <div
            className="absolute -inset-10 rounded-full bg-amber-400/20 blur-3xl -z-10 pointer-events-none"
          />
        </div>

        {/* Brand Subtitle & Role */}
        <div className="space-y-2 pointer-events-auto">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.28em] text-amber-100/90 font-medium drop-shadow-md">
            Senior Web Designer & Frontend Architect
          </p>
          <p className="text-sm sm:text-base font-light text-zinc-200 drop-shadow">
            Avenue Living · Mini Mall Storage · Able Group
          </p>
        </div>

        {/* Scroll Cue Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="pointer-events-auto mt-4 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-amber-100 text-zinc-950 text-xs font-mono font-semibold transition-all shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_36px_rgba(251,191,36,0.3)] cursor-pointer group hover:scale-[1.02]"
        >
          <span>Enter Portfolio</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-zinc-900" />
        </button>
      </div>

      {/* Bottom coordinate tick marks */}
      <div className="absolute bottom-6 flex items-center gap-6 sm:gap-8 text-[11px] font-mono text-amber-100/70 drop-shadow">
        <span>01 // MONOGRAM</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
        <span ref={progressTextRef}>SCROLL PARALLAX: 0%</span>
      </div>
    </div>
  );
};
