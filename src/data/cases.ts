/**
 * ⚠️ 占位内容 —— 案例、指标与客户名全部虚构，上线前替换为真实且可核实的数据。
 * 案例配图不使用第三方素材，改由 CaseVisual 组件按 accent/pattern 自绘。
 */

export interface CaseMetric {
  label: string
  value: string
}

export interface CaseStudy {
  brand: string
  /** 行业标签，显示在品牌名上方 */
  sector: string
  market: string
  metrics: CaseMetric[]
  summary: string
  /** 自绘配图的主色相与图案 */
  hue: number
  pattern: 'GRID' | 'WAVE' | 'ORBIT'
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    brand: 'Aurelia Beauty',
    sector: 'Beauty & personal care',
    market: 'Indonesia · Malaysia',
    metrics: [
      { label: 'Live-commerce GMV, month over month', value: '+212%' },
      { label: 'Cost per acquisition', value: '-38%' },
      { label: 'Category rank, festival week', value: 'Top 3' },
    ],
    summary:
      'A product-first storefront strategy built around local beauty routines and prayer-time traffic patterns. Creative, hosts and pricing were rebuilt per market rather than translated, and the festival peak carried into the following quarter.',
    hue: 152,
    pattern: 'GRID',
  },
  {
    brand: 'Northbound Games',
    sector: 'Gaming',
    market: 'US · Japan · Korea',
    metrics: [
      { label: 'Launch-week impressions', value: '140M' },
      { label: 'Creators activated', value: '260+' },
      { label: 'Day-7 retention', value: '41%' },
    ],
    summary:
      'A tiered creator strategy that put core-community voices ahead of reach buys. Playable ad variants were generated per platform and rotated automatically as fatigue set in.',
    hue: 186,
    pattern: 'ORBIT',
  },
  {
    brand: 'Pacer Athletics',
    sector: 'Sportswear',
    market: 'Southeast Asia',
    metrics: [
      { label: 'Marketplace sales growth', value: '+165%' },
      { label: 'Organic share of mentions', value: '+3.1x' },
      { label: 'Blended ROAS', value: '4.6' },
    ],
    summary:
      'Running clubs, not celebrities. Community seeding generated the proof, paid amplified only what already worked, and marketplace operations kept stock aligned to demand spikes.',
    hue: 104,
    pattern: 'WAVE',
  },
  {
    brand: 'HomeNest',
    sector: 'Home & living',
    market: 'EU · UK',
    metrics: [
      { label: 'Channels under management', value: '11' },
      { label: 'Media efficiency gain', value: '+52%' },
      { label: 'Headcount added', value: '0' },
    ],
    summary:
      'Eleven channels consolidated into one autonomous buying loop. Budget moves that used to wait for a Monday review now happen within the hour, with humans setting the guardrails.',
    hue: 168,
    pattern: 'GRID',
  },
  {
    brand: 'Lumen Studios',
    sector: 'Streaming',
    market: 'LATAM',
    metrics: [
      { label: 'Market-specific cuts shipped', value: '40' },
      { label: 'Production time', value: '12 days' },
      { label: 'Subscriber acquisition cost', value: '-29%' },
    ],
    summary:
      'One hero film, forty regional edits, produced in under two weeks. The model handled scene selection and pacing per market; the studio kept final approval on every cut.',
    hue: 194,
    pattern: 'ORBIT',
  },
  {
    brand: 'Meridian Finance',
    sector: 'Fintech',
    market: 'MENA',
    metrics: [
      { label: 'Qualified lead volume', value: '+240%' },
      { label: 'Compliance review cycle', value: '-70%' },
      { label: 'Cost per funded account', value: '-33%' },
    ],
    summary:
      'A regulated category where every claim needed review. Creative variants were generated against an approved claim library, so legal reviewed patterns once instead of assets forever.',
    hue: 142,
    pattern: 'WAVE',
  },
]

/** 联系表单里「你需要什么支持」的下拉选项 */
export const ENQUIRY_TOPICS: string[] = [
  'Overseas ad account opening',
  'Managed media buying',
  'Creator and influencer marketing',
  'Creative production at scale',
  'Marketplace and live commerce',
  'Something else',
]
