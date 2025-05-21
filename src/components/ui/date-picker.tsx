"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { FaCalendarAlt } from "react-icons/fa";
import { useOnClickOutside } from "usehooks-ts"; // 追加: クリックアウトサイド検出用
// import "react-day-picker/style"; // 必要に応じて使用

export interface DatePickerProps {
	date?: Date;
	onSelect: (date: Date | undefined) => void;
	className?: string;
	placeholder?: string;
	disabled?: boolean; // 追加: 無効状態のサポート
	minDate?: Date; // 追加: 選択可能な最小日付
	maxDate?: Date; // 追加: 選択可能な最大日付
}

export function DatePicker({
	date,
	onSelect,
	className,
	placeholder = "Pick a date",
	disabled = false,
	minDate,
	maxDate,
}: DatePickerProps) {
	const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);
	const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
	const calendarRef = React.useRef<HTMLDivElement>(null);

	// クリックアウトサイドでカレンダーを閉じる
	useOnClickOutside(calendarRef as React.RefObject<HTMLElement>, () => {
		if (isCalendarOpen) setIsCalendarOpen(false);
	});

	React.useEffect(() => {
		setSelectedDate(date);
	}, [date]);

	const handleSelect = (newDate: Date | undefined) => {
		setSelectedDate(newDate);
		onSelect(newDate);
		setIsCalendarOpen(false); // Close calendar on date select
	};
	
	// 日付が選択可能かどうかをチェック
	const isDateDisabled = (day: Date): boolean => {
		const isBeforeMin = minDate ? day < minDate : false;
		const isAfterMax = maxDate ? day > maxDate : false;
		return isBeforeMin || isAfterMax;
	};

	// Shadcn/ui like styling for react-day-picker using Tailwind classes
	const dayPickerClassNames = {
		months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 p-4",
		month: "space-y-4",
		caption: "flex justify-center pt-1 relative items-center",
		caption_label: "text-sm font-medium",
		nav: "space-x-1 flex items-center",
		nav_button: cn(
			"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
			// Replicating shadcn/ui button variants for outline
			"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
		),
		nav_button_previous: "absolute left-1",
		nav_button_next: "absolute right-1",
		table: "w-full border-collapse space-y-1",
		head_row: "flex",
		head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
		row: "flex w-full mt-2",
		cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
		day: cn(
			"h-9 w-9 p-0 font-normal aria-selected:opacity-100",
			// Replicating shadcn/ui button variants for ghost
			"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
		),
		day_selected:
			"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
		day_today: "bg-accent text-accent-foreground",
		day_outside:
			"day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
		day_disabled: "text-muted-foreground opacity-50",
		day_range_middle:
			"aria-selected:bg-accent aria-selected:text-accent-foreground",
		day_hidden: "invisible",
		// Add other necessary classNames if needed from shadcn/ui calendar
		// For example, for range selection, specific styles for start and end of range might be needed.
		// day_range_start: "day-range-start",
		// day_range_end: "day-range-end",
	};

	return (
		<div className={cn("relative", className)} ref={calendarRef}>
			<Button
				variant={"outline"}
				className={cn(
					"w-[280px] justify-start text-left font-normal",
					!selectedDate && "text-muted-foreground",
				)}
				onClick={() => !disabled && setIsCalendarOpen(!isCalendarOpen)}
				disabled={disabled}
				aria-expanded={isCalendarOpen}
				aria-haspopup="dialog"
				aria-label={selectedDate ? `Selected date is ${format(selectedDate, "PPP")}` : `Select date, ${placeholder}`}
			>
				<FaCalendarAlt className="mr-2 h-4 w-4" />
				{selectedDate ? (
					format(selectedDate, "PPP")
				) : (
					<span>{placeholder}</span>
				)}
			</Button>
			{isCalendarOpen && (
				<div 
					className="absolute z-50 mt-1 w-auto rounded-md border bg-popover p-0 shadow-md outline-none animate-in fade-in-0 zoom-in-95"
					role="dialog"
					aria-label="カレンダー"
				>
					<DayPicker
						mode="single"
						selected={selectedDate}
						onSelect={handleSelect}
						initialFocus
						classNames={dayPickerClassNames}
						showOutsideDays={true}
						disabled={isDateDisabled}
						fromMonth={minDate}
						toMonth={maxDate}
					/>
				</div>
			)}
		</div>
	);
}
