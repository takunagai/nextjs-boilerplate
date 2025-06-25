import Link from "next/link";
import { FaCalendarCheck, FaArrowRight, FaRocket } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export function CreativeFinalCTASection() {
	return (
		<section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 text-white relative overflow-hidden">
			{/* 背景装飾 */}
			<div className="absolute inset-0 bg-black/20" />
			<div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
			<div className="absolute bottom-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

			<Container
				width="2xl"
				paddingY="xl"
				paddingX="lg"
				className="relative z-10"
			>
				<div className="text-center max-w-4xl mx-auto">
					{/* アイコン */}
					<div className="flex justify-center mb-6">
						<div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
							<FaRocket className="w-10 h-10 text-white" />
						</div>
					</div>

					{/* メインメッセージ */}
					<Heading
						as="h2"
						className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
					>
						<span className="text-yellow-300">AI</span> ×{" "}
						<span className="text-orange-300">人の力</span>で、
						<br />
						あなたのクリエイティブを
						<br />
						<span className="text-cyan-300">加速</span>させます
					</Heading>

					<p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90">
						まずは無料相談から！
						<br />
						あなたのアイデアを、私たちが形にします。
					</p>

					{/* 特典リスト */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
						<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
							<div className="font-bold mb-1">💸 テスター価格</div>
							<div className="text-white/80">先着10名様限定で50%OFF</div>
						</div>
						<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
							<div className="font-bold mb-1">🛡️ 全額返金保証</div>
							<div className="text-white/80">満足いただけなければ返金</div>
						</div>
						<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
							<div className="font-bold mb-1">⚡ 圧倒的スピード</div>
							<div className="text-white/80">AI活用で納期1/3を実現</div>
						</div>
					</div>

					{/* CTAボタン */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							asChild
							size="lg"
							className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<Link href="/contact">
								無料相談を予約する
								<FaCalendarCheck className="w-6 h-6 ml-2" />
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<Link href="#service-menu">
								サービス詳細を見る
								<FaArrowRight className="w-6 h-6 ml-2" />
							</Link>
						</Button>
					</div>

					{/* 追加メッセージ */}
					<div className="mt-8 text-center">
						<p className="text-lg text-white/80 leading-relaxed">
							今なら、制作に関するご相談やお見積もりも無料です。
							<br />
							お気軽にお問い合わせください！
						</p>
					</div>

					{/* 信頼できる理由 */}
					<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
						<div className="text-center">
							<div className="text-3xl font-bold text-yellow-300">15年</div>
							<div className="text-sm text-white/80">
								クリエイティブ業界経験
							</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-orange-300">50%OFF</div>
							<div className="text-sm text-white/80">テスター特別価格</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
