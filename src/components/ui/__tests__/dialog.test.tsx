import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "../dialog";
import { vi } from "vitest";

// Radix UIのモック
vi.mock("@radix-ui/react-dialog", () => ({
	Root: ({ children, onOpenChange, ...props }: any) => (
		<div data-testid="dialog-root" data-props={JSON.stringify(props)}>
			{children}
		</div>
	),
	Trigger: ({ children, onClick, ...props }: any) => (
		<button
			data-testid="dialog-trigger"
			onClick={onClick}
			data-props={JSON.stringify(props)}
		>
			{children}
		</button>
	),
	Portal: ({ children }: any) => (
		<div data-testid="dialog-portal">{children}</div>
	),
	Overlay: ({ className, ...props }: any) => (
		<div
			data-testid="dialog-overlay"
			className={className}
			data-props={JSON.stringify(props)}
		/>
	),
	Content: ({ children, className, ...props }: any) => (
		<div
			data-testid="dialog-content"
			className={className}
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
	Close: ({ children, className, onClick, ...props }: any) => (
		<button
			data-testid="dialog-close"
			className={className}
			onClick={onClick}
			data-props={JSON.stringify(props)}
		>
			{children}
		</button>
	),
	Title: ({ children, className, ...props }: any) => (
		<h2
			data-testid="dialog-title"
			className={className}
			data-props={JSON.stringify(props)}
		>
			{children}
		</h2>
	),
	Description: ({ children, className, ...props }: any) => (
		<p
			data-testid="dialog-description"
			className={className}
			data-props={JSON.stringify(props)}
		>
			{children}
		</p>
	),
}));

// アイコンのモック
vi.mock("react-icons/fa6", () => ({
	FaXmark: () => <div data-testid="close-icon" />,
}));

describe("Dialog Components", () => {
	describe("Dialog", () => {
		it("Dialog ルートがレンダリングされる", () => {
			render(
				<Dialog>
					<div>Dialog Content</div>
				</Dialog>
			);

			expect(screen.getByTestId("dialog-root")).toBeInTheDocument();
			expect(screen.getByText("Dialog Content")).toBeInTheDocument();
		});

		it("data-slot属性が設定される", () => {
			render(
				<Dialog>
					<div>Content</div>
				</Dialog>
			);

			const root = screen.getByTestId("dialog-root");
			const props = JSON.parse(root.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dialog");
		});

		it("プロパティが正しく渡される", () => {
			const onOpenChange = vi.fn();
			render(
				<Dialog open={true} onOpenChange={onOpenChange}>
					<div>Content</div>
				</Dialog>
			);

			const root = screen.getByTestId("dialog-root");
			const props = JSON.parse(root.getAttribute("data-props") || "{}");
			expect(props.open).toBe(true);
		});
	});

	describe("DialogTrigger", () => {
		it("トリガーボタンがレンダリングされる", () => {
			render(
				<DialogTrigger>
					<button>Open Dialog</button>
				</DialogTrigger>
			);

			expect(screen.getByTestId("dialog-trigger")).toBeInTheDocument();
			expect(screen.getByText("Open Dialog")).toBeInTheDocument();
		});

		it("data-slot属性が設定される", () => {
			render(
				<DialogTrigger>
					<button>Open</button>
				</DialogTrigger>
			);

			const trigger = screen.getByTestId("dialog-trigger");
			const props = JSON.parse(trigger.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dialog-trigger");
		});
	});

	describe("DialogContent", () => {
		it("コンテンツとオーバーレイがレンダリングされる", () => {
			render(
				<DialogContent>
					<div>Dialog Content</div>
				</DialogContent>
			);

			expect(screen.getByTestId("dialog-portal")).toBeInTheDocument();
			expect(screen.getByTestId("dialog-overlay")).toBeInTheDocument();
			expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
			expect(screen.getByText("Dialog Content")).toBeInTheDocument();
		});

		it("自動的に閉じるボタンが含まれる", () => {
			render(
				<DialogContent>
					<div>Content</div>
				</DialogContent>
			);

			const closeButton = screen.getByTestId("dialog-close");
			expect(closeButton).toBeInTheDocument();
			expect(screen.getByTestId("close-icon")).toBeInTheDocument();
			expect(screen.getByText("閉じる")).toBeInTheDocument();
		});

		it("適切なクラス名が適用される", () => {
			render(
				<DialogContent>
					<div>Content</div>
				</DialogContent>
			);

			const content = screen.getByTestId("dialog-content");
			expect(content).toHaveClass(
				"bg-background",
				"fixed",
				"top-[50%]",
				"left-[50%]",
				"z-50",
				"grid",
				"w-full",
				"max-w-[calc(100%-2rem)]",
				"translate-x-[-50%]",
				"translate-y-[-50%]",
				"gap-4",
				"rounded-lg",
				"border",
				"p-6",
				"shadow-lg",
				"duration-200",
				"sm:max-w-lg"
			);
		});

		it("カスタムクラス名が適用される", () => {
			render(
				<DialogContent className="custom-class">
					<div>Content</div>
				</DialogContent>
			);

			const content = screen.getByTestId("dialog-content");
			expect(content).toHaveClass("custom-class");
		});

		it("data-slot属性が設定される", () => {
			render(
				<DialogContent>
					<div>Content</div>
				</DialogContent>
			);

			const content = screen.getByTestId("dialog-content");
			const props = JSON.parse(content.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dialog-content");
		});
	});

	describe("DialogHeader", () => {
		it("ヘッダーがレンダリングされる", () => {
			render(
				<DialogHeader>
					<h2>Dialog Title</h2>
				</DialogHeader>
			);

			expect(screen.getByText("Dialog Title")).toBeInTheDocument();
		});

		it("適切なクラス名が適用される", () => {
			render(
				<DialogHeader data-testid="dialog-header">
					<h2>Title</h2>
				</DialogHeader>
			);

			const header = screen.getByTestId("dialog-header");
			expect(header).toHaveClass("flex", "flex-col", "gap-2", "text-center", "sm:text-left");
			expect(header).toHaveAttribute("data-slot", "dialog-header");
		});

		it("カスタムクラス名が適用される", () => {
			render(
				<DialogHeader className="custom-header" data-testid="dialog-header">
					<h2>Title</h2>
				</DialogHeader>
			);

			const header = screen.getByTestId("dialog-header");
			expect(header).toHaveClass("custom-header");
		});
	});

	describe("DialogFooter", () => {
		it("フッターがレンダリングされる", () => {
			render(
				<DialogFooter>
					<button>Cancel</button>
					<button>OK</button>
				</DialogFooter>
			);

			expect(screen.getByText("Cancel")).toBeInTheDocument();
			expect(screen.getByText("OK")).toBeInTheDocument();
		});

		it("適切なクラス名が適用される", () => {
			render(
				<DialogFooter data-testid="dialog-footer">
					<button>Action</button>
				</DialogFooter>
			);

			const footer = screen.getByTestId("dialog-footer");
			expect(footer).toHaveClass(
				"flex",
				"flex-col-reverse",
				"gap-2",
				"sm:flex-row",
				"sm:justify-end"
			);
			expect(footer).toHaveAttribute("data-slot", "dialog-footer");
		});
	});

	describe("DialogTitle", () => {
		it("タイトルがレンダリングされる", () => {
			render(<DialogTitle>Dialog Title</DialogTitle>);

			expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
			expect(screen.getByText("Dialog Title")).toBeInTheDocument();
		});

		it("適切なクラス名が適用される", () => {
			render(<DialogTitle>Title</DialogTitle>);

			const title = screen.getByTestId("dialog-title");
			expect(title).toHaveClass("text-lg", "leading-none", "font-semibold", "tracking-tight");
		});

		it("data-slot属性が設定される", () => {
			render(<DialogTitle>Title</DialogTitle>);

			const title = screen.getByTestId("dialog-title");
			const props = JSON.parse(title.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dialog-title");
		});
	});

	describe("DialogDescription", () => {
		it("説明文がレンダリングされる", () => {
			render(<DialogDescription>Dialog description text</DialogDescription>);

			expect(screen.getByTestId("dialog-description")).toBeInTheDocument();
			expect(screen.getByText("Dialog description text")).toBeInTheDocument();
		});

		it("適切なクラス名が適用される", () => {
			render(<DialogDescription>Description</DialogDescription>);

			const description = screen.getByTestId("dialog-description");
			expect(description).toHaveClass("text-muted-foreground", "text-sm");
		});

		it("data-slot属性が設定される", () => {
			render(<DialogDescription>Description</DialogDescription>);

			const description = screen.getByTestId("dialog-description");
			const props = JSON.parse(description.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dialog-description");
		});
	});

	describe("DialogClose", () => {
		it("閉じるボタンがレンダリングされる", () => {
			render(
				<DialogClose>
					<button>Close</button>
				</DialogClose>
			);

			expect(screen.getByTestId("dialog-close")).toBeInTheDocument();
			expect(screen.getByText("Close")).toBeInTheDocument();
		});

		it("data-slot属性が設定される", () => {
			render(
				<DialogClose>
					<button>Close</button>
				</DialogClose>
			);

			const close = screen.getByTestId("dialog-close");
			const props = JSON.parse(close.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dialog-close");
		});
	});

	describe("統合テスト", () => {
		it("完全なダイアログが正しくレンダリングされる", () => {
			render(
				<Dialog>
					<DialogTrigger>
						<button>Open Dialog</button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirmation</DialogTitle>
							<DialogDescription>
								Are you sure you want to continue?
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose>
								<button>Cancel</button>
							</DialogClose>
							<button>Confirm</button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			);

			// 全ての要素が存在することを確認
			expect(screen.getByText("Open Dialog")).toBeInTheDocument();
			expect(screen.getByText("Confirmation")).toBeInTheDocument();
			expect(screen.getByText("Are you sure you want to continue?")).toBeInTheDocument();
			expect(screen.getByText("Cancel")).toBeInTheDocument();
			expect(screen.getByText("Confirm")).toBeInTheDocument();
		});

		it("ダイアログコンテンツのアニメーションクラスが適用される", () => {
			render(
				<DialogContent>
					<div>Content</div>
				</DialogContent>
			);

			const content = screen.getByTestId("dialog-content");
			expect(content).toHaveClass(
				"data-[state=open]:animate-in",
				"data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0",
				"data-[state=open]:fade-in-0",
				"data-[state=closed]:zoom-out-95",
				"data-[state=open]:zoom-in-95"
			);
		});

		it("オーバーレイのアニメーションクラスが適用される", () => {
			render(
				<DialogContent>
					<div>Content</div>
				</DialogContent>
			);

			const overlay = screen.getByTestId("dialog-overlay");
			expect(overlay).toHaveClass(
				"data-[state=open]:animate-in",
				"data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0",
				"data-[state=open]:fade-in-0",
				"fixed",
				"inset-0",
				"z-50",
				"bg-black/80"
			);
		});
	});
});