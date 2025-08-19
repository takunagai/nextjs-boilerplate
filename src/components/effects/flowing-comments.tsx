/**
 * ニコニコ動画風のコメント流しエフェクト
 * 背景に薄いテキストが右から左に流れる
 */
"use client";

import { useEffect, useState } from "react";
import { useWindowResize } from "@/hooks/use-window-resize";
import { UI_FLOWING_COMMENTS, UI_PERFORMANCE } from "@/lib/constants/ui";
import { generateId } from "@/lib/utils/id";

// 流れるメッセージデータ（「できること」をテーマに）
const COMMENTS = [
	"Webサイト制作できます",
	"SEO対策も可能",
	"レスポンシブデザイン対応",
	"高速化も得意です",
	"UI/UXデザイン",
	"フロントエンド開発",
	"バックエンド構築",
	"データベース設計",
	"API開発可能",
	"モバイルアプリ対応",
	"WordPress構築",
	"Next.js開発",
	"React開発",
	"TypeScript対応",
	"AI機能実装",
	"ChatGPT API連携",
	"画像生成AI活用",
	"動画編集サポート",
	"ブログ記事作成",
	"SNS運用支援",
	"ロゴデザイン制作",
	"バナー制作",
	"EC サイト構築",
	"予約システム開発",
	"会員システム構築",
	"決済システム連携",
	"メール配信機能",
	"チャットボット作成",
	"データ分析ツール",
	"業務効率化システム",
	"クラウド環境構築",
	"セキュリティ対策",
	"パフォーマンス最適化",
	"アクセシビリティ対応",
	"多言語対応サイト",
	"CMS カスタマイズ",
	"プラグイン開発",
	"テーマ制作",
	"運用保守サポート",
	"技術コンサル可能",
];

interface Comment {
	id: string;
	text: string;
	top: number;
	duration: number;
	delay: number;
	size: number;
}

interface FlowingCommentsProps {
	maxComments?: number;
	className?: string;
	comments?: string[];
}

