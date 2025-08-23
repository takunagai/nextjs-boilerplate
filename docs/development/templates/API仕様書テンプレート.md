# API仕様書テンプレート

*作成日: 2025年8月23日*  
*対象: Next.js App Router APIルート*  
*バージョン: 1.0.0*

## 🎯 このテンプレートについて

このテンプレートは、Next.js App RouterのAPIルートの仕様書を統一的に作成するためのものです。新しいAPIエンドポイントを追加する際は、このテンプレートに従って仕様書を作成してください。

## 📋 API仕様書フォーマット

### エンドポイント名： [API名]

---

#### 📊 基本情報

| 項目 | 内容 |
|------|------|
| **エンドポイント** | `/api/[path]` |
| **HTTPメソッド** | `GET` \| `POST` \| `PUT` \| `DELETE` \| `PATCH` |
| **認証** | 必要 \| 不要 |
| **レート制限** | あり（X回/分） \| なし |
| **実装ファイル** | `src/app/api/[path]/route.ts` |
| **作成日** | YYYY-MM-DD |
| **最終更新** | YYYY-MM-DD |

#### 📝 概要

このAPIの目的と機能を簡潔に説明します。

#### 🔐 認証・認可

**認証方式**: JWT Token / Session Cookie / API Key / なし

**必要な権限**:
- `permission1`: 説明
- `permission2`: 説明

**認証ヘッダー**:
```http
Authorization: Bearer <JWT_TOKEN>
```

#### 📥 リクエスト仕様

##### URLパラメータ

| パラメータ | 型 | 必須 | 説明 | 例 |
|------------|----|----- |----- |--- |
| `id` | `string` | ✅ | リソースID | `user-123` |
| `category` | `string` | ❌ | カテゴリ | `premium` |

##### クエリパラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 | 例 |
|------------|----|----- |-----------|-----|--- |
| `limit` | `number` | ❌ | `10` | 取得件数 | `20` |
| `offset` | `number` | ❌ | `0` | オフセット | `10` |
| `search` | `string` | ❌ | - | 検索キーワード | `next.js` |

##### リクエストボディ（POST/PUT/PATCH）

**Content-Type**: `application/json`

```typescript
interface RequestBody {
  name: string;                    // 必須: ユーザー名
  email: string;                   // 必須: メールアドレス
  age?: number;                    // 任意: 年齢
  preferences: {
    theme: 'light' | 'dark';       // テーマ設定
    notifications: boolean;        // 通知設定
  };
  tags?: string[];                 // 任意: タグ配列
}
```

##### リクエスト例

```http
POST /api/users HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  \"name\": \"田中太郎\",
  \"email\": \"tanaka@example.com\",
  \"age\": 30,
  \"preferences\": {
    \"theme\": \"dark\",
    \"notifications\": true
  },
  \"tags\": [\"developer\", \"next.js\"]
}
```

#### 📤 レスポンス仕様

##### 成功レスポンス

**HTTPステータス**: `200 OK` | `201 Created` | `204 No Content`

**Content-Type**: `application/json`

```typescript
interface SuccessResponse {
  data: {
    id: string;                    // ユーザーID
    name: string;                  // ユーザー名
    email: string;                 // メールアドレス
    createdAt: string;             // 作成日時 (ISO 8601)
    updatedAt: string;             // 更新日時 (ISO 8601)
  };
  message: string;                 // 成功メッセージ
  timestamp: string;               // レスポンス時刻 (ISO 8601)
}
```

##### エラーレスポンス

**HTTPステータス**: `400` | `401` | `403` | `404` | `422` | `429` | `500`

```typescript
interface ErrorResponse {
  error: {
    code: string;                  // エラーコード
    message: string;               // エラーメッセージ
    details?: string;              // 詳細情報
  };
  timestamp: string;               // エラー発生時刻 (ISO 8601)
  path: string;                    // リクエストパス
}
```

##### レスポンス例

**成功時 (200 OK)**:
```json
{
  \"data\": {
    \"id\": \"user_2Nkj8fKz9mQwR1vB\",
    \"name\": \"田中太郎\", 
    \"email\": \"tanaka@example.com\",
    \"createdAt\": \"2025-08-23T10:30:00.000Z\",
    \"updatedAt\": \"2025-08-23T10:30:00.000Z\"
  },
  \"message\": \"ユーザーが正常に作成されました\",
  \"timestamp\": \"2025-08-23T10:30:00.123Z\"
}
```

**エラー時 (400 Bad Request)**:
```json
{
  \"error\": {
    \"code\": \"VALIDATION_ERROR\",
    \"message\": \"バリデーションエラーが発生しました\",
    \"details\": \"emailは有効なメールアドレスである必要があります\"
  },
  \"timestamp\": \"2025-08-23T10:30:00.123Z\",
  \"path\": \"/api/users\"
}
```

#### 🚫 エラーコード一覧

| HTTPステータス | エラーコード | 説明 | 対処方法 |
|---------------|-------------|------|----------|
| `400` | `VALIDATION_ERROR` | リクエストデータが不正 | リクエスト形式を確認 |
| `401` | `UNAUTHORIZED` | 認証が必要 | トークンを確認 |
| `403` | `FORBIDDEN` | アクセス権限なし | 権限を確認 |
| `404` | `NOT_FOUND` | リソースが存在しない | URLを確認 |
| `422` | `UNPROCESSABLE_ENTITY` | データ処理不可 | データ内容を確認 |
| `429` | `RATE_LIMIT_EXCEEDED` | レート制限超過 | しばらく待ってから再実行 |
| `500` | `INTERNAL_SERVER_ERROR` | サーバー内部エラー | 管理者に連絡 |

