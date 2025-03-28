import { Container } from "@/components/ui/container";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon | (({ className }: { className?: string }) => ReactNode);
};

interface FeaturesSectionProps {
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/50 w-full">
      <Container size="2xl" paddingY="xl" paddingX="lg">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">主な特徴</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            最新のWeb開発技術を組み合わせた、高速で柔軟なフレームワークを提供します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-background rounded-lg p-6 shadow-sm border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon({ className: "h-6 w-6 text-primary" })}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
