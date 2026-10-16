import React, { useEffect, useRef } from 'react';

// Pre-computed Sine lookup table to eliminate trigonometric function overhead in fluid simulation
const SINE_TABLE_SIZE = 512;
const SINE_TABLE = new Float32Array(SINE_TABLE_SIZE);
const RAD_TO_INDEX = SINE_TABLE_SIZE / (Math.PI * 2);

for (let i = 0; i < SINE_TABLE_SIZE; i++) {
  SINE_TABLE[i] = Math.sin((i / SINE_TABLE_SIZE) * Math.PI * 2);
}

// Inline fast sin & cos lookups
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

/**
 * Ultra-Optimized Oceanic Fluid Sea Background Canvas
 * Directly simulates an interactive liquid sea surface where the mouse pointer physically
 * deforms the water, creating rolling ocean swells, warped contour grid lines,
 * and propagating liquid caustics.
 * 
 * Performance features:
 * - 56x34 heightfield grid with smooth bilinear upscaling
 * - Precomputed sine table replacing 8,400+ trig calls per frame
 * - Single-path batched contour line rendering (2 stroke calls vs 40+)
 * - Instant sleep when idle (0% CPU/GPU when cursor is static)
 * - Adaptive framerate throttling during high-speed window scroll
 */
export const MouseWaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // High efficiency fluid heightfield grid (56 x 34 = 1,904 cells)
    const cols = 56;
    const rows = 34;
    const totalCells = cols * rows;

    let currentBuffer = new Float32Array(totalCells);
    let previousBuffer = new Float32Array(totalCells);

    // Offscreen buffer for fluid caustics rendering
    const offscreen = document.createElement('canvas');
    offscreen.width = cols;
    offscreen.height = rows;
    const offCtx = offscreen.getContext('2d', { willReadFrequently: false });
    if (!offCtx) return;
    const imgData = offCtx.createImageData(cols, rows);
    const data32 = new Uint32Array(imgData.data.buffer);

    let screenWidth = (canvas.width = window.innerWidth);
    let screenHeight = (canvas.height = window.innerHeight);
    const dpr = 1.0; // Optimized fillrate

    const resize = () => {
      if (!canvas) return;
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      canvas.width = screenWidth;
      canvas.height = screenHeight;
      canvas.style.width = `${screenWidth}px`;
      canvas.style.height = `${screenHeight}px`;
    };

    resize();

    // Mouse tracking
    let lastX = -1;
    let lastY = -1;
    let currentX = screenWidth / 2;
    let currentY = screenHeight / 2;
    let lastTime = performance.now();
    let hasMouseMoved = false;
    let lastActivityTime = performance.now();
    let isSleeping = false;
    let isScrolling = false;
    let scrollTimeout: any = null;
    let rafId: number;

    // Expanding wave crest rings
    interface WaterRing {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      decay: number;
      speed: number;
      color: 'amber' | 'cyan';
      lineWidth: number;
    }
    const waterRings: WaterRing[] = [];

    // Inject water displacement into heightfield
    const disturbWater = (x: number, y: number, radius: number, strength: number) => {
      const gridX = ((x / screenWidth) * cols) | 0;
      const gridY = ((y / screenHeight) * rows) | 0;
      const r = Math.max(1, radius | 0);

      const minX = Math.max(1, gridX - r);
      const maxX = Math.min(cols - 2, gridX + r);
      const minY = Math.max(1, gridY - r);
      const maxY = Math.min(rows - 2, gridY + r);

      const rSq = r * r;

      for (let j = minY; j <= maxY; j++) {
        const rowOffset = j * cols;
        for (let i = minX; i <= maxX; i++) {
          const dx = i - gridX;
          const dy = j - gridY;
          const distSq = dx * dx + dy * dy;
          if (distSq < rSq) {
            const factor = 1 - Math.sqrt(distSq) / r;
            currentBuffer[rowOffset + i] += strength * factor * factor;
          }
        }
      }

      wakeSimulation();
    };

    const wakeSimulation = () => {
      lastActivityTime = performance.now();
      if (isSleeping) {
        isSleeping = false;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (x: number, y: number) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      hasMouseMoved = true;
      currentX = x;
      currentY = y;

      if (lastX >= 0 && lastY >= 0) {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = (dist / dt) * 16;

        if (dist > 3) {
          const intensity = Math.min(speed * 0.24, 6.5);
          const radius = Math.min(1.8 + speed * 0.08, 4.2);
          disturbWater(x, y, radius, intensity);

          // Localized ripple wake rings
          if (dist > 18 && waterRings.length < 5) {
            const ringType = Math.random() > 0.45 ? 'cyan' : 'amber';
            waterRings.push({
              x: x,
              y: y,
              radius: 4,
              maxRadius: 35 + Math.min(speed * 3.2, 85),
              opacity: 0.5,
              decay: 0.026,
              speed: 1.6 + speed * 0.1,
              color: ringType,
              lineWidth: 1.2,
            });
          }
        }
      }

      lastX = x;
      lastY = y;
      lastTime = now;
      wakeSimulation();
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      disturbWater(e.clientX, e.clientY, 5.0, 12.0);
      waterRings.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 110,
        opacity: 0.65,
        decay: 0.022,
        speed: 2.0,
        color: 'amber',
        lineWidth: 1.8,
      });
      wakeSimulation();
    };

    const onWindowScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    let t = 0;
    let lastFrameTime = performance.now();

    // Simulation loop
    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      // Cap simulation tick to ~60fps
      if (now - lastFrameTime < 14) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = now;

      t += 0.014;

      // 1. 2D Wave Propagation Simulation
      const damping = 0.975;
      let totalEnergy = 0;

      for (let y = 1; y < rows - 1; y++) {
        const rowOffset = y * cols;
        for (let x = 1; x < cols - 1; x++) {
          const idx = rowOffset + x;
          const waveHeight =
            (previousBuffer[idx - 1] +
              previousBuffer[idx + 1] +
              previousBuffer[idx - cols] +
              previousBuffer[idx + cols]) *
              0.5 -
            currentBuffer[idx];

          const dampedVal = waveHeight * damping;
          currentBuffer[idx] = dampedVal;
          totalEnergy += Math.abs(dampedVal);
        }
      }

      // Buffer swap
      const temp = previousBuffer;
      previousBuffer = currentBuffer;
      currentBuffer = temp;

      // Idle sleep check: if water is still, no rings, and no pointer activity for 1.8s
      if (totalEnergy < 0.06 && waterRings.length === 0 && now - lastActivityTime > 1800) {
        isSleeping = true;
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        return;
      }

      // 2. Render Oceanic Caustics & Liquid Shading using Fast Trigonometric Lookups
      const lightX = 0.3;
      const lightY = -0.7;
      const lightZ = 0.65;

      let pixelIdx = 0;

      for (let y = 0; y < rows; y++) {
        const ny = y / rows;
        const rowOffset = y * cols;

        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const idx = rowOffset + x;

          // Harmonic ocean swells via fast table lookups
          const oceanSwell =
            fastSin(nx * 4.8 + ny * 2.6 + t * 0.9) * 1.3 +
            fastCos(nx * 3.5 - ny * 3.8 + t * 0.7) * 1.0;

          const waterH = currentBuffer[idx];
          const h = waterH + oceanSwell;

          // Surface slope / normal
          const leftH = x > 0 ? currentBuffer[idx - 1] : h;
          const rightH = x < cols - 1 ? currentBuffer[idx + 1] : h;
          const upH = y > 0 ? currentBuffer[idx - cols] : h;
          const downH = y < rows - 1 ? currentBuffer[idx + cols] : h;

          const dX = (rightH - leftH) * 0.5;
          const dY = (downH - upH) * 0.5;

          // Specular highlights on wave crests
          const diffuse = Math.max(0, -dX * lightX - dY * lightY + lightZ * 0.08);
          const specular = diffuse * diffuse * diffuse * 1.05;

          const swellIntensity = Math.max(0, h * 0.10);
          const r = Math.min(255, (8 + specular * 180 + swellIntensity * 24) | 0);
          const g = Math.min(255, (15 + specular * 165 + swellIntensity * 70) | 0);
          const b = Math.min(255, (25 + specular * 140 + swellIntensity * 115) | 0);

          const waveEnergy = Math.abs(waterH);
          const alpha = Math.min(
            145,
            Math.max(0, (8 + specular * 85 + waveEnergy * 22) | 0)
          );

          data32[pixelIdx++] = (alpha << 24) | (b << 16) | (g << 8) | r;
        }
      }

      offCtx.putImageData(imgData, 0, 0);

      // 3. Clear main screen canvas
      ctx.clearRect(0, 0, screenWidth, screenHeight);

      // 4. Draw Smoothed Fluid Oceanic Caustic Layer
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.globalCompositeOperation = 'screen';
      ctx.drawImage(offscreen, 0, 0, screenWidth, screenHeight);
      ctx.restore();

      // Skip heavy vector lines while scrolling fast to maximize frame rate
      if (!isScrolling) {
        // 5. RENDER BATCHED WARPED GRID CONTOURS
        const gridSpacingY = 80;
        const gridSpacingX = 96;
        const sampleStep = 40;

        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // Batched horizontal water lines (1 single stroke call)
        ctx.beginPath();
        for (let y = gridSpacingY; y < screenHeight; y += gridSpacingY) {
          let isStarted = false;
          for (let x = 0; x <= screenWidth + sampleStep; x += sampleStep) {
            const gx = Math.min(cols - 1, Math.max(0, ((x / screenWidth) * cols) | 0));
            const gy = Math.min(rows - 1, Math.max(0, ((y / screenHeight) * rows) | 0));
            const hVal = currentBuffer[gy * cols + gx];

            const nx = x / screenWidth;
            const ny = y / screenHeight;
            const swell = fastSin(nx * 4.5 + ny * 2.8 + t * 0.9) * 3.2;
            const warpedY = y + hVal * 9.5 + swell;

            if (!isStarted) {
              ctx.moveTo(x, warpedY);
              isStarted = true;
            } else {
              ctx.lineTo(x, warpedY);
            }
          }
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.055)';
        ctx.lineWidth = 0.9;
        ctx.stroke();

        // Batched vertical water lines (1 single stroke call)
        ctx.beginPath();
        for (let x = gridSpacingX; x < screenWidth; x += gridSpacingX) {
          let isStarted = false;
          for (let y = 0; y <= screenHeight + sampleStep; y += sampleStep) {
            const gx = Math.min(cols - 1, Math.max(0, ((x / screenWidth) * cols) | 0));
            const gy = Math.min(rows - 1, Math.max(0, ((y / screenHeight) * rows) | 0));
            const hVal = currentBuffer[gy * cols + gx];

            const nx = x / screenWidth;
            const ny = y / screenHeight;
            const swell = fastCos(nx * 3.5 - ny * 3.2 + t * 0.8) * 2.6;
            const warpedX = x + hVal * 8.5 + swell;

            if (!isStarted) {
              ctx.moveTo(warpedX, y);
              isStarted = true;
            } else {
              ctx.lineTo(warpedX, y);
            }
          }
        }
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.045)';
        ctx.lineWidth = 0.85;
        ctx.stroke();

        ctx.restore();
      }

      // 6. Render Water Wake Rings
      if (waterRings.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = waterRings.length - 1; i >= 0; i--) {
          const ring = waterRings[i];
          ring.radius += ring.speed;
          ring.opacity -= ring.decay;

          if (ring.opacity <= 0 || ring.radius >= ring.maxRadius) {
            waterRings.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);

          const progress = ring.radius / ring.maxRadius;
          const width = Math.max(0.5, ring.lineWidth * (1 - progress * 0.55));

          ctx.strokeStyle =
            ring.color === 'cyan'
              ? `rgba(56, 189, 248, ${(ring.opacity * 0.38).toFixed(3)})`
              : `rgba(251, 191, 36, ${(ring.opacity * 0.32).toFixed(3)})`;

          ctx.lineWidth = width;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 7. Ambient Luminous Water Halo Following the Pointer
      if (hasMouseMoved && !isScrolling) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const halo = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 120);
        halo.addColorStop(0, 'rgba(56, 189, 248, 0.055)');
        halo.addColorStop(0.4, 'rgba(251, 191, 36, 0.02)');
        halo.addColorStop(1, 'transparent');

        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 120, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mousedown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] select-none"
      style={{
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
};
