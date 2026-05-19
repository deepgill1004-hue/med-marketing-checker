// 麗得醫美整形外科診所 — 完整療程資料庫 v0.3
// 來源：麗得官網 https://leader-clinic.com（agent 抓 2026-05-19）
// 涵蓋 44 個療程 + 4 位醫師專長

window.CLINIC_LIDAI = {
  meta: {
    id: "lidai",
    name: "麗得醫美整形外科診所",
    category: "整形外科診所",
    default_mode: "clinic_ad",
    website: "https://leader-clinic.com",
    line_oa: "@leaderclinic",
    address: "台北市松山區南京東路五段 1 號 5 樓",
    phone: "(02)2760-6101",
  },

  // ===== 醫師團隊 =====
  doctors: {
    "陳錫根": {
      title: "陳錫根 院長／教授",
      specialty: "隆乳手術、乳房重建、莢膜攣縮處理、肉毒",
      creds: [
        "整形外科專科醫師",
        "前三軍總醫院整形外科主任、副院長",
        "中華民國美容外科醫學會 前理事長",
        "中華民國整形外科醫學會 前理事長",
        "JAAD 國字臉肉毒劑量論文作者",
        "商業週刊推薦百大名醫",
        "手術經驗數千例（含乳房手術逾千例）",
      ],
    },
    "高全祥": {
      title: "高全祥 醫師",
      specialty: "鼻整形（韓式三段式、肋軟骨、二次重修、駝峰／歪鼻矯正）",
      creds: ["整形外科專科醫師", "鼻整形專長"],
    },
    "林辰": {
      title: "林辰 醫師",
      specialty: "微型注射（玻尿酸、肉毒、PLLA、PCL）、線雕拉提",
      creds: ["微整注射臨床經驗豐富"],
    },
    "李沁鴽": {
      title: "李沁鴽 醫師",
      specialty: "女性私密處整形、醫學育髮、光電皮膚、外泌體再生",
      creds: ["婦產跨域 + 微整 + 光電皮膚"],
    },
  },

  // 預設醫師（生成文案時不指定哪位則用此）
  doctor: {
    title: "陳錫根院長",
    creds: [
      "整形外科專科醫師",
      "前三軍總醫院整形外科主任、副院長",
      "中華民國美容外科醫學會 前理事長",
      "中華民國整形外科醫學會 前理事長",
      "手術經驗數千例",
    ],
    tone: "資深整形外科背景，重結構與安全",
  },

  features: [
    "整形外科專科醫師團隊（陳錫根／高全祥／林辰／李沁鴽）",
    "二代魔滴／女王波等核准植入物，原廠終身保固",
    "重視術前評估與術後追蹤",
    "莢膜攣縮預防：欣流 Singulair 90 天藥物療程",
  ],

  // ===== 6 大類分組（依麗得 LINE OA 自動回應分類）=====
  categories: {
    "乳房整型": ["內視鏡隆乳", "魔滴隆乳", "女王波隆乳", "自體脂肪隆乳", "莢膜攣縮處理", "隆乳重修", "乳房重建", "縮乳提乳", "男性女乳症", "平胸手術"],
    "眼部整形": ["縫式雙眼皮", "切開式雙眼皮", "提眼瞼肌矯正", "內開眼袋", "淚溝填補", "眼袋合併雙眼皮"],
    "鼻整形": ["韓式三段式鼻整形", "自體肋軟骨鼻整形", "二次鼻整形重修", "駝峰鼻矯正", "歪鼻矯正", "鼻中隔彎曲手術"],
    "臉部雕塑": ["臉部抽脂補脂", "內視鏡前額拉皮", "中下臉 SMAS 拉皮", "腹部拉皮", "抽脂手術", "LSSA 音浪脂雕", "臉部埋線拉提"],
    "微型注射": ["玻尿酸注射", "Juvederm 喬雅登", "Restylane 瑞絲朗", "Vivacy 維法熙", "HYAFILIA 海亞菲", "肉毒桿菌", "Ellanse 洢蓮絲", "SUNMAX 熊貓針", "晶亮瓷"],
    "電、音波拉提": ["Thermage FLX 鳳凰電波", "Ultraformer 海芙音波", "Liftera-V 渦旋音波", "Discovery Pico 探索皮秒"],
    "醫學育髮": ["ReFolia 光電養髮", "外泌體育髮"],
    "女性私密": ["小陰唇整形", "陰道緊實", "私密雷射"],
  },

  // ===== 完整療程資料 =====
  surgeries: {

    // ===== 乳房整型 =====
    "內視鏡隆乳": {
      type: "外科手術",
      techniques: ["內視鏡輔助", "腋下／乳暈下／乳下緣切口", "筋膜下／雙平面／胸大肌下"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "內視鏡放大視野下精準分離與止血，依個別條件客製切口位置與假體置放深度",
        duration: "1-3 個月按摩護理，3-6 個月形狀觸感穩定",
        common_use: "先天扁平、產後萎縮、追求自然胸型者",
        caution: "孕哺、自體免疫、未成年、嚴重心肺疾病不適合"
      }
    },
    "魔滴隆乳": {
      type: "外科手術",
      techniques: ["Motiva Ergonomix 2.0 二代魔滴", "原廠終身保固"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "圓凝膠果凍矽膠，奈米化表面，抗扭抗拉強度高、不易破裂；靜態擬真動態逼真",
        duration: "1-3 個月按摩護理、3-6 個月最終穩定",
        common_use: "追求動感自然、術後柔軟度高的客群",
        caution: "孕哺、自體免疫、嚴重心肺疾病、未成年不適合"
      }
    },
    "女王波隆乳": {
      type: "外科手術",
      techniques: ["Mentor MemoryGel Xtra（美國曼陀）", "絨毛面果凍矽膠"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "通過 FDA 與台灣衛福部審查，絨毛表面處理，胸型扎實飽滿",
        duration: "1-3 個月按摩、3-6 個月穩定",
        common_use: "胸型扎實飽滿、需穩定支撐者",
        caution: "孕哺、自體免疫、嚴重心肺疾病、未成年不適合"
      }
    },
    "自體脂肪隆乳": {
      type: "外科手術",
      techniques: ["腹部／腰側／大腿取脂", "離心過濾純化", "Coleman 技術"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "從腹部腰側大腿抽脂後離心純化注射至胸部，自然柔軟兼塑體雙效",
        duration: "2-4 週消腫、3-6 個月最終穩定，存活率約 50-70%",
        common_use: "想提升 1 罩杯、體型有可取脂部位、不想用假體者",
        caution: "脂肪量不足、嚴重心肺疾病、孕哺、過瘦體質不適合"
      }
    },
    "莢膜攣縮處理": {
      type: "外科手術／藥物輔助",
      techniques: ["欣流 Singulair 90 天藥物療程", "莢膜切除手術", "植入物更換"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "輕度 Baker I-II 級可試欣流 Singulair 約 90 天藥物（每日 10mg 睡前服用），阻斷發炎訊號減少膠原沉積；中重度需手術",
        duration: "藥物 3 個月評估反應；手術恢復 1-3 個月",
        common_use: "舊植入物變硬變形、胸型緊繃不對稱、植入物更換需求",
        caution: "肝腎異常、孕哺、欣流過敏不適合藥物；手術部分同隆乳"
      }
    },
    "隆乳重修": {
      type: "外科手術",
      techniques: ["取出舊植入物", "莢膜處理", "重新置入"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "處理莢膜攣縮、位移、破裂或不對稱問題，搭配欣流 90 天預防再攣縮",
        duration: "恢復 1-3 個月、形狀穩定 3-6 個月",
        common_use: "莢膜攣縮、假體位移破裂、術後不對稱",
        caution: "嚴重感染史、自體免疫、心肺問題需充分評估"
      }
    },
    "乳房重建": {
      type: "外科手術",
      techniques: ["假體式重建", "自體組織皮瓣重建"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "陳錫根院長公費進修主修項目；依術後條件選假體或自體皮瓣重建",
        duration: "視範圍而定，3-12 個月分階段完成",
        common_use: "乳癌切除後重建、先天乳房發育不全",
        caution: "放射治療後組織狀況、心血管病史需評估"
      }
    },
    "縮乳提乳": {
      type: "外科手術",
      techniques: ["乳房縮小術", "Mastopexy 提乳術"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "縮小體積或提升下垂胸型，減輕肩頸負擔",
        duration: "恢復 1-3 個月、形狀穩定 6 個月",
        common_use: "胸部過大引發肩頸負擔、乳房下垂",
        caution: "孕哺計畫、嚴重心肺、糖尿病控制不佳需評估"
      }
    },
    "男性女乳症": {
      type: "外科手術",
      techniques: ["超音波輔助抽脂（UAL）", "腺體切除", "皮膚收縮處理"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "縮小體積、改善輪廓、疤痕最小化；依腺體與脂肪比例選擇術式",
        duration: "恢復 1-2 個月，最終線條 3-6 個月",
        common_use: "男性胸部肥大、腺體增生影響自信",
        caution: "需先排除荷爾蒙與藥物因素"
      }
    },
    "平胸手術": {
      type: "外科手術（FtM Top Surgery）",
      techniques: ["依胸型選切口", "處理疤痕"],
      doctor: "陳錫根",
      facts_for_gen: {
        mechanism: "跨性別男性胸部重塑，依胸型大小選擇切口方式與疤痕處理",
        duration: "恢復 1-3 個月、疤痕淡化 6-12 個月",
        common_use: "跨性別男性胸部重塑需求",
        caution: "心理諮詢與荷爾蒙治療歷程需先完備"
      }
    },

    // ===== 眼部整形 =====
    "縫式雙眼皮": {
      type: "外科手術",
      techniques: ["微創縫合", "迷你切口"],
      facts_for_gen: {
        mechanism: "微創縫合方式形成雙眼皮摺痕，恢復快、調整空間大",
        duration: "腫脹 1-2 週、線條穩定 2-3 個月",
        common_use: "薄眼皮、無浮腫、初次調整、需短恢復期",
        caution: "乾眼、近期角膜手術、嚴重蟹足腫需告知"
      }
    },
    "切開式雙眼皮": {
      type: "外科手術",
      techniques: ["手術切開", "去脂肪／鬆皮"],
      facts_for_gen: {
        mechanism: "切開式可同步處理眼皮厚度、脂肪、鬆皮，穩定持久",
        duration: "腫脹 2-4 週、線條穩定 3-6 個月",
        common_use: "眼皮厚、有脂肪、需穩定持久者",
        caution: "乾眼、近期角膜手術、嚴重蟹足腫、出血傾向需評估"
      }
    },
    "提眼瞼肌矯正": {
      type: "外科手術",
      techniques: ["調整提眼瞼肌張力或長度", "可合併雙眼皮或開眼頭"],
      facts_for_gen: {
        mechanism: "調整提眼瞼肌張力或長度，改善大小眼與下垂無神",
        duration: "5-7 天拆線、2-3 個月定型",
        common_use: "眼皮下垂、大小眼、開眼無神、視野遮蔽",
        caution: "甲狀腺眼疾、嚴重乾眼、出血傾向需告知"
      }
    },
    "內開眼袋": {
      type: "外科手術",
      techniques: ["結膜內開（無外疤）", "脂肪轉位填淚溝", "自體脂肪臉部填補"],
      facts_for_gen: {
        mechanism: "從結膜面處理脂肪、無外疤；可同步將眼袋脂肪轉位填補淚溝，搭配自體脂肪填補蘋果肌/前額凹陷",
        duration: "腫脹 1-2 週、瘀青 1-3 週、定型 1-3 個月",
        common_use: "泡泡眼、淚溝、長期看起來疲倦、無外側鬆弛者",
        caution: "甲狀腺眼疾、嚴重乾眼、抗凝血藥物需評估"
      }
    },
    "淚溝填補": {
      type: "外科手術／微整",
      techniques: ["自體脂肪移植", "玻尿酸填充"],
      facts_for_gen: {
        mechanism: "依凹陷深度與條件選自體脂肪或玻尿酸填補淚溝",
        duration: "自體脂肪 1-2 週腫脹+3-6 個月穩定；玻尿酸 1 週內穩定",
        common_use: "眼下凹陷、黑眼圈型淚溝",
        caution: "敏感體質、近期感染、孕哺需評估"
      }
    },
    "眼袋合併雙眼皮": {
      type: "外科手術",
      techniques: ["上下眼整合手術", "外開眼袋＋雙眼皮成形"],
      facts_for_gen: {
        mechanism: "上眼皮鬆弛＋下眼袋一次手術整合處理，麻醉與恢復期合併",
        duration: "腫脹 2-4 週、定型 3-6 個月",
        common_use: "同時有眼皮鬆與眼袋、想一次處理上下眼周",
        caution: "甲狀腺眼疾、嚴重乾眼、抗凝血藥物需評估"
      }
    },

    // ===== 鼻整形（高全祥醫師）=====
    "韓式三段式鼻整形": {
      type: "外科手術",
      techniques: ["矽膠＋耳軟骨＋鼻中隔三層結構"],
      doctor: "高全祥",
      facts_for_gen: {
        mechanism: "鼻樑＋鼻尖＋鼻基底整體調整，依亞洲鼻型條件三層結構處理",
        duration: "腫脹 1-2 週、最終形狀 3-6 個月",
        common_use: "亞洲扁鼻、需整體調整者",
        caution: "鼻部嚴重外傷史、近期感染、皮膚過薄需評估"
      }
    },
    "自體肋軟骨鼻整形": {
      type: "外科手術",
      techniques: ["取自體肋骨重建鼻部結構"],
      doctor: "高全祥",
      facts_for_gen: {
        mechanism: "取自體肋骨重建鼻部結構，適合二次重修、組織薄、需高度支撐者",
        duration: "腫脹 2-4 週、定型 3-6 個月",
        common_use: "二次重修、鼻組織薄、需高度支撐",
        caution: "肋部曾手術、心肺功能不佳需評估"
      }
    },
    "二次鼻整形重修": {
      type: "外科手術",
      techniques: ["前次植入物取出", "重建結構"],
      doctor: "高全祥",
      facts_for_gen: {
        mechanism: "處理前次手術不滿意、形變、感染、外露問題；可合併肋軟骨重建",
        duration: "恢復 1-3 個月、定型 6 個月",
        common_use: "前次隆鼻不滿意、形變、感染、外露",
        caution: "嚴重感染史、組織狀況不佳需充分評估"
      }
    },
    "駝峰鼻矯正": {
      type: "外科手術",
      techniques: ["磨平／截骨／結構重建"],
      doctor: "高全祥",
      facts_for_gen: {
        mechanism: "處理鼻樑骨頭凸起，依凸起程度選磨平、截骨或結構重建",
        duration: "腫脹 2-4 週、定型 3-6 個月",
        common_use: "鼻樑骨頭凸起",
        caution: "嚴重鼻部外傷史需評估"
      }
    },
    "歪鼻矯正": {
      type: "外科手術",
      techniques: ["截骨復位", "結構重建"],
      doctor: "高全祥",
      facts_for_gen: {
        mechanism: "處理鼻骨偏斜、外觀不對稱，依偏斜程度選擇術式",
        duration: "腫脹 2-4 週、定型 3-6 個月",
        common_use: "鼻骨偏斜、外觀不對稱",
        caution: "嚴重外傷史、鼻中隔嚴重彎曲需先處理"
      }
    },
    "鼻中隔彎曲手術": {
      type: "外科手術（功能型）",
      techniques: ["鼻中隔成形術"],
      doctor: "高全祥",
      facts_for_gen: {
        mechanism: "改善鼻塞、過敏、呼吸不順，功能型手術非美容",
        duration: "恢復 1-2 個月",
        common_use: "鼻塞、過敏、呼吸不順",
        caution: "急性鼻竇感染需先處理"
      }
    },

    // ===== 臉部雕塑 =====
    "臉部抽脂補脂": {
      type: "外科手術",
      techniques: ["同步抽脂＋自體脂肪補"],
      facts_for_gen: {
        mechanism: "雙下巴／嬰兒肥抽脂同步臉頰／太陽穴補脂，整體輪廓修飾",
        duration: "腫脹 2-4 週、定型 3-6 個月",
        common_use: "雙下巴、嬰兒肥、臉頰凹陷、太陽穴凹",
        caution: "嚴重糖尿病、心肺問題需評估"
      }
    },
    "內視鏡前額拉皮": {
      type: "外科手術",
      techniques: ["內視鏡微創", "頭皮 1-2cm 小切口"],
      facts_for_gen: {
        mechanism: "內視鏡微創前額拉皮，改善抬頭紋、皺眉紋、眉壓上眼皮鬆弛",
        duration: "腫脹 2-4 週、定型 3-6 個月",
        common_use: "抬頭紋、皺眉紋、眉壓上眼皮鬆弛",
        caution: "嚴重心血管、糖尿病控制不佳、自體免疫需評估"
      }
    },
    "中下臉 SMAS 拉皮": {
      type: "外科手術",
      techniques: ["耳前～耳後隱痕切口", "深層 SMAS 提拉"],
      facts_for_gen: {
        mechanism: "依鬆弛部位耳前～耳後隱痕切口，針對 SMAS 筋膜層做結構性復位（非只拉皮膚）",
        duration: "消腫 2-4 週、線條穩定 3-6 個月",
        common_use: "法令紋、木偶紋、嘴邊肉、下顎線下垂",
        caution: "嚴重心血管、糖尿病控制不佳、自體免疫、蟹足腫需評估"
      }
    },
    "腹部拉皮": {
      type: "外科手術",
      techniques: ["Abdominoplasty 腹部整形術"],
      facts_for_gen: {
        mechanism: "處理產後腹部鬆弛、減重後皮膚下垂，依範圍選術式",
        duration: "恢復 1-3 個月、定型 6 個月",
        common_use: "產後腹部鬆弛、減重後皮膚下垂",
        caution: "孕哺計畫、糖尿病控制不佳、心肺問題需評估"
      }
    },
    "抽脂手術": {
      type: "外科手術",
      techniques: ["PAL 動力輔助", "UAL 超音波輔助", "WAL 水刀輔助"],
      facts_for_gen: {
        mechanism: "依部位與脂肪型態選 PAL／UAL／WAL，腹部腰線大腿等局部精雕",
        duration: "腫脹 2-4 週、定型 3 個月",
        common_use: "腹部、腰線、大腿、副乳、雙下巴局部囤積",
        caution: "嚴重心肺、糖尿病控制不佳、過瘦者需評估"
      }
    },
    "LSSA 音浪脂雕": {
      type: "外科手術",
      techniques: ["超音波震盪輔助抽脂", "纖維囊乳化"],
      facts_for_gen: {
        mechanism: "超音波震盪輔助乳化脂肪，精雕線條保留肌肉浮雕感",
        duration: "腫脹 2-4 週、定型 3 個月",
        common_use: "已有運動底子、想雕出線條者",
        caution: "嚴重心肺、糖尿病、皮膚薄者需評估"
      }
    },
    "臉部埋線拉提": {
      type: "非手術",
      techniques: ["PDO 線", "MINT 美無痕", "METEORA", "PCL", "PLLA 線"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "可吸收線材埋入真皮或皮下，物理拉提＋刺激膠原",
        duration: "立即拉提感、膠原效果 3-6 個月，維持 1-2 年",
        common_use: "中下臉鬆弛、法令紋、嘴邊肉、模糊下顎線",
        caution: "皮膚薄、免疫疾病、孕哺、近期感染需評估"
      }
    },

    // ===== 微型注射（林辰醫師主導）=====
    "玻尿酸注射": {
      type: "微型注射",
      techniques: ["不同分子大小玻尿酸", "依部位客製"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "玻尿酸是真皮層原有成分，注射填補凹陷與支撐",
        duration: "依分子大小不同，效果維持 6-18 個月",
        common_use: "淚溝、法令、蘋果肌、下巴、鼻、唇",
        caution: "敏感體質、近期感染、免疫疾病、抗凝血藥物需告知"
      }
    },
    "Juvederm 喬雅登": {
      type: "微型注射（玻尿酸）",
      techniques: ["Allergan Vycross 技術"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "Vycross 技術玻尿酸，高交聯穩定持久",
        duration: "依產品線維持 9-18 個月",
        common_use: "蘋果肌、法令、夫妻宮、下巴塑型",
        caution: "敏感體質、近期感染、孕哺需告知"
      }
    },
    "Restylane 瑞絲朗": {
      type: "微型注射（玻尿酸）",
      techniques: ["Galderma NASHA 技術"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "瑞典 Galderma NASHA 技術，老牌穩定玻尿酸",
        duration: "依產品線維持 6-12 個月",
        common_use: "全臉部位通用",
        caution: "敏感體質、近期感染、孕哺需告知"
      }
    },
    "Vivacy 維法熙": {
      type: "微型注射（玻尿酸）",
      techniques: ["IPN-like 技術", "即時雕塑"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "法國 Vivacy IPN-like 技術玻尿酸，即時雕塑穩定持久",
        duration: "維持可達 18 個月",
        common_use: "輪廓塑型、夫妻宮、蘋果肌",
        caution: "敏感體質、近期感染、孕哺需告知"
      }
    },
    "HYAFILIA 海亞菲": {
      type: "微型注射（玻尿酸）",
      techniques: ["韓國 CHA MEDITECH 水晶玻尿酸"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "韓國水晶玻尿酸，高彈性、自然無硬感",
        duration: "維持約 12 個月",
        common_use: "自然軟組織填補、唇部",
        caution: "敏感體質、近期感染、孕哺需告知"
      }
    },
    "肉毒桿菌": {
      type: "微型注射",
      techniques: ["保妥適 Botox", "麗舒妥 Dysport", "宥施貝拉 Xeomin"],
      doctor: "林辰／陳錫根",
      facts_for_gen: {
        mechanism: "暫時抑制肌肉收縮訊號，動態紋減少；陳錫根院長 JAAD 論文確立國字臉最佳劑量",
        duration: "3-7 天起效，維持 3-6 個月",
        common_use: "抬頭紋、眉間紋、魚尾紋、國字臉、瘦肩、多汗症",
        caution: "懷孕哺乳、重症肌無力禁；近期施打需間隔"
      }
    },
    "Ellanse 洢蓮絲": {
      type: "微型注射（膠原增生）",
      techniques: ["PCL 聚己內酯", "S 型／M 型"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "PCL 微球刺激膠原增生，S 型維持 1 年以上、M 型維持 2 年",
        duration: "立即輪廓提拉、3-6 個月膠原顛峰、維持 1-2 年",
        common_use: "輪廓提拉、夫妻宮、法令紋、太陽穴",
        caution: "蟹足腫體質、孕哺、自體免疫疾病需告知"
      }
    },
    "SUNMAX 熊貓針": {
      type: "微型注射（膠原蛋白）",
      techniques: ["台灣雙美高濃度膠原蛋白", "即時填補"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "高濃度膠原蛋白即時填補，淚溝/黑眼圈/眼周凹陷專用",
        duration: "維持約 6-12 個月，視代謝",
        common_use: "淚溝、黑眼圈、眼周凹陷",
        caution: "牛源蛋白過敏需先做皮膚測試"
      }
    },
    "晶亮瓷": {
      type: "微型注射（CaHA 鈣羥磷灰石）",
      techniques: ["Radiesse 晶亮瓷"],
      doctor: "林辰",
      facts_for_gen: {
        mechanism: "鈣羥磷灰石微粒立即支撐＋長期膠原增生",
        duration: "立即效果＋12-18 個月維持",
        common_use: "鼻基底、夫妻宮、輪廓塑形",
        caution: "蟹足腫、孕哺、自體免疫、敏感肌需告知"
      }
    },

    // ===== 電音波拉提 =====
    "Thermage FLX 鳳凰電波": {
      type: "拉提儀器（射頻）",
      techniques: ["Solta Medical Thermage FLX", "AccuREP 智慧定位"],
      facts_for_gen: {
        mechanism: "Monopolar RF 單極電波熱能達真皮深層，刺激膠原收縮與新生",
        duration: "膠原啟動 2-3 個月、顛峰 6 個月、維持 1.5-2 年",
        common_use: "全臉鬆弛、毛孔粗、輪廓不清、預防性緊膚",
        caution: "金屬植入物、孕期、近期日曬、皮膚發炎需評估"
      }
    },
    "Ultraformer 海芙音波": {
      type: "拉提儀器（HIFU 聚焦超音波）",
      techniques: ["Ultraformer III／MPT", "韓國 Classys"],
      facts_for_gen: {
        mechanism: "HIFU 高強度聚焦超音波直達 SMAS 筋膜層，由內而外拉提",
        duration: "3 個月見變化、維持約 1-1.5 年",
        common_use: "中下臉鬆弛、下顎輪廓、頸紋、雙下巴、局部減脂",
        caution: "心臟節律器、孕期、皮膚發炎時不建議"
      }
    },
    "Liftera-V 渦旋音波": {
      type: "拉提儀器（音波）",
      techniques: ["TDT 熱擴散技術", "微點筆狀探頭"],
      facts_for_gen: {
        mechanism: "TDT 熱擴散專利技術音波，微點筆狀探頭舒適度高",
        duration: "3 個月見變化、維持 6-12 個月",
        common_use: "臉部緊緻、想要舒適度高的拉提客群",
        caution: "心臟節律器、孕期、近期皮膚發炎需評估"
      }
    },
    "Discovery Pico 探索皮秒": {
      type: "雷射",
      techniques: ["義大利 Quanta System Discovery Pico", "皮秒脈衝"],
      facts_for_gen: {
        mechanism: "極短脈衝把黑色素碎成微粒由身體代謝，熱傷害低",
        duration: "淺斑 3-5 次清除、深斑 6-8 次、間隔至少 1 個月",
        common_use: "斑點、刺青、痘疤、毛孔、暗沉、整體膚質提亮",
        caution: "近期日曬、孕期、光敏體質、皮膚正在發炎需評估"
      }
    },

    // ===== 醫學育髮（李沁鴽醫師）=====
    "ReFolia 光電養髮": {
      type: "醫學育髮（光電）",
      techniques: ["光能刺激", "滋養修護"],
      doctor: "李沁鴽",
      facts_for_gen: {
        mechanism: "光能刺激頭皮循環、平衡油脂分泌、強化毛囊活性",
        duration: "建議療程 3-6 個月，配合作息觀察變化",
        common_use: "早期掉髮、頭皮出油、髮絲變細、產後落髮",
        caution: "頭皮急性發炎、近期植髮、光敏體質需評估"
      }
    },
    "外泌體育髮": {
      type: "醫學育髮（再生）",
      techniques: ["細胞外泌體導入"],
      doctor: "李沁鴽",
      facts_for_gen: {
        mechanism: "細胞外泌體（細胞外囊泡）導入頭皮，目前法規定位敏感（再生醫療法 2026/1/1 上路後嚴管），請以衛教資訊呈現，避免療效宣稱",
        duration: "依療程設計，需多次累積",
        common_use: "頭皮環境改善（衛教向）",
        caution: "再生醫療法管制，廣告與療效宣稱受嚴格限制；孕哺、自體免疫需評估"
      }
    },

    // ===== 女性私密（李沁鴽醫師）=====
    "小陰唇整形": {
      type: "外科手術",
      techniques: ["Labiaplasty"],
      doctor: "李沁鴽",
      facts_for_gen: {
        mechanism: "改善小陰唇過長、不對稱、外觀困擾",
        duration: "恢復 2-4 週、定型 1-3 個月",
        common_use: "小陰唇過長／不對稱／外觀困擾",
        caution: "孕哺、近期感染、糖尿病控制不佳需評估"
      }
    },
    "陰道緊實": {
      type: "外科手術／能量療程",
      techniques: ["Vaginal Tightening", "私密雷射"],
      doctor: "李沁鴽",
      facts_for_gen: {
        mechanism: "依鬆弛程度選手術或能量療程，改善生產後或年齡因素",
        duration: "依術式，恢復數週至 3 個月",
        common_use: "生產後鬆弛、年齡相關不適",
        caution: "孕期、近期感染、子宮疾病需先評估"
      }
    },
    "私密雷射": {
      type: "能量療程",
      techniques: ["私密雷射儀器", "蒙娜麗莎之吻等"],
      doctor: "李沁鴽",
      facts_for_gen: {
        mechanism: "雷射刺激黏膜膠原新生，改善鬆弛、乾燥與不適",
        duration: "建議療程 3 次間隔 4-6 週",
        common_use: "更年期乾燥、生產後鬆弛、輕度漏尿",
        caution: "孕期、近期感染、惡性腫瘤病史需評估"
      }
    },
  },

  // ===== 結尾段落範本 =====
  closing_blocks: {
    doctor_intro: (d) =>
      `\n\n**關於執刀醫師**\n${d.title}，${d.creds.slice(0, 3).join("、")}，` +
      `${d.creds.slice(3).join("、")}。整形外科最重要的不是術後三天有沒有變美，而是十年後妳會不會慶幸當初選對人。`,
    clinic_note: () =>
      `\n\n**關於診所**\n麗得醫美整形外科診所重視術前評估與術後追蹤，隆乳植入物搭配原廠終身保固。手術療程因個人條件差異甚大，最終以醫師評估為準。`,
  },

  // ===== CTA =====
  ctas: [
    "想了解自己適合哪一種術式，可以先預約諮詢，現場由醫師評估",
    "手術不是看哪種紅就做哪種，先讓醫師看條件再決定",
    "歡迎來診讓陳錫根院長親自評估，把問題一次問清楚",
    "若想先在 LINE 詢問初步問題，可加 @leaderclinic",
    "更詳細的術前注意事項，建議現場諮詢取得個別化說明",
  ],
};
