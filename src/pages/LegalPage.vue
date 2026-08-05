<script setup lang="ts">
import { BRAND, CONTACT } from '@/data/site'

/**
 * 法务与隐私声明：独立文档（非 SPA 锚点），/legal 可直接访问。
 * 通用条款，不做单独设计，排版沿用站点令牌。
 */

/** 条款更新日期：改动正文时同步更新这里 */
const LAST_UPDATED = '5 August 2026'
/** 咨询表单记录的保留期 */
const RETENTION_PERIOD = '24 months'
/** 适用法律辖区 */
const JURISDICTION = 'the State of California, United States'

const year = new Date().getFullYear()
</script>

<template>
  <header class="bar">
    <div class="gv-shell bar__inner">
      <a class="brand" href="/">
        <span class="brand__mark" aria-hidden="true" />
        <strong>{{ BRAND.name }}</strong>
      </a>
      <a class="bar__back" href="/">Back to site <span aria-hidden="true">→</span></a>
    </div>
  </header>

  <main class="gv-shell legal">
    <h1 class="legal__title">Legal &amp; Privacy</h1>
    <p class="legal__meta">Last updated: {{ LAST_UPDATED }}</p>

    <section>
      <h2>1. About this site</h2>
      <p>
        This website is operated by {{ BRAND.name }} (“we”, “us”). It is provided for general
        information about our products and services. Nothing on this site constitutes an offer, a
        contractual commitment, or professional advice.
      </p>
    </section>

    <section>
      <h2>2. Accuracy of content</h2>
      <p>
        We aim to keep this site accurate and current, but we make no warranty that the content is
        complete, error-free, or up to date. Product capabilities described here reflect our intended
        direction and may change without notice.
      </p>
      <p>
        Client names, quotations and case examples shown on this site are representative or
        anonymised. They are used to illustrate the kind of work we do and should not be read as
        verified performance claims or as statements attributable to any identified company.
      </p>
    </section>

    <section>
      <h2>3. Third-party names and trademarks</h2>
      <p>
        Advertising platforms and other third-party names referenced on this site are the trademarks
        of their respective owners. Their appearance indicates channels on which we may buy media on
        behalf of clients. It does not imply any partnership with, endorsement by, certification
        from, or exclusive arrangement with those platforms.
      </p>
    </section>

    <section>
      <h2>4. Intellectual property</h2>
      <p>
        All text, design, graphics and code on this site are owned by us or our licensors and are
        protected by applicable intellectual property law. You may view and print pages for your own
        reference. You may not reproduce, republish or commercially exploit any part of this site
        without our prior written permission.
      </p>
    </section>

    <section>
      <h2>5. Information we collect</h2>
      <p>We collect personal information only when you choose to give it to us.</p>
      <p>
        <strong>Enquiry form.</strong> If you submit the enquiry form on this site, we collect the
        company name, your name, your role, your work email address, your phone number (if
        provided), the support category you select, and any additional details you write.
      </p>
      <p>
        <strong>Email.</strong> If you contact us at
        <a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>, we receive your email address
        and whatever you include in your message.
      </p>
      <p>
        <strong>Analytics.</strong> We use Cloudflare Web Analytics to understand aggregate site
        traffic. This service does not use cookies and does not track visitors across sites or over
        time. It collects limited technical information such as page URL, referrer, and general
        device and browser type.
      </p>
      <p>
        We do not knowingly collect information from anyone under 16. We do not collect special
        categories of personal data through this site.
      </p>
    </section>

    <section>
      <h2>6. How we use your information</h2>
      <p>We use the information you provide to:</p>
      <ul>
        <li>respond to your enquiry and discuss whether our services fit your needs;</li>
        <li>maintain a record of business correspondence;</li>
        <li>comply with applicable legal and regulatory obligations.</li>
      </ul>
      <p>
        We do not sell your personal information. We do not use enquiry form submissions to send
        marketing communications unless you have separately asked us to.
      </p>
      <p>
        Our legal basis for processing is your consent, given when you submit the form, and our
        legitimate interest in responding to business enquiries.
      </p>
    </section>

    <section>
      <h2>7. Who we share it with</h2>
      <p>We share personal information only with:</p>
      <ul>
        <li>
          service providers who host this site and handle our email and business correspondence,
          acting on our instructions;
        </li>
        <li>professional advisers, where necessary;</li>
        <li>authorities, where we are legally required to do so.</li>
      </ul>
      <p>We do not share your information with advertising platforms or data brokers.</p>
      <p>
        Some of these providers may process data outside your country of residence. Where that
        happens, we rely on appropriate safeguards recognised under applicable data protection law.
      </p>
    </section>

    <section>
      <h2>8. How long we keep it</h2>
      <p>
        We keep enquiry records for {{ RETENTION_PERIOD }} from our last substantive contact with
        you, after which they are deleted or anonymised, unless a longer period is required by law.
      </p>
    </section>

    <section>
      <h2>9. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to request access to the personal
        information we hold about you, to have it corrected or deleted, to object to or restrict how
        we use it, to receive a copy in a portable format, and to withdraw consent at any time.
      </p>
      <p>
        To exercise any of these rights, email
        <a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>. We will respond within the
        timeframe required by applicable law. If you are not satisfied with our response, you may
        lodge a complaint with your local data protection authority.
      </p>
    </section>

    <section>
      <h2>10. Security</h2>
      <p>
        We apply reasonable technical and organisational measures to protect the information you
        send us. No method of transmission over the internet is completely secure, and we cannot
        guarantee absolute security.
      </p>
    </section>

    <section>
      <h2>11. External links</h2>
      <p>
        This site may link to third-party websites. We are not responsible for their content or
        their privacy practices. This notice applies only to this site.
      </p>
    </section>

    <section>
      <h2>12. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for any loss or damage arising
        from your use of, or reliance on, this site or its content.
      </p>
    </section>

    <section>
      <h2>13. Governing law</h2>
      <p>
        This notice and any dispute arising from it are governed by the laws of {{ JURISDICTION }}.
      </p>
    </section>

    <section>
      <h2>14. Changes to this notice</h2>
      <p>
        We may update this notice from time to time. The current version is always the one published
        on this page, with the date shown at the top.
      </p>
    </section>

    <section>
      <h2>15. Contact</h2>
      <p>
        Questions about this notice or about how we handle personal information:<br />
        <strong><a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></strong>
      </p>
    </section>
  </main>

  <footer class="foot">
    <div class="gv-shell foot__inner">
      <small>© {{ year }} {{ BRAND.name }}. All rights reserved.</small>
      <a href="/">{{ BRAND.name }} home</a>
    </div>
  </footer>
