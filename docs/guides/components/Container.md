# Containerコンポーネント

`Container`は、Next.jsアプリケーションにおけるレイアウト構築の基本となるコンポーネントです。レスポンシブ対応のコンテンツ幅とパディングを簡単に設定でき、一貫したデザインを実現します。

## 使用例

### 基本的な使用方法

```tsx
import { Container } from "@/components/ui/container";

export default function Page() {
  return (
    <Container width="lg" paddingY="md" paddingX="lg">
      <h1>こんにちは、世界！</h1>
      <p>ここにコンテンツを配置します。</p>
    </Container>
  );
}
```

### デフォルト値

プロパティを指定しない場合、以下のデフォルト値が適用されます：

```tsx
// デフォルト値が適用される例
<Container>
  <p>デフォルト設定のコンテナ</p>
</Container>

// 上記は実質的に以下と同等
<Container width="2xl" paddingY="md" paddingX="md" as="div" fluid={false}>
  <p>デフォルト設定のコンテナ</p>
</Container>
```

出力されるHTML：

```html
<div class="w-full mx-auto max-w-2xl sm:max-w-5xl md:max-w-7xl py-4 md:py-8 px-4 sm:px-6 lg:px-8">
  <p>デフォルト設定のコンテナ</p>
</div>
```

### さまざまなバリエーション

#### 幅の調整

```tsx
// 小さいコンテナ
<Container width="sm">コンパクトなコンテンツ</Container>

// 標準サイズ
<Container width="2xl">標準的なコンテンツ</Container>

// 大きいコンテナ
<Container width="4xl">広いレイアウト用コンテンツ</Container>

// 画面幅いっぱい
<Container width="full">フルワイドコンテンツ</Container>
```

#### パディングの調整

```tsx
// パディングなし
<Container paddingX="none" paddingY="none">余白なしコンテンツ</Container>

// 小さいパディング
<Container paddingX="sm" paddingY="sm">小さい余白</Container>

// 大きいパディング
<Container paddingX="2xl" paddingY="xl">大きい余白</Container>
```

#### セマンティックHTML要素の指定

```tsx
// セクションとして使用
<Container as="section" width="lg">
  <h2>セクションタイトル</h2>
  <p>セクションコンテンツ</p>
</Container>

// ヘッダーとして使用
<Container as="header" width="full" paddingY="md">
  <nav>ナビゲーション</nav>
</Container>

// フッターとして使用
<Container as="footer" width="full" paddingY="lg">
  <p>フッターコンテンツ</p>
</Container>
```

出力されるHTML：

```html
<!-- セクションの例 -->
<section class="w-full mx-auto max-w-lg sm:max-w-3xl md:max-w-5xl py-4 md:py-8 px-4 sm:px-6 lg:px-8">
  <h2>セクションタイトル</h2>
  <p>セクションコンテンツ</p>
</section>

<!-- ヘッダーの例 -->
<header class="w-full mx-auto max-w-full py-4 md:py-8 px-4 sm:px-6 lg:px-8">
  <nav>ナビゲーション</nav>
</header>

<!-- フッターの例 -->
<footer class="w-full mx-auto max-w-full py-6 md:py-12 px-4 sm:px-6 lg:px-8">
  <p>フッターコンテンツ</p>
</footer>
```

#### フルワイドレイアウト（fluid）

`fluid`プロパティを使用すると、`width`プロパティの設定を無視して、常に最大幅いっぱい（`max-w-full`）で表示されます：

```tsx
// 通常のコンテナ
<Container width="lg">
  <p>制限された幅のコンテナ</p>
</Container>

// フルワイドコンテナ
<Container fluid>
  <p>最大幅制限なしのコンテナ</p>
</Container>
```

出力されるHTML：

```html
<!-- 通常のコンテナ -->
<div class="w-full mx-auto max-w-lg sm:max-w-3xl md:max-w-5xl py-4 md:py-8 px-4 sm:px-6 lg:px-8">
  <p>制限された幅のコンテナ</p>
</div>

<!-- フルワイドコンテナ -->
<div class="w-full mx-auto max-w-full py-4 md:py-8 px-4 sm:px-6 lg:px-8">
  <p>最大幅制限なしのコンテナ</p>
</div>
```

`fluid`プロパティは、全幅のヘッダーやフッター、背景画像つきのセクションなど、コンテンツを画面幅いっぱいに表示したい場合に便利です。

#### カスタムクラスの追加

```tsx
// 背景色の追加
<Container className="bg-primary text-white">
  カラーコンテナ
</Container>

// ボーダーと角丸の追加
<Container className="border border-gray-200 rounded-lg">
  ボーダー付きコンテナ
</Container>

// シャドウ効果の追加
<Container className="shadow-lg">
  シャドウ付きコンテナ
</Container>
```

#### カスタム幅の指定

```tsx
// カスタム幅の指定
<Container width="custom" customMaxWidth="960px">
  カスタム幅コンテナ
</Container>
```

## 実装のポイント

### 1. Tailwind CSS v4対応

このコンポーネントはTailwind CSS v4のベストプラクティスに従って実装されています。

- `mx-auto`による中央揃えを標準装備
- レスポンシブブレークポイントに対応したサイズ定義
- 新しいCSS変数構文の活用 (`--container-custom-width`)

### 2. Class Variance Authority（CVA）の活用

CVAを使用することで、バリアントベースのクラス設計を実現しています。

