import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { UserAuthMenu } from "@/components/auth/user-auth-menu";
import { WhalesAnimation } from "@/components/background/whales-animation";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { AnnouncementBarProvider } from "@/components/layout/announcement-bar-context";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MainContent } from "@/components/layout/main-content";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { auth } from "@/lib/auth";
import { APP, META } from "@/lib/constants";
import { HEADER_NAVIGATION } from "@/lib/constants/header-navigation";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: APP.NAME,
		template: META.TITLE_TEMPLATE,
	},
	description: META.DEFAULT_DESCRIPTION,
	keywords: [
		"AI活用",
		"ウェブ制作",
		"アプリ開発",
		"コンサルティング",
		"クリエイティブ",
		"永井拓也",
		"ナガイ商店",
	],
	authors: [{ name: APP.NAME }],
	creator: APP.NAME,
	publisher: APP.NAME,
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: META.SITE_URL,
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: META.SITE_URL,
		siteName: APP.NAME,
		title: APP.NAME,
		description: META.DEFAULT_DESCRIPTION,
		images: [
			{
				url: `${META.SITE_URL}${META.OG_IMAGE}`,
				width: 1200,
				height: 630,
				alt: APP.NAME,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: META.TWITTER_HANDLE,
		creator: META.TWITTER_HANDLE,
		title: APP.NAME,
		description: META.DEFAULT_DESCRIPTION,
		images: [`${META.SITE_URL}${META.OG_IMAGE}`],
	},
	icons: {
		icon: META.FAVICON,
		apple: META.APPLE_TOUCH_ICON,
	},
	manifest: META.MANIFEST,
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	// WCAG 2.1 AA準拠: ユーザーがズームできるようにする
	// maximumScale: 1, を削除
	// userScalable: false, を削除
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#09090b" },
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// セッション情報を取得
	const session = await auth();

	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<WebsiteJsonLd />
				<OrganizationJsonLd />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<SessionProvider session={session}>
						<AnnouncementBarProvider>
							<WhalesAnimation />
							<div className="flex flex-col min-h-screen">
								<AnnouncementBar />
								<Header
									background="transparent"
									logoText={APP.NAME}
									items={HEADER_NAVIGATION}
									rightContent={<UserAuthMenu />}
								/>
								<MainContent>{children}</MainContent>
								<Footer />
								<ScrollToTop />
							</div>
						</AnnouncementBarProvider>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