export function FlowingComments({
	maxComments = UI_FLOWING_COMMENTS.DEFAULT_MAX_COMMENTS,
	className = "",
	comments = COMMENTS,
}: FlowingCommentsProps) {
	const [commentList, setCommentList] = useState<Comment[]>([]);
	const [isVisible, setIsVisible] = useState(false);

	// 画面リサイズ時にコメントサイズを再計算
	useWindowResize(
		() => {
			// 画面サイズに応じたサイズ設定
			const isDesktop =
				window.innerWidth >= UI_FLOWING_COMMENTS.DESKTOP_BREAKPOINT;
			const baseSize = isDesktop
				? UI_FLOWING_COMMENTS.DESKTOP_BASE_SIZE
				: UI_FLOWING_COMMENTS.MOBILE_BASE_SIZE;
			const sizeRange = isDesktop
				? UI_FLOWING_COMMENTS.DESKTOP_SIZE_RANGE
				: UI_FLOWING_COMMENTS.MOBILE_SIZE_RANGE;

			setCommentList((prev) =>
				prev.map((comment) => ({
					...comment,
					size: Math.random() * sizeRange + baseSize,
				})),
			);
		},
		{ debounceMs: UI_PERFORMANCE.RESIZE_DEBOUNCE },
	);

	useEffect(() => {
		// クライアントサイドでのみ実行
		if (typeof window === "undefined") return;

		// 画面サイズに応じたサイズ設定を関数化
		const getSizeParams = () => {
			const isDesktop =
				window.innerWidth >= UI_FLOWING_COMMENTS.DESKTOP_BREAKPOINT;
			return {
				baseSize: isDesktop
					? UI_FLOWING_COMMENTS.DESKTOP_BASE_SIZE
					: UI_FLOWING_COMMENTS.MOBILE_BASE_SIZE,
				sizeRange: isDesktop
					? UI_FLOWING_COMMENTS.DESKTOP_SIZE_RANGE
					: UI_FLOWING_COMMENTS.MOBILE_SIZE_RANGE,
			};
		};

		// 初期コメントを生成
		const initialComments: Comment[] = [];
		const { baseSize, sizeRange } = getSizeParams();

		for (let i = 0; i < maxComments; i++) {
			initialComments.push({
				id: generateId(),
				text: comments[Math.floor(Math.random() * comments.length)],
				top:
					Math.random() *
						(UI_FLOWING_COMMENTS.BOTTOM_LIMIT - UI_FLOWING_COMMENTS.TOP_LIMIT) +
					UI_FLOWING_COMMENTS.TOP_LIMIT,
				duration:
					Math.random() *
						(UI_FLOWING_COMMENTS.DURATION_MAX -
							UI_FLOWING_COMMENTS.DURATION_MIN) +
					UI_FLOWING_COMMENTS.DURATION_MIN,
				delay: Math.random() * UI_FLOWING_COMMENTS.INITIAL_DELAY_MAX,
				size: Math.random() * sizeRange + baseSize,
			});
		}
		setCommentList(initialComments);
		setIsVisible(true);

		// 定期的にコメントを更新
		const interval = setInterval(() => {
			setCommentList((prev) =>
				prev.map((comment) => {
					// 更新時も画面サイズに応じたサイズ設定
					const { baseSize, sizeRange } = getSizeParams();

					return {
						...comment,
						// React key は保持（再生成しない）
						text: comments[Math.floor(Math.random() * comments.length)],
						top:
							Math.random() *
								(UI_FLOWING_COMMENTS.BOTTOM_LIMIT -
									UI_FLOWING_COMMENTS.TOP_LIMIT) +
							UI_FLOWING_COMMENTS.TOP_LIMIT,
						duration:
							Math.random() *
								(UI_FLOWING_COMMENTS.DURATION_MAX -
									UI_FLOWING_COMMENTS.DURATION_MIN) +
							UI_FLOWING_COMMENTS.DURATION_MIN,
						delay: Math.random() * UI_FLOWING_COMMENTS.UPDATE_DELAY_MAX,
						size: Math.random() * sizeRange + baseSize,
					};
				}),
			);
		}, UI_FLOWING_COMMENTS.UPDATE_INTERVAL);

		return () => {
			clearInterval(interval);
		};
	}, [maxComments, comments]);

	if (!isVisible) return null;

	return (
		<div
			className={[
				"absolute inset-0 overflow-hidden pointer-events-none",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			aria-hidden="true"
			style={
				{
					// CSS変数でキーフレームアニメーションを定義
					"--flow-animation": "flowRight",
				} as React.CSSProperties & { [key: string]: string }
			}
		>
			{commentList.map((comment) => (
				<div
					key={comment.id}
					className="absolute whitespace-nowrap text-muted-foreground/20 font-medium select-none motion-safe:animate-flow-right motion-reduce:animate-none"
					style={
						{
							top: `${comment.top}%`,
							fontSize: `${comment.size}rem`,
							animationDuration: `${comment.duration}s`,
							animationDelay: `${comment.delay}s`,
							// アニメーション前後の状態を維持（delay中は0%、終了後は100%の状態）
							animationFillMode: "both",
						} satisfies React.CSSProperties
					}
				>
					{comment.text}
				</div>
			))}
		</div>
	);
}

/**
 * モバイル向けの軽量版コメント流し
 */
export function FlowingCommentsMobile({
	className = "",
	comments,
}: {
	className?: string;
	comments?: string[];
}) {
	return (
		<FlowingComments
			maxComments={UI_FLOWING_COMMENTS.MOBILE_MAX_COMMENTS}
			className={["hidden sm:block", className].filter(Boolean).join(" ")}
			comments={comments}
		/>
	);
}

/**
 * デスクトップ向けのフル版コメント流し
 */
export function FlowingCommentsDesktop({
	className = "",
	comments,
}: {
	className?: string;
	comments?: string[];
}) {
	return (
		<FlowingComments
			maxComments={UI_FLOWING_COMMENTS.DESKTOP_MAX_COMMENTS}
			className={["hidden md:block", className].filter(Boolean).join(" ")}
			comments={comments}
		/>
	);
}
