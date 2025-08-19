import { ContactForm } from "@/components/contact/contact-form";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
	title: "お問い合わせ",
	description:
		"ご質問やお問い合わせは、こちらのフォームからお気軽にご連絡ください。",
	keywords: ["お問い合わせ", "コンタクト", "サポート", "フォーム"],
	canonical: "/contact",
});

export const viewport = generateViewport();

export default function ContactPage() {
	// パンくずリストの基本データを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "お問い合わせ", path: "/contact", current: true },
	];

	// UI表示用とJSON-LD用のデータを生成
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<WebsiteJsonLd
				name={`お問い合わせ | ${META.DEFAULT_TITLE}`}
				description="ご質問やお問い合わせは、こちらのフォームからお気軽にご連絡ください。"
				url={`${META.SITE_URL}/contact`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>
			<Container className="mt-8" paddingY="lg" paddingX="2xl">
				<div className="flex flex-col gap-8">
					{/* ヘッダーセクション */}
					<div className="text-center">
						<PageHeader title="お問い合わせ" />
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
			</Container>
		</>
	);
}
