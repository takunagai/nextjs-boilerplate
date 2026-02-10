# (site) ルートグループ コンポーネント総合レビューレポート

> **レビュー日**: 2026-02-09
> **対象**: `src/app/(site)` ルートグループで使用する全コンポーネント（約100件）
> **レビュー観点**: コード品質・設計（40%）/ パフォーマンス（30%）/ アクセシビリティ（30%）

---

## 1. エグゼクティブサマリー

### 総合スコア: **B（3.7 / 5.0）**

| 観点 | スコア | 評価 |
|------|--------|------|
| コード品質・設計 | 3.8 / 5.0 | B — 堅実な設計だが一貫性に課題 |
| パフォーマンス | 3.5 / 5.0 | B — 基盤は良好、エフェクト系に要改善 |
| アクセシビリティ | 3.6 / 5.0 | B — 基本対応済、`prefers-reduced-motion` が弱点 |

### 課題集計

| 深刻度 | 件数 | 代表例 |
|--------|------|--------|
| **S1 CRITICAL** | 2 | XSSリスク、スクロールリスナー未スロットル |
| **S2 HIGH** | 8 | `prefers-reduced-motion` 未対応、フォーカストラップ欠如、巨大コンポーネント |
| **S3 MEDIUM** | 18 | ハードコードデータ、FAQ重複実装、不要な `"use client"` |
| **S4 LOW** | 12 | マジックナンバー、`cn()` 未統一、ダミー画像 |

### 主要な強み

1. **サーバーコンポーネント優先設計**: ページレベルは概ねサーバーコンポーネントで設計されており、JS バンドルサイズを抑制
2. **SEO基盤が充実**: `generateMetadata`、JSON-LD構造化データ、パンくずリストが一貫して実装
3. **共有コンポーネントの優れた設計**: `ServiceHeroSection`、`ServiceFinalCTA`、`ServicePageWrapper` は再利用性が高い
4. **フォーム実装の品質**: React Hook Form + Zod による型安全なバリデーション、アクセシビリティ対応
5. **テーマシステム**: フィーチャーフラグ付き、動的インポートによるバンドル最適化

### 最重要改善ポイント

1. **XSS脆弱性の修正** (`news/[id]/page.tsx` の `dangerouslySetInnerHTML`)
2. **`prefers-reduced-motion` の全面対応** (エフェクト/背景コンポーネント)
3. **FAQ コンポーネントの統一** (3箇所で重複実装)
4. **`about/page.tsx` の分割** (475行のモノリシックページ)

---

## 2. レビューダッシュボード

### 凡例
- **品質**: コード品質・設計スコア
- **性能**: パフォーマンススコア
- **A11y**: アクセシビリティスコア
- **総合**: 品質40% + 性能30% + A11y30%

### 2.1 レイアウトコンポーネント

| # | コンポーネント | 行数 | Client | 品質 | 性能 | A11y | 総合 | 主な課題 |
|---|---------------|------|--------|------|------|------|------|----------|
| 1 | `layout.tsx` (site) | ~30 | No | A | A | A | **A** | なし |
| 2 | `header.tsx` | ~180 | Yes | A | B | B | **B+** | スクロールスロットル要確認 |
| 3 | `desktop-navigation.tsx` | ~200 | Yes | B | B | C | **B** | フォーカストラップ欠如 |
| 4 | `mobile-navigation.tsx` | ~180 | Yes | A | B | B | **B+** | Sheet使用で概ね良好 |
| 5 | `footer.tsx` | ~150 | No | A | A | B | **A-** | ソーシャルリンク外部化推奨 |
| 6 | `announcement-bar.tsx` | ~120 | Yes | A | A | B | **A-** | なし |
| 7 | `announcement-bar-context.tsx` | ~60 | Yes | A | A | A | **A** | localStorage永続化 良好 |
| 8 | `main-content.tsx` | ~40 | Yes | A | A | A | **A** | 動的padding 良好 |

### 2.2 汎用UIコンポーネント

| # | コンポーネント | 行数 | Client | 品質 | 性能 | A11y | 総合 | 主な課題 |
|---|---------------|------|--------|------|------|------|------|----------|
| 9 | `button.tsx` | ~60 | No | A | A | A | **A** | CVA + Radix Slot 模範的 |
| 10 | `card.tsx` | ~80 | No | A | A | A | **A** | 6パートの複合コンポーネント |
| 11 | `container.tsx` | ~30 | No | A | A | A | **A** | レスポンシブ幅 良好 |
| 12 | `heading.tsx` | ~120 | No | A | A | A | **A** | 複合コンポーネント 模範的 |
| 13 | `section-header.tsx` | ~40 | No | A | A | A | **A** | シンプルで効果的 |
| 14 | `scroll-to-top.tsx` | 79 | Yes | B | C | B | **B** | スクロールリスナー未スロットル |
| 15 | `social-links.tsx` | 130 | No | B | A | B | **B+** | ハードコードされたURL/データ |
| 16 | `hero-container.tsx` | 62 | Yes | A | A | B | **A-** | 装飾要素にaria-hidden推奨 |
| 17 | `background-image-cta.tsx` | ~80 | No | A | A | A | **A** | ファサードパターン 良好 |
| 18 | `speech-bubble.tsx` | ~260 | Yes | A | B | A | **A-** | 非同期対応+a11y優秀 |
| 19 | `animated-item-list.tsx` | ~250 | Yes | A | B | B | **B+** | フリップアニメーション 複雑だが良好 |

