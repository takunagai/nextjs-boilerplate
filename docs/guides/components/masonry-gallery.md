# MasonryGallery コンポーネント マニュアル

## 概要

`MasonryGallery` は、画像などのアイテムを高さが不揃いな状態でレンガを積み重ねたように（メイソンリーレイアウト風に）表示するためのReactコンポーネントです。
主にサーバーコンポーネントとしての利用を想定しており、CSSの `columns` プロパティとTailwind CSSのコンテナクエリを活用して、効率的かつレスポンシブなレイアウトを実現します。

## 特長とメリット

- **優れたパフォーマンス**: CSSのネイティブ機能である `columns` プロパティを利用しているため、JavaScriptによる複雑な計算が不要で、特にサーバーサイドでのレンダリングにおいて高いパフォーマンスを発揮します。
- **レスポンシブデザイン対応**: Tailwind CSSのコンテナクエリ (`@container`) を利用し、コンポーネント自身の幅に応じてカラム数を動的に変更します。定義済みのブレークポイント（`xs`, `sm`, `md`, `lg`, `xl`, `2xl`）でカラム数を細かく制御できます。
- **柔軟なカスタマイズ性**:
  - **カラム数**: ブレークポイントごとのカラム数や、全サイズ共通の固定カラム数を指定できます。
  - **ギャップ**: アイテム間の水平方向（`gap`）および垂直方向（`vGap`）の余白を調整可能です。
  - **スタイリング**: コンポーネント全体、各リストアイテム、画像要素に対してカスタムCSSクラスを適用できます。
- **Next.jsとの親和性**: `next/image` コンポーネントを内部で使用し、画像の最適化（遅延読み込み、優先読み込みなど）の恩恵を受けることができます。
- **シンプルなAPI**: 最小限のPropsで基本的な動作を実現しつつ、詳細なカスタマイズも可能なバランスの取れたAPIを提供します。
- **アクセシビリティ**: `aria-label` を使用し、セクションの目的を明示しています。

## 使い方

### 1. インストールとインポート

特別なインストールは不要です。プロジェクト内のコンポーネントをインポートして使用します。

```tsx
import MasonryGallery from "@/components/masonry-gallery/MasonryGallery";
import type { Photo, ColumnsPerBreakpoint } from "@/components/masonry-gallery/types";
```

### 2. 基本的な使用法

`photos` プロパティに表示したい画像の配列を渡すだけで、基本的なメイソンリーギャラリーが表示されます。

```tsx
const myPhotos: Photo[] = [
  { id: "1", src: "/images/photo1.jpg", alt: "Photo 1", width: 800, height: 1200 },
  { id: "2", src: "/images/photo2.jpg", alt: "Photo 2", width: 1200, height: 800 },
  // ... more photos
];

export default function MyPage() {
  return (
    <div>
      <h1>My Awesome Gallery</h1>
      <MasonryGallery photos={myPhotos} />
    </div>
  );
}
```

### 3. Props

| Prop             | 型                                     | デフォルト値 (抜粋)                                                              | 説明                                                                                                                               |
| :--------------- | :------------------------------------- | :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `photos`         | `Photo[]`                              | `undefined` (必須)                                                              | 表示する写真オブジェクトの配列。                                                                                                       |
| `columns`        | `number \| ColumnsPerBreakpoint`         | `{ default: 1, xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }`                             | カラム数の設定。数値の場合は全ブレークポイントで固定。`ColumnsPerBreakpoint` オブジェクトでレスポンシブ設定。                                  |
| `gap`            | `number`                               | `4`                                                                              | 水平方向のギャップ（Tailwind CSSのスペーシングユニット）。`gap-x-{value}` として適用。                                                     |
| `vGap`           | `number`                               | `4`                                                                              | 垂直方向のギャップ（Tailwind CSSのスペーシングユニット）。CSSカスタムプロパティ `--v-gap` として適用。                                         |
| `className`      | `string`                               | `undefined`                                                                      | ギャラリー全体のコンテナ (`<section>`) に適用する追加のCSSクラス。                                                                         |
| `itemClassName`  | `string`                               | `undefined`                                                                      | 各ギャラリーアイテム (`<li>`) に適用する追加のCSSクラス。                                                                               |
| `imageClassName` | `string`                               | `undefined`                                                                      | 各画像 (`<Image>`) に適用する追加のCSSクラス。                                                                                         |
| `imageLoading`   | `'lazy' \| 'eager'`                    | `"lazy"`                                                                         | `next/image` の `loading` プロパティ。                                                                                             |
| `priorityImages` | `number`                               | `3`                                                                              | 最初の `priorityImages` 枚の画像に `priority={true}` を設定し、優先的に読み込みます。                                                      |

