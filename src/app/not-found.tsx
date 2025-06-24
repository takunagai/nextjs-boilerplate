import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export default function NotFound() {
	return (
		<Container className="min-h-screen flex items-center justify-center">
			<div className="py-16 md:py-24 text-center w-full">
				<PageHeader
					title="404 Not Found"
					description="ページが見つかりません"
				/>
				<p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
					お探しのページは存在しないか、移動または削除された可能性があります。
				</p>
				<Link href="/">
					<Button variant="secondary">
						<FaArrowLeft />
						<span>トップページに戻る</span>
					</Button>
				</Link>
			</div>
		</Container>
	);
}
