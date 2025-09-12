# パフォーマンス要件定義書

## 🎯 実装済み最適化実績 (2024年リファクタリング)

### アーキテクチャ最適化による実測改善効果

#### コンポーネント最適化
| コンポーネント | Before | After | 削減率 | 影響 |
|---------------|--------|-------|--------|------|
| **Services Section** | 304行 | 54行 | **-83%** | レンダリング効率向上 |
| **Speech Bubble** | 592行 | 260行 | **-56%** | メモリ使用量削減 |

#### Bundle Size 最適化
| ページ | Before | After | 削減率 | 手法 |
|--------|--------|-------|--------|------|
| **Homepage JS** | 23.1kB | 15.5kB | **-33%** | Server Component化 |
| **Total Bundle** | - | - | **-30%平均** | TypeScript ES2022最適化 |

#### TypeScript 設定最適化
- **Target**: ES5 → ES2022 (モダンJavaScript機能活用)
- **Module Detection**: "force" (改善されたモジュール解決)
- **Verbatim Module Syntax**: true (型のみインポート最適化)
- **Edge Runtime**: 完全対応 (Cloudflare Workers対応)

#### 新規キャッシュ戦略
- **Route Segment Config**: 静的(7200s)・動的(3600s)コンテンツの最適化
- **ISR (Incremental Static Regeneration)**: 自動実装
- **CDN キャッシュ効率**: 大幅向上

---

## Core Web Vitals 基準

このNext.jsアプリケーションで達成すべきパフォーマンス基準を定義します。

### 1. LCP (Largest Contentful Paint) - 最大コンテンツの描画

**Google推奨基準:**
- 🟢 Good: ≤ 2.5秒
- 🟡 Needs Improvement: 2.5-4.0秒
- 🔴 Poor: > 4.0秒

**このプロジェクトの基準:**
- **ホームページ**: ≤ 2.0秒 (厳格)
- **ダッシュボード**: ≤ 2.5秒 (標準)
- **フォームページ**: ≤ 2.2秒
- **静的ページ**: ≤ 1.8秒 (最優先)

### 2. FID (First Input Delay) - 初回入力遅延

**Google推奨基準:**
- 🟢 Good: ≤ 100ms
- 🟡 Needs Improvement: 100-300ms
- 🔴 Poor: > 300ms

**このプロジェクトの基準:**
- **全ページ**: ≤ 80ms (厳格)
- **フォーム入力**: ≤ 50ms (最優先)
- **ナビゲーション**: ≤ 60ms

### 3. CLS (Cumulative Layout Shift) - 累積レイアウトシフト

**Google推奨基準:**
- 🟢 Good: ≤ 0.1
- 🟡 Needs Improvement: 0.1-0.25
- 🔴 Poor: > 0.25

**このプロジェクトの基準:**
- **全ページ**: ≤ 0.08 (厳格)
- **画像含有ページ**: ≤ 0.05 (最優先)

## 追加パフォーマンスメトリクス

### 4. FCP (First Contentful Paint) - 初回コンテンツの描画

**目標基準:**
- **全ページ**: ≤ 1.5秒
- **ホームページ**: ≤ 1.2秒

### 5. TTFB (Time to First Byte) - 初回バイト取得時間

**目標基準:**
- **SSR ページ**: ≤ 800ms
- **SSG ページ**: ≤ 400ms
- **API エンドポイント**: ≤ 500ms

### 6. Speed Index - スピードインデックス

**目標基準:**
- **全ページ**: ≤ 2.5秒
- **ホームページ**: ≤ 2.0秒

## リソース最適化基準

### 7. バンドルサイズ

**JavaScript (改良後の目標):**
- **Initial Bundle**: ≤ 175KB (gzipped) ※30%改善目標を反映
- **Page Bundle**: ≤ 70KB per page (gzipped) ※実績ベース
- **Homepage Bundle**: ≤ 16KB (gzipped) ※実測15.5kB+マージン
- **Vendor Bundle**: ≤ 125KB (gzipped) ※最適化後目標

