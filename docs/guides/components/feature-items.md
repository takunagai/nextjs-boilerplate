# FeatureItems コンポーネント ベストプラクティスガイド

## 📖 概要

`FeatureItems` コンポーネントは製品やサービスの特徴を視覚的に魅力的に表示するためのコンポーネントです。複数の表示バリアントとレスポンシブデザインをサポートし、アクセシビリティに準拠した実装となっています。

## 🎯 いつ使うか

- **製品特徴の紹介**: サービスや製品の主要な特徴を説明する際
- **機能一覧の表示**: アプリケーションの機能を視覚的に整理して表示
- **比較表の代替**: シンプルな特徴比較を行いたい場合
- **ランディングページ**: 訴求ポイントを効果的に伝えたい場合

## 🎨 スタイリングベストプラクティス

### ✅ 推奨: 構造化されたスタイリング

新しい `styling` prop を使用することで、保守性とタイプセーフティが向上します。

```tsx
const styling = {
  heading: { 
    level: 'h2' as const,
    className: 'text-2xl font-semibold tracking-tight' 
  },
  description: { 
    className: 'text-muted-foreground leading-7' 
  },
  button: { 
    className: 'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground' 
  }
};

<FeatureItems items={items} styling={styling} />
```

### ❌ 非推奨: 平坦なprops

後方互換性のためサポートされていますが、新規実装では避けてください。

```tsx
// 非推奨
<FeatureItems
  items={items}
  headingLevel="h2"
  headingClassName="text-2xl font-semibold"
  descriptionClassName="text-muted-foreground"
/>
```

## 🏗️ レイアウト選択ガイド

### vertical（縦並び）
- **用途**: 詳細な説明が必要な特徴（3-5個程度）
- **推奨**: 長いテキストコンテンツがある場合
- **デバイス**: 全デバイスで一貫した表示

```tsx
<FeatureItems 
  items={features} 
  layout="vertical" 
  variant="split"
/>
```

### horizontal（横並び）
- **用途**: 簡潔な特徴を並列表示（2-3個程度）
- **推奨**: ヒーローセクションや概要説明
- **デバイス**: レスポンシブ対応（モバイルでは自動的に縦並び）

```tsx
<FeatureItems 
  items={features} 
  layout="horizontal" 
  variant="simple"
/>
```

### grid（グリッド）
- **用途**: 多数の特徴を効率的に表示（6個以上推奨）
- **推奨**: 機能一覧ページや比較表
- **デバイス**: レスポンシブグリッド（1列→2列→3列）

```tsx
<FeatureItems 
  items={features} 
  layout="grid" 
  variant="simple"
  background="accent"
/>
```

## 🎭 バリアント使い分けガイド

### split（分割レイアウト）
- **特徴**: テキストと画像を左右に分割表示
- **用途**: ストーリーテリング、詳細な機能説明
- **推奨要素**: 画像 + 詳細な説明 + CTA ボタン

```tsx
<FeatureItems 
  variant="split"
  alternateLayout={true} // 交互に左右反転
  items={featuresWithImages}
/>
```

### overlay（オーバーレイ）
- **特徴**: 画像の上にテキストをオーバーレイ表示
- **用途**: インパクトのあるヒーローセクション
- **推奨要素**: 高品質な背景画像 + キャッチコピー

```tsx
<FeatureItems 
  variant="overlay"
  overlayStyle="gradient"
  overlayHeight="full"
  items={heroFeatures}
/>
```

### simple（シンプル）
- **特徴**: アイコン + テキストのミニマルな表示
- **用途**: 機能一覧、サービス概要
- **推奨要素**: アイコン + 簡潔な説明

```tsx
<FeatureItems 
  variant="simple"
  items={iconFeatures}
/>
```

## ⚡ パフォーマンス最適化

### アイテム数による最適化

