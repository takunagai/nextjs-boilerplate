import type { Metadata } from "next";
import {
	ArticleJsonLd,
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
} from "@/components/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

import { ProfileHeader } from "./_components/profile-header";
import { SkillsSection } from "./_components/skills-section";
import { StrengthsSection } from "./_components/strengths-section";
import { TimelineSection } from "./_components/timeline-section";
import { ValuesSection } from "./_components/values-section";

// Route Segment Config for caching
export const revalidate = 7200; // 2時間キャッシュ（静的コンテンツ）

export const metadata: Metadata = generateMetadata({
	title: "プロフィール",
	description:
		"あなたの「できたらいいな」を一緒に実現する、AI 活用パートナー永井拓也のプロフィールをご紹介します。",
	keywords: [
		"プロフィール",
		"永井拓也",
		"AI活用",
		"ウェブ制作",
		"コンサルティング",
		"クリエイティブ",
	],
	canonical: "/about",
});

export const viewport = generateViewport();

export default function AboutPage() {
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "プロフィール", path: "/about", current: true },
	];
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<ArticleJsonLd
				title="プロフィール"
				description="あなたの「できたらいいな」を一緒に実現する、AI 活用パートナー永井拓也のプロフィールをご紹介します。"
				url={`${META.SITE_URL}/about`}
				images={[`${META.SITE_URL}/images/portrait.png`]}
				datePublished="2023-01-01T00:00:00Z"
				dateModified="2024-01-01T00:00:00Z"
				authorName="ながたく (Taku Nagai)"
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />

			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<Container width="md" className="space-y-16" paddingY="lg">
				<ProfileHeader />
				<StrengthsSection />
				<SkillsSection />
				<TimelineSection />
				<ValuesSection />
			</Container>
		</>
	);
}
