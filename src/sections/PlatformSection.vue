<script setup lang="ts">
import { ref } from 'vue'

import DotGlobe from '@/components/DotGlobe.vue'
import { useReveal } from '@/composables/useReveal'
import { MODEL_FACETS } from '@/data/agents'
import { BRAND } from '@/data/site'

/** Volta 大模型：左右两栏对称呈现「当下表现」与「长期资产」，中间是点阵地球。 */

const root = ref<HTMLElement | null>(null)
useReveal(() => root.value)
</script>

<template>
  <section id="platform" ref="root" class="platform gv-section">
    <div class="gv-shell">
      <header class="platform__head">
        <p class="gv-eyebrow gv-reveal">{{ BRAND.model }} multimodal models</p>
        <h2 class="platform__title gv-reveal" style="--reveal-delay: 80ms">
          A model built for marketing,<br />
          <span class="gv-dim">not adapted to it.</span>
        </h2>
        <p class="platform__lead gv-reveal" style="--reveal-delay: 160ms">
          {{ BRAND.model }} is trained on the artefacts of the job — briefs, storyboards, ad
          libraries, media plans, post-campaign reads — so it reasons in the same units your team
          does. {{ BRAND.platform }} runs on top of it.
        </p>
      </header>

      <div class="platform__stage">
        <article
          v-for="(facet, index) in MODEL_FACETS"
          :key="facet.badge"
          class="facet gv-reveal"
          :class="index === 0 ? 'facet--start' : 'facet--end'"
          :style="{ '--reveal-delay': `${index * 120}ms` }"
        >
          <p class="facet__badge">
            <span aria-hidden="true">「</span>{{ facet.badge }}<span aria-hidden="true">」</span>
          </p>
          <h3 class="facet__title">{{ facet.title }}</h3>
          <p class="facet__subtitle">{{ facet.subtitle }}</p>
          <ul class="facet__list">
            <li v-for="point in facet.points" :key="point">
              <span class="facet__tick" aria-hidden="true" />
              {{ point }}
            </li>
          </ul>
        </article>

        <div class="platform__globe gv-reveal" style="--reveal-delay: 60ms">
          <DotGlobe />
          <p class="platform__globe-label">{{ BRAND.model }} · live in 190+ markets</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platform__head {
  max-width: 62ch;
}

.platform__title {
  margin-top: 1.5rem;
  font-size: var(--gv-size-h2);
}

.platform__lead {
  max-width: 58ch;
  margin-top: 1.5rem;
  color: var(--gv-text-soft);
}

.platform__stage {
  display: grid;
  grid-template-columns: 1fr minmax(320px, 0.9fr) 1fr;
  align-items: center;
  gap: 2rem;
  margin-top: 4.5rem;
}

.platform__globe {
  order: 2;
  text-align: center;
}

.platform__globe-label {
  margin-top: 1rem;
  font-size: var(--gv-size-micro);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gv-text-mute);
}

.facet {
  padding: 1.9rem 1.75rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-lg);
  background: linear-gradient(165deg, var(--gv-glass-strong), rgb(232 255 246 / 1.5%));
  backdrop-filter: blur(16px);
}

.facet--start {
  order: 1;
}

.facet--end {
  order: 3;
  text-align: right;
}

.facet__badge {
  font-family: var(--gv-font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gv-volt);
}

.facet__badge span {
  color: var(--gv-text-faint);
  font-weight: 400;
}

.facet__title {
  margin-top: 0.6rem;
  font-size: var(--gv-size-h3);
}

.facet__subtitle {
  margin-top: 0.5rem;
  font-size: var(--gv-size-small);
  color: var(--gv-text-mute);
}

.facet__list {
  display: grid;
  gap: 0.9rem;
  margin: 1.75rem 0 0;
  padding: 1.5rem 0 0;
  border-top: 1px solid var(--gv-border);
  list-style: none;
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
}

.facet__list li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.facet--end .facet__list li {
  flex-direction: row-reverse;
}

.facet__tick {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 2px;
  background: var(--gv-grad-volt);
  box-shadow: 0 0 10px rgb(0 224 138 / 60%);
}

@media (max-width: 1079.98px) {
  .platform__stage {
    grid-template-columns: 1fr;
    max-width: 560px;
    margin-inline: auto;
  }

  .platform__globe {
    order: 1;
  }

  .facet--start {
    order: 2;
  }

  .facet--end {
    order: 3;
    text-align: left;
  }

  .facet--end .facet__list li {
    flex-direction: row;
  }
}
</style>
