# Next.js 15 に Auth.js (NextAuth v5) で認証システムを実装

## はじめに

Next.js 15とApp Routerの登場により、Webアプリケーションの構築方法は大きく変わりました。特に認証システムの実装は、以前のPages Routerとは異なるアプローチが必要になっています。この記事では、Next.js 15のApp Routerアーキテクチャに沿って、Auth.js (NextAuth v5) を使用したJWTベースの認証システムの実装方法を解説します。

この記事は初級者から中級者を対象としており、Next.jsの基本的な知識があることを前提としています。

## 目次

1. [認証システムの概要](#認証システムの概要)
2. [実装するコンポーネントと機能](#実装するコンポーネントと機能)
3. [実装のポイント](#実装のポイント)
4. [認証フロー](#認証フロー)
5. [セキュリティ対策](#セキュリティ対策)
6. [エラーハンドリング](#エラーハンドリング)
7. [まとめと次のステップ](#まとめと次のステップ)

## 認証システムの概要

今回実装する認証システムは、以下の特徴を持っています：

- **JWTベースの認証**: Auth.js (NextAuth v5) を使用したトークンベースの認証
- **保護されたルート**: 認証されていないユーザーのアクセスを制限
- **ロールベースのアクセス制御**: 管理者と一般ユーザーで異なる権限を持つ
- **セキュリティ対策**: CSRFプロテクション、レート制限、セキュリティヘッダーの実装
- **ユーザーフレンドリーなエラーハンドリング**: わかりやすいエラーメッセージと処理

## 実装するコンポーネントと機能

今回の実装では、以下のコンポーネントと機能を作成します：

| コンポーネント/ファイル | 説明 |
|------------------------|------|
| `src/lib/auth/index.ts` | Auth.js (NextAuth v5) の構成と型定義 |
| `src/lib/auth/types.ts` | 認証関連の共通型定義 |
| `src/lib/auth/auth-errors.ts` | 認証エラーコードとメッセージの管理 |
| `src/lib/auth/test-data.ts` | テスト用のユーザーデータ |
| `src/hooks/useAuth.tsx` | 認証状態管理のカスタムフック |
| `src/hooks/useLoginForm.tsx` | ログインフォーム管理のカスタムフック |
| `src/components/auth/login-form.tsx` | ログインフォームコンポーネント |
| `src/components/auth/login-form-error.tsx` | ログインエラー表示コンポーネント |
| `src/components/auth/user-auth-menu.tsx` | ユーザー認証メニューコンポーネント |
| `src/middleware.ts` | 認証ミドルウェアとセキュリティ対策 |
| `src/app/api/auth/[...nextauth]/route.ts` | Auth.js APIルート |
| `src/app/api/auth/register/route.ts` | ユーザー登録APIルート |
| `src/app/auth/login/page.tsx` | ログインページ |
| `src/app/auth/register/page.tsx` | 登録ページ |

## 実装のポイント

### 1. Next.js 15のApp Routerアーキテクチャに沿った設計

Next.js 15のApp Routerでは、以下のポイントを考慮して設計する必要があります：

- **サーバーコンポーネントとクライアントコンポーネントの使い分け**
  - ページコンポーネント（例：`login/page.tsx`）はサーバーコンポーネントとして実装
  - インタラクティブなコンポーネント（例：`login-form.tsx`）はクライアントコンポーネントとして実装

```tsx
// src/app/auth/login/page.tsx (サーバーコンポーネント)
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ログイン",
	description: "アカウントにログインしてサービスをご利用ください。",
};

export default function LoginPage() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">ログイン</h1>
					<p className="text-sm text-muted-foreground">
						アカウントにログインしてください
					</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
```

```tsx
// src/components/auth/login-form.tsx (クライアントコンポーネント)
"use client"; // クライアントコンポーネントの宣言

import { LoginFormError } from "@/components/auth/login-form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LoginForm() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const { form, isLoading, error, handleLogin, resetError } = useLoginForm();

	// フォームロジック...

	return (
		<Card className="mx-auto w-full max-w-md">
			{/* フォームコンテンツ */}
		</Card>
	);
}
```

### 2. Auth.js (NextAuth v5) でJWTベースの認証システムを実装

Auth.js (NextAuth v5) では、構成ファイルの書き方が大きく変わりました。App Routerでの実装方法は以下のとおりです：

```typescript
// src/lib/auth/index.ts
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByCredentials } from "./test-data";
import { CommonUserAttributes } from "./types";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // ユーザー認証処理
        const user = await getUserByCredentials({
          email: credentials.email,
          password: credentials.password,
        });

        return user;
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // JWTコールバック処理
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // セッションコールバック処理
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
};

import NextAuth from "next-auth";
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
```

```typescript
// src/lib/auth/types.ts
export interface CommonUserAttributes {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}
```

### 3. 認証APIとルート保護のミドルウェアの実装

Next.js 15でのミドルウェアを使った認証保護は、従来とは異なるパターンになります：

```typescript
// src/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// CSRF対策の実装
function validateCsrf(req: NextRequest): boolean {
  // 実装省略...
}

// レート制限の実装
function applyRateLimit(req: NextRequest): boolean {
  // 実装省略...
}

// セキュリティヘッダーの設定
function setSecurityHeaders(response: NextResponse): void {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
}

// NextAuth v5 の middleware export
export default auth;

// NextAuth ミドルウェア後に追加のセキュリティチェックを適用
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  setSecurityHeaders(response);
  
  if (!validateCsrf(request)) {
    return new NextResponse(JSON.stringify({ error: 'CSRF検証に失敗しました' }), { 
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (!applyRateLimit(request)) {
    return new NextResponse(JSON.stringify({ error: 'レート制限を超過しました' }), { 
      status: 429,
      headers: { 
        'Content-Type': 'application/json',
        'Retry-After': '10'
      }
    });
  }
  
  return response;
}

// ミドルウェアを適用するパス
export const config = {
  matcher: [
    '/api/:path*',
    '/auth/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};
```

### 4. ログイン失敗時のユーザーフレンドリーな処理

エラーハンドリングを一元管理し、ユーザーに分かりやすいメッセージを表示します：

```typescript
// src/lib/auth/auth-errors.ts
export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type AuthErrorCode = typeof AUTH_ERROR_CODES[keyof typeof AUTH_ERROR_CODES];

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

// 認証エラーメッセージの管理
export const getAuthErrorMessage = (code: AuthErrorCode): string => {
  switch (code) {
    case AUTH_ERROR_CODES.INVALID_CREDENTIALS:
      return 'メールアドレスまたはパスワードが正しくありません';
    case AUTH_ERROR_CODES.USER_NOT_FOUND:
      return 'アカウントが見つかりません';
    case AUTH_ERROR_CODES.INVALID_PASSWORD:
      return 'パスワードが正しくありません';
    case AUTH_ERROR_CODES.TOO_MANY_ATTEMPTS:
      return 'ログイン試行回数が多すぎます。しばらく時間をおいてから再試行してください';
    case AUTH_ERROR_CODES.SERVER_ERROR:
      return 'サーバーエラーが発生しました。しばらく時間をおいてから再試行してください';
    case AUTH_ERROR_CODES.UNKNOWN_ERROR:
    default:
      return '不明なエラーが発生しました';
  }
};

// エラーメッセージの生成
export const createAuthError = (code: AuthErrorCode): AuthError => ({
  code,
  message: getAuthErrorMessage(code),
});
```

```tsx
// src/components/auth/login-form-error.tsx
import { FaCircleExclamation } from "react-icons/fa6";
import { AuthError } from "@/lib/auth/auth-errors";

interface LoginFormErrorProps {
  error: AuthError;
}

export function LoginFormError({ error }: LoginFormErrorProps) {
  return (
    <div className="bg-destructive/15 text-destructive rounded-md p-3 flex items-start space-x-2">
      <FaCircleExclamation className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium">{error.message}</h3>
      </div>
    </div>
  );
}
```

## 認証フロー

以下は本実装の認証フローを図式化したものです：

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  ログイン画面    │────▶│ ログイン処理     │────▶│  認証成功       │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └────────┬────────┘
                               │                        │
                               ▼                        ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │                 │     │                 │
                        │  認証エラー      │     │ ダッシュボード   │
                        │                 │     │                 │
                        └─────────────────┘     └─────────────────┘
```

### ログイン処理のシーケンス図

```
┌─────────┐          ┌───────────┐          ┌───────┐          ┌────────┐
│ブラウザ   │          │useLoginForm│          │useAuth│          │Auth.js │
└────┬────┘          └─────┬─────┘          └───┬───┘          └────┬───┘
     │                     │                    │                    │
     │ フォーム送信         │                    │                    │
     │────────────────────▶│                    │                    │
     │                     │                    │                    │
     │                     │ handleLogin        │                    │
     │                     │───────────────────▶│                    │
     │                     │                    │                    │
     │                     │                    │ signIn             │
     │                     │                    │───────────────────▶│
     │                     │                    │                    │
     │                     │                    │                    │ JWT生成
     │                     │                    │                    │◀───┐
     │                     │                    │                    │    │
     │                     │                    │◀───────────────────│    │
     │                     │◀───────────────────│                    │    │
     │                     │                    │                    │    │
     │ レスポンス処理        │                    │                    │    │
     │◀────────────────────│                    │                    │    │
     │                     │                    │                    │    │
     │ ダッシュボードへリダイレクト                                         │
     │─────────────────────────────────────────────────────────────────────▶
     │                     │                    │                    │
```

## セキュリティ対策

今回の実装では以下のセキュリティ対策を講じています：

### 1. CSRFプロテクション

Originヘッダーとホストの検証によるCSRF攻撃の防止：

```typescript
function validateCsrf(req: NextRequest): boolean {
  if (req.method !== 'POST') return true;
  if (!req.nextUrl.pathname.startsWith('/api/auth')) return true;

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');

  if (!origin) return false;

  const originHost = new URL(origin).host;
  
  if (host !== originHost) {
    console.warn(`CSRF検出: Origin ${origin} がホスト ${host} と一致しません`);
    return false;
  }

  if (referer) {
    const refererHost = new URL(referer).host;
    if (host !== refererHost) {
      console.warn(`CSRF検出: Referer ${referer} がホスト ${host} と一致しません`);
      return false;
    }
  }

  return true;
}
```

### 2. レート制限

短時間に大量のリクエストを送信する攻撃を防ぐためのレート制限：

```typescript
function applyRateLimit(req: NextRequest): boolean {
  if (!req.nextUrl.pathname.startsWith('/api') && 
      !req.nextUrl.pathname.startsWith('/auth')) {
    return true;
  }

  const forwardedFor = req.headers.get('x-forwarded-for') || '';
  const clientIp = forwardedFor.split(',')[0].trim() || 'unknown';
  
  const now = Date.now();
  
  if (!rateLimitCounter[clientIp]) {
    rateLimitCounter[clientIp] = { count: 1, timestamp: now };
    return true;
  }
  
  const counter = rateLimitCounter[clientIp];
  
  if (now - counter.timestamp > RATE_LIMIT.WINDOW_MS) {
    counter.count = 1;
    counter.timestamp = now;
    return true;
  }
  
  counter.count++;
  
  if (counter.count > RATE_LIMIT.MAX_REQUESTS) {
    console.warn(`レート制限超過: IP ${clientIp}, リクエスト数: ${counter.count}`);
    return false;
  }
  
  return true;
}
```

### 3. セキュリティヘッダー

重要なセキュリティヘッダーの設定：

```typescript
function setSecurityHeaders(response: NextResponse): void {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
}
```

## エラーハンドリング

エラーハンドリングは、ユーザー体験を向上させる重要な要素です。今回の実装では以下のポイントを押さえています：

1. **エラーコードの一元管理**: `auth-errors.ts`でエラーコードとメッセージを一元管理
2. **ユーザーフレンドリーなメッセージ**: 技術的な詳細ではなく、ユーザーが理解できるメッセージの表示
3. **カスタムフックでの処理**: `useLoginForm`でエラー状態を管理し、UIと処理を分離
4. **視覚的なエラー表示**: アイコンとカラーを使った、目立つエラー表示

```tsx
// useLoginForm.tsx の一部
import { createAuthError, AUTH_ERROR_CODES, AuthError } from '@/lib/auth/auth-errors';

const handleLogin = async (data: LoginFormData) => {
  try {
    setIsLoading(true);
    resetError();
    
    const result = await login(data);
    
    if (result.success) {
      return { success: true };
    } else {
      // エラーコードに基づいてエラーメッセージを設定
      setError(createAuthError(
        result.error || AUTH_ERROR_CODES.UNKNOWN_ERROR
      ));
      return { success: false };
    }
  } catch (error) {
    console.error('ログイン処理エラー:', error);
    setError(createAuthError(AUTH_ERROR_CODES.SERVER_ERROR));
    return { success: false };
  } finally {
    setIsLoading(false);
  }
};
```

## まとめと次のステップ

本記事では、Next.js 15のApp RouterとAuth.js (NextAuth v5) を使用して、JWTベースの認証システムを実装する方法を解説しました。認証フロー、セキュリティ対策、エラーハンドリングなど、実践的な実装のポイントを紹介しました。

### 今後の発展

1. **データベース連携**: 本実装ではテストデータを使用していますが、実際のアプリケーションではデータベースと連携する必要があります。
2. **パスワードリセット機能**: ユーザーがパスワードを忘れた場合のリセット機能の実装。
3. **多要素認証**: セキュリティを強化するための多要素認証の導入。
4. **ソーシャルログイン**: Google、GitHub、Twitterなどのソーシャルログインの追加。

Next.js 15とAuth.js (NextAuth v5) の組み合わせは、モダンなウェブアプリケーションの認証システム実装において強力なソリューションを提供します。この記事が皆さんの実装の参考になれば幸いです。

## 参考リソース

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Auth.js (NextAuth v5) ドキュメント](https://authjs.dev/)
- [NextAuth v5 App Router ガイド](https://authjs.dev/guides/upgrade-to-v5)
