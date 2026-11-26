let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfxBus: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let volume = 0.7;

function ensure() {
  if (ctx) return;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC({ latencyHint: "interactive" });
  master = ctx.createGain();
  sfxBus = ctx.createGain();
  master.gain.value = volume * volume;
  sfxBus.connect(master);
  master.connect(ctx.destination);

  // Pre-bake one shared 0.32s white-noise buffer once so pumping/washing never allocates buffers mid-frame!
  const len = Math.max(1, Math.floor(ctx.sampleRate * 0.32));
  noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
  }
}

export function isAudioRunning() {
  return Boolean(ctx && ctx.state === "running");
}

export function unlockAudio() {
  ensure();
  if (ctx && ctx.state === "suspended") void ctx.resume();
}

export function resumeAudio() {
  if (ctx && ctx.state === "suspended") void ctx.resume();
}

export function setVolume(v: number) {
  volume = Math.min(1, Math.max(0, v));
  if (master && ctx) master.gain.setTargetAtTime(volume * volume, ctx.currentTime, 0.03);
}

function tone(freq: number, dur: number, type: OscillatorType, vol: number, slide?: number) {
  if (!ctx || !sfxBus) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(sfxBus);
  o.start(t);
  o.stop(t + dur + 0.02);
  o.onended = () => {
    o.disconnect();
    g.disconnect();
  };
}

function noise(dur: number, vol: number, freq = 800) {
  if (!ctx || !sfxBus || !noiseBuf) return;
  const t = ctx.currentTime;
  const playDur = Math.min(dur, noiseBuf.duration - 0.01);
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(Math.max(0.0002, vol), t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + playDur);
  src.connect(filter);
  filter.connect(g);
  g.connect(sfxBus);
  src.start(t, 0, playDur + 0.01);
  src.onended = () => {
    src.disconnect();
    filter.disconnect();
    g.disconnect();
  };
}

export const sfx = {
  ui() {
    tone(520, 0.07, "square", 0.05);
  },
  pump() {
    noise(0.12, 0.08, 420);
  },
  cash() {
    tone(660, 0.08, "square", 0.06);
    tone(880, 0.12, "square", 0.05, 990);
  },
  barrier() {
    tone(180, 0.14, "sawtooth", 0.05, 90);
  },
  alarm() {
    tone(740, 0.16, "square", 0.05, 420);
  },
  error() {
    tone(180, 0.16, "square", 0.06, 90);
  },
  hurt() {
    noise(0.12, 0.12, 300);
    tone(120, 0.18, "sawtooth", 0.05);
  },
  empty() {
    tone(140, 0.05, "square", 0.04);
  },
  stun() {
    tone(240, 0.12, "sawtooth", 0.06, 80);
    noise(0.08, 0.06, 600);
  },
  shot(kind: string) {
    if (kind === "stun") {
      this.stun();
      return;
    }
    if (kind === "shotgun") noise(0.18, 0.2, 500);
    else if (kind === "smg") noise(0.06, 0.1, 1400);
    else noise(0.09, 0.14, 1100);
    tone(kind === "shotgun" ? 90 : 160, 0.08, "square", 0.04);
  },
  hit() {
    tone(320, 0.06, "square", 0.05, 180);
  },
  slap() {
    noise(0.07, 0.1, 280);
    tone(160, 0.06, "square", 0.05);
  },
  crunch() {
    noise(0.28, 0.18, 160);
    tone(70, 0.22, "sawtooth", 0.05, 40);
  },
  zap() {
    tone(720, 0.09, "square", 0.05, 180);
    noise(0.1, 0.07, 1800);
  },
  munch() {
    noise(0.1, 0.06, 420);
    tone(200, 0.08, "triangle", 0.04);
  },
  scrub() {
    noise(0.07, 0.04, 900);
  },
  honk() {
    tone(220, 0.12, "square", 0.05);
    tone(180, 0.14, "square", 0.04, 140);
  },
};
