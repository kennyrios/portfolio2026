import React, { useEffect, useRef, useCallback } from 'react';
import { PlainBrushColorKey } from '../types/portfolio';

interface ThickPlainBrushScrollCanvasProps {
  colorKey: PlainBrushColorKey;
}

export const ThickPlainBrushScrollCanvas: React.FC<ThickPlainBrushScrollCanvasProps> = ({
  colorKey = 'sunlight',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Store active color in ref so color transitions never interrupt or restart the 60fps RAF loop
  const currentColorKey = useRef<PlainBrushColorKey>(colorKey);
  useEffect(() => {
    currentColorKey.current = colorKey;
  }, [colorKey]);

  // Smooth visual kinematics
  const targetScrollY = useRef(0);
  const visualScrollY = useRef(0);
  const lastFrameTime = useRef(performance.now());
  const smoothedVelocity = useRef(0); // Signed velocity (positive = down, negative = up)
  const smoothedAngle = useRef(Math.PI / 2);
  const animFrameId = useRef<number | null>(null);

  // Plain light pastel colors (pure flat wash, zero 3D)
  const getPlainColor = useCallback((key: PlainBrushColorKey) => {
    switch (key) {
      case 'peach':
        return {
          paint: 'rgba(254, 215, 170, 0.90)',
          soft: 'rgba(254, 215, 170, 0.40)',
          solid: '#fed7aa',
          accent: '#f97316',
        };
      case 'mint':
        return {
          paint: 'rgba(209, 250, 229, 0.90)',
          soft: 'rgba(209, 250, 229, 0.40)',
          solid: '#d1fae5',
          accent: '#10b981',
        };
      case 'lavender':
        return {
          paint: 'rgba(224, 231, 255, 0.90)',
          soft: 'rgba(224, 231, 255, 0.40)',
          solid: '#e0e7ff',
          accent: '#6366f1',
        };
      case 'sand':
        return {
          paint: 'rgba(244, 244, 245, 0.95)',
          soft: 'rgba(244, 244, 245, 0.45)',
          solid: '#f4f4f5',
          accent: '#71717a',
        };
      case 'sunlight':
      default:
        return {
          paint: 'rgba(254, 240, 138, 0.90)',
          soft: 'rgba(254, 240, 138, 0.40)',
          solid: '#fef08a',
          accent: '#eab308',
        };
    }
  }, []);

  // Smooth, organic S-curve X coordinate in document space
  const getDocX = useCallback((docY: number, viewportW: number) => {
    const k1 = 0.0011;
    const k2 = 0.00055;
    const wave = Math.sin(docY * k1) * 0.28 + Math.cos(docY * k2) * 0.1;
    return (0.5 + wave) * viewportW;
  }, []);

  // Closed-form exact derivative dx/dy for continuous, vibration-free tangent angle
  const getDocAngle = useCallback((docY: number, viewportW: number) => {
    const k1 = 0.0011;
    const k2 = 0.00055;
    // dx/dy = viewportW * (0.28 * k1 * cos(k1 * y) - 0.1 * k2 * sin(k2 * y))
    const dx_dy = viewportW * (0.000308 * Math.cos(docY * k1) - 0.000055 * Math.sin(docY * k2));
    // Vector pointing along downward flow is (dx_dy, 1)
    // Math.atan2(vy, vx) = Math.atan2(1, dx_dy)
    return Math.atan2(1, dx_dy);
  }, []);

  // Initialize scroll tracking on mount
  useEffect(() => {
    const initialY = window.scrollY;
    targetScrollY.current = initialY;
    visualScrollY.current = initialY;
    lastFrameTime.current = performance.now();
  }, []);

  // Passive, lightweight scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Uninterrupted 60FPS / 120FPS GPU Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const now = performance.now();
      const dt = Math.min(32, Math.max(1, now - lastFrameTime.current));
      lastFrameTime.current = now;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width;
      const h = canvas.height;
      const cssW = window.innerWidth;
      const vh = window.innerHeight;

      // 1. Butter-smooth kinematic scroll interpolation (eliminates wheel tick shudder)
      const scrollDiff = targetScrollY.current - visualScrollY.current;
      const scrollSmoothing = 1 - Math.exp(-dt * 0.024);
      if (Math.abs(scrollDiff) < 0.05) {
        visualScrollY.current = targetScrollY.current;
      } else {
        visualScrollY.current += scrollDiff * scrollSmoothing;
      }

      // 2. Track smooth signed velocity (for brush drag flex & width)
      const instVelocity = scrollDiff / dt;
      smoothedVelocity.current += (instVelocity - smoothedVelocity.current) * (1 - Math.exp(-dt * 0.015));

      const absSpeed = Math.abs(smoothedVelocity.current);
      const isScrollingDown = smoothedVelocity.current >= 0;

      // 3. Physical Brush Head viewport positioning
      // Sits comfortably at 54% of viewport; flexes gently with scroll dynamics
      const brushScreenY = vh * 0.54;
      const headDocY = visualScrollY.current + brushScreenY;

      // Tail starts slightly above the viewport so the entire screen stays painted
      const tailDocY = Math.max(0, visualScrollY.current - 140);

      // 4. Clear canvas every frame (guarantees zero leftover stella when scrolling back up)
      ctx.clearRect(0, 0, w, h);

      const colorData = getPlainColor(currentColorKey.current);

      // Extra thick flat brush ribbon width: 220px to 280px (Plain light color, zero 3D)
      const baseWidth = (230 + Math.min(50, absSpeed * 15)) * dpr;

      // 5. Continuous dense path generation (Uniform 6px sampling prevents spline jitter)
      const step = 6;
      const startY = tailDocY;
      const endY = headDocY;
      const totalSteps = Math.max(2, Math.ceil((endY - startY) / step));

      // -------------------------------------------------------------
      // A. Draw the Continuous, Extra-Thick Plain Color Paint Ribbon
      // -------------------------------------------------------------
      ctx.save();

      // Path for the ribbon
      ctx.beginPath();
      for (let i = 0; i <= totalSteps; i++) {
        const dY = Math.min(endY, startY + i * step);
        const dX = getDocX(dY, cssW);
        const sx = dX * dpr;
        const sy = (dY - visualScrollY.current) * dpr;
        if (i === 0) {
          ctx.moveTo(sx, sy);
        } else {
          ctx.lineTo(sx, sy);
        }
      }

      // 1. Soft feathered wash edge (mimics smooth flat gouache/watercolor on paper)
      // Note: lineCap = 'butt' ensures paint terminates cleanly right at the bristle edge
      ctx.strokeStyle = colorData.soft;
      ctx.lineWidth = baseWidth * 1.08;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // 2. Solid plain light color core
      ctx.strokeStyle = colorData.paint;
      ctx.lineWidth = baseWidth;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.restore();

      // -------------------------------------------------------------
      // B. Draw the Active Physical Brush Head Actively Painting
      // -------------------------------------------------------------
      const tipDocX = getDocX(headDocY, cssW);
      const headScreenX = tipDocX * dpr;
      const headScreenY = brushScreenY * dpr;

      // Butter-smooth tangent angle interpolation
      const targetAngle = getDocAngle(headDocY, cssW);
      let angleDiff = targetAngle - smoothedAngle.current;
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
      smoothedAngle.current += angleDiff * (1 - Math.exp(-dt * 0.02));

      // Dynamic tilt & drag flex based on scroll speed and direction
      const dragTilt = Math.min(0.12, Math.max(-0.12, smoothedVelocity.current * 0.03));
      const currentAngle = smoothedAngle.current + dragTilt;

      const headWidth = baseWidth;
      const bristleLen = 32 * dpr;
      const ferruleLen = 26 * dpr;
      const handleLen = 120 * dpr;

      ctx.save();
      ctx.translate(headScreenX, headScreenY);
      ctx.rotate(currentAngle);

      // Subtle contact shadow underneath the brush head
      ctx.save();
      ctx.shadowColor = 'rgba(24, 24, 27, 0.16)';
      ctx.shadowBlur = 12 * dpr;
      ctx.shadowOffsetX = 3 * dpr;
      ctx.shadowOffsetY = 6 * dpr;

      // 1. Brush Handle (Matte charcoal architectural wood handle)
      ctx.beginPath();
      const handleW = 16 * dpr;
      ctx.rect(bristleLen + ferruleLen, -handleW / 2, handleLen, handleW);
      ctx.fillStyle = '#27272a';
      ctx.fill();

      // Rounded end cap of handle
      ctx.beginPath();
      ctx.arc(
        bristleLen + ferruleLen + handleLen,
        0,
        handleW / 2,
        -Math.PI / 2,
        Math.PI / 2
      );
      ctx.fillStyle = '#18181b';
      ctx.fill();

      // 2. Stainless Steel Ferrule
      ctx.beginPath();
      const ferruleW = headWidth * 0.88;
      ctx.rect(bristleLen, -ferruleW / 2, ferruleLen, ferruleW);
      ctx.fillStyle = '#71717a';
      ctx.fill();

      ctx.restore(); // remove shadow for bristle details

      // Ferrule crimp lines
      ctx.strokeStyle = '#52525b';
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.moveTo(bristleLen + ferruleLen * 0.5, -ferruleW / 2);
      ctx.lineTo(bristleLen + ferruleLen * 0.5, ferruleW / 2);
      ctx.stroke();

      // 3. Bristles Body (fans out from ferrule to full stroke width)
      ctx.beginPath();
      ctx.moveTo(bristleLen, -ferruleW / 2);
      ctx.lineTo(0, -headWidth / 2);
      ctx.lineTo(0, headWidth / 2);
      ctx.lineTo(bristleLen, ferruleW / 2);
      ctx.closePath();
      ctx.fillStyle = '#3f3f46';
      ctx.fill();

      // 4. Wet Paint on Bristle Tips (matches current plain color)
      ctx.beginPath();
      ctx.moveTo(bristleLen * 0.45, -headWidth * 0.46);
      ctx.lineTo(0, -headWidth / 2);
      ctx.lineTo(0, headWidth / 2);
      ctx.lineTo(bristleLen * 0.45, headWidth * 0.46);
      ctx.closePath();
      ctx.fillStyle = colorData.solid;
      ctx.fill();

      // 5. Authentic bristle separation strokes
      ctx.strokeStyle = 'rgba(24, 24, 27, 0.35)';
      ctx.lineWidth = 1.2 * dpr;
      [-0.36, -0.18, 0, 0.18, 0.36].forEach((ratio) => {
        ctx.beginPath();
        ctx.moveTo(bristleLen * 0.85, (ferruleW / 2) * ratio);
        ctx.lineTo(0, (headWidth / 2) * ratio);
        ctx.stroke();
      });

      // 6. Fresh Wet Paint Bead at Contact Edge (where paint is pressed onto paper)
      ctx.beginPath();
      ctx.ellipse(0, 0, 5 * dpr, headWidth / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = colorData.accent;
      ctx.globalAlpha = 0.55;
      ctx.fill();

      ctx.restore();

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [getPlainColor, getDocX, getDocAngle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
};
