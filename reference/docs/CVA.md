# class-variance-authority (CVA) 入門

## はじめに

Tailwind CSS などのユーティリティファーストなCSSフレームワークを使っていると、コンポーネントのバリエーションを実装する際に「どうやって整理すれば良いか」という課題にぶつかります。例えば、ボタンに「プライマリ」「セカンダリ」「アウトライン」などのバリエーションを持たせたい場合、従来は以下のような方法で実装することが多かったでしょう：

```tsx
function Button({ variant, size, className, ...props }) {
  const baseClasses = "rounded font-medium transition-colors";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
  };
  
  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
```

この方法でも機能しますが、クラス名の管理や条件付きのスタイルが複雑になると混乱しやすくなります。また、型安全性の面でも課題があります。

**class-variance-authority (CVA)** は、これらの問題を解決するためのライブラリです。

## CVA とは？

CVA は、コンポーネントのバリエーションを**型安全**かつ**宣言的**に定義するためのユーティリティです。Tailwind CSS や他のユーティリティCSSフレームワークと組み合わせて使用することで、以下のメリットが得られます：

- 🧩 **バリエーションの宣言的な定義**
- 🔒 **TypeScriptによる型安全性**
- 🧹 **条件付きスタイルの簡潔な記述**
- 🔄 **再利用可能で保守性の高いコード**

## 基本的な使い方

### 1. インストール

```bash
npm install class-variance-authority
# または
yarn add class-variance-authority
```

### 2. シンプルな例（ボタンコンポーネント）

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils"; // clsxとtailwind-mergeを組み合わせたユーティリティ

// ボタンのバリエーションを定義
const buttonVariants = cva(
  // ベースとなるクラス
  "rounded-md font-medium transition-colors focus:outline-none",
  {
    // バリエーション
    variants: {
      // 種類のバリエーション
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
      },
      // サイズのバリエーション
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
    },
    // デフォルト値
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ボタンコンポーネントの型定義（VariantPropsを使用）
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// ボタンコンポーネント
export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

この例では、`cva` 関数を使用して `buttonVariants` を定義しています。これにより、型安全なバリエーションの組み合わせが可能になりました。

使い方は非常にシンプルです：

```tsx
// デフォルト（primary, md）
<Button>デフォルトボタン</Button>

// サイズを大きく
<Button size="lg">大きいボタン</Button>

// アウトラインスタイル
<Button variant="outline">アウトラインボタン</Button>

// 複数のバリエーションを組み合わせる
<Button variant="secondary" size="sm">小さいセカンダリボタン</Button>
```

## 応用例：Containerコンポーネント

実際のプロジェクトでは、レイアウトの一貫性を保ちながら、様々なセクションやページで柔軟に対応できる `Container` コンポーネントがあると便利です。CVAを使って、以下のようなバリエーションを持つContainerコンポーネントを実装できます：

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva(
  "mx-auto px-4 sm:px-6 lg:px-8", // 基本スタイル
  {
    variants: {
      size: {
        xs: "max-w-2xl",
        sm: "max-w-3xl",
        md: "max-w-4xl",
        lg: "max-w-5xl",
        xl: "max-w-6xl",
        "2xl": "max-w-7xl",
        full: "max-w-full",
      },
      padding: {
        none: "py-0",
        xs: "py-2",
        sm: "py-4",
        md: "py-8",
        lg: "py-12",
        xl: "py-16",
      },
      position: {
        default: "",
        relative: "relative",
      },
      zIndex: {
        none: "",
        base: "z-10",
        high: "z-20",
        highest: "z-50",
      },
    },
    defaultVariants: {
      size: "2xl",
      padding: "md",
      position: "default",
      zIndex: "none",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({
  className,
  size,
  padding,
  position,
  zIndex,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ size, padding, position, zIndex }), className)}
      {...props}
    />
  )
}
```

このContainerコンポーネントを使うことで、多様なレイアウトニーズに対応できます：

```tsx
// 標準的なコンテナ（2xl, padding-md）
<Container>
  通常のコンテンツ
</Container>

// 幅が狭く、パディングが大きいコンテナ
<Container size="md" padding="lg">
  重要なコンテンツ
</Container>

// 最大幅で、パディングなしのコンテナ
<Container size="full" padding="none">
  フルワイドのコンテンツ
</Container>

// 相対位置で高いz-indexを持つコンテナ（ヒーローセクションなど）
<Container position="relative" zIndex="high">
  重なり合う要素がある場合
</Container>
```

## CVAの実際の使用シーン

CVAは以下のような場面で特に威力を発揮します：

1. **UIコンポーネントライブラリの構築**
   - 一貫したデザインシステムの実装
   - 多様なバリエーションを持つコンポーネント（ボタン、カード、アラートなど）

2. **レイアウトコンポーネント**
   - コンテナ、グリッド、セクションなど
   - レスポンシブデザインの一貫した適用

3. **フォーム要素**
   - 入力フィールド、セレクトボックス、チェックボックスなど
   - 状態（エラー、無効、フォーカスなど）に応じたスタイリング

4. **条件付きスタイリング**
   - ダークモード/ライトモードの切り替え
   - ユーザー設定に基づくテーマ

## CVAの利点

1. **型安全性**
   - TypeScriptと完全に統合され、型エラーを事前に検出
   - コード補完によるDXの向上

2. **保守性の向上**
   - スタイルの定義を一箇所にまとめることが可能
   - コンポーネントの拡張が容易

3. **テストのしやすさ**
   - バリエーションの組み合わせを系統的にテスト可能

4. **コードの簡潔さ**
   - 条件付きロジックを減らし、宣言的なスタイル定義が可能

## まとめ

class-variance-authority (CVA)は、モダンなReactアプリケーションでコンポーネントのバリエーションを管理するための強力なツールです。Tailwind CSSなどのユーティリティCSSと組み合わせることで、型安全で保守性の高いUIコンポーネントを構築できます。

Container コンポーネントの例からわかるように、一度実装してしまえば、アプリケーション全体で一貫したレイアウトを簡単に適用できるようになります。また、将来的な要件変更にも柔軟に対応できるため、長期的なプロジェクトでも大きなメリットがあります。

CVAと他のユーティリティ（clsx、tailwind-mergeなど）を組み合わせることで、モダンなReactアプリケーションにおけるCSSの管理を大幅に改善できるでしょう。

## 参考リンク

- [class-variance-authority GitHub](https://github.com/joe-bell/cva)
- [shadcn/ui](https://ui.shadcn.com/) - CVAを活用したコンポーネントライブラリ
- [Tailwind CSS](https://tailwindcss.com/)