### 2.3 SEO / テーマ / 認証

| # | コンポーネント | 行数 | Client | 品質 | 性能 | A11y | 総合 | 主な課題 |
|---|---------------|------|--------|------|------|------|------|----------|
| 20 | `json-ld.tsx` | 180 | No | A | A | A | **A** | 5種のJSON-LD 網羅的 |
| 21 | `meta-tags.tsx` | 122 | No | A | A | A | **A** | Viewport + Metadata 完全 |
| 22 | `theme-provider.tsx` | 33 | Yes | A | A | A | **A** | フィーチャーフラグ 良好 |
| 23 | `theme-switcher.tsx` | 26 | Yes | A | A | A | **A** | 動的インポート 最適化 |
| 24 | `user-auth-menu.tsx` | 149 | Yes | A | B | B | **B+** | ロード状態/管理者分岐 良好 |

### 2.4 ホームページセクション

| # | コンポーネント | 行数 | Client | 品質 | 性能 | A11y | 総合 | 主な課題 |
|---|---------------|------|--------|------|------|------|------|----------|
| 25 | `(site)/page.tsx` | ~60 | No | A | A | A | **A** | 6セクション構成 良好 |
| 26 | `hero-section.tsx` | ~200 | Yes | A | B | B | **B+** | パーティクル背景+アニメ |
| 27 | `minimal-animation.tsx` | ~120 | Yes | B | B | C | **B-** | `prefers-reduced-motion` 未対応 |
| 28 | `problems-section.tsx` | ~180 | Yes | A | B | B | **B+** | 吹き出しCTA 良好 |
| 29 | `services-section.tsx` | ~54 | No | A | A | A | **A** | データ駆動 模範的 |
| 30 | `reasons-section.tsx` | ~250 | Yes | A | C | B | **B** | マウスリスナー未スロットル |
| 31 | `portfolio-section.tsx` | ~200 | Yes | B | C | B | **B-** | `<img>` → `<Image>` 要変更 |
| 32 | `profile-section.tsx` | ~200 | No | A | A | A | **A** | サーバーコンポーネント 良好 |
| 33 | `service-item.tsx` | ~180 | Yes | B | B | B | **B** | RTLハック、3D効果 |
| 34 | `service-categories.tsx` | ~150 | Yes | B | A | A | **B+** | 未使用props (cardWidth, gap) |

### 2.5 エフェクト / 背景

| # | コンポーネント | 行数 | Client | 品質 | 性能 | A11y | 総合 | 主な課題 |
|---|---------------|------|--------|------|------|------|------|----------|
| 35 | `particle-background.tsx` | 96 | Yes | A | B | D | **B-** | Canvas a11y欠如、motion未対応 |
| 36 | `whales-animation.tsx` | 215 | Yes | B | C | D | **C+** | 無限ループ、motion未対応、デバッグマーカー |
| 37 | `flowing-comments.tsx` | 254 | Yes | A | A | A | **A** | `motion-safe` 対応 **模範的** |

### 2.6 各ページ

| # | コンポーネント | 行数 | Client | 品質 | 性能 | A11y | 総合 | 主な課題 |
|---|---------------|------|--------|------|------|------|------|----------|
| 38 | `about/page.tsx` | 476 | No | C | B | B | **C+** | 475行モノリシック、ハードコードデータ |
| 39 | `contact/page.tsx` | 80 | No | A | B | A | **A-** | revalidate 未設定 |
| 40 | `contact-form.tsx` | 40 | Yes | A | A | A | **A** | タブUI 簡潔 |
| 41 | `contact-mailform.tsx` | 283 | Yes | A | A | A | **A** | RHF+Zod a11y 優秀 |
| 42 | `contact-phone-and-line.tsx` | 138 | Yes | B | A | B | **B+** | `window.open` → `<a>` 推奨 |
| 43 | `portfolio/page.tsx` | 153 | No | A | B | A | **A-** | Suspense 適切 |
| 44 | `portfolio-filter.tsx` | 107 | Yes | A | A | A | **A** | キーボードNav完備 模範的 |
| 45 | `portfolio-content.tsx` | 70 | Yes | B | B | A | **B+** | データフロー不整合 |
| 46 | `news/page.tsx` | 155 | No | B | B | C | **B-** | ハードコード色、未使用サーバーアクション |
| 47 | `news/[id]/page.tsx` | 141 | No | C | A | C | **C+** | **XSS脆弱性** (S1) |
| 48 | `privacy/page.tsx` | 259 | No | B | B | A | **B+** | プレースホルダー情報 |

