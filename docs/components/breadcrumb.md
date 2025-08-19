# パンくずリストコンポーネント

## 概要

パンくずリスト（Breadcrumb）は、ユーザーが現在のページ階層を理解し、上位階層へ簡単にナビゲートできるようにするUIコンポーネントです。SEO対策とアクセシビリティに配慮した実装となっています。

## 特徴

- 📱 **レスポンシブデザイン**: モバイルでは中間項目を自動的に省略
- ♿ **アクセシビリティ対応**: WCAG 2.1 AA準拠、スクリーンリーダー対応
- 🔍 **SEO最適化**: 構造化データ（JSON-LD）の自動生成
- 🎨 **カスタマイズ可能**: Tailwind CSSクラスでスタイリング
- 📏 **テキスト省略**: 長いラベルを自動的に省略表示
- 🚀 **パフォーマンス**: React 19 Compiler対応、軽量実装

## 使用方法

### 基本的な使用例

```tsx
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo";
import { createBreadcrumbs } from "@/lib/utils";

export default function ServicePage() {
  // パンくずリストデータの定義
  const breadcrumbItems = [
    { title: "ホーム", path: "/" },
    { title: "サービス", path: "/services" },
    { title: "Web開発", path: "/services/web-development", current: true },
  ];

  // UI用とJSON-LD用のデータを生成
  const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } = 
    createBreadcrumbs(breadcrumbItems);

  return (
    <>
      {/* SEO用構造化データ */}
      <BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
      
      {/* UI表示 */}
      <Breadcrumb items={uiBreadcrumbs} />
      
      {/* ページコンテンツ */}
    </>
  );
}
```

### カスタムスタイリング

```tsx
// カスタムクラスを追加
<Breadcrumb 
  items={uiBreadcrumbs} 
  className="bg-gray-50 rounded-lg px-4" 
/>
```

### 動的なパンくずリスト

```tsx
import { usePathname } from "next/navigation";

function DynamicBreadcrumbs() {
  const pathname = usePathname();
  
  // パスから動的に生成
  const breadcrumbItems = React.useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const items = [{ title: "ホーム", path: "/" }];
    
    segments.forEach((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const title = formatSegmentTitle(segment); // セグメントを整形
      items.push({
        title,
        path,
        current: index === segments.length - 1
      });
    });
    
    return items;
  }, [pathname]);

  const { ui, jsonLd } = createBreadcrumbs(breadcrumbItems);
  
  return (
    <>
      <BreadcrumbJsonLd items={jsonLd} />
      <Breadcrumb items={ui} />
    </>
  );
}
```

## API リファレンス

### Breadcrumb コンポーネント

```typescript
interface BreadcrumbItem {
  label: string;      // 表示テキスト
  href: string;       // リンク先URL
  isCurrent?: boolean; // 現在のページかどうか
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];  // パンくずリスト項目
  className?: string;        // 追加のCSSクラス
}
```

### createBreadcrumbs ユーティリティ

```typescript
interface BreadcrumbInput {
  title: string;      // 項目のタイトル
  path: string;       // URLパス
  current?: boolean;  // 現在のページかどうか
}

function createBreadcrumbs(
  items: BreadcrumbInput[]
): {
  ui: BreadcrumbItem[];        // UI表示用データ
  jsonLd: { name: string; href: string; }[]; // JSON-LD用データ
}
```

### BreadcrumbJsonLd コンポーネント

```typescript
interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;  // 項目名
    href: string;  // URL（相対パスまたは絶対URL）
  }>;
  baseUrl?: string; // ベースURL（省略時は環境変数から取得）
}
```

## 仕様・技術情報

### アクセシビリティ

- **構造**: セマンティックHTML（`<nav>`, `<ol>`, `<li>`）を使用
- **ARIA属性**:
  - `aria-label="パンくずリスト"`: ナビゲーション要素のラベル
  - `aria-current="page"`: 現在のページを示す
  - `aria-hidden="true"`: 装飾的な区切り文字
  - `aria-label="省略された項目"`: 省略記号の説明

### レスポンシブ動作

| 画面サイズ | 動作 |
|-----------|------|
| モバイル（< 640px） | 最初と最後の項目のみ表示、中間は「...」で省略 |
| タブレット以上（≥ 640px） | すべての項目を表示 |

### テキスト省略ルール

| 条件 | 最大幅 |
|------|--------|
| 通常項目（15文字以下） | 制限なし |
| 通常項目（16文字以上） | モバイル: 8rem、タブレット: 12rem、PC: 制限なし |
| 現在ページ（20文字以下） | 制限なし |
| 現在ページ（21文字以上） | モバイル: 10rem、タブレット: 15rem、PC: 制限なし |

### SEO構造化データ

Schema.org の BreadcrumbList 形式に準拠：

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "ホーム",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "サービス",
      "item": "https://example.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Web開発"
    }
  ]
}
```

**注意**: Google推奨に従い、最後の項目（現在のページ）には`item`プロパティを含めません。

### パフォーマンス

- **バンドルサイズ**: 約2KB（gzip圧縮時）
- **依存関係**: 最小限（clsx, tailwind-merge のみ）
- **レンダリング**: 条件付きレンダリング（1項目のみの場合は非表示）
- **最適化**: React 19 Compiler による自動最適化

## ベストプラクティス

### 1. 階層の明確化

```tsx
// ✅ 良い例：明確な階層構造
[
  { title: "ホーム", path: "/" },
  { title: "製品", path: "/products" },
  { title: "カテゴリA", path: "/products/category-a" },
  { title: "製品名", path: "/products/category-a/product-1", current: true }
]

