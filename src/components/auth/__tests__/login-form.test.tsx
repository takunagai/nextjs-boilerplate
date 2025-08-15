import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "@/hooks/useAuth";
import { useLoginForm } from "@/hooks/useLoginForm";
import {
	createMockAuthContext,
	createMockForm,
	createMockFormHandleSubmit,
	createMockRouter,
	render,
} from "@/test-utils";
import { LoginForm } from "../login-form";

// Mock dependencies
vi.mock("@/hooks/useAuth");
vi.mock("@/hooks/useLoginForm");
vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
}));

const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;
const mockUseLoginForm = useLoginForm as ReturnType<typeof vi.fn>;
const mockUseRouter = useRouter as ReturnType<typeof vi.fn>;

const createDefaultUseLoginFormReturnValue = (overrides = {}) => ({
	form: createMockForm(),
	isLoading: false,
	error: null,
	handleLogin: vi.fn(),
	resetError: vi.fn(),
	...overrides,
});

describe("LoginForm - 送信処理", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		mockUseAuth.mockReturnValue(createMockAuthContext());
		mockUseLoginForm.mockReturnValue(createDefaultUseLoginFormReturnValue());
		mockUseRouter.mockReturnValue(createMockRouter());
	});

	describe("フォーム送信", () => {
		it("ログイン成功時に handleLogin を呼び出し、リダイレクトする", async () => {
			const specificMockHandleLogin = vi
				.fn()
				.mockResolvedValueOnce({ success: true });
			const testData = {
				email: "testuser@example.com",
				password: "password123",
			};
			const mockRouter = createMockRouter();

			mockUseRouter.mockReturnValueOnce(mockRouter);
			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({
					handleLogin: specificMockHandleLogin,
					form: createMockForm({
						handleSubmit: createMockFormHandleSubmit(testData),
					}),
				}),
			);

			render(<LoginForm />);

			// フォーム送信
			fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

			await waitFor(() => {
				expect(specificMockHandleLogin).toHaveBeenCalledTimes(1);
				expect(specificMockHandleLogin).toHaveBeenCalledWith(testData);
				expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
			});
		});

		it("ログイン失敗時はリダイレクトしない", async () => {
			const specificMockHandleLogin = vi.fn().mockResolvedValueOnce({
				success: false,
				error: "Invalid credentials",
			});
			const testData = {
				email: "testuser@example.com",
				password: "wrongpassword",
			};
			const mockRouter = createMockRouter();

			mockUseRouter.mockReturnValueOnce(mockRouter);
			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({
					handleLogin: specificMockHandleLogin,
					form: createMockForm({
						handleSubmit: createMockFormHandleSubmit(testData),
					}),
				}),
			);

			render(<LoginForm />);

			// フォーム送信
			fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

			await waitFor(() => {
				expect(specificMockHandleLogin).toHaveBeenCalledTimes(1);
				expect(specificMockHandleLogin).toHaveBeenCalledWith(testData);
				expect(mockRouter.push).not.toHaveBeenCalled();
			});
		});
	});

	describe("認証状態のリダイレクト", () => {
		it("認証済みユーザーは /dashboard にリダイレクトされる", () => {
			const mockRouter = createMockRouter();
			mockUseRouter.mockReturnValueOnce(mockRouter);
			mockUseAuth.mockReturnValueOnce(
				createMockAuthContext({
					isAuthenticated: true,
					user: { id: "1", email: "test@example.com", name: "Test User" },
				}),
			);

			render(<LoginForm />);
			expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
		});
	});

	describe("エラーリセット機能", () => {
		it("フォーム入力変更時に resetError が呼ばれる", async () => {
			const mockResetErrorFn = vi.fn();
			let watchCallback: () => void = () => {};

			const mockWatchFn = vi.fn((cb: () => void) => {
				watchCallback = cb;
				return { unsubscribe: vi.fn() };
			});

			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({
					resetError: mockResetErrorFn,
					form: createMockForm({ watch: mockWatchFn }),
				}),
			);

			render(<LoginForm />);

			expect(mockWatchFn).toHaveBeenCalled();
			watchCallback();

			await waitFor(() => expect(mockResetErrorFn).toHaveBeenCalledTimes(1));
		});
	});
});
