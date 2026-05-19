// AI 即時生成引擎（BYOK + Web Search Tool）
// 用戶提供自己的 Anthropic API key（存 localStorage）
// 直接從瀏覽器呼叫 Claude API，內建 Web Search 工具即時抓最新資料

window.AI_GEN = {
  meta: { version: "0.1", updated: "2026-05-19" },

  MODEL: "claude-sonnet-4-6",
  API_URL: "https://api.anthropic.com/v1/messages",
  API_VERSION: "2023-06-01",

  // ===== Key 管理（localStorage）=====
  getKey() {
    return localStorage.getItem("anthropic_api_key") || "";
  },
  setKey(k) {
    if (k && k.trim()) localStorage.setItem("anthropic_api_key", k.trim());
  },
  clearKey() {
    localStorage.removeItem("anthropic_api_key");
  },
  hasKey() {
    return !!this.getKey();
  },

  // ===== 連線測試 =====
  async testConnection() {
    const key = this.getKey();
    if (!key) throw new Error("尚未設定 API key");
    const res = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": this.API_VERSION,
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: this.MODEL,
        max_tokens: 50,
        messages: [{ role: "user", content: "回覆「連線成功」四個字即可。" }],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`API 連線失敗 (${res.status})：${err.slice(0, 200)}`);
    }
    const data = await res.json();
    return data.content?.[0]?.text || "(無內容)";
  },

  // ===== 組裝 System Prompt =====
  buildSystemPrompt(ctx) {
    const platformSpec = {
      "FB": "FB 粉專長文：300-800 字、Hook(1-2 句)→場景對話→反轉/數字→軟 CTA。最佳發文 12-13、20-22 點。",
      "IG": "IG 貼文 caption：100-300 字，封面大字 8-15 字。Carousel 6-10 頁優於單圖。Hashtag 5-10 個。",
      "Threads": "≤280 字、一句金句/反常識斷言開頭→1-2 段補述→拋問題結尾。看『回覆數』為主互動指標。",
      "小紅書": "300-600 字、封面標題 ≤20 字（公式：圈定人群+數字+痛點+解決方案）、emoji 條列、簡體 hashtag 3-5 個。30% 流量來自搜尋。",
      "LINE_OA": "200-400 字、必須完整起承轉合 4 段：①爆 Hook（客人原話/反常識/時間懸念）②場景+真實數據（含來源）③反轉真相 ④強互動鉤子（回字母/回關鍵字）。禁 markdown 粗體（**xxx**）。emoji ≤5 顆，分布在開頭1+重點段前1+CTA前1。文末加─────分隔線後寫推播時段建議（給操盤者看的）。",
      "LinkedIn": "1000-1500 字、產業視角／職業反差人設、個人故事 Hook→產業洞察→數據案例→開放討論。3-5 個 hashtag。",
    };

    const contentTypeGuide = {
      "faq_qa": "FAQ 解答型：列 5-10 個諮詢前最常問問題，依平台格式整理。重點是『收藏率』。",
      "comparison": "比較選擇型：A vs B 兩個療程／選項的對照，依 5 個面向比較。重點是『降低決策焦慮』。",
      "pain_point": "痛點共鳴型：對特定族群（如 30+ 女性）說出他們具體的煩惱與情境。重點是『分享率』。",
      "reverse": "反向勸退型：列出不適合做這個療程的人。違反銷售直覺反而建立信任。重點是『信任感』。",
      "knowledge": "衛教知識型：拆解療程原理／機轉／恢復期／適應症。重點是『SEO 長尾資產』。",
      "story": "故事型：用真實情境／對話／案例帶入專業。重點是『高完讀率』。",
      "timeline": "時間線體驗型：依日期軸（Day 1/7/30/60/90）描述療程後的變化。重點是『懷疑期攻略』。",
    };

    const clinicBlock = ctx.clinic ? `

## 麗得醫美整形外科診所專屬素材（用戶已勾選使用）
- 院長：${ctx.clinic.doctor.title}，履歷：${ctx.clinic.doctor.creds.join("、")}
- 診所特色：${ctx.clinic.features.join("、")}
- 主題對應的手術詳情：${JSON.stringify(ctx.clinic.surgeries?.[ctx.topic] || {}, null, 2)}
- 切診所廣告模式（最嚴）：所有療效宣稱、價格、見證、對比、最高級用詞 = 全紅線
- 文末請補：「— 陳錫根院長（整形外科專科）執刀｜麗得醫美整形外科診所」
- 絕對不寫價格（套餐價屬內部資訊）` : "";

    return `你是蘇菲（Sophie）IP 的醫美行銷文案助手。蘇菲是台灣資深護理師＋醫材銷售背景，現經營個人 IP。

# 你的任務
依使用者輸入的【主題、內容類型、平台】，生成一篇符合台灣醫美法規且具爆款潛力的文案。

# 你必須先用 web_search 工具搜尋下列三類資料（最多用 5 次搜尋）
**這一步是強制的，不能直接憑你已知的知識生成**：
1. 衛福部／食藥署近 30 天醫美相關公告（避免踩到剛公告的新紅線）
2. 該主題療程的最新熱點、新聞、產業趨勢、真實統計數字（含來源網址）
3. 該平台近期同主題的爆款貼文或範本（看真實爆款結構，不要憑空模板化）

搜尋關鍵字範例：
- "衛福部 醫美 廣告 ${new Date().getFullYear()}"
- "${ctx.topic} 2025 2026 趨勢 統計"
- "${ctx.topic} ${ctx.platform} 爆款"

# 台灣醫美法規硬紅線（違反者罰 5-2500 萬，絕對不能寫）

## 禁用詞分類（這些字眼一個都不能出現）
1. **最高級用語**：最、最佳、最有效、最安全、最先進、第一、唯一、首創、獨家、頂級、頂尖、領先、權威、全台/全國第一
2. **療效保證**：保證、絕對、100%、百分百、永久、永不復發、一勞永逸、無效退費、包您滿意、立即見效、馬上變美、一次見效、完全根治、完全消除
3. **醫療效能（化妝品/食品禁用）**：治癒、治療、療效、回春、凍齡、逆齡、返老還童、童顏、抗老（化妝品禁，但療程可述「維持年輕外觀」）、消除皺紋、消脂、燃脂、瘦身、減重、排毒、根除
4. **招攬促銷**：優惠價、特價、原價→現價、買一送一、團購、限時優惠、倒數計時、週年慶、母親節優惠、年終回饋、抽獎、來店禮、體驗券、免費諮詢、免費療程、首次體驗價、小資價、學生價、打卡折扣、加碼送、贈送療程／針劑
5. **比較性／貶損同業**：勝過 XX、優於 XX、比 XX 更好、超越同業、領先同業、取代傳統
6. **名人見證／薦證**：代言、明星愛用、韓星指定、網紅推薦、醫師推薦、體驗心得、實證見證、真人實證、心得分享
7. **風險誤導**：無痛、完全無痛、零痛感、零副作用、無副作用、無風險、安全無虞、100% 安全、零恢復期、無傷口、不流血
8. **未經核准療程**：外泌體注射、Exosome、幹細胞療程、幹細胞抗老、自體細胞回春、細胞再生療法、胞器治療、童顏針（俗稱→改用「聚左旋乳酸 Sculptra 舒顏萃」）、晶亮瓷／微晶瓷（俗稱→改用「Radiesse 氫氧基磷灰石鈣」）、類皮秒、韓星鼻、韓式無痕、無刀近視雷射、美白針、瘦瘦針（俗稱）

## 禁用結構
- 術前術後對比圖描述
- 「我打了 XX 之後效果超好」這種個案見證口吻
- 名人合照／背書
- 任何價格揭露
- 「私訊報價」「+1 報名」促銷招攬
- 直播帶療程

# 爆款文案公式

## 結構（依平台調整篇幅）
- **起【爆 Hook】**：第一行就釣眼。用客人原話、反常識金句、時間懸念、反問句。禁軟弱開頭如「Hi 蘇菲這邊」「💭 如果妳也有過這種時刻」
- **承【場景 + 真實數據】**：給情境帶入感 + 引用具體數據（必須附來源，如「依 PubMed 2024」「衛福部 2024 統計」）
- **轉【反轉真相】**：給一個讓人「啊原來」的記憶錨
- **合【強互動鉤子】**：回字母／回關鍵字（自動分眾），提觸及。每則 1 個鉤子

## 蘇菲口吻
- 毒舌又通透、隨性、機智、有真實專業經驗打底
- 短句為主、動詞先行、裸數字、節奏不均勻、零散文腔
- 禁 AI 腔（「在這個快節奏的時代」「讓我們一起⋯」這種）

# 平台格式要求
${platformSpec[ctx.platform] || platformSpec["FB"]}

# 內容類型要求
${contentTypeGuide[ctx.contentTypeId] || contentTypeGuide["knowledge"]}
${clinicBlock}

# 輸出規範
- 直接輸出最終文案，不要解釋你做了什麼
- 文末不要加你的總結或備註
- 若是 LINE OA，最後加上「─────」分隔線，下方寫「📤 _推播建議：[妳搜尋到的最佳時段]｜搭配貼圖建議：[依內容主題]_」（這部分給操盤者看）
- 搜尋到的數據引用要清楚標示來源（如「依 PubMed XXXXX」「衛福部 2026 公告」）`;
  },

  // ===== 主入口：呼叫 Claude API 即時生成 =====
  async generate(ctx) {
    const key = this.getKey();
    if (!key) throw new Error("尚未設定 API key");

    const systemPrompt = this.buildSystemPrompt(ctx);
    const userMessage = `主題：${ctx.topic}（${ctx.topicSafe || ctx.topic}）
內容類型：${ctx.contentTypeId}
平台：${ctx.platform}
模式：${ctx.mode === "clinic_ad" ? "診所廣告（最嚴）" : "個人 IP（一般）"}
目標族群：${ctx.audience || "（未指定，請依主題推測）"}
${ctx.compareWith ? "比較對象：" + ctx.compareWith : ""}

請依照 system 指示，先用 web_search 搜尋當下最新資料，再生成文案。`;

    const res = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": this.API_VERSION,
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: this.MODEL,
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
        tools: [
          {
            type: "web_search_20250604",
            name: "web_search",
            max_uses: 5,
          },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`生成失敗 (${res.status})：${err.slice(0, 300)}`);
    }
    const data = await res.json();

    // 解析回應（會有 web_search_tool_result + text）
    const searchSources = [];
    let finalText = "";
    for (const block of data.content || []) {
      if (block.type === "text") {
        finalText += block.text;
      } else if (block.type === "web_search_tool_result") {
        // 蒐集搜尋來源
        for (const item of block.content || []) {
          if (item.type === "web_search_result") {
            searchSources.push({ title: item.title, url: item.url });
          }
        }
      } else if (block.type === "server_tool_use" && block.name === "web_search") {
        // 紀錄搜尋查詢
        searchSources.push({ query: block.input?.query });
      }
    }

    return {
      text: finalText.trim(),
      sources: searchSources,
      usage: data.usage,
      stopReason: data.stop_reason,
    };
  },
};
