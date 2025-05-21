# UI Components Documentation

This document provides an overview and usage instructions for custom UI components developed for this project.

---

## 1. Loading Spinner

### Overview
The Loading Spinner component provides a visual indication of loading status. It is implemented as a server component and uses CSS animations for the spinning effect. It leverages `class-variance-authority` (CVA) for defining different styles and sizes.

### Location
`src/components/ui/spinner.tsx`

### Props & Variants

*   **`size`**: Controls the size of the spinner.
    *   `sm`: Small (h-4 w-4, border-2)
    *   `md`: Medium (h-8 w-8, border-4 - default)
    *   `lg`: Large (h-12 w-12, border-[6px])
*   **`color`**: Sets the color of the spinner.
    *   `primary`: Primary color (default)
    *   `secondary`: Secondary color
    *   `destructive`: Destructive color
    *   `inherit`: Inherits text color
*   **`label`**: (Optional) Custom `aria-label` for accessibility. Defaults to "Loading...".
*   `className`: Standard React `className` prop for additional styling.

### Usage Example
```tsx
import { Spinner } from "@/components/ui/spinner";

// Default spinner (medium, primary)
<Spinner />

// Small, secondary color spinner
<Spinner size="sm" color="secondary" />

// Large spinner with a custom label
<Spinner size="lg" label="Processing payment..." />
```

### Accessibility
*   Includes `role="status"` for assistive technologies.
*   The `aria-label` defaults to "Loading..." and can be customized via the `label` prop.
*   A visually hidden span with the label text is also included for screen readers.

---

## 2. Skeleton

### Overview
The Skeleton component is used to display placeholder previews of content before it loads. This improves the user experience by indicating that content is on its way. It is a server component that uses `class-variance-authority` (CVA) for shape and animation variants.

### Location
`src/components/ui/skeleton.tsx` (and its variants in `src/components/ui/skeletonVariants` if refactored, though current implementation has CVA in the same file).

### Props & Variants

*   **`shape`**: Defines the shape of the skeleton.
    *   `default`: Rounded-md (default)
    *   `rounded-sm`: Small rounded corners
    *   `rounded-lg`: Large rounded corners
    *   `rounded-full`: Fully rounded (circle)
    *   `rectangle`: No rounding (sharp corners)
*   **`animation`**: Defines the animation style.
    *   `pulse`: Pulsing animation (default)
    *   `none`: No animation
*   `className`: Standard React `className` prop for additional styling, especially for setting width and height.

### Usage Example
```tsx
import { Skeleton } from "@/components/ui/skeleton";

// Default skeleton (rounded-md, pulse animation)
// Width and height should be set via className
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-full mt-2" />

// Circular skeleton for an avatar placeholder
<Skeleton shape="rounded-full" className="h-12 w-12" />

// Rectangle skeleton with no animation
<Skeleton shape="rectangle" animation="none" className="h-20 w-full" />
```

### Best Practices/Notes
*   Always set a `width` and `height` using the `className` prop for the skeleton to be visible and match the dimensions of the content it's replacing.

---

## 3. Date Picker

### Overview
The Date Picker component allows users to select a date from a calendar. It is a client component (`"use client";`) that wraps the `react-day-picker` library to provide a styled and integrated date selection experience.

### Location
`src/components/ui/date-picker.tsx`

### Props & Variants

*   **`date`**: (Optional) The currently selected `Date` object.
*   **`onSelect`**: A callback function `(date: Date | undefined) => void` that is called when a date is selected.
*   **`className`**: (Optional) Standard React `className` prop for custom styling of the root `div` element.
*   **`placeholder`**: (Optional) String to display in the button when no date is selected. Defaults to "Pick a date".

`react-day-picker` itself has many props for customization (e.g., `disabled` days, `numberOfMonths`, etc.). These can be exposed further or passed via a `dayPickerProps` prop if needed in the future. The component uses Tailwind CSS for styling `react-day-picker` to match the application's theme.

