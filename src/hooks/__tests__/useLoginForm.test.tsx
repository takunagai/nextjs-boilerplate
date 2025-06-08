import { renderHook, act } from "@testing-library/react";
import { useLoginForm, type LoginFormInputs } from "../useLoginForm";
import { useAuth } from "../useAuth";
import { vi, type MockedFunction } from "vitest";

// useAuthのモック
vi.mock("../useAuth", () => ({
	useAuth: vi.fn(),
}));

describe("useLoginForm", () => {
	const mockLogin = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		console.error = vi.fn(); // console.errorをモック

		(useAuth as MockedFunction<typeof useAuth>).mockReturnValue({
			session: null,
			status: "unauthenticated",
			isLoading: false,
			isAuthenticated: false,
			user: undefined,
			login: mockLogin,
			logout: vi.fn(),
			updateSession: vi.fn(),
		});
	});

	describe("初期状態", () => {
		it("正しい初期値を返す", () => {
			const { result } = renderHook(() => useLoginForm());

			expect(result.current.isLoading).toBe(false);
			expect(result.current.error).toBeUndefined();
			expect(result.current.attempts).toBe(0);
			expect(result.current.form.getValues()).toEqual({
				email: "",
				password: "",
			});
			expect(typeof result.current.handleLogin).toBe("function");
			expect(typeof result.current.resetError).toBe("function");
		});

		it("フォームが適切なバリデーションスキーマを持つ", async () => {
			const { result } = renderHook(() => useLoginForm());

			// 空のフォームを送信してバリデーションエラーを確認
			act(() => {
				result.current.form.handleSubmit(() => {})();
			});

			// バリデーションエラーが設定されるまで待機
			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			const errors = result.current.form.formState.errors;
			expect(errors.email?.message).toBe("メールアドレスは必須です");
			expect(errors.password?.message).toBe("パスワードは必須です");
		});

		it("無効なメールアドレスでバリデーションエラーが発生する", async () => {
			const { result } = renderHook(() => useLoginForm());

			act(() => {
				result.current.form.setValue("email", "invalid-email");
			});

			act(() => {
				result.current.form.handleSubmit(() => {})();
			});

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			const errors = result.current.form.formState.errors;
			expect(errors.email?.message).toBe(
				"有効なメールアドレスを入力してください",
			);
		});
	});

	describe("handleLogin関数", () => {
		const validFormData: LoginFormInputs = {
			email: "test@example.com",
			password: "password123",
		};

		it("正常なログインが成功する", async () => {
			mockLogin.mockResolvedValue({ success: true });

			const { result } = renderHook(() => useLoginForm());

			let loginResult: unknown;
			await act(async () => {
				loginResult = await result.current.handleLogin(validFormData);
			});

			expect(mockLogin).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
			});
			expect((loginResult as { success: boolean }).success).toBe(true);
			expect(result.current.error).toBeUndefined();
			expect(result.current.attempts).toBe(1);
			expect(result.current.isLoading).toBe(false);
		});

		it("ログイン失敗時にエラーメッセージを設定する", async () => {
			const errorMessage = "認証に失敗しました";
			mockLogin.mockResolvedValue({
				success: false,
				message: errorMessage,
			});

			const { result } = renderHook(() => useLoginForm());

			let loginResult: unknown;
			await act(async () => {
				loginResult = await result.current.handleLogin(validFormData);
			});

			expect((loginResult as { success: boolean }).success).toBe(false);
			expect(result.current.error).toBe(errorMessage);
			expect(result.current.attempts).toBe(1);
			expect(result.current.isLoading).toBe(false);
		});

		it("試行回数が正しく増加する", async () => {
			mockLogin.mockResolvedValue({ success: false, message: "エラー" });

			const { result } = renderHook(() => useLoginForm());

			// 1回目の試行
			await act(async () => {
				await result.current.handleLogin(validFormData);
			});
			expect(result.current.attempts).toBe(1);

			// 2回目の試行
			await act(async () => {
				await result.current.handleLogin(validFormData);
			});
			expect(result.current.attempts).toBe(2);

			// 3回目の試行
			await act(async () => {
				await result.current.handleLogin(validFormData);
			});
			expect(result.current.attempts).toBe(3);
		});

		it("ローディング状態が正しく管理される", async () => {
			let resolveLogin: (value: unknown) => void;
			const loginPromise = new Promise((resolve) => {
				resolveLogin = resolve;
			});
			mockLogin.mockReturnValue(loginPromise);

			const { result } = renderHook(() => useLoginForm());

			// ログイン開始
			const loginPromiseResult = act(async () => {
				return result.current.handleLogin(validFormData);
			});

			// ローディング中であることを確認
			expect(result.current.isLoading).toBe(true);

			// ログイン完了
			act(() => {
				resolveLogin!({ success: true });
			});

			await loginPromiseResult;

			// ローディングが終了していることを確認
			expect(result.current.isLoading).toBe(false);
		});

		it("ログイン前にエラーをクリアする", async () => {
			mockLogin.mockResolvedValue({ success: false, message: "初回エラー" });

			const { result } = renderHook(() => useLoginForm());

			// 最初のログイン試行でエラー発生
			await act(async () => {
				await result.current.handleLogin(validFormData);
			});
			expect(result.current.error).toBe("初回エラー");

			// 2回目のログイン試行（成功）
			mockLogin.mockResolvedValue({ success: true });
			await act(async () => {
				await result.current.handleLogin(validFormData);
			});

			expect(result.current.error).toBeUndefined();
		});

		it("予期しないエラーを適切に処理する", async () => {
			const unexpectedError = new Error("Unexpected error");
			mockLogin.mockRejectedValue(unexpectedError);

			const { result } = renderHook(() => useLoginForm());

			let loginResult: unknown;
			await act(async () => {
				loginResult = await result.current.handleLogin(validFormData);
			});

			expect(loginResult).toEqual({
				success: false,
				error: "unexpected-error",
			});
			expect(result.current.error).toBe(
				"ログイン処理中にエラーが発生しました。時間をおいて再度お試しください。",
			);
			expect(result.current.isLoading).toBe(false);
			expect(console.error).toHaveBeenCalledWith(
				"ログイン処理エラー:",
				unexpectedError,
			);
		});
	});

	describe("resetError関数", () => {
		it("エラーメッセージをクリアする", async () => {
			mockLogin.mockResolvedValue({
				success: false,
				message: "テストエラー",
			});

			const { result } = renderHook(() => useLoginForm());

			// エラーを発生させる
			await act(async () => {
				await result.current.handleLogin({
					email: "test@example.com",
					password: "password123",
				});
			});
			expect(result.current.error).toBe("テストエラー");

			// エラーをリセット
			act(() => {
				result.current.resetError();
			});

			expect(result.current.error).toBeUndefined();
		});
	});

	describe("フォームの統合", () => {
		it("フォームの値が正しく設定される", () => {
			const { result } = renderHook(() => useLoginForm());

			act(() => {
				result.current.form.setValue("email", "test@example.com");
				result.current.form.setValue("password", "password123");
			});

			expect(result.current.form.getValues()).toEqual({
				email: "test@example.com",
				password: "password123",
			});
		});

		it("フォームのリセットが正しく動作する", () => {
			const { result } = renderHook(() => useLoginForm());

			// 値を設定
			act(() => {
				result.current.form.setValue("email", "test@example.com");
				result.current.form.setValue("password", "password123");
			});

			// リセット
			act(() => {
				result.current.form.reset();
			});

			expect(result.current.form.getValues()).toEqual({
				email: "",
				password: "",
			});
		});
	});

	describe("エッジケース", () => {
		it("空のメールアドレスと空のパスワードでバリデーションエラー", async () => {
			const { result } = renderHook(() => useLoginForm());

			act(() => {
				result.current.form.setValue("email", "");
				result.current.form.setValue("password", "");
			});

			act(() => {
				result.current.form.handleSubmit(() => {})();
			});

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			const errors = result.current.form.formState.errors;
			expect(errors.email?.message).toBe("メールアドレスは必須です");
			expect(errors.password?.message).toBe("パスワードは必須です");
		});

		it("複数回の連続ログイン試行", async () => {
			mockLogin.mockResolvedValue({ success: false, message: "エラー" });

			const { result } = renderHook(() => useLoginForm());

			const validData = { email: "test@example.com", password: "password123" };

			// 複数回連続で実行
			await act(async () => {
				await result.current.handleLogin(validData);
			});
			await act(async () => {
				await result.current.handleLogin(validData);
			});
			await act(async () => {
				await result.current.handleLogin(validData);
			});

			expect(result.current.attempts).toBe(3);
			expect(mockLogin).toHaveBeenCalledTimes(3);
		});
	});

	describe("戻り値の型チェック", () => {
		it("すべての必要なプロパティとメソッドを返す", () => {
			const { result } = renderHook(() => useLoginForm());

			expect(result.current).toHaveProperty("form");
			expect(result.current).toHaveProperty("isLoading");
			expect(result.current).toHaveProperty("error");
			expect(result.current).toHaveProperty("attempts");
			expect(result.current).toHaveProperty("handleLogin");
			expect(result.current).toHaveProperty("resetError");

			expect(typeof result.current.handleLogin).toBe("function");
			expect(typeof result.current.resetError).toBe("function");
			expect(typeof result.current.isLoading).toBe("boolean");
			expect(typeof result.current.attempts).toBe("number");
		});
	});
});
