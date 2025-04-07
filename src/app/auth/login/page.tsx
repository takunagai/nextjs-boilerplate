import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// メタデータ
export const metadata: Metadata = {
  title: "ログイン",
  description: "アカウントにログインしてサービスをご利用ください。",
};

/**
 * ログインページ
 */
export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            アカウントにログイン
          </h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスとパスワードでログインしてください
          </p>
        </div>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">ログイン</CardTitle>
            <CardDescription>
              認証情報を入力してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
