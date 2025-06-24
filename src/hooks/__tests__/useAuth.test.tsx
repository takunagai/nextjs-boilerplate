import { act, renderHook } from "@testing-library/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODES } from "@/lib/auth/auth-errors";
import { useAuth } from "../useAuth";

// NextAuthのモック
vi.mock("next-auth/react", () => ({
	useSession: vi.fn(),
	signIn: vi.fn(),
	signOut: vi.fn(),
}));

// auth-errorsのモック
vi.mock("@/lib/auth/auth-errors", () => ({
	AUTH_ERROR_CODES: {
		INVALID_CREDENTIALS: "auth/invalid-credentials",
		EMPTY_CREDENTIALS: "auth/empty-credentials",
		NETWORK_ERROR: "auth/network-error",
		UNKNOWN_ERROR: "auth/unknown-error",
	},
	getAuthErrorMessage: vi.fn((errorCode: string, email?: string) => {
		switch (errorCode) {
			case "auth/empty-credentials":
				return "メールアドレスとパスワードを入力してください";
			case "auth/network-error":
				return "ネットワークエラーが発生しました";
			case "auth/invalid-credentials":
				return `${email}のログイン認証に失敗しました`;
			default:
				return "不明なエラーが発生しました";
		}
	}),
}));

describe("useAuth", () => {
	const mockUseSession = useSession as ReturnType<typeof vi.fn>;
	const mockSignIn = signIn as ReturnType<typeof vi.fn>;
	const mockSignOut = signOut as ReturnType<typeof vi.fn>;
	const mockUpdate = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		console.error = vi.fn(); // console.errorをモック
	});

	describe("セッション状態の管理", () => {
		it("読み込み中の状態を正しく返す", () => {
			mockUseSession.mockReturnValue({
				data: null,
				status: "loading",
				update: mockUpdate,
			});

			const { result } = renderHook(() => useAuth());

			expect(result.current.isLoading).toBe(true);
			expect(result.current.isAuthenticated).toBe(false);
			expect(result.current.session).toBeNull();
			expect(result.current.user).toBeUndefined();
		});

		it("未認証状態を正しく返す", () => {
			mockUseSession.mockReturnValue({
				data: null,
				status: "unauthenticated",
				update: mockUpdate,
			});

			const { result } = renderHook(() => useAuth());

			expect(result.current.isLoading).toBe(false);
			expect(result.current.isAuthenticated).toBe(false);
			expect(result.current.session).toBeNull();
			expect(result.current.user).toBeUndefined();
		});

		it("認証済み状態を正しく返す", () => {
			const mockSession = {
				user: {
					id: "1",
					email: "test@example.com",
					name: "Test User",
				},
				expires: "2024-12-31",
			};

			mockUseSession.mockReturnValue({
				data: mockSession,
				status: "authenticated",
				update: mockUpdate,
			});

			const { result } = renderHook(() => useAuth());

			expect(result.current.isLoading).toBe(false);
			expect(result.current.isAuthenticated).toBe(true);
			expect(result.current.session).toEqual(mockSession);
			expect(result.current.user).toEqual(mockSession.user);
		});
	});

	describe("login関数", () => {
		beforeEach(() => {
			mockUseSession.mockReturnValue({
				data: null,
				status: "unauthenticated",
				update: mockUpdate,
			});
		});

		it("正常なログインが成功する", async () => {
			mockSignIn.mockResolvedValue({ error: null });

			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.login({
					email: "test@example.com",
					password: "password123",
				});

				expect(authResult.success).toBe(true);
				expect(authResult.error).toBeUndefined();
				expect(authResult.message).toBeUndefined();
			});

			expect(mockSignIn).toHaveBeenCalledWith("credentials", {
				redirect: false,
				email: "test@example.com",
				password: "password123",
			});
		});

		it("空の認証情報でエラーを返す", async () => {
			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.login({
					email: "",
					password: "password123",
				});

				expect(authResult.success).toBe(false);
				expect(authResult.error).toBe(AUTH_ERROR_CODES.EMPTY_CREDENTIALS);
				expect(authResult.message).toBe(
					"メールアドレスとパスワードを入力してください",
				);
			});

			expect(mockSignIn).not.toHaveBeenCalled();
		});

		it("パスワードが空の場合にエラーを返す", async () => {
			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.login({
					email: "test@example.com",
					password: "",
				});

				expect(authResult.success).toBe(false);
				expect(authResult.error).toBe(AUTH_ERROR_CODES.EMPTY_CREDENTIALS);
			});
		});

		it("認証エラーを適切に処理する", async () => {
			mockSignIn.mockResolvedValue({
				error: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
			});

			const { result } = renderHook(() => useAuth());

			const authResult = await result.current.login({
				email: "test@example.com",
				password: "wrongpassword",
			});

			expect(authResult.success).toBe(false);
			expect(authResult.error).toBe(AUTH_ERROR_CODES.INVALID_CREDENTIALS);
			expect(authResult.message).toBe(
				"test@example.comのログイン認証に失敗しました",
			);
		});

		it("ネットワークエラーを適切に処理する", async () => {
			const networkError = new Error("fetch failed");
			mockSignIn.mockRejectedValue(networkError);

			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.login({
					email: "test@example.com",
					password: "password123",
				});

				expect(authResult.success).toBe(false);
				expect(authResult.error).toBe(AUTH_ERROR_CODES.NETWORK_ERROR);
				expect(authResult.message).toBe("ネットワークエラーが発生しました");
			});

			expect(console.error).toHaveBeenCalledWith(
				"ログインエラー:",
				networkError,
			);
		});

		it("不明なエラーを適切に処理する", async () => {
			const unknownError = new Error("Unknown error");
			mockSignIn.mockRejectedValue(unknownError);

			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.login({
					email: "test@example.com",
					password: "password123",
				});

				expect(authResult.success).toBe(false);
				expect(authResult.error).toBe(AUTH_ERROR_CODES.UNKNOWN_ERROR);
				expect(authResult.message).toBe("不明なエラーが発生しました");
			});
		});
	});

	describe("logout関数", () => {
		beforeEach(() => {
			mockUseSession.mockReturnValue({
				data: {
					user: { email: "test@example.com" },
					expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
				},
				status: "authenticated",
				update: mockUpdate,
			});
		});

		it("正常なログアウトが成功する", async () => {
			mockSignOut.mockResolvedValue({ url: "http://localhost" });

			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.logout();

				expect(authResult.success).toBe(true);
				expect(authResult.error).toBeUndefined();
			});

			expect(mockSignOut).toHaveBeenCalledWith({ redirect: false });
		});

		it("ログアウトエラーを適切に処理する", async () => {
			const logoutError = new Error("Logout failed");
			mockSignOut.mockRejectedValue(logoutError);

			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.logout();

				expect(authResult.success).toBe(false);
				expect(authResult.error).toBe(AUTH_ERROR_CODES.UNKNOWN_ERROR);
				expect(authResult.message).toBe(
					"ログアウト処理中にエラーが発生しました",
				);
			});

			expect(console.error).toHaveBeenCalledWith(
				"ログアウトエラー:",
				logoutError,
			);
		});
	});

	describe("updateSession関数", () => {
		beforeEach(() => {
			mockUseSession.mockReturnValue({
				data: {
					user: { email: "test@example.com" },
					expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
				},
				status: "authenticated",
				update: mockUpdate,
			});
		});

		it("正常なセッション更新が成功する", async () => {
			mockUpdate.mockResolvedValue(undefined);

			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.updateSession();

				expect(authResult.success).toBe(true);
				expect(authResult.error).toBeUndefined();
			});

			expect(mockUpdate).toHaveBeenCalled();
		});

		it("セッション更新エラーを適切に処理する", async () => {
			const updateError = new Error("Update failed");
			mockUpdate.mockRejectedValue(updateError);

			const { result } = renderHook(() => useAuth());

			await act(async () => {
				const authResult = await result.current.updateSession();

				expect(authResult.success).toBe(false);
				expect(authResult.error).toBe(AUTH_ERROR_CODES.UNKNOWN_ERROR);
				expect(authResult.message).toBe(
					"セッション更新中にエラーが発生しました",
				);
			});

			expect(console.error).toHaveBeenCalledWith(
				"セッション更新エラー:",
				updateError,
			);
		});
	});

	describe("関数の安定性", () => {
		it("login関数が再レンダリング時に同じ参照を保持する", () => {
			mockUseSession.mockReturnValue({
				data: null,
				status: "unauthenticated",
				update: mockUpdate,
			});

			const { result, rerender } = renderHook(() => useAuth());
			const firstLogin = result.current.login;

			rerender();

			expect(result.current.login).toBe(firstLogin);
		});

		it("logout関数が再レンダリング時に同じ参照を保持する", () => {
			mockUseSession.mockReturnValue({
				data: {
					user: { email: "test@example.com" },
					expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
				},
				status: "authenticated",
				update: mockUpdate,
			});

			const { result, rerender } = renderHook(() => useAuth());
			const firstLogout = result.current.logout;

			rerender();

			expect(result.current.logout).toBe(firstLogout);
		});

		it("updateSession関数がupdate関数の変更時に更新される", () => {
			const firstUpdate = vi.fn();
			mockUseSession.mockReturnValue({
				data: {
					user: { email: "test@example.com" },
					expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
				},
				status: "authenticated",
				update: firstUpdate,
			});

			const { result, rerender } = renderHook(() => useAuth());
			const firstUpdateSession = result.current.updateSession;

			const secondUpdate = vi.fn();
			mockUseSession.mockReturnValue({
				data: {
					user: { email: "test@example.com" },
					expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
				},
				status: "authenticated",
				update: secondUpdate,
			});

			rerender();

			expect(result.current.updateSession).not.toBe(firstUpdateSession);
		});
	});

	describe("戻り値の構造", () => {
		it("すべての必要なプロパティを返す", () => {
			const mockSession = {
				user: { id: "1", email: "test@example.com" },
				expires: "2024-12-31",
			};

			mockUseSession.mockReturnValue({
				data: mockSession,
				status: "authenticated",
				update: mockUpdate,
			});

			const { result } = renderHook(() => useAuth());

			expect(result.current).toHaveProperty("session");
			expect(result.current).toHaveProperty("status");
			expect(result.current).toHaveProperty("isLoading");
			expect(result.current).toHaveProperty("isAuthenticated");
			expect(result.current).toHaveProperty("user");
			expect(result.current).toHaveProperty("login");
			expect(result.current).toHaveProperty("logout");
			expect(result.current).toHaveProperty("updateSession");

			expect(typeof result.current.login).toBe("function");
			expect(typeof result.current.logout).toBe("function");
			expect(typeof result.current.updateSession).toBe("function");
		});
	});
});
