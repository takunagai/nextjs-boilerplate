import { cva } from "class-variance-authority";
import clsx from "clsx";
import type { ReactNode } from "react";

export type NumberedListItem = {
	text: ReactNode;
	url?: string;
	className?: string;
	ariaLabel?: string;
};

export type NumberedListProps = {
	items: NumberedListItem[];
	className?: string;
	itemClassName?: string;
	inline?: boolean;
	/** "plain" = 装飾なし, "badge" = 数字バッジ */
	numberStyle?: "plain" | "badge";
	/** 開始番号（デフォルト1） */
	start?: number;
	ariaLabel?: string;
	role?: string;
};

const ulVariants = cva("list-none p-0 m-0", {
	variants: {
		inline: {
			false: "flex flex-col gap-2",
			true: "flex flex-row flex-wrap gap-x-4 gap-y-2 items-center",
		},
	},
	defaultVariants: {
		inline: false,
	},
});

const liVariants = cva("flex items-center", {
	variants: {
		inline: {
			false: "",
			true: "",
		},
	},
	defaultVariants: {
		inline: false,
	},
});

const badgeClass =
	"inline-block bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-bold mr-2 min-w-6 text-center";

export function NumberedList({
	items,
	className,
	itemClassName,
	inline = false,
	numberStyle = "plain",
	start = 1,
	ariaLabel,
	role = "list",
}: NumberedListProps) {
	return (
		<ul
			className={clsx(ulVariants({ inline }), className)}
			aria-label={ariaLabel}
			role={role}
		>
			{items.map((item, i) => {
				const number = start + i;
				const isLink = !!item.url;
				// ※本番用途ではkeyにindexではなくユニークな値を推奨
				return (
					<li
						key={i}
						className={clsx(
							liVariants({ inline }),
							itemClassName,
							item.className,
						)}
						aria-label={item.ariaLabel}
					>
						{numberStyle === "badge" ? (
							<span className={badgeClass} aria-hidden="true">
								{number}
							</span>
						) : (
							<span
								className="mr-2 font-mono text-gray-500 min-w-6 text-right tabular-nums"
								aria-hidden="true"
							>
								{number}.
							</span>
						)}
						{isLink ? (
							<a
								href={item.url}
								className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 underline-offset-2 hover:underline transition-colors"
								tabIndex={0}
								aria-current={
									item.url &&
									typeof window !== "undefined" &&
									window.location?.pathname === item.url
										? "page"
										: undefined
								}
							>
								{item.text}
							</a>
						) : (
							<span>{item.text}</span>
						)}
					</li>
				);
			})}
		</ul>
	);
}
