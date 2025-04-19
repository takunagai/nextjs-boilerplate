import { NewsItem, type NewsItemProps } from "./news-item";

interface NewsListProps {
	items: NewsItemProps[];
	className?: string;
}

export function NewsList({ items, className }: NewsListProps) {
	if (items.length === 0) {
		return <p className="p-8 text-center">お知らせはありません。</p>;
	}

	return (
		<div className={className}>
			<ul className="space-y-1">
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
			</ul>
		</div>
	);
}
