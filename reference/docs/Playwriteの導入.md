# Next.jsプロジェクトにPlaywrightを導入してE2Eテストを始める

## 1. はじめに

フロントエンドの開発では、ユーザー体験を確保するためにエンドツーエンド（E2E）テストが重要です。本記事では、Microsoftが開発したモダンなE2Eテストフレームワーク「Playwright」をNext.jsプロジェクトに導入する方法を解説します。

Playwrightを使うことで、実際のブラウザ環境でWebアプリケーションの動作を自動的にテストし、バグを早期に発見できます。さらに、開発→テスト→リリースのワークフローを効率化し、プロダクトの品質を高めることができます。

## 2. Playwrightとは？

### 2.1 Playwrightの特徴

Playwrightは以下の特徴を持つE2Eテストフレームワークです：

- **クロスブラウザサポート**: Chromium, Firefox, WebKitの主要ブラウザに対応
- **自動待機**: ページの読み込みや要素の表示を自動的に待機
- **強力なセレクタ**: CSSセレクタだけでなく、テキストやロールベースのセレクタをサポート
- **並行実行**: 複数のテストを並行して実行可能
- **スクリーンショット・動画**: テスト実行時の画面をキャプチャ可能
- **API呼び出しのモック**: ネットワークリクエストのインターセプトとモック

### 2.2 他のテストツールとの比較

| ツール | 特徴 | 欠点 |
|-------|------|------|
| **Playwright** | 高速で安定した実行、自動待機機能、複数ブラウザサポート | 比較的新しいため事例が少ない |
| Cypress | 豊富な事例、優れたUI、デバッグ体験 | Chromiumのみ（最新版は複数ブラウザ対応） |
| Selenium | 長い歴史、多言語サポート | 設定の複雑さ、実行速度 |

## 3. Playwrightの導入手順

### 3.1 インストール

Next.jsプロジェクトにPlaywrightをインストールするコマンドを実行します：

```bash
npm init playwright@latest
```

インストール時に以下の質問に答えます：

- TypeScriptを使用するか？ → Yes
- テストディレクトリをどこに配置するか？ → tests/e2e
- GitHub Actionsワークフローを追加するか？ → Yes
- サンプルテストを含めるか？ → Yes

### 3.2 プロジェクト構造

Playwrightのインストール後、以下のようなディレクトリ構造になります：

```
nextjs-boilerplate/
├── tests/
│   ├── e2e/            # Playwright E2Eテスト
│   │   └── example.spec.ts
│   ├── unit/           # Vitestユニットテスト
│   └── components/     # コンポーネントテスト
├── playwright.config.ts # Playwright設定ファイル
└── .github/
    └── workflows/
        └── playwright.yml # GitHub Actionsワークフロー
```

## 4. Playwright設定ファイルのカスタマイズ

`playwright.config.ts`は、Playwrightの動作を制御する重要なファイルです。以下に基本的な設定例を示します：

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // テストディレクトリの指定
  testDir: './tests/e2e',
  
  // 最大タイムアウト時間（ミリ秒）
  timeout: 30 * 1000,
  
  // テスト実行の同時性（並列実行）
  fullyParallel: true,
  
  // 失敗時の再試行回数
  retries: process.env.CI ? 2 : 0,
  
  // テスト実行の最大並列数
  workers: process.env.CI ? 1 : undefined,
  
  // レポーター設定
  reporter: 'html',
  
  // テスト実行の共通設定
  use: {
    // すべてのテストでトレースを収集
    trace: 'on-first-retry',
    
    // Next.jsアプリのベースURL
    baseURL: 'http://localhost:3000',
  },
  
  // Next.jsの開発サーバーを自動起動
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  
  // ブラウザプロジェクト設定
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## 5. 最初のE2Eテストを書く

### 5.1 テストの基本構造

Playwrightのテストは以下の構造になっています：

```typescript
import { test, expect } from '@playwright/test';

// テストケースの定義
test('ページタイトルが正しく表示される', async ({ page }) => {
  // ページにアクセス
  await page.goto('/');
  
  // 要素を見つけて検証
  await expect(page.locator('h1')).toContainText('ようこそ');
});
```

### 5.2 セレクタの種類

Playwrightでは様々な要素の特定方法があります：

```typescript
// テキストでの検索
await page.getByText('ようこそ').click();

// ロール（アクセシビリティ）ベースの検索
await page.getByRole('button', { name: 'ログイン' }).click();

// テストID（data-testid属性）での検索
await page.getByTestId('submit-button').click();

// フォーム要素の検索
await page.getByLabel('ユーザー名').fill('test-user');

// CSSセレクタ
await page.locator('.login-form button').click();
```

### 5.3 実践的なテスト例

Next.jsアプリケーションの基本的なE2Eテスト例：

