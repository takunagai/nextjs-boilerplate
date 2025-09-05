import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { SocialLinks } from "@/components/ui/social-links";

export function ProfileSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <Container width="2xl" paddingY="lg" paddingX="lg">
        <div className="text-center mb-12">
          <Heading as="h2" align="center" className="mb-4">
            プロフィール
          </Heading>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* プロフィール画像 */}
              <div className="md:col-span-1">
                <div className="aspect-square rounded-full overflow-hidden mx-auto max-w-xs">
                  <Image
                    src="/images/portrait.png"
                    alt="ながたく (Taku Nagai) のプロフィール画像"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* プロフィール内容 */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    ながたく (Taku Nagai)
                  </h3>
                  <p className="text-muted-foreground">
                    ウェブデザイナー・AI活用コンサルタント
                  </p>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    15年以上のウェブ制作経験（企画・デザイン・コーディング・運用）を持つウェブデザイナー。
                  </p>
                  <p>
                    ChatGPT 登場初期から AI
                    の可能性に注目し、日々研究を重ねています。制作の経験に AI
                    活用を掛け合わせ、質の高いサービスを提供したい。
                  </p>
                  <p>
                    「AI
                    で便利になった分、人にしかできないことに時間を使うべき」がモットー。
                  </p>
                  <p>
                    技術的な話も、分かりやすくお伝えします。お気軽にご相談ください！
                  </p>
                </div>

                {/* SNS・サービスリンク */}
                <SocialLinks className="pt-2" />

                <div className="pt-4">
                  <Button asChild variant="outline">
                    <Link href="/about">
                      詳しいプロフィール
                      <FaArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
