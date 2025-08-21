import { Container } from "@/components/ui/container";
import { FaStar, FaQuoteRight } from "react-icons/fa6";
import Image from "next/image";
import { cn } from "@/lib/utils";

const testimonials = [
	{
		id: 1,
		name: "鈴木 太郎",
		role: "ECサイト運営者",
		company: "Fashion Online Store",
		content:
			"商品写真のアップスケールを依頼しました。小さくてぼやけた画像が、まるで最初から高解像度で撮影したかのような仕上がりに。売上も20%向上しました！",
		rating: 5,
		image: "/api/placeholder/80/80",
		project: "商品画像アップスケール",
	},
	{
		id: 2,
		name: "田中 美咲",
		role: "マーケティング担当",
		company: "株式会社クリエイト",
		content:
			"SNS用の画像を定期的に制作していただいています。AIで生成とは思えないほど自然で、ブランドイメージにもぴったり。コストも従来の1/3になりました。",
		rating: 5,
		image: "/api/placeholder/80/80",
		project: "SNS用画像生成",
	},
	{
		id: 3,
		name: "佐藤 健一",
		role: "建築士",
		company: "サトウ建築事務所",
		content:
			"プレゼン用の建築パースをお願いしました。クライアントの反応が今までとは全然違います。リアルで美しい仕上がりに感動しました。",
		rating: 5,
		image: "/api/placeholder/80/80",
		project: "建築パース制作",
	},
	{
		id: 4,
		name: "山田 花子",
		role: "フリーランスデザイナー",
		company: "Yamada Design",
		content:
			"クライアント向けのイラスト制作でお世話になっています。私では表現できない複雑なタッチも、AIと後処理技術で完璧に。とても助かっています。",
		rating: 5,
		image: "/api/placeholder/80/80",
		project: "イラスト制作",
	},
];

export function AITestimonials() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						お客様の声
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						AI画像制作サービスをご利用いただいたお客様からの評価
					</p>
				</div>

				<div className="mt-12 grid gap-8 md:grid-cols-2">
					{testimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800"
						>
							{/* 引用符 */}
							<FaQuoteRight className="absolute right-6 top-6 h-8 w-8 text-gray-200 dark:text-gray-700" />

							{/* プロジェクト情報 */}
							<div className="mb-4">
								<span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
									{testimonial.project}
								</span>
							</div>

							{/* 評価 */}
							<div className="mb-4 flex">
								{[...Array(5)].map((_, i) => (
									<FaStar
										key={i}
										className={cn(
											"h-5 w-5",
											i < testimonial.rating
												? "fill-yellow-400 text-yellow-400"
												: "text-gray-300 dark:text-gray-600",
										)}
									/>
								))}
							</div>

							{/* コンテンツ */}
							<p className="mb-6 text-gray-600 dark:text-gray-400">
								{testimonial.content}
							</p>

							{/* 顧客情報 */}
							<div className="flex items-center">
								<Image
									src={testimonial.image}
									alt={testimonial.name}
									width={48}
									height={48}
									className="rounded-full"
								/>
								<div className="ml-4">
									<p className="font-semibold text-gray-900 dark:text-white">
										{testimonial.name}
									</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{testimonial.role} - {testimonial.company}
									</p>
								</div>
							</div>

							{/* 背景装飾 */}
							<div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 opacity-20 dark:from-purple-900/20 dark:to-blue-900/20" />
						</div>
					))}
				</div>

				{/* 全体的な満足度指標 */}
				<div className="mt-16">
					<div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
						<div className="grid gap-8 md:grid-cols-3">
							<div className="text-center">
								<div className="mb-2 inline-flex items-center">
									<FaStar className="mr-2 h-6 w-6 fill-yellow-400 text-yellow-400" />
									<span className="text-3xl font-bold text-gray-900 dark:text-white">
										4.9
									</span>
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">
									総合満足度（80件のレビュー）
								</div>
							</div>
							<div className="text-center">
								<div className="mb-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
									98%
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">
									リピート率
								</div>
							</div>
							<div className="text-center">
								<div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
									100%
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">
									期限内納品率
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 業界別の実績 */}
				<div className="mt-12">
					<h3 className="mb-8 text-center text-xl font-bold text-gray-900 dark:text-white">
						様々な業界でご利用いただいています
					</h3>
					<div className="flex flex-wrap justify-center gap-4">
						{[
							"EC・小売",
							"広告・マーケティング",
							"建築・不動産",
							"出版・メディア",
							"ゲーム・エンタメ",
							"教育・研修",
							"医療・ヘルスケア",
							"食品・飲食",
						].map((industry, index) => (
							<span
								key={index}
								className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							>
								{industry}
							</span>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
}