<script setup lang="ts">
import { ref } from 'vue'

import MarqueeRow from '@/components/MarqueeRow.vue'
import { useReveal } from '@/composables/useReveal'
import { CLIENT_MARQUEE, HEADLINE_STAT, SUPPORT_STATS } from '@/data/network'

/** 规模数字条 + 客户名跑马灯（两行反向滚动）。 */

const root = ref<HTMLElement | null>(null)
useReveal(() => root.value)
</script>

<template>
  <section ref="root" class="scale gv-section">
    <div class="gv-shell">
      <div class="scale__headline gv-reveal">
        <strong class="scale__value">{{ HEADLINE_STAT.value }}</strong>
        <p class="scale__lines">
          <span v-for="line in HEADLINE_STAT.lines" :key="line">{{ line }}</span>
          <em>{{ HEADLINE_STAT.year }}</em>
        </p>
      </div>

      <dl class="scale__grid">
        <div
          v-for="(stat, index) in SUPPORT_STATS"
          :key="stat.label"
          class="scale__item gv-reveal"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
    </div>

    <div class="scale__marquees">
      <MarqueeRow :items="CLIENT_MARQUEE[0]" :duration="52" />
      <MarqueeRow :items="CLIENT_MARQUEE[1]" :duration="64" reverse />
    </div>

    <p class="gv-shell scale__note">Client names shown are illustrative placeholders.</p>
  </section>
</template>

<style scoped>
.scale__headline {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: clamp(1rem, 3vw, 2.75rem);
}

.scale__value {
  font-family: var(--gv-font-display);
  font-size: clamp(3.25rem, 10vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.9;
  background: var(--gv-grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.scale__lines {
  display: grid;
  font-family: var(--gv-font-display);
  font-size: clamp(1.15rem, 2.2vw, 1.9rem);
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--gv-text-soft);
}

.scale__lines em {
  margin-top: 0.35rem;
  font-family: var(--gv-font-body);
  font-size: var(--gv-size-micro);
  font-style: normal;
  letter-spacing: 0.2em;
  color: var(--gv-text-faint);
}

.scale__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin: 3.5rem 0 0;
  padding-top: 2.25rem;
  border-top: 1px solid var(--gv-border);
}

.scale__item dt {
  font-size: var(--gv-size-small);
  color: var(--gv-text-mute);
}

.scale__item dd {
  margin: 0.5rem 0 0;
  font-family: var(--gv-font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--gv-text);
}

.scale__marquees {
  display: grid;
  gap: 1.25rem;
  margin-top: 4.5rem;
}

.scale__note {
  margin-top: 2rem;
  font-size: var(--gv-size-micro);
  color: var(--gv-text-faint);
}

@media (width < 860px) {
  .scale__grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}
</style>
