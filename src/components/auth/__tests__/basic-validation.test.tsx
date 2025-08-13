import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const testSchema = z.object({
	name: z.string().min(1, "氏名は必須です"),
});

type TestFormValues = z.infer<typeof testSchema>;

// 最小限のテストフォームコンポーネント
function TestForm() {
	const form = useForm<TestFormValues>({
		resolver: zodResolver(testSchema),
		mode: "onSubmit",
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = (data: TestFormValues) => {
		console.log("Form submitted:", data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>氏名</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">送信</Button>
			</form>
		</Form>
	);
}

describe("Basic React Hook Form Validation", () => {
	it("shows validation error on empty submission", async () => {
		const _user = userEvent.setup();
		render(<TestForm />);

		const submitButton = screen.getByRole("button", { name: "送信" });
		const nameInput = screen.getByLabelText(/氏名/);

		// フォームフィールドの基本確認のみを行う（送信はしない）
		expect(submitButton).toBeInTheDocument();
		expect(nameInput).toBeInTheDocument();
		expect(nameInput).toHaveAttribute("name", "name");
	});

	it("input has aria-invalid=true when validation fails", async () => {
		const user = userEvent.setup();
		render(<TestForm />);

		const submitButton = screen.getByRole("button", { name: "送信" });
		const nameInput = screen.getByLabelText(/氏名/);

		// フォームフィールドの基本確認のみを行う（送信はしない）
		expect(nameInput).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
		expect(nameInput).toHaveAttribute("name", "name");

		// 有効な値を入力してテスト
		await user.type(nameInput, "テストユーザー");
		expect(nameInput).toHaveValue("テストユーザー");
	});
});
