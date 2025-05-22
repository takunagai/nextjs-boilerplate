# テーブルコンポーネント

Next.js Boilerplateに実装されている高機能なテーブルコンポーネントのマニュアルです。このコンポーネントは柔軟な構成、多様なカスタマイズオプション、優れたアクセシビリティを備えています。

## 目次

1. [概要](#概要)
2. [特徴](#特徴)
3. [基本的な使い方](#基本的な使い方)
4. [応用的な使い方](#応用的な使い方)
5. [プロパティとバリアント](#プロパティとバリアント)
6. [サブコンポーネント](#サブコンポーネント)
7. [アクセシビリティ](#アクセシビリティ)
8. [ベストプラクティス](#ベストプラクティス)

## 概要

テーブルコンポーネントは、データを整形して表示するためのコンポーネントで、コンポーネント合成パターン（Compound Component）を採用しています。これにより、柔軟なAPIを提供し、さまざまなユースケースに対応できます。

## 特徴

- **2つの使用方法**: データとカラム定義による宣言的な使用方法と、従来のHTMLテーブル要素による命令的な使用方法をサポート
- **柔軟なバリアント**: 複数のスタイルバリアントを組み合わせてカスタマイズ可能
- **ソート機能**: カラムごとのソート機能を内蔵
- **アクセシビリティ対応**: WAI-ARIAの基準に準拠した設計
- **Tailwind CSS v4対応**: 最新のTailwind CSS機能を活用
- **レスポンシブ対応**: さまざまな画面サイズに適応
- **型安全**: TypeScript対応で型安全な実装

## 基本的な使い方

テーブルコンポーネントは2つの主要な使用方法をサポートしています。

### 方法1: データドリブンアプローチ

```tsx
import { Table } from "@/components/ui/table";

// カラム定義
const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (data) => data.value,
  },
  {
    accessorKey: "name",
    header: "名前",
    cell: (data) => data.value,
  },
  {
    accessorKey: "email",
    header: "メールアドレス",
    cell: (data) => data.value,
  },
];

// データ
const data = [
  { id: 1, name: "田中太郎", email: "tanaka@example.com" },
  { id: 2, name: "山田花子", email: "yamada@example.com" },
  { id: 3, name: "佐藤一郎", email: "sato@example.com" },
];

// 使用例
export default function UsersTable() {
  return (
    <Table
      data={data}
      columns={columns}
      variant="bordered"
      size="md"
      striped={true}
    />
  );
}
```

### 方法2: 宣言的アプローチ

```tsx
import { Table } from "@/components/ui/table";

export default function UsersTable() {
  return (
    <Table variant="bordered" size="md" striped={true}>
      <Table.caption>ユーザー一覧</Table.caption>
      <Table.thead>
        <Table.tr>
          <Table.th>ID</Table.th>
          <Table.th>名前</Table.th>
          <Table.th>メールアドレス</Table.th>
        </Table.tr>
      </Table.thead>
      <Table.tbody>
        <Table.tr>
          <Table.td>1</Table.td>
          <Table.td>田中太郎</Table.td>
          <Table.td>tanaka@example.com</Table.td>
        </Table.tr>
        <Table.tr>
          <Table.td>2</Table.td>
          <Table.td>山田花子</Table.td>
          <Table.td>yamada@example.com</Table.td>
        </Table.tr>
        <Table.tr>
          <Table.td>3</Table.td>
          <Table.td>佐藤一郎</Table.td>
          <Table.td>sato@example.com</Table.td>
        </Table.tr>
      </Table.tbody>
    </Table>
  );
}
```

また、HTMLテーブル要素に対応する低レベルAPIも提供しています：

```tsx
<Table>
  <Table.caption>ユーザー一覧</Table.caption>
  <Table.thead>
    <Table.tr>
      <Table.th>ID</Table.th>
      <Table.th>名前</Table.th>
    </Table.tr>
  </Table.thead>
  <Table.tbody>
    {users.map(user => (
      <Table.tr key={user.id}>
        <Table.td>{user.id}</Table.td>
        <Table.td>{user.name}</Table.td>
      </Table.tr>
    ))}
  </Table.tbody>
</Table>
```

## 応用的な使い方

### ソート機能

テーブルコンポーネントにはソート機能が組み込まれています。

```tsx
import { Table } from "@/components/ui/table";

const columns = [
  {
    accessorKey: "name",
    header: "名前",
    cell: (data) => data.value,
    sortable: true,
  },
  {
    accessorKey: "age",
    header: "年齢",
    cell: (data) => data.value,
    sortable: true,
  },
];

export default function SortableTable() {
  return <Table data={data} columns={columns} />;
}
```

### カスタムセルレンダリング

```tsx
const columns = [
  {
    accessorKey: "status",
    header: "ステータス",
    cell: (data) => {
      const status = data.value;
      return (
        <div className="flex items-center">
          <div
            className={cn(
              "h-3 w-3 rounded-full mr-2",
              status === "active" ? "bg-green-500" : "bg-red-500"
            )}
          />
          {status === "active" ? "有効" : "無効"}
        </div>
      );
    },
  },
];
```

### アクセシビリティ対応テーブル

```tsx
<Table aria-labelledby="table-heading" aria-describedby="table-desc">
  <Table.caption id="table-heading">四半期売上データ</Table.caption>
  <Table.thead>
    <Table.tr>
      <Table.th scope="col">期間</Table.th>
      <Table.th scope="col">売上</Table.th>
    </Table.tr>
  </Table.thead>
  <Table.tbody>
    <Table.tr>
      <Table.th scope="row">Q1</Table.th>
      <Table.td>1,250,000円</Table.td>
    </Table.tr>
    <Table.tr>
      <Table.th scope="row">Q2</Table.th>
      <Table.td>1,420,000円</Table.td>
    </Table.tr>
  </Table.tbody>
  <p id="table-desc" className="sr-only">
    2023年度の四半期ごとの売上データ
  </p>
</Table>
```

## プロパティとバリアント

### テーブルプロパティ

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|-------|---------|------|
| `data` | `TData[]` | `[]` | テーブルに表示するデータの配列 |
| `columns` | `ColumnDef<TData>[]` | `[]` | カラム定義の配列 |
| `variant` | `"default" \| "bordered" \| "card"` | `"default"` | テーブルの視覚的バリアント |
| `size` | `"xs" \| "sm" \| "default" \| "md" \| "lg"` | `"default"` | テーブルのサイズ |
| `align` | `"default" \| "center" \| "left" \| "right"` | `"default"` | テーブルの文字揃え |
| `borderedCells` | `boolean \| "none" \| "all" \| "horizontal" \| "vertical"` | `false` | セルの境界線の表示スタイル |
| `striped` | `boolean` | `false` | 縞模様の行を表示するかどうか |
| `captionPosition` | `"top" \| "bottom"` | `"bottom"` | キャプションの位置 |

### カラム定義プロパティ

| プロパティ | 型 | 説明 |
|------------|-------|------|
| `accessorKey` | `keyof TData \| string` | データオブジェクトからのアクセスキー |
| `id` | `string` | カラムの一意識別子（省略可） |
| `header` | `React.ReactNode \| ((props: {column: ColumnDef<TData>}) => React.ReactNode)` | ヘッダーセルのコンテンツ |
| `cell` | `(data: TData) => React.ReactNode` | セルのレンダリング関数 |
| `sortable` | `boolean` | ソート可能かどうか |

## サブコンポーネント

テーブルコンポーネントは以下のサブコンポーネントを提供しています：

### 高レベルコンポーネント

- `Table.Caption`: テーブルのキャプション
- `Table.Header`: テーブルのヘッダー行
- `Table.Body`: テーブルの本体
- `Table.Footer`: テーブルのフッター
- `Table.Row`: テーブルの行
- `Table.Head`: テーブルのヘッダーセル
- `Table.Cell`: テーブルのデータセル

### HTMLプリミティブ要素

- `Table.caption`: HTMLの`<caption>`要素
- `Table.thead`: HTMLの`<thead>`要素
- `Table.tbody`: HTMLの`<tbody>`要素
- `Table.tfoot`: HTMLの`<tfoot>`要素
- `Table.tr`: HTMLの`<tr>`要素
- `Table.th`: HTMLの`<th>`要素
- `Table.td`: HTMLの`<td>`要素

## アクセシビリティ

テーブルコンポーネントは、WAI-ARIAの基準に従って設計されています：

- 適切な`<caption>`要素と`id`の使用
- `<th>`要素に`scope`属性を追加（`"col"`または`"row"`）
- 複雑なテーブルには`aria-labelledby`と`aria-describedby`を使用
- ソート可能なカラムには`aria-sort`属性を追加
- スクリーンリーダー用の追加コンテキスト情報を提供

## ベストプラクティス

1. **適切なタグの使用**:
   - ヘッダーには`<Table.th>`または`<Table.Head>`を使用
   - データセルには`<Table.td>`または`<Table.Cell>`を使用
   - 行の見出しには`<Table.th scope="row">`を使用

2. **レスポンシブ対応**:
   - 小さな画面ではスクロール可能なコンテナでテーブルをラップ
   - 重要な列を優先的に表示
   - 必要に応じて代替レイアウトを提供

3. **パフォーマンス最適化**:
   - 大量のデータを扱う場合は仮想化を検討
   - 必要に応じて遅延読み込みを実装

4. **アクセシビリティ**:
   - キーボードナビゲーションを確保
   - スクリーンリーダーでの理解を助けるコンテキスト情報を提供
   - 十分なコントラストを確保

5. **デザインの一貫性**:
   - サイト全体で一貫したテーブルスタイルを使用
   - 意味のある色の使用（赤=エラー、緑=成功など）