```tsx
// 少数のアイテム（1-5個）
<FeatureItems layout="vertical" spacing="medium" />

// 中程度のアイテム（6-12個）
<FeatureItems layout="grid" spacing="small" />

// 大量のアイテム（12個以上）
// 仮想スクロールや段階的読み込みの検討
<FeatureItems 
  layout="grid" 
  spacing="small"
  // カスタムレンダリングで遅延読み込み実装
/>
```

### 画像最適化

```tsx
const optimizedFeatures = [
  {
    id: "feature-1",
    title: "高速処理",
    // Next.js Image最適化の活用
    imageUrl: "/images/features/speed.webp",
    // 画像のalt属性は自動生成されるがカスタムも可能
    customData: { imageAlt: "高速処理のイメージ図" }
  }
];
```

### 不要な再計算を避ける

```tsx
// ❌ 毎回新しいオブジェクト生成
<FeatureItems 
  styling={{
    heading: { className: 'text-2xl' }  // 毎回新しいオブジェクト
  }}
/>

// ✅ オブジェクトを外部で定義
const FEATURE_STYLING = {
  heading: { className: 'text-2xl' }
};

<FeatureItems styling={FEATURE_STYLING} />
```

## 🎭 アクセシビリティベストプラクティス

### 見出し階層の適切な設定

```tsx
// ✅ 論理的な見出し階層
<FeatureItems 
  styling={{
    heading: { 
      level: 'h2' // ページの構造に応じて適切なレベル
    }
  }}
/>
```

### キーボードナビゲーション

```tsx
// ボタンがある場合、自動的にキーボード対応
const featuresWithCTA = [
  {
    id: "feature",
    title: "特徴",
    description: "説明",
    buttonText: "詳しく見る", // Tab キーでフォーカス可能
    buttonUrl: "/details"
  }
];
```

### スクリーンリーダー対応

```tsx
// コンポーネントは自動的にaria-label等を設定
// カスタムデータでより詳細な情報を提供可能
const accessibleFeatures = [
  {
    id: "accessible-feature",
    title: "アクセシブル機能",
    description: "全ユーザーが利用できる設計",
    customData: {
      ariaLabel: "アクセシブル機能：全ユーザーが利用できる設計の詳細"
    }
  }
];
```

## 🔧 高度なカスタマイズパターン

### 条件付きレンダリング

```tsx
<FeatureItems
  items={features}
  renderItem={(item, index) => {
    // 特定の条件に応じてカスタマイズ
    if (item.customData?.priority === 'high') {
      return <HighPriorityFeatureCard key={item.id} item={item} />;
    }
    
    if (item.customData?.isBeta) {
      return <BetaFeatureCard key={item.id} item={item} />;
    }
    
    // デフォルト表示にフォールバック
    return null; // nullを返すとデフォルトレンダリングが使用される
  }}
/>
```

### データ駆動型のスタイリング

```tsx
const getDynamicStyling = (category: string) => {
  const styleMap = {
    'premium': {
      heading: { className: 'text-gold-600 font-bold' },
      button: { className: 'bg-gold-600 hover:bg-gold-700' }
    },
    'basic': {
      heading: { className: 'text-gray-600 font-medium' },
      button: { className: 'bg-gray-600 hover:bg-gray-700' }
    }
  };
  
  return styleMap[category] || styleMap.basic;
};

<FeatureItems 
  items={features}
  styling={getDynamicStyling(planType)}
/>
```

## 🚀 実装パターン集

### パフォーマンス最適化済みの実装

```tsx
import { useMemo } from 'react';

const OptimizedFeatureSection = ({ rawFeatures, category }) => {
  // データの前処理を最適化
  const processedFeatures = useMemo(() => 
    rawFeatures.map(feature => ({
      ...feature,
      // 画像URLの最適化
      imageUrl: optimizeImageUrl(feature.imageUrl),
      // リンクの前処理
      buttonUrl: buildUrl(feature.slug)
    })), 
    [rawFeatures]
  );
  
  // スタイリングオブジェクトの最適化
  const styling = useMemo(() => ({
    heading: { 
      level: 'h2' as const,
      className: getHeadingClass(category) 
    }
  }), [category]);
  
  return (
    <FeatureItems 
      items={processedFeatures}
      styling={styling}
      variant="split"
    />
  );
};
```

