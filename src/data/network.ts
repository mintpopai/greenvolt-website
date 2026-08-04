/**
 * ⚠️ 占位内容 —— 媒体渠道与规模数字均为示例，上线前按真实合作与口径替换。
 * 渠道名仅作为「我们在这些平台投放」的清单陈列，未声明任何官方代理级别。
 */

export interface MediaTier {
  label: string
  channels: string[]
}

export const MEDIA_TIERS: MediaTier[] = [
  {
    label: 'Core platforms',
    channels: ['Google Ads', 'Meta', 'TikTok for Business', 'Amazon Ads'],
  },
  {
    label: 'Scale channels',
    channels: [
      'Snapchat',
      'Pinterest',
      'Reddit',
      'Kwai',
      'AppLovin',
      'Unity',
      'Taboola',
      'Outbrain',
    ],
  },
  {
    label: 'Regional leaders',
    channels: ['Yandex', 'Naver', 'LINE', 'Shopee Ads', 'Lazada', 'Coupang'],
  },
]

export interface NetworkStat {
  value: string
  label: string
}

export const NETWORK_STATS: NetworkStat[] = [
  { value: '6M+', label: 'Digital media assets aggregated' },
  { value: '190+', label: 'Markets with live delivery' },
  { value: '40+', label: 'Platforms under one console' },
]

/** 首页数字条：整体规模 */
export const HEADLINE_STAT = {
  value: '80,000+',
  lines: ['Advertisers served', 'in global expansion'],
  year: '2025',
} as const

export const SUPPORT_STATS: NetworkStat[] = [
  { value: '$2.4B', label: 'Annual ad spend under management' },
  { value: '1,200+', label: 'Creatives shipped every week' },
  { value: '24/7', label: 'Autonomous optimisation coverage' },
]

/**
 * 客户 logo 墙 —— 全部为虚构品牌名，避免伪造真实公司的合作关系。
 * 换成真实客户时请确认已获得授权。
 */
export const CLIENT_MARQUEE: string[][] = [
  [
    'AURELIA',
    'NORTHBOUND',
    'PACER',
    'HOMENEST',
    'LUMEN STUDIOS',
    'VELA',
    'KITEWORKS',
    'ORCHARD LANE',
  ],
  [
    'MERIDIAN',
    'SUNBLOCK CO.',
    'FOLDCRAFT',
    'ATLAS PLAY',
    'GOODWEAR',
    'TIDEPOOL',
    'NOVA FRESH',
    'CARBONHILL',
  ],
]
