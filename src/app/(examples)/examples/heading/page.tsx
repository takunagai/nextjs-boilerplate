"use client";

import { FaPuzzlePiece } from "react-icons/fa6";
import { Heading } from "@/components/ui/heading";
import { PageHeader } from "@/components/ui/page-header";

export default function HeadingExamplesPage() {
	return (
		<div className="px-8 py-12 space-y-12">
			<PageHeader title="Heading コンポーネントのサンプル" />

			{/* Default */}
			<section className="space-y-2">
				<Heading as="h2">Default Heading</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2">Default Heading</Heading>`}</code>
				</pre>
			</section>

			{/* With Icon */}
			<section className="space-y-2">
				<Heading
					as="h2"
					icon={<FaPuzzlePiece />}
					iconColor="text-yellow-500"
					align="center"
				>
					Heading with Icon
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" icon={<FaPuzzlePiece />} iconColor="text-yellow-500" align="center">Heading with Icon</Heading>`}</code>
				</pre>
			</section>

			{/* Bottom Border */}
			<section className="space-y-2">
				<Heading
					as="h2"
					borderPosition="bottom"
					borderClass="border-b-2 border-blue-500"
				>
					Bottom Border
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" borderPosition="bottom" borderClass="border-b-2 border-blue-500">Bottom Border</Heading>`}</code>
				</pre>
			</section>

			{/* Left Border */}
			<section className="space-y-2">
				<Heading
					as="h2"
					borderPosition="left"
					borderClass="border-l-4 border-green-500"
				>
					Left Border
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" borderPosition="left" borderClass="border-l-4 border-green-500">Left Border</Heading>`}</code>
				</pre>
			</section>

			{/* Between Border */}
			<section className="space-y-2">
				<Heading
					as="h2"
					align="center"
					borderPosition="between"
					borderClass="w-1/2 mx-auto border-dashed border-purple-500"
				>
					Between Border
					<Heading.Lead>Lead text goes here.</Heading.Lead>
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" borderPosition="between" borderClass="w-1/2 mx-auto border-dashed border-purple-500">Between Border<Heading.Lead>Lead text goes here.</Heading.Lead></Heading>`}</code>
				</pre>
			</section>

			{/* Top Border */}
			<section className="space-y-2">
				<Heading
					as="h2"
					borderPosition="top"
					borderClass="border-t-2 border-red-500"
				>
					Top Border
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" borderPosition="top" borderClass="border-t-2 border-red-500">Top Border</Heading>`}</code>
				</pre>
			</section>

			{/* With Lead */}
			<section className="space-y-2">
				<Heading as="h2">
					Heading with Lead
					<Heading.Lead>リード文のサンプルです</Heading.Lead>
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2">
  Heading with Lead
  <Heading.Lead>リード文のサンプルです</Heading.Lead>
</Heading>`}</code>
				</pre>
			</section>

			{/* With Icon + Lead */}
			<section className="space-y-2">
				<Heading as="h2" icon={<FaPuzzlePiece />} iconColor="text-yellow-500">
					アイコン＋リード文
					<Heading.Lead>サービスの特徴を分かりやすく伝えます</Heading.Lead>
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" icon={<FaPuzzlePiece />} iconColor="text-yellow-500">
  アイコン＋リード文
  <Heading.Lead>サービスの特徴を分かりやすく伝えます</Heading.Lead>
</Heading>`}</code>
				</pre>
			</section>

			{/* Bottom Border + Lead */}
			<section className="space-y-2">
				<Heading
					as="h2"
					borderPosition="bottom"
					borderClass="border-b-2 border-blue-500"
				>
					下ボーダー＋リード
					<Heading.Lead>青い線が下に表示されます</Heading.Lead>
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" borderPosition="bottom" borderClass="border-b-2 border-blue-500">
  下ボーダー＋リード
  <Heading.Lead>青い線が下に表示されます</Heading.Lead>
</Heading>`}</code>
				</pre>
			</section>

			{/* Left Border + Lead + align left */}
			<section className="space-y-2">
				<Heading
					as="h2"
					borderPosition="left"
					borderClass="border-l-4 border-green-500"
					align="left"
				>
					左ボーダー＋リード＋左寄せ
					<Heading.Lead>左寄せ＋緑ボーダー</Heading.Lead>
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" borderPosition="left" borderClass="border-l-4 border-green-500" align="left">
  左ボーダー＋リード＋左寄せ
  <Heading.Lead>左寄せ＋緑ボーダー</Heading.Lead>
</Heading>`}</code>
				</pre>
			</section>

			{/* Between Border + Lead (center) */}
			<section className="space-y-2">
				<Heading
					as="h2"
					borderPosition="between"
					borderClass="w-1/2 mx-auto border-dashed border-purple-500"
					align="center"
				>
					タイトルとリード文の間ボーダー
					<Heading.Lead>中央寄せ＋点線パープル</Heading.Lead>
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" borderPosition="between" borderClass="w-1/2 mx-auto border-dashed border-purple-500" align="center">
  タイトルとリード文の間ボーダー
  <Heading.Lead>中央寄せ＋点線パープル</Heading.Lead>
</Heading>`}</code>
				</pre>
			</section>

			{/* Lead with bordered prop */}
			<section className="space-y-2">
				<Heading as="h2">
					リード文にボーダー
					<Heading.Lead
						bordered
						borderClass="border-b-2 border-dotted border-pink-400"
					>
						リード文自体にピンクの点線ボーダー
					</Heading.Lead>
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2">
  リード文にボーダー
  <Heading.Lead bordered borderClass="border-b-2 border-dotted border-pink-400">
    リード文自体にピンクの点線ボーダー
  </Heading.Lead>
</Heading>`}</code>
				</pre>
			</section>

			{/* Top Border + Lead + Icon + Center */}
			<section className="space-y-2">
				<Heading
					as="h2"
					icon={<FaPuzzlePiece />}
					iconColor="text-yellow-400"
					borderPosition="top"
					borderClass="border-t-2 border-red-500"
					align="center"
				>
					アイコン＋上ボーダー＋リード
					<Heading.Lead>赤い上線＋アイコン</Heading.Lead>
				</Heading>
				<pre className="bg-neutral-900 text-green-200 rounded font-mono text-sm overflow-x-auto p-4">
					<code>{`<Heading as="h2" icon={<FaPuzzlePiece />} iconColor="text-yellow-400" borderPosition="top" borderClass="border-t-2 border-red-500" align="center">
  アイコン＋上ボーダー＋リード
  <Heading.Lead>赤い上線＋アイコン</Heading.Lead>
</Heading>`}</code>
				</pre>
			</section>
		</div>
	);
}
