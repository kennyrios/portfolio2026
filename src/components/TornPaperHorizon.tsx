import React from 'react';
import bgBlueUrl from '../assets/bg_blue.png';
import {
  DECKLED_PAPER_LAYER_1,
  DECKLED_PAPER_LAYER_2,
  DECKLED_PAPER_LAYER_3,
  DECKLED_EDGE_2,
  DECKLED_EDGE_3,
} from './deckledPaths';

/**
 * TornPaperHorizon
 * 
 * Renders a multi-layered artisanal deckled torn paper horizon at the top of Section 2.
 * Replaces smooth vector wave curves and light-colored borders with authentic physical
 * handcrafted paper edges featuring:
 * - 3 layered deckled paper sheets with ragged micro-fiber tearing contours
 * - Zero light-colored or white/yellow borders: torn edges defined by natural deckled silhouette
 *   and delicate tactile paper-on-paper contact shadows
 * - SVG fractal noise fiber filter creating rich matte artisanal paper grain
 * - Seamless color unification with the blue texture paper background (bg_blue.png)
 * - Subtle organic drift and gentle floating paper sway running smoothly on GPU compositor
 */
export const TornPaperHorizon: React.FC = () => {
  return (
    <div
      className="absolute -top-12 sm:-top-16 md:-top-20 inset-x-0 h-28 sm:h-36 md:h-44 pointer-events-none z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Scoped Keyframes for Gentle Artisanal Paper Sway and Drift */}
      <style>{`
        @keyframes paperDriftLayer1 {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes paperDriftLayer2 {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes paperDriftLayer3 {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes paperOrganicSway {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          33% {
            transform: translate3d(0, -3.5px, 0) rotate(0.08deg);
          }
          66% {
            transform: translate3d(0, -1.5px, 0) rotate(-0.06deg);
          }
        }
        .anim-paper-drift-1 {
          animation: paperDriftLayer1 36s linear infinite;
          will-change: transform;
        }
        .anim-paper-drift-2 {
          animation: paperDriftLayer2 28s linear infinite;
          will-change: transform;
        }
        .anim-paper-drift-3 {
          animation: paperDriftLayer3 22s linear infinite;
          will-change: transform;
        }
        .anim-paper-sway {
          animation: paperOrganicSway 9s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-paper-drift-1,
          .anim-paper-drift-2,
          .anim-paper-drift-3,
          .anim-paper-sway {
            animation: none !important;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Shadow casting onto Section 1 beneath the torn paper edge */}
      <div className="absolute inset-x-0 bottom-6 h-16 bg-gradient-to-t from-black/60 to-transparent blur-md -z-10" />

      {/* Swaying Paper Container */}
      <div className="relative w-full h-full anim-paper-sway">

        {/* =========================================================================
            LAYER 1: Deep Back Torn Paper Sheet
            Deepest indigo-teal tone, broad artisanal torn deckle
           ========================================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden opacity-90">
          <svg
            viewBox="0 0 2880 180"
            preserveAspectRatio="none"
            className="w-[200%] h-full anim-paper-drift-1 block"
          >
            <defs>
              {/* Deep artisanal blue gradient */}
              <linearGradient id="paperLayer1Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a2836" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#0d3445" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#113d50" stopOpacity="1" />
              </linearGradient>

              {/* Natural paper fiber texture filter */}
              <filter id="paperFiberFilter" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.45 0.5"
                  numOctaves="3"
                  stitchTiles="stitch"
                  result="noise"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.05
                          0 0 0 0 0.20
                          0 0 0 0 0.28
                          0 0 0 0.16 0"
                  in="noise"
                  result="tintedNoise"
                />
                <feBlend mode="multiply" in="tintedNoise" in2="SourceGraphic" />
              </filter>

              {/* Micro-roughness displacement for real torn paper deckle */}
              <filter id="tornDeckleRoughness" x="-2%" y="-5%" width="104%" height="110%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.08 0.12"
                  numOctaves="2"
                  result="rough"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="rough"
                  scale="2"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>

            {/* Back Deckled Paper Body */}
            <path
              d={DECKLED_PAPER_LAYER_1}
              fill="url(#paperLayer1Grad)"
              filter="url(#paperFiberFilter)"
            />
          </svg>
        </div>

        {/* =========================================================================
            LAYER 2: Middle Torn Paper Sheet
            Mid-depth cerulean paper with physical contact shadow on Layer 1
           ========================================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden opacity-95">
          <svg
            viewBox="0 0 2880 180"
            preserveAspectRatio="none"
            className="w-[200%] h-full anim-paper-drift-2 block"
          >
            <defs>
              <linearGradient id="paperLayer2Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0e3749" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#124357" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#154d63" stopOpacity="1" />
              </linearGradient>

              {/* Physical paper contact shadow cast onto Layer 1 (Dark shadow, NO light border) */}
              <filter id="paperContactShadowMid" x="-5%" y="-10%" width="110%" height="130%">
                <feDropShadow
                  dx="0"
                  dy="2.5"
                  stdDeviation="2"
                  floodColor="#04121a"
                  floodOpacity="0.5"
                />
              </filter>
            </defs>

            {/* Mid Deckled Paper Body with contact shadow */}
            <g filter="url(#paperContactShadowMid)">
              <path
                d={DECKLED_PAPER_LAYER_2}
                fill="url(#paperLayer2Grad)"
                filter="url(#paperFiberFilter)"
              />
            </g>

            {/* Subtle deeper micro-deckle fiber grain (Dark cellulose fibers, NO light border) */}
            <path
              d={DECKLED_EDGE_2}
              fill="none"
              stroke="#07222e"
              strokeWidth="0.8"
              strokeDasharray="2 4 1 3"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        {/* =========================================================================
            LAYER 3: Foreground Main Torn Paper Sheet
            Merges 100% seamlessly into bg_blue.png.
            Zero light-colored border. Real physical deckle texture and contact shadow.
           ========================================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <svg
            viewBox="0 0 2880 180"
            preserveAspectRatio="none"
            className="w-[200%] h-full anim-paper-drift-3 block"
          >
            <defs>
              {/* Forefront paper body gradient: perfectly matched to the top of bg_blue.png */}
              <linearGradient id="paperForegroundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#103c4f" stopOpacity="0.98" />
                <stop offset="30%" stopColor="#13475c" stopOpacity="1" />
                <stop offset="65%" stopColor="#164b5b" stopOpacity="1" />
                <stop offset="100%" stopColor="#164a5b" stopOpacity="1" />
              </linearGradient>

              {/* Physical paper contact shadow cast onto Layer 2 */}
              <filter id="paperContactShadowFront" x="-5%" y="-10%" width="110%" height="130%">
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="2.5"
                  floodColor="#030e15"
                  floodOpacity="0.55"
                />
              </filter>
            </defs>

            {/* Main Foreground Deckled Torn Paper Body */}
            <g filter="url(#paperContactShadowFront)">
              <path
                d={DECKLED_PAPER_LAYER_3}
                fill="url(#paperForegroundGrad)"
                filter="url(#paperFiberFilter)"
              />
            </g>

            {/* Deep deckled paper fiber tear fringe (Dark cellulose micro-shadow, NO light border) */}
            <path
              d={DECKLED_EDGE_3}
              fill="none"
              stroke="#082533"
              strokeWidth="1"
              strokeDasharray="3 5 1 4 2 6"
              strokeOpacity="0.35"
            />
          </svg>
        </div>

        {/* Seamless Blue Paper Texture Overlay: reinforces identical handmade paper grain */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none mix-blend-overlay opacity-25 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={bgBlueUrl}
            alt=""
            className="w-full h-full object-cover object-top scale-105"
          />
        </div>

      </div>

      {/* Seamless downward color blend into Section 2 (Hero.tsx) */}
      <div
        className="absolute inset-x-0 bottom-0 h-8 pointer-events-none bg-gradient-to-t from-[#164a5b] to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

// Also export as OceanSurfaceWaves so existing imports remain backward-compatible
export const OceanSurfaceWaves = TornPaperHorizon;
