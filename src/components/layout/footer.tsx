import { COPYRIGHT_HOLDER, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { FaTwitter, FaYoutube } from "react-icons/fa6";
import Link from "next/link";

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
	companyName = COPYRIGHT_HOLDER,
	description = "仮想通貨の確定申告。もっと簡単に。確定申告に必要な仮想通貨の損益を自動で計算。ポートフォリオ管理も、これひとつで",
	logoText = SITE_NAME,
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
			title: "クリプタクト",
			links: [
				{ label: "特長", href: "/features" },
				{ label: "料金", href: "/pricing" },
				{ label: "税理士向けプラン", href: "/for-accountants" },
				{ label: "利用規約", href: "/terms" },
			],
		},
		{
			title: "リソース",
			links: [
				{ label: "ニュース", href: "/news" },
				{ label: "ブログ", href: "/blog" },
				{ label: "ヘルプページ", href: "/help" },
			],
		},
		{
			title: "運営会社",
			links: [
				{ label: "会社概要", href: "/company" },
				{ label: "フィンタクト", href: "/fintact" },
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
					href="https://x.com"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:opacity-80"
				>
					<FaTwitter className="h-5 w-5" />
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
								<h3 className="font-medium text-sm mb-3">{group.title}</h3>
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
					<div className="text-sm">
						{showCurrentYear
							? `© ${companyName} ${currentYear}`
							: `© ${companyName}`}
					</div>
				</div>
			</div>
		</footer>
	);
}
