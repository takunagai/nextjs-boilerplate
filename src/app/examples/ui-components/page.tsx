import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table"; // Data-driven table
import type { ColumnDef } from "@/components/ui/table"; // Import ColumnDef type
import { ToastExamples } from "@/components/ui/toast-provider-and-examples";
import { Toaster } from "@/components/ui/sonner";
import { DatePicker } from "@/components/ui/date-picker"; // DatePicker itself
import * as React from "react"; // React will be needed for DatePickerWithState

// Small client component wrapper for DatePicker state
// This needs to be defined before its use or imported if in a separate file.
// For simplicity, defining it in the same file.
function DatePickerWithState() {
  "use client"; // This wrapper must be a client component
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <DatePicker date={date} onSelect={setDate} placeholder="Select a date" />
      <p className="mt-2 text-sm text-muted-foreground">
        Selected date: {date ? date.toLocaleDateString() : "None"}
      </p>
    </div>
  );
}

// Sample data for Table
interface Invoice {
  id: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  customer: string;
  processingFee?: number; // Optional to test different data structures
}

const sampleInvoices: Invoice[] = [
  { id: "INV001", amount: 100, status: "Paid", customer: "Alice", processingFee: 5 },
  { id: "INV002", amount: 200, status: "Pending", customer: "Bob" },
  { id: "INV003", amount: 50, status: "Paid", customer: "Charlie", processingFee: 2 },
  { id: "INV004", amount: 150, status: "Overdue", customer: "David", processingFee: 7 },
  { id: "INV005", amount: 250, status: "Pending", customer: "Eve" },
];

const tableColumns: ColumnDef<Invoice>[] = [
  { 
    accessorKey: "id", 
    header: "Invoice ID", 
    enableSorting: true 
  },
  { 
    accessorKey: "customer", 
    header: "Customer", 
    enableSorting: true 
  },
  { 
    accessorKey: "amount", 
    header: "Amount ($)", // Added unit for clarity
    // Example of custom cell rendering for amount (e.g., to format as currency)
    cell: ({ value }) => `$${(value as number).toFixed(2)}`,
    enableSorting: true, // Assuming amount should be sortable
  },
  {
    accessorKey: "processingFee",
    header: "Fee ($)",
    cell: ({ value }) => value ? `$${(value as number).toFixed(2)}` : "-", // Handle optional data
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    // Example of custom cell rendering with Tailwind styling
    cell: ({ value }) => {
      const statusValue = value as Invoice["status"];
      let className = "px-2 py-0.5 rounded-full text-xs font-medium ";
      if (statusValue === "Paid") {
        className += "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      } else if (statusValue === "Pending") {
        className += "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100";
      } else if (statusValue === "Overdue") {
        className += "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";
      }
      return <span className={className}>{statusValue}</span>;
    },
    enableSorting: true,
  },
];

export default function UiComponentsPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
      <Toaster /> {/* Add Toaster here for toast examples */}
      
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">UI Component Showcase</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A collection of custom UI components built for this application.
        </p>
      </header>

      <section id="spinners">
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">Loading Spinners</h2>
        <div className="flex items-center flex-wrap gap-6 p-4 bg-background rounded-lg shadow">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small (sm)</p>
            <Spinner size="sm" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Medium (md)</p>
            <Spinner size="md" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Large (lg)</p>
            <Spinner size="lg" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Secondary Color (md)</p>
            <Spinner size="md" color="secondary" />
          </div>
           <div>
            <p className="text-sm text-muted-foreground mb-2">Destructive Color (md)</p>
            <Spinner size="md" color="destructive" />
          </div>
        </div>
      </section>

      <section id="skeletons">
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">Skeletons</h2>
        <div className="grid md:grid-cols-2 gap-6 p-4 bg-background rounded-lg shadow">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-2">Article Placeholder</p>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-2">Avatar & Details</p>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-12 w-12 rounded-full" shape="rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
             <Skeleton className="h-8 w-full" shape="rectangle" />
          </div>
        </div>
      </section>

      <section id="datepicker">
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">Date Picker</h2>
        <div className="p-4 bg-background rounded-lg shadow">
          <DatePickerWithState />
        </div>
      </section>

      <section id="table">
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">Table / Data Grid</h2>
        <div className="p-4 bg-background rounded-lg shadow overflow-x-auto">
          <Table<Invoice> 
            data={sampleInvoices} 
            columns={tableColumns} 
            variant="card"
            size="md"
            striped={true}
            borderedCells="horizontal"
            captionPosition="bottom"
          >
            <Table.Caption>Recent Invoices</Table.Caption>
          </Table>
        </div>
      </section>

      <section id="toasts">
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">Toasts</h2>
        <div className="p-4 bg-background rounded-lg shadow">
          <ToastExamples />
        </div>
      </section>
    </div>
  );
}
