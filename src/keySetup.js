import { createSurfaceKeyboard } from './ui/surfaceKeyboard.js';
import {
  browserKeyEnvVars,
  readBrowserKeyOverrides,
  writeBrowserKeyOverrides,
} from './browserKeyStore.js';

/**
 * The POWER UP surface — paste a key, get a power.
 *
 * A small chip sits bottom-right whenever the app is running under the dev
 * server with keys still missing. It opens a dialog rendered ENTIRELY from
 * GET /api/setup/status (the registry lives in src/keySetupCore.mjs and this
 * module never duplicates it): one row per key, what it unlocks, where to get
 * it, and a paste field. SAVE posts to /api/setup/keys, which writes the
 * repo-root .env and restarts the dev server — Vite's client then reloads the
 * page itself, and the pasted key is simply *on*. No hand-edited env files.
 *
 * The surface self-destructs where it cannot work: a prod build (no endpoint)
 * or a LAN visitor (loopback-only endpoint) fails the status fetch, and both
 * the chip and the dialog are removed outright.
 */

/** Chip label — pure, exported for tests. */
export function keySetupChipLabel(status) {
  const missing = Math.max(0, (status?.total || 0) - (status?.setCount || 0));
  return missing > 0
    ? `POWER UP · ${missing} ${missing === 1 ? 'KEY' : 'KEYS'} WAITING`
    : 'POWERED UP';
}

export function publicFallbackStatus() {
  const keys = [
    { id: 'google-maps', title: 'GOOGLE MAPS', envVars: ['GOOGLE_MAPS_API_KEY'], unlocks: '3D 地球與地點搜尋', getUrl: 'https://developers.google.com/maps/documentation/tile/get-api-key', tier: 'metered', clientExposed: true, set: false },
    { id: 'cesium-ion', title: 'CESIUM ION', envVars: ['CESIUM_ION_TOKEN'], unlocks: 'Cesium 地形與資產', getUrl: 'https://ion.cesium.com/tokens', tier: 'metered', clientExposed: true, set: false },
  ];
  return { mode: 'public-readonly', serverEditable: false, store: 'browser-and-encrypted-session', keys, total: keys.length, setCount: 0, authUnavailable: true };
}

export function providerSetupApiPrefix(pathname = globalThis.location?.pathname || '/') {
  return pathname.startsWith('/god-view/') || pathname === '/god-view' ? '/god-view/api' : '/api';
}

/**
 * Collect a POST body from field descriptors — pure, exported for tests.
 * @param {Array<{envVar: string, value: string}>} fields
 * @returns {Record<string, string>} non-empty trimmed values only
 */
export function collectKeyUpdates(fields) {
  const updates = {};
  for (const field of fields || []) {
    const value = String(field?.value ?? '').trim();
    if (value && field?.envVar) updates[field.envVar] = value;
  }
  return updates;
}

/**
 * After the FIRST Google key lands, the restart's reload should boot the
 * photoreal default — not faithfully restore the auto-selected keyless OSM
 * basemap from the URL's live share hash. Strips only `map=osm`: a stack under
 * any other name was chosen or shared on purpose and survives, and so does
 * everything else in the hash (camera, style, layers). Pure, exported for tests.
 * @param {string} hash Location hash without the leading '#'.
 * @returns {string|null} The rewritten hash, or null when there is nothing to strip.
 */
export function stripKeylessBasemapFromHash(hash) {
  if (!hash) return null;
  try {
    const params = new URLSearchParams(hash);
    if (!['osm', 'esri-imagery'].includes(params.get('map'))) return null;
    params.delete('map');
    return params.toString();
  } catch {
    return null;
  }
}

const TIER_DOTS = Object.freeze({ metered: '🔴', free: '🟡' });

