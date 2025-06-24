import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
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
		it("defaultバリアントが適用される", () => {
			render(<Button variant="default">Default</Button>);

			const button = screen.getByRole("button", { name: "Default" });
			expect(button).toHaveClass("bg-primary", "text-primary-foreground");
		});

		it("destructiveバリアントが適用される", () => {
			render(<Button variant="destructive">Delete</Button>);

			const button = screen.getByRole("button", { name: "Delete" });
			expect(button).toHaveClass("bg-destructive", "text-white");
		});

		it("successバリアントが適用される", () => {
			render(<Button variant="success">Success</Button>);

			const button = screen.getByRole("button", { name: "Success" });
			expect(button).toHaveClass("bg-green-600", "text-white");
		});

		it("warningバリアントが適用される", () => {
			render(<Button variant="warning">Warning</Button>);

			const button = screen.getByRole("button", { name: "Warning" });
			expect(button).toHaveClass("bg-yellow-500", "text-white");
		});

		it("outlineバリアントが適用される", () => {
			render(<Button variant="outline">Outline</Button>);

			const button = screen.getByRole("button", { name: "Outline" });
			expect(button).toHaveClass("border", "bg-background");
		});

		it("secondaryバリアントが適用される", () => {
			render(<Button variant="secondary">Secondary</Button>);

			const button = screen.getByRole("button", { name: "Secondary" });
			expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
		});

		it("ghostバリアントが適用される", () => {
			render(<Button variant="ghost">Ghost</Button>);

			const button = screen.getByRole("button", { name: "Ghost" });
			expect(button).toHaveClass(
				"hover:bg-accent",
				"hover:text-accent-foreground",
			);
		});

		it("linkバリアントが適用される", () => {
			render(<Button variant="link">Link</Button>);

			const button = screen.getByRole("button", { name: "Link" });
			expect(button).toHaveClass("text-primary", "underline-offset-4");
		});

		it("heroバリアントが適用される", () => {
			render(<Button variant="hero">Hero</Button>);

			const button = screen.getByRole("button", { name: "Hero" });
			expect(button).toHaveClass(
				"bg-white/10",
				"text-white",
				"border-white/20",
			);
		});
	});

	describe("サイズ", () => {
		it("defaultサイズが適用される", () => {
			render(<Button size="default">Default Size</Button>);

			const button = screen.getByRole("button", { name: "Default Size" });
			expect(button).toHaveClass("h-9", "px-4", "py-2");
		});

		it("smサイズが適用される", () => {
			render(<Button size="sm">Small</Button>);

			const button = screen.getByRole("button", { name: "Small" });
			expect(button).toHaveClass("h-8", "px-3");
		});

		it("lgサイズが適用される", () => {
			render(<Button size="lg">Large</Button>);

			const button = screen.getByRole("button", { name: "Large" });
			expect(button).toHaveClass("h-10", "px-6");
		});

		it("iconサイズが適用される", () => {
			render(
				<Button size="icon" aria-label="Icon Button">
					🔍
				</Button>,
			);

			const button = screen.getByRole("button", { name: "Icon Button" });
			expect(button).toHaveClass("size-9");
		});
	});

	describe("asChildプロパティ", () => {
		it("asChild=trueの場合、子要素がボタンとしてレンダリングされる", () => {
			render(
				<Button asChild>
					<a href="/test">Link Button</a>
				</Button>,
			);

			const link = screen.getByRole("link", { name: "Link Button" });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "/test");
			expect(link).toHaveClass("bg-primary", "text-primary-foreground");
		});

		it("asChild=falseの場合、通常のボタンがレンダリングされる", () => {
			render(<Button asChild={false}>Normal Button</Button>);

			const button = screen.getByRole("button", { name: "Normal Button" });
			expect(button).toBeInTheDocument();
			expect(button.tagName).toBe("BUTTON");
		});
	});

	describe("カスタムクラス名", () => {
		it("カスタムクラス名が追加される", () => {
			render(<Button className="custom-class">Custom</Button>);

			const button = screen.getByRole("button", { name: "Custom" });
			expect(button).toHaveClass("custom-class");
			// デフォルトクラスも維持される
			expect(button).toHaveClass("bg-primary");
		});

		it("no-underlineクラスが常に適用される", () => {
			render(<Button>No Underline</Button>);

			const button = screen.getByRole("button", { name: "No Underline" });
			expect(button).toHaveClass("no-underline");
		});
	});

	describe("data属性", () => {
		it("data-slot属性が設定される", () => {
			render(<Button>Data Slot</Button>);

			const button = screen.getByRole("button", { name: "Data Slot" });
			expect(button).toHaveAttribute("data-slot", "button");
		});
	});

	describe("その他のプロパティ", () => {
		it("追加のプロパティが渡される", () => {
			render(
				<Button
					id="test-button"
					data-testid="custom-button"
					aria-label="Custom Label"
				>
					Props Test
				</Button>,
			);

			const button = screen.getByRole("button", { name: "Custom Label" });
			expect(button).toHaveAttribute("id", "test-button");
			expect(button).toHaveAttribute("data-testid", "custom-button");
		});
	});

	describe("buttonVariants関数", () => {
		it("バリアントクラスを直接生成できる", () => {
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

	describe("アクセシビリティ", () => {
		it("フォーカス時のスタイルが適用される", () => {
			render(<Button>Focus Test</Button>);

			const button = screen.getByRole("button", { name: "Focus Test" });
			expect(button).toHaveClass(
				"focus-visible:border-ring",
				"focus-visible:ring-ring/50",
			);
		});

		it("aria-invalid時のスタイルが適用される", () => {
			render(<Button aria-invalid="true">Invalid Button</Button>);

			const button = screen.getByRole("button", { name: "Invalid Button" });
			expect(button).toHaveClass(
				"aria-invalid:ring-destructive/20",
				"aria-invalid:border-destructive",
			);
		});
	});

	describe("アイコンのサポート", () => {
		it("SVGアイコンのデフォルトサイズが設定される", () => {
			render(
				<Button>
					<svg data-testid="icon">
						<path d="M0 0" />
					</svg>
					Icon Button
				</Button>,
			);

			const button = screen.getByRole("button", { name: "Icon Button" });
			expect(button).toHaveClass("[&_svg:not([class*='size-'])]:size-4");
			expect(button).toHaveClass("[&_svg]:shrink-0");
		});

		it("アイコンのポインターイベントが無効化される", () => {
			render(
				<Button>
					<svg data-testid="icon">
						<path d="M0 0" />
					</svg>
					Icon Button
				</Button>,
			);

			const button = screen.getByRole("button", { name: "Icon Button" });
			expect(button).toHaveClass("[&_svg]:pointer-events-none");
		});
	});
});
