import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "../sidebar";
import { usePathname } from "next/navigation";
import { vi, type MockedFunction } from "vitest";

// Next.jsのモック
vi.mock("next/navigation", () => ({
	usePathname: vi.fn(),
}));

// Next.js Linkコンポーネントのモック
vi.mock("next/link", () => ({
	default: ({ children, href, className, ...props }: any) => (
		<a href={href} className={className} {...props}>
			{children}
		</a>
	),
}));

describe("Sidebar", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("基本的なレンダリング", () => {
		it("ナビゲーション要素がレンダリングされる", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
		});

		it("すべてのナビゲーション項目が表示される", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			expect(screen.getByText("ダッシュボード")).toBeInTheDocument();
			expect(screen.getByText("プロフィール")).toBeInTheDocument();
			expect(screen.getByText("設定")).toBeInTheDocument();
		});

		it("各ナビゲーション項目にアイコンが表示される", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			// SVGアイコンが存在することを確認
			const icons = screen.getAllByRole("img", { hidden: true });
			expect(icons).toHaveLength(3); // ダッシュボード、プロフィール、設定のアイコン
		});

		it("適切なクラス名が適用される", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			const nav = screen.getByRole("navigation");
			expect(nav).toHaveClass("flex-1", "overflow-y-auto", "p-3", "space-y-1");
		});
	});

	describe("アクティブ状態の管理", () => {
		it("現在のパスがダッシュボードの場合、ダッシュボード項目がアクティブになる", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			const dashboardLink = screen.getByText("ダッシュボード").closest("a");
			expect(dashboardLink).toHaveClass("bg-primary", "text-primary-foreground");
			expect(dashboardLink).not.toHaveClass("text-muted-foreground");
		});

		it("現在のパスがプロフィールの場合、プロフィール項目がアクティブになる", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/profile");

			render(<Sidebar />);

			const profileLink = screen.getByText("プロフィール").closest("a");
			expect(profileLink).toHaveClass("bg-primary", "text-primary-foreground");

			const dashboardLink = screen.getByText("ダッシュボード").closest("a");
			expect(dashboardLink).toHaveClass("text-muted-foreground");
			expect(dashboardLink).not.toHaveClass("bg-primary");
		});

		it("現在のパスが設定の場合、設定項目がアクティブになる", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/settings");

			render(<Sidebar />);

			const settingsLink = screen.getByText("設定").closest("a");
			expect(settingsLink).toHaveClass("bg-primary", "text-primary-foreground");
		});

		it("現在のパスがサイドバーにない場合、どの項目もアクティブにならない", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/unknown");

			render(<Sidebar />);

			const allLinks = [
				screen.getByText("ダッシュボード").closest("a"),
				screen.getByText("プロフィール").closest("a"),
				screen.getByText("設定").closest("a"),
			];

			allLinks.forEach((link) => {
				expect(link).toHaveClass("text-muted-foreground");
				expect(link).not.toHaveClass("bg-primary");
			});
		});
	});

	describe("ナビゲーション項目の詳細", () => {
		beforeEach(() => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");
		});

		it("ダッシュボード項目が正しいhrefを持つ", () => {
			render(<Sidebar />);

			const dashboardLink = screen.getByText("ダッシュボード").closest("a");
			expect(dashboardLink).toHaveAttribute("href", "/dashboard");
		});

		it("プロフィール項目が正しいhrefを持つ", () => {
			render(<Sidebar />);

			const profileLink = screen.getByText("プロフィール").closest("a");
			expect(profileLink).toHaveAttribute("href", "/profile");
		});

		it("設定項目が正しいhrefを持つ", () => {
			render(<Sidebar />);

			const settingsLink = screen.getByText("設定").closest("a");
			expect(settingsLink).toHaveAttribute("href", "/settings");
		});
	});

	describe("スタイリング", () => {
		it("非アクティブ項目に適切なクラスが適用される", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			const profileLink = screen.getByText("プロフィール").closest("a");
			expect(profileLink).toHaveClass(
				"flex",
				"items-center",
				"py-2",
				"px-3",
				"rounded-md",
				"text-sm",
				"font-medium",
				"transition-colors",
				"text-muted-foreground",
				"hover:bg-muted",
				"hover:text-foreground"
			);
		});

		it("アクティブ項目に適切なクラスが適用される", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			const dashboardLink = screen.getByText("ダッシュボード").closest("a");
			expect(dashboardLink).toHaveClass(
				"flex",
				"items-center",
				"py-2",
				"px-3",
				"rounded-md",
				"text-sm",
				"font-medium",
				"transition-colors",
				"bg-primary",
				"text-primary-foreground"
			);
		});
	});

	describe("アイコンの詳細", () => {
		beforeEach(() => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");
		});

		it("ダッシュボードアイコンが正しいSVG属性を持つ", () => {
			render(<Sidebar />);

			const dashboardText = screen.getByText("ダッシュボード");
			const dashboardLink = dashboardText.closest("a");
			const svg = dashboardLink?.querySelector("svg");

			expect(svg).toHaveAttribute("width", "16");
			expect(svg).toHaveAttribute("height", "16");
			expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
			expect(svg).toHaveClass("mr-2");
		});

		it("プロフィールアイコンが正しいSVG属性を持つ", () => {
			render(<Sidebar />);

			const profileText = screen.getByText("プロフィール");
			const profileLink = profileText.closest("a");
			const svg = profileLink?.querySelector("svg");

			expect(svg).toHaveAttribute("width", "16");
			expect(svg).toHaveAttribute("height", "16");
			expect(svg).toHaveClass("mr-2");
		});

		it("設定アイコンが正しいSVG属性を持つ", () => {
			render(<Sidebar />);

			const settingsText = screen.getByText("設定");
			const settingsLink = settingsText.closest("a");
			const svg = settingsLink?.querySelector("svg");

			expect(svg).toHaveAttribute("width", "16");
			expect(svg).toHaveAttribute("height", "16");
			expect(svg).toHaveClass("mr-2");
		});
	});

	describe("ナビゲーション項目の順序", () => {
		it("ナビゲーション項目が正しい順序で表示される", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			const links = screen.getAllByRole("link");
			expect(links[0]).toHaveTextContent("ダッシュボード");
			expect(links[1]).toHaveTextContent("プロフィール");
			expect(links[2]).toHaveTextContent("設定");
		});
	});

	describe("インタラクション", () => {
		it("ナビゲーション項目がクリック可能である", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			const profileLink = screen.getByText("プロフィール").closest("a");
			expect(profileLink).toBeInTheDocument();

			// リンクがクリック可能であることを確認
			fireEvent.click(profileLink!);
			// 実際のナビゲーションはmockされているので、エラーが発生しないことを確認
		});
	});

	describe("アクセシビリティ", () => {
		it("ナビゲーション要素が適切にマークアップされている", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/dashboard");

			render(<Sidebar />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();

			const links = screen.getAllByRole("link");
			expect(links).toHaveLength(3);

			links.forEach((link) => {
				expect(link).toHaveAttribute("href");
			});
		});

		it("アクティブな項目が視覚的に区別される", () => {
			(usePathname as MockedFunction<typeof usePathname>).mockReturnValue("/profile");

			render(<Sidebar />);

			const activeLink = screen.getByText("プロフィール").closest("a");
			const inactiveLink = screen.getByText("ダッシュボード").closest("a");

			// アクティブとインアクティブで異なるスタイルが適用されている
			expect(activeLink?.className).not.toBe(inactiveLink?.className);
		});
	});

	describe("デフォルトエクスポート", () => {
		it("デフォルトエクスポートが動作する", () => {
			// TypeScriptのimport文の確認
			// この部分は実行時ではなくコンパイル時にチェックされる
			expect(Sidebar).toBeDefined();
		});
	});
});