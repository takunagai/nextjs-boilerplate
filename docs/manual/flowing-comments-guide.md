# FlowingComments コンポーネント実装ガイド

## 概要

`FlowingComments` は、ニコニコ動画風のコメント流しエフェクトを実現するReactコンポーネントです。背景に薄いテキストが右から左に流れるアニメーションを表示し、Webサイトに動きのある演出を追加できます。

## 特徴

- 🎬 **滑らかなアニメーション**: CSS アニメーションによる軽快な動作
- 📱 **レスポンシブ対応**: モバイル/デスクトップで最適化された表示
- ⚡ **パフォーマンス最適化**: 画面サイズに応じた自動調整
- 🎨 **カスタマイズ可能**: コメント内容、表示数、スタイルを柔軟に設定
- ♿ **アクセシビリティ対応**: 装飾要素として適切にマークアップ

## 基本的な使い方

### 1. インポート

```tsx
import { FlowingComments } from "@/components/effects/flowing-comments";
```

### 2. 基本実装

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-screen">
      {/* 背景エフェクトとして配置 */}
      <FlowingComments />
      
      {/* メインコンテンツ */}
      <div className="relative z-10">
        <h1>Welcome to Our Site</h1>
      </div>
    </section>
  );
}
```

## Props

| Prop | 型 | デフォルト値 | 説明 |
|------|-----|------------|------|
| `maxComments` | `number` | `25` | 同時に表示するコメントの最大数 |
| `className` | `string` | `""` | 追加のCSSクラス名 |
| `comments` | `string[]` | 組み込みのデフォルトコメント | 表示するコメントの配列 |

## バリエーション

### モバイル版（軽量）

```tsx
import { FlowingCommentsMobile } from "@/components/effects/flowing-comments";

// モバイルデバイスで表示数を抑えた軽量版
<FlowingCommentsMobile />
```

### デスクトップ版（フル機能）

```tsx
import { FlowingCommentsDesktop } from "@/components/effects/flowing-comments";

// デスクトップ専用の高品質版
<FlowingCommentsDesktop />
```

## 実装例

### 最小限の実装

```tsx
// app/page.tsx
import { FlowingComments } from "@/components/effects/flowing-comments";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <FlowingComments />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Your Content Here</h1>
      </div>
    </main>
  );
}
```

### カスタマイズ例

```tsx
// コメント数を調整した実装
<FlowingComments 
  maxComments={50} 
  className="opacity-50" 
/>

// レスポンシブ対応の実装
<>
  {/* モバイルでは少なめ、デスクトップでは多めに表示 */}
  <FlowingCommentsMobile className="sm:hidden" />
  <FlowingCommentsDesktop className="hidden sm:block" />
</>
```

### セクション背景として使用

```tsx
export function ServicesSection() {
  return (
    <section className="relative py-20">
      {/* 背景エフェクト */}
      <div className="absolute inset-0">
        <FlowingComments maxComments={30} />
      </div>
      
      {/* コンテンツ */}
      <div className="relative z-10 container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サービスカード */}
        </div>
      </div>
    </section>
  );
}
```

### 動的コンテンツの例

```tsx
export function TestimonialsSection() {
  const testimonials = [
    "素晴らしいサービスでした！",
    "期待以上の仕上がりです",
    "迅速で丁寧な対応に感謝",
    "また利用したいです",
    "プロフェッショナルな仕事ぶり"
  ];

  return (
    <section className="relative min-h-[400px]">
      <FlowingComments 
        comments={testimonials}
        maxComments={20}
      />
      <div className="relative z-10 p-8">
        <h2 className="text-2xl font-bold">お客様の声</h2>
      </div>
    </section>
  );
}
```

## コメント内容のカスタマイズ

### comments prop を使用したカスタマイズ（推奨）

v0.2.0 から、コメント内容を props で指定できるようになりました：

```tsx
// 静的なカスタムコメント
<FlowingComments 
  comments={[
    "お客様の声1",
    "お客様の声2",
    "製品の特徴1",
    "製品の特徴2",
    "キャンペーン情報",
    "最新のニュース"
  ]}
/>

// APIからのデータを使用
const testimonials = await fetchTestimonials();
<FlowingComments 
  comments={testimonials.map(t => t.message)}
/>

// 状態に応じて動的に変更
const [comments, setComments] = useState(defaultComments);
<FlowingComments comments={comments} />
```

### デフォルトコメントについて

comments prop を指定しない場合、コンポーネントに組み込まれたデフォルトのコメント（技術系のスキルや機能）が表示されます：

```tsx
// デフォルトコメントを使用
<FlowingComments />

// カスタムコメントを使用
<FlowingComments comments={myCustomComments} />
```

## スタイリング

### 色の調整

```tsx
// 透明度を変更
<FlowingComments className="opacity-30" />

// ダークモード対応
<FlowingComments className="dark:opacity-10" />
```

### 位置の調整

```tsx
// 特定エリアに制限
<div className="relative h-96 overflow-hidden">
  <FlowingComments />
</div>
```

## パフォーマンスの考慮事項

### 1. コメント数の最適化

- **モバイル**: 10-15個程度を推奨
- **デスクトップ**: 25-50個程度まで対応可能

### 2. アニメーション設定

- CSS アニメーションを使用しているため、GPU アクセラレーションが有効
- `motion-safe` と `motion-reduce` クラスでユーザー設定に対応

### 3. メモリ使用量

- コンポーネントは定期的にコメントを更新（リサイクル）
- DOM要素数は `maxComments` で制限

## 設定値のカスタマイズ

`src/lib/constants/ui.ts` で細かい調整が可能：

```tsx
export const UI_FLOWING_COMMENTS = {
  // デスクトップ設定
  DESKTOP_MAX_COMMENTS: 30,
  DESKTOP_BASE_SIZE: 1.2,
  DESKTOP_SIZE_RANGE: 0.8,
  
  // モバイル設定
  MOBILE_MAX_COMMENTS: 10,
  MOBILE_BASE_SIZE: 0.8,
  MOBILE_SIZE_RANGE: 0.4,
  
  // アニメーション設定
  DURATION_MIN: 20,        // 最小アニメーション時間（秒）
  DURATION_MAX: 40,        // 最大アニメーション時間（秒）
  UPDATE_INTERVAL: 30000,  // 更新間隔（ミリ秒）
};
```

## トラブルシューティング

### コメントが表示されない

1. 親要素に `relative` と適切な高さが設定されているか確認
2. `z-index` の競合がないか確認
3. `overflow: hidden` が適切に設定されているか確認

### アニメーションがカクつく

1. コメント数を減らす
2. アニメーション時間を長くする
3. ブラウザの開発者ツールでパフォーマンスを確認

### レイアウトの崩れ

1. 親要素の `position: relative` を確認
2. コンテンツには適切な `z-index` を設定

## まとめ

`FlowingComments` コンポーネントは、シンプルな実装で魅力的な背景エフェクトを追加できます。パフォーマンスとアクセシビリティに配慮した設計により、様々なプロジェクトで安心して使用できます。