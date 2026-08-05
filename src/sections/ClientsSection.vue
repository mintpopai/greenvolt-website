<script setup lang="ts">
import { ref } from 'vue'

import MarqueeRow from '@/components/MarqueeRow.vue'
import { useReveal } from '@/composables/useReveal'
import { CLIENT_MARQUEE } from '@/data/network'

/** 客户名跑马灯（两行反向滚动）。 */

const root = ref<HTMLElement | null>(null)
useReveal(() => root.value)
</script>

<template>
  <section ref="root" class="clients gv-section">
    <div class="clients__marquees gv-reveal">
      <MarqueeRow :items="CLIENT_MARQUEE[0]" :duration="52" />
      <MarqueeRow :items="CLIENT_MARQUEE[1]" :duration="64" reverse />
    </div>

    <p class="gv-shell clients__note">Client names shown are illustrative placeholders.</p>
  </section>
</template>

<style scoped>
.clients__marquees {
  display: grid;
  gap: 1.25rem;
}

.clients__note {
  margin-top: 2rem;
  font-size: var(--gv-size-micro);
  color: var(--gv-text-faint);
}
</style>