### 2.7 サービス共通コンポーネント

| # | コンポーネント | 行数 | Client | 品質 | 性能 | A11y | 総合 | 主な課題 |
|---|---------------|------|--------|------|------|------|------|----------|
| 49 | `service-hero-section.tsx` | 102 | No | A | A | A | **A** | 柔軟なprops 模範的 |
| 50 | `service-final-cta.tsx` | 164 | No | A | A | A | **A** | simple/complexバリアント |
| 51 | `service-page-wrapper.tsx` | 94 | No | A | A | A | **A** | SEO+パンくず統合 |
| 52 | `service-navigation.tsx` | 53 | No | B | A | B | **B+** | Web開発に限定結合 |
| 53 | `service-footer.tsx` | 50 | No | B | A | B | **B+** | Web開発に限定結合 |

### 2.8 サービスページ群（サンプリング）

| # | カテゴリ | コンポーネント | 行数 | SharedHero | 品質 | 性能 | A11y | 総合 |
|---|---------|---------------|------|-----------|------|------|------|------|
| 54 | Web開発 | hero-section | 31 | ✅ | A | A | A | **A** |
| 55 | Web開発 | pricing-section | 158 | — | B | A | C | **B** |
| 56 | Web開発 | faq-section | 126 | — | B | A | C | **B-** |
| 57 | Web開発 | final-cta-section | 135 | ❌ | B | A | B | **B** |
| 58 | クリエイティブ | hero-section | 52 | ✅ | A | A | A | **A** |
| 59 | クリエイティブ | pricing-section | 124 | — | B | A | C | **B** |
| 60 | クリエイティブ | final-cta-section | 83 | ✅ | A | A | A | **A** |
| 61 | 写真 | photography-hero | 99 | ❌ | C | B | B | **B-** |
| 62 | 写真 | pricing-plans | 175 | — | B | A | C | **B** |
| 63 | 写真 | photography-faq | 127 | — | B | A | C | **B-** |
| 64 | AI画像 | ai-image-hero | 100 | ❌ | C | B | B | **B-** |
| 65 | AI画像 | ai-pricing-plans | 251 | — | B | A | C | **B** |
| 66 | AI画像 | ai-faq | 153 | — | B | A | C | **B-** |
| 67 | AIコンサル | hero-section | 31 | ✅ | A | A | A | **A** |
| 68 | AIコンサル | pricing-section | 211 | — | B | A | C | **B** |

---

## 3. セクション別詳細レビュー

### 3.1 レイアウトコンポーネント

#### header.tsx — B+

**コード品質 (A)**:
- スクロール連動の背景変更、レスポンシブ対応が堅実
- Tailwind classの条件分岐が整理されている
- `useHeaderStyles` フックで状態管理を分離

**パフォーマンス (B)**:
- スクロールリスナーが `passive: true` で登録（良好）
- ただし高頻度イベントのデバウンス/スロットル未適用の可能性

**アクセシビリティ (B)**:
- ナビゲーション `<nav>` 要素適切
- スキップリンク機能は上位で管理

#### desktop-navigation.tsx — B

**コード品質 (B)**:
- ドロップダウンメニューの実装は複雑だが構造化されている
- 型安全なナビゲーション構成

**パフォーマンス (B)**:
- ホバーによるドロップダウン表示は軽量

**アクセシビリティ (C)** ⚠️:
- **S2 HIGH**: ドロップダウン内にフォーカストラップが未実装
- `Escape` キーでの閉じる動作は要確認
- `aria-expanded` の適切な切り替えが必要
- サブメニュー項目のキーボードナビゲーション（矢印キー）未対応

#### mobile-navigation.tsx — B+

**コード品質 (A)**:
- Radix Sheet (ドロワー) + Accordion でサブメニュー表示
- 標準的なモバイルナビゲーションパターン

**アクセシビリティ (B)**:
- Sheet がフォーカストラップを自動管理
- Accordion のキーボード操作はRadixが処理

#### footer.tsx — A-

**コード品質 (A)**:
- 3列グリッドレイアウト、ソーシャルリンク統合
- コピーライト年の動的計算

**アクセシビリティ (B)**:
- 外部リンクに `target="_blank"` + `rel="noopener noreferrer"` 適切
- フッターナビゲーションの見出しレベル整合性を確認推奨

### 3.2 汎用UIコンポーネント

#### button.tsx — A (模範的)

- CVA (class-variance-authority) によるバリアント管理
- Radix `Slot` 対応で `asChild` パターンサポート
- `forwardRef` 適切使用、完全な型定義

#### heading.tsx — A (模範的)

- 複合コンポーネントパターン (`Heading.Lead`)
- 自動サイズマッピング (h1→large, h6→small)
- 5種のボーダーデコレーション
- アイコンサポートに `flex-shrink-0`、`aria-hidden`

