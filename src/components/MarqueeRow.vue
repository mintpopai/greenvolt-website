<script setup lang="ts">
/**
 * 无限横向跑马灯：把同一组内容渲染两遍，位移一半宽度后无缝衔接。
 * reverse 控制方向，两行反向滚动时观感更有层次。
 */
defineProps<{
  items: string[]
  reverse?: boolean
  /** 走完一圈的秒数，越大越慢 */
  duration?: number
}>()
</script>

<template>
  <div class="marquee" :style="{ '--marquee-dur': `${duration ?? 42}s` }">
    <div class="marquee__track" :class="{ 'is-reverse': reverse }">
      <!-- 两份副本首尾相接，第二份对读屏隐藏避免重复朗读 -->
      <ul class="marquee__group">
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ul>
      <ul class="marquee__group" aria-hidden="true">
        <li v-for="item in items" :key="`dup-${item}`">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: slide var(--marquee-dur) linear infinite;
}

.marquee__track.is-reverse {
  animation-direction: reverse;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__group {
  display: flex;
  align-items: center;
  gap: clamp(2rem, 5vw, 4.5rem);
  margin: 0;
  padding-inline: clamp(1rem, 2.5vw, 2.25rem);
  list-style: none;
}

.marquee__group li {
  font-family: var(--gv-font-display);
  font-size: clamp(0.95rem, 1.4vw, 1.3rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  white-space: nowrap;
  color: rgb(232 255 246 / 34%);
  transition: color var(--gv-dur-fast) var(--gv-ease);
}

.marquee__group li:hover {
  color: var(--gv-text-soft);
}

@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
