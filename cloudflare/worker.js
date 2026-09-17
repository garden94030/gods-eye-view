import { Container, getContainer } from '@cloudflare/containers';
import { env } from 'cloudflare:workers';

const PASSTHROUGH_ENV = [
  'AISSTREAM_API_KEY',
  'AISSTREAM_BOUNDING_BOXES',
  'AISSTREAM_MESSAGE_TYPES',
  'AISSTREAM_SILENCE_TIMEOUT_MS',
  'CESIUM_ION_TOKEN',
  'FIRMS_MAP_KEY',
  'GEV_RATELIMIT_GOOGLE_PER_MIN',
  'GEV_RATELIMIT_OPENAI_PER_MIN',
  'GOOGLE_MAPS_API_KEY',
  'GOOGLE_MAPS_SERVER_API_KEY',
  'LL2_API_TOKEN',
  'OPENAI_API_KEY',
  'OPENAI_HUD_SUMMARY_MODEL',
  'OPENAI_REALTIME_CONTEXT_RETENTION',
  'OPENAI_REALTIME_CONTEXT_TOKENS',
  'OPENAI_REALTIME_MODEL',
  'OPENAI_REALTIME_MODEL_MINI',
  'OPENAI_REALTIME_REASONING_EFFORT',
  'OPENAI_REALTIME_VOICE',
  'OPENSKY_AUTH_MODE',
  'OPENSKY_CLIENT_ID',
  'OPENSKY_CLIENT_SECRET',
  'TOMTOM_API_KEY',
  'TOMTOM_DAILY_TILE_BUDGET',
];

function configuredEnvironment() {
  return Object.fromEntries(
    PASSTHROUGH_ENV.map((name) => [name, String(env[name] ?? '')]),
  );
}

export class GodsEyeContainer extends Container {
  defaultPort = 8080;
  sleepAfter = '10m';
  enableInternet = true;
  envVars = {
    HOST: '0.0.0.0',
    PORT: '8080',
    NODE_ENV: 'production',
    ...configuredEnvironment(),
  };
}

export default {
  async fetch(request, workerEnv) {
    const url = new URL(request.url);
    if (url.pathname === '/healthz') {
      return new Response('ok', { headers: { 'content-type': 'text/plain' } });
    }
    return getContainer(workerEnv.GODS_EYE_CONTAINER, 'default').fetch(request);
  },
};