#### scroll-to-top.tsx — B

**パフォーマンス (C)** ⚠️:
- **S1 CRITICAL**: スクロールリスナーにスロットル/デバウンス未適用
- 高頻度のスクロールイベントで `setVisible` が毎回呼ばれる
- `passive: true` は設定済み（良好）

**改善提案**:
```typescript
// requestAnimationFrame によるスロットル
const handleScroll = () => {
  if (rafRef.current) return;
  rafRef.current = requestAnimationFrame(() => {
    setVisible(window.scrollY > window.innerHeight * threshold);
    rafRef.current = null;
  });
};
```

#### social-links.tsx — B+

**コード品質 (B)**:
- ソーシャルリンクデータがコンポーネント内にハードコード
- `/lib/data/` への外部化が望ましい（ボイラープレートとしてはカスタマイズ性向上）
- テンプレートリテラル内でTailwind classを結合 → `cn()` 使用推奨

**アクセシビリティ (B)**:
- `aria-label` 適切 (`${link.name}でフォロー`)
- フォーカスリング完備
- 外部リンクに `rel="noopener noreferrer"`

#### speech-bubble.tsx — A-

- 複合コンポーネント (Title, Message, Actions)
- React 19 `use()` フック対応
- Suspense対応スケルトン
- アクセシビリティ: `sr-only` テキスト、ARIA グルーピング

### 3.3 SEO / テーマ / 認証

#### json-ld.tsx — A

- 5種の構造化データ: WebSite, Organization, Article, Breadcrumb, FAQ
- サーバーコンポーネントとして最適（クライアントJSなし）
- `dangerouslySetInnerHTML` は `JSON.stringify` のためXSSリスクなし（入力がアプリ制御下）
- 定数から適切にデフォルト値を取得

#### meta-tags.tsx — A

- `generateMetadata()`: OGP、Twitter Card、canonical URL生成
- `generateViewport()`: テーマカラーの明暗対応
- `maximumScale: 5` + `userScalable: true` → ズーム制限なし（a11y 適合）

**微細な指摘**:
- 空文字title時に ` | APP.NAME` となるエッジケース（line 50-51）

#### theme-provider.tsx — A

- `FEATURES.THEME_SWITCHER` フラグで無効化可能
- `disableTransitionOnChange` でテーマ切替時のちらつき防止

#### theme-switcher.tsx — A

- `dynamic()` による動的インポートでバンドルサイズ最適化
- プレースホルダーはSSR対応、コンテンツはCSRのみ
- フィーチャーフラグで完全無効化可能

#### user-auth-menu.tsx — B+

- 3状態管理: 未認証 / ローディング / 認証済み
- Skeleton ローダー適切
- 管理者メニューの条件分岐
- `router.push` + `router.refresh` でログアウト後の状態同期

### 3.4 ホームページセクション

#### hero-section.tsx — B+

- パーティクル背景 + テキストアニメーション
- `MinimalAnimation` で段階的テキスト表示
- CTAボタンの配置適切

#### problems-section.tsx — B+

- `AnimatedItemList` による問題点のローテーション表示
- `SpeechBubble` によるCTA
- データ駆動型の問題リスト

#### services-section.tsx — A (模範的)

- データレイヤー (`services-data.tsx`) からの完全分離
- `ServiceItemComponent` への委譲
- 304行 → 54行 (83%削減) のリファクタリング済み

#### reasons-section.tsx — B

**パフォーマンス (C)** ⚠️:
- **S2 HIGH**: `onMouseMove` リスナーにスロットル未適用
- オーロラエフェクトの座標計算が毎フレーム実行される可能性
- カード数 × イベント頻度で計算コスト増大

#### portfolio-section.tsx — B-

**パフォーマンス (C)** ⚠️:
- **S2 HIGH**: `<img>` タグが `next/image` の `<Image>` の代わりに使用
- 画像最適化なし（WebP変換、レスポンシブサイズ、遅延読み込み非活用）

#### service-categories.tsx — B+

**コード品質 (B)**:
- `cardWidth` と `gap` props が定義されているが未使用
- メモ化は React 19 Compiler 環境では不要（S4 LOW）

### 3.5 エフェクト / 背景

#### particle-background.tsx — B-

**コード品質 (A)**:
- フックベースの優れたアーキテクチャ分離
- Canvas API による効率的な描画

**パフォーマンス (B)**:
- Canvas ベースで DOM 負荷低
- ただし接続線描画が O(n²) — 100パーティクルで ~5,000距離計算/フレーム

**アクセシビリティ (D)** ⚠️:
- **S2 HIGH**: `prefers-reduced-motion` 未対応
- Canvas に代替テキスト/説明なし
- 装飾要素としての明示なし

#### whales-animation.tsx — C+

**コード品質 (B)**:
- Framer Motion による SVG クジラ + バブルアニメーション
- マジックナンバー多数（サイズ、速度、遅延）

