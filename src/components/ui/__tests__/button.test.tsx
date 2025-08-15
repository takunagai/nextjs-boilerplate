import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { render } from "@/test-utils";
import { Button, buttonVariants } from "../button";

describe("Button", () => {
	describe("基本的な動作", () => {
		it("ボタンがレンダリングされる", () => {
			render(<Button>Click me</Button>);

			const button = screen.getByRole("button", { name: "Click me" });
			expect(button).toBeInTheDocument();
		});

		it("onClickハンドラーが動作する", () => {
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Click me</Button>);

			const button = screen.getByRole("button", { name: "Click me" });
			fireEvent.click(button);

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("disabledプロパティが動作する", () => {
			render(<Button disabled>Disabled Button</Button>);

			const button = screen.getByRole("button", { name: "Disabled Button" });
			expect(button).toBeDisabled();
			expect(button).toHaveClass(
				"disabled:pointer-events-none",
				"disabled:opacity-50",
			);
		});

		it("typeプロパティが正しく設定される", () => {
			render(<Button type="submit">Submit</Button>);

			const button = screen.getByRole("button", { name: "Submit" });
			expect(button).toHaveAttribute("type", "submit");
		});
	});

	describe("バリアント", () => {
		const variants = [
			{
				variant: "default",
				expectedClasses: ["bg-primary", "text-primary-foreground"],
			},
			{
				variant: "destructive",
				expectedClasses: ["bg-destructive", "text-white"],
			},
			{ variant: "success", expectedClasses: ["bg-green-600", "text-white"] },
			{ variant: "warning", expectedClasses: ["bg-yellow-500", "text-white"] },
			{ variant: "outline", expectedClasses: ["border", "bg-background"] },
			{
				variant: "secondary",
				expectedClasses: ["bg-secondary", "text-secondary-foreground"],
			},
			{
				variant: "ghost",
				expectedClasses: ["hover:bg-accent", "hover:text-accent-foreground"],
			},
			{
				variant: "link",
				expectedClasses: ["text-primary", "underline-offset-4"],
			},
			{
				variant: "hero",
				expectedClasses: ["bg-white/10", "text-white", "border-white/20"],
			},
		] as const;

		variants.forEach(({ variant, expectedClasses }) => {
			it(`${variant} バリアントが適用される`, () => {
				render(<Button variant={variant}>{variant}</Button>);
				const button = screen.getByRole("button", { name: variant });
				expect(button).toHaveClass(...expectedClasses);
			});
		});
	});

	describe("サイズ", () => {
		const sizes = [
			{
				size: "default",
				expectedClasses: ["h-9", "px-4", "py-2"],
				text: "Default Size",
			},
			{ size: "sm", expectedClasses: ["h-8", "px-3"], text: "Small" },
			{ size: "lg", expectedClasses: ["h-10", "px-6"], text: "Large" },
			{
				size: "icon",
				expectedClasses: ["size-9"],
				text: "Icon Button",
				ariaLabel: "Icon Button",
			},
		] as const;

		sizes.forEach(({ size, expectedClasses, text, ariaLabel }) => {
			it(`${size} サイズが適用される`, () => {
				const props = ariaLabel ? { "aria-label": ariaLabel } : {};
				render(
					<Button size={size} {...props}>
						{ariaLabel ? "🔍" : text}
					</Button>,
				);

				const button = ariaLabel
					? screen.getByRole("button", { name: ariaLabel })
					: screen.getByRole("button", { name: text });
				expect(button).toHaveClass(...expectedClasses);
			});
		});
	});

	describe("高度な機能", () => {
		it("asChild プロパティが機能する", () => {
			render(
				<Button asChild>
					<a href="/test">Link Button</a>
				</Button>,
			);

			const link = screen.getByRole("link", { name: "Link Button" });
			expect(link).toHaveAttribute("href", "/test");
			expect(link).toHaveClass("bg-primary", "text-primary-foreground");
		});

		it("カスタムクラス名が適用される", () => {
			render(<Button className="custom-class">Custom</Button>);

			const button = screen.getByRole("button", { name: "Custom" });
			expect(button).toHaveClass("custom-class", "bg-primary");
		});

		it("data-slot 属性が設定される", () => {
			render(<Button>Test</Button>);

			const button = screen.getByRole("button", { name: "Test" });
			expect(button).toHaveAttribute("data-slot", "button");
		});
	});

	describe("buttonVariants 関数", () => {
		it("指定したバリアント・サイズのクラスを生成する", () => {
			const classes = buttonVariants({ variant: "destructive", size: "lg" });

			expect(classes).toContain("bg-destructive");
			expect(classes).toContain("h-10");
		});

		it("デフォルト値が適用される", () => {
			const classes = buttonVariants({});

			expect(classes).toContain("bg-primary");
			expect(classes).toContain("h-9");
		});
	});
});
