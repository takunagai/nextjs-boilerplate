import { CTASection } from "@/components/sections/cta-section";

interface BackgroundImageCTAProps {
	/**
	 * 背景画像のURL（必須）
	 */
	backgroundImage: string;

	/**
	 * メインタイトル
	 */
	title: string;

	/**
	 * 説明文
	 */
	description: string;

	/**
	 * メインボタンのテキスト
	 * @default "お問い合わせ"
	 */
	primaryButtonText?: string;

	/**
	 * サブボタンのテキスト（オプション）
	 */
	secondaryButtonText?: string;

	/**
	 * メインボタンのリンク先
	 * @default "/contact"
	 */
	primaryButtonHref?: string;

	/**
	 * サブボタンのリンク先
	 */
	secondaryButtonHref?: string;

	/**
	 * 追加のクラス名
	 */
	className?: string;
}

/**
 * 背景画像付き統一CTAコンポーネント
 *
 * 各ページで統一された背景画像付きCTAセクションを表示します。
 * 背景画像とメッセージをProps でカスタマイズ可能です。
 *
 * @example
 * ```tsx
 * <BackgroundImageCTA
 *   backgroundImage="/images/cta-bg.jpg"
 *   title="今すぐ始めませんか？"
 *   description="お気軽にご相談ください。"
 *   primaryButtonText="無料相談"
 *   secondaryButtonText="詳細を見る"
 *   primaryButtonHref="/contact"
 *   secondaryButtonHref="/about"
 * />
 * ```
 */
export function BackgroundImageCTA({
	backgroundImage,
	title,
	description,
	primaryButtonText = "お問い合わせ",
	secondaryButtonText,
	primaryButtonHref = "/contact",
	secondaryButtonHref,
	className,
}: BackgroundImageCTAProps) {
	return (
		<CTASection
			layout="vertical"
			backgroundImage={backgroundImage}
			className={`bg-transparent text-white py-16 @lg:py-24 ${className || ""}`}
		>
			<CTASection.Container>
				<CTASection.Content>
					<CTASection.Title className="text-white">{title}</CTASection.Title>
					<CTASection.Description className="text-white/80">
						{description}
					</CTASection.Description>
				</CTASection.Content>
				<CTASection.Actions className="justify-center">
					<CTASection.PrimaryButton variant="default" href={primaryButtonHref}>
						{primaryButtonText}
					</CTASection.PrimaryButton>
					{secondaryButtonText && secondaryButtonHref && (
						<CTASection.SecondaryButton
							variant="outline"
							href={secondaryButtonHref}
						>
							{secondaryButtonText}
						</CTASection.SecondaryButton>
					)}
				</CTASection.Actions>
			</CTASection.Container>
		</CTASection>
	);
}
