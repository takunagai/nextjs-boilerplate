/**
 * NextAuth APIハンドラ
 * Auth.jsが必要とするAPIルート
 */
import { handlers } from '@/lib/auth';

export const GET = handlers.GET;
export const POST = handlers.POST;
