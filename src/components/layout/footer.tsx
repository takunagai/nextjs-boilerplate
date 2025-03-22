import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";

import { COPYRIGHT_HOLDER } from "@/lib/constants";

// フッターのバリアントを定義
const footerVariants = cva("w-full border-t", {
	variants: {
		variant: {
			default: "bg-background",
			primary: "bg-primary/5",
			secondary: "bg-secondary/5",
		},
		size: {
			default: "py-8",
			sm: "py-4",
			lg: "py-12",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

// フッターのナビゲーションリンク型定義
export interface FooterLink {
	label: string;
	href: string;
	external?: boolean;
}

// フッターのナビゲーショングループ型定義
export interface FooterNavGroup {
	title?: string;
	links: FooterLink[];
}

// フッターのプロパティ型定義
export interface FooterProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof footerVariants> {
	companyName?: string;
	links?: FooterLink[];
	navGroups?: FooterNavGroup[];
	showCurrentYear?: boolean;
	homeLink?: boolean;
	children?: React.ReactNode;
}

export function Footer({
	className,
	variant,
	size,
	companyName = COPYRIGHT_HOLDER,
	links = [],
	navGroups = [],
	showCurrentYear = true,
	homeLink = true,
	children,
	...props
}: FooterProps) {
	// 現在の年を取得
	const currentYear = new Date().getFullYear();

	// デフォルトのリンク
	const defaultLinks: FooterLink[] = [
		...(homeLink ? [{ label: "ホーム", href: "/" }] : []),
		{ label: "プライバシーポリシー", href: "/privacy" },
		{ label: "お問い合わせ", href: "/contact" },
	];

	// 提供されたリンクがない場合はデフォルトのリンクを使用
	const footerLinks = links.length > 0 ? links : defaultLinks;

	return (
		<footer
			className={cn(footerVariants({ variant, size }), className)}
			{...props}
		>
			<div className="container mx-auto px-4">
				{/* ナビゲーショングループがある場合 */}
				{navGroups.length > 0 && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
						{navGroups.map((group) => (
							<div key={group.title}>
								{group.title && (
									<h3 className="font-medium text-sm mb-3">{group.title}</h3>
								)}
								<ul className="space-y-2">
									{group.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												target={link.external ? "_blank" : undefined}
												rel={link.external ? "noopener noreferrer" : undefined}
												className="text-sm text-muted-foreground hover:text-primary hover:underline"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				)}

				{/* カスタムコンテンツ */}
				{children && <div className="mb-6">{children}</div>}

				<div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
					{/* 著作権表示 */}
					<div className="text-sm text-muted-foreground order-2 md:order-1">
						{showCurrentYear
							? `© ${currentYear} ${companyName} All Rights Reserved.`
							: `© ${companyName} All Rights Reserved.`}
					</div>

					{/* ナビゲーションリンク */}
					{footerLinks.length > 0 && (
						<nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center order-1 md:order-2">
							{footerLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									target={link.external ? "_blank" : undefined}
									rel={link.external ? "noopener noreferrer" : undefined}
									className="text-sm text-primary hover:underline"
								>
									{link.label}
								</Link>
							))}
						</nav>
					)}
				</div>
			</div>
		</footer>
	);
}
