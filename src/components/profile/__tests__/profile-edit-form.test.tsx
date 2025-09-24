/**
 * ProfileEditForm コンポーネントのテスト
 *
 * テスト対象:
 * - フォームの初期表示
 * - 入力値の変更
 * - バリデーション
 * - フォーム送信
 * - 画像アップロード
 * - エラー表示
 * - アクセシビリティ
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { updateProfile, uploadProfileImage } from "@/app/actions/profile";
import type { UserProfile } from "@/lib/auth/types";
import { ProfileEditForm } from "../profile-edit-form";

// モック設定
vi.mock("@/app/actions/profile", () => ({
	updateProfile: vi.fn(),
	uploadProfileImage: vi.fn(),
}));

// Next.js Imageコンポーネントのモック
vi.mock("next/image", () => ({
	default: ({ src, alt, width, height, className }: any) => (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			data-testid="next-image"
		/>
	),
}));

describe("ProfileEditForm", () => {
	let user: ReturnType<typeof userEvent.setup>;

	const mockProfile: UserProfile = {
		id: "test-user-id",
		name: "Test User",
		email: "test@example.com",
		image: "https://example.com/avatar.jpg",
		role: "user",
		displayName: "Test Display",
		bio: "Test bio content",
		location: "Tokyo, Japan",
		website: "https://test-website.com",
		emailVisible: false,
		profileVisible: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		user = userEvent.setup();

		// デフォルトで成功レスポンスをモック
		(updateProfile as ReturnType<typeof vi.fn>).mockResolvedValue({
			success: true,
			data: {
				message: "プロフィールを更新しました",
				profile: mockProfile,
			},
		});

		(uploadProfileImage as ReturnType<typeof vi.fn>).mockResolvedValue({
			success: true,
			data: {
				message: "プロフィール画像をアップロードしました",
				imageUrl: "https://example.com/new-avatar.jpg",
			},
		});
	});

	describe("初期表示", () => {
		it("初期値が正しく表示される", () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
			expect(screen.getByDisplayValue("Test Display")).toBeInTheDocument();
			expect(screen.getByDisplayValue("Test bio content")).toBeInTheDocument();
			expect(screen.getByDisplayValue("Tokyo, Japan")).toBeInTheDocument();
			expect(
				screen.getByDisplayValue("https://test-website.com"),
			).toBeInTheDocument();
		});

		it("プロフィール画像が表示される", () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const profileImage = screen.getByTestId("next-image");
			expect(profileImage).toBeInTheDocument();
			expect(profileImage).toHaveAttribute(
				"src",
				"https://example.com/avatar.jpg",
			);
			expect(profileImage).toHaveAttribute(
				"alt",
				"Test Userのプロフィール画像",
			);
		});

		it("プロフィール画像がない場合イニシャルを表示", () => {
			const profileWithoutImage = { ...mockProfile, image: null };
			render(<ProfileEditForm initialProfile={profileWithoutImage} />);

			expect(screen.getByText("T")).toBeInTheDocument();
		});

		it("プライバシー設定の初期値が正しく設定される", () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const emailVisibleCheckbox = screen.getByRole("checkbox", {
				name: /メールアドレスを公開/,
			});
			const profileVisibleCheckbox = screen.getByRole("checkbox", {
				name: /プロフィールを公開/,
			});

			expect(emailVisibleCheckbox).not.toBeChecked();
			expect(profileVisibleCheckbox).toBeChecked();
		});

		it("すべてのフォームフィールドが表示される", () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			expect(screen.getByLabelText(/名前/)).toBeInTheDocument();
			expect(screen.getByLabelText(/表示名/)).toBeInTheDocument();
			expect(screen.getByLabelText(/自己紹介/)).toBeInTheDocument();
			expect(screen.getByLabelText(/所在地/)).toBeInTheDocument();
			expect(screen.getByLabelText(/ウェブサイト/)).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /プロフィールを更新/ }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /リセット/ }),
			).toBeInTheDocument();
		});
	});

	describe("フォーム入力", () => {
		it("名前フィールドの入力が正しく動作する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const nameInput = screen.getByLabelText(/名前/);
			await user.clear(nameInput);
			await user.type(nameInput, "Updated Name");

			expect(nameInput).toHaveValue("Updated Name");
		});

		it("表示名フィールドの入力が正しく動作する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const displayNameInput = screen.getByLabelText(/表示名/);
			await user.clear(displayNameInput);
			await user.type(displayNameInput, "Updated Display");

			expect(displayNameInput).toHaveValue("Updated Display");
		});

		it("自己紹介フィールドの入力が正しく動作する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const bioTextarea = screen.getByLabelText(/自己紹介/);
			await user.clear(bioTextarea);
			await user.type(bioTextarea, "Updated bio content");

			expect(bioTextarea).toHaveValue("Updated bio content");
		});

		it("所在地フィールドの入力が正しく動作する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const locationInput = screen.getByLabelText(/所在地/);
			await user.clear(locationInput);
			await user.type(locationInput, "Osaka, Japan");

			expect(locationInput).toHaveValue("Osaka, Japan");
		});

		it("ウェブサイトフィールドの入力が正しく動作する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const websiteInput = screen.getByLabelText(/ウェブサイト/);
			await user.clear(websiteInput);
			await user.type(websiteInput, "https://updated-site.com");

			expect(websiteInput).toHaveValue("https://updated-site.com");
		});

		it("プライバシー設定のチェックボックスが正しく動作する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const emailVisibleCheckbox = screen.getByRole("checkbox", {
				name: /メールアドレスを公開/,
			});
			const profileVisibleCheckbox = screen.getByRole("checkbox", {
				name: /プロフィールを公開/,
			});

			await user.click(emailVisibleCheckbox);
			await user.click(profileVisibleCheckbox);

			expect(emailVisibleCheckbox).toBeChecked();
			expect(profileVisibleCheckbox).not.toBeChecked();
		});
	});

	describe("バリデーション", () => {
		it("名前が空の場合エラーを表示する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const nameInput = screen.getByLabelText(/名前/);
			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});

			await user.clear(nameInput);
			await user.click(submitButton);

			await waitFor(() => {
				expect(screen.getByText("名前は必須です")).toBeInTheDocument();
			});
		});

		it("名前が長すぎる場合エラーを表示する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const nameInput = screen.getByLabelText(/名前/);
			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});

			await user.clear(nameInput);
			await user.type(nameInput, "a".repeat(51));
			await user.click(submitButton);

			await waitFor(() => {
				expect(
					screen.getByText("名前は50文字以内で入力してください"),
				).toBeInTheDocument();
			});
		});

		it.skip("無効なURLでエラーを表示する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const websiteInput = screen.getByRole("textbox", {
				name: "ウェブサイト",
			});
			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});

			await user.clear(websiteInput);
			await user.type(websiteInput, "invalid-url");

			// フィールドからフォーカスを外してバリデーションをトリガー
			await user.tab();

			await user.click(submitButton);

			await waitFor(() => {
				expect(
					screen.getByText(
						"有効なURL（http://またはhttps://で始まる）を入力してください",
					),
				).toBeInTheDocument();
			});
		});

		it("HTMLタグを含む入力でエラーを表示する", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const nameInput = screen.getByLabelText(/名前/);
			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});

			await user.clear(nameInput);
			await user.type(nameInput, "Test <script>alert('xss')</script>");
			await user.click(submitButton);

			await waitFor(() => {
				expect(
					screen.getByText("HTMLタグを含めることはできません"),
				).toBeInTheDocument();
			});
		});
	});

	describe("フォーム送信", () => {
		it("有効なデータで正常に送信される", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const nameInput = screen.getByLabelText(/名前/);
			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});

			await user.clear(nameInput);
			await user.type(nameInput, "Updated Name");
			await user.click(submitButton);

			await waitFor(() => {
				expect(updateProfile).toHaveBeenCalledWith({
					name: "Updated Name",
					displayName: "Test Display",
					bio: "Test bio content",
					location: "Tokyo, Japan",
					website: "https://test-website.com",
					emailVisible: false,
					profileVisible: true,
				});
			});
		});

		it("送信中はボタンが無効になる", async () => {
			// 送信時間を延長するモック
			(updateProfile as ReturnType<typeof vi.fn>).mockImplementation(
				() =>
					new Promise((resolve) =>
						setTimeout(
							() =>
								resolve({
									success: true,
									data: { message: "Success", profile: mockProfile },
								}),
							100,
						),
					),
			);

			render(<ProfileEditForm initialProfile={mockProfile} />);

			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});
			await user.click(submitButton);

			expect(screen.getByRole("button", { name: /更新中/ })).toBeDisabled();

			await waitFor(() => {
				expect(
					screen.getByRole("button", { name: /プロフィールを更新/ }),
				).not.toBeDisabled();
			});
		});

		it("送信エラー時にエラーメッセージを表示する", async () => {
			(updateProfile as ReturnType<typeof vi.fn>).mockResolvedValue({
				success: false,
				error: { message: "更新に失敗しました" },
			});

			render(<ProfileEditForm initialProfile={mockProfile} />);

			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});
			await user.click(submitButton);

			await waitFor(
				() => {
					expect(screen.getByText("更新に失敗しました")).toBeInTheDocument();
				},
				{ timeout: 5000 },
			);
		});
	});

	describe("画像アップロード", () => {
		it("有効な画像ファイルを選択してアップロードできる", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const file = new File(["test content"], "test.jpg", {
				type: "image/jpeg",
			});
			const fileInput = screen.getByLabelText(/画像を選択/);

			await user.upload(fileInput, file);

			await waitFor(() => {
				expect(uploadProfileImage).toHaveBeenCalled();
			});
		});

		it("アップロード中は表示が更新される", async () => {
			// アップロード時間を延長するモック
			(uploadProfileImage as ReturnType<typeof vi.fn>).mockImplementation(
				() =>
					new Promise((resolve) =>
						setTimeout(
							() =>
								resolve({
									success: true,
									data: {
										message: "Success",
										imageUrl: "https://example.com/new.jpg",
									},
								}),
							100,
						),
					),
			);

			render(<ProfileEditForm initialProfile={mockProfile} />);

			const file = new File(["test content"], "test.jpg", {
				type: "image/jpeg",
			});
			const fileInput = screen.getByLabelText(/画像を選択/);

			await user.upload(fileInput, file);

			expect(screen.getByText("アップロード中...")).toBeInTheDocument();

			await waitFor(() => {
				expect(screen.getByText("画像を選択")).toBeInTheDocument();
			});
		});

		it("画像アップロード成功時にプレビューが更新される", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const file = new File(["test content"], "test.jpg", {
				type: "image/jpeg",
			});
			const fileInput = screen.getByLabelText(/画像を選択/);

			await user.upload(fileInput, file);

			await waitFor(() => {
				const profileImage = screen.getByTestId("next-image");
				expect(profileImage).toHaveAttribute(
					"src",
					"https://example.com/new-avatar.jpg",
				);
			});
		});

		it("画像アップロードエラー時にコンソールエラーが出力される", async () => {
			const consoleSpy = vi
				.spyOn(console, "error")
				.mockImplementation(() => {});
			(uploadProfileImage as ReturnType<typeof vi.fn>).mockRejectedValue(
				new Error("Upload failed"),
			);

			render(<ProfileEditForm initialProfile={mockProfile} />);

			const file = new File(["test content"], "test.jpg", {
				type: "image/jpeg",
			});
			const fileInput = screen.getByLabelText(/画像を選択/);

			await user.upload(fileInput, file);

			await waitFor(() => {
				expect(consoleSpy).toHaveBeenCalledWith(
					"画像アップロードエラー:",
					expect.any(Error),
				);
			});

			consoleSpy.mockRestore();
		});
	});

	describe("リセット機能", () => {
		it("リセットボタンで初期値に戻る", async () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const nameInput = screen.getByLabelText(/名前/);
			const resetButton = screen.getByRole("button", { name: /リセット/ });

			// 値を変更
			await user.clear(nameInput);
			await user.type(nameInput, "Changed Name");
			expect(nameInput).toHaveValue("Changed Name");

			// リセット
			await user.click(resetButton);
			expect(nameInput).toHaveValue("Test User");
		});

		it("送信中はリセットボタンが無効になる", async () => {
			(updateProfile as ReturnType<typeof vi.fn>).mockImplementation(
				() =>
					new Promise((resolve) =>
						setTimeout(
							() =>
								resolve({
									success: true,
									data: { message: "Success", profile: mockProfile },
								}),
							100,
						),
					),
			);

			render(<ProfileEditForm initialProfile={mockProfile} />);

			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});
			const resetButton = screen.getByRole("button", { name: /リセット/ });

			await user.click(submitButton);
			expect(resetButton).toBeDisabled();

			await waitFor(() => {
				expect(resetButton).not.toBeDisabled();
			});
		});
	});

	describe("アクセシビリティ", () => {
		it("フォームが適切なラベルを持っている", () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			expect(screen.getByLabelText(/名前/)).toBeInTheDocument();
			expect(screen.getByLabelText(/表示名/)).toBeInTheDocument();
			expect(screen.getByLabelText(/自己紹介/)).toBeInTheDocument();
			expect(screen.getByLabelText(/所在地/)).toBeInTheDocument();
			expect(screen.getByLabelText(/ウェブサイト/)).toBeInTheDocument();
		});

		it("エラーメッセージがrole='alert'を持っている", async () => {
			(updateProfile as ReturnType<typeof vi.fn>).mockResolvedValue({
				success: false,
				error: "テストエラー",
			});

			render(<ProfileEditForm initialProfile={mockProfile} />);

			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});
			await user.click(submitButton);

			await waitFor(() => {
				const errorElement = screen.getByRole("alert");
				expect(errorElement).toBeInTheDocument();
				expect(errorElement).toHaveAttribute("aria-live", "polite");
			});
		});

		it("必須フィールドが適切にマークされている", () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const nameInput = screen.getByRole("textbox", { name: "名前*" });
			expect(nameInput).toBeInTheDocument();
			expect(nameInput).toHaveAttribute("aria-required", "true");
		});

		it("送信状態がスクリーンリーダーに通知される", async () => {
			(updateProfile as ReturnType<typeof vi.fn>).mockImplementation(
				() =>
					new Promise((resolve) =>
						setTimeout(
							() =>
								resolve({
									success: true,
									data: { message: "Success", profile: mockProfile },
								}),
							100,
						),
					),
			);

			render(<ProfileEditForm initialProfile={mockProfile} />);

			const submitButton = screen.getByRole("button", {
				name: /プロフィールを更新/,
			});
			await user.click(submitButton);

			expect(
				screen.getByText("プロフィールを更新しています"),
			).toBeInTheDocument();
			expect(screen.getByText("プロフィールを更新しています")).toHaveAttribute(
				"aria-live",
				"polite",
			);
		});

		it("フィールドセットが適切に構造化されている", () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const fieldset = screen.getByRole("group", { name: /プライバシー設定/ });
			expect(fieldset).toBeInTheDocument();
		});

		it("画像アップロードフィールドが適切に記述されている", () => {
			render(<ProfileEditForm initialProfile={mockProfile} />);

			const fileInput = screen.getByLabelText(/画像を選択/);
			expect(fileInput).toHaveAttribute(
				"aria-describedby",
				"profile-image-description",
			);
			expect(
				screen.getByText("JPEG、PNG、WebP形式、5MB以下"),
			).toBeInTheDocument();
		});
	});

	describe("エッジケース", () => {
		it("プロフィールデータが不完全でも正常に動作する", () => {
			const incompleteProfile = {
				...mockProfile,
				displayName: null,
				bio: null,
				location: null,
				website: null,
			};

			render(<ProfileEditForm initialProfile={incompleteProfile} />);

			expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
			expect(screen.getByLabelText(/表示名/)).toHaveValue("");
			expect(screen.getByLabelText(/自己紹介/)).toHaveValue("");
			expect(screen.getByLabelText(/所在地/)).toHaveValue("");
			expect(screen.getByLabelText(/ウェブサイト/)).toHaveValue("");
		});

		it("profileVisibleがfalseでも適切に処理される", () => {
			const profileWithFalseVisible = {
				...mockProfile,
				profileVisible: false,
			};

			render(<ProfileEditForm initialProfile={profileWithFalseVisible} />);

			const profileVisibleCheckbox = screen.getByRole("checkbox", {
				name: /プロフィールを公開/,
			});
			expect(profileVisibleCheckbox).not.toBeChecked();
		});

		it("名前がnullの場合適切に処理される", () => {
			const profileWithNullName = {
				...mockProfile,
				name: null,
				image: null, // 画像もnullにしてイニシャル表示をテスト
			};

			render(<ProfileEditForm initialProfile={profileWithNullName} />);

			expect(screen.getByRole("textbox", { name: "名前*" })).toHaveValue("");
			expect(screen.getByText("U")).toBeInTheDocument(); // イニシャル表示
		});
	});
});
