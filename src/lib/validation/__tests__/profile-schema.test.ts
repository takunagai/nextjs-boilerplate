/**
 * プロフィールバリデーションスキーマのテスト
 * 
 * テスト対象:
 * - profileUpdateSchema: プロフィール更新データのバリデーション
 * - profileDeleteConfirmSchema: プロフィール削除確認のバリデーション
 * - 各フィールドの個別バリデーション
 * - XSS対策のHTMLタグ検証
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
	profileUpdateSchema,
	profileDeleteConfirmSchema,
	type ProfileUpdateFormValues,
	type ProfileDeleteConfirmValues,
} from "../profile-schema";

describe("Profile Validation Schemas", () => {
	describe("profileUpdateSchema", () => {
		const validData: ProfileUpdateFormValues = {
			name: "Test User",
			displayName: "Test Display",
			bio: "This is a test bio",
			location: "Tokyo, Japan",
			website: "https://example.com",
			emailVisible: false,
			profileVisible: true,
		};

		describe("name フィールド", () => {
			it("有効な名前で成功する", () => {
				const result = profileUpdateSchema.safeParse(validData);
				expect(result.success).toBe(true);
			});

			it("必須フィールドのため空文字でエラー", () => {
				const data = { ...validData, name: "" };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("名前は必須です");
				}
			});

			it("50文字以内で成功する", () => {
				const data = { ...validData, name: "a".repeat(50) };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("51文字以上でエラー", () => {
				const data = { ...validData, name: "a".repeat(51) };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("名前は50文字以内で入力してください");
				}
			});

			it("HTMLタグを含む場合エラー", () => {
				const data = { ...validData, name: "Test <script>alert('xss')</script>" };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("HTMLタグを含めることはできません");
				}
			});

			it("様々なHTMLタグでエラー", () => {
				const htmlTags = [
					"<div>test</div>",
					"<span>test</span>",
					"<img src='x'>",
					"<a href='#'>test</a>",
					"<script>alert('xss')</script>",
					"<iframe src='evil.com'></iframe>",
				];

				for (const htmlContent of htmlTags) {
					const data = { ...validData, name: htmlContent };
					const result = profileUpdateSchema.safeParse(data);
					expect(result.success).toBe(false);
				}
			});

			it("不完全なHTMLタグでもエラー", () => {
				const data = { ...validData, name: "Test <incomplete" };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("HTMLタグを含めることはできません");
				}
			});
		});

		describe("displayName フィールド", () => {
			it("有効な表示名で成功する", () => {
				const result = profileUpdateSchema.safeParse(validData);
				expect(result.success).toBe(true);
			});

			it("undefinedで成功する（任意フィールド）", () => {
				const data = { ...validData, displayName: undefined };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("空文字列で成功する", () => {
				const data = { ...validData, displayName: "" };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("50文字以内で成功する", () => {
				const data = { ...validData, displayName: "a".repeat(50) };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("51文字以上でエラー", () => {
				const data = { ...validData, displayName: "a".repeat(51) };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("表示名は50文字以内で入力してください");
				}
			});

			it("HTMLタグを含む場合エラー", () => {
				const data = { ...validData, displayName: "Display <b>bold</b>" };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("HTMLタグを含めることはできません");
				}
			});
		});

		describe("bio フィールド", () => {
			it("有効な自己紹介で成功する", () => {
				const result = profileUpdateSchema.safeParse(validData);
				expect(result.success).toBe(true);
			});

			it("undefinedで成功する（任意フィールド）", () => {
				const data = { ...validData, bio: undefined };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("空文字列で成功する", () => {
				const data = { ...validData, bio: "" };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("500文字以内で成功する", () => {
				const data = { ...validData, bio: "a".repeat(500) };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("501文字以上でエラー", () => {
				const data = { ...validData, bio: "a".repeat(501) };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("自己紹介は500文字以内で入力してください");
				}
			});

			it("改行文字を含む長文で成功する", () => {
				const longBioWithNewlines = "This is a bio.\n\nIt contains multiple lines.\n\nAnd it's still valid.".repeat(5);
				if (longBioWithNewlines.length <= 500) {
					const data = { ...validData, bio: longBioWithNewlines };
					const result = profileUpdateSchema.safeParse(data);
					expect(result.success).toBe(true);
				}
			});

			it("HTMLタグを含む場合エラー", () => {
				const data = { ...validData, bio: "Bio with <p>paragraph</p> tags" };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("HTMLタグを含めることはできません");
				}
			});
		});

		describe("location フィールド", () => {
			it("有効な所在地で成功する", () => {
				const result = profileUpdateSchema.safeParse(validData);
				expect(result.success).toBe(true);
			});

			it("undefinedで成功する（任意フィールド）", () => {
				const data = { ...validData, location: undefined };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("空文字列で成功する", () => {
				const data = { ...validData, location: "" };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("100文字以内で成功する", () => {
				const data = { ...validData, location: "a".repeat(100) };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("101文字以上でエラー", () => {
				const data = { ...validData, location: "a".repeat(101) };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("所在地は100文字以内で入力してください");
				}
			});

			it("日本語の住所で成功する", () => {
				const data = { ...validData, location: "東京都渋谷区神南1-1-1" };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("HTMLタグを含む場合エラー", () => {
				const data = { ...validData, location: "Tokyo <span>Japan</span>" };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("HTMLタグを含めることはできません");
				}
			});
		});

		describe("website フィールド", () => {
			it("有効なHTTPSのURLで成功する", () => {
				const data = { ...validData, website: "https://example.com" };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("有効なHTTPのURLで成功する", () => {
				const data = { ...validData, website: "http://example.com" };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("undefinedで成功する（任意フィールド）", () => {
				const data = { ...validData, website: undefined };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("空文字列で成功する", () => {
				const data = { ...validData, website: "" };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("様々な有効なURLで成功する", () => {
				const validUrls = [
					"https://www.example.com",
					"http://localhost:3000",
					"https://subdomain.example.co.jp",
					"https://example.com/path/to/page",
					"https://example.com?query=param",
					"https://example.com#anchor",
					"https://user:pass@example.com",
					"https://example.com:8080",
				];

				for (const url of validUrls) {
					const data = { ...validData, website: url };
					const result = profileUpdateSchema.safeParse(data);
					expect(result.success).toBe(true);
				}
			});

			it("無効なURLでエラー", () => {
				const invalidUrls = [
					"invalid-url",
					"ftp://example.com",
					"javascript:alert('xss')",
					"data:text/html,<script>alert('xss')</script>",
					"mailto:test@example.com",
					"//example.com",
					"example.com",
					"www.example.com",
				];

				for (const url of invalidUrls) {
					const data = { ...validData, website: url };
					const result = profileUpdateSchema.safeParse(data);
					expect(result.success).toBe(false);
				}
			});

			it("URLが長すぎる場合エラー", () => {
				const longUrl = "https://" + "a".repeat(2040) + ".com";
				const data = { ...validData, website: longUrl };
				const result = profileUpdateSchema.safeParse(data);
				
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors[0].message).toBe("URLは2048文字以内で入力してください");
				}
			});
		});

		describe("emailVisible と profileVisible フィールド", () => {
			it("boolean値で成功する", () => {
				const data = { ...validData, emailVisible: true, profileVisible: false };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
			});

			it("デフォルト値が設定される", () => {
				const data = {
					name: "Test",
					// emailVisible と profileVisible を省略
				};
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.emailVisible).toBe(false);
					expect(result.data.profileVisible).toBe(true);
				}
			});

			it("文字列のboolean値は受け入れない", () => {
				const data = { ...validData, emailVisible: "true" as any };
				const result = profileUpdateSchema.safeParse(data);
				expect(result.success).toBe(false);
			});
		});

		describe("複数フィールドエラー", () => {
			it("複数のフィールドでエラーが発生した場合すべてのエラーを返す", () => {
				const invalidData = {
					name: "", // 必須エラー
					displayName: "a".repeat(51), // 長さエラー
					bio: "a".repeat(501), // 長さエラー
					location: "a".repeat(101), // 長さエラー
					website: "invalid-url", // URL形式エラー
					emailVisible: false,
					profileVisible: true,
				};

				const result = profileUpdateSchema.safeParse(invalidData);
				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.errors).toHaveLength(5);
				}
			});
		});

		describe("境界値テスト", () => {
			it("各フィールドの最大長で成功する", () => {
				const boundaryData = {
					name: "a".repeat(50),
					displayName: "a".repeat(50),
					bio: "a".repeat(500),
					location: "a".repeat(100),
					website: "https://" + "a".repeat(2040) + ".com", // 2048文字
					emailVisible: false,
					profileVisible: true,
				};

				const result = profileUpdateSchema.safeParse(boundaryData);
				expect(result.success).toBe(true);
			});

			it("各フィールドの最小長で成功する", () => {
				const minimalData = {
					name: "a", // 1文字
					displayName: "", // 空文字
					bio: "", // 空文字
					location: "", // 空文字
					website: "", // 空文字
					emailVisible: false,
					profileVisible: true,
				};

				const result = profileUpdateSchema.safeParse(minimalData);
				expect(result.success).toBe(true);
			});
		});
	});

	describe("profileDeleteConfirmSchema", () => {
		const validConfirmData: ProfileDeleteConfirmValues = {
			confirmText: "プロフィールを削除します",
		};

		it("正しい確認テキストで成功する", () => {
			const result = profileDeleteConfirmSchema.safeParse(validConfirmData);
			expect(result.success).toBe(true);
		});

		it("間違った確認テキストでエラー", () => {
			const data = { confirmText: "間違ったテキスト" };
			const result = profileDeleteConfirmSchema.safeParse(data);
			
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					"正確な確認テキストを入力してください: 'プロフィールを削除します'"
				);
			}
		});

		it("空文字でエラー", () => {
			const data = { confirmText: "" };
			const result = profileDeleteConfirmSchema.safeParse(data);
			
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					"正確な確認テキストを入力してください: 'プロフィールを削除します'"
				);
			}
		});

		it("大文字小文字が違う場合エラー", () => {
			const data = { confirmText: "プロフィールを削除します。" }; // 句点が追加
			const result = profileDeleteConfirmSchema.safeParse(data);
			
			expect(result.success).toBe(false);
		});

		it("前後の空白文字があってもエラー", () => {
			const data = { confirmText: " プロフィールを削除します " };
			const result = profileDeleteConfirmSchema.safeParse(data);
			
			expect(result.success).toBe(false);
		});

		it("フィールドが存在しない場合エラー", () => {
			const data = {};
			const result = profileDeleteConfirmSchema.safeParse(data);
			
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].code).toBe("invalid_type");
			}
		});
	});

	describe("スキーマの統合テスト", () => {
		it("プロフィール更新の完全なフローで成功する", () => {
			const completeData: ProfileUpdateFormValues = {
				name: "Complete User",
				displayName: "Complete Display Name",
				bio: "This is a complete bio with some details about the user. It includes multiple sentences and provides good information.",
				location: "Tokyo, Japan",
				website: "https://complete-user.example.com",
				emailVisible: true,
				profileVisible: true,
			};

			const result = profileUpdateSchema.safeParse(completeData);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(completeData);
			}
		});

		it("最小限のデータで成功する", () => {
			const minimalData = {
				name: "User",
				emailVisible: false,
				profileVisible: true,
			};

			const result = profileUpdateSchema.safeParse(minimalData);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.name).toBe("User");
				expect(result.data.emailVisible).toBe(false);
				expect(result.data.profileVisible).toBe(true);
				expect(result.data.displayName).toBeUndefined();
				expect(result.data.bio).toBeUndefined();
				expect(result.data.location).toBeUndefined();
				expect(result.data.website).toBeUndefined();
			}
		});

		it("型推論が正しく動作する", () => {
			const data = {
				name: "Type Test",
				displayName: "Display",
				bio: "Bio",
				location: "Location",
				website: "https://example.com",
				emailVisible: true,
				profileVisible: false,
			};

			const result = profileUpdateSchema.safeParse(data);
			if (result.success) {
				// TypeScriptの型チェックのため
				const typedData: ProfileUpdateFormValues = result.data;
				expect(typeof typedData.name).toBe("string");
				expect(typeof typedData.emailVisible).toBe("boolean");
				expect(typeof typedData.profileVisible).toBe("boolean");
			}
		});
	});
});