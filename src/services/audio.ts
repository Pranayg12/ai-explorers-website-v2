// Web Audio API Retro Sound Effects & Chiptune Music Synthesizer

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private sfxMuted: boolean = false;
  private bgmMuted: boolean = false;
  private currentBgmTrack: string | null = null;
  private bgmIntervalId: any = null;
  private isBgmPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSfx(mute?: boolean): boolean {
    this.sfxMuted = mute !== undefined ? mute : !this.sfxMuted;
    return this.sfxMuted;
  }

  public toggleBgm(mute?: boolean): boolean {
    this.bgmMuted = mute !== undefined ? mute : !this.bgmMuted;
    if (this.bgmMuted) {
      this.stopBgm();
    } else if (this.currentBgmTrack) {
      this.playBgm(this.currentBgmTrack, true);
    }
    return this.bgmMuted;
  }

  public isSfxMuted(): boolean {
    return this.sfxMuted;
  }

  public isBgmMuted(): boolean {
    return this.bgmMuted;
  }

  // --- SOUND EFFECTS ---

  public playJump() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playDoubleJump() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.2);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playCoin() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  public playBlockHit() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playBlockBreak() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Noise burst
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.linearRampToValueAtTime(200, now + 0.15);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.15);
  }

  public playPowerUpSpawn() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [330, 392, 659, 523, 587, 784];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.15, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.01, now + (i + 1) * 0.05);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.05);
      osc.stop(now + (i + 1) * 0.05);
    });
  }

  public playPowerUpEat() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(f, now + i * 0.04);

      gain.gain.setValueAtTime(0.2, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.01, now + i * 0.04 + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.06);
    });
  }

  public playFireball() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playStomp() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playPipe() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [300, 260, 220, 180, 140];
    freqs.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now + i * 0.06);

      gain.gain.setValueAtTime(0.2, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.01, now + (i + 1) * 0.06);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.06);
      osc.stop(now + (i + 1) * 0.06);
    });
  }

  public playFlagpole() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [261, 329, 392, 523, 659, 783, 1046];
    notes.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.1);

      gain.gain.setValueAtTime(0.2, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.01, now + i * 0.1 + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.2);
    });
  }

  public playBowserRoar() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.linearRampToValueAtTime(55, now + 0.6);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  public playLavaSplash() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(100, now + 0.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.8);
  }

  public playGreenStar() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523, 659, 783, 1046, 1318, 1567];
    notes.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.08);

      gain.gain.setValueAtTime(0.25, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.25);
    });
  }

  public playGameOver() {
    if (this.sfxMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    this.stopBgm();
    const now = this.ctx.currentTime;
    const notes = [392, 330, 293, 261, 220, 196, 164];
    notes.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now + i * 0.15);

      gain.gain.setValueAtTime(0.25, now + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.01, now + i * 0.15 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.25);
    });
  }

  // --- BACKGROUND CHIPTUNE MUSIC ---

  public playBgm(theme: string, forceStart: boolean = false) {
    if (this.currentBgmTrack === theme && this.isBgmPlaying && !forceStart) return;
    this.stopBgm();
    this.currentBgmTrack = theme;

    if (this.bgmMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isBgmPlaying = true;

    let notes: number[] = [];
    let noteDuration = 200; // ms

    if (theme === 'rolling_hills') {
      // Classic Overworld vibe
      notes = [
        659, 659, 0, 659, 0, 523, 659, 0,
        783, 0, 0, 0, 392, 0, 0, 0,
        523, 0, 0, 392, 0, 0, 329, 0,
        440, 0, 493, 0, 466, 440, 0, 392
      ];
      noteDuration = 180;
    } else if (theme === 'night_castle') {
      // Nighttime Castle vibe
      notes = [
        330, 392, 440, 392, 330, 293, 330, 0,
        261, 293, 330, 293, 261, 220, 261, 0,
        330, 440, 493, 440, 392, 330, 392, 0,
        293, 330, 392, 330, 293, 261, 220, 0
      ];
      noteDuration = 210;
    } else if (theme === 'peach_castle') {
      // Elegant Peach Castle theme
      notes = [
        523, 659, 783, 659, 523, 659, 783, 880,
        783, 659, 523, 440, 523, 659, 783, 0,
        587, 698, 880, 698, 587, 698, 880, 987,
        880, 698, 587, 493, 587, 698, 783, 0
      ];
      noteDuration = 190;
    } else if (theme === 'bowser_castle') {
      // Intense Boss / Bowser Lava theme
      notes = [
        130, 130, 146, 130, 164, 130, 146, 130,
        130, 130, 146, 130, 196, 174, 164, 146,
        110, 110, 123, 110, 130, 110, 123, 110,
        146, 130, 123, 110, 98, 110, 123, 0
      ];
      noteDuration = 150;
    } else if (theme === 'bonus_sky') {
      // Fast Star / Bonus Level theme
      notes = [
        783, 659, 523, 659, 783, 659, 523, 659,
        880, 698, 587, 698, 880, 698, 587, 698,
        987, 783, 659, 783, 987, 783, 659, 783,
        1046, 0, 1046, 0, 1046, 0, 1046, 0
      ];
      noteDuration = 130;
    }

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying || this.bgmMuted || !this.ctx) return;
      const freq = notes[noteIndex];
      if (freq > 0) {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = theme === 'bowser_castle' ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const vol = theme === 'bowser_castle' ? 0.12 : 0.08;
        gain.gain.setValueAtTime(vol, now);
        gain.gain.linearRampToValueAtTime(0.01, now + (noteDuration / 1000) * 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + (noteDuration / 1000) * 0.9);
      }

      noteIndex = (noteIndex + 1) % notes.length;
    };

    playNextNote();
    this.bgmIntervalId = setInterval(playNextNote, noteDuration);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }
}

export const audioEngine = new RetroAudioEngine();
