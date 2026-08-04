<script setup lang="ts">
import { ref } from 'vue'

import { useReveal } from '@/composables/useReveal'
import { MEDIA_TIERS, NETWORK_STATS } from '@/data/network'

/** 全球媒体网络：按核心 / 规模 / 区域三层陈列渠道，配三个规模数字。 */

const root = ref<HTMLElement | null>(null)
useReveal(() => root.value)
</script>

<template>
  <section id="network" ref="root" class="network">
    <div class="gv-shell network__inner">
      <header class="network__head">
        <p class="gv-eyebrow gv-reveal">Global media network</p>
        <h2 class="network__title gv-reveal" style="--reveal-delay: 80ms">
          Every channel that matters,<br />
          <span class="gv-dim">under one console.</span>
        </h2>
        <p class="network__lead gv-reveal" style="--reveal-delay: 160ms">
          Budgets move between platforms the way they should — by what is working this hour, not by
          which team owns which login.
        </p>
      </header>

      <div class="network__stats">
        <div
          v-for="(stat, index) in NETWORK_STATS"
          :key="stat.label"
          class="stat gv-reveal"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <strong class="stat__value">{{ stat.value }}</strong>
          <span class="stat__label">{{ stat.label }}</span>
        </div>
      </div>

      <div class="network__tiers">
        <section
          v-for="(tier, index) in MEDIA_TIERS"
          :key="tier.label"
          class="tier gv-reveal"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <h3 class="tier__label">{{ tier.label }}</h3>
          <ul class="tier__list">
            <li v-for="channel in tier.channels" :key="channel" class="chip">{{ channel }}</li>
          </ul>
        </section>
      </div>

      <p class="network__note gv-reveal">
        Channel list reflects where we buy on clients' behalf. It does not imply any endorsement by,
        or exclusive arrangement with, the platforms named.
      </p>
    </div>
  </section>
</template>

<style scoped>
.network {
  position: relative;
  padding-block: var(--gv-section-y);
  overflow: hidden;
  /* 比页面底色更亮、更偏青，让这一段读起来是独立的一块面板而不是背景的延续 */
  background:
    radial-gradient(90% 70% at 18% 0%, rgb(0 224 138 / 20%), transparent 58%),
    radial-gradient(80% 80% at 92% 100%, rgb(45 212 191 / 22%), transparent 60%),
    linear-gradient(170deg, #0c2a22, #08201d 62%, #0a2420);
  border-block: 1px solid var(--gv-border-lit);
}

.network__inner {
  position: relative;
  z-index: 1;
}

.network__head {
  max-width: 60ch;
}

.network__title {
  margin-top: 1.5rem;
  font-size: var(--gv-size-h2);
}

.network__lead {
  max-width: 52ch;
  margin-top: 1.5rem;
  color: var(--gv-text-soft);
}

/* —— 规模数字 —— */

.network__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 3.5rem;
  padding-block: 2rem;
  border-block: 1px solid var(--gv-border);
}

.stat__value {
  display: block;
  font-family: var(--gv-font-display);
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  background: var(--gv-grad-volt);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat__label {
  display: block;
  margin-top: 0.5rem;
  font-size: var(--gv-size-small);
  color: var(--gv-text-mute);
}

/* —— 渠道分层 —— */

.network__tiers {
  display: grid;
  gap: 2.5rem;
  margin-top: 3.5rem;
}

.tier {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.tier__label {
  font-size: var(--gv-size-micro);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gv-text-mute);
  padding-top: 0.55rem;
}

.tier__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.chip {
  padding: 0.55rem 1.1rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-pill);
  background: var(--gv-glass);
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
  transition:
    border-color var(--gv-dur-fast) var(--gv-ease),
    color var(--gv-dur-fast) var(--gv-ease),
    background var(--gv-dur-fast) var(--gv-ease);
}

.chip:hover {
  border-color: var(--gv-border-lit);
  background: var(--gv-glass-strong);
  color: var(--gv-text);
}

.network__note {
  max-width: 68ch;
  margin-top: 3rem;
  font-size: var(--gv-size-micro);
  color: var(--gv-text-faint);
}

@media (width < 860px) {
  .network__stats {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  .tier {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }

  .tier__label {
    padding-top: 0;
  }
}
</style>