### エラー処理とフォールバック

```tsx
const RobustFeatureSection = ({ features }) => {
  if (!features || features.length === 0) {
    return <EmptyFeatureState />;
  }
  
  try {
    return (
      <FeatureItems 
        items={features}
        renderItem={(item, index) => {
          // アイテムレベルでのエラー処理
          if (!item.id || !item.title) {
            console.warn('Invalid feature item:', item);
            return <InvalidFeatureCard key={index} />;
          }
          
          return null; // デフォルトレンダリング
        }}
      />
    );
  } catch (error) {
    console.error('FeatureItems rendering error:', error);
    return <FeatureErrorBoundary />;
  }
};
```

## 🎨 デザインシステムとの統合

### テーマシステムとの連携

```tsx
// テーマから動的にスタイリングを生成
const useFeatureTheme = () => {
  const { theme } = useTheme();
  
  return useMemo(() => ({
    heading: {
      level: 'h2' as const,
      className: cn(
        'font-semibold tracking-tight',
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      )
    },
    description: {
      className: cn(
        'leading-relaxed',
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      )
    }
  }), [theme]);
};

const ThemedFeatureSection = ({ items }) => {
  const styling = useFeatureTheme();
  
  return <FeatureItems items={items} styling={styling} />;
};
```

## 📱 レスポンシブデザイン戦略

### ブレークポイント別最適化

```tsx
const ResponsiveFeatures = ({ features }) => (
  <>
    {/* デスクトップ: 詳細表示 */}
    <div className="hidden lg:block">
      <FeatureItems
        items={features}
        variant="split"
        layout="vertical"
        spacing="large"
      />
    </div>
    
    {/* タブレット: コンパクト表示 */}
    <div className="hidden md:block lg:hidden">
      <FeatureItems
        items={features}
        variant="simple"
        layout="grid"
        spacing="medium"
      />
    </div>
    
    {/* モバイル: シンプル表示 */}
    <div className="md:hidden">
      <FeatureItems
        items={features.slice(0, 3)} // モバイルでは最重要3つのみ
        variant="simple"
        layout="vertical"
        spacing="small"
      />
    </div>
  </>
);
```

## 🔍 デバッグとトラブルシューティング

### よくある問題と解決策

```tsx
// 問題: アイテムが表示されない
// 解決: 必須フィールドの確認
const validateFeatureItems = (items) => {
  return items.filter(item => {
    if (!item.id) {
      console.warn('Missing id:', item);
      return false;
    }
    if (!item.title) {
      console.warn('Missing title:', item);
      return false;
    }
    return true;
  });
};

// 問題: スタイルが適用されない
// 解決: クラス名の動的生成確認
const debugStyling = (styling) => {
  console.log('Applied styling:', styling);
  return styling;
};

<FeatureItems 
  items={validateFeatureItems(features)}
  styling={debugStyling(myStyling)}
/>
```

## 📈 メトリクスとアナリティクス

### ユーザーインタラクションの追跡

```tsx
const AnalyticsFeatureItems = ({ items }) => {
  const trackFeatureClick = useCallback((featureId: string) => {
    // アナリティクスイベント送信
    analytics.track('feature_clicked', {
      feature_id: featureId,
      section: 'main_features'
    });
  }, []);
  
  const enhancedItems = useMemo(() => 
    items.map(item => ({
      ...item,
      buttonUrl: item.buttonUrl,
      // カスタムハンドラーを追加
      customData: {
        ...item.customData,
        onClick: () => trackFeatureClick(item.id)
      }
    })), 
    [items, trackFeatureClick]
  );
  
  return <FeatureItems items={enhancedItems} />;
};
```

この包括的なガイドに従うことで、`FeatureItems` コンポーネントを効果的かつ保守性の高い方法で活用できます。