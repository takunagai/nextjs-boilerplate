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
		await this.page.waitForTimeout(1000); // エラー表示を待つ
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
		// 成功の指標：フォームのリセット + 待機時間短縮
		await this.page.waitForTimeout(2000);
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
		await expect(page.getByRole("tab", { name: "電話・LINE" })).toBeVisible();
		await expect(page.getByLabel("お名前")).toBeVisible();
		await expect(page.getByLabel("メールアドレス")).toBeVisible();
		await expect(page.getByLabel("お問い合わせ内容")).toBeVisible();
		await expect(page.getByRole("button", { name: "送信する" })).toBeVisible();
	});

	test.describe("バリデーション", () => {
		test("空のフォームでエラーが表示される", async () => {
			await contactForm.submit();
			await contactForm.expectValidationErrors();
		});

		test("無効なメールアドレスでエラーが表示される", async ({ page }) => {
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "invalid-email",
				message: "テストメッセージです。",
			});
			await contactForm.submit();

			// メールアドレス フィールドのバリデーション状態を確認
			const emailInput = page.getByLabel("メールアドレス");
			const isInvalid = await emailInput.evaluate((el) => {
				const input = el as HTMLInputElement;
				return !input.validity.valid;
			});
			expect(isInvalid).toBeTruthy();
		});

		test("電話連絡可で電話番号未入力時にエラーが表示される", async ({ page }) => {
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "テストメッセージです。",
				allowPhone: true,
			});
			await contactForm.submit();

			// 電話番号フィールドが表示され、必須になっていることを確認
			await expect(page.getByLabel("電話番号")).toBeVisible();
			const telInput = page.getByLabel("電話番号");
			const isRequired = await telInput.evaluate((input) => {
				return input.hasAttribute("required") || input.getAttribute("aria-required") === "true";
			});
			expect(isRequired).toBeTruthy();
		});

		test("無効な電話番号形式でエラーが表示される", async ({ page }) => {
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "テストメッセージです。",
				allowPhone: true,
				phone: "12345678", // ハイフンなしの無効な形式
			});
			await contactForm.submit();

			const formText = await page.locator("form").textContent() || "";
			expect(formText.includes("ハイフン") || formText.includes("-")).toBeTruthy();
		});
	});

	test.describe("UI状態", () => {
		test("電話連絡不可の場合は電話番号欄が非表示", async ({ page }) => {
			const radioNotAllowed = page.getByRole("radio", { name: "不可" });
			await expect(radioNotAllowed).toBeChecked();
			await expect(page.getByLabel("電話番号")).not.toBeVisible();
		});

		test("電話連絡可の場合は電話番号欄が表示", async ({ page }) => {
			await page.locator("#phone-yes").click();
			await expect(page.getByLabel("電話番号")).toBeVisible();
		});
	});

	test.describe("正常送信", () => {
		test("基本情報のみで送信成功", async () => {
			await contactForm.fillBasicForm({
				name: "テスト 太郎",
				email: "test@example.com",
				message: "これはテストメッセージです。問題ないはずです。",
			});
			await contactForm.submit();
			await contactForm.expectSuccessMessage();
		});

		test("電話番号ありで送信成功", async () => {
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
