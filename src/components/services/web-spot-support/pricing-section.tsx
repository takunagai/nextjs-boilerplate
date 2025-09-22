import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pricingOptions = [
	{
		name: "簡単修正",
		price: "5,000",
		unit: "円～",
		description: "30分以内の簡単な修正作業",
		examples: ["テキスト修正", "色変更", "リンク修正"]
	},
	{
		name: "標準修正",
		price: "15,000",
		unit: "円～",
		description: "2時間以内の修正作業",
		examples: ["レイアウト調整", "画像差し替え", "簡単な機能追加"]
	},
	{
		name: "本格修正",
		price: "30,000",
		unit: "円～",
		description: "1日以内の本格的な修正作業",
		examples: ["フォーム作成", "ページ作成", "エラー修正"]
	},
	{
		name: "緊急対応",
		price: "要相談",
		unit: "",
		description: "24時間以内の緊急対応",
		examples: ["サイトダウン", "セキュリティ事故", "重大なエラー"]
	}
];

export function WebSpotSupportPricingSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30" id="pricing">
			<Container>
				<SectionHeader
					title="料金体系"
					description="作業内容・作業時間に応じた明朗料金"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{pricingOptions.map((option, index) => (
						<div
							key={index}
							className="bg-background border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
						>
							<div className="space-y-4">
								<div className="text-center">
									<h3 className="font-bold text-lg">{option.name}</h3>
									<div className="mt-2">
										<span className="text-2xl font-bold text-purple-600">{option.price}</span>
										<span className="text-muted-foreground ml-1">{option.unit}</span>
									</div>
									<p className="text-sm text-muted-foreground mt-2">
										{option.description}
									</p>
								</div>
								<ul className="space-y-2">
									{option.examples.map((example, exampleIndex) => (
										<li key={exampleIndex} className="text-sm text-muted-foreground flex items-center">
											<span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
											{example}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-muted-foreground mb-6">
						※ 実際の作業時間・難易度により料金が変動します
						<br />
						※ 事前に無料見積もりをご提供します
					</p>
					<Link href="/contact?service=web-spot-support">
						<Button size="lg">
							無料見積もりを依頼
						</Button>
					</Link>
				</div>
			</Container>
		</section>
	);
}