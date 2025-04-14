import { cva } from "class-variance-authority";
import clsx from "clsx";
import type { ReactNode } from "react";

export type SimpleListItem = {
	/** 表示テキスト */
	text: ReactNode;
	/** オプション: URLがあればリンク化 */
	url?: string;
	/** オプション: カスタムマーカー（テキストまたはアイコン） */
	marker?: ReactNode | string | null;
	/** オプション: マーカーの追加クラス */
	markerClassName?: string;
	/** オプション: li要素への追加クラス */
	className?: string;
	/** オプション: aria-label等 */
	ariaLabel?: string;
	/** オプション: マーカーを非表示にする */
	hideMarker?: boolean;
};

export type SimpleListProps = {
	/** リストデータ */
	items: SimpleListItem[];
	/** ul/li共通の追加クラス */
	className?: string;
	/** 各liに共通で付与するクラス */
	itemClassName?: string;
	/** インラインリスト化 */
	inline?: boolean;
	/** マーカーのデフォルト値（テキストまたはReactNode） */
	marker?: ReactNode | string;
	/** マーカーの共通追加クラス */
	markerClassName?: string;
	/** ul要素のaria-label等 */
	ariaLabel?: string;
	/** ul要素のrole（デフォルト:list） */
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

export function SimpleList({
	items,
	className,
	itemClassName,
	inline = false,
	marker,
	markerClassName,
	ariaLabel,
	role = "list",
}: SimpleListProps) {
	return (
		<ul
			className={clsx(ulVariants({ inline }), className)}
			aria-label={ariaLabel}
			role={role}
		>
			{items.map((item, i) => {
				// ※本番用途ではkeyにindexではなくユニークな値を推奨
				// マーカーの決定: 非表示→null, 個別指定→個別, 親→親, それ以外→null
				let Marker: ReactNode | string | null = null;
				if (item.hideMarker) {
					Marker = null;
				} else if (item.marker !== undefined) {
					Marker = item.marker;
				} else if (marker !== undefined) {
					Marker = marker;
				}
				const markerClasses = clsx(
					"mr-2 flex-shrink-0",
					markerClassName,
					item.markerClassName,
				);
				const isLink = !!item.url;
				return (
					// role="listitem"はHTML semanticsで暗黙的なので削除
					<li
						key={i}
						className={clsx(
							liVariants({ inline }),
							itemClassName,
							item.className,
						)}
						aria-label={item.ariaLabel}
					>
						{Marker != null && Marker !== false && (
							<span className={markerClasses} aria-hidden="true">
								{Marker}
							</span>
						)}
						{isLink ? (
							<a
								href={item.url}
								className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 underline-offset-2 hover:underline transition-colors"
								tabIndex={0}
								aria-current={
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
