import { render, screen } from "@testing-library/react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../pagination";
import { vi } from "vitest";

// アイコンのモック
vi.mock("react-icons/lu", () => ({
	LuChevronLeft: () => <div data-testid="chevron-left-icon" />,
	LuChevronRight: () => <div data-testid="chevron-right-icon" />,
	LuEllipsis: () => <div data-testid="ellipsis-icon" />,
}));

describe("Pagination Components", () => {
	describe("Pagination", () => {
		it("ナビゲーション要素がレンダリングされる", () => {
			render(
				<Pagination>
					<div>Pagination Content</div>
				</Pagination>,
			);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();
			expect(nav).toHaveAttribute("aria-label", "pagination");
			expect(nav).toHaveAttribute("data-slot", "pagination");
		});

		it("適切なクラス名が適用される", () => {
			render(
				<Pagination>
					<div>Content</div>
				</Pagination>,
			);

			const nav = screen.getByRole("navigation");
			expect(nav).toHaveClass("mx-auto", "flex", "w-full", "justify-center");
		});

		it("カスタムクラス名が適用される", () => {
			render(
				<Pagination className="custom-pagination">
					<div>Content</div>
				</Pagination>,
			);

			const nav = screen.getByRole("navigation");
			expect(nav).toHaveClass("custom-pagination");
		});
	});

	describe("PaginationContent", () => {
		it("ulリストがレンダリングされる", () => {
			render(
				<PaginationContent>
					<li>Item 1</li>
					<li>Item 2</li>
				</PaginationContent>,
			);

			const list = screen.getByRole("list");
			expect(list).toBeInTheDocument();
			expect(list).toHaveAttribute("data-slot", "pagination-content");
		});

		it("適切なクラス名が適用される", () => {
			render(
				<PaginationContent>
					<li>Item</li>
				</PaginationContent>,
			);

			const list = screen.getByRole("list");
			expect(list).toHaveClass("flex", "flex-row", "items-center", "gap-1");
		});

		it("カスタムクラス名が適用される", () => {
			render(
				<PaginationContent className="custom-content">
					<li>Item</li>
				</PaginationContent>,
			);

			const list = screen.getByRole("list");
			expect(list).toHaveClass("custom-content");
		});
	});

	describe("PaginationItem", () => {
		it("liアイテムがレンダリングされる", () => {
			render(
				<ul>
					<PaginationItem>Item Content</PaginationItem>
				</ul>,
			);

			const item = screen.getByText("Item Content");
			expect(item).toBeInTheDocument();
			expect(item).toHaveAttribute("data-slot", "pagination-item");
			expect(item.tagName).toBe("LI");
		});

		it("追加のプロパティが渡される", () => {
			render(
				<ul>
					<PaginationItem id="test-item" data-testid="pagination-item">
						Content
					</PaginationItem>
				</ul>,
			);

			const item = screen.getByTestId("pagination-item");
			expect(item).toHaveAttribute("id", "test-item");
		});
	});

	describe("PaginationLink", () => {
		it("リンクがレンダリングされる", () => {
			render(<PaginationLink href="/page/2">2</PaginationLink>);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "/page/2");
			expect(link).toHaveAttribute("data-slot", "pagination-link");
			expect(link).toHaveTextContent("2");
		});

		it("アクティブでない場合の状態", () => {
			render(<PaginationLink href="/page/2">2</PaginationLink>);

			const link = screen.getByRole("link");
			expect(link).not.toHaveAttribute("aria-current");
		});

		it("アクティブな場合の状態", () => {
			render(
				<PaginationLink href="/page/2" isActive={true}>
					2
				</PaginationLink>,
			);

			const link = screen.getByRole("link");
			expect(link).toHaveAttribute("data-active", "true");
			expect(link).toHaveAttribute("aria-current", "page");
		});

		it("デフォルトサイズがiconに設定される", () => {
			render(<PaginationLink href="/page/2">2</PaginationLink>);

			const link = screen.getByRole("link");
			// buttonVariantsのiconサイズが適用されることを確認
			expect(link).toHaveClass("size-9");
		});

		it("カスタムサイズが適用される", () => {
			render(
				<PaginationLink href="/page/2" size="default">
					2
				</PaginationLink>,
			);

			const link = screen.getByRole("link");
			// buttonVariantsのdefaultサイズが適用されることを確認
			expect(link).toHaveClass("h-9");
		});

		it("カスタムクラス名が適用される", () => {
			render(
				<PaginationLink href="/page/2" className="custom-link">
					2
				</PaginationLink>,
			);

			const link = screen.getByRole("link");
			expect(link).toHaveClass("custom-link");
		});
	});

	describe("PaginationPrevious", () => {
		it("前のページリンクがレンダリングされる", () => {
			render(<PaginationPrevious href="/page/1" />);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "/page/1");
			expect(link).toHaveAttribute("aria-label", "Go to previous page");
		});

		it("シェブロンアイコンが表示される", () => {
			render(<PaginationPrevious href="/page/1" />);

			expect(screen.getByTestId("chevron-left-icon")).toBeInTheDocument();
		});

		it("Previous テキストが表示される", () => {
			render(<PaginationPrevious href="/page/1" />);

			const previousText = screen.getByText("Previous");
			expect(previousText).toBeInTheDocument();
			expect(previousText).toHaveClass("hidden", "sm:block");
		});

		it("適切なクラス名が適用される", () => {
			render(<PaginationPrevious href="/page/1" />);

			const link = screen.getByRole("link");
			expect(link).toHaveClass("gap-1", "px-2.5", "sm:pl-2.5");
		});

		it("カスタムクラス名が適用される", () => {
			render(<PaginationPrevious href="/page/1" className="custom-prev" />);

			const link = screen.getByRole("link");
			expect(link).toHaveClass("custom-prev");
		});
	});

	describe("PaginationNext", () => {
		it("次のページリンクがレンダリングされる", () => {
			render(<PaginationNext href="/page/3" />);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "/page/3");
			expect(link).toHaveAttribute("aria-label", "Go to next page");
		});

		it("シェブロンアイコンが表示される", () => {
			render(<PaginationNext href="/page/3" />);

			expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument();
		});

		it("Next テキストが表示される", () => {
			render(<PaginationNext href="/page/3" />);

			const nextText = screen.getByText("Next");
			expect(nextText).toBeInTheDocument();
			expect(nextText).toHaveClass("hidden", "sm:block");
		});

		it("適切なクラス名が適用される", () => {
			render(<PaginationNext href="/page/3" />);

			const link = screen.getByRole("link");
			expect(link).toHaveClass("gap-1", "px-2.5", "sm:pr-2.5");
		});

		it("カスタムクラス名が適用される", () => {
			render(<PaginationNext href="/page/3" className="custom-next" />);

			const link = screen.getByRole("link");
			expect(link).toHaveClass("custom-next");
		});
	});

	describe("PaginationEllipsis", () => {
		it("省略記号がレンダリングされる", () => {
			render(<PaginationEllipsis />);

			const ellipsis = screen.getByText("More pages");
			expect(ellipsis.parentElement).toBeInTheDocument();
			expect(ellipsis.parentElement).toHaveAttribute(
				"data-slot",
				"pagination-ellipsis",
			);
			expect(ellipsis.parentElement).toHaveAttribute("aria-hidden", "true");
		});

		it("省略記号アイコンが表示される", () => {
			render(<PaginationEllipsis />);

			expect(screen.getByTestId("ellipsis-icon")).toBeInTheDocument();
		});

		it("スクリーンリーダー用テキストが含まれる", () => {
			render(<PaginationEllipsis />);

			const srText = screen.getByText("More pages");
			expect(srText).toBeInTheDocument();
			expect(srText).toHaveClass("sr-only");
		});

		it("適切なクラス名が適用される", () => {
			render(<PaginationEllipsis data-testid="ellipsis" />);

			const ellipsis = screen.getByTestId("ellipsis");
			expect(ellipsis).toHaveClass(
				"flex",
				"size-9",
				"items-center",
				"justify-center",
			);
		});

		it("カスタムクラス名が適用される", () => {
			render(
				<PaginationEllipsis
					className="custom-ellipsis"
					data-testid="ellipsis"
				/>,
			);

			const ellipsis = screen.getByTestId("ellipsis");
			expect(ellipsis).toHaveClass("custom-ellipsis");
		});
	});

	describe("統合テスト", () => {
		it("完全なページネーションが正しくレンダリングされる", () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/2" isActive={true}>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/3">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="/page/3" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			);

			// ナビゲーション要素が存在
			expect(screen.getByRole("navigation")).toBeInTheDocument();

			// リストが存在
			expect(screen.getByRole("list")).toBeInTheDocument();

			// 全てのリンクが存在
			const links = screen.getAllByRole("link");
			expect(links).toHaveLength(5); // Previous, 1, 2, 3, Next

			// アクティブページが正しく設定されている
			const activePage = screen.getByText("2");
			expect(activePage).toHaveAttribute("aria-current", "page");

			// 省略記号が存在
			expect(screen.getByText("More pages")).toBeInTheDocument();
		});

		it("アクセシビリティ属性が正しく設定される", () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" isActive={true}>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			);

			// ナビゲーションのaria-label
			const nav = screen.getByRole("navigation");
			expect(nav).toHaveAttribute("aria-label", "pagination");

			// アクティブページのaria-current
			const activeLink = screen.getByText("1");
			expect(activeLink).toHaveAttribute("aria-current", "page");

			// 省略記号のaria-hidden
			const ellipsisContainer = screen.getByText("More pages").parentElement;
			expect(ellipsisContainer).toHaveAttribute("aria-hidden", "true");
		});
	});

	describe("エッジケース", () => {
		it("子要素がない場合でも正しくレンダリングされる", () => {
			render(<Pagination />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();
		});

		it("PaginationLinkでisActiveがundefinedの場合", () => {
			render(<PaginationLink href="/page/1">1</PaginationLink>);

			const link = screen.getByRole("link");
			expect(link).not.toHaveAttribute("aria-current");
		});

		it("追加のプロパティが各コンポーネントに正しく渡される", () => {
			render(
				<Pagination id="main-pagination" data-testid="pagination">
					<PaginationContent id="content" data-testid="content">
						<PaginationItem id="item" data-testid="item">
							<PaginationLink href="/page/1" id="link" data-testid="link">
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			);

			expect(screen.getByTestId("pagination")).toHaveAttribute(
				"id",
				"main-pagination",
			);
			expect(screen.getByTestId("content")).toHaveAttribute("id", "content");
			expect(screen.getByTestId("item")).toHaveAttribute("id", "item");
			expect(screen.getByTestId("link")).toHaveAttribute("id", "link");
		});
	});
});
