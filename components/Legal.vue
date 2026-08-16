<template>
  <section class="legal-bar ui-legal">
    <div class="container ui-legal__content">
      <div class="legal-bar__copy">
        <small>{{ copyrightText }}</small>
      </div>
      <ul class="ui-legal__links">
        <li v-for="link in legalLinks" :key="link.href">
          <a class="ui-legal__link" :href="link.href" rel="nofollow">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

const injectedSiteData = inject('siteData', ref({}));
const pageContent = inject('pageContent', ref({}));

// Content block for this component (configKey "legal"), resolved page-first
// then shared, matching how the bundled components resolve theirs.
const legal = computed(() => {
  const fromPage = pageContent.value?.legal;
  if (fromPage && typeof fromPage === 'object') return fromPage;
  const fromShared = injectedSiteData.value?.shared?.content?.legal;
  return (fromShared && typeof fromShared === 'object') ? fromShared : {};
});

const trimmed = (value) => (typeof value === 'string' && value.trim() ? value.trim() : '');

// The legal entity in the copyright line. `site.title` is a reasonable default
// but a poor one for sites whose title is descriptive rather than a name — it
// produced lines like "© 2026 Acme — the best widgets anywhere - All rights
// reserved." Sites set `content.legal.company` to the entity name instead of
// distorting `site.title`, which also feeds <title>, the logo alt, and JSON-LD.
const companyName = computed(
  () => trimmed(legal.value?.company) || trimmed(injectedSiteData.value?.site?.title),
);

const currentYear = new Date().getFullYear();

// `content.legal.copyright` replaces the generated line outright — the escape
// hatch for jurisdictions or entities whose notice doesn't fit the template.
const copyrightText = computed(() => {
  const override = trimmed(legal.value?.copyright);
  if (override) return override;
  const brand = companyName.value ? ` ${companyName.value}` : '';
  return `© ${currentYear}${brand} - All rights reserved.`;
});

const legalLinks = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/cookies', label: 'Cookies' },
];
</script>

<style scoped>
.legal-bar__copy {
  font-size: 0.85rem;
  color: inherit;
}
</style>
