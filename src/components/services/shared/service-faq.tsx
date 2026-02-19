import type { ReactNode } from "react";
import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { FAQItem } from "@/lib/data/web-development-faq";
import { cn } from "@/lib/utils";

interface ServiceFAQProps {
	faqs: FAQItem[];
	title?: string;
	description?: string;
	footerText?: string;
	ctaText?: string;
	ctaHref?: string;
	children?: ReactNode;
	className?: string;
}

export function ServiceFAQ({
	faqs,
	title = "よくあるご質問",
	description,
	footerText = "その他のご質問がございましたら、お気軽にお問い合わせください",
	ctaText = "お問い合わせ",
	ctaHref = "/contact",
	children,
	className,
}: ServiceFAQProps) {
	return (
		<section className={cn("py-16 md:py-24", className)}>
			<Container>
				<SectionHeader title={title} description={description} />

				<div className="mx-auto max-w-4xl">
					<Accordion type="single" collapsible className="space-y-4">
						{faqs.map((faq, index) => (
							<AccordionItem
								key={faq.question}
								value={`item-${index}`}
								className="bg-card border rounded-lg px-6"
							>
								<AccordionTrigger className="text-left hover:no-underline py-6">
									<span className="font-semibold">{faq.question}</span>
								</AccordionTrigger>
								<AccordionContent className="pb-6">
									<p className="text-muted-foreground leading-relaxed">
										{faq.answer}
									</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				{children}

				<div className="mt-12 text-center">
					<p className="mb-4 text-muted-foreground">{footerText}</p>
					<Link href={ctaHref}>
						<Button size="lg">{ctaText}</Button>
					</Link>
				</div>
			</Container>
		</section>
	);
}
