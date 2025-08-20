# プロフィールデータ保存実装ガイド

## 📋 目次

- [現在の実装状態](#現在の実装状態)
- [本番環境での実装方法](#本番環境での実装方法)
- [データベース実装](#データベース実装)
- [画像ストレージ実装](#画像ストレージ実装)
- [Auth.js統合](#authjs統合)
- [実装ロードマップ](#実装ロードマップ)
- [推奨アーキテクチャ](#推奨アーキテクチャ)

## 🔍 現在の実装状態

### シミュレーション実装の概要

現在のボイラープレートでは、プロフィール機能は**デモンストレーション用**として実装されています：

```typescript
// src/app/actions/profile.ts の現状

// データ更新（シミュレーション）
await new Promise((resolve) => setTimeout(resolve, 1000));
console.log("プロフィール更新:", { userId, data });

// 画像アップロード（シミュレーション）
const imageUrl = `/api/images/profile/${session.user.id}`;
```

### 現状の特徴

| 機能 | 実装状態 | 説明 |
|------|----------|------|
| **データ永続化** | ❌ 未実装 | メモリ上のみ（リロードで消失） |
| **画像保存** | ❌ 未実装 | URLのみ生成（実ファイルなし） |
| **バリデーション** | ✅ 実装済み | Zodスキーマで完全検証 |
| **セキュリティ** | ✅ 実装済み | 認証・CSRF・XSS対策完備 |
| **UI/UX** | ✅ 実装済み | フル機能のフロントエンド |

---

## 🚀 本番環境での実装方法

### 実装に必要なコンポーネント

```mermaid
graph TB
    A[プロフィール機能] --> B[データベース]
    A --> C[画像ストレージ]
    A --> D[キャッシュ層]
    B --> E[PostgreSQL/MySQL/MongoDB]
    C --> F[S3/Cloudinary/Vercel Blob]
    D --> G[Redis/Memcached]
```

### 実装優先順位

1. **Phase 1**: データベース接続（プロフィールデータ保存）
2. **Phase 2**: 画像ストレージ（プロフィール画像保存）
3. **Phase 3**: キャッシュ実装（パフォーマンス最適化）
4. **Phase 4**: CDN統合（画像配信最適化）

---

## 🗄️ データベース実装

### 1. PostgreSQL + Prisma（推奨）

#### インストール

```bash
npm install prisma @prisma/client
npm install -D @types/node
npx prisma init
```

#### スキーマ定義

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  profile       UserProfile?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model UserProfile {
  id              String    @id @default(cuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  displayName     String?
  bio             String?   @db.Text
  location        String?
  website         String?
  imageUrl        String?
  emailVisible    Boolean   @default(false)
  profileVisible  Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([userId])
}
```

#### Server Action実装

```typescript
// src/app/actions/profile.ts（実装版）

import { prisma } from "@/lib/prisma";

export async function updateProfile(formData: unknown) {
  return safeAction(async () => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new ActionError("認証が必要です", "AUTHENTICATION_ERROR");
    }

    const validatedData = await validateAction(ProfileUpdateFormSchema, formData);
    
    // データベース更新
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      update: {
        name: validatedData.name,
        displayName: validatedData.displayName,
        bio: validatedData.bio,
        location: validatedData.location,
        website: validatedData.website,
        emailVisible: validatedData.emailVisible,
        profileVisible: validatedData.profileVisible,
      },
      create: {
        userId: session.user.id,
        name: validatedData.name,
        displayName: validatedData.displayName,
        bio: validatedData.bio,
        location: validatedData.location,
        website: validatedData.website,
        emailVisible: validatedData.emailVisible,
        profileVisible: validatedData.profileVisible,
      },
    });

    return {
      message: "プロフィールを更新しました",
      profile: updatedProfile,
    };
  });
}
```

### 2. Supabase（簡単実装）

#### セットアップ

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### テーブル作成SQL

```sql
-- Supabase SQLエディタで実行

CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  display_name TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  image_url TEXT,
  email_visible BOOLEAN DEFAULT false,
  profile_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) ポリシー
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid()::text = user_id);
```

### 3. MongoDB + Mongoose

```typescript
// models/UserProfile.ts
import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true, maxlength: 50 },
  displayName: { type: String, maxlength: 50 },
  bio: { type: String, maxlength: 500 },
  location: { type: String, maxlength: 100 },
  website: { type: String },
  imageUrl: { type: String },
  emailVisible: { type: Boolean, default: false },
  profileVisible: { type: Boolean, default: true },
}, {
  timestamps: true
});

