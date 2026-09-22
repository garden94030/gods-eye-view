import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildGeoLibreEventCollection,
  isoTimestamp,
} from './geolibreEvents.js';

test('GeoLibre event adapter emits a shared ISO timestamp and provenance', () => {
  const collection = buildGeoLibreEventCollection({
    generatedAt: Date.UTC(2026, 8, 22, 0, 0),
    earthquakes: [
      {
        usgsId: 'us7000test',
        lat: 23.5,
        lon: 121,
        mag: 4.2,
        depthKm: 12.3,
        place: 'Taiwan test event',
        time: Date.UTC(2026, 8, 21, 23, 55),
      },
    ],
    fires: [
      {
        lat: 24,
        lon: 121.5,
        frp: 18,
        confidence: 0.9,
        satellite: 'NOAA-21',
        acqMs: Date.UTC(2026, 8, 21, 22, 10),
      },
    ],
    status: { earthquakes: 'complete', fires: 'partial' },
  });

  assert.equal(collection.type, 'FeatureCollection');
  assert.equal(collection.features.length, 2);
  assert.deepEqual(
    collection.features.map((feature) => feature.properties.eventType),
    ['earthquake', 'wildfire'],
  );
  assert.equal(
    collection.features[0].properties.timestamp,
    '2026-09-21T23:55:00.000Z',
  );
  assert.equal(
    collection.features[1].properties.timestamp,
    '2026-09-21T22:10:00.000Z',
  );
  assert.equal(collection.features[1].properties.source, 'NASA FIRMS');
  assert.equal(collection.gev.timeField, 'timestamp');
  assert.deepEqual(collection.gev.status, {
    earthquakes: 'complete',
    fires: 'partial',
  });
});

test('GeoLibre event adapter drops invalid coordinates and preserves unknown time', () => {
  const collection = buildGeoLibreEventCollection({
    earthquakes: [{ lat: 91, lon: 0, time: 1 }],
    fires: [{ lat: 23, lon: 121, acqMs: 0 }],
  });
  assert.equal(collection.features.length, 1);
  assert.equal(collection.features[0].properties.timestamp, null);
  assert.equal(isoTimestamp(null), null);
});
