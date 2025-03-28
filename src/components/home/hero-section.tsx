import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { APP } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <Container size="2xl" paddingY="xl" paddingX="lg" position="relative" zIndex="high">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            モダンな<span className="text-primary">Web開発</span>の
            <br />
            新しいスタンダード
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            {/* 定数使用のサンプル */}
            {APP.DESCRIPTION}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link
                href="https://github.com/takunagai/nextjs-boilerplate"
                target="_blank"
                rel="noopener noreferrer"
              >
                ドキュメントを見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/contact">お問い合わせ</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
