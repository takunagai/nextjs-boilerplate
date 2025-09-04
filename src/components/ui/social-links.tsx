import Link from "next/link";
import {
	FaFacebook,
	FaInstagram,
	FaGithub,
	FaXTwitter,
	FaNewspaper,
	FaAddressCard,
} from "react-icons/fa6";
import { SiLine, SiZenn, SiQiita } from "react-icons/si";

// SNS・サービスリンクのデータ型
export interface SocialLinkItem {
	name: string;
	url: string;
	icon: React.ReactNode;
	bgColor: string;
	textColor: string;
}

// SNS・サービスリンクのデータ
export const socialLinks: SocialLinkItem[] = [
	{
		name: "Facebook",
		url: "https://www.facebook.com/nagaishouten",
		icon: <FaFacebook className="w-5 h-5" />,
		bgColor: "hover:bg-blue-600",
		textColor: "hover:text-white",
	},
	{
		name: "LINE",
		url: "https://line.me/R/ti/p/gwTCBKP8jY",
		icon: <SiLine className="w-5 h-5" />,
		bgColor: "hover:bg-green-500",
		textColor: "hover:text-white",
	},
	{
		name: "X",
		url: "https://x.com/nagataku_ai",
		icon: <FaXTwitter className="w-5 h-5" />,
		bgColor: "hover:bg-gray-900 dark:hover:bg-gray-100",
		textColor: "hover:text-white dark:hover:text-gray-900",
	},
	{
		name: "Instagram",
		url: "https://instagram.com/nagataku33",
		icon: <FaInstagram className="w-5 h-5" />,
		bgColor: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
		textColor: "hover:text-white",
	},
	{
		name: "note",
		url: "https://note.com/naga_taku",
		icon: <FaNewspaper className="w-5 h-5" />,
		bgColor: "hover:bg-green-600",
		textColor: "hover:text-white",
	},
	{
		name: "GitHub",
		url: "https://github.com/takunagai",
		icon: <FaGithub className="w-5 h-5" />,
		bgColor: "hover:bg-gray-800 dark:hover:bg-gray-200",
		textColor: "hover:text-white dark:hover:text-gray-900",
	},
	{
		name: "Zenn",
		url: "https://zenn.dev/takna",
		icon: <SiZenn className="w-5 h-5" />,
		bgColor: "hover:bg-blue-500",
		textColor: "hover:text-white",
	},
	{
		name: "Qiita",
		url: "https://qiita.com/oreo3",
		icon: <SiQiita className="w-5 h-5" />,
		bgColor: "hover:bg-green-600",
		textColor: "hover:text-white",
	},
	{
		name: "デジタル名刺",
		url: "https://my.prairie.cards/u/nagataku",
		icon: <FaAddressCard className="w-5 h-5" />,
		bgColor: "hover:bg-blue-500",
		textColor: "hover:text-white",
	},
];

interface SocialLinksProps {
	className?: string;
}

export function SocialLinks({ className = "" }: SocialLinksProps) {
	return (
		<div className={`space-y-4 ${className}`}>
			<h4 className="text-sm font-medium text-muted-foreground">
				お気軽にフォローしてください。
			</h4>
			
			{/* グリッドレイアウト - バランス調整済み */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{socialLinks.map((link) => (
					<Link
						key={link.name}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className={`
							group flex flex-col items-center justify-center
							p-3 sm:p-4 rounded-lg border border-border
							transition-all duration-300 ease-in-out
							hover:shadow-md hover:scale-105
							focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
							aspect-square min-h-[80px] sm:min-h-[90px]
							${link.bgColor} ${link.textColor}
						`}
						aria-label={`${link.name}でフォロー`}
					>
						<div className="mb-2 transition-transform group-hover:scale-110">
							{link.icon}
						</div>
						<span className="text-xs font-medium text-center leading-tight">
							{link.name}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}