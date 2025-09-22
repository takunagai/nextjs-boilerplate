import { cn } from "@/lib/utils";
import {
	speechBubbleVariants,
	bubbleVariants,
	avatarVariants,
} from "@/lib/data/speech-bubble-variants";

interface SpeechBubbleSkeletonProps {
	direction?: "left" | "right";
	size?: "sm" | "md" | "lg";
	spacing?: "tight" | "normal" | "loose";
}

/**
 * Speech Bubbleのスケルトンコンポーネント（Suspenseフォールバック用）
 */
export function SpeechBubbleSkeleton({
	direction = "left",
	size = "md",
	spacing = "normal",
}: SpeechBubbleSkeletonProps) {
	return (
		<div
			className={cn(
				speechBubbleVariants({ direction, size, spacing }),
				"max-w-full animate-pulse",
			)}
			role="group"
			aria-label="メッセージ読み込み中"
		>
			{/* アバタースケルトン */}
			<div className="relative">
				<div
					className={cn(
						avatarVariants({ size }),
						"bg-gray-200 dark:bg-gray-700",
					)}
				/>
			</div>

			{/* バブルスケルトン */}
			<div
				className={cn(
					bubbleVariants({ size, theme: "default" }),
					"bg-gray-100 dark:bg-gray-800 border-gray-100 dark:border-gray-700",
				)}
			>
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
					<div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
				</div>
			</div>
		</div>
	);
}
