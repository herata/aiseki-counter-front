# 相席カウンター

相席店舗の来店者数をリアルタイムでモニタリングするWebアプリケーション。

## 特徴

- 全国の店舗（AG・オリラジ・JIS）の来店者数をリアルタイムで表示
- 男女別の来店者数を視覚的に表示
- 時系列での来店者数の推移をグラフで表示
- レスポンシブデザインによるモバイル対応

## 技術スタック

### フロントエンド
- Next.js 15
- TypeScript
- TanStack Query
- Recharts（グラフ表示）
- shadcn/ui（UIコンポーネント）
- Tailwind CSS

### バックエンド
- AWS Lambda
- Amazon DynamoDB
- Python

## 必要な環境変数

```env
NEXT_PUBLIC_API_ENDPOINT="Lambda関数のURL"
```

## セットアップ

```bash
# プロジェクトのクローン
git clone https://github.com/yourusername/aiseki-counter-lambda.git
cd aiseki-counter-lambda

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## AWS環境の設定

1. DynamoDBテーブルの作成
   - テーブル名: `ShopVisitorStats`
   - パーティションキー: `ShopBusinessDay` (String)
   - ソートキー: `Timestamp` (Number)

2. Lambda関数の設定
   - ランタイム: Python 3.13.0
   - 実行ロール: DynamoDBの読み取り権限を付与
   - 関数URL: CORS設定を有効化

## プロジェクト構成

```
.
├── lambda/
│   └── index.py           # Lambda関数のコード
├── src/
│   ├── app/              # Next.jsページ
│   ├── components/       # Reactコンポーネント
│   └── lib/             # ユーティリティ関数
│       ├── api.ts       # API通信
│       └── shops.ts     # 店舗データ
└── package.json
```

## 機能

### 店舗選択
- 都道府県による絞り込み
- ブランド（AG・オリラジ・JIS）ごとの店舗表示

### データ表示
- 男女別の現在の来店者数
- 時系列での来店者数の推移グラフ
- カレンダーによる日付選択

## 開発環境

- Node.js 20.0.0以上
- npm 10.0.0以上
