import ColumnLayout from "@/components/layout/column-layout";
import {
	BreadcrumbJsonLd,
	WebsiteJsonLd,
	generateMetadata,
	generateViewport,
} from "@/components/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generateMetadata({
	title: "サービス",
	description:
		"ウェブ制作・アプリ開発・コンサルティングなど多彩なサービスを提供しています。",
	keywords: ["サービス", "ウェブ制作", "アプリ開発", "コンサルティング"],
	canonical: "/services",
});

export const viewport = generateViewport();

export default function ServicesPage() {
	// パンくずリストのデータを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "サービス", path: "/services", current: true },
	];
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<WebsiteJsonLd
				name={`サービス | ${META.DEFAULT_TITLE}`}
				description="ウェブ制作・アプリ開発・コンサルティングなど多彩なサービスを提供しています。"
				url={`${META.SITE_URL}/services`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<div className="text-center">
				<h1 className="text-3xl font-bold mb-2">サービス</h1>
				<p className="text-muted-foreground">弊社のサービスをご紹介します。</p>
			</div>

			<Container className="mt-8" paddingY="lg">
				<ColumnLayout variant="2col-right" gap="gap-8">
					<ColumnLayout.Main className="space-y-8">
						<p className="text-2xl font-semibold">
							お客様のビジネスを成功に導く多彩なサービスを提供しています。
						</p>
						<ul className="list-disc list-inside space-y-2 text-base">
							<li>最新技術を活用した高品質なウェブサイト・アプリ開発</li>
							<li>UI/UX設計から運用・保守までワンストップ対応</li>
							<li>ビジネス課題を解決するコンサルティングサービス</li>
						</ul>

						<Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0">
							<CardContent className="py-6">
								<div className="text-center">
									<span className="text-xl font-bold text-primary">
										無料相談受付中！
									</span>
									<p className="mt-2 text-base text-muted-foreground">
										ご相談・お見積りはお気軽にお問い合わせください。
									</p>
									<Link
										href="/contact"
										className="inline-block mt-4 px-6 py-2 bg-primary text-background rounded font-semibold shadow hover:bg-primary/90 transition"
									>
										お問い合わせはこちら
									</Link>
								</div>
							</CardContent>
						</Card>
					</ColumnLayout.Main>
					<ColumnLayout.Right className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>サービスカテゴリ</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-3">
								<Link
									href="/services"
									className="font-medium hover:underline text-primary"
								>
									サービス一覧
								</Link>
								<Link
									href="/services/web-development"
									className="font-medium hover:underline text-primary"
								>
									ウェブ制作
								</Link>
								<Link
									href="/services/app-development"
									className="font-medium hover:underline text-primary"
								>
									アプリ開発
								</Link>
								<Link
									href="/services/consulting"
									className="font-medium hover:underline text-primary"
								>
									コンサルティング
								</Link>
							</CardContent>
						</Card>
					</ColumnLayout.Right>
				</ColumnLayout>
			</Container>
		</>
	);
}
