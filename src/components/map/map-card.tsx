import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { generateGoogleMapEmbedUrl } from "./utils";

type MapType = "roadmap" | "satellite" | "terrain" | "hybrid";

export interface MapCardProps {
	/** 地図カードのタイトル */
	title: string;
	/** 地図の説明文（任意） */
	description?: string;
	/** 地図のiframeSrc URL（addressまたはlatLngと両方指定した場合、こちらが優先） */
	iframeSrc?: string;
	/** 住所（iframeSrcを指定しない場合に使用） */
	address?: string;
	/** 緯度（addressの代わりに使用可能） */
	lat?: number;
	/** 経度（addressの代わりに使用可能） */
	lng?: number;
	/** 検索クエリ（addressやlatLng指定がない場合に使用） */
	query?: string;
	/** 電話番号（任意） */
	phone?: string;
	/** 追加のクラス名（任意） */
	className?: string;
	/** 全画面表示ボタンの有無（任意、デフォルト:true） */
	allowFullScreen?: boolean;
	/** ズームレベル（1〜20、デフォルト:15） */
	zoom?: number;
	/** 地図タイプ（roadmap/satellite/terrain/hybrid、デフォルト:roadmap） */
	mapType?: MapType;
	/** 言語設定（デフォルト:ja） */
	language?: string;
}

export function MapCard({
	title,
	description,
	iframeSrc,
	address,
	lat,
	lng,
	query,
	phone,
	className,
	allowFullScreen = true,
	zoom = 15,
	mapType = "roadmap",
	language = "ja",
}: MapCardProps) {
	// iframeSrcが指定されていない場合は、他のパラメータから生成
	const mapSrc =
		iframeSrc ||
		generateGoogleMapEmbedUrl({
			address,
			lat,
			lng,
			query,
			zoom,
			mapType,
			language,
			showMarker: true,
		});

	// いずれかの位置情報が必須
	if (!mapSrc && !address && !(lat && lng) && !query) {
		console.error(
			"MapCard: iframeSrc, address, lat&lng, または query のいずれかを指定してください",
		);
	}

	return (
		<Card className={cn("w-full max-w-2xl mx-auto", className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				<div
					className="
            w-full
            aspect-square min-h-[200px]
            sm:aspect-[4/3] sm:min-h-[280px]
            md:aspect-[16/9] md:min-h-[360px]
            rounded-lg overflow-hidden shadow-sm dark:shadow-gray-800 mb-6
          "
				>
					<iframe
						src={mapSrc}
						title={`${title}の地図`}
						aria-label={`${title}の地図`}
						width="100%"
						height="100%"
						className="w-full h-full border-0"
						allowFullScreen={allowFullScreen}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						tabIndex={-1}
					/>
				</div>

				<div className="space-y-4">
					<address className="not-italic">
						<Label
							htmlFor="map-address"
							className="block mb-1 text-sm font-medium"
						>
							住所
						</Label>
						<p id="map-address" className="text-base">
							{address}
						</p>
					</address>

					{phone && (
						<div>
							<Label
								htmlFor="map-phone"
								className="block mb-1 text-sm font-medium"
							>
								電話
							</Label>
							<a
								id="map-phone"
								href={`tel:${phone.replace(/[^0-9]/g, "")}`}
								className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm"
							>
								{phone}
							</a>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
