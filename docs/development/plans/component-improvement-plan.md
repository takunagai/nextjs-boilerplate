# コンポーネント改善 実装計画書

> **作成日**: 2026-02-09
> **レビューレポート**: `docs/reports/component-review-report.md`
> **ブランチ戦略**: セッション単位でブランチ作成 → main にマージ

---

## 概要

レビューレポートで検出された40件の課題を3セッションに分割して実装する。
各セッションは独立したブランチで作業し、完了後に main にマージする。

---

## Session A: セキュリティ・パフォーマンス・アクセシビリティ即時修正

**ブランチ**: `fix/critical-component-issues`
**工数目安**: 4〜5時間
**対象課題**: I-01, I-02, I-03〜05, I-06, I-07, I-08, I-10（計10件）

### セッション開始時の指示プロンプト

```
docs/development/plans/component-improvement-plan.md の Session A を実装して。
各タスクを順番に実施し、全完了後にビルド確認して。
ブランチ fix/critical-component-issues を作成して作業して。
```

---

### A-1. XSS脆弱性修正 [I-01 / S1 CRITICAL]

**ファイル**: `src/app/(site)/news/[id]/page.tsx` (line 113)

**現状コード**:
```tsx
// line 110-114
{news.content ? (
  <div
    className="prose prose-slate dark:prose-invert max-w-none"
    dangerouslySetInnerHTML={{ __html: news.content }}
  />
```

**修正手順**:
1. `sanitize-html` パッケージをインストール
   ```bash
   npm install sanitize-html
   npm install -D @types/sanitize-html
   ```
2. サニタイズユーティリティを作成
   ```
   src/lib/security/sanitize.ts
   ```
   - 許可タグ: `h1-h6, p, a, ul, ol, li, strong, em, code, pre, blockquote, img, br, hr, table, thead, tbody, tr, th, td`
   - 許可属性: `href, src, alt, class, id, target, rel`
   - `a` タグに自動で `rel="noopener noreferrer"` 付与
3. `news/[id]/page.tsx` で `sanitizeHtml()` を呼び出してからレンダリング

**検証**: ビルド成功 + HTML タグが適切にフィルタリングされること

---

### A-2. scroll-to-top スロットル追加 [I-02 / S1 CRITICAL]

**ファイル**: `src/components/ui/scroll-to-top.tsx` (line 30-50)

**現状コード**:
```tsx
// line 31-37 — 毎スクロールイベントで setState
const handleScroll = () => {
  const scrollThreshold = window.innerHeight * threshold;
  const currentScrollY = window.scrollY;
  setVisible(currentScrollY > scrollThreshold);
};
```

**修正手順**:
1. `useRef` で RAF ID を管理
2. `requestAnimationFrame` ベースのスロットルに変更
3. クリーンアップで `cancelAnimationFrame` を呼ぶ

**修正後イメージ**:
```tsx
const rafRef = React.useRef<number | null>(null);

React.useEffect(() => {
  const handleScroll = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      const scrollThreshold = window.innerHeight * threshold;
      setVisible(window.scrollY > scrollThreshold);
      rafRef.current = null;
    });
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", handleScroll);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
  };
}, [threshold]);
```

**検証**: ボタンの表示/非表示が正常に動作すること

---

### A-3. デバッグマーカー除去 [I-06 / S2 HIGH]

**ファイル**: `src/components/background/whales-animation.tsx` (line 119-120)

**現状コード**:
```tsx
{/* デバッグ用マーカー */}
<div className="absolute top-20 right-4 w-3 h-3 bg-red-500 rounded-full opacity-50" />
```

**修正手順**: line 119-120 の2行を削除

**検証**: ビルド成功

---

### A-4. revalidate 設定追加 [I-10 / S2 HIGH]

**対象ファイル** (4件):

| ファイル | 追加する値 | 理由 |
|---------|-----------|------|
| `src/app/(site)/contact/page.tsx` | `export const revalidate = 7200;` | 静的コンテンツ（2時間） |
| `src/app/(site)/portfolio/page.tsx` | `export const revalidate = 7200;` | 静的コンテンツ（2時間） |
| `src/app/(site)/news/page.tsx` | `export const revalidate = 3600;` | 更新頻度やや高め（1時間） |
| `src/app/(site)/privacy/page.tsx` | `export const revalidate = 7200;` | 静的コンテンツ（2時間） |

