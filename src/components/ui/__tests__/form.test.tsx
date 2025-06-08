import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import * as React from "react";
import { vi } from "vitest";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from "../form";
import "@testing-library/jest-dom";

// テスト用のフォームコンポーネント
function TestForm({ children }: { children: React.ReactNode }) {
	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
		},
	});

	return <Form {...form}>{children}</Form>;
}

describe("Form Components", () => {
	describe("Form", () => {
		it("FormProviderとして機能する", () => {
			render(
				<TestForm>
					<div>Form Content</div>
				</TestForm>
			);

			expect(screen.getByText("Form Content")).toBeInTheDocument();
		});
	});

	describe("FormField", () => {
		it("フィールドコンテキストを提供する", () => {
			render(
				<TestForm>
					<FormField
						name="username"
						render={({ field }) => (
							<input {...field} data-testid="username-input" />
						)}
					/>
				</TestForm>
			);

			const input = screen.getByTestId("username-input");
			expect(input).toBeInTheDocument();
			expect(input).toHaveAttribute("name", "username");
		});
	});

	describe("FormItem", () => {
		it("適切なクラス名でレンダリングされる", () => {
			render(
				<TestForm>
					<FormItem data-testid="form-item">
						<div>Item Content</div>
					</FormItem>
				</TestForm>
			);

			const formItem = screen.getByTestId("form-item");
			expect(formItem).toHaveClass("space-y-2");
		});

		it("カスタムクラス名を適用できる", () => {
			render(
				<TestForm>
					<FormItem className="custom-class" data-testid="form-item">
						<div>Item Content</div>
					</FormItem>
				</TestForm>
			);

			const formItem = screen.getByTestId("form-item");
			expect(formItem).toHaveClass("space-y-2", "custom-class");
		});
	});

	describe("FormLabel", () => {
		it("通常のラベルとしてレンダリングされる", () => {
			render(
				<TestForm>
					<FormField
						name="username"
						render={() => (
							<FormItem>
								<FormLabel>ユーザー名</FormLabel>
							</FormItem>
						)}
					/>
				</TestForm>
			);

			expect(screen.getByText("ユーザー名")).toBeInTheDocument();
		});

		it("エラー時は適切なクラスが適用される", () => {
			const TestFormWithError = () => {
				const form = useForm({
					defaultValues: { username: "" },
				});

				// エラーを手動で設定
				React.useEffect(() => {
					form.setError("username", {
						type: "required",
						message: "必須項目です",
					});
				}, [form]);

				return (
					<Form {...form}>
						<FormField
							name="username"
							render={() => (
								<FormItem>
									<FormLabel>ユーザー名</FormLabel>
								</FormItem>
							)}
						/>
					</Form>
				);
			};

			render(<TestFormWithError />);

			const label = screen.getByText("ユーザー名");
			expect(label).toHaveClass("text-destructive");
		});
	});

	describe("FormControl", () => {
		it("適切なaria属性が設定される", () => {
			render(
				<TestForm>
					<FormField
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<input {...field} data-testid="control-input" />
								</FormControl>
								<FormDescription>ユーザー名を入力してください</FormDescription>
							</FormItem>
						)}
					/>
				</TestForm>
			);

			const input = screen.getByTestId("control-input");
			expect(input).toHaveAttribute("aria-invalid", "false");
			expect(input).toHaveAttribute("aria-describedby");
		});

		it("エラー時は適切なaria属性が設定される", () => {
			const TestFormWithError = () => {
				const form = useForm({
					defaultValues: { username: "" },
				});

				React.useEffect(() => {
					form.setError("username", {
						type: "required",
						message: "必須項目です",
					});
				}, [form]);

				return (
					<Form {...form}>
						<FormField
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<input {...field} data-testid="control-input" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Form>
				);
			};

			render(<TestFormWithError />);

			const input = screen.getByTestId("control-input");
			expect(input).toHaveAttribute("aria-invalid", "true");
		});
	});

	describe("FormDescription", () => {
		it("説明テキストが表示される", () => {
			render(
				<TestForm>
					<FormField
						name="username"
						render={() => (
							<FormItem>
								<FormDescription>
									3文字以上で入力してください
								</FormDescription>
							</FormItem>
						)}
					/>
				</TestForm>
			);

			const description = screen.getByText("3文字以上で入力してください");
			expect(description).toBeInTheDocument();
			expect(description).toHaveClass("text-sm", "text-muted-foreground");
		});

		it("カスタムクラス名を適用できる", () => {
			render(
				<TestForm>
					<FormField
						name="username"
						render={() => (
							<FormItem>
								<FormDescription className="custom-description">
									説明文
								</FormDescription>
							</FormItem>
						)}
					/>
				</TestForm>
			);

			const description = screen.getByText("説明文");
			expect(description).toHaveClass("text-sm", "text-muted-foreground", "custom-description");
		});
	});

	describe("FormMessage", () => {
		it("エラーメッセージが表示される", () => {
			const TestFormWithError = () => {
				const form = useForm({
					defaultValues: { username: "" },
				});

				React.useEffect(() => {
					form.setError("username", {
						type: "required",
						message: "ユーザー名は必須です",
					});
				}, [form]);

				return (
					<Form {...form}>
						<FormField
							name="username"
							render={() => (
								<FormItem>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Form>
				);
			};

			render(<TestFormWithError />);

			const errorMessage = screen.getByText("ユーザー名は必須です");
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage).toHaveClass("text-sm", "font-medium", "text-destructive");
		});

		it("エラーがない場合は何も表示されない", () => {
			render(
				<TestForm>
					<FormField
						name="username"
						render={() => (
							<FormItem>
								<FormMessage data-testid="form-message" />
							</FormItem>
						)}
					/>
				</TestForm>
			);

			expect(screen.queryByTestId("form-message")).not.toBeInTheDocument();
		});

		it("カスタムメッセージを表示できる", () => {
			render(
				<TestForm>
					<FormField
						name="username"
						render={() => (
							<FormItem>
								<FormMessage>カスタムメッセージ</FormMessage>
							</FormItem>
						)}
					/>
				</TestForm>
			);

			expect(screen.getByText("カスタムメッセージ")).toBeInTheDocument();
		});
	});

	describe("useFormField", () => {
		it("FormFieldコンテキスト外で使用するとエラーをスローする", () => {
			const TestComponent = () => {
				useFormField();
				return null;
			};

			// コンソールエラーを抑制
			const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

			expect(() => {
				render(<TestComponent />);
			}).toThrow("useFormField should be used within <FormField>");

			consoleSpy.mockRestore();
		});

		it("FormField内で正しい値を返す", () => {
			let fieldInfo: any;

			const TestComponent = () => {
				fieldInfo = useFormField();
				return null;
			};

			render(
				<TestForm>
					<FormField
						name="username"
						render={() => (
							<FormItem>
								<TestComponent />
							</FormItem>
						)}
					/>
				</TestForm>
			);

			expect(fieldInfo).toHaveProperty("name", "username");
			expect(fieldInfo).toHaveProperty("id");
			expect(fieldInfo).toHaveProperty("formItemId");
			expect(fieldInfo).toHaveProperty("formDescriptionId");
			expect(fieldInfo).toHaveProperty("formMessageId");
		});
	});

	describe("統合テスト", () => {
		it("完全なフォームフィールドが正しくレンダリングされる", () => {
			render(
				<TestForm>
					<FormField
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>メールアドレス</FormLabel>
								<FormControl>
									<input
										type="email"
										placeholder="email@example.com"
										{...field}
										data-testid="email-input"
									/>
								</FormControl>
								<FormDescription>
									有効なメールアドレスを入力してください
								</FormDescription>
							</FormItem>
						)}
					/>
				</TestForm>
			);

			expect(screen.getByText("メールアドレス")).toBeInTheDocument();
			expect(screen.getByTestId("email-input")).toBeInTheDocument();
			expect(screen.getByText("有効なメールアドレスを入力してください")).toBeInTheDocument();
		});

		it("複数のフォームフィールドが独立して動作する", () => {
			render(
				<TestForm>
					<FormField
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ユーザー名</FormLabel>
								<FormControl>
									<input {...field} data-testid="username-input" />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>メールアドレス</FormLabel>
								<FormControl>
									<input {...field} data-testid="email-input" />
								</FormControl>
							</FormItem>
						)}
					/>
				</TestForm>
			);

			const usernameInput = screen.getByTestId("username-input");
			const emailInput = screen.getByTestId("email-input");

			expect(usernameInput).toHaveAttribute("name", "username");
			expect(emailInput).toHaveAttribute("name", "email");
		});
	});
});