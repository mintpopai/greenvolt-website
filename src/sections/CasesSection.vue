<script setup lang="ts">
import { computed, ref } from 'vue'

import CaseVisual from '@/components/CaseVisual.vue'
import { useReveal } from '@/composables/useReveal'
import { CASE_STUDIES } from '@/data/cases'

/** 案例轮播：左侧自绘配图，右侧 KPI 与说明，底部计数与左右箭头。 */

const root = ref<HTMLElement | null>(null)
useReveal(() => root.value)

const index = ref(0)
const study = computed(() => CASE_STUDIES[index.value]!)
const counter = computed(() => `${index.value + 1} / ${CASE_STUDIES.length}`)

function move(direction: 1 | -1) {
  const total = CASE_STUDIES.length
  index.value = (index.value + direction + total) % total
}
</script>

<template>
  <section id="cases" ref="root" class="cases gv-section">
    <div class="gv-shell">
      <header class="cases__head">
        <div>
          <p class="gv-eyebrow gv-reveal">Selected work</p>
          <h2 class="cases__title gv-reveal" style="--reveal-delay: 80ms">
            Results we can<br /><span class="gv-dim">walk you through line by line.</span>
          </h2>
        </div>
        <div class="cases__nav gv-reveal" style="--reveal-delay: 160ms">
          <span class="cases__counter">{{ counter }}</span>
          <button type="button" aria-label="Previous case study" @click="move(-1)">←</button>
          <button type="button" aria-label="Next case study" @click="move(1)">→</button>
        </div>
      </header>

      <!--
        key 绑到品牌名，切换时整块重挂载以触发淡入。
        这里刻意不用 .gv-reveal：重挂载会丢掉 is-revealed，且观察器只在初次挂载时收集元素，
        用了反而会让切换后的案例永远停在透明状态。淡入交给下面的 case-in 动画。
      -->
      <div :key="study.brand" class="cases__stage">
        <CaseVisual :study="study" :uid="`case-${index}`" class="cases__visual" />

        <div class="cases__detail">
          <p class="cases__sector">{{ study.sector }}</p>
          <h3 class="cases__brand">{{ study.brand }}</h3>

          <dl class="cases__metrics">
            <div v-for="metric in study.metrics" :key="metric.label">
              <dt>{{ metric.label }}</dt>
              <dd>{{ metric.value }}</dd>
            </div>
          </dl>

          <p class="cases__summary">{{ study.summary }}</p>

          <a class="cases__link" href="#contact">
            Ask how we would approach yours
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <p class="cases__note">
        Case details are illustrative placeholders pending client approval.
      </p>
    </div>
  </section>
</template>

<style scoped>
.cases__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.cases__title {
  margin-top: 1.5rem;
  font-size: var(--gv-size-h2);
}

.cases__nav {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: none;
}

.cases__counter {
  margin-inline-end: 0.4rem;
  font-family: var(--gv-font-display);
  font-size: var(--gv-size-small);
  font-variant-numeric: tabular-nums;
  color: var(--gv-text-mute);
}

.cases__nav button {
  width: 46px;
  height: 46px;
  border: 1px solid var(--gv-border);
  border-radius: 50%;
  background: var(--gv-glass);
  color: var(--gv-text-soft);
  transition:
    border-color var(--gv-dur-fast) var(--gv-ease),
    color var(--gv-dur-fast) var(--gv-ease),
    background var(--gv-dur-fast) var(--gv-ease);
}

.cases__nav button:hover {
  border-color: var(--gv-border-lit);
  background: var(--gv-glass-strong);
  color: var(--gv-text);
}

/* —— 主体 —— */

.cases__stage {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  margin-top: 3.5rem;
  animation: case-in var(--gv-dur) var(--gv-ease);
}

.cases__sector {
  font-size: var(--gv-size-micro);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gv-text-mute);
}

.cases__brand {
  margin-top: 0.6rem;
  font-size: clamp(1.75rem, 3.4vw, 2.75rem);
}

.cases__metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem 1.25rem;
  margin: 2.25rem 0 0;
  padding-block: 1.75rem;
  border-block: 1px solid var(--gv-border);
}

/* 标签行数不一（有的折两行）时，让数值统一贴底，横向读过去底线才齐 */
.cases__metrics > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cases__metrics dt {
  font-size: var(--gv-size-micro);
  line-height: 1.45;
  color: var(--gv-text-mute);
}

.cases__metrics dd {
  margin: 0.5rem 0 0;
  font-family: var(--gv-font-display);
  font-size: clamp(1.6rem, 2.6vw, 2.15rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  background: var(--gv-grad-volt);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cases__summary {
  margin-top: 1.75rem;
  max-width: 56ch;
  font-size: var(--gv-size-small);
  line-height: 1.75;
  color: var(--gv-text-soft);
}

.cases__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--gv-border-lit);
  font-size: var(--gv-size-small);
  font-weight: 600;
  color: var(--gv-volt);
}

.cases__link span {
  transition: transform var(--gv-dur-fast) var(--gv-ease);
}

.cases__link:hover span {
  transform: translateX(4px);
}

.cases__note {
  margin-top: 2.5rem;
  font-size: var(--gv-size-micro);
  color: var(--gv-text-faint);
}

@keyframes case-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

@media (width < 900px) {
  .cases__head {
    flex-direction: column;
    align-items: flex-start;
  }

  .cases__stage {
    grid-template-columns: 1fr;
  }
}
</style>
