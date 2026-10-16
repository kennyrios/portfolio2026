import React, { useRef, useMemo } from 'react';
import { useParallaxBackground } from '../hooks/useParallaxBackground';
import { MouseWaveCanvas } from './MouseWaveCanvas';

export const AmbientDarkAtmosphere: React.FC = () => {
  const farLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const nearLayerRef = useRef<HTMLDivElement>(null);

  // Parallax layer configurations:
  // Layer 1 (Far Aurora): Moves slowly at 0.08x scroll + subtle mouse drift
  // Layer 2 (Mid Canvas Mesh): Moves at 0.18x scroll + moderate mouse response
  // Layer 3 (Near Ambient Dust): Moves at 0.32x scroll + enhanced depth response
  const layers = useMemo(
    () => [
      { ref: farLayerRef, speedY: 0.08, mouseStrength: 14 },
      { ref: midLayerRef, speedY: 0.18, mouseStrength: 22 },
      { ref: nearLayerRef, speedY: 0.32, mouseStrength: 34 },
    ],
    []
  );

  useParallaxBackground(layers);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* BASE LAYER 0: Deep nocturnal ocean abyss with tactile paper substrate */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #0a131e 0%, #070a10 60%, #050608 100%)',
        }}
      />

      {/* SVG Canvas Texture Definitions */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          {/* Organic Linen / Canvas Fiber Filter */}
          <filter id="canvasWeave" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65 0.85"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0 0 0 1 0"
              in="noise"
              result="coloredNoise"
            />
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.7" />
              <feFuncG type="linear" slope="0.7" />
              <feFuncB type="linear" slope="0.7" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* TACTILE SUBSTRATE: Woven Canvas Micro-Texture */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='canvas'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75 0.95' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23canvas)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }}
      />

      {/* FAR PARALLAX LAYER: Deep Luminous Aurora Pools (Translates smoothly on scroll) */}
      <div
        ref={farLayerRef}
        className="absolute inset-x-[-15%] top-[-10%] h-[160vh] w-[130vw] will-change-transform pointer-events-none"
      >
        {/* Soft Cyan/Sapphire Glow Top-Left */}
        <div
          className="absolute top-[8%] left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full blur-[160px] opacity-[0.16]"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #0284c7 0%, #1e1b4b 60%, transparent 80%)',
          }}
        />

        {/* Warm Ochre / Amber Accent Mid-Right (Mathis Biabiany warm tactile feel) */}
        <div
          className="absolute top-[35%] right-[8%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full blur-[170px] opacity-[0.13]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #d97706 0%, #312e81 60%, transparent 85%)',
          }}
        />

        {/* Deep Emerald Twilight Bottom-Left */}
        <div
          className="absolute top-[68%] left-[18%] w-[48vw] h-[48vw] max-w-[750px] max-h-[750px] rounded-full blur-[160px] opacity-[0.11]"
          style={{
            background: 'radial-gradient(circle at 45% 45%, #059669 0%, #0f172a 60%, transparent 80%)',
          }}
        />

        {/* Violet Horizon Glow for Footer/Contact depth */}
        <div
          className="absolute top-[92%] right-[22%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full blur-[180px] opacity-[0.14]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #6366f1 0%, #18181b 70%, transparent 90%)',
          }}
        />
      </div>

      {/* MID PARALLAX LAYER: Tactile Editorial Grid & Fiber Mesh */}
      <div
        ref={midLayerRef}
        className="absolute inset-x-[-10%] top-[-10%] h-[150vh] w-[120vw] will-change-transform pointer-events-none"
      >
        {/* Subtle Architectural Underlay (Dynamic liquid grid in MouseWaveCanvas animates over this) */}
        <div
          className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem]"
          style={{
            maskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, #000 30%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, #000 30%, transparent 90%)',
          }}
        />

        {/* Micro-Crosshair Alignment Dots at Grid Intersections */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '5rem 5rem',
            backgroundPosition: '0 0',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 35%, #000 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 35%, #000 40%, transparent 80%)',
          }}
        />

        {/* Tactile Diagonal Mesh Hatching (Evokes physical fine art paper texture) */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 16px)`,
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 20%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 20%, transparent 85%)',
          }}
        />
      </div>

      {/* NEAR PARALLAX LAYER: Ambient Organic Floating Motes & Subtle Halos */}
      <div
        ref={nearLayerRef}
        className="absolute inset-x-[-10%] top-[-5%] h-[140vh] w-[120vw] will-change-transform pointer-events-none"
      >
        {/* Soft Floating Light Accent 1 */}
        <div className="absolute top-[18%] left-[25%] w-2.5 h-2.5 rounded-full bg-amber-200/25 blur-[1px] shadow-[0_0_16px_4px_rgba(251,191,36,0.2)] animate-pulse" />
        
        {/* Soft Floating Light Accent 2 */}
        <div className="absolute top-[32%] right-[28%] w-2 h-2 rounded-full bg-cyan-200/20 blur-[1px] shadow-[0_0_14px_3px_rgba(56,189,248,0.18)]" />

        {/* Soft Floating Light Accent 3 */}
        <div className="absolute top-[58%] left-[16%] w-3 h-3 rounded-full bg-emerald-200/20 blur-[2px] shadow-[0_0_20px_5px_rgba(52,211,153,0.15)]" />

        {/* Soft Floating Light Accent 4 */}
        <div className="absolute top-[75%] right-[19%] w-2 h-2 rounded-full bg-indigo-200/25 blur-[1px] shadow-[0_0_15px_4px_rgba(129,140,248,0.2)]" />
      </div>

      {/* INTERACTIVE MOUSE POINTER WAVE & RIPPLE CANVAS (Mathis Biabiany Style) */}
      <MouseWaveCanvas />

      {/* TOP UNIFIED OVERLAY: Fine Analog Film Grain */}
      <div
        className="absolute inset-0 opacity-[0.042] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Vignette Rim for Framing Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(4, 4, 6, 0.45) 100%)',
        }}
      />
    </div>
  );
};
