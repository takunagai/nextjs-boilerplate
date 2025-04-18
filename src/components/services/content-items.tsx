import Link from "next/link";
import Image from "next/image";

// コンテンツアイテムの型定義
export type ContentItem = {
	title: string;
	description: string;
	image?: string;
	imageAlt?: string;
	link?: {
		href: string;
		text: string;
	};
};

// コンポーネントのProps
type ContentItemsProps = {
	items: ContentItem[];
	columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	className?: string;
	imageHeight?: number; // 後方互換性のため残す
	aspectRatio?: string;
};

/**
 * コンテンツアイテムのグリッドを表示するコンポーネント
 */
export function ContentItems({
	items,
	columns = 2,
	className = "",
	imageHeight, // 使用しないが後方互換性のため残す
	aspectRatio = "2/3",
}: ContentItemsProps) {
	// アスペクト比をTailwind用の形式に変換
	const aspectRatioClass = `aspect-[${aspectRatio}]`;

	const getGridCols = () => {
		switch (columns) {
			case 1:
				return "grid-cols-1";
			case 2:
				return "grid-cols-1 md:grid-cols-2";
			case 3:
				return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
			case 4:
				return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
			case 5:
				return "grid-cols-1 md:grid-cols-2 lg:grid-cols-5";
			case 6:
				return "grid-cols-1 md:grid-cols-3 lg:grid-cols-6";
			case 7:
				return "grid-cols-1 md:grid-cols-3 lg:grid-cols-7";
			case 8:
				return "grid-cols-1 md:grid-cols-4 lg:grid-cols-8";
			case 9:
				return "grid-cols-1 md:grid-cols-4 lg:grid-cols-9";
			case 10:
				return "grid-cols-1 md:grid-cols-5 lg:grid-cols-10";
			case 11:
				return "grid-cols-1 md:grid-cols-5 lg:grid-cols-11";
			case 12:
				return "grid-cols-1 md:grid-cols-6 lg:grid-cols-12";
			default:
				return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
		}
	};

	return (
		<div className={`grid ${getGridCols()} gap-6 ${className}`}>
			{items.map((item, index) => (
				<div
					key={index}
					className="border rounded-md overflow-hidden hover:shadow-md transition-shadow bg-card"
				>
					{item.image && (
						<div
							className={`relative w-full ${aspectRatioClass}`}
						>
							<Image
								src={item.image}
								alt={item.imageAlt || `${item.title}のイメージ`}
								fill
								className="object-cover"
							/>
						</div>
					)}
					<div className="p-5">
						<h3 className="text-lg font-semibold mb-2">{item.title}</h3>
						<p className="text-muted-foreground">{item.description}</p>
						{item.link && (
							<Link
								href={item.link.href}
								className="inline-block mt-4 text-primary hover:underline font-medium"
							>
								{item.link.text}
							</Link>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
