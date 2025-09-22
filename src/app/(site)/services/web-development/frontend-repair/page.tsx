import {
	ServicePageWrapper,
	createWebDevelopmentServiceConfig,
	generateServiceMetadata,
	serviceViewport,
} from "@/components/services/shared/service-page-wrapper";
import { FrontendRepairHeroSection } from "@/components/services/frontend-repair/hero-section";
import { ServiceOverviewSection } from "@/components/services/frontend-repair/service-overview-section";
import { RecommendedForSection } from "@/components/services/frontend-repair/recommended-for-section";
import { PricingSection } from "@/components/services/frontend-repair/pricing-section";
import { ProcessSection } from "@/components/services/frontend-repair/process-section";
import { FinalCTASection } from "@/components/services/frontend-repair/final-cta-section";

// ページ設定
const pageConfig = createWebDevelopmentServiceConfig(
	"frontend-repair",
	"フロントエンドリペア",
	"AI で作ったサイト、そのままで大丈夫？React/Next.js コードの品質向上、デザインブラッシュアップ、デプロイ支援まで。プロが最終調整して安心してリリースできる状態に仕上げます。まずは無料診断から。",
	[
		"フロントエンドリペア",
		"React",
		"Next.js",
		"コード修正",
		"バグ修正",
		"デザインブラッシュアップ",
		"AI生成コード",
		"品質向上",
		"レスポンシブ対応",
		"デプロイ支援",
		"無料診断",
		"TypeScript対応",
	],
);

export const metadata = generateServiceMetadata(pageConfig);
export const viewport = serviceViewport;

export default function FrontendRepairPage() {
	return (
		<ServicePageWrapper config={pageConfig}>
			<FrontendRepairHeroSection />
			<ServiceOverviewSection />
			<RecommendedForSection />
			<PricingSection />
			<ProcessSection />
			<FinalCTASection />
		</ServicePageWrapper>
	);
}
