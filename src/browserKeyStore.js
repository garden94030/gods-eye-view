import { KEY_SETUP_KEYS } from './keySetupCore.mjs';

/** Browser-only provider overrides used by a public deployment. */
export const BROWSER_KEY_STORAGE_KEY = 'gev.provider-keys.v1';

const BROWSER_ENV_VARS = new Set(
  KEY_SETUP_KEYS.filter((entry) => entry.clientExposed).flatMap(
    (entry) => entry.envVars,
  ),
);

function storageOrNull(storage) {
  if (storage !== undefined) return storage;
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

/** Read only browser-exposed keys; malformed or foreign values are ignored. */
export function readBrowserKeyOverrides(storage) {
  const target = storageOrNull(storage);
  if (!target) return {};
  try {
    const parsed = JSON.parse(target.getItem(BROWSER_KEY_STORAGE_KEY) || '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
      return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([name, value]) =>
          BROWSER_ENV_VARS.has(name) &&
          typeof value === 'string' &&
          value.trim() !== '',
      ),
    );
  } catch {
    return {};
  }
}

/** Merge or remove browser-exposed keys without ever accepting server-only names. */
export function writeBrowserKeyOverrides(updates, storage) {
  const target = storageOrNull(storage);
  if (!target)
    throw new Error('This browser does not allow local key storage.');
  const next = readBrowserKeyOverrides(target);
  for (const [name, value] of Object.entries(updates || {})) {
    if (!BROWSER_ENV_VARS.has(name)) continue;
    if (value === null) delete next[name];
    else if (typeof value === 'string' && value.trim())
      next[name] = value.trim();
  }
  target.setItem(BROWSER_KEY_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function browserKeyEnvVars() {
  return new Set(BROWSER_ENV_VARS);
}
