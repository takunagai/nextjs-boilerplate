import { APP, FOOTER_NAVIGATION, type FooterNavGroup } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import {
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaXTwitter,
	FaYoutube,
} from "react-icons/fa6";

import { Container } from "@/components/ui/container";

// ソーシャルメディアプラットフォームの定義
type SocialPlatform = "GITHUB" | "X" | "INSTAGRAM" | "FACEBOOK" | "YOUTUBE";

// ソーシャルリンク定義
const SOCIAL_LINKS = {
	GITHUB: "https://github.com/example/nextjs-boilerplate",
	X: "https://x.com/nagataku_ai",
	INSTAGRAM: "https://www.instagram.com/nagataku33/",
	FACEBOOK: "https://www.facebook.com/takuya.nagai.12",
	YOUTUBE: "https://youtube.com",
} as const;

// ソーシャルアイコン定義
const SOCIAL_ICONS = {
	GITHUB: FaGithub,
	X: FaXTwitter,
	INSTAGRAM: FaInstagram,
	FACEBOOK: FaFacebook,
	YOUTUBE: FaYoutube,
} as const;

// 表示するソーシャルメディアリスト
const DISPLAYED_SOCIAL_PLATFORMS: SocialPlatform[] = [
	"GITHUB",
	"X",
	"INSTAGRAM",
	"FACEBOOK",
	"YOUTUBE",
];

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
	navGroups = FOOTER_NAVIGATION,
	showCurrentYear = true,
	logoOnBottom = false,
	children,
	...props
}: FooterProps) {
	// 現在の年を取得
	const currentYear = new Date().getFullYear();

	// ナビゲーショングループを最大4つに調整（足りない場合は空のグループで埋める）
	const adjustedNavGroups = [...navGroups];
	const emptyGroupsNeeded = Math.max(0, 4 - adjustedNavGroups.length);

	// 空要素を先頭に追加（メニューが右側に寄るように）
	if (emptyGroupsNeeded > 0) {
		const emptyGroups = Array(emptyGroupsNeeded).fill({ title: "", links: [] });
		adjustedNavGroups.unshift(...emptyGroups);
	}

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
				{DISPLAYED_SOCIAL_PLATFORMS.map((platform) => {
					const Icon = SOCIAL_ICONS[platform];
					const href = SOCIAL_LINKS[platform];
					return (
						<Link
							key={platform}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-foreground text-foreground/60"
							aria-label={`${platform.toLowerCase()} へのリンク`}
						>
							<Icon className="h-5 w-5" />
						</Link>
					);
				})}
			</div>
		</div>
	);

	return (
		<footer
			className={cn(footerVariants({ variant, size }), className)}
			{...props}
		>
			<Container paddingX="xl" paddingY="md">
				<div
					className={`grid gap-8 ${
						logoOnBottom ? "md:grid-cols-1" : "md:grid-cols-[1fr_3fr]"
					}`}
				>
					{/* ロゴエリア（PC表示時に上部） */}
					{!logoOnBottom && (
						<div className="order-2 md:order-1">
							<LogoSection />
						</div>
					)}

					{/* ナビゲーショングループのエリア */}
					<div className="grid order-1 lg:order-2 gap-8 md:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-[1fr_3fr_3fr_3fr] lg:grid-cols-4">
						{adjustedNavGroups.map((group, index) => {
							// 空要素かどうかを判定
							const isEmpty =
								!group.title && (!group.links || group.links.length === 0);
							// 空要素の場合は非表示にする（ただし、グリッドには残す）
							return (
								<div
									key={group.title || `empty-group-${index}`}
									className={cn(
										"px-0 sm:px-2 md:px-3",
										isEmpty ? "hidden md:block md:invisible" : "",
									)}
								>
									{group.title && (
										<h3 className="font-bold text-xs mb-3 text-foreground/50">
											{group.title}
										</h3>
									)}
									{group.links && group.links.length > 0 && (
										<ul className="space-y-2">
											{group.links.map((link) => (
												<li key={link.href}>
													<Link
														href={link.href}
														target={link.external ? "_blank" : undefined}
														rel={
															link.external ? "noopener noreferrer" : undefined
														}
														className="text-sm hover:underline"
													>
														{link.label}
													</Link>
												</li>
											))}
										</ul>
									)}
								</div>
							);
						})}
					</div>

					{/* ロゴエリア（PC表示時に下部） */}
					{logoOnBottom && (
						<div className="order-3">
							<LogoSection />
						</div>
					)}
				</div>

				{/* カスタムコンテンツ */}
				{children && <div className="mt-8 mb-6">{children}</div>}

				{/* コピーライト表示 */}
				<div className="pt-6 border-t mt-6">
					<div className="text-sm text-foreground/60 text-center">
						{showCurrentYear
							? `© ${companyName} ${currentYear}`
							: `© ${companyName}`}
					</div>
				</div>
			</Container>
		</footer>
	);
}
