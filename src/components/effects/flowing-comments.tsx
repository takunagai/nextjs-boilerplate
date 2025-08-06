/**
 * ニコニコ動画風のコメント流しエフェクト
 * 背景に薄いテキストが右から左に流れる
 */
"use client";

import { useEffect, useState } from "react";
import { useWindowResize } from "@/hooks/use-window-resize";

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
	"技術コンサル可能"
];

interface Comment {
	id: number;
	text: string;
	top: number;
	duration: number;
	delay: number;
	size: number;
}

interface FlowingCommentsProps {
	maxComments?: number;
	className?: string;
}

export function FlowingComments({
	maxComments = 15,
	className = "",
}: FlowingCommentsProps) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [isVisible, setIsVisible] = useState(false);

	// 画面サイズに応じたサイズ設定を関数化
	const getSizeParams = () => {
		if (typeof window === 'undefined') return { baseSize: 1.2, sizeRange: 0.6 };
		const isDesktop = window.innerWidth >= 768;
		return {
			baseSize: isDesktop ? 1.2 : 0.7, // デスクトップ: 1.2-1.8rem, モバイル: 0.7-1.0rem
			sizeRange: isDesktop ? 0.6 : 0.3,
		};
	};

	// 画面リサイズ時にコメントサイズを再計算
	useWindowResize(() => {
		const { baseSize, sizeRange } = getSizeParams();
		setComments(prev => prev.map(comment => ({
			...comment,
			size: Math.random() * sizeRange + baseSize,
		})));
	});

	useEffect(() => {
		// クライアントサイドでのみ実行
		if (typeof window === 'undefined') return;

		// 初期コメントを生成
		const initialComments: Comment[] = [];
		const { baseSize, sizeRange } = getSizeParams();
		
		for (let i = 0; i < maxComments; i++) {
			initialComments.push({
				id: i,
				text: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
				top: Math.random() * 80 + 10, // 10%〜90%の範囲
				duration: Math.random() * 10 + 15, // 15〜25秒
				delay: Math.random() * 20, // 0〜20秒の初期遅延
				size: Math.random() * sizeRange + baseSize,
			});
		}
		setComments(initialComments);
		setIsVisible(true);

		// 定期的にコメントを更新
		const interval = setInterval(() => {
			setComments(prev => prev.map(comment => {
				// 更新時も画面サイズに応じたサイズ設定
				const { baseSize, sizeRange } = getSizeParams();
				
				return {
					...comment,
					text: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
					top: Math.random() * 80 + 10,
					duration: Math.random() * 10 + 15,
					delay: Math.random() * 5, // 更新時は短い遅延
					size: Math.random() * sizeRange + baseSize,
				};
			}));
		}, 30000); // 30秒ごとに更新

		return () => {
			clearInterval(interval);
		};
	}, [maxComments]);

	if (!isVisible) return null;

	return (
		<>
			{/* CSS キーフレームアニメーションを定義 */}
			<style dangerouslySetInnerHTML={{
				__html: `
					@keyframes flowRight {
						0% {
							transform: translateX(100vw);
							opacity: 0;
						}
						5% {
							opacity: 1;
						}
						95% {
							opacity: 1;
						}
						100% {
							transform: translateX(-100%);
							opacity: 0;
						}
					}
				`
			}} />
			
			<div
				className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
				aria-hidden="true"
			>
				{comments.map((comment) => (
					<div
						key={comment.id}
						className="absolute whitespace-nowrap text-muted-foreground/20 font-medium select-none"
						style={{
							top: `${comment.top}%`,
							fontSize: `${comment.size}rem`,
							animation: `flowRight ${comment.duration}s linear ${comment.delay}s infinite both`,
						}}
					>
						{comment.text}
					</div>
				))}
			</div>
		</>
	);
}

/**
 * モバイル向けの軽量版コメント流し
 */
export function FlowingCommentsMobile({
	className = "",
}: {
	className?: string;
}) {
	return (
		<FlowingComments
			maxComments={8}
			className={`hidden sm:block ${className}`}
		/>
	);
}

/**
 * デスクトップ向けのフル版コメント流し
 */
export function FlowingCommentsDesktop({
	className = "",
}: {
	className?: string;
}) {
	return (
		<FlowingComments
			maxComments={20}
			className={`hidden md:block ${className}`}
		/>
	);
}