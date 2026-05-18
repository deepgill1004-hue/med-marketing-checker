// 蘇菲 IP 真實業界數據池（2024-2026）
// 每筆都附 source，前端隨機抽用時必須同時帶出來源以保信任度

window.INDUSTRY_DATA = {
  meta: { version: "0.1", updated: "2026-05-18", note: "全部數字附公開可查證來源" },

  // ===== A. 用戶決策行為 =====
  user_behavior: [
    { fact: "Z 世代醫美話題討論聲量年增 38.48%", year: "2024", src: "BigData / 溫度計" },
    { fact: "Z 世代「身體」討論成長率 61.28%", year: "2024", src: "BigData 醫美洞察" },
    { fact: "台灣消費者做過醫美 23.2%、想嘗試但還沒做 64%", year: "2024", src: "溫度計 Survey" },
    { fact: "26-30 歲連續 3 年為醫美消費第一客群", year: "2024", src: "聖宜診所" },
    { fact: "40 歲以下年消費金額為 41 歲以上的 1.5 倍", year: "2024", src: "康健雜誌" },
    { fact: "25 歲以下抗老品購買成長 22%（Prejuvenation 趨勢）", year: "2024", src: "全球美容業數據" },
    { fact: "Threads 微整討論成長 17.6 倍", year: "2024 H1", src: "Threads 醫美熱點" },
    { fact: "一般小診所諮詢→預約轉換率 15-25%", year: "2024", src: "國際醫美 KPI benchmark" },
    { fact: "頂級診所諮詢→成交率可達 75%+（產業平均約 50%）", year: "2024", src: "aesthetic clinic 國際基準" },
    { fact: "2024 夏台灣赴韓醫美年增 867%、本土單量下滑 50%", year: "2024", src: "世界新聞網 / udn / 醫師公會" },
    { fact: "台灣醫美滲透率 8%，韓國 22.05%", year: "2024", src: "國際醫美滲透率比較" },
  ],

  // ===== B. 療程實證數據 =====
  treatments: {
    "玻尿酸": [
      { fact: "美學效果中位數 12-14 個月，部分產品可達 18 個月", src: "PRS Global Open 2024、MDPI Medicina 2025" },
      { fact: "MRI 顯示組織內可殘留多年（達 15 年），但效果非等同", src: "PRS Global Open 2024" },
    ],
    "肉毒": [
      { fact: "一般作用週期 3-4 個月，4-6 週達顛峰", src: "PMC 9217780、Cleveland Clinic" },
      { fact: "跨品牌研究：>50% 受試者改善持續達 20 週", src: "ScienceDirect 2020" },
    ],
    "電波": [
      { fact: "膠原新生啟動 2-3 個月、顛峰 6 個月、維持 1.5-2 年", src: "Thermage 原廠長期追蹤" },
    ],
    "音波": [
      { fact: "膠原生成顛峰 2-3 個月、維持 1-1.5 年（可達 2 年）", src: "Ulthera 原廠資料" },
    ],
    "皮秒": [
      { fact: "淺斑 3-5 次清除；深斑/肝斑 6-8 次清除；治療間隔 4-6 週", src: "PMC 7587240（2021 retrospective）" },
      { fact: "755nm 平均 4.3 次達 95-100% 清除（>96% 受試者）", src: "同上" },
    ],
    "聚左旋乳酸（Sculptra 舒顏萃）": [
      { fact: "標準療程 3 次、間隔 4-6 週，膠原顛峰 3-6 個月", src: "原廠資料 / FDA" },
      { fact: "平均維持約 25 個月", src: "原廠長期觀察" },
    ],
    "PRP": [
      { fact: "台灣 PRP 屬醫材，醫美用途屬適應症外使用、無健保", src: "TFDA / 仁慈醫院衛教" },
    ],
    "膠原蛋白口服": [
      { fact: "26 RCT / 1721 受試者 meta-analysis：12 週為最佳補充時長", src: "MDPI Nutrients 2023 (PMC10180699)" },
      { fact: "保水增加 7.33%、粗糙度改善 4.09%", src: "RSC Food & Function 2023" },
    ],
    "GLP-1": [
      { fact: "Wegovy 每週 1 針可減重 15%", src: "美容外科期刊 2024" },
      { fact: "Ozempic Face：頰脂肪墊 -69.9%、視覺年齡 +5 歲", src: "潮代診所 / Tresure" },
    ],
    "隆乳手術": [
      { fact: "Motiva 魔滴莢膜攣縮率 <1%、破裂率 <1%（長期追蹤）", src: "原廠資料 / 多家整外引用" },
      { fact: "原廠保固 10 年，台灣加 5 年保險最高補貼 2,500 美元", src: "Motiva 台灣官方" },
    ],
    "眼袋手術": [
      { fact: "結膜下入路滿意度 94.1%（VAS 92.8）、修正率 1-2%", src: "PubMed 23645352" },
      { fact: "長期追蹤 5-10 年仍維持高滿意度", src: "PubMed 32028371" },
    ],
    "拉皮手術": [
      { fact: "SMAS 拉皮平均維持 12 年（區間 7-15 年）、視覺年齡減 10-15 歲", src: "PubMed 20224461" },
      { fact: "Deep Plane 滿意度 94.4%、1 年回訪 97% 表示『結果很好或超出預期』", src: "Boston Plastic Surgery 2024 系統性回顧" },
    ],
  },

  // ===== C. 市場規模與趨勢 =====
  market_trends: [
    { fact: "台灣醫美市場規模 2023 突破 600 億元、年成長 11.8%", src: "遠見雜誌 / Fugle" },
    { fact: "輕醫美未來 CAGR 預估 32%", src: "Fugle 富果產業報告" },
    { fact: "全球醫美市場 2024 達 170.7 億美元，2032 預估 348.7 億，CAGR 9.34%", src: "Data Bridge 2025/3" },
    { fact: "特管辦法核准機構數 2019/5 為 168 家，2024/12 達 445 家（5.5 年增 165%）", src: "衛福部醫事司" },
    { fact: "再生醫療雙法 2026/1/1 上路，外泌體納管，注射或療效宣稱即違法，最重罰 2000 萬", src: "北美智權報 / 環球生技" },
  ],

  // ===== D. 社群行銷數據 =====
  social_metrics: [
    { fact: "IG 輪播互動率 0.52-0.91%、Reels 平均 1.48%", src: "SocialInsider 2024" },
    { fact: "美妝品牌 IG 平均互動率 2.8-4.5%、週發 Reels 7 則 vs 靜態 5 則", src: "beautymatter" },
    { fact: "LINE OA 精準分眾開封率 50-60%（無分眾僅 10-20%）", src: "Cresclab / Shopline" },
    { fact: "LINE OA 分眾後封鎖率下降 2.4 倍、開信率提升 3 倍", src: "LINE Biz 醫美 case study" },
    { fact: "淨妍醫美主帳 40 萬+ 好友，南部最高開封時段為週二早上 06:00", src: "LINE Biz 案例" },
    { fact: "2024 LINE 通知型訊息年增 4.5 倍", src: "LINE 官方" },
  ],

  // ===== E. LINE OA 黃金時段 =====
  line_best_time: ["週二 06:00", "週五 19:00", "週日 21:00"],

  // ===== F. LINE OA 開頭句型 10 條（醫美語境）=====
  line_hooks: [
    "{name} 我問你齁——{question}？",
    "昨天有客人 LINE 我問：「{question}？」",
    "這題我已經被問 8 次，今天一次講清楚。",
    "我知道你滑到這則想直接關掉。先別。",
    "{number} 個 30+ 女生最近都在做的事——",
    "醫美最貴的不是療程，是「做錯」這兩個字。",
    "{topic} 做完後悔的人，10 個有 7 個是因為這個原因 👇",
    "我剛從診所跟刀回來，講一個你 IG 滑不到的真相。",
    "如果你有 30 秒，這個資訊可能省你 3 萬。",
    "上週聊到 {topic}，今天把細節補齊。",
  ],

  // ===== G. LINE 互動鉤子 =====
  line_interactions: [
    "回 1 我傳完整療程比較表給你",
    "想看真實案例回「案例」",
    "A. 想保養 B. 想處理斑點 C. 想抗老 — 回字母我推你客製方案",
    "回「我」我幫你預留週末諮詢時段",
    "回「+1」鎖名額",
    "想知道你那次療程「該幾天看效果」，回療程名",
    "回「{topic}」我傳真實案例給你",
  ],

  // ===== H. 5 大 LINE OA 範本骨架 =====
  // 對應 content_types → 用哪個範本
  line_templates: {

    // 範本 A 知識教育型（信任資產、不易被封鎖）
    knowledge: (ctx, dataLine) =>
`✨ ${ctx.topic} 到底能撐多久？真相比你想的久

${dataLine}

所以你不是被坑——
是「資訊不對稱」。

📩 想看 ${ctx.topic} 怎麼選，回「${ctx.topic}」`,

    // 範本 B 限時優惠型（已改寫為合規版「諮詢名額」）
    limited: (ctx, dataLine) =>
`⏰ 本月諮詢時段有限

${ctx.topic} 不適合每個人。
${dataLine}

不是叫你今天決定。
是先佔諮詢名額，現場讓醫師看。

👇 回「諮詢」鎖時段`,

    // 範本 C 案例故事型（最高互動）
    case_story: (ctx, dataLine) =>
`昨天客人 LINE 我：
「打完 ${ctx.topic} 怎麼沒感覺？」

我問她：哪天打的？
她說：上週三。

我笑了。
${dataLine}

很多人不是效果差，是時間沒到。

🔍 想知道你那次療程「該幾天看效果」，回療程名`,

    // 範本 D 問答互動型（提升觸及、自動分眾貼標）
    interactive: (ctx, dataLine) =>
`💡 30 秒醫美自我檢測

最近最在意：
A. 法令紋變深
B. 蘋果肌塌
C. 下巴鬆

${dataLine}

回字母給我，
我傳對應的療程比較 + 案例。

不推銷。先讓你看懂。`,

    // 範本 E 時事熱點型（蘇菲招牌）
    trend: (ctx, dataLine) =>
`${ctx.topic}：你還沒注意的事

${dataLine}

不是嚇你。是請你提前部署。

👇 想看「對應這個趨勢」的療程組合，回「組合」`,
  },

  // ===== 工具：抽取主題對應的數據句 =====
  pickDataLine(topic) {
    const pool = this.treatments[topic] || this.treatments[topic?.split('（')[0]] || [];
    if (pool.length === 0) {
      // fallback 抓 user_behavior 一條
      const ub = this.user_behavior[Math.floor(Math.random() * this.user_behavior.length)];
      return `（${ub.src}）${ub.fact}。`;
    }
    const p = pool[Math.floor(Math.random() * pool.length)];
    return `（依 ${p.src}）${p.fact}。`;
  },

  // ===== 工具：依內容類型對應 LINE 範本 =====
  mapTemplate(contentTypeId) {
    const map = {
      faq_qa: "interactive",
      comparison: "knowledge",
      pain_point: "case_story",
      reverse: "knowledge",
      knowledge: "knowledge",
      story: "case_story",
      timeline: "trend",
    };
    return map[contentTypeId] || "interactive";
  },
};
