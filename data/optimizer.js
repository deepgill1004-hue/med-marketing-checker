// 醫美爆款優化引擎 v0.2
// 25 條 Hook + 9 平台公式 + 10 內容類型 + 7 結構模板 + 15 合規 CTA + 視覺規則

window.OPTIMIZER = {
  meta: { version: "0.2", updated: "2026-05-17" },

  // ====== 9 大平台公式 ======
  platform_formulas: {
    FB: {
      label: "FB 粉專",
      structure: "故事化長文 Hook(1-2句) → 場景還原(對話/動作) → 反轉/數字 → 軟性 CTA",
      word_count: [300, 800],
      hook_max: 50,
      hashtag: [2, 5],
      best_time: "12-13、20-22",
      algo_note: "Meta 對「互動誘餌」降權，改用「真實價值觸發互動」；停留 >12 秒觸發加權"
    },
    IG: {
      label: "IG 貼文",
      structure: "封面大字 Hook → 內頁拆解 6-10 頁 → 收藏型結尾",
      word_count: [100, 300],
      hook_max: 15,
      hashtag: [5, 10],
      best_time: "12、20、22:30",
      algo_note: "2025 標籤紅利結束，主要靠完播/收藏/分享；Carousel > Reels > 單圖"
    },
    Threads: {
      label: "Threads",
      structure: "一句話 Hook（情緒/觀點/反差）→ 1-2 段補述 → 拋問題",
      word_count: [100, 280],
      hook_max: 30,
      hashtag: [0, 2],
      best_time: "—",
      algo_note: "2025 改版：降低非追蹤者推薦、加重追蹤者觸及；看「回覆數」為主"
    },
    "小紅書": {
      label: "小紅書",
      structure: "封面爆款標題 → 痛點/場景 3 秒 → 分點專業降維 → 真實體感 → 互動提問",
      word_count: [300, 600],
      hook_max: 20,
      hashtag: [3, 5],
      best_time: "—",
      algo_note: "30% 流量來自搜尋，SEO 必布局；短影音 > 圖文（曝光 2.4 倍）"
    },
    LINE_OA: {
      label: "LINE OA",
      structure: "問候 → 重點摘要 → 引導動作",
      word_count: [100, 300],
      hook_max: 30,
      hashtag: [0, 0],
      best_time: "—",
      algo_note: "LINE OA 群發屬廣告，價格／促銷／BA 照同樣禁"
    },
    LinkedIn: {
      label: "LinkedIn",
      structure: "個人故事/觀察 Hook → 產業洞察 → 數據/案例 → 開放討論",
      word_count: [1000, 1500],
      hook_max: 60,
      hashtag: [3, 5],
      best_time: "—",
      algo_note: "B2B 場合，職業可信度＋洞察深度＝轉發資產"
    },
  },

  // ====== Hook 公式 25 條 ======
  hooks: [
    { id: "H01", template: "千萬別再 {topic} 了，90% 的人都做錯", scene: "衛教糾錯", platform: ["FB","IG","抖音","小紅書"], psych: "權威+從眾恐懼", compliance: "✅" },
    { id: "H02", template: "打完 {treatment} 第 30 天我慌了…第 60 天跪了", scene: "療程體驗", platform: ["小紅書","Threads","IG"], psych: "時間線懸念", compliance: "✅" },
    { id: "H03", template: "我以前也以為 {misconception}，直到 {turning_point}", scene: "觀點翻轉", platform: ["FB","Threads"], psych: "認知反差", compliance: "✅" },
    { id: "H04", template: "30 秒告訴你 {treatment} 真相", scene: "知識速食", platform: ["IG","抖音"], psych: "時間承諾", compliance: "✅" },
    { id: "H05", template: "{age}+ 才知道的 {topic} 保養真相", scene: "分齡保養", platform: ["IG","小紅書","FB"], psych: "身份歸屬", compliance: "✅" },
    { id: "H06", template: "為什麼你 {problem} 總是好不了？因為沒人告訴你這 3 件事", scene: "痛點解構", platform: ["FB","IG","Threads"], psych: "好奇缺口", compliance: "✅" },
    { id: "H07", template: "10 年護理師告訴你：{insight}", scene: "權威背書", platform: ["FB","Threads","LinkedIn"], psych: "資歷信任", compliance: "✅" },
    { id: "H08", template: "{treatment_a} vs {treatment_b}，差在哪？一張表看懂", scene: "比較選擇", platform: ["IG","小紅書"], psych: "降低決策焦慮", compliance: "✅" },
    { id: "H09", template: "問了 100 位顧客，最後悔做的療程是…", scene: "反向操作", platform: ["FB","IG","小紅書"], psych: "好奇+避險", compliance: "✅" },
    { id: "H10", template: "做完 {treatment} 才知道：醫師沒告訴你的 3 件事", scene: "揭密型", platform: ["小紅書","IG"], psych: "禁忌資訊", compliance: "⚠️" },
    { id: "H11", template: "{身份}+{場景}+{解決方案}（例：上班族 30 秒卸妝法）", scene: "場景化", platform: ["IG","小紅書"], psych: "對號入座", compliance: "✅" },
    { id: "H12", template: "你以為 {result} 是 {wrong_reason}？其實是 {truth}", scene: "破解迷思", platform: ["FB","IG"], psych: "認知衝突", compliance: "✅" },
    { id: "H13", template: "{treatment} 怕痛？我幫你問了 3 位醫師", scene: "FAQ 代問", platform: ["小紅書","IG","Threads"], psych: "降低決策焦慮", compliance: "✅" },
    { id: "H14", template: "原來 {trend} 都在做這個", scene: "趨勢借勢", platform: ["IG","小紅書"], psych: "從眾+FOMO", compliance: "⚠️" },
    { id: "H15", template: "8 年醫美離職，隨便問！沒什麼可怕的", scene: "求助/開放型", platform: ["小紅書","Threads"], psych: "互動誘餌+信任", compliance: "✅" },
    { id: "H16", template: "醫師說可以做，但我建議你先看這個", scene: "理性退讓", platform: ["FB","YouTube"], psych: "反向銷售=信任", compliance: "✅" },
    { id: "H17", template: "{season}+{need}，這 3 個療程值得排隊", scene: "季節時機", platform: ["IG","小紅書","FB"], psych: "時間壓力", compliance: "⚠️" },
    { id: "H18", template: "凌晨 3 點，我接到她的訊息：『我做錯了嗎？』", scene: "故事化", platform: ["FB","Threads"], psych: "懸念+情緒", compliance: "✅" },
    { id: "H19", template: "{treatment} 不是不能做，是 {condition} 才能做", scene: "專業判斷", platform: ["FB","IG","Threads"], psych: "權威+排除法", compliance: "✅" },
    { id: "H20", template: "存起來！{treatment} 術前必問的 5 個問題", scene: "工具型", platform: ["IG","小紅書"], psych: "收藏動機", compliance: "✅" },
    { id: "H21", template: "{price_a}元 vs {price_b}元，差別不只在價錢", scene: "價格反差", platform: ["小紅書","IG"], psych: "好奇+避坑", compliance: "⚠️" },
    { id: "H22", template: "她說『我只是想看起來不累』", scene: "顧客原話切入", platform: ["FB","Threads"], psych: "情緒共鳴", compliance: "✅" },
    { id: "H23", template: "{treatment} 後悔指數排行榜：第 1 名是…", scene: "排行榜+懸念", platform: ["小紅書","IG"], psych: "好奇缺口", compliance: "✅" },
    { id: "H24", template: "如果你 {age}+，這篇你一定要存", scene: "身份標籤", platform: ["IG","FB","小紅書"], psych: "對號入座+FOMO", compliance: "✅" },
    { id: "H25", template: "保養品擦再多都沒用，除非你{action}", scene: "金句斷言", platform: ["Threads","FB","IG"], psych: "認知衝突+分享欲", compliance: "✅" },
  ],

  // ====== 高轉換內容類型 Top 10 ======
  content_types: [
    { rank: 1, type: "FAQ 解答型", conv: "★★★★★", why: "70% 用戶評論集中在「痛不痛、恢復期、效果多久」", example: "打水光 10 個最常問問題" },
    { rank: 2, type: "比較選擇型", conv: "★★★★★", why: "決策前看比較表=最高意圖訊號，收藏率最高", example: "音波 vs 電波 vs 鳳凰電波一張表" },
    { rank: 3, type: "衛教知識型", conv: "★★★★", why: "建立專業信任資產，長尾 SEO 友善", example: "為什麼皮膚會老化的 3 個機制" },
    { rank: 4, type: "醫師/從業者人設型", conv: "★★★★", why: "信任轉移效應，個人 IP > 機構 IP", example: "10 年護理師告訴你" },
    { rank: 5, type: "痛點共鳴型", conv: "★★★★", why: "對號入座=分享動機", example: "30+ 媽媽臉的 5 個訊號" },
    { rank: 6, type: "反向操作型（勸退）", conv: "★★★★", why: "理性退讓=反向建立信任，違反銷售直覺=高記憶點", example: "這 5 種人不適合做電波" },
    { rank: 7, type: "名詞解釋型", conv: "★★★", why: "SEO 友善，搜尋導向流量", example: "什麼是 PN？跟 PRP 差在哪" },
    { rank: 8, type: "過程揭密型", conv: "★★★", why: "好奇心驅動，紓解神祕感", example: "做療程當天的全流程" },
    { rank: 9, type: "季節時機型", conv: "★★★", why: "時間錨點觸發行動", example: "夏天結束就該打的 3 個療程" },
    { rank: 10, type: "數據視覺型", conv: "★★★", why: "圖表=可信度+收藏動機", example: "膠原蛋白流失曲線圖" },
  ],

  // ====== 7 結構模板 ======
  structures: [
    { id: "T01", name: "AIDA 醫美版", flow: ["Hook 痛點", "場景還原（人物+對話）", "專業解構", "個人觀點", "軟性 CTA"], best_for: ["FB", "LinkedIn"] },
    { id: "T02", name: "PAS 問題解法", flow: ["Problem 點出問題", "Agitate 放大焦慮", "Solution 給解法"], best_for: ["IG", "抖音", "Reels"] },
    { id: "T03", name: "FAQ 式", flow: ["封面：10 個問題", "Q1-Q10 每題 1 頁 50 字", "結尾：留言問我"], best_for: ["IG", "小紅書"] },
    { id: "T04", name: "反向勸退", flow: ["這 5 種人不適合做 X", "為什麼（醫學原理）", "那適合誰", "怎麼判斷自己"], best_for: ["FB", "IG", "Threads"] },
    { id: "T05", name: "時間線體驗", flow: ["第 1 天", "第 7 天", "第 30 天", "第 60 天", "我學到的事"], best_for: ["小紅書", "FB"] },
    { id: "T06", name: "對話體", flow: ["顧客原話", "我的回答", "背後的真相", "你可以這樣判斷"], best_for: ["Threads", "FB", "IG"] },
    { id: "T07", name: "比較表", flow: ["三選項並列", "5 維度比較（效果/痛感/恢復/價格/維持）", "適合誰", "我的建議"], best_for: ["IG", "小紅書"] },
  ],

  // ====== 合規 CTA 庫 15 條 ======
  ctas: [
    { id: "C01", text: "想了解更多，私訊我聊聊" },
    { id: "C02", text: "有問題留言，我幫你問醫師" },
    { id: "C03", text: "加 LINE，我整理一份給你" },
    { id: "C04", text: "存起來，下次諮詢拿出來問醫師" },
    { id: "C05", text: "你也遇過嗎？留言告訴我" },
    { id: "C06", text: "更完整版本放在我的 LINE" },
    { id: "C07", text: "想聽哪個療程拆解？留言點播" },
    { id: "C08", text: "FAQ 整理完放這裡（連結）" },
    { id: "C09", text: "怕忘了，先收藏一下" },
    { id: "C10", text: "標記一個該看的朋友" },
    { id: "C11", text: "下篇想看 A 還是 B？投票" },
    { id: "C12", text: "如果這篇對你有用，分享給需要的人" },
    { id: "C13", text: "諮詢前必問清單，放在 LINE" },
    { id: "C14", text: "想看實際過程？我下篇拆" },
    { id: "C15", text: "更多醫美知識，留在我的 LINE" },
  ],

  // 禁用 CTA
  forbidden_ctas: ["免費諮詢", "限時優惠", "保證有效", "原價OO特價OO", "立即購買", "下殺", "倒數", "獨家", "全網最低", "今天最後一天"],

  // ====== 視覺規則 ======
  visual_rules: {
    cover: {
      title_chars: [8, 15],
      font_priority: "粗黑體 > 明體",
      color_combos: [
        { name: "信任專業", primary: "#1a3a5c", accent: "#f5f1ea" },
        { name: "溫柔醫美", primary: "#d4a59a", accent: "#3a3a3a" },
        { name: "高級感", primary: "#0a0a0a", accent: "#c9a961" },
        { name: "潔淨科技", primary: "#ffffff", accent: "#5b8def" },
      ],
      contrast_rule: "對比比 ≥ 4.5:1",
      layout: "三分法／中央放大主標／留白 ≥ 30%"
    },
    reels: {
      first_3_sec: ["人臉特寫", "視覺反差畫面", "大字 Hook 字幕"],
      subtitle: "全程字幕、字大、底色塊、置中下三分之一",
      pace: "1-2 秒一個鏡頭切換",
      duration_sweet: [15, 30],
      must_have: ["熱門音訊", "結尾 Loop 讓人想重看"]
    },
    carousel: {
      pages: [6, 10],
      first_page: "封面大字 Hook",
      last_page: "CTA + 引導收藏/留言",
      consistency: "全篇統一配色+字型+版型骨架"
    }
  },

  // ====== Hashtag 與 SEO ======
  hashtags: {
    IG: ["#醫美", "#醫美推薦", "#台北醫美", "#皮膚保養", "#抗老", "#電波音波", "#玻尿酸", "#肉毒", "#童顏針", "#少女針", "#PRP", "#再生醫學", "#GLP1", "#prejuvenation"],
    "小紅書": ["#医美日记", "#抗老", "#童颜针", "#少女针", "#水光针", "#光电项目", "#prp", "#超声炮", "#热玛吉", "#GLP1脸"],
    Threads: [],
    seo_long_tail: ["童顏針推薦", "PN PRP 差別", "電波音波選擇", "GLP-1 臉", "PLLA 是什麼", "聚左旋乳酸效果", "外泌體療程", "口服美容成分", "NAD+ 保健品", "Prejuvenation 預防醫美"]
  },

  // ====== 替換策略（紅線詞 → 合規重寫提示）======
  rewrite_strategies: [
    { from: "保證有效", to: "依個人體質效果不同，建議先諮詢評估", tip: "把保證換成「個人化」反而更可信" },
    { from: "限時優惠", to: "本月開放預約諮詢時段有限", tip: "把優惠改成「時段限制」屬合規招攬" },
    { from: "免費諮詢", to: "歡迎來電了解療程資訊", tip: "去掉「免費」二字仍可導流" },
    { from: "立即見效", to: "多數人在 2-4 週後可觀察到變化", tip: "具體時間範圍比「立即」更具說服力" },
    { from: "無痛", to: "搭配麻醉降低不適感，多數人可以接受", tip: "誠實風險敘述反而提高信任" },
    { from: "最有效", to: "目前臨床上常見的選擇之一", tip: "用「常見」「之一」代替最高級" },
    { from: "童顏針", to: "聚左旋乳酸（Sculptra 舒顏萃）", tip: "用核准仿單名稱" },
    { from: "韓星指定", to: "近年常見討論的療程", tip: "去除名人聯想，改為趨勢敘述" },
    { from: "永久", to: "效果可維持較長時間（依個人狀況）", tip: "醫療不得保證永久" },
    { from: "週年慶優惠", to: "本月新療程上線資訊", tip: "完全去除促銷字眼，改為「資訊類」" },
  ],

  // ====== 評分維度 ======
  scoring_dimensions: [
    { id: "hook_strength", name: "開頭抓眼力", weight: 25 },
    { id: "info_density", name: "資訊密度", weight: 20 },
    { id: "emotion", name: "情緒共鳴", weight: 15 },
    { id: "credibility", name: "可信度", weight: 15 },
    { id: "cta_clarity", name: "行動指引", weight: 15 },
    { id: "compliance", name: "合規程度", weight: 10 },
  ],

  // ====== 心法（顯示在工具側邊提示）======
  golden_rules: [
    "2025 演算法共識：標籤紅利結束 → 完播率＋收藏／分享／留言質量",
    "醫美內容三鐵則：降焦慮 > 講效果；信任資產 > 促銷話術；個人 IP > 機構 IP",
    "小紅書是醫美決策第一站（30% 來自搜尋）",
    "Threads 2025 改版後素人爆紅難度大幅提升",
    "合規最大坑：保養品誤用醫療詞（罰 60-500 萬）、最高級用語、價格促銷",
    "反向操作（勸退式）= 信任資產，違反銷售直覺反而是最強記憶點",
  ]
};
