import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// テスト対象のシンプルなフォームコンポーネント
function LoginForm({
	onSubmit,
}: {
	onSubmit: (data: { email: string; password: string }) => void;
}) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				onSubmit({
					email: formData.get("email") as string,
					password: formData.get("password") as string,
				});
			}}
		>
			<div>
				<label htmlFor="email">メールアドレス</label>
				<input id="email" name="email" type="email" required />
			</div>
			<div>
				<label htmlFor="password">パスワード</label>
				<input id="password" name="password" type="password" required />
			</div>
			<button type="submit">ログイン</button>
		</form>
	);
}

describe("フォームとユーザーイベントのテスト", () => {
	it("フォームに入力して送信する", async () => {
		// userEventのセットアップ
		const user = userEvent.setup();

		// モック関数の作成
		const handleSubmit = vi.fn();

		// コンポーネントのレンダリング
		render(<LoginForm onSubmit={handleSubmit} />);

		// フォームに入力
		await user.type(
			screen.getByLabelText("メールアドレス"),
			"test@example.com",
		);
		await user.type(screen.getByLabelText("パスワード"), "password123");

		// 送信ボタンをクリック
		await user.click(screen.getByRole("button", { name: "ログイン" }));

		// onSubmitが正しい値で呼ばれたか確認
		expect(handleSubmit).toHaveBeenCalledWith({
			email: "test@example.com",
			password: "password123",
		});
	});

	it("タブキーでフォーム内を移動する", async () => {
		const user = userEvent.setup();
		render(<LoginForm onSubmit={() => {}} />);

		// 最初のフォーカス要素を取得
		const emailInput = screen.getByLabelText("メールアドレス");
		emailInput.focus();

		// タブキーでフォーカスを移動
		await user.tab();
		expect(screen.getByLabelText("パスワード")).toHaveFocus();

		// もう一度タブキーでフォーカスを移動
		await user.tab();
		expect(screen.getByRole("button", { name: "ログイン" })).toHaveFocus();
	});
});
