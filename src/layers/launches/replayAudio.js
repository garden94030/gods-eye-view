/**
 * User-gesture-safe audio cue for the Space Missions ascent replay.
 *
 * The upstream project does not provide launch recordings. This module uses
 * Web Audio synthesis so the replay has an audible countdown/engine cue
 * without downloading media, adding a third-party asset, or exposing a key.
 */

const MASTER_GAIN = 0.14;

export function createReplayAudio({ windowRef = globalThis.window } = {}) {
  let context = null;
  let masterGain = null;
  let engineOscillator = null;
  let engineGain = null;
  let subOscillator = null;
  let subGain = null;
  let active = false;
  let paused = false;
  let liftoffPlayed = false;
  let lastCountdown = null;

  function contextConstructor() {
    return windowRef?.AudioContext || windowRef?.webkitAudioContext || null;
  }

  function stopNode(node) {
    try {
      node?.stop?.();
    } catch {}
    try {
      node?.disconnect?.();
    } catch {}
  }

  function stop() {
    stopNode(engineOscillator);
    stopNode(subOscillator);
    engineOscillator = null;
    engineGain = null;
    subOscillator = null;
    subGain = null;
    masterGain = null;
    active = false;
    paused = false;
    liftoffPlayed = false;
    lastCountdown = null;
    const closing = context;
    context = null;
    try {
      closing?.close?.();
    } catch {}
  }

  function tone(frequency, duration = 0.16, gainAmount = 0.12, type = 'sine') {
    if (!context || !masterGain) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime;
    const end = start + Math.max(0.04, duration);
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(
      Math.max(0.001, gainAmount),
      start + 0.012,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(start);
    oscillator.stop(end + 0.02);
  }

  function start() {
    const AudioContextClass = contextConstructor();
    if (!AudioContextClass) return false;
    stop();
    try {
      context = new AudioContextClass();
      masterGain = context.createGain();
      masterGain.gain.setValueAtTime(MASTER_GAIN, context.currentTime);
      masterGain.connect(context.destination);

      const now = context.currentTime;
      tone(220, 0.13, 0.12, 'sine');
      tone(330, 0.18, 0.1, 'sine');

      engineOscillator = context.createOscillator();
      engineGain = context.createGain();
      engineOscillator.type = 'sawtooth';
      engineOscillator.frequency.setValueAtTime(72, now);
      engineOscillator.frequency.exponentialRampToValueAtTime(43, now + 5);
      engineGain.gain.setValueAtTime(0.0001, now);
      engineGain.gain.exponentialRampToValueAtTime(0.045, now + 0.2);
      engineGain.gain.setValueAtTime(0.032, now + 2.5);
      engineOscillator.connect(engineGain);
      engineGain.connect(masterGain);
      engineOscillator.start(now);

      subOscillator = context.createOscillator();
      subGain = context.createGain();
      subOscillator.type = 'sine';
      subOscillator.frequency.setValueAtTime(42, now);
      subOscillator.frequency.exponentialRampToValueAtTime(29, now + 5);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.07, now + 0.25);
      subGain.gain.setValueAtTime(0.045, now + 2.5);
      subOscillator.connect(subGain);
      subGain.connect(masterGain);
      subOscillator.start(now);

      active = true;
      paused = false;
      liftoffPlayed = false;
      lastCountdown = null;
      // This is called synchronously from the replay button's click handler.
      // Browsers may begin the context suspended, so resume is intentionally
      // requested here while the user gesture is still active.
      context.resume?.().catch?.(() => {});
      return true;
    } catch {
      stop();
      return false;
    }
  }

  function update(replayState) {
    if (!active || !context || !replayState) return false;
    if (replayState.countdownActive) {
      const countdown = Number(replayState.countdownSeconds);
      if (Number.isFinite(countdown) && countdown !== lastCountdown) {
        lastCountdown = countdown;
        tone(countdown <= 1 ? 660 : 440, 0.12, 0.1, 'square');
      }
      return true;
    }
    if (!liftoffPlayed && replayState.elapsedSinceStart >= 0) {
      liftoffPlayed = true;
      tone(880, 0.28, 0.13, 'sawtooth');
      if (engineGain && context) {
        const now = context.currentTime;
        engineGain.gain.cancelScheduledValues(now);
        engineGain.gain.setValueAtTime(0.032, now);
        engineGain.gain.exponentialRampToValueAtTime(0.075, now + 0.35);
        engineGain.gain.exponentialRampToValueAtTime(0.035, now + 2.2);
      }
    }
    return true;
  }

  function pause() {
    if (!active || paused || !context) return false;
    paused = true;
    const now = context.currentTime;
    engineGain?.gain.setTargetAtTime(0.0001, now, 0.025);
    subGain?.gain.setTargetAtTime(0.0001, now, 0.025);
    return true;
  }

  function resume() {
    if (!active || !paused || !context) return false;
    paused = false;
    const now = context.currentTime;
    engineGain?.gain.setTargetAtTime(0.035, now, 0.04);
    subGain?.gain.setTargetAtTime(0.045, now, 0.04);
    context.resume?.().catch?.(() => {});
    return true;
  }

  return {
    start,
    update,
    pause,
    resume,
    stop,
    get active() {
      return active;
    },
    get paused() {
      return paused;
    },
  };
}
