import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  loadTaipeiSourcesFromOpenData,
  parseTaipeiFacilityCsv,
} from '../../server/providers/cctv/sources.js';
import {
  TAIPEI_CCTV_API_URL,
  TAIPEI_CCTV_CATALOG_URL,
} from '../../server/providers/cctv/constants.js';

const BIG5_HEADER = Uint8Array.from([
  0xac, 0x79, 0xa4, 0xf4, 0xb8, 0xb9, 0x2c, 0xbf, 0xa4, 0xa5, 0xab, 0x2c,
  0xc4, 0xe1, 0xbc, 0x76, 0xbe, 0xf7, 0xbd, 0x73, 0xb8, 0xb9, 0x2c, 0x57,
  0x47, 0x53, 0x58, 0x2c, 0x57, 0x47, 0x53, 0x59, 0x0d, 0x0a,
]);

function facilityCsv(rows) {
  const body = new TextEncoder().encode(
    rows.map((row) => `${row.serial},臺北市,${row.name},${row.lon},${row.lat}`).join('\r\n') +
      '\r\n',
  );
  const bytes = new Uint8Array(BIG5_HEADER.length + body.length);
  bytes.set(BIG5_HEADER);
  bytes.set(body, BIG5_HEADER.length);
  return bytes;
}

test('Taipei facility CSV decodes the official Big5 schema', () => {
  const rows = parseTaipeiFacilityCsv(
    facilityCsv([
      { serial: '001', name: '001-Test', lon: '121.5', lat: '25.0' },
    ]),
  );
  assert.deepEqual(rows, [
    { serial: '001', name: '001-Test', lon: 121.5, lat: 25 },
  ]);
});

test('Taipei loader registers only facility-listed official HLS cameras', async (t) => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url, options) => {
    requests.push({ url: String(url), options });
    if (String(url) === TAIPEI_CCTV_CATALOG_URL)
      return new Response(
        facilityCsv([
          { serial: '001', name: '001-市民快承德', lon: '121.5169', lat: '25.04855' },
          { serial: '002', name: '002-環快忠孝橋', lon: '121.50604', lat: '25.04925' },
        ]),
        { headers: { 'Content-Type': 'text/csv' } },
      );
    assert.equal(String(url), TAIPEI_CCTV_API_URL);
    assert.equal(options.method, 'POST');
    assert.match(String(options.body), /language=ZH/);
    return Response.json({
      locations: [
        {
          cctvId: '1',
          cctvName: '001-市民快承德',
          lat: 25.04855,
          lng: 121.5169,
          videoStreamURL:
            'https://jtmctrafficcctv4.gov.taipei/NVR/one/live.m3u8',
          videoPreviewImgUrl: 'https://cctv.bote.gov.taipei:8502/jpg/1',
        },
        {
          cctvId: '2',
          cctvName: '002-環快忠孝橋',
          lat: 25.04925,
          lng: 121.50604,
          videoStreamURL: 'https://evil.example/live.m3u8',
        },
        {
          cctvId: '999',
          cctvName: '999-未列入設施清冊',
          lat: 25.05,
          lng: 121.51,
          videoStreamURL:
            'https://jtmctrafficcctv4.gov.taipei/NVR/other/live.m3u8',
        },
      ],
    });
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const sources = await loadTaipeiSourcesFromOpenData();
  assert.deepEqual(sources.map((source) => source.id), ['tpe-1']);
  assert.equal(sources[0].cityId, 'taipei');
  assert.equal(sources[0].feedType, 'hls');
  assert.equal(sources[0].sourceKind, 'taipei-its');
  assert.equal(sources[0].url.endsWith('/one/live.m3u8'), true);
  assert.equal(sources[0].snapshotUrl.endsWith('/jpg/1'), true);
  assert.equal(requests.length, 2);
});
