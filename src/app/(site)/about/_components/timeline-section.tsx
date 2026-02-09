import {
	Timeline,
	TimelineContent,
	TimelineDate,
	TimelineIcon,
	TimelineItem,
	TimelineTitle,
} from "@/components/ui/timeline";
import { timelineItems } from "@/lib/data/about-data";

export function TimelineSection() {
	return (
		<section className="space-y-8">
			<div className="border-l-4 border-primary pl-6">
				<h2 className="text-3xl font-bold text-foreground mb-8">経歴</h2>
			</div>

			<Timeline className="ml-6">
				{timelineItems.map((item) => (
					<TimelineItem key={item.title} variant={item.variant}>
						<TimelineIcon variant={item.variant}>
							<item.icon className="h-4 w-4" />
						</TimelineIcon>
						<TimelineContent variant="card">
							<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
								<TimelineTitle>{item.title}</TimelineTitle>
								<TimelineDate>{item.date}</TimelineDate>
							</div>
							<div className="text-gray-700 dark:text-gray-300">
								<ul className="space-y-1">
									{item.items.map((text) => (
										<li key={text}>• {text}</li>
									))}
								</ul>
							</div>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</section>
	);
}
