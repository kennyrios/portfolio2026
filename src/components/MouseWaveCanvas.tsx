import React, { useEffect, useRef } from 'react';

/**
 * High-Visibility Oceanic Fluid Sea Background Canvas
 * Directly simulates an interactive liquid sea surface where the mouse pointer physically
 * deforms the water, creating rolling ocean swells, warped contour grid lines,
 * and propagating liquid caustics.
 */
export const MouseWaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fluid heightfield grid resolution
    const cols = 160;
    const rows = 95;
    const totalCells = cols * rows;

    let currentBuffer = new Float32Array(totalCells);
    let previousBuffer = new Float32Array(totalCells);

    // Offscreen buffer for fluid caustics rendering
    const offscreen = document.createElement('canvas');
    offscreen.width = cols;
    offscreen.height = rows;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;
    const imgData = offCtx.createImageData(cols, rows);
    const data32 = new Uint32Array(imgData.data.buffer);

    let screenWidth = (canvas.width = window.innerWidth);
    let screenHeight = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      canvas.width = screenWidth * dpr;
      canvas.height = screenHeight * dpr;
      canvas.style.width = `${screenWidth}px`;
      canvas.style.height = `${screenHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    // Mouse tracking
    let lastX = -1;
    let lastY = -1;
    let currentX = screenWidth / 2;
    let currentY = screenHeight / 2;
    let lastTime = performance.now();
    let hasMouseMoved = false;

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
      const gridX = Math.floor((x / screenWidth) * cols);
      const gridY = Math.floor((y / screenHeight) * rows);
      const r = Math.max(1, Math.floor(radius));

      const minX = Math.max(1, gridX - r);
      const maxX = Math.min(cols - 2, gridX + r);
      const minY = Math.max(1, gridY - r);
      const maxY = Math.min(rows - 2, gridY + r);

      for (let j = minY; j <= maxY; j++) {
        for (let i = minX; i <= maxX; i++) {
          const dx = i - gridX;
          const dy = j - gridY;
          const distSq = dx * dx + dy * dy;
          if (distSq < r * r) {
            const factor = 1 - Math.sqrt(distSq) / r;
            const idx = j * cols + i;
            currentBuffer[idx] += strength * factor * factor;
          }
        }
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
          // Visible water displacement scaled with pointer speed - balanced for refined subtlety
          const intensity = Math.min(speed * 0.24, 6.8);
          const radius = Math.min(2.2 + speed * 0.08, 6.0);
          disturbWater(x, y, radius, intensity);

          // Subtle propagating water rings
          if (waterRings.length < 28 && dist > 14) {
            waterRings.push({
              x,
              y,
              radius: 5,
              maxRadius: 30 + Math.min(speed * 1.5, 50),
              opacity: Math.min(0.55, 0.26 + speed * 0.02),
              decay: 0.02,
              speed: 1.6 + Math.min(speed * 0.06, 2.0),
              color: Math.random() > 0.4 ? 'cyan' : 'amber',
              lineWidth: 1.2,
            });
          }

          lastX = x;
          lastY = y;
          lastTime = now;
        }
      } else {
        lastX = x;
        lastY = y;
        lastTime = now;
        disturbWater(x, y, 3, 4.2);
      }
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
      // Tactile wave splash on click - tuned slightly more subtle
      disturbWater(e.clientX, e.clientY, 9, 14);
      for (let k = 0; k < 3; k++) {
        waterRings.push({
          x: e.clientX,
          y: e.clientY,
          radius: 6 + k * 12,
          maxRadius: 130 + k * 30,
          opacity: 0.65,
          decay: 0.018,
          speed: 2.6,
          color: k % 2 === 0 ? 'amber' : 'cyan',
          lineWidth: 1.5,
        });
      }
    };

    let rafId: number;
    let t = 0;

    // Simulation loop
    const animate = () => {
      t += 0.012;

      // 1. 2D Wave Propagation Simulation (Water Physics)
      const damping = 0.978;

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

          currentBuffer[idx] = waveHeight * damping;
        }
      }

      // Buffer swap
      const temp = previousBuffer;
      previousBuffer = currentBuffer;
      currentBuffer = temp;

      // 2. Render Oceanic Caustics & Liquid Shading
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

          // Harmonic ocean swells
          const oceanSwell =
            Math.sin(nx * 4.8 + ny * 2.6 + t * 0.9) * 1.4 +
            Math.cos(nx * 3.5 - ny * 3.8 + t * 0.7) * 1.1 +
            Math.sin(nx * 7.5 + ny * 5.5 - t * 1.2) * 0.5;

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
          const specular = Math.pow(diffuse, 3.0) * 1.05;

          // Color palette: deep marine abyss with luminous cyan & amber caustics
          const swellIntensity = Math.max(0, h * 0.10);
          const r = Math.min(255, Math.floor(8 + specular * 180 + swellIntensity * 24));
          const g = Math.min(255, Math.floor(15 + specular * 165 + swellIntensity * 70));
          const b = Math.min(255, Math.floor(25 + specular * 140 + swellIntensity * 115));

          // Refined alpha modulation: subtly illuminates water movement without dominating
          const waveEnergy = Math.abs(waterH);
          const alpha = Math.min(
            160,
            Math.max(0, Math.floor(8 + specular * 95 + waveEnergy * 26))
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
      ctx.imageSmoothingQuality = 'high';
      ctx.globalCompositeOperation = 'screen';
      ctx.drawImage(offscreen, 0, 0, screenWidth, screenHeight);
      ctx.restore();

      // 5. RENDER THE INTERACTIVE LIQUID SEA SURFACE MESH (Warped Grid Contours)
      // Horizontal and vertical grid lines physically warp and undulate with water displacement!
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const gridSpacingX = 64;
      const gridSpacingY = 54;
      const sampleStep = 18;

      // Draw undulating horizontal water contour lines
      for (let y = gridSpacingY; y < screenHeight; y += gridSpacingY) {
        ctx.beginPath();
        let isStarted = false;

        for (let x = 0; x <= screenWidth + sampleStep; x += sampleStep) {
          // Sample water heightfield at (x, y)
          const gx = Math.min(cols - 1, Math.max(0, Math.floor((x / screenWidth) * cols)));
          const gy = Math.min(rows - 1, Math.max(0, Math.floor((y / screenHeight) * rows)));
          const hVal = currentBuffer[gy * cols + gx];

          // Ambient wave swell at point
          const nx = x / screenWidth;
          const ny = y / screenHeight;
          const swell = Math.sin(nx * 4.5 + ny * 2.8 + t * 0.9) * 3.8;

          // Warped y position: water displacement gently lifts/dips the line
          const warpedY = y + hVal * 11 + swell;

          if (!isStarted) {
            ctx.moveTo(x, warpedY);
            isStarted = true;
          } else {
            ctx.lineTo(x, warpedY);
          }
        }

        // Proximity glow to pointer
        const distToMouse = Math.abs(currentY - y);
        const mouseFactor = Math.max(0, 1 - distToMouse / 200);
        const lineAlpha = (0.035 + mouseFactor * 0.14).toFixed(3);

        ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
        ctx.lineWidth = 0.85 + mouseFactor * 0.5;
        ctx.stroke();
      }

      // Draw undulating vertical water contour lines
      for (let x = gridSpacingX; x < screenWidth; x += gridSpacingX) {
        ctx.beginPath();
        let isStarted = false;

        for (let y = 0; y <= screenHeight + sampleStep; y += sampleStep) {
          const gx = Math.min(cols - 1, Math.max(0, Math.floor((x / screenWidth) * cols)));
          const gy = Math.min(rows - 1, Math.max(0, Math.floor((y / screenHeight) * rows)));
          const hVal = currentBuffer[gy * cols + gx];

          const nx = x / screenWidth;
          const ny = y / screenHeight;
          const swell = Math.cos(nx * 3.5 - ny * 3.2 + t * 0.8) * 3.0;

          const warpedX = x + hVal * 9.5 + swell;

          if (!isStarted) {
            ctx.moveTo(warpedX, y);
            isStarted = true;
          } else {
            ctx.lineTo(warpedX, y);
          }
        }

        const distToMouse = Math.abs(currentX - x);
        const mouseFactor = Math.max(0, 1 - distToMouse / 200);
        const lineAlpha = (0.028 + mouseFactor * 0.12).toFixed(3);

        ctx.strokeStyle = `rgba(251, 191, 36, ${lineAlpha})`;
        ctx.lineWidth = 0.8 + mouseFactor * 0.45;
        ctx.stroke();
      }

      ctx.restore();

      // 6. Render Visible Water Wake Rings (Propagating Ripple Waves)
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

          if (ring.color === 'cyan') {
            ctx.strokeStyle = `rgba(56, 189, 248, ${(ring.opacity * 0.42).toFixed(3)})`;
          } else {
            ctx.strokeStyle = `rgba(251, 191, 36, ${(ring.opacity * 0.38).toFixed(3)})`;
          }

          ctx.lineWidth = width;
          ctx.stroke();

          // Soft ambient water wave crest fill
          if (ring.radius < 70) {
            const grad = ctx.createRadialGradient(
              ring.x,
              ring.y,
              ring.radius * 0.6,
              ring.x,
              ring.y,
              ring.radius
            );
            grad.addColorStop(0, 'transparent');
            grad.addColorStop(
              1,
              ring.color === 'cyan'
                ? `rgba(56, 189, 248, ${(ring.opacity * 0.08).toFixed(3)})`
                : `rgba(251, 191, 36, ${(ring.opacity * 0.06).toFixed(3)})`
            );
            ctx.fillStyle = grad;
            ctx.fill();
          }
        }

        ctx.restore();
      }

      // 7. Ambient Luminous Water Halo Following the Pointer
      if (hasMouseMoved) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const halo = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 140);
        halo.addColorStop(0, 'rgba(56, 189, 248, 0.07)');
        halo.addColorStop(0.4, 'rgba(251, 191, 36, 0.03)');
        halo.addColorStop(1, 'transparent');

        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 140, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mousedown', onPointerDown, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
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
