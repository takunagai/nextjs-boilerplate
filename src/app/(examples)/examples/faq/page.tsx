import { Container } from "@/components/ui/container";
import { FAQ } from "@/components/ui/faq";
import type { FAQItem } from "@/components/ui/faq/faq-types";
import { Metadata } from "next";
import {
	FaBox,
	FaCircleExclamation,
	FaCreditCard,
	FaHandshake,
	FaInfo,
	FaLightbulb,
	FaQuestion,
	FaTruckFast,
} from "react-icons/fa6";

// メタデータの設定
export const metadata: Metadata = {
	title: "FAQコンポーネント例 | Next.js Boilerplate",
	description: "よくある質問（FAQ）コンポーネントの実装例",
};

/**
 * FAQアイテムのサンプルデータ
 */
const faqItems: FAQItem[] = [
	{
		id: "shipping",
		question: "配送料はいくらですか？",
		answer: "全国一律500円です。5,000円以上のご購入で送料無料となります。",
		questionIcon: <FaTruckFast />,
		answerIcon: <FaInfo />,
		tags: [
			{ label: "配送", className: "bg-blue-100 text-blue-800" },
			{ label: "料金", className: "bg-green-100 text-green-800" },
		],
	},
	{
		id: "payment",
		question: "どのような支払い方法がありますか？",
		answer:
			"クレジットカード（VISA、MasterCard、JCB、American Express、Diners Club）、PayPay、コンビニ決済、銀行振込に対応しています。",
		questionIcon: <FaCreditCard />,
		answerIcon: <FaInfo />,
		tags: [{ label: "支払い", className: "bg-yellow-100 text-yellow-800" }],
	},
	{
		id: "return",
		question: "商品の返品・交換はできますか？",
		answer:
			"商品到着後7日以内であれば、未使用・未開封の商品に限り返品・交換を承ります。お客様都合による返品の場合は、返送料はお客様負担となります。商品に不良があった場合は当社負担で対応いたします。",
		questionIcon: <FaBox />,
		answerIcon: <FaInfo />,
		tags: [
			{ label: "返品", className: "bg-red-100 text-red-800" },
			{ label: "交換", className: "bg-purple-100 text-purple-800" },
		],
	},
	{
		id: "cancel",
		question: "注文のキャンセルはできますか？",
		answer:
			"ご注文確定後24時間以内であれば、お問い合わせフォームからキャンセルのご連絡をいただくことでキャンセル可能です。24時間を過ぎた場合や、すでに発送手続きが完了している場合はキャンセルできませんのでご了承ください。",
		questionIcon: <FaCircleExclamation />,
		answerIcon: <FaInfo />,
		tags: [{ label: "キャンセル", className: "bg-orange-100 text-orange-800" }],
	},
	{
		id: "warranty",
		question: "保証期間はどのくらいですか？",
		answer:
			"商品カテゴリによって保証期間が異なります。電子機器は購入日より1年間、家具・インテリアは6ヶ月間の保証となります。保証書が付属している商品については、保証書に記載の期間が適用されます。",
		questionIcon: <FaHandshake />,
		answerIcon: <FaInfo />,
		tags: [{ label: "保証", className: "bg-indigo-100 text-indigo-800" }],
	},
];

/**
 * FAQコンポーネントの例を表示するページ
 */
