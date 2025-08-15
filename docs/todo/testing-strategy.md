# テスト戦略・チェックリスト

## 概要

Next.js 15 + React 19環境での包括的なテスト戦略チェックリストです。Vitest（単体・統合）、Playwright（E2E）、アクセシビリティテストを組み合わせ、信頼性の高いアプリケーションを構築するためのテスト手法を定めています。

## 🎯 目標

- **信頼性**: バグの早期発見と予防
- **回帰防止**: リファクタリング時の安全性確保
- **品質保証**: ユーザビリティとアクセシビリティの担保
- **自動化**: CI/CDパイプラインでの継続的品質チェック
- **効率性**: 適切なテストピラミッドによる最適化

---

## Phase 1: テスト環境セットアップ (初回のみ)

### 🔧 Vitest設定確認
- [ ] **設定ファイル**: `vitest.config.ts`の内容確認
- [ ] **jsdom環境**: DOM操作テスト用環境の確認
- [ ] **setup files**: `setupTests.ts`の初期化確認
- [ ] **path aliases**: `@/`などのエイリアス解決確認
- [ ] **timeout設定**: 適切なテストタイムアウト（10秒）

### 🎭 Playwright設定確認
- [ ] **ブラウザ**: Chromium、Firefox、WebKit設定
- [ ] **base URL**: 開発サーバーのURL設定
- [ ] **並列実行**: workers設定の最適化
- [ ] **レポート**: HTML、JUnit形式での結果出力
- [ ] **録画・スクリーンショット**: 失敗時の詳細保存

### 🛠️ 補助ツール設定
- [ ] **@axe-core/playwright**: アクセシビリティテスト
- [ ] **@testing-library/react**: React Component テスト
- [ ] **@testing-library/jest-dom**: DOM matcher拡張
- [ ] **@testing-library/user-event**: ユーザーインタラクション

---

## Phase 2: 単体テスト (Unit Testing)

### ⚛️ React Component Tests
- [ ] **Rendering**: コンポーネントの正常なレンダリング
- [ ] **Props**: プロパティの適切な反映
- [ ] **State**: 内部状態の変更検証
- [ ] **Events**: ユーザーイベントハンドリング
- [ ] **Conditional Rendering**: 条件分岐ロジック

#### テスト例テンプレート
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 🪝 Custom Hooks Tests
- [ ] **Pure Logic**: ビジネスロジックの検証
- [ ] **State Management**: 状態管理の正確性
- [ ] **Side Effects**: useEffectの動作確認
- [ ] **Dependencies**: 依存配列の適切性
- [ ] **Cleanup**: メモリリーク防止の確認

### 🔧 Utility Functions Tests
- [ ] **Pure Functions**: 入力に対する期待出力
- [ ] **Edge Cases**: 境界値・異常値の処理
- [ ] **Error Handling**: 例外処理の適切性
- [ ] **Type Safety**: TypeScript型の整合性

---

## Phase 3: 統合テスト (Integration Testing)

### 🔗 Component Integration
- [ ] **Parent-Child**: 親子コンポーネント間の連携
- [ ] **Context Providers**: Context経由のデータ流通
- [ ] **Form Submission**: フォーム送信の一連の流れ
- [ ] **Data Fetching**: API呼び出しとデータ表示
- [ ] **Error Boundaries**: エラー境界での適切な処理

### 🌐 API Route Testing
- [ ] **Request Handling**: 各HTTPメソッドの処理
- [ ] **Authentication**: 認証が必要なエンドポイント
- [ ] **Validation**: 入力データの検証
- [ ] **Error Responses**: 適切なエラーレスポンス
- [ ] **Rate Limiting**: レート制限の動作確認

#### API テスト例
```typescript
import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/contact/route';

describe('/api/contact', () => {
  it('should handle valid contact form submission', async () => {
    const validData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message'
    };

    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validData)
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

---

## Phase 4: E2Eテスト (End-to-End Testing)

### 🎯 Critical User Journeys
- [ ] **ユーザー登録**: 新規アカウント作成フロー
- [ ] **ログイン/ログアウト**: 認証システムの完全テスト
- [ ] **主要機能**: コア機能の操作完了まで
- [ ] **フォーム送信**: お問い合わせ等の送信処理
- [ ] **ナビゲーション**: サイト内遷移の確認

### 📱 Multi-Device Testing
- [ ] **レスポンシブ**: 各ブレイクポイントでの動作
- [ ] **タッチ操作**: モバイル特有の操作
- [ ] **キーボード**: Tab移動、ショートカット
- [ ] **ブラウザ互換性**: Chrome、Firefox、Safari
- [ ] **パフォーマンス**: Core Web Vitalsの測定

#### E2E テスト例
```typescript
import { test, expect } from '@playwright/test';

