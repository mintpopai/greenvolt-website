/**
 * ⚠️ 占位内容 —— 客户与引语全部虚构，刻意不使用真实公司名，避免伪造背书。
 * 替换为真实证言前，务必取得客户书面授权。
 */

export interface Testimonial {
  brand: string
  role: string
  quote: string
  /** 头像用的抽象图形色相（0–360），无真人照片 */
  hue: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    brand: 'Aurelia Beauty',
    role: 'Head of Cross-border E-commerce',
    quote:
      'We had launched in Southeast Asia twice before and stalled both times. GreenVolt rebuilt our entry from the creative up — local formats, local pricing logic, local hosts. Six months in, the region is our second-largest market and it is profitable.',
    hue: 152,
  },
  {
    brand: 'Northbound Games',
    role: 'Director of Global Publishing',
    quote:
      'Their read on which creators actually convert, rather than which creators look impressive, saved us a full quarter of budget. The US and Japan launches were the smoothest we have run.',
    hue: 178,
  },
  {
    brand: 'Pacer Athletics',
    role: 'VP of Brand Marketing',
    quote:
      'What sold us was the feedback loop. Every test feeds the next one, so the account gets sharper on its own. We stopped rebuilding the same learnings each season.',
    hue: 96,
  },
  {
    brand: 'HomeNest',
    role: 'Head of Performance',
    quote:
      'We went from three managed channels to eleven without adding headcount. The agents handle the routine reallocation; our team argues about strategy again instead of spreadsheets.',
    hue: 166,
  },
  {
    brand: 'Lumen Studios',
    role: 'Overseas Marketing Manager',
    quote:
      'Localisation is where most partners quietly fail. GreenVolt shipped 40 market-specific cuts of one hero film in under two weeks, and the regional teams signed off on almost all of them.',
    hue: 188,
  },
]
