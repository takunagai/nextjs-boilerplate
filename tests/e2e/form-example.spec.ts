import { expect, test } from "@playwright/test";

/**
 * フォームサンプルのE2Eテスト
 * リファクタリング版：PageObjectパターンでコードの重複を削減
 */

// ページオブジェクト風のヘルパー
class FormExamplePage {
	constructor(private page: any) {}

	async goto() {
		await this.page.goto("/examples/form");
	}

	async fillForm(data: {
		name: string;
		email: string;
		message: string;
		age?: string;
		agreeTerms?: boolean;
	}) {
		await this.page.getByLabel("お名前").fill(data.name);
		await this.page.getByLabel("メールアドレス").fill(data.email);
		await this.page.getByLabel("メッセージ").fill(data.message);

		if (data.age) {
			await this.page.getByLabel("年齢（任意）").fill(data.age);
		}

		if (data.agreeTerms) {
			await this.page.locator('button[role="checkbox"]').click();
		}
	}

	async submit() {
		await this.page.getByRole("button", { name: "送信する" }).click();
		await this.page.waitForTimeout(1000);
	}

	async expectValidationErrors() {
		const errorElements = await this.page
			.locator(".text-destructive, [role='alert'], .text-red-500")
			.count();
		expect(errorElements).toBeGreaterThan(0);
	}

	async expectFormReset() {
		// 簡略化した成功確認：フォームリセット状態をチェック
		await this.page.waitForTimeout(2000);
		await expect(this.page.getByLabel("お名前")).toHaveValue("");
		await expect(this.page.getByLabel("メールアドレス")).toHaveValue("");
		await expect(this.page.getByLabel("メッセージ")).toHaveValue("");
	}

	async expectEmailValidationError() {
		const hasEmailError = await this.page
			.getByText(/メールアドレス|有効|形式/)
			.isVisible();
		expect(hasEmailError).toBeTruthy();
	}
}

test.describe("フォームサンプル", () => {
	let formExample: FormExamplePage;

	test.beforeEach(async ({ page }) => {
		formExample = new FormExamplePage(page);
		await formExample.goto();
	});

	test("ページが正しく表示される", async ({ page }) => {
		await expect(
			page.getByRole("heading", { name: "フォームサンプル" }),
		).toBeVisible();
		await expect(page.locator("form")).toBeVisible();
		await expect(page.getByLabel("お名前")).toBeVisible();
		await expect(page.getByLabel("メールアドレス")).toBeVisible();
		await expect(page.getByLabel("メッセージ")).toBeVisible();
		await expect(page.getByText("利用規約に同意します")).toBeVisible();
		await expect(page.getByRole("button", { name: "送信する" })).toBeVisible();
	});

	test.describe("バリデーション", () => {
		test("空のフォームでエラーが表示される", async () => {
			await formExample.submit();
			await formExample.expectValidationErrors();
		});

		test("無効なメールアドレスでエラーが表示される", async () => {
			await formExample.fillForm({
				name: "テスト 太郎",
				email: "invalid-email",
				message: "テストメッセージです。",
				agreeTerms: true,
			});
			await formExample.submit();
			await formExample.expectEmailValidationError();
		});

		test("18歳未満でエラーが表示される", async () => {
			await formExample.fillForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "テストメッセージです。",
				age: "17",
				agreeTerms: true,
			});
			await formExample.submit();
			await formExample.expectValidationErrors();
		});
	});

	test.describe("正常送信", () => {
		test("有効なデータで送信成功", async () => {
			await formExample.fillForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "テストメッセージです。",
				agreeTerms: true,
			});
			await formExample.submit();
			await formExample.expectFormReset();
		});
	});
});
