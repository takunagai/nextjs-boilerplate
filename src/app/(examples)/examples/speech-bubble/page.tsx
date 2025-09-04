import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import {
	SpeechBubble,
	SpeechBubbleTitle,
	SpeechBubbleMessage,
	SpeechBubbleActions,
} from "@/components/ui/speech-bubble";
import { Button } from "@/components/ui/button";

export default function SpeechBubblePage() {
	return (
		<Container className="mt-8" paddingY="lg" paddingX="2xl">
			<PageHeader title="吹き出し（Speech Bubble）コンポーネント" />

			<div className="space-y-12">
				{/* 基本的な使用例 */}
				<section>
					<h2 className="text-xl font-semibold mb-6">基本的な使用例</h2>
					<div className="space-y-6 bg-gray-50 p-6 rounded-lg">
						<SpeechBubble name="田中さん" direction="left">
							<SpeechBubbleMessage>
								こんにちは！お疲れ様です。今日はいい天気ですね。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble name="佐藤さん" direction="right">
							<SpeechBubbleMessage>
								本当ですね！散歩日和で気持ちがいいです。
							</SpeechBubbleMessage>
						</SpeechBubble>
					</div>
				</section>

				{/* サイズバリエーション */}
				<section>
					<h2 className="text-xl font-semibold mb-6">サイズバリエーション</h2>
					<div className="space-y-6 bg-gray-50 p-6 rounded-lg">
						<SpeechBubble name="小さなアバター" direction="left" size="sm">
							<SpeechBubbleMessage>
								これは小さなサイズ（sm）の吹き出しです。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble name="標準アバター" direction="right" size="md">
							<SpeechBubbleMessage>
								これは標準サイズ（md）の吹き出しです。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble name="大きなアバター" direction="left" size="lg">
							<SpeechBubbleMessage>
								これは大きなサイズ（lg）の吹き出しです。
							</SpeechBubbleMessage>
						</SpeechBubble>
					</div>
				</section>

				{/* テーマバリエーション */}
				<section>
					<h2 className="text-xl font-semibold mb-6">テーマバリエーション</h2>
					<div className="space-y-6 bg-gray-50 p-6 rounded-lg">
						<SpeechBubble name="デフォルト" direction="left" theme="default">
							<SpeechBubbleMessage>
								これはデフォルトテーマの吹き出しです。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble name="プライマリ" direction="right" theme="primary">
							<SpeechBubbleMessage>
								これはプライマリテーマの吹き出しです。重要な情報を伝える時に使用します。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble name="セカンダリ" direction="left" theme="secondary">
							<SpeechBubbleMessage>
								これはセカンダリテーマの吹き出しです。補足情報に適しています。
							</SpeechBubbleMessage>
						</SpeechBubble>
					</div>
				</section>

				{/* カスタムアバター画像 */}
				<section>
					<h2 className="text-xl font-semibold mb-6">カスタムアバター画像</h2>
					<div className="space-y-6 bg-gray-50 p-6 rounded-lg">
						<SpeechBubble
							name="カスタムユーザー"
							direction="left"
							avatarSrc="/dummy-images/photo-05.jpg"
							avatarWidth={48}
							avatarHeight={48}
						>
							<SpeechBubbleMessage>
								カスタムアバター画像を使用した吹き出しです。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble
							name="別のユーザー"
							direction="right"
							avatarSrc="/dummy-images/photo-06.jpg"
							avatarWidth={48}
							avatarHeight={48}
						>
							<SpeechBubbleMessage>
								こちらも異なるアバター画像を使用しています。
							</SpeechBubbleMessage>
						</SpeechBubble>
					</div>
				</section>

				{/* ヘルパーコンポーネントを使用した複雑なコンテンツ */}
				<section>
					<h2 className="text-xl font-semibold mb-6">複雑なコンテンツ</h2>
					<div className="space-y-6 bg-gray-50 p-6 rounded-lg">
						<SpeechBubble
							name="サポートスタッフ"
							direction="left"
							theme="primary"
							size="lg"
						>
							<SpeechBubbleTitle>お知らせ</SpeechBubbleTitle>
							<SpeechBubbleMessage>
								システムメンテナンスのお知らせです。明日の深夜2時から4時まで、サーバーメンテナンスを実施いたします。
							</SpeechBubbleMessage>
							<SpeechBubbleActions>
								<Button size="sm" variant="outline">
									詳細を見る
								</Button>
								<Button size="sm">了解しました</Button>
							</SpeechBubbleActions>
						</SpeechBubble>

						<SpeechBubble name="ユーザー" direction="right">
							<SpeechBubbleMessage>
								承知いたしました。メンテナンス時間中は作業を控えるようにします。
							</SpeechBubbleMessage>
						</SpeechBubble>
					</div>
				</section>

				{/* スペーシングバリエーション */}
				<section>
					<h2 className="text-xl font-semibold mb-6">
						スペーシングバリエーション
					</h2>
					<div className="space-y-6 bg-gray-50 p-6 rounded-lg">
						<SpeechBubble
							name="タイトなスペース"
							direction="left"
							spacing="tight"
						>
							<SpeechBubbleMessage>
								コンパクトなスペーシング（tight）です。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble
							name="通常のスペース"
							direction="right"
							spacing="normal"
						>
							<SpeechBubbleMessage>
								標準的なスペーシング（normal）です。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble
							name="ルーズなスペース"
							direction="left"
							spacing="loose"
						>
							<SpeechBubbleMessage>
								ゆったりとしたスペーシング（loose）です。
							</SpeechBubbleMessage>
						</SpeechBubble>
					</div>
				</section>

				{/* レスポンシブテスト用の長いテキスト */}
				<section>
					<h2 className="text-xl font-semibold mb-6">
						レスポンシブテスト（長文）
					</h2>
					<div className="space-y-6 bg-gray-50 p-6 rounded-lg">
						<SpeechBubble
							name="長文ユーザー"
							direction="left"
							theme="secondary"
						>
							<SpeechBubbleMessage>
								これは非常に長いテキストの例です。レスポンシブデザインが適切に動作するかをテストします。
								画面サイズが変わっても、テキストが適切に折り返され、読みやすさが保たれることを確認します。
								スマートフォン、タブレット、デスクトップの各デバイスで正常に表示されるでしょうか。
								このコンポーネントはTailwind CSS
								v4のレスポンシブ機能を活用して実装されています。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble name="返答ユーザー" direction="right">
							<SpeechBubbleMessage>
								確かにそうですね。長いテキストでもきれいに表示されているように見えます。
								各デバイスで確認してみる必要がありますが、期待通りの動作をしていそうです。
							</SpeechBubbleMessage>
						</SpeechBubble>
					</div>
				</section>

				{/* 会話の例 */}
				<section>
					<h2 className="text-xl font-semibold mb-6">会話の例</h2>
					<div className="space-y-4 bg-gray-50 p-6 rounded-lg">
						<SpeechBubble
							name="営業担当"
							direction="left"
							avatarSrc="/dummy-images/photo-07.jpg"
							theme="primary"
						>
							<SpeechBubbleTitle>ご提案</SpeechBubbleTitle>
							<SpeechBubbleMessage>
								お疲れ様です。新サービスについてご相談があります。
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble
							name="お客様"
							direction="right"
							avatarSrc="/dummy-images/photo-08.jpg"
						>
							<SpeechBubbleMessage>
								はい、どのような内容でしょうか？
							</SpeechBubbleMessage>
						</SpeechBubble>

						<SpeechBubble
							name="営業担当"
							direction="left"
							avatarSrc="/dummy-images/photo-07.jpg"
						>
							<SpeechBubbleMessage>
								コストを30%削減できる新システムをご提案させていただけます。
							</SpeechBubbleMessage>
							<SpeechBubbleActions>
								<Button size="sm" variant="outline">
									資料請求
								</Button>
								<Button size="sm">詳細を聞く</Button>
							</SpeechBubbleActions>
						</SpeechBubble>

						<SpeechBubble
							name="お客様"
							direction="right"
							avatarSrc="/dummy-images/photo-08.jpg"
							theme="primary"
						>
							<SpeechBubbleMessage>
								それは興味深いですね。ぜひ詳細をお聞かせください。
							</SpeechBubbleMessage>
						</SpeechBubble>
					</div>
				</section>

				{/* 使用方法 */}
				<section>
					<h2 className="text-xl font-semibold mb-6">使用方法</h2>
					<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
						<pre>{`// 基本的な使用方法
import { SpeechBubble } from "@/components/ui/speech-bubble";

<SpeechBubble name="ユーザー名" direction="left" theme="primary">
  メッセージ内容
</SpeechBubble>

// 複雑なコンテンツの場合
import { 
  SpeechBubble, 
  SpeechBubbleTitle,
  SpeechBubbleMessage,
  SpeechBubbleActions 
} from "@/components/ui/speech-bubble";

<SpeechBubble name="ユーザー" avatarSrc="/custom-avatar.jpg">
  <SpeechBubbleTitle>タイトル</SpeechBubbleTitle>
  <SpeechBubbleMessage>メッセージ本文</SpeechBubbleMessage>
  <SpeechBubbleActions>
    <Button>アクション</Button>
  </SpeechBubbleActions>
</SpeechBubble>`}</pre>
					</div>
				</section>
			</div>
		</Container>
	);
}
