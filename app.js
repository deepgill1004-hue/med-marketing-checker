// 醫美行銷檢查器 - 主邏輯 v0.1
// 依賴：data/rules.js (RULES), data/optimizer.js (OPTIMIZER), Tesseract.js (OCR)

(function() {
  'use strict';

  const state = {
    mode: 'personal_ip',      // personal_ip | clinic_ad
    platform: 'FB',
    text: '',
    image: null,
    ocrText: '',
    results: null
  };

  // ===== DOM refs =====
  const $ = (id) => document.getElementById(id);
  const els = {
    modePersonal: $('mode-personal'),
    modeClinic: $('mode-clinic'),
    modeDescText: $('mode-desc-text'),
    inputText: $('input-text'),
    charCount: $('char-count'),
    imageUpload: $('image-upload'),
    imagePreview: $('image-preview'),
    imagePreviewWrap: $('image-preview-wrap'),
    ocrStatus: $('ocr-status'),
    btnCheck: $('btn-check'),
    riskBadge: $('risk-badge'),
    scoreCircle: $('score-circle'),
    scoreNum: $('score-num'),
    scoreSummary: $('score-summary'),
    highlightedText: $('highlighted-text'),
    violationsList: $('violations-list'),
    hooksSuggestion: $('hooks-suggestion'),
    rewritePreview: $('rewrite-preview'),
    btnCopyRewrite: $('btn-copy-rewrite'),
    structureRec: $('structure-rec'),
    scoreBreakdown: $('score-breakdown'),
    optimizePlatformTag: $('optimize-platform-tag'),
    hashtagRec: $('hashtag-rec'),
    visualRec: $('visual-rec'),
    platformSpecTip: $('platform-spec-tip'),
    goldenRules: $('golden-rules'),
  };

  // 心法常駐顯示
  if (els.goldenRules) {
    els.goldenRules.innerHTML = OPTIMIZER.golden_rules.map(r => `<li class="flex gap-1.5"><span class="text-pink-500">▸</span><span>${escapeHtmlEarly(r)}</span></li>`).join('');
  }
  function escapeHtmlEarly(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}

  // ===== Mode switching =====
  function setMode(mode) {
    state.mode = mode;
    const isPersonal = mode === 'personal_ip';
    els.modePersonal.classList.toggle('tab-active', isPersonal);
    els.modePersonal.classList.toggle('text-gray-600', !isPersonal);
    els.modeClinic.classList.toggle('tab-active', !isPersonal);
    els.modeClinic.classList.toggle('text-gray-600', isPersonal);
    els.modeDescText.textContent = RULES.mode_diff[mode].desc;
  }
  els.modePersonal.addEventListener('click', () => setMode('personal_ip'));
  els.modeClinic.addEventListener('click', () => setMode('clinic_ad'));
  setMode('personal_ip');

  // ===== Platform selector =====
  document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.platform = btn.dataset.platform;
      document.querySelectorAll('.platform-btn').forEach(b => {
        b.classList.remove('badge-pink');
        b.classList.add('bg-gray-100', 'text-gray-600');
      });
      btn.classList.add('badge-pink');
      btn.classList.remove('bg-gray-100', 'text-gray-600');
    });
  });

  // ===== Input tracking =====
  els.inputText.addEventListener('input', (e) => {
    state.text = e.target.value;
    els.charCount.textContent = `${state.text.length} 字`;
  });

  // ===== Image upload + OCR =====
  els.imageUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    state.image = file;
    const url = URL.createObjectURL(file);
    els.imagePreview.src = url;
    els.imagePreviewWrap.classList.remove('hidden');
    els.ocrStatus.innerHTML = '<span class="pulse-dot">OCR 解析中...這可能需要 10-30 秒</span>';
    try {
      const result = await Tesseract.recognize(file, 'chi_tra+eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            els.ocrStatus.innerHTML = `<span class="pulse-dot">辨識中 ${Math.round(m.progress * 100)}%</span>`;
          }
        }
      });
      state.ocrText = result.data.text;
      const combined = (state.text + '\n\n' + state.ocrText).trim();
      els.inputText.value = combined;
      state.text = combined;
      els.charCount.textContent = `${combined.length} 字`;
      els.ocrStatus.innerHTML = `<span class="text-emerald-600">✓ OCR 完成，已合併到文字輸入框（共抓到 ${state.ocrText.length} 字）</span>`;
    } catch (err) {
      els.ocrStatus.innerHTML = `<span class="text-red-500">⚠ OCR 失敗：${err.message}</span>`;
    }
  });

  // ===== Compliance check engine =====
  function checkCompliance(text) {
    const violations = [];
    const highlights = []; // { start, end, level, info }

    // 1. Red words 掃描
    RULES.red_words.forEach(rule => {
      const idx = text.indexOf(rule.word);
      if (idx !== -1) {
        let start = idx;
        while (start !== -1) {
          highlights.push({
            start, end: start + rule.word.length, level: 'red',
            info: rule
          });
          start = text.indexOf(rule.word, start + 1);
        }
        violations.push({ level: 'red', type: 'word', ...rule });
      }
    });

    // 2. Yellow words 掃描
    RULES.yellow_words.forEach(rule => {
      const idx = text.indexOf(rule.word);
      if (idx !== -1) {
        let start = idx;
        while (start !== -1) {
          // 避免覆蓋已標紅
          const overlap = highlights.some(h => start >= h.start && start < h.end);
          if (!overlap) {
            highlights.push({
              start, end: start + rule.word.length, level: 'yellow',
              info: rule
            });
          }
          start = text.indexOf(rule.word, start + 1);
        }
        violations.push({ level: 'yellow', type: 'word', ...rule });
      }
    });

    // 3. Regex patterns 掃描
    RULES.regex_patterns.forEach(rule => {
      const matches = [...text.matchAll(rule.pattern)];
      matches.forEach(m => {
        highlights.push({
          start: m.index, end: m.index + m[0].length,
          level: rule.severity === 'high' ? 'red' : 'yellow',
          info: { word: m[0], law: rule.law, reason: rule.reason, category: rule.label, alt: '' }
        });
        violations.push({
          level: rule.severity === 'high' ? 'red' : 'yellow',
          type: 'pattern',
          word: m[0],
          law: rule.law,
          reason: rule.reason,
          category: rule.label,
          alt: ''
        });
      });
    });

    // 4. 結構性違規偵測（簡易版）
    RULES.pattern_violations.forEach(pv => {
      let trigger = false;
      if (pv.id === 'before_after' && /(術前|前\s*\/|before).{0,15}(術後|\/\s*後|after)/i.test(text)) trigger = true;
      if (pv.id === 'patient_testimony' && /(我打了|做完之後|這次療程讓我|親身).{0,30}(滿意|效果|推薦|超棒|超讚)/.test(text)) trigger = true;
      if (pv.id === 'celebrity_endorse' && /(代言|親自推薦|明星|藝人|網紅|KOL).{0,15}(使用|推薦|親自)/.test(text)) trigger = true;
      if (trigger) {
        violations.push({ level: 'red', type: 'pattern_violation', word: pv.name, ...pv, reason: pv.desc });
      }
    });

    // 雙模式調整：個人 IP 模式對部分詞放寬
    const modeRules = RULES.mode_diff[state.mode];
    const filteredViolations = violations.filter(v => {
      if (state.mode === 'personal_ip' && modeRules.relaxed.includes(v.word)) return false;
      return true;
    });

    // 計算分數（100 - 違規扣分）
    let score = 100;
    filteredViolations.forEach(v => {
      score -= v.level === 'red' ? 12 : 4;
    });
    score = Math.max(0, score);

    return { violations: filteredViolations, highlights, score };
  }

  // ===== Highlight rendering =====
  function renderHighlight(text, highlights) {
    if (!text) return '<span class="text-gray-400">尚未檢測</span>';
    // 依 start 排序，避免重疊
    const sorted = [...highlights].sort((a, b) => a.start - b.start);
    const merged = [];
    sorted.forEach(h => {
      if (merged.length === 0 || h.start >= merged[merged.length - 1].end) {
        merged.push(h);
      }
    });
    let html = '';
    let cursor = 0;
    merged.forEach(h => {
      html += escapeHtml(text.slice(cursor, h.start));
      const cls = h.level === 'red' ? 'highlight-red' : 'highlight-yellow';
      const title = `${h.info.category || ''} | ${h.info.reason || ''}（${h.info.law || ''}）`;
      html += `<span class="${cls}" title="${escapeHtml(title)}">${escapeHtml(text.slice(h.start, h.end))}</span>`;
      cursor = h.end;
    });
    html += escapeHtml(text.slice(cursor));
    return html || '<span class="text-gray-400">無內容</span>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  }

  // ===== Rewrite (compliance auto-fix) =====
  function rewriteForCompliance(text, violations) {
    let result = text;
    violations.forEach(v => {
      if (v.alt && v.type === 'word') {
        const re = new RegExp(escapeRegex(v.word), 'g');
        result = result.replace(re, v.alt || '［請改寫］');
      } else if (v.level === 'red' && v.type === 'word') {
        const re = new RegExp(escapeRegex(v.word), 'g');
        result = result.replace(re, `［⚠ ${v.word} 違規請刪除］`);
      }
    });
    // pattern regex 也清掉
    RULES.regex_patterns.forEach(rule => {
      if (rule.severity === 'high') {
        result = result.replace(rule.pattern, '［⚠ 違規促銷／保證／對比語句請改寫］');
      }
    });
    return result;
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ===== Hook suggestions =====
  function suggestHooks(text, platform) {
    // 主題抽取（簡易版：找關鍵詞）
    const topicKeywords = ['玻尿酸', '肉毒', '電波', '音波', '皮秒', '雷射', '童顏針', '少女針', 'PRP', '保養', '抗老', '緊緻', '美白', '除皺', '眼袋', '法令紋'];
    const topic = topicKeywords.find(k => text.includes(k)) || '這個療程';

    // 篩選符合平台的 hook
    const candidates = OPTIMIZER.hooks.filter(h => h.platform.includes(platform) || platform === 'FB');
    // 隨機取 3 個
    const picks = candidates.sort(() => Math.random() - 0.5).slice(0, 3);
    return picks.map(p => ({
      text: p.template.replace(/{{topic}}/g, topic).replace(/{{treatment}}/g, topic).replace(/{{number}}/g, '3').replace(/{{age}}/g, '35').replace(/{{current_age}}/g, '40').replace(/{{season}}/g, '夏天').replace(/{{action}}/g, '療程').replace(/{{misconception}}/g, '某些迷思').replace(/{{turning_point}}/g, '我親自驗證').replace(/{{insight}}/g, '一個少有人提的觀點').replace(/{{phenomenon}}/g, '會這樣').replace(/{{treatment_a}}/g, '玻尿酸').replace(/{{treatment_b}}/g, '童顏針').replace(/{{problem}}/g, '看起來怪怪的'),
      scene: p.scene,
      why: p.why
    }));
  }

  // ===== Structure recommendation =====
  function suggestStructure(platform, text) {
    const lengthMap = {
      'FB': '痛點 → 場景 → 原理 → 行動',
      'Threads': 'Hook → 3 個誤解 → 真相 → 諮詢動線',
      'IG': 'Hook → 3 個誤解 → 真相 → 諮詢動線',
      '小紅書': '比較表格型 或 Hook → 3 個誤解 → 真相',
      'LINE_OA': '對話開頭 → 醫師專業解答 → CTA',
      'LinkedIn': '痛點 → 場景 → 原理 → 行動（拉長 + 業界觀察）',
    };
    const recName = lengthMap[platform] || '痛點 → 場景 → 原理 → 行動';
    const match = OPTIMIZER.structures.find(s => s.name === recName) || OPTIMIZER.structures[0];
    return match;
  }

  // ===== Scoring breakdown =====
  function scoreBreakdown(text, complianceScore, platform) {
    const spec = OPTIMIZER.platform_formulas[platform] || OPTIMIZER.platform_formulas.FB;
    const len = text.length;
    const inRange = len >= spec.word_count[0] && len <= spec.word_count[1];

    // Hook 抓眼力：開頭 30 字是否有數字、人物、痛點關鍵字
    const opening = text.slice(0, spec.hook_max);
    const hookScore = (
      (/\d+/.test(opening) ? 30 : 0) +
      (/(我|妳|你|她|他|醫師|護理師|姐妹|客人)/.test(opening) ? 25 : 0) +
      (/(？|\?|不是|為什麼|其實|別再|看過來)/.test(opening) ? 25 : 0) +
      (opening.length >= 15 && opening.length <= spec.hook_max ? 20 : 0)
    );

    // 資訊密度：句子長度與資訊類關鍵字
    const infoKw = (text.match(/(原理|機轉|成分|劑量|頻率|週期|適合|不適合|常見|風險|副作用|恢復期)/g) || []).length;
    const infoScore = Math.min(100, infoKw * 20 + (inRange ? 20 : 0));

    // 情緒共鳴：人稱代名詞 + 對話 + 情緒詞
    const emoKw = (text.match(/(妳|姐妹|擔心|煩惱|害怕|猶豫|終於|原來|沒想到|超後悔|早知道)/g) || []).length;
    const emoScore = Math.min(100, emoKw * 12 + 20);

    // 可信度：數字 + 專業詞 + 衛教
    const credKw = (text.match(/\d+(年|次|歲|週|月|%)/g) || []).length;
    const credScore = Math.min(100, credKw * 15 + (text.includes('衛福部') || text.includes('臨床') ? 25 : 0) + 20);

    // CTA 清晰度：是否有導流動詞
    const ctaScore = /(私訊|LINE|留言|追蹤|收藏|分享|問我|聊聊|了解|預約)/.test(text) ? 90 : 30;

    return [
      { id: 'hook_strength', name: '開頭抓眼力', score: hookScore },
      { id: 'info_density', name: '資訊密度', score: infoScore },
      { id: 'emotion', name: '情緒共鳴', score: emoScore },
      { id: 'credibility', name: '可信度', score: credScore },
      { id: 'cta_clarity', name: '行動指引', score: ctaScore },
      { id: 'compliance', name: '合規程度', score: complianceScore },
    ];
  }

  // ===== Risk badge =====
  function setRiskBadge(score, violations) {
    const redCount = violations.filter(v => v.level === 'red').length;
    const yellowCount = violations.filter(v => v.level === 'yellow').length;
    let badge, color, summary;
    if (score >= 80 && redCount === 0) {
      badge = '✓ 合規通過'; color = 'badge-mint';
      summary = `太好了，${yellowCount > 0 ? `有 ${yellowCount} 個黃線詞請留意條件` : '沒抓到違規點'}`;
    } else if (score >= 50) {
      badge = `⚠ 有 ${redCount} 個違規`; color = 'badge-yellow';
      summary = `中度風險，紅線 ${redCount} 個、黃線 ${yellowCount} 個，需修改後再發`;
    } else {
      badge = `✗ 高度違規 (${redCount})`; color = 'badge-red';
      summary = `這篇直接發會被罰，紅線 ${redCount} 個、黃線 ${yellowCount} 個，建議用右下的重寫版`;
    }
    els.riskBadge.textContent = badge;
    els.riskBadge.className = `badge ${color}`;
    els.scoreSummary.textContent = summary;

    // Update score circle
    const circumference = 213.6;
    const offset = circumference - (score / 100) * circumference;
    els.scoreCircle.style.strokeDashoffset = offset;
    els.scoreCircle.style.stroke = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
    els.scoreNum.textContent = score;
  }

  // ===== Render violations list =====
  function renderViolations(violations) {
    if (violations.length === 0) {
      els.violationsList.innerHTML = '<div class="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-xl">✓ 沒抓到違規詞或結構問題</div>';
      return;
    }
    // 去重（同詞同類別只列一次）
    const seen = new Set();
    const unique = violations.filter(v => {
      const key = `${v.word}-${v.category}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    els.violationsList.innerHTML = unique.map(v => `
      <div class="flex items-start gap-2 p-2.5 rounded-xl ${v.level === 'red' ? 'bg-red-50' : 'bg-yellow-50'} text-xs">
        <span class="badge ${v.level === 'red' ? 'badge-red' : 'badge-yellow'} flex-shrink-0">${v.level === 'red' ? '紅' : '黃'}</span>
        <div class="flex-1">
          <div class="font-semibold text-sophie-ink">${escapeHtml(v.word || v.name)} <span class="text-gray-400 font-normal">· ${escapeHtml(v.category || '')}</span></div>
          <div class="text-gray-600 mt-0.5">${escapeHtml(v.reason || v.desc || '')}</div>
          <div class="text-gray-400 mt-0.5">法源：${escapeHtml(v.law || '—')}</div>
          ${v.alt ? `<div class="mt-1 text-emerald-700">建議改：「${escapeHtml(v.alt)}」</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  // ===== Render hooks =====
  function renderHooks(hooks) {
    els.hooksSuggestion.innerHTML = hooks.map((h, i) => `
      <div class="p-3 bg-pink-50 rounded-xl text-sm">
        <div class="font-semibold text-sophie-ink">${i+1}. ${escapeHtml(h.text)}</div>
        <div class="text-xs text-gray-500 mt-1">${escapeHtml(h.scene)} · ${escapeHtml(h.why)}</div>
      </div>
    `).join('');
  }

  // ===== Render score breakdown =====
  function renderScoreBreakdown(breakdown) {
    els.scoreBreakdown.innerHTML = breakdown.map(b => `
      <div class="flex items-center gap-2">
        <span class="w-20 flex-shrink-0 text-gray-600">${b.name}</span>
        <div class="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div class="h-full ${b.score >= 70 ? 'bg-emerald-400' : b.score >= 40 ? 'bg-amber-400' : 'bg-red-400'}" style="width: ${b.score}%; background-color: ${b.score >= 70 ? '#10b981' : b.score >= 40 ? '#f59e0b' : '#ef4444'}"></div>
        </div>
        <span class="w-8 text-right text-gray-700 font-semibold">${b.score}</span>
      </div>
    `).join('');
  }

  // ===== Main check action =====
  els.btnCheck.addEventListener('click', () => {
    const text = state.text.trim();
    if (!text) {
      els.scoreSummary.textContent = '請先貼上文案或上傳圖檔';
      return;
    }
    const { violations, highlights, score } = checkCompliance(text);
    state.results = { violations, highlights, score };

    // 渲染合規區
    setRiskBadge(score, violations);
    els.highlightedText.innerHTML = renderHighlight(text, highlights);
    renderViolations(violations);

    // 渲染優化區
    const rewritten = rewriteForCompliance(text, violations);
    els.rewritePreview.textContent = rewritten;
    els.btnCopyRewrite.classList.remove('hidden');

    const hooks = suggestHooks(text, state.platform);
    renderHooks(hooks);

    const struct = suggestStructure(state.platform, text);
    els.structureRec.innerHTML = `
      <div class="font-semibold text-sophie-ink mb-1">${escapeHtml(struct.name)}</div>
      <ol class="list-decimal pl-5 space-y-0.5 text-xs text-gray-600">
        ${struct.flow.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
      </ol>
    `;

    const breakdown = scoreBreakdown(text, score, state.platform);
    renderScoreBreakdown(breakdown);

    els.optimizePlatformTag.textContent = `平台：${state.platform}`;

    // Hashtag 建議
    const tags = OPTIMIZER.hashtags[state.platform] || OPTIMIZER.hashtags.IG || [];
    if (tags.length === 0) {
      els.hashtagRec.innerHTML = '<span class="text-gray-400 text-xs">此平台不靠 hashtag（如 Threads／LINE）</span>';
    } else {
      els.hashtagRec.innerHTML = tags.slice(0, 10).map(t => `<span class="badge badge-pink">${escapeHtml(t)}</span>`).join('');
    }

    // 視覺建議
    const vr = OPTIMIZER.visual_rules;
    const isVideo = ['IG','抖音','小紅書'].includes(state.platform);
    els.visualRec.innerHTML = isVideo
      ? `<div class="mb-1.5"><b>封面</b>：${vr.cover.title_chars[0]}-${vr.cover.title_chars[1]} 字、${vr.cover.layout}</div>
         <div class="mb-1.5"><b>Reels/短片前 3 秒</b>：${vr.reels.first_3_sec.join(' / ')}</div>
         <div><b>輪播</b>：${vr.carousel.pages[0]}-${vr.carousel.pages[1]} 頁，末頁放 CTA</div>`
      : `<div class="mb-1.5"><b>封面</b>：${vr.cover.title_chars[0]}-${vr.cover.title_chars[1]} 字、粗黑體</div>
         <div><b>配色推薦</b>：${vr.cover.color_combos.map(c=>c.name).join(' / ')}</div>`;

    // 平台規格提示
    const fmt = OPTIMIZER.platform_formulas[state.platform];
    if (fmt) {
      const len = text.length;
      const lenOk = len >= fmt.word_count[0] && len <= fmt.word_count[1];
      els.platformSpecTip.innerHTML = `
        <b>${escapeHtml(fmt.label)} 規格</b>：字數 ${fmt.word_count[0]}-${fmt.word_count[1]}（妳目前 <span class="${lenOk ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}">${len}</span> 字${lenOk ? ' ✓' : ' 建議調整'}）<br>
        <b>結構</b>：${escapeHtml(fmt.structure)}<br>
        <b>算法重點</b>：${escapeHtml(fmt.algo_note)}
      `;
    }
  });

  // ===== 自動生成（主題 → 爆款合規文案）=====
  const btnGenerate = $('btn-generate');
  const genType = $('gen-type');
  const genCompareWrap = $('gen-compare-wrap');

  // 比較類型才顯示「比較對象」欄
  if (genType && genCompareWrap) {
    const toggleCompare = () => {
      genCompareWrap.classList.toggle('hidden', genType.value !== 'comparison');
    };
    genType.addEventListener('change', toggleCompare);
    toggleCompare();
  }

  // 診所勾選 → 切換主題輸入方式 + 強制診所模式
  const genClinicCheck = $('gen-clinic-lidai');
  const genTopicInput = $('gen-topic');
  const genTopicClinic = $('gen-topic-clinic');
  if (genClinicCheck) {
    genClinicCheck.addEventListener('change', () => {
      const on = genClinicCheck.checked;
      genTopicInput.classList.toggle('hidden', on);
      genTopicClinic.classList.toggle('hidden', !on);
      if (on) setMode('clinic_ad');
    });
  }

  function generateContent() {
    const useClinic = genClinicCheck && genClinicCheck.checked;
    const topicRaw = useClinic ? genTopicClinic.value : ($('gen-topic').value || '').trim();
    if (!topicRaw) {
      alert('請先填主題（例：玻尿酸、肉毒、電波）或勾選麗得醫美選療程');
      return;
    }
    const typeId = $('gen-type').value;
    const audience = ($('gen-audience').value || '').trim();
    const compareWith = ($('gen-compare')?.value || '').trim();
    const platform = state.platform;
    const mode = state.mode;

    // 麗得診所主題：直接抓 surgery facts
    let topicSafe = topicRaw;
    let facts = null;
    let clinic = null;
    if (useClinic && CLINIC_LIDAI.surgeries[topicRaw]) {
      facts = CLINIC_LIDAI.surgeries[topicRaw].facts_for_gen;
      clinic = CLINIC_LIDAI;
    } else {
      // 一般主題：安全替換
      topicSafe = GENERATOR.topic_alias[topicRaw] || topicRaw;
      if (topicSafe.startsWith('（')) {
        alert(`「${topicRaw}」目前法規上不適合直接做為文案主題：\n${topicSafe}\n\n請改用其他主題。`);
        return;
      }
      facts = GENERATOR.topic_facts[topicSafe] || GENERATOR.topic_facts[topicRaw] || null;
    }

    // CTA 池：診所版優先
    const ctaPool = clinic ? clinic.ctas.map(t => ({ text: t })) : OPTIMIZER.ctas;
    const cta = ctaPool[Math.floor(Math.random() * ctaPool.length)].text;

    const ct = GENERATOR.content_types[typeId];
    if (!ct) { alert('內容類型錯誤'); return; }

    const ctx = { topic: topicRaw, topicSafe, facts, audience, compareWith, platform, mode, cta, clinic, contentTypeId: typeId };
    // 平台差異化：LINE_OA / Threads / IG / 小紅書 / LinkedIn 走獨立骨架
    // 其他平台（FB / Vocus / 未列）走通用 build
    let text = GENERATOR.buildForPlatform
      ? GENERATOR.buildForPlatform(ctx)
      : ct.build(ctx);

    // 診所專屬擴充（補院長 + 診所段落 + CTA）
    if (clinic && GENERATOR.apply_clinic_pack) {
      text = GENERATOR.apply_clinic_pack(text, ctx);
    }

    const hashtags = OPTIMIZER.hashtags[platform] || [];
    text = GENERATOR.platform_post_process(text, platform, hashtags);

    els.inputText.value = text;
    state.text = text;
    els.charCount.textContent = `${text.length} 字`;

    // 跑合規檢查
    els.btnCheck.click();

    // 保險閘 + 配圖
    setTimeout(() => {
      if (state.results && state.results.violations.some(v => v.level === 'red')) {
        const cleaned = rewriteForCompliance(text, state.results.violations);
        els.inputText.value = cleaned;
        state.text = cleaned;
        els.charCount.textContent = `${cleaned.length} 字`;
        els.btnCheck.click();
      }
      // 自動產 2 張圖
      generateImages({
        topic: topicRaw,
        contentTypeLabel: ct.label,
        fullText: state.text,
        brand: clinic ? "麗得醫美整形外科 · 蘇菲 IP" : "蘇菲 IP",
      });
    }, 150);
  }

  if (btnGenerate) btnGenerate.addEventListener('click', generateContent);

  // ===== Settings Modal（API key 管理）=====
  const settingsModal = $('settings-modal');
  const btnSettings = $('btn-settings');
  const btnCloseSettings = $('btn-close-settings');
  const apiKeyInput = $('api-key-input');
  const btnTestApi = $('btn-test-api');
  const btnSaveApi = $('btn-save-api');
  const btnClearApi = $('btn-clear-api');
  const apiStatus = $('api-status');

  function openSettings() {
    if (typeof AI_GEN !== 'undefined' && AI_GEN.hasKey()) {
      apiKeyInput.value = AI_GEN.getKey();
      apiStatus.innerHTML = '<span class="text-emerald-600">✓ 已儲存 API key（顯示為遮蔽，可重新貼）</span>';
    } else {
      apiStatus.innerHTML = '<span class="text-amber-600">⚠ 尚未設定 API key</span>';
    }
    settingsModal.classList.remove('hidden');
  }
  function closeSettings() { settingsModal.classList.add('hidden'); }

  if (btnSettings) btnSettings.addEventListener('click', (e) => { e.preventDefault(); openSettings(); });
  if (btnCloseSettings) btnCloseSettings.addEventListener('click', closeSettings);
  if (settingsModal) settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) closeSettings();
  });

  if (btnSaveApi) btnSaveApi.addEventListener('click', () => {
    const k = apiKeyInput.value.trim();
    if (!k.startsWith('sk-ant-')) {
      apiStatus.innerHTML = '<span class="text-red-600">⚠ API key 格式不對，應該以 sk-ant- 開頭</span>';
      return;
    }
    AI_GEN.setKey(k);
    apiStatus.innerHTML = '<span class="text-emerald-600">✓ 已儲存到瀏覽器 localStorage</span>';
  });

  if (btnTestApi) btnTestApi.addEventListener('click', async () => {
    const k = apiKeyInput.value.trim();
    if (k) AI_GEN.setKey(k);
    apiStatus.innerHTML = '<span class="text-pink-600 pulse-dot">測試中⋯</span>';
    try {
      const reply = await AI_GEN.testConnection();
      apiStatus.innerHTML = `<span class="text-emerald-600">✓ 連線成功！Claude 回應：「${reply}」</span>`;
    } catch (err) {
      apiStatus.innerHTML = `<span class="text-red-600">✗ ${err.message}</span>`;
    }
  });

  if (btnClearApi) btnClearApi.addEventListener('click', () => {
    if (confirm('確定要清除已存的 API key？')) {
      AI_GEN.clearKey();
      apiKeyInput.value = '';
      apiStatus.innerHTML = '<span class="text-gray-500">已清除</span>';
    }
  });

  // ===== AI 即時生成 =====
  const btnAiGenerate = $('btn-ai-generate');
  if (btnAiGenerate) btnAiGenerate.addEventListener('click', async () => {
    if (typeof AI_GEN === 'undefined') { alert('AI 引擎未載入'); return; }
    if (!AI_GEN.hasKey()) {
      openSettings();
      apiStatus.innerHTML = '<span class="text-amber-600">⚠ 請先設定 API key 才能使用 AI 即時生成</span>';
      return;
    }

    const useClinic = genClinicCheck && genClinicCheck.checked;
    const topicRaw = useClinic ? genTopicClinic.value : ($('gen-topic').value || '').trim();
    if (!topicRaw) {
      alert('請先填主題或勾麗得選療程');
      return;
    }
    const typeId = $('gen-type').value;
    const audience = ($('gen-audience').value || '').trim();
    const compareWith = ($('gen-compare')?.value || '').trim();

    // UI 提示
    btnAiGenerate.disabled = true;
    const originalText = btnAiGenerate.innerHTML;
    btnAiGenerate.innerHTML = '<span class="pulse-dot">AI 即時搜尋＋生成中⋯ 約 30-60 秒</span>';

    els.inputText.value = '⏳ AI 正在執行：\n\n1. 搜尋衛福部最近 30 天醫美公告\n2. 抓取「' + topicRaw + '」最新趨勢與統計\n3. 分析「' + state.platform + '」近期同主題爆款\n4. 餵入 Claude 即時生成符合法規的爆款文案\n\n預計 30-60 秒，請稍候⋯';
    state.text = els.inputText.value;
    els.charCount.textContent = `${state.text.length} 字`;

    try {
      const ctx = {
        topic: topicRaw,
        topicSafe: useClinic ? topicRaw : (GENERATOR.topic_alias[topicRaw] || topicRaw),
        audience, compareWith,
        platform: state.platform,
        mode: state.mode,
        contentTypeId: typeId,
        clinic: useClinic ? CLINIC_LIDAI : null,
      };
      const result = await AI_GEN.generate(ctx);

      // 灌入主編輯區
      els.inputText.value = result.text;
      state.text = result.text;
      els.charCount.textContent = `${result.text.length} 字`;

      // 跑合規檢查
      els.btnCheck.click();

      // 自動配圖（優先用 AI 結構化 imagedata）
      const ct = GENERATOR.content_types[typeId];
      setTimeout(() => {
        generateImages({
          topic: topicRaw,
          contentTypeLabel: ct.label,
          fullText: state.text,
          brand: useClinic ? "麗得醫美整形外科 · 蘇菲 IP" : "蘇菲 IP",
          imagedata: result.imagedata,
        });

        // 顯示搜尋來源
        if (result.sources && result.sources.length > 0) {
          showSearchSources(result.sources, result.usage);
        }
      }, 150);

    } catch (err) {
      els.inputText.value = `❌ AI 生成失敗：${err.message}\n\n可能原因：\n• API key 無效或額度不足\n• 網路連線問題\n• Anthropic API 暫時故障\n\n建議：先用「📝 本地範本生成」應急，或到 ⚙️ 設定 重試連線。`;
      state.text = els.inputText.value;
    } finally {
      btnAiGenerate.disabled = false;
      btnAiGenerate.innerHTML = originalText;
    }
  });

  // 顯示搜尋來源（即時抓料證據）
  function showSearchSources(sources, usage) {
    let html = '<div class="mt-4 p-4 bg-blue-50 rounded-2xl text-xs">';
    html += '<div class="font-bold text-blue-900 mb-2">🔍 AI 即時搜尋的資料來源</div>';
    const queries = sources.filter(s => s.query).map(s => s.query);
    const urls = sources.filter(s => s.url);
    if (queries.length > 0) {
      html += '<div class="mb-2"><b>搜尋關鍵字：</b>' + queries.map(q => `<span class="badge bg-white text-blue-700 mr-1">${escapeHtml(q)}</span>`).join('') + '</div>';
    }
    if (urls.length > 0) {
      html += '<div class="space-y-1"><b>引用網頁：</b>';
      urls.slice(0, 8).forEach(s => {
        html += `<a href="${escapeHtml(s.url)}" target="_blank" class="block text-blue-700 hover:underline truncate">• ${escapeHtml(s.title || s.url)}</a>`;
      });
      html += '</div>';
    }
    if (usage) {
      html += `<div class="mt-2 pt-2 border-t border-blue-200 text-blue-600">Token：輸入 ${usage.input_tokens} / 輸出 ${usage.output_tokens}｜本次估算 $${((usage.input_tokens * 3 + usage.output_tokens * 15) / 1000000).toFixed(4)} USD</div>`;
    }
    html += '</div>';

    // 插入到 highlighted-text 區塊上方
    let container = $('ai-sources-display');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ai-sources-display';
      els.highlightedText.parentElement.insertBefore(container, els.highlightedText.parentElement.firstChild);
    }
    container.innerHTML = html;
  }

  // ===== 自動配圖 =====
  function generateImages({ topic, contentTypeLabel, fullText, brand, imagedata }) {
    if (typeof IMAGE_GEN === 'undefined') return;
    const themeSel = $('image-theme');
    const pair = (themeSel?.value || 'warm-trust').split('-');
    const imgs = IMAGE_GEN.generatePair({
      topic, contentTypeLabel, fullText, brand, themePair: pair, imagedata,
    });
    renderImages(imgs);
    // 暫存最新生圖參數（含 imagedata），供「重新生圖」按鈕使用
    state.lastImageParams = { topic, contentTypeLabel, fullText, brand, imagedata };
  }

  function renderImages(imgs) {
    const card = $('image-card');
    const grid = $('image-grid');
    if (!card || !grid) return;
    card.style.display = 'block';
    grid.innerHTML = imgs.map((img, i) => `
      <div class="space-y-2">
        <img src="${img.url}" alt="${escapeHtml(img.filename)}" class="w-full rounded-xl border border-pink-100 shadow-sm">
        <a href="${img.url}" download="${escapeHtml(img.filename)}"
           class="block text-center text-xs py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg font-medium transition">
          ⬇ 下載 ${img.kind === 'cover' ? '封面' : '重點卡'}
        </a>
      </div>
    `).join('');
  }

  // 重新生圖按鈕（換配色／重排）
  const btnRegenImages = $('btn-regen-images');
  if (btnRegenImages) {
    btnRegenImages.addEventListener('click', () => {
      if (state.lastImageParams) generateImages(state.lastImageParams);
    });
  }
  const imageThemeSel = $('image-theme');
  if (imageThemeSel) {
    imageThemeSel.addEventListener('change', () => {
      if (state.lastImageParams) generateImages(state.lastImageParams);
    });
  }

  // ===== Demo loader =====
  const btnDemo = $('btn-demo');
  if (btnDemo) {
    btnDemo.addEventListener('click', () => {
      els.inputText.value = `🎉 母親節限時優惠！全台第一家引進的最新童顏針，買一送一只到本週日！

我們是全台最有效的醫美診所，韓星指定、明星愛用！打過的客人都說立即見效、永久維持，零副作用、無痛、安全有保證！

【限時破盤】原價 30000，現省 50%！只要 14999！前 5 名再加碼贈送美白針療程一次！

加 LINE 享免費諮詢＋送外泌體面膜！週年慶最後倒數 3 天，現在私訊報價！

#醫美 #童顏針 #台北醫美 #母親節優惠`;
      state.text = els.inputText.value;
      els.charCount.textContent = `${state.text.length} 字`;
      els.btnCheck.click();
    });
  }

  // ===== Copy rewrite =====
  els.btnCopyRewrite.addEventListener('click', () => {
    navigator.clipboard.writeText(els.rewritePreview.textContent).then(() => {
      els.btnCopyRewrite.textContent = '✓ 已複製';
      setTimeout(() => { els.btnCopyRewrite.textContent = '📋 複製重寫版'; }, 2000);
    });
  });

})();
