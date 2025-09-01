"use client";

import { useEffect } from "react";
import Link from "next/link";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	useEffect(() => {
		// 重大なエラーをログに記録
		console.error("Global application error:", error);

		// 本番環境では外部エラー監視サービスに送信
		if (process.env.NODE_ENV === "production") {
			// 例: Sentry, LogRocket, Datadog など
			// errorService.captureException(error, {
			//   tags: { level: 'critical', source: 'global-error' }
			// });
		} else {
			console.group("Global Error Details");
			console.error("Message:", error.message);
			console.error("Stack:", error.stack);
			if (error.digest) {
				console.error("Digest:", error.digest);
			}
			console.groupEnd();
		}
	}, [error]);

	const isProduction = process.env.NODE_ENV === "production";

	return (
		<html lang="ja">
			<body
				style={{
					margin: 0,
					padding: 0,
					fontFamily: "system-ui, -apple-system, sans-serif",
					backgroundColor: "#fafafa",
					color: "#333",
				}}
			>
				<div
					style={{
						minHeight: "100vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px",
					}}
				>
					<div
						style={{
							maxWidth: "500px",
							width: "100%",
							textAlign: "center",
							backgroundColor: "white",
							borderRadius: "12px",
							padding: "40px 30px",
							boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
						}}
					>
						{/* エラーアイコン */}
						<div
							style={{
								width: "80px",
								height: "80px",
								backgroundColor: "#fee2e2",
								borderRadius: "50%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "0 auto 24px",
							}}
						>
							<svg
								width="40"
								height="40"
								viewBox="0 0 24 24"
								fill="none"
								style={{ color: "#dc2626" }}
							>
								<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
								<line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
								<circle cx="12" cy="16" r="1" fill="currentColor"/>
							</svg>
						</div>

						{/* エラータイトル */}
						<h1
							style={{
								fontSize: "24px",
								fontWeight: "bold",
								margin: "0 0 12px",
								color: "#111827",
							}}
						>
							システムエラーが発生しました
						</h1>

						<p
							style={{
								fontSize: "16px",
								color: "#6b7280",
								lineHeight: "1.5",
								margin: "0 0 24px",
							}}
						>
							申し訳ございませんが、システムに重大なエラーが発生しました。
							{isProduction
								? "復旧までしばらくお待ちください。"
								: "開発者にお問い合わせください。"}
						</p>

						{/* エラー詳細（開発環境のみ） */}
						{!isProduction && (
							<div
								style={{
									backgroundColor: "#f9fafb",
									border: "1px solid #e5e7eb",
									borderRadius: "8px",
									padding: "16px",
									textAlign: "left",
									marginBottom: "24px",
								}}
							>
								<h3
									style={{
										fontSize: "14px",
										fontWeight: "600",
										margin: "0 0 8px",
										color: "#374151",
									}}
								>
									エラー詳細
								</h3>
								<div style={{ fontSize: "13px", color: "#6b7280" }}>
									<div style={{ marginBottom: "4px" }}>
										<strong>メッセージ:</strong>{" "}
										<code style={{ fontFamily: "monospace" }}>
											{error.message}
										</code>
									</div>
									{error.digest && (
										<div>
											<strong>ID:</strong>{" "}
											<code style={{ fontFamily: "monospace" }}>
												{error.digest}
											</code>
										</div>
									)}
								</div>
							</div>
						)}

						{/* アクションボタン */}
						<div
							style={{
								display: "flex",
								gap: "12px",
								justifyContent: "center",
								flexWrap: "wrap",
							}}
						>
							<button
								onClick={reset}
								style={{
									backgroundColor: "#2563eb",
									color: "white",
									border: "none",
									borderRadius: "6px",
									padding: "10px 20px",
									fontSize: "14px",
									fontWeight: "500",
									cursor: "pointer",
									textDecoration: "none",
									display: "inline-flex",
									alignItems: "center",
									gap: "8px",
								}}
								onMouseOver={(e) => {
									(e.target as HTMLElement).style.backgroundColor = "#1d4ed8";
								}}
								onMouseOut={(e) => {
									(e.target as HTMLElement).style.backgroundColor = "#2563eb";
								}}
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
									<path
										d="M1 4V10H7"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M23 20V14H17"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								再読み込み
							</button>

							<Link
								href="/"
								style={{
									backgroundColor: "transparent",
									color: "#374151",
									border: "1px solid #d1d5db",
									borderRadius: "6px",
									padding: "10px 20px",
									fontSize: "14px",
									fontWeight: "500",
									cursor: "pointer",
									textDecoration: "none",
									display: "inline-flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
									<path
										d="M3 9L12 2L21 9V20A2 2 0 0 1 19 22H5A2 2 0 0 1 3 20V9Z"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<polyline
										points="9,22 9,12 15,12 15,22"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								ホームに戻る
							</Link>
						</div>

						{/* サポート情報 */}
						{isProduction && (
							<div
								style={{
									borderTop: "1px solid #e5e7eb",
									paddingTop: "24px",
									marginTop: "32px",
								}}
							>
								<p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
									問題が解決しない場合は、
									<Link
										href="/contact"
										style={{
											color: "#2563eb",
											textDecoration: "none",
											marginLeft: "4px",
										}}
									>
										お問い合わせ
									</Link>
									よりご連絡ください。
								</p>
							</div>
						)}
					</div>
				</div>
			</body>
		</html>
	);
}