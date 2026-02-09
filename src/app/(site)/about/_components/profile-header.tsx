import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { profileBadges } from "@/lib/data/about-data";

export function ProfileHeader() {
	return (
		<>
			{/* プロフィールヘッダー */}
			<header className="text-center space-y-8">
				<div className="space-y-4">
					<div className="mx-auto h-40 w-40 rounded-full overflow-hidden shadow-lg">
						<Image
							src="/images/portrait.png"
							alt="ながたく (Taku Nagai) のプロフィール画像"
							width={160}
							height={160}
							className="object-cover"
							priority
						/>
					</div>
					<div className="space-y-2">
						<h1 className="text-4xl font-bold tracking-tight">
							ながたく (Taku Nagai)
						</h1>
						<p className="text-2xl text-primary font-medium">
							ウェブデザイナー・AI活用コンサルタント
						</p>
						<p className="text-muted-foreground">
							📍 兵庫県川西市
							<br />
							(北摂、大阪北エリア、オンライン対応可)
						</p>
					</div>
				</div>
				<div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
					{profileBadges.map((badge) => (
						<Badge key={badge} variant="secondary" className="text-sm">
							{badge}
						</Badge>
					))}
				</div>
			</header>

			{/* メインメッセージ */}
			<section className="space-y-6">
				<h2 className="text-3xl font-bold text-foreground mb-4 border-l-4 border-primary pl-6">
					はじめまして
				</h2>
				<div className="prose prose-lg max-w-none">
					<p className="text-lg leading-8 mb-4">
						15年以上ウェブ制作に携わってきた経験と、最新の AI
						技術を組み合わせて、あなたのビジネスの
						<span className="font-semibold text-primary">
							「できたらいいな」
						</span>
						を<span className="font-semibold text-primary">「できた！」</span>
						に変えるお手伝いをしています。
					</p>
				</div>
			</section>
		</>
	);
}
