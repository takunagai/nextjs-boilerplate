"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
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
	const [openItems, setOpenItems] = useState<number[]>([]);

	const toggleItem = (index: number) => {
		setOpenItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
		);
	};

	return (
		<section className={cn("py-16 sm:py-24", className)}>
			<Container>
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						{title}
					</h2>
					{description && (
						<p className="mt-4 text-lg text-muted-foreground">{description}</p>
					)}
				</div>

				<div className="mx-auto max-w-4xl space-y-4">
					{faqs.map((faq, index) => {
						const isOpen = openItems.includes(index);
						return (
							<div
								key={faq.question}
								className="overflow-hidden rounded-lg border border-border bg-card"
							>
								<button
									type="button"
									onClick={() => toggleItem(index)}
									aria-expanded={isOpen}
									className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
								>
									<span className="font-medium pr-4">{faq.question}</span>
									<FaChevronDown
										className={cn(
											"h-5 w-5 shrink-0 text-muted-foreground transition-transform",
											isOpen && "rotate-180",
										)}
									/>
								</button>
								{isOpen && (
									<div className="border-t border-border px-6 pb-6 pt-4">
										<p className="text-muted-foreground leading-relaxed">
											{faq.answer}
										</p>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{children}

				<div className="mt-12 text-center">
					<p className="mb-4 text-muted-foreground">{footerText}</p>
					<a
						href={ctaHref}
						className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						{ctaText}
					</a>
				</div>
			</Container>
		</section>
	);
}
