# AnimatedImage コンポーネント

ビューポート進入時にフェードインアニメーションを行う、高性能で拡張可能な画像コンポーネントです。

## 🎯 概要

`AnimatedImage` は Next.js の `Image` コンポーネントを拡張し、以下の機能を提供します：

- **ビューポート進入アニメーション**: Intersection Observer API による効率的な監視
- **アクセシビリティ対応**: `prefers-reduced-motion` の完全サポート
- **エラーハンドリング**: 包括的なエラー境界と復旧機能
- **パフォーマンス最適化**: React 19 Compiler 対応とメモ化戦略
- **TypeScript 完全対応**: 厳格な型安全性と IntelliSense サポート

## 📋 目次

1. [基本的な使用方法](#基本的な使用方法)
2. [API リファレンス](#api-リファレンス)
3. [設定例](#設定例)
4. [アクセシビリティ](#アクセシビリティ)
5. [パフォーマンス考慮事項](#パフォーマンス考慮事項)
6. [トラブルシューティング](#トラブルシューティング)
7. [マイグレーションガイド](#マイグレーションガイド)

## 🚀 基本的な使用方法

### 最小構成

```tsx
import { AnimatedImage } from "@/components/ui/animated-image";

export function SimpleExample() {
	return (
		<AnimatedImage
			src="/images/sample.jpg"
			alt="サンプル画像"
			width={800}
			height={600}
		/>
	);
}
```

### 基本設定付き

```tsx
export function BasicExample() {
	return (
		<AnimatedImage
			src="/images/hero.jpg"
			alt="ヒーロー画像"
			width={1200}
			height={800}
			animation={{
				duration: 0.8,
				yOffset: 30,
				delay: 0.2,
			}}
			intersection={{
				threshold: 0.1,
				rootMargin: "0px 0px -100px 0px",
			}}
			className="rounded-lg shadow-lg"
		/>
	);
}
```

## 📖 API リファレンス

### AnimatedImageProps

`AnimatedImage` は Next.js の `ImageProps` を継承し、以下の追加プロパティを提供します：

#### 基本プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `className` | `string` | `undefined` | 追加の CSS クラス |
| `animation` | `AnimationConfig` | [デフォルト設定](#animationconfig) | アニメーション設定 |
| `intersection` | `IntersectionConfig` | [デフォルト設定](#intersectionconfig) | Intersection Observer 設定 |

#### イベントハンドラー

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `onError` | `(error: Error) => void` | エラー発生時のコールバック |
| `onAnimationStart` | `() => void` | アニメーション開始時のコールバック |
| `onAnimationComplete` | `() => void` | アニメーション完了時のコールバック |

#### 開発・デバッグ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `debug` | `boolean` | `false` | デバッグ情報の表示 |
| `containerProps` | `ComponentProps<typeof motion.div>` | `{}` | コンテナのプロパティ |

### AnimationConfig

アニメーション設定を定義するインターフェースです。

```tsx
interface AnimationConfig {
	/** アニメーション持続時間（秒） */
	duration?: number; // default: 0.6
	
	/** アニメーション遅延（秒） */
	delay?: number; // default: 0
	
	/** イージング関数 */
	ease?: EasingFunction; // default: "easeOut"
	
	/** Y軸移動量（px） */
	yOffset?: number; // default: 20
	
	/** X軸移動量（px） */
	xOffset?: number; // default: 0
	
	/** スケール開始値 */
	initialScale?: number; // default: 1
	
	/** 透明度開始値 */
	initialOpacity?: number; // default: 0
}
```

#### EasingFunction

```tsx
type EasingFunction =
	| "linear"
	| "easeIn"
	| "easeOut"
	| "easeInOut"
	| [number, number, number, number]; // カスタムベジェ曲線
```

### IntersectionConfig

Intersection Observer の設定を定義するインターフェースです。

```tsx
interface IntersectionConfig {
	/** 表示閾値 */
	threshold?: number | number[]; // default: 0.1
	
	/** ルートマージン */
	rootMargin?: string; // default: "0px 0px -50px 0px"
	
	/** 一度だけ実行するか */
	triggerOnce?: boolean; // default: true
	
	/** ルート要素 */
	root?: Element | null; // default: null
}
```

## 🎨 設定例

### 1. 基本的なフェードイン

```tsx
<AnimatedImage
	src="/images/example.jpg"
	alt="基本例"
	width={600}
	height={400}
	animation={{
		duration: 0.6,
		ease: "easeOut",
		yOffset: 20
	}}
/>
```

### 2. スライドアップアニメーション

```tsx
<AnimatedImage
	src="/images/slide-up.jpg"
	alt="スライドアップ"
	width={800}
	height={600}
	animation={{
		duration: 0.8,
		ease: "easeOut",
		yOffset: 50,
		delay: 0.2
	}}
/>
```

### 3. スケールアニメーション

```tsx
<AnimatedImage
	src="/images/scale.jpg"
	alt="スケールアニメーション"
	width={400}
	height={400}
	animation={{
		duration: 1.0,
		ease: "easeInOut",
		initialScale: 0.8,
		yOffset: 0
	}}
/>
```

### 4. カスタムベジェ曲線

```tsx
<AnimatedImage
	src="/images/custom-easing.jpg"
	alt="カスタムイージング"
	width={600}
	height={400}
	animation={{
		duration: 1.2,
		ease: [0.25, 0.1, 0.25, 1], // カスタムベジェ曲線
		yOffset: 30
	}}
/>
```

### 5. 複雑な設定

```tsx
<AnimatedImage
	src="/images/complex.jpg"
	alt="複雑な設定"
	width={1000}
	height={600}
	animation={{
		duration: 1.0,
		delay: 0.3,
		ease: "easeInOut",
		yOffset: 40,
		xOffset: 20,
		initialScale: 0.9,
		initialOpacity: 0
	}}
	intersection={{
		threshold: [0.1, 0.5, 1.0],
		rootMargin: "0px 0px -200px 0px",
		triggerOnce: false
	}}
	onAnimationStart={() => console.log("Animation started")}
	onAnimationComplete={() => console.log("Animation completed")}
	onError={(error) => console.error("Image error:", error)}
	debug={process.env.NODE_ENV === "development"}
/>
```

### 6. リスト表示での使用

```tsx
export function ImageGallery({ images }: { images: ImageData[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{images.map((image, index) => (
				<AnimatedImage
					key={image.id}
					src={image.src}
					alt={image.alt}
					width={400}
					height={300}
					animation={{
						duration: 0.6,
						delay: index * 0.1, // 順次表示
						yOffset: 20
					}}
					className="rounded-lg shadow-md"
				/>
			))}
		</div>
	);
}
```

## ♿ アクセシビリティ

### prefers-reduced-motion 対応

コンポーネントは `prefers-reduced-motion: reduce` 設定を自動的に検出し、アニメーションを無効化します：

```tsx
// ユーザーがアニメーション削減を設定している場合
const REDUCED_MOTION_ANIMATION = {
	duration: 0.01,
	delay: 0,
	ease: "linear",
	yOffset: 0,
	xOffset: 0,
	initialScale: 1,
	initialOpacity: 0
};
```

### ベストプラクティス

1. **適切な `alt` テキスト**: 画像の内容を正確に説明
2. **意味のあるアニメーション**: 装飾的すぎるアニメーションは避ける
3. **適切な遅延時間**: 長すぎる遅延は UX を損なう
4. **キーボードナビゲーション**: フォーカス可能な画像の場合は適切な実装を

```tsx
// ✅ 良い例
<AnimatedImage
	src="/charts/sales-data.png"
	alt="2024年第3四半期売上データ：前年同期比15%増"
	width={800}
	height={600}
	animation={{ duration: 0.6, yOffset: 20 }}
/>

// ❌ 悪い例
<AnimatedImage
	src="/decoration.png"
	alt="image"
	width={100}
	height={100}
	animation={{ duration: 3.0, yOffset: 200 }} // 長すぎる
/>
```

## ⚡ パフォーマンス考慮事項

### 最適化機能

1. **Intersection Observer**: 効率的なビューポート監視
2. **React.memo**: 不必要な再レンダリングを防止
3. **useCallback/useMemo**: 関数とオブジェクトのメモ化
4. **GPU加速**: `transform` と `opacity` による滑らかなアニメーション

### ベストプラクティス

#### ✅ 推奨

```tsx
// 適切なサイズ指定
<AnimatedImage
	src="/images/optimized.webp"
	alt="最適化された画像"
	width={800}
	height={600}
	priority={isAboveTheFold}
	animation={{ duration: 0.6 }}
/>

// バッチでのアニメーション遅延
const images = data.map((item, index) => (
	<AnimatedImage
		key={item.id}
		{...item}
		animation={{
			duration: 0.6,
			delay: Math.min(index * 0.1, 0.5) // 最大0.5秒に制限
		}}
	/>
));
```

#### ❌ 避けるべき

```tsx
// 長すぎるアニメーション
<AnimatedImage
	animation={{ duration: 5.0 }} // 長すぎる
/>

// 過度な並列アニメーション
{images.map((item, index) => (
	<AnimatedImage
		key={item.id}
		animation={{ delay: index * 0.5 }} // 遅延が長すぎる
	/>
))}

// サイズ未指定
<AnimatedImage src="/large-image.jpg" alt="..." />
```

### パフォーマンス監視

```tsx
export function MonitoredImage() {
	const handleAnimationStart = useCallback(() => {
		performance.mark('image-animation-start');
	}, []);
	
	const handleAnimationComplete = useCallback(() => {
		performance.mark('image-animation-complete');
		performance.measure(
			'image-animation-duration',
			'image-animation-start',
			'image-animation-complete'
		);
	}, []);
	
	return (
		<AnimatedImage
			src="/monitored.jpg"
			alt="監視対象画像"
			width={800}
			height={600}
			onAnimationStart={handleAnimationStart}
			onAnimationComplete={handleAnimationComplete}
		/>
	);
}
```

## 🔧 トラブルシューティング

### よくある問題と解決策

#### Q1: アニメーションが実行されない

**症状**: 画像は表示されるが、アニメーションが動作しない

**考えられる原因と解決策**:

1. **prefers-reduced-motion が有効**
   ```tsx
   // デバッグ用
   <AnimatedImage
   	debug={true}
   	src="/test.jpg"
   	alt="テスト"
   	width={400}
   	height={300}
   />
   ```

2. **Intersection Observer の設定問題**
   ```tsx
   // 閾値を下げてみる
   <AnimatedImage
   	intersection={{ threshold: 0.01 }}
   	src="/test.jpg"
   	alt="テスト"
   	width={400}
   	height={300}
   />
   ```

#### Q2: 画像が表示されない

**症状**: コンポーネントは読み込まれるが、画像が表示されない

**解決策**:

1. **エラーハンドリングの追加**
   ```tsx
   <AnimatedImage
   	src="/may-not-exist.jpg"
   	alt="テスト画像"
   	width={400}
   	height={300}
   	onError={(error) => {
   		console.error('画像読み込みエラー:', error);
   		// フォールバック処理
   	}}
   />
   ```

2. **Next.js Image 設定の確認**
   ```tsx
   // next.config.ts
   const nextConfig = {
   	images: {
   		remotePatterns: [
   			{
   				protocol: 'https',
   				hostname: 'example.com',
   				pathname: '/**',
   			},
   		],
   	},
   };
   ```

#### Q3: パフォーマンス問題

**症状**: 大量の画像でパフォーマンスが低下

**解決策**:

1. **適切な遅延設定**
   ```tsx
   {images.map((image, index) => (
   	<AnimatedImage
   		key={image.id}
   		{...image}
   		animation={{
   			delay: Math.min(index * 0.05, 0.3) // 遅延を短縮
   		}}
   	/>
   ))}
   ```

2. **仮想化の検討**
   ```tsx
   import { Virtuoso } from 'react-virtuoso';
   
   <Virtuoso
   	data={images}
   	itemContent={(index, image) => (
   		<AnimatedImage {...image} />
   	)}
   />
   ```

#### Q4: TypeScript エラー

**症状**: 型エラーが発生する

**解決策**:

```tsx
// 正しい型インポート
import type { AnimatedImageProps } from "@/components/ui/animated-image.types";

// カスタムコンポーネントでの使用
interface MyImageProps extends AnimatedImageProps {
	caption?: string;
}

const MyImage: React.FC<MyImageProps> = ({ caption, ...props }) => {
	return (
		<div>
			<AnimatedImage {...props} />
			{caption && <p>{caption}</p>}
		</div>
	);
};
```

### デバッグテクニック

#### デバッグモードの活用

```tsx
<AnimatedImage
	debug={true} // 詳細ログを出力
	src="/debug-test.jpg"
	alt="デバッグテスト"
	width={400}
	height={300}
	onAnimationStart={() => console.log('🎬 アニメーション開始')}
	onAnimationComplete={() => console.log('✅ アニメーション完了')}
	onError={(error) => console.error('❌ エラー:', error)}
/>
```

#### コンソール出力例

```
[AnimatedImage Debug] コンポーネント初期化
[AnimatedImage Debug] prefers-reduced-motion: false
[AnimatedImage Debug] 最終アニメーション設定: {duration: 0.6, delay: 0, ease: "easeOut", yOffset: 20}
[AnimatedImage Debug] Intersection Observer 設定: {threshold: 0.1, rootMargin: "0px 0px -50px 0px"}
🎬 アニメーション開始
✅ アニメーション完了
```

## 🔄 マイグレーションガイド

### 既存の画像コンポーネントからの移行

#### シンプルな Next.js Image から

```tsx
// Before: 既存の実装
<Image
	src="/example.jpg"
	alt="例"
	width={800}
	height={600}
	className="rounded-lg"
/>

// After: AnimatedImage への移行
<AnimatedImage
	src="/example.jpg"
	alt="例"
	width={800}
	height={600}
	className="rounded-lg"
	// アニメーション設定は任意
	animation={{ duration: 0.6, yOffset: 20 }}
/>
```

#### フェードイン付きカスタムコンポーネントから

```tsx
// Before: 独自実装
const FadeInImage = ({ src, alt, className }) => {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef(null);
	
	useEffect(() => {
		const observer = new IntersectionObserver(/* ... */);
		// 独自の実装...
	}, []);
	
	return (
		<div ref={ref} className={`transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
			<Image src={src} alt={alt} />
		</div>
	);
};

// After: AnimatedImage に置き換え
<AnimatedImage
	src={src}
	alt={alt}
	width={800}
	height={600}
	className={className}
	// より豊富な機能が利用可能
	animation={{
		duration: 0.6,
		ease: "easeOut",
		yOffset: 20
	}}
	onAnimationComplete={() => console.log('Animation done!')}
/>
```

### バッチ移行スクリプト例

```bash
# 既存の Image コンポーネントを一括置換
# (実際の使用前にバックアップを取ることを推奨)

find src -name "*.tsx" -type f -exec sed -i.bak \
	's/import Image from "next\/image"/import { AnimatedImage } from "@\/components\/ui\/animated-image"/g' {} \;

find src -name "*.tsx" -type f -exec sed -i.bak \
	's/<Image\s/<AnimatedImage /g' {} \;

find src -name "*.tsx" -type f -exec sed -i.bak \
	's/\/>/\n\tanimation={{ duration: 0.6, yOffset: 20 }}\n\/>/g' {} \;
```

### 段階的移行戦略

#### Phase 1: 新規実装での採用

```tsx
// 新しいコンポーネントのみ AnimatedImage を使用
export function NewHeroSection() {
	return (
		<AnimatedImage
			src="/hero-new.jpg"
			alt="新しいヒーロー画像"
			width={1200}
			height={600}
			priority
			animation={{ duration: 0.8, yOffset: 30 }}
		/>
	);
}
```

#### Phase 2: 重要ページの更新

```tsx
// ランディングページなど重要なページから順次更新
export function LandingPage() {
	return (
		<main>
			<AnimatedImage
				src="/landing-hero.jpg"
				alt="ランディングページメイン画像"
				width={1200}
				height={600}
				priority
				animation={{ duration: 0.6, yOffset: 20 }}
			/>
			{/* 他のコンテンツ */}
		</main>
	);
}
```

#### Phase 3: 全体の一括更新

すべてのテストが通過し、パフォーマンスが確認できたら全体を更新。

### 互換性チェックリスト

移行前に以下を確認してください：

- [ ] Next.js バージョン 14+ 対応確認
- [ ] Motion ライブラリ（motion/react）のインストール
- [ ] 既存のスタイリングとの互換性確認
- [ ] パフォーマンステストの実行
- [ ] アクセシビリティテストの実行
- [ ] 各ブラウザでの動作確認

## 🧪 テスト戦略

### ユニットテスト例

```tsx
// __tests__/animated-image.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { AnimatedImage } from "../animated-image";

describe("AnimatedImage", () => {
	it("基本的なレンダリング", () => {
		render(
			<AnimatedImage
				src="/test.jpg"
				alt="テスト画像"
				width={400}
				height={300}
			/>
		);
		
		const image = screen.getByAltText("テスト画像");
		expect(image).toBeInTheDocument();
	});
	
	it("アニメーション設定の適用", async () => {
		const onAnimationStart = jest.fn();
		
		render(
			<AnimatedImage
				src="/test.jpg"
				alt="テスト画像"
				width={400}
				height={300}
				animation={{ duration: 0.5, yOffset: 30 }}
				onAnimationStart={onAnimationStart}
			/>
		);
		
		// Intersection Observer のモック処理が必要
		await waitFor(() => {
			expect(onAnimationStart).toHaveBeenCalled();
		});
	});
});
```

### E2E テスト例

```typescript
// e2e/animated-image.spec.ts
import { test, expect } from "@playwright/test";

test("画像アニメーションの動作確認", async ({ page }) => {
	await page.goto("/examples/animated-images");
	
	// 画像がビューポートに入る前
	const image = page.locator('[data-testid="animated-image-1"]');
	await expect(image).toHaveCSS("opacity", "0");
	
	// スクロールして画像をビューポートに入れる
	await image.scrollIntoViewIfNeeded();
	
	// アニメーション完了を待つ
	await expect(image).toHaveCSS("opacity", "1", { timeout: 2000 });
});
```

## 📊 パフォーマンスメトリクス

### 推奨値

| メトリクス | 推奨値 | 測定方法 |
|-----------|--------|----------|
| アニメーション持続時間 | 0.3-1.0秒 | 開発者ツール |
| 初期表示時間 | < 100ms | Performance API |
| GPU 使用率 | < 80% | Chrome DevTools |
| メモリ使用量増加 | < 10MB/100画像 | Memory タブ |

### 測定コード例

```tsx
export function PerformanceMonitor() {
	const [metrics, setMetrics] = useState({});
	
	const handleAnimationStart = useCallback(() => {
		performance.mark('animation-start');
	}, []);
	
	const handleAnimationComplete = useCallback(() => {
		performance.mark('animation-complete');
		const measure = performance.measure(
			'animation-duration',
			'animation-start',
			'animation-complete'
		);
		setMetrics(prev => ({
			...prev,
			duration: measure.duration
		}));
	}, []);
	
	return (
		<div>
			<AnimatedImage
				src="/performance-test.jpg"
				alt="パフォーマンステスト"
				width={800}
				height={600}
				onAnimationStart={handleAnimationStart}
				onAnimationComplete={handleAnimationComplete}
			/>
			<pre>{JSON.stringify(metrics, null, 2)}</pre>
		</div>
	);
}
```

---

## 📚 関連リソース

- [Next.js Image コンポーネント公式ドキュメント](https://nextjs.org/docs/api-reference/next/image)
- [Motion ライブラリドキュメント](https://motion.dev/)
- [Intersection Observer API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web Animations API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [prefers-reduced-motion - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## 🤝 コントリビューション

改善提案やバグレポートは Issue または Pull Request でお気軽にご連絡ください。

## 📄 ライセンス

このコンポーネントは MIT ライセンスの下で提供されています。