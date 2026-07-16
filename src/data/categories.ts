export type CategoryMeta = {
  key: CategoryKey;
  name: string;
  color: string;
  emoji: string;
};

export type CategoryKey =
  | "yakiniku_bbq"
  | "western_cuisine"
  | "ramen"
  | "teishoku_diner"
  | "okonomiyaki_teppanyaki"
  | "curry"
  | "asian_ethnic"
  | "yakitori_skewers"
  | "soba_udon"
  | "izakaya_bar"
  | "chinese_cuisine"
  | "sushi_seafood"
  | "sweets_cafe"
  | "other";

// 分类顺序即图例顺序；配色经 CVD（色觉障碍）区分度验证
export const CATEGORIES: CategoryMeta[] = [
  { key: "yakiniku_bbq", name: "烧肉·烤肉", color: "#e34948", emoji: "🥩" },
  { key: "western_cuisine", name: "洋食·西餐", color: "#2a78d6", emoji: "🍝" },
  { key: "ramen", name: "拉面", color: "#eda100", emoji: "🍜" },
  { key: "teishoku_diner", name: "定食·食堂", color: "#008300", emoji: "🍱" },
  {
    key: "okonomiyaki_teppanyaki",
    name: "御好烧·铁板烧",
    color: "#e87ba4",
    emoji: "🍳",
  },
  { key: "curry", name: "咖喱", color: "#a3570e", emoji: "🍛" },
  { key: "asian_ethnic", name: "亚洲·异国料理", color: "#1baf7a", emoji: "🌏" },
  { key: "yakitori_skewers", name: "串烧·烤鸡", color: "#b03060", emoji: "🍢" },
  { key: "soba_udon", name: "荞麦·乌冬", color: "#6b8e23", emoji: "🥢" },
  { key: "izakaya_bar", name: "居酒屋·酒场", color: "#4a3aa7", emoji: "🏮" },
  { key: "chinese_cuisine", name: "中华料理", color: "#eb6834", emoji: "🥟" },
  { key: "sushi_seafood", name: "寿司·海鲜", color: "#0794bd", emoji: "🍣" },
  { key: "sweets_cafe", name: "甜点·咖啡", color: "#9b7bd6", emoji: "☕" },
  { key: "other", name: "其他", color: "#5967c9", emoji: "🍚" },
];

export const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.name, c]));

export function categoryColor(name: string): string {
  return CATEGORY_MAP.get(name)?.color ?? "#5967c9";
}

export function categoryEmoji(name: string): string {
  return CATEGORY_MAP.get(name)?.emoji ?? "🍚";
}

export function categoryKey(name: string): CategoryKey {
  return CATEGORY_MAP.get(name)?.key ?? "other";
}