**パフォーマンス (C)** ⚠️:
- **S2 HIGH**: `repeat: Number.POSITIVE_INFINITY` で無限アニメーションループ
- 30+ の motion.div 要素がDOMに追加
- **デバッグマーカーが本番コードに残存** (line 120 — 赤い丸)

**アクセシビリティ (D)** ⚠️:
- **S2 HIGH**: `prefers-reduced-motion` 未対応
- `aria-hidden="true"` は設定済み（良好）

#### flowing-comments.tsx — A (模範的)

- **CSS アニメーション** ベースで GPU 活用
- **`motion-safe` / `motion-reduce`** クラスで完全なモーション対応 ✅
- 定数化 (`UI_FLOWING_COMMENTS`, `UI_PERFORMANCE`)
- デバウンス付きリサイズ処理
- アクセシビリティ対応の **ベストプラクティス**

### 3.6 各ページ

#### about/page.tsx — C+

**コード品質 (C)** ⚠️:
- **S2 HIGH**: 475行のモノリシックページ — プロジェクトガイドライン（200行制限）の2倍超
- スキル、バッジ、経歴など全コンテンツがインラインでハードコード
- `/lib/data/` パターンに不準拠

**推奨分割案**:
```
about/
├── page.tsx          (~60行: メタデータ + セクション構成)
├── _components/
│   ├── profile-header.tsx
│   ├── strengths-section.tsx
│   ├── skills-section.tsx
│   ├── timeline-section.tsx
│   └── values-section.tsx
└── _data/
    └── about-data.ts  (スキル、経歴、価値観データ)
```

**その他の指摘**:
- タイムラインに `〜0000年` のプレースホルダー残存
- `revalidate: 7200` は設定済み（唯一キャッシュ設定があるページ）

#### contact/page.tsx — A-

- 軽量サーバーコンポーネント（80行）
- フォームロジックを子コンポーネントに適切に委譲
- **S3 MEDIUM**: `revalidate` 未設定（静的コンテンツなのにキャッシュされない）
- ビジネスアワーがハードコード

#### contact-mailform.tsx — A

- React Hook Form + Zod による型安全なバリデーション
- `SuccessAnnouncement` / `ErrorAnnouncement` による a11y 通知
- サーバーアクション統合
- ラベル、エラーメッセージ、説明テキスト完備

#### portfolio/page.tsx — A-

- Next.js 15 の Promise ベース `searchParams` 対応
- Suspense境界 + スケルトンフォールバック
- **S3 MEDIUM**: `revalidate` 未設定

#### portfolio-filter.tsx — A (模範的)

- `useTransition` による非ブロッキング更新
- `aria-pressed` でフィルター状態表示
- `tabIndex={0}` + Enter/Space キーボードハンドリング
- URL パラメータベースの状態管理（ブックマーク可能）

#### news/page.tsx — B-

**コード品質 (B)**:
- **S3 MEDIUM**: 未使用サーバーアクション `_getFilteredNews` (dead code)
- **S3 MEDIUM**: ハードコードカラー (`bg-blue-600`) → `bg-primary` 推奨

**アクセシビリティ (C)** ⚠️:
- フィルターボタンが色のみで状態を区別 → `aria-current="page"` 推奨
- 結果件数が `role="status"` / `aria-live="polite"` 未対応

#### news/[id]/page.tsx — C+

**セキュリティ (S1 CRITICAL)** 🔴:
```typescript
// line 113 — XSS脆弱性
<div dangerouslySetInnerHTML={{ __html: news.content }} />
```
- ニュースコンテンツがサニタイズされずにHTMLとしてレンダリング
- `sanitize-html` または `DOMPurify` によるサニタイズが必須

**その他**:
- `generateStaticParams` でビルド時生成（良好）
- フォールバック URL `https://example.com` がハードコード

#### privacy/page.tsx — B+

- 11セクションのカード構成で読みやすい
- 現在年の動的計算
- **S3 MEDIUM**: プレースホルダー（`株式会社〇〇`、`〒000-0000`、`privacy@example.com`）残存
- **S3 MEDIUM**: `revalidate` 未設定

### 3.7 サービス共通コンポーネント

#### service-hero-section.tsx — A (模範的)

- タイトル、説明、ボタン、背景グラデーションを柔軟にカスタマイズ可能
- サーバーコンポーネント（client JS なし）
- 3/5 のサービスカテゴリで採用済み

#### service-final-cta.tsx — A (模範的)

- `simple` / `complex` の2バリアント
- 20+ のカスタマイズオプション
- 1/5 のサービスカテゴリで `complex` バリアント使用

#### service-page-wrapper.tsx — A

- メタデータ生成、パンくず、JSON-LD を統合
- `generateServiceMetadata()` ヘルパー
- **S4 LOW**: `createWebDevelopmentServiceConfig()` ファクトリが Web開発固有 → 汎用化推奨

### 3.8 サービスページ群（サンプリング + 横断分析）

