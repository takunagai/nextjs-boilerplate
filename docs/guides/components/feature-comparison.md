# 比較表コンポーネント

## はじめに

Webサイトでよく見かける機能比較表。サービスプランの違いや製品のスペック比較など、ユーザーの意思決定を助ける重要なUIパターンです。この記事では、Next.js 15のサーバーコンポーネントとTailwind CSS v4を活用した、見た目も機能も優れた「FeatureComparison（機能比較表）」コンポーネントの実装方法を解説します。

本コンポーネントは以下の特徴を持っています：

- シンプルな API で柔軟な機能比較表を実現
- サーバーコンポーネントとして実装（SEO対応）
- Tailwind CSS v4 の新機能を活用
- アクセシビリティに配慮
- スタイルカスタマイズが容易

## 実装の概要

「FeatureComparison」コンポーネントは、以下の3つの主要なデータ構造をベースに構築されています：

1. **features**: 行データ（比較する機能項目）
2. **plans**: 列データ（比較対象となるプラン・サービス）
3. **matrix**: 交差するセルの値（各機能の各プランにおける状態）

このシンプルな構造により、さまざまな比較シナリオに柔軟に対応できます。

## コンポーネントの実装

まずは基本的な型定義から見ていきましょう：

```tsx
export type Feature = {
  key: string;
  label: string;
  description?: string; // ツールチップで表示する説明
};

export type Plan = {
  key: string;
  label: string;
  highlight?: boolean; // おすすめプランなどを強調表示
  description?: string; // プランの補足説明
};

export type FeatureComparisonProps = {
  features: Feature[];
  plans: Plan[];
  matrix: {
    [featureKey: string]: {
      [planKey: string]: ReactNode | boolean | string | number;
    };
  };
  className?: string;
  renderValue?: (
    value: ReactNode | boolean | string | number,
    feature: Feature,
    plan: Plan,
  ) => ReactNode;
  title?: string; // アクセシビリティ用
  
  // スタイルカスタマイズ用props
  tableClassName?: string;
  headerClassName?: string;
  headerCellClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  highlightColumnClassName?: string;
};
```

これを基に、実際のコンポーネント実装を行います。ポイントは以下の通りです：

### 1. 値のレンダリング処理

```tsx
// 値のレンダリングをデフォルト実装
const defaultRenderValue = (
  value: ReactNode | boolean | string | number,
): ReactNode => {
  if (value === true) {
    return <FaCheck className="text-green-600 mx-auto" aria-label="対応あり" />;
  }
  if (value === false) {
    return <FaXmark className="text-red-500 mx-auto" aria-label="対応なし" />;
  }
  // 値がundefinedやnullの場合は空文字列を表示
  if (value === undefined || value === null) {
    return <span className="text-muted-foreground">-</span>;
  }
  return value;
};
```

### 2. アクセシビリティ対応

```tsx
<Table
  className={cn(tableClassName)}
  aria-labelledby="feature-comparison-title"
>
  {title && (
    <div className="sr-only" id="feature-comparison-title">
      {title}
    </div>
  )}
  {/* テーブルの内容... */}
</Table>
```

### 3. ツールチップ実装

機能項目に説明テキストがある場合、ツールチップとして表示します：

```tsx
{feature.description && (
  <div
    className="group relative"
    title={feature.description}
    aria-label={`${feature.label}の説明: ${feature.description}`}
  >
    <HiQuestionMarkCircle className="h-4 w-4 text-muted-foreground cursor-help" />
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-popover text-popover-foreground text-xs p-2 rounded-md shadow-md max-w-[200px] z-10 break-words">
      {feature.description}
    </div>
  </div>
)}
```

### 4. スタイルカスタマイズ対応

