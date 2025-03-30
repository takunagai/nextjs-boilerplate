"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FaPhone, FaLine, FaArrowUpRightFromSquare } from "react-icons/fa6";

/**
 * 電話とLINEでのお問い合わせ方法を表示するコンポーネント
 * 電話番号とLINE公式アカウントへのリンクを提供
 */
export function ContactPhoneAndLine() {
	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* 電話問い合わせセクション */}
				<ContactMethodCard
					title="お電話でのお問い合わせ"
					description="平日10:00〜17:00にて電話でのお問い合わせを受け付けております。"
					icon={<FaPhone className="h-5 w-5" />}
					content={
						<div className="space-y-2">
							<p className="text-lg font-semibold">03-1234-5678</p>
							<p className="text-sm text-muted-foreground">
								受付時間: 平日 10:00〜17:00
							</p>
							<p className="text-sm text-muted-foreground">
								※土日祝日・年末年始を除く
							</p>
						</div>
					}
					footer={
						<Button
							variant="outline"
							className="w-full"
							onClick={() => {
								window.location.href = "tel:03-1234-5678";
							}}
						>
							電話をかける
						</Button>
					}
				/>

				{/* LINE問い合わせセクション */}
				<ContactMethodCard
					title="LINEでのお問い合わせ"
					description="LINE公式アカウントからもお問い合わせいただけます。"
					icon={<FaLine className="h-5 w-5" />}
					content={
						<div className="space-y-2">
							<p className="text-sm text-muted-foreground">
								LINE公式アカウントを友だち追加して、トーク画面からお問い合わせください。
							</p>
							<p className="text-sm text-muted-foreground">
								24時間受付・返信は営業時間内（平日10:00〜17:00）
							</p>
						</div>
					}
					footer={
						<Button
							variant="outline"
							className="w-full flex items-center gap-2"
							onClick={() => {
								window.open("https://line.me/R/ti/p/@example", "_blank");
							}}
						>
							<span>友だち追加</span>
							<FaArrowUpRightFromSquare className="h-4 w-4" />
						</Button>
					}
				/>
			</div>

			{/* 共通の注意事項 */}
			<Card className="bg-muted/50">
				<CardContent className="pt-6">
					<div className="space-y-2">
						<h3 className="text-sm font-medium">お問い合わせに関する注意事項</h3>
						<ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
							<li>
								お問い合わせ内容によっては、回答までにお時間をいただく場合がございます。
							</li>
							<li>
								営業時間外のお問い合わせは、翌営業日以降の対応となります。
							</li>
							<li>
								緊急性の高いお問い合わせは、お電話でのご連絡をお願いいたします。
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

/**
 * お問い合わせ方法を表示するカードコンポーネント
 */
interface ContactMethodCardProps {
	title: string;
	description: string;
	icon: React.ReactNode;
	content: React.ReactNode;
	footer: React.ReactNode;
}

function ContactMethodCard({
	title,
	description,
	icon,
	content,
	footer,
}: ContactMethodCardProps) {
	return (
		<Card className="h-full flex flex-col">
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="text-primary">{icon}</div>
					<CardTitle className="text-xl">{title}</CardTitle>
				</div>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow">{content}</CardContent>
			<CardFooter>{footer}</CardFooter>
		</Card>
	);
}
