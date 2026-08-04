<script setup lang="ts">
import type { AgentCard } from '@/data/agents'

/** 三个智能体卡片顶部的装饰图形，纯 SVG 自绘，不依赖任何图片素材。 */
defineProps<{ kind: AgentCard['glyph'] }>()
</script>

<template>
  <svg class="glyph" viewBox="0 0 200 160" role="presentation" aria-hidden="true">
    <defs>
      <linearGradient :id="`glyph-${kind}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#00E08A" />
        <stop offset="1" stop-color="#2DD4BF" />
      </linearGradient>
    </defs>

    <!-- 雷达：同心弧 + 扫描线，对应「读市场」 -->
    <g v-if="kind === 'RADAR'" :stroke="`url(#glyph-${kind})`" fill="none" stroke-linecap="round">
      <circle cx="100" cy="92" r="18" stroke-opacity="0.9" stroke-width="1.4" />
      <circle cx="100" cy="92" r="38" stroke-opacity="0.55" stroke-width="1.2" />
      <circle cx="100" cy="92" r="58" stroke-opacity="0.28" stroke-width="1.1" />
      <circle cx="100" cy="92" r="78" stroke-opacity="0.14" stroke-width="1" />
      <path class="sweep" d="M100 92 L100 14 A78 78 0 0 1 168 54 Z" fill="url(#glyph-RADAR)" fill-opacity="0.14" stroke="none" />
      <circle cx="138" cy="58" r="3.5" fill="#A8FF60" stroke="none" />
      <circle cx="64" cy="118" r="2.5" fill="#00E08A" stroke="none" />
      <circle cx="126" cy="126" r="2" fill="#2DD4BF" stroke="none" />
    </g>

    <!-- 棱镜：一束入、多束出，对应「一个创意裂变成一百个」 -->
    <g v-else-if="kind === 'PRISM'" fill="none" stroke-linecap="round">
      <path d="M10 80 H74" :stroke="`url(#glyph-${kind})`" stroke-width="1.6" />
      <path d="M74 34 L118 80 L74 126 Z" :stroke="`url(#glyph-${kind})`" stroke-width="1.4" fill="url(#glyph-PRISM)" fill-opacity="0.1" />
      <g stroke-width="1.2">
        <path d="M118 80 L192 36" stroke="#A8FF60" stroke-opacity="0.85" />
        <path d="M118 80 L192 58" stroke="#00E08A" stroke-opacity="0.7" />
        <path d="M118 80 L192 80" stroke="#2DD4BF" stroke-opacity="0.55" />
        <path d="M118 80 L192 102" stroke="#00E08A" stroke-opacity="0.4" />
        <path d="M118 80 L192 124" stroke="#2DD4BF" stroke-opacity="0.25" />
      </g>
      <circle cx="74" cy="80" r="3" fill="#00E08A" stroke="none" />
    </g>

    <!-- 脉冲：心电图式折线 + 网格，对应「持续买量与纠偏」 -->
    <g v-else fill="none" stroke-linecap="round">
      <g stroke="#E8FFF6" stroke-opacity="0.08" stroke-width="1">
        <path d="M12 44 H188" />
        <path d="M12 80 H188" />
        <path d="M12 116 H188" />
      </g>
      <path
        class="pulse"
        d="M12 96 H48 L60 96 L70 52 L82 122 L94 74 L104 96 H132 L142 68 L152 96 H188"
        :stroke="`url(#glyph-${kind})`"
        stroke-width="1.8"
      />
      <circle cx="82" cy="122" r="3.5" fill="#A8FF60" stroke="none" />
      <circle cx="142" cy="68" r="3" fill="#00E08A" stroke="none" />
    </g>
  </svg>
</template>

<style scoped>
.glyph {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 14px rgb(0 224 138 / 22%));
}

.sweep {
  transform-origin: 100px 92px;
  animation: sweep 6s linear infinite;
}

.pulse {
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
  animation: trace 4.5s var(--gv-ease) infinite;
}

@keyframes sweep {
  to {
    transform: rotate(360deg);
  }
}

@keyframes trace {
  0% {
    stroke-dashoffset: 420;
  }
  55%,
  100% {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sweep,
  .pulse {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
