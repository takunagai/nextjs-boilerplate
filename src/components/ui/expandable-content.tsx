"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
	useCallback,
	useId,
	useLayoutEffect,
	useRef,
	useState,
	type KeyboardEvent,
	type ReactNode,
} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const expandableContentVariants = cva(
	"relative overflow-hidden transition-all duration-300 ease-in-out",
	{
		variants: {
			variant: {
				default: "rounded-lg border border-border bg-background",
				subtle: "bg-muted/30 rounded-lg",
				minimal: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const expandableButtonVariants = cva(
	"mt-4 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
		},
		defaultVariants: {
			variant: "outline",
		},
	},
);

export interface ExpandableContentProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof expandableContentVariants> {
	children: ReactNode;
	maxHeight?: number | string;
	expandText?: string;
	collapseText?: string;
	disabled?: boolean;
	gradientHeight?: number;
	showGradient?: boolean;
	buttonVariant?: VariantProps<typeof expandableButtonVariants>["variant"];
	hideButton?: boolean;
}

export function ExpandableContent({
	children,
	maxHeight = 200,
	expandText = "もっと見る",
	collapseText = "折りたたむ",
	disabled = false,
	gradientHeight = 72,
	showGradient = true,
	variant,
	buttonVariant = "outline",
	hideButton = false,
	className,
	...props
}: ExpandableContentProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [contentHeight, setContentHeight] = useState<number>(0);
	const contentRef = useRef<HTMLDivElement>(null);
	const id = useId();
	const contentId = `expandable-content-${id}`;

	// コンテンツの実際の高さを測定と状態管理を最適化
	useLayoutEffect(() => {
		if (!contentRef.current) return;

		const contentElement = contentRef.current;
		const maxHeightPx =
			typeof maxHeight === "string" ? parseInt(maxHeight, 10) : maxHeight;

		const measureHeight = () => {
			const height = contentElement.scrollHeight;
			setContentHeight(height);

			// ボタン表示判定を早期に行う
			const shouldShowButton = height > maxHeightPx && !disabled && !hideButton;
			setShowButton(shouldShowButton);
		};

		// 初回測定（同期的に実行）
		measureHeight();

		// ResizeObserverでコンテンツサイズ変更を監視
		const resizeObserver = new ResizeObserver(() => {
			// リサイズ時のみ再測定（パフォーマンス最適化）
			requestAnimationFrame(measureHeight);
		});

		resizeObserver.observe(contentElement);

		return () => {
			resizeObserver.disconnect();
		};
	}, [maxHeight, disabled, hideButton, children]);

	const toggleExpanded = useCallback(() => {
		setIsExpanded((prev) => !prev);
	}, []);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggleExpanded();
			}
		},
		[toggleExpanded],
	);

	const maxHeightPx =
		typeof maxHeight === "string" ? parseInt(maxHeight, 10) : maxHeight;

	const containerHeight = isExpanded ? contentHeight : maxHeightPx;

	return (
		<div
			className={cn(expandableContentVariants({ variant }), className)}
			style={{
				"--expandable-max-height": `${typeof maxHeight === "string" ? maxHeight : `${maxHeight}px`}`,
			} as React.CSSProperties}
			{...props}
		>
			{/* コンテンツ部分 */}
			<div
				className={cn(
					"transition-all duration-300 ease-in-out",
					// CSS-first approach: 初期状態から高さ制限を適用
					"max-h-[var(--expandable-max-height)] overflow-hidden",
					// JavaScript読み込み後は動的制御に切り替え
					showButton && isExpanded && "!max-h-none !overflow-visible",
					showButton && !isExpanded && "!overflow-hidden",
				)}
				style={{
					// JavaScript読み込み後は精密な高さ制御
					...(showButton && {
						height: isExpanded ? `${contentHeight}px` : `${containerHeight}px`,
						maxHeight: "none", // CSS max-height を無効化
					}),
				}}
			>
				<div ref={contentRef} id={contentId}>
					{children}
				</div>
			</div>

			{/* フェードアウトグラデーション */}
			<div
				className={cn(
					"pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent transition-opacity duration-300",
					// CSS-first approach: showGradientがtrueなら初期状態から表示
					showGradient ? "opacity-100" : "opacity-0",
					// JavaScript読み込み後は動的制御
					showButton && isExpanded && "!opacity-0",
					showButton && !isExpanded && showGradient && "!opacity-100",
				)}
				style={{ height: `${gradientHeight}px` }}
				aria-hidden="true"
			/>

			{/* 展開/折りたたみボタン */}
			{showButton && (
				<div className="flex justify-center pt-2">
					<button
						type="button"
						onClick={toggleExpanded}
						onKeyDown={handleKeyDown}
						className={cn(expandableButtonVariants({ variant: buttonVariant }))}
						aria-expanded={isExpanded}
						aria-controls={contentId}
						aria-label={
							isExpanded
								? `${collapseText}。現在展開されています。`
								: `${expandText}。現在${Math.round(
										(maxHeightPx / contentHeight) * 100,
									)}%表示されています。`
						}
					>
						{isExpanded ? collapseText : expandText}
						{isExpanded ? (
							<FaChevronUp className="h-3 w-3" aria-hidden="true" />
						) : (
							<FaChevronDown className="h-3 w-3" aria-hidden="true" />
						)}
					</button>
				</div>
			)}
		</div>
	);
}

ExpandableContent.displayName = "ExpandableContent";

export { expandableButtonVariants, expandableContentVariants };