import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const skeletonVariants = cva(
  "bg-primary/10", // Base class
  {
    variants: {
      shape: {
        default: "rounded-md",
        "rounded-sm": "rounded-sm",
        "rounded-lg": "rounded-lg",
        "rounded-full": "rounded-full",
        rectangle: "rounded-none",
      },
      animation: {
        pulse: "animate-pulse",
        // wave: "animate-wave", // Skipping wave for now
        none: "",
      },
    },
    defaultVariants: {
      shape: "default",
      animation: "pulse",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, shape, animation, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ shape, animation }), className)}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
