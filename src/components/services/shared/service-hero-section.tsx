import Link from "next/link";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroContainer } from "@/components/ui/hero-container";

export interface ServiceHeroSectionProps {
	// Content props
	title: React.ReactNode;
	description: React.ReactNode;
	contactButtonText?: string;
	serviceMenuButtonText?: string;

	// Styling props
	backgroundGradient?: string;
	className?: string;
	decorationColors?: {
		primary: string;
		secondary: string;
	};

	// Button styling props
	contactButtonClassName?: string;
	serviceMenuButtonClassName?: string;
}

export function ServiceHeroSection({
	title,
	description,
	contactButtonText = "無料相談を予約する",
	serviceMenuButtonText = "サービス内容を見る",
	backgroundGradient,
	className,
	decorationColors,
	contactButtonClassName,
	serviceMenuButtonClassName,
}: ServiceHeroSectionProps) {
	const heroProps = {
		...(backgroundGradient && { backgroundGradient }),
		...(className && { className }),
		...(decorationColors && { decorationColors }),
	};

	return (
		<HeroContainer {...heroProps}>
			<Container width="2xl" paddingY="xl" paddingX="lg">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-foreground">
						{title}
					</h1>

					<div className="mb-8">{description}</div>

					<div className="flex flex-col sm:flex-row gap-4">
						<Button
							asChild
							size="lg"
							className={`text-base px-8 py-3 ${contactButtonClassName || ""}`}
						>
							<Link href="/contact">
								{contactButtonText}
								<FaCalendarCheck className="w-5 h-5 ml-2" />
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className={`text-base px-8 py-3 ${serviceMenuButtonClassName || ""}`}
						>
							<Link href="#service-menu">
								{serviceMenuButtonText}
								<FaArrowRight className="w-5 h-5 ml-2" />
							</Link>
						</Button>
					</div>
				</div>
			</Container>
		</HeroContainer>
	);
}
