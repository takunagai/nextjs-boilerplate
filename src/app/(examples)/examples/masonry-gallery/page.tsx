import MasonryGallery from "@/components/masonry-gallery/MasonryGallery";
import ClientMasonryGallery from "@/components/masonry-gallery/MasonryGallery.client";
import { dummyPhotos, fallbackPhotos } from "@/lib/data/gallery-photos";

/**
 * MasonryGalleryのサンプルページ
 * 異なる設定でコンポーネントを複数回表示
 */
export default function MasonryGalleryPage() {
	// 写真セットを分割
	const photoSet1 = dummyPhotos.slice(0, 8);
	const photoSet2 = dummyPhotos.slice(8);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-8 text-3xl font-bold">Masonry Gallery Examples</h1>

			<section className="mb-16">
				<h2 className="mb-4 text-2xl font-semibold">
					1. Default, Medium, Large Container Breakpoints
				</h2>
				<p className="mb-6 text-neutral-600 dark:text-neutral-400">
					コンテナクエリを使用。コンテナのサイズに応じてカラム数が変化します。
					<br />- Default: 1 column
					<br />- Medium containers (@md: 28rem+): 2 columns
					<br />- Large containers (@lg: 32rem+): 3 columns
				</p>
				<div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
					<ClientMasonryGallery
						photos={photoSet1}
						columns={{
							default: 1, // Fallback or smallest container size
							md: 2, // @container (min-width: 28rem) or ~448px
							lg: 3, // @container (min-width: 32rem) or ~512px
						}}
						gap={4}
						vGap={6}
					/>
				</div>
				<div className="mt-2 text-sm text-neutral-500">
					<code>
						columns=&#123;&#123; default: 1, md: 2, lg: 3 &#125;&#125;
					</code>{" "}
					(Using ClientMasonryGallery)
				</div>
			</section>

			<section className="mb-16">
				<h2 className="mb-4 text-2xl font-semibold">
					2. Multiple Container Breakpoints & Wider Gaps
				</h2>
				<p className="mb-6 text-neutral-600 dark:text-neutral-400">
					より多くのコンテナブレークポイントを活用した設定。カラム間のギャップも広げています。
					<br />- Default: 2 columns
					<br />- Medium containers (@md: 28rem+): 3 columns
					<br />- Extra Large containers (@xl: 36rem+): 4 columns
					<br />- 3XL containers (@3xl: 48rem+): 5 columns
				</p>
				<div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
					<MasonryGallery
						photos={photoSet2}
						columns={{
							default: 2,
							md: 3, // @container (min-width: 28rem) or ~448px
							xl: 4, // @container (min-width: 36rem) or ~576px
							"3xl": 5, // @container (min-width: 48rem) or ~768px
						}}
						gap={6}
						vGap={6} // Corresponds to 1.5rem or 24px (6 * 4px)
						className="bg-neutral-50 p-4 dark:bg-neutral-900"
					/>
				</div>
				<div className="mt-2 text-sm text-neutral-500">
					<code>
						columns=&#123;&#123; default: 2, md: 3, xl: 4, '3xl': 5
						&#125;&#125;, vGap=&#123;6&#125;
					</code>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="mb-4 text-2xl font-semibold">
					3. Simple Numeric Column Counts
				</h2>
				<p className="mb-6 text-neutral-600 dark:text-neutral-400">
					コンテナサイズに応じて数値でカラム数を指定する基本的な例。
					以前のカスタムクラス指定（例:
					'columns-[12rem]'）は、コンポーネントの仕様変更により数値ベースになりました。
					<br />- Default: 1 column
					<br />- Small containers (@sm: 24rem+): 2 columns
					<br />- Large containers (@lg: 32rem+): 3 columns
				</p>
				<div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
					<MasonryGallery
						photos={fallbackPhotos.slice(0, 7)}
						columns={{
							default: 1,
							sm: 2, // @container (min-width: 24rem) or ~384px
							lg: 3, // @container (min-width: 32rem) or ~512px
						}}
						gap={4}
						vGap={4}
					/>
				</div>
				<div className="mt-2 text-sm text-neutral-500">
					<code>
						columns=&#123;&#123; default: 1, sm: 2, lg: 3 &#125;&#125;
					</code>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="mb-4 text-2xl font-semibold">
					4. Width-Limited Container Example
				</h2>
				<p className="mb-6 text-neutral-600 dark:text-neutral-400">
					コンテナの幅を制限した場合（例:
					max-w-[768px]）でも、コンテナクエリによって適切なカラム数が適用されます。
					<br />- Default: 1 column
					<br />- Medium containers (@md: 28rem+): 2 columns
					<br />- Large containers (@lg: 32rem+): 3 columns
				</p>
				<div className="mx-auto max-w-[768px] rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
					<MasonryGallery
						photos={photoSet1.slice(0, 6)}
						columns={{
							default: 1,
							md: 2, // @container (min-width: 28rem) or ~448px
							lg: 3, // @container (min-width: 32rem) or ~512px
						}}
						gap={3}
						vGap={3}
					/>
				</div>
				<div className="mt-2 text-sm text-neutral-500">
					<code>max-w-[768px]</code> container with{" "}
					<code>
						columns=&#123;&#123; default: 1, md: 2, lg: 3 &#125;&#125;
					</code>
				</div>
			</section>
		</div>
	);
}
