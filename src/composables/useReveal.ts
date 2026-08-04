import { onBeforeUnmount, onMounted } from 'vue'

/**
 * 滚动进场：给根元素下所有 .gv-reveal 元素在进入视口时加 is-revealed。
 * 用单个 IntersectionObserver 统一托管，避免每个 section 各起一个观察器。
 */
export function useReveal(rootGetter: () => HTMLElement | null | undefined) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const root = rootGetter()
    if (!root) return

    const targets = root.querySelectorAll<HTMLElement>('.gv-reveal')
    if (targets.length === 0) return

    // 不支持 IntersectionObserver 时直接全部显示，避免内容永远不可见
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    targets.forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
