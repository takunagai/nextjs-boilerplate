import { cva } from "class-variance-authority";

// Copied tableVariants definition from src/components/ui/table.tsx
// In a real scenario, exporting it from table.tsx would be cleaner.
const tableVariants = cva(
	// ベースクラス
	"w-full text-sm overflow-x-auto border-collapse",
	{
		variants: {
			// テーブルの見た目バリエーション
			variant: {
				default: "",
				bordered: "border",
				card: "border rounded-sm shadow-xs",
			},
			// 罫線タイプ
			borderedCells: {
				none: "", // 罫線なし
				all: "[&_th]:border [&_td]:border", // 全セル罫線
				horizontal: "[&_tr]:border-b", // 水平罫線のみ
				vertical: "[&_th]:border-r [&_td]:border-r", // 垂直罫線のみ
			},
			// 偶数行のストライプ
			striped: {
				true: "[&>tbody>tr:nth-child(even)]:bg-muted/30",
				false: "",
			},
			// サイズバリエーション（パディング調整）
			size: {
				xs: "[&_th]:px-1 [&_td]:px-1 [&_th]:py-0.5 [&_td]:py-0.5 text-xs",
				sm: "[&_th]:px-2 [&_td]:px-2 [&_th]:py-1.5 [&_td]:py-1.5 text-xs @sm:[&_th]:px-1 @sm:[&_td]:px-1 @sm:[&_th]:py-0.5 @sm:[&_td]:py-0.5 @sm:text-xs",
				md: "[&_th]:px-4 [&_td]:px-4 [&_th]:py-2 [&_td]:py-2 text-sm @md:[&_th]:px-2 @md:[&_td]:px-2 @md:[&_th]:py-1.5 @md:[&_td]:py-1.5 @md:text-xs @sm:[&_th]:px-1 @sm:[&_td]:px-1 @sm:[&_th]:py-0.5 @sm:[&_td]:py-0.5 @sm:text-xs",
				lg: "[&_th]:px-6 [&_td]:px-6 [&_th]:py-3 [&_td]:py-3 text-base @lg:[&_th]:px-4 @lg:[&_td]:px-4 @lg:[&_th]:py-2 @lg:[&_td]:py-2 @lg:text-sm @md:[&_th]:px-2 @md:[&_td]:px-2 @md:[&_th]:py-1.5 @md:[&_td]:py-1.5 @md:text-xs @sm:[&_th]:px-1 @sm:[&_td]:px-1 @sm:[&_th]:py-0.5 @sm:[&_td]:py-0.5 @sm:text-xs",
			},
			// キャプションの位置
			captionPosition: {
				top: "caption-top",
				bottom: "caption-bottom",
			},
			// テーブルの配置
			align: {
				left: "text-left",
				center: "text-center",
				right: "text-right",
			},
		},
		defaultVariants: {
			variant: "default",
			borderedCells: "all",
			striped: false,
			size: "md",
			captionPosition: "top",
			align: "center",
		},
	},
);