```tsx
<thead className={headerClassName}>
  <tr>
    <th className={cn("w-[180px]", headerCellClassName)}>
      機能/サービス
    </th>
    {/* 他のヘッダーセル... */}
  </tr>
</thead>
<tbody>
  {features.map((feature) => (
    <tr key={feature.key} className={rowClassName}>
      <td className={cn("font-medium", cellClassName)}>
        {/* セルの内容... */}
      </td>
      {/* 他のセル... */}
    </tr>
  ))}
</tbody>
```

## コンポーネントの使用方法

基本的な使い方は非常にシンプルです：

```tsx
<FeatureComparison
  features={[
    { key: "price", label: "価格", description: "月額料金（税抜）" },
    { key: "users", label: "ユーザー数", description: "同時接続可能なユーザー数" },
    // 他の機能...
  ]}
  plans={[
    { key: "free", label: "無料プラン" },
    { key: "pro", label: "プロプラン", highlight: true },
    { key: "enterprise", label: "エンタープライズ" },
  ]}
  matrix={{
    price: { free: "0円", pro: "1,980円", enterprise: "9,800円" },
    users: { free: "3名まで", pro: "10名まで", enterprise: "無制限" },
    // 他の比較データ...
  }}
/>
```

### スタイルのカスタマイズ

テーブルの見た目は、各要素ごとにTailwindのクラスを渡すことで簡単にカスタマイズできます：

```tsx
<FeatureComparison
  // 基本データは同じ
  
  // スタイルカスタマイズ
  tableClassName="border-2 border-primary rounded-lg shadow-lg"
  headerClassName="bg-primary/10"
  headerCellClassName="font-bold text-primary"
  rowClassName="hover:bg-muted/20"
  cellClassName="py-3"
  highlightColumnClassName="bg-primary/10 border-l border-r border-primary/20"
/>
```

これにより、同じデータ構造でもデザインが大きく変わるため、サイトのテーマやブランディングに合わせた表現が可能です。

## 実装のポイント

### 1. サーバーコンポーネントとしての設計

Next.js 15のサーバーコンポーネントとして実装することで、クライアントサイドのJavaScriptを最小限に抑え、SEOにも優しい設計になっています。また、データ取得とレンダリングをサーバーサイドで行うことで、パフォーマンスも向上します。

### 2. Tailwind CSS v4の活用

Tailwind CSS v4の新機能、特に透明度表記（`bg-primary/10`など）や自由なカラー変数の利用を活用しています。また、印刷時の表示も考慮して`print:overflow-visible`などのメディアクエリも適用しています。

### 3. アクセシビリティへの配慮

- スクリーンリーダー用の`aria-label`属性
- テーブルの`aria-labelledby`属性とタイトル
- ツールチップに`title`属性と`aria-label`を追加
- チェックマーク・バツマークには説明テキストを付加

### 4. エラーハンドリング

データの欠損やnull/undefined値に対する適切な処理を行い、表示崩れを防いでいます。

```tsx
// matrix値が存在しない場合は明示的に処理
const value = matrix[feature.key]?.[plan.key] ?? null;
```

## スタイルバリエーション例

このコンポーネントは様々なスタイルバリエーションに対応可能です。サンプル実装では以下の4パターンを用意しています：

### 1. デフォルトスタイル

シンプルで基本的なデザイン。特にスタイルカスタマイズを行わない場合の表示です。

### 2. ボーダードスタイル

境界線とアクセントカラーを強調したデザイン。重要な情報を目立たせたい場合に適しています。

```tsx
<FeatureComparison
  // ...
  tableClassName="border-2 border-primary rounded-lg shadow-lg"
  headerClassName="bg-primary/10"
  headerCellClassName="font-bold text-primary"
  rowClassName="hover:bg-muted/20"
  cellClassName="py-3"
  highlightColumnClassName="bg-primary/10 border-l border-r border-primary/20"
/>
```

### 3. コンパクトスタイル

より小さく密度の高いデザイン。限られたスペースで多くの情報を表示したい場合に便利です。

