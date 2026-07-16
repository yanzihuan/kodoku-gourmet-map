import type { CategoryKey } from "@/data/categories";

export const LOCALES = ["zh-CN", "zh-TW", "zh-HK", "ja", "en", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

type JapanRegionKey =
  | "hokkaido"
  | "tohoku"
  | "kanto"
  | "chubu"
  | "kansai"
  | "chugoku"
  | "shikoku"
  | "kyushu"
  | "okinawa";

export type Messages = {
  locale_name: string;
  language_label: string;
  github_label: string;
  html_title: string;
  title: string;
  subtitle: (total: number, shown: number) => string;
  search_placeholder: string;
  section_location: string;
  country_label: string;
  all_countries: string;
  region_label: string;
  all_regions: string;
  japan_regions: Record<JapanRegionKey, string>;
  city_label: string;
  all_cities: string;
  district_label: string;
  all_districts: string;
  section_category: string;
  section_season: string;
  section_list: string;
  clear: string;
  open_only: string;
  empty: string;
  footer: string;
  source_label: string;
  source_updated: (updated: string) => string;
  map_tokyo: string;
  map_fit_all: string;
  map_loading: string;
  map_error: string;
  toggle_open: string;
  toggle_close: string;
  pop_dish: string;
  pop_address: string;
  pop_notes: string;
  pop_google: string;
  pop_tabelog: string;
  status: Record<"open" | "closed" | "unknown", string>;
  categories: Record<CategoryKey, string>;
  series: Record<"manga" | "special" | "streaming_original" | "each", string>;
  episode_badge: (season_key: string, episode: number) => string;
};

const zh_cn: Messages = {
  locale_name: "简体中文",
  language_label: "语言",
  github_label: "在 GitHub 查看源代码",
  html_title: "孤独的美食家 · 圣地巡礼地图",
  title: "孤独的美食家 · 圣地巡礼地图",
  subtitle: (t, s) => `来源地图收录 ${t} 个地点 · 当前显示 ${s} 个`,
  search_placeholder: "搜索店名 / 菜品 / 地区…",
  section_location: "区域",
  country_label: "国家或地区",
  all_countries: "全部国家和地区",
  region_label: "日本地区",
  all_regions: "全部日本地区",
  japan_regions: {
    hokkaido: "北海道",
    tohoku: "东北",
    kanto: "关东",
    chubu: "中部",
    kansai: "关西",
    chugoku: "中国地方",
    shikoku: "四国",
    kyushu: "九州",
    okinawa: "冲绳",
  },
  city_label: "城市",
  all_cities: "全部城市",
  district_label: "商圈",
  all_districts: "全部商圈",
  section_category: "分类",
  section_season: "作品 / 季",
  section_list: "地点列表",
  clear: "清除",
  open_only: "只看标为营业中的地点",
  empty: "没有符合条件的地点",
  footer: "营业信息可能有变动，出发前请向店铺确认",
  source_label: "数据来源",
  source_updated: (updated) => `来源更新于 ${updated}`,
  map_tokyo: "东京都心",
  map_fit_all: "全部范围",
  map_loading: "地图加载中…",
  map_error: "Mapbox 地图加载失败，请检查访问令牌配置",
  toggle_open: "☰ 筛选 / 列表",
  toggle_close: "✕ 关闭",
  pop_dish: "五郎的一餐",
  pop_address: "地址",
  pop_notes: "备注",
  pop_google: "Google 地图 ↗",
  pop_tabelog: "食べログ搜索 ↗",
  status: { open: "营业中", closed: "已闭店", unknown: "不确定" },
  categories: {
    yakiniku_bbq: "烧肉·烤肉",
    ramen: "拉面",
    chinese_cuisine: "中华料理",
    teishoku_diner: "定食·食堂",
    izakaya_bar: "居酒屋·酒场",
    western_cuisine: "洋食·西餐",
    curry: "咖喱",
    sushi_seafood: "寿司·海鲜",
    soba_udon: "荞麦·乌冬",
    yakitori_skewers: "串烧·烤鸡",
    okonomiyaki_teppanyaki: "御好烧·铁板烧",
    asian_ethnic: "亚洲·异国料理",
    sweets_cafe: "甜点·咖啡",
    other: "其他",
  },
  series: { manga: "漫画", special: "SP", streaming_original: "配信", each: "各自" },
  episode_badge: (k, e) =>
    k === "MANGA"
      ? `漫画 第${e}话`
      : k === "SP"
        ? `SP·${e}`
        : k === "ORIGINAL"
          ? "配信原创"
          : k === "EACH"
            ? `各自 第${e}话`
            : `${k} 第${e}集`,
};

const zh_tw: Messages = {
  locale_name: "繁體中文（台灣）",
  language_label: "語言",
  github_label: "在 GitHub 查看原始碼",
  html_title: "孤獨的美食家 · 聖地巡禮地圖",
  title: "孤獨的美食家 · 聖地巡禮地圖",
  subtitle: (t, s) => `來源地圖收錄 ${t} 個地點 · 目前顯示 ${s} 個`,
  search_placeholder: "搜尋店名 / 菜色 / 地區…",
  section_location: "地區",
  country_label: "國家或地區",
  all_countries: "所有國家與地區",
  region_label: "日本地區",
  all_regions: "所有日本地區",
  japan_regions: {
    hokkaido: "北海道",
    tohoku: "東北",
    kanto: "關東",
    chubu: "中部",
    kansai: "關西",
    chugoku: "中國地方",
    shikoku: "四國",
    kyushu: "九州",
    okinawa: "沖繩",
  },
  city_label: "城市",
  all_cities: "所有城市",
  district_label: "商圈",
  all_districts: "所有商圈",
  section_category: "分類",
  section_season: "作品 / 季",
  section_list: "地點列表",
  clear: "清除",
  open_only: "只看標示為營業中的地點",
  empty: "沒有符合條件的地點",
  footer: "營業資訊可能有變動，出發前請向店家確認",
  source_label: "資料來源",
  source_updated: (updated) => `來源更新於 ${updated}`,
  map_tokyo: "東京都心",
  map_fit_all: "全部範圍",
  map_loading: "地圖載入中…",
  map_error: "Mapbox 地圖載入失敗，請檢查存取權杖設定",
  toggle_open: "☰ 篩選 / 列表",
  toggle_close: "✕ 關閉",
  pop_dish: "五郎的一餐",
  pop_address: "地址",
  pop_notes: "備註",
  pop_google: "Google 地圖 ↗",
  pop_tabelog: "食べログ搜尋 ↗",
  status: { open: "營業中", closed: "已歇業", unknown: "不確定" },
  categories: {
    yakiniku_bbq: "燒肉·烤肉",
    ramen: "拉麵",
    chinese_cuisine: "中華料理",
    teishoku_diner: "定食·食堂",
    izakaya_bar: "居酒屋·酒場",
    western_cuisine: "洋食·西餐",
    curry: "咖哩",
    sushi_seafood: "壽司·海鮮",
    soba_udon: "蕎麥·烏龍麵",
    yakitori_skewers: "串燒·烤雞",
    okonomiyaki_teppanyaki: "大阪燒·鐵板燒",
    asian_ethnic: "亞洲·異國料理",
    sweets_cafe: "甜點·咖啡",
    other: "其他",
  },
  series: { manga: "漫畫", special: "SP", streaming_original: "配信", each: "各自" },
  episode_badge: (k, e) =>
    k === "MANGA"
      ? `漫畫 第${e}話`
      : k === "SP"
        ? `SP·${e}`
        : k === "ORIGINAL"
          ? "配信原創"
          : k === "EACH"
            ? `各自 第${e}話`
            : `${k} 第${e}集`,
};

const zh_hk: Messages = {
  locale_name: "繁體中文（香港）",
  language_label: "語言",
  github_label: "在 GitHub 查看原始碼",
  html_title: "孤獨的美食家 · 聖地巡禮地圖",
  title: "孤獨的美食家 · 聖地巡禮地圖",
  subtitle: (t, s) => `來源地圖收錄 ${t} 個地點 · 現時顯示 ${s} 個`,
  search_placeholder: "搜尋店名 / 菜式 / 地區…",
  section_location: "地區",
  country_label: "國家或地區",
  all_countries: "所有國家及地區",
  region_label: "日本地區",
  all_regions: "所有日本地區",
  japan_regions: {
    hokkaido: "北海道",
    tohoku: "東北",
    kanto: "關東",
    chubu: "中部",
    kansai: "關西",
    chugoku: "中國地方",
    shikoku: "四國",
    kyushu: "九州",
    okinawa: "沖繩",
  },
  city_label: "城市",
  all_cities: "所有城市",
  district_label: "商圈",
  all_districts: "所有商圈",
  section_category: "分類",
  section_season: "作品 / 季",
  section_list: "地點列表",
  clear: "清除",
  open_only: "只顯示標示為營業中的地點",
  empty: "沒有符合條件的地點",
  footer: "營業資料可能有變動，出發前請向店舖確認",
  source_label: "資料來源",
  source_updated: (updated) => `來源更新於 ${updated}`,
  map_tokyo: "東京都心",
  map_fit_all: "全部範圍",
  map_loading: "地圖載入中…",
  map_error: "Mapbox 地圖載入失敗，請檢查存取權杖設定",
  toggle_open: "☰ 篩選 / 列表",
  toggle_close: "✕ 關閉",
  pop_dish: "五郎的一餐",
  pop_address: "地址",
  pop_notes: "備註",
  pop_google: "Google 地圖 ↗",
  pop_tabelog: "食べログ搜尋 ↗",
  status: { open: "營業中", closed: "已結業", unknown: "不確定" },
  categories: {
    yakiniku_bbq: "燒肉·燒烤",
    ramen: "拉麵",
    chinese_cuisine: "中華料理",
    teishoku_diner: "定食·食堂",
    izakaya_bar: "居酒屋·酒場",
    western_cuisine: "洋食·西餐",
    curry: "咖喱",
    sushi_seafood: "壽司·海鮮",
    soba_udon: "蕎麥·烏冬",
    yakitori_skewers: "串燒·燒鳥",
    okonomiyaki_teppanyaki: "大阪燒·鐵板燒",
    asian_ethnic: "亞洲·異國料理",
    sweets_cafe: "甜品·咖啡",
    other: "其他",
  },
  series: { manga: "漫畫", special: "SP", streaming_original: "配信", each: "各自" },
  episode_badge: (k, e) =>
    k === "MANGA"
      ? `漫畫 第${e}話`
      : k === "SP"
        ? `SP·${e}`
        : k === "ORIGINAL"
          ? "配信原創"
          : k === "EACH"
            ? `各自 第${e}話`
            : `${k} 第${e}集`,
};

const ja: Messages = {
  locale_name: "日本語",
  language_label: "言語",
  github_label: "GitHub でソースコードを見る",
  html_title: "孤独のグルメ 聖地巡礼マップ",
  title: "聖地巡礼グルメマップ",
  subtitle: (t, s) => `元マップ収録 ${t} スポット · 表示中 ${s}`,
  search_placeholder: "店名・料理・エリアで検索…",
  section_location: "エリア",
  country_label: "国・地域",
  all_countries: "すべての国・地域",
  region_label: "地方",
  all_regions: "すべての地方",
  japan_regions: {
    hokkaido: "北海道",
    tohoku: "東北",
    kanto: "関東",
    chubu: "中部",
    kansai: "関西",
    chugoku: "中国",
    shikoku: "四国",
    kyushu: "九州",
    okinawa: "沖縄",
  },
  city_label: "都市",
  all_cities: "すべての都市",
  district_label: "エリア",
  all_districts: "すべてのエリア",
  section_category: "ジャンル",
  section_season: "作品 / シーズン",
  section_list: "スポット一覧",
  clear: "クリア",
  open_only: "営業中と記載されたスポットのみ",
  empty: "条件に合うスポットがありません",
  footer: "営業情報は変更される場合があります。訪問前に店舗へご確認ください",
  source_label: "データ出典",
  source_updated: (updated) => `出典の更新: ${updated}`,
  map_tokyo: "東京都心",
  map_fit_all: "全体表示",
  map_loading: "地図を読み込み中…",
  map_error: "Mapboxを読み込めません。アクセストークンをご確認ください",
  toggle_open: "☰ フィルター / リスト",
  toggle_close: "✕ 閉じる",
  pop_dish: "五郎の一食",
  pop_address: "住所",
  pop_notes: "メモ",
  pop_google: "Google マップ ↗",
  pop_tabelog: "食べログで検索 ↗",
  status: { open: "営業中", closed: "閉店", unknown: "不明" },
  categories: {
    yakiniku_bbq: "焼肉",
    ramen: "ラーメン",
    chinese_cuisine: "中華料理",
    teishoku_diner: "定食・食堂",
    izakaya_bar: "居酒屋・酒場",
    western_cuisine: "洋食",
    curry: "カレー",
    sushi_seafood: "寿司・海鮮",
    soba_udon: "そば・うどん",
    yakitori_skewers: "焼き鳥・串焼き",
    okonomiyaki_teppanyaki: "お好み焼き・鉄板焼き",
    asian_ethnic: "アジア・エスニック",
    sweets_cafe: "スイーツ・喫茶",
    other: "その他",
  },
  series: { manga: "漫画", special: "SP", streaming_original: "配信", each: "それぞれ" },
  episode_badge: (k, e) =>
    k === "MANGA"
      ? `漫画 第${e}話`
      : k === "SP"
        ? `SP·${e}`
        : k === "ORIGINAL"
          ? "配信オリジナル"
          : k === "EACH"
            ? `それぞれ 第${e}話`
            : `${k} 第${e}話`,
};

const en: Messages = {
  locale_name: "English",
  language_label: "Language",
  github_label: "View source on GitHub",
  html_title: "Solitary Gourmet Pilgrimage Map",
  title: "Solitary Gourmet Pilgrimage Map",
  subtitle: (t, s) => `${t} places from the source map · showing ${s}`,
  search_placeholder: "Search name / dish / area…",
  section_location: "Area",
  country_label: "Country or region",
  all_countries: "All countries and regions",
  region_label: "Japan region",
  all_regions: "All Japan regions",
  japan_regions: {
    hokkaido: "Hokkaido",
    tohoku: "Tohoku",
    kanto: "Kanto",
    chubu: "Chubu",
    kansai: "Kansai",
    chugoku: "Chugoku",
    shikoku: "Shikoku",
    kyushu: "Kyushu",
    okinawa: "Okinawa",
  },
  city_label: "City",
  all_cities: "All cities",
  district_label: "District",
  all_districts: "All districts",
  section_category: "Category",
  section_season: "Series / Season",
  section_list: "Places",
  clear: "Clear",
  open_only: "Places marked as open only",
  empty: "No places match your filters",
  footer: "Opening details may change; confirm with the venue before visiting",
  source_label: "Data source",
  source_updated: (updated) => `Source updated ${updated}`,
  map_tokyo: "Central Tokyo",
  map_fit_all: "Fit all",
  map_loading: "Loading map…",
  map_error: "Mapbox could not load; check the access token configuration",
  toggle_open: "☰ Filters / List",
  toggle_close: "✕ Close",
  pop_dish: "Goro's meal",
  pop_address: "Address",
  pop_notes: "Notes",
  pop_google: "Google Maps ↗",
  pop_tabelog: "Tabelog ↗",
  status: { open: "Open", closed: "Closed", unknown: "Unknown" },
  categories: {
    yakiniku_bbq: "Yakiniku / BBQ",
    ramen: "Ramen",
    chinese_cuisine: "Chinese",
    teishoku_diner: "Teishoku / Diner",
    izakaya_bar: "Izakaya / Bar",
    western_cuisine: "Yoshoku / Western",
    curry: "Curry",
    sushi_seafood: "Sushi / Seafood",
    soba_udon: "Soba / Udon",
    yakitori_skewers: "Yakitori / Skewers",
    okonomiyaki_teppanyaki: "Okonomiyaki / Teppan",
    asian_ethnic: "Asian / Ethnic",
    sweets_cafe: "Sweets / Café",
    other: "Other",
  },
  series: { manga: "Manga", special: "SP", streaming_original: "Stream", each: "Each" },
  episode_badge: (k, e) =>
    k === "MANGA"
      ? `Manga #${e}`
      : k === "SP"
        ? `SP ${e}`
        : k === "ORIGINAL"
          ? "Streaming original"
          : k === "EACH"
            ? `Each E${e}`
            : `${k} E${e}`,
};

const ko: Messages = {
  locale_name: "한국어",
  language_label: "언어",
  github_label: "GitHub에서 소스 코드 보기",
  html_title: "고독한 미식가 성지순례 지도",
  title: "고독한 미식가 성지순례 지도",
  subtitle: (t, s) => `원본 지도 수록 ${t}곳 · 표시 중 ${s}곳`,
  search_placeholder: "가게 이름 / 메뉴 / 지역 검색…",
  section_location: "지역",
  country_label: "국가 또는 지역",
  all_countries: "모든 국가 및 지역",
  region_label: "일본 권역",
  all_regions: "모든 일본 권역",
  japan_regions: {
    hokkaido: "홋카이도",
    tohoku: "도호쿠",
    kanto: "간토",
    chubu: "주부",
    kansai: "간사이",
    chugoku: "주고쿠",
    shikoku: "시코쿠",
    kyushu: "규슈",
    okinawa: "오키나와",
  },
  city_label: "도시",
  all_cities: "모든 도시",
  district_label: "상권",
  all_districts: "모든 상권",
  section_category: "분류",
  section_season: "작품 / 시즌",
  section_list: "장소 목록",
  clear: "지우기",
  open_only: "영업 중으로 표시된 장소만",
  empty: "조건에 맞는 장소가 없습니다",
  footer: "영업 정보는 변경될 수 있으니 방문 전에 확인하세요",
  source_label: "데이터 출처",
  source_updated: (updated) => `출처 업데이트 ${updated}`,
  map_tokyo: "도쿄 도심",
  map_fit_all: "전체 보기",
  map_loading: "지도 불러오는 중…",
  map_error: "Mapbox를 불러올 수 없습니다. 액세스 토큰 설정을 확인하세요",
  toggle_open: "☰ 필터 / 목록",
  toggle_close: "✕ 닫기",
  pop_dish: "고로의 한 끼",
  pop_address: "주소",
  pop_notes: "비고",
  pop_google: "구글 지도 ↗",
  pop_tabelog: "타베로그 검색 ↗",
  status: { open: "영업 중", closed: "폐업", unknown: "불확실" },
  categories: {
    yakiniku_bbq: "야키니쿠·고기구이",
    ramen: "라멘",
    chinese_cuisine: "중화요리",
    teishoku_diner: "정식·식당",
    izakaya_bar: "이자카야·술집",
    western_cuisine: "양식",
    curry: "카레",
    sushi_seafood: "스시·해산물",
    soba_udon: "소바·우동",
    yakitori_skewers: "야키토리·꼬치",
    okonomiyaki_teppanyaki: "오코노미야키·철판구이",
    asian_ethnic: "아시아·이국 요리",
    sweets_cafe: "디저트·카페",
    other: "기타",
  },
  series: { manga: "만화", special: "SP", streaming_original: "스트리밍", each: "각자의" },
  episode_badge: (k, e) =>
    k === "MANGA"
      ? `만화 ${e}화`
      : k === "SP"
        ? `SP ${e}`
        : k === "ORIGINAL"
          ? "스트리밍 오리지널"
          : k === "EACH"
            ? `각자의 ${e}화`
            : `${k} ${e}화`,
};

export const MESSAGES: Record<Locale, Messages> = {
  "zh-CN": zh_cn,
  "zh-TW": zh_tw,
  "zh-HK": zh_hk,
  ja,
  en,
  ko,
};
