let audioCtx = null;
let noiseBuffer = null;

function getAudioContext() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// short burst of white noise, reused across keystrokes (shaped differently each time via the filter/envelope)
function getNoiseBuffer(ctx) {
  if (noiseBuffer) return noiseBuffer;
  const duration = 0.03;
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noiseBuffer = buffer;
  return buffer;
}

/**
 * A short, dry keyboard "tock", synthesized on the fly (no audio file): a
 * low-passed noise burst for a soft, dull body, plus a low sine thump
 * underneath for weight. Randomized slightly so a run of keystrokes doesn't
 * sound robotic.
 */
function playKeySound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // the body: noise burst through a low-pass filter, cut well below the
  // harsh/tinny range so it reads as a dull tock, not a click
  const noise = ctx.createBufferSource();
  noise.buffer = getNoiseBuffer(ctx);

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 650 + Math.random() * 200;
  lowpass.Q.value = 1.2;

  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0.3, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

  noise.connect(lowpass);
  lowpass.connect(bodyGain);
  bodyGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.05);

  // the thump: a brief low sine for physical weight, doing most of the work
  const thump = ctx.createOscillator();
  thump.type = 'sine';
  thump.frequency.setValueAtTime(85 + Math.random() * 20, now);

  const thumpGain = ctx.createGain();
  thumpGain.gain.setValueAtTime(0.14, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  thump.connect(thumpGain);
  thumpGain.connect(ctx.destination);
  thump.start(now);
  thump.stop(now + 0.05);
}

// unlock the AudioContext on the first user gesture, per browser autoplay policy
['pointerdown', 'keydown'].forEach((evt) => {
  window.addEventListener(evt, () => getAudioContext(), { once: true, passive: true });
});
