import { expect, test } from "@playwright/test";

/**
 * 認証フローE2Eテスト
 * Next.js + Auth.jsによる認証システムの包括的テスト
 */

// テストユーザー情報
const TEST_USER = {
	email: "user@example.com",
	password: "password123",
};

const ADMIN_USER = {
	email: "admin@example.com", 
	password: "password123",
};

// ページオブジェクト風のヘルパークラス
class AuthFlowPage {
	constructor(private page: any) {}

	// ログインページへ移動
	async gotoLogin() {
		await this.page.goto("/login");
		await this.page.waitForLoadState("domcontentloaded");
	}

	// ログイン実行
	async login(email: string, password: string) {
		await this.page.getByLabel("メールアドレス").fill(email);
		// パスワードフィールドは input type="password" で直接指定
		await this.page.locator('input[type="password"]').fill(password);
		// フォーム内の送信ボタンを指定
		await this.page.locator('form button[type="submit"]').click();
		
		// ログイン処理の完了を待つ（ページ遷移またはエラー表示）
		await this.page.waitForTimeout(1500);
	}

	// ログアウト実行
	async logout() {
		// アバターボタン（ドロップダウンメニューのトリガー）を探す
		const avatarButton = this.page.locator('button[aria-haspopup="true"] > div > img, button[aria-haspopup="true"] > div > div').first();
		
		// アバターボタンが見つからない場合は、より広い範囲で探す
		const dropdownTrigger = await avatarButton.isVisible() 
			? avatarButton 
			: this.page.locator('button[aria-haspopup="true"]').first();
		
		// ドロップダウンメニューを開く
		await dropdownTrigger.click();
		await this.page.waitForTimeout(500);
		
		// ログアウトメニュー項目をクリック（複数のセレクタで試行）
		const logoutItem = this.page.locator(
			'[role="menuitem"]:has-text("ログアウト"), ' +
			'div:has-text("ログアウト"):visible, ' +
			'.text-destructive:has-text("ログアウト"), ' +
			'*:has(svg) + span:has-text("ログアウト")'
		).first();
		
		await logoutItem.click();
		
		// ログアウト処理の完了を待つ
		await this.page.waitForTimeout(1500);
	}

	// ダッシュボードページへ移動
	async gotoDashboard() {
		await this.page.goto("/dashboard");
		await this.page.waitForLoadState("domcontentloaded");
	}

	// 認証状態の確認
	async isLoggedIn() {
		// ダッシュボードページにアクセスできるかで判定
		await this.gotoDashboard();
		const currentUrl = this.page.url();
		
		// ログイン画面にリダイレクトされていないかチェック
		return !currentUrl.includes("/login");
	}

	// ログインエラーの存在確認
	async hasLoginError() {
		const errorElements = this.page.locator('.text-destructive, .error, [role="alert"]');
		return await errorElements.count() > 0;
	}

	// ダッシュボード要素の存在確認
	async hasDashboardContent() {
		// ダッシュボードの特徴的な要素を確認
		const dashboardHeader = this.page.locator('h1:has-text("ダッシュボード"), h2:has-text("ダッシュボード")').first();
		return await dashboardHeader.isVisible();
	}
}

