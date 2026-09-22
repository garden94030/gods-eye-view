import assert from 'node:assert/strict';
import test from 'node:test';
import { createModel } from './model.js';

test('TomTom flow geometries become directly renderable live roads', () => {
  const model = createModel({
    state: { _viewer: null },
    services: {},
    parts: {},
    source: {},
  });
  const roads = model.parseFlowRoads([
    {
      coords: [
        [-0.125, 51.501],
        [-0.124, 51.502],
      ],
      trafficLevel: 0.35,
      roadType: 'Major road',
      closure: false,
    },
  ]);
  assert.equal(roads.length, 1);
  assert.equal(roads[0].type, 'primary');
  assert.deepEqual(roads[0].flow, { level: 0.35, closure: false });
  assert.equal(roads[0].flowSource, 'tomtom');
  assert.equal(roads[0].waypoints.length, 2);
});
