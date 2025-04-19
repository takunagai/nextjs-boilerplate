import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";

export interface NewsItemProps {
	id: string;
	date: Date;
	category: string;
	title: string;
	link?: string;
	className?: string;
}

export function NewsItem({
	id,
	date,
	category,
	title,
	link,
	className,
}: NewsItemProps) {
	const formattedDate = format(date, "yyyy.MM.dd");

	const content = (
		<li className="list-none p-2 hover:bg-primary-foreground rounded-md">
			<div className="flex flex-row items-center gap-1 md:w-auto md:min-w-52 md:flex-nowrap">
				<time dateTime={date.toISOString()} className="text-slate-500 min-w-24">
					{formattedDate}
				</time>
				<Badge variant="outline" className="text-xs whitespace-nowrap">
					{category}
				</Badge>
			</div>
			<p className="text-slate-900 dark:text-slate-100 md:flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
				{title}
			</p>
		</li>
	);

	if (link) {
		return (
			<Link href={link} className="block" aria-label={`${title}の詳細を見る`}>
				{content}
			</Link>
		);
	}

	return content;
}
