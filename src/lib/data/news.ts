/**
 * お知らせの型定義
 */
export interface NewsItem {
	id: string;
	date: Date;
	category: string;
	title: string;
	content?: string;
	link?: string;
}

/**
 * すべてのお知らせを取得する
 * @returns お知らせの配列
 */
export async function getAllNews(): Promise<NewsItem[]> {
	// 本番ではデータベースから取得する
	// 例: return await db.news.findMany({ orderBy: { date: 'desc' } });
	return getDummyNewsItems();
}

/**
 * IDによるお知らせの取得
 * @param id お知らせID
 * @returns お知らせデータまたはundefined
 */
export async function getNewsById(id: string): Promise<NewsItem | undefined> {
	// 本番ではデータベースから取得する
	// 例: return await db.news.findUnique({ where: { id } });
	const allNews = getDummyNewsItems();
	return allNews.find((news) => news.id === id);
}

/**
 * カテゴリでフィルタリングしたお知らせを取得
 * @param category カテゴリ名（未指定時は全件）
 * @returns フィルタリングされたお知らせの配列
 */
export async function getNewsByCategory(
	category?: string,
): Promise<NewsItem[]> {
	const allNews = await getAllNews();
	if (!category || category === "all") {
		return allNews;
	}
	return allNews.filter((news) => news.category === category);
}

/**
 * お知らせのカテゴリ一覧を取得
 * @returns カテゴリの配列
 */
export async function getNewsCategories(): Promise<string[]> {
	const allNews = await getAllNews();
	// カテゴリの重複を除去
	const categories = Array.from(
		new Set(allNews.map((news) => news.category)),
	);
	return categories;
}

/**
 * ダミーデータの生成（開発環境用）
 * @returns ダミーお知らせデータの配列
 */
function getDummyNewsItems(): NewsItem[] {
	return [
		{
			id: "news-1",
			date: new Date("2025-03-14"),
			category: "プレスリリース",
			title:
				"株式会社ミラスタがSaaS連携クラウド「hubflow（ハブフロー）」β版を提供開始",
			content: `
        <p>株式会社ミラスタ（本社：東京都渋谷区、代表取締役：山田太郎）は、本日、SaaS連携クラウドサービス「hubflow（ハブフロー）」のβ版の提供を開始したことを発表しました。</p>
        <p>「hubflow」は、企業が利用するさまざまなSaaSサービス間のデータ連携を実現し、業務効率化を支援するクラウドサービスです。直感的なインターフェースでノーコードでの連携設定が可能で、APIやWebhookの知識がなくても簡単に導入できます。</p>
        <h2>主な特徴</h2>
        <ul>
          <li>100以上のSaaSサービスとの連携に対応</li>
          <li>ドラッグ&ドロップでワークフローを構築</li>
          <li>条件分岐やデータ変換など高度な処理にも対応</li>
          <li>リアルタイムのモニタリングと通知機能</li>
        </ul>
        <p>β版の提供は無料で、正式版のリリースは2025年夏を予定しています。詳細や申し込みは公式サイトをご覧ください。</p>
      `,
		},
		{
			id: "news-2",
			date: new Date("2025-02-23"),
			category: "プレスリリース",
			title:
				"SaaS連携クラウドサービス「hubflow」を提供するミラスタ、ラクスライトクラウド社と事業提携を締結",
			content: `
        <p>株式会社ミラスタ（本社：東京都渋谷区）は、クラウド会計ソフトを提供するラクスライトクラウド株式会社（本社：大阪市中央区）とSaaS連携に関する事業提携を締結したことを発表しました。</p>
        <p>この提携により、ミラスタのSaaS連携プラットフォーム「hubflow」とラクスライトクラウドの会計ソフトウェア間でのデータ連携が強化されます。具体的には、請求書データの自動取り込みや会計データの連携など、業務効率化につながる機能が拡充されます。</p>
        <p>両社は今後も継続的な機能改善とサービス連携の拡大を進め、中小企業のDX推進を支援していく予定です。</p>
      `,
		},
		{
			id: "news-3",
			date: new Date("2025-01-22"),
			category: "プレスリリース",
			title:
				"SaaS連携クラウドサービス「hubflow」を提供するミラスタ、サイボウズのオフィシャルパートナーに認定",
		},
		{
			id: "news-4",
			date: new Date("2024-12-15"),
			category: "アップデート",
			title: "hubflowの新機能「自動連携ワークフロー」をリリースしました",
		},
		{
			id: "news-5",
			date: new Date("2024-11-10"),
			category: "メンテナンス",
			title:
				"【完了】11月12日（火）2:00〜5:00にシステムメンテナンスを実施します",
		},
		{
			id: "news-6",
			date: new Date("2024-10-05"),
			category: "メディア掲載",
			title: "日経クラウドFirstに当社のサービスが紹介されました",
		},
	];
}
