import { formExampleSchema, type FormExampleValues } from "../form-example-schema";

describe("form-example-schema", () => {
	describe("formExampleSchema", () => {
		describe("正常系", () => {
			it("すべてのフィールドが有効な場合バリデーションが成功する", () => {
				const validData = {
					name: "山田太郎",
					email: "taro@example.com",
					age: 25,
					message: "テストメッセージです。この文章は10文字以上あります。",
					terms: true,
				};

				const result = formExampleSchema.safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data).toEqual(validData);
				}
			});

			it("ageがundefinedでもバリデーションが成功する", () => {
				const validData = {
					name: "山田太郎",
					email: "taro@example.com",
					message: "テストメッセージです。この文章は10文字以上あります。",
					terms: true,
				};

				const result = formExampleSchema.safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data).toEqual({
						...validData,
						age: undefined,
					});
				}
			});

			it("最小値/最大値の境界値でバリデーションが成功する", () => {
				const boundaryData = {
					name: "あ", // 1文字（最小値）
					email: "a@b.c", // 最短のメール形式
					age: 18, // 最小年齢
					message: "1234567890", // 10文字（最小値）
					terms: true,
				};

				const result = formExampleSchema.safeParse(boundaryData);

				expect(result.success).toBe(true);
			});

			it("最大値の境界値でバリデーションが成功する", () => {
				const maxBoundaryData = {
					name: "a".repeat(50), // 50文字（最大値）
					email: "test@example.com",
					age: 120, // 最大年齢
					message: "a".repeat(500), // 500文字（最大値）
					terms: true,
				};

				const result = formExampleSchema.safeParse(maxBoundaryData);

				expect(result.success).toBe(true);
			});
		});

		describe("異常系", () => {
			describe("name フィールド", () => {
				it("名前が空文字の場合エラーになる", () => {
					const invalidData = {
						name: "",
						email: "taro@example.com",
						age: 25,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"名前を入力してください"
						);
						expect(result.error.issues[0].path).toEqual(["name"]);
					}
				});

				it("名前が50文字を超える場合エラーになる", () => {
					const invalidData = {
						name: "a".repeat(51), // 51文字
						email: "taro@example.com",
						age: 25,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"名前は50文字以内で入力してください"
						);
					}
				});

				it("名前がundefinedの場合エラーになる", () => {
					const invalidData = {
						email: "taro@example.com",
						age: 25,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						const nameError = result.error.issues.find(
							(issue) => issue.path[0] === "name"
						);
						expect(nameError?.code).toBe("invalid_type");
					}
				});
			});

			describe("email フィールド", () => {
				it("メールアドレスが空文字の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "",
						age: 25,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"メールアドレスを入力してください"
						);
					}
				});

				it("メールアドレスの形式が無効な場合エラーになる", () => {
					const invalidEmails = [
						"invalid-email",
						"@example.com",
						"test@",
						"test@.com",
						"test.example.com",
						"test@example",
					];

					invalidEmails.forEach((email) => {
						const invalidData = {
							name: "山田太郎",
							email,
							age: 25,
							message: "テストメッセージです。この文章は10文字以上あります。",
							terms: true,
						};

						const result = formExampleSchema.safeParse(invalidData);

						expect(result.success).toBe(false);
						if (!result.success) {
							expect(result.error.issues[0].message).toBe(
								"有効なメールアドレスを入力してください"
							);
						}
					});
				});

				it("メールアドレスがundefinedの場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						age: 25,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						const emailError = result.error.issues.find(
							(issue) => issue.path[0] === "email"
						);
						expect(emailError?.code).toBe("too_small");
					}
				});
			});

			describe("age フィールド", () => {
				it("年齢が文字列の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: "25", // 文字列
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"年齢は数値で入力してください"
						);
					}
				});

				it("年齢が小数の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 25.5, // 小数
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"年齢は整数で入力してください"
						);
					}
				});

				it("年齢が負の数の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: -1,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"年齢は正の数で入力してください"
						);
					}
				});

				it("年齢が0の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 0,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"年齢は正の数で入力してください"
						);
					}
				});

				it("年齢が18歳未満の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 17,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"年齢は18歳以上で入力してください"
						);
					}
				});

				it("年齢が120歳を超える場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 121,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"年齢は120歳以下で入力してください"
						);
					}
				});
			});

			describe("message フィールド", () => {
				it("メッセージが10文字未満の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 25,
						message: "短い", // 2文字
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"メッセージは10文字以上で入力してください"
						);
					}
				});

				it("メッセージが500文字を超える場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 25,
						message: "a".repeat(501), // 501文字
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"メッセージは500文字以内で入力してください"
						);
					}
				});

				it("メッセージが空文字の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 25,
						message: "",
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"メッセージは10文字以上で入力してください"
						);
					}
				});

				it("メッセージがundefinedの場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 25,
						terms: true,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						const messageError = result.error.issues.find(
							(issue) => issue.path[0] === "message"
						);
						expect(messageError?.code).toBe("invalid_type");
					}
				});
			});

			describe("terms フィールド", () => {
				it("利用規約がfalseの場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 25,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: false,
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"利用規約に同意してください"
						);
						expect(result.error.issues[0].path).toEqual(["terms"]);
					}
				});

				it("利用規約がundefinedの場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 25,
						message: "テストメッセージです。この文章は10文字以上あります。",
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						const termsError = result.error.issues.find(
							(issue) => issue.path[0] === "terms"
						);
						expect(termsError?.code).toBe("invalid_type");
					}
				});

				it("利用規約が文字列の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						age: 25,
						message: "テストメッセージです。この文章は10文字以上あります。",
						terms: "true", // 文字列
					};

					const result = formExampleSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						const termsError = result.error.issues.find(
							(issue) => issue.path[0] === "terms"
						);
						expect(termsError?.code).toBe("invalid_type");
					}
				});
			});
		});

		describe("複合エラー", () => {
			it("複数のフィールドが無効な場合、すべてのエラーが報告される", () => {
				const invalidData = {
					name: "", // 無効
					email: "invalid-email", // 無効
					age: "invalid", // 無効
					message: "短い", // 無効
					terms: false, // 無効
				};

				const result = formExampleSchema.safeParse(invalidData);

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues).toHaveLength(5);

					const errorPaths = result.error.issues.map((issue) => issue.path[0]);
					expect(errorPaths).toEqual(
						expect.arrayContaining(["name", "email", "age", "message", "terms"])
					);
				}
			});

			it("一部のフィールドが有効でも無効なフィールドがあればエラーになる", () => {
				const invalidData = {
					name: "山田太郎", // 有効
					email: "taro@example.com", // 有効
					age: 25, // 有効
					message: "短い", // 無効
					terms: true, // 有効
				};

				const result = formExampleSchema.safeParse(invalidData);

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues).toHaveLength(1);
					expect(result.error.issues[0].path).toEqual(["message"]);
				}
			});
		});

		describe("型定義", () => {
			it("FormExampleValuesの型が正しく推論される", () => {
				// TypeScript の型チェックのテスト
				const validData: FormExampleValues = {
					name: "山田太郎",
					email: "taro@example.com",
					age: 25,
					message: "テストメッセージです。この文章は10文字以上あります。",
					terms: true,
				};

				// age が optional であることを確認
				const validDataWithoutAge: FormExampleValues = {
					name: "山田太郎",
					email: "taro@example.com",
					message: "テストメッセージです。この文章は10文字以上あります。",
					terms: true,
				};

				expect(validData.name).toBe("山田太郎");
				expect(validDataWithoutAge.age).toBeUndefined();
			});
		});

		describe("エッジケース", () => {
			it("日本語文字でバリデーションが成功する", () => {
				const japaneseData = {
					name: "田中　花子",
					email: "hanako@example.com",
					age: 30,
					message: "こんにちは。これは日本語でのテストメッセージです。よろしくお願いします。",
					terms: true,
				};

				const result = formExampleSchema.safeParse(japaneseData);

				expect(result.success).toBe(true);
			});

			it("特殊文字を含む名前でバリデーションが成功する", () => {
				const specialCharData = {
					name: "山田-太郎",
					email: "yamada-taro@example.com",
					age: 25,
					message: "特殊文字を含むテストです。これで10文字以上になりました。",
					terms: true,
				};

				const result = formExampleSchema.safeParse(specialCharData);

				expect(result.success).toBe(true);
			});

			it("絵文字を含むメッセージでバリデーションが成功する", () => {
				const emojiData = {
					name: "山田太郎",
					email: "taro@example.com",
					age: 25,
					message: "こんにちは！😊 これは絵文字を含むテストメッセージです。🎉",
					terms: true,
				};

				const result = formExampleSchema.safeParse(emojiData);

				expect(result.success).toBe(true);
			});

			it("空白を含む名前でバリデーションが成功する", () => {
				const spaceData = {
					name: "山田 太郎",
					email: "taro@example.com",
					age: 25,
					message: "空白を含む名前のテストです。この文章は10文字以上あります。",
					terms: true,
				};

				const result = formExampleSchema.safeParse(spaceData);

				expect(result.success).toBe(true);
			});
		});

		describe("年齢の詳細テスト", () => {
			it("年齢の境界値テスト", () => {
				// 18歳（最小値）
				const age18Data = {
					name: "山田太郎",
					email: "taro@example.com",
					age: 18,
					message: "18歳のテストです。この文章は10文字以上あります。",
					terms: true,
				};

				const result18 = formExampleSchema.safeParse(age18Data);
				expect(result18.success).toBe(true);

				// 120歳（最大値）
				const age120Data = {
					name: "山田太郎",
					email: "taro@example.com",
					age: 120,
					message: "120歳のテストです。この文章は10文字以上あります。",
					terms: true,
				};

				const result120 = formExampleSchema.safeParse(age120Data);
				expect(result120.success).toBe(true);
			});

			it("年齢の境界値エラーテスト", () => {
				// 17歳（最小値未満）
				const age17Data = {
					name: "山田太郎",
					email: "taro@example.com",
					age: 17,
					message: "17歳のテストです。この文章は10文字以上あります。",
					terms: true,
				};

				const result17 = formExampleSchema.safeParse(age17Data);
				expect(result17.success).toBe(false);

				// 121歳（最大値超過）
				const age121Data = {
					name: "山田太郎",
					email: "taro@example.com",
					age: 121,
					message: "121歳のテストです。この文章は10文字以上あります。",
					terms: true,
				};

				const result121 = formExampleSchema.safeParse(age121Data);
				expect(result121.success).toBe(false);
			});
		});
	});
});