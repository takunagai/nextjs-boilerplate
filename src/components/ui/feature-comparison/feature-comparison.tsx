import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { HiQuestionMarkCircle } from "react-icons/hi";

export type Feature = {
	key: string;
	label: string;
	description?: string;
};

export type Plan = {
	key: string;
	label: string;
	highlight?: boolean;
	description?: string;
};

export type FeatureComparisonProps = {
	features: Feature[];
	plans: Plan[];
	matrix: {
		[featureKey: string]: {
			[planKey: string]: ReactNode | boolean | string | number;
		};
	};
	className?: string;
	renderValue?: (
		value: ReactNode | boolean | string | number,
		feature: Feature,
		plan: Plan,
	) => ReactNode;
	title?: string; // テーブルのタイトル（アクセシビリティ用）
	
	// スタイルカスタマイズ用props
	tableClassName?: string;        // テーブル全体
	headerClassName?: string;       // ヘッダー行
	headerCellClassName?: string;   // ヘッダーセル
	rowClassName?: string;          // ボディ行
	cellClassName?: string;         // ボディセル
	highlightColumnClassName?: string; // ハイライト列のスタイル
};

// 値のレンダリングをデフォルト実装
const defaultRenderValue = (
	value: ReactNode | boolean | string | number,
): ReactNode => {
	if (value === true) {
		return <FaCheck className="text-green-600 mx-auto" aria-label="対応あり" />;
	}
	if (value === false) {
		return <FaXmark className="text-red-500 mx-auto" aria-label="対応なし" />;
	}
	// 値がundefinedやnullの場合は空文字列を表示
	if (value === undefined || value === null) {
		return <span className="text-muted-foreground">-</span>;
	}
	return value;
};

export function FeatureComparison({
	features,
	plans,
	matrix,
	className,
	renderValue,
	title = "機能比較表",
	tableClassName,
	headerClassName,
	headerCellClassName,
	rowClassName,
	cellClassName,
	highlightColumnClassName,
}: FeatureComparisonProps) {
	// カスタムレンダラーか、デフォルトを使用
	const valueRenderer = renderValue || defaultRenderValue;

	return (
		<div
			className={cn("w-full overflow-x-auto print:overflow-visible", className)}
		>
			{title && (
				<div className="sr-only" id="feature-comparison-title">
					{title}
				</div>
			)}
			<Table
				className={cn(tableClassName)}
				aria-labelledby="feature-comparison-title"
			>
				<thead className={headerClassName}>
					<tr>
						<th className={cn("w-[180px]", headerCellClassName)}>機能/サービス</th>
						{plans.map((plan) => (
							<th
								key={plan.key}
								className={cn(
									"text-center min-w-[120px]",
									plan.highlight && "bg-primary/5",
									headerCellClassName,
									plan.highlight && highlightColumnClassName,
								)}
							>
								<div className="flex flex-col items-center gap-1">
									<span className="font-bold">{plan.label}</span>
									{plan.description && (
										<span className="text-xs text-muted-foreground">
											{plan.description}
										</span>
									)}
									{plan.highlight && (
										<Badge variant="default" className="text-xs px-2">
											おすすめ
										</Badge>
									)}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{features.map((feature) => (
						<tr key={feature.key} className={rowClassName}>
							<td className={cn("font-medium", cellClassName)}>
								<div className="flex items-center gap-1">
									{feature.label}
									{feature.description && (
										<div
											className="group relative"
											title={feature.description}
											aria-label={`${feature.label}の説明: ${feature.description}`}
										>
											<HiQuestionMarkCircle className="h-4 w-4 text-muted-foreground cursor-help" />
											<div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-popover text-popover-foreground text-xs p-2 rounded-md shadow-md max-w-[200px] z-10 break-words">
												{feature.description}
											</div>
										</div>
									)}
								</div>
							</td>
							{plans.map((plan) => {
								// matrix値が存在しない場合は明示的に処理
								const value = matrix[feature.key]?.[plan.key] ?? null;
								return (
									<td
										key={`${feature.key}-${plan.key}`}
										className={cn(
											"text-center",
											plan.highlight && "bg-primary/5",
											cellClassName,
											plan.highlight && highlightColumnClassName,
										)}
									>
										{valueRenderer(value, feature, plan)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
