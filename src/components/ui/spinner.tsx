import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
	"inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
	{
		variants: {
			size: {
				sm: "h-4 w-4 border-2", // Adjusted border width for smaller size
				md: "h-8 w-8 border-4",
				lg: "h-12 w-12 border-[6px]", // Adjusted border width for larger size
			},
			color: {
				primary: "text-primary",
				secondary: "text-secondary",
				destructive: "text-destructive",
				inherit: "text-current", // Or simply rely on inherited text color
			},
		},
		defaultVariants: {
			size: "md",
			color: "primary",
		},
	},
);

export interface SpinnerProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
		VariantProps<typeof spinnerVariants> {
	label?: string; // For custom aria-label
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
	({ className, size, color, label = "Loading...", ...props }, ref) => {
		return (
			<div
				role="status"
				aria-label={label}
				ref={ref}
				className={cn(spinnerVariants({ size, color }), className)}
				{...props}
			>
				<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
					{label}
				</span>
			</div>
		);
	},
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
