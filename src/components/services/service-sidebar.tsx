import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

interface ServiceMenuLink {
	href: string;
	label: string;
}

const serviceLinks: ServiceMenuLink[] = [
	{ href: "/services", label: "サービス一覧" },
	{ href: "/services/web-development", label: "ウェブ制作" },
	{ href: "/services/app-development", label: "アプリ開発" },
	{ href: "/services/consulting", label: "コンサルティング" },
];

interface ServiceSidebarProps {
	currentPath: string;
}

export function ServiceSidebar({ currentPath }: ServiceSidebarProps) {
	return (
		<div className="">
			<h2 className="font-bold text-muted-foreground">サービス</h2>
			<nav aria-label="サービスナビゲーション">
				<ul className="mt-4 space-y-3">
					{serviceLinks.map((link) => {
						const isActive = currentPath === link.href;
						return (
							<li key={link.href} className="flex items-center">
								<MdChevronRight 
									className={`mr-1 text-sm ${isActive ? "text-primary" : "text-muted-foreground"}`} 
									aria-hidden="true"
								/>
								<Link
									href={link.href}
									className={`hover:underline ${isActive ? "text-primary font-bold" : "text-primary"}`}
									aria-current={isActive ? "page" : undefined}
								>
									{link.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}
