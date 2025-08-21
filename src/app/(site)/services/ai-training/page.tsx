"use client";

import { useEffect } from "react";

export default function AITrainingPage() {
	// Client ComponentでSEO設定
	useEffect(() => {
		document.title = "AIスキルラボ — はじめてでも使えるAIレクチャー";
		
		// メタタグの設定
		const updateMeta = (name: string, content: string) => {
			let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
			if (!meta) {
				meta = document.createElement("meta");
				meta.name = name;
				document.head.appendChild(meta);
			}
			meta.content = content;
		};

		updateMeta("description", "ChatGPTの基本から画像生成、ブログ執筆まで。AIの仕組みを理解して自走できるようになるマンツーマン・グループ・企業研修サービス。初回相談無料。");
		updateMeta("keywords", "AI研修,ChatGPT研修,生成AI講座,AI活用セミナー,初心者向けAI,企業研修");
	}, []);

	return (
		<>

			{/* 構造化データ */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": ["LocalBusiness", "EducationalOrganization"],
						name: "AIスキルラボ",
						description: "初心者向けAIレクチャーサービス",
						url: "https://example.com",
						telephone: "+81-3-1234-5678",
						address: {
							"@type": "PostalAddress",
							streetAddress: "〇〇区〇〇1-2-3",
							addressLocality: "東京都",
							postalCode: "100-0001",
							addressCountry: "JP",
						},
						offers: [
							{
								"@type": "Course",
								name: "ChatGPT基礎講座",
								description: "マンツーマンでChatGPTの基本を学ぶ",
								provider: {
									"@type": "Organization",
									name: "AIスキルラボ",
								},
								offers: {
									"@type": "Offer",
									price: "3000",
									priceCurrency: "JPY",
								},
							},
						],
					}),
				}}
			/>

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "FAQPage",
						mainEntity: [
							{
								"@type": "Question",
								name: "AIを使ったことがない初心者でも大丈夫ですか？",
								acceptedAnswer: {
									"@type": "Answer",
									text: "はい、むしろ初心者の方を対象にしています。アカウント作成から丁寧にサポートします。",
								},
							},
						],
					}),
				}}
			/>

			{/* ヘッダー（固定） */}
			<header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
				<div className="max-w-6xl mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<span className="text-2xl">🤖</span>
							<span className="font-bold text-lg">AIスキルラボ</span>
						</div>
						<nav className="hidden md:flex space-x-6 text-sm">
							<a
								href="#features"
								className="hover:text-indigo-600 transition"
							>
								特徴
							</a>
							<a
								href="#lessons"
								className="hover:text-indigo-600 transition"
							>
								レッスン
							</a>
							<a
								href="#pricing"
								className="hover:text-indigo-600 transition"
							>
								料金
							</a>
							<a href="#faq" className="hover:text-indigo-600 transition">
								FAQ
							</a>
						</nav>
						<button
							onClick={() =>
								document
									.getElementById("contact-modal")
									?.classList.remove("hidden")
							}
							className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
						>
							無料相談
						</button>
					</div>
				</div>
			</header>

			{/* ヒーローセクション */}
			<section className="pt-24 pb-16 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center opacity-100 transform transition-all duration-500">
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							AIスキルラボ
							<br />
							<span className="text-2xl md:text-3xl text-gray-600">
								— はじめてでも "自分で使える" をゴールにするAIレクチャー
							</span>
						</h1>
						<p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
							ChatGPTの基本から画像生成、ブログ執筆、各種AIサービスの基礎をマンツーマン/グループ/企業研修で。
							<br />
							仕組みも理解して、自走できるように。
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								onClick={() =>
									document
										.getElementById("contact-modal")
										?.classList.remove("hidden")
								}
								className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
							>
								まずは無料相談
							</button>
							<a
								href="#pricing"
								className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
							>
								料金を見る
							</a>
						</div>
					</div>

					{/* 信頼要素 */}
					<div className="mt-12 text-center">
						<p className="text-sm text-gray-600 mb-4">導入実績</p>
						<div className="flex justify-center items-center space-x-8 opacity-60">
							{/* TODO: 実際の企業ロゴに差し替え */}
							<img
								src="https://placehold.co/120x40/cccccc/666666?text=Company+A"
								alt="導入企業A"
								className="h-8"
							/>
							<img
								src="https://placehold.co/120x40/cccccc/666666?text=Company+B"
								alt="導入企業B"
								className="h-8"
							/>
							<img
								src="https://placehold.co/120x40/cccccc/666666?text=Company+C"
								alt="導入企業C"
								className="h-8"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* 課題共感セクション */}
			<section className="py-16 px-4 bg-white">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">
						こんなお悩みありませんか？
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="text-4xl mb-4">😕</div>
							<h3 className="font-bold text-lg mb-2">登録はしたけど...</h3>
							<p className="text-gray-600">
								ChatGPTに登録したものの、何を聞けばいいか分からない
							</p>
						</div>
						<div className="text-center">
							<div className="text-4xl mb-4">🔒</div>
							<h3 className="font-bold text-lg mb-2">社内に広げたいが...</h3>
							<p className="text-gray-600">
								セキュリティや情報漏洩が心配で導入に踏み切れない
							</p>
						</div>
						<div className="text-center">
							<div className="text-4xl mb-4">📝</div>
							<h3 className="font-bold text-lg mb-2">使ってはいるけど...</h3>
							<p className="text-gray-600">
								期待した答えが返ってこない、もっと活用したい
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* 提供価値セクション */}
			<section id="features" className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-4">
						AIスキルラボの特徴
					</h2>
					<p className="text-center text-gray-600 mb-12">
						単なる「便利なプロンプト集」の配布では終わりません
					</p>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
								<span className="text-2xl">🧠</span>
							</div>
							<h3 className="font-bold text-xl mb-3">AIの基本原理を理解</h3>
							<p className="text-gray-600 mb-4">
								確率的生成、プロンプト設計、限界と可能性を短時間で解説。なぜその答えが出るのかが分かります。
							</p>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>✓ AIの仕組みを図解で説明</li>
								<li>✓ 良い質問・悪い質問の違い</li>
								<li>✓ 誤情報を見抜くコツ</li>
							</ul>
						</div>

						<div className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
								<span className="text-2xl">🚀</span>
							</div>
							<h3 className="font-bold text-xl mb-3">自律的に使える思考の型</h3>
							<p className="text-gray-600 mb-4">
								受講後は自分で考えて応用できる「プロンプトの型」と実践的なテンプレートを提供します。
							</p>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>✓ 5つの基本プロンプト型</li>
								<li>✓ 業務別テンプレート配布</li>
								<li>✓ カスタマイズ方法指導</li>
							</ul>
						</div>

						<div className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
								<span className="text-2xl">🛡️</span>
							</div>
							<h3 className="font-bold text-xl mb-3">安全運用のガイドライン</h3>
							<p className="text-gray-600 mb-4">
								企業でも安心して使える「安全ポリシー雛形」と具体的な注意点をお伝えします。
							</p>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>✓ 情報漏洩を防ぐ設定</li>
								<li>✓ 著作権・利用規約の解説</li>
								<li>✓ 社内ルール作成支援</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* レッスンメニュー */}
			<section id="lessons" className="py-16 px-4 bg-white">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">
						レッスンメニュー
					</h2>

					<div className="space-y-8">
						{/* ChatGPT基礎 */}
						<div className="border-2 border-gray-200 rounded-lg p-8 hover:border-indigo-300 transition">
							<div className="flex flex-col md:flex-row gap-8">
								<div className="md:w-1/3">
									<img
										src="https://placehold.co/400x300/e0e7ff/6366f1?text=ChatGPT+Basic"
										alt="ChatGPT基礎"
										loading="lazy"
										className="rounded-lg w-full"
									/>
								</div>
								<div className="md:w-2/3">
									<h3 className="text-2xl font-bold mb-3 flex items-center">
										<span className="text-3xl mr-3">💬</span>
										ChatGPT基礎コース
									</h3>
									<p className="text-gray-600 mb-4">
										アカウント作成から始めて、日常業務で即活用できるレベルまで。
									</p>
									<div className="grid md:grid-cols-2 gap-4 mb-4">
										<div>
											<h4 className="font-semibold mb-2">学べること</h4>
											<ul className="text-sm text-gray-600 space-y-1">
												<li>• アカウント作成と初期設定</li>
												<li>• プロンプトの基本型5パターン</li>
												<li>• 情報収集・要約の実践</li>
												<li>• メール・提案書の下書き作成</li>
											</ul>
										</div>
										<div>
											<h4 className="font-semibold mb-2">
												こんな方におすすめ
											</h4>
											<ul className="text-sm text-gray-600 space-y-1">
												<li>• AIを使ったことがない方</li>
												<li>• 基礎から体系的に学びたい方</li>
												<li>• 業務効率を上げたい方</li>
												<li>• 安全に使いたい方</li>
											</ul>
										</div>
									</div>
									<div className="flex items-center text-sm text-gray-500">
										<span className="mr-4">⏱️ 1時間〜</span>
										<span className="mr-4">👤 マンツーマン対応</span>
										<span>💻 オンライン推奨</span>
									</div>
								</div>
							</div>
						</div>

						{/* 画像生成入門 */}
						<div className="border-2 border-gray-200 rounded-lg p-8 hover:border-indigo-300 transition">
							<div className="flex flex-col md:flex-row gap-8">
								<div className="md:w-1/3">
									<img
										src="https://placehold.co/400x300/fce7f3/ec4899?text=Image+Generation"
										alt="画像生成入門"
										loading="lazy"
										className="rounded-lg w-full"
									/>
								</div>
								<div className="md:w-2/3">
									<h3 className="text-2xl font-bold mb-3 flex items-center">
										<span className="text-3xl mr-3">🎨</span>
										画像生成入門コース
									</h3>
									<p className="text-gray-600 mb-4">
										DALL-E、Adobe Firefly、Google Imagenの基本操作と活用方法。
									</p>
									<div className="grid md:grid-cols-2 gap-4 mb-4">
										<div>
											<h4 className="font-semibold mb-2">学べること</h4>
											<ul className="text-sm text-gray-600 space-y-1">
												<li>• 各サービスの特徴と使い分け</li>
												<li>• 被写体・構図・スタイルの指定方法</li>
												<li>• 著作権と商用利用の注意点</li>
												<li>• 失敗しないプロンプトのコツ</li>
											</ul>
										</div>
										<div>
											<h4 className="font-semibold mb-2">
												こんな方におすすめ
											</h4>
											<ul className="text-sm text-gray-600 space-y-1">
												<li>• ブログやSNS用画像が必要な方</li>
												<li>• デザイン予算を抑えたい方</li>
												<li>• アイデアを形にしたい方</li>
												<li>• 著作権が心配な方</li>
											</ul>
										</div>
									</div>
									<div className="flex items-center text-sm text-gray-500">
										<span className="mr-4">⏱️ 1時間〜</span>
										<span className="mr-4">👤 マンツーマン対応</span>
										<span>💻 オンライン推奨</span>
									</div>
								</div>
							</div>
						</div>

						{/* ブログ執筆 */}
						<div className="border-2 border-gray-200 rounded-lg p-8 hover:border-indigo-300 transition">
							<div className="flex flex-col md:flex-row gap-8">
								<div className="md:w-1/3">
									<img
										src="https://placehold.co/400x300/d1fae5/10b981?text=Blog+Writing"
										alt="ブログ執筆"
										loading="lazy"
										className="rounded-lg w-full"
									/>
								</div>
								<div className="md:w-2/3">
									<h3 className="text-2xl font-bold mb-3 flex items-center">
										<span className="text-3xl mr-3">✍️</span>
										AIでブログを書くワークショップ
									</h3>
									<p className="text-gray-600 mb-4">
										企画から公開まで、AIを活用した効率的なブログ執筆フローを実践。
									</p>
									<div className="grid md:grid-cols-2 gap-4 mb-4">
										<div>
											<h4 className="font-semibold mb-2">学べること</h4>
											<ul className="text-sm text-gray-600 space-y-1">
												<li>• テーマ企画とキーワード選定</li>
												<li>• 構成案の作成とブラッシュアップ</li>
												<li>• 下書き生成とリライト技法</li>
												<li>• アイキャッチ画像の生成</li>
											</ul>
										</div>
										<div>
											<h4 className="font-semibold mb-2">
												こんな方におすすめ
											</h4>
											<ul className="text-sm text-gray-600 space-y-1">
												<li>• ブログを始めたい方</li>
												<li>• 執筆時間を短縮したい方</li>
												<li>• ネタ切れに悩む方</li>
												<li>• SEOを意識したい方</li>
											</ul>
										</div>
									</div>
									<div className="flex items-center text-sm text-gray-500">
										<span className="mr-4">⏱️ 2時間</span>
										<span className="mr-4">👥 3〜6名</span>
										<span>💻 オンライン/対面</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 料金セクション */}
			<section id="pricing" className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-4">料金プラン</h2>
					<p className="text-center text-gray-600 mb-8">
						目的と規模に合わせて選べる4つのプラン
					</p>

					{/* 料金カード */}
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{/* ChatGPT基礎 */}
						<div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div className="text-center mb-4">
								<span className="text-3xl">💬</span>
								<h3 className="text-xl font-bold mt-2">ChatGPT基礎</h3>
								<p className="text-sm text-gray-600 mt-1">マンツーマン</p>
							</div>
							<div className="text-center mb-6">
								<span className="text-4xl font-bold">¥3,000</span>
								<span className="text-gray-600">/1時間</span>
							</div>
							<ul className="text-sm space-y-2 mb-6">
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>アカウント作成サポート</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>基本プロンプト5パターン</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>実践ワーク付き</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>テンプレート配布</span>
								</li>
							</ul>
							<button
								onClick={() =>
									document
										.getElementById("contact-modal")
										?.classList.remove("hidden")
								}
								className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
							>
								申し込む
							</button>
						</div>

						{/* 画像生成入門 */}
						<div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div className="text-center mb-4">
								<span className="text-3xl">🎨</span>
								<h3 className="text-xl font-bold mt-2">画像生成入門</h3>
								<p className="text-sm text-gray-600 mt-1">マンツーマン</p>
							</div>
							<div className="text-center mb-6">
								<span className="text-4xl font-bold">¥3,500</span>
								<span className="text-gray-600">/1時間</span>
							</div>
							<ul className="text-sm space-y-2 mb-6">
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>3つのAIツール解説</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>プロンプトのコツ</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>著作権ガイド付き</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>作例集プレゼント</span>
								</li>
							</ul>
							<button
								onClick={() =>
									document
										.getElementById("contact-modal")
										?.classList.remove("hidden")
								}
								className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
							>
								申し込む
							</button>
						</div>

						{/* ブログワークショップ */}
						<div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative">
							<div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
								人気
							</div>
							<div className="text-center mb-4">
								<span className="text-3xl">✍️</span>
								<h3 className="text-xl font-bold mt-2">ブログ執筆WS</h3>
								<p className="text-sm text-gray-600 mt-1">3〜6名</p>
							</div>
							<div className="text-center mb-6">
								<span className="text-4xl font-bold">¥12,000</span>
								<span className="text-gray-600">/2時間</span>
							</div>
							<ul className="text-sm space-y-2 mb-6">
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>1人2,000〜4,000円</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>企画〜公開まで実践</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>SEO基礎も解説</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>フォローアップ付き</span>
								</li>
							</ul>
							<button
								onClick={() =>
									document
										.getElementById("contact-modal")
										?.classList.remove("hidden")
								}
								className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
							>
								申し込む
							</button>
						</div>

						{/* 企業研修 */}
						<div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div className="text-center mb-4">
								<span className="text-3xl">🏢</span>
								<h3 className="text-xl font-bold mt-2">企業内研修</h3>
								<p className="text-sm text-gray-600 mt-1">10名まで</p>
							</div>
							<div className="text-center mb-6">
								<span className="text-4xl font-bold">¥50,000〜</span>
								<span className="text-gray-600">/2時間</span>
							</div>
							<ul className="text-sm space-y-2 mb-6">
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>内容カスタマイズ可</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>資料配布込み</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>録画提供オプション</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-500 mr-2">✓</span>
									<span>フォローサポート</span>
								</li>
							</ul>
							<button
								onClick={() =>
									document
										.getElementById("contact-modal")
										?.classList.remove("hidden")
								}
								className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
							>
								相談する
							</button>
						</div>
					</div>

					{/* 備考 */}
					<div className="mt-8 text-center text-sm text-gray-600">
						<p>※ 価格は税別です。交通費・会場費は別途ご負担いただきます。</p>
						<p>※ 内容・人数により料金は変動します。詳細はお見積りにて。</p>
						{/* TODO: 助成金情報を追加 */}
						<p>※ 助成金活用についてはお問い合わせください。</p>
					</div>
				</div>
			</section>

			{/* 成果イメージ */}
			<section className="py-16 px-4 bg-white">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">受講後の変化</h2>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Before/After 1 */}
						<div className="bg-white rounded-lg shadow-lg overflow-hidden">
							<div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 text-center font-bold">
								メール返信
							</div>
							<div className="p-6">
								<div className="mb-4">
									<span className="text-sm text-gray-500">Before</span>
									<p className="text-2xl font-bold text-gray-400">20分</p>
									<p className="text-sm text-gray-600">1通の返信に悩む時間</p>
								</div>
								<div className="text-center my-4">
									<span className="text-2xl">↓</span>
								</div>
								<div>
									<span className="text-sm text-indigo-600">After</span>
									<p className="text-2xl font-bold text-indigo-600">5分</p>
									<p className="text-sm text-gray-600">
										AIで下書き→微調整で完成
									</p>
								</div>
							</div>
						</div>

						{/* Before/After 2 */}
						<div className="bg-white rounded-lg shadow-lg overflow-hidden">
							<div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 text-center font-bold">
								ブログ執筆
							</div>
							<div className="p-6">
								<div className="mb-4">
									<span className="text-sm text-gray-500">Before</span>
									<p className="text-2xl font-bold text-gray-400">0文字</p>
									<p className="text-sm text-gray-600">書き始められない</p>
								</div>
								<div className="text-center my-4">
									<span className="text-2xl">↓</span>
								</div>
								<div>
									<span className="text-sm text-indigo-600">After</span>
									<p className="text-2xl font-bold text-indigo-600">1000文字</p>
									<p className="text-sm text-gray-600">45分で初稿完成</p>
								</div>
							</div>
						</div>

						{/* Before/After 3 */}
						<div className="bg-white rounded-lg shadow-lg overflow-hidden">
							<div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 text-center font-bold">
								画像素材
							</div>
							<div className="p-6">
								<div className="mb-4">
									<span className="text-sm text-gray-500">Before</span>
									<p className="text-2xl font-bold text-gray-400">¥3,000</p>
									<p className="text-sm text-gray-600">素材サイトで購入</p>
								</div>
								<div className="text-center my-4">
									<span className="text-2xl">↓</span>
								</div>
								<div>
									<span className="text-sm text-indigo-600">After</span>
									<p className="text-2xl font-bold text-indigo-600">¥0</p>
									<p className="text-sm text-gray-600">
										AIで必要な画像を生成
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section id="faq" className="py-16 px-4">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">
						よくあるご質問
					</h2>

					<div className="space-y-4">
						{[
							{
								q: "AIを使ったことがない初心者でも大丈夫ですか？",
								a: "はい、むしろ初心者の方を対象にしています。アカウント作成から丁寧にサポートしますので、パソコンの基本操作ができれば問題ありません。専門用語は使わず、分かりやすい言葉で説明します。",
							},
							{
								q: "社内データを入力しても大丈夫ですか？",
								a: "ChatGPTなどのAIサービスに入力したデータは、学習に使われる可能性があります。機密情報や個人情報は入力しないよう、安全な使い方をレッスンでお伝えします。企業研修では、貴社のセキュリティポリシーに合わせたガイドライン作成もサポートします。",
							},
							{
								q: "生成した画像の著作権はどうなりますか？",
								a: "各AIサービスによって利用規約が異なります。商用利用可能なサービスと、そうでないサービスがあります。レッスンでは、各サービスの規約を分かりやすく解説し、安心して使えるよう指導します。",
							},
							{
								q: "AIの回答は常に正しいのですか？",
								a: "いいえ、AIは時に誤った情報を生成することがあります（ハルシネーション）。レッスンでは、AIの限界を理解し、回答を適切に検証する方法をお伝えします。重要な情報は必ず裏取りが必要です。",
							},
							{
								q: "オンラインレッスンに必要なものは？",
								a: "パソコン（またはタブレット）、インターネット環境、Zoomなどのビデオ通話アプリがあれば受講できます。画面共有しながら進めるので、実際の操作を見ながら学べます。",
							},
							{
								q: "レッスン後のサポートはありますか？",
								a: "はい、レッスン後1週間はメールでの質問を無料で受け付けています。また、使用したスライドやプロンプト集などの資料もお渡しするので、復習に活用できます。",
							},
						].map((faq, index) => (
							<div key={index} className="border rounded-lg">
								<button
									onClick={() => {
										const content = document.getElementById(
											`faq-content-${index}`,
										);
										const icon = document.getElementById(`faq-icon-${index}`);
										if (content && icon) {
											if (content.classList.contains("hidden")) {
												content.classList.remove("hidden");
												icon.textContent = "▲";
											} else {
												content.classList.add("hidden");
												icon.textContent = "▼";
											}
										}
									}}
									className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
								>
									<span className="font-semibold">{faq.q}</span>
									<span id={`faq-icon-${index}`}>▼</span>
								</button>
								<div
									id={`faq-content-${index}`}
									className="hidden p-4 border-t bg-gray-50"
								>
									<p>{faq.a}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* フッターCTA */}
			<section className="py-16 px-4 bg-indigo-600 text-white">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-4">
						今すぐAIスキルを身につけよう
					</h2>
					<p className="text-xl mb-8">
						まずは無料相談から。あなたに合ったプランをご提案します。
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							onClick={() =>
								document
									.getElementById("contact-modal")
									?.classList.remove("hidden")
							}
							className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
						>
							無料相談を予約
						</button>
						<a
							href="#"
							className="bg-indigo-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-400 transition"
						>
							資料をダウンロード
						</a>
					</div>
				</div>
			</section>

			{/* お問い合わせモーダル */}
			<div
				id="contact-modal"
				className="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4"
			>
				<div className="bg-white rounded-lg max-w-md w-full p-8">
					<h3 className="text-2xl font-bold mb-4">無料相談フォーム</h3>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							alert(
								"お問い合わせありがとうございます。24時間以内にご返信いたします。",
							);
							document
								.getElementById("contact-modal")
								?.classList.add("hidden");
						}}
					>
						<div className="mb-4">
							<label className="block text-sm font-semibold mb-2">
								お名前 <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								required
								className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-semibold mb-2">
								メールアドレス <span className="text-red-500">*</span>
							</label>
							<input
								type="email"
								required
								className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-semibold mb-2">
								電話番号
							</label>
							<input
								type="tel"
								className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-semibold mb-2">
								ご相談内容 <span className="text-red-500">*</span>
							</label>
							<select
								required
								className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								<option value="">選択してください</option>
								<option>個人レッスン希望</option>
								<option>グループワークショップ希望</option>
								<option>企業研修の相談</option>
								<option>その他</option>
							</select>
						</div>
						<div className="mb-6">
							<label className="block text-sm font-semibold mb-2">
								メッセージ
							</label>
							<textarea
								rows={4}
								className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div className="flex gap-4">
							<button
								type="submit"
								className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
							>
								送信する
							</button>
							<button
								type="button"
								onClick={() =>
									document
										.getElementById("contact-modal")
										?.classList.add("hidden")
								}
								className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
							>
								閉じる
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* 固定CTA */}
			<div className="fixed bottom-4 right-4 z-40">
				<button
					onClick={() =>
						document.getElementById("contact-modal")?.classList.remove("hidden")
					}
					className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center"
				>
					<span className="mr-2">📞</span>
					無料相談
				</button>
			</div>
		</>
	);
}