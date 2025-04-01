import { APP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

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
	title: string;
	links: FooterLink[];
}

// フッターのプロパティ型定義
export interface FooterProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof footerVariants> {
	companyName?: string;
	description?: string;
	logoText?: string;
	navGroups?: FooterNavGroup[];
	showCurrentYear?: boolean;
	logoOnBottom?: boolean;
	children?: React.ReactNode;
}

export function Footer({
	className,
	variant,
	size,
	companyName = APP.COPYRIGHT_HOLDER,
	description = "このボイラープレートは、Next.js で構築されたウェブアプリケーションの基盤を提供します。",
	logoText = APP.NAME,
	navGroups = [],
	showCurrentYear = true,
	logoOnBottom = false,
	children,
	...props
}: FooterProps) {
	// 現在の年を取得
	const currentYear = new Date().getFullYear();

	// デフォルトのナビゲーショングループ
	const defaultNavGroups: FooterNavGroup[] = [
		{
			title: "サービス",
			links: [
				{ label: "機能紹介", href: "/features" },
				{ label: "料金プラン", href: "/pricing" },
				{ label: "導入事例", href: "/case-studies" },
				{ label: "お問い合わせ", href: "/contact" },
			],
		},
		{
			title: "サポート",
			links: [
				{ label: "ドキュメント", href: "/docs" },
				{ label: "FAQ", href: "/faq" },
				{ label: "開発者向け", href: "/developers" },
			],
		},
		{
			title: "会社情報",
			links: [
				{ label: "About Us", href: "/about" },
				{ label: "採用情報", href: "/careers" },
				{ label: "プライバシーポリシー", href: "/privacy" },
			],
		},
	];

	// 提供されたナビゲーショングループがない場合はデフォルトのグループを使用
	const footerNavGroups = navGroups.length > 0 ? navGroups : defaultNavGroups;

	// ロゴと説明部分のコンポーネント
	const LogoSection = () => (
		<div className="flex flex-col">
			<div className="flex items-center mb-4">
				<Link href="/" className="flex items-center">
					<div className="text-xl font-bold">{logoText}</div>
				</Link>
			</div>
			<p className="text-sm mb-6 max-w-md">{description}</p>
			<div className="flex gap-4 mb-6">
				<Link
					href="https://x.com/nagataku_ai"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:opacity-80"
				>
					<FaXTwitter className="h-5 w-5" />
				</Link>
				<Link
					href="https://www.instagram.com/nagataku33/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:opacity-80"
				>
					<FaInstagram className="h-5 w-5" />
				</Link>
				<Link
					href="https://youtube.com"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:opacity-80"
				>
					<FaYoutube className="h-5 w-5" />
				</Link>
			</div>
		</div>
	);

	return (
		<footer
			className={cn(footerVariants({ variant, size }), className)}
			{...props}
		>
			<div className="container mx-auto px-4">
				<div
					className={`grid gap-8 ${logoOnBottom ? "lg:grid-cols-1" : "lg:grid-cols-4"}`}
				>
					{/* PC表示時、ロゴエリアが上にくる場合 */}
					{!logoOnBottom && (
						<div className="order-2 lg:order-1">
							<LogoSection />
						</div>
					)}

					{/* ナビゲーショングループのエリア */}
					<div
						className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 order-1 lg:order-2 ${logoOnBottom ? "" : "lg:col-span-3"}`}
					>
						{footerNavGroups.map((group) => (
							<div key={group.title}>
								<h3 className="font-bold text-xs mb-3 text-foreground/50">
									{group.title}
								</h3>
								<ul className="space-y-2">
									{group.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												target={link.external ? "_blank" : undefined}
												rel={link.external ? "noopener noreferrer" : undefined}
												className="text-sm hover:underline"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* PC表示時、ロゴエリアが下にくる場合 */}
					{logoOnBottom && (
						<div className="order-3">
							<LogoSection />
						</div>
					)}
				</div>

				{/* カスタムコンテンツ */}
				{children && <div className="mb-6">{children}</div>}

				{/* コピーライト表示 */}
				<div className="pt-6 border-t mt-6">
					<div className="text-sm text-center">
						{showCurrentYear
							? `© ${companyName} ${currentYear}`
							: `© ${companyName}`}
					</div>
				</div>
			</div>
		</footer>
	);
}
