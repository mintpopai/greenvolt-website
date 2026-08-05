<script setup lang="ts">
import { BRAND, CONTACT, FOOTER_LINKS, LEGAL_LINKS } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="gv-shell footer__inner">
      <div class="footer__brand">
        <p class="footer__wordmark">{{ BRAND.name }}</p>
        <p class="footer__tagline">{{ BRAND.tagline }}.</p>
        <ul class="footer__contact">
          <li>
            <a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>
          </li>
        </ul>
      </div>

      <nav class="footer__nav" aria-label="Footer">
        <a v-for="link in FOOTER_LINKS" :key="link.label" :href="link.href">{{ link.label }}</a>
      </nav>

      <div class="footer__cta">
        <p>Planning a launch in a market you have not sold in yet?</p>
        <a href="#contact">Start the conversation <span aria-hidden="true">→</span></a>
      </div>
    </div>

    <div class="gv-shell footer__base">
      <small>© {{ year }} {{ BRAND.name }}. All rights reserved.</small>
      <div class="footer__legal">
        <a v-for="link in LEGAL_LINKS" :key="link.label" :href="link.href">{{ link.label }}</a>
      </div>
      <a class="footer__top" href="#top" aria-label="Back to top">↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  /* 必须定位并抬到内容层，否则会被 z-index:0 的固定背景遮住 */
  position: relative;
  z-index: var(--gv-z-content);
  padding-block: clamp(3.5rem, 8vh, 6rem) 2rem;
  border-top: 1px solid var(--gv-border);
  background: var(--gv-ink-deep);
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.8fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
}

.footer__wordmark {
  font-family: var(--gv-font-display);
  /* 全称比原来的短品牌名长一倍，字号收一档、折行取均衡断点 */
  font-size: clamp(1.7rem, 3.2vw, 2.6rem);
  max-width: 16ch;
  text-wrap: balance;
  font-weight: 700;
  letter-spacing: -0.04em;
  background: var(--gv-grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.footer__tagline {
  max-width: 34ch;
  margin-top: 0.75rem;
  font-size: var(--gv-size-small);
  color: var(--gv-text-mute);
}

.footer__contact {
  display: grid;
  gap: 0.4rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
}

.footer__contact a:hover {
  color: var(--gv-volt);
}

.footer__nav {
  display: grid;
  align-content: start;
  gap: 0.7rem;
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
}

.footer__nav a:hover {
  color: var(--gv-volt);
}

.footer__cta {
  align-self: start;
  padding: 1.5rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-lg);
  background: var(--gv-glass);
}

.footer__cta p {
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
}

.footer__cta a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  font-size: var(--gv-size-small);
  font-weight: 600;
  color: var(--gv-volt);
}

.footer__cta a span {
  transition: transform var(--gv-dur-fast) var(--gv-ease);
}

.footer__cta a:hover span {
  transform: translateX(4px);
}

/* —— 底栏 —— */

.footer__base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: clamp(2.5rem, 6vh, 4rem);
  padding-top: 1.5rem;
  border-top: 1px solid var(--gv-border);
  font-size: var(--gv-size-micro);
  color: var(--gv-text-faint);
}

.footer__legal {
  display: flex;
  gap: 1.25rem;
}

.footer__legal a:hover {
  color: var(--gv-text-soft);
}

.footer__top {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--gv-border);
  border-radius: 50%;
  color: var(--gv-text-soft);
  transition: border-color var(--gv-dur-fast) var(--gv-ease);
}

.footer__top:hover {
  border-color: var(--gv-border-lit);
}

@media (max-width: 899.98px) {
  .footer__inner {
    grid-template-columns: 1fr;
  }
}
</style>
