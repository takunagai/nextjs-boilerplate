import {
	FaBookmark,
	FaChartBar,
	FaCog,
	FaDownload,
	FaEnvelope,
	FaGlobe,
	FaHeart,
	FaHome,
	FaPhone,
	FaShare,
	FaShoppingCart,
	FaUser,
} from "react-icons/fa";
import type {
	DashboardStat,
	FormField,
	TabItem,
	TabSizeInfo,
	TabVariantInfo,
} from "./types";

/**
 * タブバリアントのデモデータ
 */
export const TAB_VARIANTS: readonly TabVariantInfo[] = [
	{
		name: "デフォルト",
		variant: "default",
		description: "標準的なタブスタイル（背景とシャドウ付き）",
	},
	{
		name: "アンダーライン",
		variant: "underline",
		description: "下線で選択状態を表現するタブスタイル",
	},
	{
		name: "ピル",
		variant: "pills",
		description: "丸みを帯びたボタン風のタブスタイル",
	},
	{
		name: "ミニマル",
		variant: "minimal",
		description: "最小限のスタイルでシンプルなタブ",
	},
] as const;

/**
 * タブサイズのデモデータ
 */
export const TAB_SIZES: readonly TabSizeInfo[] = [
	{
		name: "小",
		size: "sm",
		description: "コンパクトなサイズ（高さ32px）",
	},
	{
		name: "中",
		size: "md",
		description: "標準サイズ（高さ36px）",
	},
	{
		name: "大",
		size: "lg",
		description: "大きめのサイズ（高さ40px）",
	},
] as const;

/**
 * ナビゲーション用のタブアイテム
 */
export const NAVIGATION_TABS: readonly TabItem[] = [
	{
		id: "dashboard",
		label: "ダッシュボード",
		icon: FaHome,
		content: "メインのダッシュボード画面です。",
	},
	{
		id: "analytics",
		label: "分析",
		icon: FaChartBar,
		content: "サイトの分析データとレポートがここに表示されます。",
	},
	{
		id: "users",
		label: "ユーザー",
		icon: FaUser,
		content: "ユーザーの一覧と管理機能がここに表示されます。",
	},
	{
		id: "settings",
		label: "設定",
		icon: FaCog,
		content: "アプリケーションの設定項目がここに表示されます。",
	},
] as const;

/**
 * 多数のタブのデモデータ
 */
export const MANY_TABS: readonly TabItem[] = [
	{ id: "dashboard", label: "ダッシュボード", icon: FaHome },
	{ id: "analytics", label: "分析", icon: FaChartBar },
	{ id: "users", label: "ユーザー", icon: FaUser },
	{ id: "settings", label: "設定", icon: FaCog },
	{ id: "messages", label: "メッセージ", icon: FaEnvelope },
	{ id: "contacts", label: "連絡先", icon: FaPhone },
	{ id: "website", label: "ウェブサイト", icon: FaGlobe },
	{ id: "ecommerce", label: "ECサイト", icon: FaShoppingCart },
	{ id: "favorites", label: "お気に入り", icon: FaHeart },
	{ id: "bookmarks", label: "ブックマーク", icon: FaBookmark },
	{ id: "downloads", label: "ダウンロード", icon: FaDownload },
	{ id: "sharing", label: "共有", icon: FaShare },
] as const;

/**
 * 縦方向タブのデモデータ
 */
export const VERTICAL_TABS: readonly TabItem[] = [
	{
		id: "profile",
		label: "プロフィール",
		icon: FaUser,
		content: "あなたのプロフィール情報を管理できます。",
	},
	{
		id: "account",
		label: "アカウント",
		icon: FaCog,
		content: "アカウントの基本情報やセキュリティ設定を管理できます。",
	},
	{
		id: "notifications",
		label: "通知",
		icon: FaEnvelope,
		content: "通知の受信方法や頻度を設定できます。",
	},
	{
		id: "privacy",
		label: "プライバシー",
		icon: FaHeart,
		content: "プライバシーに関する設定を管理できます。",
	},
] as const;

/**
 * 制御されたタブのデモデータ
 */
export const CONTROLLED_TABS: readonly TabItem[] = [
	{
		id: "overview",
		label: "概要",
		content: "製品やサービスの概要情報がここに表示されます。",
	},
	{
		id: "details",
		label: "詳細",
		content: "詳細な仕様や機能についての情報がここに表示されます。",
	},
	{
		id: "reviews",
		label: "レビュー",
		content: "ユーザーからのレビューや評価がここに表示されます。",
	},
	{
		id: "related",
		label: "関連",
		content: "関連する製品やサービスがここに表示されます。",
	},
] as const;

/**
 * ダッシュボード統計のデモデータ
 */
export const DASHBOARD_STATS: readonly DashboardStat[] = [
	{
		label: "総ユーザー数",
		value: "1,234",
		change: "+12%",
		changeType: "positive",
		color: "blue",
	},
	{
		label: "売上",
		value: "¥456,789",
		change: "+8%",
		changeType: "positive",
		color: "green",
	},
	{
		label: "注文数",
		value: "567",
		change: "+5%",
		changeType: "positive",
		color: "purple",
	},
] as const;

/**
 * プロフィールフォームのフィールド定義
 */
export const PROFILE_FORM_FIELDS: readonly FormField[] = [
	{
		id: "displayName",
		label: "表示名",
		placeholder: "山田太郎",
		type: "text",
		required: true,
	},
	{
		id: "bio",
		label: "自己紹介",
		placeholder: "自己紹介を入力してください",
		type: "textarea",
		rows: 3,
	},
] as const;

/**
 * セクション定義
 */
export const DEMO_SECTIONS = {
	variants: {
		title: "基本的なバリアント",
		description: "異なるスタイルのタブバリアントデモンストレーション",
	},
	sizes: {
		title: "サイズバリアント",
		description: "小・中・大のサイズバリエーション",
	},
	icons: {
		title: "アイコン付きタブ",
		description: "アイコンとテキストを組み合わせたタブの使用例",
	},
	scrollable: {
		title: "スクロール可能なタブ",
		description: "多数のタブがある場合のスクロール対応デモ",
	},
	vertical: {
		title: "縦方向のタブ",
		description: "設定パネル風の縦配置タブレイアウト",
	},
	controlled: {
		title: "制御されたタブ",
		description: "外部状態で制御されるタブの実装例",
	},
} as const;
