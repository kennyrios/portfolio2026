/**
 * Web Audio API ambient chime synthesizer
 * Produces subtle, soothing harmonic bells when light is painted on scroll.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;
  private lastPlayTime: number = 0;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playChime(440, 0.08);
    }
    return this.enabled;
  }

  public playChime(frequency: number = 528, volume: number = 0.05) {
    if (!this.enabled) return;
    const now = performance.now();
    // Throttle sound to prevent audio stacking
    if (now - this.lastPlayTime < 90) return;
    this.lastPlayTime = now;

    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      // Soft exponential decay
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.46);
    } catch {
      // Ignore audio context errors gracefully
    }
  }

  public playScrollChime(speed: number) {
    if (!this.enabled) return;
    // Pentatonic scale notes based on scroll velocity
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
    const index = Math.min(notes.length - 1, Math.max(0, Math.floor(speed * 0.1) % notes.length));
    const freq = notes[index];
    const vol = Math.min(0.06, 0.015 + speed * 0.002);
    this.playChime(freq, vol);
  }
}

export const soundEngine = new SoundEngine();
