import { Container } from "@/components/ui/container";
import { ContentItems, type ContentItem } from "@/components/ui/content-items/index";

interface ServiceFeaturesSectionProps {
	features: ContentItem[];
}

export function ServiceFeaturesSection({
	features,
}: ServiceFeaturesSectionProps) {
	return (
		<section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
			<Container>
				<div className="space-y-4 text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						サービスの特徴
					</h2>
					<p className="max-w-[700px] mx-auto text-gray-500 dark:text-gray-400">
						当社のサービスが選ばれる理由をご紹介します
					</p>
				</div>

				<ContentItems 
					items={features}
					layout="grid"
					columns={3}
					gap="medium"
					variant="card"
					aspectRatio="landscape"
					imagePosition="top"
				/>
			</Container>
		</section>
	);
}