### 4. 型定義

#### `Photo`

```typescript
interface Photo {
  id: string;
  src: string;
  alt?: string;
  width: number;
  height: number;
  title?: string; // 画像の下に表示されるタイトル（オプション）
}
```

#### `ColumnsPerBreakpoint`

ブレークポイントごとのカラム数を指定します。キーはTailwind CSSのコンテナクエリブレークポイント名（`@`なし）または `default` です。

```typescript
type ContainerBreakpointName = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface ColumnsPerBreakpoint {
  default?: number; // 幅が他のブレークポイントに一致しない場合のデフォルトカラム数
  xs?: number;    // @xs (320px) 以上
  sm?: number;    // @sm (384px) 以上
  md?: number;    // @md (448px) 以上
  lg?: number;    // @lg (512px) 以上
  xl?: number;    // @xl (576px) 以上
  2xl?: number;   // @2xl (672px) 以上
}

// 例:
const responsiveColumns: ColumnsPerBreakpoint = {
  default: 1, // 最も小さい幅では1カラム
  sm: 2,      // smサイズ以上で2カラム
  lg: 3,      // lgサイズ以上で3カラム
};
```

### 5. カスタムカラム数とギャップの例

```tsx
<MasonryGallery
  photos={myPhotos}
  columns={{ default: 1, md: 2, lg: 4 }}
  gap={8}
  vGap={8}
  itemClassName="rounded-lg overflow-hidden shadow-md"
  imageClassName="hover:scale-105 transition-transform duration-300"
/>
```

## クライアントコンポーネントとしての利用

`MasonryGallery` は主にサーバーコンポーネントとして設計されていますが、クライアントサイドでのインタラクション（例：状態に応じた動的な写真リストの変更など）が必要な場合は、`@/components/masonry-gallery/MasonryGallery.client.tsx` の `ClientMasonryGallery` を使用できます。これは `MasonryGallery` をラップしたクライアントコンポーネントです。

```tsx
"use client"; // クライアントコンポーネント内で使用する場合

import ClientMasonryGallery from "@/components/masonry-gallery/MasonryGallery.client";
import type { Photo } from "@/components/masonry-gallery/types";
// ...
```

## FAQ

**Q1: 特定のブレークポイントでのみカラム数を変更したい場合は？**
A1: `columns` プロパティに `ColumnsPerBreakpoint` オブジェクトを渡し、変更したいブレークポイントのキーとそのカラム数を指定します。指定されなかったブレークポイントは、`default` の値、またはコンポーネント内部のデフォルト設定が適用されます。

**Q2: 画像の読み込みが遅いのですが、どうすれば改善できますか？**
A2: `priorityImages` プロパティを使用して、ビューポート内に最初に表示される可能性が高い画像の枚数を指定してください。これらの画像は優先的に読み込まれます。また、`Photo` オブジェクトの `width` と `height` を正しく指定することで、`next/image` がレイアウトシフトを防ぎ、最適化を効果的に行えるようにしてください。

**Q3: アイテム間の垂直方向のスペースが `gap` プロパティで制御できないのはなぜですか？**
A3: CSSの `columns` プロパティを使用する場合、アイテム間の水平方向のギャップは `column-gap` (Tailwindでは `gap-x-*`) で制御できます。しかし、垂直方向のギャップは直接的には制御できません。そのため、`MasonryGallery` では `vGap` プロパティを受け取り、CSSカスタムプロパティ (`--v-gap`) を介して各リストアイテムの下マージン (`mb-[var(--v-gap)]`) として適用することで、実質的な垂直ギャップを実現しています。

**Q4: `MasonryGallery` 内で `next/image` 以外の要素を表示できますか？**
A4: はい、技術的には可能です。`MasonryGallery` は `photos` 配列を元に `<li>` 要素を生成し、その中に `next/image` とタイトルを表示します。この構造を変更したい場合は、`MasonryGallery` コンポーネント自体をフォークしてカスタマイズするか、より汎用的なリストレンダリングコンポーネントと組み合わせて使用することを検討してください。現在の実装は `next/image` を利用することを前提としています。
