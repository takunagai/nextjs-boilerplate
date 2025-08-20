# useScroll - 汎用的なスクロール検出フック

## 概要

`useScroll`は、ウェブページのスクロール状態を検出し、UIコンポーネントの動的な表示制御を実現するための汎用的なReactカスタムフックです。スクロール方向、位置、ページの最上部/最下部の検出など、多彩な情報を提供します。

## インストール

このフックはプロジェクト内部で実装されており、以下のようにインポートして使用できます：

```tsx
import { useScroll } from "@/hooks/useScroll";
```

## 主な特徴

### 1. 高い汎用性
- 汎用的な命名により、特定のユースケースに限定されない柔軟な設計
- 様々なUIコンポーネント（ヘッダー、フローティングボタン、進捗バーなど）での再利用が可能
- 詳細なスクロール情報を提供し、複雑な条件分岐にも対応

### 2. 豊富なカスタマイズオプション
- **threshold**: スクロールアクションを実行する閾値（px）
- **topOffset**: 上部での常時表示マージン（px）
- **onlyDirectionChange**: 方向変化時のみ更新するかどうか
- **throttleMs**: パフォーマンス調整用スロットリング時間（ms）
- **initiallyVisible**: 初期表示状態の設定

### 3. 詳細なスクロール情報
- **direction**: 現在のスクロール方向（上/下）
- **visible**: 要素を表示すべきかどうか
- **scrollY**: 現在のスクロール位置（px）
- **isAtTop**: ページ最上部にいるかどうか
- **isAtBottom**: ページ最下部に到達したかどうか
- **previousScrollY**: 前回のスクロール位置（px）

### 4. パフォーマンス最適化
- スロットリングによるイベント処理頻度の制御
- 必要時のみ状態更新によるレンダリングの最適化
- パッシブイベントリスナーでブラウザのメインスレッド負荷を軽減
- クリーンアップ処理によるメモリリークの防止

## API

### オプション（UseScrollOptions）

| パラメータ | 型 | デフォルト値 | 説明 |
|------------|------|---------|------|
| threshold | number | 10 | スクロールアクションを実行する閾値（px） |
| topOffset | number | 0 | 上部での常時表示マージン（px） |
| onlyDirectionChange | boolean | false | 方向変化時のみ状態を更新するかどうか |
| throttleMs | number | 100 | スクロールイベントの発火間隔（ms） |
| initiallyVisible | boolean | true | 初期表示状態 |

### 戻り値（ScrollState）

| プロパティ | 型 | 説明 |
|------------|------|------|
| direction | "up" \| "down" \| null | 現在のスクロール方向（最初はnull） |
| visible | boolean | 要素を表示すべきかどうか |
| scrollY | number | 現在のスクロール位置（px） |
| isAtTop | boolean | ページ最上部にいるかどうか |
| isAtBottom | boolean | ページ最下部に到達したかどうか |
| previousScrollY | number | 前回のスクロール位置（px） |

## 使用例

### 基本的な使い方

```tsx
import { useScroll } from "@/hooks/useScroll";

function Header() {
  // 基本的な使い方（デフォルト設定）
  const { visible } = useScroll();
  
  return (
    <header className={`sticky top-0 transition-transform duration-300 ${!visible ? "-translate-y-full" : ""}`}>
      ヘッダーコンテンツ
    </header>
  );
}
```

### カスタムオプションを使用した例

```tsx
import { useScroll } from "@/hooks/useScroll";

function AdvancedHeader() {
  // 高度なカスタマイズ
  const { visible, direction, isAtTop } = useScroll({
    threshold: 50,              // 50px以上のスクロールで反応
    topOffset: 200,             // 上部200pxでは常に表示
    onlyDirectionChange: true,  // 方向変化時のみ更新
    throttleMs: 50              // より高頻度で更新
  });
  
  return (
    <header className={`
      sticky top-0 
      transition-all duration-300
      ${!visible ? "-translate-y-full" : ""}
      ${!isAtTop ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"}
    `}>
      ヘッダーコンテンツ
      {direction === "down" && <div className="progress-bar" />}
    </header>
  );
}
```

### 様々なUIコンポーネントでの活用

```tsx
function App() {
  const { visible, isAtTop, isAtBottom, scrollY, direction } = useScroll();
  
  return (
    <div>
      {/* ヘッダーのスクロール連動 */}
      <Header className={visible ? "visible" : "hidden"} />
      
      {/* スクロール進捗バー */}
      <ProgressBar 
        progress={scrollY / (document.body.scrollHeight - window.innerHeight) * 100} 
      />
      
      {/* スクロール方向に応じた矢印表示 */}
      <ScrollIndicator direction={direction} />
      
      {/* 下スクロールで表示されるフローティングボタン */}
      {!isAtTop && direction === "down" && <FloatingActionButton />}
      
      {/* ページ最下部で表示されるトップへ戻るボタン */}
      {isAtBottom && <BackToTopButton />}
      
      {/* スクロール位置に基づくアニメーション要素 */}
      <AnimatedElement 
        animate={scrollY > 300} 
        animationInClass="fade-in"
        animationOutClass="fade-out"
      />
    </div>
  );
}
```

## ベストプラクティス

### 1. スクロール閾値の最適化
頻繁な表示/非表示の切り替えを防ぐため、適切な`threshold`値を設定しましょう。一般的には、10〜50pxの範囲が適切です。

### 2. スロットリングの調整
パフォーマンスとレスポンシブ性のバランスを取るために、`throttleMs`を適切に設定します。滑らかなアニメーションには50ms前後、基本的な表示/非表示には100msが推奨されます。

### 3. クライアントサイドでの使用
このフックはブラウザ環境に依存するため、必ずクライアントサイドコンポーネント（"use client"ディレクティブを持つコンポーネント）内で使用してください。

### 4. トランジション効果の活用
表示/非表示の切り替え時にはCSS transitionを活用することで、滑らかな視覚的効果を実現できます。

```css
.header {
  transition: transform 300ms ease-in-out;
}
```

## トラブルシューティング

### スクロール検出が動作しない
- コンポーネントが"use client"ディレクティブを持っているか確認
- 正しいスクロール可能な要素が存在するか確認（ページの高さが不足していないか）
- スクロールイベントが他のライブラリによって妨げられていないか確認

### パフォーマンスの問題
- `throttleMs`の値を増やして処理頻度を下げる
- 複雑な条件や計算をメモ化する
- 頻繁な再レンダリングを避けるために`React.memo`や`useMemo`を活用

## まとめ

`useScroll`フックは、スクロールに応じたUIの動的な制御を実現するための強力で柔軟なツールです。簡単な実装からカスタマイズの必要な複雑なシナリオまで、幅広いユースケースに対応できます。ヘッダー、ナビゲーション、フローティングボタンなど、多様なUIコンポーネントのインタラクティブな操作に活用してください。
