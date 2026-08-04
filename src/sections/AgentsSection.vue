<script setup lang="ts">
import { ref } from 'vue'

import AgentGlyph from '@/components/AgentGlyph.vue'
import { useReveal } from '@/composables/useReveal'
import { AGENTS } from '@/data/agents'
import { BRAND } from '@/data/site'

/** Built for global expansion：三个智能体串成一条从洞察到投放的闭环。 */

const root = ref<HTMLElement | null>(null)
useReveal(() => root.value)
</script>

<template>
  <section id="agents" ref="root" class="agents gv-section">
    <div class="gv-shell">
      <header class="agents__head">
        <p class="gv-eyebrow gv-reveal">Built for global business expansion</p>
        <h2 class="agents__title gv-reveal" style="--reveal-delay: 80ms">
          One marketing <span class="gv-grad-text">multi-agent</span> system,<br />
          <span class="gv-dim">from first insight to last impression.</span>
        </h2>
        <p class="agents__lead gv-reveal" style="--reveal-delay: 160ms">
          {{ BRAND.platform }} runs three specialist agents on a shared memory. What the first one
          learns about a market, the other two act on the same day — no handover, no lost context.
        </p>
      </header>

      <ol class="agents__grid">
        <li
          v-for="(agent, index) in AGENTS"
          :key="agent.name"
          class="card gv-reveal"
          :style="{ '--reveal-delay': `${index * 110}ms` }"
        >
          <span class="card__index">{{ agent.index }}</span>
          <div class="card__glyph"><AgentGlyph :kind="agent.glyph" /></div>
          <h3 class="card__name">{{ agent.name }}</h3>
          <p class="card__role">{{ agent.role }}</p>
          <ul class="card__list">
            <li v-for="item in agent.capabilities" :key="item">{{ item }}</li>
          </ul>
        </li>
      </ol>

      <!-- 三个 agent 之间的连线，说明是闭环而非并列 -->
      <p class="agents__loop gv-reveal">
        <span>Insight</span>
        <em aria-hidden="true" />
        <span>Creative</span>
        <em aria-hidden="true" />
        <span>Performance</span>
        <em aria-hidden="true" />
        <span class="agents__loop-back">back to Insight</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.agents__head {
  max-width: 62ch;
}

.agents__title {
  margin-top: 1.5rem;
  font-size: var(--gv-size-h2);
}

.agents__lead {
  max-width: 56ch;
  margin-top: 1.5rem;
  color: var(--gv-text-soft);
}

.agents__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 4rem;
  padding: 0;
  list-style: none;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.6rem 1.6rem;
  overflow: hidden;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-lg);
  background: linear-gradient(165deg, var(--gv-glass-strong), rgb(232 255 246 / 1.5%));
  backdrop-filter: blur(16px);
  transition:
    border-color var(--gv-dur) var(--gv-ease),
    transform var(--gv-dur) var(--gv-ease);
}

/* 顶部一道发光描边，鼠标悬停时点亮 */
.card::before {
  content: '';
  position: absolute;
  inset-block-start: 0;
  inset-inline: 12%;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gv-volt), transparent);
  opacity: 0.35;
  transition: opacity var(--gv-dur) var(--gv-ease);
}

.card:hover {
  border-color: var(--gv-border-lit);
  transform: translateY(-4px);
}

.card:hover::before {
  opacity: 1;
}

.card__index {
  font-family: var(--gv-font-display);
  font-size: var(--gv-size-micro);
  letter-spacing: 0.2em;
  color: var(--gv-text-faint);
}

.card__glyph {
  margin: 0.5rem 0 1.75rem;
}

.card__name {
  font-size: var(--gv-size-h3);
}

.card__role {
  margin-top: 0.5rem;
  color: var(--gv-text-mute);
  font-size: var(--gv-size-small);
}

.card__list {
  display: grid;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.card__list li {
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-sm);
  background: rgb(232 255 246 / 3%);
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
}

/* —— 闭环说明 —— */

.agents__loop {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  margin-top: 2.5rem;
  font-size: var(--gv-size-micro);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gv-text-mute);
}

.agents__loop em {
  width: 42px;
  height: 1px;
  background: linear-gradient(to right, var(--gv-border), var(--gv-volt), var(--gv-border));
}

.agents__loop-back {
  color: var(--gv-text-faint);
}

@media (width < 1024px) {
  .agents__grid {
    grid-template-columns: 1fr;
    max-width: 560px;
  }
}
</style>
