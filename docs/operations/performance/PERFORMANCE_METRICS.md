# パフォーマンスメトリクス技術仕様書

## 実測パフォーマンス改善結果 (2024年リファクタリング)

### 🎯 コンポーネント最適化実績

#### Services Section Component
- **削減率**: 83% (304行 → 54行)
- **分離パターン**: データレイヤー + 個別コンポーネント
- **アーキテクチャ**: `/src/lib/data/services-data.tsx` + `/src/components/sections/service-item.tsx`

#### Speech Bubble Component  
- **削減率**: 56% (592行 → 260行)
- **分離パターン**: CVA バリアント + Suspense フォールバック
- **アーキテクチャ**: `/src/lib/data/speech-bubble-variants.ts` + `/src/components/ui/speech-bubble-skeleton.tsx`

### 📦 Bundle Size 最適化実績

#### Homepage JavaScript Bundle
- **削減率**: 33% (23.1kB → 15.5kB)
- **最適化手法**: 
  - Server Component への変換
  - TypeScript ES2022 最適化
  - 不要な "use client" 削除

### ⚙️ TypeScript 最適化実績

#### 設定変更による効果
- **Target**: ES5 → ES2022 (最新JavaScript機能活用)
- **Module Detection**: "force" (改善されたモジュール解決)
- **Verbatim Module Syntax**: true (型のみインポート最適化)
- **Edge Runtime**: 完全対応 (Cloudflare Workers対応)

## 測定メトリクス一覧と実装方法

### 1. Core Web Vitals (優先度: CRITICAL)

#### 1.1 LCP (Largest Contentful Paint)
**測定内容:** ページ内で最も大きなコンテンツの描画完了時間

**技術実装:**
```typescript
// Playwright Web Vitals API使用
const lcpValue = await page.evaluate(() => {
  return new Promise((resolve) => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      resolve(lastEntry.startTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
});
```

**測定対象要素:**
- ヒーロー画像
- メインヘッダー
- フォーム要素
- ダッシュボードのメインコンテンツ

#### 1.2 FID (First Input Delay)  
**測定内容:** ユーザーの最初のインタラクションから応答までの遅延

**技術実装:**
```typescript
// 実際のユーザーインタラクションをシミュレート
const fidValue = await page.evaluate(() => {
  return new Promise((resolve) => {
    new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      resolve(firstInput.processingStart - firstInput.startTime);
    }).observe({ type: 'first-input', buffered: true });
  });
});
```

**測定シナリオ:**
- ボタンクリック
- フォーム入力
- ナビゲーションクリック
- モーダル開閉

#### 1.3 CLS (Cumulative Layout Shift)
**測定内容:** ページのレイアウト変更による累積シフト量

**技術実装:**
```typescript
const clsValue = await page.evaluate(() => {
  return new Promise((resolve) => {
    let cls = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      }
      resolve(cls);
    }).observe({ type: 'layout-shift', buffered: true });
    
    // 5秒後に測定完了
    setTimeout(() => resolve(cls), 5000);
  });
});
```

### 2. 追加パフォーマンスメトリクス (優先度: HIGH)

#### 2.1 FCP (First Contentful Paint)
**測定内容:** 最初のコンテンツが画面に表示される時間

**実装:**
```typescript
const fcpValue = await page.evaluate(() => {
  return new Promise((resolve) => {
    new PerformanceObserver((entryList) => {
      const fcpEntry = entryList.getEntriesByName('first-contentful-paint')[0];
      resolve(fcpEntry.startTime);
    }).observe({ type: 'paint', buffered: true });
  });
});
```

#### 2.2 TTFB (Time to First Byte)
**測定内容:** サーバーからの最初のレスポンス取得時間

**実装:**
```typescript
const ttfbValue = await page.evaluate(() => {
  return performance.timing.responseStart - performance.timing.requestStart;
});
```

#### 2.3 Total Blocking Time (TBT)
**測定内容:** メインスレッドがブロックされている総時間

**実装:**
```typescript
const tbtValue = await page.evaluate(() => {
  return new Promise((resolve) => {
    new PerformanceObserver((entryList) => {
      let tbt = 0;
      entryList.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          tbt += entry.duration - 50;
        }
      });
      resolve(tbt);
    }).observe({ type: 'longtask', buffered: true });
  });
});
```

