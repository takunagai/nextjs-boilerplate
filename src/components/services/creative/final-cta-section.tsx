import { FaRocket } from "react-icons/fa6";
import { ServiceFinalCTA } from "../shared";

export function CreativeFinalCTASection() {
	return (
		<div className="relative">
			{/* 背景装飾 */}
			<div className="absolute inset-0 bg-black/20" />
			<div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
			<div className="absolute bottom-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

			<ServiceFinalCTA
				variant="complex"
				sectionClassName="bg-primary text-primary-foreground relative overflow-hidden"
				icon={
					<div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
						<FaRocket className="w-10 h-10 text-primary-foreground" />
					</div>
				}
				title={
					<span className="text-primary-foreground">
						<span className="text-primary-foreground">AI</span> × 人の力で、
						<br />
						あなたのクリエイティブを
						<br />
						<span className="text-primary-foreground">加速</span>させます
					</span>
				}
				description={
					<div className="text-primary-foreground/90">
						まずは無料相談から！
						<br />
						あなたのアイデアを、私たちが形にします。
					</div>
				}
				features={
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
				}
				contactButtonClassName="bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
				secondaryButtonClassName="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
				showSecondaryButton={true}
				secondaryButtonText="サービス詳細を見る"
				additionalContent={
					<div className="text-center">
						<p className="text-lg text-white/80 leading-relaxed">
							今なら、制作に関するご相談やお見積もりも無料です。
							<br />
							お気軽にお問い合わせください！
						</p>
					</div>
				}
				statistics={
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
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
				}
			/>
		</div>
	);
}
