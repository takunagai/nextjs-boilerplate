import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface ServiceFeaturesSectionProps {
  features: ServiceFeature[];
}

export function ServiceFeaturesSection({ features }: ServiceFeaturesSectionProps) {
  return (
    <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">サービスの特徴</h2>
          <p className="max-w-[700px] mx-auto text-gray-500 dark:text-gray-400">
            当社のサービスが選ばれる理由をご紹介します
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface FeatureCardProps {
  feature: ServiceFeature;
  isReversed?: boolean;
}

function FeatureCard({ feature, isReversed = false }: FeatureCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <div className="relative h-60 w-full">
        <Image
          src={feature.imageUrl}
          alt={`${feature.title}の画像`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>
      
      <div className={cn(
        "flex flex-col p-6 space-y-2",
        isReversed && "order-first md:order-last"
      )}>
        <h3 className="text-xl font-bold">{feature.title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
      </div>
    </div>
  );
}