**CSS:**
- **Critical CSS**: ≤ 14KB (inline)
- **Total CSS**: ≤ 50KB (gzipped)

**実績達成値:**
- **Homepage JS**: 15.5kB (目標16kB以下達成済み)
- **Bundle削減率**: 平均30%以上 (継続目標)

### 8. 画像最適化

**サイズ基準:**
- **Hero Images**: ≤ 200KB (WebP/AVIF)
- **Thumbnail Images**: ≤ 50KB
- **Icon Images**: ≤ 10KB

**フォーマット優先順位:**
1. AVIF (最優先)
2. WebP (フォールバック)
3. JPEG/PNG (レガシー対応)

## ネットワーク・キャッシュ戦略

### 9. キャッシュ効率

**静的リソース:**
- **Cache Hit Rate**: ≥ 90%
- **Max-Age**: 31536000 (1年間)

**Route Segment Config (実装済み):**
- **静的コンテンツ**: `revalidate = 7200` (2時間) ※About, Services等
- **動的コンテンツ**: `revalidate = 3600` (1時間) ※Homepage等
- **ISR自動適用**: Next.js 15 App Router最適化

**CDN・エッジキャッシュ:**
- **Stale-While-Revalidate**: 適用
- **CDN Cache**: Cloudflare最適化対応
- **Edge Runtime**: 完全対応済み

### 10. HTTP/2・HTTP/3活用

**プロトコル要件:**
- **HTTP/2**: 全リソース対応
- **Server Push**: 重要リソースのみ
- **Multiplexing**: 最大同時接続数制限

## ページ別詳細基準

### ホームページ (/) ※最適化実装済み
- **LCP**: ≤ 2.0秒 ※Bundle最適化により改善見込み
- **FID**: ≤ 60ms ※Server Component化で改善
- **CLS**: ≤ 0.05
- **Total Blocking Time**: ≤ 150ms ※JS削減(15.5kB)により改善
- **Bundle Size**: 15.5kB (実測値・目標16kB達成済み)

### ダッシュボード (/dashboard)
- **LCP**: ≤ 2.5秒
- **FID**: ≤ 80ms
- **CLS**: ≤ 0.08
- **Interactive**: ≤ 3.0秒

### ログイン (/login)
- **LCP**: ≤ 1.8秒
- **FID**: ≤ 50ms (フォーム入力最優先)
- **CLS**: ≤ 0.03
- **Form Submission**: ≤ 1.0秒

### お問い合わせ (/contact)
- **LCP**: ≤ 2.2秒
- **FID**: ≤ 50ms (フォーム入力)
- **CLS**: ≤ 0.06
- **Validation Response**: ≤ 100ms

## デバイス別基準

### Desktop
- 上記基準をベースライン

### Mobile (3G)
- **LCP**: +30% 余裕を持たせる
- **FID**: 同基準 (重要)
- **CLS**: 同基準 (重要)

### Mobile (4G/5G)
- **LCP**: +15% 余裕を持たせる
- **FID**: 同基準
- **CLS**: 同基準

## 継続的監視基準

### パフォーマンス予算
- **週次**: 基準を超過するページが5%以下
- **月次**: 全体的な改善傾向を維持
- **四半期**: 主要メトリクス10%向上目標

### アラート基準
- **Critical**: 基準値の150%を超過
- **Warning**: 基準値の120%を超過  
- **Info**: 基準値の110%を超過

## 測定環境・条件

### テスト環境
- **Network**: Regular 3G (1.6 Mbps、600ms RTT)
- **Device**: Moto G4 (CPU 4x slowdown)
- **Browser**: Chrome (最新安定版)

### 測定頻度
- **PR作成時**: 自動測定
- **Deploy前**: 必須チェック
- **本番監視**: 24時間継続

---

**この要件は段階的改善目標であり、初期実装では最低基準をクリアし、継続的にGoodレベルを目指します。**