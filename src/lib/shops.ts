type Shop = {
  id: string;
  name: string;
  brand: "ag" | "ol" | "jis";
  prefecture: string;
  order: number;
};

const PREFECTURE_ORDER = {
  "東京": 1,
  "大阪": 2,
  "愛知": 3,
  "北海道": 4,
  "青森": 5,
  "岩手": 6,
  "宮城": 7,
  "秋田": 8,
  "山形": 9,
  "福島": 10,
  "茨城": 11,
  "栃木": 12,
  "群馬": 13,
  "埼玉": 14,
  "千葉": 15,
  "神奈川": 16,
  "新潟": 17,
  "富山": 18,
  "石川": 19,
  "福井": 20,
  "山梨": 21,
  "長野": 22,
  "岐阜": 23,
  "静岡": 24,
  "三重": 25,
  "滋賀": 26,
  "京都": 27,
  "兵庫": 28,
  "奈良": 29,
  "和歌山": 30,
  "鳥取": 31,
  "島根": 32,
  "岡山": 33,
  "広島": 34,
  "山口": 35,
  "徳島": 36,
  "香川": 37,
  "愛媛": 38,
  "高知": 39,
  "福岡": 40,
  "佐賀": 41,
  "長崎": 42,
  "熊本": 43,
  "大分": 44,
  "宮崎": 45,
  "鹿児島": 46,
  "沖縄": 47,
  "韓国": 99,
};

export const shops: Shop[] = [
  // 北海道
  { id: "sapporo_ag", name: "札幌", brand: "ag", prefecture: "北海道", order: 1 },
  { id: "sapporo_jis", name: "札幌", brand: "jis", prefecture: "北海道", order: 2 },

  // 宮城
  { id: "sendai_ag", name: "仙台", brand: "ag", prefecture: "宮城", order: 1 },

  // 栃木
  { id: "utsunomiya_ol", name: "宇都宮", brand: "ol", prefecture: "栃木", order: 1 },

  // 群馬
  { id: "takasaki_ol", name: "高崎", brand: "ol", prefecture: "群馬", order: 1 },

  // 埼玉
  { id: "omiya_ol", name: "大宮", brand: "ol", prefecture: "埼玉", order: 1 },
  { id: "omiya_jis", name: "大宮", brand: "jis", prefecture: "埼玉", order: 2 },

  // 東京
  { id: "ueno_ag", name: "上野", brand: "ag", prefecture: "東京", order: 1 },
  { id: "ueno_ol", name: "上野", brand: "ol", prefecture: "東京", order: 2 },
  { id: "shibuya_ag", name: "渋谷", brand: "ag", prefecture: "東京", order: 3 },
  { id: "shinjuku_ol", name: "新宿", brand: "ol", prefecture: "東京", order: 4 },
  { id: "shinjuku_jis", name: "新宿", brand: "jis", prefecture: "東京", order: 5 },
  { id: "nishishinjuku_jis", name: "西新宿", brand: "jis", prefecture: "東京", order: 6 },
  { id: "shibuyahonten_ol", name: "渋谷本店", brand: "ol", prefecture: "東京", order: 7 },
  { id: "ebisu_ol", name: "恵比寿", brand: "ol", prefecture: "東京", order: 8 },
  { id: "machida_ol", name: "町田", brand: "ol", prefecture: "東京", order: 9 },

  // 神奈川
  { id: "yokohama_ol", name: "横浜", brand: "ol", prefecture: "神奈川", order: 1 },

  // 石川
  { id: "kanazawa_ag", name: "金沢", brand: "ag", prefecture: "石川", order: 1 },

  // 静岡
  { id: "shizuoka_ol", name: "静岡", brand: "ol", prefecture: "静岡", order: 1 },
  { id: "hamamatsu_ol", name: "浜松", brand: "ol", prefecture: "静岡", order: 2 },

  // 愛知
  { id: "nagoya_ag", name: "名古屋", brand: "ag", prefecture: "愛知", order: 1 },
  { id: "nagoyasakae_ol", name: "名古屋栄", brand: "ol", prefecture: "愛知", order: 2 },
  { id: "nagoyanishiki_ol", name: "名古屋錦", brand: "ol", prefecture: "愛知", order: 3 },

  // 京都
  { id: "kyoto_ol", name: "京都", brand: "ol", prefecture: "京都", order: 1 },

  // 大阪
  { id: "umeda_ag", name: "梅田", brand: "ag", prefecture: "大阪", order: 1 },
  { id: "umeda_jis", name: "梅田", brand: "jis", prefecture: "大阪", order: 2 },
  { id: "shinsaibashi_ol", name: "心斎橋", brand: "ol", prefecture: "大阪", order: 3 },
  { id: "namba_ol", name: "難波", brand: "ol", prefecture: "大阪", order: 4 },
  { id: "namba_jis", name: "難波", brand: "jis", prefecture: "大阪", order: 5 },
  { id: "temma_ol", name: "天満", brand: "ol", prefecture: "大阪", order: 6 },

  // 兵庫
  { id: "kobe_ol", name: "神戸", brand: "ol", prefecture: "兵庫", order: 1 },

  // 岡山
  { id: "okayama_ol", name: "岡山", brand: "ol", prefecture: "岡山", order: 1 },

  // 広島
  { id: "hiroshima_ag", name: "広島", brand: "ag", prefecture: "広島", order: 1 },

  // 愛媛
  { id: "matsuyama_jis", name: "松山", brand: "jis", prefecture: "愛媛", order: 1 },

  // 福岡
  { id: "kokura_ol", name: "小倉", brand: "ol", prefecture: "福岡", order: 1 },
  { id: "fukuoka_ol", name: "福岡", brand: "ol", prefecture: "福岡", order: 2 },
  { id: "fukuoka_jis", name: "福岡", brand: "jis", prefecture: "福岡", order: 3 },

  // 長崎
  { id: "nagasaki_ol", name: "長崎", brand: "ol", prefecture: "長崎", order: 1 },

  // 熊本
  { id: "kumamoto_ol", name: "熊本", brand: "ol", prefecture: "熊本", order: 1 },
  { id: "kumamoto_jis", name: "熊本", brand: "jis", prefecture: "熊本", order: 2 },

  // 宮崎
  { id: "miyazaki_ol", name: "宮崎", brand: "ol", prefecture: "宮崎", order: 1 },

  // 鹿児島
  { id: "kagoshima_ol", name: "鹿児島", brand: "ol", prefecture: "鹿児島", order: 1 },

  // 沖縄
  { id: "okinawa_ag", name: "沖縄", brand: "ag", prefecture: "沖縄", order: 1 },

  // 韓国
  { id: "gangnam_ol", name: "江南", brand: "ol", prefecture: "韓国", order: 1 },
];

export const getBrandName = (brand: Shop["brand"]) => {
  switch (brand) {
    case "ag":
      return "AG";
    case "ol":
      return "オリラジ";
    case "jis":
      return "JIS";
    default:
      return "";
  }
};

export const prefectures = Array.from(new Set(shops.map(shop => shop.prefecture)))
  .sort((a, b) => PREFECTURE_ORDER[a as keyof typeof PREFECTURE_ORDER] - PREFECTURE_ORDER[b as keyof typeof PREFECTURE_ORDER]);

export const getShopsByPrefecture = (prefecture: string) => {
  return shops
    .filter(shop => shop.prefecture === prefecture)
    .sort((a, b) => a.order - b.order);
};