describe("tableVariants", () => {
	const baseClasses = "w-full text-sm overflow-x-auto border-collapse";

	it("should return correct classes for size 'lg'", () => {
		const classes = tableVariants({ size: "lg" });
		expect(classes).toContain(baseClasses);
		// lg base styles
		expect(classes).toContain(
			"[&_th]:px-6 [&_td]:px-6 [&_th]:py-3 [&_td]:py-3 text-base",
		);
		// lg container query styles
		expect(classes).toContain(
			"@lg:[&_th]:px-4 @lg:[&_td]:px-4 @lg:[&_th]:py-2 @lg:[&_td]:py-2 @lg:text-sm",
		);
		// md container query styles
		expect(classes).toContain(
			"@md:[&_th]:px-2 @md:[&_td]:px-2 @md:[&_th]:py-1.5 @md:[&_td]:py-1.5 @md:text-xs",
		);
		// sm container query styles
		expect(classes).toContain(
			"@sm:[&_th]:px-1 @sm:[&_td]:px-1 @sm:[&_th]:py-0.5 @sm:[&_td]:py-0.5 @sm:text-xs",
		);
	});

	it("should return correct classes for default size (md)", () => {
		const classes = tableVariants({}); // Relies on defaultVariants
		expect(classes).toContain(baseClasses);
		// md base styles (from default)
		expect(classes).toContain(
			"[&_th]:px-4 [&_td]:px-4 [&_th]:py-2 [&_td]:py-2 text-sm",
		);
		// Check for other default variant classes
		expect(classes).toContain("[&_th]:border [&_td]:border"); // borderedCells: "all"
		// md container query styles
		expect(classes).toContain(
			"@md:[&_th]:px-2 @md:[&_td]:px-2 @md:[&_th]:py-1.5 @md:[&_td]:py-1.5 @md:text-xs",
		);
		// sm container query styles
		expect(classes).toContain(
			"@sm:[&_th]:px-1 @sm:[&_td]:px-1 @sm:[&_th]:py-0.5 @sm:[&_td]:py-0.5 @sm:text-xs",
		);
	});

	it("should return correct classes for size 'md'", () => {
		const classes = tableVariants({ size: "md" });
		expect(classes).toContain(baseClasses);
		// md base styles
		expect(classes).toContain(
			"[&_th]:px-4 [&_td]:px-4 [&_th]:py-2 [&_td]:py-2 text-sm",
		);
		// md container query styles
		expect(classes).toContain(
			"@md:[&_th]:px-2 @md:[&_td]:px-2 @md:[&_th]:py-1.5 @md:[&_td]:py-1.5 @md:text-xs",
		);
		// sm container query styles
		expect(classes).toContain(
			"@sm:[&_th]:px-1 @sm:[&_td]:px-1 @sm:[&_th]:py-0.5 @sm:[&_td]:py-0.5 @sm:text-xs",
		);
	});

	it("should return correct classes for size 'sm'", () => {
		const classes = tableVariants({ size: "sm" });
		expect(classes).toContain(baseClasses);
		// sm base styles
		expect(classes).toContain(
			"[&_th]:px-2 [&_td]:px-2 [&_th]:py-1.5 [&_td]:py-1.5 text-xs",
		);
		// sm container query styles
		expect(classes).toContain(
			"@sm:[&_th]:px-1 @sm:[&_td]:px-1 @sm:[&_th]:py-0.5 @sm:[&_td]:py-0.5 @sm:text-xs",
		);
		// Check that it does NOT contain larger container query styles
		expect(classes).not.toContain("@md:");
		expect(classes).not.toContain("@lg:");
	});

	it("should return correct classes for size 'xs'", () => {
		const classes = tableVariants({ size: "xs" });
		expect(classes).toContain(baseClasses);
		// xs base styles
		expect(classes).toContain(
			"[&_th]:px-1 [&_td]:px-1 [&_th]:py-0.5 [&_td]:py-0.5 text-xs",
		);
		// Check that it does NOT contain any container query styles for other sizes
		expect(classes).not.toContain("@sm:");
		expect(classes).not.toContain("@md:");
		expect(classes).not.toContain("@lg:");
	});

	it("should always include base classes", () => {
		const lgClasses = tableVariants({ size: "lg" });
		expect(lgClasses).toContain(baseClasses);

		const mdClasses = tableVariants({ size: "md" });
		expect(mdClasses).toContain(baseClasses);

		const smClasses = tableVariants({ size: "sm" });
		expect(smClasses).toContain(baseClasses);

		const xsClasses = tableVariants({ size: "xs" });
		expect(xsClasses).toContain(baseClasses);

		const defaultClasses = tableVariants({});
		expect(defaultClasses).toContain(baseClasses);
	});

	it("should apply other default variants when not specified", () => {
		const classes = tableVariants({ size: "sm" }); // Specify size, others should be default
		expect(classes).toContain(baseClasses);
		// Default variant: "default" -> "" (no extra class)
		// Default borderedCells: "all"
		expect(classes).toContain("[&_th]:border [&_td]:border");
		// Default striped: false -> "" (no extra class)
		// Default captionPosition: "top"
		expect(classes).toContain("caption-top");
		// Default align: "center"
		expect(classes).toContain("text-center");
	});
});

// Note: The RTL test for @container class on the Table component itself
// would require React Testing Library and potentially a JSDOM environment.
// This is not included here as the focus is on tableVariants.
// If a testing setup is confirmed, such a test could be added:
/*
import { render } from '@testing-library/react';
// Assuming Table and its subcomponents are exported from './table'
// and table.tsx is modified to export Table for testing
// import { Table } from './table'; 

describe('Table Component @container Test', () => {
  // This test would need Table to be importable.
  // For now, this is commented out.
  //
  // it('Table component wrapper should have @container class', () => {
  //   const { container } = render(
  //     <Table>
  //       <Table.tbody>
  //         <Table.tr><Table.td>Cell</Table.td></Table.tr>
  //       </Table.tbody>
  //     </Table>
  //   );
  //   const wrapperDiv = container.querySelector('div'); // Find the first div
  //   expect(wrapperDiv).toHaveClass('@container');
  // });
});
*/