/** Build one key row. All content is our own registry text, set via textContent. */
function buildRow(documentRef, key, { publicMode = false } = {}) {
  const row = documentRef.createElement('section');
  row.className = 'key-setup-row';
  row.dataset.keyId = key.id;
  row.dataset.set = String(Boolean(key.set));
  if (key.managed) row.dataset.managed = key.managed;
  // Public browser-side fields remain editable even when the deployment has a
  // build/runtime key: the visitor may choose a browser-local override. The
  // local loopback panel keeps its stricter external-ownership behavior.
  const external = key.managed === 'external' && !publicMode;

  const head = documentRef.createElement('div');
  head.className = 'key-setup-row-head';
  const led = documentRef.createElement('span');
  led.className = 'key-setup-led';
  led.setAttribute('aria-hidden', 'true');
  const title = documentRef.createElement('strong');
  title.textContent = key.title;
  const tier = documentRef.createElement('span');
  tier.className = 'key-setup-tier';
  tier.textContent = TIER_DOTS[key.tier] || '';
  tier.title =
    key.tier === 'metered'
      ? 'Metered — a billing-enabled account'
      : 'Free key — register, paste, done';
  head.append(led, title, tier);
  if (key.clientExposed) {
    const exposed = documentRef.createElement('span');
    exposed.className = 'key-setup-exposed';
    exposed.textContent = 'browser-side';
    exposed.title =
      'This key runs in the browser by design — restrict it at the provider (see SECURITY.md)';
    head.append(exposed);
  }
  if (external) {
    // Externally supplied credentials (shell env, Keychain, a launcher) are
    // facts this panel reports, never values it rewrites or deletes.
    const badge = documentRef.createElement('span');
    badge.className = 'key-setup-external';
    badge.textContent = 'configured externally';
    badge.title =
      'Supplied by your environment, Keychain, or launcher — change it where it was set';
    head.append(badge);
  }
  const get = documentRef.createElement('a');
  get.className = 'key-setup-get';
  get.href = key.getUrl;
  get.target = '_blank';
  get.rel = 'noopener noreferrer';
  get.textContent = key.set ? 'MANAGE ↗' : 'GET KEY ↗';
  head.append(get);

  const unlocks = documentRef.createElement('p');
  unlocks.className = 'key-setup-unlocks';
  unlocks.textContent = key.unlocks;

  row.append(head, unlocks);
  const browserEditable = publicMode && key.clientExposed;
  const sessionEditable = publicMode && key.serverEditable;
  if (!external && (!publicMode || browserEditable || sessionEditable)) {
    const fields = documentRef.createElement('div');
    fields.className = 'key-setup-fields';
    for (const envVar of key.envVars) {
      const input = documentRef.createElement('input');
      // Passwords-style so a pasted key never shows on a shared or recorded
      // screen — this app gets screen-recorded a lot.
      input.type = 'password';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.dataset.envVar = envVar;
      input.setAttribute('aria-label', envVar);
      input.placeholder = key.set
        ? `${envVar} saved — paste to replace`
        : `paste ${envVar}`;
      fields.append(input);
    }
    if (key.managed === 'file' || key.managed === 'browser') {
      const remove = documentRef.createElement('button');
      remove.type = 'button';
      remove.className = 'key-setup-remove';
      remove.dataset.keySetupRemove = JSON.stringify(key.envVars);
      remove.textContent = 'REMOVE';
      remove.title = `Remove ${key.title} from this app's saved keys`;
      fields.append(remove);
    }
    row.append(fields);
  } else if (publicMode && !browserEditable && !sessionEditable) {
    const serverOnly = documentRef.createElement('p');
    serverOnly.className = 'key-setup-public-only';
    serverOnly.textContent =
      'Server-side key — configure it in the public deployment environment.';
    row.append(serverOnly);
  }
  return row;
}

/**
 * Wire the chip + dialog. Fire-and-forget from main.js; resolves to null when
 * the surface has no business existing (prod build, LAN visitor, no markup).
 */
