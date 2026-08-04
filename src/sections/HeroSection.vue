<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import CurrentCanvas from '@/components/CurrentCanvas.vue'
import { HERO_SLIDES } from '@/data/site'

/**
 * 首屏：三条主张自动轮播，底部胶囊可手动切换。
 * 手动切换后重置计时，避免刚点完就被自动播走。
 */

const props = defineProps<{ active: boolean }>()

const ROTATE_MS = 6500
const current = ref(0)
let timer = 0

function schedule() {
  clearTimeout(timer)
  if (!props.active) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setTimeout(() => {
    current.value = (current.value + 1) % HERO_SLIDES.length
    schedule()
  }, ROTATE_MS)
}

function select(index: number) {
  current.value = index
  schedule()
}

watch(() => props.active, schedule)
onMounted(schedule)
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section id="top" class="hero" :class="{ 'is-active': active }">
    <CurrentCanvas class="hero__current" />

    <div class="hero__body gv-shell">
      <p class="gv-eyebrow hero__eyebrow">AI for the global advertising market</p>

      <div class="hero__stage">
        <template v-for="(slide, index) in HERO_SLIDES" :key="slide.pill">
          <div class="hero__slide" :class="{ 'is-current': index === current }" :aria-hidden="index !== current">
            <h1 class="hero__title">
              <span
                v-for="(line, lineIndex) in slide.lines"
                :key="line"
                class="hero__line"
                :style="{ '--line-delay': `${lineIndex * 90}ms` }"
              >
                <span :class="lineIndex === slide.lines.length - 1 ? 'gv-grad-text' : ''">{{ line }}</span>
              </span>
            </h1>
            <p class="hero__lead">{{ slide.lead }}</p>
          </div>
        </template>
      </div>

      <div class="hero__ctas">
        <a class="hero__cta hero__cta--primary" href="#contact">
          Online enquiry
          <span class="hero__cta-arrow" aria-hidden="true">→</span>
        </a>
        <a class="hero__cta hero__cta--ghost" href="#agents">See the agent stack</a>
      </div>
    </div>

    <div class="hero__switch gv-shell">
      <button
        v-for="(slide, index) in HERO_SLIDES"
        :key="slide.pill"
        class="switch"
        :class="{ 'is-current': index === current }"
        type="button"
        :aria-current="index === current"
        @click="select(index)"
      >
        <span class="switch__bar" aria-hidden="true">
          <span class="switch__fill" />
        </span>
        {{ slide.pill }}
      </button>
    </div>

    <a class="hero__scroll" href="#agents" aria-label="Scroll to agents">
      <span aria-hidden="true" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100svh;
  padding-block: 8rem 6rem;
  overflow: hidden;
}

.hero__current {
  z-index: 0;
}

.hero__body {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero__eyebrow {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity var(--gv-dur-slow) var(--gv-ease),
    transform var(--gv-dur-slow) var(--gv-ease);
}

.is-active .hero__eyebrow {
  opacity: 1;
  transform: none;
}

/* 三张 slide 叠放同一网格单元，靠透明度切换，避免高度跳动 */
.hero__stage {
  display: grid;
  margin-top: 1.75rem;
}

.hero__slide {
  grid-area: 1 / 1;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--gv-dur) var(--gv-ease),
    visibility var(--gv-dur);
}

.hero__slide.is-current {
  opacity: 1;
  visibility: visible;
}

.hero__title {
  font-size: var(--gv-size-mega);
  font-weight: 700;
  letter-spacing: -0.045em;
}

.hero__line {
  display: block;
  overflow: hidden;
}

.hero__line > span {
  display: block;
  transform: translateY(105%);
  transition: transform 1s var(--gv-ease);
  transition-delay: var(--line-delay);
}

.is-active .is-current .hero__line > span {
  transform: none;
}

.hero__lead {
  max-width: 46ch;
  margin-top: 1.5rem;
  font-size: var(--gv-size-lead);
  color: var(--gv-text-soft);
  opacity: 0;
  transition: opacity var(--gv-dur-slow) var(--gv-ease) 320ms;
}

