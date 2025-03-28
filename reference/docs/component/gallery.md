# ギャラリーコンポーネント

## 概要

`Gallery`コンポーネントは、画像ギャラリーを表示するための柔軟で高度にカスタマイズ可能なReactコンポーネントです。グリッドレイアウトとマソンリーレイアウトの両方をサポートし、画像のアスペクト比、角丸、影、ホバーエフェクト、キャプションの位置とスタイルなど、さまざまなスタイリングオプションを提供します。また、軽量で使いやすいライトボックス機能も内蔵しています。

## インポート方法

```tsx
import { Gallery, type GalleryItem } from "@/components/ui/gallery";
```

## 使用方法

```tsx
<Gallery
  items={galleryItems}
  layout="grid"
  columns="3"
  gap="lg"
  aspectRatio="landscape"
  rounded="md"
  shadow="md"
  hoverEffect="fadeIn"
  captionPosition="overlay"
  captionStyle="gradient"
  lightbox={true}
/>
```

## プロパティ

| プロパティ名 | 型 | デフォルト値 | 説明 |
|-------------|------|-------------|------|
| `items` | `GalleryItem[]` | 必須 | 画像データの配列 |
| `className` | `string` | - | コンポーネントに追加するカスタムクラス |
| `lightbox` | `boolean` | `false` | クリックでライトボックス表示を有効にするか |
| `layout` | `"grid"` \| `"masonry"` | `"grid"` | ギャラリーのレイアウトタイプ |
| `columns` | `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"` \| `"6"` | `"3"` | グリッドの列数 |
| `gap` | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` | `"md"` | アイテム間の間隔 |
| `aspectRatio` | `"auto"` \| `"square"` \| `"landscape"` \| `"portrait"` | `"auto"` | 画像のアスペクト比 |
| `rounded` | `"none"` \| `"sm"` \| `"md"` \| `"lg"` | `"sm"` | 画像の角丸の程度 |
| `shadow` | `"none"` \| `"sm"` \| `"md"` \| `"lg"` | `"none"` | 画像の影の強さ |
| `hoverEffect` | `"none"` \| `"zoom"` \| `"fadeIn"` | `"fadeIn"` | ホバー時のエフェクト |
| `captionPosition` | `"below"` \| `"overlay"` | `"below"` | キャプションの位置 |
| `captionStyle` | `"simple"` \| `"gradient"` \| `"solid"` | `"simple"` | キャプションのスタイル |

### GalleryItemインターフェース

```tsx
export interface GalleryItem {
  id: string | number;      // 一意の識別子
  src: string;              // 画像のURL
  alt: string;              // 代替テキスト（アクセシビリティ用）
  title?: string;           // タイトル（オプショナル）
  description?: string;     // 説明文（オプショナル）
  width?: number;           // 画像の幅（オプショナル）
  height?: number;          // 画像の高さ（オプショナル）
}
```

## バリエーション

### レイアウトオプション

- **grid**: 均一なグリッドレイアウト（列数を指定可能）
- **masonry**: 高さが異なる画像を効率的に配置するマソンリーレイアウト

### アスペクト比オプション

- **auto**: 画像の本来の比率を使用
- **square**: 1:1の正方形
- **landscape**: 16:9の横長
- **portrait**: 3:4の縦長

### 角丸オプション

- **none**: 角丸なし
- **sm**: 小さい角丸
- **md**: 中程度の角丸
- **lg**: 大きい角丸

### 影オプション

- **none**: 影なし
- **sm**: 小さい影
- **md**: 中程度の影
- **lg**: 大きい影

### ホバーエフェクトオプション

- **none**: エフェクトなし
- **zoom**: ホバー時に画像をズーム
- **fadeIn**: ホバー時にフェードインエフェクト

### キャプション位置オプション

- **below**: 画像の下にキャプションを表示
- **overlay**: 画像の上にオーバーレイとしてキャプションを表示

### キャプションスタイルオプション

- **simple**: シンプルなテキストのみ
- **gradient**: グラデーション背景付き
- **solid**: べた塗り背景付き

## 使用例

### 基本的なグリッドレイアウト

```tsx
<Gallery
  items={galleryItems}
  layout="grid"
  columns="3"
  gap="md"
  aspectRatio="landscape"
  rounded="md"
  shadow="sm"
  hoverEffect="zoom"
  captionPosition="below"
  captionStyle="simple"
  lightbox={true}
/>
```

### マソンリーレイアウト（オーバーレイキャプション付き）

```tsx
<Gallery
  items={galleryItems}
  layout="masonry"
  columns="4"
  gap="md"
  aspectRatio="auto"
  rounded="lg"
  shadow="md"
  hoverEffect="fadeIn"
  captionPosition="overlay"
  captionStyle="gradient"
  lightbox={true}
/>
```

### 正方形画像グリッド（ソリッドオーバーレイ付き）

```tsx
<Gallery
  items={squareGalleryItems}
  layout="grid"
  columns="4"
  gap="md"
  aspectRatio="square"
  rounded="lg"
  hoverEffect="zoom"
  captionPosition="overlay"
  captionStyle="solid"
  shadow="lg"
  lightbox={true}
/>
```

## アクセシビリティ

- 画像に適切な`alt`テキストが必須
- キーボードナビゲーションのサポート
- ライトボックス内で矢印キーによるナビゲーション
- 適切なセマンティックHTML要素の使用（`section`と`figure`）
- ARIAラベルの適用

## ベストプラクティス

1. **画像データの準備**:
   - すべての画像に一意の`id`を設定してください
   - アクセシビリティのために`alt`テキストを常に提供してください
   - 可能であれば`width`と`height`を指定して累積レイアウトシフト（CLS）を防ぎます

2. **レイアウトの選択**:
   - 同じアスペクト比の画像には`grid`レイアウトが適しています
   - 異なるサイズの画像には`masonry`レイアウトを検討してください

3. **キャプションの使用**:
   - 情報密度が高い場合は`below`位置が読みやすい
   - ビジュアルインパクトを重視する場合は`overlay`を使用

4. **レスポンシブ対応**:
   - 小さい画面では列数を減らすことを検討してください
   - メディアクエリを使用して異なる画面サイズで異なるバリエーションを適用できます

5. **パフォーマンス**:
   - 大量の画像を表示する場合は、必要に応じて遅延読み込みや仮想化を検討してください

## 注意事項

- マソンリーレイアウトでは、画像の自然な高さを尊重するため、aspect-ratioプロパティは無視されます
- ライトボックス機能を使用するには、`lightbox`プロパティを`true`に設定してください
