export default function RootLoading() {
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "hsl(var(--background))",
				zIndex: 9999,
			}}
		>
			{/* スタイル定義 - インラインで即座にレンダリング */}
			<style>{`
				@keyframes loading-spin {
					to { transform: rotate(360deg); }
				}
				
				@keyframes loading-pulse {
					0%, 100% { 
						opacity: 0.3;
						transform: scale(0.95);
					}
					50% { 
						opacity: 0.1;
						transform: scale(1.05);
					}
				}
				
				.loading-spinner {
					width: 48px;
					height: 48px;
					border: 2px solid transparent;
					border-top-color: hsl(var(--primary));
					border-right-color: hsl(var(--primary) / 0.5);
					border-radius: 50%;
					animation: loading-spin 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
					will-change: transform;
					contain: layout style paint;
				}
				
				.loading-container {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				
				.loading-backdrop {
					position: absolute;
					width: 120px;
					height: 120px;
					background: radial-gradient(
						circle at center,
						hsl(var(--primary) / 0.1) 0%,
						transparent 60%
					);
					border-radius: 50%;
					animation: loading-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
					will-change: opacity, transform;
					pointer-events: none;
				}
			`}</style>
			
			{/* メインローディングインジケーター */}
			<div className="loading-container">
				{/* 背景グラデーション効果 */}
				<div className="loading-backdrop" />
				{/* スピナー */}
				<div className="loading-spinner" />
			</div>
		</div>
	);
}
