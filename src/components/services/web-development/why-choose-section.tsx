import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FaCheckCircle } from "react-icons/fa";

export function WhyChooseSection() {
	return (
		<section className="py-16 md:py-24">
			<Container width="xl">
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						なぜ選ばれるの？
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						それは、AIと経験の「いいとこ取り」ができるから
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
					{/* 左側：画像 */}
					<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
						<Image
							src="/dummy-images/office-01.jpg"
							alt="ワークスペース"
							fill
							className="object-cover"
						/>
					</div>

					{/* 右側：コンテンツ */}
					<div className="space-y-8">
						<div className="space-y-6">
							<div className="flex gap-4">
								<div className="flex-shrink-0">
									<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
										<FaCheckCircle className="w-6 h-6 text-primary" />
									</div>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2">
										制作会社より60-70%お得
									</h3>
									<p className="text-muted-foreground">
										AIで作業時間を短縮できるから、その分料金もお安くできます。
										品質はしっかり保ちながら、コストを抑えられる新しい選択肢です。
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0">
									<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
										<FaCheckCircle className="w-6 h-6 text-primary" />
									</div>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2">
										AI専業より確かな品質
									</h3>
									<p className="text-muted-foreground">
										15年の経験があるから、AIが作った「ちょっと変な部分」も見逃しません。
										人の目でしっかりチェック・修正して、納得の仕上がりに。
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0">
									<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
										<FaCheckCircle className="w-6 h-6 text-primary" />
									</div>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2">
										ワンストップで楽ちん
									</h3>
									<p className="text-muted-foreground">
										デザインからコーディング、写真撮影まで全部お任せOK。
										複数の業者さんとやり取りする手間もなく、スムーズに進められます。
									</p>
								</div>
							</div>
						</div>

						<div className="p-6 bg-muted/30 rounded-lg border border-border">
							<p className="text-sm text-muted-foreground italic">
								「良いものを、もっと多くの人に届けたい」
								<br />
								そんな想いで、AIを活用した新しい制作スタイルを始めました。
							</p>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}