**修正手順**: 各ファイルの `import` 文の直後（メタデータ export の前）に1行追加

**参考**: 既存設定 — `about/page.tsx` は `7200`、`page.tsx`（ホーム）は `3600`

**検証**: ビルド成功

---

### A-5. reasons-section マウスリスナースロットル [I-07 / S2 HIGH]

**ファイル**: `src/components/sections/reasons-section.tsx` (line 72-88)

**現状コード**:
```tsx
// line 73-84 — 毎 mousemove イベントで DOM 操作
const handleMouseMove = (e: MouseEvent) => {
  cardsRef.current.forEach((card) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
};
window.addEventListener("mousemove", handleMouseMove);
```

**修正手順**:
1. `requestAnimationFrame` ベースのスロットルを追加
2. マウス座標を `useRef` に保存し、RAF 内で DOM 更新

**修正後イメージ**:
```tsx
const rafRef = useRef<number | null>(null);
const mouseRef = useRef({ x: 0, y: 0 });

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      const { x, y } = mouseRef.current;
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${x - rect.left}px`);
        card.style.setProperty("--mouse-y", `${y - rect.top}px`);
      });
      rafRef.current = null;
    });
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  };
}, []);
```

**検証**: マウスホバーエフェクトが正常に動作すること

---

### A-6. portfolio-section `<img>` → `<Image>` [I-08 / S2 HIGH]

**ファイル**: `src/components/sections/portfolio-section.tsx` (line 53-57)

**現状コード**:
```tsx
// line 53-57
<img
  src={item.image}
  alt={`${item.client} ${item.project}`}
  className="w-full h-full object-cover"
/>
```

**修正手順**:
1. `import Image from "next/image"` を追加
2. `<img>` を `<Image>` に置換
3. `width`, `height` を追加（または `fill` + 親要素に `relative`）
4. 画像パスが外部URLの場合は `next.config` の `images.remotePatterns` に追加

**修正後イメージ**:
```tsx
<Image
  src={item.image}
  alt={`${item.client} ${item.project}`}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
```
※ 親の `div` に `className="relative"` が必要（既に `overflow-hidden` あり）

**検証**: 画像が正常に表示され、WebP 変換が機能すること

---

### A-7. prefers-reduced-motion 対応 [I-03, I-04, I-05 / S2 HIGH]

3コンポーネントにモーション設定を追加する。アプローチはコンポーネントごとに異なる。

#### A-7a. particle-background.tsx [I-03]

**ファイル**: `src/components/background/particle-background.tsx`
**関連フック**: `src/hooks/use-particle-animation.ts`

**アプローチ**: Canvas ベースのため JS で `matchMedia` チェック

**修正手順**:
1. `particle-background.tsx` 内で `useEffect` を使い `prefers-reduced-motion` を検出
2. reduced-motion 時はアニメーションを停止し、静的な初期状態を表示（パーティクルは描画するが動かない）
3. `use-particle-animation.ts` の `animate()` 内で `isReducedMotion` フラグを参照

**修正概要**:
```tsx
// particle-background.tsx に追加
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

useEffect(() => {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  setPrefersReducedMotion(mql.matches);
  const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}, []);

// prefersReducedMotion が true の場合:
// - startAnimation() を呼ばない
// - 初期パーティクル位置のみ描画（1フレームだけ描画して停止）
```

#### A-7b. whales-animation.tsx [I-04]

**ファイル**: `src/components/background/whales-animation.tsx`

**アプローチ**: Framer Motion (`motion/react`) は `useReducedMotion` フックを提供

**修正手順**:
1. `import { useReducedMotion } from "motion/react"` を追加
2. `const shouldReduceMotion = useReducedMotion()` をコンポーネント内で呼ぶ
3. `shouldReduceMotion` が `true` の場合:
   - バブルと鯨のアニメーション `animate` prop を省略するか、`transition.duration` を 0 にする
   - または `null` を返してコンポーネント全体を非表示にする（装飾要素のため）

**推奨**: 装飾エフェクトなので `shouldReduceMotion` 時は `null` を返すのが最もシンプル

```tsx
const shouldReduceMotion = useReducedMotion();
// ...
if (shouldReduceMotion) return null;
```

#### A-7c. minimal-animation.tsx [I-05]

**ファイル**: `src/components/home/minimal-animation.tsx`

**アプローチ**: CSS transition ベースのため CSS + JS 両方で対応

**修正手順**:
1. `matchMedia` で `prefers-reduced-motion` を検出
2. reduced-motion 時は `animationStarted` を即座に `true` にし、transition を無効化
3. テキストは表示するがアニメーション効果（フェード、スライド、ネオングロー）を省略

**修正概要**:
```tsx
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

