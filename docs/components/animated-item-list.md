# AnimatedItemList コンポーネント

縦フリップアニメーション付きのアイテムリスト表示コンポーネントです。二次元配列を渡すことで自動的にアニメーションが実行され、一次元配列の場合は静的リストとして表示されます。

## 特徴

- ✅ **縦フリップアニメーション**: 滑らかな3Dフリップ効果
- ✅ **時差アニメーション**: 上から下へ順次実行（0.1秒間隔）
- ✅ **チラつき防止**: タイミング最適化による滑らか切り替え
- ✅ **高さ固定**: 項目数変動時の下位要素位置移動防止
- ✅ **柔軟なカスタマイズ**: アイコン、スタイル、レンダリング関数の自由変更
- ✅ **型安全**: TypeScriptによる厳密な型定義

## Props

### 必須Props

```tsx
interface AnimatedItemListProps {
  items: string[] | string[][];  // アニメーション対象のアイテム
}
```

### オプションProps

#### アニメーション制御
```tsx
{
  intervalSeconds?: number;      // 切り替え間隔（デフォルト: 5秒）
  animationDuration?: number;    // フリップ時間（デフォルト: 0.6秒）
  staggerDelay?: number;         // 時差間隔（デフォルト: 0.1秒）
}
```

#### 表示設定
```tsx
{
  showIcon?: boolean;            // アイコン表示（デフォルト: true）
  icon?: React.ComponentType | React.ReactElement;  // カスタムアイコン
}
```

#### スタイリング
```tsx
{
  className?: string;            // コンテナスタイル
  itemClassName?: string;        // 各項目スタイル
  iconClassName?: string;        // アイコンスタイル
  textClassName?: string;        // テキストスタイル
}
```

#### 高度なカスタマイゼーション
```tsx
{
  renderItem?: (item: string, index: number, isPlaceholder: boolean) => React.ReactNode;
}
```

## 基本的な使い方

### 1. シンプルな静的リスト

```tsx
import { AnimatedItemList } from "@/components/ui/animated-item-list";

const features = [
  "高品質なサービス",
  "迅速な対応",
  "充実したサポート"
];

<AnimatedItemList items={features} />
```

### 2. アニメーション付きリスト

```tsx
const problems = [
  [
    "予算が足りない",
    "時間がない", 
    "スキルがない"
  ],
  [
    "品質に不安",
    "サポートが心配",
    "運用が大変"
  ]
];

<AnimatedItemList 
  items={problems}
  intervalSeconds={3}  // 3秒ごとに切り替え
/>
```

### 3. カスタムアイコンとスタイル

```tsx
import { FaStar } from "react-icons/fa6";

<AnimatedItemList 
  items={serviceList}
  icon={FaStar}
  iconClassName="text-yellow-500"
  itemClassName="p-4 bg-blue-50 rounded-lg"
  className="max-w-md mx-auto space-y-4"
/>
```

### 4. 完全カスタムレンダリング

```tsx
<AnimatedItemList 
  items={products}
  showIcon={false}
  renderItem={(item, index, isPlaceholder) => (
    <div className="custom-product-card">
      <ProductIcon name={item} />
      <h3 className="font-bold">{item}</h3>
      <p className="text-sm text-gray-600">商品説明...</p>
    </div>
  )}
/>
```

## 実装例

### Problems Section（既存）

```tsx
// src/components/sections/problems-section.tsx
export function ProblemsSection({ problems, intervalSeconds = 5 }) {
  return (
    <section>
      <Heading>こんなお悩み、ありませんか？</Heading>
      <AnimatedItemList 
        items={problems}
        intervalSeconds={intervalSeconds}
        className="max-w-2xl mx-auto space-y-4"
      />
    </section>
  );
}
```

### Services Page

```tsx
// src/app/(site)/services/page.tsx
const serviceFeatures = [
  ["特徴A", "特徴B", "特徴C"],
  ["メリット1", "メリット2", "メリット3"],
  ["強み①", "強み②", "強み③"]
];

<AnimatedItemList 
  items={serviceFeatures}
  intervalSeconds={4}
  className="max-w-xl mx-auto space-y-3"
/>
```

## アニメーション動作

### 二次元配列の場合
```
0秒: [項目1, 項目2, 項目3] 表示
5秒: フリップアニメーション開始
     ↓ 0.0s: 項目1 フリップ
     ↓ 0.1s: 項目2 フリップ  
     ↓ 0.2s: 項目3 フリップ
     ↓ 0.3s: テキスト切り替え（opacity=0の瞬間）
     ↓ 0.6s: アニメーション完了
10秒: 次のセットに切り替え...
```

### 一次元配列の場合
```
静的表示（アニメーションなし）
```

## 技術的な特徴

### 高さ固定システム
- 各配列セットの最大項目数を自動計算
- 不足分を透明なプレースホルダーで自動補完
- 下位要素の位置移動を完全防止

### チラつき防止機能
- アニメーション50%地点（opacity=0）でテキスト切り替え
- 視覚的に滑らかな切り替えを実現

### パフォーマンス最適化
- `useMemo`による効率的な再計算防止
- React 19 Compilerによる自動最適化対応

## パフォーマンス

- ✅ **バンドルサイズ**: 軽量（約2KB gzipped）
- ✅ **レンダリング**: 最適化されたRe-render
- ✅ **メモリ使用量**: 効率的な状態管理
- ✅ **アニメーション**: GPU加速による滑らか動作

## ブラウザサポート

- ✅ Modern Browsers（Chrome 88+, Firefox 78+, Safari 14+）
- ✅ CSS Transform 3D対応ブラウザ
- ✅ React 18+ 対応

## 注意事項

- アニメーション動作にはJavaScriptが必要
- 大量の項目（50+）では重いパフォーマンス影響を考慮
- アクセシビリティのため、アニメーション停止オプションを検討

## 今後の拡張予定

- [ ] アニメーション停止機能（prefers-reduced-motion対応）
- [ ] より多彩なアニメーション効果
- [ ] 無限スクロール対応
- [ ] キーボードナビゲーション対応