export async function initKeySetup({
  documentRef = globalThis.document,
  fetchImpl,
  signal,
} = {}) {
  const chip = documentRef?.getElementById?.('key-setup-chip');
  const root = documentRef?.getElementById?.('key-setup');
  if (!chip || !root || root.dataset.initialized === 'true') return null;
  root.dataset.initialized = 'true';
  const lifetime = new AbortController();
  let disposed = false;
  let disposeControls = () => {};
  const destroy = () => {
    if (disposed) return;
    disposed = true;
    lifetime.abort();
    signal?.removeEventListener('abort', destroy);
    disposeControls();
    chip.remove();
    root.remove();
  };
  if (signal?.aborted) {
    destroy();
    return null;
  }
  signal?.addEventListener('abort', destroy, { once: true });
  const doFetch = fetchImpl || globalThis.fetch?.bind(globalThis);

  let status = null;
  const apiPrefix = providerSetupApiPrefix();
  try {
    const response = await doFetch(`${apiPrefix}/setup/status`, {
      cache: 'no-store',
      signal: lifetime.signal,
    });
    if (response.status === 401 || response.status === 302) status = publicFallbackStatus();
    else {
      if (!response.ok) throw new Error(String(response.status));
      status = await response.json();
    }
    if (disposed) return null;
  } catch {
    if (globalThis.location?.pathname?.startsWith('/god-view')) status = publicFallbackStatus();
    else { destroy(); return null; }
  }

  const publicMode = status.mode === 'public-readonly';
  const browserVars = browserKeyEnvVars();
  const browserOverrides = publicMode ? readBrowserKeyOverrides() : {};
  if (publicMode) {
    status = {
      ...status,
      keys: (status.keys || []).map((key) => {
        if (!key.clientExposed) return { ...key, publicEditable: false };
        const locallySet = key.envVars.every((name) => browserOverrides[name]);
        return {
          ...key,
          set: locallySet || key.set,
          managed: locallySet ? 'browser' : key.set ? 'external' : null,
          publicEditable: true,
        };
      }),
    };
    const editable = status.keys.filter((key) => key.publicEditable);
    status.total = editable.length;
    status.setCount = editable.filter((key) => key.set).length;
  }

  const rowsHost = root.querySelector('[data-key-setup-rows]');
  const applyButton = root.querySelector('[data-key-setup-apply]');
  const closeButton = root.querySelector('[data-key-setup-close]');
  const chipLabel = chip.querySelector('[data-key-setup-chip-label]') || chip;
  const statusLine = root.querySelector('[data-key-setup-status]');
  const defaultStatusText = statusLine?.textContent || '';
  let busy = false;
  let open = false;

  const render = (nextStatus) => {
    if (disposed) return;
    status = nextStatus;
    chipLabel.textContent = keySetupChipLabel(status);
    // Fully powered is the owner's clean screen: the chip retires. The dialog
    // stays reachable this session (and via ?setup=1) to swap or verify keys.
    chip.hidden = !publicMode && status.setCount >= status.total;
    if (!rowsHost) return;
    rowsHost.textContent = '';
    for (const key of status.keys || [])
      rowsHost.append(buildRow(documentRef, key, { publicMode }));
  };

  const visible = () =>
    root.isConnected &&
    root.classList.contains('visible') &&
    root.getClientRects().length > 0;

  const keyboard = createSurfaceKeyboard({
    root,
    documentRef,
    isActive: () => open && visible(),
    onEscape: () => close(),
  });

  const openDialog = () => {
    if (disposed || open) return;
    open = true;
    keyboard.activate();
    root.hidden = false;
    globalThis.requestAnimationFrame?.(() => {
      if (!open) return;
      root.classList.add('visible');
      root.querySelector('input')?.focus?.({ preventScroll: true });
    });
  };

  const close = () => {
    if (!open) return;
    open = false;
    root.classList.remove('visible');
    const hide = () => {
      if (!open) root.hidden = true;
    };
    root.addEventListener('transitionend', hide, { once: true });
    globalThis.setTimeout?.(hide, 400);
    if (statusLine) statusLine.textContent = defaultStatusText;
    keyboard.deactivate({ restoreFocus: true });
  };

  const say = (text) => {
    if (statusLine) statusLine.textContent = text;
  };

  const showLoginHint = () => {
    if (!statusLine) return;
    statusLine.textContent = '登入工作階段已失效；瀏覽器專用設定仍可使用，伺服器端設定需重新登入。 ';
    const link = documentRef.createElement('a');
    link.href = `/_auth/login?next=${encodeURIComponent(globalThis.location?.pathname || '/god-view/')}`;
    link.textContent = '重新登入';
    statusLine.append(link);
  };

  const storeLabel = () =>
    status?.store === 'pinokio-environment'
      ? 'your app configuration'
      : 'your local .env';

  const submitUpdates = async (updates, doneVerb) => {
    if (disposed || busy) return;
    if (publicMode) {
      const browserUpdates = Object.fromEntries(
        Object.entries(updates).filter(([name]) => browserVars.has(name)),
      );
      const serverUpdates = Object.fromEntries(
        Object.entries(updates).filter(([name]) => !browserVars.has(name)),
      );
      if (!Object.keys(browserUpdates).length && !Object.keys(serverUpdates).length) {
        say('沒有可儲存的設定。');
        return;
      }
      try {
        if (Object.keys(serverUpdates).length) {
          const response = await doFetch(`${apiPrefix}/setup/keys`, {
            method: 'POST', signal: lifetime.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serverUpdates),
          });
          const payload = await response.json().catch(() => ({}));
          if (response.status === 401) { showLoginHint(); return; }
          if (!response.ok || !payload.ok) { say(payload.error || `儲存失敗（${response.status}）。`); return; }
          status = payload.status;
        }
        if (Object.keys(browserUpdates).length) writeBrowserKeyOverrides(browserUpdates);
        say(Object.keys(serverUpdates).length
          ? '伺服器金鑰已加密保存在目前登入工作階段，最長 8 小時。'
          : '已儲存在此瀏覽器，正在重新載入…');
        const googleWasUnset = !status?.keys?.find(
          (key) => key.id === 'google-maps',
        )?.set;
        if (googleWasUnset && browserUpdates.GOOGLE_MAPS_API_KEY) {
          const next = stripKeylessBasemapFromHash(
            globalThis.location?.hash?.slice(1) || '',
          );
          if (next !== null)
            globalThis.history?.replaceState?.(null, '', `#${next}`);
        }
        if (Object.keys(browserUpdates).length) globalThis.location?.reload?.();
        else render(status);
      } catch (error) {
        say(`Save failed: ${error?.message || error}`);
      }
      return;
    }
    const googleWasUnset = !status?.keys?.find(
      (key) => key.id === 'google-maps',
    )?.set;
    busy = true;
    applyButton?.setAttribute('aria-disabled', 'true');
    say('Saving…');
    try {
      const response = await doFetch(`${apiPrefix}/setup/keys`, {
        method: 'POST',
        signal: lifetime.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const payload = await response.json().catch(() => ({}));
      if (disposed) return;
      if (response.status === 401) { showLoginHint(); return; }
      if (!response.ok || !payload.ok) {
        say(payload.error || `Save failed (${response.status}).`);
        return;
      }
      for (const input of root.querySelectorAll('input[data-env-var]'))
        input.value = '';
      render(payload.status);
      if (googleWasUnset && payload.saved?.includes('GOOGLE_MAPS_API_KEY')) {
        const strip = () => {
          try {
            const next = stripKeylessBasemapFromHash(
              globalThis.location?.hash?.slice(1) || '',
            );
            if (next !== null)
              globalThis.history?.replaceState?.(null, '', `#${next}`);
          } catch {
            // Continuity is a nicety, never a blocker.
          }
        };
        strip();
        // The live share writer may re-serialize the still-OSM stack before
        // the restart's reload lands, so strip again at the door.
        globalThis.addEventListener?.('pagehide', strip, {
          once: true,
          signal: lifetime.signal,
        });
      }
      say(
        `${doneVerb} ${storeLabel()}. Restarting — this page reloads itself.`,
      );
    } catch (error) {
      say(`Save failed: ${error?.message || error}`);
    } finally {
      busy = false;
      applyButton?.setAttribute('aria-disabled', 'false');
    }
  };

  const onApply = async () => {
    if (disposed || busy) return;
    const inputs = [...root.querySelectorAll('input[data-env-var]')];
    const updates = collectKeyUpdates(
      inputs.map((input) => ({
        envVar: input.dataset.envVar,
        value: input.value,
      })),
    );
    if (!Object.keys(updates).length) {
      say('Paste at least one key first.');
      return;
    }
    await submitUpdates(updates, 'Saved to');
  };

  chip.addEventListener('click', openDialog);
  closeButton?.addEventListener('click', close);
  applyButton?.addEventListener('click', onApply);
  // Remove buttons are rendered per row; delegate so re-renders stay wired.
  rowsHost?.addEventListener('click', (event) => {
    const button = event.target?.closest?.('[data-key-setup-remove]');
    if (disposed || !button || busy) return;
    let envVars = [];
    try {
      envVars = JSON.parse(button.dataset.keySetupRemove || '[]');
    } catch {
      return;
    }
    if (!Array.isArray(envVars) || !envVars.length) return;
    // Removal is destructive and — behind a framing defense that should already
    // stop it — a clickjack target. A confirm turns a single aligned click into
    // a deliberate two-step the lure cannot pre-satisfy.
    const ok =
      typeof globalThis.confirm !== 'function' ||
      globalThis.confirm('Remove this key from your saved configuration?');
    if (!ok) return;
    void submitUpdates(
      Object.fromEntries(envVars.map((name) => [name, null])),
      'Removed from',
    );
  });

  render(status);
  if (status.authUnavailable) showLoginHint();

  // Re-entry for a fully-keyed setup, demos, and support: ?setup=1 opens the
  // dialog even though the chip has retired.
  try {
    if (
      new URLSearchParams(globalThis.location?.search || '').get('setup') ===
      '1'
    )
      openDialog();
  } catch {
    // An unparsable location never blocks init.
  }

  disposeControls = () => {
    open = false;
    keyboard.destroy();
    chip.removeEventListener('click', openDialog);
    closeButton?.removeEventListener('click', close);
    applyButton?.removeEventListener('click', onApply);
  };
  return { open: openDialog, close, render, destroy };
}
