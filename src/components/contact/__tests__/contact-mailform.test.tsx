import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContactEmailForm } from "../contact-mailform";
import { submitContactForm } from "@/app/actions/contact-form";
import type { ActionError } from "@/lib/server";

vi.mock("@/app/actions/contact-form", () => ({
	submitContactForm: vi.fn(),
}));

const mockSubmitContactForm = submitContactForm as ReturnType<typeof vi.fn>;

describe("ContactEmailForm", () => {
	const user = userEvent.setup();

	beforeEach(() => {
		vi.resetAllMocks();
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

			expect(
				screen.getByText("電話連絡の可否 *", { selector: "label" }),
			).toBeInTheDocument();
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
		const nameRequiredError = "お名前を入力してください";
		const emailInvalidError = "有効なメールアドレスを入力してください";
		const messageMinLengthError =
			"お問い合わせ内容は10文字以上で入力してください";
		const phoneFormatError =
			"電話番号は「00-0000-0000」の形式で入力してください";

		it("shows error for empty name and sets aria-invalid", async () => {
			render(<ContactEmailForm />);
			const nameInput = screen.getByLabelText(/お名前/);
			await act(async () => {
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});
			// screen.debug(undefined, 300000);
			await waitFor(() =>
				expect(nameInput).toHaveAttribute("aria-invalid", "true"),
			);
			expect(await screen.findByText(nameRequiredError)).toBeInTheDocument();
		});

		it("shows error for invalid email and sets aria-invalid", async () => {
			render(<ContactEmailForm />);
			const emailInput = screen.getByLabelText(/メールアドレス/);
			await act(async () => {
				await user.type(emailInput, "invalidemail");
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});
			await waitFor(() =>
				expect(emailInput).toHaveAttribute("aria-invalid", "true"),
			);
			expect(await screen.findByText(emailInvalidError)).toBeInTheDocument();
		});

		it("shows error for message shorter than 10 characters and sets aria-invalid", async () => {
			render(<ContactEmailForm />);
			const messageInput = screen.getByLabelText(/お問い合わせ内容/);
			await act(async () => {
				await user.type(messageInput, "short");
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});
			await waitFor(() =>
				expect(messageInput).toHaveAttribute("aria-invalid", "true"),
			);
			expect(
				await screen.findByText(messageMinLengthError),
			).toBeInTheDocument();
		});

		it('shows error for empty phone when phone contact is "可" (after typing and clearing) and sets aria-invalid', async () => {
			render(<ContactEmailForm />);
			await act(async () => {
				await user.click(screen.getByRole("radio", { name: "可" }));
			});
			const phoneInput = await screen.findByLabelText(/電話番号/);
			await act(async () => {
				await user.type(phoneInput, "1");
				await user.clear(phoneInput);
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});
			await waitFor(() =>
				expect(phoneInput).toHaveAttribute("aria-invalid", "true"),
			);
			expect(await screen.findByText(phoneFormatError)).toBeInTheDocument();
		});

		it('shows error for invalid phone format when phone contact is "可" and phone is filled, sets aria-invalid', async () => {
			render(<ContactEmailForm />);
			await act(async () => {
				await user.click(screen.getByRole("radio", { name: "可" }));
			});
			const phoneInput = await screen.findByLabelText(/電話番号/);
			await act(async () => {
				await user.type(phoneInput, "12345");
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});
			await waitFor(() =>
				expect(phoneInput).toHaveAttribute("aria-invalid", "true"),
			);
			expect(await screen.findByText(phoneFormatError)).toBeInTheDocument();
		});
	});

	describe("Conditional Display of Phone Number Field", () => {
		it('shows phone number field with asterisk when "可" is selected', async () => {
			render(<ContactEmailForm />);
			expect(screen.queryByLabelText(/電話番号/)).not.toBeInTheDocument();
			await act(async () => {
				await user.click(screen.getByRole("radio", { name: "可" }));
			});
			const phoneInput = (await screen.findByLabelText(
				/電話番号/,
			)) as HTMLInputElement;
			expect(phoneInput).toBeInTheDocument();
			expect(phoneInput.labels?.[0]?.textContent).toMatch(/電話番号\s*\*/);
		});

		it('hides phone number field when "不可" is selected after being "可"', async () => {
			render(<ContactEmailForm />);
			await act(async () => {
				await user.click(screen.getByRole("radio", { name: "可" }));
			});
			expect(await screen.findByLabelText(/電話番号/)).toBeInTheDocument();
			await act(async () => {
				await user.click(screen.getByRole("radio", { name: "不可" }));
			});
			expect(screen.queryByLabelText(/電話番号/)).not.toBeInTheDocument();
		});
	});

	describe("Form Submission Logic", () => {
		const validMessage = "This is a valid message, long enough for tests.";

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
			await act(async () => {
				await fillValidForm(false);
			});

			const buttonBeforeClick = screen.getByRole("button", {
				name: "送信する",
			});
			expect(buttonBeforeClick).not.toBeDisabled();

			await act(async () => {
				await user.click(buttonBeforeClick);
			});

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
			await act(async () => {
				await fillValidForm(true);
			});

			await act(async () => {
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});

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
			const validationErrorResponse: ActionError = {
				name: "ValidationError",
				code: "VALIDATION_ERROR",
				message: "Server validation failed.",
				details: { fieldErrors: { name: [serverErrorMessage] } },
			};
			mockSubmitContactForm.mockResolvedValueOnce(validationErrorResponse);

			render(<ContactEmailForm />);
			await act(async () => {
				await fillValidForm();
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});

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
			const serverErrorResponse: ActionError = {
				name: "ServerError",
				code: "INTERNAL_SERVER_ERROR",
				message: genericErrorMessage,
			};
			mockSubmitContactForm.mockResolvedValueOnce(serverErrorResponse);
			render(<ContactEmailForm />);
			await act(async () => {
				await fillValidForm();
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});

			await waitFor(() =>
				expect(mockSubmitContactForm).toHaveBeenCalledTimes(1),
			);
			expect(await screen.findByText(genericErrorMessage)).toBeInTheDocument();
		});

		it("handles server error with no specific message", async () => {
			const serverErrorResponse: ActionError = {
				name: "ServerError",
				code: "INTERNAL_SERVER_ERROR",
				message: "An error occurred",
			};
			mockSubmitContactForm.mockResolvedValueOnce(serverErrorResponse);
			render(<ContactEmailForm />);
			await act(async () => {
				await fillValidForm();
				await user.click(screen.getByRole("button", { name: "送信する" }));
			});

			await waitFor(() =>
				expect(mockSubmitContactForm).toHaveBeenCalledTimes(1),
			);
			expect(
				await screen.findByText(
					"送信に失敗しました。後ほど再度お試しください。",
				),
			).toBeInTheDocument();
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
			await act(async () => {
				await fillValidForm();
			});

			const buttonBeforeClick = screen.getByRole("button", {
				name: "送信する",
			});
			await act(async () => {
				await userEvent.click(buttonBeforeClick);
			});

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
