<template>
  <section class="legal-page section-shell" data-analytics-section="privacy">
    <div class="container legal-page__container">
      <article class="legal-card">
        <header class="legal-card__header">
          <h2 class="legal-card__title">{{ headerTitle }}</h2>
          <span class="legal-divider" aria-hidden="true"></span>
          <p class="legal-card__meta">Last revised: {{ lastUpdated }}</p>
        </header>
        <div class="legal-content">
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
              <p>
                This Privacy Policy constitutes a part of {{siteName}}’s Terms and Conditions (the “Terms”).<br>
                The terms used in this Privacy Policy shall have the same meanings as in the Terms except
                as otherwise provided herein.<br>
                This Privacy Policy explains how {{siteName}} and {{siteName}}’s Operators collect, use,
                process, disclose, share, transfer, and protect personal information obtained through {{siteName}}
                and its partners. The terms “we,” “us,” and “our” refer to {{siteName}} and {{siteName}}’s
                Operators. When we ask for certain personal information from users, it is because we are
                required by applicable laws or government orders to collect such information or it is relevant
                for our specified purposes. Please refer to the separate Cookies Policy for the exact use of
                cookies.<br>
                Please carefully read the full content of this Privacy Policy. When visiting the {{siteName}}
                website, regardless of whether or not you register for or log in, you acknowledge,
                understand, and consent to all articles described in this Privacy Policy. We will not use your
                personal information for any purpose not covered in this Privacy Policy, the Cookies Policy
                or the Terms without prior notification to you and your consent.<br>
                This Privacy Policy has incorporated elements from the General Data Protection Regulation
                (GDPR) as we act in accordance with its personal information processing rules within the
                European Economic Area (EEA). We utilize standard contract clauses, rely on the European
                Commission's adequacy decisions about certain countries, as applicable, and obtain your
                consent for these data transfers to third countries if required by applicable laws.<br>
                <br>
                1. TYPES OF DATA WE COLLECT<br>
                The types of Personal Data that we collect directly from you or third parties depend on the
                circumstances of collection and the nature of the service requested or transaction
                undertaken. It may include (but is not limited to):<br>
                (a) personal information that links back to an individual, e.g., name, date of birth, and other
                personal identification numbers;<br>
                (b) contact information, e.g., address, phone number and email address, Ethereum wallet
                address;<br>
                (c) technical information, e.g., IP address for API services and logins<br>
                (d) statistical data, e.g., hits to the website.<br>
                <br>
                2. HOW DO WE COLLECT PERSONAL DATA?<br>
                This Privacy Policy covers any Personal Data provided to us:<br>
                (a) when you engage with our products and services;<br>
                (b) when you create an account with us;<br>
                (c) under any other contractual agreement or arrangement;<br>
                Some of the other ways we may collect Personal Data shall include (but is not limited to):<br>
                (a) communications with you via telephone, letter, fax, and email;<br>
                (b) when you visit our website;<br>
                (c) when you contact us in person;<br>
                (d) when we contact you in person;<br>
                (e) when we collect information about you from third parties (such as the social graphs
                available from social media companies); and other channels including our support helpdesk.<br>
                (f) Possible extrapolation of other information by processing the data.<br>
                <br>
                3. WHAT OTHER DATA DO WE COLLECT?<br>
                From our website and services, we collect your Personal Data in the following ways:<br>
                (a) IP address We use your IP address to help diagnose problems with our server and to
                administer our website. IP addresses are not linked to personally identifiable information.<br>
                (b) Cookies<br>
                A cookie is an element of data that a website can send to your browser, which may then
                store it on your system. We use cookies in some of our pages to store your preferences and
                record session information. The information that we collect is then used to ensure a more
                personalized service level for our users.<br>
                Please refer to our Cookie Policy for the exact information on how we use cookies.<br>
                <strong>Cookie Consent:</strong> We respect your privacy and have implemented a cookie consent mechanism. 
                When you first visit our website, you will be presented with a banner allowing you to accept or decline 
                the use of cookies and analytics tracking (including Google Analytics). We will only load 
                these tracking scripts if you explicitly accept. You can change your consent preferences at any time 
                through our <a href="/cookies">Cookie Policy page</a>.<br>
                Information collected from cookies is used by us to evaluate the effectiveness of our site,
                analyze trends, and manage the platform. The information collected from cookies allows us
                to determine such things as which parts of our site are most visited and difficulties our
                visitors may experience in accessing our site.<br>
                With this knowledge, we can improve the quality of your experience on the platform by
                recognizing and delivering more of the most desired features and information, as well as by
                resolving access difficulties. We may also use cookies and/or a technology known as web
                bugs or clear gifs, which are typically stored in emails to help us confirm your receipt of, and
                response to our emails and to provide you with a more personalized experience when using
                our site, or allow third-party service providers to do this.<br>
                Log in information can potentially be saved in cookies. Therefore it is important that you
                prevent unauthorized access to your password and your computer. If you use a shared
                computer, you should always log out properly and clear the browser for cookies.<br>
                (c) User feedback form<br>
                Our feedback form requires you to give us contact information (e.g. your name and email
                address) so that we can respond to your comments. We use your contact information from
                the registration form to send you information about our company. Your contact information is
                also used to contact you where necessary.<br>
                (d) Site tracking<br>
                We also use third-party service provider(s), to assist us in better understanding the use of
                our site. Our service provider(s) will place cookies on the hard drive of your computer and
                will receive information that we select, for example, how visitors navigate around our site,
                what pages are browsed and general transaction information. Our service provider(s)
                analyzes this information and provides us with aggregate reports. The information and
                analysis provided by our service provider(s) will be used to assist us in better understanding
                our visitors’ interests in our site and how to better serve those interests. The information
                collected by our service provider(s) may be linked to and combined with information that we
                collect about you while you are using the platform. Our service provider(s) is/are
                contractually restricted from using information they receive from our Site other than to assist
                us.<br>
                <br>
                4. WHAT DO WE USE YOUR PERSONAL DATA FOR?<br>
                We may use your Personal Data for the following “Core Purposes”:<br>
                (a) to enable us to provide our services and perform our services to you;<br>
                (b) to protect the safety and well being of yourself and/or other customers;<br>
                (c) to investigate and respond to claims and inquiries from you;<br>
                (d) for business development purposes such as statistical and marketing analysis, systems
                testing, maintenance and development, customer surveys or to help us in any future
                dealings with you, for example by identifying your requirements and preference;<br>
                (e) to comply with any legal or regulatory requirements; and/ or<br>
                (f) for all other purposes ancillary to any of the purposes stated above. Ancillary to these
                “Core Purposes”, we reserve the right to use your data in the following ways:<br>
                (g) to communicate offers, product, services and information on products and activities;<br>
                (h) marketing/cross-marketing and communicating with you in relation to products and
                services offered by us and our service partners as well as our appointed agents; and/or<br>
                (i) for all other company-related purposes ancillary to any of the purposes stated above.<br>
                <br>
                5. ACCESSING / CORRECTING / UPDATING YOUR PERSONAL DATA<br>
                Depending on your country of residence and its legislation, you may have the right to
                request from us a copy of your personal data, as well as to delete your personal data, make
                amendments to it or restrict its processing. We will endeavour to provide the information
                back to you as soon as practicable. However, we also reserve the right to validate all
                requests for the authenticity of the request.<br>
                You may be requested to provide us with your personal data, such as KYC documents in
                specific situations to comply with legal and regulatory requirements or in case of a dispute
                between you and {{siteUrl}}. In such cases {{siteUrl}} expects you to provide us
                with such requested information for the further processing and actions.<br>
                We hope to ensure that you are fully aware of the data protection rights that you enjoy.<br>
                Unless otherwise required by law or government orders, each User has the following rights:<br>
                5.1 Right of Access<br>
                You have the right to access or obtain copies of your personal information. We may charge a
                reasonable fee for providing the access service.<br>
                5.2 Right to Rectification<br>
                You have the right to correct your personal information that you deem inaccurate. You also
                have the right to ask us to complete the personal information that you deem incomplete
                within a reasonable limit.<br>
                5.3 Right to Erasure (Right to be Forgotten)<br>
                You have the right to request the erasure of your personal data under certain circumstances.<br>
                5.4 Right to Restriction of Processing<br>
                Under certain circumstances as required by law or as specifically reminded by us, you have
                the right to request us to restrict the processing of your personal information; however, you
                understand that such restriction of the processing may prevent us from providing you with
                some of {{siteName}}’s services.<br>
                5.5 Right to Object<br>
                Under certain circumstances as required by law or as specifically reminded by us, you have
                the right to object to the processing of your personal information; however, you understand
                that such objection of the processing may prevent us from providing you with some of {{siteName}}’s services.<br>
                5.6 Right to Data Portability<br>
                Under certain circumstances as required by law or as specifically reminded by us, you have
                the right to request us to transmit the personal information that we collect to another body, or
                directly to you. We may charge a reasonable fee for providing the transmission service.<br>
                <br>
                6. WITHDRAWING CONSENT<br>
                Please note that it is obligatory for the Company to process your Personal Data for the Core
                Purpose as stated above, without which some services or features provided by {{siteName}}
                may be affected. If we do not have your consent to process your Personal Data for Ancillary
                Purposes, we will not be able to keep you updated about our future, new and/or enhanced
                services and products.<br>
                Nevertheless, you may stop receiving promotional activities by:<br>
                (a) unsubscribing from the mailing list(s);<br>
                (b) editing the relevant account settings to unsubscribe; or<br>
                (c) sending a request via our Contact Us form on {{siteUrl}}<br>
                <br>
                7. TO WHOM DO WE DISCLOSE YOUR PERSONAL DATA?<br>
                We will not trade or sell your Personal Data to third parties. Your Personal Data shall only be
                disclosed or transferred to the following third parties appointed or authorised by the
                Company for the fulfilment of the Purpose of: (a) data warehouses; (b) IT service providers;
                (c) data analytics and/or marketing agency; (d) legal bodies as permitted or required by law
                such as in compliance with a warrant or subpoena issued by a court of competent
                jurisdiction; and/or (e) regulatory authorities applicable to you; and/or<br>
                (f) safety and security personnel. In addition to the above, your Personal Data may also be
                disclosed or transferred to any of the Company’s actual and potential assignee, transferee or
                acquirer (including our affiliates and subsidiaries) or our business, assets or group
                companies, or in connection with any corporate restructuring or exercise including our
                restructuring to transfer the business, assets and/or liabilities. We shall take practical steps
                to ensure that their employees, officers, agents, consultants, contractors and other third
                parties mentioned above who are involved in the collection, use and disclosure of your
                Personal Data will observe and adhere to the terms of this Privacy Statement.<br>
                <br>
                8. HOW LONG WILL WE RETAIN YOUR PERSONAL DATA?<br>
                The Company may store data in global hosting providers with servers across various regions
                and we shall take all reasonable steps to ensure that all Personal Data is destroyed or
                permanently deleted when no longer required for the Purpose of the company, and prepare
                a disposal schedule for inactive data after a 24 month period.<br>
                {{siteName}} implements various security measures to ensure that your personal data is
                stored safely and is not compromised in any way. At the same time, {{siteName}} cannot in
                good faith guarantee that data breach is not possible since no security measure is able to
                provide absolute protection. It is advised for Users to take their own safety measures such
                as 2-Factor Authentication or other measures not provided by {{siteName}}. If you suspect
                that your account information or your personal data has been compromised, you should
                contact {{siteName}}’s Support as soon as possible.<br>
                <br>
                9. LINKS TO THIRD PARTY WEBSITES<br>
                We may link this website and/or our applications to other companies’ or organizations’
                websites (collectively, “Third Party Sites”). This Privacy Notice does not apply to such Third
                Party Sites as those sites are outside our control. If you access Third Party Sites using the
                links provided, the operators of these sites may collect your personal information. Please
                ensure that you are satisfied with the privacy statements of these Third Party Sites before
                you submit any personal information. We try, as far as we can, to ensure that all third party
                linked sites have equivalent measures for the protection of your personal information, but we
                cannot be held responsible legally or otherwise for the activities, privacy policies or levels of
                privacy compliance of these Third-Party Sites.<br>
                <br>
                10. ADDITIONAL INFORMATION OR ASSISTANCE
              </p>
                <p>Please note that this Privacy Policy may be amended from time to time in accordance with
                applicable laws and regulations and such variations may be applicable to you. For further
                inquiries or complaints in relation to our handling of your Personal Data or our Privacy Policy
                or if you wish to access, update or amend your Personal Data as mentioned above please
                contact us at: {{supportEmail}}</p>
          </template>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
  import { computed, inject, ref } from 'vue';

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

  const headerTitle = computed(() => {
    if (customContent.value?.title) {
      return customContent.value.title;
    }
    if (siteName.value) {
      return `${siteName.value} - Privacy Policy`;
    }
    return 'Privacy Policy';
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
</style>
