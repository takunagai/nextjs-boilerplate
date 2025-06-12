import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table } from "./index";

describe("Table Component", () => {
	it("should have all static subcomponents", () => {
		// Check that all subcomponents are defined
		expect(Table.Caption).toBeDefined();
		expect(Table.Header).toBeDefined();
		expect(Table.Body).toBeDefined();
		expect(Table.Footer).toBeDefined();
		expect(Table.Head).toBeDefined();
		expect(Table.Row).toBeDefined();
		expect(Table.Cell).toBeDefined();

		// Check lowercase versions
		expect(Table.caption).toBeDefined();
		expect(Table.thead).toBeDefined();
		expect(Table.tbody).toBeDefined();
		expect(Table.tfoot).toBeDefined();
		expect(Table.tr).toBeDefined();
		expect(Table.th).toBeDefined();
		expect(Table.td).toBeDefined();
	});

	it("should render table with caption", () => {
		render(
			<Table>
				<Table.caption>Test Caption</Table.caption>
				<Table.thead>
					<Table.tr>
						<Table.th>Header 1</Table.th>
						<Table.th>Header 2</Table.th>
					</Table.tr>
				</Table.thead>
				<Table.tbody>
					<Table.tr>
						<Table.td>Cell 1</Table.td>
						<Table.td>Cell 2</Table.td>
					</Table.tr>
				</Table.tbody>
			</Table>,
		);

		expect(screen.getByText("Test Caption")).toBeInTheDocument();
		expect(screen.getByText("Header 1")).toBeInTheDocument();
		expect(screen.getByText("Header 2")).toBeInTheDocument();
		expect(screen.getByText("Cell 1")).toBeInTheDocument();
		expect(screen.getByText("Cell 2")).toBeInTheDocument();
	});

	it("should render table with data and columns", () => {
		const data = [
			{ id: 1, name: "John", age: 25 },
			{ id: 2, name: "Jane", age: 30 },
		];

		const columns = [
			{ accessorKey: "name", header: "Name" },
			{ accessorKey: "age", header: "Age" },
		];

		render(<Table data={data} columns={columns} />);

		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Age")).toBeInTheDocument();
		expect(screen.getByText("John")).toBeInTheDocument();
		expect(screen.getByText("Jane")).toBeInTheDocument();
		expect(screen.getByText("25")).toBeInTheDocument();
		expect(screen.getByText("30")).toBeInTheDocument();
	});
});
