import { Container } from "@/components/ui/container";
import { FaCheck } from "react-icons/fa6";

const TARGET_GROUPS = [
	{
		title: "AI でサイトを作った方",
		subtitle: "ChatGPT・Claude・Cursor などを使用",
		items: [
			"コードが動くけど品質に不安がある",
			"エラーは出ないが最適化されているか心配",
			"レスポンシブ対応が不完全",
			"デプロイの仕方がわからない",
		],
	},
	{
		title: "小規模事業者・個人事業主",
		subtitle: "Web担当が不在または知識が限定的",
		items: [
			"制作会社に依頼するほど予算がない",
			"社内に技術者がいない",
			"急いでサイトを公開したい",
			"継続的なメンテナンスも相談したい",
		],
	},
	{
		title: "フリーランス・個人開発者",
		subtitle: "クライアント案件の品質向上を図りたい",
		items: [
			"自分のスキルに限界を感じている",
			"クライアントにより良いものを提供したい",
			"デザインは得意だがコードが不安",
			"技術的な相談相手が欲しい",
		],
	},
] as const;

export function RecommendedForSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						こんな方に
						<span className="text-primary">おすすめ</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						AI 時代の新しいニーズに対応。作ったはいいけど、
						<br />
						「このままで大丈夫？」という不安を解決します
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{TARGET_GROUPS.map((group, index) => (
						<div
							key={index}
							className="bg-gradient-to-br from-background to-orange-50/20 dark:to-orange-950/5 rounded-2xl p-8 border border-border/50"
						>
							<div className="text-center mb-6">
								<h3 className="text-xl font-bold mb-2">{group.title}</h3>
								<p className="text-sm text-muted-foreground">{group.subtitle}</p>
							</div>

							<ul className="space-y-4">
								{group.items.map((item, itemIndex) => (
									<li key={itemIndex} className="flex items-start gap-3">
										<div className="flex-shrink-0 mt-1">
											<div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
												<FaCheck className="w-3 h-3 text-primary" />
											</div>
										</div>
										<span className="text-sm leading-relaxed">{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
						<h3 className="text-xl font-bold mb-4 text-primary">
							まずは無料診断で現状を把握
						</h3>
						<p className="text-muted-foreground mb-6">
							コードとデザインの両面から専門的にチェック。
							<br />
							24時間以内に診断結果と改善提案をお送りします。
						</p>
						<div className="text-lg font-semibold text-primary">
							診断料：<span className="text-2xl">0円</span>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}