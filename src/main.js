import { createStandaloneApplication } from './standalone/application.js';
import { describeError } from './standalone/errors.js';
import { installTraditionalChinesePlugin } from './plugins/traditionalChinese.js';
import { readBrowserKeyOverrides } from './browserKeyStore.js';

// The add-on is enabled by default; append ?lang=en to inspect the upstream UI.
const traditionalChinesePlugin = installTraditionalChinesePlugin();
const browserKeyOverrides = readBrowserKeyOverrides();

const application = createStandaloneApplication({
  googleApiKey:
    browserKeyOverrides.GOOGLE_MAPS_API_KEY ||
    import.meta.env.GOOGLE_MAPS_API_KEY,
  cesiumToken:
    browserKeyOverrides.CESIUM_ION_TOKEN || import.meta.env.CESIUM_ION_TOKEN,
  allowQaRegistration: import.meta.env.DEV,
});

application.start().catch((error) => {
  console.error("God's Eye View initialization failed:", error);
  const loaderStatus = document.querySelector('#loading-screen .loader-status');
  loaderStatus.textContent = `Error: ${describeError(error)}`;
  loaderStatus.style.color = '#ff4444';
});

export { application };
export { traditionalChinesePlugin };
