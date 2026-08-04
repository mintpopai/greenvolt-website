<script setup lang="ts">
import { computed } from 'vue'

import type { CaseStudy } from '@/data/cases'

/**
 * 案例配图：按 pattern 自绘三种抽象图形，不使用任何第三方图片素材。
 * uid 用于隔离同页多个实例的 SVG 渐变 id，避免 defs 互相覆盖。
 */
const props = defineProps<{ study: CaseStudy; uid: string }>()

const gridCells = computed(() =>
  Array.from({ length: 48 }, (_, i) => ({
    x: (i % 8) * 44 + 12,
    y: Math.floor(i / 8) * 44 + 12,
    // 用下标做确定性的强弱变化，刷新页面不会跳变
    strength: ((i * 37) % 11) / 10,
  })),
)

const orbits = computed(() =>
  [0, 1, 2, 3].map((i) => ({
    rx: 60 + i * 42,
    ry: 24 + i * 17,
    rotate: i * 34,
    opacity: 0.42 - i * 0.08,
    duration: 14 + i * 6,
  })),
)
</script>

<template>
  <div class="visual" :style="{ '--case-hue': study.hue }">
    <svg viewBox="0 0 380 300" class="visual__svg" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient :id="`case-${uid}`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" :stop-color="`hsl(${study.hue} 90% 62%)`" />
          <stop offset="1" :stop-color="`hsl(${study.hue + 26} 80% 52%)`" />
        </linearGradient>
      </defs>

      <!-- GRID：方格阵列，暗示大规模素材与铺量 -->
      <g v-if="study.pattern === 'GRID'">
        <rect
          v-for="(cell, index) in gridCells"
          :key="index"
          :x="cell.x"
          :y="cell.y"
          width="30"
          height="30"
          rx="7"
          :fill="`url(#case-${uid})`"
          :fill-opacity="0.08 + cell.strength * 0.5"
        />
      </g>

      <!-- WAVE：层叠波形，暗示增长曲线 -->
      <g v-else-if="study.pattern === 'WAVE'" fill="none" stroke-linecap="round">
        <path
          v-for="i in 7"
          :key="i"
          :d="`M0 ${268 - i * 26} C 80 ${248 - i * 30}, 150 ${212 - i * 18}, 220 ${196 - i * 24} S 330 ${132 - i * 14}, 380 ${104 - i * 12}`"
          :stroke="`url(#case-${uid})`"
          :stroke-opacity="0.16 + i * 0.09"
          :stroke-width="1 + i * 0.28"
        />
      </g>

      <!-- ORBIT：环绕轨道，暗示多市场同步铺开 -->
      <g v-else>
        <circle cx="190" cy="150" r="26" :fill="`url(#case-${uid})`" fill-opacity="0.85" />
        <g
          v-for="(orbit, index) in orbits"
          :key="index"
          class="visual__orbit"
          :style="{ '--orbit-dur': `${orbit.duration}s`, '--orbit-rotate': `${orbit.rotate}deg` }"
        >
          <ellipse
            cx="190"
            cy="150"
            :rx="orbit.rx"
            :ry="orbit.ry"
            fill="none"
            :stroke="`url(#case-${uid})`"
            :stroke-opacity="orbit.opacity"
          />
          <circle :cx="190 + orbit.rx" cy="150" r="4" :fill="`url(#case-${uid})`" />
        </g>
      </g>
    </svg>

    <span class="visual__watermark" aria-hidden="true">{{ study.brand }}</span>
    <span class="visual__market">{{ study.market }}</span>
  </div>
</template>

<style scoped>
.visual {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-lg);
  background:
    radial-gradient(120% 100% at 15% 0%, hsl(var(--case-hue) 70% 45% / 22%), transparent 62%),
    rgb(232 255 246 / 3%);
  aspect-ratio: 19 / 15;
}

.visual__svg {
  width: 100%;
  height: 100%;
}

/* 底部压一层暗色渐变，让品牌名压在图形上仍然读得清 */
.visual::after {
  content: '';
  position: absolute;
  inset-block-end: 0;
  inset-inline: 0;
  height: 42%;
  background: linear-gradient(to top, rgb(5 13 11 / 88%), transparent);
  pointer-events: none;
}

.visual__watermark {
  position: absolute;
  /* ::after 的暗色渐变是元素的最后一个子节点，会盖住同层的文字，必须抬一层 */
  z-index: 1;
  inset-block-end: 1.1rem;
  inset-inline-start: 1.3rem;
  max-width: calc(100% - 2.6rem);
  font-family: var(--gv-font-display);
  font-size: clamp(1.1rem, 2.4vw, 1.7rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--gv-text);
  text-shadow: 0 2px 24px rgb(5 13 11 / 70%);
}

.visual__market {
  position: absolute;
  z-index: 1;
  inset-block-start: 1.1rem;
  inset-inline-start: 1.3rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-pill);
  background: rgb(5 13 11 / 55%);
  backdrop-filter: blur(8px);
  font-size: var(--gv-size-micro);
  letter-spacing: 0.08em;
  color: var(--gv-text-soft);
}

.visual__orbit {
  transform-origin: 190px 150px;
  transform: rotate(var(--orbit-rotate));
  animation: orbit var(--orbit-dur) linear infinite;
}

@keyframes orbit {
  from {
    transform: rotate(var(--orbit-rotate));
  }
  to {
    transform: rotate(calc(var(--orbit-rotate) + 360deg));
  }
}

@media (prefers-reduced-motion: reduce) {
  .visual__orbit {
    animation: none;
  }
}
</style>