#### 🧪 テスト

##### 単体テストファイル

```typescript
// src/app/api/[path]/__tests__/route.test.ts
import { GET, POST } from '../route';
import { NextRequest } from 'next/server';

describe('/api/[path]', () => {
  describe('POST', () => {
    it('should create a new resource successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/[path]', {
        method: 'POST',
        body: JSON.stringify({
          name: 'テストユーザー',
          email: 'test@example.com'
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toBe('正常に作成されました');
    });
  });
});
```

##### E2Eテスト例

```typescript
// tests/api/[path].spec.ts
import { test, expect } from '@playwright/test';

test.describe('/api/[path] API', () => {
  test('should return user data with valid request', async ({ request }) => {
    const response = await request.post('/api/[path]', {
      data: {
        name: 'テストユーザー',
        email: 'test@example.com'
      },
      headers: {
        'Authorization': 'Bearer valid-token'
      }
    });

    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data.message).toBe('正常に作成されました');
  });
});
```

#### 📈 パフォーマンス

| メトリクス | 目標値 | 現在値 | 測定方法 |
|-----------|--------|-------|----------|
| **レスポンス時間** | < 200ms | 150ms | Lighthouse CI |
| **スループット** | > 1000 req/s | 1200 req/s | 負荷テスト |
| **エラー率** | < 0.1% | 0.05% | APM監視 |

#### 🔄 変更履歴

| バージョン | 日付 | 変更内容 | 担当者 |
|-----------|------|----------|--------|
| 1.0.0 | 2025-08-23 | 初版作成 | 開発チーム |
| 1.0.1 | YYYY-MM-DD | レート制限追加 | 担当者名 |

#### 📚 関連ドキュメント

- [認証システム仕様書](../reference/authentication-system.md)
- [エラーハンドリングガイド](../guides/error-handling.md)
- [API設計ガイドライン](#api設計ガイドライン)

---

## 📖 実装サンプル

### 基本的なGET APIの実装

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createResponse, createError } from '@/lib/server';
import { auth } from '@/lib/auth';
import { z } from 'zod';

// クエリパラメータのバリデーションスキーマ
const querySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(10),
  offset: z.coerce.number().min(0).default(0),
  search: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // 認証チェック
    const session = await auth();
    if (!session) {
      return createError('認証が必要です', 401, { code: 'UNAUTHORIZED' });
    }

    // クエリパラメータの解析とバリデーション
    const { searchParams } = new URL(request.url);
    const query = querySchema.parse({
      limit: searchParams.get('limit'),
      offset: searchParams.get('offset'), 
      search: searchParams.get('search'),
    });

    // ビジネスロジック
    const users = await getUserList(query);
    
    // 成功レスポンス
    return createResponse(users, {
      message: 'ユーザー一覧を取得しました',
    });

  } catch (error) {
    // エラーハンドリング
    if (error instanceof z.ZodError) {
      return createError('バリデーションエラー', 400, {
        code: 'VALIDATION_ERROR',
        details: error.errors,
      });
    }
    
    console.error('GET /api/users error:', error);
    return createError('内部サーバーエラー', 500, {
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
}

async function getUserList(query: z.infer<typeof querySchema>) {
  // データベースアクセスなどの実装
  // 実際の実装では、Prisma、Drizzle ORM等を使用
  return {
    users: [],
    total: 0,
    ...query,
  };
}
```

### POSTリクエストの実装

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createResponse, createError } from '@/lib/server';
import { z } from 'zod';

// リクエストボディのバリデーションスキーマ
const createUserSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email format'),
  age: z.number().min(0).max(150).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // リクエストボディの解析
    const body = await request.json();
    
    // バリデーション
    const validatedData = createUserSchema.parse(body);
    
    // ビジネスロジック
    const newUser = await createUser(validatedData);
    
    // 成功レスポンス
    return createResponse(newUser, {
      status: 201,
      message: 'ユーザーが正常に作成されました',
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return createError('バリデーションエラー', 400, {
        code: 'VALIDATION_ERROR',
        details: error.errors,
      });
    }
    
    console.error('POST /api/users error:', error);
    return createError('内部サーバーエラー', 500);
  }
}

async function createUser(data: z.infer<typeof createUserSchema>) {
  // ユーザー作成ロジック
  return {
    id: 'user_generated_id',
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
```

---

## 🎨 カスタマイズ方法

### プロジェクト固有の調整

1. **エラーコードの追加**: プロジェクトで使用する独自のエラーコードを追加
2. **認証方式の変更**: JWT以外の認証方式を使用する場合の記述変更
3. **レスポンス形式の調整**: プロジェクトのAPI設計に合わせてレスポンス形式を調整

### セクションの削除・追加

- **不要なセクション**: プロジェクトで使用しないセクションは削除可能
- **追加セクション**: WebSocket、GraphQL等の仕様が必要な場合は追加

---

*このテンプレートは、Next.jsボイラープレートプロジェクトの API仕様書作成効率化とドキュメント品質向上を目的として作成されました。*

*使用時は、プロジェクトの要件に応じて適宜カスタマイズしてください。*