import { type ContactFormValues, contactFormSchema } from "../contact-schema";

describe("contact-schema", () => {
	describe("contactFormSchema", () => {
		describe("正常系", () => {
			it("すべてのフィールドが有効な場合バリデーションが成功する", () => {
				const validData = {
					name: "山田太郎",
					email: "taro@example.com",
					phoneContact: "可" as const,
					phone: "03-1234-5678",
					message: "お問い合わせ内容です。この文章は10文字以上あります。",
				};

				const result = contactFormSchema.safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data).toEqual(validData);
				}
			});

			it("電話番号がundefinedでもバリデーションが成功する", () => {
				const validData = {
					name: "山田太郎",
					email: "taro@example.com",
					phoneContact: "不可" as const,
					message: "お問い合わせ内容です。この文章は10文字以上あります。",
				};

				const result = contactFormSchema.safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data).toEqual({
						...validData,
						phone: undefined,
					});
				}
			});

			it("電話番号の形式が複数パターンで成功する", () => {
				const phoneNumbers = [
					"03-1234-5678",
					"090-1234-5678",
					"0120-123-456",
					"06-1234-5678",
					"011-123-4567",
				];

				phoneNumbers.forEach((phone) => {
					const validData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone,
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(validData);

					expect(result.success).toBe(true);
				});
			});

			it("メッセージが10文字ちょうどでバリデーションが成功する", () => {
				const validData = {
					name: "山田太郎",
					email: "taro@example.com",
					phoneContact: "可" as const,
					phone: "03-1234-5678",
					message: "1234567890", // 10文字ちょうど
				};

				const result = contactFormSchema.safeParse(validData);

				expect(result.success).toBe(true);
			});
		});

		describe("異常系", () => {
			describe("name フィールド", () => {
				it("名前が空文字の場合エラーになる", () => {
					const invalidData = {
						name: "",
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone: "03-1234-5678",
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"お名前を入力してください",
						);
						expect(result.error.issues[0].path).toEqual(["name"]);
					}
				});

				it("名前がundefinedの場合エラーになる", () => {
					const invalidData = {
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone: "03-1234-5678",
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						const nameError = result.error.issues.find(
							(issue) => issue.path[0] === "name",
						);
						expect(nameError?.code).toBe("invalid_type");
					}
				});
			});

			describe("email フィールド", () => {
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
							phoneContact: "可" as const,
							phone: "03-1234-5678",
							message: "お問い合わせ内容です。この文章は10文字以上あります。",
						};

						const result = contactFormSchema.safeParse(invalidData);

						expect(result.success).toBe(false);
						if (!result.success) {
							expect(result.error.issues[0].message).toBe(
								"有効なメールアドレスを入力してください",
							);
							expect(result.error.issues[0].path).toEqual(["email"]);
						}
					});
				});

				it("メールアドレスが空文字の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "",
						phoneContact: "可" as const,
						phone: "03-1234-5678",
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"有効なメールアドレスを入力してください",
						);
					}
				});
			});

			describe("phoneContact フィールド", () => {
				it("phoneContactが無効な値の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "無効な値",
						phone: "03-1234-5678",
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"電話連絡の可否を選択してください",
						);
						expect(result.error.issues[0].path).toEqual(["phoneContact"]);
					}
				});

				it("phoneContactがundefinedの場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						phone: "03-1234-5678",
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						const phoneContactError = result.error.issues.find(
							(issue) => issue.path[0] === "phoneContact",
						);
						expect(phoneContactError?.message).toBe(
							"電話連絡の可否を選択してください",
						);
					}
				});
			});

			describe("phone フィールド", () => {
				it("電話番号の形式が無効な場合エラーになる", () => {
					const invalidPhones = [
						"12345678",
						"03-12345678",
						"0312345678",
						"03-123-45678",
						"abc-defg-hijk",
						"03-1234-567a",
						"1-2-3", // 短すぎる
						"12345-6789-0123", // 長すぎる
					];

					invalidPhones.forEach((phone) => {
						const invalidData = {
							name: "山田太郎",
							email: "taro@example.com",
							phoneContact: "可" as const,
							phone,
							message: "お問い合わせ内容です。この文章は10文字以上あります。",
						};

						const result = contactFormSchema.safeParse(invalidData);

						expect(result.success).toBe(
							false,
							`Phone "${phone}" should be invalid`,
						);
						if (!result.success) {
							const phoneError = result.error.issues.find(
								(issue) => issue.path[0] === "phone",
							);
							expect(phoneError?.message).toBe(
								"電話番号は「00-0000-0000」の形式で入力してください",
							);
						}
					});
				});

				it("電話番号が空文字の場合は有効として扱われる", () => {
					const validData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "不可" as const,
						phone: "",
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(validData);

					expect(result.success).toBe(true);
				});
			});

			describe("message フィールド", () => {
				it("メッセージが10文字未満の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone: "03-1234-5678",
						message: "短い", // 2文字
					};

					const result = contactFormSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"お問い合わせ内容は10文字以上で入力してください",
						);
						expect(result.error.issues[0].path).toEqual(["message"]);
					}
				});

				it("メッセージが空文字の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone: "03-1234-5678",
						message: "",
					};

					const result = contactFormSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"お問い合わせ内容は10文字以上で入力してください",
						);
					}
				});

				it("メッセージが9文字の場合エラーになる", () => {
					const invalidData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone: "03-1234-5678",
						message: "123456789", // 9文字
					};

					const result = contactFormSchema.safeParse(invalidData);

					expect(result.success).toBe(false);
					if (!result.success) {
						expect(result.error.issues[0].message).toBe(
							"お問い合わせ内容は10文字以上で入力してください",
						);
					}
				});
			});
		});

		describe("複合エラー", () => {
			it("複数のフィールドが無効な場合、すべてのエラーが報告される", () => {
				const invalidData = {
					name: "",
					email: "invalid-email",
					phoneContact: "無効" as const,
					phone: "invalid-phone",
					message: "短い",
				};

				const result = contactFormSchema.safeParse(invalidData);

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues).toHaveLength(4);

					const errorPaths = result.error.issues.map((issue) => issue.path[0]);
					expect(errorPaths).toEqual(
						expect.arrayContaining([
							"name",
							"email",
							"phoneContact",
							"message",
						]),
					);
				}
			});

			it("一部のフィールドが有効でも無効なフィールドがあればエラーになる", () => {
				const invalidData = {
					name: "山田太郎", // 有効
					email: "taro@example.com", // 有効
					phoneContact: "可" as const, // 有効
					phone: "invalid-phone", // 無効
					message: "お問い合わせ内容です。この文章は10文字以上あります。", // 有効
				};

				const result = contactFormSchema.safeParse(invalidData);

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues).toHaveLength(1);
					expect(result.error.issues[0].path).toEqual(["phone"]);
				}
			});
		});

		describe("型定義", () => {
			it("ContactFormValuesの型が正しく推論される", () => {
				// TypeScript の型チェックのテスト
				const validData: ContactFormValues = {
					name: "山田太郎",
					email: "taro@example.com",
					phoneContact: "可",
					phone: "03-1234-5678",
					message: "お問い合わせ内容です。この文章は10文字以上あります。",
				};

				// phone が optional であることを確認
				const validDataWithoutPhone: ContactFormValues = {
					name: "山田太郎",
					email: "taro@example.com",
					phoneContact: "不可",
					message: "お問い合わせ内容です。この文章は10文字以上あります。",
				};

				expect(validData.name).toBe("山田太郎");
				expect(validDataWithoutPhone.phone).toBeUndefined();
			});
		});

		describe("エッジケース", () => {
			it("すべてのフィールドが最小値で成功する", () => {
				const minimalData = {
					name: "あ", // 1文字
					email: "a@example.com", // 有効なメール形式
					phoneContact: "不可" as const,
					phone: undefined, // phoneContact が不可の場合は電話番号不要
					message: "1234567890", // 10文字ちょうど
				};

				const result = contactFormSchema.safeParse(minimalData);

				expect(result.success).toBe(true);
			});

			it("全角文字でもバリデーションが成功する", () => {
				const fullWidthData = {
					name: "山田　太郎",
					email: "yamada@example.com",
					phoneContact: "可" as const,
					phone: "０３-１２３４-５６７８", // 全角数字は無効として扱われるべき
					message: "お問い合わせ内容です。全角文字での入力テストです。",
				};

				const result = contactFormSchema.safeParse(fullWidthData);

				// 全角の電話番号は無効
				expect(result.success).toBe(false);
				if (!result.success) {
					const phoneError = result.error.issues.find(
						(issue) => issue.path[0] === "phone",
					);
					expect(phoneError?.message).toBe(
						"電話番号は「00-0000-0000」の形式で入力してください",
					);
				}
			});

			it("特殊文字を含む名前でバリデーションが成功する", () => {
				const specialCharData = {
					name: "山田-太郎",
					email: "yamada-taro@example.com",
					phoneContact: "可" as const,
					phone: "03-1234-5678",
					message: "お問い合わせ内容です。この文章は10文字以上あります。",
				};

				const result = contactFormSchema.safeParse(specialCharData);

				expect(result.success).toBe(true);
			});
		});

		describe("電話番号の詳細パターン", () => {
			it("市外局番の桁数パターンをテストする", () => {
				const phonePatterns = [
					"03-1234-5678", // 2桁市外局番
					"090-1234-5678", // 3桁市外局番
					"0120-123-456", // 4桁市外局番
				];

				phonePatterns.forEach((phone) => {
					const validData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone,
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(validData);

					expect(result.success).toBe(true);
				});
			});

			it("中間番号の桁数パターンをテストする", () => {
				const phonePatterns = [
					"03-12-5678", // 2桁中間番号
					"03-123-5678", // 3桁中間番号
					"03-1234-5678", // 4桁中間番号
				];

				phonePatterns.forEach((phone) => {
					const validData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone,
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(validData);

					expect(result.success).toBe(true);
				});
			});

			it("加入者番号の桁数パターンをテストする", () => {
				const phonePatterns = [
					"03-1234-567", // 3桁加入者番号
					"03-1234-5678", // 4桁加入者番号
				];

				phonePatterns.forEach((phone) => {
					const validData = {
						name: "山田太郎",
						email: "taro@example.com",
						phoneContact: "可" as const,
						phone,
						message: "お問い合わせ内容です。この文章は10文字以上あります。",
					};

					const result = contactFormSchema.safeParse(validData);

					expect(result.success).toBe(true);
				});
			});
		});
	});
});
