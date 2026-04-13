<template>
  <section class="legal-page section-shell" data-analytics-section="cookies">
    <div class="container legal-page__container">
      <article class="legal-card">
        <header class="legal-card__header">
          <h2 class="legal-card__title">{{ headerTitle }}</h2>
          <span class="legal-divider" aria-hidden="true"></span>
          <p class="legal-card__meta">Last revised: {{ lastUpdated }}</p>
        </header>

        <div class="legal-content">
          <section class="consent-panel">
            <h3 class="consent-panel__title">Cookie Consent Management</h3>
                <p>We respect your privacy. When the cookie consent banner is enabled, you'll see a small prompt on the site to accept or decline analytics tracking. Regardless of the banner, you can always manage your preference here.</p>
                <p><strong>Current Status:</strong> <span :class="['consent-status', consentStatusClass]">{{ consentStatusText }}</span></p>
                <p v-if="isAccepted">
                  You have accepted cookies and analytics tracking. Use the controls below to revoke that consent whenever you choose.
                </p>
                <p v-else-if="isDeclined">
                  You have declined cookies and analytics tracking. You can opt back in at any time using the controls below.
                </p>
                <p v-else>
                  You have not yet made a decision about cookies.
                  <template v-if="bannerEnabled">
                    The consent notice will continue to appear while you browse until you choose an option.
                  </template>
                  <template v-else>
                    Use the controls on this page whenever you are ready to accept or decline.
                  </template>
                </p>
                <div class="consent-controls">
                  <button
                    class="primary-button consent-button"
                    :disabled="isAccepted"
                    type="button"
                    @click="handleAccept"
                  >
                    Accept Analytics
                  </button>
                  <button
                    class="consent-button consent-button--decline"
                    :disabled="isDeclined"
                    type="button"
                    @click="handleDecline"
                  >
                    Decline Analytics
                  </button>
                </div>
          </section>
          <template v-if="hasCustomContent">
            <p v-if="customIntro">{{ customIntro }}</p>
            <div
              v-if="customBody"
              class="legal-rich-text"
              v-html="customBody"
            />
            <section
              v-for="(section, index) in customSections"
              :key="section.id || index"
              class="legal-section"
            >
              <h3 v-if="section.title">{{ section.title }}</h3>
              <p v-if="section.summary">{{ section.summary }}</p>
              <div
                v-if="section.body"
                class="legal-rich-text"
                v-html="section.body"
              />
              <p
                v-for="(paragraph, paragraphIndex) in section.paragraphs"
                :key="`paragraph-${paragraphIndex}`"
              >
                {{ paragraph }}
              </p>
              <ul v-if="section.list.length">
                <li
                  v-for="(item, itemIndex) in section.list"
                  :key="`item-${itemIndex}`"
                >
                  {{ item }}
                </li>
              </ul>
            </section>
          </template>
          <template v-else>
              <p>About this Policy</p>
                  <p>Our Privacy Policy explains our principles when it comes to the collection, processing, and
                storage of your personal information. This policy explains the use of cookies in more details,
                such as what cookies are and how they are used. However, to get a full picture of how we
                handle your privacy this policy should be read together with our Privacy Policy.</p>
                <p>What are cookies?</p>
                <p>Cookies are text files, containing small amounts of information, which are downloaded to
                your browsing device, such as your computer, mobile device or smartphone, when you visit
                our website or use our services. Cookies can be recognised by the website that downloaded
                them — or other websites that use the same cookies. This helps websites know if the
                  browsing device has visited them before.</p>
                <p>We use two types of cookies: persistent cookies and session cookies. A persistent cookie
                lasts beyond the current session and is used for many purposes, such as recognizing you as
                an existing user, so it’s easier to return to us and interact with our services. Since a
                persistent cookie stays in your browser, it will be read by us when you return to one of our
                sites or visit a third-party site that uses our services. Session cookies last only as long as the
                  session (usually the current visit to a website or a browser session).</p>
                <p>Do I need to accept cookies?</p>
                <p>No, you do not need to accept cookies. But, please be advised that if you do not accept
                cookies the service might be difficult or impossible to use.</p>
                <p>You can adjust settings on your browser so that you will be notified when you receive a
                cookie. Please refer to your browser documentation to check if cookies have been enabled
                on your computer or to request not to receive cookies. As cookies allow you to take
                advantage of some of the Website’s essential features, we recommend that you accept
                cookies. For instance, if you block or otherwise reject our cookies, you will not be able to use
                  any products or services on the website that may require you to log in.</p>
                <p>What are the cookies used for?</p>
                <p>Functional Cookies Functional cookies are essential to provide our services as we want to
                provide them. They are used to remember your preferences on our website and to provide
                an enhanced and personalised experience. The information collected by these cookies is
                usually anonymised, so we cannot identify you personally. Functional cookies do not track
                your internet usage or gather information that could be used for selling advertising. These
                cookies are usually session cookies that will expire when you close your browsing session,
                  but some are also persistent cookies.</p>
                <p>Essential or ‘Strictly Necessary’ Cookies</p>
                <p>These cookies are essential to provide our services. Without these cookies, parts of our
                website will not function. These cookies do not track where you have been on the internet
                and do remember preferences beyond your current visit and do not gather information about
                you that could be used for marketing purposes. These cookies are usually session cookies
                which will expire when you close your browsing session.</p>
                <p>Analytical Performance Cookies</p>
                <p>Analytical performance cookies are used to monitor the performance of our website and
                services, for example, to determine the number of page views and the number of unique
                users a website has. Web analytics services may be designed and operated by third parties.
                The information provided by these cookies allows us to analyse patterns of user behaviour
                and we use that information to enhance user experience or identify areas of the website
                which may require maintenance. The information is anonymous, cannot be used to identify
                you, does not contain personal information and is only used for statistical purposes.</p>
                <p>Advertising Cookies</p>
                <p>These cookies remember that you have visited a website and use that information to provide
                you with content or advertising which is tailored to your interests. They are also used to limit
                the number of times you see an advertisement as well as help measure the effectiveness of
                the advertising campaign. The information collected by these cookies may be shared with
                trusted third-party partners such as advertisers.</p>
                <p>We may update this Cookie Policy from time to time for operational, legal or regulatory
                reasons.</p>
                <p>If you have any questions regarding our policy on cookies please contact: {{ supportEmail }}</p>
          </template>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, ref } from 'vue';

