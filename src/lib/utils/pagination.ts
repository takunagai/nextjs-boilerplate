/**
 * ページネーション用ユーティリティ関数
 */

/**
 * ページネーションの計算を行う
 * @param totalItems 総アイテム数
 * @param currentPage 現在のページ番号
 * @param itemsPerPage 1ページあたりのアイテム数
 * @param siblingCount 現在のページの前後に表示するページ数
 */
export function calculatePagination(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
  siblingCount = 1
) {
  // 総ページ数を計算
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // 現在のページが範囲外の場合は調整
  const page = Math.max(1, Math.min(currentPage, totalPages));
  
  // 開始インデックスと終了インデックスを計算
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  // ページネーションの範囲を計算
  let startPage = Math.max(1, page - siblingCount);
  let endPage = Math.min(totalPages, page + siblingCount);
  
  // 表示ページ数が一定になるように調整
  const totalPageNumbers = siblingCount * 2 + 1;
  if (endPage - startPage + 1 < totalPageNumbers) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + totalPageNumbers - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - totalPageNumbers + 1);
    }
  }
  
  return {
    totalItems,
    currentPage: page,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    startPage,
    endPage,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    items: Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
  };
}

/**
 * 現在のページ用のアイテムを取得する
 * @param items すべてのアイテム
 * @param page ページ番号
 * @param itemsPerPage 1ページあたりのアイテム数
 */
export function getPaginatedItems<T>(items: T[], page: number, itemsPerPage: number): T[] {
  const startIndex = (page - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
}
