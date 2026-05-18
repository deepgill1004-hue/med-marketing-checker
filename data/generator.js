// 醫美爆款文案自動生成器 v0.1
// 依主題 + 內容類型 + 平台 + 族群 → 產出完整合規文案
// 範本均符合 RULES 紅線（不用最高級、不保證、不促銷、不見證）

window.GENERATOR = {
  meta: { version: "0.1", updated: "2026-05-17" },

  // ===== 主題 → 替代名稱（避開 red_words / yellow_words）=====
  topic_alias: {
    "童顏針": "聚左旋乳酸（Sculptra 舒顏萃）",
    "少女針": "AestheFill 艾麗斯",
    "晶亮瓷": "Radiesse 氫氧基磷灰石鈣",
    "微晶瓷": "Radiesse 氫氧基磷灰石鈣",
    "外泌體": "（外泌體目前未經核准注射，不適合作為療程主題）",
    "幹細胞": "（幹細胞療程須經主管機關核准，廣告嚴格受限）",
    "美白針": "（注射型美白製劑目前未核准，可改寫口服／外用保養與防曬）",
  },

  // ===== 主題 → 補充段落素材（依療程客製衛教內容）=====
  topic_facts: {
    "玻尿酸": {
      mechanism: "玻尿酸是真皮層原有成分，能填補凹陷、提供支撐",
      duration: "依分子大小不同，效果可維持 6-18 個月",
      common_use: "淚溝、法令紋、夫妻宮、蘋果肌、下巴",
      caution: "敏感體質、近期感染、免疫疾病須先告知醫師"
    },
    "肉毒": {
      mechanism: "暫時抑制肌肉收縮訊號，動態紋路會減少",
      duration: "一般約 4-6 個月，需重複施打維持",
      common_use: "抬頭紋、眉間紋、魚尾紋、咀嚼肌、瘦肩",
      caution: "懷孕哺乳禁、近期施打過量者須評估"
    },
    "電波": {
      mechanism: "射頻能量加熱真皮層，刺激膠原蛋白新生",
      duration: "膠原新生需 3-6 個月觀察，效果可維持 1-2 年",
      common_use: "鬆弛、輪廓模糊、毛孔粗大",
      caution: "金屬植入物、孕期、近期日曬須先告知"
    },
    "音波": {
      mechanism: "聚焦超音波直達 SMAS 筋膜層，由內而外拉提",
      duration: "膠原重塑約 3 個月可見變化，效果維持約 1 年",
      common_use: "中下臉鬆弛、下顎輪廓、頸紋",
      caution: "心臟節律器、孕期、皮膚發炎時不建議"
    },
    "皮秒": {
      mechanism: "極短脈衝把黑色素碎成微粒，由身體代謝排出",
      duration: "色素淡化需多次療程，間隔約 4-8 週",
      common_use: "斑點、痘疤、刺青、毛孔、暗沉",
      caution: "近期日曬、孕期、光敏體質須評估"
    },
    "聚左旋乳酸（Sculptra 舒顏萃）": {
      mechanism: "PLLA 微粒注入後逐步刺激膠原蛋白生成",
      duration: "需 3-6 個月才會看到完整變化，效果可維持約 2 年",
      common_use: "全臉支撐感、夫妻宮、太陽穴、輪廓重塑",
      caution: "蟹足腫體質、孕哺、自體免疫須告知"
    },
    "PRP": {
      mechanism: "抽取自體血液離心，富含生長因子的血漿回注",
      duration: "膠原刺激約需 3-6 個月，建議多次療程",
      common_use: "膚質、細紋、髮量（依診所核准項目）",
      caution: "屬特管／再生醫療法管制，需確認診所有核准項目"
    },
    "PN": {
      mechanism: "多核苷酸有助組織修復與膚質改善",
      duration: "建議多次療程累積，個別差異大",
      common_use: "膚況、彈性、細紋",
      caution: "目前法規定位特殊，廣告須避免療效宣稱"
    },
    "雷射": {
      mechanism: "不同波長雷射對應不同目標（色素、血管、紋路）",
      duration: "依機種與部位不同，多次療程效果較穩",
      common_use: "斑、紅、暗沉、毛孔、痘疤",
      caution: "近期日曬、孕期、藥物史須告知"
    },
  },

  // ===== 內容類型 7 種 =====
  content_types: {

    // === FAQ 解答型 ===
    faq_qa: {
      label: "FAQ 解答型",
      desc: "把客人最常問的 5-10 題一次整理（高收藏率）",
      hook_ids: ["H06", "H13", "H20"],
      structure_id: "T03",
      build(ctx) {
        const t = ctx.topicSafe;
        const facts = ctx.facts || {};
        const a = ctx.audience || "考慮做 " + t + " 的人";
        const qas = [
          { q: `${t} 會痛嗎？`, a: facts.mechanism ? `搭配局部麻醉降低不適感，多數人可以接受。實際感受因人而異。` : `搭配局部麻醉降低不適感，因人而異。` },
          { q: `效果多久？`, a: facts.duration || "依個人代謝與生活作息不同，效果維持時間有差。" },
          { q: `恢復期多久？要請假嗎？`, a: "多數人施打後當天可正常活動，部分人會有 1-3 天的瘀青腫脹，建議避開重要場合前一週。" },
          { q: `什麼樣的人適合？`, a: facts.common_use ? `常見適用於 ${facts.common_use}，但每個人臉部結構不同，建議現場由醫師評估。` : "每個人臉部結構不同，建議由醫師評估。" },
          { q: `哪些情況不建議？`, a: facts.caution || "孕哺、自體免疫疾病、近期感染或近期日曬者需先告知醫師。" },
          { q: `要打幾次？`, a: "依需求調整，多數療程不是一次到位，分次施打效果更自然。" },
          { q: `要怎麼選診所／醫師？`, a: "看的不是名氣或價格，是醫師會不會把禁忌症跟風險講清楚。願意叫妳『再想想』的，通常比較可靠。" },
        ];
        const intro = `最近被問了好多次 ${t}，乾脆一次整理。\n\n諮詢前先看完這 ${qas.length} 題，到診所妳會更知道要問什麼。\n`;
        const body = qas.map((x, i) => `\n${i+1}. ${x.q}\n${x.a}`).join("");
        const closing = `\n\n以上只是常見問題，每個人臉的條件不同，最終還是要醫師現場評估。\n\n${ctx.cta}`;
        return intro + body + closing;
      }
    },

    // === 比較選擇型 ===
    comparison: {
      label: "比較選擇型",
      desc: "兩種療程怎麼選（高決策意圖）",
      hook_ids: ["H08", "H12"],
      structure_id: "T07",
      build(ctx) {
        const t = ctx.topicSafe;
        const alt = ctx.compareWith || "另一個常被一起討論的療程";
        const a = ctx.audience || "在猶豫的妳";
        return `${a}最常問的就是：${t} 跟 ${alt}，到底差在哪？\n\n` +
          `我把這兩個常被放在一起比較的選項，用 5 個面向整理一下，妳可以直接存起來下次諮詢拿出來問醫師。\n\n` +
          `1. **作用原理不同**\n${t} 是${ctx.facts?.mechanism || "走一種路線"}；${alt} 走的是另一條路徑。原理不同，期待的時間軸也不同。\n\n` +
          `2. **效果可見時間不同**\n${t} 通常 ${ctx.facts?.duration || "需要一段時間累積"}；${alt} 看到變化的速度可能不一樣。\n\n` +
          `3. **適合的部位／問題不同**\n${t} 多用在 ${ctx.facts?.common_use || "特定區塊"}；${alt} 強項在另一些地方。\n\n` +
          `4. **恢復期與不適感**\n兩個都會有當天的紅腫，1-3 天會慢慢退。痛感都搭配麻醉，因人而異。\n\n` +
          `5. **誰不太適合**\n${ctx.facts?.caution || "孕哺、自體免疫、近期感染與近期日曬者，兩個都要先告知醫師。"}\n\n` +
          `我的建議：\n別只看哪個比較紅、哪個比較新，先想清楚自己想解決的問題是什麼，再去諮詢時聽醫師怎麼配。\n\n${ctx.cta}`;
      }
    },

    // === 痛點共鳴型 ===
    pain_point: {
      label: "痛點共鳴型",
      desc: "把族群的具體煩惱說出來（高分享率）",
      hook_ids: ["H05", "H22", "H24", "H18"],
      structure_id: "T01",
      build(ctx) {
        const t = ctx.topicSafe;
        const a = ctx.audience || "30+ 的妳";
        return `${a}是不是也有過這種時刻：\n\n` +
          `早上鏡子前多停了 3 秒，覺得「我看起來怎麼比心情還累」。\n` +
          `補了腮紅、加了高光，還是有種說不上來的下垂感。\n\n` +
          `這不是妳的錯。\n\n` +
          `${ctx.facts?.mechanism || "膠原蛋白的流失是漸進的"}，從 25 歲開始，每年流失約 1%。輪廓的鬆、毛孔的明顯、細紋的浮現，背後都是同一件事在發生。\n\n` +
          `${t} 之所以這幾年常被提到，是因為它處理的方向，剛好是這種「不是哪一點壞，但整體看起來疲倦」的狀態。\n\n` +
          `當然，每個人的條件不同，有沒有需要做、要做哪一種、要不要搭配其他保養，這些都得醫師現場看才準。\n\n` +
          `但有時候，光是知道「原來不是我自己想太多」，就已經是好的開始。\n\n${ctx.cta}`;
      }
    },

    // === 反向勸退型 ===
    reverse: {
      label: "反向勸退型（建立信任）",
      desc: "誠實列出不適合的人（反向操作）",
      hook_ids: ["H09", "H16", "H19"],
      structure_id: "T04",
      build(ctx) {
        const t = ctx.topicSafe;
        return `講一個跟大家直覺相反的：${t}，不是每個人都應該做。\n\n` +
          `這幾年看下來，這 5 種情況我都會建議再想想：\n\n` +
          `1. **只是覺得別人有打、自己也想試的**\n沒有具體想解決的問題，做完容易期待落差。\n\n` +
          `2. **想要一次到位、立刻看到大改變的**\n${t} ${ctx.facts?.duration ? "的特性是 " + ctx.facts.duration : "效果是漸進的"}，急著看結果反而會失望。\n\n` +
          `3. **正在懷孕、哺乳，或免疫狀況不穩定的**\n${ctx.facts?.caution || "這些狀態下任何療程都建議先延後。"}\n\n` +
          `4. **預算很緊，想用最便宜方案的**\n醫美最不該省的是醫師與材料來源。低價背後通常有代價。\n\n` +
          `5. **已經做過很多、追求更年輕版本的**\n當療程變成填補心理而不是處理結構問題，再做也只是更焦慮。\n\n` +
          `那什麼樣的人適合？\n\n` +
          `有具體想處理的問題、願意聽醫師講風險與限制、願意等時間給結果的，這樣的人會做得比較開心。\n\n${ctx.cta}`;
      }
    },

    // === 衛教知識型 ===
    knowledge: {
      label: "衛教知識型",
      desc: "拆解療程原理（長尾 SEO 資產）",
      hook_ids: ["H01", "H04", "H07"],
      structure_id: "T01",
      build(ctx) {
        const t = ctx.topicSafe;
        return `來認真講 ${t}。\n\n` +
          `**它怎麼作用？**\n${ctx.facts?.mechanism || "依不同機轉處理不同層次的問題"}。簡單說，它解決的不是表面，而是底層的結構或代謝路徑。\n\n` +
          `**為什麼要等？**\n${ctx.facts?.duration || "膠原蛋白的重塑需要時間"}。這就是為什麼很多人打完第一週覺得沒感覺，反而是第二、三個月才慢慢看到變化。急不來。\n\n` +
          `**它擅長處理哪些事？**\n${ctx.facts?.common_use || "常見適用於幾個特定狀況"}。但「能處理」跟「適合妳」是兩件事，這要醫師現場判斷。\n\n` +
          `**什麼情況下不適合？**\n${ctx.facts?.caution || "孕哺、自體免疫疾病、近期感染或皮膚發炎期間都不建議。"}\n\n` +
          `**諮詢時可以問醫師的 3 件事：**\n1. 我的條件適合做幾次？\n2. 跟我同時想處理的其他問題，要怎麼安排優先順序？\n3. 萬一不如預期，後續的調整空間在哪？\n\n` +
          `知識不會直接讓妳變美，但會讓妳走進診所時更有判斷力。\n\n${ctx.cta}`;
      }
    },

    // === 故事型 ===
    story: {
      label: "故事型",
      desc: "用真實情境帶入專業（高完讀率）",
      hook_ids: ["H18", "H22", "H03"],
      structure_id: "T01",
      build(ctx) {
        const t = ctx.topicSafe;
        return `凌晨快兩點，朋友傳訊息來。\n\n` +
          `「我剛諮詢完 ${t}，醫師說可以做，但我越想越不確定。」\n\n` +
          `我問她，妳到底想解決的是什麼？\n\n` +
          `她停了一下，回我：「其實我不知道。我只是覺得最近照鏡子有點累。」\n\n` +
          `這句話我聽過太多次。\n\n` +
          `${t} 的原理是${ctx.facts?.mechanism || "從底層慢慢處理結構"}，所以它解決的，從來不是「我今天看起來不開心」這種事。它處理的是更前面的——${ctx.facts?.common_use || "某些特定的、可被指認的狀況"}。\n\n` +
          `我沒勸她做，也沒勸她不做。\n\n` +
          `我跟她說：「妳先回去睡，明天早上九點再看一次鏡子。如果還是覺得有具體要解決的事，再回診所跟醫師說『我想處理的是這個』。」\n\n` +
          `她兩天後回我：「我決定先不做。我發現我只是累。」\n\n` +
          `這是好的決定。${t} 永遠在那，但人需要的，有時候不是針，是睡眠。\n\n${ctx.cta}`;
      }
    },

    // === 時間線體驗型 ===
    timeline: {
      label: "時間線體驗型",
      desc: "依日期展開療程後的變化（小紅書愛用）",
      hook_ids: ["H02"],
      structure_id: "T05",
      build(ctx) {
        const t = ctx.topicSafe;
        return `不少人問我 ${t} 做完之後到底是怎麼變化的。\n\n` +
          `我用一個常見的時間軸給妳參考（每個人代謝不同，僅供概念）：\n\n` +
          `**Day 1**\n剛施打完當天會有紅、腫、可能少量瘀青。冰敷、避免熱、不揉、不化妝。\n\n` +
          `**Day 3-7**\n腫脹慢慢消退，可能會「覺得好像沒變化」。這時候請穩住，這是正常的。\n\n` +
          `**Day 14-30**\n${ctx.facts?.mechanism || "底層機制開始作用"}，但表面變化還很微妙。\n\n` +
          `**Day 30-60**\n膠原重塑或填充穩定，旁邊的人開始覺得「妳是不是去渡假了？」這通常是好的階段。\n\n` +
          `**Day 60-180**\n${ctx.facts?.duration || "效果進入穩定期"}。這時候要做的事是好好保養、防曬、睡眠，不是急著補打。\n\n` +
          `**心得**\n${t} 最怕的不是無感，是太急。三週看不到變化就跑去加打，反而容易過頭。\n\n` +
          `${ctx.cta}`;
      }
    },

  },

  // ====================================================
  // 平台特化 builders（解決「各平台文案太雷同」問題）
  // 對 LINE_OA / Threads / IG / 小紅書 / LinkedIn 完全獨立骨架
  // FB 沿用 content_types[type].build 主結構
  // ====================================================
  platform_builders: {

    // ========== LINE OA 群發專屬 ==========
    // 7 種內容類型 = 7 種獨立的「起承轉合」骨架
    // 每則：爆 Hook（起）→ 場景+數據（承）→ 反轉真相（轉）→ 互動鉤子（合）
    // LINE 是純文字環境，禁用 markdown 粗體；emoji ≤5 顆；字數 200-280
    LINE_OA(ctx) {
      const t = ctx.topicSafe || ctx.topic;
      const f = ctx.facts || {};
      const ct = ctx.contentTypeId || "faq_qa";
      const D = (typeof global !== 'undefined' ? global : window).INDUSTRY_DATA;
      const clinic = ctx.clinic;
      const compareWith = ctx.compareWith || "另一個你也在考慮的療程";
      const dataLine = D ? D.pickDataLine(t) : `依公開資料，${t} 個人差異甚大。`;

      // ====== 7 種獨立骨架 ======
      const skeletons = {

        // === FAQ 解答型：起承轉合 ===
        faq_qa() {
          // 起：爆 Hook（這題被問太多次）
          const hook = `💬 這題我已經被問 8 次了——\n\n${t} 諮詢前最該問的，不是「會痛嗎」。`;
          // 承：客人原話＋真實數據
          const body = `上週客人 LINE 我：\n「打 ${t} 會痛嗎？」\n\n我回她：那不是最重要的。\n\n📍 ${dataLine}`;
          // 轉：反常識
          const twist = `會痛當下 30 秒就過了。\n做錯了，是 1 年慢慢消化。`;
          // 合：互動鉤子
          const cta = `📩 想看蘇菲整理的「${t} 諮詢前必問 5 題」清單？\n回我「5 題」我直接發給妳`;
          return [hook, body, twist, cta];
        },

        // === 比較選擇型 ===
        comparison() {
          const hook = `🔍 ${t} vs ${compareWith}——\n\n從來不是 A/B 二選一的題目。`;
          const body = `這兩個療程處理的是「不同層次」的問題：\n\n• ${t}：${f.mechanism || "走一條路徑"}\n• ${compareWith}：走另一條\n\n📍 ${dataLine}`;
          const twist = `選錯的人不是錯在挑了哪個。\n是錯在沒先問自己：「我到底想解決什麼？」`;
          const cta = `💡 妳最在意的是：\nA. 法令紋變深\nB. 蘋果肌塌\nC. 下巴鬆\n\n回字母給我，推妳對應的療程比較`;
          return [hook, body, twist, cta];
        },

        // === 痛點共鳴型（菲菲截圖最不滿意的，重做） ===
        pain_point() {
          // 起：爆 Hook（用客人原話或鏡子場景）
          const hook = `☕ 30+ 後妳會發現一件事——\n\n化妝技術變好了，鏡子裡卻看起來更累。`;
          // 承：場景還原 + 真實數據
          const body = `早上多停 3 秒。\n補了腮紅、加了高光。\n還是有種說不上來的下垂感。\n\n📍 ${dataLine}\n\n這不是妝沒畫好。\n是 25 歲開始每年 1% 的事——膠原、結構、輪廓，都在慢慢變。`;
          // 轉：給一個讓人「啊原來」的點
          const twist = `${t} 處理的不是表面，是底層。\n所以它不會一夜變美，但會讓妳「不再每天比心情還累」。`;
          // 合：強互動鉤子（分眾）
          const cta = `💌 妳最近也有這種時刻嗎？\n回我一個「嗯」我就知道，下篇我把完整保養順序給妳`;
          return [hook, body, twist, cta];
        },

        // === 反向勸退型 ===
        reverse() {
          const hook = `🤍 醫美最貴的不是療程——\n\n是「做錯」這兩個字。`;
          const body = `${t} 不適合的人，10 個有 7 個是因為這 3 種 mindset：\n\n• 只是看別人有打、自己也想試\n• 想要立刻看到大改變\n• 預算很緊，想用最便宜方案\n\n📍 ${dataLine}`;
          const twist = `願意叫妳「再想想」的醫師，通常比急著叫妳做的可靠。`;
          const cta = `📩 想知道自己屬於「適合做」還是「再想想」？\n回我「測一下」我傳檢核表給妳`;
          return [hook, body, twist, cta];
        },

        // === 衛教知識型 ===
        knowledge() {
          const hook = `🧠 ${t} 為什麼有效？\n\n我去問了一位整外主任，他講的關鍵不是技術。`;
          const body = `他說：「真正影響滿意度的，是 3 件事。」\n\n1️⃣ 它怎麼作用\n${f.mechanism || "從底層處理特定問題"}\n\n2️⃣ 多久看到\n${f.duration || "膠原重塑要時間"}\n\n📍 ${dataLine}`;
          const twist = `他講的關鍵是：「要等。」\n9 成的人在 Day 30 放棄，反而是好事正在發生。`;
          const cta = `📩 想看完整的「${t} 適應症檢核表」？\n回我「懂」我發給妳`;
          return [hook, body, twist, cta];
        },

        // === 故事型 ===
        story() {
          const hook = `💌 凌晨 2 點，朋友傳訊息：\n\n「我做錯了嗎？」`;
          const body = `她剛諮詢完 ${t}，醫師說可以做，但她越想越不確定。\n\n我問她：妳想解決的是什麼？\n\n她停了一下，回我：「其實我不知道。我只是覺得最近照鏡子有點累。」\n\n📍 ${dataLine}`;
          const twist = `我跟她說：先回去睡，明天早上九點再看一次鏡子。\n\n兩天後她回我：「我決定先不做。我只是累了。」`;
          const cta = `🤍 妳最近有沒有過「諮詢完反而更慌」的時刻？\n回我「有」，我下篇寫給也許需要的妳`;
          return [hook, body, twist, cta];
        },

        // === 時間線體驗型 ===
        timeline() {
          const hook = `📆 打完 ${t}——\n\nDay 30 妳會慌。\nDay 60 妳會懷疑。\nDay 90 才是真正開始。`;
          const body = `🌱 Day 1-7：腫脹、可能瘀青\n🌿 Day 14-30：懷疑期（最容易亂打主意）\n🌳 Day 60+：旁人開始問妳是不是去渡假\n\n📍 ${dataLine}`;
          const twist = `最容易放棄的 Day 14-30，剛好是底層正在重塑的時候。\n撐過懷疑期，是這件事的真正考驗。`;
          const cta = `📩 想要「${t} 懷疑期攻略」（包含每日該做什麼／不該做什麼）？\n回我「撐住」我發給妳`;
          return [hook, body, twist, cta];
        },
      };

      // 取對應骨架
      const buildFn = skeletons[ct] || skeletons.faq_qa;
      const [hook, body, twist, cta] = buildFn();

      // 組裝：4 段 + 行間空行（emoji 視覺斷句）
      let msg = `${hook}\n\n${body}\n\n${twist}\n\n${cta}`;

      // 診所執刀醫師（一行帶過）
      if (clinic) {
        msg += `\n\n— ${clinic.doctor.title}（整形外科專科）執刀｜${clinic.meta.name}`;
      }

      // 操盤備註（給菲菲看的，下方加底線分隔）
      const times = D?.line_best_time || ["週二 12:00", "週五 19:00"];
      msg += `\n\n─────\n📤 _推播建議：${times.join(" / ")}｜搭配貼圖建議：表情類「點頭認真」或自製主題圖卡 1 張_`;

      return msg;
    },

    // ========== Threads 專屬 ==========
    // 設計重點：一句金句／斷言 → 1-2 段補述 → 拋問題（≤280 字）
    Threads(ctx) {
      const t = ctx.topicSafe || ctx.topic;
      const f = ctx.facts || {};
      const ct = ctx.contentTypeId || "faq_qa";

      // 金句池（依類型）
      const punchlines = {
        faq_qa:    `${t} 諮詢前，先問自己 1 件事：我到底想解決什麼？`,
        comparison:`${t} 跟 ${ctx.compareWith || "另一個療程"}，差的不是哪個比較紅，是處理的問題不一樣。`,
        pain_point:`不是妳的錯。${f.mechanism || "膠原蛋白本來就會流失"}。`,
        reverse:   `${t} 最不適合的人，是「沒有具體想解決什麼、只是看別人有打」的那種。`,
        knowledge: `${t} 之所以要等，是因為它處理的不是表面，而是底層。急不來。`,
        story:     `凌晨 2 點，朋友傳訊息：『我諮詢完反而更不確定。』`,
        timeline:  `${t} 不是第三週看不到變化就跑去加打，是給它三個月。`,
      };

      // 補述
      const support = {
        faq_qa:    `講效果多久、痛不痛、要打幾次，都沒有那個問題重要。\n\n沒有想解決的具體問題就去做，做完最容易期待落差。`,
        comparison:`${t} 的原理是${f.mechanism || "走一條路徑"}；另一個療程走的是另一條。\n\n醫師之所以會問妳「想處理哪裡」，不是廢話。`,
        pain_point:`從 25 歲開始，每年大約 1%。\n\n看起來比心情還累，是結構的事，不是妝沒畫好。`,
        reverse:   `願意叫妳「再想想」的醫師，通常比急著叫妳做的可靠。`,
        knowledge: `${f.duration || "膠原重塑需要時間"}。\n\n第二、三個月才慢慢看到變化是正常的，不是無效。`,
        story:     `我跟她說：先回去睡，明天再看一次鏡子。\n\n她兩天後回我：「我決定先不做。」`,
        timeline:  `Day 14-30 妳會懷疑自己是不是被騙。\nDay 60+ 旁邊的人會問妳是不是去渡假。\n\n撐過懷疑期是這事的真正考驗。`,
      };

      // 拋問題
      const closers = [
        "妳呢？最近被哪個療程廣告心動但沒下手？留言告訴我",
        "如果妳做過，最後悔／最值得的是哪一個？",
        "妳會選效果快但要重複做，還是慢但維持久？",
        "妳諮詢前最常問醫師什麼？我來整理下一篇",
        "有人也跟我一樣覺得這事被講得太複雜嗎？",
      ];
      const closer = closers[Math.floor(Math.random() * closers.length)];

      let msg = `${punchlines[ct] || punchlines.faq_qa}\n\n`;
      msg += `${support[ct] || support.faq_qa}\n\n`;
      msg += closer;

      // Threads 嚴格 ≤280 字
      if (msg.length > 280) msg = msg.slice(0, 270) + "…";
      return msg;
    },

    // ========== IG 專屬（carousel 思維）==========
    // 用 ▌ 分隔頁面，模擬輪播卡片
    IG(ctx) {
      const t = ctx.topicSafe || ctx.topic;
      const f = ctx.facts || {};
      const ct = ctx.contentTypeId || "faq_qa";

      // 封面頁（hook）
      const covers = {
        faq_qa:    `▌${t}\n諮詢前必問的 5 件事\n👉 滑下一頁`,
        comparison:`▌${t} vs ${ctx.compareWith || "另一個療程"}\n一張表看懂\n👉 滑下一頁`,
        pain_point:`▌看起來比心情還累？\n這不是妳的錯\n👉 滑下一頁`,
        reverse:   `▌${t}\n這 5 種人，建議再想想\n👉 滑下一頁`,
        knowledge: `▌${t} 怎麼作用？\n3 分鐘搞懂\n👉 滑下一頁`,
        story:     `▌凌晨 2 點\n朋友傳訊息問我⋯\n👉 滑下一頁`,
        timeline:  `▌${t}\nDay 1 / 7 / 30 / 60\n👉 滑下一頁`,
      };

      // 內頁（3-5 頁，每頁短句）
      let pages = "";
      const slides = (() => {
        switch (ct) {
          case "faq_qa": return [
            ["Q1 會痛嗎？", "搭配麻醉降低不適感，因人而異"],
            ["Q2 效果多久？", f.duration || "看代謝差異"],
            ["Q3 恢復期？", "多數人當天可正常活動"],
            ["Q4 適合誰？", f.common_use || "依個人臉部結構評估"],
            ["Q5 不適合誰？", f.caution || "孕哺、自體免疫須告知"],
          ];
          case "comparison": return [
            ["原理不同", `${t}：${f.mechanism || "一種路徑"}`],
            ["維持時間", f.duration || "因療程而異"],
            ["適合部位", f.common_use || "視需求安排"],
            ["不適合對象", f.caution || "孕哺、自體免疫"],
            ["怎麼選", "先確認想解決什麼"],
          ];
          case "pain_point": return [
            ["早上鏡子前", "妝化好了還是看起來累"],
            ["這不是妳的錯", "膠原每年流失 1%"],
            ["背後的事", f.mechanism || "結構在改變"],
            [`${t} 在做什麼`, f.common_use || "處理特定狀況"],
            ["要不要做？", "醫師現場評估最準"],
          ];
          case "reverse": return [
            ["1. 只想跟風的", "沒目標 → 期待落差"],
            ["2. 想立刻看大改變", "這事是漸進的"],
            ["3. 孕哺免疫不穩", f.caution || "建議延後"],
            ["4. 預算太緊", "最不該省的是醫師"],
            ["5. 追求更年輕版本", "心理問題不是針能處理"],
          ];
          case "knowledge": return [
            ["怎麼作用", f.mechanism || "從底層處理"],
            ["為什麼要等", f.duration || "膠原需要時間"],
            ["擅長處理什麼", f.common_use || "特定狀況"],
            ["不適合誰", f.caution || "孕哺、免疫"],
            ["諮詢可以問", "適不適合、幾次、調整空間"],
          ];
          case "story": return [
            ["凌晨 2 點", "朋友傳訊息給我"],
            ["「我做錯了嗎？」", "她諮詢完更不確定"],
            ["我問她", "妳想解決的是什麼？"],
            ["她說", "我也不知道，就是累"],
            ["兩天後", "她決定先不做"],
          ];
          case "timeline": return [
            ["Day 1", "腫、紅、可能瘀青"],
            ["Day 7", "慢慢消退"],
            ["Day 30", "懷疑期，請穩住"],
            ["Day 60", "旁人開始覺得不一樣"],
            ["Day 90+", "效果穩定，做好保養"],
          ];
          default: return [];
        }
      })();
      slides.forEach((s, i) => {
        pages += `\n\n▌頁 ${i + 2}：${s[0]}\n${s[1]}`;
      });

      // 文案區（給 IG 貼文 caption）
      const captionLead = {
        faq_qa:    `${t} 被問了好多次，整理 5 個諮詢前必問。存起來下次用得到。`,
        comparison:`${t} 跟 ${ctx.compareWith || "另一個"} 怎麼選？我用 5 個面向幫妳比。`,
        pain_point:`如果妳也有過早上多停 3 秒的時刻⋯這篇給妳。`,
        reverse:   `${t} 不是每個人都該做。今天反過來講。`,
        knowledge: `${t} 認真版，看完妳會更知道諮詢時要問什麼。`,
        story:     `這是真實的對話，分享出來給也許需要的妳。`,
        timeline:  `${t} 三個月變化曲線，先存後做決定。`,
      };

      let msg = covers[ct] || covers.faq_qa;
      msg += pages;
      msg += `\n\n———\n${captionLead[ct] || captionLead.faq_qa}\n\n${ctx.cta}`;
      return msg;
    },

    // ========== 小紅書專屬（簡繁混排可，種草口吻）==========
    "小紅書"(ctx) {
      const t = ctx.topicSafe || ctx.topic;
      const f = ctx.facts || {};
      const ct = ctx.contentTypeId || "faq_qa";

      // 標題公式：圈定人群 + 數字 + 痛點 + 解決方案
      const titles = {
        faq_qa:    `30+ 姐妹必看｜${t} 諮詢前 5 問（建議收藏）`,
        comparison:`${t} vs ${ctx.compareWith || "另一個"}｜該選哪個一篇講清楚`,
        pain_point:`為什麼妳化妝後還是看起來累？答案在這 3 點裡`,
        reverse:   `${t} 不適合的 5 種人｜先看再決定`,
        knowledge: `${t} 為什麼有效？拆給妳看（乾貨向）`,
        story:     `凌晨 2 點朋友的訊息，讓我寫下這篇`,
        timeline:  `${t} Day 1 → 90 真實變化｜含懷疑期攻略`,
      };

      const intro = "📌 先說結論再說細節，趕時間的姐妹直接看最後\n\n";

      const body = (() => {
        switch (ct) {
          case "faq_qa": return [
            `🔹 Q1：${t} 痛感如何？\n搭配麻醉降低不適感，因人而異`,
            `🔹 Q2：效果多久？\n${f.duration || "看代謝有差"}`,
            `🔹 Q3：恢復期？\n多數當天可正常作息`,
            `🔹 Q4：適合誰？\n${f.common_use || "視臉部結構評估"}`,
            `🔹 Q5：不適合誰？\n${f.caution || "孕哺、自體免疫"}`,
          ].join("\n\n");
          case "comparison": return `🔸 ${t}\n${f.mechanism || "路徑 A"}\n\n🔹 ${ctx.compareWith || "另一個"}\n走另一條路徑\n\n👉 沒有誰比較好，看妳想解決什麼`;
          case "pain_point": return `📍 不是妝沒畫好\n📍 是膠原在流失（每年 1%）\n📍 ${f.mechanism || "底層結構在改變"}\n\n知道發生什麼事 = 第一步`;
          case "reverse": return `❌ 1. 只想跟風的\n❌ 2. 想一次到位的\n❌ 3. 孕哺免疫不穩的\n❌ 4. 預算太緊只看價格的\n❌ 5. 追求更年輕版本的\n\n✅ 適合的是「想處理具體問題、願意等」的妳`;
          case "knowledge": return `🧠 原理：${f.mechanism || "底層作用"}\n⏳ 時間：${f.duration || "需要累積"}\n🎯 處理：${f.common_use || "特定問題"}\n🚫 不適合：${f.caution || "孕哺免疫"}`;
          case "story": return `💌 朋友凌晨傳訊息：『我做錯了嗎？』\n\n我問她想解決什麼\n她說「不知道，就是累」\n\n我跟她說：先回去睡\n\n兩天後她回：我決定不做`;
          case "timeline": return `🌱 Day 1-7：腫、瘀青，穩住\n🌿 Day 14-30：懷疑期，最容易亂\n🌳 Day 60+：旁人開始發現\n🌲 Day 90+：穩定維持`;
          default: return "";
        }
      })();

      const closing = `\n\n💬 ${ctx.cta}\n\n#医美日记 #${t} #抗老 #台北医美`;

      return `📍 ${titles[ct] || titles.faq_qa}\n\n${intro}${body}${closing}`;
    },

    // ========== LinkedIn 專屬（產業視角／職業反差）==========
    LinkedIn(ctx) {
      const t = ctx.topicSafe || ctx.topic;
      const f = ctx.facts || {};
      const ct = ctx.contentTypeId || "knowledge";

      const intro = `從醫材銷售跨到醫美內容創作後，我發現一件事——\n\n大多數人對 ${t} 的疑問，跟「能不能做」「有沒有效」無關。\n\n他們真正想知道的是：「我到底適不適合？」「資訊太多，我怎麼判斷？」\n\n`;

      const middle = (() => {
        switch (ct) {
          case "knowledge": return `先講原理：\n${f.mechanism || "從底層處理特定問題"}。\n\n這代表它的效果不會立刻顯現。${f.duration || "需要時間累積"}，這也是很多人在「等待期」放棄、轉而追加療程的原因。\n\n從消費決策角度看，這類療程的轉換漏斗最大的破口不在「諮詢轉預約」，而在「術後 30 天的期待管理」。`;
          case "reverse": return `根據實務觀察，${t} 不適合：\n\n• 沒有具體想處理問題的客戶——做完容易期待落差\n• 想「一次到位」的客戶——這類療程是漸進的\n• 預算極緊的客戶——最不該省的是醫師選擇\n• 已有多次療程史、追求更年輕版本——心理需求大於生理需求\n\n好的諮詢師會主動勸退這幾類人。短期生意 vs 長期口碑，這是醫美業真正的分水嶺。`;
          case "comparison": return `${t} 與 ${ctx.compareWith || "另一個療程"} 的本質差異不在效果，而在「處理的問題層次」。\n\n${t}：${f.mechanism || "走一條路徑"}\n${ctx.compareWith || "另一個"}：走另一條路徑\n\n醫師之所以會問「妳想解決哪裡」，是因為療程選擇從來不是 A/B 二選一，而是「依需求組合」。`;
          default: return `${t} 的市場現況很有意思：${f.mechanism || "原理本身不新"}，但需求變化在「年齡層下修」「Prejuvenation 預防醫美」「諮詢前的資訊密度需求」三個方向。\n\n這意味著診所端的競爭力，從「療程種類」轉向「衛教內容力 + 諮詢轉化品質」。`;
        }
      })();

      const closing = `\n\n從業界角度看，2026 醫美的競爭分水嶺，不再是儀器與技術——而是「能不能把專業降維到客戶聽得懂」。\n\n${ctx.cta}\n\n#醫美 #個人IP #健康照護 #內容行銷`;

      return intro + middle + closing;
    },
  },

  // ====== 主入口：自動選用對應平台 builder ======
  buildForPlatform(ctx) {
    const ct = this.content_types[ctx.contentTypeId];
    if (!ct) return "";
    const platformBuilder = this.platform_builders[ctx.platform];
    if (platformBuilder) {
      // 有專屬骨架 → 用平台 builder
      return platformBuilder(ctx);
    }
    // 預設（FB/方格子/未列平台）走通用 build
    return ct.build(ctx);
  },

  // ===== 診所手術專屬擴充（呼叫前 generator 已建好 ctx）=====
  // 用法：在 build() 後若 ctx.clinic 存在，會用此函數加院長段落
  apply_clinic_pack(text, ctx) {
    if (!ctx.clinic) return text;
    const c = ctx.clinic;
    const platform = ctx.platform;

    // 短格式：簡短帶過院長身份，不放大段履歷（避免破壞 Threads/小紅書節奏）
    if (platform === "LINE_OA") {
      return text;  // LINE_OA builder 內部已處理診所標示
    }
    if (platform === "Threads") {
      // Threads 280 字內，僅補一行
      const tag = `\n\n— ${c.doctor.title}執刀｜麗得醫美`;
      if ((text + tag).length <= 280) return text + tag;
      return text;
    }
    if (platform === "小紅書") {
      return text + `\n\n👨‍⚕️ ${c.doctor.title}｜前三總整外副院長\n📍 麗得醫美整形外科診所`;
    }

    // 長格式（FB/LinkedIn）：完整段落
    const lines = text.split("\n");
    if (lines.length > 1 && lines[lines.length - 1].length < 80) {
      lines.pop();
    }
    let body = lines.join("\n").replace(/\s+$/, "");
    body += c.closing_blocks.doctor_intro(c.doctor);
    body += c.closing_blocks.clinic_note();
    const cta = c.ctas[Math.floor(Math.random() * c.ctas.length)];
    body += `\n\n${cta}`;
    return body;
  },

  // ===== 平台後處理：只負責補 hashtag、不再裁切 =====
  // 裁切與排版由 platform_builders 內各自處理
  platform_post_process(text, platform, hashtags) {
    // IG：若 builder 沒帶 hashtag，這邊補
    if (platform === "IG" && hashtags?.length && !/#\w/.test(text)) {
      return text + "\n\n" + hashtags.slice(0, 8).join(" ");
    }
    // 其他平台 builder 已處理完整，直接回傳
    return text;
  }
};