export default function FAQExamplesPage() {
	return (
		<>
			<Container as="header" className="space-y-4">
				<h1 className="text-4xl">FAQコンポーネントのサンプル</h1>
				<p className="text-xl text-muted-foreground">
					FAQコンポーネントを使用した様々なデザインバリエーションのサンプルです。
				</p>
			</Container>

			{/* 基本的なFAQ */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">基本的なFAQ</h2>
					<p className="mb-6 text-muted-foreground">
						シンプルなFAQコンポーネントの実装例です。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<FAQ
							items={faqItems}
							heading={<h3 className="text-xl font-bold">よくあるご質問</h3>}
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>デフォルトのスタイルを使用した基本的な実装です。</p>
					</div>
				</section>
			</Container>

			{/* カスタムスタイルを適用したFAQ */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">カスタムスタイル</h2>
					<p className="mb-6 text-muted-foreground">
						Tailwind CSSを使用してスタイルをカスタマイズしたFAQ例です。
					</p>

					<div className="border rounded-lg overflow-hidden">
						<FAQ
							items={faqItems}
							heading={
								<h3 className="text-2xl font-bold text-primary mb-2">
									よくあるご質問
								</h3>
							}
							defaultOpenIds={["shipping"]}
							classNames={{
								container: "bg-foreground/10 p-6",
								item: "bg-white shadow-xs mb-4 last:mb-0 border-0 rounded-md overflow-hidden",
								question: "font-bold text-slate-800 py-3",
								questionIcon: "text-orange-400",
								answer: "pl-2",
								answerIcon: "text-blue-400 size-4 mr-2 mt-1",
								tag: "text-xs px-2 py-0.5",
							}}
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							カスタムスタイルを適用し、最初の質問を開いた状態で表示しています。
						</p>
					</div>
				</section>
			</Container>

			{/* 検索・フィルタリング機能付きFAQ */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">検索・フィルタリング</h2>
					<p className="mb-6 text-muted-foreground">
						初期検索語句や特定タグでフィルタリングしたFAQ例です。
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="border rounded-lg p-6 bg-card">
							<h3 className="text-lg font-bold mb-4">
								検索結果: &quot;返品&quot;
							</h3>
							<FAQ items={faqItems} search="返品" />
						</div>

						<div className="border rounded-lg p-6 bg-card">
							<h3 className="text-lg font-bold mb-4">タグ: &quot;料金&quot;</h3>
							<FAQ items={faqItems} tagFilter={["料金"]} />
						</div>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>サーバーコンポーネントでの初期フィルタリング例です。</p>
					</div>
				</section>
			</Container>

			{/* アイコンのカスタマイズ例 */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">アイコンバリエーション</h2>
					<p className="mb-6 text-muted-foreground">
						質問と回答にカスタムアイコンを設定した例です。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<FAQ
							items={[
								{
									id: "faq-custom-1",
									question: "当サイトについて",
									answer:
										"当サイトは、Next.jsとTailwind CSSを使用したモダンなWebアプリケーションのボイラープレートです。",
									questionIcon: <FaQuestion className="text-blue-500" />,
									answerIcon: <FaLightbulb className="text-yellow-500" />,
								},
								{
									id: "faq-custom-2",
									question: "コンポーネントのカスタマイズ方法",
									answer:
										"コンポーネントは、Tailwind CSSクラスを使用して自由にカスタマイズできます。classNames propを使用して各要素のスタイルを変更できます。",
									questionIcon: <FaQuestion className="text-green-500" />,
									answerIcon: <FaLightbulb className="text-orange-500" />,
								},
							]}
							classNames={{
								item: "border border-dashed rounded-md mb-4 last:mb-0",
							}}
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							react-iconsを使用したアイコンカスタマイズの例です。インラインでTailwindクラスを適用しています。
						</p>
					</div>
				</section>
			</Container>

			{/* アニメーションを無効化したFAQ */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">アニメーション無効</h2>
					<p className="mb-6 text-muted-foreground">
						アニメーションを無効化したFAQ例です。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<FAQ
							items={faqItems.slice(0, 2)}
							animate={false}
							heading={
								<h3 className="text-xl font-bold">アニメーション無効</h3>
							}
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							アコーディオンの開閉アニメーションを無効化しています。パフォーマンス向上や特定の利用ケースに有用です。
						</p>
					</div>
				</section>
			</Container>

			{/* アクセシビリティに配慮したFAQ */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">アクセシビリティ配慮</h2>
					<p className="mb-6 text-muted-foreground">
						アクセシビリティに配慮したFAQ例です。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<FAQ
							items={faqItems.slice(0, 3)}
							ariaLabel="製品に関するよくある質問"
							heading={
								<h3 className="text-xl font-bold" id="faq-heading">
									製品に関するよくある質問
								</h3>
							}
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							ARIA属性を適切に設定し、スクリーンリーダーでの使用に配慮しています。
						</p>
					</div>
				</section>
			</Container>

			{/* HTMLを含む回答を持つFAQ */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">リッチコンテンツ</h2>
					<p className="mb-6 text-muted-foreground">
						HTMLを含む回答を持つFAQ例です。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<FAQ
							items={[
								{
									id: "rich-content-1",
									question: "料金プランについて教えてください",
									answer: (
										<div>
											<p className="mb-2">
												料金プランは以下の3種類があります：
											</p>
											<ul className="list-disc ml-6 mb-2 space-y-1">
												<li>
													<strong>スタンダード</strong>: 月額1,000円（税込）
												</li>
												<li>
													<strong>プレミアム</strong>: 月額2,500円（税込）
												</li>
												<li>
													<strong>ビジネス</strong>: 月額5,000円（税込）
												</li>
											</ul>
											<p className="mt-2">
												詳細は
												<a href="#top" className="text-primary hover:underline">
													料金ページ
												</a>
												をご覧ください。
											</p>
										</div>
									),
									questionIcon: <FaInfo className="text-blue-500" />,
									tags: [
										{ label: "料金", className: "bg-green-100 text-green-800" },
									],
								},
								{
									id: "rich-content-2",
									question: "お問い合わせ方法を教えてください",
									answer: (
										<div>
											<p className="mb-2">
												以下の方法でお問い合わせいただけます：
											</p>
											<div className="flex flex-col space-y-2 mt-1 mb-3">
												<div className="flex items-center">
													<span className="font-medium min-w-24">メール:</span>
													<a
														href="mailto:info@example.com"
														className="text-primary hover:underline"
													>
														info@example.com
													</a>
												</div>
												<div className="flex items-center">
													<span className="font-medium min-w-24">電話:</span>
													<a
														href="tel:0120-XXX-XXX"
														className="text-primary hover:underline"
													>
														0120-XXX-XXX
													</a>
												</div>
												<div className="flex items-center">
													<span className="font-medium min-w-24">
														営業時間:
													</span>
													<span>平日 9:00〜18:00</span>
												</div>
											</div>
											<div className="bg-primary-100 p-3 rounded-md text-sm">
												<p className="font-medium">
													お問い合わせの際は、お客様IDをお伝えいただくとスムーズです。
												</p>
											</div>
										</div>
									),
									questionIcon: <FaInfo className="text-blue-500" />,
									tags: [
										{
											label: "お問い合わせ",
											className: "bg-blue-100 text-blue-800",
										},
									],
								},
							]}
							classNames={{
								answer: "prose prose-sm max-w-none",
							}}
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							HTMLやReactコンポーネントを含む回答を表示できます。リスト、リンク、その他のリッチコンテンツに対応しています。
						</p>
					</div>
				</section>
			</Container>

			{/* コンテナクエリによるレスポンシブデザイン */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">コンテナクエリ対応</h2>
					<p className="mb-6 text-muted-foreground">
						コンテナクエリを使用したレスポンシブデザインの実装例です。コンテナのサイズに応じてレイアウトが自動調整されます。
					</p>

					<h3 className="text-lg font-medium mb-4">
						1カラム / 2カラム / 3カラムレイアウト
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
						{/* 1カラム - 狭いコンテナ */}
						<div className="border rounded-lg p-4 bg-card">
							<h4 className="text-base font-medium mb-3 pb-2 border-b">
								1カラムレイアウト
							</h4>
							<div className="w-full max-w-[280px] mx-auto">
								<FAQ
									items={faqItems.slice(0, 2)}
									heading={
										<p className="text-sm font-medium mb-3">狭いコンテナ</p>
									}
									classNames={{
										question: "text-foreground",
										answer: "text-foreground/80",
									}}
								/>
							</div>
						</div>

						{/* 2カラム - 中サイズコンテナ */}
						<div className="border rounded-lg p-4 bg-card">
							<h4 className="text-base font-medium mb-3 pb-2 border-b">
								2カラムレイアウト
							</h4>
							<div className="w-full max-w-[450px] mx-auto">
								<FAQ
									items={faqItems.slice(0, 2)}
									heading={
										<p className="text-sm font-medium mb-3">中サイズコンテナ</p>
									}
									classNames={{
										question: "text-foreground",
										answer: "text-foreground/80",
									}}
								/>
							</div>
						</div>

						{/* 3カラム - 広いコンテナ */}
						<div className="border rounded-lg p-4 bg-card">
							<h4 className="text-base font-medium mb-3 pb-2 border-b">
								3カラムレイアウト
							</h4>
							<div className="w-full mx-auto">
								<FAQ
									items={faqItems.slice(0, 2)}
									heading={
										<p className="text-sm font-medium mb-3">広いコンテナ</p>
									}
									classNames={{
										question: "text-foreground",
										answer: "text-foreground/80",
									}}
								/>
							</div>
						</div>
					</div>

					<h3 className="text-lg font-medium mb-4">
						コンテナサイズによる動的変化
					</h3>
					<div className="grid grid-cols-1 gap-6">
						{/* リサイズ可能なコンテナ */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-medium mb-3">
								リサイズ可能なコンテナ
							</h4>
							<p className="text-sm text-muted-foreground mb-4">
								下記のエリアの幅を変更すると、FAQコンポーネントが自動的に適応します。
							</p>

							<div className="w-full max-w-full overflow-auto resize-x border border-dashed border-gray-300 p-4 rounded-md min-h-[300px]">
								<FAQ
									items={faqItems.slice(0, 3)}
									heading={
										<p className="text-base font-medium mb-3">
											リサイズ可能なFAQ
										</p>
									}
									defaultOpenIds={["shipping"]}
									classNames={{
										container: "min-w-[250px]",
										item: "text-black bg-white shadow-xs border-0 rounded-md overflow-hidden mb-3",
									}}
								/>
							</div>

							<div className="mt-4 text-sm text-muted-foreground">
								<p>
									ブラウザによっては、右下をドラッグしてリサイズできます。コンテナサイズに応じて：
								</p>
								<ul className="list-disc ml-5 mt-2 space-y-1">
									<li>
										<strong>小さいコンテナ</strong>:
										フォントサイズ縮小、タグは下部に表示
									</li>
									<li>
										<strong>中サイズコンテナ</strong>: 標準サイズ、余白拡大
									</li>
									<li>
										<strong>大きいコンテナ</strong>:
										タグが質問横に表示、余白最大化
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							コンテナクエリ（<code>@container</code>
							）を使用することで、FAQコンポーネントが配置される場所のサイズに応じて自動的にレイアウトを調整します。ビューポート幅ではなくコンテナのサイズに基づくため、サイドバーや複数カラムレイアウト内でも最適な表示が可能です。
						</p>
					</div>
				</section>
			</Container>
		</>
	);
}
