import React from 'react';
import {
  SMOOTH_SINGLE_WAVE_FILL,
  SMOOTH_SINGLE_WAVE_EDGE,
} from './smoothWavePaths';

/**
 * SmoothWaveHorizon (TornPaperHorizon)
 * 
 * Renders a balanced 2-WAVE silhouette with:
 * 1. Crisp, SOLID top curve:
 *    Zero blur and zero transparency at the top. The upper crests and wave body are 100% solid
 *    and opaque with a clean, well-defined smooth curve silhouette against Section 1.
 * 2. Visible GRADIENT AT THE BOTTOM of the shape:
 *    A smooth vertical gradient at the bottom of the wave shape fading from solid oceanic blue
 *    down into transparency (#164a5b to transparent), coupled with Gaussian blur and backdrop-blur
 *    to create an ultra-smooth, silky transition into the Section 2 background image (bg_blue.png).
 * 3. Balanced 2-wave curve count:
 *    Exactly 2 broad, graceful crests and troughs per 1440px viewport (4 crests across 2880px),
 *    avoiding clutter and "too many waves shapes".
 * 4. Zero artificial light/white/yellow borders:
 *    Contour tones remain authentic to the oceanic blue palette.
 */
export const SmoothWaveHorizon: React.FC = () => {
  return (
    <div
      className="absolute -top-12 sm:-top-16 md:-top-22 inset-x-0 h-32 sm:h-40 md:h-48 pointer-events-none z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Scoped Keyframes for Silky Smooth Wave Drift and Gentle Breathing */}
      <style>{`
        @keyframes smoothWaveDrift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes smoothWaveBreathing {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -3px, 0);
          }
        }
        .anim-smooth-wave-drift {
          animation: smoothWaveDrift 24s linear infinite;
          will-change: transform;
        }
        .anim-smooth-wave-breathing {
          animation: smoothWaveBreathing 8s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-smooth-wave-drift,
          .anim-smooth-wave-breathing {
            animation: none !important;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Drop Shadow casting onto Section 1 beneath the wave */}
      <div className="absolute inset-x-0 bottom-6 h-20 bg-gradient-to-t from-black/60 to-transparent blur-lg -z-10" />

      {/* Swaying Wave Container */}
      <div className="relative w-full h-full anim-smooth-wave-breathing">
        <svg
          viewBox="0 0 2880 220"
          preserveAspectRatio="none"
          className="w-[200%] h-full anim-smooth-wave-drift block"
        >
          <defs>
            {/* Wave Body Gradient:
                - 100% solid & opaque at the top (stopOpacity="1")
                - Smooth GRADIENT AT THE BOTTOM fading into transparency */}
            <linearGradient id="oceanWaveGradWithBottomFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d3546" stopOpacity="1" />
              <stop offset="25%" stopColor="#103e51" stopOpacity="1" />
              <stop offset="48%" stopColor="#13475b" stopOpacity="1" />
              {/* Visible gradient at the bottom of the shape */}
              <stop offset="68%" stopColor="#164b5b" stopOpacity="0.8" />
              <stop offset="84%" stopColor="#164a5b" stopOpacity="0.4" />
              <stop offset="96%" stopColor="#164a5b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#164a5b" stopOpacity="0" />
            </linearGradient>

            {/* Gradient Mask at the bottom of the shape */}
            <linearGradient id="bottomGradientMaskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="88%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <mask id="bottomShapeGradientMask">
              <rect x="0" y="0" width="2880" height="220" fill="url(#bottomGradientMaskGrad)" />
            </mask>

            {/* Deep physical cast shadow beneath the solid wave */}
            <filter id="solidWaveShadow" x="-5%" y="-15%" width="110%" height="135%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="3"
                floodColor="#000000"
                floodOpacity="0.65"
              />
            </filter>
          </defs>

          {/* Wave Body:
              - Crisp and solid at the top (NO top blur, NO top transparency)
              - Gradient at the bottom fading softly into Section 2 */}
          <g filter="url(#solidWaveShadow)">
            <path
              d={SMOOTH_SINGLE_WAVE_FILL}
              fill="url(#oceanWaveGradWithBottomFade)"
              mask="url(#bottomShapeGradientMask)"
            />
          </g>

          {/* Crisp, clean smooth wave curve stroke along the top boundary */}
          <path
            d={SMOOTH_SINGLE_WAVE_EDGE}
            fill="none"
            stroke="#082533"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
        </svg>
      </div>

      {/* =========================================================================
          GRADIENT & GAUSSIAN BLUR TRANSITION AT THE BOTTOM OF THE SHAPE
          Applies a visible, smooth downward gradient and Gaussian blur at the base
          so the wave shape dissolves seamlessly into the background image (bg_blue.png).
         ========================================================================= */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 sm:h-28 md:h-32 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* 1. Backdrop blur layer softening the background texture through the base */}
        <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent_95%)]" />

        {/* 2. Soft Gaussian blur gradient fading downward into transparency */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-b from-[#164a5b]/60 via-[#164a5b]/25 to-transparent blur-md" />

        {/* 3. Smooth bottom gradient overlay bridging into bg_blue.png */}
        <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-b from-[#164a5b]/40 to-transparent blur-sm" />
      </div>
    </div>
  );
};

// Aliases for backwards compatibility with existing imports in App.tsx and OceanSurfaceWaves.tsx
export const TornPaperHorizon = SmoothWaveHorizon;
export const OceanSurfaceWaves = SmoothWaveHorizon;