import {
  getConsentStatus,
  acceptConsent,
  declineConsent,
  ConsentStatus,
  isCookieBannerEnabled,
  scheduleAnalyticsLoad
} from '@koehler8/cms/utils/cookieConsent';
import { trackEvent } from '@koehler8/cms/utils/analytics';

const props = defineProps({
  content: {
    type: Object,
    default: null,
  },
  configKey: {
    type: String,
    default: null,
  },
});

const injectedSiteData = inject('siteData', ref({}));

const siteName = computed(() => injectedSiteData.value?.site?.title || '');
const siteUrl = computed(() => injectedSiteData.value?.site?.url || '');
const supportEmail = computed(() => injectedSiteData.value?.site?.supportEmail || '');
const customContent = computed(() =>
  props.content && typeof props.content === 'object' ? props.content : null,
);
const consentStatus = ref(ConsentStatus.PENDING);
const bannerEnabled = isCookieBannerEnabled();
const TOKEN_TICKER = '';
const googleId = computed(() => injectedSiteData.value?.site?.googleId || '');

const headerTitle = computed(() => {
  if (customContent.value?.title) {
    return customContent.value.title;
  }
  if (siteName.value) {
    return `${siteName.value} - Cookies Policy`;
  }
  return 'Cookies Policy';
});

const lastUpdated = computed(() => customContent.value?.lastUpdated || 'August 2025');
const customIntro = computed(() =>
  typeof customContent.value?.intro === 'string' ? customContent.value.intro : '',
);
const customBody = computed(() =>
  typeof customContent.value?.body === 'string' ? customContent.value.body : '',
);

function normalizeSectionItems(sections) {
  if (!Array.isArray(sections)) return [];
  return sections
    .map((section, index) => {
      if (!section || typeof section !== 'object') return null;
      const paragraphs = Array.isArray(section.paragraphs)
        ? section.paragraphs.filter((text) => typeof text === 'string' && text.trim().length)
        : [];
      const list = Array.isArray(section.list)
        ? section.list.filter((text) => typeof text === 'string' && text.trim().length)
        : [];
      const summary = typeof section.summary === 'string' ? section.summary : null;
      const body = typeof section.body === 'string' ? section.body : null;
      const html = typeof section.html === 'string' ? section.html : null;
      const title = typeof section.title === 'string' ? section.title : '';
      if (!title && !summary && !body && !html && !paragraphs.length && !list.length) {
        return null;
      }
      return {
        id: section.id || title || `section-${index}`,
        title,
        summary,
        body: body || html,
        paragraphs,
        list,
      };
    })
    .filter(Boolean);
}

const customSections = computed(() => normalizeSectionItems(customContent.value?.sections));
const hasCustomContent = computed(
  () => Boolean(customIntro.value || customBody.value || customSections.value.length),
);

const consentStatusText = computed(() => {
  switch (consentStatus.value) {
    case ConsentStatus.ACCEPTED:
      return 'Accepted';
    case ConsentStatus.DECLINED:
      return 'Declined';
    default:
      return 'Pending';
  }
});

const consentStatusClass = computed(() => {
  switch (consentStatus.value) {
    case ConsentStatus.ACCEPTED:
      return 'consent-status--accepted';
    case ConsentStatus.DECLINED:
      return 'consent-status--declined';
    default:
      return 'consent-status--pending';
  }
});

const isAccepted = computed(() => consentStatus.value === ConsentStatus.ACCEPTED);
const isDeclined = computed(() => consentStatus.value === ConsentStatus.DECLINED);

let consentChangeHandler;

async function initializeAnalyticsIfNeeded() {
  if (!googleId.value) return;
  try {
    await scheduleAnalyticsLoad(googleId.value);
  } catch (error) {
    console.error('Failed to initialize analytics after consent change:', error);
  }
}

function applyConsent(status) {
  consentStatus.value = status;
}

