// ============================================================================
// AUDIO EFFECTS & BIRTHDAY MUSIC SYNTHESIS (Web Audio API)
// Provides standalone, zero-dependency audio so the website plays music & SFX
// reliably on any device without relying on external MP3 URLs.
// ============================================================================

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Background Birthday Tune state
let isBgmPlaying = false;
let bgmTimeoutId = null;
let bgmGainNode = null;

// Happy Birthday melody notes and durations (in Hz)
// Happy (G4 G4) Birth-(A4) -day (G4) to (C5) You (B4) ...
const NOTE_FREQS = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
};

const BIRTHDAY_SONG = [
  // Measure 1
  { note: 'G4', dur: 0.35, pause: 0.08 },
  { note: 'G4', dur: 0.35, pause: 0.08 },
  { note: 'A4', dur: 0.7, pause: 0.1 },
  { note: 'G4', dur: 0.7, pause: 0.1 },
  { note: 'C5', dur: 0.7, pause: 0.1 },
  { note: 'B4', dur: 1.2, pause: 0.25 },

  // Measure 2
  { note: 'G4', dur: 0.35, pause: 0.08 },
  { note: 'G4', dur: 0.35, pause: 0.08 },
  { note: 'A4', dur: 0.7, pause: 0.1 },
  { note: 'G4', dur: 0.7, pause: 0.1 },
  { note: 'D5', dur: 0.7, pause: 0.1 },
  { note: 'C5', dur: 1.2, pause: 0.25 },

  // Measure 3
  { note: 'G4', dur: 0.35, pause: 0.08 },
  { note: 'G4', dur: 0.35, pause: 0.08 },
  { note: 'G5', dur: 0.7, pause: 0.1 },
  { note: 'E5', dur: 0.7, pause: 0.1 },
  { note: 'C5', dur: 0.7, pause: 0.1 },
  { note: 'B4', dur: 0.7, pause: 0.1 },
  { note: 'A4', dur: 1.1, pause: 0.25 },

  // Measure 4
  { note: 'F5', dur: 0.35, pause: 0.08 },
  { note: 'F5', dur: 0.35, pause: 0.08 },
  { note: 'E5', dur: 0.7, pause: 0.1 },
  { note: 'C5', dur: 0.7, pause: 0.1 },
  { note: 'D5', dur: 0.7, pause: 0.1 },
  { note: 'C5', dur: 1.5, pause: 0.6 },
];

/**
 * Plays a single sweet celesta / music box bell tone
 */
function playBellNote(ctx, freq, startTime, duration, masterGain) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const noteGain = ctx.createGain();

  // Sine + subtle triangle for a warm music-box glockenspiel feel
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, startTime);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, startTime); // harmonic sparkle

  // Fast attack, natural exponential decay
  noteGain.gain.setValueAtTime(0.0001, startTime);
  noteGain.gain.linearRampToValueAtTime(0.28, startTime + 0.03);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc1.connect(noteGain);
  osc2.connect(noteGain);
  noteGain.connect(masterGain);

  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + duration);
  osc2.stop(startTime + duration);
}

/**
 * Start or resume playing the background birthday melody (looping)
 */
export function startBirthdayMusic(volume = 0.6) {
  const ctx = getAudioContext();
  if (!ctx) return;
  isBgmPlaying = true;

  if (!bgmGainNode) {
    bgmGainNode = ctx.createGain();
    bgmGainNode.connect(ctx.destination);
  }
  bgmGainNode.gain.setValueAtTime(volume * 0.5, ctx.currentTime);

  function scheduleMelody() {
    if (!isBgmPlaying) return;
    let t = ctx.currentTime + 0.1;

    for (const item of BIRTHDAY_SONG) {
      if (!isBgmPlaying) break;
      const freq = NOTE_FREQS[item.note] || 440;
      playBellNote(ctx, freq, t, item.dur + 0.4, bgmGainNode);
      t += item.dur + item.pause;
    }

    const totalDur = (t - ctx.currentTime) * 1000;
    bgmTimeoutId = setTimeout(() => {
      if (isBgmPlaying) {
        scheduleMelody();
      }
    }, Math.max(1000, totalDur));
  }

  scheduleMelody();
}

/**
 * Stop background birthday melody
 */
export function stopBirthdayMusic() {
  isBgmPlaying = false;
  if (bgmTimeoutId) {
    clearTimeout(bgmTimeoutId);
    bgmTimeoutId = null;
  }
}

export function isMusicPlaying() {
  return isBgmPlaying;
}

export function setMusicVolume(volume) {
  if (bgmGainNode && audioCtx) {
    bgmGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.5)), audioCtx.currentTime);
  }
}

// ============================================================================
// SOUND EFFECTS
// ============================================================================

/**
 * Candle blowing sound (soft rush of air like a warm breath)
 */
export function playCandleBlowSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.8;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // White noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(700, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.7);
  filter.Q.value = 1.8;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.75);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();
}

/**
 * Knife slicing sound (metallic swoosh + sweet sparkle chime)
 */
export function playKnifeSliceSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Gentle slice swish
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(900, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.28);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);

  // Sparkle chime
  setTimeout(() => {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.value = freq;

      const st = ctx.currentTime + idx * 0.05;
      chimeGain.gain.setValueAtTime(0.2, st);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, st + 0.4);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(st);
      chimeOsc.stop(st + 0.4);
    });
  }, 120);
}

/**
 * Cheerful celebration fanfare / party horn & chords
 */
export function playCelebrationSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const chords = [
    [523.25, 659.25, 783.99], // C major
    [587.33, 739.99, 880.00], // D major
    [659.25, 830.61, 987.77], // E major
    [1046.50, 1318.51, 1567.98], // High C major burst!
  ];

  chords.forEach((chord, i) => {
    const st = ctx.currentTime + i * 0.14;
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.12, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + 0.5);
    });
  });
}

/**
 * Balloon pop sound (satisfying quick pop)
 */
export function playBalloonPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(250, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.07);

  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

/**
 * Gift box open sound (magical ascending harp / chime)
 */
export function playGiftOpenSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [392, 440, 523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const st = ctx.currentTime + idx * 0.07;
    gain.gain.setValueAtTime(0.2, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(st);
    osc.stop(st + 0.5);
  });
}

/**
 * Envelope open sound (soft paper slide + warm tone)
 */
export function playEnvelopeOpenSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);

  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}

/**
 * Typewriter soft click
 */
export function playTypewriterSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1400 + Math.random() * 400, ctx.currentTime);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.03);
}

/**
 * Fireworks burst sound (low boom + shimmering sparkles)
 */
export function playFireworkBurstSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Low boom
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4);

  gain.gain.setValueAtTime(0.35, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.45);
}

