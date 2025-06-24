import {
	AUTH_ERROR_CODES,
	type AuthErrorCode,
	type AuthResult,
	getAuthErrorMessage,
} from "../auth-errors";

describe("auth-errors", () => {
	describe("AUTH_ERROR_CODES", () => {
		it("すべての認証エラーコードが定義されている", () => {
			expect(AUTH_ERROR_CODES.INVALID_CREDENTIALS).toBe(
				"auth/invalid-credentials",
			);
			expect(AUTH_ERROR_CODES.EMPTY_CREDENTIALS).toBe("auth/empty-credentials");
			expect(AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND).toBe("auth/account-not-found");
			expect(AUTH_ERROR_CODES.NETWORK_ERROR).toBe("auth/network-error");
			expect(AUTH_ERROR_CODES.SERVER_ERROR).toBe("auth/server-error");
			expect(AUTH_ERROR_CODES.UNKNOWN_ERROR).toBe("auth/unknown-error");
		});

		it("定数オブジェクトが正しい型で定義されている", () => {
			// as constによって型レベルでの読み取り専用になっていることを確認
			expect(typeof AUTH_ERROR_CODES.INVALID_CREDENTIALS).toBe("string");
			expect(AUTH_ERROR_CODES.INVALID_CREDENTIALS).toBe(
				"auth/invalid-credentials",
			);
		});
	});

	describe("getAuthErrorMessage", () => {
		describe("INVALID_CREDENTIALS エラー", () => {
			it("初回試行時（attempts < 2）は基本メッセージを返す", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"test@example.com",
					0,
				);
				expect(message).toBe(
					"メールアドレスまたはパスワードが正しくありません",
				);
			});

			it("1回目の失敗時（attempts = 1）は基本メッセージを返す", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"test@example.com",
					1,
				);
				expect(message).toBe(
					"メールアドレスまたはパスワードが正しくありません",
				);
			});

			it("2回以上失敗時（attempts >= 2）は詳細メッセージを返す", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"test@example.com",
					2,
				);
				expect(message).toContain("認証に失敗しました。以下をお試しください：");
				expect(message).toContain("1. パスワードが正しいか確認");
				expect(message).toContain("2. Caps Lockがオンになっていないか確認");
				expect(message).toContain("3. 登録済みのメールアドレスか確認");
			});

			it("3回失敗時も詳細メッセージを返す", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"test@example.com",
					3,
				);
				expect(message).toContain("認証に失敗しました。以下をお試しください：");
			});

			it("メールアドレスが無効な形式の場合は異なるメッセージを表示", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"invalid-email",
					2,
				);
				expect(message).toContain("メールアドレスの形式が正しいか確認");
			});

			it("メールアドレスが提供されていない場合は詳細メッセージが空", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					undefined,
					2,
				);
				expect(message).toBe("認証に失敗しました。以下をお試しください：");
			});
		});

		describe("EMPTY_CREDENTIALS エラー", () => {
			it("適切なメッセージを返す", () => {
				const message = getAuthErrorMessage(AUTH_ERROR_CODES.EMPTY_CREDENTIALS);
				expect(message).toBe("メールアドレスとパスワードを入力してください");
			});

			it("試行回数に関係なく同じメッセージを返す", () => {
				const message1 = getAuthErrorMessage(
					AUTH_ERROR_CODES.EMPTY_CREDENTIALS,
					"test@example.com",
					0,
				);
				const message2 = getAuthErrorMessage(
					AUTH_ERROR_CODES.EMPTY_CREDENTIALS,
					"test@example.com",
					5,
				);
				expect(message1).toBe(message2);
			});
		});

		describe("ACCOUNT_NOT_FOUND エラー", () => {
			it("適切なメッセージを返す", () => {
				const message = getAuthErrorMessage(AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND);
				expect(message).toBe("アカウントが見つかりません");
			});
		});

		describe("NETWORK_ERROR エラー", () => {
			it("適切なメッセージを返す", () => {
				const message = getAuthErrorMessage(AUTH_ERROR_CODES.NETWORK_ERROR);
				expect(message).toBe(
					"サーバーに接続できません。インターネット接続を確認してください",
				);
			});
		});

		describe("SERVER_ERROR エラー", () => {
			it("適切なメッセージを返す", () => {
				const message = getAuthErrorMessage(AUTH_ERROR_CODES.SERVER_ERROR);
				expect(message).toBe(
					"サーバーエラーが発生しました。時間をおいて再度お試しください",
				);
			});
		});

		describe("NextAuthエラーの処理", () => {
			it("CredentialsSigninエラーを初回試行時に処理する", () => {
				const message = getAuthErrorMessage(
					"CredentialsSignin",
					"test@example.com",
					0,
				);
				expect(message).toBe(
					"メールアドレスまたはパスワードが正しくありません",
				);
			});

			it("CredentialsSigninエラーを複数回試行時に詳細メッセージで処理する", () => {
				const message = getAuthErrorMessage(
					"CredentialsSignin",
					"test@example.com",
					2,
				);
				expect(message).toContain("認証に失敗しました。以下をお試しください：");
				expect(message).toContain("登録済みのメールアドレスか確認");
			});

			it("fetch failedエラーをネットワークエラーとして処理する", () => {
				const message = getAuthErrorMessage("fetch failed: network error");
				expect(message).toBe(
					"サーバーに接続できません。インターネット接続を確認してください",
				);
			});

			it("部分的なfetch failedメッセージも処理する", () => {
				const message = getAuthErrorMessage(
					"Request failed due to fetch failed",
				);
				expect(message).toBe(
					"サーバーに接続できません。インターネット接続を確認してください",
				);
			});
		});

		describe("不明なエラーコードの処理", () => {
			it("不明な文字列エラーコードをそのまま返す", () => {
				const customError = "カスタムエラーメッセージ";
				const message = getAuthErrorMessage(customError);
				expect(message).toBe(customError);
			});

			it("undefinedエラーコードでデフォルトメッセージを返す", () => {
				const message = getAuthErrorMessage(undefined);
				expect(message).toBe(
					"ログインに失敗しました。認証情報を確認してください",
				);
			});

			it("空文字列エラーコードでデフォルトメッセージを返す", () => {
				const message = getAuthErrorMessage("");
				expect(message).toBe(
					"ログインに失敗しました。認証情報を確認してください",
				);
			});

			it("不明なエラーコード定数でそのまま返す", () => {
				const unknownCode = "unknown/error-code" as AuthErrorCode;
				const message = getAuthErrorMessage(unknownCode);
				expect(message).toBe("unknown/error-code");
			});
		});

		describe("エッジケース", () => {
			it("メールアドレスが空文字列の場合", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"",
					2,
				);
				// 空文字列の場合は詳細メッセージが空になる
				expect(message).toBe("認証に失敗しました。以下をお試しください：");
			});

			it("試行回数が負の値の場合", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"test@example.com",
					-1,
				);
				expect(message).toBe(
					"メールアドレスまたはパスワードが正しくありません",
				);
			});

			it("試行回数が非常に大きい値の場合", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"test@example.com",
					1000,
				);
				expect(message).toContain("認証に失敗しました。以下をお試しください：");
			});

			it("特殊文字を含むメールアドレス", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"test+tag@example.co.uk",
					2,
				);
				expect(message).toContain("登録済みのメールアドレスか確認");
			});
		});

		describe("詳細エラーメッセージの内容", () => {
			it("すべての必要な要素が含まれている", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"test@example.com",
					2,
				);

				expect(message).toContain("1. パスワードが正しいか確認");
				expect(message).toContain("2. Caps Lockがオンになっていないか確認");
				expect(message).toContain("3. 登録済みのメールアドレスか確認");
			});

			it("無効なメールアドレス形式の場合のメッセージ", () => {
				const message = getAuthErrorMessage(
					AUTH_ERROR_CODES.INVALID_CREDENTIALS,
					"not-an-email",
					2,
				);

				expect(message).toContain("メールアドレスの形式が正しいか確認");
			});
		});
	});

	describe("型定義", () => {
		it("AuthResultインターフェースが正しく定義されている", () => {
			// 成功例
			const successResult: AuthResult = {
				success: true,
			};
			expect(successResult.success).toBe(true);

			// エラー例
			const errorResult: AuthResult = {
				success: false,
				error: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
				message: "エラーメッセージ",
			};
			expect(errorResult.success).toBe(false);
			expect(errorResult.error).toBe(AUTH_ERROR_CODES.INVALID_CREDENTIALS);
			expect(errorResult.message).toBe("エラーメッセージ");
		});

		it("AuthErrorCode型が正しく動作する", () => {
			const validCode: AuthErrorCode = AUTH_ERROR_CODES.INVALID_CREDENTIALS;
			expect(validCode).toBe("auth/invalid-credentials");
		});
	});
});
