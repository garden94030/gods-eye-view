import { applicationHtmlPlugin } from './application-html.js';
import cesium from 'vite-plugin-cesium';

function portalStaticPrefixPlugin(base) {
  if (base === '/') return null;
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  const rewrite = (code) =>
    code
      .replaceAll('"/api/', `"${prefix}/api/`)
      .replaceAll("'/api/", `'${prefix}/api/`)
      .replaceAll('`/api/', `\`${prefix}/api/`)
      .replaceAll('"/models/', `"${prefix}/models/`)
      .replaceAll("'/models/", `'${prefix}/models/`)
      .replaceAll('`/models/', `\`${prefix}/models/`)
      .replaceAll('"/logo.svg"', `"${prefix}/logo.svg"`)
      .replaceAll("'/logo.svg'", `'${prefix}/logo.svg'`)
      .replaceAll('src="/mic.svg"', `src="${prefix}/mic.svg"`)
      .replaceAll('src="/pin.svg"', `src="${prefix}/pin.svg"`);
  return {
    name: 'portal-static-prefix',
    enforce: 'post',
    transformIndexHtml: (html) => rewrite(html),
    generateBundle(_, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk') continue;
        output.code = rewrite(output.code);
      }
    },
  };
}

/** Build browser assets with explicit inputs; never load environment or providers. */
export function createBrowserViteConfig({
  plugins = [],
  publicDir,
  googleApiKey,
  cesiumToken,
  host = 'localhost',
  port = 4173,
} = {}) {
  const base = process.env.GEV_PUBLIC_BASE || '/';
  const portalPrefixPlugin = portalStaticPrefixPlugin(base);
  return {
    // The standalone desktop build stays rooted at `/`.  A Portal build can
    // opt into its own static prefix so its Cesium and Vite assets never
    // collide with the host site's `/assets` directory.
    base,
    plugins: [
      cesium(),
      applicationHtmlPlugin(),
      ...plugins,
      ...(portalPrefixPlugin ? [portalPrefixPlugin] : []),
    ],
    ...(publicDir === undefined ? {} : { publicDir }),
    server: {
      host: host || 'localhost',
      port: parseInt(port, 10) || 4173,
      allowedHosts:
        host === '0.0.0.0' || host === '::'
          ? true
          : ['localhost', '127.0.0.1', '.local'],
      fs: {
        deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/ENVIRONMENT'],
      },
      // These headers protect the document containing Provider Settings.
      headers: {
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy': "frame-ancestors 'none'",
      },
    },
    define: {
      'import.meta.env.GOOGLE_MAPS_API_KEY': JSON.stringify(googleApiKey),
      'import.meta.env.CESIUM_ION_TOKEN': JSON.stringify(cesiumToken),
    },
    build: { chunkSizeWarningLimit: 1500 },
  };
}
