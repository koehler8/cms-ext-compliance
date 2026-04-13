import { createApp, h } from 'vue';
import manifest from './extension.config.json';
import CookieConsentBanner from './components/CookieConsent.vue';

// Explicit dynamic import map — import.meta.glob does not work for
// packages installed in node_modules, so we list each component path.
const components = {
  './components/Cookies.vue': () => import('./components/Cookies.vue'),
  './components/Terms.vue': () => import('./components/Terms.vue'),
  './components/Privacy.vue': () => import('./components/Privacy.vue'),
  './components/Legal.vue': () => import('./components/Legal.vue'),
  './components/CookieConsent.vue': () => import('./components/CookieConsent.vue'),
  './components/index.js': () => import('./components/index.js'),
};

/**
 * Mount the cookie-consent banner as a standalone Vue instance appended to
 * the document body.  This replaces the previous hard-coded <CookieConsent />
 * that lived in the base CMS App.vue.
 */
function setup({ app, isClient }) {
  if (!isClient) return;

  const container = document.createElement('div');
  container.id = 'compliance-cookie-consent';
  document.body.appendChild(container);

  const banner = createApp({ render: () => h(CookieConsentBanner) });
  banner.mount(container);
}

export default { manifest, components, setup };
export { manifest };