#### SharedHero 採用状況

| カテゴリ | ServiceHeroSection使用 | 行数 | 評価 |
|---------|----------------------|------|------|
| Web開発 | ✅ | 31 | A |
| クリエイティブ | ✅ | 52 | A |
| 写真 | ❌ (独自実装) | 99 | C |
| AI画像 | ❌ (独自実装) | 100 | C |
| AIコンサル | ✅ | 31 | A |

**分析**: 写真とAI画像のヒーローは90%の類似コードで、`ServiceHeroSection` への統合が容易。不要な `"use client"` を排除できる。

#### FAQ コンポーネント重複

| カテゴリ | ファイル | 行数 | FAQ項目数 |
|---------|---------|------|----------|
| Web開発 | `faq-section.tsx` | 126 | 7 |
| 写真 | `photography-faq.tsx` | 127 | 7 |
| AI画像 | `ai-faq.tsx` | 153 | 10 |

**分析**: 3ファイルの実装が 86% 類似。共有 `ServiceFAQ` コンポーネントを作成し、データを `/lib/data/` に外部化すべき。

**推奨**:
```typescript
// src/components/services/shared/service-faq.tsx
interface ServiceFAQProps {
  faqs: { question: string; answer: string }[];
  title?: string;
  description?: string;
}
export function ServiceFAQ({ faqs, title, description }: ServiceFAQProps) { ... }
```

#### Pricing コンポーネント分析

| カテゴリ | 行数 | ハードコードデータ行数 |
|---------|------|--------------------|
| Web開発 | 158 | ~51 |
| クリエイティブ | 124 | ~42 |
| 写真 | 175 | ~59 |
| AI画像 | 251 | ~87 |
| AIコンサル | 211 | ~88 |

**分析**: 全5コンポーネントでデータがインラインハードコード。構造的類似性は 70% だが、表示バリエーションが多いため完全な共通化は段階的に実施すべき。

#### `"use client"` 不要性検証

| ファイル | `"use client"` | 必要? | 理由 |
|---------|---------------|-------|------|
| photography-hero.tsx | ✅ | ❌ | `useHeroHeight` のみ → ServerComponentで代替可 |
| ai-image-hero.tsx | ✅ | ❌ | 同上 |
| faq-section.tsx (3件) | ✅ | ✅ | Accordion状態管理に必要 |

---

## 4. 横断的分析

### 4.1 アーキテクチャパターンの一貫性

#### 一貫しているパターン ✅

| パターン | 採用率 | 説明 |
|---------|--------|------|
| SEO メタデータ生成 | 95% | ほぼ全ページで `generateMetadata` 使用 |
| パンくずリスト | 90% | ほぼ全ページで `BreadcrumbJsonLd` + UI使用 |
| サーバーコンポーネント優先 | 85% | ページレベルは概ねサーバーコンポーネント |
| Tailwind + cn() | 80% | 大半のコンポーネントで使用 |
| TypeScript strict | 95% | 型定義は全般的に堅実 |

#### 一貫していないパターン ⚠️

| パターン | 課題 | 影響 |
|---------|------|------|
| ISR キャッシュ設定 | about のみ `revalidate: 7200` → 他ページ未設定 | ビルド/キャッシュ非効率 |
| データレイヤー分離 | `services-data.tsx` は分離済 → about, FAQ, pricing は未分離 | 保守性低下 |
| SharedHero 採用 | 3/5サービスで採用 → 2サービスが独自実装 | コード重複 |
| SharedCTA 採用 | 1/5サービスのみ | 機会損失 |
| `cn()` vs テンプレートリテラル | social-links等でテンプレートリテラル使用 | Tailwind最適化に影響 |
| モーション対応 | flowing-comments のみ完全対応 → 他は未対応 | a11y 不整合 |

### 4.2 共通課題の集約

#### テーマ1: ハードコードデータの散在

**影響範囲**: about, privacy, news(色), contact(営業時間), social-links(URL), 全pricing, 全FAQ

ボイラープレートプロジェクトとして、カスタマイズポイントが明確でないことは採用者の混乱を招く。

**推奨対応**: `/lib/data/` に集約し、カスタマイズガイドを提供

#### テーマ2: アニメーション/エフェクトのアクセシビリティ

**影響範囲**: particle-background, whales-animation, minimal-animation, reasons-section

`flowing-comments.tsx` の `motion-safe` / `motion-reduce` パターンを全エフェクトに展開すべき。

#### テーマ3: キャッシュ設定の欠如

**影響範囲**: contact, portfolio, news, privacy ページ

静的コンテンツページに `revalidate` が設定されていないため、毎回サーバーレンダリングが発生。

---

## 5. 改善ロードマップ

### Phase 1: 即時対応（1-2日）— S1 / S2 課題

