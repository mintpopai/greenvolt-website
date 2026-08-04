<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { BRAND, NAV_LINKS, PRODUCT_PILLS } from '@/data/site'

/** 固定顶栏：滚动超过一屏高度的 1/6 后收缩为胶囊条；窄屏折叠为抽屉菜单。 */

const condensed = ref(false)
const menuOpen = ref(false)

function onScroll() {
  condensed.value = window.scrollY > 80
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="header" :class="{ 'is-condensed': condensed, 'is-open': menuOpen }">
    <div class="header__bar">
      <a class="brand" href="#top" @click="closeMenu">
        <span class="brand__mark" aria-hidden="true" />
        <span class="brand__text">
          <strong>{{ BRAND.name }}</strong>
          <small>{{ BRAND.headerNote }}</small>
        </span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a v-for="link in NAV_LINKS" :key="link.href" class="nav__link" :href="link.href">
          {{ link.label }}
        </a>
      </nav>

      <div class="actions">
        <a v-for="pill in PRODUCT_PILLS" :key="pill.label" class="pill" :href="pill.href">
          <span class="pill__dot" aria-hidden="true" />
          {{ pill.label }}
        </a>
        <a class="cta" href="#contact">Talk to us</a>
        <button
          class="burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-label="Toggle navigation"
          @click="menuOpen = !menuOpen"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-show="menuOpen" class="drawer">
      <a
        v-for="link in NAV_LINKS"
        :key="link.href"
        class="drawer__link"
        :href="link.href"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
      <a class="drawer__cta" href="#contact" @click="closeMenu">Talk to us</a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: var(--gv-z-header);
  padding: 1rem var(--gv-gutter);
  transition: padding var(--gv-dur) var(--gv-ease);
}

.header.is-condensed {
  padding-block: 0.6rem;
}

.header__bar {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: var(--gv-max);
  margin-inline: auto;
  padding: 0.6rem 0.7rem 0.6rem 1.1rem;
  border: 1px solid transparent;
  border-radius: var(--gv-radius-pill);
  transition:
    background var(--gv-dur) var(--gv-ease),
    border-color var(--gv-dur) var(--gv-ease),
    backdrop-filter var(--gv-dur) var(--gv-ease);
}

.is-condensed .header__bar {
  background: rgb(5 13 11 / 62%);
  border-color: var(--gv-border);
  backdrop-filter: blur(18px) saturate(140%);
}

/* —— 品牌 —— */

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-inline-end: auto;
}

.brand__mark {
  width: 26px;
  height: 26px;
  flex: none;
  border-radius: 8px;
  background: var(--gv-grad-volt);
  box-shadow: 0 0 18px rgb(0 224 138 / 45%);
  clip-path: polygon(56% 0, 22% 54%, 46% 54%, 38% 100%, 78% 42%, 52% 42%);
}

.brand__text {
  display: grid;
  line-height: 1.2;
}

.brand__text strong {
  font-family: var(--gv-font-display);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand__text small {
  font-size: 0.68rem;
  white-space: nowrap;
  color: var(--gv-text-mute);
  transition: opacity var(--gv-dur) var(--gv-ease);
}

.is-condensed .brand__text small {
  opacity: 0;
}

/* —— 导航 —— */

.nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav__link {
  position: relative;
  padding: 0.45rem 0.9rem;
  border-radius: var(--gv-radius-pill);
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
  transition:
    color var(--gv-dur-fast) var(--gv-ease),
    background var(--gv-dur-fast) var(--gv-ease);
}

.nav__link:hover {
  color: var(--gv-text);
  background: var(--gv-glass);
}

/* —— 右侧动作区 —— */

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.9rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-pill);
  background: var(--gv-glass);
  font-size: var(--gv-size-micro);
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--gv-text-soft);
  transition:
    border-color var(--gv-dur-fast) var(--gv-ease),
    color var(--gv-dur-fast) var(--gv-ease);
}

.pill:hover {
  border-color: var(--gv-border-lit);
  color: var(--gv-text);
}

.pill__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gv-volt);
  box-shadow: 0 0 8px var(--gv-volt);
}

.cta {
  padding: 0.5rem 1.15rem;
  border-radius: var(--gv-radius-pill);
  background: var(--gv-grad-volt);
  color: var(--gv-ink-deep);
  font-size: var(--gv-size-small);
  font-weight: 600;
  transition:
    transform var(--gv-dur-fast) var(--gv-ease),
    box-shadow var(--gv-dur-fast) var(--gv-ease);
}

.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 26px rgb(0 224 138 / 30%);
}

/* —— 窄屏抽屉 —— */

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.6rem;
}

.burger span {
  display: block;
  width: 20px;
  height: 1.5px;
  background: var(--gv-text);
  transition: transform var(--gv-dur-fast) var(--gv-ease);
}

.is-open .burger span:first-child {
  transform: translateY(3.25px) rotate(45deg);
}

.is-open .burger span:last-child {
  transform: translateY(-3.25px) rotate(-45deg);
}

.drawer {
  display: grid;
  gap: 0.25rem;
  max-width: var(--gv-max);
  margin: 0.5rem auto 0;
  padding: 0.75rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-lg);
  background: rgb(5 13 11 / 92%);
  backdrop-filter: blur(18px);
}

.drawer__link {
  padding: 0.7rem 0.9rem;
  border-radius: var(--gv-radius-sm);
  color: var(--gv-text-soft);
}

.drawer__link:hover {
  background: var(--gv-glass);
  color: var(--gv-text);
}

.drawer__cta {
  margin-top: 0.35rem;
  padding: 0.75rem;
  border-radius: var(--gv-radius-sm);
  background: var(--gv-grad-volt);
  color: var(--gv-ink-deep);
  font-weight: 600;
  text-align: center;
}

@media (width < 1180px) {
  .brand__text small {
    display: none;
  }

  .pill {
    display: none;
  }
}

@media (width < 900px) {
  .nav {
    display: none;
  }

  .burger {
    display: flex;
  }
}

@media (width < 560px) {
  .cta {
    display: none;
  }
}

@media (width >= 900px) {
  .drawer {
    display: none !important;
  }
}
</style>
