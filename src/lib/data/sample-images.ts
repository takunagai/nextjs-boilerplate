/**
 * サンプル画像データ
 * アニメーション実装のデモ用
 */

export interface SampleImage {
	id: string;
	src: string;
	alt: string;
	title: string;
	description: string;
	width: number;
	height: number;
	category: "landscape" | "portrait" | "square";
	tags: string[];
}

/**
 * Picsum Photos を利用したダミー画像データ
 * 実際のプロジェクトでは適切な画像に置き換える
 */
export const sampleImages: SampleImage[] = [
	// ランドスケープ画像
	{
		id: "landscape-1",
		src: "https://picsum.photos/800/500?random=1",
		alt: "美しい山岳風景",
		title: "雄大な山岳パノラマ",
		description: "朝日に照らされた山々の息を呑むような美しさ",
		width: 800,
		height: 500,
		category: "landscape",
		tags: ["自然", "山", "風景", "朝日"],
	},
	{
		id: "landscape-2",
		src: "https://picsum.photos/800/500?random=2",
		alt: "静かな湖畔の風景",
		title: "鏡のような湖面",
		description: "穏やかな湖に映る空と雲の美しいリフレクション",
		width: 800,
		height: 500,
		category: "landscape",
		tags: ["自然", "湖", "リフレクション", "静寂"],
	},
	{
		id: "landscape-3",
		src: "https://picsum.photos/800/500?random=3",
		alt: "海岸線の夕焼け",
		title: "ゴールデンアワーの海岸",
		description: "波打ち際に広がる黄金の夕陽の輝き",
		width: 800,
		height: 500,
		category: "landscape",
		tags: ["海", "夕焼け", "ゴールデンアワー", "波"],
	},

	// ポートレート画像
	{
		id: "portrait-1",
		src: "https://picsum.photos/600/800?random=4",
		alt: "都市の建築物",
		title: "モダンアーキテクチャ",
		description: "未来的なデザインの超高層ビル群",
		width: 600,
		height: 800,
		category: "portrait",
		tags: ["建築", "都市", "モダン", "未来"],
	},
	{
		id: "portrait-2",
		src: "https://picsum.photos/600/800?random=5",
		alt: "森の小径",
		title: "緑のトンネル",
		description: "陽だまりの差し込む美しい森の道",
		width: 600,
		height: 800,
		category: "portrait",
		tags: ["森", "小径", "陽だまり", "緑"],
	},
	{
		id: "portrait-3",
		src: "https://picsum.photos/600/800?random=6",
		alt: "古い街並み",
		title: "歴史ある石畳の街",
		description: "中世の雰囲気を残すヨーロッパの街角",
		width: 600,
		height: 800,
		category: "portrait",
		tags: ["歴史", "石畳", "ヨーロッパ", "街角"],
	},

	// スクエア画像
	{
		id: "square-1",
		src: "https://picsum.photos/600/600?random=7",
		alt: "花のクローズアップ",
		title: "マクロフォトグラフィー",
		description: "露に濡れた花びらの繊細な美しさ",
		width: 600,
		height: 600,
		category: "square",
		tags: ["花", "マクロ", "露", "クローズアップ"],
	},
	{
		id: "square-2",
		src: "https://picsum.photos/600/600?random=8",
		alt: "抽象的なパターン",
		title: "幾何学模様",
		description: "光と影が織りなす美しいパターン",
		width: 600,
		height: 600,
		category: "square",
		tags: ["抽象", "パターン", "幾何学", "光と影"],
	},
	{
		id: "square-3",
		src: "https://picsum.photos/600/600?random=9",
		alt: "テクスチャーの世界",
		title: "自然のテクスチャー",
		description: "木の皮や岩肌などの興味深い表面",
		width: 600,
		height: 600,
		category: "square",
		tags: ["テクスチャー", "自然", "表面", "パターン"],
	},

	// 追加画像（グリッド表示のため）
	{
		id: "landscape-4",
		src: "https://picsum.photos/800/500?random=10",
		alt: "砂漠の風景",
		title: "無限の砂丘",
		description: "風が作り出した砂の芸術作品",
		width: 800,
		height: 500,
		category: "landscape",
		tags: ["砂漠", "砂丘", "風", "芸術"],
	},
	{
		id: "portrait-4",
		src: "https://picsum.photos/600/800?random=11",
		alt: "滝の流れ",
		title: "水のカーテン",
		description: "岩を削り続ける力強い水の流れ",
		width: 600,
		height: 800,
		category: "portrait",
		tags: ["滝", "水", "力強さ", "自然"],
	},
	{
		id: "square-4",
		src: "https://picsum.photos/600/600?random=12",
		alt: "夜空の星座",
		title: "星降る夜",
		description: "都市から離れた場所で見上げる満天の星空",
		width: 600,
		height: 600,
		category: "square",
		tags: ["夜空", "星", "天の川", "宇宙"],
	},
];

/**
 * カテゴリー別に画像を取得する関数
 */
export function getImagesByCategory(category: SampleImage["category"]) {
	return sampleImages.filter((image) => image.category === category);
}

/**
 * ランダムに画像を取得する関数
 */
export function getRandomImages(count: number): SampleImage[] {
	const shuffled = [...sampleImages].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

/**
 * 画像をIDで取得する関数
 */
export function getImageById(id: string): SampleImage | undefined {
	return sampleImages.find((image) => image.id === id);
}