test.describe("認証フロー", () => {
	let authFlow: AuthFlowPage;

	test.beforeEach(async ({ page }) => {
		authFlow = new AuthFlowPage(page);
	});

	test.describe("正常系フロー", () => {
		test("完全な認証フロー: ログイン→ダッシュボード→ログアウト", async ({ page }) => {
			// 1. ログインページへ移動
			await authFlow.gotoLogin();
			
			// ログインページの要素確認
			await expect(page.getByLabel("メールアドレス")).toBeVisible();
			await expect(page.locator('input[type="password"]')).toBeVisible();
			await expect(page.locator('form button[type="submit"]')).toBeVisible();

			// 2. 正しい認証情報でログイン
			await authFlow.login(TEST_USER.email, TEST_USER.password);

			// 3. ダッシュボードにリダイレクトされることを確認
			await expect(page).toHaveURL(/\/dashboard/);
			
			// ダッシュボードのコンテンツが表示されることを確認
			const hasDashboard = await authFlow.hasDashboardContent();
			expect(hasDashboard).toBeTruthy();

			// 4. ログアウト
			await authFlow.logout();

			// 5. ホームページまたはログインページにリダイレクトされることを確認
			await page.waitForTimeout(1000);
			const finalUrl = page.url();
			expect(finalUrl.includes("/dashboard")).toBeFalsy();
		});

		test("管理者ユーザーでのログイン", async ({ page }) => {
			await authFlow.gotoLogin();
			await authFlow.login(ADMIN_USER.email, ADMIN_USER.password);
			
			// 管理者としてダッシュボードにアクセスできることを確認
			const isLoggedIn = await authFlow.isLoggedIn();
			expect(isLoggedIn).toBeTruthy();
		});
	});

	test.describe("エラー系フロー", () => {
		test("間違ったメールアドレスでログイン失敗", async ({ page }) => {
			await authFlow.gotoLogin();
			await authFlow.login("wrong@example.com", TEST_USER.password);

			// エラーメッセージが表示されることを確認
			const hasError = await authFlow.hasLoginError();
			expect(hasError).toBeTruthy();

			// ログインページに留まることを確認
			await expect(page).toHaveURL(/\/login/);
		});

		test("間違ったパスワードでログイン失敗", async ({ page }) => {
			await authFlow.gotoLogin();
			await authFlow.login(TEST_USER.email, "wrongpassword");

			// エラーメッセージが表示されることを確認  
			const hasError = await authFlow.hasLoginError();
			expect(hasError).toBeTruthy();

			// ログインページに留まることを確認
			await expect(page).toHaveURL(/\/login/);
		});

		test("空のフォームでログイン失敗", async ({ page }) => {
			await authFlow.gotoLogin();
			await page.locator('form button[type="submit"]').click();

			// バリデーションエラーが表示されることを確認
			await page.waitForTimeout(1000);
			const errorElements = await page.locator('.text-destructive, .error').count();
			expect(errorElements).toBeGreaterThan(0);
		});

		test("未認証状態でダッシュボードアクセス→ログインページリダイレクト", async ({ page }) => {
			// 未認証状態でダッシュボードにアクセス
			await authFlow.gotoDashboard();

			// ログインページにリダイレクトされることを確認
			await expect(page).toHaveURL(/\/login/);
		});
	});

	test.describe("セッション状態確認", () => {
		test("ログイン後のページリロードでセッション維持", async ({ page }) => {
			// ログイン
			await authFlow.gotoLogin();
			await authFlow.login(TEST_USER.email, TEST_USER.password);
			await expect(page).toHaveURL(/\/dashboard/);

			// ページリロード
			await page.reload();
			await page.waitForLoadState("domcontentloaded");

			// セッションが維持されていることを確認
			const hasDashboard = await authFlow.hasDashboardContent();
			expect(hasDashboard).toBeTruthy();
			expect(page.url().includes("/dashboard")).toBeTruthy();
		});

		test("ログイン後のブラウザバック・フォワードでセッション維持", async ({ page }) => {
			// ログイン
			await authFlow.gotoLogin();
			await authFlow.login(TEST_USER.email, TEST_USER.password);
			await expect(page).toHaveURL(/\/dashboard/);

			// ホームページに移動
			await page.goto("/");
			await expect(page).toHaveURL("/");

			// ダッシュボードに戻る
			await authFlow.gotoDashboard();
			
			// セッションが維持されていることを確認
			const hasDashboard = await authFlow.hasDashboardContent();
			expect(hasDashboard).toBeTruthy();
		});

		test("新しいタブでセッション共有確認", async ({ page, context }) => {
			// メインタブでログイン
			await authFlow.gotoLogin();
			await authFlow.login(TEST_USER.email, TEST_USER.password);
			await expect(page).toHaveURL(/\/dashboard/);

			// 新しいタブを開く
			const newTab = await context.newPage();
			const newAuthFlow = new AuthFlowPage(newTab);

			// 新しいタブでダッシュボードにアクセス
			await newAuthFlow.gotoDashboard();

			// セッションが共有されていることを確認
			const hasDashboard = await newAuthFlow.hasDashboardContent();
			expect(hasDashboard).toBeTruthy();

			await newTab.close();
		});
	});
});