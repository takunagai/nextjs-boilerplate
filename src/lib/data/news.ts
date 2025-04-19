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
	const categories = Array.from(new Set(allNews.map((news) => news.category)));
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
			category: "お知らせ",
			title: "ウェブサイトを開設いたしました",
			content: `
        <p>本日、当ウェブサイトを正式に開設いたしました。このサイトは、最新の技術環境で構築した自作のNext.jsボイラープレートをベースに、モダンなJamstackアーキテクチャを採用しています。</p>
        <p>長年培ってきたウェブ制作の経験と技術に、近年急速に発展してくるAI技術を組み合わせることで、高品質なサイトをよりスピーディーに構築できる基盤を作り上げました。このアプローチにより、パフォーマンスとSEO対策を両立させつつ、直感的なユーザー体験を提供しています。</p>
        <h2>サイトの主な特徴</h2>
        <ul>
          <li>Next.js 15とReact 19を採用した最新アーキテクチャ</li>
          <li>Tailwind CSS 4によるモダンで柔軟なデザインシステム</li>
          <li>TypeScriptによる堅牢な型安全性の確保</li>
          <li>最適化されたSEO対策とアクセシビリティ</li>
        </ul>
        <p>今後はこのウェブサイトやSNSを通じて、ウェブ開発やAI活用に関する情報、プロジェクトの進捗などを定期的に発信していく予定です。最新技術を駆使したウェブサイト構築に興味のある方は、ぜひお問い合わせページからご連絡ください。</p>
      `,
		},
		{
			id: "news-2",
			date: new Date("2025-02-23"),
			category: "お知らせ",
			title: "ゴールデンウィーク期間中の営業について",
			content: `
        <p>平素よりナガイ商店.comをご利用いただき、誠にありがとうございます。</p>
        <p>2025年ゴールデンウィーク期間中の営業日程についてお知らせいたします。</p>
        <h2>休業期間</h2>
        <p>2025年4月29日(火)〜5月6日(火)</p>
        <h2>対応について</h2>
        <p>上記期間中はお問い合わせへの返信やご注文の発送が行われません。ご不便をおかけしますが、何卒ご了承くださいますようお願い申し上げます。</p>
        <p>5月7日(水)より通常営業を再開いたします。</p>
      `,
		},
		{
			id: "news-3",
			date: new Date("2025-01-22"),
			category: "新商品",
			title: "新サービス「◯◯◯◯◯◯」新商品発売のお知らせ",
			content: `
        <p>ナガイ商店.comは、新サービス「◯◯◯◯◯◯」を2025年2月より開始いたします。</p>
        <p>このサービスでは、デザイン性と機能性を兼ね備えた日常使いに最適な商品を多数ラインナップしました。すべての製品は国内の職人による手作りで、素材にもこだわっています。</p>
        <p>新商品は順次オンラインストアに掲載予定です。ぜひご期待ください。</p>
      `,
		},
		{
			id: "news-4",
			date: new Date("2024-12-15"),
			category: "サービス",
			title: "会員ポイント制度をリニューアルしました",
			content: `
        <p>ナガイ商店.comの会員ポイント制度をリニューアルいたしました。</p>
        <p>従来のポイント制度を見直し、ポイント還元率を3%から5%に引き上げました。また、誕生月には還元率が倍になる「バースデーボーナス」も新設しています。</p>
        <p>既存会員様のポイントは自動的に新制度に移行されます。詳しくはマイページの「ポイント履歴」をご確認ください。</p>
      `,
		},
		{
			id: "news-5",
			date: new Date("2024-11-10"),
			category: "メンテナンス",
			title:
				"【完了】11月12日（火）2:00〜5:00にシステムメンテナンスを実施します",
			content: `
        <p>日頃よりナガイ商店.comをご利用いただき、誠にありがとうございます。</p>
        <p>システムの安定稼働と機能向上のため、下記の日程でメンテナンスを実施いたします。</p>
        <h2>メンテナンス日時</h2>
        <p>2024年11月12日（火）2:00〜5:00</p>
        <h2>影響範囲</h2>
        <p>メンテナンス中はオンラインストアの閲覧・ご注文ができません。ご不便をおかけしますが、ご理解とご協力をお願いいたします。</p>
        <p>【追記】予定通りメンテナンスは完了いたしました。</p>
      `,
		},
		{
			id: "news-6",
			date: new Date("2024-10-05"),
			category: "メディア掲載",
			title: "「手作り雑貨マガジン」に当店の商品が紹介されました",
			content: `
        <p>月刊「手作り雑貨マガジン」10月号の「注目のハンドメイドショップ」特集にて、ナガイ商店.comの商品が紹介されました。</p>
        <p>特集では、こだわりの素材と丁寧な作りの商品として当店のオリジナル商品の特徴や職人のインタビューが詳しく掲載されています。</p>
        <p>雑誌は全国の書店で発売中です。また、デジタル版もご覧いただけます。</p>
      `,
		},
	];
}
