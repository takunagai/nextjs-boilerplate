import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { NewsItemProps } from "../news-item";
import { NewsList } from "../news-list";

describe("NewsList", () => {
	const mockItems: NewsItemProps[] = [
		{
			id: "1",
			date: new Date("2024-01-01"),
			category: "お知らせ",
			title: "新年のご挨拶",
			link: "/news/1",
		},
		{
			id: "2",
			date: new Date("2024-01-15"),
			category: "イベント",
			title: "新春セミナー開催のお知らせ",
			link: "/news/2",
		},
		{
			id: "3",
			date: new Date("2024-02-01"),
			category: "更新情報",
			title: "システムメンテナンスのお知らせ",
		},
	];

	describe("レンダリング", () => {
		it("アイテムがない場合、「お知らせはありません」と表示される", () => {
			render(<NewsList items={[]} />);

			expect(screen.getByText("お知らせはありません。")).toBeInTheDocument();
		});

		it("複数のアイテムが正しく表示される", () => {
			render(<NewsList items={mockItems} />);

			expect(screen.getByText("新年のご挨拶")).toBeInTheDocument();
			expect(
				screen.getByText("新春セミナー開催のお知らせ"),
			).toBeInTheDocument();
			expect(
				screen.getByText("システムメンテナンスのお知らせ"),
			).toBeInTheDocument();
		});

		it("各アイテムの詳細情報が正しく表示される", () => {
			render(<NewsList items={mockItems} />);

			expect(screen.getByText("2024.01.01")).toBeInTheDocument();
			expect(screen.getByText("2024.01.15")).toBeInTheDocument();
			expect(screen.getByText("2024.02.01")).toBeInTheDocument();

			expect(screen.getByText("お知らせ")).toBeInTheDocument();
			expect(screen.getByText("イベント")).toBeInTheDocument();
			expect(screen.getByText("更新情報")).toBeInTheDocument();
		});
	});

	describe("リンク", () => {
		it("リンクがあるアイテムは正しくリンクされる", () => {
			render(<NewsList items={mockItems} />);

			const link1 = screen.getByRole("link", {
				name: "新年のご挨拶の詳細を見る",
			});
			expect(link1).toHaveAttribute("href", "/news/1");

			const link2 = screen.getByRole("link", {
				name: "新春セミナー開催のお知らせの詳細を見る",
			});
			expect(link2).toHaveAttribute("href", "/news/2");
		});

		it("リンクがないアイテムはリンクされない", () => {
			render(<NewsList items={[mockItems[2]]} />);

			const links = screen.queryAllByRole("link");
			expect(links).toHaveLength(0);
			expect(
				screen.getByText("システムメンテナンスのお知らせ"),
			).toBeInTheDocument();
		});
	});

	describe("スタイル", () => {
		it("classNameが適用される", () => {
			render(<NewsList items={mockItems} className="custom-class" />);

			const container = screen.getByText("新年のご挨拶").closest("div");
			expect(container).toHaveClass("custom-class");
		});
	});

	describe("キー属性", () => {
		it("各アイテムに一意のキーが設定される", () => {
			const { container } = render(<NewsList items={mockItems} />);

			const listItems = container.querySelectorAll("li");
			expect(listItems).toHaveLength(3);
		});
	});
});
