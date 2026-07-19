# 孤獨的美食家 · 聖地巡禮地圖

[English](README.md) | [简体中文](README.zh-CN.md) | **繁體中文** | [日本語](README.ja.md) | [한국어](README.ko.md)

《孤獨的美食家》（孤独のグルメ）漫畫及電視劇地點的公開互動式地圖。本專案將公開 Google My Maps 中的地點整理成可搜尋、可篩選的資料，並使用全球向量底圖協助規劃聖地巡禮。

## 功能

- **全球向量地圖**：MapLibre GL JS + OpenFreeMap Liberty 向量圖磚（無需 token）
- **274 個來源地點**：涵蓋漫畫、Season 1–10、特別篇、串流原創及《それぞれの孤独のグルメ》
- **地區連動篩選**：依國家或地區 → 日本地區（選擇日本時）→ 城市 → 商圈篩選，也可依作品、季度、料理分類和營業狀態篩選
- **搜尋**：支援店名、菜色、地區及地址搜尋
- **預設只看營業中**：初始勾選「只看標示為營業中的地點」，可隨時取消
- **地點詳情**：顯示集數、料理、地址、來源備註，以及 Google 地圖和食べログ搜尋入口
- **六語言介面**：日本語、English、繁體中文（台灣）、繁體中文（香港）、简体中文、한국어
- **底圖語言連動**：網站切換語言時同步切換地圖標籤，基於 OpenMapTiles 多語言資料
- **國際化 SEO**：預先產生語言網址、本地化中繼資料、hreflang、Canonical、結構化資料、網站地圖、robots 規則及專用分享卡
- **響應式版面**：桌面版並排顯示地圖與側欄，行動版使用可開合的篩選與地點清單
- **來源透明**：側欄醒目顯示來源地圖、來源日期及營業資訊提醒

## 技術堆疊

- Next.js 16 App Router
- React 19
- TypeScript
- MapLibre GL JS
- 原生 CSS

## 本機執行

### 1. 環境需求

- Node.js `>= 20.9.0`
- npm

本專案使用免費的 OpenFreeMap 圖磚，無需註冊或獲取任何 token。

### 2. 安裝相依套件

```bash
npm install
```

### 3. 設定環境變數

在專案根目錄將 `.env.example` 複製為 `.env.local`：

```env
SITE_URL=https://example.com

# 可選：覆蓋預設地圖樣式（預設為 OpenFreeMap Liberty）
# NEXT_PUBLIC_MAP_STYLE_URL=https://tiles.openfreemap.org/styles/liberty
```

| 變數 | 必需 | 說明 |
| --- | --- | --- |
| `NEXT_PUBLIC_MAP_STYLE_URL` | 否 | 自訂 MapLibre 相容樣式 URL；未設定時使用 OpenFreeMap Liberty |
| `SITE_URL` | 正式環境 | 用於 Canonical、hreflang、網站地圖及社交分享元資料的公開網站網域 |

環境變數會在建置時寫入用戶端套件。修改後需要重新啟動開發伺服器，並在部署平台重新建置。

### 4. 啟動開發環境

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

### 5. 正式環境建置

```bash
npm run build
npm start
```

## 地圖與國際化

預設樣式為：

```text
https://tiles.openfreemap.org/styles/liberty
```

地圖標籤會隨網站語言動態切換，利用 OpenMapTiles 多語言欄位（`name:ja`、`name:en`、`name:zh`、`name:ko`），缺少對應語言時退回當地名稱。

介面文案集中在 `src/i18n/messages.ts`，搜尋元資料位於 `src/i18n/seo.ts`。新增或修改使用者可見文字及搜尋文案時，需同步維護全部六種語言。每種語言都有獨立可索引網址（`/en`、`/ja`、`/zh-CN`、`/zh-TW`、`/zh-HK`、`/ko`），並透過 hreflang 互相關聯。使用者未主動選擇語言時，根網址會跟隨瀏覽器語言；使用者主動選擇的語言會儲存到 LocalStorage 和 Cookie，並在之後造訪時自動恢復。

地圖使用免費的 OpenFreeMap 圖磚。地圖右下角的 OpenStreetMap 署名不得移除或遮擋。

## 資料來源

唯一地點資料來源：

[Google My Maps「『孤独のグルメ』ＭＡＰ！（漫画＆ドラマSeason１～１０）」](https://www.google.com/maps/d/u/0/viewer?mid=1dH-zOGzRwCZ8cgFKaOlFBn8JDM8)

- 產生的資料：`src/data/restaurants.json`
- 資料型別與執行時匯出：`src/data/index.ts`
- 國家、日本地區、城市與商圈層級：`src/data/geography.ts`
- 同步腳本：`scripts/import-google-mymaps.mjs`
- 專案顯示的來源地圖更新月份：2026 年 4 月

營業狀態和料理分類由同步腳本依來源文字推斷。國家、日本地區、城市與商圈層級會在執行時依來源地址和地區欄位產生，不依賴其他地點資料來源；日本的「商圈」主要對應都道府縣以下的區、町或地址町名。

原作與劇集年代跨度較大，地點可能已歇業、暫停營業或搬遷，造訪前請務必向店家確認最新資訊。

### 重新同步資料

```bash
npm run data:sync
npm run build
```

同步指令會連線下載 KML，並完整覆寫 `src/data/restaurants.json`。提交結果前應檢查地點數量、來源更新日期、分類、營業狀態和產生的差異。

## 專案結構

```text
src/
├── app/
│   ├── globals.css          # 全域、響應式及 MapLibre 樣式
│   ├── [locale]/page.tsx    # 本地化 HTML、Metadata 與結構化資料
│   ├── layout.tsx           # 根版面、Metadata 基準與 MapLibre CSS
│   ├── page.tsx             # 瀏覽器/偏好語言轉址
│   ├── robots.ts            # 搜尋爬蟲規則
│   └── sitemap.ts           # 多語言網站地圖與 hreflang
├── components/
│   ├── HomePage.tsx         # 互動狀態、篩選與語言路由
│   ├── MapView.tsx          # MapLibre 地圖、標記、彈窗和語言連動
│   └── Sidebar.tsx          # 搜尋、篩選、地點清單及來源署名
├── data/
│   ├── categories.ts        # 分類、配色與圖示
│   ├── geography.ts         # 國家、日本地區、城市與商圈層級
│   ├── index.ts             # 資料型別與匯出
│   └── restaurants.json     # 由 KML 產生的地點資料
└── i18n/
    ├── messages.ts          # 六語言介面文案
    ├── routing.ts           # 語言偵測與網址工具
    └── seo.ts               # 本地化搜尋與分享中繼資料

scripts/
└── import-google-mymaps.mjs # Google My Maps KML 匯入器
```

## 常用指令

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 啟動本機開發伺服器 |
| `npm run build` | 執行 TypeScript 檢查並建立正式環境版本 |
| `npm start` | 啟動已完成的正式環境建置 |
| `npm run data:sync` | 從指定 Google My Maps 重新產生地點資料 |
