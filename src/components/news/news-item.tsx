import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
        "group flex flex-col md:flex-row md:items-center gap-4 p-4 transition-all hover:shadow-sm hover:bg-slate-50 dark:hover:bg-slate-900",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="text-slate-500 font-medium w-24">{formattedDate}</div>
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>
      </div>
      <div className="font-medium text-slate-900 dark:text-slate-100 md:ml-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </div>
    </Card>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
