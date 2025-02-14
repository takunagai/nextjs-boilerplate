import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
// chadcn/ui のコンポーネントをインポート
import { Input } from "@/components/ui/input";

// Zod を使ってバリデーション用のスキーマを定義
const formSchema = z.object({
	email: z
		.string()
		.email({ message: "有効なメールアドレスを入力してください" }),
});

// スキーマから型を自動生成
type FormValues = z.infer<typeof formSchema>;

const SimpleForm = () => {
	// react-hook-form を zodResolver とともに利用
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	// フォーム送信時の処理
	const onSubmit = (data: FormValues) => {
		console.log("Submitted data:", data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					メールアドレス
				</label>
				{/* chadcn/ui の Input コンポーネントに react-hook-form の register を適用 */}
				<Input
					id="email"
					placeholder="メールアドレスを入力"
					{...register("email")}
				/>
				{/* バリデーションエラーの表示 */}
				{errors.email && (
					<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
				)}
			</div>
			{/* chadcn/ui の Button コンポーネントを利用 */}
			<Button type="submit">送信</Button>
		</form>
	);
};

export default SimpleForm;
