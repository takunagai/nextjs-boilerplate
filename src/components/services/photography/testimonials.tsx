import { Container } from "@/components/ui/container";
import { FaStar, FaQuoteRight } from "react-icons/fa6";
import Image from "next/image";
import { cn } from "@/lib/utils";

const testimonials = [
	{
		id: 1,
		name: "田中 美咲",
		role: "カフェオーナー",
		company: "Cafe Lumière",
		content:
			"料理の美味しさが伝わる写真で、SNSからの集客が大幅にアップしました。細かい要望にも丁寧に対応していただき、大満足です。",
		rating: 5,
		image: "/api/placeholder/80/80",
	},
	{
		id: 2,
		name: "山田 健一",
		role: "ECサイト運営",
		company: "Yamada Select Shop",
		content:
			"商品の魅力を最大限に引き出していただきました。プロカメラマンより手頃な価格で、品質は申し分ありません。リピート確定です！",
		rating: 5,
		image: "/api/placeholder/80/80",
	},
	{
		id: 3,
		name: "佐藤 真理子",
		role: "起業家",
		company: "MR Consulting",
		content:
			"プロフィール写真の撮影をお願いしました。緊張していた私をリラックスさせてくれて、自然な表情の素敵な写真が撮れました。",
		rating: 5,
		image: "/api/placeholder/80/80",
	},
];

export function Testimonials() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						お客様の声
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						実際にご利用いただいたお客様からのメッセージ
					</p>
				</div>

				<div className="mt-12 grid gap-8 lg:grid-cols-3">
					{testimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800"
						>
							{/* 引用符 */}
							<FaQuoteRight className="absolute right-6 top-6 h-8 w-8 text-gray-200 dark:text-gray-700" />

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
							<div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-20 dark:from-blue-900/20 dark:to-purple-900/20" />
						</div>
					))}
				</div>

				{/* 信頼性指標 */}
				<div className="mt-12 text-center">
					<div className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 dark:from-blue-900/20 dark:to-purple-900/20">
						<FaStar className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
						<span className="font-semibold text-gray-900 dark:text-white">
							4.9/5.0
						</span>
						<span className="ml-2 text-gray-600 dark:text-gray-400">
							（50件以上のレビュー）
						</span>
					</div>
				</div>
			</Container>
		</section>
	);
}