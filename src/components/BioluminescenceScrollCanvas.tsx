import React, { useEffect, useRef } from 'react';

// Fast Sine / Cosine lookup table for 60fps trigonometric efficiency
const SINE_TABLE_SIZE = 512;
const SINE_TABLE = new Float32Array(SINE_TABLE_SIZE);
const RAD_TO_INDEX = SINE_TABLE_SIZE / (Math.PI * 2);

for (let i = 0; i < SINE_TABLE_SIZE; i++) {
  SINE_TABLE[i] = Math.sin((i / SINE_TABLE_SIZE) * Math.PI * 2);
}

const fastSin = (angle: number): number => {
  let idx = (angle * RAD_TO_INDEX) | 0;
  idx = idx % SINE_TABLE_SIZE;
  if (idx < 0) idx += SINE_TABLE_SIZE;
  return SINE_TABLE[idx];
};

const fastCos = (angle: number): number => {
  let idx = ((angle + 1.5707963) * RAD_TO_INDEX) | 0;
  idx = idx % SINE_TABLE_SIZE;
  if (idx < 0) idx += SINE_TABLE_SIZE;
  return SINE_TABLE[idx];
};

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Depth Zones Color Palette
const DEPTH_PALETTES: { threshold: number; primary: RGB; secondary: RGB; accent: RGB }[] = [
  // Epipelagic / Surface (Hero & Monogram) -> Electric Cyan & Seafoam Aqua
  {
    threshold: 0.0,
    primary: { r: 6, g: 182, b: 212 },    // Cyan 500
    secondary: { r: 56, g: 189, b: 248 }, // Light Sky
    accent: { r: 34, g: 211, b: 238 },    // Cyan 400
  },
  // Mesopelagic / Twilight (Works) -> Emerald, Mint & Phosphor Teal
  {
    threshold: 0.28,
    primary: { r: 16, g: 185, b: 129 },   // Emerald 500
    secondary: { r: 52, g: 211, b: 153 }, // Emerald 400
    accent: { r: 45, g: 212, b: 191 },    // Teal 400
  },
  // Bathypelagic / Midnight (About & Capabilities) -> Amber Gold & Deep Indigo
  {
    threshold: 0.62,
    primary: { r: 245, g: 158, b: 11 },   // Amber 500
    secondary: { r: 129, g: 140, b: 248 },// Indigo 400
    accent: { r: 251, g: 191, b: 36 },    // Amber 400
  },
  // Hadal Abyss (Contact Abyss & Footer) -> Royal Violet & Phosphor Glow
  {
    threshold: 0.85,
    primary: { r: 168, g: 85, b: 247 },   // Purple 500
    secondary: { r: 99, g: 102, b: 241 }, // Indigo 500
    accent: { r: 52, g: 211, b: 153 },    // Mint accent
  },
];

// Helper to interpolate between two colors
const lerpColor = (c1: RGB, c2: RGB, factor: number): RGB => {
  const f = Math.max(0, Math.min(1, factor));
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * f),
    g: Math.round(c1.g + (c2.g - c1.g) * f),
    b: Math.round(c1.b + (c2.b - c1.b) * f),
  };
};

// Compute dynamic ocean depth color based on page scroll progress (0..1)
const getDepthColors = (progress: number) => {
  const p = Math.max(0, Math.min(1, progress));
  let zoneIdx = 0;
  for (let i = 0; i < DEPTH_PALETTES.length - 1; i++) {
    if (p >= DEPTH_PALETTES[i].threshold && p <= DEPTH_PALETTES[i + 1].threshold) {
      zoneIdx = i;
      break;
    }
    if (i === DEPTH_PALETTES.length - 2 && p > DEPTH_PALETTES[i + 1].threshold) {
      zoneIdx = i + 1;
    }
  }

  if (zoneIdx >= DEPTH_PALETTES.length - 1) {
    const z = DEPTH_PALETTES[DEPTH_PALETTES.length - 1];
    return { primary: z.primary, secondary: z.secondary, accent: z.accent };
  }

  const zCurrent = DEPTH_PALETTES[zoneIdx];
  const zNext = DEPTH_PALETTES[zoneIdx + 1];
  const span = zNext.threshold - zCurrent.threshold;
  const factor = span > 0 ? (p - zCurrent.threshold) / span : 0;

  return {
    primary: lerpColor(zCurrent.primary, zNext.primary, factor),
    secondary: lerpColor(zCurrent.secondary, zNext.secondary, factor),
    accent: lerpColor(zCurrent.accent, zNext.accent, factor),
  };
};

