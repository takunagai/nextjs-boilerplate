import type { IconType } from "react-icons";

/** 共通: アイコン付き特典・保証 */
export interface PricingFeature {
	icon: IconType;
	title: string;
	description: string;
}

/** 共通: 追加サービス・オプション */
export interface AdditionalService {
	service: string;
	price: string;
	description: string;
}
