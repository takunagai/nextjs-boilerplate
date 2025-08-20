# Zod v3 から v4へのアップデート手順と注意点

Zodは、TypeScriptを使用したスキーマ検証ライブラリとして広く利用されています。2025年4月、Zod v4のベータ版がリリースされました。これには、パフォーマンスの向上、バンドルサイズの削減、そして一部のAPIの変更が含まれています。この記事では、既存のNext.jsプロジェクトをZod v3からv4に移行する手順を解説します。

## 目次

1. [Zod v4の主な変更点](#zod-v4の主な変更点)
2. [移行手順](#移行手順)
3. [ステップ1: パッケージの更新](#ステップ1-パッケージの更新)
4. [ステップ2: エラーメッセージの修正](#ステップ2-エラーメッセージの修正)
5. [ステップ3: ZodErrorの処理更新](#ステップ3-zoderrorの処理更新)
6. [ステップ4: 型チェックとテスト](#ステップ4-型チェックとテスト)
7. [実際の修正例](#実際の修正例)
8. [まとめ](#まとめ)

## Zod v4の主な変更点

Zod v4では、いくつかの重要な変更が行われています：

1. **エラーメッセージのカスタマイズ方法**
   - `message`パラメータは`error`にリネーム（`message`は非推奨に）
   - `invalid_type_error`および`required_error`パラメータが削除
   - `errorMap`が`error`にリネーム

2. **ZodError APIの変更**
   - `errors`プロパティが`issues`にリネーム
   - エラーフォーマットの更新

3. **オブジェクト関連メソッドの変更**
   - `.strict()` → `z.strictObject()`
   - `.passthrough()` → `z.looseObject()`
   - `.nonstrict()`と`.deepPartial()`が削除

4. **その他の改善**
   - パフォーマンスの向上
   - バンドルサイズの削減
   - 型推論の改善

## 移行手順

Zod v3からv4への移行は比較的シンプルですが、いくつかのAPIの変更に対応する必要があります。以下に、ステップバイステップの移行手順を示します。

## ステップ1: パッケージの更新

まず、Zodパッケージを最新のベータ版に更新します。

```bash
npm install zod@4.0.0-beta.latest
```

## ステップ2: エラーメッセージの修正

Zod v4では、エラーメッセージのカスタマイズ方法が変更されています。以下のように修正します：

### 変更前（v3）

```typescript
const schema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  type: z.enum(["個人", "法人"], { required_error: "種別を選択してください" }),
  age: z.number({ invalid_type_error: "年齢は数値で入力してください" })
});
```

### 変更後（v4）

```typescript
const schema = z.object({
  name: z.string().min(1, { error: "名前を入力してください" }),
  email: z.string().email({ error: "有効なメールアドレスを入力してください" }),
  type: z.enum(["個人", "法人"], { 
    error: (issue) => issue.input === undefined 
      ? "種別を選択してください" 
      : "有効な選択肢を選んでください" 
  }),
  age: z.number({ 
    error: (issue) => issue.input === undefined 
      ? "年齢を入力してください" 
      : "年齢は数値で入力してください" 
  })
});
```

`error`パラメータでは、単純な文字列だけでなく、エラー内容に応じて動的にメッセージを返す関数も指定できます。

## ステップ3: ZodErrorの処理更新

Zod v4では、`ZodError`の`errors`プロパティが`issues`に変更されています。エラー処理コードを次のように更新します：

### 変更前（v3）

```typescript
try {
  schema.parse(data);
} catch (error) {
  if (error instanceof z.ZodError) {
    const fieldErrors = error.errors.reduce((acc, err) => {
      const path = err.path.join('.');
      acc[path] = err.message;
      return acc;
    }, {});
    // エラー処理
  }
}
```

### 変更後（v4）

```typescript
try {
  schema.parse(data);
} catch (error) {
  if (error instanceof z.ZodError) {
    const fieldErrors = error.issues.reduce((acc, err) => {
      const path = err.path.join('.');
      acc[path] = err.message;
      return acc;
    }, {});
    // エラー処理
  }
}
```

## ステップ4: 型チェックとテスト

修正が完了したら、型チェックとテストを実行して問題がないか確認します：

```bash
# 型チェック
tsc --noEmit

# テスト実行
npm test
```

型エラーや実行時エラーがある場合は、関連するコードを適宜修正します。

## 実際の修正例

### コンタクトフォームのバリデーションスキーマ修正例

#### 変更前（v3）

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  phoneContact: z.enum(["可", "不可"], {
    required_error: "電話連絡の可否を選択してください",
  }),
  phone: z.string().optional().refine(
    (val) => {
      if (val === undefined) return true;
      return /^\d{2,4}-\d{2,4}-\d{3,4}$/.test(val);
    },
    {
      message: "電話番号は「00-0000-0000」の形式で入力してください",
    }
  ),
  message: z.string().min(10, {
    message: "お問い合わせ内容は10文字以上で入力してください",
  }),
});
```

#### 変更後（v4）

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(1, {
    error: "お名前を入力してください",
  }),
  email: z.string().email({
    error: "有効なメールアドレスを入力してください",
  }),
  phoneContact: z.enum(["可", "不可"], {
    error: (issue) => issue.input === undefined 
      ? "電話連絡の可否を選択してください" 
      : "有効な選択肢を選んでください",
  }),
  phone: z.string().optional().refine(
    (val) => {
      if (val === undefined) return true;
      return /^\d{2,4}-\d{2,4}-\d{3,4}$/.test(val);
    },
    {
      error: "電話番号は「00-0000-0000」の形式で入力してください",
    }
  ),
  message: z.string().min(10, {
    error: "お問い合わせ内容は10文字以上で入力してください",
  }),
});
```

### ZodError処理の修正例

#### 変更前（v3）

```typescript
export function formatZodErrors(error: z.ZodError): FieldErrors {
  return error.errors.reduce((acc, curr) => {
    const path = curr.path.join('.');
    acc[path] = curr.message;
    return acc;
  }, {} as FieldErrors);
}
```

#### 変更後（v4）

```typescript
export function formatZodErrors(error: z.ZodError): FieldErrors {
  return error.issues.reduce((acc, curr) => {
    const path = curr.path.join('.');
    acc[path] = curr.message;
    return acc;
  }, {} as FieldErrors);
}
```

## まとめ

Zod v4への移行は、エラーメッセージのカスタマイズ方法とZodErrorの処理を中心に変更が必要です。これらの変更をプロジェクト全体に適用することで、Zodの最新機能を活用し、より効率的なバリデーション処理を実現できます。

主な変更点をまとめると：

1. `message` → `error`
2. `required_error` → 条件付き`error`関数
3. `invalid_type_error` → 条件付き`error`関数
4. `ZodError.errors` → `ZodError.issues`

Zod v4はまだベータ版であり、今後も変更される可能性があるため、公式ドキュメントを定期的に確認することをお勧めします。

## 参考リンク

- [Introducing Zod 4 beta | Zod Docs](https://v4.zod.dev/v4)
- [Migration guide | Zod Docs](https://v4.zod.dev/v4/changelog)
