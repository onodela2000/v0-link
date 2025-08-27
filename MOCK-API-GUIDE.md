# 🚀 Multi-Environment API Strategy

V0とローカル開発を両立し、デプロイ後もモックAPIが動作する環境構築ガイド

## 📋 環境別動作

| 環境 | URL | API動作 | 特徴 |
|------|-----|---------|------|
| **ローカル開発** | `localhost:3000` | Prismモックサーバー (port:4010) | リアルなHTTP通信、Networkタブ確認可 |
| **デプロイ後** | `your-domain.com` | Service Worker Mock | 静的ファイルでもAPI動作 |
| **本番** | `your-domain.com?api=production` | 実際のAPIサーバー | 本番API接続 |

## 🔧 使用方法

### 1. **開発時（ローカル）**
```bash
# モックサーバー + フロントエンド同時起動
pnpm run dev

# ブラウザでアクセス
open http://localhost:3000
```
- ✅ Prismモックサーバーが`localhost:4010`で起動
- ✅ ネットワークタブでAPI通信確認可能
- ✅ リアルなHTTPレスポンス

### 2. **デプロイ後（静的ファイル）**
```bash
# ビルド & デプロイ
pnpm run build
# → outディレクトリをCDNにアップロード
```
- ✅ Service Workerが自動でAPIをモック
- ✅ V0デプロイ後も即座にAPI動作
- ✅ 静的ファイルのみでフル機能

### 3. **本番切り替え**
URLパラメータで環境切り替え：
```
https://your-app.com?api=production  # 本番API
https://your-app.com?api=mock       # 強制モック  
https://your-app.com?api=local      # ローカル開発用
```

## 🛠 技術仕様

### Multi-Layer Mock System
1. **Service Worker Mock** (`public/mockServiceWorker.js`)
   - 静的ファイルホスティング用
   - MIME type問題対応済み

2. **Inline Service Worker** (`components/MockServiceWorker.tsx`)
   - Service Workerファイル読み込み失敗時のフォールバック
   - Blob URLで動的生成

3. **Fetch API Mock** (`components/FetchMockProvider.tsx`)
   - 最終フォールバック
   - window.fetchを直接オーバーライド
   - 確実にすべての環境で動作

### 動作保証
- **対象**: `/api/*` パスのリクエストをインターセプト
- **データ**: OpenAPI仕様と同じレスポンス形式
- **遅延**: 100-300msのリアルな遅延シミュレート
- **互換性**: すべての静的ファイルホスティングで動作

### 動的API設定
- **設定**: `lib/api-config.ts`
- **判定**: ドメイン + URLパラメータベース
- **切り替え**: リアルタイムで環境変更可能

### デバッグ情報
開発時に右下に表示される情報パネル：
- 現在の環境（local/mock/production）
- API Base URL
- Service Worker状態
- リクエスト成功/失敗状況

## 🎯 V0連携ワークフロー

### 1. **V0でUI作成**
```mermaid
graph LR
    A[V0でUI作成] --> B[自動Git同期] --> C[ローカルでpull]
```

### 2. **ローカルでAPI統合**
```bash
git pull origin main
pnpm run dev  # モックサーバー起動
# API統合 + ロジック実装
```

### 3. **V0にpush → 即座にAPI動作**
```bash
git push origin main
# V0が自動デプロイ → Service WorkerでAPI即座に動作
```

## 🔄 更新フロー

### モックデータ更新
1. **`public/mockServiceWorker.js`** のMOCK_DATAを編集
2. **`api-spec.yaml`** も同時更新（一貫性維持）
3. コミット・プッシュで即座に反映

### API仕様変更
1. **`api-spec.yaml`** を更新
2. **`pnpm run generate-api`** でクライアント再生成
3. **Service Worker** のデータ構造も合わせて更新

## 🎉 メリット

- ✅ **V0との完全互換**: UIはV0、APIは自動モック
- ✅ **デプロイ即動作**: 静的ファイルでもフルAPI機能
- ✅ **開発体験向上**: ローカルはリアルHTTP、デプロイ後は軽量
- ✅ **段階的本番移行**: URLパラメータで簡単切り替え
- ✅ **メンテナンス不要**: 一度設定すれば自動動作

## 🚨 注意事項

- Service Workerは初回アクセス後に有効化
- ブラウザリロードが必要な場合あり
- HTTPSでのみService Worker動作（localhost除く）
- キャッシュクリアでService Worker無効化される場合あり

このシステムにより、V0でのUI開発とローカルでのAPI開発が完全に独立し、デプロイ後も即座にフル機能が動作します！