```tsx
const containerVariants = cva("w-full mx-auto", {
  variants: {
    width: { /* サイズバリアント */ },
    paddingY: { /* 垂直パディングバリアント */ },
    paddingX: { /* 水平パディングバリアント */ },
  },
  defaultVariants: { /* デフォルト値 */ },
});
```

これにより：

- TypeScriptの型安全性が確保される
- コンポーネントAPIが明確になる
- 一貫したスタイル適用が可能になる

### 3. カスタマイズの柔軟性

#### セマンティックHTMLの選択

```tsx
type AllowedElementType =
  | "div" | "section" | "header" | "footer" | "main"
  | "article" | "aside" | "figure" | "figcaption" | "summary" | "nav";
```

`as`プロパティにより、適切なセマンティックHTML要素を選択可能。SEOとアクセシビリティに配慮した実装です。

#### インラインスタイルとCSS変数

カスタム幅を指定する場合、CSS変数を用いた実装により柔軟性を実現：

```tsx
const style =
  width === "custom" && customMaxWidth
    ? {
        "--container-custom-width": customMaxWidth,
        maxWidth: "var(--container-custom-width)",
      }
    : undefined;
```

### 4. シンプルさと使いやすさの両立

- 不要なプロパティ（`position`、`zIndex`、`centered`など）を削除
- `innerClassName`の排除によるDOMの簡素化
- 基本的なスタイル（中央揃えなど）はデフォルトで提供

### 5. 徹底したドキュメント化

JSDocコメントにより、コンポーネントのプロパティや使用方法が明確化されています：

```tsx
/**
 * 使用するHTML要素
 * @default "div"
 */
as?: AllowedElementType;
```

### 6. プロパティベースとTailwindクラスの使い分け

このコンポーネントでは、プロパティベースの設定とTailwindクラスの直接指定の両方をサポートしています。バランスを考え、最大幅、余白、セマンティックHTML要素をプロパティ化しました。

それぞれのアプローチには、以下のようなメリットとデメリットがあります。

#### プロパティベースの指定

```tsx
<Container width="lg" paddingY="xl" paddingX="md">
  コンテンツ
</Container>
```

**メリット：**

- 型安全性：TypeScriptの型チェックにより、有効な値のみを指定可能
- 一貫性：あらかじめ定義された値セットから選択するため、デザインの一貫性を保ちやすい
- 抽象化：レスポンシブデザインの複雑なクラス設定を簡潔に表現
- コード量削減：長いTailwindクラス文字列を短いプロパティで表現
- 開発体験：プロパティのオートコンプリートで使用可能な選択肢が分かる

**デメリット：**

- 柔軟性の制限：定義済みのバリアントのみに制限される
- 学習コスト：コンポーネント固有のAPIを理解する必要がある
- 間接層：Tailwindクラスとの対応を理解する必要がある

#### Tailwindクラスの直接指定

```tsx
<Container className="bg-gray-100 rounded-lg shadow-md">
  コンテンツ
</Container>
```

**メリット：**

- 最大限の柔軟性：Tailwindのすべての機能を直接利用可能
- 学習転用：Tailwindの知識をそのまま活用できる
- 詳細なカスタマイズ：プロパティでカバーされないスタイルも適用可能
- 即時性：コンポーネントを修正せずに新しいスタイルを適用可能

**デメリット：**

- 型安全性の欠如：誤ったクラス名を指定しても検出されにくい
- 一貫性の維持が困難：異なる開発者が異なるスタイルを適用する可能性
- コード量の増加：複雑なスタイルでは長いクラス文字列になる
- 優先順位の理解が必要：コンポーネントのデフォルトスタイルとの競合を理解する必要がある

#### 推奨される使い方

- **プロパティベース**：レイアウトの基本構造（幅、パディング）に使用
- **Tailwindクラス**：追加的な装飾やコンポーネント固有のスタイル調整に使用

この両方のアプローチを適切に組み合わせることで、一貫性を保ちながらも柔軟なカスタマイズが可能になります。

```tsx
// 良い例：基本構造はプロパティで、装飾はクラスで
<Container 
  width="lg" 
  paddingY="md" 
  className="bg-gray-50 rounded-lg shadow-sm border border-gray-100"
>
  コンテンツ
</Container>
```

## 技術的な詳細

### プロパティ

| プロパティ名 | 型 | デフォルト値 | 説明 |
|------------|-----|------------|------|
| `width` | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl` \| `full` \| `custom` | `2xl` | コンテナの最大幅 |
| `paddingY` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl` \| `3xl` \| `4xl` | `md` | 垂直方向のパディング |
| `paddingX` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl` \| `3xl` \| `4xl` | `md` | 水平方向のパディング |
| `as` | `AllowedElementType` | `div` | 使用するHTML要素 |
| `fluid` | `boolean` | `false` | 最大幅制限なしで表示するかどうか |
| `customMaxWidth` | `string` | `undefined` | カスタム最大幅（width="custom"の場合に使用） |
| `className` | `string` | `undefined` | 追加のTailwindクラス |

### 技術スタック

- **Tailwind CSS**: スタイリングシステム
- **class-variance-authority (CVA)**: バリアントベースのスタイル管理
- **React**: UIコンポーネントフレームワーク
- **TypeScript**: 型安全性の確保

## まとめ

`Container`コンポーネントは、モダンなTailwind CSSの機能を活用しながら、シンプルながらも柔軟なレイアウト構築のための基盤を提供します。過度な抽象化を避け、開発者が直感的に使えるAPIを目指した設計となっています。

この実装によって、プロジェクト全体で一貫したレイアウト構造を維持しつつ、個別のページやセクションに必要なカスタマイズが可能になります。
