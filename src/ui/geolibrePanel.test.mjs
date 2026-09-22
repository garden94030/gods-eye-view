import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGeoLibreViewerUrl,
  DEFAULT_PROJECT_PATH,
} from './geolibrePanel.js';

test('GeoLibre viewer URL points at the local project contract', () => {
  const url = new URL(
    buildGeoLibreViewerUrl({
      origin: 'https://example.test/god-view',
      projectPath: DEFAULT_PROJECT_PATH,
    }),
  );

  assert.equal(url.origin, 'https://web.geolibre.app');
  assert.equal(
    url.searchParams.get('url'),
    'https://example.test/api/geolibre/project',
  );
  assert.equal(url.searchParams.get('layout'), 'viewer');
  assert.equal(url.searchParams.get('theme'), 'dark');
});
