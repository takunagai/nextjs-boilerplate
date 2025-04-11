/**
 * お知らせ関連の定数設定
 */

// 1ページあたりの最大表示件数
export const NEWS_PER_PAGE = 5;

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
  page: 'page',
  category: 'category',
};
