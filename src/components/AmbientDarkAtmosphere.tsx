import React, { useRef, useMemo } from 'react';
import { useParallaxBackground } from '../hooks/useParallaxBackground';
import { MouseWaveCanvas } from './MouseWaveCanvas';

export const AmbientDarkAtmosphere: React.FC = () => {
  const farLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const nearLayerRef = useRef<HTMLDivElement>(null);

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
      {/* BASE LAYER 0: Deep nocturnal ocean abyss */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #0a131e 0%, #070a10 60%, #050608 100%)',
        }}
      />

      {/* FAR PARALLAX LAYER: Deep Luminous Aurora Pools */}
      <div
        ref={farLayerRef}
        className="absolute inset-x-[-15%] top-[-10%] h-[160vh] w-[130vw] will-change-transform pointer-events-none"
      >
        {/* Soft Cyan/Sapphire Glow Top-Left */}
        <div
          className="absolute top-[8%] left-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-xl opacity-[0.16]"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #0284c7 0%, #1e1b4b 55%, transparent 75%)',
          }}
        />

        {/* Warm Ochre / Amber Accent Mid-Right */}
        <div
          className="absolute top-[35%] right-[8%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-xl opacity-[0.14]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #d97706 0%, #312e81 55%, transparent 80%)',
          }}
        />

        {/* Deep Emerald Twilight Bottom-Left */}
        <div
          className="absolute top-[68%] left-[18%] w-[42vw] h-[42vw] max-w-[550px] max-h-[550px] rounded-full blur-xl opacity-[0.12]"
          style={{
            background: 'radial-gradient(circle at 45% 45%, #059669 0%, #0f172a 55%, transparent 75%)',
          }}
        />

        {/* Violet Horizon Glow for Footer/Contact depth */}
        <div
          className="absolute top-[92%] right-[22%] w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] rounded-full blur-xl opacity-[0.14]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #6366f1 0%, #18181b 60%, transparent 80%)',
          }}
        />
      </div>

      {/* MID PARALLAX LAYER: Tactile Editorial Grid */}
      <div
        ref={midLayerRef}
        className="absolute inset-x-[-10%] top-[-10%] h-[150vh] w-[120vw] will-change-transform pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem]"
          style={{
            maskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, #000 30%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, #000 30%, transparent 90%)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '5rem 5rem',
            backgroundPosition: '0 0',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 35%, #000 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 35%, #000 40%, transparent 80%)',
          }}
        />
      </div>

      {/* NEAR PARALLAX LAYER: Ambient Organic Floating Motes */}
      <div
        ref={nearLayerRef}
        className="absolute inset-x-[-10%] top-[-5%] h-[140vh] w-[120vw] will-change-transform pointer-events-none"
      >
        <div className="absolute top-[18%] left-[25%] w-2.5 h-2.5 rounded-full bg-amber-200/25 blur-[1px] shadow-[0_0_12px_2px_rgba(251,191,36,0.2)]" />
        <div className="absolute top-[32%] right-[28%] w-2 h-2 rounded-full bg-cyan-200/20 blur-[1px] shadow-[0_0_10px_2px_rgba(56,189,248,0.18)]" />
        <div className="absolute top-[58%] left-[16%] w-2.5 h-2.5 rounded-full bg-emerald-200/20 blur-[1px] shadow-[0_0_14px_3px_rgba(52,211,153,0.15)]" />
        <div className="absolute top-[75%] right-[19%] w-2 h-2 rounded-full bg-indigo-200/25 blur-[1px] shadow-[0_0_12px_2px_rgba(129,140,248,0.2)]" />
      </div>

      {/* INTERACTIVE MOUSE POINTER WAVE & RIPPLE CANVAS */}
      <MouseWaveCanvas />

      {/* Lightweight Vignette Rim for Framing Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(4, 4, 6, 0.45) 100%)',
        }}
      />
    </div>
  );
};
