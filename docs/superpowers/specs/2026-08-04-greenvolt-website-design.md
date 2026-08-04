# GreenVolt 官网首页设计说明

- **日期**：2026-08-04
- **对标对象**：<https://www.tec-do.com/en/>（钛动科技）
- **范围**：单页官网首页，纯前端、无后端
- **状态**：已实现

## 一、目标

为 GreenVolt（面向全球广告市场的 AI 公司）做一个官网首页，页面**结构与节奏对标 tec-do.com/en**，但**视觉体系、产品命名与文案全部是 GreenVolt 自己的**，不做竞品克隆。

## 二、对标对象的结构拆解

tec-do.com/en 的首页由 11 段构成，本站逐段对应：

| # | tec-do 的段落 | 本站对应段落 |
|---|---|---|
| 1 | 预加载页（`Lead the World to You` + 0→100%） | `ThePreloader`：`GreenVolt` + 0→100% |
| 2 | 固定顶栏（logo + slogan + 导航 + 两个产品胶囊） | `SiteHeader` |
| 3 | 全屏 Hero（WebGL 背景 + 三条主张胶囊切换） | `HeroSection`（Canvas 电流线背景） |
| 4 | Marketing Multi-Agent 三张能力卡 | `AgentsSection` |
| 5 | Tec-Chi 大模型「AI 阳 / BI 阴」双栏 + 3D 地球 | `PlatformSection`（Volta「Current / Charge」+ 点阵地球） |
| 6 | 全球媒体资源（深色整屏 + 媒体 logo 墙） | `NetworkSection` |
| 7 | 客户证言轮播 | `TestimonialsSection` |
| 8 | `100,000+ Advertisers` + 客户 logo 跑马灯 | `StatsSection` |
| 9 | 案例轮播（左图右 KPI，`n/14` + 左右箭头） | `CasesSection`（`n/6`） |
| 10 | 深色联系区（左大标题 + 右玻璃表单） | `ContactSection` |
| 11 | 页脚 | `SiteFooter` |

## 三、技术选型

| 项 | 选择 | 理由 |
|---|---|---|
| 框架 | Vue 3 + Vite + TypeScript | 与团队技术栈一致；按 section 组件化拆分，后续加页面好扩展 |
| 样式 | 原生 CSS + CSS 变量令牌 | 不引 UI 框架与 Tailwind，避免额外工具链；令牌集中在 `src/styles/tokens.css` |
| 动效 | 自写 `useReveal()`（IntersectionObserver）+ CSS 过渡 + Canvas 2D | 不引 GSAP/AOS，省体积、零外部依赖 |
| 字体 | Fontsource 自托管（Sora 标题 / Inter 正文） | 按全球可达性规范，**全站零外链**，不碰 Google Fonts |
| 视觉素材 | 全部 CSS 渐变 / SVG / Canvas 自绘 | 没有 3D 渲染图与视频素材，且自绘产物同源、体积可控、不涉第三方版权 |
| 工具链 | mise 固定 node 24.19.0 / pnpm 11.20.0 | 命令与版本单一来源；`package.json` 不留 `scripts` |

**TypeScript 版本注意**：`vue-tsc@3.3.9` 与 `typescript@7.x` 不兼容（TS 7 移除了 `./lib/tsc` 导出，vue-tsc 启动即崩），故 TS 钉在 `5.9.3`。等 vue-tsc 支持 TS 7 后再升。

## 四、视觉体系

```
--gv-ink-deep  #050D0B  近黑墨绿（页面底色）
--gv-ink       #0A1F1A  深墨绿（区块底色）
--gv-volt      #00E08A  荧光绿（强调 / CTA / 数字）
--gv-aqua      #2DD4BF  青（渐变副色）
--gv-lime      #A8FF60  电光黄绿（渐变高光端）
--gv-mist      #E8FFF6  近白偏绿（正文反白）
```

手法：深色底 + 流形光晕（`AuroraBackdrop`），玻璃拟态卡（`backdrop-filter` + 发光描边），大圆角胶囊，巨号标题用「亮色 + 半透明 `.gv-dim`」两层做深浅分层。

## 五、目录结构

