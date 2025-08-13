/**
 * 画面読み上げソフト対応コンポーネント
 */
"use client";

import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * 画面読み上げ専用テキスト
 * 視覚的には隠れているが、画面読み上げソフトには読まれる
 */
export function ScreenReaderOnly({
	children,
	className,
	as: Component = "span",
}: {
	children: React.ReactNode;
	className?: string;
	as?: keyof React.JSX.IntrinsicElements;
}) {
	return React.createElement(
		Component,
		{ className: cn("sr-only", className) },
		children,
	);
}

/**
 * アナウンス用のライブリージョン
 * 動的にコンテンツが変更された際に画面読み上げソフトに通知
 */
export interface LiveRegionProps {
	message: string;
	priority?: "polite" | "assertive" | "off";
	className?: string;
}

export function LiveRegion({
	message,
	priority = "polite",
	className,
}: LiveRegionProps) {
	return (
		<div
			role="status"
			aria-live={priority}
			aria-atomic="true"
			className={cn("sr-only", className)}
		>
			{message}
		</div>
	);
}

/**
 * 動的アナウンスメント用フック
 */
export function useAnnounce() {
	const announceRef = useRef<HTMLDivElement>(null);

	const announce = (
		message: string,
		priority: "polite" | "assertive" = "polite",
	) => {
		if (announceRef.current) {
			announceRef.current.setAttribute("aria-live", priority);
			announceRef.current.textContent = message;

			// メッセージをクリアして再度アナウンス可能にする
			setTimeout(() => {
				if (announceRef.current) {
					announceRef.current.textContent = "";
				}
			}, 1000);
		}
	};

	const AnnouncementRegion = () => (
		<div
			ref={announceRef}
			role="status"
			aria-live="polite"
			aria-atomic="true"
			className="sr-only"
		/>
	);

	return { announce, AnnouncementRegion };
}

/**
 * ページタイトルの動的更新
 */
export function usePageTitle(title?: string) {
	useEffect(() => {
		if (title) {
			document.title = title;
		}
	}, [title]);
}

/**
 * アクセシビリティ説明用コンポーネント
 */
export interface AccessibilityDescriptionProps {
	id: string;
	children: React.ReactNode;
	className?: string;
	visible?: boolean;
}

export function AccessibilityDescription({
	id,
	children,
	className,
	visible = false,
}: AccessibilityDescriptionProps) {
	return (
		<div
			id={id}
			className={cn(
				visible ? "text-sm text-muted-foreground mt-1" : "sr-only",
				className,
			)}
		>
			{children}
		</div>
	);
}

/**
 * 進行状況の通知
 */
export interface ProgressAnnouncementProps {
	value: number;
	max: number;
	label?: string;
	format?: (value: number, max: number) => string;
	className?: string;
}

export function ProgressAnnouncement({
	value,
	max,
	label = "進行状況",
	format = (v, m) => `${Math.round((v / m) * 100)}%完了`,
	className,
}: ProgressAnnouncementProps) {
	const _percentage = Math.round((value / max) * 100);
	const announcement = format(value, max);

	return (
		<div className={className}>
			<div
				role="progressbar"
				aria-valuenow={value}
				aria-valuemin={0}
				aria-valuemax={max}
				aria-label={`${label}: ${announcement}`}
			>
				<ScreenReaderOnly>
					{label}: {announcement}
				</ScreenReaderOnly>
			</div>
		</div>
	);
}

/**
 * エラーメッセージの通知
 */
export interface ErrorAnnouncementProps {
	errors: string[];
	id?: string;
	className?: string;
}

export function ErrorAnnouncement({
	errors,
	id,
	className,
}: ErrorAnnouncementProps) {
	if (errors.length === 0) return null;

	return (
		<div
			id={id}
			role="alert"
			aria-live="assertive"
			className={cn("text-destructive", className)}
		>
			{errors.length === 1 ? (
				<p>{errors[0]}</p>
			) : (
				<ul className="list-disc list-inside space-y-1">
					{errors.map((error, index) => (
						<li key={index}>{error}</li>
					))}
				</ul>
			)}
		</div>
	);
}

/**
 * ローディング状態の通知
 */
export interface LoadingAnnouncementProps {
	isLoading: boolean;
	loadingText?: string;
	completeText?: string;
	className?: string;
}

export function LoadingAnnouncement({
	isLoading,
	loadingText = "読み込み中",
	completeText = "読み込み完了",
	className,
}: LoadingAnnouncementProps) {
	return (
		<LiveRegion
			message={isLoading ? loadingText : completeText}
			priority="polite"
			className={className}
		/>
	);
}

/**
 * バリデーションエラーの通知
 */
export interface ValidationErrorProps {
	fieldName: string;
	error?: string;
	id?: string;
	className?: string;
}

export function ValidationError({
	fieldName,
	error,
	id,
	className,
}: ValidationErrorProps) {
	if (!error) return null;

	return (
		<div
			id={id}
			role="alert"
			aria-live="polite"
			className={cn("text-sm text-destructive mt-1", className)}
		>
			<ScreenReaderOnly>{fieldName}のエラー: </ScreenReaderOnly>
			{error}
		</div>
	);
}

/**
 * 成功メッセージの通知
 */
export interface SuccessAnnouncementProps {
	message: string;
	id?: string;
	className?: string;
	visible?: boolean;
}

export function SuccessAnnouncement({
	message,
	id,
	className,
	visible = true,
}: SuccessAnnouncementProps) {
	return (
		<div
			id={id}
			role="status"
			aria-live="polite"
			className={cn(
				visible ? "text-green-600 dark:text-green-400" : "sr-only",
				className,
			)}
		>
			{message}
		</div>
	);
}
