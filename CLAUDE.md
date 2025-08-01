# CLAUDE.md

このファイルは、このリポジトリで作業する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

これはNext.js 15で構築された売上管理システムです。このプロジェクトはv0.devと自動同期され、Vercelにデプロイされています。アプリケーションは売上指標、チャート、管理機能を備えたダッシュボードを特徴としています。

## 開発コマンド

- `npm run dev` - 開発サーバーをlocalhost:3000で起動
- `npm run build` - 本番環境用にビルド
- `npm run start` - 本番サーバーを起動
- `npm run lint` - ESLintを実行（ビルド時のエラーは無視する設定）

## アーキテクチャと構造

### 技術スタック
- **フレームワーク**: Next.js 15 with App Router
- **言語**: TypeScript（strict mode）
- **スタイリング**: Tailwind CSS（テーマ用のCSS変数を使用）
- **UIコンポーネント**: shadcn/ui経由でRadix UIプリミティブを広範囲に使用
- **フォーム**: React Hook Form（Zod バリデーション）
- **チャート**: Recharts（データ可視化）
- **アイコン**: Lucide React

### 主要ディレクトリ
- `app/` - Next.js App Routerのページと APIルート
  - `components/` - ページ固有のコンポーネント（Sidebar、SalesChart、RecentSales）
  - `api/sales/` - 売上データ用のAPIエンドポイント
- `components/ui/` - 再利用可能なUIコンポーネント（shadcn/ui）
- `lib/` - ユーティリティ関数（clsx/tailwind-mergeを使用したutils.ts）
- `hooks/` - カスタムReactフック（モバイル検出、トースト）

### インポート規約
- プロジェクトルートからの絶対インポートには`@/`パスエイリアスを使用
- コンポーネントは`@/components/ui/`からインポート
- ユーティリティは`@/lib/utils`からインポート
- フックは`@/hooks/`からインポート

### スタイリングシステム
- 一貫したテーマのため`app/globals.css`で定義されたCSS変数を使用
- カスタムカラートークン（background、foreground、primaryなど）で設定されたTailwind
- クラスベースの切り替えによるダークモードサポート
- カスタムチャートカラーとサイドバーテーマ変数

### 設定注意点
- ESLintとTypeScriptエラーはビルド時に無視される（v0.devワークフロー用設定）
- 画像は最適化なし（静的エクスポート互換性のため）
- パッケージマネージャーとしてpnpmを使用
- HTML lang属性で日本語を設定

### コンポーネントアーキテクチャ
- 複合コンポーネントパターンを多用（Card/CardHeader/CardContent）
- インターフェース全体でLucideアイコンを一貫して使用
- フォームコンポーネントは適切なTypeScript型付けでReact Hook Formを使用
- 売上データ可視化にRechartsライブラリでチャートを実装

## 開発ノート

このプロジェクトは主にv0.devインターフェースを通じて変更され、変更は自動的にこのリポジトリに同期されるように設計されています。直接コードを変更する場合は、既存のshadcn/uiコンポーネントシステムとの互換性を確保し、日本語のUIテキストを維持してください。