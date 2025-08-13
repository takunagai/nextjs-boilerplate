import { screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { 
	render,
	createMockAuthContext,
	createMockRouter,
	createMockForm,
	createMockFormHandleSubmit,
} from "@/test-utils";
import { useAuth } from "@/hooks/useAuth";
import { useLoginForm } from "@/hooks/useLoginForm";
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

describe("LoginForm - UI要素", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		mockUseAuth.mockReturnValue(createMockAuthContext());
		mockUseRouter.mockReturnValue(createMockRouter());
		mockUseLoginForm.mockReturnValue(createDefaultUseLoginFormReturnValue());
	});

	describe("基本的なレンダリング", () => {
		it("すべての必要な要素が表示される", () => {
			render(<LoginForm />);
			
			// タイトル
			expect(screen.getByText("メールアドレスでログイン")).toBeInTheDocument();
			
			// 入力フィールド
			expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
			expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
			
			// ボタン
			expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "パスワードをお忘れですか？" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "新規登録" })).toBeInTheDocument();
		});

		it("入力フィールドの属性が正しく設定される", () => {
			render(<LoginForm />);
			
			const emailInput = screen.getByLabelText("メールアドレス");
			expect(emailInput).toHaveAttribute("type", "email");
			expect(emailInput).toHaveAttribute("placeholder", "name@example.com");
			
			const passwordInput = screen.getByLabelText("パスワード");
			expect(passwordInput).toHaveAttribute("type", "password");
		});
	});

	describe("ローディング状態", () => {
		it("ローディング中は正しい表示になる", () => {
			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({ isLoading: true })
			);
			
			render(<LoginForm />);
			
			// ボタンテキストが変わる
			const loginButton = screen.getByRole("button", { name: "ログイン中..." });
			expect(loginButton).toBeInTheDocument();
			expect(loginButton).toBeDisabled();
			
			// 入力フィールドが無効化される
			expect(screen.getByLabelText("メールアドレス")).toBeDisabled();
			expect(screen.getByLabelText("パスワード")).toBeDisabled();
		});

		it("ローディング中は他のボタンも無効化される", () => {
			mockUseLoginForm.mockReturnValueOnce(
				createDefaultUseLoginFormReturnValue({ isLoading: true })
			);
			
			render(<LoginForm />);
			
			expect(screen.getByRole("button", { name: "パスワードをお忘れですか？" })).toBeDisabled();
			expect(screen.getByRole("button", { name: "新規登録" })).toBeDisabled();
		});
	});
});