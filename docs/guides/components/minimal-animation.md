# MinimalAnimation コンポーネントガイド

## 概要

`MinimalAnimation` コンポーネントは、ホームページのヒーローセクション用に設計された高品質なアニメーションコンポーネントです。「Web × AI × Creative」のメッセージを段階的かつ視覚的魅力のあるアニメーションで表示し、ネオングロー効果によってブランドの技術的専門性を演出します。

## 基本的な使用方法

### インポートと基本使用

```tsx
import { MinimalAnimation } from "@/components/home/minimal-animation";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-white/80 mb-8">
          デジタルのお困りごと、ご相談ください。
        </p>
        
        <MinimalAnimation className="mb-8 text-white" />
        
        <p className="text-lg text-white/90 max-w-3xl">
          ウェブ制作/開発、AI活用支援、クリエイティブ制作、
          15年の経験を活かして、柔軟かつ丁寧にサポートします。
        </p>
      </div>
    </section>
  );
}
```

### Props

| プロパティ | 型 | デフォルト | 説明 |
|----------|----|-----------|----|
| `className` | `string` | `""` | 追加のCSSクラス名 |

## アニメーション仕様

### タイミング構成

```typescript
const animationTimeline = {
  // 初期化
  initialization: { delay: 100 }, // コンポーネントマウント後
  
  // 段階的表示
  webText: { 
    transitionDelay: 500,    // 0.5s
    animationDelay: 2000     // 2s (ネオングロー開始)
  },
  firstX: { 
    transitionDelay: 700     // 0.7s
  },
  aiText: { 
    transitionDelay: 800,    // 0.8s
    animationDelay: 2400     // 2.4s (ネオングロー開始)
  },
  secondX: { 
    transitionDelay: 1000    // 1.0s
  },
  creativeText: { 
    transitionDelay: 1100,   // 1.1s
    animationDelay: 2800     // 2.8s (ネオングロー開始)
  },
  
  // 背景効果
  breathingEffect: { 
    transitionDelay: 2000,   // 2s
    animationDelay: 2000     // 2s
  }
};
```

### アニメーション効果の詳細

#### 1. フェードイン効果
```css
.fade-in {
  opacity: 0;
  transform: translateY(8px);
  transition: all 600ms ease-out;
}

.fade-in.active {
  opacity: 1;
  transform: translateY(0);
}
```

#### 2. ネオングロー効果
```css
@keyframes neon-glow {
  0%, 100% {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px #0ea5e9;
  }
  50% {
    text-shadow: 
      0 0 2px currentColor,
      0 0 5px currentColor,
      0 0 8px currentColor,
      0 0 12px #0ea5e9;
  }
}

.animate-neon-glow {
  animation: neon-glow 4.5s ease-in-out infinite;
}
```

#### 3. 呼吸効果（背景）
```css
@keyframes breathing {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.02);
  }
}

.animate-breathing {
  animation: breathing 4s ease-in-out infinite;
}
```

## レスポンシブ対応

### ブレークポイント別表示

```tsx
// モバイル（md未満）
<h1 className="text-6xl">
  Web
  <span className="mx-2">×</span>
  AI
  <br className="md:hidden" />  {/* モバイルのみ改行 */}
  <span className="mx-2">×</span>
  Creative
</h1>

// タブレット・デスクトップ（md以上）
<h1 className="md:text-6xl lg:text-7xl">
  Web × AI × Creative  {/* 一行表示 */}
</h1>
```

### フォントサイズ設定

```tsx
const responsiveSizes = {
  mobile: "text-6xl",      // 約60px
  tablet: "md:text-6xl",   // 約60px
  desktop: "lg:text-7xl"   // 約72px
};
```

## カスタマイゼーション

### カラーテーマのカスタマイズ

```tsx
// カスタムグローカラーの使用例
<style jsx>{`
  .custom-glow {
    --glow-color: #10b981; /* エメラルドグリーン */
  }
  
  .custom-glow .animate-neon-glow {
    animation: custom-neon-glow 4.5s ease-in-out infinite;
  }
  
  @keyframes custom-neon-glow {
    0%, 100% {
      text-shadow: 
        0 0 5px currentColor,
        0 0 10px currentColor,
        0 0 15px currentColor,
        0 0 20px var(--glow-color);
    }
    50% {
      text-shadow: 
        0 0 2px currentColor,
        0 0 5px currentColor,
        0 0 8px currentColor,
        0 0 12px var(--glow-color);
    }
  }
