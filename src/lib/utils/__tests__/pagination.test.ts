import { calculatePagination } from "../pagination";

describe("pagination", () => {
	describe("calculatePagination", () => {
		describe("基本的な計算", () => {
			it("標準的なケースで正しく計算する", () => {
				const result = calculatePagination(100, 5, 10);

				expect(result).toEqual({
					totalItems: 100,
					currentPage: 5,
					itemsPerPage: 10,
					totalPages: 10,
					startIndex: 40,
					endIndex: 50,
					startPage: 4,
					endPage: 6,
					hasNextPage: true,
					hasPreviousPage: true,
					isFirstPage: false,
					isLastPage: false,
					items: [4, 5, 6],
				});
			});

			it("総アイテム数0の場合を処理する", () => {
				const result = calculatePagination(0, 1, 10);

				expect(result.totalPages).toBe(0);
				expect(result.startIndex).toBe(0);
				expect(result.endIndex).toBe(0);
			});

			it("総アイテム数がページサイズより少ない場合", () => {
				const result = calculatePagination(5, 1, 10);

				expect(result.totalPages).toBe(1);
				expect(result.startIndex).toBe(0);
				expect(result.endIndex).toBe(5);
			});
		});

		describe("ページ範囲の調整", () => {
			it("現在ページが1未満の場合は1に調整する", () => {
				const result = calculatePagination(100, 0, 10);

				expect(result.currentPage).toBe(1);
			});

			it("現在ページが総ページ数を超える場合は最大ページに調整する", () => {
				const result = calculatePagination(100, 15, 10);

				expect(result.currentPage).toBe(10);
			});

			it("負の現在ページを1に調整する", () => {
				const result = calculatePagination(100, -5, 10);

				expect(result.currentPage).toBe(1);
			});
		});

		describe("インデックス計算", () => {
			it("最初のページのインデックスを正しく計算する", () => {
				const result = calculatePagination(100, 1, 10);

				expect(result.startIndex).toBe(0);
				expect(result.endIndex).toBe(10);
			});

			it("最後のページのインデックスを正しく計算する", () => {
				const result = calculatePagination(95, 10, 10);

				expect(result.startIndex).toBe(90);
				expect(result.endIndex).toBe(95);
			});

			it("部分的な最後のページを正しく処理する", () => {
				const result = calculatePagination(37, 4, 10);

				expect(result.startIndex).toBe(30);
				expect(result.endIndex).toBe(37);
			});
		});

		describe("siblingCountの処理", () => {
			it("siblingCount=2で正しく計算する", () => {
				const result = calculatePagination(100, 5, 10, 2);

				expect(result.startPage).toBe(3);
				expect(result.endPage).toBe(7);
			});

			it("siblingCount=0で現在ページのみ表示する", () => {
				const result = calculatePagination(100, 5, 10, 0);

				expect(result.startPage).toBe(5);
				expect(result.endPage).toBe(5);
			});

			it("最初のページ付近でsiblingCountを調整する", () => {
				const result = calculatePagination(100, 2, 10, 2);

				expect(result.startPage).toBe(1);
				expect(result.endPage).toBe(5); // 2*2+1=5ページ表示するため調整
			});

			it("最後のページ付近でsiblingCountを調整する", () => {
				const result = calculatePagination(100, 9, 10, 2);

				expect(result.startPage).toBe(6); // 最後から5ページ表示するため調整
				expect(result.endPage).toBe(10);
			});
		});

		describe("ナビゲーション状態", () => {
			it("最初のページでのナビゲーション状態", () => {
				const result = calculatePagination(100, 1, 10);

				expect(result.hasNextPage).toBe(true);
				expect(result.hasPreviousPage).toBe(false);
				expect(result.currentPage).toBe(1);
				expect(result.currentPage).not.toBe(result.totalPages);
			});

			it("最後のページでのナビゲーション状態", () => {
				const result = calculatePagination(100, 10, 10);

				expect(result.hasNextPage).toBe(false);
				expect(result.hasPreviousPage).toBe(true);
				expect(result.currentPage).not.toBe(1);
				expect(result.currentPage).toBe(result.totalPages);
			});

			it("中間ページでのナビゲーション状態", () => {
				const result = calculatePagination(100, 5, 10);

				expect(result.hasNextPage).toBe(true);
				expect(result.hasPreviousPage).toBe(true);
				expect(result.currentPage).not.toBe(1);
				expect(result.currentPage).not.toBe(result.totalPages);
			});

			it("単一ページのナビゲーション状態", () => {
				const result = calculatePagination(5, 1, 10);

				expect(result.hasNextPage).toBe(false);
				expect(result.hasPreviousPage).toBe(false);
				expect(result.currentPage).toBe(1);
				expect(result.currentPage).toBe(result.totalPages);
			});
		});

		describe("items配列の生成", () => {
			it("標準的なitemsを生成する", () => {
				const result = calculatePagination(100, 5, 10, 1);

				expect(result.items).toEqual([4, 5, 6]);
			});

			it("最初のページ付近のitemsを生成する", () => {
				const result = calculatePagination(100, 2, 10, 2);

				expect(result.items).toEqual([1, 2, 3, 4, 5]);
			});

			it("最後のページ付近のitemsを生成する", () => {
				const result = calculatePagination(100, 9, 10, 2);

				expect(result.items).toEqual([6, 7, 8, 9, 10]);
			});

			it("総ページ数が少ない場合のitemsを生成する", () => {
				const result = calculatePagination(25, 2, 10, 2);

				expect(result.items).toEqual([1, 2, 3]);
			});
		});

		describe("エッジケース", () => {
			it("itemsPerPageが1の場合", () => {
				const result = calculatePagination(10, 5, 1);

				expect(result.totalPages).toBe(10);
				expect(result.startIndex).toBe(4);
				expect(result.endIndex).toBe(5);
			});

			it("itemsPerPageが総アイテム数より大きい場合", () => {
				const result = calculatePagination(5, 1, 10);

				expect(result.totalPages).toBe(1);
				expect(result.startIndex).toBe(0);
				expect(result.endIndex).toBe(5);
			});

			it("小数点を含む除算結果を正しく処理する", () => {
				const result = calculatePagination(33, 1, 10);

				expect(result.totalPages).toBe(4); // Math.ceil(33/10) = 4
			});
		});

		describe("異常な入力値", () => {
			it("負のtotalItemsを処理する", () => {
				const result = calculatePagination(-10, 1, 10);

				expect(result.totalPages).toBe(0);
			});

			it("0のitemsPerPageでゼロ除算を回避する", () => {
				expect(() => {
					calculatePagination(100, 1, 0);
				}).not.toThrow();
			});

			it("負のitemsPerPageを処理する", () => {
				expect(() => {
					calculatePagination(100, 1, -10);
				}).not.toThrow();
			});
		});

		describe("大きな数値での動作", () => {
			it("大きなデータセットで正しく計算する", () => {
				const result = calculatePagination(1000000, 5000, 20);

				expect(result.totalPages).toBe(50000);
				expect(result.startIndex).toBe(99980);
				expect(result.endIndex).toBe(100000);
			});
		});
	});
});
