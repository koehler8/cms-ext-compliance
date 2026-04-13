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

const siteName = computed(() => injectedSiteData.value?.site?.title || '');
const currentYear = new Date().getFullYear();
const copyrightText = computed(() => {
  const brand = siteName.value ? ` ${siteName.value}` : '';
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
