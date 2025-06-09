import { render, screen, fireEvent } from "@testing-library/react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from "../dropdown-menu";
import { vi } from "vitest";

// Radix UIのモック
vi.mock("@radix-ui/react-dropdown-menu", () => ({
	Root: ({ children, ...props }: any) => (
		<div data-testid="dropdown-menu-root" data-props={JSON.stringify(props)}>
			{children}
		</div>
	),
	Portal: ({ children }: any) => (
		<div data-testid="dropdown-menu-portal">{children}</div>
	),
	Trigger: ({ children, ...props }: any) => (
		<button
			data-testid="dropdown-menu-trigger"
			data-props={JSON.stringify(props)}
		>
			{children}
		</button>
	),
	Content: ({ children, className, sideOffset, ...props }: any) => (
		<div
			data-testid="dropdown-menu-content"
			className={className}
			data-side-offset={sideOffset}
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
	Group: ({ children, ...props }: any) => (
		<div data-testid="dropdown-menu-group" data-props={JSON.stringify(props)}>
			{children}
		</div>
	),
	Item: ({ children, className, "data-inset": dataInset, "data-variant": dataVariant, ...props }: any) => (
		<div
			data-testid="dropdown-menu-item"
			className={className}
			data-inset={dataInset}
			data-variant={dataVariant}
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
	Label: ({ children, className, "data-inset": dataInset, ...props }: any) => (
		<div
			data-testid="dropdown-menu-label"
			className={className}
			data-inset={dataInset}
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
	Separator: ({ className, ...props }: any) => (
		<div
			data-testid="dropdown-menu-separator"
			className={className}
			data-props={JSON.stringify(props)}
		/>
	),
	CheckboxItem: ({ children, className, checked, ...props }: any) => (
		<div
			data-testid="dropdown-menu-checkbox-item"
			className={className}
			data-checked={checked}
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
	ItemIndicator: ({ children }: any) => (
		<span data-testid="item-indicator">{children}</span>
	),
	RadioGroup: ({ children, ...props }: any) => (
		<div
			data-testid="dropdown-menu-radio-group"
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
	RadioItem: ({ children, className, ...props }: any) => (
		<div
			data-testid="dropdown-menu-radio-item"
			className={className}
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
	Sub: ({ children, ...props }: any) => (
		<div data-testid="dropdown-menu-sub" data-props={JSON.stringify(props)}>
			{children}
		</div>
	),
	SubTrigger: ({ children, className, "data-inset": dataInset, ...props }: any) => (
		<div
			data-testid="dropdown-menu-sub-trigger"
			className={className}
			data-inset={dataInset}
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
	SubContent: ({ children, className, ...props }: any) => (
		<div
			data-testid="dropdown-menu-sub-content"
			className={className}
			data-props={JSON.stringify(props)}
		>
			{children}
		</div>
	),
}));

// アイコンのモック
vi.mock("react-icons/fa6", () => ({
	FaCheck: () => <div data-testid="check-icon" />,
	FaChevronRight: () => <div data-testid="chevron-right-icon" />,
	FaCircle: () => <div data-testid="circle-icon" />,
}));

describe("DropdownMenu Components", () => {
	describe("DropdownMenu", () => {
		it("ルートコンポーネントがレンダリングされる", () => {
			render(
				<DropdownMenu>
					<div>Menu Content</div>
				</DropdownMenu>,
			);

			expect(screen.getByTestId("dropdown-menu-root")).toBeInTheDocument();
			expect(screen.getByText("Menu Content")).toBeInTheDocument();
		});

		it("data-slot属性が設定される", () => {
			render(
				<DropdownMenu>
					<div>Content</div>
				</DropdownMenu>,
			);

			const root = screen.getByTestId("dropdown-menu-root");
			const props = JSON.parse(root.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dropdown-menu");
		});
	});

	describe("DropdownMenuTrigger", () => {
		it("トリガーがレンダリングされる", () => {
			render(
				<DropdownMenuTrigger>
					<span>Open Menu</span>
				</DropdownMenuTrigger>,
			);

			expect(screen.getByTestId("dropdown-menu-trigger")).toBeInTheDocument();
			expect(screen.getByText("Open Menu")).toBeInTheDocument();
		});

		it("data-slot属性が設定される", () => {
			render(
				<DropdownMenuTrigger>
					<span>Trigger</span>
				</DropdownMenuTrigger>,
			);

			const trigger = screen.getByTestId("dropdown-menu-trigger");
			const props = JSON.parse(trigger.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dropdown-menu-trigger");
		});
	});

	describe("DropdownMenuContent", () => {
		it("コンテンツがポータル内にレンダリングされる", () => {
			render(
				<DropdownMenuContent>
					<div>Menu Items</div>
				</DropdownMenuContent>,
			);

			expect(screen.getByTestId("dropdown-menu-portal")).toBeInTheDocument();
			expect(screen.getByTestId("dropdown-menu-content")).toBeInTheDocument();
			expect(screen.getByText("Menu Items")).toBeInTheDocument();
		});

		it("デフォルトのsideOffsetが設定される", () => {
			render(
				<DropdownMenuContent>
					<div>Content</div>
				</DropdownMenuContent>,
			);

			const content = screen.getByTestId("dropdown-menu-content");
			expect(content).toHaveAttribute("data-side-offset", "4");
		});

		it("カスタムsideOffsetが設定される", () => {
			render(
				<DropdownMenuContent sideOffset={8}>
					<div>Content</div>
				</DropdownMenuContent>,
			);

			const content = screen.getByTestId("dropdown-menu-content");
			expect(content).toHaveAttribute("data-side-offset", "8");
		});

		it("適切なクラス名が適用される", () => {
			render(
				<DropdownMenuContent>
					<div>Content</div>
				</DropdownMenuContent>,
			);

			const content = screen.getByTestId("dropdown-menu-content");
			expect(content).toHaveClass(
				"bg-popover",
				"text-popover-foreground",
				"z-50",
				"min-w-[8rem]",
				"rounded-md",
				"border",
				"p-1",
				"shadow-md",
			);
		});
	});

	describe("DropdownMenuGroup", () => {
		it("グループがレンダリングされる", () => {
			render(
				<DropdownMenuGroup>
					<div>Group Items</div>
				</DropdownMenuGroup>,
			);

			expect(screen.getByTestId("dropdown-menu-group")).toBeInTheDocument();
			expect(screen.getByText("Group Items")).toBeInTheDocument();
		});
	});

	describe("DropdownMenuItem", () => {
		it("アイテムがレンダリングされる", () => {
			render(<DropdownMenuItem>Menu Item</DropdownMenuItem>);

			expect(screen.getByTestId("dropdown-menu-item")).toBeInTheDocument();
			expect(screen.getByText("Menu Item")).toBeInTheDocument();
		});

		it("デフォルトバリアントが設定される", () => {
			render(<DropdownMenuItem>Item</DropdownMenuItem>);

			const item = screen.getByTestId("dropdown-menu-item");
			expect(item).toHaveAttribute("data-variant", "default");
		});

		it("destructiveバリアントが設定される", () => {
			render(<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>);

			const item = screen.getByTestId("dropdown-menu-item");
			expect(item).toHaveAttribute("data-variant", "destructive");
		});

		it("insetプロパティが設定される", () => {
			render(<DropdownMenuItem inset>Inset Item</DropdownMenuItem>);

			const item = screen.getByTestId("dropdown-menu-item");
			expect(item).toHaveAttribute("data-inset", "true");
		});

		it("適切なクラス名が適用される", () => {
			render(<DropdownMenuItem>Item</DropdownMenuItem>);

			const item = screen.getByTestId("dropdown-menu-item");
			expect(item).toHaveClass(
				"relative",
				"flex",
				"cursor-default",
				"items-center",
				"gap-2",
				"rounded-sm",
				"px-2",
				"py-1.5",
				"text-sm",
			);
		});
	});

	describe("DropdownMenuLabel", () => {
		it("ラベルがレンダリングされる", () => {
			render(<DropdownMenuLabel>Section Label</DropdownMenuLabel>);

			expect(screen.getByTestId("dropdown-menu-label")).toBeInTheDocument();
			expect(screen.getByText("Section Label")).toBeInTheDocument();
		});

		it("insetプロパティが設定される", () => {
			render(<DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>);

			const label = screen.getByTestId("dropdown-menu-label");
			expect(label).toHaveAttribute("data-inset", "true");
		});

		it("適切なクラス名が適用される", () => {
			render(<DropdownMenuLabel>Label</DropdownMenuLabel>);

			const label = screen.getByTestId("dropdown-menu-label");
			expect(label).toHaveClass("px-2", "py-1.5", "text-sm", "font-medium");
		});
	});

	describe("DropdownMenuSeparator", () => {
		it("セパレーターがレンダリングされる", () => {
			render(<DropdownMenuSeparator />);

			expect(screen.getByTestId("dropdown-menu-separator")).toBeInTheDocument();
		});

		it("適切なクラス名が適用される", () => {
			render(<DropdownMenuSeparator />);

			const separator = screen.getByTestId("dropdown-menu-separator");
			expect(separator).toHaveClass("bg-border", "-mx-1", "my-1", "h-px");
		});
	});

	describe("DropdownMenuShortcut", () => {
		it("ショートカットがレンダリングされる", () => {
			render(<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>);

			expect(screen.getByText("⌘K")).toBeInTheDocument();
		});

		it("適切なクラス名が適用される", () => {
			render(<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>);

			const shortcut = screen.getByText("⌘K");
			expect(shortcut).toHaveClass(
				"text-muted-foreground",
				"ml-auto",
				"text-xs",
				"tracking-widest",
			);
		});

		it("data-slot属性が設定される", () => {
			render(<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>);

			const shortcut = screen.getByText("⌘K");
			expect(shortcut).toHaveAttribute("data-slot", "dropdown-menu-shortcut");
		});
	});

	describe("DropdownMenuCheckboxItem", () => {
		it("チェックボックスアイテムがレンダリングされる", () => {
			render(
				<DropdownMenuCheckboxItem checked={true}>
					Show Toolbar
				</DropdownMenuCheckboxItem>,
			);

			expect(
				screen.getByTestId("dropdown-menu-checkbox-item"),
			).toBeInTheDocument();
			expect(screen.getByText("Show Toolbar")).toBeInTheDocument();
		});

		it("チェック状態が設定される", () => {
			render(
				<DropdownMenuCheckboxItem checked={true}>
					Checked Item
				</DropdownMenuCheckboxItem>,
			);

			const item = screen.getByTestId("dropdown-menu-checkbox-item");
			expect(item).toHaveAttribute("data-checked", "true");
		});

		it("チェックアイコンが表示される", () => {
			render(
				<DropdownMenuCheckboxItem checked={true}>
					Item
				</DropdownMenuCheckboxItem>,
			);

			expect(screen.getByTestId("check-icon")).toBeInTheDocument();
		});
	});

	describe("DropdownMenuRadioGroup & DropdownMenuRadioItem", () => {
		it("ラジオグループとアイテムがレンダリングされる", () => {
			render(
				<DropdownMenuRadioGroup>
					<DropdownMenuRadioItem value="option1">
						Option 1
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="option2">
						Option 2
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>,
			);

			expect(
				screen.getByTestId("dropdown-menu-radio-group"),
			).toBeInTheDocument();
			expect(screen.getAllByTestId("dropdown-menu-radio-item")).toHaveLength(2);
			expect(screen.getByText("Option 1")).toBeInTheDocument();
			expect(screen.getByText("Option 2")).toBeInTheDocument();
		});

		it("ラジオアイコンが表示される", () => {
			render(
				<DropdownMenuRadioItem value="option">
					Radio Option
				</DropdownMenuRadioItem>,
			);

			expect(screen.getByTestId("circle-icon")).toBeInTheDocument();
		});
	});

	describe("サブメニュー", () => {
		it("サブメニューコンポーネントがレンダリングされる", () => {
			render(
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Sub Item</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>,
			);

			expect(screen.getByTestId("dropdown-menu-sub")).toBeInTheDocument();
			expect(
				screen.getByTestId("dropdown-menu-sub-trigger"),
			).toBeInTheDocument();
			expect(
				screen.getByTestId("dropdown-menu-sub-content"),
			).toBeInTheDocument();
			expect(screen.getByText("More Options")).toBeInTheDocument();
			expect(screen.getByText("Sub Item")).toBeInTheDocument();
		});

		it("サブトリガーにシェブロンアイコンが表示される", () => {
			render(<DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>);

			expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument();
		});

		it("サブトリガーのinsetプロパティが設定される", () => {
			render(
				<DropdownMenuSubTrigger inset>Inset Submenu</DropdownMenuSubTrigger>,
			);

			const trigger = screen.getByTestId("dropdown-menu-sub-trigger");
			expect(trigger).toHaveAttribute("data-inset", "true");
		});
	});

	describe("統合テスト", () => {
		it("完全なドロップダウンメニューが正しくレンダリングされる", () => {
			render(
				<DropdownMenu>
					<DropdownMenuTrigger>
						<span>Menu</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			);

			// 全ての要素が存在することを確認
			expect(screen.getByText("Menu")).toBeInTheDocument();
			expect(screen.getByText("Actions")).toBeInTheDocument();
			expect(screen.getByText("Profile")).toBeInTheDocument();
			expect(screen.getByText("Settings")).toBeInTheDocument();
			expect(screen.getByText("Delete")).toBeInTheDocument();
			expect(screen.getAllByTestId("dropdown-menu-separator")).toHaveLength(2);
		});

		it("アニメーションクラスが適用される", () => {
			render(
				<DropdownMenuContent>
					<div>Content</div>
				</DropdownMenuContent>,
			);

			const content = screen.getByTestId("dropdown-menu-content");
			expect(content).toHaveClass(
				"data-[state=open]:animate-in",
				"data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0",
				"data-[state=open]:fade-in-0",
			);
		});
	});

	describe("カスタマイゼーション", () => {
		it("カスタムクラス名が適用される", () => {
			render(
				<DropdownMenuItem className="custom-item">
					Custom Item
				</DropdownMenuItem>,
			);

			const item = screen.getByTestId("dropdown-menu-item");
			expect(item).toHaveClass("custom-item");
		});

		it("data-slot属性が各コンポーネントに設定される", () => {
			render(
				<DropdownMenuContent>
					<DropdownMenuItem>Item</DropdownMenuItem>
				</DropdownMenuContent>,
			);

			const content = screen.getByTestId("dropdown-menu-content");
			const props = JSON.parse(content.getAttribute("data-props") || "{}");
			expect(props["data-slot"]).toBe("dropdown-menu-content");

			const item = screen.getByTestId("dropdown-menu-item");
			const itemProps = JSON.parse(item.getAttribute("data-props") || "{}");
			expect(itemProps["data-slot"]).toBe("dropdown-menu-item");
		});
	});
});
