# Server Actions実装ガイド

## 📋 概要

このドキュメントは、プロジェクト内のServer Actionsの実装方法、アーキテクチャ、ベストプラクティスについての包括的なガイドです。

## 🏗️ 全体アーキテクチャ

### 3層構造設計

```
📂 /src/app/actions/          # 実際のServer Actions実装
📂 /src/lib/server/          # 共通ユーティリティ（safeAction等）
📂 /src/lib/validation/      # Zodバリデーションスキーマ
```

この構造により、**関心の分離**と**コードの再利用性**を実現しています。

## 📁 実装されているServer Actions

| ファイル | 用途 | 特徴 | 推奨レベル |
|---------|------|------|------------|
| `contact-form.ts` | お問い合わせフォーム | 基本的なフォーム処理 | 学習用 |
| `contact.ts` | お問い合わせフォーム | 改良版（統一API使用） | 実用的 |
| `form-example.ts` | サンプルフォーム | 学習・テスト用 | 参考用 |
| `profile.ts` | プロフィール管理 | **最も包括的な実装** | ⭐ 推奨 |

## 🔧 共通実装パターン

### 1. 統一されたエラーハンドリング

すべてのServer Actionsで`safeAction`関数を使用：

```typescript
export async function submitContactForm(formData: unknown) {
  return safeAction(async () => {
    // バリデーション
    const validData = await validateAction(contactFormSchema, formData);
    
    // ビジネスロジック
    await processContact(validData);
    
    // 成功レスポンス
    return { message: "お問い合わせを受け付けました" };
  });
}
```

**メリット**：
- 統一されたエラー形式
- Zodエラーの自動変換
- 型安全性の確保
- 一貫したエラーレスポンス

### 2. 段階的バリデーション

```typescript
// 1. Zodスキーマでの型安全バリデーション
const validatedData = await validateAction(profileUpdateSchema, formData);

// 2. 追加のビジネスルールチェック
if (newEmail === session.user.email) {
  throw new ActionError("現在のメールアドレスと同じです", "VALIDATION_ERROR");
}

// 3. データサニタイゼーション
const sanitizedData = {
  name: validatedData.name.trim(),
  bio: validatedData.bio?.trim() || undefined,
};
```

### 3. 認証統合パターン

```typescript
// 共通の認証チェックヘルパー
async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new ActionError("認証が必要です", "AUTHENTICATION_ERROR");
  }
  return session;
}

// 各Server Actionで使用
export async function updateProfile(formData: unknown) {
  return safeAction(async () => {
    const session = await requireAuth(); // 認証チェック
    // 処理続行...
  });
}
```

## 🛡️ セキュリティ対策

### XSS防止

```typescript
// HTMLタグを含む入力を検出・拒否
const validateNoHtmlTags = (value: string | undefined) => {
  if (!value || value.trim() === "") return true;
  return !value.includes("<"); // <文字を含む場合すべて拒否
};

// スキーマファクトリーでの自動適用
const createSafeTextSchema = (fieldName: string, maxLength: number = 100) => {
  return z.string()
    .max(maxLength, `${fieldName}は${maxLength}文字以内で入力してください`)
    .refine(validateNoHtmlTags, {
      message: "HTMLタグを含めることはできません",
    });
};
```

### ファイルアップロードセキュリティ

```typescript
// ファイル形式チェック
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
if (!allowedTypes.includes(file.type)) {
  throw new ActionError(
    "JPEG、PNG、WebP形式の画像のみアップロード可能です",
    "VALIDATION_ERROR"
  );
}

// ファイルサイズ制限
const maxSize = 5 * 1024 * 1024; // 5MB
if (file.size > maxSize) {
  throw new ActionError(
    "ファイルサイズは5MB以下にしてください",
    "VALIDATION_ERROR"
  );
}
```

### CSRF保護

- middlewareレベルでのCSRF保護実装
- Server Actions は自動的にCSRF保護が適用される
- 追加の認証チェックでセキュリティを強化

## 🚀 パフォーマンス最適化

### 自動キャッシュ無効化

```typescript
// キャッシュタグの定数管理
const CACHE_TAGS = {
  PROFILE: (userId: string) => `profile-${userId}`,
  USER_PROFILES: "user-profiles",
} as const;

// 処理後の自動キャッシュクリア
if (process.env.NODE_ENV !== "test") {
  revalidateTag(CACHE_TAGS.PROFILE(userId));
  revalidateTag(CACHE_TAGS.USER_PROFILES);
  revalidatePath("/profile");
  revalidatePath("/(app)/profile", "page");
}
```

### テスト環境での最適化

テスト実行時のパフォーマンス向上のため、revalidationをスキップ：

```typescript
// テスト環境では revalidation をスキップ
if (process.env.NODE_ENV !== "test") {
  revalidateTag(CACHE_TAGS.PROFILE(userId));
  revalidatePath("/profile");
}
```

## 🧪 テスト戦略

### 包括的なテストカバレッジ

