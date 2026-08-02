let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // 静默忽略音频错误
  }
}

/** 开箱音效 */
export function playCaseOpen() {
  playTone(800, 0.1, 'square', 0.08);
  setTimeout(() => playTone(1200, 0.15, 'square', 0.08), 80);
}

/** 银行家来电铃声 */
export function playPhoneRing() {
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      playTone(880, 0.2, 'square', 0.08);
      setTimeout(() => playTone(1100, 0.2, 'square', 0.08), 200);
    }, i * 500);
  }
}

/** Deal 音效 - 胜利感 */
export function playDeal() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.3, 'triangle', 0.12), i * 150);
  });
}

/** No Deal 音效 - 紧张感 */
export function playNoDeal() {
  playTone(200, 0.4, 'sawtooth', 0.06);
  setTimeout(() => playTone(300, 0.2, 'sawtooth', 0.06), 300);
}

/** 大金额揭示 */
export function playBigAmount() {
  playTone(150, 0.5, 'sawtooth', 0.08);
  setTimeout(() => playTone(100, 0.6, 'sawtooth', 0.08), 400);
}
