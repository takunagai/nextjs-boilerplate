import { ContactForm } from "@/components/contact/contact-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { generateMetadata } from "@/components/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
	title: "お問い合わせ",
	description: "ご質問やお問い合わせは、こちらのフォームからお気軽にご連絡ください。",
	keywords: ["お問い合わせ", "コンタクト", "サポート", "フォーム"],
	canonical: "/contact",
});

export default function ContactPage() {
	return (
		<div className="container mx-auto py-12 px-4 max-w-4xl">
			<Breadcrumb
				items={[
					{ label: "ホーム", href: "/" },
					{ label: "お問い合わせ", href: "/contact", isCurrent: true },
				]}
			/>
			<div className="flex flex-col gap-8">
				{/* ヘッダーセクション */}
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>
					<div className="max-w-2xl mx-auto space-y-4 mb-6">
						<p className="text-muted-foreground">
							ご質問やお問い合わせは、以下のいずれかの方法でお気軽にご連絡ください。
							お問い合わせいただいた内容につきましては、通常3営業日以内にご返信いたします。
						</p>
						<div className="bg-muted p-4 rounded-lg text-sm">
							<p className="font-medium">
								営業時間: <b>平日 9:00〜18:00（土日祝休み）</b>
							</p>
							<p className="mt-3 text-muted-foreground">
								お問い合わせの前に
								<a href="/privacy" className="text-primary hover:underline">
									プライバシーポリシー
								</a>
								をご確認ください。
								万が一、ご返信がない場合は、お手数ですがお電話にてご連絡ください。
							</p>
						</div>
					</div>
				</div>

				{/* コンタクトフォームコンポーネント */}
				<ContactForm />
			</div>
		</div>
	);
}
