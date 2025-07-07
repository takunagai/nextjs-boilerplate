import type { IconType } from "react-icons";
import type { TabsListProps } from "@/components/ui/tabs";

/**
 * タブバリアント情報の型定義
 */
export interface TabVariantInfo {
	/** 表示名 */
	name: string;
	/** バリアント名 */
	variant: NonNullable<TabsListProps["variant"]>;
	/** 説明文 */
	description?: string;
}

/**
 * タブサイズ情報の型定義
 */
export interface TabSizeInfo {
	/** 表示名 */
	name: string;
	/** サイズ名 */
	size: NonNullable<TabsListProps["size"]>;
	/** 説明文 */
	description?: string;
}

/**
 * タブアイテムの型定義
 */
export interface TabItem {
	/** 一意識別子 */
	id: string;
	/** 表示ラベル */
	label: string;
	/** アイコンコンポーネント */
	icon?: IconType;
	/** コンテンツ */
	content?: string;
	/** 無効状態 */
	disabled?: boolean;
}

/**
 * ダッシュボード統計情報の型定義
 */
export interface DashboardStat {
	/** ラベル */
	label: string;
	/** 値 */
	value: string | number;
	/** 変化率 */
	change?: string;
	/** 変化の種類 */
	changeType?: "positive" | "negative" | "neutral";
	/** 色テーマ */
	color: "blue" | "green" | "purple" | "yellow" | "red";
}

/**
 * デモセクションのプロパティ型定義
 */
export interface DemoSectionProps {
	/** セクションタイトル */
	title: string;
	/** セクション説明 */
	description?: string;
	/** 子コンポーネント */
	children: React.ReactNode;
}

/**
 * フォームフィールドの型定義
 */
export interface FormField {
	/** フィールドID */
	id: string;
	/** ラベル */
	label: string;
	/** プレースホルダー */
	placeholder: string;
	/** 入力タイプ */
	type: "text" | "email" | "textarea" | "password";
	/** 必須フィールドかどうか */
	required?: boolean;
	/** 行数（textareaの場合） */
	rows?: number;
}
