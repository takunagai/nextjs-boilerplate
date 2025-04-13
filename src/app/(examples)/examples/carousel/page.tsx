import { EmblaCarousel } from "@/components/ui/carousel/embla-carousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "カルーセル - サンプル",
	description: "Embla Carouselを使ったカルーセルのサンプルページです",
};

// ダミー画像のデータ
const slides = [
	{
		src: "/dummy-images/street-photo-01.jpg",
		alt: "街の写真1",
	},
	{
		src: "/dummy-images/street-photo-02.jpg",
		alt: "街の写真2",
	},
	{
		src: "/dummy-images/street-photo-03.jpg",
		alt: "街の写真3",
	},
	{
		src: "/dummy-images/street-photo-04.jpg",
		alt: "街の写真4",
	},
];

export default function CarouselPage() {
	return (
		<div className="container mx-auto py-12 px-4">
			<h1 className="text-3xl font-bold mb-6">カルーセルサンプル</h1>

			<h2 className="text-xl font-semibold mb-2">
				Embla Carousel (embla-carousel-react) とそのプラグイン３つを採用
			</h2>
			<ul className="list-disc pl-5 mb-6 [&_a]:underline">
				<li>
					<a href="https://www.embla-carousel.com/">Embla Carousel</a>
				</li>
				<li>
					<a href="https://www.embla-carousel.com/get-started/react/">
						embla-carousel-react
					</a>
				</li>
				<li>
					<a href="https://www.embla-carousel.com/plugins/class-names/">
						embla-carousel-class-names
					</a>
				</li>
				<li>
					<a href="https://www.embla-carousel.com/plugins/autoplay/">
						embla-carousel-autoplay
					</a>
				</li>
				<li>
					<a href="https://www.embla-carousel.com/plugins/fade/">
						embla-carousel-fade
					</a>
				</li>
			</ul>

			<div className="grid gap-8">
				{/* 基本的なカルーセル */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-2">基本的なカルーセル</h2>
					<p className="text-gray-500 mb-4">
						自動再生、フェードエフェクト、ナビゲーションボタン、ドットインジケーターを備えたカルーセル
					</p>
					<EmblaCarousel
						slides={slides}
						options={{ loop: true }}
						autoplayOptions={{ delay: 5000, stopOnInteraction: false }}
					/>
				</div>

				{/* 基本的なカルーセル2（内部インジケーター） */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-2">基本的なカルーセル2</h2>
					<p className="text-gray-500 mb-4">
						ドットインジケーターが画像の内側に表示されるカルーセル
					</p>
					<EmblaCarousel
						slides={slides}
						options={{ loop: true }}
						dotsPosition="inside"
						autoplayOptions={{ delay: 4500, stopOnInteraction: false }}
					/>
				</div>

				{/* Class Namesプラグインを活用した例 */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-2">Class Namesプラグインを活用した例</h2>
					<p className="text-gray-500 mb-4">
						前後のスライドの端が見え、選択されていないスライドは暗く表示されるカルーセル
					</p>
					<EmblaCarousel
						slides={slides}
						options={{ loop: true, slidesToScroll: 1 }}
						variant="peek"
						dotsPosition="inside"
						useFade={false}
						autoplayOptions={{ delay: 3500, stopOnInteraction: true }}
					/>
				</div>

				{/* ナビゲーションなしカルーセル */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-2">
						ナビゲーションなしカルーセル
					</h2>
					<p className="text-gray-500 mb-4">
						ナビゲーションボタンを非表示にしたシンプルなカルーセル
					</p>
					<EmblaCarousel
						slides={slides}
						options={{ loop: true }}
						showNavigation={false}
						autoplayOptions={{ delay: 4000, stopOnInteraction: true }}
					/>
				</div>

				{/* ドットなしカルーセル */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-2">
						インジケーターなしカルーセル
					</h2>
					<p className="text-gray-500 mb-4">
						ドットインジケーターを非表示にした右から左へのカルーセル（フェードエフェクトなし）
					</p>
					<EmblaCarousel
						slides={slides}
						options={{ loop: true, direction: "rtl" }}
						showDots={false}
						useFade={false}
						autoplayOptions={{ delay: 3000, stopOnInteraction: false }}
					/>
				</div>
			</div>
		</div>
	);
}
