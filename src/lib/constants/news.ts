/**
 * お知らせ関連の定数設定
 */

// トップページに表示するお知らせの件数
export const LATEST_NEWS_COUNT = 5;

// 一覧ページ関連

// 1ページあたりの最大表示件数 (ページネーション確認のために少なくしてある)
export const NEWS_PER_PAGE = 3;

// ページネーション設定
export const PAGINATION_CONFIG = {
	// ページ番号の表示数（奇数で指定）
	siblingCount: 1,
	// 「...」で省略表示するかどうか
	ellipsis: true,
	// 先頭・末尾のページ番号を常に表示するかどうか
	showEdges: true,
};

// URLクエリパラメータの名前
export const QUERY_PARAMS = {
	page: "page",
	category: "category",
};