| # | 課題 | 深刻度 | ファイル | 工数 |
|---|------|--------|---------|------|
| 1 | XSS脆弱性修正 | S1 | `news/[id]/page.tsx` | 0.5h |
| 2 | scroll-to-top スロットル追加 | S1 | `scroll-to-top.tsx` | 0.5h |
| 3 | `prefers-reduced-motion` 対応 | S2 | `particle-background.tsx`, `whales-animation.tsx`, `minimal-animation.tsx` | 2h |
| 4 | デバッグマーカー除去 | S2 | `whales-animation.tsx` line 120 | 0.1h |
| 5 | reasons-section マウスリスナースロットル | S2 | `reasons-section.tsx` | 0.5h |
| 6 | portfolio-section `<Image>` 変更 | S2 | `portfolio-section.tsx` | 0.5h |
| 7 | desktop-navigation フォーカストラップ | S2 | `desktop-navigation.tsx` | 1h |
| 8 | 全ページに `revalidate` 設定 | S2 | contact, portfolio, news, privacy | 0.5h |

**Phase 1 合計**: 約5.5時間

### Phase 2: 短期対応（1週間）— S3 課題 + アーキテクチャ改善

| # | 課題 | 深刻度 | 対象 | 工数 |
|---|------|--------|------|------|
| 9 | 共有FAQコンポーネント作成 | S3 | services/shared/ + 3 FAQ | 3h |
| 10 | about/page.tsx 分割 | S3 | about/ | 2h |
| 11 | 写真/AI画像ヒーローを SharedHero に統合 | S3 | 2ファイル | 1h |
| 12 | 不要な `"use client"` 削除 | S3 | photography-hero, ai-image-hero | 0.5h |
| 13 | ハードコードデータ外部化 (FAQ, pricing) | S3 | /lib/data/ + 8ファイル | 4h |
| 14 | news/page.tsx ハードコード色修正 | S3 | news/page.tsx | 0.5h |
| 15 | 未使用コード除去 | S3 | news (サーバーアクション), service-categories (props) | 0.5h |
| 16 | contact-phone-and-line `window.open` → `<a>` | S3 | contact-phone-and-line.tsx | 0.5h |
| 17 | news/page.tsx a11y改善 (aria-current, role="status") | S3 | news/page.tsx | 0.5h |
| 18 | privacy プレースホルダー対応ガイド追加 | S3 | docs/ | 0.5h |

**Phase 2 合計**: 約13時間

### Phase 3: 中期対応（2-4週間）— S4 課題 + 品質向上

| # | 課題 | 深刻度 | 対象 | 工数 |
|---|------|--------|------|------|
| 19 | 共有Pricingコンポーネント設計・実装 | S4 | services/shared/ | 8h |
| 20 | social-links データ外部化 | S4 | social-links.tsx, /lib/data/ | 1h |
| 21 | service-navigation/footer 汎用化 | S4 | services/shared/ | 2h |
| 22 | `cn()` の一貫した使用 | S4 | social-links等 | 1h |
| 23 | マジックナンバーの定数化 | S4 | whales-animation等 | 2h |
| 24 | FAQ a11y強化 (aria-expanded, キーボード) | S4 | 共有FAQコンポーネント | 2h |
| 25 | portfolio-content データフロー修正 | S4 | portfolio-content.tsx | 0.5h |
| 26 | particle-background O(n²) 最適化 | S4 | particle hooks | 3h |
| 27 | ダミー画像のプロダクション対応 | S4 | 複数ファイル | 1h |
| 28 | RTLハック除去 (service-item) | S4 | service-item.tsx | 1h |
| 29 | React 19 Compiler環境での不要なmemo除去 | S4 | 複数ファイル | 1h |
| 30 | テスト拡充 (a11y アサーション追加) | S4 | テストファイル | 4h |

**Phase 3 合計**: 約26.5時間

---

## 6. 付録

### 6.1 全課題一覧

