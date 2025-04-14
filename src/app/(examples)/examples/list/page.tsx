import { NumberedList, SimpleList } from "@/components/ui/list";
// サンプルページ: SimpleList, NumberedList のバリエーション例
import {
	FaCheck,
	FaCircleChevronRight,
	FaRegStar,
	FaTriangleExclamation,
} from "react-icons/fa6";

export default function ListExamplesPage() {
	return (
		<main className="max-w-2xl mx-auto py-10 px-4">
			<h1 className="text-2xl font-bold mb-6">リストコンポーネント サンプル</h1>

			{/* SimpleList: テキストマーカー */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					A-1. シンプルリスト（テキストマーカー）
				</h2>
				<SimpleList
					items={[
						{ text: "テキストマーカーのアイテム1" },
						{ text: "テキストマーカーのアイテム2", url: "/sample1" },
						{ text: "テキストマーカーのアイテム3" },
					]}
					marker="・"
				/>
			</section>

			{/* SimpleList: アイコンマーカー（全体指定） */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					A-2. シンプルリスト（アイコンマーカー・全体指定）
				</h2>
				<SimpleList
					items={[
						{ text: "アイコンマーカーのアイテム1" },
						{ text: "リンク付きアイテム", url: "/sample2" },
						{
							text: "色付きアイコン（個別上書き）",
							marker: <FaCircleChevronRight className="text-green-500" />,
							markerClassName: "text-xl",
						},
					]}
					marker={
						<FaCircleChevronRight
							className="text-blue-500"
							aria-hidden="true"
						/>
					}
					markerClassName="text-base"
				/>
			</section>

			{/* SimpleList: アイコンマーカー（個別指定・複数種類） */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					A-3. シンプルリスト（アイコンマーカー・個別指定）
				</h2>
				<SimpleList
					items={[
						{
							text: "チェック",
							marker: <FaCheck className="text-green-600" />,
						},
						{
							text: "スター",
							marker: <FaRegStar className="text-yellow-400" />,
						},
						{
							text: "警告",
							marker: <FaTriangleExclamation className="text-red-500" />,
						},
						{ text: "デフォルトアイコン" },
					]}
					marker={<FaCircleChevronRight className="text-blue-400" />}
					markerClassName="text-lg"
				/>
			</section>

			{/* SimpleList: テキスト・アイコン混在 + マーカーclassName個別指定 */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					A-4. シンプルリスト（テキスト・アイコン混在／className個別指定）
				</h2>
				<SimpleList
					items={[
						{
							text: "テキストマーカー",
							marker: "★",
							markerClassName: "text-yellow-500 text-xl",
						},
						{
							text: "アイコン（大きめ）",
							marker: <FaCheck />,
							markerClassName: "text-2xl text-green-700",
						},
						{ text: "デフォルトマーカー" },
					]}
					marker={<FaCircleChevronRight className="text-gray-400" />}
					markerClassName="text-lg"
				/>
			</section>

			{/* SimpleList: マーカー非表示・一部のみ */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					A-5. シンプルリスト（マーカー非表示）
				</h2>
				<SimpleList
					items={[
						{ text: "マーカー非表示", hideMarker: true },
						{ text: "通常アイコン" },
						{
							text: "個別アイコン",
							marker: <FaRegStar className="text-pink-400" />,
						},
					]}
					marker={<FaCircleChevronRight className="text-blue-400" />}
				/>
			</section>

			{/* SimpleList: インライン表示（アイコン・テキスト混在） */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					A-6. シンプルリスト（インライン・混在）
				</h2>
				<SimpleList
					items={[
						{
							text: "インライン1",
							marker: <FaCheck className="text-green-600" />,
						},
						{
							text: "インライン2",
							url: "/inline2",
							marker: "→",
							markerClassName: "text-blue-500 font-bold",
						},
						{ text: "インライン3" },
					]}
					marker={<FaCircleChevronRight className="text-blue-500" />}
					markerClassName="text-base"
					inline
				/>
			</section>

			<hr className="my-8" />

			{/* NumberedList: 装飾なし */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					B-1. 番号付きリスト（装飾なし）
				</h2>
				<NumberedList
					items={[
						{ text: "番号リスト1" },
						{ text: "番号リスト2", url: "/number2" },
						{ text: "番号リスト3" },
					]}
					numberStyle="plain"
					start={1}
				/>
			</section>

			{/* NumberedList: 数字バッジ */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					B-2. 番号付きリスト（数字バッジ）
				</h2>
				<NumberedList
					items={[
						{ text: "バッジリスト1" },
						{ text: "バッジリスト2", url: "/badge2" },
						{ text: "バッジリスト3" },
					]}
					numberStyle="badge"
					start={3}
				/>
			</section>

			{/* NumberedList: インライン+バッジ */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold mb-2">
					B-3. 番号付きリスト（インライン+バッジ）
				</h2>
				<NumberedList
					items={[
						{ text: "インライン1" },
						{ text: "インライン2", url: "/inline-number2" },
						{ text: "インライン3" },
					]}
					numberStyle="badge"
					inline
				/>
			</section>
		</main>
	);
}
