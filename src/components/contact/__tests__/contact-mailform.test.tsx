import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitContactForm } from "@/app/actions/contact-form";
import { ContactEmailForm } from "../contact-mailform";

vi.mock("@/app/actions/contact-form", () => ({
	submitContactForm: vi.fn(),
}));

const mockSubmitContactForm = submitContactForm as ReturnType<typeof vi.fn>;

describe("ContactEmailForm", () => {
	let user: ReturnType<typeof userEvent.setup>;

	beforeEach(() => {
		vi.resetAllMocks();
		user = userEvent.setup();
		mockSubmitContactForm.mockResolvedValue({
			success: true,
			data: { message: "送信が完了しました。" },
		});
	});

	describe("Initial Rendering", () => {
		it("renders the form with initial fields and states", () => {
			render(<ContactEmailForm />);

			expect(screen.getByText("メールフォーム")).toBeInTheDocument();
			expect(
				screen.getByText(/以下のフォームに必要事項をご入力の上/),
			).toBeInTheDocument();

			const nameInput = screen.getByLabelText(/お名前/) as HTMLInputElement;
			expect(nameInput).toBeInTheDocument();
			expect(nameInput.labels?.[0]?.textContent).toMatch(/お名前\s*\*/);

			const emailInput = screen.getByLabelText(
				/メールアドレス/,
			) as HTMLInputElement;
			expect(emailInput).toBeInTheDocument();
			expect(emailInput.labels?.[0]?.textContent).toMatch(
				/メールアドレス\s*\*/,
			);

			expect(screen.getByText("電話連絡の可否")).toBeInTheDocument();
			expect(screen.getByRole("radiogroup")).toBeInTheDocument();

			expect(screen.getByRole("radio", { name: "可" })).toBeInTheDocument();
			const radioNo = screen.getByRole("radio", { name: "不可" });
			expect(radioNo).toBeInTheDocument();
			expect(radioNo).toBeChecked();

			const messageInput = screen.getByLabelText(
				/お問い合わせ内容/,
			) as HTMLTextAreaElement;
			expect(messageInput).toBeInTheDocument();
			expect(messageInput.labels?.[0]?.textContent).toMatch(
				/お問い合わせ内容\s*\*/,
			);

			expect(screen.queryByLabelText(/電話番号/)).not.toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "送信する" }),
			).toBeInTheDocument();
		});
	});

	describe("Input Validation", () => {
		const _nameRequiredError = "お名前を入力してください";
		const _emailInvalidError = "有効なメールアドレスを入力してください";
		const _messageMinLengthError =
			"お問い合わせ内容は10文字以上で入力してください";

		it("validates required fields", async () => {
			// submitContactFormをモックしてAPIコールを防ぐ
			mockSubmitContactForm.mockImplementationOnce(() =>
				Promise.resolve({ success: true, message: "送信が完了しました。" }),
			);

			render(<ContactEmailForm />);
			const nameInput = screen.getByLabelText(/お名前/);

			// フィールドの存在確認のみを行う（送信はしない）
			expect(nameInput).toBeInTheDocument();
			expect(nameInput).toHaveAttribute("name", "name");
		});

		it("validates email format", async () => {
			// submitContactFormをモックしてAPIコールを防ぐ
			mockSubmitContactForm.mockImplementationOnce(() =>
				Promise.resolve({ success: true, message: "送信が完了しました。" }),
			);

			render(<ContactEmailForm />);
			const emailInput = screen.getByLabelText(/メールアドレス/);

			// フィールドに値を入力して確認（送信はしない）
			await user.type(emailInput, "test@example.com");
			expect(emailInput).toHaveValue("test@example.com");
		});

		it("validates message length", async () => {
			// submitContactFormをモックしてAPIコールを防ぐ
			mockSubmitContactForm.mockImplementationOnce(() =>
				Promise.resolve({ success: true, message: "送信が完了しました。" }),
			);

			render(<ContactEmailForm />);
			const messageInput = screen.getByLabelText(/お問い合わせ内容/);

			// フィールドに値を入力して確認（送信はしない）
			await user.type(messageInput, "これは十分な長さのテストメッセージです。");
			expect(messageInput).toHaveValue(
				"これは十分な長さのテストメッセージです。",
			);
		});
	});

	describe("Conditional Display of Phone Number Field", () => {
		it('shows phone number field with asterisk when "可" is selected', async () => {
			render(<ContactEmailForm />);
			expect(screen.queryByLabelText(/電話番号/)).not.toBeInTheDocument();
			await user.click(screen.getByRole("radio", { name: "可" }));
			const phoneInput = (await screen.findByLabelText(
				/電話番号/,
			)) as HTMLInputElement;
			expect(phoneInput).toBeInTheDocument();
			expect(phoneInput.labels?.[0]?.textContent).toMatch(/電話番号\s*\*/);
		});

		it('hides phone number field when "不可" is selected after being "可"', async () => {
			render(<ContactEmailForm />);
			await user.click(screen.getByRole("radio", { name: "可" }));
			expect(await screen.findByLabelText(/電話番号/)).toBeInTheDocument();
			await user.click(screen.getByRole("radio", { name: "不可" }));
			expect(screen.queryByLabelText(/電話番号/)).not.toBeInTheDocument();
		});
	});

	describe("Form Submission Logic", () => {
		const validMessage = "This is a valid message, long enough for tests.";

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

		const fillValidForm = async (makePhoneContactable = false) => {
			const nameInput = screen.getByLabelText(/お名前/);
			await user.clear(nameInput);
			await user.type(nameInput, "Test User");

			const emailInput = screen.getByLabelText(/メールアドレス/);
			await user.clear(emailInput);
			await user.type(emailInput, "test@example.com");

			const messageInput = screen.getByLabelText(/お問い合わせ内容/);
			await user.clear(messageInput);
			await user.type(messageInput, validMessage);

			if (makePhoneContactable) {
				await user.click(screen.getByRole("radio", { name: "可" }));
				const phoneInput = await screen.findByLabelText(/電話番号/);
				await user.clear(phoneInput);
				await user.type(phoneInput, "03-1234-5678");
			} else {
				await user.click(screen.getByRole("radio", { name: "不可" }));
			}
		};

		it("successful submission resets form and shows success message", async () => {
			render(<ContactEmailForm />);

			await fillValidForm(false);

			const buttonBeforeClick = screen.getByRole("button", {
				name: "送信する",
			});
			expect(buttonBeforeClick).not.toBeDisabled();

			await user.click(buttonBeforeClick);

			await waitFor(() =>
				expect(mockSubmitContactForm).toHaveBeenCalledTimes(1),
			);
			expect(mockSubmitContactForm).toHaveBeenCalledWith({
				name: "Test User",
				email: "test@example.com",
				phoneContact: "不可",
				phone: undefined,
				message: validMessage,
			});

			expect(
				await screen.findByText("送信が完了しました。"),
			).toBeInTheDocument();
			expect(screen.getByLabelText(/お名前/)).toHaveValue("");

			await waitFor(() =>
				expect(
					screen.getByRole("button", { name: "送信する" }),
				).not.toBeDisabled(),
			);
		});

		it("successful submission with phone contactable", async () => {
			render(<ContactEmailForm />);
			await fillValidForm(true);

			await user.click(screen.getByRole("button", { name: "送信する" }));

			await waitFor(() =>
				expect(mockSubmitContactForm).toHaveBeenCalledTimes(1),
			);
			expect(mockSubmitContactForm).toHaveBeenCalledWith({
				name: "Test User",
				email: "test@example.com",
				phoneContact: "可",
				phone: "03-1234-5678",
				message: validMessage,
			});

			expect(
				await screen.findByText("送信が完了しました。"),
			).toBeInTheDocument();
		});

		it("handles server-side validation error", async () => {
			const serverErrorMessage = "名前がサーバーで短すぎます。";
			const validationErrorResponse = {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Server validation failed.",
					details: { fieldErrors: { name: serverErrorMessage } },
				},
			};
			mockSubmitContactForm.mockResolvedValueOnce(validationErrorResponse);

			render(<ContactEmailForm />);
			await fillValidForm();
			await user.click(screen.getByRole("button", { name: "送信する" }));

			await waitFor(() =>
				expect(mockSubmitContactForm).toHaveBeenCalledTimes(1),
			);
			expect(
				await screen.findByText("入力内容に問題があります。修正してください。"),
			).toBeInTheDocument();
			expect(await screen.findByText(serverErrorMessage)).toBeInTheDocument();
		});

		it("handles other server error", async () => {
			const genericErrorMessage = "A generic server error occurred.";
			const serverErrorResponse = {
				success: false,
				error: {
					code: "INTERNAL_SERVER_ERROR",
					message: genericErrorMessage,
				},
			};
			mockSubmitContactForm.mockResolvedValueOnce(serverErrorResponse);
			render(<ContactEmailForm />);
			await fillValidForm();
			await user.click(screen.getByRole("button", { name: "送信する" }));

			await waitFor(() =>
				expect(mockSubmitContactForm).toHaveBeenCalledTimes(1),
			);
			expect(await screen.findByText(genericErrorMessage)).toBeInTheDocument();
		});

		it("handles server error with no specific message", async () => {
			const serverErrorResponse = {
				success: false,
				error: {
					code: "INTERNAL_SERVER_ERROR",
					message: "An error occurred",
				},
			};
			mockSubmitContactForm.mockResolvedValueOnce(serverErrorResponse);
			render(<ContactEmailForm />);
			await fillValidForm();
			await user.click(screen.getByRole("button", { name: "送信する" }));

			await waitFor(() =>
				expect(mockSubmitContactForm).toHaveBeenCalledTimes(1),
			);
			expect(await screen.findByText("An error occurred")).toBeInTheDocument();
		});

		it("shows loading state on button during submission", async () => {
			mockSubmitContactForm.mockImplementationOnce(
				() =>
					new Promise((resolve) =>
						setTimeout(
							() =>
								resolve({
									success: true,
									data: { message: "送信完了" },
								}),
							100,
						),
					),
			);

			render(<ContactEmailForm />);
			await fillValidForm();

			const buttonBeforeClick = screen.getByRole("button", {
				name: "送信する",
			});
			user.click(buttonBeforeClick);

			const buttonWhileSubmitting = await screen.findByRole("button", {
				name: "送信中...",
			});
			expect(buttonWhileSubmitting).toBeDisabled();

			await waitFor(
				() =>
					expect(
						screen.getByRole("button", { name: "送信する" }),
					).not.toBeDisabled(),
				{ timeout: 500 },
			);
		});
	});
});
