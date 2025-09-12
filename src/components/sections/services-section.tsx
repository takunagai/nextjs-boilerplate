import { Container } from "@/components/ui/container";
import { FeatureItems } from "@/components/ui/feature-items";
import { Heading } from "@/components/ui/heading";
import { BlobMasks } from "@/components/ui/blob-mask";
import { portfolioCategories } from "@/lib/data/portfolio-data";
import { services, getCommentsForService, type ServiceItem } from "@/lib/data/services-data";
import { ServiceCategories } from "./service-categories";
import { ServiceItemComponent } from "./service-item";

export function ServicesSection() {

	return (
		<section className="w-full py-16 md:py-24 bg-background relative overflow-hidden">
			{/* SVG定義を追加 */}
			<BlobMasks />

			<Container
				width="xl"
				paddingY="lg"
				paddingX="lg"
				className="relative z-10"
			>
				<div className="text-center mb-16">
					<Heading as="h2" align="center" className="mb-4">
						サービス紹介
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						複数サービスの組合せもOK。ここにないものでもご相談ください。
					</p>
				</div>

				{/* 左右交互レイアウト */}
				<FeatureItems
					items={services}
					variant="split"
					alternateLayout={true}
					spacing="none"
					renderItem={(item, index) => (
						<ServiceItemComponent
							key={item.id}
							item={item as ServiceItem}
							index={index}
							comments={getCommentsForService(item.id)}
						/>
					)}
				/>

				{/* サービスカテゴリー */}
				<ServiceCategories categories={portfolioCategories} />
			</Container>
		</section>
	);
}
