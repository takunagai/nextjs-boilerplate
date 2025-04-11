import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
    <Card
      className={cn(
        "group flex flex-col md:flex-row md:items-center gap-4 p-4 transition-all hover:shadow-sm hover:bg-slate-50 dark:hover:bg-slate-900/50",
        className
      )}
    >
      <div className="flex flex-row items-center gap-3 md:w-auto md:min-w-52 md:flex-nowrap">
        <time
          dateTime={date.toISOString()}
          className="text-slate-500 font-medium min-w-24"
        >
          {formattedDate}
        </time>
        <Badge variant="outline" className="text-xs whitespace-nowrap">
          {category}
        </Badge>
      </div>
      <h3 className="font-medium text-slate-900 dark:text-slate-100 md:flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
    </Card>
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