export const UserProfile = mongoose.models.UserProfile || 
  mongoose.model('UserProfile', UserProfileSchema);
```

---

## 🖼️ 画像ストレージ実装

### 1. AWS S3実装

#### セットアップ

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install multer @types/multer
```

#### 実装コード

```typescript
// lib/s3.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadProfileImage(
  file: File,
  userId: string
): Promise<string> {
  const fileName = `profiles/${userId}/${Date.now()}-${file.name}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: fileName,
    Body: fileBuffer,
    ContentType: file.type,
    ACL: 'public-read', // または private + CloudFront
  });

  await s3Client.send(command);
  
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}
```

### 2. Cloudinary実装

#### セットアップ

```bash
npm install cloudinary
```

#### 実装コード

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadProfileImage(
  file: File,
  userId: string
): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const base64 = fileBuffer.toString('base64');
  const dataURI = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: `profiles/${userId}`,
    resource_type: 'image',
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      { quality: 'auto', fetch_format: 'auto' }
    ],
    public_id: `avatar-${Date.now()}`,
  });

  return result.secure_url;
}
```

### 3. Vercel Blob Storage（Vercelホスティング用）

#### セットアップ

```bash
npm install @vercel/blob
```

#### 実装コード

```typescript
// lib/vercel-blob.ts
import { put, del } from '@vercel/blob';

export async function uploadProfileImage(
  file: File,
  userId: string
): Promise<string> {
  const blob = await put(
    `profiles/${userId}/avatar-${Date.now()}`,
    file,
    {
      access: 'public',
      addRandomSuffix: false,
    }
  );

  return blob.url;
}
```

### 画像アップロードServer Action更新

```typescript
// app/actions/profile.ts（画像アップロード部分）

export async function uploadProfileImage(formData: FormData) {
  return safeAction(async () => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new ActionError("認証が必要です", "AUTHENTICATION_ERROR");
    }

    const file = formData.get("image") as File;
    // バリデーション（既存コード）

    // 画像アップロード（選択した実装を使用）
    const imageUrl = await uploadProfileImage(file, session.user.id);

    // データベース更新
    await prisma.userProfile.update({
      where: { userId: session.user.id },
      data: { imageUrl },
    });

    // 古い画像の削除（オプション）
    // await deleteOldImage(session.user.id);

    return {
      message: "プロフィール画像をアップロードしました",
      imageUrl,
    };
  });
}
```

---

## 🔐 Auth.js統合

### セッション拡張

```typescript
// lib/auth/index.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        
        // プロフィール情報を含める
        const profile = await prisma.userProfile.findUnique({
          where: { userId: token.sub },
        });
        
        if (profile) {
          session.user.profile = {
            displayName: profile.displayName,
            bio: profile.bio,
            location: profile.location,
            imageUrl: profile.imageUrl,
          };
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
```

### 型定義拡張

```typescript
// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      profile?: {
        displayName?: string | null;
        bio?: string | null;
        location?: string | null;
        imageUrl?: string | null;
      };
    } & DefaultSession["user"];
  }
}
```

---

## 📋 実装ロードマップ

### Phase 1: 基本実装（1-2日）

- [ ] データベース選択・セットアップ
- [ ] Prismaスキーマ作成
- [ ] 基本的なCRUD実装
- [ ] 既存Server Actions更新

### Phase 2: 画像機能（1-2日）

