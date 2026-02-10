import Image from "next/image";
import { FaArrowUpRightFromSquare, FaLine } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

/**
 * LINEでのお問い合わせ方法を表示するコンポーネント
 * LINE公式アカウントのQRコードと友だち追加リンクを提供
 */
export function ContactPhoneAndLine() {
	return (
		<div className="space-y-8">
			<Card className="h-full flex flex-col">
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="text-primary">
							<FaLine className="h-5 w-5" />
						</div>
						<CardTitle className="text-xl">
							LINEでのお問い合わせ
						</CardTitle>
					</div>
					<CardDescription>
						LINE公式アカウントからもお問い合わせいただけます。
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<div className="flex flex-col items-center gap-6">
						{/* QRコード */}
						<div className="relative w-48 h-48 sm:w-56 sm:h-56">
							<Image
								src="/images/line-qr.jpg"
								alt="LINE公式アカウント QRコード"
								fill
								className="object-contain rounded-lg"
								sizes="(max-width: 640px) 192px, 224px"
							/>
						</div>
						<div className="text-center space-y-2">
							<p className="text-sm text-muted-foreground">
								QRコードをスキャンするか、下のボタンから友だち追加してください。
							</p>
							<p className="text-sm text-muted-foreground">
								24時間受付・返信は営業時間内（{BUSINESS.BUSINESS_HOURS}）
							</p>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button variant="outline" className="w-full" asChild>
						<a
							href={BUSINESS.LINE_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2"
						>
							<FaLine className="h-4 w-4" />
							<span>友だち追加</span>
							<FaArrowUpRightFromSquare className="h-3 w-3" />
						</a>
					</Button>
				</CardFooter>
			</Card>

			{/* 注意事項 */}
			<Card className="bg-muted/50">
				<CardContent className="pt-6">
					<div className="space-y-2">
						<h3 className="text-sm font-medium">
							お問い合わせに関する注意事項
						</h3>
						<ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
							<li>
								お問い合わせ内容によっては、回答までにお時間をいただく場合がございます。
							</li>
							<li>
								営業時間外のお問い合わせは、翌営業日以降の対応となります。
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
