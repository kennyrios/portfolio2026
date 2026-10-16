# Implementation Plan: Interactive Mouse Pointer Wave & Ripple Canvas

Implement a full-viewport, 60fps interactive fluid wave and luminous ripple simulation in the background that reacts organically to the mouse pointer, inspired by the tactile liquid and cloth-like deformation on Mathis Biabiany's portfolio website.

## User Requirements & Clarifications
- **Visual Style**: Fluid luminous ripples that gently distort and illuminate the background canvas.
- **Physics & Decay**: Smooth organic spring decay with moderate ripple radius, scaling with cursor velocity.
- **Coverage**: Full viewport across the entire portfolio behind content layers, sleeping when idle for zero battery/CPU overhead.

## Architecture & Technical Components

1. **`MouseWaveCanvas` Component (`src/components/MouseWaveCanvas.tsx`)**:
   - Hardware-accelerated 2D Canvas fixed across `inset-0 pointer-events-none z-[1]`.
   - **Physics Simulation**:
     - Particle & Wavelet Ring Engine: Tracks cursor position, velocity vector, and acceleration.
     - Spawns multi-frequency wave rings with exponential spring dampening ($R(t) = R_0 + v \cdot \sin(\omega t) \cdot e^{-\gamma t}$).
     - Dual-tinted luminous chromatic caustics: Amber-gold crests and cyan/indigo wave troughs with soft radial gradients that blend (`screen` / `lighter`) over the obsidian paper texture.
     - Velocity-reactive: Rapid mouse swipes produce wider, energetic wake ripples; slow movements produce delicate micro-ripples.
   - **Performance & Battery Optimization**:
     - RAF loop auto-sleeps after ripples have fully dissipated (0 idle CPU usage).
     - Subsampled resolution buffer or high-DPI clamped canvas with automatic frame throttling.
     - Respects `prefers-reduced-motion`.

2. **Integration with `AmbientDarkAtmosphere.tsx`**:
   - Mount `MouseWaveCanvas` directly within the fixed atmosphere stack between the base canvas substrate and the parallax auroras.
   - Harmonize with the procedural linen weave and film grain so the wave feels physical and tactile, as if disturbing liquid ink on textured fine art paper.

3. **Interactivity & Touch Support**:
   - Captures both mouse cursor movements on desktop and gentle touch dragging on mobile/tablet devices.
   - Subtle pulse emission on pointer down / click events for tactile feedback.

## Verification Plan
1. **Interactive Motion Check**: Test mouse sweeps across all viewport areas to verify organic wave propagation and smooth spring decay.
2. **Performance Audit**: Ensure RAF sleep mechanism activates when idle and maintains a steady 60fps during rapid cursor movements.
3. **Accessibility**: Verify instant deactivation when `prefers-reduced-motion: reduce` is toggled.
4. **Codebase Validation**: Run `lint_applet` and `compile_applet` to confirm zero errors or regressions.