```tsx
<FeatureComparison
  // ...
  tableClassName="text-xs border border-muted rounded"
  headerClassName="bg-muted/50"
  headerCellClassName="p-1.5 text-xs font-medium"
  rowClassName="border-b border-muted hover:bg-muted/10"
  cellClassName="p-1.5 text-xs"
  highlightColumnClassName="bg-accent/10"
/>
```

### 4. モダンスタイル

角丸と微妙な影を取り入れた現代的なデザイン。洗練された印象を与えたい場合に最適です。

```tsx
<FeatureComparison
  // ...
  tableClassName="rounded-xl overflow-hidden shadow-md"
  headerClassName="bg-secondary text-secondary-foreground"
  headerCellClassName="p-4 font-medium"
  rowClassName="border-b border-secondary/10 hover:bg-secondary/5 transition-colors"
  cellClassName="p-4"
  highlightColumnClassName="bg-primary/5 border-l-4 border-l-primary"
/>
```

## カスタム値レンダリング

より複雑なセル内容を表示したい場合は、`renderValue`プロップを使って独自のレンダリングロジックを定義できます：

```tsx
<FeatureComparison
  // ...
  renderValue={(value, feature, plan) => {
    // 料金表示の場合はバッジとして表示
    if (feature.key === 'price') {
      return (
        <Badge variant={plan.highlight ? "default" : "outline"}>
          {value}
        </Badge>
      );
    }
    
    // 通常の値はデフォルト表示
    if (value === true) {
      return <FaCheck className="text-green-600 mx-auto" />;
    }
    if (value === false) {
      return <FaXmark className="text-red-500 mx-auto" />;
    }
    
    return value;
  }}
/>
```

## 今後の改良アイデア

このコンポーネントはすでに十分に機能的ですが、さらなる改良の余地もあります：

### 1. モバイル最適化

現在は横スクロールで対応していますが、小さな画面向けにはカード型表示など別のレイアウトを提供できると理想的です：

```tsx
<FeatureComparison
  // ...
  mobileLayout="cards" // カード型表示
  // または
  mobileLayout="accordion" // アコーディオン表示
/>
```

### 2. アニメーション効果

Framer Motionなどのライブラリを活用して、ホバーやツールチップ表示時のアニメーションを追加できます。

### 3. フィルタリング機能

大量の機能項目がある場合、特定のカテゴリーでフィルタリングできる機能が便利です：

```tsx
<FeatureComparison
  // ...
  categories={[
    { key: "basic", label: "基本機能" },
    { key: "advanced", label: "高度な機能" },
  ]}
  features={[
    { key: "feature1", label: "機能1", category: "basic" },
    // ...
  ]}
  enableFiltering={true}
/>
```

### 4. インタラクティブな比較

クライアントコンポーネントとして実装し、ユーザーが比較したいプランだけを選択できるようにすることも可能です。

### 5. Class Variance Authority 統合

現在は個別のTailwindクラスでスタイリングしていますが、CVAを使ってバリアントシステムとして整理することで、よりシステマティックなカスタマイズが可能になります：

```tsx
<FeatureComparison
  variant="modern" // モダンスタイル
  size="compact" // コンパクトサイズ
  colorScheme="primary" // プライマリカラースキーム
/>
```

## まとめ

「FeatureComparison」コンポーネントは、Next.js 15のサーバーコンポーネントとTailwind CSS v4の利点を活かした、使いやすくカスタマイズも容易な比較表UIです。シンプルなデータ構造とプロップスで、様々なユースケースに対応できます。

スタイルカスタマイズ機能を活用することで、同じコンポーネントでもサイトのテーマに合わせた多様な表現が可能です。また、アクセシビリティにも配慮されているため、より多くのユーザーに適切な情報を提供できます。

このコンポーネントをベースに、プロジェクトの要件に合わせてさらなるカスタマイズや拡張を行ってみてください。

---

*この記事は2025年4月30日に執筆されました。コードサンプルは Next.js 15.3.1 および Tailwind CSS 4.0.15 で動作確認しています。*
