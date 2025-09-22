import type { ReactNode } from "react";
import { ServiceNavigation } from "@/components/services/shared/service-navigation";
import { ServiceFooter } from "@/components/services/shared/service-footer";

interface WebDevelopmentLayoutProps {
	children: ReactNode;
}

export default function WebDevelopmentLayout({
	children,
}: WebDevelopmentLayoutProps) {
	return (
		<>
			<ServiceNavigation />

			{/* 子ページのコンテンツ */}
			{children}

			<ServiceFooter />
		</>
	);
}
