import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// コンテンツアイテムの型定義
export type ContentItem = {
	title: string;
	description: string;
	image?: string;
	imageAlt?: string;
	tags?: string[];
	link?: {
		href: string;
		text: string;
	};
};

// アスペクト比マッピング（Tailwindで安全に使用できるクラス名）
const ASPECT_RATIO_MAP = {
	"1/1": "aspect-square",
	"2/3": "aspect-[2/3]",
	"3/2": "aspect-[3/2]",
	"3/4": "aspect-[3/4]",
	"4/3": "aspect-[4/3]",
	"16/9": "aspect-video",
	"9/16": "aspect-[9/16]",
} as const;

type AspectRatioKey = keyof typeof ASPECT_RATIO_MAP;

// コンポーネントのProps
type ContentItemsProps = {
	items: ContentItem[];
	columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	className?: string;
	imageHeight?: number; // 後方互換性のため残す
	aspectRatio?: AspectRatioKey | string;
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
	// アスペクト比をTailwind用の形式に変換（マッピングから取得、なければフォールバック）
	const aspectRatioClass =
		ASPECT_RATIO_MAP[aspectRatio as AspectRatioKey] ||
		`aspect-[${aspectRatio}]`;

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
				<div key={`${item.title}-${index}`} className="group overflow-hidden">
					{item.image && (
						<div
							className={`relative w-full ${aspectRatioClass} mb-4 rounded-lg overflow-hidden`}
						>
							<Image
								src={item.image}
								alt={item.imageAlt || `${item.title}のイメージ`}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
					)}
					<div>
						<h3 className="text-xl font-bold mb-3">{item.title}</h3>
						<p className="text-muted-foreground leading-relaxed mb-4">
							{item.description}
						</p>
						{item.tags && item.tags.length > 0 && (
							<div className="flex flex-wrap gap-1 mb-3">
								{item.tags.map((tag, tagIndex) => (
									<Badge
										key={`${tag}-${tagIndex}`}
										variant="secondary"
										className="text-[10px] px-1.5 py-0 h-5"
									>
										{tag}
									</Badge>
								))}
							</div>
						)}
						{item.link && (
							<Link
								href={item.link.href}
								className="inline-flex items-center mt-2 text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
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
