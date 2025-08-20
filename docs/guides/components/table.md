# テーブルコンポーネント

テーブルコンポーネントは、データを整理して表示するためのフレキシブルなコンポーネントです。異なるスタイルやレイアウトのバリエーション、アクセシビリティ機能を備えています。

## 目次

- [概要](#概要)
- [インポート](#インポート)
- [使用方法](#使用方法)
- [プロパティ](#プロパティ)
- [バリエーション](#バリエーション)
- [レスポンシブ対応](#レスポンシブ対応)
- [アクセシビリティ](#アクセシビリティ)
- [ユースケース](#ユースケース)
- [API リファレンス](#api-リファレンス)

## 概要

テーブルコンポーネントは、データの表示や分析に適した構造化されたレイアウトを提供します。HTML の標準テーブル要素をベースにしながら、さまざまなスタイリングオプションとアクセシビリティ機能を追加しています。

### shadcn/ui のテーブル非採用の理由

このプロジェクトでは、shadcn/ui が提供するデフォルトの Table コンポーネントではなく、独自のテーブル実装を採用しています。その理由は以下の通りです：

1. **レスポンシブ性の課題**: shadcn/ui のテーブルはビューポートクエリに依存しており、コンテナクエリベースのレスポンシブデザインには適していません。
2. **機能拡張の柔軟性**: バリエーション、罫線スタイル、サイズオプションなど、より豊富なカスタマイズオプションを提供できます。
3. **アクセシビリティの向上**: ARIA属性のサポートなど、より高度なアクセシビリティ機能を組み込むことができます。
4. **一貫したデザインシステム**: プロジェクト全体のデザイン要件に合わせて最適化された実装が可能になります。

この実装では、基本的なHTML標準のテーブル要素を尊重しながら、cva（class-variance-authority）を活用して、様々なバリエーションを提供しています。

## インポート

```tsx
import { Table } from "@/components/ui/table";
```

## 使用方法

基本的な使い方は以下の通りです：

```tsx
<Table>
  <Table.caption>テーブルのキャプション</Table.caption>
  <Table.thead>
    <Table.tr>
      <Table.th>ヘッダー1</Table.th>
      <Table.th>ヘッダー2</Table.th>
    </Table.tr>
  </Table.thead>
  <Table.tbody>
    <Table.tr>
      <Table.td>セル内容1</Table.td>
      <Table.td>セル内容2</Table.td>
    </Table.tr>
  </Table.tbody>
</Table>
```

## プロパティ

### テーブル本体 (Table)

| プロパティ | タイプ | デフォルト | 説明 |
|------------|--------|------------|------|
| `variant` | `"default" \| "bordered" \| "card"` | `"default"` | テーブル全体の見た目スタイル |
| `borderedCells` | `"none" \| "all" \| "horizontal" \| "vertical"` | `"all"` | セルの罫線スタイル |
| `striped` | `boolean` | `false` | 偶数行の背景色を交互に変更するかどうか |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | テーブルのサイズ（パディングとフォントサイズ） |
| `captionPosition` | `"top" \| "bottom"` | `"top"` | キャプションの位置 |
| `align` | `"left" \| "center" \| "right"` | `"center"` | テキストの配置 |

### テーブル見出し (Table.th)

| プロパティ | タイプ | デフォルト | 説明 |
|------------|--------|------------|------|
| `scope` | `"col" \| "row"` | `"col"` | 見出しが列ヘッダか行ヘッダかを指定（アクセシビリティ用） |

## バリエーション

### 1. 基本スタイル

```tsx
<Table>
  {/* ...テーブル内容... */}
</Table>
```

### 2. ボーダー付きテーブル

```tsx
<Table variant="bordered">
  {/* ...テーブル内容... */}
</Table>
```

### 3. カード型テーブル

```tsx
<Table variant="card">
  {/* ...テーブル内容... */}
</Table>
```

### 4. ストライプ付きテーブル

```tsx
<Table striped={true}>
  {/* ...テーブル内容... */}
</Table>
```

### 5. 罫線オプション

```tsx
<Table borderedCells="horizontal"> {/* 水平罫線のみ */}
  {/* ...テーブル内容... */}
</Table>

<Table borderedCells="vertical"> {/* 垂直罫線のみ */}
  {/* ...テーブル内容... */}
</Table>

<Table borderedCells="all"> {/* 全セルに罫線 */}
  {/* ...テーブル内容... */}
</Table>

<Table borderedCells="none"> {/* 罫線なし */}
  {/* ...テーブル内容... */}
</Table>
```

### 6. サイズバリエーション

```tsx
<Table size="xs"> {/* 最小サイズ */}
  {/* ...テーブル内容... */}
</Table>

<Table size="sm"> {/* 小サイズ */}
  {/* ...テーブル内容... */}
</Table>

<Table size="md"> {/* 中サイズ（デフォルト） */}
  {/* ...テーブル内容... */}
</Table>

<Table size="lg"> {/* 大サイズ */}
  {/* ...テーブル内容... */}
</Table>
```

### 7. テキスト配置

```tsx
<Table align="left"> {/* 左揃え */}
  {/* ...テーブル内容... */}
</Table>

<Table align="center"> {/* 中央揃え */}
  {/* ...テーブル内容... */}
</Table>

<Table align="right"> {/* 右揃え */}
  {/* ...テーブル内容... */}
</Table>
```

## レスポンシブ対応

テーブルはモバイル画面に対応するために複数の方法を使用できます：

### 1. 横スクロール

テーブルは自動的に横スクロール可能なコンテナ内に配置されます。

```tsx
{/* 横スクロールは自動的に適用されます */}
<Table>
  {/* ...テーブル内容... */}
</Table>
```

### 2. 選択的表示

Tailwind CSSのレスポンシブクラスを使用して、画面サイズに応じて列の表示/非表示を制御できます。

```tsx
<Table>
  <Table.thead>
    <Table.tr>
      <Table.th>常に表示</Table.th>
      <Table.th className="hidden md:table-cell">中サイズ以上で表示</Table.th>
      <Table.th className="hidden lg:table-cell">大サイズ以上で表示</Table.th>
    </Table.tr>
  </Table.thead>
  <Table.tbody>
    <Table.tr>
      <Table.td>セル1</Table.td>
      <Table.td className="hidden md:table-cell">セル2</Table.td>
      <Table.td className="hidden lg:table-cell">セル3</Table.td>
    </Table.tr>
  </Table.tbody>
</Table>
```

### 3. コンテナクエリ

Tailwind CSSのコンテナクエリを使用して、親コンテナのサイズに応じた表示制御も可能です。

```tsx
<div className="@container">
  <Table>
    <Table.thead>
      <Table.tr>
        <Table.th>常に表示</Table.th>
        <Table.th className="hidden @md:table-cell">コンテナがmd以上で表示</Table.th>
      </Table.tr>
    </Table.thead>
    {/* ... */}
  </Table>
</div>
```

## アクセシビリティ

テーブルコンポーネントは、WAI-ARIAに準拠した以下のアクセシビリティ機能を提供します：

### 1. 適切なマークアップ

- `<th>` 要素には適切な `scope` 属性（`"col"` または `"row"`）を使用
- 複雑なテーブルでは `headers` 属性を使用して関連付け

```tsx
<Table>
  <Table.thead>
    <Table.tr>
      <Table.th id="header1" scope="col">ヘッダー1</Table.th>
    </Table.tr>
  </Table.thead>
  <Table.tbody>
    <Table.tr>
      <Table.td headers="header1">参照するヘッダーを指定</Table.td>
    </Table.tr>
  </Table.tbody>
</Table>
```

### 2. ARIA属性

テーブルには以下のARIA属性を使用できます：

```tsx
<Table
  aria-labelledby="table-title"      // テーブルを説明する要素のID
  aria-describedby="table-desc"      // テーブルの追加説明を含む要素のID
>
  {/* ... */}
</Table>

{/* ソート可能な列ヘッダーの例 */}
<Table.th aria-sort="ascending">     // ソート状態（ascending, descending, none）
  価格
</Table.th>
```

### 3. フォーカス可視化

キーボードユーザー向けにテーブル行にタブフォーカスを設定できます：

```tsx
<Table.tr 
  tabIndex={0}
  className="focus:outline-none focus:ring-2 focus:ring-primary"
  aria-label="行の内容の説明"
>
  {/* ... */}
</Table.tr>
```

## ユースケース

### 1. データリスト表示

```tsx
<Table variant="bordered" size="md">
  <Table.caption>製品リスト</Table.caption>
  <Table.thead>
    <Table.tr>
      <Table.th>製品名</Table.th>
      <Table.th>価格</Table.th>
      <Table.th>在庫</Table.th>
    </Table.tr>
  </Table.thead>
  <Table.tbody>
    {products.map((product) => (
      <Table.tr key={product.id}>
        <Table.td>{product.name}</Table.td>
        <Table.td>{product.price}</Table.td>
        <Table.td>{product.stock}</Table.td>
      </Table.tr>
    ))}
  </Table.tbody>
</Table>
```

### 2. 分析データ表示

```tsx
<Table variant="card" striped={true} align="right">
  <Table.caption>四半期売上実績</Table.caption>
  <Table.thead>
    <Table.tr>
      <Table.th scope="col">項目</Table.th>
      <Table.th scope="col">Q1</Table.th>
      <Table.th scope="col">Q2</Table.th>
      <Table.th scope="col">Q3</Table.th>
      <Table.th scope="col">Q4</Table.th>
      <Table.th scope="col">合計</Table.th>
    </Table.tr>
  </Table.thead>
  <Table.tbody>
    <Table.tr>
      <Table.th scope="row">売上</Table.th>
      <Table.td>3,250</Table.td>
      <Table.td>4,800</Table.td>
      <Table.td>4,500</Table.td>
      <Table.td>4,000</Table.td>
      <Table.td>16,550</Table.td>
    </Table.tr>
    {/* ... */}
  </Table.tbody>
</Table>
```

## API リファレンス

```tsx
// コンポーネントの型定義
type TableProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "card";
  borderedCells?: "none" | "all" | "horizontal" | "vertical";
  striped?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  captionPosition?: "top" | "bottom";
  align?: "left" | "center" | "right";
} & HTMLAttributes<HTMLTableElement>;

// サブコンポーネント
Table.caption: typeof Caption;
Table.thead: typeof Thead;
Table.tbody: typeof Tbody;
Table.tfoot: typeof Tfoot;
Table.tr: typeof Tr;
Table.th: typeof Th;
Table.td: typeof Td;
```

## カスタマイズ

Tailwind CSSクラスを直接適用してテーブルをカスタマイズできます：

```tsx
// 特定のセルにカスタムスタイルを適用
<Table.td className="bg-primary/10 font-bold">
  カスタムスタイル
</Table.td>

// テーブル全体にカスタムスタイルを適用
<Table className="[&_th]:bg-secondary [&_tr:hover]:bg-secondary/20">
  {/* ... */}
</Table>
```

---

詳細な使用例は `/examples/table` ページを参照してください。