```typescript
import { test, expect } from '@playwright/test';

// ホームページのテスト
test('ホームページが正しく表示される', async ({ page }) => {
  // ホームページにアクセス
  await page.goto('/');

  // サイト名（ヘッダーロゴ）が表示されていることを確認
  const header = await page.locator('header');
  await expect(header).toBeVisible();
  await expect(header).toContainText('サイト名');

  // ナビゲーションメニューが表示されていることを確認
  await expect(page.locator('nav')).toBeVisible();
});

// サンプルページのテスト
test('サンプルページへのナビゲーションが機能する', async ({ page }) => {
  // ホームページからスタート
  await page.goto('/');
  
  // サンプルページへのリンクをクリック
  await page.getByRole('link', { name: 'サンプル' }).click();
  
  // URLが変更されたことを確認
  await expect(page).toHaveURL(/.*\/examples/);
  
  // サンプルページのタイトルが表示されることを確認
  await expect(page.getByRole('heading', { name: 'サンプル一覧' })).toBeVisible();
});

// フォーム操作のテスト
test('フォームサンプルページのバリデーションが機能する', async ({ page }) => {
  // フォームページに直接アクセス
  await page.goto('/examples/form');
  
  // 空のフォームを送信
  await page.getByRole('button', { name: '送信' }).click();
  
  // バリデーションエラーが表示されることを確認
  await expect(page.getByText('名前を入力してください')).toBeVisible();
  
  // フォームに入力
  await page.getByLabel('名前').fill('テストユーザー');
  await page.getByLabel('メールアドレス').fill('test@example.com');
  await page.getByLabel('メッセージ').fill('これはテストメッセージです。');
  await page.getByLabel('利用規約に同意する').check();
  
  // フォーム送信
  await page.getByRole('button', { name: '送信' }).click();
  
  // 送信成功メッセージを確認
  await expect(page.getByText('送信しました')).toBeVisible();
});
```

## 6. テストの実行方法

### 6.1 package.jsonへのスクリプト追加

テスト実行を簡単にするために、`package.json`の`scripts`セクションにPlaywright用のコマンドを追加します。

```json
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:debug": "playwright test --debug",
  "test:e2e:report": "playwright show-report",
  "test:e2e:chromium": "playwright test --project=chromium"
}
```

追加したコマンドの説明：

- **test:e2e**: 標準的なE2Eテスト実行
- **test:e2e:ui**: UIモードでテスト実行（視覚的なインターフェースでテストを管理）
- **test:e2e:debug**: デバッグモードでテスト実行（ステップバイステップでテスト確認）
- **test:e2e:report**: 最新のテストレポートを表示

これにより、長いコマンドを簡潔に実行できるようになり、チーム内での標準化やCI/CD連携が容易になります。

### 6.2 基本的な実行コマンド

```bash
# すべてのテストを実行
npx playwright test

# 特定のファイルのテストを実行
npx playwright test tests/e2e/example.spec.ts

# 特定のブラウザでのみテスト実行
npx playwright test --project=chromium

# UIモードでテストを実行（視覚的に確認）
npx playwright test --ui
```

### 6.3 UIモードの活用

Playwrightには直感的なUIモードが用意されており、以下のことが可能です：

- テストケースのステップごとの実行
- スクリーンショットの確認
- ブラウザの状態の確認
- テストの編集と即時実行

UIモードは以下のコマンドで起動します：

```bash
npx playwright test --ui
```

### 6.4 レポートの確認

テスト実行後のHTMLレポートを確認するには：

```bash
npx playwright show-report
```

## 7. CI/CD環境での実行

### 7.1 GitHub Actions設定

Playwrightは`.github/workflows/playwright.yml`ファイルを自動生成し、GitHub Actionsでのテスト実行を設定します：

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## 8. テストの安定性を高めるテクニック

### 8.1 データ属性の活用

HTMLに`data-testid`属性を追加して、テストの安定性を向上させます：

```tsx
// Reactコンポーネント
<button data-testid="login-button">ログイン</button>

// テストコード
await page.getByTestId('login-button').click();
```

### 8.2 自動待機の活用

Playwrightには自動待機機能がありますが、明示的に待機することもできます：

```typescript
// 要素が表示されるまで待機
await page.waitForSelector('.loading', { state: 'hidden' });

// ネットワークアイドル状態になるまで待機
await page.waitForLoadState('networkidle');

// カスタム条件での待機
await page.waitForFunction(() => {
  return document.readyState === 'complete';
});
```

### 8.3 テストデータの分離

テストデータをテストコードから分離することで、メンテナンス性を向上させます：

```typescript
// test-data.ts
export const users = {
  admin: { username: 'admin', password: 'password123' },
  customer: { username: 'customer', password: 'password456' }
};

// テストコード
import { users } from './test-data';

test('管理者としてログイン', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('ユーザー名').fill(users.admin.username);
  await page.getByLabel('パスワード').fill(users.admin.password);
  await page.getByRole('button', { name: 'ログイン' }).click();
});
```