### Usage Example
```tsx
// Parent component (can be server or client)
// For state management, if the parent is a Server Component,
// the DatePicker and its state logic must be in a Client Component.

// Example: Client Component Wrapper for DatePicker
// (as demonstrated in `src/app/examples/ui-components/page.tsx`)

"use client"; // This wrapper must be a client component
import * as React from "react";
import { DatePicker } from "@/components/ui/date-picker";

function MyDatePickerFeature() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <DatePicker 
        date={selectedDate} 
        onSelect={setSelectedDate} 
        placeholder="Select your birth date" 
      />
      <p>Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}</p>
    </div>
  );
}
export default MyDatePickerFeature;
```

### Best Practices/Notes
*   The component uses `react-day-picker/dist/style.css` as a base style, which is then customized with Tailwind CSS via the `classNames` prop within the component.
*   Since `popover.tsx` was not found during implementation, the calendar appears as a dropdown below the button, not in a popover.
*   Uses `FaCalendarAlt` from `react-icons` as the calendar icon.

---

## 4. Table / Data Grid

### Overview
The Table component is a flexible and data-driven component for displaying tabular data. It supports features like client-side sorting and custom cell rendering. The core `Table` component is a client component (`"use client";`) due to its interactive features like sorting. Sub-components like `Table.Caption`, `Table.Row`, etc., are functional components.

### Location
The Table component and its sub-components are located in the `src/components/ui/table/` directory.
*   Main component: `src/components/ui/table/Table.tsx`
*   Sub-components: `TableCaption.tsx`, `TableHeader.tsx`, `TableBody.tsx`, `TableFooter.tsx`, `TableRow.tsx`, `TableHead.tsx`, `TableCell.tsx`
*   Types: `src/components/ui/table/types.ts`
*   Exports: `src/components/ui/table/index.ts`

### Props & Variants (Main `<Table />` component)

*   **`data: TData[]`**: An array of data items to display in the table. `TData` is a generic type representing the shape of each row's data.
*   **`columns: ColumnDef<TData>[]`**: An array of column definitions. Each `ColumnDef` object specifies:
    *   `accessorKey: keyof TData | string`: The key in `TData` to access the cell's data.
    *   `header: ReactNode | ((props: { column }) => ReactNode)`: The content for the column header.
    *   `cell?: (props: { row: Row<TData>; value: any }) => ReactNode`: (Optional) A function to render custom content for a cell.
    *   `enableSorting?: boolean`: (Optional) Set to `true` to enable sorting for this column.
*   **Styling Props (from `tableVariants`):**
    *   `variant`: `default`, `bordered`, `card`
    *   `borderedCells`: `none`, `all`, `horizontal`, `vertical` (default: `all`)
    *   `striped`: `true`, `false` (default: `false`)
    *   `size`: `xs`, `sm`, `md`, `lg` (default: `md`)
    *   `captionPosition`: `top`, `bottom` (default: `top`)
    *   `align`: `left`, `center`, `right` (default: `center`)
*   `className`: Standard React `className` prop for additional styling on the outer `div` wrapper.

### Usage Example
```tsx
import { Table, type ColumnDef } from "@/components/ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "User";
}

const users: User[] = [
  { id: 1, name: "Alice Wonderland", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob The Builder", email: "bob@example.com", role: "User" },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID", enableSorting: true },
  { accessorKey: "name", header: "Full Name", enableSorting: true },
  { accessorKey: "email", header: "Email Address" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ value }) => (
      <span className={`role-${(value as string).toLowerCase()}`}>
        {value}
      </span>
    ), // Example custom cell
  },
];

function UserTable() {
  return (
    <Table<User> 
      data={users} 
      columns={columns} 
      variant="card" 
      striped={true}
      size="sm"
    >
      <Table.Caption>User List</Table.Caption>
    </Table>
  );
}
```

