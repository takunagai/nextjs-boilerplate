import { Container } from "@/components/ui/container";
import { FaArrowRight, FaCamera, FaEnvelope, FaPhone } from "react-icons/fa6";
import Link from "next/link";

export function PhotographyCTA() {
	return (
		<section
			id="contact"
			className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 py-16 sm:py-24"
		>
			{/* 背景装飾 */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute -left-8 -top-8 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
				<div className="absolute -bottom-8 -right-8 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
				<div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
			</div>

			<Container as="section">
				<div className="text-center text-white">
					{/* アイコン */}
					<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
						<FaCamera className="h-10 w-10" />
					</div>

					{/* メインコピー */}
					<h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
						理想の写真を、
						<br />
						一緒に作りませんか？
					</h2>

					{/* サブコピー */}
					<p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 sm:text-xl">
						あなたのビジネスを魅力的に伝える写真撮影。
						まずは無料相談から始めませんか？
					</p>

					{/* CTAボタン */}
					<div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Link
							href="/contact"
							className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-medium text-blue-600 transition-all hover:bg-gray-100 hover:shadow-lg"
						>
							無料相談を申し込む
							<FaArrowRight className="ml-2 h-5 w-5" />
						</Link>
						<a
							href="tel:090-1234-5678"
							className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
						>
							<FaPhone className="mr-2 h-5 w-5" />
							電話で相談
						</a>
					</div>

					{/* 連絡先情報 */}
					<div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-3">
						<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
							<FaEnvelope className="mx-auto mb-2 h-6 w-6" />
							<p className="text-sm font-medium">メール</p>
							<p className="text-sm text-white/80">info@example.com</p>
						</div>
						<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
							<FaPhone className="mx-auto mb-2 h-6 w-6" />
							<p className="text-sm font-medium">電話</p>
							<p className="text-sm text-white/80">090-1234-5678</p>
						</div>
						<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
							<FaCamera className="mx-auto mb-2 h-6 w-6" />
							<p className="text-sm font-medium">対応エリア</p>
							<p className="text-sm text-white/80">東京都内・近郊</p>
						</div>
					</div>

					{/* 補足メッセージ */}
					<div className="mt-12 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
						<p className="text-sm text-white/90">
							<strong>お気軽にご相談ください</strong>
							<br />
							撮影内容、予算、スケジュールなど、どんなことでもお聞かせください。
							お客様に最適なプランをご提案いたします。
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}