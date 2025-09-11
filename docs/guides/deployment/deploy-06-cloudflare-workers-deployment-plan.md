# Cloudflare Workers + OpenNext デプロイ手順書

## 概要

Next.js 15 + App Router + React 19 アプリケーションを Cloudflare Workers + OpenNext でデプロイするための包括的な手順書です。

## 技術要件

### プロジェクト構成
- Next.js 15 + App Router + React 19
- 複雑なmiddleware（CSRF、レート制限、Auth.js v5統合）
- Three.js による3D背景エフェクト
- Server Components + Server Actions
- TypeScript strict mode
- Tailwind CSS v4

### デプロイ戦略
- **プラットフォーム**: Cloudflare Workers + OpenNext v2.0
- **バンドル制限**: 15MB（有料プラン）
- **ランタイム**: Node.js互換（crypto, net, tls対応）
- **アダプター**: @cloudflare/next-on-pages

## Phase 1: 環境準備

### 1.1 Cloudflare アカウント設定

```bash
# 1. Cloudflare アカウント作成・ログイン
# https://dash.cloudflare.com/

# 2. Workers 有料プラン契約（推奨）
# - 15MB バンドル制限対応
# - 高度な機能利用

# 3. ドメイン設定
# - カスタムドメインの追加
# - DNS設定の確認
```

### 1.2 開発環境設定

```bash
# wrangler CLI インストール
npm install -g wrangler

# Cloudflare 認証
wrangler auth login

# アカウント情報確認
wrangler auth whoami
```

## Phase 2: プロジェクト設定

### 2.1 依存関係追加

```bash
# Cloudflare Next.js アダプター
npm install @cloudflare/next-on-pages

# Wrangler（ローカル開発用）
npm install -D wrangler @cloudflare/workers-types
```

### 2.2 設定ファイル作成

#### wrangler.toml
```toml
name = "nextjs-boilerplate-app"
compatibility_date = "2024-12-01"
compatibility_flags = ["nodejs_compat"]

# アプリケーションタイプ
pages_build_output_dir = ".vercel/output/static"

# 環境変数
[env.production.vars]
NEXTAUTH_URL = "https://yourdomain.com"
NEXTAUTH_SECRET = "your-secret-key"
NODE_ENV = "production"

[env.preview.vars]
NEXTAUTH_URL = "https://your-preview-domain.pages.dev"
NEXTAUTH_SECRET = "your-preview-secret"
NODE_ENV = "development"

# バインディング設定（将来的にKV、D1使用時）
# [[env.production.kv_namespaces]]
# binding = "KV_STORE"
# id = "your-kv-namespace-id"
```

#### next.config.ts 修正
```typescript
import type { NextConfig } from "next";

// バンドル分析の設定
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	/* config options here */

	reactStrictMode: true,

	// Reactコンパイラの有効化
	experimental: {
		reactCompiler: true,
	},

	// Cloudflare Workers 対応
	output: "export",
	trailingSlash: true,
	images: {
		// Cloudflare Images 使用時の設定
		unoptimized: true, // または Cloudflare Images の設定
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "/**",
			},
		],
	},

	// 環境変数
	env: {
		NEXT_PUBLIC_SHOW_EXAMPLES: process.env.NEXT_PUBLIC_SHOW_EXAMPLES || "true",
	},
};

export default withBundleAnalyzer(nextConfig);
```

### 2.3 ビルドスクリプト追加

#### package.json
```json
{
  "scripts": {
    "build:cloudflare": "next build && @cloudflare/next-on-pages",
    "preview:cloudflare": "wrangler pages dev .vercel/output/static --compatibility-date=2024-12-01 --compatibility-flags=nodejs_compat",
    "deploy:preview": "npm run build:cloudflare && wrangler pages deploy .vercel/output/static --project-name=nextjs-boilerplate-preview",
    "deploy:production": "npm run build:cloudflare && wrangler pages deploy .vercel/output/static --project-name=nextjs-boilerplate-prod"
  }
}
```

### 2.4 環境変数設定