useEffect(() => {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  setPrefersReducedMotion(mql.matches);
  // reduced-motion の場合は即座に表示
  if (mql.matches) {
    setAnimationStarted(true);
  }
}, []);

// JSX 内: reduced-motion 時は transition を無効化
<span
  className={cn(
    "inline-block text-primary",
    prefersReducedMotion
      ? "opacity-100"
      : `transition-all duration-600 ease-out ${
          animationStarted ? "opacity-100 translate-y-0 animate-neon-glow" : "opacity-0 translate-y-8"
        }`
  )}
  // reduced-motion 時は style の delay も省略
>
```

**検証**: ブラウザの開発者ツールで「モーションの低減を優先」をオンにして確認

---

### Session A コミット戦略

以下の順で3つのコミットに分割する：

1. **セキュリティ修正** (A-1)
   ```
   fix(security): news詳細ページのXSS脆弱性をsanitize-htmlで修正
   ```
2. **パフォーマンス修正** (A-2, A-3, A-5, A-6, A-4)
   ```
   perf: スクロールリスナーのスロットル追加、Image最適化、ISR設定
   ```
3. **アクセシビリティ修正** (A-7a,b,c)
   ```
   a11y: prefers-reduced-motion対応をエフェクト3コンポーネントに追加
   ```

### Session A 完了後の検証

```bash
npm run build      # ビルド成功確認
npm run lint       # 新規エラーが増えていないこと
npm test           # テスト通過確認
```

---

## Session B: アーキテクチャ改善・DRY化

**ブランチ**: `refactor/shared-components`
**工数目安**: 6〜7時間
**対象課題**: I-09, I-11, I-12, I-13, I-14
**前提**: Session A が完了し main にマージ済み

### セッション開始時の指示プロンプト

```
docs/development/plans/component-improvement-plan.md の Session B を実装して。
各タスクを順番に実施し、全完了後にビルド確認して。
ブランチ refactor/shared-components を main から作成して作業して。
```

---

### B-1. 共有FAQコンポーネント作成 + 3ファイル統合 [I-11 / S3 MEDIUM]

**新規作成ファイル**:
- `src/components/services/shared/service-faq.tsx` — 共有コンポーネント

**移行対象** (3ファイル):
| 元ファイル | FAQ項目数 | 行数 |
|-----------|----------|------|
| `src/components/services/web-development/faq-section.tsx` | 7 | 126 |
| `src/components/services/photography/photography-faq.tsx` | 7 | 127 |
| `src/components/services/ai-image/ai-faq.tsx` | 10 | 153 |

**実装手順**:
1. 共有 `ServiceFAQ` コンポーネントを作成
   - Props: `faqs: { question: string; answer: string }[]`, `title?: string`, `description?: string`
   - 内部: Accordion UI（`"use client"` が必要）
   - キーボード対応: `aria-expanded` 属性を適切に設定
2. 各サービスのFAQデータを `/src/lib/data/` に外部化
   - `src/lib/data/web-development-faq.ts`
   - `src/lib/data/photography-faq.ts`
   - `src/lib/data/ai-image-faq.ts`
3. 元の3ファイルを削除し、呼び出し元を `ServiceFAQ` に変更
4. 呼び出し元のページで import パスを更新

**期待される効果**: 406行 → ~80行（共有コンポーネント） + 3データファイル

---

### B-2. 写真/AI画像 ヒーローを ServiceHeroSection に統合 [I-13, I-14 / S3 MEDIUM]

**対象ファイル**:
| ファイル | 行数 | 現状 |
|---------|------|------|
| `src/components/services/photography/photography-hero.tsx` | 99 | 独自実装 + `"use client"` |
| `src/components/services/ai-image/ai-image-hero.tsx` | 100 | 独自実装 + `"use client"` |

**参考**: 既に `ServiceHeroSection` を使用しているファイル
- `src/components/services/web-development/hero-section.tsx` (31行)
- `src/components/services/creative/hero-section.tsx` (52行)
- `src/components/services/consulting/hero-section.tsx` (31行)

**実装手順**:
1. `photography-hero.tsx` の内容を `ServiceHeroSection` の props に変換
   - タイトル、説明文、グラデーション色 → props にマッピング
   - 独自の装飾要素があれば `ServiceHeroSection` の `decorationColors` で対応
   - `"use client"` を削除（サーバーコンポーネント化）
2. 同様に `ai-image-hero.tsx` を変換
3. 呼び出し元のページでの import に影響がないか確認

**期待される効果**: 199行 → ~60行 + `"use client"` 2件削除

---

### B-3. about/page.tsx 分割 [I-12 / S3 MEDIUM]

**ファイル**: `src/app/(site)/about/page.tsx` (475行)

**分割計画**:
```
src/app/(site)/about/
├── page.tsx                    (~60行: メタデータ + セクション構成)
├── _components/
│   ├── profile-header.tsx      (~80行: プロフィール画像+バッジ+概要)
│   ├── strengths-section.tsx   (~70行: 4つの強みカード)
│   ├── skills-section.tsx      (~80行: 3カテゴリのスキル一覧)
│   ├── timeline-section.tsx    (~60行: キャリアタイムライン)
│   └── values-section.tsx      (~50行: 価値観+CTA)
```

**実装手順**:
1. `_components/` ディレクトリを作成（`_` prefix でルーティング除外）
2. 各セクションを対応するコンポーネントファイルに抽出
3. ハードコードデータはまず各コンポーネント内にそのまま移動（データ外部化は Session C）
4. `page.tsx` はインポート + 構成のみの薄いシェルに
5. 全コンポーネントがサーバーコンポーネント（`"use client"` 不要）

**注意点**:
- `revalidate = 7200` は `page.tsx` に残す
- `generateMetadata` は `page.tsx` に残す
- SEO 構造化データ（`ArticleJsonLd`, `BreadcrumbJsonLd`）は `page.tsx` に残す

---

### B-4. desktop-navigation フォーカストラップ [I-09 / S2 HIGH]

**ファイル**: `src/components/layout/header/desktop-navigation.tsx`

**実装手順**:
1. ドロップダウンが開いた時にフォーカスをメニュー内に閉じ込める
2. 矢印キーでメニュー項目間を移動
3. `Escape` キーでドロップダウンを閉じ、トリガー要素にフォーカスを戻す
4. `aria-expanded` をトリガーに設定
5. `role="menu"` / `role="menuitem"` をメニュー要素に設定

**アプローチ**: カスタム実装（既存のドロップダウン構造を維持）
- `useEffect` でフォーカストラップロジックを管理
- `Tab`/`Shift+Tab` をインターセプトしてメニュー内に閉じ込める
- 先頭/末尾項目でラップアラウンド

---

### Session B コミット戦略

4つのコミットに分割：

1. **FAQ統合**
   ```
   refactor(services): 共有FAQコンポーネントを作成し3つの重複実装を統合
   ```
2. **Hero統合**
   ```
   refactor(services): 写真/AI画像ヒーローをServiceHeroSectionに統合
   ```
3. **About分割**
   ```
   refactor(about): 475行のモノリシックページを5コンポーネントに分割
   ```
4. **フォーカストラップ**
   ```
   a11y(navigation): デスクトップナビゲーションにフォーカストラップを追加
   ```

---

## Session C: データ外部化・コード品質改善

**ブランチ**: `refactor/data-layer-and-quality`
**工数目安**: 5〜6時間
**対象課題**: I-15, I-16, I-17, I-18, I-19, I-20, I-21, I-22
**前提**: Session B が完了し main にマージ済み

### セッション開始時の指示プロンプト

```
docs/development/plans/component-improvement-plan.md の Session C を実装して。
各タスクを順番に実施し、全完了後にビルド確認して。
ブランチ refactor/data-layer-and-quality を main から作成して作業して。
```

---

### C-1. Pricingデータ外部化 [I-15 / S3 MEDIUM]

**対象**: 5つの pricing コンポーネントのインラインデータを `/src/lib/data/` に外部化

| 元ファイル | データ行数 | 外部化先 |
|-----------|----------|---------|
| `web-development/pricing-section.tsx` | ~51行 | `src/lib/data/pricing/web-development.ts` |
| `creative/pricing-section.tsx` | ~42行 | `src/lib/data/pricing/creative.ts` |
| `photography/pricing-plans.tsx` | ~59行 | `src/lib/data/pricing/photography.ts` |
| `ai-image/ai-pricing-plans.tsx` | ~87行 | `src/lib/data/pricing/ai-image.ts` |
| `consulting/pricing-section.tsx` | ~88行 | `src/lib/data/pricing/consulting.ts` |

**実装手順**:
1. `src/lib/data/pricing/` ディレクトリを作成
2. 共通の型定義 (`PricingPlan`, `PricingFeature`) を作成
3. 各コンポーネントからデータ配列を抽出
4. コンポーネント側は import して使用
5. `index.ts` でまとめて re-export

---

### C-2. about/page.tsx データ外部化 [I-21 / S3 MEDIUM]

**注意**: Session B で about が分割済みであること

**実装手順**:
1. `src/lib/data/about-data.ts` を作成
2. スキル、経歴、強み、価値観のデータを移動
3. タイムラインの `〜0000年` プレースホルダーにコメントで「要更新」を記載

---

### C-3. news/page.tsx 品質改善 [I-16, I-17, I-18 / S3 MEDIUM]

**ファイル**: `src/app/(site)/news/page.tsx`

**修正内容**:
1. **I-17**: 未使用サーバーアクション `_getFilteredNews` を削除
2. **I-16**: ハードコードカラー修正
   - `bg-blue-600 text-white` → `bg-primary text-primary-foreground`
   - `bg-white text-gray-600` → `bg-background text-muted-foreground`
3. **I-18**: アクセシビリティ改善
   - アクティブフィルターに `aria-current="page"` を追加
   - 結果件数表示を `<p role="status" aria-live="polite">` で囲む

---

### C-4. contact-phone-and-line 改善 [I-19 / S3 MEDIUM]

**ファイル**: `src/components/contact/contact-phone-and-line.tsx`

**修正内容**:
- `window.location.href = "tel:..."` → `<a href="tel:...">` に変更
- `window.open(lineUrl)` → `<a href={lineUrl} target="_blank" rel="noopener noreferrer">` に変更
- ボタンの見た目は `asChild` パターンで維持

---

### C-5. プレースホルダー・ハードコード整理 [I-20, I-22, I-37 / S3-S4]

**対象**:
| ファイル | 内容 | 対応 |
|---------|------|------|
| `privacy/page.tsx` | `株式会社〇〇` 等 | 定数ファイルに集約 + `// TODO: 本番環境で更新` コメント |
| `news/[id]/page.tsx` | `https://example.com` | `META.SITE_URL` を必須化（フォールバック削除） |
| `contact/page.tsx` | 営業時間ハードコード | 定数ファイルに移動 |