interface Phytoplankton {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  haloRadius: number;
  alphaBase: number;
  pulseSpeed: number;
  pulsePhase: number;
  driftXSpeed: number;
  driftYSpeed: number;
  glowIntensity: number; // flares up on scroll or mouse disturbance
  type: 'plankton' | 'snow' | 'spore';
}

interface CombJelly {
  x: number;
  y: number;
  baseX: number;
  size: number;
  pulseSpeed: number;
  pulsePhase: number;
  buoyancySpeed: number;
  wobbleSpeed: number;
  tentacles: { xOffset: number; yOffset: number; length: number; phase: number }[];
  depthTier: number; // parallax factor
}

export const BioluminescenceScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Scroll state tracking
    let currentScrollY = window.scrollY || 0;
    let targetScrollY = currentScrollY;
    let lastScrollY = currentScrollY;
    let scrollVelocity = 0;
    let smoothedVelocity = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    // Mouse tracking for bio-excitation
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let hasMouseInteracted = false;
    let mouseSpeed = 0;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;

    // 1. Initialize Dinoflagellates and Marine Snow
    const PLANKTON_COUNT = Math.min(140, Math.floor((width * height) / 8000));
    const planktonList: Phytoplankton[] = [];

    for (let i = 0; i < PLANKTON_COUNT; i++) {
      const isSnow = i % 4 === 0;
      const isSpore = i % 7 === 0;
      const x = Math.random() * width;
      const y = Math.random() * height;

      planktonList.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: isSnow ? 1.2 + Math.random() * 1.6 : isSpore ? 2.0 + Math.random() * 2.2 : 0.9 + Math.random() * 1.5,
        haloRadius: isSpore ? 28 + Math.random() * 24 : 14 + Math.random() * 16,
        alphaBase: isSnow ? 0.25 + Math.random() * 0.35 : 0.35 + Math.random() * 0.45,
        pulseSpeed: 1.2 + Math.random() * 2.4,
        pulsePhase: Math.random() * Math.PI * 2,
        driftXSpeed: (Math.random() - 0.5) * 0.28,
        driftYSpeed: isSnow ? 0.35 + Math.random() * 0.4 : (Math.random() - 0.5) * 0.2,
        glowIntensity: 0,
        type: isSnow ? 'snow' : isSpore ? 'spore' : 'plankton',
      });
    }

    // 2. Initialize Bioluminescent Comb Jellies / Siphonophore Organisms
    const JELLY_COUNT = width < 768 ? 4 : 7;
    const jellies: CombJelly[] = [];

    for (let i = 0; i < JELLY_COUNT; i++) {
      const size = 18 + Math.random() * 22;
      const tentacleCount = 3 + Math.floor(Math.random() * 3);
      const tentacles = [];
      for (let t = 0; t < tentacleCount; t++) {
        tentacles.push({
          xOffset: ((t - (tentacleCount - 1) / 2) * (size * 0.5)),
          yOffset: size * 0.8,
          length: size * (1.6 + Math.random() * 1.4),
          phase: Math.random() * Math.PI * 2,
        });
      }

      jellies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        size,
        pulseSpeed: 1.0 + Math.random() * 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        buoyancySpeed: 0.18 + Math.random() * 0.24,
        wobbleSpeed: 0.6 + Math.random() * 0.8,
        tentacles,
        depthTier: 0.4 + Math.random() * 0.6,
      });
    }

    // Event handlers
    const onScroll = () => {
      targetScrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = Math.max(0, Math.min(1, targetScrollY / maxScroll));
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      hasMouseInteracted = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
        hasMouseInteracted = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    onScroll();

    let rafId: number;
    let time = 0;
    let lastTime = performance.now();

    // Main animation loop
    const animate = (now: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const deltaMs = Math.min(now - lastTime, 40);
      lastTime = now;
      const dt = deltaMs / 1000;
      time += dt;

      // Smooth scroll lerping
      currentScrollY += (targetScrollY - currentScrollY) * 0.14;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.12;

      scrollVelocity = (currentScrollY - lastScrollY);
      smoothedVelocity += (scrollVelocity - smoothedVelocity) * 0.15;
      lastScrollY = currentScrollY;

      // Mouse smoothing
      mouseX += (targetMouseX - mouseX) * 0.12;
      mouseY += (targetMouseY - mouseY) * 0.12;
      const dxM = mouseX - prevMouseX;
      const dyM = mouseY - prevMouseY;
      mouseSpeed = Math.sqrt(dxM * dxM + dyM * dyM);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Calculate current depth colors
      const { primary, secondary, accent } = getDepthColors(scrollProgress);

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // 1. AMBIENT BIOLUMINESCENT FILAMENT RAYS (Subtle underwater light curtains)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const rayCount = 3;
      for (let r = 0; r < rayCount; r++) {
        const rayOffset = (r / rayCount) * width;
        const waveX = fastSin(time * 0.4 + r * 2.1) * (width * 0.08);
        const rayX = (rayOffset + waveX + width) % width;
        const rayWidth = width * 0.28;

        const rayGrad = ctx.createLinearGradient(rayX - rayWidth * 0.5, 0, rayX + rayWidth * 0.5, height);
        const rayAlpha = (0.018 + fastSin(time * 0.6 + r) * 0.008) * (1 + Math.min(Math.abs(smoothedVelocity) * 0.02, 0.6));
        
        rayGrad.addColorStop(0, `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${rayAlpha.toFixed(4)})`);
        rayGrad.addColorStop(0.5, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, ${(rayAlpha * 0.6).toFixed(4)})`);
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(rayX - rayWidth * 0.5, 0);
        ctx.lineTo(rayX + rayWidth * 0.5, 0);
        ctx.lineTo(rayX + rayWidth * 0.8, height);
        ctx.lineTo(rayX - rayWidth * 0.2, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 2. BIOLUMINESCENT COMB JELLIES / SIPHONOPHORES
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let j = 0; j < jellies.length; j++) {
        const jelly = jellies[j];
        // Bell rhythmic contraction pulse
        const pulseCycle = fastSin(time * jelly.pulseSpeed + jelly.pulsePhase);
        const pulseFactor = 0.85 + 0.35 * Math.max(0, pulseCycle);

        // Hydrodynamic buoyancy + scroll draft reaction
        // When scrolling down (positive velocity), organisms drift upwards
        const scrollDraft = -smoothedVelocity * 0.35 * jelly.depthTier;
        jelly.y -= (jelly.buoyancySpeed + scrollDraft);
        jelly.x = jelly.baseX + fastSin(time * jelly.wobbleSpeed + jelly.pulsePhase) * 24;

        // Wrap around viewport edges smoothly
        if (jelly.y < -jelly.size * 3) {
          jelly.y = height + jelly.size * 2;
          jelly.baseX = Math.random() * width;
        } else if (jelly.y > height + jelly.size * 3) {
          jelly.y = -jelly.size * 2;
          jelly.baseX = Math.random() * width;
        }

        const jx = jelly.x;
        const jy = jelly.y;
        const jSize = jelly.size * pulseFactor;

        // Glowing translucent bell
        const bellGrad = ctx.createRadialGradient(jx, jy, 0, jx, jy, jSize * 1.4);
        bellGrad.addColorStop(0, `rgba(${accent.r}, ${accent.g}, ${accent.b}, 0.55)`);
        bellGrad.addColorStop(0.4, `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.22)`);
        bellGrad.addColorStop(0.85, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.06)`);
        bellGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = bellGrad;
        ctx.beginPath();
        // Umbrella arch
        ctx.ellipse(jx, jy, jSize, jSize * 0.7, 0, Math.PI, 0, false);
        ctx.fill();

        // Nucleus light organ (inner bioluminescent node)
        ctx.beginPath();
        ctx.arc(jx, jy - jSize * 0.15, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + pulseCycle * 0.25})`;
        ctx.fill();

        // Trailing luminous tentacles with inertia lag
        for (let t = 0; t < jelly.tentacles.length; t++) {
          const ten = jelly.tentacles[t];
          const txStart = jx + ten.xOffset;
          const tyStart = jy + ten.yOffset * 0.3;
          const waveLag = fastSin(time * 2.2 + ten.phase) * 6;
          const velocityLag = smoothedVelocity * 0.8;

          ctx.beginPath();
          ctx.moveTo(txStart, tyStart);
          ctx.quadraticCurveTo(
            txStart + waveLag,
            tyStart + ten.length * 0.5 + velocityLag,
            txStart + waveLag * 1.5,
            tyStart + ten.length + velocityLag * 1.4
          );
          ctx.strokeStyle = `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.18)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Luminescent tip spore
          ctx.beginPath();
          ctx.arc(txStart + waveLag * 1.5, tyStart + ten.length + velocityLag * 1.4, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, 0.45)`;
          ctx.fill();
        }
      }
      ctx.restore();

      // 3. DINOFLAGELLATES & MARINE SNOW PARTICLES
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const velocityMag = Math.abs(smoothedVelocity);

      for (let i = 0; i < planktonList.length; i++) {
        const p = planktonList[i];

        // Wave oscillations
        const pulse = fastSin(time * p.pulseSpeed + p.pulsePhase);
        const currentAlpha = Math.max(0.08, p.alphaBase + pulse * 0.28);

        // Drift motion
        p.x += p.driftXSpeed + fastSin(time * 0.5 + p.pulsePhase) * 0.15;
        p.y += p.driftYSpeed - smoothedVelocity * 0.22; // scroll draft response

        // Screen wrapping
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Mechanical Bioluminescence Excitation
        // (a) Mouse disturbance proximity
        if (hasMouseInteracted) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 14400) { // 120px radius
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / 120;
            const boost = factor * Math.min(2.5, 0.8 + mouseSpeed * 0.12);
            p.glowIntensity = Math.min(1.0, p.glowIntensity + boost * 0.25);
          }
        }

        // (b) Scroll velocity excitation (water shearing causes plankton to flash!)
        if (velocityMag > 4) {
          p.glowIntensity = Math.min(1.0, p.glowIntensity + Math.min(0.4, velocityMag * 0.015));
        }

        // Natural exponential decay of excited luminescence
        p.glowIntensity *= 0.94;

        // Total brightness
        const totalBrightness = Math.min(1.0, currentAlpha + p.glowIntensity * 0.75);

        // Velocity stretch effect during fast scroll
        const stretchY = Math.max(1.0, Math.min(4.5, 1.0 + velocityMag * 0.12));

        // Draw soft outer halo
        const haloR = p.haloRadius * (1.0 + p.glowIntensity * 0.8);
        const haloGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
        const haloColor = p.glowIntensity > 0.3 ? accent : primary;

        haloGrad.addColorStop(
          0,
          `rgba(${haloColor.r}, ${haloColor.g}, ${haloColor.b}, ${(totalBrightness * 0.42).toFixed(3)})`
        );
        haloGrad.addColorStop(
          0.4,
          `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, ${(totalBrightness * 0.16).toFixed(3)})`
        );
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        if (stretchY > 1.2) {
          ctx.ellipse(p.x, p.y, p.radius * 2.5, p.radius * 2.5 * stretchY, 0, 0, Math.PI * 2);
        } else {
          ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        }
        ctx.fill();

        // Draw sharp high-density bright nucleus
        ctx.beginPath();
        if (stretchY > 1.2) {
          ctx.ellipse(p.x, p.y, p.radius, p.radius * stretchY, 0, 0, Math.PI * 2);
        } else {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        const coreAlpha = Math.min(1.0, totalBrightness * 1.2);
        ctx.fillStyle = `rgba(255, 255, 255, ${coreAlpha.toFixed(3)})`;
        ctx.fill();
      }

      ctx.restore();

      // 4. MOUSE BIO-EXCITATION RIPPLE HALO
      if (hasMouseInteracted) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const mouseGlowGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 95);
        const mouseAlpha = Math.min(0.12, 0.03 + mouseSpeed * 0.004);
        mouseGlowGrad.addColorStop(0, `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${mouseAlpha.toFixed(3)})`);
        mouseGlowGrad.addColorStop(0.5, `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${(mouseAlpha * 0.4).toFixed(3)})`);
        mouseGlowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = mouseGlowGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 95, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] select-none"
      style={{
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
};
