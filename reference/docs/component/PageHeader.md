# PageHeaderコンポーネント

ページタイトルと説明文を一貫したデザインで表示するためのヘッダーコンポーネントです。`Heading`コンポーネントをラップして、一般的なページヘッダーのパターンを簡潔に記述できます。

## 特徴

- ページタイトル（h1）と説明文を統一されたデザインで表示
- Headingの全プロパティを透過的にサポート
- シンプルなAPIでコード重複を削減
- デフォルト値が設定済みでプロジェクト全体で一貫性を維持

## インポート

```tsx
import { PageHeader } from "@/components/ui/page-header";
```

## 基本的な使い方

```tsx
<PageHeader title="ページタイトル" />
```

説明文（descriptionプロパティ）を追加:

```tsx
<PageHeader 
  title="ページタイトル"
  description="このページについての説明文をここに記述します。"
/>
```

## プロパティ（Props）

### 主要プロパティ

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|-------------|------|
| `title` | `React.ReactNode` | - | **必須**。見出しテキスト |
| `description` | `React.ReactNode` | - | 省略可能。サブ説明文 |

### Headingから継承したプロパティ

下記のプロパティは`Heading`コンポーネントから継承しており、デフォルト値が設定されています。
必要に応じて上書き可能です。

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|-------------|------|
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h1"` | 見出しレベル |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` | `"3xl"` | 見出しのサイズ |
| `align` | `"left" \| "center"` | `"center"` | テキスト配置 |
| `className` | `string` | `"mb-8"` | 追加CSSクラス |
| `borderPosition` | `"none" \| "left" \| "top" \| "bottom" \| "between"` | `"none"` | ボーダーの位置 |
| `borderClass` | `string` | - | ボーダースタイル |
| `icon` | `ReactNode` | - | アイコン要素 |
| `iconColor` | `string` | - | アイコンの色 |

## 使用例

### 基本的な使い方

```tsx
<PageHeader title="ポートフォリオ" />
```

### 説明文付き

```tsx
<PageHeader
  title="サービス"
  description="弊社が提供するサービス一覧です。"
/>
```

### カスタムスタイル

```tsx
<PageHeader
  title="特集記事"
  description="最新の特集記事をご紹介します。"
  borderPosition="bottom"
  borderClass="border-primary border-2"
  align="left"
  className="my-12"
/>
```

### アイコン付き

```tsx
<PageHeader
  title="お問い合わせ"
  description="お気軽にお問い合わせください。"
  icon={<MdEmail className="h-8 w-8" />}
  iconColor="text-primary"
/>
```

## アクセシビリティ

- デフォルトでは`<h1>`タグを使用し、適切な見出し階層を維持
- 説明文は意味的に関連付けられた構造で提供
- コントラスト比を考慮したテキストカラー

## ベストプラクティス

- 各ページのメインタイトルには`PageHeader`を使用し、一貫性を維持する
- 必要以上にプロパティをカスタマイズせず、デフォルト値を活用する
- ページ内の他の見出しには`Heading`コンポーネントを直接使用し、見出し階層を適切に保つ
- ページ内容と関連性のあるタイトルと説明文を設定し、ユーザーの理解を助ける

## 内部実装について

`PageHeader`は内部的に`Heading`コンポーネントを使用しており、`title`は`Heading`の子要素、`description`は`Heading.Lead`として渡されます。その他のプロパティは透過的に`Heading`に渡されます。

```tsx
// 内部実装（概略）
<Heading as={as} size={size} align={align} className={className} {...rest}>
  {title}
  {description && (
    <Heading.Lead className="text-muted-foreground">
      {description}
    </Heading.Lead>
  )}
</Heading>
```

## 注意点

- `PageHeader`の`title`や`description`には、HTMLタグを含む`ReactNode`を渡すことも可能ですが、シンプルなテキストの使用を推奨します。
- `children`プロパティは使用できません（内部的に`title`と`description`が子要素として使用されるため）。
