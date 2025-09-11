import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config: OpenNextConfig = {
  // デフォルト設定を使用
  // カスタム設定が必要な場合は以下のように設定可能

  // 静的ファイルの配信設定
  // assets: {
  //   bucket: 'my-assets-bucket',
  //   prefix: 'assets/',
  // },

  // 画像最適化の設定
  // imageOptimization: {
  //   loader: 'cloudflare-images',
  // },

  // Cloudflare 固有の設定
  // cloudflare: {
  //   // ワーカーの設定をカスタマイズ
  // },

  // 環境固有の設定
  environments: {
    default: {
      // デフォルト環境設定
    },
  },
}

export default config