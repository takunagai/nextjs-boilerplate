/**
 * プロフィール管理機能 E2Eテスト (簡素版)
 *
 * 注意: プロフィール機能が未実装のため一時的に無効化
 * TODO: プロフィール機能実装後に有効化
 */

import { expect, test } from "@playwright/test";

// テストユーザー情報
const TEST_USER = {
	email: "user@example.com",
	password: "password123",
};

// プロフィールページのヘルパークラス
class ProfilePage {
	constructor(private page: any) {}

	// ログイン処理
	async login() {
		await this.page.goto("/login");
		await this.page.getByLabel("メールアドレス").fill(TEST_USER.email);
		await this.page.locator('input[type="password"]').fill(TEST_USER.password);
		await this.page.locator('form button[type="submit"]').click();
		await this.page.waitForURL(/\/dashboard/, { timeout: 10000 });
	}

	// プロフィールページへ移動
	async goto() {
		await this.page.goto("/profile");
		await this.page.waitForLoadState("domcontentloaded");
	}

	// プロフィール編集フォームの要素取得
	getNameInput() {
		return this.page.getByLabel("名前");
	}

	getDisplayNameInput() {
		return this.page.getByLabel("表示名");
	}

	getBioTextarea() {
		return this.page.getByLabel("自己紹介");
	}

	getEmailVisibleCheckbox() {
		return this.page.getByRole("checkbox", { name: /メールアドレスを公開/ });
	}

	getProfileVisibleCheckbox() {
		return this.page.getByRole("checkbox", { name: /プロフィールを公開/ });
	}

	getUpdateButton() {
		return this.page.getByRole("button", { name: /プロフィールを更新/ });
	}

	getResetButton() {
		return this.page.getByRole("button", { name: /リセット/ });
	}

	// フォーム送信
	async submitForm() {
		await this.getUpdateButton().click();
		// 成功またはエラーメッセージの表示を待つ
		await Promise.race([
			this.page.waitForSelector('.text-success, .bg-success, .border-success', { timeout: 10000 }),
			this.page.waitForSelector('.text-destructive, .bg-destructive, [role="alert"]', { timeout: 10000 }),
		]);
	}

	// プロフィール情報の更新
	async updateProfile(data: {
		name?: string;
		displayName?: string;
		bio?: string;
		emailVisible?: boolean;
		profileVisible?: boolean;
	}) {
		if (data.name !== undefined) {
			await this.getNameInput().fill(data.name);
		}
		if (data.displayName !== undefined) {
			await this.getDisplayNameInput().fill(data.displayName);
		}
		if (data.bio !== undefined) {
			await this.getBioTextarea().fill(data.bio);
		}
		if (data.emailVisible !== undefined) {
			const checkbox = this.getEmailVisibleCheckbox();
			const isChecked = await checkbox.isChecked();
			if (isChecked !== data.emailVisible) {
				await checkbox.click();
			}
		}
		if (data.profileVisible !== undefined) {
			const checkbox = this.getProfileVisibleCheckbox();
			const isChecked = await checkbox.isChecked();
			if (isChecked !== data.profileVisible) {
				await checkbox.click();
			}
		}
	}
}

test.describe.skip("プロフィール管理機能 (コア機能) - 未実装のため無効", () => {
	let profilePage: ProfilePage;

	test.beforeEach(async ({ page }) => {
		profilePage = new ProfilePage(page);
		await profilePage.login();
		await profilePage.goto();
	});

	test("プロフィールページが正常に表示される", async ({ page }) => {
		// プロフィールページの基本要素を確認
		await expect(
			page.getByRole("heading", { name: /プロフィール編集/ }),
		).toBeVisible();
		
		// 基本フォーム要素の確認
		await expect(profilePage.getNameInput()).toBeVisible();
		await expect(profilePage.getUpdateButton()).toBeVisible();
	});

	test("基本情報を正常に更新できる", async ({ page }) => {
		await profilePage.updateProfile({
			name: "Updated Test User",
			displayName: "Updated Display",
			bio: "This is an updated bio.",
		});

		await profilePage.submitForm();

		// 更新成功を確認（フォーム値の保持）
		await expect(profilePage.getNameInput()).toHaveValue("Updated Test User");
	});

	test("名前が空の場合エラーを表示する", async ({ page }) => {
		await profilePage.updateProfile({ name: "" });
		await profilePage.submitForm();

		// エラーメッセージが表示されることを確認
		const errorElement = page.locator('.text-destructive, [role="alert"]');
		await expect(errorElement.first()).toBeVisible();
	});

	test("プライバシー設定を変更できる", async ({ page }) => {
		await profilePage.updateProfile({
			emailVisible: true,
			profileVisible: false,
		});

		await profilePage.submitForm();

		// チェックボックスの状態が正しく更新されることを確認
		await expect(profilePage.getEmailVisibleCheckbox()).toBeChecked();
		await expect(profilePage.getProfileVisibleCheckbox()).not.toBeChecked();
	});

	test("キーボードナビゲーションが正常に動作する", async ({ page }) => {
		// フォーカス可能な要素の存在確認
		const focusableElements = await page.locator('input, textarea, button, [tabindex]:not([tabindex="-1"])').count();
		expect(focusableElements).toBeGreaterThan(3);

		// 名前フィールドに直接フォーカス
		await profilePage.getNameInput().focus();
		await expect(profilePage.getNameInput()).toBeFocused();
	});

	test("リセットボタンで初期値に戻る", async ({ page }) => {
		const originalName = await profilePage.getNameInput().inputValue();

		await profilePage.updateProfile({
			name: "Changed Name",
			bio: "Changed Bio",
		});

		await profilePage.getResetButton().click();

		await expect(profilePage.getNameInput()).toHaveValue(originalName);
		await expect(profilePage.getBioTextarea()).not.toHaveValue("Changed Bio");
	});

	test("ネットワークエラー時の適切な処理", async ({ page }) => {
		// ネットワークを無効化
		await page.context().setOffline(true);

		await profilePage.updateProfile({ name: "Offline Test" });
		await profilePage.submitForm();

		// エラーメッセージまたは適切な処理が行われることを確認
		const hasError = await page.locator('.text-destructive, [role="alert"]').count() > 0;
		expect(hasError).toBeTruthy(); // オフライン時はエラーが表示されるべき

		// ネットワークを復旧
		await page.context().setOffline(false);
	});
});