<script setup lang="ts">
import { ref } from 'vue'

import { useReveal } from '@/composables/useReveal'
import { TESTIMONIALS } from '@/data/testimonials'

/** 客户证言：横向 scroll-snap 轨道，左右按钮按「一张卡宽」步进。 */

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
useReveal(() => root.value)

function step(direction: 1 | -1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.quote')
  // 没有卡片时退化为按视口宽度滚动，避免 step 变成 0 卡住
  const distance = card ? card.offsetWidth + 20 : el.clientWidth
  el.scrollBy({ left: distance * direction, behavior: 'smooth' })
}
</script>

<template>
  <section ref="root" class="voices gv-section">
    <div class="gv-shell">
      <header class="voices__head">
        <div>
          <p class="gv-eyebrow gv-reveal">Why teams choose us</p>
          <h2 class="voices__title gv-reveal" style="--reveal-delay: 80ms">
            The part clients<br /><span class="gv-dim">actually repeat back to us.</span>
          </h2>
        </div>
        <div class="voices__nav gv-reveal" style="--reveal-delay: 160ms">
          <button type="button" aria-label="Previous testimonial" @click="step(-1)">←</button>
          <button type="button" aria-label="Next testimonial" @click="step(1)">→</button>
        </div>
      </header>
    </div>

    <div ref="track" class="voices__track">
      <article
        v-for="voice in TESTIMONIALS"
        :key="voice.role"
        class="quote"
        :style="{ '--voice-hue': voice.hue }"
      >
        <span class="quote__mark" aria-hidden="true">“</span>
        <p class="quote__text">{{ voice.quote }}</p>
        <footer class="quote__foot">
          <span class="quote__avatar" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" stroke-opacity="0.45" />
              <path d="M24 8 L38 24 L24 40 L10 24 Z" fill="currentColor" fill-opacity="0.28" />
              <circle cx="24" cy="24" r="6" fill="currentColor" fill-opacity="0.85" />
            </svg>
          </span>
          <span>
            <strong>{{ voice.role }}</strong>
            <small>{{ voice.context }}</small>
          </span>
        </footer>
      </article>
    </div>

    <p class="gv-shell voices__note">
      Client quotes are representative and anonymised at client request.
    </p>
  </section>
</template>

<style scoped>
.voices__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.voices__title {
  margin-top: 1.5rem;
  font-size: var(--gv-size-h2);
}

.voices__nav {
  display: flex;
  gap: 0.5rem;
  flex: none;
}

.voices__nav button {
  width: 46px;
  height: 46px;
  border: 1px solid var(--gv-border);
  border-radius: 50%;
  background: var(--gv-glass);
  color: var(--gv-text-soft);
  font-size: 1.05rem;
  transition:
    border-color var(--gv-dur-fast) var(--gv-ease),
    color var(--gv-dur-fast) var(--gv-ease),
    background var(--gv-dur-fast) var(--gv-ease);
}

.voices__nav button:hover {
  border-color: var(--gv-border-lit);
  background: var(--gv-glass-strong);
  color: var(--gv-text);
}

/* —— 轨道 —— */

.voices__track {
  display: flex;
  gap: 1.25rem;
  margin-top: 3rem;
  padding-inline: var(--gv-gutter);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.voices__track::-webkit-scrollbar {
  display: none;
}

.quote {
  flex: 0 0 min(440px, 82vw);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.9rem 1.75rem;
  scroll-snap-align: center;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-lg);
  background: linear-gradient(
    165deg,
    hsl(var(--voice-hue) 70% 60% / 8%),
    rgb(232 255 246 / 2%)
  );
  backdrop-filter: blur(16px);
  color: hsl(var(--voice-hue) 80% 70%);
  transition: border-color var(--gv-dur) var(--gv-ease);
}

.quote:hover {
  border-color: var(--gv-border-lit);
}

.quote__mark {
  font-family: var(--gv-font-display);
  font-size: 3rem;
  line-height: 0.6;
  color: currentcolor;
  opacity: 0.5;
}

.quote__text {
  flex: 1;
  margin-top: 1.25rem;
  font-size: var(--gv-size-small);
  line-height: 1.75;
  color: var(--gv-text-soft);
}

.quote__foot {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--gv-border);
}

.quote__avatar {
  width: 42px;
  height: 42px;
  flex: none;
}

.quote__avatar svg {
  width: 100%;
  height: 100%;
}

.quote__foot strong {
  display: block;
  font-family: var(--gv-font-display);
  font-size: 0.95rem;
  color: var(--gv-text);
}

.quote__foot small {
  display: block;
  font-size: var(--gv-size-micro);
  color: var(--gv-text-mute);
}

.voices__note {
  margin-top: 1.75rem;
  font-size: var(--gv-size-micro);
  color: var(--gv-text-faint);
}

@media (max-width: 719.98px) {
  .voices__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
