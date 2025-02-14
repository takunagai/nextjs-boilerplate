/*
  Immer を使うと、まるで状態が直接変更されているかのように記述できますが、
  内部では不変性が保たれた新しいオブジェクトが生成されます。
  これにより、元の state を安全に保ちながら簡潔に更新処理を行えます。
*/

import { produce } from "immer";

// 初期状態のオブジェクト（複雑なネスト構造をもつ例）
const state = {
	user: {
		name: "Alice",
		age: 25,
		address: {
			city: "Tokyo",
			zip: "100-0001",
		},
	},
	todos: [
		{ id: 1, title: "Buy milk", done: false },
		{ id: 2, title: "Read book", done: false },
	],
};

const nextState = produce(state, (draft: typeof state) => {
	// user の年齢を更新
	draft.user.age += 1;
	// address の city を変更
	draft.user.address.city = "Osaka";
	// todos 配列に新しいタスクを追加
	draft.todos.push({ id: 3, title: "Write sample code", done: false });
	// 特定の todo の完了状態を更新
	const todo = draft.todos.find((t) => t.id === 1);
	if (todo) {
		todo.done = true;
	}
});

console.log("Before update:", state);
console.log("After update:", nextState);
