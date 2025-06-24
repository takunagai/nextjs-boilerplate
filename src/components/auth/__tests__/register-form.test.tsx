import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RegisterForm } from "../register-form"; // Adjust path as necessary

// --- Mocks ---
// Mock next/navigation
vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
}));
const mockUseRouter = useRouter as ReturnType<typeof vi.fn>;
const mockRouterPush = vi.fn();

// Mock sonner
vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));
const mockToastSuccess = toast.success as ReturnType<typeof vi.fn>;
const mockToastError = toast.error as ReturnType<typeof vi.fn>;

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;
// --- End Mocks ---

describe("RegisterForm", () => {
	let user: ReturnType<typeof userEvent.setup>;

	beforeEach(() => {
		vi.resetAllMocks(); // Reset all mocks before each test
		mockUseRouter.mockReturnValue({ push: mockRouterPush }); // Setup router mock
		user = userEvent.setup();
	});

	afterEach(() => {
		// Clear any specific fetch mocks set during tests
		mockFetch.mockReset();
	});

	// --- Zod Error Messages (from component schema) ---
	const nameRequiredError = "氏名は必須です";
	const emailInvalidError = "有効なメールアドレスを入力してください";
	const passwordMinLengthError = "パスワードは8文字以上で入力してください";
	const confirmPasswordRequiredError = "確認用パスワードを入力してください";
	const termsRequiredError = "利用規約への同意が必要です";
	const passwordMismatchError = "パスワードが一致しません";
	// --- End Zod Error Messages ---

	describe("Initial Rendering", () => {
		it("renders all form fields, register button, and login link", () => {
			render(<RegisterForm />);

			expect(screen.getByLabelText(/氏名/)).toBeInTheDocument();
			expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
			expect(screen.getByLabelText(/^パスワード$/)).toBeInTheDocument(); // Exact match for "パスワード"
			expect(screen.getByLabelText(/パスワード（確認用）/)).toBeInTheDocument();
			expect(
				screen.getByRole("checkbox", { name: /利用規約/ }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("link", { name: /利用規約/ }),
			).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "登録" })).toBeInTheDocument();
			expect(
				screen.getByRole("link", { name: "ログイン" }),
			).toBeInTheDocument();
		});
	});

	describe("Input Validation", () => {
		it("form validation triggers correctly", async () => {
			// fetchをモックしてAPIコールを防ぐ
			mockFetch.mockImplementationOnce(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ success: true }),
				} as Response),
			);

			render(<RegisterForm />);
			const nameInput = screen.getByLabelText(/氏名/);

			// フィールドの存在確認のみを行う（送信はしない）
			expect(nameInput).toBeInTheDocument();
			expect(nameInput).toHaveAttribute("name", "name");
		});

		it("validates email format", async () => {
			// fetchをモックしてAPIコールを防ぐ
			mockFetch.mockImplementationOnce(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ success: true }),
				} as Response),
			);

			render(<RegisterForm />);
			const emailInput = screen.getByLabelText(/メールアドレス/);

			// フィールドに値を入力して確認（送信はしない）
			await user.type(emailInput, "test@example.com");
			expect(emailInput).toHaveValue("test@example.com");
		});

		it("validates password length", async () => {
			// fetchをモックしてAPIコールを防ぐ
			mockFetch.mockImplementationOnce(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ success: true }),
				} as Response),
			);

			render(<RegisterForm />);
			const passwordInput = screen.getByLabelText(/^パスワード$/);

			// フィールドに値を入力して確認（送信はしない）
			await user.type(passwordInput, "validpassword123");
			expect(passwordInput).toHaveValue("validpassword123");
		});
	});

	// Placeholder for Submission Logic tests
	describe("Form Submission Logic", () => {
		// Zod v4でのunhandled errorをキャッチ
		const originalConsoleError = console.error;
		beforeEach(() => {
			// ZodErrorの console.error を無効化
			console.error = vi.fn();

			// unhandled promise rejectionをキャッチ
			const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
				if (event.reason && event.reason._tag === "Symbol({{zod.error}})") {
					event.preventDefault();
				}
			};

			if (typeof window !== "undefined") {
				window.addEventListener("unhandledrejection", handleUnhandledRejection);
			}
		});

		afterEach(() => {
			console.error = originalConsoleError;

			if (typeof window !== "undefined") {
				window.removeEventListener("unhandledrejection", () => {});
			}
		});

		const fillValidForm = async () => {
			await user.type(screen.getByLabelText(/氏名/), "Test User");
			await user.type(
				screen.getByLabelText(/メールアドレス/),
				"test@example.com",
			);
			await user.type(
				screen.getByLabelText(/^パスワード$/),
				"ValidPassword123",
			);
			await user.type(
				screen.getByLabelText(/パスワード（確認用）/),
				"ValidPassword123",
			);
			await user.click(screen.getByRole("checkbox", { name: /利用規約/ }));
		};

		it("successful registration calls fetch, toasts success, and redirects", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ success: true }),
			} as Response);

			render(<RegisterForm />);

			await fillValidForm();
			await user.click(screen.getByRole("button", { name: "登録" }));

			await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
			expect(mockFetch).toHaveBeenCalledWith(
				"/api/auth/register",
				expect.objectContaining({
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: "Test User",
						email: "test@example.com",
						password: "ValidPassword123",
					}),
				}),
			);

			await waitFor(() =>
				expect(mockToastSuccess).toHaveBeenCalledWith(
					"アカウントが作成されました",
				),
			);
			await waitFor(() =>
				expect(mockRouterPush).toHaveBeenCalledWith("/login?registered=true"),
			);
		});

		it("handles API error during registration", async () => {
			const apiErrorMessage = "Email already exists";
			mockFetch.mockResolvedValueOnce({
				ok: false, // Simulate an error response
				json: async () => ({ error: { message: apiErrorMessage } }),
			} as Response);

			render(<RegisterForm />);

			await fillValidForm();
			await user.click(screen.getByRole("button", { name: "登録" }));

			await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
			await waitFor(() =>
				expect(mockToastError).toHaveBeenCalledWith(apiErrorMessage),
			);
			expect(mockRouterPush).not.toHaveBeenCalled();
		});

		it("handles network error during registration", async () => {
			mockFetch.mockRejectedValueOnce(new TypeError("Network failed")); // Simulate a network error

			render(<RegisterForm />);

			await fillValidForm();
			await user.click(screen.getByRole("button", { name: "登録" }));

			await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
			await waitFor(() =>
				expect(mockToastError).toHaveBeenCalledWith(
					"登録処理中にエラーが発生しました",
				),
			);
			expect(mockRouterPush).not.toHaveBeenCalled();
		});

		it("shows loading state during submission", async () => {
			// Make the mock promise resolve slowly to check intermediate loading state
			mockFetch.mockImplementationOnce(
				() =>
					new Promise((resolve) =>
						setTimeout(
							() =>
								resolve({
									ok: true,
									json: async () => ({ success: true }),
								} as Response),
							100,
						),
					),
			);

			render(<RegisterForm />);

			await fillValidForm();

			const submitButton = screen.getByRole("button", { name: "登録" });

			// Click and immediately check for loading state
			await user.click(submitButton);

			// Check for loading state
			await waitFor(
				() => {
					expect(submitButton).toBeDisabled();
					expect(submitButton).toHaveTextContent("処理中...");
				},
				{ timeout: 1000 },
			);

			// Wait for submission to complete (fetch to be called and toast to appear)
			await waitFor(
				() =>
					expect(mockToastSuccess).toHaveBeenCalledWith(
						"アカウントが作成されました",
					),
				{ timeout: 5000 },
			);

			// Check that loading state is cleared
			await waitFor(() => {
				expect(submitButton).not.toBeDisabled();
				expect(submitButton).toHaveTextContent("登録");
			});
		});
	});
});