**実装手順**:
1. `src/lib/constants/business.ts` を作成（会社名、住所、営業時間、メール等）
2. 各ファイルで定数を import して使用
3. ボイラープレート利用者向けに定数ファイルの冒頭にカスタマイズ案内コメントを追加

---

### Session C コミット戦略

3つのコミットに分割：

1. **データ外部化**
   ```
   refactor(data): pricing/aboutデータを/lib/data/に外部化
   ```
2. **news/contact品質改善**
   ```
   fix: newsページの色・a11y・dead code修正、contactのDOM API修正
   ```
3. **プレースホルダー整理**
   ```
   chore: ビジネス情報を定数ファイルに集約しカスタマイズ性を向上
   ```

---

## 補足事項

### 各セッション完了時の共通検証手順

```bash
# 1. ビルド確認
npm run build

# 2. Lint（新規エラーが増えていないこと）
npm run lint 2>&1 | tail -5

# 3. テスト
npm test

# 4. 目視確認（推奨）
npm run dev  # 主要ページを手動確認
```

### セッション間の依存関係

```
Session A (fix/critical-component-issues)
    ↓ main にマージ
Session B (refactor/shared-components)
    ↓ main にマージ
Session C (refactor/data-layer-and-quality)
```

- **Session A → B**: 直接の依存はないが、A のビルド成功が前提
- **Session B → C**: C-2（aboutデータ外部化）は B-3（about分割）が前提

### 対象外（Phase 3 / S4）

以下は本計画のスコープ外。必要に応じて後続セッションで対応：

- I-24: service-navigation/footer 汎用化
- I-26: whales-animation マジックナンバー定数化
- I-29: particle-background O(n²) 最適化
- I-30: service-categories 未使用 props 削除
- I-31: service-item RTLハック除去
- I-32: 不要な useMemo/useCallback 除去
- I-40: Web開発 final-cta-section の SharedCTA 移行

---

*計画書作成: Claude Code — 2026-02-09*
