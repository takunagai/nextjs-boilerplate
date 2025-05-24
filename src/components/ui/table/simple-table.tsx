/**
 * テーブルコンポーネント（シンプルバージョン）
 *
 * 注意: このファイルは下位互換性のために残してありますが、
 * 新しいコードでは src/components/ui/table/Table から
 * インポートされたテーブルコンポーネントを使用してください。
 */

import { Table, tableVariants } from "./Table";
import type { TableProps } from "./Table";

// 下位互換性のために同じエクスポートを提供
export { Table, tableVariants };
export type { TableProps };

// 将来的に削除予定の警告をコンソールに出力（開発環境のみ）
if (process.env.NODE_ENV !== "production") {
	console.warn(
		"Warning: Importing from 'simple-table.tsx' is deprecated. " +
			"Please import from '@/components/ui/table' instead.",
	);
}
