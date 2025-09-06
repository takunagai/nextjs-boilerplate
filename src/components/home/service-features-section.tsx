import { FaPuzzlePiece } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import {
	type ContentItem,
	ContentItems,
} from "@/components/ui/content-items/index";
import { Heading } from "@/components/ui/heading";
import { FeatureItems } from "../ui/feature-items";

interface ServiceFeaturesSectionProps {
	features: ContentItem[];
	featureItems: ContentItem[];
}

export function ServiceFeaturesSection({
	features,
	featureItems,
}: ServiceFeaturesSectionProps) {
	return (
		<section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
			<Container>
				<div className="space-y-4 mb-12">
					<Heading
						as="h2"
						icon={<FaPuzzlePiece />}
						iconColor="text-yellow-200/80"
						align="center"
						borderPosition="between"
						borderClass="w-1/3 mx-auto border-dashed border-yellow-200/40"
					>
						サービスの特徴
						<Heading.Lead>
							当社のサービスが選ばれる理由をご紹介します
						</Heading.Lead>
					</Heading>
					<Heading
						as="h2"
						borderPosition="left"
						borderClass="border-l-4 border-yellow-500"
					>
						サービスの特徴
						<Heading.Lead>
							当社のサービスが選ばれる理由をご紹介します
						</Heading.Lead>
					</Heading>
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

				<div className="pt-12">
					<FeatureItems
						items={featureItems}
						layout="vertical"
						variant="split"
						alternateLayout={true}
					/>
				</div>
			</Container>
		</section>
	);
}
