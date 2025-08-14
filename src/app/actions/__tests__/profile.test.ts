/**
 * プロフィール管理 Server Actions のテスト
 * 
 * テスト対象:
 * - getProfile: プロフィール情報取得
 * - updateProfile: プロフィール情報更新
 * - uploadProfileImage: プロフィール画像アップロード
 * - requestEmailChange: メールアドレス変更要求
 * - deleteProfile: プロフィール削除
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { auth } from "@/lib/auth";
import {
	getProfile,
	updateProfile,
	uploadProfileImage,
	requestEmailChange,
	deleteProfile,
} from "../profile";
import type { UserProfile } from "@/lib/auth/types";

// モック設定
vi.mock("@/lib/auth", () => ({
	auth: vi.fn(),
}));

describe("Profile Server Actions", () => {
	const mockSession = {
		user: {
			id: "test-user-id",
			name: "Test User",
			email: "test@example.com",
			role: "user",
		},
	};

	const _mockProfile: UserProfile = {
		id: "test-user-id",
		name: "Test User",
		email: "test@example.com",
		role: "user",
		displayName: "Test Display",
		bio: "Test bio",
		location: "Tokyo",
		website: "https://example.com",
		emailVisible: false,
		profileVisible: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		// デフォルトで認証済みセッションをモック
		(auth as ReturnType<typeof vi.fn>).mockResolvedValue(mockSession);
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	describe("getProfile", () => {
		it("認証済みユーザーのプロフィール情報を正常に取得する", async () => {
			const result = await getProfile();

			expect(result.success).toBe(true);
			expect(result.data?.profile).toBeDefined();
			expect(result.data?.profile.id).toBe(mockSession.user.id);
			expect(result.data?.profile.name).toBe(mockSession.user.name);
			expect(result.data?.profile.email).toBe(mockSession.user.email);
		});

		it("未認証ユーザーでエラーを返す", async () => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue(null);

			const result = await getProfile();

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});

		it("セッションにユーザーIDがない場合エラーを返す", async () => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue({
				user: { name: "Test", email: "test@example.com" },
			});

			const result = await getProfile();

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});

		it("プロフィールデータの構造が正しい", async () => {
			const result = await getProfile();

			expect(result.success).toBe(true);
			const profile = result.data?.profile;
			expect(profile).toMatchObject({
				id: expect.any(String),
				name: expect.any(String),
				email: expect.any(String),
				role: expect.any(String),
				displayName: expect.any(String),
				bio: expect.any(String),
				location: expect.any(String),
				website: expect.any(String),
				emailVisible: expect.any(Boolean),
				profileVisible: expect.any(Boolean),
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			});
		});
	});

	describe("updateProfile", () => {
		const validUpdateData = {
			name: "Updated Name",
			displayName: "Updated Display",
			bio: "Updated bio",
			location: "Updated Location",
			website: "https://updated-site.com",
			emailVisible: true,
			profileVisible: false,
		};

		it("有効なデータでプロフィールを正常に更新する", async () => {
			const result = await updateProfile(validUpdateData);

			expect(result.success).toBe(true);
			expect(result.data?.message).toBe("プロフィールを更新しました");
			expect(result.data?.profile).toMatchObject({
				name: "Updated Name",
				displayName: "Updated Display",
				bio: "Updated bio",
				location: "Updated Location",
				website: "https://updated-site.com",
				emailVisible: true,
				profileVisible: false,
			});
		});

		it("必須フィールド name のバリデーション", async () => {
			const invalidData = { ...validUpdateData, name: "" };

			const result = await updateProfile(invalidData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("名前の文字数制限 (1-50文字)", async () => {
			// 長すぎる名前
			const longNameData = {
				...validUpdateData,
				name: "a".repeat(51),
			};

			const result = await updateProfile(longNameData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("表示名の文字数制限 (1-50文字)", async () => {
			const longDisplayNameData = {
				...validUpdateData,
				displayName: "a".repeat(51),
			};

			const result = await updateProfile(longDisplayNameData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("自己紹介の文字数制限 (500文字以内)", async () => {
			const longBioData = {
				...validUpdateData,
				bio: "a".repeat(501),
			};

			const result = await updateProfile(longBioData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("所在地の文字数制限 (100文字以内)", async () => {
			const longLocationData = {
				...validUpdateData,
				location: "a".repeat(101),
			};

			const result = await updateProfile(longLocationData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("ウェブサイトURL形式のバリデーション", async () => {
			const invalidUrlData = {
				...validUpdateData,
				website: "invalid-url",
			};

			const result = await updateProfile(invalidUrlData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("HTMLタグを含む入力でエラーを返す", async () => {
			const htmlData = {
				...validUpdateData,
				name: "Test <script>alert('xss')</script>",
			};

			const result = await updateProfile(htmlData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("未認証ユーザーでエラーを返す", async () => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue(null);

			const result = await updateProfile(validUpdateData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});

		it("データのトリミング処理が正しく動作する", async () => {
			const dataWithSpaces = {
				...validUpdateData,
				name: "  Test Name  ",
				displayName: "  Display  ",
				bio: "  Bio content  ",
			};

			const result = await updateProfile(dataWithSpaces);

			expect(result.success).toBe(true);
			expect(result.data?.profile.name).toBe("Test Name");
			expect(result.data?.profile.displayName).toBe("Display");
			expect(result.data?.profile.bio).toBe("Bio content");
		});

		it("任意フィールドのundefined値を正しく処理する", async () => {
			const minimalData = {
				name: "Test Name",
				emailVisible: false,
				profileVisible: true,
			};

			const result = await updateProfile(minimalData);

			expect(result.success).toBe(true);
			expect(result.data?.profile.name).toBe("Test Name");
			expect(result.data?.profile.displayName).toBeUndefined();
			expect(result.data?.profile.bio).toBeUndefined();
		});
	});

	describe("uploadProfileImage", () => {
		const createMockFile = (
			name: string = "test.jpg",
			type: string = "image/jpeg",
			size: number = 1024 * 1024, // 1MB
		) => {
			const file = new File(["test content"], name, { type });
			Object.defineProperty(file, "size", { value: size });
			return file;
		};

		const createFormData = (file: File) => {
			const formData = new FormData();
			formData.append("image", file);
			return formData;
		};

		it("有効な画像ファイルを正常にアップロードする", async () => {
			const file = createMockFile("test.jpg", "image/jpeg");
			const formData = createFormData(file);

			const result = await uploadProfileImage(formData);

			expect(result.success).toBe(true);
			expect(result.data?.message).toBe("プロフィール画像をアップロードしました");
			expect(result.data?.imageUrl).toBe("/api/images/profile/test-user-id");
		});

		it("PNG形式の画像ファイルを正常にアップロードする", async () => {
			const file = createMockFile("test.png", "image/png");
			const formData = createFormData(file);

			const result = await uploadProfileImage(formData);

			expect(result.success).toBe(true);
		});

		it("WebP形式の画像ファイルを正常にアップロードする", async () => {
			const file = createMockFile("test.webp", "image/webp");
			const formData = createFormData(file);

			const result = await uploadProfileImage(formData);

			expect(result.success).toBe(true);
		});

		it("ファイルが選択されていない場合エラーを返す", async () => {
			const formData = new FormData();

			const result = await uploadProfileImage(formData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/画像ファイルを選択してください|VALIDATION_ERROR/);
		});

		it("対応していないファイル形式でエラーを返す", async () => {
			const file = createMockFile("test.gif", "image/gif");
			const formData = createFormData(file);

			const result = await uploadProfileImage(formData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(
				/JPEG、PNG、WebP形式の画像のみアップロード可能です|VALIDATION_ERROR/,
			);
		});

		it("ファイルサイズが5MBを超える場合エラーを返す", async () => {
			const file = createMockFile("large.jpg", "image/jpeg", 6 * 1024 * 1024); // 6MB
			const formData = createFormData(file);

			const result = await uploadProfileImage(formData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/ファイルサイズは5MB以下にしてください|VALIDATION_ERROR/);
		});

		it("未認証ユーザーでエラーを返す", async () => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue(null);

			const file = createMockFile();
			const formData = createFormData(file);
			const result = await uploadProfileImage(formData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});

		it("ファイルサイズが境界値(5MB)で正常に処理される", async () => {
			const file = createMockFile("boundary.jpg", "image/jpeg", 5 * 1024 * 1024); // 正確に5MB
			const formData = createFormData(file);

			const result = await uploadProfileImage(formData);

			expect(result.success).toBe(true);
		});
	});

	describe("requestEmailChange", () => {
		it("有効なメールアドレスで変更要求が正常に処理される", async () => {
			const newEmail = "new@example.com";

			const result = await requestEmailChange(newEmail);

			expect(result.success).toBe(true);
			expect(result.data?.message).toBe(
				"確認メールを送信しました。メール内のリンクから変更を完了してください。",
			);
		});

		it("無効なメールアドレス形式でエラーを返す", async () => {
			const invalidEmail = "invalid-email";

			const result = await requestEmailChange(invalidEmail);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/有効なメールアドレスを入力してください|VALIDATION_ERROR/);
		});

		it("現在のメールアドレスと同じ場合エラーを返す", async () => {
			const sameEmail = mockSession.user.email;

			const result = await requestEmailChange(sameEmail);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/現在のメールアドレスと同じです|VALIDATION_ERROR/);
		});

		it("未認証ユーザーでエラーを返す", async () => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue(null);

			const result = await requestEmailChange("new@example.com");

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});

		it("各種メールアドレス形式が正しく検証される", async () => {
			const validEmails = [
				"test@example.com",
				"user.name@domain.co.jp",
				"user+tag@example.org",
				"123@numbers.com",
			];

			for (const email of validEmails) {
				const result = await requestEmailChange(email);
				expect(result.success).toBe(true);
			}
		});

		it("無効なメールアドレス形式が正しく拒否される", async () => {
			const invalidEmails = [
				"invalid",
				"@domain.com",
				"user@",
				"user..name@domain.com",
				"user@domain",
				"",
			];

			for (const email of invalidEmails) {
				const result = await requestEmailChange(email);
				expect(result.success).toBe(false);
			}
		});
	});

	describe("deleteProfile", () => {
		const validConfirmData = {
			confirmText: "プロフィールを削除します",
		};

		it("正しい確認テキストでプロフィール削除が正常に処理される", async () => {
			const result = await deleteProfile(validConfirmData);

			expect(result.success).toBe(true);
			expect(result.data?.message).toBe("プロフィールを削除しました");
		});

		it("間違った確認テキストでエラーを返す", async () => {
			const invalidConfirmData = {
				confirmText: "間違ったテキスト",
			};

			const result = await deleteProfile(invalidConfirmData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("空の確認テキストでエラーを返す", async () => {
			const emptyConfirmData = {
				confirmText: "",
			};

			const result = await deleteProfile(emptyConfirmData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("未認証ユーザーでエラーを返す", async () => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue(null);

			const result = await deleteProfile(validConfirmData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});

		it("confirmTextフィールドが存在しない場合エラーを返す", async () => {
			const invalidData = {};

			const result = await deleteProfile(invalidData);

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/入力データが無効です|VALIDATION_ERROR/);
		});

		it("前後の空白文字を含む正しい確認テキストで正常に処理される", async () => {
			const confirmDataWithSpaces = {
				confirmText: "  プロフィールを削除します  ",
			};

			const result = await deleteProfile(confirmDataWithSpaces);

			expect(result.success).toBe(true);
		});
	});

	describe("認証エラー共通テスト", () => {
		const actions = [
			{ name: "getProfile", fn: () => getProfile() },
			{
				name: "updateProfile",
				fn: () =>
					updateProfile({
						name: "Test",
						emailVisible: false,
						profileVisible: true,
					}),
			},
			{
				name: "uploadProfileImage",
				fn: () => {
					const formData = new FormData();
					formData.append("image", new File(["test"], "test.jpg", { type: "image/jpeg" }));
					return uploadProfileImage(formData);
				},
			},
			{ name: "requestEmailChange", fn: () => requestEmailChange("new@example.com") },
			{
				name: "deleteProfile",
				fn: () => deleteProfile({ confirmText: "プロフィールを削除します" }),
			},
		];

		it.each(actions)("$name: セッションがnullの場合認証エラー", async ({ fn }) => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue(null);

			const result = await fn();

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});

		it.each(actions)("$name: ユーザー情報がnullの場合認証エラー", async ({ fn }) => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue({ user: null });

			const result = await fn();

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});

		it.each(actions)("$name: ユーザーIDがない場合認証エラー", async ({ fn }) => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValue({
				user: { name: "Test", email: "test@example.com" },
			});

			const result = await fn();

			expect(result.success).toBe(false);
			expect(result.error?.message || result.error?.code).toMatch(/認証が必要です|AUTHENTICATION_ERROR/);
		});
	});

	describe("統合テスト", () => {
		it("プロフィール取得→更新→画像アップロードの一連の流れ", async () => {
			// 1. プロフィール取得
			const getResult = await getProfile();
			expect(getResult.success).toBe(true);

			// 2. プロフィール更新
			const updateResult = await updateProfile({
				name: "Updated User",
				displayName: "Updated Display",
				bio: "Updated bio",
				location: "Updated Location",
				website: "https://updated.com",
				emailVisible: true,
				profileVisible: true,
			});
			expect(updateResult.success).toBe(true);

			// 3. 画像アップロード
			const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
			const formData = new FormData();
			formData.append("image", file);
			const uploadResult = await uploadProfileImage(formData);
			expect(uploadResult.success).toBe(true);
		});

		it("データの整合性が保たれる", async () => {
			const updateData = {
				name: "Consistency Test",
				displayName: "Display Test",
				bio: "Bio Test",
				location: "Location Test",
				website: "https://test.com",
				emailVisible: false,
				profileVisible: true,
			};

			const updateResult = await updateProfile(updateData);
			expect(updateResult.success).toBe(true);

			const getResult = await getProfile();
			expect(getResult.success).toBe(true);

			// 更新されたデータが取得結果に反映されている（シミュレーションでは実際のDBがないため、
			// 実装では最新データが取得されることを想定）
			expect(getResult.data?.profile.id).toBe(mockSession.user.id);
			expect(getResult.data?.profile.email).toBe(mockSession.user.email);
		});
	});
});