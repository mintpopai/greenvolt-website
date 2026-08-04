<script setup lang="ts">
/**
 * 全站背景：固定在最底层的深墨绿底 + 四团缓慢漂移的光晕。
 * 纯 CSS 渐变实现，不加载任何图片，减少动效偏好下自动静止。
 */
</script>

<template>
  <div class="backdrop" aria-hidden="true">
    <span class="blob blob--volt" />
    <span class="blob blob--aqua" />
    <span class="blob blob--lime" />
    <span class="blob blob--deep" />
    <span class="grid" />
    <span class="vignette" />
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--gv-z-backdrop);
  overflow: hidden;
  background:
    radial-gradient(120% 80% at 50% -10%, #0d2b22 0%, transparent 60%),
    var(--gv-ink-deep);
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.9;
  will-change: transform;
}

.blob--volt {
  width: 46vw;
  height: 46vw;
  top: -12vw;
  left: -6vw;
  background: radial-gradient(circle, rgb(0 224 138 / 45%), transparent 68%);
  animation: drift-a 26s var(--gv-ease) infinite alternate;
}

.blob--aqua {
  width: 52vw;
  height: 52vw;
  top: 18vh;
  right: -14vw;
  background: radial-gradient(circle, rgb(45 212 191 / 34%), transparent 68%);
  animation: drift-b 32s var(--gv-ease) infinite alternate;
}

.blob--lime {
  width: 34vw;
  height: 34vw;
  bottom: 6vh;
  left: 18vw;
  background: radial-gradient(circle, rgb(168 255 96 / 18%), transparent 70%);
  animation: drift-c 38s var(--gv-ease) infinite alternate;
}

.blob--deep {
  width: 60vw;
  height: 60vw;
  bottom: -22vw;
  right: 4vw;
  background: radial-gradient(circle, rgb(6 90 70 / 55%), transparent 70%);
  animation: drift-b 44s var(--gv-ease) infinite alternate-reverse;
}

/* 极淡的网格，给深色底一点工程感的质地 */
.grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgb(232 255 246 / 3.5%) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(232 255 246 / 3.5%) 1px, transparent 1px);
  background-size: 96px 96px;
  mask-image: radial-gradient(90% 70% at 50% 30%, #000 20%, transparent 78%);
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(150% 110% at 50% 38%, transparent 52%, rgb(5 13 11 / 62%) 100%);
}

@keyframes drift-a {
  to {
    transform: translate3d(14vw, 10vh, 0) scale(1.18);
  }
}

@keyframes drift-b {
  to {
    transform: translate3d(-12vw, 8vh, 0) scale(0.86);
  }
}

@keyframes drift-c {
  to {
    transform: translate3d(18vw, -12vh, 0) scale(1.24);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none;
  }
}
</style>
