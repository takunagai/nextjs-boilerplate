import { Container } from "@/components/ui/container";
import {
	FaRocket,
	FaShield,
	FaClock,
	FaAward,
	FaPaperPlane,
	FaPhone,
	FaEnvelope,
	FaCalendar,
} from "react-icons/fa6";

const guarantees = [
	{
		icon: FaShield,
		title: "100%満足保証",
		description: "ご満足いただけない場合は全額返金",
	},
	{
		icon: FaClock,
		title: "迅速対応",
		description: "お問い合わせから1時間以内に回答",
	},
	{
		icon: FaAward,
		title: "プロ品質",
		description: "デザイナー×AI技術の最高クオリティ",
	},
];

const contactMethods = [
	{
		type: "お電話",
		icon: FaPhone,
		info: "03-1234-5678",
		description: "平日 9:00-18:00（土日祝除く）",
		action: "今すぐ電話",
		primary: false,
	},
	{
		type: "メール",
		icon: FaEnvelope,
		info: "ai@example.com",
		description: "24時間受付・1時間以内返信",
		action: "メールで相談",
		primary: true,
	},
	{
		type: "オンライン相談",
		icon: FaCalendar,
		info: "Zoom/Teams対応",
		description: "画面共有でリアルタイム相談",
		action: "予約する",
		primary: false,
	},
];

export function AICta() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16 sm:py-24">
			{/* 背景装飾 */}
			<div className="absolute inset-0">
				<div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
				<div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
			</div>

			<Container as="section" className="relative">
				{/* メインヘッドライン */}
				<div className="text-center">
					<div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
						<FaRocket className="mr-2 h-4 w-4" />
						今なら初回制作30%OFF！
					</div>

					<h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
						理想の画像を
						<br />
						<span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
							AI技術
						</span>
						で実現しませんか？
					</h2>

					<p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
						デザイナーとAIの融合技術で、あなたのビジネスに最適な画像を制作します。
						まずは無料相談から始めてみませんか？
					</p>

					{/* 特典情報 */}
					<div className="mb-12 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<h3 className="mb-4 text-lg font-bold text-white">
							🎉 今だけの特別キャンペーン
						</h3>
						<div className="grid gap-4 md:grid-cols-3">
							<div className="text-center">
								<div className="mb-2 text-2xl font-bold text-yellow-400">
									30%OFF
								</div>
								<div className="text-sm text-gray-300">初回制作限定</div>
							</div>
							<div className="text-center">
								<div className="mb-2 text-2xl font-bold text-green-400">
									無料
								</div>
								<div className="text-sm text-gray-300">
									お見積もり・相談
								</div>
							</div>
							<div className="text-center">
								<div className="mb-2 text-2xl font-bold text-blue-400">
									即日
								</div>
								<div className="text-sm text-gray-300">対応可能</div>
							</div>
						</div>
						<p className="mt-4 text-center text-xs text-gray-400">
							※キャンペーンは予告なく終了する場合があります
						</p>
					</div>
				</div>

				{/* コンタクト方法 */}
				<div className="mb-16">
					<h3 className="mb-8 text-center text-2xl font-bold text-white">
						お気軽にお問い合わせください
					</h3>

					<div className="grid gap-6 md:grid-cols-3">
						{contactMethods.map((method, index) => (
							<div
								key={index}
								className={`rounded-2xl p-6 text-center transition-all hover:scale-105 ${
									method.primary
										? "bg-gradient-to-br from-purple-600 to-blue-600 shadow-xl"
										: "bg-white/10 backdrop-blur-sm"
								}`}
							>
								<method.icon
									className={`mx-auto mb-4 h-12 w-12 ${
										method.primary ? "text-white" : "text-purple-300"
									}`}
								/>
								<h4
									className={`mb-2 text-lg font-bold ${
										method.primary ? "text-white" : "text-white"
									}`}
								>
									{method.type}
								</h4>
								<p
									className={`mb-2 font-medium ${
										method.primary ? "text-white" : "text-gray-300"
									}`}
								>
									{method.info}
								</p>
								<p
									className={`mb-4 text-sm ${
										method.primary ? "text-white/80" : "text-gray-400"
									}`}
								>
									{method.description}
								</p>
								<button
									className={`w-full rounded-lg px-6 py-3 text-sm font-medium transition-all ${
										method.primary
											? "bg-white text-purple-600 hover:bg-gray-100"
											: "border border-white/30 text-white hover:bg-white/10"
									}`}
								>
									{method.action}
								</button>
							</div>
						))}
					</div>
				</div>

				{/* 保証・信頼性 */}
				<div className="mb-12">
					<h3 className="mb-8 text-center text-xl font-bold text-white">
						安心の保証制度
					</h3>

					<div className="grid gap-6 md:grid-cols-3">
						{guarantees.map((guarantee, index) => (
							<div
								key={index}
								className="flex items-center rounded-xl bg-white/10 p-6 backdrop-blur-sm"
							>
								<guarantee.icon className="mr-4 h-8 w-8 flex-shrink-0 text-green-400" />
								<div>
									<h4 className="mb-1 font-bold text-white">
										{guarantee.title}
									</h4>
									<p className="text-sm text-gray-300">
										{guarantee.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* 最終CTA */}
				<div className="text-center">
					<div className="mb-6">
						<h3 className="mb-2 text-2xl font-bold text-white">
							あなたのビジネスを次のレベルへ
						</h3>
						<p className="text-gray-300">
							AI画像制作で競合との差別化を図りませんか？
						</p>
					</div>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<button className="group inline-flex items-center rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:from-yellow-600 hover:to-orange-600 hover:shadow-2xl">
							<FaPaperPlane className="mr-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
							今すぐ無料相談を申し込む
						</button>

						<button className="inline-flex items-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
							制作事例を見る
						</button>
					</div>

					<p className="mt-6 text-sm text-gray-400">
						相談は完全無料・強引な営業は一切いたしません
					</p>
				</div>

				{/* 企業ロゴ・実績（オプション） */}
				<div className="mt-16 text-center">
					<p className="mb-8 text-sm text-gray-400">
						これまでに500社以上の企業様にご利用いただいています
					</p>

					{/* 実績数値 */}
					<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
						<div>
							<div className="mb-2 text-3xl font-bold text-white">500+</div>
							<div className="text-sm text-gray-400">制作実績</div>
						</div>
						<div>
							<div className="mb-2 text-3xl font-bold text-white">98%</div>
							<div className="text-sm text-gray-400">満足度</div>
						</div>
						<div>
							<div className="mb-2 text-3xl font-bold text-white">24h</div>
							<div className="text-sm text-gray-400">平均納期</div>
						</div>
						<div>
							<div className="mb-2 text-3xl font-bold text-white">100%</div>
							<div className="text-sm text-gray-400">期限内納品</div>
						</div>
					</div>
				</div>

				{/* 最後の後押し */}
				<div className="mt-12 rounded-2xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 p-6 text-center backdrop-blur-sm">
					<p className="mb-2 text-lg font-bold text-white">
						⚡ 限定キャンペーン残り時間
					</p>
					<p className="mb-4 text-3xl font-bold text-yellow-400">
						あと48時間
					</p>
					<p className="text-sm text-gray-300">
						30%OFFは今月末まで！この機会をお見逃しなく
					</p>
				</div>
			</Container>
		</section>
	);
}