"use client";

import * as React from "react";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerWithState() {
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
