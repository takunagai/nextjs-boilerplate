'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';

/**
 * 認証状態と認証関連機能へのアクセスを提供するカスタムフック
 * クライアントコンポーネントで使用可能
 */
export function useAuth() {
  const { data: session, status, update } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  
  /**
   * ログイン関数
   */
  const login = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...credentials,
      });
      
      return { success: !result?.error, error: result?.error };
    } catch (error) {
      console.error('ログインエラー:', error);
      return { success: false, error: '認証処理中にエラーが発生しました' };
    }
  }, []);
  
  /**
   * ログアウト関数
   */
  const logout = useCallback(async () => {
    try {
      // クライアント側でリダイレクトを処理するため、redirect: false に設定
      await signOut({ redirect: false });
      return { success: true };
    } catch (error) {
      console.error('ログアウトエラー:', error);
      return { success: false, error: 'ログアウト処理中にエラーが発生しました' };
    }
  }, []);
  
  /**
   * セッション更新関数
   */
  const updateSession = useCallback(async () => {
    try {
      await update();
      return { success: true };
    } catch (error) {
      console.error('セッション更新エラー:', error);
      return { success: false, error: 'セッション更新中にエラーが発生しました' };
    }
  }, [update]);
  
  return {
    session,
    status,
    isLoading,
    isAuthenticated,
    user: session?.user,
    login,
    logout,
    updateSession,
  };
}
