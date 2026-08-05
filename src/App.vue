<script setup lang="ts">
import { ref } from 'vue'

import AuroraBackdrop from '@/components/AuroraBackdrop.vue'
import AgentsSection from '@/sections/AgentsSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
import HeroSection from '@/sections/HeroSection.vue'
import NetworkSection from '@/sections/NetworkSection.vue'
import PlatformSection from '@/sections/PlatformSection.vue'
import SiteFooter from '@/sections/SiteFooter.vue'
import SiteHeader from '@/sections/SiteHeader.vue'
import TestimonialsSection from '@/sections/TestimonialsSection.vue'
import ThePreloader from '@/sections/ThePreloader.vue'

/** 预加载结束后再放行首屏动画，避免遮罩还在时动画已经播完 */
const entered = ref(false)
</script>

<template>
  <ThePreloader @ready="entered = true" />
  <AuroraBackdrop />

  <SiteHeader />

  <main class="page">
    <HeroSection :active="entered" />
    <AgentsSection />
    <PlatformSection />
    <NetworkSection />
    <TestimonialsSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>

<style scoped>
.page {
  position: relative;
  z-index: var(--gv-z-content);
}
</style>
