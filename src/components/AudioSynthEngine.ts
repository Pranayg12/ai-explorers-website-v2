/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SynthEngine {
  private ctx: AudioContext | null = null;
  private isSynthesizing = false;
  private intervalId: any = null;
  private activeGenre: "chill" | "cyber" | "ambient" | "none" = "none";
  private step = 0;

  // Predefined notes for automatic procedural generation
  // Lofi Chill Progression (Cmaj7 -> Am9 -> Fmaj7 -> G6)
  private lofiChords = [
    [130.81, 164.81, 196.00, 246.94], // Cmaj7
    [110.00, 146.83, 174.61, 220.00], // Am9 / Fmaj
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [98.00, 146.83, 196.00, 293.66],  // G6
  ];

  // Cyber Punk Tech Progression (F# minor cyberpunk pulses)
  private cyberNotes = [92.50, 110.00, 138.59, 146.83, 164.81, 185.00];

  // Ambient Space Chords (Cosmic slow pads)
  private ambientChords = [
    [146.83, 220.00, 293.66, 440.00], // Dsus2
    [164.81, 246.94, 329.63, 493.88], // Em
    [196.00, 293.66, 392.00, 587.33], // Gmaj
    [220.00, 329.63, 440.00, 659.25], // Asus4
  ];

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  }

  setGenreFromAssetId(assetId: string) {
    this.init();
    if (assetId.includes("lofi")) {
      this.activeGenre = "chill";
    } else if (assetId.includes("cyber") || assetId.includes("tech")) {
      this.activeGenre = "cyber";
    } else if (assetId.includes("ambient") || assetId.includes("space")) {
      this.activeGenre = "ambient";
    } else {
      this.activeGenre = "none";
    }
  }

  start(assetId: string) {
    this.init();
    if (this.isSynthesizing) this.stop();
    this.setGenreFromAssetId(assetId);
    if (this.activeGenre === "none" || !this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isSynthesizing = true;
    this.step = 0;

    // We cycle steps every 400ms for rhythm
    this.intervalId = setInterval(() => {
      this.tick();
    }, 450);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isSynthesizing = false;
    this.activeGenre = "none";
  }

  playUIBeep() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {
      // Audio context may block prior to user gesture
    }
  }

  playUISplitCue() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.24);
    } catch (e) {}
  }

  private tick() {
    if (!this.ctx || this.ctx.state === "suspended") return;

    const time = this.ctx.currentTime;

    try {
      if (this.activeGenre === "chill") {
        // Slow Lo-Fi backing
        // Chord triggered on beat 0, soft pluck on alternating beats, slow vinyl static hiss simulation
        if (this.step % 8 === 0) {
          const chordIndex = Math.floor(this.step / 8) % this.lofiChords.length;
          const chord = this.lofiChords[chordIndex];
          chord.forEach((freq) => {
            this.playSineTone(freq, 0.03, 3.2, "sine");
          });
        }
        // Soft lead melody note
        if (this.step % 2 === 0 && Math.random() > 0.3) {
          const noteIndex = Math.floor(Math.random() * 4);
          const freqs = [329.63, 392.00, 440.00, 523.25]; // E, G, A, C plucks
          this.playSineTone(freqs[noteIndex], 0.015, 0.4, "triangle");
        }
      } else if (this.activeGenre === "cyber") {
        // Retro cyberpunk techno synth beat
        // Heavy bass drum synth trigger
        if (this.step % 4 === 0) {
          this.playBassDrum();
        }
        // Fast repeating bassline
        const note = this.cyberNotes[this.step % this.cyberNotes.length];
        this.playSineTone(note, 0.04 * (this.step % 3 === 0 ? 1.5 : 1), 0.3, "sawtooth");

        // High hat tick
        if (this.step % 2 === 1) {
          this.playSnareHiss();
        }
      } else if (this.activeGenre === "ambient") {
        // Planetary Cosmic Drone (Slow chord fade padding)
        if (this.step % 12 === 0) {
          const chordIndex = Math.floor(this.step / 12) % this.ambientChords.length;
          const chord = this.ambientChords[chordIndex];
          chord.forEach((freq, idx) => {
            // Stagger and slowly sweep frequencies
            this.playSineTone(freq, 0.015, 4.8, "sine");
          });
        }
      }

      this.step = (this.step + 1) % 192;
    } catch (e) {
      console.error("Synthesizer ticker error", e);
    }
  }

  private playSineTone(freq: number, startVol: number, decaySec: number, type: OscillatorType) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Filter node to make synth sound warmer and lowpass lofi-style
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(this.activeGenre === "cyber" ? 600 : 450, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(startVol, this.ctx.currentTime + 0.05); // attack
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + decaySec);

    osc.start();
    osc.stop(this.ctx.currentTime + decaySec + 0.1);
  }

  private playBassDrum() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.23);
  }

  private playSnareHiss() {
    if (!this.ctx) return;
    // Synthesis white noise
    const bufferSize = this.ctx.sampleRate * 0.06; // short noise burst
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(8000, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(this.ctx.currentTime + 0.07);
  }
}

export const audioSynthEngine = new SynthEngine();
