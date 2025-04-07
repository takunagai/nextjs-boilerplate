import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// メタデータ
export const metadata: Metadata = {
  title: "新規登録",
  description: "アカウントを作成してサービスをご利用ください。",
};

/**
 * 新規登録ページ
 */
export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            アカウント登録
          </h1>
          <p className="text-sm text-muted-foreground">
            必要情報を入力してアカウントを作成してください
          </p>
        </div>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">新規登録</CardTitle>
            <CardDescription>
              以下の情報を入力して登録してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
