import { screen } from "@testing-library/react";
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
	form: createMockForm({
		handleSubmit: createMockFormHandleSubmit({ email: "", password: "" }),
	}),
	isLoading: false,
	error: null,
	handleLogin: vi.fn(),
	resetError: vi.fn(),
	...overrides,
});

describe("LoginForm - バリデーション", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		mockUseAuth.mockReturnValue(createMockAuthContext());
		mockUseRouter.mockReturnValue(createMockRouter());
		mockUseLoginForm.mockReturnValue(createDefaultUseLoginFormReturnValue());
	});

	describe("入力フィールドのバリデーション", () => {
		it("メールアドレスのバリデーションエラーを表示する", () => {
			const errorMessage = "有効なメールアドレスを入力してください。";
			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({
					form: createMockForm({
						formState: { errors: { email: { message: errorMessage } } },
					}),
				}),
			);

			render(<LoginForm />);
			expect(screen.getByText(errorMessage)).toBeInTheDocument();
		});

		it("パスワードのバリデーションエラーを表示する", () => {
			const errorMessage = "パスワードを入力してください。";
			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({
					form: createMockForm({
						formState: { errors: { password: { message: errorMessage } } },
					}),
				}),
			);

			render(<LoginForm />);
			expect(screen.getByText(errorMessage)).toBeInTheDocument();
		});

		it("複数のバリデーションエラーを同時に表示する", () => {
			const emailError = "メールアドレスは必須です。";
			const passwordError = "パスワードは6文字以上です。";

			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({
					form: createMockForm({
						formState: {
							errors: {
								email: { message: emailError },
								password: { message: passwordError },
							},
						},
					}),
				}),
			);

			render(<LoginForm />);
			expect(screen.getByText(emailError)).toBeInTheDocument();
			expect(screen.getByText(passwordError)).toBeInTheDocument();
		});
	});

	describe("サーバーエラーの表示", () => {
		it("APIエラーメッセージを表示する", () => {
			const errorMessage = "メールアドレスまたはパスワードが正しくありません。";
			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({ error: errorMessage }),
			);

			render(<LoginForm />);
			expect(screen.getByText(errorMessage)).toBeInTheDocument();
		});

		it("ネットワークエラーメッセージを表示する", () => {
			const errorMessage = "ネットワークエラーが発生しました。";
			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({ error: errorMessage }),
			);

			render(<LoginForm />);
			expect(screen.getByText(errorMessage)).toBeInTheDocument();
		});
	});
});
