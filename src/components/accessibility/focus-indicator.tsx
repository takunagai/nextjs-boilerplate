/**
 * フォーカス表示強化コンポーネント
 * キーボードナビゲーション時のフォーカス表示を改善
 */
"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface FocusIndicatorProps {
	children: React.ReactNode;
	className?: string;
	/** フォーカス時の追加スタイル */
	focusClassName?: string;
	/** フォーカス表示を無効化 */
	disabled?: boolean;
}

/**
 * フォーカス表示強化コンポーネント
 * キーボードでのフォーカス時のみ強調表示を行う
 */
export function FocusIndicator({
	children,
	className,
	focusClassName = "ring-2 ring-primary/50 ring-offset-2",
	disabled = false,
}: FocusIndicatorProps) {
	const [isKeyboardUser, setIsKeyboardUser] = useState(false);

	useEffect(() => {
		// キーボード使用を検出
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Tab") {
				setIsKeyboardUser(true);
			}
		};

		// マウス使用を検出
		const handleMouseDown = () => {
			setIsKeyboardUser(false);
		};

		// タッチ使用を検出
		const handleTouchStart = () => {
			setIsKeyboardUser(false);
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("touchstart", handleTouchStart);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("touchstart", handleTouchStart);
		};
	}, []);

	if (disabled) {
		return <>{children}</>;
	}

	return (
		<div
			className={cn(
				"focus-within:transition-all focus-within:duration-200",
				isKeyboardUser &&
					`focus-within:${focusClassName.replace(/^focus-within:/, "")}`,
				className,
			)}
		>
			{children}
		</div>
	);
}

/**
 * スキップリンクコンポーネント
 * キーボードユーザー向けのナビゲーションスキップ機能
 */
export function SkipLink({
	href = "#main-content",
	children = "メインコンテンツにスキップ",
	className,
}: {
	href?: string;
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<a
			href={href}
			className={cn(
				"sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
				"bg-primary text-primary-foreground px-4 py-2 rounded-md",
				"font-medium transition-all duration-200",
				"focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
				className,
			)}
		>
			{children}
		</a>
	);
}

/**
 * アクセシビリティ対応のトグルボタン
 */
export interface AccessibleToggleProps {
	isPressed: boolean;
	onToggle: () => void;
	children: React.ReactNode;
	className?: string;
	ariaLabel?: string;
	ariaLabelledBy?: string;
}

export function AccessibleToggle({
	isPressed,
	onToggle,
	children,
	className,
	ariaLabel,
	ariaLabelledBy,
}: AccessibleToggleProps) {
	return (
		<button
			type="button"
			aria-pressed={isPressed}
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledBy}
			onClick={onToggle}
			className={cn(
				"inline-flex items-center justify-center",
				"focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
				"transition-all duration-200",
				className,
			)}
		>
			{children}
		</button>
	);
}

/**
 * アクセシビリティ対応のタブパネル
 */
export interface AccessibleTabPanelProps {
	isActive: boolean;
	tabId: string;
	children: React.ReactNode;
	className?: string;
}

export function AccessibleTabPanel({
	isActive,
	tabId,
	children,
	className,
}: AccessibleTabPanelProps) {
	return (
		<div
			role="tabpanel"
			aria-labelledby={tabId}
			hidden={!isActive}
			tabIndex={isActive ? 0 : -1}
			className={cn(
				"focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
				className,
			)}
		>
			{children}
		</div>
	);
}

/**
 * アクセシビリティ対応の開閉可能セクション
 */
export interface AccessibleCollapseProps {
	isOpen: boolean;
	onToggle: () => void;
	triggerContent: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	triggerClassName?: string;
	contentClassName?: string;
	triggerAriaLabel?: string;
}

export function AccessibleCollapse({
	isOpen,
	onToggle,
	triggerContent,
	children,
	className,
	triggerClassName,
	contentClassName,
	triggerAriaLabel,
}: AccessibleCollapseProps) {
	const triggerId = `collapse-trigger-${crypto.randomUUID()}`;
	const contentId = `collapse-content-${crypto.randomUUID()}`;

	return (
		<div className={className}>
			<button
				id={triggerId}
				type="button"
				aria-expanded={isOpen}
				aria-controls={contentId}
				aria-label={triggerAriaLabel}
				onClick={onToggle}
				className={cn(
					"w-full text-left",
					"focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
					"transition-all duration-200",
					triggerClassName,
				)}
			>
				{triggerContent}
			</button>
			<section
				id={contentId}
				aria-labelledby={triggerId}
				hidden={!isOpen}
				className={cn(
					"overflow-hidden transition-all duration-300",
					isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
					contentClassName,
				)}
			>
				{children}
			</section>
		</div>
	);
}
