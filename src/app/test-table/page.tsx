import { Table } from "@/components/ui/table"; // Adjust path if necessary

export default function TableTestPage() {
  const tableData = (
    <>
      <Table.caption>Sample Table Caption</Table.caption>
      <Table.thead>
        <Table.tr>
          <Table.th>Header 1</Table.th>
          <Table.th>Header 2</Table.th>
          <Table.th>Header 3</Table.th>
        </Table.tr>
      </Table.thead>
      <Table.tbody>
        <Table.tr>
          <Table.td>Data A1</Table.td>
          <Table.td>Data B1</Table.td>
          <Table.td>Data C1</Table.td>
        </Table.tr>
        <Table.tr>
          <Table.td>Data A2</Table.td>
          <Table.td>Data B2</Table.td>
          <Table.td>Data C2</Table.td>
        </Table.tr>
        <Table.tr>
          <Table.td>Data A3</Table.td>
          <Table.td>Data B3</Table.td>
          <Table.td>Data C3</Table.td>
        </Table.tr>
      </Table.tbody>
    </>
  );

  const containerWidths = [200, 300, 400, 500, 600, 700, 800, 1000]; // In pixels
  const tableSizes: Array<'sm' | 'md' | 'lg' | undefined> = ['sm', 'md', 'lg', undefined]; // 'undefined' will test default size

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-xl font-bold mb-4">Table Component Responsive Test</h1>
      
      {tableSizes.map((sizeProp, idx) => (
        <div key={idx}>
          <h2 className="text-lg font-semibold mb-2">
            Testing Table with `size="{sizeProp || 'default (md)'}"`
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {containerWidths.map((width) => (
              <div
                key={width}
                style={{ width: `${width}px` }}
                className="border p-2 overflow-hidden" // Added overflow-hidden to ensure container respects width
              >
                <p className="text-xs mb-1">Container: {width}px</p>
                <Table size={sizeProp} variant="bordered" borderedCells="all">
                  {tableData}
                </Table>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
