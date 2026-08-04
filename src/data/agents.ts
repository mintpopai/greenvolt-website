/**
 * ⚠️ 占位内容 —— 三个智能体的能力描述为示例文案，上线前替换。
 */

export interface AgentCard {
  /** 卡片编号，视觉上作为装饰性大数字 */
  index: string
  name: string
  /** 一句话职责 */
  role: string
  /** 三条能力清单 */
  capabilities: string[]
  /** 装饰图形的种类，对应 AgentGlyph 组件的三种画法 */
  glyph: 'RADAR' | 'PRISM' | 'PULSE'
}

export const AGENTS: AgentCard[] = [
  {
    index: '01',
    name: 'Insight Agent',
    role: 'Reads the market before you enter it',
    capabilities: [
      'In-depth market and category intelligence',
      'Trending creative radar across 40+ channels',
      'Bespoke go-to-market advisory',
    ],
    glyph: 'RADAR',
  },
  {
    index: '02',
    name: 'Creative Agent',
    role: 'Turns one winning idea into a hundred',
    capabilities: [
      'Multimodal understanding of video, image and copy',
      'Scalable creative replication and localisation',
      'Derivative concepts benchmarked against winners',
    ],
    glyph: 'PRISM',
  },
  {
    index: '03',
    name: 'Performance Agent',
    role: 'Buys, watches and corrects — around the clock',
    capabilities: [
      'Autonomous bidding and budget reallocation',
      'Real-time metric anomaly detection',
      'Closed-loop reporting and optimisation feedback',
    ],
    glyph: 'PULSE',
  },
]

/** Volta 大模型的双面：可测的表现 vs 沉淀的资产 */
export interface ModelFacet {
  /** 「AI」/「BI」这类角标 */
  badge: string
  title: string
  subtitle: string
  points: string[]
}

export const MODEL_FACETS: ModelFacet[] = [
  {
    badge: 'AI',
    title: 'The Current of Volta',
    subtitle: 'Everything that moves a number this week',
    points: [
      'Text-to-video generation',
      'Marketing content deconstruction',
      'Multi-round, context-aware dialogue',
    ],
  },
  {
    badge: 'BI',
    title: 'The Charge of Volta',
    subtitle: 'Everything that compounds over years',
    points: [
      'Category and industry know-how',
      'Real-time competitive benchmarks',
      'Codified marketing best practice',
    ],
  },
]