</template>

<style scoped>
/* —— 顶栏 —— */

.bar {
  border-bottom: 1px solid var(--gv-border);
  background: var(--gv-ink-deep);
}

.bar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--gv-font-display);
  font-size: 1.05rem;
  letter-spacing: -0.02em;
}

.brand__mark {
  width: 26px;
  height: 26px;
  flex: none;
  border-radius: 8px;
  background: var(--gv-grad-volt);
  box-shadow: 0 0 18px rgb(0 224 138 / 45%);
  clip-path: polygon(56% 0, 22% 54%, 46% 54%, 38% 100%, 78% 42%, 52% 42%);
}

.bar__back {
  font-size: var(--gv-size-small);
  color: var(--gv-text-mute);
  transition: color var(--gv-dur-fast) var(--gv-ease);
}

.bar__back:hover {
  color: var(--gv-volt);
}

/* —— 正文 —— */

.legal {
  /* 法务长文：限宽到易读的行长，不铺满 1360px 的站点栅格 */
  max-width: 78ch;
  margin-inline: auto;
  padding-block: clamp(3rem, 8vh, 5.5rem) clamp(4rem, 10vh, 7rem);
}

.legal__title {
  font-size: var(--gv-size-h2);
}

.legal__meta {
  margin-top: 0.9rem;
  font-size: var(--gv-size-small);
  color: var(--gv-text-faint);
}

.legal section {
  margin-top: 2.75rem;
}

.legal h2 {
  font-size: var(--gv-size-h3);
}

.legal p,
.legal li {
  margin-top: 1rem;
  color: var(--gv-text-soft);
}

.legal ul {
  margin: 0;
  padding-left: 1.25rem;
}

.legal a {
  color: var(--gv-volt);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal strong {
  color: var(--gv-text);
}

/* —— 页脚 —— */

.foot {
  border-top: 1px solid var(--gv-border);
  background: var(--gv-ink-deep);
}

.foot__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-block: 1.5rem;
  font-size: var(--gv-size-micro);
  color: var(--gv-text-faint);
}

.foot__inner a:hover {
  color: var(--gv-volt);
}
</style>
