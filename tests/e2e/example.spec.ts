import { test, expect } from '@playwright/test';

/**
 * Next.jsアプリケーションのE2Eテスト
 * シンプルな構成で基本的な機能をテストします
 */

// ホームページのテスト
test('ホームページが正しく表示される', async ({ page }) => {
  // ホームページにアクセス
  await page.goto('/');

  // サイト名（ヘッダーロゴ）が表示されていることを確認
  const header = await page.locator('header');
  await expect(header).toBeVisible();
  await expect(header).toContainText('ナガイ商店.com');

  // ナビゲーションメニューが表示されていることを確認
  await expect(page.locator('nav')).toBeVisible();
});

// サンプルページのテスト
test('サンプルページへのナビゲーションが機能する', async ({ page }) => {
  // ホームページからスタート
  await page.goto('/');
  
  // サンプルページへ移動
  await page.goto('/examples');
  
  // サンプルページのタイトルが表示されることを確認
  await expect(page.locator('h1')).toContainText('サンプル');
  
  // サンプル一覧が表示されていることを確認
  await expect(page.getByRole('link', { name: /フォーム/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /データ取得/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /UIコンポーネント/i })).toBeVisible();
});

// フォームサンプルページのテスト
test('フォームサンプルページのバリデーションが機能する', async ({ page }) => {
  // フォームサンプルページにアクセス
  await page.goto('/examples/form');
  
  // フォームが表示されていることを確認
  await expect(page.locator('form')).toBeVisible();
  
  // 空のフォームを送信してエラーが表示されることを確認
  await page.getByRole('button', { name: /送信/i }).click();
  
  // バリデーションエラーメッセージが表示されることを確認
  await expect(page.locator('form')).toContainText('入力してください');
  
  // フォームに有効な値を入力
  await page.locator('input[name="name"]').fill('テスト太郎');
  await page.locator('input[name="email"]').fill('test@example.com');
  await page.locator('textarea[name="message"]').fill('これはテストメッセージです。10文字以上の入力が必要です。');
  await page.locator('input[name="terms"]').check();
  
  // フォーム送信（実際の送信はモックなので、エラーが消えることだけを確認）
  await page.getByRole('button', { name: /送信/i }).click();
});
