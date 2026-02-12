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
	{
		icon: "🔧",
		iconBg: "bg-teal-50 dark:bg-teal-500/15",
		iconColor: "text-teal-600 dark:text-teal-400",
		title: "AI環境構築のサポート",
		description:
			"APIキーの取得や設定、AIエディタの設定、ナレッジベースの構築、カスタム指示の最適化など、慣れていないと不安な設定をサポートします。",
	},
];

export function MonitorRecruitmentSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-stone-50 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-700">
			<Container width="xl" paddingX="md">
				{/* ヘッダー */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<span className="inline-block py-1 px-3 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs font-bold tracking-wider mb-4 border border-orange-200 dark:border-orange-500/40">
						まずはお話を聞かせてください
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-orange-300 dark:to-amber-200">
							AIで何ができるか、
						</span>
						<br />
						一緒に考えませんか？
					</h2>
					<p className="text-lg text-slate-600 dark:text-stone-300 leading-relaxed">
						AI活用支援サービスの立ち上げにあたり、みなさまが本当に求めているものを知りたいと思っています。
						<br className="hidden md:inline" />
						「AIって実際どう使えるの？」そんな素朴な疑問から、具体的な業務の相談まで。
						<br className="hidden md:inline" />
						無料相談やお試し価格での制作を通じて、一緒に可能性を探りませんか？
					</p>
				</div>

				{/* サービスカード */}
				<div className="mb-12">
					<h3 className="text-center text-xl font-bold text-slate-800 dark:text-white mb-10 flex items-center justify-center before:content-[''] before:h-px before:w-12 before:bg-slate-300 dark:before:bg-stone-500 before:mr-4 after:content-[''] after:h-px after:w-12 after:bg-slate-300 dark:after:bg-stone-500 after:ml-4">
						ご提供できるサービスの一例
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
					</div>
				</div>

				{/* CTA */}
				<div className="text-center mt-16">
					<Link
						href="/contact"
						className="inline-flex items-center justify-center px-10 py-5 text-base font-bold text-white transition-all duration-200 bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full hover:bg-slate-700 dark:hover:bg-stone-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white"
					>
						まずは気軽に話してみる
					</Link>
					<p className="mt-4 text-sm text-slate-500 dark:text-stone-400">
						AIの話だけでもOK。雑談感覚でお気軽にどうぞ。
					</p>
				</div>
			</Container>
		</section>
	);
}