#### .env.example 更新
```bash
# Cloudflare 固有の環境変数
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token

# Auth.js 設定（Cloudflare Workers 対応）
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret
AUTH_TRUST_HOST=true

# Three.js 最適化設定
NEXT_PUBLIC_3D_QUALITY=medium
NEXT_PUBLIC_PRELOAD_3D=false

# その他の既存環境変数...
```

### 2.5 TypeScript設定調整

#### tsconfig.json 修正
```json
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "es6", "es2020"],
    "types": ["@cloudflare/workers-types", "vitest/globals"],
    // ... 他の設定は既存のまま
  }
}
```

## Phase 3: デプロイ実行

### 3.1 プレビュー環境テスト

```bash
# ローカルでCloudflareエミュレーション
npm run preview:cloudflare

# プレビューデプロイ
npm run deploy:preview
```

### 3.2 機能確認テスト

**テスト項目:**
- [ ] Auth.js v5 認証フロー動作
- [ ] Three.js 3D背景の読み込み・レンダリング
- [ ] Middleware（CSRF、レート制限）動作
- [ ] Server Components + Server Actions
- [ ] API Routes（認証、CSRF トークン）
- [ ] 画像最適化
- [ ] レスポンシブデザイン

### 3.3 本番環境デプロイ

```bash
# 本番デプロイ実行
npm run deploy:production

# デプロイ状況確認
wrangler pages deployment list --project-name=nextjs-boilerplate-prod
```

### 3.4 DNS設定・切り替え

```bash
# カスタムドメイン設定
wrangler pages project create nextjs-boilerplate-prod
wrangler pages deployment tail --project-name=nextjs-boilerplate-prod

# DNS レコード設定
# Cloudflare Dashboard でCNAMEレコード設定
# yourapp.pages.dev -> yourdomain.com
```

## Phase 4: 検証・最適化

### 4.1 機能検証チェックリスト

**認証システム:**
- [ ] ログイン・ログアウト機能
- [ ] セッション管理
- [ ] 保護されたルート
- [ ] CSRF トークン検証

**Three.js 機能:**
- [ ] 3D背景の正常なレンダリング
- [ ] パフォーマンス（60fps維持）
- [ ] モバイル対応
- [ ] リサイズ対応

**セキュリティ:**
- [ ] CORS設定
- [ ] セキュリティヘッダー
- [ ] レート制限機能
- [ ] 入力サニタイゼーション

### 4.2 パフォーマンス最適化

```bash
# バンドルサイズ分析
npm run analyze

# パフォーマンス測定
npm run test:e2e
```

**最適化項目:**
- [ ] バンドルサイズの確認（15MB以下）
- [ ] Core Web Vitals測定
- [ ] 画像最適化の確認
- [ ] CDNキャッシュ設定

### 4.3 モニタリング設定

**Cloudflare Analytics:**
- Workers Analytics の有効化
- Real User Monitoring (RUM) 設定
- エラーレート監視

**追加監視:**
- Three.js レンダリング時間
- 認証フロー完了率
- API レスポンス時間

## トラブルシューティング

### よくある問題と解決策

**1. バンドルサイズ超過**
```bash
# 解決策: 動的インポート使用
const ThreeJSComponent = dynamic(() => import('./ThreeJSComponent'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});
```

**2. Auth.js セッション問題**
```typescript
// 解決策: Edge Runtime 対応設定
export const config = {
  runtime: 'edge',
}
```

**3. Middleware 動作不良**
```typescript
// 解決策: Cloudflare Workers 対応の middleware 設定
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### サポートリソース

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [OpenNext Documentation](https://opennext.js.org/)

## 継続的改善

### 今後の拡張予定
- Cloudflare D1 データベース統合
- Cloudflare KV ストレージ活用
- Cloudflare Images サービス連携
- Edge-side Analytics 実装

### パフォーマンス目標
- First Contentful Paint: < 1.5秒
- Time to Interactive: < 3秒
- Cumulative Layout Shift: < 0.1

---

**更新日**: 2025-01-11  
**バージョン**: v1.0  
**対象**: Next.js 15 + App Router + React 19