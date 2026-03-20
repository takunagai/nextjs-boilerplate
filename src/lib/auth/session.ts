import { cache } from "react";
import { auth } from "@/lib/auth";

/**
 * リクエスト単位でセッション取得を重複排除するキャッシュ付きヘルパー
 *
 * React.cache() により、同一リクエスト内で複数のサーバーコンポーネントから
 * 呼び出しても auth() は1回だけ実行される。
 */
export const getSession = cache(async () => {
	return await auth();
});
