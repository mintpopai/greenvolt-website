<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 点阵地球：按经纬度均匀布点，逐帧按经度偏移旋转后投影到二维圆面。
 * 用 Canvas 而不是 SVG —— 真正的自转需要每帧重算所有点，Canvas 画几百个点远比
 * 更新同样多的 SVG 节点便宜；CSS 的 scaleX 假自转会把球压成椭圆，不用。
 */

const SIZE = 400
const RADIUS = 150
const LAT_BANDS = 19

interface Dot {
  lat: number
  lon: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let frame = 0
let dots: Dot[] = []

function buildDots(): Dot[] {
  const result: Dot[] = []
  for (let band = 0; band < LAT_BANDS; band += 1) {
    // 纬度取 -78°～78°，两极留白避免点堆在一起
    const lat = (-78 + (156 / (LAT_BANDS - 1)) * band) * (Math.PI / 180)
    // 每条纬线上的点数随其半径收缩，保证点间距大致均匀
    const count = Math.max(8, Math.round(Math.cos(lat) * 40))
    for (let i = 0; i < count; i += 1) {
      result.push({ lat, lon: (i / count) * Math.PI * 2 })
    }
  }
  return result
}

function draw(time: number) {
  if (!ctx) return
  const spin = time * 0.00016
  const cx = SIZE / 2
  const cy = SIZE / 2

  ctx.clearRect(0, 0, SIZE, SIZE)

  // 球体内部的辉光
  const glow = ctx.createRadialGradient(cx, cy * 0.9, 10, cx, cy, RADIUS)
  glow.addColorStop(0, 'rgba(0, 224, 138, 0.26)')
  glow.addColorStop(0.65, 'rgba(45, 212, 191, 0.07)')
  glow.addColorStop(1, 'rgba(45, 212, 191, 0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2)
  ctx.fill()

  // 球体轮廓
  ctx.strokeStyle = 'rgba(0, 224, 138, 0.24)'
  ctx.lineWidth = 1
  ctx.stroke()

  // 点阵：只画朝向观察者的半球，z 越大越亮越大
  for (const dot of dots) {
    const lon = dot.lon + spin
    const z = Math.cos(dot.lat) * Math.cos(lon)
    if (z <= 0) continue

    const x = cx + Math.cos(dot.lat) * Math.sin(lon) * RADIUS
    const y = cy - Math.sin(dot.lat) * RADIUS

    ctx.beginPath()
    ctx.arc(x, y, 0.8 + z * 1.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(140, 255, 208, ${0.1 + z * 0.55})`
    ctx.fill()
  }

  // 环绕轨道：暗示全球投放的流动
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(time * 0.00009)
  ctx.beginPath()
  ctx.ellipse(0, 0, RADIUS * 1.22, RADIUS * 0.38, 0, 0, Math.PI * 2)
  ctx.setLineDash([3, 9])
  ctx.strokeStyle = 'rgba(0, 224, 138, 0.32)'
  ctx.stroke()
  ctx.restore()
}

function loop(time: number) {
  draw(time)
  frame = requestAnimationFrame(loop)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  // 固定绘制坐标系为 400×400，靠 CSS 缩放适配容器；按 DPR 提高位图分辨率
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = SIZE * dpr
  canvas.height = SIZE * dpr

  ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  dots = buildDots()

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw(0)
    return
  }
  frame = requestAnimationFrame(loop)
})

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <div class="globe">
    <canvas ref="canvasRef" class="globe__canvas" role="presentation" aria-hidden="true" />
  </div>
</template>

<style scoped>
.globe {
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
  filter: drop-shadow(0 0 60px rgb(0 224 138 / 22%));
}

.globe__canvas {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}
</style>
