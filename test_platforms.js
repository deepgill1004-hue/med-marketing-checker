// 平台差異化驗證測試
// 跑 Node 即可，模擬 window 載入所有資料檔，對同主題跑全平台輸出
// 用法：node test_platforms.js > test_output.txt

const fs = require('fs');
const path = require('path');

// 建立 window stub
global.window = {};

// 載入順序：rules → optimizer → generator → clinic
const files = ['data/rules.js', 'data/optimizer.js', 'data/industry_data.js', 'data/generator.js', 'data/clinic_lidai.js'];
files.forEach(f => {
  const code = fs.readFileSync(path.join(__dirname, f), 'utf8');
  // 把 window.XXX 變成 global.XXX
  const wrapped = code.replace(/window\./g, 'global.');
  eval(wrapped);
});

const G = global.GENERATOR;
const O = global.OPTIMIZER;
const C = global.CLINIC_LIDAI;

// 測試函數
function testCase(topic, contentTypeId, facts, useClinic = false) {
  console.log("\n" + "=".repeat(80));
  console.log(`📋 主題：「${topic}」｜類型：${G.content_types[contentTypeId].label}${useClinic ? '｜含麗得診所素材' : ''}`);
  console.log("=".repeat(80));

  const platforms = ['FB', 'IG', 'Threads', '小紅書', 'LINE_OA', 'LinkedIn'];
  const cta = useClinic ? C.ctas[0] : O.ctas[0].text;

  platforms.forEach(platform => {
    const ctx = {
      topic, topicSafe: topic, facts, audience: '', compareWith: '肉毒',
      platform, mode: useClinic ? 'clinic_ad' : 'personal_ip',
      cta, clinic: useClinic ? C : null, contentTypeId
    };
    let text = G.buildForPlatform(ctx);
    if (useClinic && G.apply_clinic_pack) text = G.apply_clinic_pack(text, ctx);
    text = G.platform_post_process(text, platform, O.hashtags[platform] || []);

    console.log(`\n── 【${platform}】 共 ${text.length} 字 ──`);
    console.log(text.slice(0, 600));
    if (text.length > 600) console.log(`... [還有 ${text.length - 600} 字]`);
  });
}

// 案例 1：玻尿酸 + FAQ + 個人 IP
testCase('玻尿酸', 'faq_qa', G.topic_facts['玻尿酸']);

// 案例 2：玻尿酸 + 痛點 + 個人 IP
testCase('玻尿酸', 'pain_point', G.topic_facts['玻尿酸']);

// 案例 3：隆乳手術 + FAQ + 麗得診所
testCase('隆乳手術', 'faq_qa', C.surgeries['隆乳手術'].facts_for_gen, true);

// 案例 4：隆乳手術 + 反向勸退 + 麗得診所
testCase('隆乳手術', 'reverse', C.surgeries['隆乳手術'].facts_for_gen, true);

// 案例 5：眼袋手術 + 時間線 + 麗得診所
testCase('眼袋手術', 'timeline', C.surgeries['眼袋手術'].facts_for_gen, true);

console.log("\n" + "=".repeat(80));
console.log("✓ 測試完成");
console.log("=".repeat(80));