## 9. 実践的なテストケース例

### 9.1 ナビゲーションテスト

```typescript
test('グローバルナビゲーションが機能する', async ({ page }) => {
  await page.goto('/');
  
  // 各メニューをクリックして正しいページに遷移することを確認
  await page.getByRole('link', { name: 'ホーム' }).click();
  await expect(page).toHaveURL('/');
  
  await page.getByRole('link', { name: 'プロダクト' }).click();
  await expect(page).toHaveURL('/products');
  
  await page.getByRole('link', { name: 'お問い合わせ' }).click();
  await expect(page).toHaveURL('/contact');
});
```

### 9.2 フォーム操作とバリデーションテスト

```typescript
test('お問い合わせフォームのバリデーション', async ({ page }) => {
  await page.goto('/contact');
  
  // 空のフォームを送信して各フィールドのバリデーションを確認
  await page.getByRole('button', { name: '送信' }).click();
  
  await expect(page.getByText('名前を入力してください')).toBeVisible();
  await expect(page.getByText('有効なメールアドレスを入力してください')).toBeVisible();
  await expect(page.getByText('メッセージを入力してください')).toBeVisible();
  
  // 正しい値を入力
  await page.getByLabel('名前').fill('テストユーザー');
  await page.getByLabel('メールアドレス').fill('test@example.com');
  await page.getByLabel('メッセージ').fill('これはテストメッセージです。');
  
  // 送信して成功メッセージを確認
  await page.getByRole('button', { name: '送信' }).click();
  await expect(page.getByText('お問い合わせを受け付けました')).toBeVisible();
});
```

### 9.3 レスポンシブデザインテスト

```typescript
test.describe('レスポンシブデザインテスト', () => {
  test('デスクトップレイアウト', async ({ page }) => {
    // デスクトップサイズ
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    // デスクトップ特有の要素を確認
    await expect(page.locator('nav.desktop-nav')).toBeVisible();
    await expect(page.locator('button.mobile-menu')).toBeHidden();
  });
  
  test('モバイルレイアウト', async ({ page }) => {
    // モバイルサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // モバイル特有の要素を確認
    await expect(page.locator('nav.desktop-nav')).toBeHidden();
    await expect(page.locator('button.mobile-menu')).toBeVisible();
    
    // ハンバーガーメニューをクリックしてナビゲーションを表示
    await page.locator('button.mobile-menu').click();
    await expect(page.locator('nav.mobile-nav')).toBeVisible();
  });
});
```

## 10. トラブルシューティング

### 10.1 よくあるエラーと解決法

| エラー | 原因 | 解決法 |
|-------|------|-------|
| `TimeoutError: waiting for locator` | 要素が見つからない | セレクタの確認、待機時間の調整 |
| `Error: strict mode violation` | 複数の要素がマッチした | セレクタをより具体的に指定 |
| `Error: net::ERR_CONNECTION_REFUSED` | 開発サーバーが起動していない | サーバーの起動確認 |
| `Error: page.click: Target closed` | ページが閉じられた | ナビゲーション後の待機追加 |

### 10.2 デバッグ方法

```typescript
// テスト中のデバッグポイント
test('デバッグ例', async ({ page }) => {
  await page.goto('/');
  
  // デバッグポイント
  await page.pause();
  
  // スクリーンショットを撮影
  await page.screenshot({ path: 'debug.png' });
  
  // コンソールにページの状態を出力
  console.log(await page.title());
  console.log(await page.content());
});
```

## 11. まとめ

Playwrightは、モダンなWebアプリケーションのE2Eテスト自動化に最適なツールです。本記事では、Next.jsプロジェクトへのPlaywright導入から基本的なテスト作成、実行方法までを解説しました。

E2Eテストを導入することで、以下のメリットが得られます：

- 手動テストの工数削減
- 回帰テストの効率化
- ユーザー体験の品質保証
- CI/CDパイプラインの強化

多くの開発チームでは、ユニットテスト、インテグレーションテスト、E2Eテストを組み合わせたテストピラミッドアプローチを採用しています。Playwrightはこの中でE2Eテストを担当し、実際のユーザー体験をシミュレートするテストを自動化します。

ぜひPlaywrightをプロジェクトに導入して、テスト自動化の効率を高めてみてください。

## 参考リンク

- [Playwright公式ドキュメント](https://playwright.dev/docs/intro)
- [Next.jsドキュメント - テスト](https://nextjs.org/docs/testing)
- [TypeScriptとPlaywright](https://playwright.dev/docs/test-typescript)
- [GitHub ActionsでのPlaywright実行](https://playwright.dev/docs/ci-intro)
