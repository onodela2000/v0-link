# 売上管理システム

*[v0.dev](https://v0.dev) デプロイメントと自動同期*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/onodela2000s-projects/v0-next-js)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/DhCOTzxVJ6G)

## 概要

このリポジトリは[v0.dev](https://v0.dev)でデプロイされたチャットと同期を保ちます。
デプロイされたアプリに加えた変更は、[v0.dev](https://v0.dev)からこのリポジトリに自動的にプッシュされます。

## プロジェクト機能

- 📊 売上データの可視化ダッシュボード
- 📈 リアルタイムチャートと分析
- 💼 顧客情報と売上履歴の管理
- 📱 レスポンシブデザイン対応
- 🎨 モダンなUIコンポーネント（shadcn/ui）

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIライブラリ**: Radix UI + shadcn/ui
- **チャート**: Recharts
- **アイコン**: Lucide React
- **フォーム**: React Hook Form + Zod

## デプロイメント

プロジェクトのライブ版:

**[https://vercel.com/onodela2000s-projects/v0-next-js](https://vercel.com/onodela2000s-projects/v0-next-js)**

## アプリの開発を続ける

以下でアプリの開発を続けることができます:

**[https://v0.dev/chat/projects/DhCOTzxVJ6G](https://v0.dev/chat/projects/DhCOTzxVJ6G)**

## 仕組み

1. [v0.dev](https://v0.dev)を使用してプロジェクトを作成・変更
2. v0インターフェースからチャットをデプロイ
3. 変更は自動的にこのリポジトリにプッシュされます
4. Vercelがこのリポジトリから最新版をデプロイします

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバーの起動
npm run start
```

プロジェクトは [http://localhost:3000](http://localhost:3000) で確認できます。