```
src/
├── main.ts               # 入口：装字体、令牌、基础样式
├── App.vue               # 组装各 section
├── styles/
│   ├── tokens.css        # 设计令牌
│   └── base.css          # 重置 + 工具类（.gv-shell/.gv-section/.gv-reveal…）
├── composables/
│   └── useReveal.ts      # 滚动进场：单个 IntersectionObserver 托管全部 .gv-reveal
├── data/                 # ⚠️ 全部占位内容，上线前替换
│   ├── site.ts           # 品牌、导航、Hero 三条主张、联系方式、页脚
│   ├── agents.ts         # 三个智能体 + Volta 双面
│   ├── network.ts        # 媒体渠道、规模数字、客户跑马灯
│   ├── testimonials.ts   # 客户证言
│   └── cases.ts          # 案例、KPI、表单下拉选项
├── components/           # 复用视觉件
│   ├── AuroraBackdrop.vue   # 固定背景光晕（CSS 渐变）
│   ├── CurrentCanvas.vue    # Hero 电流线（Canvas 2D）
│   ├── DotGlobe.vue         # 点阵地球（Canvas 2D，按经度真旋转）
│   ├── AgentGlyph.vue       # 智能体卡装饰图（SVG：雷达/棱镜/脉冲）
│   ├── CaseVisual.vue       # 案例配图（SVG：网格/波形/轨道）
│   └── MarqueeRow.vue       # 客户名跑马灯
└── sections/             # 11 个页面段落，一段一个文件
```

## 六、关键实现决策

1. **预加载遮罩必须有定时器兜底**。计数由 `requestAnimationFrame` 驱动，而 rAF 在后台标签页会被浏览器暂停，遮罩会永远停在半路。`onMounted` 里额外挂一个 `setTimeout(finish, DURATION + 400)`，`finish()` 幂等。遮罩期间锁 `body` 滚动，卸载时无条件解锁。
2. **Hero 电流线不用 `ctx.shadowBlur`**。长折线每帧重算模糊在宽屏上会把渲染进程拖垮；改成「宽而淡 + 细而亮」两道描边叠出辉光。窗口 `resize` 做 120ms 防抖，避免连发时反复重建位图。
3. **点阵地球用 Canvas 而非 SVG**。真正的自转要每帧重算所有点，Canvas 画几百个点远比更新同样多的 SVG 节点便宜；曾用 CSS `scaleX` 假自转，会把球压成椭圆，已弃用。
4. **案例轮播那一块不加 `.gv-reveal`**。它按品牌名做 `key`，切换时整块重挂载会丢掉 `is-revealed`，而观察器只在初次挂载时收集元素——加了反而让切换后的案例永远透明。淡入交给 `case-in` 关键帧。
5. **表单错误提示在首次提交后才实时复验**。提交前不打扰用户；提交过一次后 `watch(form)` 触发复验，改对了提示立刻消失。
6. **锚点跳转要留顶栏高度**：`section[id] { scroll-margin-top: 104px }`，否则章节标题被压在固定顶栏下面。
7. **页脚必须定位并抬层**：`AuroraBackdrop` 是 `position: fixed; z-index: 0`，静态流中的页脚会被它盖住。

## 七、内容与合规

- **全部文案为占位内容**，集中在 `src/data/`，各文件顶部有中文警示注释。
- 客户名、证言、案例、KPI **一律使用虚构品牌**，不使用真实公司名，避免伪造背书。页面上另有三处可见声明标注为 illustrative placeholders。
- 媒体渠道列表用平台真名，但文案明确写为「我们代客户在这些平台投放」，并附声明：不暗示任何平台的背书或独家关系。

## 八、可达性与响应式

- 断点：1180 / 1080 / 1024 / 980 / 900 / 860 / 720 / 560，各栅格逐级收敛到单列；`<900px` 顶栏折叠为抽屉菜单。
- `prefers-reduced-motion: reduce` 下关闭全部位移、循环动画与 Canvas 循环（只画一帧静态图）。
- 表单每个字段带 `label` 与错误提示；轮播按钮带 `aria-label`；跑马灯第二份副本 `aria-hidden` 避免读屏重复。
- 构建产物已核验**不含任何外部域名引用**。

## 九、后续对接点

- `ContactSection.vue` 的 `submitEnquiry()` 是唯一的提交出口，接后端时替换其实现即可，其余逻辑不动。
- 导航里的 `Legal Notice` / `Privacy Policy` 目前是 `#` 占位，需要真实页面。
