/**
 * Google Maps埋め込みURLのパラメータオプション
 */
export interface GoogleMapEmbedOptions {
	/** 地図の中心となる住所 */
	address?: string;
	/** 緯度（-90〜90） */
	lat?: number;
	/** 経度（-180〜180） */
	lng?: number;
	/** ズームレベル（1〜20） */
	zoom?: number;
	/** 言語設定（例: 'ja', 'en'） */
	language?: string;
	/** 地域コード（例: 'jp', 'us'） */
	region?: string;
	/** 地図タイプ */
	mapType?: "roadmap" | "satellite" | "terrain" | "hybrid";
	/** 指定した座標にマーカーを表示するか */
	showMarker?: boolean;
	/** 検索クエリ（addressがない場合に使用） */
	query?: string;
}

/**
 * Google Maps APIキーを環境変数から取得
 * @returns API Key文字列、未設定の場合は空文字列
 */
const getGoogleMapsApiKey = (): string => {
	if (
		typeof process !== "undefined" &&
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
	) {
		return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	}
	return "";
};

/**
 * オプションパラメータからGoogle Maps埋め込みURLを生成する汎用関数
 * @param options Google Maps埋め込みオプション
 * @returns 埋め込み用のiframeSrc URL
 */
export function generateGoogleMapEmbedUrl(
	options: GoogleMapEmbedOptions,
): string {
	const {
		address,
		lat = 35.6812362,
		lng = 139.7671248,
		zoom = 15,
		language = "ja",
		region = "jp",
		mapType = "roadmap",
		showMarker = true,
		query,
	} = options;

	// APIキーを取得
	const apiKey = getGoogleMapsApiKey();

	// 基本パラメータの構築
	const params = new URLSearchParams({
		key: apiKey,
		language,
		region,
		maptype: mapType,
		zoom: zoom.toString(),
	});

	// 位置指定（住所または緯度経度）
	if (address) {
		params.set("q", address);
	} else if (query) {
		params.set("q", query);
	} else {
		params.set("center", `${lat},${lng}`);
		if (showMarker) {
			params.set("markers", `color:red|${lat},${lng}`);
		}
	}

	// Google Maps Embed APIのURLを構築
	return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
}

/**
 * 住所からGoogle Maps埋め込みURLを生成する（簡易版）
 * @param address 検索したい住所文字列
 * @param zoom ズームレベル（1〜20）
 * @param language 言語設定
 * @returns 埋め込み用のiframeSrc URL
 */
export function getMapUrlByAddress(
	address: string,
	zoom: number = 15,
	language: string = "ja",
): string {
	return generateGoogleMapEmbedUrl({
		address,
		zoom,
		language,
	});
}

/**
 * 緯度・経度からGoogle Maps埋め込みURLを生成する（簡易版）
 * @param lat 緯度
 * @param lng 経度
 * @param zoom ズームレベル
 * @param language 言語設定
 * @returns 埋め込み用のiframeSrc URL
 */
export function getMapUrlByLatLng(
	lat: number,
	lng: number,
	zoom: number = 15,
	language: string = "ja",
): string {
	return generateGoogleMapEmbedUrl({
		lat,
		lng,
		zoom,
		language,
		showMarker: true,
	});
}

/**
 * 検索クエリからGoogle Maps埋め込みURLを生成する
 * @param query 検索したいキーワード（例: "東京駅"）
 * @param zoom ズームレベル
 * @param language 言語設定
 * @returns 埋め込み用のiframeSrc URL
 */
export function getMapUrlByQuery(
	query: string,
	zoom: number = 15,
	language: string = "ja",
): string {
	return generateGoogleMapEmbedUrl({
		query,
		zoom,
		language,
	});
}
