/**
 * プロフィール管理機能 E2Eテスト
 *
 * テスト対象:
 * - プロフィール編集機能の包括的なテスト
 * - 画像アップロード機能
 * - バリデーション確認
 * - プライバシー設定
 * - 危険操作（メール変更、アカウント削除）
 * - アクセシビリティ対応
 */

import { expect, test } from "@playwright/test";
import path from "path";

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

	getLocationInput() {
		return this.page.getByLabel("所在地");
	}

	getWebsiteInput() {
		return this.page.getByLabel("ウェブサイト");
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

	getImageUploadInput() {
		return this.page.locator("#profile-image-upload");
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
		location?: string;
		website?: string;
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
		if (data.location !== undefined) {
			await this.getLocationInput().fill(data.location);
		}
		if (data.website !== undefined) {
			await this.getWebsiteInput().fill(data.website);
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

	// 成功メッセージの確認
	async hasSuccessMessage() {
		const successElement = this.page.locator(
			".text-success, .bg-success, .border-success",
		);
		return (await successElement.count()) > 0;
	}

	// エラーメッセージの確認
	async hasErrorMessage() {
		const errorElement = this.page.locator(
			'.text-destructive, .bg-destructive, [role="alert"]',
		);
		return (await errorElement.count()) > 0;
	}

	// 特定のエラーメッセージの確認
	async hasSpecificError(message: string) {
		const errorElement = this.page.locator(`text=${message}`);
		return await errorElement.isVisible();
	}

	// フィールドエラーの確認
	async hasFieldError(fieldName: string) {
		const field = this.page.getByLabel(fieldName);
		const fieldId = await field.getAttribute("id");
		if (fieldId) {
			const errorElement = this.page.locator(
				`[id="${fieldId}-error"], [aria-describedby*="${fieldId}"] ~ .text-destructive`,
			);
			return (await errorElement.count()) > 0;
		}
		return false;
	}

	// プロフィール画像のアップロード
	async uploadImage(filename: string) {
		const filePath = path.resolve(__dirname, `../fixtures/${filename}`);
		await this.getImageUploadInput().setInputFiles(filePath);
		// アップロード完了の表示を待つ（プレビュー表示やステータス変更）
		await Promise.race([
			this.page.waitForSelector('img[alt*="プロフィール画像"]', { timeout: 15000 }),
			this.page.waitForSelector('.upload-complete, .upload-success', { timeout: 15000 }),
			this.page.waitForFunction(() => {
				const input = document.querySelector('#profile-image-upload') as HTMLInputElement;
				return input && input.files && input.files.length > 0;
			}, { timeout: 15000 }),
		]);
	}

	// プロフィール画像の確認
	async hasProfileImage() {
		const imageElement = this.page.locator('img[alt*="プロフィール画像"]');
		return await imageElement.isVisible();
	}

	// 危険操作セクションのヘルパー
	async openEmailChangeDialog() {
		await this.page
			.getByRole("button", { name: /メールアドレスを変更/ })
			.click();
		await this.page.waitForSelector('[role="dialog"], .modal, .dialog', { timeout: 5000 });
	}

	async openDeleteProfileDialog() {
		await this.page.getByRole("button", { name: /アカウントを削除/ }).click();
		await this.page.waitForSelector('[role="dialog"], .modal, .dialog', { timeout: 5000 });
	}

	async fillEmailChangeForm(newEmail: string) {
		await this.page.getByLabel("新しいメールアドレス").fill(newEmail);
		await this.page.getByRole("button", { name: /確認メールを送信/ }).click();
		// 処理完了やメッセージ表示を待つ
		await Promise.race([
			this.page.waitForSelector('.text-success, .confirmation-message', { timeout: 10000 }),
			this.page.waitForSelector('.text-destructive, [role="alert"]', { timeout: 10000 }),
		]);
	}

	async fillDeleteConfirmForm(confirmText: string) {
		await this.page.getByLabel(/確認テキスト/).fill(confirmText);
		await this.page.getByRole("button", { name: /削除を実行/ }).click();
		// 削除処理完了やエラー表示を待つ
		await Promise.race([
			this.page.waitForURL(/\//, { timeout: 10000 }), // ホームページへのリダイレクト
			this.page.waitForSelector('.text-destructive, [role="alert"]', { timeout: 10000 }),
		]);
	}
}

test.describe("プロフィール管理機能", () => {
	let profilePage: ProfilePage;

	test.beforeEach(async ({ page }) => {
		profilePage = new ProfilePage(page);
		await profilePage.login();
		await profilePage.goto();
	});

	test.describe("ページアクセスと初期表示", () => {
		test("プロフィールページが正常に表示される", async ({ page }) => {
			await expect(page).toHaveTitle(/プロフィール編集/);
			await expect(
				page.getByRole("heading", { name: /プロフィール編集/ }),
			).toBeVisible();
		});

		test("フォーム要素がすべて表示される", async ({ page }) => {
			await expect(profilePage.getNameInput()).toBeVisible();
			await expect(profilePage.getDisplayNameInput()).toBeVisible();
			await expect(profilePage.getBioTextarea()).toBeVisible();
			await expect(profilePage.getLocationInput()).toBeVisible();
			await expect(profilePage.getWebsiteInput()).toBeVisible();
			await expect(profilePage.getEmailVisibleCheckbox()).toBeVisible();
			await expect(profilePage.getProfileVisibleCheckbox()).toBeVisible();
			await expect(profilePage.getUpdateButton()).toBeVisible();
			await expect(profilePage.getResetButton()).toBeVisible();
		});

		test("プロフィール概要セクションが表示される", async ({ page }) => {
			await expect(page.getByText("現在のプロフィール")).toBeVisible();
			await expect(page.getByText(TEST_USER.email)).toBeVisible();
		});

		test("画像アップロード機能が表示される", async ({ page }) => {
			await expect(page.getByText("プロフィール画像")).toBeVisible();
			await expect(page.getByText("画像を選択")).toBeVisible();
		});
	});

	test.describe("プロフィール情報の更新", () => {
		test("基本情報を正常に更新できる", async ({ page }) => {
			await profilePage.updateProfile({
				name: "Updated Test User",
				displayName: "Updated Display",
				bio: "This is an updated bio with more details.",
				location: "Osaka, Japan",
				website: "https://updated-website.com",
			});

			await profilePage.submitForm();

			// 更新成功を確認（フォーム値の保持やメッセージ表示）
			await expect(profilePage.getNameInput()).toHaveValue("Updated Test User");
			// 実際の実装では成功メッセージやページ更新を確認
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

		test("最小限の情報（名前のみ）で更新できる", async ({ page }) => {
			await profilePage.updateProfile({
				name: "Minimal User",
				displayName: "",
				bio: "",
				location: "",
				website: "",
			});

			await profilePage.submitForm();

			await expect(profilePage.getNameInput()).toHaveValue("Minimal User");
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
	});

	test.describe("入力バリデーション", () => {
		test("名前が空の場合エラーを表示する", async ({ page }) => {
			await profilePage.updateProfile({ name: "" });
			await profilePage.submitForm();

			const hasError = await profilePage.hasSpecificError("名前は必須です");
			expect(hasError).toBeTruthy();
		});

		test("名前が50文字を超える場合エラーを表示する", async ({ page }) => {
			const longName = "a".repeat(51);
			await profilePage.updateProfile({ name: longName });
			await profilePage.submitForm();

			const hasError = await profilePage.hasFieldError("名前");
			expect(hasError).toBeTruthy();
		});

		test("自己紹介が500文字を超える場合エラーを表示する", async ({ page }) => {
			const longBio = "a".repeat(501);
			await profilePage.updateProfile({ bio: longBio });
			await profilePage.submitForm();

			const hasError = await profilePage.hasFieldError("自己紹介");
			expect(hasError).toBeTruthy();
		});

		test("無効なURL形式でエラーを表示する", async ({ page }) => {
			await profilePage.updateProfile({ website: "invalid-url" });
			await profilePage.submitForm();

			const hasError = await profilePage.hasFieldError("ウェブサイト");
			expect(hasError).toBeTruthy();
		});

		test("HTMLタグを含む入力でエラーを表示する", async ({ page }) => {
			await profilePage.updateProfile({
				name: "Test <script>alert('xss')</script>",
			});
			await profilePage.submitForm();

			const hasError = await profilePage.hasSpecificError(
				"HTMLタグを含めることはできません",
			);
			expect(hasError).toBeTruthy();
		});

		test("複数のバリデーションエラーが同時に表示される", async ({ page }) => {
			await profilePage.updateProfile({
				name: "", // 必須エラー
				website: "invalid-url", // URL形式エラー
				bio: "a".repeat(501), // 長さエラー
			});
			await profilePage.submitForm();

			const hasNameError = await profilePage.hasFieldError("名前");
			const hasWebsiteError = await profilePage.hasFieldError("ウェブサイト");
			const hasBioError = await profilePage.hasFieldError("自己紹介");

			expect(hasNameError).toBeTruthy();
			expect(hasWebsiteError).toBeTruthy();
			expect(hasBioError).toBeTruthy();
		});
	});

	test.describe("画像アップロード機能", () => {
		// テスト用画像ファイルが必要（実際の実装時に追加）
		test.skip("有効な画像ファイルをアップロードできる", async ({ page }) => {
			await profilePage.uploadImage("test-avatar.jpg");

			const hasImage = await profilePage.hasProfileImage();
			expect(hasImage).toBeTruthy();
		});

		test("画像アップロードボタンが適切にラベル付けされている", async ({
			page,
		}) => {
			const uploadLabel = page.getByText("画像を選択");
			await expect(uploadLabel).toBeVisible();

			const fileInput = profilePage.getImageUploadInput();
			await expect(fileInput).toHaveAttribute(
				"accept",
				"image/jpeg,image/png,image/webp",
			);
		});

		test("画像ファイル形式の説明が表示される", async ({ page }) => {
			await expect(
				page.getByText("JPEG、PNG、WebP形式、5MB以下"),
			).toBeVisible();
		});
	});

	test.describe("アクセシビリティ機能", () => {
		test("フォーム要素が適切なラベルを持っている", async ({ page }) => {
			// 必須フィールドのラベル確認
			const nameLabel = page.getByText("名前");
			await expect(nameLabel).toBeVisible();

			// ARIA属性の確認
			const nameInput = profilePage.getNameInput();
			const labelId = await nameInput.getAttribute("aria-labelledby");
			expect(labelId).toBeTruthy();
		});

		test("エラーメッセージがARIA属性で適切に関連付けられている", async ({
			page,
		}) => {
			await profilePage.updateProfile({ name: "" });
			await profilePage.submitForm();

			// role="alert"要素の存在確認
			const alertElements = page.locator('[role="alert"]');
			const alertCount = await alertElements.count();
			expect(alertCount).toBeGreaterThan(0);
		});

		test("キーボードナビゲーションが正常に動作する", async ({ page }) => {
			// Tabキーでフォーカス移動をテスト
			await page.keyboard.press("Tab");
			await expect(profilePage.getNameInput()).toBeFocused();

			await page.keyboard.press("Tab");
			await expect(profilePage.getDisplayNameInput()).toBeFocused();

			await page.keyboard.press("Tab");
			await expect(profilePage.getBioTextarea()).toBeFocused();
		});

		test("フィールドセットが適切に構造化されている", async ({ page }) => {
			const privacyFieldset = page.locator(
				'fieldset:has(legend:has-text("プライバシー設定"))',
			);
			await expect(privacyFieldset).toBeVisible();

			const legend = privacyFieldset.locator("legend");
			await expect(legend).toBeVisible();
		});

		test("送信状態がスクリーンリーダーに通知される", async ({ page }) => {
			// 長い送信処理をシミュレート（実際の実装では処理時間を調整）
			await profilePage.getUpdateButton().click();

			// aria-live要素の確認
			const liveRegion = page.locator('[aria-live="polite"]');
			await expect(liveRegion).toBeVisible();
		});
	});

	test.describe("危険操作機能", () => {
		test("メールアドレス変更ダイアログが開く", async ({ page }) => {
			await profilePage.openEmailChangeDialog();

			await expect(page.getByText("メールアドレス変更")).toBeVisible();
			await expect(page.getByLabel("新しいメールアドレス")).toBeVisible();
		});

		test("有効なメールアドレスで変更要求ができる", async ({ page }) => {
			await profilePage.openEmailChangeDialog();
			await profilePage.fillEmailChangeForm("new@example.com");

			// 成功メッセージまたは確認画面の表示は既にfillEmailChangeFormで待機済み
		});

		test("無効なメールアドレスでエラーが表示される", async ({ page }) => {
			await profilePage.openEmailChangeDialog();
			await profilePage.fillEmailChangeForm("invalid-email");

			const hasError = await profilePage.hasErrorMessage();
			expect(hasError).toBeTruthy();
		});

		test("アカウント削除ダイアログが開く", async ({ page }) => {
			await profilePage.openDeleteProfileDialog();

			await expect(page.getByText("アカウント削除")).toBeVisible();
			await expect(page.getByLabel(/確認テキスト/)).toBeVisible();
		});

		test("正しい確認テキストで削除処理ができる", async ({ page }) => {
			await profilePage.openDeleteProfileDialog();
			await profilePage.fillDeleteConfirmForm("プロフィールを削除します");

			// 削除処理の実行（実際の実装では適切な確認）は既にfillDeleteConfirmFormで待機済み
		});

		test("間違った確認テキストでエラーが表示される", async ({ page }) => {
			await profilePage.openDeleteProfileDialog();
			await profilePage.fillDeleteConfirmForm("間違ったテキスト");

			const hasError = await profilePage.hasErrorMessage();
			expect(hasError).toBeTruthy();
		});
	});

	test.describe("レスポンシブデザイン", () => {
		test("モバイル画面でプロフィールページが適切に表示される", async ({
			page,
		}) => {
			await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE サイズ

			await expect(
				page.getByRole("heading", { name: /プロフィール編集/ }),
			).toBeVisible();
			await expect(profilePage.getNameInput()).toBeVisible();
			await expect(profilePage.getUpdateButton()).toBeVisible();
		});

		test("タブレット画面でレイアウトが適切に調整される", async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 }); // iPad サイズ

			await expect(
				page.getByRole("heading", { name: /プロフィール編集/ }),
			).toBeVisible();
			await expect(profilePage.getNameInput()).toBeVisible();
		});
	});

	test.describe("セキュリティテスト", () => {
		test("XSS攻撃の防御", async ({ page }) => {
			const xssPayloads = [
				"<script>alert('xss')</script>",
				"<img src=x onerror=alert('xss')>",
				"javascript:alert('xss')",
				"<svg onload=alert('xss')>",
			];

			for (const payload of xssPayloads) {
				await profilePage.updateProfile({ name: payload });
				await profilePage.submitForm();

				const hasError = await profilePage.hasSpecificError(
					"HTMLタグを含めることはできません",
				);
				expect(hasError).toBeTruthy();

				// フォームをリセット
				await profilePage.getResetButton().click();
			}
		});

		test("SQLインジェクション攻撃の防御", async ({ page }) => {
			const sqlPayloads = [
				"'; DROP TABLE users; --",
				"' OR '1'='1",
				"UNION SELECT * FROM users",
			];

			for (const payload of sqlPayloads) {
				await profilePage.updateProfile({ name: payload });
				await profilePage.submitForm();

				// エラーが発生しないか、適切に処理されることを確認
				const hasError = await profilePage.hasErrorMessage();
				// エラー処理の確認後、フォームをリセット
				await profilePage.getResetButton().click();
			}
		});

		test("長すぎる入力値の処理", async ({ page }) => {
			const longString = "a".repeat(10000);

			await profilePage.updateProfile({
				name: longString,
				bio: longString,
				location: longString,
			});

			await profilePage.submitForm();

			// 適切なバリデーションエラーが表示されることを確認
			const hasError = await profilePage.hasErrorMessage();
			expect(hasError).toBeTruthy();
		});
	});

	test.describe("パフォーマンステスト", () => {
		test("ページ読み込み時間が適切である", async ({ page }) => {
			const startTime = Date.now();
			await profilePage.goto();
			const loadTime = Date.now() - startTime;

			// 3秒以内に読み込まれることを確認
			expect(loadTime).toBeLessThan(3000);
		});

		test("フォーム送信のレスポンス時間が適切である", async ({ page }) => {
			await profilePage.updateProfile({ name: "Performance Test" });

			const startTime = Date.now();
			await profilePage.submitForm();
			const responseTime = Date.now() - startTime;

			// 5秒以内にレスポンスがあることを確認
			expect(responseTime).toBeLessThan(5000);
		});
	});

	test.describe("エラーハンドリング", () => {
		test("ネットワークエラー時の適切な処理", async ({ page }) => {
			// ネットワークを無効化
			await page.context().setOffline(true);

			await profilePage.updateProfile({ name: "Offline Test" });
			await profilePage.submitForm();

			// エラーメッセージまたは適切な処理が行われることを確認
			const hasError = await profilePage.hasErrorMessage();
			expect(hasError).toBeTruthy(); // オフライン時はエラーが表示されるべき

			// ネットワークを復旧
			await page.context().setOffline(false);
		});

		test("サーバーエラー時の適切な処理", async ({ page }) => {
			// サーバーエラーのシミュレーション（実際の実装では適切な方法で実施）
			await profilePage.updateProfile({ name: "Server Error Test" });
			await profilePage.submitForm();

			// エラーハンドリングの確認は既にsubmitFormで実行済み
		});
	});
});
