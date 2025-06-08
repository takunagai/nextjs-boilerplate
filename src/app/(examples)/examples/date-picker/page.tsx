import { DatePickerWithState } from "./components/date-picker-with-state";

export default function DatePickerPage() {
	return (
		<div className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
			<header className="mb-10">
				<h1 className="text-4xl font-bold tracking-tight text-primary">
					DatePicker コンポーネント
				</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					カレンダーから日付を選択できる日付選択コンポーネントです。
				</p>
			</header>

			<section>
				<h2 className="text-3xl font-semibold mb-6 border-b pb-2">
					基本的な使い方
				</h2>
				<div className="p-4 bg-background rounded-lg shadow">
					<DatePickerWithState />
				</div>
			</section>

			<section>
				<h2 className="text-3xl font-semibold mb-6 border-b pb-2">実装方法</h2>
				<div className="p-4 bg-background rounded-lg shadow space-y-6">
					<div>
						<h3 className="text-xl font-medium mb-2">
							日付選択コンポーネントの基本実装
						</h3>
						<pre className="p-4 rounded bg-muted overflow-x-auto">
							<code>{`// src/components/ui/date-picker.tsx を利用
import { DatePicker } from "@/components/ui/date-picker";
import * as React from "react";

// クライアントコンポーネントとして実装
"use client";

function MyDatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <DatePicker 
        date={date} 
        onSelect={setDate} 
        placeholder="Select a date" 
      />
      <p className="mt-2 text-sm text-muted-foreground">
        Selected date: {date ? date.toLocaleDateString() : "None"}
      </p>
    </div>
  );
}
`}</code>
						</pre>
					</div>

					<div>
						<h3 className="text-xl font-medium mb-2">
							サーバーコンポーネントでの使用方法
						</h3>
						<pre className="p-4 rounded bg-muted overflow-x-auto">
							<code>{`// 1. クライアントコンポーネントを別ファイルに分離
// src/app/(examples)/examples/date-picker/components/date-picker-with-state.tsx
"use client";

import * as React from "react";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerWithState() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <DatePicker date={date} onSelect={setDate} placeholder="Select a date" />
      <p className="mt-2 text-sm text-muted-foreground">
        Selected date: {date ? date.toLocaleDateString() : "None"}
      </p>
    </div>
  );
}

// 2. サーバーコンポーネントからインポートして使用
// src/app/your-page.tsx
import { DatePickerWithState } from "./components/date-picker-with-state";

export default function YourPage() {
  return (
    <div>
      <h1>日付選択</h1>
      <DatePickerWithState />
    </div>
  );
}
`}</code>
						</pre>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-3xl font-semibold mb-6 border-b pb-2">
					使用上の注意点
				</h2>
				<div className="p-4 bg-background rounded-lg shadow space-y-4">
					<div className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300">
						<h3 className="font-semibold">サーバーコンポーネントとの統合</h3>
						<p className="mt-1">
							DatePickerは内部で{" "}
							<code className="px-1 py-0.5 bg-muted rounded">useState</code>{" "}
							を使用するため、
							クライアントコンポーネントとして実装する必要があります。サーバーコンポーネントで使用する場合は、
							上記のように別ファイルに分離して{" "}
							<code className="px-1 py-0.5 bg-muted rounded">"use client"</code>{" "}
							ディレクティブを追加してください。
						</p>
					</div>

					<div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">
						<h3 className="font-semibold">国際化対応</h3>
						<p className="mt-1">
							デフォルトでは英語表記のカレンダーが表示されます。日本語など他の言語に対応させる場合は、
							適切なロケールパッケージをインポートして設定する必要があります。
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
