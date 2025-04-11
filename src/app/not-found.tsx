import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

export default function NotFound() {
	return (
		<Container width="md">
			<div className="py-16 md:py-24 text-center">
				<h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
					404
				</h1>
				<h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
					ページが見つかりません
				</h2>
				<p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
					お探しのページは存在しないか、移動または削除された可能性があります。
				</p>
				<Link href="/">
					<Button size="lg" className="gap-2">
						<FaArrowLeft size={14} />
						<span>トップページに戻る</span>
					</Button>
				</Link>
			</div>
		</Container>
	);
}
