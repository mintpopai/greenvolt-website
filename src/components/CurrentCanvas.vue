<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Hero 背景的「电流」层：若干条沿正弦轨迹缓慢横向流动的发光折线。
 * 纯 Canvas 2D 绘制，不依赖任何外部库；减少动效偏好下只画一帧静态图。
 */

const canvasRef = ref<HTMLCanvasElement | null>(null)

let frame = 0
let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let dpr = 1

interface Trace {
  /** 基准高度占比 */
  y: number
  amplitude: number
  wavelength: number
  speed: number
  phase: number
  alpha: number
  lineWidth: number
}

let traces: Trace[] = []

/** 用固定参数生成走向各异的电流轨迹，避免每次刷新观感跳变过大 */
function buildTraces(): Trace[] {
  const presets: Array<[number, number, number, number, number, number, number]> = [
    // y, amplitude, wavelength, speed, phase, alpha, lineWidth
    [0.28, 26, 420, 0.00022, 0.0, 0.9, 1.4],
    [0.42, 44, 620, 0.00014, 1.7, 0.62, 1.1],
    [0.56, 18, 320, 0.00031, 3.2, 0.75, 1.0],
    [0.68, 58, 760, 0.00011, 0.8, 0.45, 1.6],
    [0.8, 32, 500, 0.00019, 2.4, 0.55, 1.2],
  ]
  return presets.map(([y, amplitude, wavelength, speed, phase, alpha, lineWidth]) => ({
    y,
    amplitude,
    wavelength,
    speed,
    phase,
    alpha,
    lineWidth,
  }))
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = rect.width
  height = rect.height
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

let resizeTimer = 0

/** 拖拽窗口会连发 resize，重建位图很贵，收敛到停手后再做一次 */
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(resize, 120)
}

/** 沿 x 轴按双正弦叠加铺一条折线；步长越大点越少，宽屏上省下的开销很可观 */
function tracePath(trace: Trace, time: number) {
  if (!ctx) return
  const baseY = height * trace.y
  const t = time * trace.speed + trace.phase
  const step = Math.max(10, width / 90)

  ctx.beginPath()
  for (let x = 0; x <= width + step; x += step) {
    const y =
      baseY +
      Math.sin(x / trace.wavelength + t) * trace.amplitude +
      Math.sin(x / (trace.wavelength * 0.37) + t * 1.6) * (trace.amplitude * 0.28)
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
}

function draw(time: number) {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  ctx.lineCap = 'round'

  for (const trace of traces) {
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, 'rgba(0, 224, 138, 0)')
    gradient.addColorStop(0.35, `rgba(0, 224, 138, ${trace.alpha})`)
    gradient.addColorStop(0.7, `rgba(45, 212, 191, ${trace.alpha * 0.8})`)
    gradient.addColorStop(1, 'rgba(45, 212, 191, 0)')

    // 辉光用「宽而淡」+「细而亮」两道描边叠出来。
    // 不用 ctx.shadowBlur —— 那个在长折线上每帧都要重算模糊，宽屏下能把渲染进程拖死。
    tracePath(trace, time)
    ctx.globalAlpha = 0.28
    ctx.strokeStyle = gradient
    ctx.lineWidth = trace.lineWidth * 6
    ctx.stroke()

    ctx.globalAlpha = 1
    ctx.lineWidth = trace.lineWidth
    ctx.stroke()
  }
}

function loop(time: number) {
  draw(time)
  frame = requestAnimationFrame(loop)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  if (!ctx) return

  traces = buildTraces()
  resize()
  window.addEventListener('resize', onResize, { passive: true })

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    draw(0)
    return
  }
  frame = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(resizeTimer)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvasRef" class="current" aria-hidden="true" />
</template>

<style scoped>
.current {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  mask-image: linear-gradient(to right, transparent, #000 18%, #000 82%, transparent);
  pointer-events: none;
}
</style>
