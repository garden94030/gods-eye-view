const GEOLIBRE_VIEWER_URL = 'https://web.geolibre.app/';
const DEFAULT_PROJECT_PATH = '/api/geolibre/project';

/** Build the documented read-only GeoLibre viewer URL for this app. */
export function buildGeoLibreViewerUrl({
  origin = globalThis.location?.origin || 'http://localhost',
  projectPath = DEFAULT_PROJECT_PATH,
} = {}) {
  const projectUrl = new URL(projectPath, origin).toString();
  const viewerUrl = new URL(GEOLIBRE_VIEWER_URL);
  viewerUrl.searchParams.set('url', projectUrl);
  viewerUrl.searchParams.set('layout', 'viewer');
  viewerUrl.searchParams.set('theme', 'dark');
  return viewerUrl.toString();
}

/** Bind the GeoLibre event bridge to the existing panel lifecycle. */
export function bindGeoLibrePanel({
  toggleButton,
  panel,
  frame,
  status,
  refreshButton,
  externalLink,
  setPanelCollapsed,
  windowRef = globalThis,
} = {}) {
  if (!toggleButton || !panel || !frame || !setPanelCollapsed) {
    return { destroy() {} };
  }

  let destroyed = false;
  const viewerUrl = buildGeoLibreViewerUrl({
    origin: windowRef.location?.origin,
  });

  const setStatus = (message) => {
    if (!status) return;
    status.textContent = message;
  };

  const loadViewer = ({ force = false } = {}) => {
    if (destroyed) return;
    const nextUrl = force
      ? `${viewerUrl}${viewerUrl.includes('?') ? '&' : '?'}refresh=${Date.now()}`
      : viewerUrl;
    if (frame.src !== nextUrl) frame.src = nextUrl;
    if (externalLink) externalLink.href = viewerUrl;
    setStatus('載入 GeoLibre 時序事件…');
  };

  const onToggle = () => {
    const collapsed = panel.classList.contains('collapsed');
    setPanelCollapsed(panel.id, !collapsed, { explicit: true });
    if (collapsed) loadViewer();
  };
  const onRefresh = (event) => {
    event?.preventDefault?.();
    loadViewer({ force: true });
  };
  const onLoad = () => {
    setStatus('GeoLibre 檢視器已載入；時間軸與資料狀態由 GeoLibre 顯示。');
  };

  toggleButton.addEventListener('click', onToggle);
  refreshButton?.addEventListener('click', onRefresh);
  frame.addEventListener('load', onLoad);
  if (externalLink) externalLink.href = viewerUrl;

  return {
    loadViewer,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      toggleButton.removeEventListener('click', onToggle);
      refreshButton?.removeEventListener('click', onRefresh);
      frame.removeEventListener('load', onLoad);
    },
  };
}

export { DEFAULT_PROJECT_PATH, GEOLIBRE_VIEWER_URL };