- [ ] ストレージサービス選択
- [ ] アップロード実装
- [ ] 画像最適化設定
- [ ] 古い画像の削除処理

### Phase 3: パフォーマンス（1日）

- [ ] Redisキャッシュ実装
- [ ] データベースインデックス最適化
- [ ] 画像CDN設定
- [ ] レスポンス最適化

### Phase 4: 運用機能（1日）

- [ ] バックアップ戦略
- [ ] 監視・ロギング
- [ ] 管理画面機能
- [ ] データ移行ツール

---

## 🏗️ 推奨アーキテクチャ

### 小規模プロジェクト（〜1万ユーザー）

```yaml
推奨スタック:
  - Database: Supabase（Auth + DB + Storage統合）
  - Hosting: Vercel
  - 追加: 特になし

メリット:
  - セットアップ簡単
  - 統合済みサービス
  - 無料枠で開始可能
```

### 中規模プロジェクト（1万〜10万ユーザー）

```yaml
推奨スタック:
  - Database: PostgreSQL + Prisma
  - Storage: AWS S3 + CloudFront
  - Cache: Redis
  - Hosting: Vercel/AWS

メリット:
  - スケーラブル
  - コスト効率的
  - 柔軟な構成
```

### 大規模プロジェクト（10万ユーザー以上）

```yaml
推奨スタック:
  - Database: PostgreSQL（レプリケーション）
  - Storage: S3 + CloudFront + Lambda@Edge
  - Cache: Redis Cluster
  - Queue: SQS/BullMQ
  - Hosting: AWS/GCP Kubernetes

メリット:
  - 高可用性
  - 自動スケーリング
  - エンタープライズ対応
```

---

## 🛠️ 開発のベストプラクティス

### 1. 環境変数管理

```env
# .env.local（開発環境）
DATABASE_URL="postgresql://dev:dev@localhost:5432/myapp_dev"
AWS_S3_BUCKET="myapp-dev-profiles"

# .env.production（本番環境）
DATABASE_URL="postgresql://prod:xxx@xxx.amazonaws.com:5432/myapp"
AWS_S3_BUCKET="myapp-prod-profiles"
```

### 2. エラーハンドリング

```typescript
try {
  const profile = await updateProfile(data);
  return { success: true, profile };
} catch (error) {
  // Prismaエラー
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return { error: "このメールアドレスは既に使用されています" };
    }
  }
  
  // ストレージエラー
  if (error instanceof S3ServiceException) {
    console.error("S3エラー:", error);
    return { error: "画像のアップロードに失敗しました" };
  }
  
  throw error;
}
```

### 3. トランザクション処理

```typescript
// プロフィールと画像を同時更新
await prisma.$transaction(async (tx) => {
  // プロフィール更新
  const profile = await tx.userProfile.update({
    where: { userId },
    data: profileData,
  });
  
  // 画像履歴保存
  await tx.profileImageHistory.create({
    data: {
      userId,
      imageUrl: newImageUrl,
      deletedAt: null,
    },
  });
  
  return profile;
});
```

### 4. セキュリティ考慮事項

```typescript
// ファイルアップロードセキュリティ
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// ファイル名サニタイゼーション
const sanitizedFileName = fileName
  .replace(/[^a-zA-Z0-9.-]/g, '_')
  .toLowerCase();

// Content-Type検証
const fileTypeResult = await fileTypeFromBuffer(buffer);
if (!ALLOWED_TYPES.includes(fileTypeResult?.mime)) {
  throw new Error("不正なファイル形式");
}
```

---

## 📚 参考リンク

### データベース
- [Prisma公式ドキュメント](https://www.prisma.io/docs)
- [Supabase公式ガイド](https://supabase.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

### ストレージ
- [AWS S3 SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)

### パフォーマンス
- [Redis公式](https://redis.io/docs/)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)

---

*このガイドは実装の出発点として作成されています。プロジェクトの要件に応じて適切な技術選択を行ってください。*