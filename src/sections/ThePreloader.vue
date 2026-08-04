<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { BRAND } from '@/data/site'

/**
 * 首屏预加载遮罩：0→100 计数后淡出，并通过 ready 事件通知父组件开始入场。
 * 计数是观感层面的节奏控制，不代表真实资源加载进度。
 */

const emit = defineEmits<{ ready: [] }>()

const DURATION = 1500
const progress = ref(0)
const leaving = ref(false)
const hidden = ref(false)

let frame = 0
let leaveTimer = 0
let guardTimer = 0

/** 遮罩期间锁住页面滚动，避免用户在看不见内容时把页面滚走 */
function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? 'hidden' : ''
}

/** 收尾：解锁滚动、放行首屏动画、淡出遮罩。可重复调用，只生效一次。 */
function finish() {
  if (leaving.value) return
  progress.value = 100
  leaving.value = true
  lockScroll(false)
  emit('ready')
  leaveTimer = window.setTimeout(() => {
    hidden.value = true
  }, 700)
}

function tick(start: number) {
  const elapsed = performance.now() - start
  const ratio = Math.min(elapsed / DURATION, 1)
  // easeOutCubic：开头快、末尾稳住，避免数字匀速跳动的呆板感
  progress.value = Math.round((1 - Math.pow(1 - ratio, 3)) * 100)

  if (ratio < 1) {
    frame = requestAnimationFrame(() => tick(start))
    return
  }
  finish()
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    progress.value = 100
    leaving.value = true
    hidden.value = true
    emit('ready')
    return
  }
  lockScroll(true)
  frame = requestAnimationFrame(() => tick(performance.now()))
  // 兜底：后台标签页里 rAF 会被浏览器暂停，遮罩将永远停在半路。
  // 定时器不受同样的限制，到点强制收尾。
  guardTimer = window.setTimeout(finish, DURATION + 400)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(leaveTimer)
  clearTimeout(guardTimer)
  // 组件被提前卸载时也要解锁，否则页面永远滚不动
  lockScroll(false)
})
</script>

<template>
  <div v-if="!hidden" class="preloader" :class="{ 'is-leaving': leaving }" role="status">
    <div class="preloader__inner">
      <p class="preloader__brand">{{ BRAND.name }}</p>
      <p class="preloader__tagline">{{ BRAND.tagline }}</p>
      <div class="preloader__meter">
        <span class="preloader__fill" :style="{ transform: `scaleX(${progress / 100})` }" />
      </div>
      <p class="preloader__count">
        <span>{{ progress }}</span
        ><small>%</small>
      </p>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: var(--gv-z-preloader);
  display: grid;
  place-items: center;
  background:
    radial-gradient(80% 60% at 50% 40%, #0d2b22 0%, transparent 70%),
    var(--gv-ink-deep);
  transition:
    opacity 700ms var(--gv-ease),
    visibility 700ms;
}

.preloader.is-leaving {
  opacity: 0;
  visibility: hidden;
}

.preloader__inner {
  width: min(520px, 80vw);
  text-align: center;
}

.preloader__brand {
  font-family: var(--gv-font-display);
  font-size: clamp(2rem, 6vw, 3.75rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  background: var(--gv-grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.preloader__tagline {
  margin-top: 0.75rem;
  font-size: var(--gv-size-small);
  color: var(--gv-text-mute);
}

.preloader__meter {
  position: relative;
  height: 2px;
  margin-top: 2.25rem;
  overflow: hidden;
  background: var(--gv-border);
  border-radius: var(--gv-radius-pill);
}

.preloader__fill {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  background: var(--gv-grad-volt);
  box-shadow: 0 0 16px var(--gv-volt);
}

.preloader__count {
  margin-top: 1rem;
  font-family: var(--gv-font-display);
  font-size: 1.25rem;
  font-variant-numeric: tabular-nums;
  color: var(--gv-text-soft);
}

.preloader__count small {
  margin-left: 0.15em;
  font-size: 0.7em;
  color: var(--gv-text-mute);
}
</style>