// ❌ 悪い例：階層が不明確
[
  { title: "トップ", path: "/" },
  { title: "一覧", path: "/list" },
  { title: "詳細", path: "/detail", current: true }
]
```

### 2. ラベルの簡潔性

```tsx
// ✅ 良い例：簡潔で分かりやすい
{ title: "会社概要", path: "/about" }

// ❌ 悪い例：長すぎる
{ title: "私たちの会社について詳しく知る", path: "/about" }
```

### 3. 一貫性の維持

```tsx
// ページタイトルとパンくずリストの整合性を保つ
export const metadata: Metadata = {
  title: "Web開発サービス",
};

const breadcrumbItems = [
  { title: "ホーム", path: "/" },
  { title: "サービス", path: "/services" },
  { title: "Web開発", path: "/services/web-development", current: true },
  //       ^^^^^^^^ メタデータのタイトルと一致させる
];
```

## トラブルシューティング

### Q: パンくずリストが表示されない

A: 項目が1つ（ホームのみ）の場合は自動的に非表示になります。2つ以上の項目があることを確認してください。

### Q: 構造化データがGoogleに認識されない

A: Google Search Console の「パンくずリスト」レポートで確認してください。URLは絶対URLである必要があります。

### Q: モバイルで省略表示されない

A: 3項目以下の場合は省略されません。また、Tailwind CSSのレスポンシブクラスが正しく動作しているか確認してください。

## 今後の改善ポイント

### 1. 国際化対応（優先度: 高）

```tsx
// 将来の実装イメージ
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale?: string;
  translations?: {
    navLabel?: string;        // デフォルト: "Breadcrumb navigation"
    expandLabel?: string;     // デフォルト: "Show all items"
    collapsedLabel?: string;  // デフォルト: "Hidden items"
  };
}

// 使用例
<Breadcrumb 
  items={items}
  locale="en"
  translations={{
    navLabel: "Breadcrumb navigation",
    expandLabel: "Show all items"
  }}
/>
```

### 2. 自動生成機能（優先度: 高）

```tsx
// 将来の実装イメージ
// app/breadcrumb-config.ts
export const breadcrumbConfig = {
  '/services': { 
    label: 'サービス',
    shortLabel: 'サービス' // モバイル用短縮版
  },
  '/services/web-development': { 
    label: 'Web開発サービス',
    shortLabel: 'Web開発'
  },
  // 動的ルート対応
  '/blog/[slug]': async (params) => ({
    label: await getBlogTitle(params.slug),
    shortLabel: await getBlogShortTitle(params.slug)
  })
};

// 使用例
const breadcrumbs = useAutoBreadcrumbs(); // 設定から自動生成
```

### 3. インタラクティブな省略表示（優先度: 中）

```tsx
// 将来の実装イメージ
interface BreadcrumbProps {
  // ...既存のプロパティ
  collapseStrategy?: 'ellipsis' | 'dropdown' | 'scroll';
  onItemClick?: (item: BreadcrumbItem) => void;
}

// ドロップダウン表示
<Breadcrumb 
  items={items} 
  collapseStrategy="dropdown"
/>

// 横スクロール表示
<Breadcrumb 
  items={items} 
  collapseStrategy="scroll"
/>
```

### 4. 高度なカスタマイズ（優先度: 中）

```tsx
// 将来の実装イメージ
interface AdvancedBreadcrumbProps extends BreadcrumbProps {
  // 表示オプション
  showHome?: boolean;           // ホームリンクの表示/非表示
  homeLabel?: string;          // ホームのカスタムラベル
  homeIcon?: React.ReactNode;  // ホームアイコン
  
  // セパレーター
  separator?: React.ReactNode; // カスタム区切り文字
  
  // バリアント
  variant?: 'default' | 'chevron' | 'arrow' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  
  // 動作
  maxItems?: number;           // 最大表示数
  truncateAfter?: number;      // 文字数制限
}

// 使用例
<Breadcrumb
  items={items}
  variant="chevron"
  size="sm"
  separator={<ChevronRight className="h-4 w-4" />}
  showHome={true}
  homeIcon={<Home className="h-4 w-4" />}
/>
```

### 5. アナリティクス統合（優先度: 低）

```tsx
// 将来の実装イメージ
interface BreadcrumbProps {
  // ...既存のプロパティ
  onNavigate?: (item: BreadcrumbItem, index: number) => void;
  trackingCategory?: string;
}

// 使用例
<Breadcrumb
  items={items}
  onNavigate={(item, index) => {
    // Google Analytics イベント送信
    gtag('event', 'breadcrumb_click', {
      category: 'navigation',
      label: item.label,
      position: index
    });
  }}
/>
```

### 6. マイクロデータ形式対応（優先度: 低）

```tsx
// 将来の実装イメージ
<Breadcrumb 
  items={items}
  schemaFormat="microdata" // または "rdfa"
/>
```

## 関連リンク

- [コンポーネントソース](../src/components/ui/breadcrumb.tsx)
- [ユーティリティ関数](../src/lib/utils.ts)
- [SEOコンポーネント](../src/components/seo/json-ld.tsx)
- [Google: パンくずリストの構造化データ](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [WCAG: ナビゲーション](https://www.w3.org/WAI/WCAG21/Understanding/location)