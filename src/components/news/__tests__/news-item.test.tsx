import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NewsItem } from "../news-item";

describe("NewsItem", () => {
	const defaultProps = {
		id: "1",
		date: new Date("2024-01-01"),
		category: "お知らせ",
		title: "新年のご挨拶",
	};

	describe("レンダリング", () => {
		it("日付、カテゴリ、タイトルが正しく表示される", () => {
			render(<NewsItem {...defaultProps} />);

			expect(screen.getByText("2024.01.01")).toBeInTheDocument();
			expect(screen.getByText("お知らせ")).toBeInTheDocument();
			expect(screen.getByText("新年のご挨拶")).toBeInTheDocument();
		});

		it("datetime属性が正しく設定される", () => {
			render(<NewsItem {...defaultProps} />);

			const timeElement = screen.getByText("2024.01.01");
			expect(timeElement).toHaveAttribute(
				"datetime",
				"2024-01-01T00:00:00.000Z",
			);
		});
	});

	describe("リンクの処理", () => {
		it("リンクがある場合、Linkコンポーネントでラップされる", () => {
			render(<NewsItem {...defaultProps} link="/news/1" />);

			const linkElement = screen.getByRole("link", {
				name: "新年のご挨拶の詳細を見る",
			});
			expect(linkElement).toHaveAttribute("href", "/news/1");
		});

		it("リンクがない場合、通常のリスト要素として表示される", () => {
			render(<NewsItem {...defaultProps} />);

			const linkElements = screen.queryAllByRole("link");
			expect(linkElements).toHaveLength(0);
		});
	});

	describe("スタイル", () => {
		it("classNameが適用される", () => {
			render(<NewsItem {...defaultProps} className="custom-class" />);

			const container = screen.getByText("新年のご挨拶").closest("li");
			expect(container).toBeInTheDocument();
		});
	});

	describe("日付フォーマット", () => {
		it("異なる日付でも正しくフォーマットされる", () => {
			const props = {
				...defaultProps,
				date: new Date("2023-12-25"),
			};
			render(<NewsItem {...props} />);

			expect(screen.getByText("2023.12.25")).toBeInTheDocument();
		});
	});
});
