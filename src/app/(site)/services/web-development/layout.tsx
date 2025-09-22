import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaCode, FaToolbox, FaBolt } from "react-icons/fa6";

interface WebDevelopmentLayoutProps {
	children: ReactNode;
}

export default function WebDevelopmentLayout({
	children,
}: WebDevelopmentLayoutProps) {
	return (
		<>
			{/* 共通ナビゲーションバー */}
			<nav className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
				<Container>
					<div className="flex items-center justify-between py-3">
						<div className="flex items-center gap-6">
							<h2 className="text-sm font-semibold flex items-center gap-2">
								<FaCode className="w-4 h-4 text-primary" />
								ウェブ制作・アプリ開発
							</h2>
							<div className="hidden md:flex items-center gap-1">
								<span className="text-xs text-muted-foreground">|</span>
								<Link
									href="/services/web-development"
									className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
								>
									トップ
								</Link>
								<Link
									href="/services/web-development/frontend-repair"
									className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 flex items-center gap-1"
								>
									<FaToolbox className="w-3 h-3" />
									フロントエンドリペア
								</Link>
								<Link
									href="/services/web-development/instant-site"
									className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 flex items-center gap-1"
								>
									<FaBolt className="w-3 h-3" />
									一夜城
								</Link>
							</div>
						</div>
						<Link
							href="/contact?service=web-development"
							className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
						>
							お問い合わせ →
						</Link>
					</div>
				</Container>
			</nav>

			{/* 子ページのコンテンツ */}
			{children}

			{/* 共通フッターセクション */}
			<section className="py-16 bg-muted/30 border-t">
				<Container>
					<div className="text-center space-y-6">
						<h2 className="text-2xl font-bold">
							ウェブ制作・アプリ開発サービス
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							AIと15年の経験を活かして、高品質なウェブサイト・アプリケーションを
							お手頃価格でご提供します。
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6">
							<Link
								href="/services/web-development"
								className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary/50 transition-all"
							>
								<div className="space-y-2">
									<FaCode className="w-8 h-8 text-primary mb-3" />
									<h3 className="font-semibold">ウェブ制作・アプリ開発</h3>
									<p className="text-sm text-muted-foreground">
										フルカスタムの高品質なサイト制作
									</p>
								</div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							</Link>
							<Link
								href="/services/web-development/frontend-repair"
								className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary/50 transition-all"
							>
								<div className="space-y-2">
									<FaToolbox className="w-8 h-8 text-blue-600 mb-3" />
									<h3 className="font-semibold">フロントエンドリペア</h3>
									<p className="text-sm text-muted-foreground">
										AI生成コードの品質向上・修正
									</p>
								</div>
								<div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							</Link>
							<Link
								href="/services/web-development/instant-site"
								className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary/50 transition-all"
							>
								<div className="space-y-2">
									<FaBolt className="w-8 h-8 text-orange-600 mb-3" />
									<h3 className="font-semibold">一夜城</h3>
									<p className="text-sm text-muted-foreground">
										55,000円・当日公開の高速制作
									</p>
								</div>
								<div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							</Link>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}