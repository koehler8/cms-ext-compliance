<template>
  <div
    v-if="showBanner"
    class="cookie-consent-banner"
    role="dialog"
    aria-live="polite"
    aria-label="Cookie consent notice"
  >
    <div class="cookie-consent-content">
      <h3 class="cookie-consent-title">Cookies &amp; Analytics</h3>
      <p class="cookie-consent-message">
        We use cookies to measure traffic and improve your experience. Accept to enable analytics; decline to continue with essential cookies only.
      </p>
      <div class="cookie-consent-links">
        <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>
        <span class="separator" aria-hidden="true">•</span>
        <a href="/cookies" target="_blank" rel="noopener">Cookie Policy</a>
      </div>
      <div class="cookie-consent-actions">
        <button @click="handleAccept" class="btn btn-accept">Accept</button>
        <button @click="handleDecline" class="btn btn-decline">Decline</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  isConsentPending,
  acceptConsent,
  declineConsent,
  scheduleAnalyticsLoad,
  isCookieBannerEnabled
} from '@koehler8/cms/utils/cookieConsent';
import { loadConfigData } from '@koehler8/cms/utils/loadConfig';
import { trackEvent } from '@koehler8/cms/utils/analytics';

const showBanner = ref(false);
const bannerEnabled = isCookieBannerEnabled();
let siteData;
let consentListener;
let siteDataPromise;
let initializeTrackingPromise;
onMounted(() => {
  if (!bannerEnabled) {
    return;
  }

  siteDataPromise = loadConfigData()
    .then((data) => {
      siteData = data;
      return data;
    });

  siteDataPromise.catch((error) => {
    console.error('Unable to load site configuration for cookie consent:', error);
  });

  if (isConsentPending()) {
    showBanner.value = true;
    trackEvent('cookie_consent_banner_shown', {
      source: 'auto'
    });
  }

  consentListener = (e) => {
    if (e.detail.status === 'accepted') {
      ensureTrackingInitialized();
    }
  };

  // Listen for consent changes to load scripts
  window.addEventListener('consentChanged', consentListener);
});

onUnmounted(() => {
  if (consentListener) {
    window.removeEventListener('consentChanged', consentListener);
  }
});

function ensureTrackingInitialized() {
  if (!bannerEnabled) {
    return Promise.resolve();
  }

  if (!initializeTrackingPromise) {
    initializeTrackingPromise = (async () => {
      try {
        const data = siteData || (siteDataPromise && await siteDataPromise);
        if (!data) {
          console.warn('Site configuration unavailable; skipping analytics initialization.');
          return;
        }

        const googleId = data?.site?.googleId;

        if (googleId) {
          await scheduleAnalyticsLoad(googleId);
        }
      } catch (error) {
        console.error('Unable to initialize tracking after consent:', error);
        initializeTrackingPromise = undefined;
      }
    })();
  }

  return initializeTrackingPromise;
}

function handleAccept() {
  acceptConsent();
  showBanner.value = false;
  trackEvent('cookie_consent_choice', {
    choice: 'accept',
    source: 'banner'
  });
  ensureTrackingInitialized();
}

function handleDecline() {
  declineConsent();
  showBanner.value = false;
  trackEvent('cookie_consent_choice', {
    choice: 'decline',
    source: 'banner'
  });
}
</script>

<style scoped>
.cookie-consent-banner {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: min(340px, calc(100% - 48px));
  background-color: rgba(10, 10, 13, 0.96);
  color: var(--brand-fg-100, #f0eaf3);
  padding: 20px;
  border-radius: var(--brand-card-radius, 24px);
  box-shadow: var(--brand-surface-card-shadow, 0 8px 24px rgba(217, 22, 75, 0.18));
  border: 1px solid rgba(39, 243, 255, 0.22);
  z-index: 9999;
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cookie-consent-banner {
    animation: none;
  }
}

.cookie-consent-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cookie-consent-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.cookie-consent-message {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(240, 234, 243, 0.85);
}

.cookie-consent-links {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(201, 191, 208, 0.85);
}

.cookie-consent-links a {
  color: var(--brand-electric-blue, #27f3ff);
  text-decoration: underline;
}

.cookie-consent-links a:hover {
  color: var(--brand-neon-pink, #ff2d86);
}

.cookie-consent-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
}

.btn {
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: var(--brand-button-radius, 14px);
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
  min-width: 96px;
}

.btn-accept {
  background: var(
    --brand-primary-cta-gradient,
    linear-gradient(135deg, #ff2d86 0%, #9a2eff 55%, #27f3ff 100%)
  );
  color: var(--brand-primary-cta-text, #0a0a0d);
  box-shadow: var(--brand-primary-cta-shadow, 0 18px 40px rgba(255, 45, 134, 0.45));
}

.btn-accept:hover {
  transform: translateY(-1px);
  box-shadow: var(--brand-primary-cta-hover-shadow, 0 20px 44px rgba(255, 45, 134, 0.55));
}

.btn-accept:focus-visible {
  outline: 2px solid rgba(39, 243, 255, 0.6);
  outline-offset: 3px;
}

.btn-decline {
  background: rgba(39, 243, 255, 0.12);
  color: var(--brand-fg-100, #f0eaf3);
  border: 1px solid rgba(39, 243, 255, 0.35);
}

.btn-decline:hover {
  background: rgba(39, 243, 255, 0.22);
  border-color: rgba(39, 243, 255, 0.55);
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(39, 243, 255, 0.18);
}

.btn-decline:focus-visible {
  outline: 2px solid rgba(39, 243, 255, 0.6);
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .cookie-consent-banner {
    right: 16px;
    left: 16px;
    bottom: 16px;
    width: auto;
  }
}
</style>
