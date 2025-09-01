import Link from "next/link";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export interface ServiceFinalCTAProps {
	// Content props
	title: React.ReactNode;
	description?: React.ReactNode;
	contactButtonText?: string;
	secondaryButtonText?: string;
	disclaimer?: string;

	// Layout variant
	variant?: "simple" | "complex";

	// Styling props
	sectionClassName?: string;
	containerClassName?: string;
	cardClassName?: string;

	// Complex variant props (for creative service)
	icon?: React.ReactNode;
	features?: React.ReactNode;
	statistics?: React.ReactNode;
	additionalContent?: React.ReactNode;

	// Button styling
	contactButtonClassName?: string;
	secondaryButtonClassName?: string;
	showSecondaryButton?: boolean;
}

export function ServiceFinalCTA({
	title,
	description,
	contactButtonText = "無料相談を予約する",
	secondaryButtonText = "サービス詳細を見る",
	disclaimer,
	variant = "simple",
	sectionClassName,
	containerClassName,
	cardClassName,
	icon,
	features,
	statistics,
	additionalContent,
	contactButtonClassName,
	secondaryButtonClassName,
	showSecondaryButton = false,
}: ServiceFinalCTAProps) {
	if (variant === "complex") {
		return (
			<section
				className={`w-full py-16 md:py-24 relative overflow-hidden ${sectionClassName || ""}`}
			>
				<Container
					width="2xl"
					paddingY="xl"
					paddingX="lg"
					className={`relative z-10 ${containerClassName || ""}`}
				>
					<div className="text-center max-w-4xl mx-auto">
						{/* Icon */}
						{icon && <div className="flex justify-center mb-6">{icon}</div>}

						{/* Title */}
						<Heading
							as="h2"
							className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
						>
							{title}
						</Heading>

						{/* Description */}
						{description && (
							<div className="text-xl md:text-2xl mb-8 leading-relaxed">
								{description}
							</div>
						)}

						{/* Features */}
						{features && <div className="mb-8">{features}</div>}

						{/* Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								asChild
								size="lg"
								className={`text-lg px-8 py-4 ${contactButtonClassName || ""}`}
							>
								<Link href="/contact">
									{contactButtonText}
									<FaCalendarCheck className="w-6 h-6 ml-2" />
								</Link>
							</Button>
							{showSecondaryButton && (
								<Button
									asChild
									variant="outline"
									size="lg"
									className={`text-lg px-8 py-4 ${secondaryButtonClassName || ""}`}
								>
									<Link href="#service-menu">
										{secondaryButtonText}
										<FaArrowRight className="w-6 h-6 ml-2" />
									</Link>
								</Button>
							)}
						</div>

						{/* Additional content */}
						{additionalContent && (
							<div className="mt-8">{additionalContent}</div>
						)}

						{/* Statistics */}
						{statistics && <div className="mt-12">{statistics}</div>}
					</div>
				</Container>
			</section>
		);
	}

	// Simple variant (default)
	return (
		<section className={`w-full py-16 md:py-24 ${sectionClassName || ""}`}>
			<Container
				width="2xl"
				paddingY="lg"
				paddingX="lg"
				className={containerClassName}
			>
				<Card className={`max-w-4xl mx-auto ${cardClassName || ""}`}>
					<CardContent className="py-12 px-8 text-center">
						<Heading as="h2" className="text-2xl md:text-3xl mb-6">
							{title}
						</Heading>
						{description && (
							<div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
								{description}
							</div>
						)}
						<Button
							asChild
							size="lg"
							className={`text-lg px-8 py-4 ${contactButtonClassName || ""}`}
						>
							<Link href="/contact">
								{contactButtonText}
								<FaCalendarCheck className="w-5 h-5 ml-2" />
							</Link>
						</Button>
						{disclaimer && (
							<p className="text-sm text-muted-foreground mt-4">{disclaimer}</p>
						)}
					</CardContent>
				</Card>
			</Container>
		</section>
	);
}
