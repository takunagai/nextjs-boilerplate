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

export const metadata: Metadata = generateMetadata({
	title: "プライバシーポリシー",
	description:
		"当サイトにおける個人情報の取り扱いについて定めたプライバシーポリシーです。",
	keywords: ["プライバシーポリシー", "個人情報保護方針", "個人情報の取り扱い"],
	canonical: "/privacy",
});

export const viewport = generateViewport();

export default function PrivacyPolicyPage() {
	// 現在の年を取得
	const currentYear = new Date().getFullYear();

	// パンくずリストの基本データを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "プライバシーポリシー", path: "/privacy", current: true },
	];

	// UI表示用とJSON-LD用のデータを生成
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<WebsiteJsonLd
				name={`プライバシーポリシー | ${META.DEFAULT_TITLE}`}
				description="当サイトにおける個人情報の取り扱いについて定めたプライバシーポリシーです。"
				url={`${META.SITE_URL}/privacy`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>
			<Container className="mt-8" paddingY="lg" paddingX="2xl">
				<div className="flex flex-col gap-8">
					{/* ヘッダー */}
					<div className="text-center">
						<h1 className="text-3xl font-bold mb-2">プライバシーポリシー</h1>
						<p className="text-muted-foreground">
							最終更新日: {currentYear}年3月22日
						</p>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>1. はじめに</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								株式会社〇〇（以下「当社」）は、お客様の個人情報保護の重要性を認識し、適切な管理と保護に努めています。
								本プライバシーポリシーは、当社のウェブサイト（以下「本サイト」）における個人情報の取り扱いについて定めるものです。
							</p>
							<p>
								本サイトをご利用いただくことで、お客様は本プライバシーポリシーに同意したものとみなされます。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>2. 収集する情報</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>当社は、以下の情報を収集することがあります：</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									<strong>お問い合わせ情報</strong>
									：お名前、メールアドレス、電話番号など、お問い合わせフォームから提供される情報
								</li>
								<li>
									<strong>アカウント情報</strong>
									：ユーザー名、メールアドレス、パスワード（暗号化されます）など、アカウント作成時に提供される情報
								</li>
								<li>
									<strong>利用情報</strong>
									：IPアドレス、ブラウザの種類、アクセス日時、閲覧したページなど、本サイトの利用に関する情報
								</li>
								<li>
									<strong>Cookie情報</strong>
									：本サイトの利用状況を分析するために使用されるCookieから取得される情報
								</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>3. 情報の利用目的</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>当社は、収集した情報を以下の目的で利用します：</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>お客様からのお問い合わせへの対応</li>
								<li>サービスの提供および改善</li>
								<li>ユーザーアカウントの管理</li>
								<li>本サイトの利用状況の分析</li>
								<li>セキュリティの確保</li>
								<li>法令に基づく対応</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>4. 情報の共有</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません：
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>お客様の同意がある場合</li>
								<li>
									法令に基づく場合（裁判所の命令、法的手続き、政府機関の要請など）
								</li>
								<li>
									当社のサービス提供に必要な範囲内で業務委託先に提供する場合（その場合、委託先に対して適切な監督を行います）
								</li>
								<li>
									当社の権利、財産、安全を保護するために必要と判断される場合
								</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>5. Cookieの使用</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								本サイトでは、サービス向上のためにCookieを使用しています。Cookieとは、ウェブサイトがお客様のコンピュータに保存する小さなテキストファイルです。
							</p>
							<p>
								お客様はブラウザの設定によりCookieの受け入れを拒否することができますが、その場合、本サイトの一部の機能が正常に動作しない可能性があります。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>6. アクセス解析ツール</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								本サイトでは、Googleが提供するアクセス解析ツール「Google
								Analytics」を使用しています。Google
								Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
							</p>
							<p>
								Google
								Analyticsの利用規約およびプライバシーポリシーに関する詳細は、Google
								Analyticsのサイトをご覧ください。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>7. 情報の保護</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								当社は、お客様の個人情報を不正アクセス、紛失、改ざん、漏洩から保護するために、適切なセキュリティ対策を講じています。
								ただし、インターネット上での通信は完全に安全ではないため、当社はお客様の情報の安全性を100%保証するものではありません。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>8. 未成年者の個人情報</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								当社は、16歳未満の方から故意に個人情報を収集することはありません。16歳未満の方が個人情報を提供された場合、保護者の方はお問い合わせフォームよりご連絡ください。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>9. お客様の権利</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								お客様は、ご自身の個人情報について以下の権利を有しています：
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>個人情報へのアクセス</li>
								<li>個人情報の訂正</li>
								<li>個人情報の削除</li>
								<li>個人情報の処理の制限</li>
								<li>データポータビリティ</li>
								<li>処理に対する異議申し立て</li>
							</ul>
							<p>
								これらの権利を行使するには、お問い合わせフォームよりご連絡ください。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>10. プライバシーポリシーの変更</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、本サイトに掲載した時点で効力を生じるものとします。
								重要な変更がある場合は、本サイト上で通知します。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>11. お問い合わせ</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								本プライバシーポリシーに関するご質問やご意見は、以下の連絡先までお問い合わせください：
							</p>
							<div className="mt-4">
								<p>株式会社〇〇</p>
								<p>住所：〒000-0000 東京都〇〇区〇〇町1-2-3</p>
								<p>
									メール：
									<a
										href="mailto:privacy@example.com"
										className="text-primary hover:underline"
									>
										privacy@example.com
									</a>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</Container>
		</>
	);
}
