"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { formExampleSchema, type FormExampleValues } from "@/lib/validation/form-example-schema";
import { createBreadcrumbs } from "@/lib/utils";
import { submitExampleForm } from "@/app/actions/form-example";
import { isActionError, isActionSuccess } from "@/lib/server";

export default function FormExamplePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  // パンくずリストの基本データを定義
  const breadcrumbItems = [
    { title: "ホーム", path: "/" },
    { title: "サンプル一覧", path: "/examples" },
    { title: "フォームサンプル", path: "/examples/form", current: true },
  ];

  // UI表示用のデータのみを生成
  const { ui: uiBreadcrumbs } = createBreadcrumbs(breadcrumbItems);

  const form = useForm<FormExampleValues>({
    resolver: zodResolver(formExampleSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      terms: false,
    },
  });

  async function onSubmit(data: FormExampleValues) {
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // サーバーアクションを使用してフォームを送信
      const result = await submitExampleForm(data);
      
      if (isActionSuccess(result)) {
        setSubmitResult({
          success: true,
          message: result.data.message,
        });
        form.reset();
      } else if (isActionError(result)) {
        setSubmitResult({
          success: false,
          message: result.error.message,
        });

        // フィールドエラーがある場合はフォームのエラーステートに設定
        const fieldErrors = result.error.details?.fieldErrors as Record<string, string> | undefined;
        if (fieldErrors) {
          for (const [field, message] of Object.entries(fieldErrors)) {
            form.setError(field as keyof FormExampleValues, {
              type: "server",
              message,
            });
          }
        }
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "送信中にエラーが発生しました。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Container className="mt-8">
        <Breadcrumb items={uiBreadcrumbs} />
      </Container>
      <Container size="md" paddingY="lg" paddingX="2xl">
        <h1 className="mb-8 text-3xl font-bold">フォームサンプル</h1>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>お問い合わせフォーム</CardTitle>
            <CardDescription>
              react-hook-formとzodを使用した入力フォームのサンプルです。
	          サーバーアクションを使用したサーバーサイド処理の例を含みます。
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitResult && (
              <div className={`mb-6 rounded-md p-4 ${
                submitResult.success 
                  ? "bg-green-50 text-green-800 border border-green-200" 
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}>
                {submitResult.message}
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>お名前</FormLabel>
                      <FormControl>
                        <Input placeholder="山田 太郎" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>年齢（任意）</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="30"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number.parseInt(value, 10) : undefined);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        18歳以上で入力してください
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メッセージ</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="お問い合わせ内容をご記入ください"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>利用規約</FormLabel>
                        <FormDescription>
                          利用規約に同意します
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "送信中..." : "送信する"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <p className="mb-2">※このフォームはサンプルです。実際のデータは保存されません。</p>
            <p>サーバーアクションを使用して、サーバーサイドでの処理を実装しています。</p>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
}
