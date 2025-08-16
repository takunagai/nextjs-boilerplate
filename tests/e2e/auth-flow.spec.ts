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

		// ログイン処理の完了を待つ（URL変更またはエラー表示）
		await Promise.race([
			this.page.waitForURL(/\/dashboard/, { timeout: 10000 }),
			this.page.waitForSelector('.text-destructive, .error, [role="alert"]', { timeout: 10000 }),
		]);
	}

	// ログアウト実行
	async logout() {
		// アバターボタン（ドロップダウンメニューのトリガー）を探す
		const avatarButton = this.page
			.locator(
				'button[aria-haspopup="true"] > div > img, button[aria-haspopup="true"] > div > div',
			)
			.first();

		// アバターボタンが見つからない場合は、より広い範囲で探す
		const dropdownTrigger = (await avatarButton.isVisible())
			? avatarButton
			: this.page.locator('button[aria-haspopup="true"]').first();

		// ドロップダウンメニューを開く
		await dropdownTrigger.click();
		
		// メニューの表示を待つ（柔軟な条件）
		await this.page.waitForTimeout(1000); // ドロップダウン表示の短い待機

		// ログアウトメニュー項目をクリック（より安全なアプローチ）
		try {
			// ログアウト要素を探して選択（複数の試行）
			const logoutItem = this.page.getByText("ログアウト").first();
			await logoutItem.click({ timeout: 5000 });
		} catch (error) {
			// fallback: より広範囲でログアウト要素を探す
			const logoutFallback = this.page.locator('*:has-text("ログアウト")').first();
			await logoutFallback.click({ timeout: 5000 });
		}

		// ログアウト処理の完了を待つ（URL変更やログイン画面への遷移）
		await Promise.race([
			this.page.waitForURL(/\/login/, { timeout: 10000 }),
			this.page.waitForURL(/\/$/, { timeout: 10000 }),
			this.page.waitForSelector('form button[type="submit"]', { timeout: 10000 }), // ログインフォーム表示
		]);
	}

	// ダッシュボードページへ移動
	async gotoDashboard() {
		await this.page.goto("/dashboard");
		await this.page.waitForLoadState("domcontentloaded");
	}

	// 認証状態の確認
	async isLoggedIn() {
		try {
			// ダッシュボードページにアクセスできるかで判定
			await this.gotoDashboard();
			// ページの読み込み完了を待つ
			await this.page.waitForLoadState('domcontentloaded');
			
			const currentUrl = this.page.url();
			
			// ログイン画面にリダイレクトされていないかチェック
			return !currentUrl.includes("/login");
		} catch (error) {
			// エラーが発生した場合は未認証と判定
			return false;
		}
	}

	// ログインエラーの存在確認
	async hasLoginError() {
		const errorElements = this.page.locator(
			'.text-destructive, .error, [role="alert"]',
		);
		return (await errorElements.count()) > 0;
	}

	// ダッシュボード要素の存在確認
	async hasDashboardContent() {
		// ダッシュボードの特徴的な要素を確認
		const dashboardHeader = this.page
			.locator('h1:has-text("ダッシュボード"), h2:has-text("ダッシュボード")')
			.first();
		return await dashboardHeader.isVisible();
	}
}

test.describe("認証フロー", () => {
	let authFlow: AuthFlowPage;

	test.beforeEach(async ({ page }) => {
		authFlow = new AuthFlowPage(page);
	});

	test.describe("正常系フロー", () => {
		test("完全な認証フロー: ログイン→ダッシュボード→ログアウト", async ({
			page,
		}) => {
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
			await page.waitForFunction(() => !window.location.pathname.includes("/dashboard"), { timeout: 5000 });
			const finalUrl = page.url();
			expect(finalUrl.includes("/dashboard")).toBeFalsy();
		});

		test("管理者ユーザーでのログイン", async ({ page }) => {
			await authFlow.gotoLogin();
			await authFlow.login(ADMIN_USER.email, ADMIN_USER.password);

			// ダッシュボードにリダイレクトされることを確認（より直接的）
			await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
		});
	});

	test.describe("エラー系フロー", () => {
		test("ログイン失敗パターンの包括的確認", async ({ page }) => {
			await authFlow.gotoLogin();

			// 1. 空のフォームでの失敗
			await page.locator('form button[type="submit"]').click();
			await page.waitForSelector(".text-destructive, .error, [role='alert']", { timeout: 5000 });
			let errorElements = await page.locator(".text-destructive, .error").count();
			expect(errorElements).toBeGreaterThan(0);

			// 2. 間違ったメールアドレスでの失敗
			await authFlow.login("wrong@example.com", TEST_USER.password);
			const hasEmailError = await authFlow.hasLoginError();
			expect(hasEmailError).toBeTruthy();
			await expect(page).toHaveURL(/\/login/);

			// 3. 間違ったパスワードでの失敗
			await authFlow.login(TEST_USER.email, "wrongpassword");
			const hasPasswordError = await authFlow.hasLoginError();
			expect(hasPasswordError).toBeTruthy();
			await expect(page).toHaveURL(/\/login/);
		});

		test("未認証状態でダッシュボードアクセス→ログインページリダイレクト", async ({
			page,
		}) => {
			// 未認証状態でダッシュボードにアクセス
			await authFlow.gotoDashboard();

			// ログインページにリダイレクトされることを確認
			await expect(page).toHaveURL(/\/login/);
		});
	});

	test.describe("セッション状態確認", () => {
		test("セッション維持の包括的確認", async ({ page, context }) => {
			// ログイン
			await authFlow.gotoLogin();
			await authFlow.login(TEST_USER.email, TEST_USER.password);
			await expect(page).toHaveURL(/\/dashboard/);

			// 1. ページリロードでセッション維持
			await page.reload();
			await page.waitForLoadState("domcontentloaded");
			let hasDashboard = await authFlow.hasDashboardContent();
			expect(hasDashboard).toBeTruthy();
			expect(page.url().includes("/dashboard")).toBeTruthy();

			// 2. ブラウザバック・フォワードでセッション維持
			await page.goto("/");
			await expect(page).toHaveURL("/");
			await authFlow.gotoDashboard();
			hasDashboard = await authFlow.hasDashboardContent();
			expect(hasDashboard).toBeTruthy();

			// 3. 新しいタブでセッション共有確認
			const newTab = await context.newPage();
			const newAuthFlow = new AuthFlowPage(newTab);
			await newAuthFlow.gotoDashboard();
			const hasSharedSession = await newAuthFlow.hasDashboardContent();
			expect(hasSharedSession).toBeTruthy();

			await newTab.close();
		});
	});
});
