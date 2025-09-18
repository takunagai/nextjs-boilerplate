import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const sections = [
	{
		number: "01",
		title: "ヒーロー",
		description: "価値提案＋CTA",
		textCount: "80〜120字",
		color: "text-primary",
	},
	{
		number: "02",
		title: "共感（課題提示）",
		description: "現状の悩みを具体化",
		textCount: "160〜240字",
		color: "text-blue-600",
	},
	{
		number: "03",
		title: "解決（アプローチ）",
		description: "AI×プロ×テンプレートの勝ち筋",
		textCount: "180〜260字",
		color: "text-green-600",
	},
	{
		number: "04",
		title: "具体（機能/仕様）",
		description: "技術・納品物・範囲",
		textCount: "箇条書き中心",
		color: "text-purple-600",
	},
	{
		number: "05",
		title: "提案（オファー）",
		description: "価格55,000円・当日公開・限定枠",
		textCount: "80〜120字",
		color: "text-pink-600",
	},
	{
		number: "06",
		title: "実例/参考",
		description: "簡易モック（後日差替）",
		textCount: "ビジュアル中心",
		color: "text-indigo-600",
	},
	{
		number: "07",
		title: "安心（保証/FAQ）",
		description: "リスク最小化の説明",
		textCount: "Q&A形式",
		color: "text-teal-600",
	},
	{
		number: "08",
		title: "最終CTA",
		description: "日程確認→申込み",
		textCount: "アクション誘導",
		color: "text-red-600",
	},
];

export function DeliverableSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="仕上がりイメージ（セクション構成）"
					description="1ページ構成で、6〜8セクション。文章総量〜3,000字目安"
				/>

				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{sections.map((section) => (
						<div
							key={section.number}
							className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
						>
							<div className={`mb-2 text-3xl font-bold ${section.color} opacity-20`}>
								{section.number}
							</div>
							<h3 className="mb-2 font-semibold">{section.title}</h3>
							<p className="mb-2 text-sm text-muted-foreground">{section.description}</p>
							<p className={`text-xs font-medium ${section.color}`}>{section.textCount}</p>
						</div>
					))}
				</div>

				<div className="mt-8 rounded-lg bg-muted/50 p-6">
					<h3 className="mb-3 font-semibold">納品範囲（スコープ）</h3>
					<ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							1ページ構成（6〜8セクション、文章総量〜3,000字目安）
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							画像最大8点（AI生成または高品質フリー素材を最適化）
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							スマホ最適化 / アクセシビリティ基礎 / Core Web Vitals配慮
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							SEO基礎（title/description/OGP/JSON-LD/サイトアイコン）
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							問い合わせフォーム（Googleフォーム or Tally embed）
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							Cloudflare Pages デプロイ（Git連携 or 直アップロード）
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							公開後7日以内の微修正2回（合計60分相当）
						</li>
					</ul>
				</div>

				<div className="mt-6 rounded-lg border border-red-600/20 bg-red-50/50 p-6 dark:bg-red-950/20">
					<h3 className="mb-3 font-semibold">含まないもの（上位プラン/追加対応）</h3>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li className="flex items-start">
							<span className="mr-2 text-red-600">×</span>
							多言語、EC、会員機能、予約/検索等のWebアプリ機能
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-red-600">×</span>
							大規模ライティング/取材/撮影、複雑なイラスト、厳密なブランドCI運用
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-red-600">×</span>
							仕様未確定による度重なるレイアウト大幅変更
						</li>
					</ul>
				</div>
			</Container>
		</section>
	);
}