import { NewsItem, type NewsItemProps } from "./news-item";

interface NewsListProps {
	items: NewsItemProps[];
	className?: string;
}

export function NewsList({ items, className }: NewsListProps) {
	if (items.length === 0) {
		return (
			<div className="p-8 text-center text-slate-500">
				お知らせはありません。
			</div>
		);
	}

	return (
		<div className={className}>
			<div className="space-y-4">
				{items.map((item) => (
					<NewsItem
						key={item.id}
						id={item.id}
						date={item.date}
						category={item.category}
						title={item.title}
						link={item.link}
					/>
				))}
			</div>
		</div>
	);
}
