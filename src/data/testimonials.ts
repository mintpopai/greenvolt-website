/**
 * 客户证言：一律匿名化陈列 —— 只给「职位 + 行业 + 地区」，不出现任何公司名，
 * 正文也不带可核对的具体数字（时长、市场排名、版本数等）。
 * 替换为真实证言前，务必取得客户书面授权，且仍按此匿名格式呈现。
 */

export interface Testimonial {
  /** 说话人职位 */
  role: string
  /** 行业描述 + 地区，替代原来的具名公司 */
  context: string
  quote: string
  /** 头像用的抽象图形色相（0–360），无真人照片 */
  hue: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    role: 'Head of Cross-border E-commerce',
    context: 'Beauty and personal care brand (Asia-Pacific)',
    quote:
      'We had tried entering Southeast Asia twice before and stalled both times. The third attempt was rebuilt from the creative up — local formats, local pricing logic, local hosts — and the region finally became a market we could plan around.',
    hue: 152,
  },
  {
    role: 'Director of Global Publishing',
    context: 'Mobile games studio (North America)',
    quote:
      'The read on which creators actually convert, rather than which creators look impressive, changed how we budget. Our US and Japan launches were the smoothest we have run.',
    hue: 178,
  },
  {
    role: 'VP of Brand Marketing',
    context: 'Consumer sportswear brand (Europe)',
    quote:
      'What sold us was the feedback loop. Every test feeds the next one, so the account gets sharper on its own. We stopped rebuilding the same learnings each season.',
    hue: 96,
  },
  {
    role: 'Head of Performance',
    context: 'Home goods retailer (North America)',
    quote:
      'We expanded our managed channels without adding headcount. The agents handle the routine reallocation, and our team argues about strategy again instead of spreadsheets.',
    hue: 166,
  },
  {
    role: 'Overseas Marketing Manager',
    context: 'Video production studio (Asia-Pacific)',
    quote:
      'Localisation is where most partners quietly fail. We received market-specific cuts of one hero film far faster than our previous process allowed, and the regional teams signed off on almost all of them.',
    hue: 188,
  },
]