async function handleAccept() {
  if (isAccepted.value) return;
  acceptConsent();
  applyConsent(ConsentStatus.ACCEPTED);
  trackEvent('cookie_consent_choice', {
    token: TOKEN_TICKER || 'unknown',
    choice: 'accept',
    source: 'settings'
  });
  await initializeAnalyticsIfNeeded();
}

function handleDecline() {
  if (isDeclined.value) return;
  declineConsent();
  applyConsent(ConsentStatus.DECLINED);
  trackEvent('cookie_consent_choice', {
    token: TOKEN_TICKER || 'unknown',
    choice: 'decline',
    source: 'settings'
  });
}

onMounted(() => {
  consentStatus.value = getConsentStatus();
  consentChangeHandler = (event) => {
    const nextStatus = event?.detail?.status;
    if (nextStatus && Object.values(ConsentStatus).includes(nextStatus)) {
      consentStatus.value = nextStatus;
    } else {
      consentStatus.value = getConsentStatus();
    }
  };
  window.addEventListener('consentChanged', consentChangeHandler);
});

onUnmounted(() => {
  if (consentChangeHandler) {
    window.removeEventListener('consentChanged', consentChangeHandler);
    consentChangeHandler = undefined;
  }
});
</script>



<style scoped>
.legal-page {
  background: var(
    --legal-page-bg,
    color-mix(in srgb, var(--brand-bg-900, #04050a) 90%, #020207 10%)
  );
}

.legal-page__container {
  max-width: 920px;
  margin: 0 auto;
}

.legal-card {
  --legal-card-color: var(
    --legal-card-text,
    var(--brand-card-text, var(--ui-text-primary, #1f2a44))
  );
  --legal-card-color-muted: color-mix(in srgb, var(--legal-card-color) 70%, transparent);
  --legal-card-color-subtle: color-mix(in srgb, var(--legal-card-color) 55%, transparent);
  background: var(--legal-card-bg, var(--brand-surface-card-bg, #ffffff));
  color: var(--legal-card-color);
  border-radius: var(--brand-card-radius, 28px);
  border: 1px solid
    color-mix(in srgb, var(--brand-surface-card-border, rgba(78, 105, 155, 0.35)) 80%, transparent);
  box-shadow: var(--legal-card-shadow, 0 35px 70px rgba(4, 6, 15, 0.35));
  padding: clamp(28px, 6vw, 56px);
}

.legal-card__header {
  text-align: center;
  margin-bottom: clamp(20px, 4vw, 36px);
}

.legal-card__title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--legal-card-color, currentColor);
}

.legal-card__meta {
  margin: 14px 0 0;
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(
    --legal-card-meta-color,
    var(--legal-card-color-subtle, color-mix(in srgb, var(--ui-text-muted, rgba(31, 42, 68, 0.7)) 90%, transparent))
  );
}

.legal-divider {
  display: block;
  width: 72px;
  height: 2px;
  margin: 18px auto 0;
  background: var(
    --legal-divider-color,
    color-mix(in srgb, var(--brand-border-highlight, rgba(79, 108, 240, 0.6)) 90%, transparent)
  );
  border-radius: 999px;
}

.legal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.7;
  color: inherit;
}

.legal-content p {
  margin: 0;
}

.legal-content strong {
  color: var(--legal-strong-color, var(--legal-card-color));
}

.legal-content ul {
  margin: 0;
  padding-left: 1.2rem;
  line-height: 1.6;
}

.legal-content li + li {
  margin-top: 0.35rem;
}

.consent-panel {
  background: var(
    --consent-panel-bg,
    color-mix(in srgb, var(--brand-card-soft, rgba(10, 12, 18, 0.92)) 92%, transparent)
  );
  color: var(--consent-panel-color, var(--legal-card-color));
  border: 1px solid
    var(
      --consent-panel-border,
      color-mix(
        in srgb,
        var(--brand-surface-card-border, rgba(79, 108, 240, 0.3)) 85%,
        transparent
      )
    );
  border-radius: clamp(18px, 3vw, 26px);
  padding: clamp(20px, 4vw, 32px);
  margin-bottom: clamp(24px, 4vw, 40px);
}

.consent-panel__title {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--consent-panel-title-color, var(--consent-panel-color));
}

.consent-status {
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-left: 6px;
}

.consent-status--accepted {
  color: var(--brand-status-success, #1eb980);
}

.consent-status--declined {
  color: var(--brand-status-error, #e45865);
}

.consent-status--pending {
  color: var(--ui-text-muted, rgba(31, 42, 68, 0.72));
}

.consent-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.consent-button {
  border-radius: 999px;
  padding: 0.85rem 1.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.consent-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.consent-button--decline {
  border: 1px solid color-mix(in srgb, var(--brand-border-highlight, rgba(79, 108, 240, 0.45)) 90%, transparent);
  color: var(--consent-panel-color, var(--legal-card-color));
  background: transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.consent-button--decline:hover,
.consent-button--decline:focus-visible {
  border-color: var(--brand-border-highlight, rgba(79, 108, 240, 0.8));
  color: var(--brand-cta-text, #ffffff);
}
</style>