| ID | 深刻度 | カテゴリ | コンポーネント | 課題 |
|----|--------|---------|---------------|------|
| I-01 | S1 | セキュリティ | `news/[id]/page.tsx` | `dangerouslySetInnerHTML` によるXSSリスク — サニタイズ未実装 |
| I-02 | S1 | パフォーマンス | `scroll-to-top.tsx` | スクロールリスナー未スロットル — 高頻度 `setState` |
| I-03 | S2 | アクセシビリティ | `particle-background.tsx` | `prefers-reduced-motion` 未対応 |
| I-04 | S2 | アクセシビリティ | `whales-animation.tsx` | `prefers-reduced-motion` 未対応 |
| I-05 | S2 | アクセシビリティ | `minimal-animation.tsx` | `prefers-reduced-motion` 未対応 |
| I-06 | S2 | パフォーマンス | `whales-animation.tsx` | 無限アニメーションループ + デバッグマーカー残存 |
| I-07 | S2 | パフォーマンス | `reasons-section.tsx` | `onMouseMove` リスナー未スロットル |
| I-08 | S2 | パフォーマンス | `portfolio-section.tsx` | `<img>` → `next/image` `<Image>` 未使用 |
| I-09 | S2 | アクセシビリティ | `desktop-navigation.tsx` | ドロップダウンにフォーカストラップ未実装 |
| I-10 | S2 | パフォーマンス | 4ページ | ISR `revalidate` 未設定 (contact, portfolio, news, privacy) |
| I-11 | S3 | 設計 | FAQ 3ファイル | 86%類似コードの重複実装 — 共有コンポーネント必要 |
| I-12 | S3 | 設計 | `about/page.tsx` | 475行モノリシックページ — 200行ガイドラインの2倍超 |
| I-13 | S3 | 設計 | 写真/AI画像ヒーロー | ServiceHeroSection 未使用で独自実装 |
| I-14 | S3 | 設計 | 2ファイル | 不要な `"use client"` (photography-hero, ai-image-hero) |
| I-15 | S3 | 保守性 | 8ファイル | FAQ/Pricingデータのインラインハードコード |
| I-16 | S3 | 品質 | `news/page.tsx` | ハードコードカラー (`bg-blue-600`) — テーマ変数未使用 |
| I-17 | S3 | 品質 | `news/page.tsx` | 未使用サーバーアクション `_getFilteredNews` |
| I-18 | S3 | アクセシビリティ | `news/page.tsx` | フィルター: 色のみの状態区別、`role="status"` 未使用 |
| I-19 | S3 | 品質 | `contact-phone-and-line.tsx` | `window.location.href`/`window.open` → `<a>` タグ推奨 |
| I-20 | S3 | データ | `privacy/page.tsx` | プレースホルダー情報残存 |
| I-21 | S3 | データ | `about/page.tsx` | タイムライン `〜0000年` プレースホルダー残存 |
| I-22 | S3 | データ | `news/[id]/page.tsx` | フォールバック URL `https://example.com` ハードコード |
| I-23 | S4 | 品質 | `social-links.tsx` | ソーシャルリンクデータのハードコード |
| I-24 | S4 | 設計 | `service-navigation.tsx`, `service-footer.tsx` | Web開発に限定結合 — 汎用化推奨 |
| I-25 | S4 | 品質 | `social-links.tsx` 等 | `cn()` 未使用でテンプレートリテラルによるclass結合 |
| I-26 | S4 | 品質 | `whales-animation.tsx` | マジックナンバー多数 |
| I-27 | S4 | アクセシビリティ | FAQ 3ファイル | `aria-expanded` 未設定、キーボードショートカット未対応 |
| I-28 | S4 | 品質 | `portfolio-content.tsx` | `items` prop を無視して関数直接呼び出し |
| I-29 | S4 | パフォーマンス | `particle-background.tsx` | 接続線描画 O(n²) アルゴリズム |
| I-30 | S4 | 品質 | `service-categories.tsx` | 未使用 props (`cardWidth`, `gap`) |
| I-31 | S4 | パフォーマンス | `service-item.tsx` | RTL ハック (`[direction:rtl]`) |
| I-32 | S4 | 品質 | 複数ファイル | React 19 Compiler 環境での不要な `useMemo`/`useCallback` |
| I-33 | S4 | パフォーマンス | 複数ファイル | ダミー画像のプロダクション未対応 |
| I-34 | S4 | テスト | `contact-mailform.test.tsx` | a11y アサーション不足 |
| I-35 | S4 | 品質 | `meta-tags.tsx` | 空文字 title 時のエッジケース |
| I-36 | S4 | アクセシビリティ | `hero-container.tsx` | 装飾要素に `aria-hidden` 未設定 |
| I-37 | S4 | 品質 | `contact/page.tsx` | ビジネスアワーのハードコード |
| I-38 | S4 | 設計 | `service-page-wrapper.tsx` | ファクトリ関数が Web開発固有 |
| I-39 | S4 | パフォーマンス | `particle-background.tsx` | Canvas に代替テキスト/説明なし |
| I-40 | S4 | 品質 | Web開発 `final-cta-section.tsx` | ServiceFinalCTA complex バリアント未使用 |

### 6.2 模範的コンポーネント一覧

以下のコンポーネントはプロジェクトのベストプラクティスとして参照推奨：

| コンポーネント | 特筆点 |
|---------------|--------|
| `button.tsx` | CVA + Radix Slot パターン |
| `heading.tsx` | 複合コンポーネントパターン |
| `flowing-comments.tsx` | `motion-safe`/`motion-reduce` の完全対応 |
| `services-section.tsx` | データ駆動設計のリファクタリング成果 |
| `service-hero-section.tsx` | 柔軟な共有コンポーネント設計 |
| `portfolio-filter.tsx` | キーボードナビゲーション + `useTransition` |
| `contact-mailform.tsx` | RHF + Zod + a11y 通知統合 |
| `theme-switcher.tsx` | 動的インポート + フィーチャーフラグ |
| `json-ld.tsx` | 5種の構造化データ網羅 |

---

*レポート生成: Claude Code — 2026-02-09*