.is-active .is-current .hero__lead {
  opacity: 1;
}

/* —— 行动按钮 —— */

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity var(--gv-dur-slow) var(--gv-ease) 500ms,
    transform var(--gv-dur-slow) var(--gv-ease) 500ms;
}

.is-active .hero__ctas {
  opacity: 1;
  transform: none;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border-radius: var(--gv-radius-pill);
  font-size: var(--gv-size-small);
  font-weight: 600;
  transition:
    transform var(--gv-dur-fast) var(--gv-ease),
    box-shadow var(--gv-dur-fast) var(--gv-ease),
    border-color var(--gv-dur-fast) var(--gv-ease);
}

.hero__cta--primary {
  background: var(--gv-grad-volt);
  color: var(--gv-ink-deep);
  box-shadow: 0 10px 34px rgb(0 224 138 / 24%);
}

.hero__cta--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 42px rgb(0 224 138 / 38%);
}

.hero__cta-arrow {
  transition: transform var(--gv-dur-fast) var(--gv-ease);
}

.hero__cta--primary:hover .hero__cta-arrow {
  transform: translateX(3px);
}

.hero__cta--ghost {
  border: 1px solid var(--gv-border);
  background: var(--gv-glass);
  color: var(--gv-text-soft);
}

.hero__cta--ghost:hover {
  border-color: var(--gv-border-lit);
  color: var(--gv-text);
}

/* —— 底部三胶囊 —— */

.hero__switch {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 3.5rem;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity var(--gv-dur-slow) var(--gv-ease) 650ms,
    transform var(--gv-dur-slow) var(--gv-ease) 650ms;
}

.is-active .hero__switch {
  opacity: 1;
  transform: none;
}

.switch {
  display: grid;
  gap: 0.7rem;
  flex: 1 1 220px;
  max-width: 320px;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-md);
  background: var(--gv-glass);
  backdrop-filter: blur(12px);
  font-size: var(--gv-size-micro);
  letter-spacing: 0.04em;
  text-align: left;
  color: var(--gv-text-mute);
  transition:
    color var(--gv-dur-fast) var(--gv-ease),
    border-color var(--gv-dur-fast) var(--gv-ease),
    background var(--gv-dur-fast) var(--gv-ease);
}

.switch:hover {
  color: var(--gv-text-soft);
  border-color: var(--gv-border-lit);
}

.switch.is-current {
  color: var(--gv-text);
  background: var(--gv-glass-strong);
  border-color: var(--gv-border-lit);
}

.switch__bar {
  display: block;
  height: 2px;
  overflow: hidden;
  background: var(--gv-border);
  border-radius: var(--gv-radius-pill);
}

.switch__fill {
  display: block;
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background: var(--gv-grad-volt);
  transition: transform var(--gv-dur) var(--gv-ease);
}

.switch.is-current .switch__fill {
  transform: scaleX(1);
  transition-duration: 6500ms;
  transition-timing-function: linear;
}

/* —— 向下滚动提示 —— */

.hero__scroll {
  position: absolute;
  inset-block-end: 1.5rem;
  inset-inline-end: var(--gv-gutter);
  z-index: 1;
  display: grid;
  place-items: center;
  width: 34px;
  height: 52px;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-pill);
}

.hero__scroll span {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--gv-volt);
  box-shadow: 0 0 10px var(--gv-volt);
  animation: scroll-hint 1.9s var(--gv-ease) infinite;
}

@keyframes scroll-hint {
  0% {
    transform: translateY(-9px);
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  100% {
    transform: translateY(9px);
    opacity: 0;
  }
}

@media (max-width: 899.98px) {
  .hero {
    padding-block: 7rem 4rem;
  }

  .hero__switch {
    margin-top: 2.5rem;
  }

  .switch {
    flex-basis: 100%;
    max-width: none;
  }

  .hero__scroll {
    display: none;
  }
}
</style>
