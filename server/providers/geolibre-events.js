import { normalizeEarthquakeSnapshot } from '../../src/layers/earthquakes/records.js';
import { buildGeoLibreEventCollection } from '../../src/data/geolibreEvents.js';

const USGS_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
const GEOJSON_TTL_MS = 60_000;
const REQUEST_TIMEOUT_MS = 15_000;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function requestOrigin(req) {
  const host = String(req.headers?.host || '').trim();
  if (!host || /[^a-zA-Z0-9.:[\]-]/.test(host)) return null;
  const forwarded = String(req.headers?.['x-forwarded-proto'] || '')
    .split(',')[0]
    .trim()
    .toLowerCase();
  const protocol = forwarded === 'https' ? 'https' : 'http';
  return `${protocol}://${host}`;
}

/** Build the minimal read-only project consumed by GeoLibre's viewer layout. */
export function createGeoLibreProject(origin) {
  const layerId = 'gev-live-earth-events';
  return {
    version: '0.1.0',
    name: '上帝視角 · GeoLibre 即時地球事件',
    mapView: { center: [121, 23.7], zoom: 1.3, bearing: 0, pitch: 0 },
    basemapStyleUrl: 'https://tiles.openfreemap.org/styles/dark',
    basemapVisible: true,
    basemapOpacity: 1,
    primaryRenderer: 'maplibre',
    layers: [
      {
        id: layerId,
        name: '即時地球事件（USGS／NASA FIRMS）',
        type: 'geojson',
        source: { type: 'geojson', url: `${origin}/api/geolibre/events` },
        visible: true,
        opacity: 1,
        style: {
          fillColor: '#00d4ff',
          strokeColor: '#03131c',
          strokeWidth: 1,
          fillOpacity: 0.85,
          circleRadius: 5,
        },
        metadata: {
          timeField: 'timestamp',
          refresh: { enabled: true, intervalMs: 120_000 },
        },
        connection: {
          layerId,
          interval: 120,
          lastSyncedAt: null,
          lastError: null,
          onFailure: 'keep-last',
        },
      },
    ],
    styles: {},
    plugins: {
      manifestUrls: [],
      activePluginIds: ['maplibre-gl-time-slider'],
      mapControlPositions: {},
      settings: {},
    },
    metadata: {
      owner: "God's Eye View",
      integration: 'GeoLibre open-source embed bridge',
      sourceContract: 'gev-geolibre-events/v1',
    },
  };
}

/**
 * Expose a small GeoJSON/project bridge for the official GeoLibre web viewer.
 * It intentionally reuses the already-cached local FIRMS endpoint instead of
 * opening a second NASA quota path.  If FIRMS is keyless or unavailable, the
 * earthquake feed remains usable and the response keeps the partial status.
 */
export function geolibreEventsProxy() {
  let cache = null;
  let inflight = null;

  async function fetchJson(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      signal: options.signal || AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async function fetchFirmsFromLocalServer(req) {
    if (!String(process.env.FIRMS_MAP_KEY || '').trim())
      return { fires: [], status: 'unavailable' };
    const port = Number(req.socket?.localPort);
    const url = Number.isInteger(port)
      ? `http://127.0.0.1:${port}/api/firms`
      : `${requestOrigin(req) || 'http://127.0.0.1'}/api/firms`;
    try {
      const payload = await fetchJson(url);
      return {
        fires: Array.isArray(payload?.fires) ? payload.fires : [],
        status: payload?.stale ? 'stale' : 'complete',
      };
    } catch (error) {
      console.warn(
        '[geolibre-events] FIRMS bridge unavailable:',
        error?.message || error,
      );
      return { fires: [], status: 'unavailable' };
    }
  }

  async function refresh(req) {
    const payload = await fetchJson(USGS_URL);
    const earthquakes = normalizeEarthquakeSnapshot(payload);
    if (!earthquakes) throw new Error('Malformed USGS response');
    const firms = await fetchFirmsFromLocalServer(req);
    return {
      ...buildGeoLibreEventCollection({
        earthquakes,
        fires: firms.fires,
        generatedAt: Date.now(),
        status: { earthquakes: 'complete', fires: firms.status },
      }),
      fetchedAt: Date.now(),
    };
  }

  async function getEvents(req) {
    if (cache && Date.now() - cache.fetchedAt < GEOJSON_TTL_MS)
      return cache.payload;
    if (!inflight) {
      inflight = refresh(req)
        .then((payload) => {
          cache = { fetchedAt: Date.now(), payload };
          return payload;
        })
        .finally(() => {
          inflight = null;
        });
    }
    return inflight;
  }

  function sendJson(res, status, body) {
    if (res.headersSent) return;
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...corsHeaders(),
    });
    res.end(JSON.stringify(body));
  }

  function projectFor(req) {
    const origin = requestOrigin(req);
    if (!origin) return null;
    return createGeoLibreProject(origin);
  }

  const installMiddleware = (server) => {
    server.middlewares.use('/api/geolibre', async (req, res) => {
      const subPath = String(req.url || '').split('?')[0];
      if (req.method === 'OPTIONS') {
        res.writeHead(204, corsHeaders());
        res.end();
        return;
      }
      if (req.method !== 'GET') {
        sendJson(res, 405, { error: 'method_not_allowed' });
        return;
      }
      try {
        if (subPath === '/project') {
          const project = projectFor(req);
          if (!project) {
            sendJson(res, 400, { error: 'host_unavailable' });
            return;
          }
          sendJson(res, 200, project);
          return;
        }
        if (subPath === '/events') {
          const payload = await getEvents(req);
          sendJson(res, 200, payload);
          return;
        }
        sendJson(res, 404, { error: 'not_found' });
      } catch (error) {
        console.warn(
          '[geolibre-events] USGS bridge unavailable:',
          error?.message || error,
        );
        sendJson(res, 502, {
          error: 'upstream_unavailable',
          source: 'USGS Earthquake Hazards Program',
        });
      }
    });
  };

  return {
    name: 'geolibre-events-proxy',
    configureServer: installMiddleware,
    configurePreviewServer: installMiddleware,
  };
}
