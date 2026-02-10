import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const serviceCards = [
	{
		icon: "✍️",
		iconBg: "bg-blue-50 dark:bg-blue-500/15",
		iconColor: "text-blue-600 dark:text-blue-400",
		title: "記事・SNS運用の自動化",
		description:
			"貴社の独自ナレッジや「文体のクセ」までAIに学習させ、違和感のないブログ記事やSNS投稿を作成。品質向上と量産を両立します。",
	},
	{
		icon: "🎨",
		iconBg: "bg-green-50 dark:bg-green-500/15",
		iconColor: "text-green-600 dark:text-green-400",
		title: "AI画像生成・加工",
		description:
			"イメージ通りのAIイラスト生成はもちろん、既存写真のレタッチや合成も。デザイナーの視点で「使える」クリエイティブに仕上げます。",
	},
	{
		icon: "📊",
		iconBg: "bg-purple-50 dark:bg-purple-500/15",
		iconColor: "text-purple-600 dark:text-purple-400",
		title: "リサーチ＆図解作成",
		description:
			"手間のかかるリサーチ業務を代行し、結果を要約。さらに情報を整理して、直感的に伝わる「図解」や「スライド」へ落とし込みます。",
	},
	{
		icon: "⚙️",
		iconBg: "bg-amber-50 dark:bg-amber-500/15",
		iconColor: "text-amber-600 dark:text-amber-400",
		title: "繰り返し業務の自動化",
		description:
			"「毎回同じ作業をしている」そんな業務はありませんか？AIエージェントやスクリプトを活用し、ルーチンワークを自動化する仕組みを作ります。",
	},
	{
		icon: "🎓",
		iconBg: "bg-rose-50 dark:bg-rose-500/15",
		iconColor: "text-rose-600 dark:text-rose-400",
		title: "AI活用のレクチャー",
		description:
			"「何から始めればいいかわからない」という方に。実務に直結するAIの使い方レクチャーや、社内勉強会の講師も承ります。",
	},
];

export function MonitorRecruitmentSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-stone-50 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-700">
			<Container width="xl" paddingX="md">
				{/* ヘッダー */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<span className="inline-block py-1 px-3 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs font-bold tracking-wider mb-4 border border-orange-200 dark:border-orange-500/40">
						現在準備中・先行モニター募集
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
						最新AI技術 × 15年の経験。
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-orange-300 dark:to-amber-200">
							次世代の制作・業務支援
						</span>
						を
						<br className="md:hidden" />
						特別価格で。
					</h2>
					<p className="text-lg text-slate-600 dark:text-stone-300 leading-relaxed">
						本格的な「AI活用支援事業」の立ち上げに向け、実績作りにご協力いただけるモニター様を募集しています。
						<br className="hidden md:inline" />
						最新のAIコーディングエージェントや生成AIを駆使し、高品質な成果物を「驚きのスピード」と「モニター限定価格」でご提供します。
					</p>
				</div>

				{/* なぜ低価格？ */}
				<div className="bg-white dark:bg-white/5 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-600 p-8 md:p-12 mb-16 overflow-hidden relative">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="relative z-10">
							<h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
								なぜ、高品質なのに
								<br />
								低価格で提供できるのか？
							</h3>
							<p className="text-slate-600 dark:text-stone-300 leading-relaxed mb-6">
								それは、私が
								<strong className="text-slate-800 dark:text-white">
									「AIエージェントとペアプログラミング」
								</strong>
								をしているからです。
								<br />
								従来、人間が数日かけていたコード作成やリサーチ業務を、最新のAI技術が数時間に短縮します。
							</p>
							<p className="text-slate-600 dark:text-stone-300 leading-relaxed">
								しかし、AIはまだ完璧ではありません。
								<br />
								そこに
								<strong className="text-slate-800 dark:text-white">
									デザイナー・エンジニアとしての15年の経験
								</strong>
								を掛け合わせ、最終的な品質をプロの目で保証する。
								<br />
								この「実験的かつ効率的」な新しい制作フローだからこそ、この価格が実現しました。
							</p>
						</div>
						<div className="relative h-full min-h-[200px] bg-slate-100 dark:bg-white/10 rounded-2xl p-6 flex items-center justify-center border border-dashed border-slate-300 dark:border-stone-500">
							<div className="text-center">
								<div className="flex justify-center items-center space-x-4 mb-4">
									<div className="w-16 h-16 bg-white dark:bg-stone-700 rounded-full shadow-md flex items-center justify-center text-3xl">
										👨‍💻
									</div>
									<div className="text-slate-400 dark:text-stone-400">
										×
									</div>
									<div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-md flex items-center justify-center text-3xl text-white">
										🤖
									</div>
								</div>
								<p className="font-bold text-slate-700 dark:text-white">
									Experience × AI Agent
								</p>
								<p className="text-sm text-slate-500 dark:text-stone-400 mt-2">
									人の感性 × AIの圧倒的スピード
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* サービスカード */}
				<div className="mb-12">
					<h3 className="text-center text-xl font-bold text-slate-800 dark:text-white mb-10 flex items-center justify-center before:content-[''] before:h-px before:w-12 before:bg-slate-300 dark:before:bg-stone-500 before:mr-4 after:content-[''] after:h-px after:w-12 after:bg-slate-300 dark:after:bg-stone-500 after:ml-4">
						モニター期間中にご提供できること
					</h3>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{serviceCards.map((card) => (
							<div
								key={card.title}
								className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-shadow duration-300 border border-slate-100 dark:border-stone-600"
							>
								<div
									className={cn(
										"w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4",
										card.iconBg,
										card.iconColor,
									)}
								>
									{card.icon}
								</div>
								<h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
									{card.title}
								</h4>
								<p className="text-sm text-slate-600 dark:text-stone-300 leading-relaxed">
									{card.description}
								</p>
							</div>
						))}

						<Link
							href="/contact"
							className="bg-slate-800 dark:bg-slate-700 p-6 rounded-2xl shadow-sm hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors duration-300 flex flex-col justify-center items-center text-center group"
						>
							<h4 className="text-lg font-bold text-white mb-2">
								その他、柔軟に対応します
							</h4>
							<p className="text-sm text-slate-300 leading-relaxed mb-4">
								「こんなことAIでできる？」
								<br />
								まずはお気軽にご相談ください。
							</p>
							<span className="text-white font-bold border-b border-white group-hover:border-transparent transition-all">
								お問い合わせへ →
							</span>
						</Link>
					</div>
				</div>

				{/* CTA */}
				<div className="text-center mt-16">
					<Link
						href="/contact"
						className="inline-flex items-center justify-center px-10 py-5 text-base font-bold text-white transition-all duration-200 bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full hover:bg-slate-700 dark:hover:bg-stone-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white"
					>
						モニターについて相談してみる
					</Link>
					<p className="mt-4 text-sm text-slate-500 dark:text-stone-400">
						※お問い合わせフォームに「モニター希望」とご記入ください
					</p>
				</div>
			</Container>
		</section>
	);
}
