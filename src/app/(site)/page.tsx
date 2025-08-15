import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProblemsSection } from "@/components/sections/problems-section";
import { ProfileSection } from "@/components/sections/profile-section";
import { ReasonsSection } from "@/components/sections/reasons-section";
import { ServicesSection } from "@/components/sections/services-section";
import {
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";

export const metadata: Metadata = generateMetadata({
	title: "AIで「できたらいいな」を「できた！」に",
	description:
		"最新のAI×15年の制作経験で、あなたの「できない」「面倒」「時間がない」を解決します。ウェブ制作、クリエイティブ、AI活用コンサルティングまで。",
	keywords: [
		"AI",
		"ウェブ制作",
		"アプリ開発",
		"クリエイティブ",
		"コンサルティング",
		"WordPress",
		"Next.js",
	],
	ogImage: "/images/og-image-home.jpg",
	canonical: "/",
});

export const viewport = generateViewport();

// ホームページコンポーネント
export default function Home() {
	return (
		<>
			<WebsiteJsonLd />
			<main className="flex min-h-screen flex-col items-center">
				<HeroSection />
				<ProblemsSection />
				<ServicesSection />
				<ReasonsSection />
				<PortfolioSection />
				<ProfileSection />
				<ContactCTASection />
			</main>
		</>
	);
}