test('user authentication flow', async ({ page }) => {
  // ログインページに移動
  await page.goto('/login');
  
  // 認証情報を入力
  await page.fill('[data-testid="email-input"]', 'user@example.com');
  await page.fill('[data-testid="password-input"]', 'password123');
  await page.click('[data-testid="login-button"]');
  
  // ダッシュボードにリダイレクトされることを確認
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('ダッシュボード');
});
```

---

## Phase 5: アクセシビリティテスト

### ♿ 自動アクセシビリティ検査
- [ ] **axe-core integration**: E2Eテストでの自動検査
- [ ] **WCAG準拠**: 2.1 AA基準のチェック
- [ ] **色コントラスト**: 十分なコントラスト比
- [ ] **フォーカス管理**: 適切なTab順序
- [ ] **ARIA属性**: screen reader対応

### 🎹 キーボードナビゲーション
- [ ] **Tab移動**: 論理的な移動順序
- [ ] **Enter/Space**: ボタン・リンクの活性化
- [ ] **Escape**: モーダル・ドロップダウンの閉じる
- [ ] **Arrow Keys**: 複雑なUI要素のナビゲーション
- [ ] **Focus Visible**: 視覚的なフォーカス表示

#### アクセシビリティテスト例
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage accessibility', async ({ page }) => {
  await page.goto('/');
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Phase 6: パフォーマンステスト

### ⚡ Core Web Vitals
- [ ] **LCP**: Largest Contentful Paint < 2.5s
- [ ] **FID**: First Input Delay < 100ms
- [ ] **CLS**: Cumulative Layout Shift < 0.1
- [ ] **TTFB**: Time to First Byte < 600ms
- [ ] **FCP**: First Contentful Paint < 1.8s

### 📊 Lighthouse Integration
- [ ] **Performance Score**: 90以上
- [ ] **Accessibility Score**: 100
- [ ] **Best Practices**: 95以上
- [ ] **SEO Score**: 95以上
- [ ] **PWA Score**: 該当する場合のみ

#### パフォーマンステスト例
```typescript
test('homepage performance', async ({ page }) => {
  await page.goto('/');
  
  // Core Web Vitalsの測定
  const vitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        resolve(entries.map(entry => ({
          name: entry.name,
          value: entry.value
        })));
      }).observe({ entryTypes: ['web-vitals'] });
    });
  });
  
  // LCP < 2500ms
  const lcp = vitals.find(v => v.name === 'LCP');
  expect(lcp?.value).toBeLessThan(2500);
});
```

---

## Phase 7: Visual Regression Testing

### 📸 スクリーンショット比較
- [ ] **Key Pages**: 主要ページの外観確認
- [ ] **Component Library**: UIコンポーネントの視覚的確認
- [ ] **Responsive Views**: 各デバイスサイズでの表示
- [ ] **Dark/Light Mode**: テーマ切り替え確認
- [ ] **Error States**: エラー状態の表示確認

### 🎨 Brand Consistency
- [ ] **Color Palette**: ブランドカラーの一貫性
- [ ] **Typography**: フォント・サイズの統一
- [ ] **Spacing**: マージン・パディングの規則性
- [ ] **Icons**: アイコンスタイルの統一
- [ ] **Animation**: アニメーション効果の確認

---

## 🎖️ 成功基準

### 必須要件 (Must Have)
- [ ] **テスト実行**: 100%パス
- [ ] **カバレッジ**: 80%以上
- [ ] **E2E成功率**: 100%
- [ ] **アクセシビリティ**: 違反ゼロ
- [ ] **パフォーマンス**: Core Web Vitals Good

### 推奨目標 (Should Have)
- [ ] **単体テストカバレッジ**: 90%以上
- [ ] **統合テストカバレッジ**: 70%以上
- [ ] **Lighthouse Performance**: 90+
- [ ] **実行時間**: E2E 5分以内
- [ ] **Flaky Tests**: 2%以下

### 理想目標 (Could Have)
- [ ] **カバレッジ**: 95%以上
- [ ] **Lighthouse All**: 95+
- [ ] **実行時間**: 全テスト10分以内
- [ ] **Visual Regression**: 差分ゼロ
- [ ] **Flaky Tests**: 1%以下

---

## ⚠️ テスト品質管理

### 🚫 アンチパターン回避
- **過度な実装詳細テスト**: 内部実装ではなくユーザー体験をテスト
- **Flaky Tests**: 実行毎に結果が変わる不安定テストの排除
- **重複テスト**: 同じ内容を複数箇所でテストしない
- **モックの乱用**: 必要以上のモック化は避ける

### 🔄 メンテナンス戦略
- **定期的なレビュー**: 月次でのテスト有効性確認
- **テストデータ管理**: 一貫性のあるテストデータ設計
- **CI/CD統合**: 自動実行とレポート生成
- **チーム共有**: テスト結果の透明性確保

---

## 📚 実行コマンド

### 単体・統合テスト
```bash
# 全テスト実行
npm test

# ウォッチモード
npm run test:watch

# カバレッジ測定
npm run test:coverage
```

### E2Eテスト
```bash
# 全ブラウザで実行
npm run test:e2e

# Chromiumのみ
npm run test:e2e:chromium

# UIモード（デバッグ用）
npm run test:e2e:ui

# レポート表示
npm run test:e2e:report
```

---

## 📚 参考資料

### テストツール
- [Vitest Documentation](https://vitest.dev/guide/)
- [Playwright Testing](https://playwright.dev/docs/intro)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

### ベストプラクティス
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [React Testing Patterns](https://react-testing-examples.com/)
- [Accessibility Testing](https://www.w3.org/WAI/test-evaluate/)

---

**最終更新**: 2025年8月14日  
**対象バージョン**: Vitest 3.2+, Playwright 1.53+, Testing Library 16.3+