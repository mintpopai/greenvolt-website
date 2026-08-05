/**
 * ⚠️ 占位内容 —— 全部为示例文案，上线前需替换为 GreenVolt 的真实信息。
 * 品牌主张、导航、页脚、联系方式集中在此。
 */

export interface NavLink {
  label: string
  href: string
}

export const BRAND = {
  name: 'GreenVolt',
  tagline: 'Power global advertising with AI and convert intelligence into growth',
  /** 顶栏用的短描述：顶栏高度只容得下一行，长 tagline 会折行撑破胶囊条 */
  headerNote: 'AI for global advertising',
  /** 自研多模态大模型的产品名 */
  model: 'Volta',
  /** 多智能体编排平台的产品名 */
  platform: 'Circuit',
} as const

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#top' },
  { label: 'Agents', href: '#agents' },
  { label: 'Volta MLLM', href: '#platform' },
  { label: 'Network', href: '#network' },
  { label: 'Cases', href: '#cases' },
]

/** Hero 轮播的三条主张，对应底部三个可点胶囊 */
export interface HeroSlide {
  /** 底部胶囊上的短标签 */
  pill: string
  /** 大标题，按行拆分以便逐行入场 */
  lines: string[]
  /** 标题下方的一句补充 */
  lead: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    pill: 'Multimodal models + multi-agent',
    lines: ['Multimodal Models', 'Powering Global Growth'],
    lead: 'One intelligence layer across research, creative, buying and measurement.',
  },
  {
    pill: 'Lead the world to you',
    lines: ['Lead the World', 'to You'],
    lead: 'We take brands into markets they have never sold in, and make the first quarter profitable.',
  },
  {
    pill: 'Intelligence into growth',
    lines: ['Turn Intelligence', 'into Growth'],
    lead: 'Every insight compounds: what one campaign learns, every campaign inherits.',
  },
]

/** 全站唯一联系方式为邮箱：不列电话、不列办公地点 */
export const CONTACT = {
  email: 'official@greenvolt.cc',
  press: 'official@greenvolt.cc',
} as const

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Volta MLLM', href: '#platform' },
  { label: 'Circuit', href: '#agents' },
  { label: 'Global Media Network', href: '#network' },
  { label: 'Case Studies', href: '#cases' },
  { label: 'Contact', href: '#contact' },
]

/** 法务页面路径：独立文档（非 SPA 锚点），可直接输入 URL 访问 */
export const LEGAL_PAGE_PATH = '/legal'

export const LEGAL_LINKS: NavLink[] = [{ label: 'Legal & Privacy', href: LEGAL_PAGE_PATH }]
