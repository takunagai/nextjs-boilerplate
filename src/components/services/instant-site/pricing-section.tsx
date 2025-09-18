import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Check, Plus } from "lucide-react";
import Link from "next/link";

const mainPlan = {
	title: "一夜城プラン",
	price: "33,000",
	originalPrice: "55,000",
	unit: "円（税込）",
	description: "半日〜1日で完成・公開",
	discount: "サービス開始記念 2万円オフ",
	features: [
		"1ページ構成（6〜8セクション）",
		"文章総量〜3,000字目安",
		"画像最大8点（AI生成/フリー素材）",
		"スマホ最適化・レスポンシブ対応",
		"SEO基礎設定（title/description/OGP）",
		"問い合わせフォーム設置",
		"Cloudflare Pages デプロイ",
		"公開後7日以内の微修正2回",
	],
};

const options = [
	{
		title: "1セクション追加",
		price: "+5,500円",
		description: "ページに追加セクションを設置",
	},
	{
		title: "画像追加生成（+3点）",
		price: "+5,500円",
		description: "AI画像を追加で3点生成・最適化",
	},
	{
		title: "ロゴ簡易制作",
		price: "+11,000円",
		description: "タイポベースのシンプルなロゴ制作",
	},
	{
		title: "ブログ/CMS導入",
		price: "+16,500円",
		description: "簡易的な投稿機能の追加",
	},
	{
		title: "保守サポート",
		price: "3,300円/月",
		description: "小修正・監視・軽微アップデート（任意）",
	},
];

const paymentTerms = {
	payment: "前金 100%",
	cancellation: "着手後の返金なし（当日スプリントの性質上）",
};

export function PricingSection() {
	return (
		<section id="pricing" className="bg-muted/30 py-16 md:py-24">
			<Container>
				<SectionHeader
					title="価格"
					description={
						<div className="space-y-2">
							<p>シンプルで透明性のある料金体系</p>
							<div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
								<span className="animate-pulse">🔥</span>
								<span>サービス開始記念キャンペーン実施中</span>
							</div>
						</div>
					}
				/>

				<div className="mt-12 grid gap-8 lg:grid-cols-3">
					{/* Main plan */}
					<Card className="relative lg:col-span-2 overflow-hidden border-primary/20">
						<div className="absolute inset-x-0 top-0 h-1 bg-primary" />
						<CardHeader>
							<CardTitle className="text-2xl">{mainPlan.title}</CardTitle>
							<CardDescription>{mainPlan.description}</CardDescription>
						</CardHeader>
						<CardContent>
							{/* 限定価格表示 */}
							<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/20 dark:border-red-800">
								<div className="text-center">
									<div className="flex items-center justify-center gap-2 mb-2">
										<span className="animate-pulse">🔥</span>
										<span className="text-sm font-semibold text-red-700 dark:text-red-400">
											{mainPlan.discount}
										</span>
									</div>
									<div className="flex items-center justify-center gap-2">
										<span className="text-lg text-muted-foreground line-through">
											{mainPlan.originalPrice}{mainPlan.unit}
										</span>
										<span className="text-xl font-bold text-red-600">
											→
										</span>
									</div>
								</div>
							</div>
							<div className="mb-6 flex items-baseline justify-center">
								<span className="text-4xl font-bold text-red-600">{mainPlan.price}</span>
								<span className="ml-2 text-muted-foreground">{mainPlan.unit}</span>
								<div className="ml-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
									限定価格
								</div>
							</div>
							<ul className="grid gap-3 sm:grid-cols-2">
								{mainPlan.features.map((feature) => (
									<li key={feature} className="flex items-start">
										<Check className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<Button asChild className="w-full">
								<Link href="/contact?service=instant-site">今すぐ申し込む</Link>
							</Button>
						</CardFooter>
					</Card>

					{/* Options */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">追加オプション</CardTitle>
							<CardDescription>必要に応じて選択可能</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="space-y-4">
								{options.map((option) => (
									<li key={option.title} className="border-b pb-3 last:border-0">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<p className="text-sm font-medium">{option.title}</p>
												<p className="text-xs text-muted-foreground">{option.description}</p>
											</div>
											<span className="ml-2 text-sm font-semibold text-orange-600">
												{option.price}
											</span>
										</div>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>

				{/* Payment terms */}
				<div className="mt-8 rounded-lg border border-orange-600/20 bg-orange-50/50 p-6 dark:bg-orange-950/20">
					<h3 className="mb-3 font-semibold">お支払い・キャンセルポリシー</h3>
					<div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
						<div>
							<p className="font-medium text-foreground">お支払い</p>
							<p>{paymentTerms.payment}</p>
						</div>
						<div>
							<p className="font-medium text-foreground">キャンセル</p>
							<p>{paymentTerms.cancellation}</p>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}