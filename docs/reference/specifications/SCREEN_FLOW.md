# 画面遷移図

```mermaid
graph TD
    A[ログイン/新規登録画面] --> |認証成功| B[メインページ]
    B --> |タブ切り替え| C[習慣チェック]
    B --> |タブ切り替え| D[統計]
    B --> |タブ切り替え| E[日報]
    
    C --> |新規追加| F[習慣追加ダイアログ]
    C --> |編集| G[習慣編集]
    C --> |削除| H[習慣削除確認]
    
    subgraph メインページ
        C
        D
        E
    end
    
    subgraph 習慣管理
        F
        G
        H
    end
    
    I[ナビゲーションバー] --> |ログアウト| A
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#dfd,stroke:#333,stroke-width:2px
    style D fill:#dfd,stroke:#333,stroke-width:2px
    style E fill:#dfd,stroke:#333,stroke-width:2px

    classDef dialog fill:#fff,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5
    class F,G,H dialog
```

## 画面詳細

### 1. ログイン/新規登録画面 (`/auth`)

- ユーザー名とパスワードによる認証
- 新規登録/ログイン切り替え
- 認証成功後はメインページへリダイレクト

### 2. メインページ (`/`)

#### ナビゲーションバー

- ユーザー名表示
- ログアウトボタン

#### タブメニュー

1. **習慣チェック**
   - 週間カレンダービュー
   - 習慣の追加/編集/削除
   - チェックボックスによる達成記録
   - 達成時の絵文字表示

2. **統計**
   - 週間達成率グラフ
   - 習慣別達成率
   - 日別達成状況

3. **日報**
   - 日別の学習記録
   - メモ機能
   - 自動保存

### モーダル/ダイアログ

1. **習慣追加ダイアログ**
   - 習慣名入力
   - 追加確認

2. **習慣編集**
   - 習慣名変更
   - 保存確認

3. **習慣削除確認**
   - 削除確認メッセージ
   - 取り消し不可の警告

## レスポンシブ対応

- デスクトップ: テーブルビュー
- モバイル: グリッドビュー
- タッチ操作対応