### Best Practices/Notes
*   The table component uses a nested API (e.g., `Table.Caption`, `Table.Header`, `Table.Body`, `Table.Row`, `Table.Head`, `Table.Cell`). However, when using the data-driven approach with `data` and `columns` props, `Table.Header` and `Table.Body` (and their children `Row`, `Head`, `Cell`) are rendered internally. You typically only need to use `Table.Caption` or `Table.Footer` explicitly with this approach.
*   If you previously used `src/components/ui/table.tsx`, ensure your import paths are updated to ` "@/components/ui/table"`.
*   Sorting is client-side. For server-side sorting, the component would need significant modifications.
*   Sort icons are from `react-icons` (`FaSort`, `FaSortUp`, `FaSortDown`).

---

## 5. Toast

### Overview
The Toast component system provides non-intrusive notifications to users. It is built using the `sonner` library. The `Toaster` component, which renders the toasts, is a client component. Functions to trigger toasts (e.g., `toast()`, `toast.success()`) can be called from client components.

### Location
*   **Toaster Component:** `src/components/ui/sonner.tsx` (This is where `SonnerToaster` is likely defined and styled)
*   **Toast Examples/Triggers:** `src/components/ui/toast-provider-and-examples.tsx` (Contains `ToastExamples` component to demonstrate usage)

### Props & Variants (for `toast()` functions)
The `toast()` function and its variants (`toast.success()`, `toast.error()`, etc.) from `sonner` accept the following:
*   First argument: The main message or title of the toast (ReactNode).
*   Second argument (optional): An object with options:
    *   `description`: (ReactNode) Additional details for the toast.
    *   `duration`: (number) Time in milliseconds before the toast auto-dismisses.
    *   `action`: (object) Adds an action button to the toast.
        *   `label`: (string) Text for the action button.
        *   `onClick`: `() => void` Function to execute when the action button is clicked.
    *   `promise`: (object) For promise-based toasts.
        *   `loading`: (ReactNode) Message while the promise is pending.
        *   `success`: `(data: any) => ReactNode | string` Function returning content for success.
        *   `error`: `(error: any) => ReactNode | string` Function returning content for error.
    *   `icon`: (ReactNode) Custom icon for the toast.
    *   Other `sonner` options like `position`, `cancel`, `unstyled`, etc.

### Usage Example

**1. Ensure `<Toaster />` is in your layout:**
The `Toaster` component must be rendered at a high level in your application tree, typically in the main layout file (e.g., `src/app/layout.tsx`).

```tsx
// Example: src/app/layout.tsx
import { Toaster } from "@/components/ui/sonner"; // Adjust path if needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" /> {/* Or other preferred position/props */}
      </body>
    </html>
  );
}
```

**2. Triggering Toasts from a Client Component:**

```tsx
"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function MyFeatureComponent() {
  const handleSave = () => {
    // Simulate API call
    const promise = ()_ => new Promise((resolve) => setTimeout(() => resolve({ name: "My Feature" }), 2000));

    toast.promise(promise, {
      loading: "Saving your changes...",
      success: (data) => `${data.name} saved successfully!`,
      error: "Failed to save changes.",
    });
  };

  return (
    <div>
      <Button onClick={() => toast("Simple info toast!")}>Show Info Toast</Button>
      <Button onClick={() => toast.success("Success!", { description: "Item added." })}>
        Show Success Toast
      </Button>
      <Button onClick={handleSave} variant="secondary">Save Feature (Promise)</Button>
    </div>
  );
}
```

### Best Practices/Notes
*   The `ToastExamples` component at `src/components/ui/toast-provider-and-examples.tsx` provides a good reference for various toast types.
*   `sonner`'s `toast.warning()` is not a distinct function; use `toast()` or `toast.info()` and customize with an icon or title for warnings.
*   Customize the `Toaster` component's default props (like `position`, `richColors`, `closeButton`) in your main layout as needed.
```
