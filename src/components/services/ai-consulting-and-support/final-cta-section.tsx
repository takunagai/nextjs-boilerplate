import { ServiceFinalCTA } from "../shared";

export function ConsultingFinalCTASection() {
	return (
		<ServiceFinalCTA
			variant="simple"
			sectionClassName="bg-gradient-to-br from-blue-600/10 via-blue-400/5 to-background"
			cardClassName="bg-background/80 backdrop-blur-sm border-blue-600/20"
			title={
				<>
					<span className="text-blue-600">AI の可能性</span>を、
					<br />
					一緒に探しませんか？
				</>
			}
			description={
				<>
					まずは30分の無料相談から。
					<br />
					あなたの現状をお聞きして、最適なプランをご提案いたします。
				</>
			}
			contactButtonText="30分無料相談を予約する"
			disclaimer="※ 相談は無料です。しつこい営業は一切いたしません。"
		/>
	);
}
