/**
 * ⚠️ 占位内容 —— 媒体渠道为示例，上线前按真实合作替换。
 * 渠道名仅作为「我们在这些平台投放」的清单陈列，未声明任何官方代理级别。
 * 站点不陈列任何无法自证的规模数字（市场数 / 平台数 / 素材量等），不要再加回来。
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
