import test from 'node:test';
import assert from 'node:assert/strict';
import { createReplayAudio } from './replayAudio.js';

class FakeParam {
  setValueAtTime() {}
  exponentialRampToValueAtTime() {}
  cancelScheduledValues() {}
  setTargetAtTime() {}
}

class FakeNode {
  constructor() {
    this.gain = new FakeParam();
    this.frequency = new FakeParam();
    this.connected = [];
    this.started = false;
    this.stopped = false;
  }

  connect(node) {
    this.connected.push(node);
  }

  disconnect() {}

  start() {
    this.started = true;
  }

  stop() {
    this.stopped = true;
  }
}

class FakeAudioContext {
  static instances = [];

  constructor() {
    this.currentTime = 0;
    this.destination = new FakeNode();
    this.oscillators = [];
    this.gains = [];
    this.resumeCalls = 0;
    this.closed = false;
    FakeAudioContext.instances.push(this);
  }

  createOscillator() {
    const node = new FakeNode();
    this.oscillators.push(node);
    return node;
  }

  createGain() {
    const node = new FakeNode();
    this.gains.push(node);
    return node;
  }

  resume() {
    this.resumeCalls += 1;
    return Promise.resolve();
  }

  close() {
    this.closed = true;
    return Promise.resolve();
  }
}

test('mission replay audio starts from a supported user gesture and has an audible cue', async () => {
  FakeAudioContext.instances.length = 0;
  const audio = createReplayAudio({
    windowRef: { AudioContext: FakeAudioContext },
  });

  assert.equal(audio.start(), true);
  const context = FakeAudioContext.instances.at(-1);
  assert.equal(audio.active, true);
  assert.equal(context.resumeCalls, 1);
  assert.ok(context.oscillators.length >= 4, 'cue and engine oscillators exist');

  audio.update({ countdownActive: true, countdownSeconds: 2 });
  audio.update({ countdownActive: false, elapsedSinceStart: 0 });
  assert.ok(context.oscillators.length >= 6, 'countdown and liftoff cues exist');

  assert.equal(audio.pause(), true);
  assert.equal(audio.paused, true);
  assert.equal(audio.resume(), true);
  assert.equal(audio.paused, false);
  audio.stop();
  assert.equal(audio.active, false);
  assert.equal(context.closed, true);
  await Promise.resolve();
});

test('mission replay audio fails closed when Web Audio is unavailable', () => {
  const audio = createReplayAudio({ windowRef: {} });
  assert.equal(audio.start(), false);
  assert.equal(audio.active, false);
});
