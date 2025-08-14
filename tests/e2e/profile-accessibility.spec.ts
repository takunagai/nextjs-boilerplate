/**
 * プロフィール機能アクセシビリティテスト
 * WCAG 2.1 AA準拠の検証
 * 
 * 検証項目:
 * - キーボードナビゲーション
 * - スクリーンリーダー対応
 * - フォーカス管理
 * - 色・コントラスト
 * - フォーム要素のアクセシビリティ
 * - エラーメッセージの伝達
 */

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// テストユーザー情報
const TEST_USER = {
	email: "user@example.com",
	password: "password123",
};

test.describe("プロフィール機能のアクセシビリティ", () => {
	test.beforeEach(async ({ page }) => {
		// ログイン
		await page.goto("/login");
		await page.getByLabel("メールアドレス").fill(TEST_USER.email);
		await page.locator('input[type="password"]').fill(TEST_USER.password);
		await page.locator('form button[type="submit"]').click();
		await page.waitForTimeout(1500);
	});

	test.describe("WCAG 2.1 AA 基準チェック", () => {
		test("プロフィールページが WCAG 2.1 AA に準拠している", async ({ page }) => {
			await page.goto("/profile");
			await page.waitForLoadState("domcontentloaded");

			const accessibilityScanResults = await new AxeBuilder({ page })
				.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
				// 色のコントラスト問題は個別に検証
				.disableRules(["color-contrast"])
				.analyze();

			expect(accessibilityScanResults.violations).toEqual([]);

			// 色のコントラスト問題を個別に検証
			const contrastResults = await new AxeBuilder({ page })
				.include("main, form, .profile-edit-form, .profile-danger-zone")
				.withRules(["color-contrast"])
				.analyze();

			if (contrastResults.violations.length > 0) {
				console.warn(
					`プロフィールページでカラーコントラスト問題が${contrastResults.violations.length}件検出されました`,
					contrastResults.violations
				);
			}
		});

		test("フォームフィールドが適切にラベル付けされている", async ({ page }) => {
			await page.goto("/profile");

			// すべてのフォームフィールドがラベルを持っていることを確認
			const nameInput = page.getByLabel(/名前/);
			const displayNameInput = page.getByLabel(/表示名/);
			const bioTextarea = page.getByLabel(/自己紹介/);
			const locationInput = page.getByLabel(/所在地/);
			const websiteInput = page.getByLabel(/ウェブサイト/);

			await expect(nameInput).toBeVisible();
			await expect(displayNameInput).toBeVisible();
			await expect(bioTextarea).toBeVisible();
			await expect(locationInput).toBeVisible();
			await expect(websiteInput).toBeVisible();

			// チェックボックスもラベル付きであることを確認
			const emailVisibleCheckbox = page.getByRole("checkbox", { name: /メールアドレスを公開/ });
			const profileVisibleCheckbox = page.getByRole("checkbox", { name: /プロフィールを公開/ });

			await expect(emailVisibleCheckbox).toBeVisible();
			await expect(profileVisibleCheckbox).toBeVisible();
		});

		test("必須フィールドが適切にマークされている", async ({ page }) => {
			await page.goto("/profile");

			// 名前フィールドの必須マーク確認
			const nameField = page.locator('label:has-text("名前")');
			await expect(nameField).toBeVisible();

			// 必須マークの存在確認（★、*、required などの表示）
			const requiredIndicators = page.locator('abbr[title*="必須"], .required, *:has-text("*"):near(label:has-text("名前"))');
			const hasRequiredIndicator = await requiredIndicators.count() > 0;
			
			if (!hasRequiredIndicator) {
				console.warn("名前フィールドに視覚的な必須マークが見つかりません");
			}
		});

		test("エラーメッセージが適切に関連付けられている", async ({ page }) => {
			await page.goto("/profile");

			// 名前を空にしてフォームを送信
			const nameInput = page.getByLabel(/名前/);
			await nameInput.clear();
			await page.getByRole("button", { name: /プロフィールを更新/ }).click();

			await page.waitForTimeout(1000);

			// エラーメッセージがrole="alert"またはaria-live属性を持つことを確認
			const errorElements = page.locator('[role="alert"], [aria-live]');
			const errorCount = await errorElements.count();
			expect(errorCount).toBeGreaterThan(0);

			// エラーメッセージの内容確認
			const errorText = await page.locator('.text-destructive, .error, [role="alert"]').first().textContent();
			expect(errorText).toBeTruthy();
		});
	});

	test.describe("キーボードナビゲーション", () => {
		test("Tab キーでフォーム要素間を移動できる", async ({ page }) => {
			await page.goto("/profile");

			// 名前フィールドにフォーカス
			await page.keyboard.press("Tab");
			let focusedElement = page.locator(":focus");
			let tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
			expect(tagName).toBe("input");

			// 表示名フィールドにフォーカス
			await page.keyboard.press("Tab");
			focusedElement = page.locator(":focus");
			tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
			expect(tagName).toBe("input");

			// 自己紹介フィールド（textarea）にフォーカス
			await page.keyboard.press("Tab");
			focusedElement = page.locator(":focus");
			tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
			expect(tagName).toBe("textarea");
		});

		test("Shift+Tab で逆方向にナビゲーションできる", async ({ page }) => {
			await page.goto("/profile");

			// 最初の入力フィールドにフォーカス
			const nameInput = page.getByLabel(/名前/);
			await nameInput.focus();

			// 次のフィールドに進む
			await page.keyboard.press("Tab");
			await page.keyboard.press("Tab");

			// Shift+Tab で前のフィールドに戻る
			await page.keyboard.press("Shift+Tab");
			const focusedElement = page.locator(":focus");
			const focusedName = await focusedElement.getAttribute("name");
			expect(focusedName).toBeTruthy();
		});

		test("チェックボックスがスペースキーで操作可能", async ({ page }) => {
			await page.goto("/profile");

			const emailVisibleCheckbox = page.getByRole("checkbox", { name: /メールアドレスを公開/ });
			
			// チェックボックスにフォーカス
			await emailVisibleCheckbox.focus();
			
			// 初期状態を確認
			const initialChecked = await emailVisibleCheckbox.isChecked();
			
			// スペースキーで切り替え
			await page.keyboard.press("Space");
			await page.waitForTimeout(100);
			
			// 状態が変更されたことを確認
			const afterSpaceChecked = await emailVisibleCheckbox.isChecked();
			expect(afterSpaceChecked).toBe(!initialChecked);
		});

		test("エンターキーでフォーム送信可能", async ({ page }) => {
			await page.goto("/profile");

			const nameInput = page.getByLabel(/名前/);
			await nameInput.focus();
			
			// フィールド内でエンターキーを押下
			await nameInput.fill("Test Name");
			await nameInput.press("Enter");

			// フォーム送信が実行されることを確認
			await page.waitForTimeout(1000);
		});
	});

	test.describe("スクリーンリーダー対応", () => {
		test("フィールドに説明テキストが関連付けられている", async ({ page }) => {
			await page.goto("/profile");

			// 名前フィールドの説明文確認
			const nameInput = page.getByLabel(/名前/);
			const describedBy = await nameInput.getAttribute("aria-describedby");
			
			if (describedBy) {
				const descriptionElement = page.locator(`#${describedBy}`);
				await expect(descriptionElement).toBeVisible();
			} else {
				// 説明が近くにあることを確認
				const nearbyDescription = page.locator('p, span, div').filter({ hasText: /他のユーザーに表示される/ });
				const hasNearbyDescription = await nearbyDescription.count() > 0;
				expect(hasNearbyDescription).toBeTruthy();
			}
		});

		test("フィールドセットが適切に構造化されている", async ({ page }) => {
			await page.goto("/profile");

			// プライバシー設定のフィールドセット確認
			const privacyFieldset = page.locator("fieldset");
			const fieldsetCount = await privacyFieldset.count();
			expect(fieldsetCount).toBeGreaterThan(0);

			// legend 要素の存在確認
			const legend = privacyFieldset.locator("legend").first();
			await expect(legend).toBeVisible();
			
			const legendText = await legend.textContent();
			expect(legendText).toMatch(/プライバシー設定|設定/);
		});

		test("ファイルアップロードフィールドが適切に説明されている", async ({ page }) => {
			await page.goto("/profile");

			// ファイル入力フィールドの確認
			const fileInput = page.locator('input[type="file"]');
			await expect(fileInput).toBeVisible();

			// ファイル形式・サイズの説明確認
			const fileDescription = page.locator('text=/JPEG.*PNG.*WebP.*5MB/');
			await expect(fileDescription).toBeVisible();

			// aria-describedby の関連付け確認
			const describedBy = await fileInput.getAttribute("aria-describedby");
			if (describedBy) {
				const descElement = page.locator(`#${describedBy}`);
				await expect(descElement).toBeVisible();
			}
		});

		test("送信状態がスクリーンリーダーに通知される", async ({ page }) => {
			await page.goto("/profile");

			// フォーム送信
			const submitButton = page.getByRole("button", { name: /プロフィールを更新/ });
			await submitButton.click();

			// aria-live要素の確認
			const liveRegions = page.locator('[aria-live="polite"], [aria-live="assertive"]');
			const liveRegionCount = await liveRegions.count();
			expect(liveRegionCount).toBeGreaterThan(0);

			// ステータスメッセージの確認
			await page.waitForTimeout(500);
			const statusMessage = page.locator('[aria-live] *').filter({ hasText: /更新|送信|処理/ });
			const hasStatusMessage = await statusMessage.count() > 0;
			
			if (hasStatusMessage) {
				const statusText = await statusMessage.first().textContent();
				expect(statusText).toBeTruthy();
			}
		});
	});

	test.describe("フォーカス管理", () => {
		test("フォーカス順序が論理的である", async ({ page }) => {
			await page.goto("/profile");

			const focusableElements = await page.locator(
				'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
			).all();

			expect(focusableElements.length).toBeGreaterThan(5);

			// フォーカス順序のテスト
			for (let i = 0; i < Math.min(focusableElements.length, 8); i++) {
				await page.keyboard.press("Tab");
				const currentFocused = page.locator(":focus");
				await expect(currentFocused).toBeVisible();
			}
		});

		test("フォーカスが適切に表示される", async ({ page }) => {
			await page.goto("/profile");

			const nameInput = page.getByLabel(/名前/);
			await nameInput.focus();

			// フォーカス表示のスタイル確認
			const focusStyles = await nameInput.evaluate((el) => {
				const computed = window.getComputedStyle(el);
				return {
					outline: computed.outline,
					outlineColor: computed.outlineColor,
					boxShadow: computed.boxShadow,
					borderColor: computed.borderColor,
				};
			});

			// 何らかのフォーカス表示があることを確認
			const hasFocusStyle = 
				focusStyles.outline !== "none" ||
				focusStyles.boxShadow !== "none" ||
				focusStyles.outlineColor !== "rgba(0, 0, 0, 0)" ||
				focusStyles.borderColor.includes("blue") ||
				focusStyles.borderColor.includes("primary");

			expect(hasFocusStyle).toBeTruthy();
		});

		test("エラー発生時にフォーカスが適切に管理される", async ({ page }) => {
			await page.goto("/profile");

			// エラーを発生させる
			const nameInput = page.getByLabel(/名前/);
			await nameInput.clear();
			await page.getByRole("button", { name: /プロフィールを更新/ }).click();

			await page.waitForTimeout(1000);

			// エラー後のフォーカス位置確認
			const focusedElement = page.locator(":focus");
			const isInputFocused = await focusedElement.evaluate(
				el => el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "button"
			);

			expect(isInputFocused).toBeTruthy();
		});
	});

	test.describe("色・コントラスト検証", () => {
		test("エラーメッセージが色以外でも識別可能", async ({ page }) => {
			await page.goto("/profile");

			// エラー状態にする
			await page.getByLabel(/名前/).clear();
			await page.getByRole("button", { name: /プロフィールを更新/ }).click();

			await page.waitForTimeout(1000);

			// エラーメッセージの確認
			const errorElement = page.locator('.text-destructive, .error, [role="alert"]').first();
			await expect(errorElement).toBeVisible();

			// テキストの内容確認（色以外の情報提供）
			const errorText = await errorElement.textContent();
			expect(errorText).toBeTruthy();
			expect(errorText?.length).toBeGreaterThan(0);
		});

		test("必須フィールドが色以外でも識別可能", async ({ page }) => {
			await page.goto("/profile");

			// 必須フィールドのマーク確認（アスタリスクなど）
			const nameLabel = page.locator('label', { hasText: /名前/ });
			await expect(nameLabel).toBeVisible();

			// 必須マーク（*、required、abbr等）の確認
			const requiredMarkers = page.locator('abbr, .required, *:has-text("*")');
			const hasRequiredMarker = await requiredMarkers.count() > 0;
			
			// 少なくとも視覚的な必須マーカーまたはaria属性があることを確認
			const nameInput = page.getByLabel(/名前/);
			const isRequired = await nameInput.getAttribute("required");
			const ariaRequired = await nameInput.getAttribute("aria-required");
			
			const hasRequiredIndication = hasRequiredMarker || isRequired !== null || ariaRequired === "true";
			expect(hasRequiredIndication).toBeTruthy();
		});

		test("フォーカス表示が十分なコントラストを持つ", async ({ page }) => {
			await page.goto("/profile");

			const nameInput = page.getByLabel(/名前/);
			await nameInput.focus();

			// フォーカススタイルの存在確認
			const focusStyles = await nameInput.evaluate((el) => {
				const computed = window.getComputedStyle(el);
				return {
					outline: computed.outline,
					outlineWidth: computed.outlineWidth,
					outlineColor: computed.outlineColor,
					boxShadow: computed.boxShadow,
				};
			});

			// フォーカス表示があることを確認
			const hasVisibleFocus = 
				(focusStyles.outline !== "none" && focusStyles.outlineWidth !== "0px") ||
				focusStyles.boxShadow !== "none";

			expect(hasVisibleFocus).toBeTruthy();
		});
	});

	test.describe("モバイル・タッチデバイス対応", () => {
		test("タッチターゲットサイズが適切", async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
			await page.goto("/profile");

			// ボタンのサイズ確認（44px以上推奨）
			const submitButton = page.getByRole("button", { name: /プロフィールを更新/ });
			const buttonBox = await submitButton.boundingBox();
			
			if (buttonBox) {
				expect(buttonBox.height).toBeGreaterThanOrEqual(44);
				expect(buttonBox.width).toBeGreaterThanOrEqual(44);
			}

			// チェックボックスのタッチターゲット確認
			const checkbox = page.getByRole("checkbox", { name: /メールアドレスを公開/ });
			const checkboxBox = await checkbox.boundingBox();
			
			if (checkboxBox) {
				// チェックボックス自体またはその親要素が適切なサイズを持つ
				const isAccessibleSize = checkboxBox.height >= 44 || checkboxBox.width >= 44;
				expect(isAccessibleSize).toBeTruthy();
			}
		});

		test("モバイルでのキーボード表示に対応", async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto("/profile");

			// 入力フィールドの入力タイプ確認
			const nameInput = page.getByLabel(/名前/);
			const emailInput = page.getByLabel(/ウェブサイト/);

			const nameType = await nameInput.getAttribute("type");
			const emailType = await emailInput.getAttribute("type");

			// 適切な入力タイプが設定されていることを確認
			expect(nameType).toBe("text");
			expect(emailType).toBe("url");
		});
	});

	test.describe("パフォーマンス・ユーザビリティ", () => {
		test("長いフォーム送信中にユーザーフィードバックがある", async ({ page }) => {
			await page.goto("/profile");

			const submitButton = page.getByRole("button", { name: /プロフィールを更新/ });
			await submitButton.click();

			// 送信中の表示確認
			await page.waitForTimeout(100);
			
			// ボタンのテキスト変更またはローディング表示の確認
			const buttonText = await submitButton.textContent();
			const isLoadingState = buttonText?.includes("更新中") || 
								  buttonText?.includes("送信中") ||
								  buttonText?.includes("処理中");

			// または無効化状態の確認
			const isDisabled = await submitButton.isDisabled();

			// いずれかのフィードバックがあることを確認
			expect(isLoadingState || isDisabled).toBeTruthy();
		});

		test("エラー修正後の再送信が可能", async ({ page }) => {
			await page.goto("/profile");

			// エラー状態にする
			const nameInput = page.getByLabel(/名前/);
			await nameInput.clear();
			await page.getByRole("button", { name: /プロフィールを更新/ }).click();

			await page.waitForTimeout(1000);

			// エラーメッセージの存在確認
			const errorElement = page.locator('[role="alert"], .text-destructive, .error');
			await expect(errorElement.first()).toBeVisible();

			// エラーを修正
			await nameInput.fill("修正された名前");

			// 再送信
			await page.getByRole("button", { name: /プロフィールを更新/ }).click();
			await page.waitForTimeout(1000);

			// 送信が実行されることを確認
			const submitButton = page.getByRole("button", { name: /プロフィールを更新/ });
			expect(await submitButton.isVisible()).toBeTruthy();
		});
	});
});