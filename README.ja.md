# 孤独のグルメ 聖地巡礼マップ

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | **日本語** | [한국어](README.ko.md)

『孤独のグルメ』の漫画・テレビドラマに登場するスポットをまとめた公開インタラクティブマップです。公開 Google My Maps のスポットを検索・絞り込み可能なデータとして整理し、世界対応のベクター地図上で聖地巡礼の計画に利用できるようにしています。

## 主な機能

- **世界対応ベクター地図**：MapLibre GL JS と OpenFreeMap Liberty ベクタータイル（トークン不要）
- **出典に基づく 274 スポット**：漫画、Season 1〜10、スペシャル、配信オリジナル、『それぞれの孤独のグルメ』を収録
- **連動エリア絞り込み**：国・地域 → 日本の地方（日本選択時）→ 都市 → エリアの順に選択でき、作品、シーズン、料理ジャンル、営業状況でも絞り込み可能
- **検索**：店名、料理、エリア、住所からスポットを検索
- **営業中のみを初期表示**：「営業中と記載されたスポットのみ」を初期状態でオンにし、いつでも解除可能
- **スポット詳細**：エピソード、料理、住所、出典メモ、Google マップ検索、食べログ検索を表示
- **6 言語対応 UI**：日本語、English、繁體中文（台灣）、繁體中文（香港）、简体中文、한국어
- **地図ラベルの言語連動**：サイトの選択言語に合わせて地図ラベルを変更（OpenMapTiles 多言語データ）
- **国際 SEO**：言語別 URL の事前生成、ローカライズ済みメタデータ、hreflang、Canonical、構造化データ、サイトマップ、robots 設定、専用シェアカード
- **レスポンシブレイアウト**：デスクトップでは地図とサイドバーを並べ、モバイルではフィルターとスポット一覧を開閉式で表示
- **明確な出典表示**：サイドバー上部に元マップ、更新時期、営業情報に関する注意を表示

## 技術スタック

- Next.js 16 App Router
- React 19
- TypeScript
- MapLibre GL JS
- CSS

## ローカルでの実行

### 1. 必要な環境

- Node.js `>= 20.9.0`
- npm

本プロジェクトは無料の OpenFreeMap タイルを使用しており、登録やトークンは不要です。

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

プロジェクトルートで `.env.example` を `.env.local` にコピーします。

```env
SITE_URL=https://example.com

# 任意：デフォルトの地図スタイルを上書き（デフォルトは OpenFreeMap Liberty）
# NEXT_PUBLIC_MAP_STYLE_URL=https://tiles.openfreemap.org/styles/liberty
```

| 変数 | 必須 | 説明 |
| --- | --- | --- |
| `NEXT_PUBLIC_MAP_STYLE_URL` | いいえ | カスタム MapLibre 互換スタイル URL。未設定時は OpenFreeMap Liberty を使用 |
| `SITE_URL` | 本番環境 | Canonical、hreflang、サイトマップ、ソーシャルメタデータに使用する公開サイト URL |

環境変数はビルド時にクライアントバンドルへ組み込まれます。変更後は開発サーバーを再起動し、デプロイ先でも再ビルドしてください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

### 5. 本番ビルド

```bash
npm run build
npm start
```

## 地図と言語対応

デフォルトの地図スタイル：

```text
https://tiles.openfreemap.org/styles/liberty
```

地図ラベルはサイト言語に合わせて動的に切り替わります。OpenMapTiles の多言語フィールド（`name:ja`、`name:en`、`name:zh`、`name:ko`）を使用し、該当言語がない場合は現地名にフォールバックします。

UI 文言は `src/i18n/messages.ts`、検索向けメタデータは `src/i18n/seo.ts` に集約されています。ユーザー向けまたは検索向けの文言を追加・変更する場合は、6 言語すべてを更新してください。各言語には個別のインデックス可能な URL（`/en`、`/ja`、`/zh-CN`、`/zh-TW`、`/zh-HK`、`/ko`）があり、hreflang で相互に関連付けられます。ユーザーが言語を選択していない場合、ルート URL はブラウザ言語を使用します。手動で選択した言語は LocalStorage と Cookie に保存して次回以降に復元します。

地図は無料の OpenFreeMap タイルを使用しています。地図右下の OpenStreetMap 帰属表示は削除したり隠したりしないでください。

## データ出典

スポットデータの唯一の出典：

[Google My Maps「『孤独のグルメ』ＭＡＰ！（漫画＆ドラマSeason１～１０）」](https://www.google.com/maps/d/u/0/viewer?mid=1dH-zOGzRwCZ8cgFKaOlFBn8JDM8)

- 生成データ：`src/data/restaurants.json`
- データ型とランタイムエクスポート：`src/data/index.ts`
- 国・日本の地方・都市・エリア階層：`src/data/geography.ts`
- 同期スクリプト：`scripts/import-google-mymaps.mjs`
- プロジェクトに表示する出典更新月：2026 年 4 月

営業状況と料理ジャンルは、出典テキストをもとに同期スクリプトが推定します。国・日本の地方・都市・エリアの階層は、追加の位置情報データを使用せず、出典の住所と地域フィールドから実行時に生成します。日本の「エリア」は主に都道府県より下位の区、町、住所の町名に対応します。

原作とドラマは長期間にわたるため、スポットが閉店・休業・移転している場合があります。訪問前に必ず店舗へ最新情報をご確認ください。

### データの再同期

```bash
npm run data:sync
npm run build
```

同期コマンドはネットワーク経由で KML をダウンロードし、`src/data/restaurants.json` を完全に書き換えます。コミット前にスポット数、出典の更新日、分類、営業状況、生成された差分を確認してください。

## プロジェクト構成

```text
src/
├── app/
│   ├── globals.css          # グローバル、レスポンシブ、MapLibre スタイル
│   ├── [locale]/page.tsx    # ローカライズ HTML、メタデータ、構造化データ
│   ├── layout.tsx           # ルートレイアウト、メタデータ基準、MapLibre CSS
│   ├── page.tsx             # ブラウザ/保存言語へのリダイレクト
│   ├── robots.ts            # 検索クローラー規則
│   └── sitemap.ts           # 多言語サイトマップと hreflang
├── components/
│   ├── HomePage.tsx         # インタラクティブ状態、フィルター、言語ルーティング
│   ├── MapView.tsx          # MapLibre 地図、マーカー、ポップアップ、言語連動
│   └── Sidebar.tsx          # 検索、フィルター、スポット一覧、出典表示
├── data/
│   ├── categories.ts        # 分類、色、アイコン
│   ├── geography.ts         # 国・日本の地方・都市・エリア階層
│   ├── index.ts             # データ型とエクスポート
│   └── restaurants.json     # KML から生成されたスポットデータ
└── i18n/
    ├── messages.ts          # 6 言語の UI 文言
    ├── routing.ts           # 言語判定と URL ヘルパー
    └── seo.ts               # ローカライズ検索・共有メタデータ

scripts/
└── import-google-mymaps.mjs # Google My Maps KML インポーター
```

## コマンド

| コマンド | 用途 |
| --- | --- |
| `npm run dev` | ローカル開発サーバーを起動 |
| `npm run build` | TypeScript チェックと本番ビルドを実行 |
| `npm start` | 完了した本番ビルドを起動 |
| `npm run data:sync` | 指定された Google My Maps からスポットデータを再生成 |
