# GitHub Actions E2Eテスト高速化計画（安全版）

## 現状の問題

- **実行時間**: 40分以上
- **原因**:
  - CI環境で並列実行が無効（workers: 1）
  - 3つのブラウザ（Chromium, Firefox, WebKit）で全テスト実行
  - 14個のテストファイルを順次実行
  - 失敗時2回リトライ（最大3回実行）

## 改善計画

### 作業ブランチ: `dev`

### 1. devブランチへの切り替え

```bash
git checkout -b dev
```

### 2. playwright.config.ts の控えめな最適化

```javascript
export default defineConfig({
  // ... 既存の設定
  
  /* CIでも安全な並列数に設定 */
  workers: process.env.CI ? 2 : undefined,
  
  /* リトライを1回に削減 */
  retries: process.env.CI ? 1 : 0,
  
  /* webServerのタイムアウトを短縮 */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000, // 2分 → 1分に短縮
  },
});
```

### 3. .github/workflows/playwright.yml の段階的実行

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 30  # 60分 → 30分に短縮
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
    
    # PRの場合: Chromiumのみ実行（高速）
    - name: Run Playwright tests (PR)
      if: github.event_name == 'pull_request'
      run: npx playwright test --project=chromium
    
    # mainブランチ: 全ブラウザを順次実行
    - name: Run Playwright tests (Main - Chromium)
      if: github.event_name == 'push'
      run: npx playwright test --project=chromium
    
    - name: Run Playwright tests (Main - Firefox)
      if: github.event_name == 'push'
      run: npx playwright test --project=firefox
    
    - name: Run Playwright tests (Main - WebKit)
      if: github.event_name == 'push'
      run: npx playwright test --project=webkit
    
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### 4. テスト自体の最適化

以下の観点でテストコードを見直し:

- **重複するアサーションの削減**
  - 同じ要素の複数回チェックを統合
  - 共通のテストパターンを関数化

- **不要な待機時間の削除**
  - `page.waitForTimeout()` の見直し
  - 適切な待機条件（`waitForSelector`, `waitForLoadState`）への置き換え

- **テストケースの統合**
  - 関連する小さなテストを1つに統合
  - セットアップ・ティアダウンの共通化

### 5. 将来的な改善案（段階的に検討）

1. **テストの分割実行**
   - クリティカルパス（認証、決済など）
   - 一般的な機能テスト
   - パフォーマンステスト

2. **スモークテストの導入**
   - 最重要機能のみの軽量テストセット
   - 5分以内で完了

3. **並列度の段階的な増加**
   - workers: 2 → 3 → 4 と段階的に増やす
   - メモリ使用量をモニタリング

## 期待される効果

| 実行環境 | 現在 | 改善後 | 削減率 |
|---------|------|--------|--------|
| PR実行時 | 40分+ | 8-10分 | 75-80% |
| main実行時 | 40分+ | 20-25分 | 40-50% |

## メリット

- **安定性**: メモリ不足やポート競合のリスクなし
- **コスト**: GitHub Actions使用量は変わらず
- **段階的改善**: 問題があれば即座に調整可能
- **開発効率**: PRのフィードバックが大幅に高速化

## 実装時の注意点

1. **動作確認**
   - まずローカルで新しい設定をテスト
   - devブランチでCI動作を確認
   - 問題なければmainにマージ

2. **モニタリング**
   - 実行時間の記録
   - エラー率の監視
   - メモリ使用量の確認

3. **ロールバック準備**
   - 問題発生時は即座に以前の設定に戻せるように準備

## 実装チェックリスト

- [ ] devブランチの作成
- [ ] playwright.config.ts の更新
- [ ] .github/workflows/playwright.yml の更新
- [ ] ローカルでの動作確認
- [ ] devブランチでのCI実行確認
- [ ] 実行時間の計測
- [ ] mainブランチへのマージ
- [ ] 継続的なモニタリング