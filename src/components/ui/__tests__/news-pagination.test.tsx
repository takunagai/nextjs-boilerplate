import { render, screen } from "@testing-library/react";
import { NewsPagination } from "../news-pagination";
import { vi } from "vitest";

// 定数のモック
vi.mock("@/lib/constants/news", () => ({
	QUERY_PARAMS: {
		page: "page",
		category: "category",
	},
}));

// アイコンのモック
vi.mock("react-icons/lu", () => ({
	LuChevronLeft: () => <div data-testid="chevron-left-icon" />,
	LuChevronRight: () => <div data-testid="chevron-right-icon" />,
	LuEllipsis: () => <div data-testid="ellipsis-icon" />,
}));

describe("NewsPagination", () => {
	const defaultProps = {
		totalPages: 10,
		currentPage: 3,
		items: [2, 3, 4],
		hasPreviousPage: true,
		hasNextPage: true,
		baseUrl: "/news",
	};

	describe("基本的なレンダリング", () => {
		it("ページネーションが正しくレンダリングされる", () => {
			render(<NewsPagination {...defaultProps} />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();
			expect(nav).toHaveAttribute("aria-label", "ページネーション");
		});

		it("totalPagesが1以下の場合は何も表示されない", () => {
			const { container } = render(
				<NewsPagination {...defaultProps} totalPages={1} />
			);

			expect(container.firstChild).toBeNull();
		});

		it("totalPagesが0の場合は何も表示されない", () => {
			const { container } = render(
				<NewsPagination {...defaultProps} totalPages={0} />
			);

			expect(container.firstChild).toBeNull();
		});
	});

	describe("ページ番号リンクの生成", () => {
		it("指定されたページ番号が表示される", () => {
			render(<NewsPagination {...defaultProps} />);

			expect(screen.getByText("2")).toBeInTheDocument();
			expect(screen.getByText("3")).toBeInTheDocument();
			expect(screen.getByText("4")).toBeInTheDocument();
		});

		it("現在のページがアクティブになる", () => {
			render(<NewsPagination {...defaultProps} />);

			const currentPageLink = screen.getByText("3");
			expect(currentPageLink).toHaveAttribute("aria-current", "page");
			expect(currentPageLink).toHaveClass("font-semibold");
		});

		it("各ページリンクが正しいURLを持つ", () => {
			render(<NewsPagination {...defaultProps} />);

			const page2Link = screen.getByText("2");
			expect(page2Link).toHaveAttribute("href", "/news?page=2");

			const page4Link = screen.getByText("4");
			expect(page4Link).toHaveAttribute("href", "/news?page=4");
		});

		it("カテゴリがある場合、URLにカテゴリパラメータが含まれる", () => {
			render(<NewsPagination {...defaultProps} category="tech" />);

			const page2Link = screen.getByText("2");
			expect(page2Link).toHaveAttribute("href", "/news?page=2&category=tech");
		});

		it("カテゴリが'all'の場合、カテゴリパラメータが含まれない", () => {
			render(<NewsPagination {...defaultProps} category="all" />);

			const page2Link = screen.getByText("2");
			expect(page2Link).toHaveAttribute("href", "/news?page=2");
		});
	});

	describe("前へ・次へボタン", () => {
		it("前のページがある場合、前へボタンが表示される", () => {
			render(<NewsPagination {...defaultProps} />);

			const prevButton = screen.getByLabelText("前のページへ");
			expect(prevButton).toBeInTheDocument();
			expect(prevButton).toHaveAttribute("href", "/news?page=2");
		});

		it("前のページがない場合、前へボタンが表示されない", () => {
			render(<NewsPagination {...defaultProps} hasPreviousPage={false} />);

			expect(screen.queryByLabelText("前のページへ")).not.toBeInTheDocument();
		});

		it("次のページがある場合、次へボタンが表示される", () => {
			render(<NewsPagination {...defaultProps} />);

			const nextButton = screen.getByLabelText("次のページへ");
			expect(nextButton).toBeInTheDocument();
			expect(nextButton).toHaveAttribute("href", "/news?page=4");
		});

		it("次のページがない場合、次へボタンが表示されない", () => {
			render(<NewsPagination {...defaultProps} hasNextPage={false} />);

			expect(screen.queryByLabelText("次のページへ")).not.toBeInTheDocument();
		});

		it("前へボタンにアイコンとテキストが表示される", () => {
			render(<NewsPagination {...defaultProps} />);

			expect(screen.getByTestId("chevron-left-icon")).toBeInTheDocument();
			
			const prevText = screen.getByText("前へ");
			expect(prevText).toBeInTheDocument();
			expect(prevText).toHaveClass("hidden", "sm:inline");
		});

		it("次へボタンにアイコンとテキストが表示される", () => {
			render(<NewsPagination {...defaultProps} />);

			expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument();
			
			const nextText = screen.getByText("次へ");
			expect(nextText).toBeInTheDocument();
			expect(nextText).toHaveClass("hidden", "sm:inline");
		});
	});

	describe("先頭・末尾ページの表示", () => {
		it("showEdges=trueの場合、先頭ページが表示される", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[8, 9, 10]}
					currentPage={9}
					showEdges={true}
				/>
			);

			expect(screen.getByText("1")).toBeInTheDocument();
		});

		it("showEdges=falseの場合、先頭ページが表示されない", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[8, 9, 10]}
					currentPage={9}
					showEdges={false}
				/>
			);

			expect(screen.queryByText("1")).not.toBeInTheDocument();
		});

		it("showEdges=trueの場合、末尾ページが表示される", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[1, 2, 3]}
					currentPage={2}
					showEdges={true}
				/>
			);

			expect(screen.getByText("10")).toBeInTheDocument();
		});

		it("showEdges=falseの場合、末尾ページが表示されない", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[1, 2, 3]}
					currentPage={2}
					showEdges={false}
				/>
			);

			expect(screen.queryByText("10")).not.toBeInTheDocument();
		});

		it("先頭ページが既にitemsに含まれている場合、重複表示されない", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[1, 2, 3]}
					currentPage={2}
					showEdges={true}
				/>
			);

			const firstPageLinks = screen.getAllByText("1");
			expect(firstPageLinks).toHaveLength(1);
		});
	});

	describe("省略記号の表示", () => {
		it("showEllipsis=trueかつ条件を満たす場合、開始省略記号が表示される", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[8, 9, 10]}
					currentPage={9}
					showEllipsis={true}
					showEdges={true}
				/>
			);

			const ellipsis = screen.getAllByTestId("ellipsis-icon");
			expect(ellipsis.length).toBeGreaterThan(0);
		});

		it("showEllipsis=falseの場合、省略記号が表示されない", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[8, 9, 10]}
					currentPage={9}
					showEllipsis={false}
					showEdges={true}
				/>
			);

			expect(screen.queryByTestId("ellipsis-icon")).not.toBeInTheDocument();
		});

		it("末尾省略記号が適切に表示される", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[1, 2, 3]}
					currentPage={2}
					showEllipsis={true}
					showEdges={true}
				/>
			);

			const ellipsis = screen.getAllByTestId("ellipsis-icon");
			expect(ellipsis.length).toBeGreaterThan(0);
		});
	});

	describe("アクセシビリティ", () => {
		it("各ページリンクに適切なaria-labelが設定される", () => {
			render(<NewsPagination {...defaultProps} />);

			expect(screen.getByLabelText("2ページ目")).toBeInTheDocument();
			expect(screen.getByLabelText("3ページ目")).toBeInTheDocument();
			expect(screen.getByLabelText("4ページ目")).toBeInTheDocument();
		});

		it("省略記号にaria-hidden属性が設定される", () => {
			render(
				<NewsPagination
					{...defaultProps}
					items={[1, 2, 3]}
					currentPage={2}
					showEllipsis={true}
					showEdges={true}
				/>
			);

			const ellipsisElements = screen.getAllByRole("generic").filter(
				(el) => el.getAttribute("aria-hidden") === "true"
			);
			expect(ellipsisElements.length).toBeGreaterThan(0);
		});

		it("現在のページにaria-current='page'が設定される", () => {
			render(<NewsPagination {...defaultProps} />);

			const currentPage = screen.getByText("3");
			expect(currentPage).toHaveAttribute("aria-current", "page");
		});
	});

	describe("スタイリング", () => {
		it("カスタムクラス名が適用される", () => {
			render(<NewsPagination {...defaultProps} className="custom-pagination" />);

			const nav = screen.getByRole("navigation");
			expect(nav).toHaveClass("custom-pagination");
		});

		it("現在のページに太字フォントが適用される", () => {
			render(<NewsPagination {...defaultProps} />);

			const currentPage = screen.getByText("3");
			expect(currentPage).toHaveClass("font-semibold");
		});

		it("ページリンクに適切なクラスが適用される", () => {
			render(<NewsPagination {...defaultProps} />);

			const pageLink = screen.getByText("2");
			expect(pageLink).toHaveClass("text-sm", "min-w-9", "px-3");
		});
	});

	describe("複雑なケース", () => {
		it("完全なページネーション（先頭・末尾・省略記号含む）が正しく表示される", () => {
			render(
				<NewsPagination
					totalPages={20}
					currentPage={10}
					items={[9, 10, 11]}
					hasPreviousPage={true}
					hasNextPage={true}
					baseUrl="/news"
					category="tech"
					showEllipsis={true}
					showEdges={true}
				/>
			);

			// 前へボタン
			expect(screen.getByLabelText("前のページへ")).toBeInTheDocument();
			
			// 先頭ページ
			expect(screen.getByText("1")).toBeInTheDocument();
			
			// 省略記号（開始）
			expect(screen.getAllByTestId("ellipsis-icon")).toHaveLength(2);
			
			// 現在の範囲のページ
			expect(screen.getByText("9")).toBeInTheDocument();
			expect(screen.getByText("10")).toBeInTheDocument();
			expect(screen.getByText("11")).toBeInTheDocument();
			
			// 末尾ページ
			expect(screen.getByText("20")).toBeInTheDocument();
			
			// 次へボタン
			expect(screen.getByLabelText("次のページへ")).toBeInTheDocument();

			// カテゴリ付きURLの確認
			const page9Link = screen.getByText("9");
			expect(page9Link).toHaveAttribute("href", "/news?page=9&category=tech");
		});

		it("1ページ目の場合", () => {
			render(
				<NewsPagination
					{...defaultProps}
					currentPage={1}
					items={[1, 2, 3]}
					hasPreviousPage={false}
				/>
			);

			// 前へボタンは表示されない
			expect(screen.queryByLabelText("前のページへ")).not.toBeInTheDocument();
			
			// 1ページ目がアクティブ
			const currentPage = screen.getByText("1");
			expect(currentPage).toHaveAttribute("aria-current", "page");
		});

		it("最終ページの場合", () => {
			render(
				<NewsPagination
					{...defaultProps}
					currentPage={10}
					items={[8, 9, 10]}
					hasNextPage={false}
				/>
			);

			// 次へボタンは表示されない
			expect(screen.queryByLabelText("次のページへ")).not.toBeInTheDocument();
			
			// 最終ページがアクティブ
			const currentPage = screen.getByText("10");
			expect(currentPage).toHaveAttribute("aria-current", "page");
		});
	});

	describe("URLクエリパラメータ", () => {
		it("ベースURLのみの場合、正しいクエリパラメータが生成される", () => {
			render(<NewsPagination {...defaultProps} />);

			const page2Link = screen.getByText("2");
			expect(page2Link).toHaveAttribute("href", "/news?page=2");
		});

		it("カテゴリがある場合、両方のパラメータが含まれる", () => {
			render(<NewsPagination {...defaultProps} category="sports" />);

			const page2Link = screen.getByText("2");
			expect(page2Link).toHaveAttribute("href", "/news?page=2&category=sports");
		});

		it("前へ・次へボタンでもカテゴリパラメータが保持される", () => {
			render(<NewsPagination {...defaultProps} category="tech" />);

			const prevButton = screen.getByLabelText("前のページへ");
			expect(prevButton).toHaveAttribute("href", "/news?page=2&category=tech");

			const nextButton = screen.getByLabelText("次のページへ");
			expect(nextButton).toHaveAttribute("href", "/news?page=4&category=tech");
		});
	});
});