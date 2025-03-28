import { Container } from "@/components/ui/container";
import Image from "next/image";

type Technology = {
  id: string;
  name: string;
  logo: string;
};

interface TechnologiesSectionProps {
  technologies: Technology[];
}

export function TechnologiesSection({ technologies }: TechnologiesSectionProps) {
  return (
    <section className="py-16 md:py-24 w-full">
      <Container size="2xl" paddingY="xl" paddingX="lg">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">使用技術</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            最新のWeb開発ツールとライブラリを組み合わせて、最高のユーザー体験を実現します。
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech) => (
            <div key={tech.id} className="flex flex-col items-center">
              <div className="w-16 h-16 relative mb-4">
                <Image
                  src={tech.logo}
                  alt={`${tech.name} ロゴ`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium text-center">{tech.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
