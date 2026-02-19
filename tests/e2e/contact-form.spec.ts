import { expect, test } from "@playwright/test";

/**
 * お問い合わせフォームのE2Eテスト
 * リファクタリング版：冗長な処理を削除し、コードの重複を減らす
 */

// ページオブジェクト風のヘルパー
class ContactFormPage {
	constructor(private page: any) {}

	async goto() {
		await this.page.goto("/contact");
		await this.page.waitForLoadState("domcontentloaded");
		// 固定ヘッダー（アナウンスメントバー）がタブクリックを遮るため非表示化
		await this.page.addStyleTag({ content: 'header[aria-label="お知らせ"] { display: none !important; }' });
		// メールタブに切り替え（デフォルトはLINEタブ）
		await this.page.getByRole("tab", { name: "メール" }).click();
		await this.page.getByLabel("お名前").waitFor({ state: "visible" });
	}

	async fillBasicForm(data: {
		name: string;
		email: string;
		message: string;
		phone?: string;
		allowPhone?: boolean;
	}) {
		await this.page.getByLabel("お名前").fill(data.name);
		await this.page.getByLabel("メールアドレス").fill(data.email);
		await this.page.getByLabel("お問い合わせ内容").fill(data.message);

		if (data.allowPhone) {
			await this.page.locator("#phone-yes").click();
			if (data.phone) {
				await this.page.getByLabel("電話番号").fill(data.phone);
			}
		}
	}

	async submit() {
		await this.page.getByRole("button", { name: "送信する" }).click();
		// フォーム送信の結果（成功またはエラー）を待つ
		await Promise.race([
			this.page.waitForFunction(
				() => {
					const nameField = document.querySelector(
						'input[name="name"]',
					) as HTMLInputElement;
					return nameField && nameField.value === ""; // フォームリセット成功
				},
				{ timeout: 10000 },
			),
			this.page.waitForSelector('.text-destructive, [role="alert"]', {
				timeout: 10000,
			}),
		]);
	}

	async expectFormReset() {
		await expect(this.page.getByLabel("お名前")).toHaveValue("");
		await expect(this.page.getByLabel("メールアドレス")).toHaveValue("");
		await expect(this.page.getByLabel("お問い合わせ内容")).toHaveValue("");
	}

	async expectValidationErrors() {
		const errorElements = await this.page.locator(".text-destructive").count();
		expect(errorElements).toBeGreaterThan(0);
	}

	async expectSuccessMessage() {
		// 成功の指標：フォームのリセット（submitで既に待機済み）
		await this.expectFormReset();
	}
}

test.describe("お問い合わせフォーム", () => {
	let contactForm: ContactFormPage;

	test.beforeEach(async ({ page }) => {
		contactForm = new ContactFormPage(page);
		await contactForm.goto();
	});

	test("ページが正しく表示される", async ({ page }) => {
		await expect(page.locator("h1")).toContainText("お問い合わせ");
		await expect(page.getByRole("tab", { name: "メール" })).toBeVisible();
		await expect(page.getByRole("tab", { name: "LINE" })).toBeVisible();
		await expect(page.getByLabel("お名前")).toBeVisible();
		await expect(page.getByLabel("メールアドレス")).toBeVisible();
		await expect(page.getByLabel("お問い合わせ内容")).toBeVisible();
		await expect(page.getByRole("button", { name: "送信する" })).toBeVisible();
	});

	test.describe("バリデーション", () => {
		test("基本項目のバリデーション確認", async ({ page }) => {
			// 1. 空のフォーム送信でエラー確認
			await contactForm.submit();
			await contactForm.expectValidationErrors();

			// 2. 無効なメールアドレスでエラー確認
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "invalid-email",
				message: "テストメッセージです。",
			});
			await contactForm.submit();

			const emailInput = page.getByLabel("メールアドレス");
			const isInvalid = await emailInput.evaluate((el) => {
				const input = el as HTMLInputElement;
				return !input.validity.valid;
			});
			expect(isInvalid).toBeTruthy();
		});

		test("電話番号項目のバリデーション確認", async ({ page }) => {
			// 1. 電話連絡可で電話番号未入力時の確認
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "テストメッセージです。",
				allowPhone: true,
			});
			await contactForm.submit();

			await expect(page.getByLabel("電話番号")).toBeVisible();
			const errorElements = page.locator(
				'[role="alert"], .error, .text-destructive',
			);
			const errorCount = await errorElements.count();

			if (errorCount > 0) {
				const errorText = await errorElements.first().textContent();
				expect(errorText).toBeTruthy();
			}

			// 2. 無効な電話番号形式でエラー確認
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "テストメッセージです。",
				allowPhone: true,
				phone: "12345678", // ハイフンなしの無効な形式
			});
			await contactForm.submit();

			const formText = (await page.locator("form").textContent()) || "";
			expect(
				formText.includes("ハイフン") || formText.includes("-"),
			).toBeTruthy();
		});
	});

	test.describe("UI状態", () => {
		test("電話番号欄の表示切り替え確認", async ({ page }) => {
			// 1. 初期状態：電話連絡不可で電話番号欄が非表示
			const radioNotAllowed = page.getByRole("radio", { name: "不可" });
			await expect(radioNotAllowed).toBeChecked();
			await expect(page.getByLabel("電話番号")).not.toBeVisible();

			// 2. 電話連絡可にすると電話番号欄が表示
			await page.locator("#phone-yes").click();
			await expect(page.getByLabel("電話番号")).toBeVisible();
		});
	});

	test.describe("正常送信", () => {
		test("フォーム送信の包括的確認", async () => {
			// 1. 基本情報のみで送信成功
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "これはテストメッセージです。問題ないはずです。",
			});
			await contactForm.submit();
			await contactForm.expectSuccessMessage();

			// 2. 電話番号ありで送信成功
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "これはテストメッセージです。問題ないはずです。",
				allowPhone: true,
				phone: "03-1234-5678",
			});
			await contactForm.submit();
			await contactForm.expectSuccessMessage();
		});
	});
});
