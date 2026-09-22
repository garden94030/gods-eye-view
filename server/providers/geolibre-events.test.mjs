import test from 'node:test';
import assert from 'node:assert/strict';
import { createGeoLibreProject } from './geolibre-events.js';

test('GeoLibre project declares the event source and time slider contract', () => {
  const project = createGeoLibreProject('https://example.test');
  const layer = project.layers[0];

  assert.equal(project.primaryRenderer, 'maplibre');
  assert.equal(layer.source.url, 'https://example.test/api/geolibre/events');
  assert.equal(layer.metadata.timeField, 'timestamp');
  assert.equal(layer.metadata.refresh.intervalMs, 120_000);
  assert.deepEqual(project.plugins.activePluginIds, [
    'maplibre-gl-time-slider',
  ]);
});