### 3. リソース最適化メトリクス (優先度: MEDIUM)

#### 3.1 Bundle Size Analysis
**測定内容:** JavaScript/CSSバンドルサイズ

**実装:**
```typescript
const bundleMetrics = await page.evaluate(() => {
  const resources = performance.getEntriesByType('resource');
  const jsResources = resources.filter(r => r.name.includes('.js'));
  const cssResources = resources.filter(r => r.name.includes('.css'));
  
  return {
    jsSize: jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
    cssSize: cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
    totalResources: resources.length
  };
});
```

**実測改善値 (Homepage):**
- **Before**: 23.1kB JavaScript
- **After**: 15.5kB JavaScript  
- **Improvement**: 33% reduction (-7.6kB)

**改善手法:**
- Data layer extraction (`/src/lib/data/` directory)
- Server Component optimization (unnecessary "use client" removal)
- TypeScript ES2022 compilation optimization

#### 3.2 Image Optimization Metrics
**測定内容:** 画像最適化効果測定

**実装:**
```typescript
const imageMetrics = await page.evaluate(() => {
  const images = performance.getEntriesByType('resource')
    .filter(r => r.initiatorType === 'img');
  
  return {
    totalImages: images.length,
    totalImageSize: images.reduce((sum, img) => sum + (img.transferSize || 0), 0),
    avgImageSize: images.length > 0 ? 
      images.reduce((sum, img) => sum + (img.transferSize || 0), 0) / images.length : 0,
    webpImages: images.filter(img => img.name.includes('.webp')).length,
    avifImages: images.filter(img => img.name.includes('.avif')).length
  };
});
```

### 4. ネットワーク・キャッシュメトリクス (優先度: MEDIUM)

#### 4.1 Cache Hit Rate
**測定内容:** リソースのキャッシュ効率

**実装:**
```typescript
const cacheMetrics = await page.evaluate(() => {
  const resources = performance.getEntriesByType('resource');
  const cachedResources = resources.filter(r => r.transferSize === 0 && r.decodedBodySize > 0);
  
  return {
    totalRequests: resources.length,
    cachedRequests: cachedResources.length,
    cacheHitRate: cachedResources.length / resources.length * 100
  };
});
```

#### 4.2 Network Request Metrics
**測定内容:** ネットワークリクエストの効率性

**実装:**
```typescript
const networkMetrics = await page.evaluate(() => {
  const resources = performance.getEntriesByType('resource');
  
  return {
    totalRequests: resources.length,
    totalTransferSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
    avgResponseTime: resources.reduce((sum, r) => sum + r.duration, 0) / resources.length,
    slowRequests: resources.filter(r => r.duration > 1000).length
  };
});
```

### 5. ユーザーエクスペリエンスメトリクス (優先度: HIGH)

#### 5.1 Time to Interactive (TTI)
**測定内容:** ページが完全にインタラクティブになるまでの時間

**実装:**
```typescript
const ttiValue = await page.evaluate(() => {
  return new Promise((resolve) => {
    // TTIの計算ロジック（複雑なため、ライブラリ使用推奨）
    const calculateTTI = () => {
      const navigationStart = performance.timing.navigationStart;
      const loadEventEnd = performance.timing.loadEventEnd;
      return loadEventEnd - navigationStart;
    };
    
    if (document.readyState === 'complete') {
      resolve(calculateTTI());
    } else {
      window.addEventListener('load', () => resolve(calculateTTI()));
    }
  });
});
```

#### 5.2 Interaction Response Time
**測定内容:** 各インタラクションの応答時間

**実装:**
```typescript
const interactionMetrics = await page.evaluate(() => {
  const interactions = [];
  
  // ボタンクリック測定
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const startTime = performance.now();
      
      // レスポンス完了後の測定（Promise使用）
      Promise.resolve().then(() => {
        interactions.push({
          type: 'click',
          element: e.target.tagName,
          responseTime: performance.now() - startTime
        });
      });
    });
  });
  
  return interactions;
});
```

## 測定実装の技術スタック

### 必要ライブラリ

