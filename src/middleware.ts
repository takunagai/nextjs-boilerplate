import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// 認証ミドルウェア
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  // 保護されたルートのパターン
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  
  // 現在のパスが保護対象かをチェック
  const isProtectedRoute = protectedRoutes.some((route) => 
    nextUrl.pathname.startsWith(route)
  );
  
  // ログインしていない場合は保護されたルートへのアクセスをリダイレクト
  if (!isLoggedIn && isProtectedRoute) {
    const redirectUrl = new URL('/auth/login', nextUrl.origin);
    redirectUrl.searchParams.set('callbackUrl', nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
});

// ミドルウェアを適用するパスを正規表現で指定
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/profile/:path*', 
    '/settings/:path*',
    // ログインページはミドルウェアから除外
    '/((?!api|_next/static|_next/image|auth/login|auth/register|favicon.ico).*)',
  ],
};
