import assert from 'node:assert/strict';
import test from 'node:test';
import {
  BROWSER_KEY_STORAGE_KEY,
  readBrowserKeyOverrides,
  writeBrowserKeyOverrides,
} from './browserKeyStore.js';

function storage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    raw: () => values.get(BROWSER_KEY_STORAGE_KEY),
  };
}

test('public browser storage accepts only browser-exposed provider keys', () => {
  const target = storage({
    [BROWSER_KEY_STORAGE_KEY]: JSON.stringify({
      GOOGLE_MAPS_API_KEY: ' browser-google ',
      TOMTOM_API_KEY: 'must-not-be-read',
      extra: 'must-not-be-read',
    }),
  });
  assert.deepEqual(readBrowserKeyOverrides(target), {
    GOOGLE_MAPS_API_KEY: ' browser-google ',
  });
});

test('public browser storage can replace and remove its own keys', () => {
  const target = storage();
  writeBrowserKeyOverrides(
    { GOOGLE_MAPS_API_KEY: 'google-key', CESIUM_ION_TOKEN: 'ion-key' },
    target,
  );
  assert.deepEqual(readBrowserKeyOverrides(target), {
    GOOGLE_MAPS_API_KEY: 'google-key',
    CESIUM_ION_TOKEN: 'ion-key',
  });
  writeBrowserKeyOverrides(
    { GOOGLE_MAPS_API_KEY: null, TOMTOM_API_KEY: 'ignored' },
    target,
  );
  assert.deepEqual(readBrowserKeyOverrides(target), {
    CESIUM_ION_TOKEN: 'ion-key',
  });
});
