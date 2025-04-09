import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

interface CTASectionProps {
	title?: string;
	description?: string;
	primaryButtonText?: string;
	primaryButtonHref?: string;
	primaryButtonExternal?: boolean;
	secondaryButtonText?: string;
	secondaryButtonHref?: string;
}

export function CTASection({
	title = "今すぐ始めましょう",
	description = "このボイラープレートを使って、モダンなWebアプリケーションの開発をスタートしましょう。詳細なドキュメントとサンプルコードが用意されています。",
	primaryButtonText = "GitHubで見る",
	primaryButtonHref = "https://github.com/takunagai/nextjs-boilerplate",
	primaryButtonExternal = true,
	secondaryButtonText = "使い方を学ぶ",
	secondaryButtonHref = "/docs/getting-started",
}: CTASectionProps) {
	return (
		<section className="py-16 md:py-24 bg-primary text-primary-foreground w-full">
			<Container width="2xl" paddingY="xl" paddingX="lg">
				<div className="flex flex-col md:flex-row items-center justify-between gap-8">
					<div className="max-w-2xl">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
						<p className="text-primary-foreground/80 text-lg">{description}</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4">
						<Button asChild size="lg" variant="secondary" className="gap-2">
							{primaryButtonExternal ? (
								<a
									href={primaryButtonHref}
									target="_blank"
									rel="noopener noreferrer"
								>
									{primaryButtonText}
									<FaArrowUpRightFromSquare className="h-4 w-4" />
								</a>
							) : (
								<Link href={primaryButtonHref}>{primaryButtonText}</Link>
							)}
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
						>
							<Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
						</Button>
					</div>
				</div>
			</Container>
		</section>
	);
}
