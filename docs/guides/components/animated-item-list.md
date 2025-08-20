# AnimatedItemList コンポーネント

縦フリップアニメーション付きのアイテムリスト表示コンポーネントです。二次元配列を渡すことで自動的にアニメーションが実行され、一次元配列の場合は静的リストとして表示されます。インジゲーター機能により現在の位置表示と手動切り替えも可能です。

## 主な特徴

- ✅ **縦フリップアニメーション**: 滑らかな3Dフリップ効果
- ✅ **インジゲーター表示**: 現在位置と総数を視覚的に表示
- ✅ **手動切り替え**: インジゲータードットクリックで即座に切り替え
- ✅ **時差アニメーション**: 上から下へ順次実行（0.1秒間隔）
- ✅ **チラつき防止**: タイミング最適化による滑らか切り替え
- ✅ **高さ固定**: 項目数変動時の下位要素位置移動防止
- ✅ **アクセシビリティ対応**: ARIA属性、キーボード操作、スクリーンリーダー対応
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
  animationDuration?: number;    // フリップ時間（デフォルト: 1秒）
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

#### インジゲーター設定
```tsx
{
  showIndicator?: boolean;       // インジゲーター表示（デフォルト: false）
  indicatorPosition?: "top" | "bottom";  // 表示位置（デフォルト: "top"）
  indicatorClassName?: string;   // インジゲータースタイル
  enableManualSwitch?: boolean;  // 手動切り替え有効化（デフォルト: true）
  onSetChange?: (index: number) => void;  // セット変更時のコールバック
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

### 4. インジゲーター付きアニメーション

```tsx
<AnimatedItemList 
  items={problems}
  intervalSeconds={3}
  showIndicator={true}
  indicatorPosition="bottom"
  enableManualSwitch={true}
  onSetChange={(index) => {
    console.log(`Set changed to: ${index}`);
  }}
  indicatorClassName="justify-center mb-4"
/>
```

### 5. 完全カスタムレンダリング

```tsx
<AnimatedItemList 
  items={products}
  showIcon={false}
  showIndicator={true}
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

### Problems Section（インジゲーター付き）

```tsx
// src/components/sections/problems-section.tsx
export function ProblemsSection({ problems, intervalSeconds = 5 }) {
  return (
    <section>
      <Heading>こんなお悩み、ありませんか？</Heading>
      <AnimatedItemList 
        items={problems}
        intervalSeconds={intervalSeconds}
        showIndicator={true}
        className="max-w-2xl mx-auto space-y-4 mb-12"
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
0秒: [項目1, 項目2, 項目3] 表示（インジゲーター: ● ○ ○）
5秒: フリップアニメーション開始
     ↓ 0.0s: 項目1 フリップ
     ↓ 0.1s: 項目2 フリップ  
     ↓ 0.2s: 項目3 フリップ
     ↓ 0.5s: テキスト切り替え（opacity=0の瞬間）
     ↓ 1.0s: アニメーション完了
     インジゲーター更新: ○ ● ○
10秒: 次のセットに切り替え...
```

### 一次元配列の場合
```
静的表示（アニメーションなし、インジゲーター非表示）
```

### 手動切り替え動作
```
インジゲータードットクリック時:
1. 自動切り替えタイマー停止
2. 即座にフリップアニメーション開始
3. 指定セットへ切り替え
4. アニメーション完了後、自動切り替えタイマー再開
```

## 技術的な特徴

### 高さ固定システム
- 各配列セットの最大項目数を自動計算
- 不足分を透明なプレースホルダーで自動補完
- 下位要素の位置移動を完全防止

### チラつき防止機能
- アニメーション50%地点（opacity=0）でテキスト切り替え
- 視覚的に滑らかな切り替えを実現

### インジゲーター機能
- 現在位置と総数を視覚的に表示
- ドットクリックで即座に切り替え可能
- ホバー時の視覚的フィードバック
- アクティブ状態のアニメーション（pulse効果）
- 無効状態の自動判定（アニメーション中、手動切り替え無効時）

### パフォーマンス最適化
- `useMemo`による効率的な再計算防止
- React 19 Compilerによる自動最適化対応
- カスタムフックによるロジック分離（useDebugLogger）
- 定数一元化による保守性向上（UI_ANIMATED_LIST）

## パフォーマンス

- ✅ **バンドルサイズ**: 軽量（約2KB gzipped）
- ✅ **レンダリング**: 最適化されたRe-render
- ✅ **メモリ使用量**: 効率的な状態管理
- ✅ **アニメーション**: GPU加速による滑らか動作

## ブラウザサポート

- ✅ Modern Browsers（Chrome 88+, Firefox 78+, Safari 14+）
- ✅ CSS Transform 3D対応ブラウザ
- ✅ React 18+ 対応

## アクセシビリティ対応

- ✅ **ARIA属性**: role="tab"、aria-selected、aria-label完備
- ✅ **キーボード操作**: Tabキーでフォーカス移動可能
- ✅ **スクリーンリーダー**: 現在位置と総数を読み上げ
- ✅ **視覚的フィードバック**: フォーカスリング表示
- ✅ **ツールチップ**: マウスホバー時に説明表示

## 注意事項

- アニメーション動作にはJavaScriptが必要
- 大量の項目（50+）では重いパフォーマンス影響を考慮
- アクセシビリティのため、アニメーション停止オプションを検討
- インジゲーターは2つ以上のセットがある場合のみ表示

## API リファレンス

### 定数一覧（UI_ANIMATED_LIST）

```tsx
{
  DEFAULT_INTERVAL_SECONDS: 5,        // デフォルト切り替え間隔
  DEFAULT_ANIMATION_DURATION: 1,      // デフォルトアニメーション時間
  DEFAULT_STAGGER_DELAY: 0.1,         // デフォルト時差遅延
  SECONDS_TO_MILLISECONDS: 1000,      // 秒→ミリ秒変換係数
  ANIMATION_SWITCH_RATIO: 2,          // 切り替えタイミング（50%地点）
  MIN_ITEMS_FOR_INDICATOR: 1,         // インジゲーター表示最小数
  ANIMATION_KEY_INCREMENT: 1,         // アニメーションキー増分
  INDICATOR_SIZE: 8,                  // インジゲーターサイズ
  ACTIVE_INDICATOR_SCALE: 110,        // アクティブ時スケール
  HOVER_INDICATOR_SCALE: 105,         // ホバー時スケール
  INDICATOR_TRANSITION_DURATION: 300  // トランジション時間
}
```

## 今後の拡張予定

- [ ] アニメーション停止機能（prefers-reduced-motion対応）
- [ ] より多彩なアニメーション効果
- [ ] 無限スクロール対応
- [x] ~~キーボードナビゲーション対応~~ ✅ 実装済み
- [x] ~~インジゲーター表示機能~~ ✅ 実装済み
- [x] ~~手動切り替え機能~~ ✅ 実装済み