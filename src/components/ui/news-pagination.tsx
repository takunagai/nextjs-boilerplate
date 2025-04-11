import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { QUERY_PARAMS } from "@/lib/constants/news";

interface NewsPaginationProps {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
  showEllipsis?: boolean;
  showEdges?: boolean;
  items: number[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  baseUrl: string;
  category?: string;
  className?: string;
}

/**
 * ニュース一覧用ページネーションコンポーネント
 * サーバーコンポーネントで実装し、レイアウトシフトを回避
 */
export function NewsPagination({
  totalPages,
  currentPage,
  siblingCount = 1,
  showEllipsis = true,
  showEdges = true,
  items,
  hasPreviousPage,
  hasNextPage,
  baseUrl,
  category,
  className,
}: NewsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  /**
   * ページリンクのURLを生成
   * カテゴリがある場合は、カテゴリパラメータも追加
   */
  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    params.set(QUERY_PARAMS.page, pageNum.toString());
    
    if (category && category !== "all") {
      params.set(QUERY_PARAMS.category, category);
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  // 先頭と末尾のページを計算
  const firstPage = 1;
  const lastPage = totalPages;
  const showFirstPage = showEdges && !items.includes(firstPage) && firstPage < items[0];
  const showLastPage = showEdges && !items.includes(lastPage) && lastPage > items[items.length - 1];
  
  // 省略記号の表示制御
  const showStartEllipsis = showEllipsis && showFirstPage && items[0] > firstPage + 1;
  const showEndEllipsis = showEllipsis && showLastPage && items[items.length - 1] < lastPage - 1;

  return (
    <Pagination aria-label="ページネーション" className={cn(className)}>
      <PaginationContent className="flex flex-wrap gap-1">
        {/* 前のページへ */}
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              aria-label="前のページへ"
              className="gap-0.5 text-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">前へ</span>
            </PaginationPrevious>
          </PaginationItem>
        )}

        {/* 先頭ページ */}
        {showFirstPage && (
          <PaginationItem>
            <PaginationLink
              href={createPageUrl(firstPage)}
              aria-label={`${firstPage}ページ目`}
              isActive={currentPage === firstPage}
            >
              {firstPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 先頭の省略記号 */}
        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis aria-hidden="true" />
          </PaginationItem>
        )}

        {/* ページ番号一覧 */}
        {items.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageUrl(page)}
              isActive={page === currentPage}
              aria-label={`${page}ページ目`}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "text-sm min-w-9 px-3",
                page === currentPage && "font-semibold"
              )}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 末尾の省略記号 */}
        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis aria-hidden="true" />
          </PaginationItem>
        )}

        {/* 末尾ページ */}
        {showLastPage && (
          <PaginationItem>
            <PaginationLink
              href={createPageUrl(lastPage)}
              aria-label={`${lastPage}ページ目`}
              isActive={currentPage === lastPage}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 次のページへ */}
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
              aria-label="次のページへ"
              className="gap-0.5 text-sm"
            >
              <span className="hidden sm:inline">次へ</span>
              <ChevronRight className="h-4 w-4" />
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
