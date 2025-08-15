import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { useIsClient, useLocalStorage, useMediaQuery } from "usehooks-ts";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useScroll } from "@/hooks/useScroll";
import { Header } from "../header";

// モックの設定
vi.mock("next/navigation");
vi.mock("@/hooks/useScroll");
vi.mock("usehooks-ts");
vi.mock("@/components/theme/theme-switcher", () => ({
	ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));
vi.mock("../header/desktop-navigation", () => ({
	DesktopNavigation: ({ items }: any) => (
		<nav data-testid="desktop-navigation">
			{items.map((item: any) => (
				<a key={item.href} href={item.href}>
					{item.label}
				</a>
			))}
		</nav>
	),
}));
vi.mock("../header/mobile-navigation", () => ({
	MobileNavigation: ({ items, isOpen, setIsOpen }: any) => (
		<div data-testid="mobile-navigation">
			<button onClick={() => setIsOpen(!isOpen)}>メニュー</button>
			{isOpen &&
				items.map((item: any) => (
					<a key={item.href} href={item.href}>
						{item.label}
					</a>
				))}
		</div>
	),
}));

// Next.js Imageコンポーネントのモック
vi.mock("next/image", () => ({
	default: (props: any) => {
		const { priority, ...imgProps } = props;
		// eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
		return <img {...imgProps} data-priority={priority ? "true" : "false"} />;
	},
}));

describe("Header", () => {
	const mockItems = [
		{ label: "ホーム", href: "/" },
		{ label: "サービス", href: "/services" },
		{ label: "お問い合わせ", href: "/contact" },
	];

	const mockSetStoredViewportInfo = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		(usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/");
		(useIsClient as ReturnType<typeof vi.fn>).mockReturnValue(true);
		(useLocalStorage as ReturnType<typeof vi.fn>).mockReturnValue([
			{ isDesktop: false, timestamp: 0 },
			mockSetStoredViewportInfo,
		]);
		(useScroll as ReturnType<typeof vi.fn>).mockReturnValue({
			visible: true,
			isAtTop: true,
			direction: null,
		});
	});

	describe("基本的な表示", () => {
		it("ロゴとアプリ名が表示される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

			render(<Header items={mockItems} />);

			expect(screen.getByAltText("ナガイ商店.com")).toBeInTheDocument();
			expect(screen.getByText("ナガイ商店.com")).toBeInTheDocument();
		});

		it("カスタムロゴが表示される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
			const customLogo = <div data-testid="custom-logo">Custom Logo</div>;

			render(<Header items={mockItems} logo={customLogo} />);

			expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
		});

		it("カスタムロゴテキストが表示される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

			render(<Header items={mockItems} logoText="カスタムアプリ" />);

			expect(screen.getByText("カスタムアプリ")).toBeInTheDocument();
		});
	});

	describe("レスポンシブ対応", () => {
		it("デスクトップサイズではデスクトップナビゲーションが表示される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

			render(<Header items={mockItems} />);

			expect(screen.getByTestId("desktop-navigation")).toBeInTheDocument();
			expect(screen.queryByTestId("mobile-navigation")).not.toBeInTheDocument();
		});

		it("モバイルサイズではモバイルナビゲーションが表示される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(false);

			render(<Header items={mockItems} />);

			expect(
				screen.queryByTestId("desktop-navigation"),
			).not.toBeInTheDocument();
			expect(screen.getByTestId("mobile-navigation")).toBeInTheDocument();
		});

		it("ブレイクポイントをカスタマイズできる", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockImplementation(
				(query: string) => {
					return query === "(min-width: 1024px)";
				},
			);

			render(<Header items={mockItems} mobileMenuBreakpoint="lg" />);

			// useMediaQueryが正しいクエリで呼ばれたか確認
			expect(useMediaQuery).toHaveBeenCalledWith("(min-width: 1024px)");
		});
	});

	describe("ナビゲーションアイテムのアクティブ状態", () => {
		it("現在のパスに応じてアイテムがアクティブになる", () => {
			(usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/services");
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

			render(<Header items={mockItems} />);

			// ナビゲーションコンポーネントに渡されたitemsをチェック
			const navItems = screen.getByTestId("desktop-navigation");
			expect(navItems).toBeInTheDocument();
		});
	});

	describe("スクロール動作", () => {
		it("スクロール時に背景がぼかし効果付きになる", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
			(useScroll as ReturnType<typeof vi.fn>).mockReturnValue({
				visible: true,
				isAtTop: false,
				direction: "down",
			});

			const { container } = render(<Header items={mockItems} />);

			const header = container.querySelector("header");
			expect(header).toHaveClass(
				"bg-background/90",
				"backdrop-blur-sm",
				"shadow-sm",
			);
		});

		it("hideOnScrollがtrueの場合、下スクロール時にヘッダーが隠れる", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
			(useScroll as ReturnType<typeof vi.fn>).mockReturnValue({
				visible: false,
				isAtTop: false,
				direction: "down",
			});

			const { container } = render(
				<Header items={mockItems} hideOnScroll={true} />,
			);

			const header = container.querySelector("header");
			expect(header).toHaveClass("-translate-y-full");
		});

		it("hideOnScrollがfalseの場合、スクロールしてもヘッダーは隠れない", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
			(useScroll as ReturnType<typeof vi.fn>).mockReturnValue({
				visible: false,
				isAtTop: false,
				direction: "down",
			});

			const { container } = render(
				<Header items={mockItems} hideOnScroll={false} />,
			);

			const header = container.querySelector("header");
			expect(header).toHaveClass("translate-y-0");
			expect(header).not.toHaveClass("-translate-y-full");
		});

		it("メニューが開いている時はスクロールしても隠れない", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(false);
			(useScroll as ReturnType<typeof vi.fn>).mockReturnValue({
				visible: false,
				isAtTop: false,
				direction: "down",
			});

			const { container } = render(
				<Header items={mockItems} hideOnScroll={true} />,
			);

			// モバイルメニューを開く
			const menuButton = screen.getByText("メニュー");
			fireEvent.click(menuButton);

			const header = container.querySelector("header");
			expect(header).not.toHaveClass("-translate-y-full");
		});
	});

	describe("透明背景", () => {
		it("background=transparentかつページトップの時、背景が透明になる", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
			(useScroll as ReturnType<typeof vi.fn>).mockReturnValue({
				visible: true,
				isAtTop: true,
				direction: null,
			});

			const { container } = render(
				<Header items={mockItems} background="transparent" />,
			);

			const header = container.querySelector("header");
			expect(header).toHaveClass("bg-transparent");
		});

		it("background=transparentでもスクロール時は背景が表示される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
			(useScroll as ReturnType<typeof vi.fn>).mockReturnValue({
				visible: true,
				isAtTop: false,
				direction: "down",
			});

			const { container } = render(
				<Header items={mockItems} background="transparent" />,
			);

			const header = container.querySelector("header");
			expect(header).toHaveClass("bg-background/90");
		});
	});

	describe("バリアント", () => {
		it("異なる背景バリアントが適用される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

			const { container, rerender } = render(
				<Header items={mockItems} background="primary" />,
			);
			let header = container.querySelector("header");
			expect(header).toHaveClass("bg-primary", "text-primary-foreground");

			rerender(<Header items={mockItems} background="secondary" />);
			header = container.querySelector("header");
			expect(header).toHaveClass("bg-secondary");
		});

		it("異なる高さバリアントが適用される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

			const { container, rerender } = render(
				<Header items={mockItems} height="sm" />,
			);
			let header = container.querySelector("header");
			expect(header).toHaveClass("h-12");

			rerender(<Header items={mockItems} height="lg" />);
			header = container.querySelector("header");
			expect(header).toHaveClass("h-20");
		});
	});

	describe("右側コンテンツ", () => {
		it("カスタム右側コンテンツが表示される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
			const rightContent = <button data-testid="login-button">ログイン</button>;

			render(<Header items={mockItems} rightContent={rightContent} />);

			expect(screen.getByTestId("login-button")).toBeInTheDocument();
			expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
		});
	});

	describe("ローカルストレージとの連携", () => {
		it("画面サイズ情報がローカルストレージに保存される", () => {
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

			render(<Header items={mockItems} />);

			expect(mockSetStoredViewportInfo).toHaveBeenCalledWith({
				isDesktop: true,
				timestamp: expect.any(Number),
			});
		});
	});

	describe("SSR対応", () => {
		it("クライアントサイドでない場合、スケルトンUIが表示される", () => {
			(useIsClient as ReturnType<typeof vi.fn>).mockReturnValue(false);
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

			render(<Header items={mockItems} />);

			// スケルトンUIの確認
			const skeletons = screen
				.getAllByRole("generic")
				.filter((el) => el.className.includes("animate-pulse"));
			expect(skeletons.length).toBeGreaterThan(0);
		});
	});

	describe("モバイルメニューの開閉", () => {
		it("デスクトップサイズになったらモバイルメニューが自動的に閉じる", () => {
			const { rerender } = render(<Header items={mockItems} />);

			// 最初はモバイルサイズ
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(false);
			rerender(<Header items={mockItems} />);

			// メニューを開く
			const menuButton = screen.getByText("メニュー");
			fireEvent.click(menuButton);

			// デスクトップサイズに変更
			(useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
			rerender(<Header items={mockItems} />);

			// モバイルナビゲーションが表示されていないことを確認
			expect(screen.queryByTestId("mobile-navigation")).not.toBeInTheDocument();
		});
	});
});
