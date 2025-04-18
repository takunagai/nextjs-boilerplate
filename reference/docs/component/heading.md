# Heading コンポーネント: 柔軟で再利用可能な見出し設計

Next.js/React/TypeScriptプロジェクトにおいて、見出しは最も頻繁に使用されるUI要素の一つです。本記事では、プロジェクトで実装した高度なカスタマイズが可能な`Heading`コンポーネントの設計と実装について解説します。

## 目次

1. [コンポーネントの概要](#コンポーネントの概要)
2. [主な特徴](#主な特徴)
3. [設計パターン](#設計パターン)
4. [実装の工夫](#実装の工夫)
5. [使用例](#使用例)
6. [まとめ](#まとめ)

## コンポーネントの概要

`Heading`コンポーネントは、Webサイト全体で一貫したスタイルの見出しを提供するためのコンポーネントです。単なる見出し表示だけでなく、リード文、ボーダー、アイコンなどを含む高度なカスタマイズが可能で、様々なレベルの見出し（h1〜h6）に対応しています。

```tsx
<Heading as="h2" icon={<FaPuzzlePiece />} borderPosition="bottom">
  サービスの特徴
  <Heading.Lead>
    当社のサービスが選ばれる理由をご紹介します
  </Heading.Lead>
</Heading>
```

## 主な特徴

### 1. Compound Component パターン

`Heading`コンポーネントは、Compound Component（複合コンポーネント）パターンを採用しています。これにより、メインの見出しとリード文（補足説明）を親子関係で表現できます。

```tsx
// 複合コンポーネントの構成
const Heading = Object.assign(HeadingRoot, {
  Lead: HeadingLead,
});
```

### 2. 豊富なカスタマイズオプション

- **見出しレベル**: `as`プロパティでh1〜h6を指定可能
- **サイズ**: 自動または手動でのサイズ調整（xs, sm, md, lg, xl, 2xl, 3xl）
- **配置**: 左寄せまたは中央寄せ（`align`プロパティ）
- **アイコン**: 見出しの横にアイコンを表示（`icon`プロパティ）
- **アイコン色**: Tailwindクラスでアイコン色を指定（`iconColor`プロパティ）

### 3. 柔軟なボーダーシステム

ボーダーの位置、スタイル、色をTailwind CSSクラスで自由にカスタマイズできます。

- **ボーダー位置**: `borderPosition`で設定（none, left, top, bottom, between）
- **ボーダースタイル**: `borderClass`でTailwindクラスを直接指定
  - 例: `border-dashed border-red-500 border-2`

### 4. リード文のカスタマイズ

リード文（`Heading.Lead`）も独自のスタイリングが可能です。

- **ボーダー**: リード文自体にもボーダーを追加できる（`bordered`プロパティ）
- **スタイル**: Tailwindクラスで自由にカスタマイズ可能

## 設計パターン

### Compound Component パターン

Compound Component パターンを採用することで、以下のメリットが得られました：

1. **関連コンポーネントのグループ化**: 見出しとリード文を論理的にグループ化
2. **内部状態の共有**: 親から子へのスタイルの共有（align など）
3. **宣言的な API**: より直感的で読みやすいコード
4. **柔軟なレイアウト**: 子コンポーネントの配置を柔軟に制御

```tsx
// 使用例
<Heading as="h2" align="center">
  メインの見出し
  <Heading.Lead>
    リード文はここに
  </Heading.Lead>
</Heading>
```

### props による柔軟なカスタマイズ

コンポーネントのAPIを設計する際、以下の点に注意しました：

1. **必須プロパティを最小限に**: 基本的な使用を簡単に
2. **デフォルト値の提供**: 一般的なユースケースを簡潔に
3. **拡張性の確保**: 高度なカスタマイズのための追加プロパティ

## 実装の工夫

### 1. 子要素の分離処理

見出し本文とリード文を分離する処理は、React の Children API を使用して実装しています。

```tsx
// 子要素を見出しとリードに分割
const childrenArray = Children.toArray(children) as ReactNode[];
const leadItems = childrenArray.filter(
  (child) => isValidElement(child) && child.type === HeadingLead,
);
const headingItems = childrenArray.filter(
  (child) => !isValidElement(child) || child.type !== HeadingLead,
);
```

### 2. 見出しレベルに応じた自動サイズ設定

見出しレベル（h1〜h6）に応じて適切なサイズを自動で設定する機能を実装しています。

```tsx
// 見出しレベルに応じたデフォルトサイズのマッピング
const headingLevelSizeMap: Record<string, HeadingSize> = {
  h1: "3xl",
  h2: "2xl",
  h3: "xl",
  h4: "lg",
  h5: "md",
  h6: "sm",
};

// 使用例
const defaultSize = headingLevelSizeMap[Tag] || "md";
const headingSize = size || defaultSize;
```

### 3. ボーダー位置のマッピング

ボーダーの位置に応じて適切なクラスを生成する関数を実装しています。

```tsx
function getBorderClass(
  position: BorderPosition,
  borderClass: string = "border-2 border-gray-200/50",
): string {
  if (position === "none" || position === "between") return "";

  switch (position) {
    case "left":
      return `border-l ${borderClass} pl-4`;
    case "top":
      return `border-t ${borderClass} pt-4`;
    case "bottom":
      return `border-b ${borderClass} pb-2`;
    default:
      return "";
  }
}
```

### 4. between ボーダーの特殊処理

`borderPosition="between"` の場合、見出しとリード文の間に区切り線を表示するための特殊処理を実装しています。

```tsx
{hasLead && (
  <>
    {borderPosition === "between" && (
      <div className={clsx("border-t my-3", borderClass)} />
    )}
    {leadItems}
  </>
)}
```

### 5. Tailwind CSS との統合

Tailwind CSS のユーティリティクラスを最大限に活用し、`clsx` を使用して条件付きクラス適用を実装しています。

```tsx
<div
  className={clsx(
    "mb-6",
    containerBorderStyles,
    align === "center" && "text-center",
    className,
  )}
>
```

## 使用例

### 基本的な使用法

```tsx
// シンプルな見出し
<Heading as="h2">
  見出しテキスト
</Heading>

// リード文付き
<Heading as="h2">
  見出しテキスト
  <Heading.Lead>
    リード文テキスト
  </Heading.Lead>
</Heading>
```

### ボーダー付き見出し

```tsx
// 下部ボーダー
<Heading 
  as="h2" 
  borderPosition="bottom" 
  borderClass="border-b-2 border-blue-500"
>
  青いボーダー付き見出し
</Heading>

// 左側ボーダー
<Heading 
  as="h2" 
  borderPosition="left" 
  borderClass="border-l-4 border-green-500"
>
  緑の太いボーダー付き見出し
</Heading>
```

### アイコン付き見出し

```tsx
// アイコン付き（中央揃え）
<Heading 
  as="h2" 
  icon={<FaPuzzlePiece />} 
  iconColor="text-yellow-500"
  align="center"
>
  アイコン付き見出し
</Heading>
```

### 複合的な使用例

```tsx
// アイコン + ボーダー + リード文
<Heading
  as="h2"
  icon={<FaPuzzlePiece />}
  iconColor="text-yellow-400"
  borderPosition="between"
  borderClass="w-1/2 mx-auto border-dashed border-purple-500"
  align="center"
>
  複合的な見出し
  <Heading.Lead bordered borderClass="border-b border-dotted border-gray-300">
    ボーダー付きリード文
  </Heading.Lead>
</Heading>
```

## まとめ

Headingコンポーネントは、Compound Componentパターンを活用し、Tailwind CSSの柔軟性と組み合わせることで、高度にカスタマイズ可能でありながら使いやすいAPIを提供しています。

主なメリット：

1. **一貫性**: サイト全体で統一された見出しスタイル
2. **柔軟性**: 様々なデザインニーズに対応できるカスタマイズオプション
3. **使いやすさ**: 直感的なAPIとデフォルト値の提供
4. **保守性**: 論理的に整理されたコード構造
5. **拡張性**: 将来的な機能追加が容易

サンプルとして `/app/(examples)/examples/heading/page.tsx` に様々なバリエーションを実装していますので、実際の使用例を確認することができます。
