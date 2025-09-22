import Link from "next/link";
import Image from "next/image";
import { FaCalendarCheck, FaComments } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCTASection() {
	return (
		<section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-background">
			<Container width="xl">
				<div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
					{/* 左側：コンテンツ */}
					<div className="space-y-6">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								まずは気軽に
								<br />
								お話ししませんか？
							</h2>
							<p className="text-lg text-muted-foreground mb-6">
								「こんなサイトを作りたいけど、どうしたらいいかわからない...」
								<br />
								「予算はこれくらいで、できるかな？」
								<br />
								そんな漠然とした相談でも、全然大丈夫です。
							</p>
						</div>

						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<span className="text-primary text-sm">✓</span>
								</div>
								<p className="text-muted-foreground">
									<strong className="text-foreground">相談は無料</strong>
									です。お気軽にどうぞ
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<span className="text-primary text-sm">✓</span>
								</div>
								<p className="text-muted-foreground">
									<strong className="text-foreground">
										内容がまとまっていなくてもOK
									</strong>
									。一緒に整理しましょう
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<span className="text-primary text-sm">✓</span>
								</div>
								<p className="text-muted-foreground">
									<strong className="text-foreground">
										しつこい営業はしません
									</strong>
									。安心してご相談ください
								</p>
							</div>
						</div>

						<div className="pt-4">
							<div className="flex flex-col sm:flex-row gap-4">
								<Button asChild size="lg" className="text-base px-8 py-3">
									<Link href="/contact">
										<FaCalendarCheck className="w-5 h-5 mr-2" />
										無料相談を予約する
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="lg"
									className="text-base px-8 py-3"
								>
									<Link href="/contact?type=question">
										<FaComments className="w-5 h-5 mr-2" />
										質問してみる
									</Link>
								</Button>
							</div>
						</div>

						<div className="pt-4">
							<p className="text-sm text-muted-foreground">
								<strong>お返事は24時間以内</strong>にいたします。
								<br />
								土日祝日の場合は、翌営業日にご連絡いたします。
							</p>
						</div>
					</div>

					{/* 右側：画像 */}
					<div className="relative order-first lg:order-last">
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
							<Image
								src="/dummy-images/photo-06.jpg"
								alt="相談の様子"
								fill
								className="object-cover"
							/>
						</div>
						{/* 装飾的な要素 */}
						<div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
						<div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-lg"></div>
					</div>
				</div>

				{/* 下部の簡単な実績 */}
				<div className="mt-16 pt-8 border-t border-border">
					<div className="text-center mb-8">
						<p className="text-muted-foreground">
							これまでのお客様にも喜んでいただいています
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
						<div className="p-4">
							<div className="text-2xl font-bold text-primary mb-2">150+</div>
							<p className="text-sm text-muted-foreground">制作実績</p>
						</div>
						<div className="p-4">
							<div className="text-2xl font-bold text-primary mb-2">98%</div>
							<p className="text-sm text-muted-foreground">満足度</p>
						</div>
						<div className="p-4">
							<div className="text-2xl font-bold text-primary mb-2">85%</div>
							<p className="text-sm text-muted-foreground">リピート率</p>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