- ✅ **正常系テスト**: 期待される動作の確認
- ✅ **バリデーションエラーテスト**: 無効な入力データの処理
- ✅ **認証エラーテスト**: 未認証ユーザーの処理  
- ✅ **境界値テスト**: 文字数制限、ファイルサイズ等
- ✅ **セキュリティテスト**: XSS、ファイル形式等
- ✅ **統合テスト**: 複数のServer Actionsの連携

### パラメータ化テスト例

```typescript
// 共通のエラーケースを効率的にテスト
const actions = [
  { name: "getProfile", fn: () => getProfile() },
  { name: "updateProfile", fn: () => updateProfile(validData) },
  // ...
];

it.each(actions)(
  "$name: セッションがnullの場合認証エラー",
  async ({ fn }) => {
    (auth as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const result = await fn();
    expect(result.success).toBe(false);
    expect(result.error?.code).toMatch(/AUTHENTICATION_ERROR/);
  }
);
```

## 📊 型安全性とDRY原則

### スキーマファクトリーパターン

```typescript
// 再利用可能なバリデーションヘルパー
const createSafeTextSchema = (
  fieldName: string,
  minLength: number = 0,
  maxLength: number = 100,
  required: boolean = false,
) => {
  let schema = required
    ? z.string().min(1, { message: getRequiredMessage(fieldName) })
    : z.string().optional();

  // 文字数制限とHTMLタグ検証を自動適用
  return schema
    .max(maxLength, `${fieldName}は${maxLength}文字以内で入力してください`)
    .refine(validateNoHtmlTags, {
      message: "HTMLタグを含めることはできません",
    });
};

// 使用例
const displayNameSchema = createSafeTextSchema("表示名", 0, 50);
const bioSchema = createSafeTextSchema("自己紹介", 0, 500);
```

### 型推論の活用

```typescript
// スキーマから型を自動生成
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;

// 型安全なデフォルト値設定
export const profileDefaults = formDefaults(profileUpdateSchema, {
  emailVisible: false,
  profileVisible: true,
});
```

## ⭐ ベストプラクティス集

### profile.tsから学ぶ推奨パターン

最も包括的な`profile.ts`の実装から抽出したベストプラクティス：

1. **統一された認証ヘルパー関数**
   ```typescript
   async function requireAuth() {
     const session = await auth();
     if (!session?.user?.id) {
       throw new ActionError("認証が必要です", "AUTHENTICATION_ERROR");
     }
     return { ...session, user: { ...session.user, id: session.user.id } };
   }
   ```

2. **キャッシュタグの定数管理**
   ```typescript
   const CACHE_TAGS = {
     PROFILE: (userId: string) => `profile-${userId}`,
     USER_PROFILES: "user-profiles",
   } as const;
   ```

3. **段階的データ処理**
   - バリデーション → ビジネスルールチェック → サニタイゼーション → 処理

4. **包括的なセキュリティチェック**
   - XSS防止、ファイル形式・サイズ制限、認証確認

5. **テスト環境での最適化**
   - 不要なrevalidationのスキップ

6. **詳細なJSDocコメント**
   - 引数、戻り値、用途の明確な説明

## 🔄 実装手順

### 新しいServer Actionの作成手順

1. **スキーマ定義** (`/src/lib/validation/`)
   ```typescript
   export const newFeatureSchema = z.object({
     // フィールド定義
   });
   ```

2. **Server Action実装** (`/src/app/actions/`)
   ```typescript
   export async function newFeatureAction(formData: unknown) {
     return safeAction(async () => {
       const session = await requireAuth();
       const validData = await validateAction(newFeatureSchema, formData);
       // ビジネスロジック
       return { message: "処理完了" };
     });
   }
   ```

3. **テスト作成** (`/src/app/actions/__tests__/`)
   ```typescript
   describe("newFeatureAction", () => {
     it("正常系テスト", async () => {
       // テスト実装
     });
   });
   ```

4. **型定義エクスポート**
   ```typescript
   export type NewFeatureValues = z.infer<typeof newFeatureSchema>;
   ```

## 🔍 トラブルシューティング

### よくある問題と解決法

1. **バリデーションエラーが正しく表示されない**
   - `formatZodErrors`関数の使用を確認
   - エラーメッセージの日本語化を確認

2. **認証エラーが発生する**
   - `requireAuth`関数の実装を確認
   - セッション状態の確認

3. **キャッシュが更新されない**
   - `revalidateTag`と`revalidatePath`の使用を確認
   - キャッシュタグの命名規則を確認

4. **テストが失敗する**
   - モック設定の確認
   - 環境変数の設定確認

## 📈 メトリクスと監視

### パフォーマンス指標

- Server Action実行時間: < 2秒
- バリデーション処理時間: < 100ms
- キャッシュヒット率: > 80%

### エラー監視

- バリデーションエラー率: < 5%
- 認証エラー率: < 1%
- システムエラー率: < 0.1%

## 🔗 関連ドキュメント

- [認証システムガイド](./authentication-system.md)
- [プロフィールデータストレージガイド](./profile-data-storage-guide.md)
- [Next.js 15 Server Actions公式ドキュメント](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

**最終更新**: 2025-01-18  
**バージョン**: 1.0  
**作成者**: Claude Code AI Assistant