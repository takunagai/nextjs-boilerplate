"use client";

import { FaEnvelope, FaLine } from "react-icons/fa6";
import { ContactEmailForm } from "@/components/contact/contact-mailform";
import { ContactPhoneAndLine } from "@/components/contact/contact-phone-and-line";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * お問い合わせフォームのメインコンポーネント
 * メールフォームとLINEの問い合わせ方法をタブで切り替えて表示
 */
export function ContactForm() {
	return (
		<div className="flex flex-col gap-8">
			<Tabs defaultValue="line" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="mail" className="flex items-center gap-2">
						<FaEnvelope className="h-4 w-4" />
						<span>メール</span>
					</TabsTrigger>
					<TabsTrigger value="line" className="flex items-center gap-2">
						<FaLine className="h-4 w-4" />
						<span>LINE</span>
					</TabsTrigger>
				</TabsList>

				{/* メールフォーム */}
				<TabsContent value="mail">
					<ContactEmailForm />
				</TabsContent>

				{/* LINE問い合わせ */}
				<TabsContent value="line">
					<ContactPhoneAndLine />
				</TabsContent>
			</Tabs>
		</div>
	);
}