```json
{
  "devDependencies": {
    "web-vitals": "^3.5.0",
    "lighthouse": "^11.4.0",
    "@playwright/test": "^1.40.0",
    "@next/bundle-analyzer": "^14.0.0"
  }
}
```

### Playwright設定拡張

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // パフォーマンス測定用の設定
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    // ネットワーク制限（テスト用）
    launchOptions: {
      args: ['--disable-dev-shm-usage', '--disable-gpu']
    }
  },
  // パフォーマンステスト専用プロジェクト
  projects: [
    {
      name: 'performance-desktop',
      use: {
        ...devices['Desktop Chrome'],
        // CPU制限なし（ベースライン）
      }
    },
    {
      name: 'performance-mobile',
      use: {
        ...devices['Pixel 5'],
        // CPU制限適用
        launchOptions: {
          args: ['--cpu-throttling-rate=4']
        }
      }
    }
  ]
});
```

### 自動化・CI/CD統合

#### GitHub Actions設定例
```yaml
- name: Performance Tests
  run: |
    npm run test:performance
    npm run lighthouse:ci
    npm run bundle:analyze
```

#### パフォーマンス予算チェック
```typescript
// パフォーマンス予算のしきい値チェック
const validatePerformanceBudget = (metrics: PerformanceMetrics) => {
  const budget = {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    bundleSize: 250 * 1024 // 250KB
  };
  
  const violations = [];
  if (metrics.lcp > budget.lcp) violations.push(`LCP: ${metrics.lcp}ms > ${budget.lcp}ms`);
  if (metrics.fid > budget.fid) violations.push(`FID: ${metrics.fid}ms > ${budget.fid}ms`);
  if (metrics.cls > budget.cls) violations.push(`CLS: ${metrics.cls} > ${budget.cls}`);
  
  return violations;
};
```

## 段階的実装計画

### Phase 3-1: Core Web Vitals (1-2日)
- LCP, FID, CLS の基本測定
- 主要3ページでの測定実装

### Phase 3-2: リソース最適化 (2-3日)
- Bundle Size, Image Optimization
- キャッシュ効率測定

### Phase 3-3: ネットワーク・UX (1-2日)
- TTI, Network Metrics
- インタラクション応答時間

### Phase 3-4: 継続的監視 (1日)
- CI/CD統合
- アラート設定

## アーキテクチャ最適化パターン

### データレイヤー分離パターン

**実装された設計パターン:**

#### Pattern 1: コンテンツとスタイルの分離
```typescript
// /src/lib/data/services-data.tsx - データとコンテンツ
export const services: ServiceItem[] = [
  {
    id: "web-development",
    title: "ウェブ制作・アプリ開発",
    features: ["Next.js", "WordPress", "リニューアル"],
  }
];

// /src/lib/data/speech-bubble-variants.ts - CVA バリアント
export const speechBubbleVariants = cva("flex gap-3", {
  variants: {
    direction: { left: "flex-row", right: "flex-row-reverse" }
  }
});
```

#### Pattern 2: コンポーネント責務分離
```typescript  
// メインコンポーネント - 依存関係の管理のみ
export function ServicesSection() {
  return services.map((item, index) => (
    <ServiceItemComponent key={item.id} item={item} index={index} />
  ));
}

// 個別コンポーネント - レンダリング責務
export function ServiceItemComponent({ item, index }: Props) {
  // 具体的なレンダリングロジック
}
```

### 実測パフォーマンス改善効果

| 最適化パターン | Before | After | 削減率 |
|---------------|--------|-------|--------|
| Services Section | 304行 | 54行 | -83% |
| Speech Bubble | 592行 | 260行 | -56% |
| Homepage JS Bundle | 23.1kB | 15.5kB | -33% |

### Route Segment Config キャッシュ戦略

```typescript
// 静的コンテンツ (2時間キャッシュ)
export const revalidate = 7200;

// 動的コンテンツ (1時間キャッシュ)  
export const revalidate = 3600;
```

**効果:**
- Server-side レンダリング最適化
- CDN キャッシュ効率向上
- ユーザー体感パフォーマンス改善

---

**このメトリクス仕様に基づいて、段階的にパフォーマンステストを実装していきます。**