`}</style>

<MinimalAnimation className="custom-glow mb-8 text-white" />
```

### アニメーション速度の調整

```tsx
// 高速バージョンの例
<style jsx>{`
  .fast-animation {
    --animation-duration: 2.5s;
    --transition-duration: 400ms;
  }
  
  .fast-animation .animate-neon-glow {
    animation-duration: var(--animation-duration);
  }
  
  .fast-animation .transition-all {
    transition-duration: var(--transition-duration);
  }
`}</style>

<MinimalAnimation className="fast-animation mb-8 text-white" />
```

## アクセシビリティ配慮

### 実装されているアクセシビリティ機能

1. **モーション設定の尊重**:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-neon-glow,
  .animate-breathing,
  .transition-all {
    animation: none;
    transition: none;
  }
}
```

2. **セマンティックHTML**:
```tsx
<h1 className="...">  {/* 適切な見出し要素 */}
  <span className="text-primary">Web</span>
  <span className="text-white">×</span>
  <span className="text-primary">AI</span>
  {/* ... */}
</h1>
```

3. **スクリーンリーダー対応**:
```tsx
<div 
  className="relative" 
  role="banner"
  aria-label="サービス概要: Web、AI、Creative の統合サービス"
>
  {/* アニメーションコンテンツ */}
</div>
```

## パフォーマンス最適化

### React 19 Compiler 対応

```tsx
// React Compiler により自動的に最適化される
// 手動でのmemo/useCallback/useMemoは不要

export function MinimalAnimation({ className = "" }) {
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // useEffectは必要最小限のみ使用
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []); // 空の依存配列で1回のみ実行
  
  // JSX の条件分岐も自動最適化される
  return (
    // レンダリング内容
  );
}
```

### CSS パフォーマンス最適化

```css
/* GPU加速プロパティの使用 */
.optimized-animation {
  will-change: transform, opacity;
  transform: translateZ(0); /* GPU層の強制生成 */
}

/* 効率的なアニメーションプロパティ */
.efficient-glow {
  /* text-shadowはGPU加速される */
  animation: neon-glow 4.5s ease-in-out infinite;
  
  /* transform, opacityの組み合わせで軽量化 */
  transition: transform 600ms ease-out, opacity 600ms ease-out;
}
```

## 使用上の注意点

### 1. パフォーマンス考慮事項

```tsx
// ❌ 避けるべき使用例
function HomePage() {
  return (
    <>
      <MinimalAnimation />
      <MinimalAnimation />  {/* 複数の同時使用は避ける */}
      <MinimalAnimation />
    </>
  );
}

// ✅ 推奨する使用例
function HomePage() {
  return (
    <HeroSection>
      <MinimalAnimation />  {/* 1ページに1つまで */}
    </HeroSection>
  );
}
```

### 2. SSR/Hydration 対応

```tsx
// コンポーネント内でのクライアント判定は不要
// （React 19 + Next.js 15 で自動処理）

export function MinimalAnimation({ className = "" }) {
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // サーバーサイドでも安全に実行される
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // ...
}
```

### 3. テスト時の配慮

```tsx
// テスト環境での設定例
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts']
  }
});

// src/test-setup.ts
// アニメーションを無効化してテストを安定化
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => ({
    matches: true, // prefers-reduced-motion: reduce
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});
```

## まとめ

`MinimalAnimation` コンポーネントは以下の特徴を持つ高品質なアニメーションソリューションです：

- ✅ **パフォーマンス最適化**: React 19 Compiler + GPU加速CSS
- ✅ **アクセシビリティ準拠**: WCAG 2.1 AA対応
- ✅ **レスポンシブ対応**: モバイルファーストデザイン
- ✅ **カスタマイズ性**: CSS変数とクラス名での柔軟な調整
- ✅ **保守性**: TypeScript + 適切な型定義

ブランド体験の向上と技術的専門性の演出において、効果的な視覚的インパクトを提供します。