import { ServiceFinalCTA } from "../shared";

export function FinalCTASection() {
	return (
		<ServiceFinalCTA
			variant="simple"
			title="AI で作ったサイト、プロの手で安心品質に"
			description={
				<>
					React/Next.js コードの品質向上からデザインブラッシュアップ、
					<br />
					デプロイ支援まで。まずは無料診断でお気軽にご相談ください。
				</>
			}
			contactButtonText="無料診断を依頼する"
			secondaryButtonText="料金プランを見る"
			showSecondaryButton={true}
		/>
	);
}