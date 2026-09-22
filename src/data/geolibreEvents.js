/**
 * Convert the application's public event snapshots into a GeoLibre-friendly
 * FeatureCollection.  GeoLibre's Time Slider can bind to a timestamp field;
 * keeping this adapter pure makes the cross-application contract testable
 * without loading Cesium or a browser document.
 */

function finite(value) {
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function validPoint(lat, lon) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
}

function isoTimestamp(value) {
  const ms = finite(value);
  if (ms === null || ms <= 0) return null;
  const date = new Date(ms);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function text(value) {
  const normalized = String(value ?? '').trim();
  return normalized || null;
}

function earthquakeFeature(row, index) {
  const lat = finite(row?.lat);
  const lon = finite(row?.lon);
  if (!validPoint(lat, lon)) return null;
  const timeMs = finite(row?.time);
  return {
    type: 'Feature',
    id: text(row?.usgsId) || `earthquake-${index + 1}`,
    geometry: { type: 'Point', coordinates: [lon, lat] },
    properties: {
      id: text(row?.usgsId) || `earthquake-${index + 1}`,
      eventType: 'earthquake',
      title: text(row?.place) || 'USGS earthquake',
      place: text(row?.place),
      magnitude: finite(row?.mag),
      depthKm: finite(row?.depthKm),
      timeMs,
      timestamp: isoTimestamp(timeMs),
      source: 'USGS Earthquake Hazards Program',
      sourceUrl:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    },
  };
}

function fireFeature(row, index) {
  const lat = finite(row?.lat);
  const lon = finite(row?.lon);
  if (!validPoint(lat, lon)) return null;
  const timeMs = finite(row?.acqMs);
  return {
    type: 'Feature',
    id: `fire-${index + 1}`,
    geometry: { type: 'Point', coordinates: [lon, lat] },
    properties: {
      id: `fire-${index + 1}`,
      eventType: 'wildfire',
      title: 'NASA FIRMS active fire',
      frp: finite(row?.frp),
      confidence: finite(row?.confidence),
      satellite: text(row?.satellite) || text(row?.sensor),
      timeMs,
      timestamp: isoTimestamp(timeMs),
      source: 'NASA FIRMS',
      sourceUrl: 'https://earthdata.nasa.gov/firms',
    },
  };
}

/**
 * @param {object} [input]
 * @param {Array<object>} [input.earthquakes]
 * @param {Array<object>} [input.fires]
 * @param {number} [input.generatedAt]
 * @param {object} [input.status]
 * @returns {object} GeoJSON FeatureCollection with a stable temporal field.
 */
export function buildGeoLibreEventCollection({
  earthquakes = [],
  fires = [],
  generatedAt = Date.now(),
  status = {},
} = {}) {
  const features = [];
  for (const [index, row] of (Array.isArray(earthquakes)
    ? earthquakes
    : []
  ).entries()) {
    const feature = earthquakeFeature(row, index);
    if (feature) features.push(feature);
  }
  for (const [index, row] of (Array.isArray(fires) ? fires : []).entries()) {
    const feature = fireFeature(row, index);
    if (feature) features.push(feature);
  }
  return {
    type: 'FeatureCollection',
    features,
    gev: {
      contract: 'gev-geolibre-events/v1',
      generatedAt: isoTimestamp(generatedAt),
      status: {
        earthquakes: status.earthquakes || 'unknown',
        fires: status.fires || 'unknown',
      },
      timeField: 'timestamp',
      sources: ['USGS', 'NASA FIRMS'],
    },
  };
}

export { isoTimestamp };
