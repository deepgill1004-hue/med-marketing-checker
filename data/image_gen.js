// Canvas 自動配圖生成器 v0.1
// 純前端、無依賴；每篇文章至少產 2 張：封面大字報 + 資訊重點卡
// 配色取自 OPTIMIZER.visual_rules.cover.color_combos

window.IMAGE_GEN = {
  meta: { version: "0.1" },

  // ===== 4 套配色（暖／冷／黑金／科技）=====
  themes: [
    { id: "warm",   name: "溫柔醫美", bg: "#fdf2f8", bg2: "#fce7f3", primary: "#d4a59a", text: "#3a3a3a", accent: "#ec4899" },
    { id: "trust",  name: "信任專業", bg: "#f5f1ea", bg2: "#e8dfd1", primary: "#1a3a5c", text: "#1a3a5c", accent: "#c9a961" },
    { id: "luxe",   name: "高級感",   bg: "#0a0a0a", bg2: "#2a2418", primary: "#c9a961", text: "#f5f1ea", accent: "#c9a961" },
    { id: "tech",   name: "潔淨科技", bg: "#ffffff", bg2: "#e8f0fc", primary: "#1a3a5c", text: "#1a3a5c", accent: "#5b8def" },
  ],

  // ===== 字型偵測 =====
  fontFamily: '"Noto Sans TC", system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif',

  // ===== 工具：自動斷行 =====
  wrapText(ctx, text, maxWidth) {
    const chars = Array.from(text);
    const lines = [];
    let cur = "";
    for (const ch of chars) {
      const test = cur + ch;
      if (ctx.measureText(test).width > maxWidth && cur) {
        lines.push(cur);
        cur = ch;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  },

  // ===== 1. 封面大字報（1080x1080）=====
  buildCover({ title, subtitle, badge, brand, theme = "warm" }) {
    const t = this.themes.find(x => x.id === theme) || this.themes[0];
    const c = document.createElement("canvas");
    c.width = 1080; c.height = 1080;
    const g = c.getContext("2d");

    // 漸層底
    const grad = g.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, t.bg);
    grad.addColorStop(1, t.bg2);
    g.fillStyle = grad;
    g.fillRect(0, 0, 1080, 1080);

    // 裝飾圓
    g.fillStyle = t.primary + "22";
    g.beginPath(); g.arc(900, 180, 200, 0, Math.PI * 2); g.fill();
    g.fillStyle = t.accent + "1a";
    g.beginPath(); g.arc(150, 950, 250, 0, Math.PI * 2); g.fill();

    // Badge 標籤
    if (badge) {
      g.font = `600 28px ${this.fontFamily}`;
      const bw = g.measureText(badge).width + 48;
      g.fillStyle = t.accent;
      this.roundRect(g, 90, 130, bw, 56, 28);
      g.fill();
      g.fillStyle = "#fff";
      g.textBaseline = "middle";
      g.fillText(badge, 114, 158);
    }

    // 主標題（大字、自動斷行）
    g.fillStyle = t.text;
    let mainSize = 88;
    g.font = `900 ${mainSize}px ${this.fontFamily}`;
    let lines = this.wrapText(g, title, 900);
    while (lines.length > 3 && mainSize > 56) {
      mainSize -= 8;
      g.font = `900 ${mainSize}px ${this.fontFamily}`;
      lines = this.wrapText(g, title, 900);
    }
    const lineGap = mainSize * 1.25;
    const startY = 540 - (lines.length - 1) * lineGap / 2;
    g.textBaseline = "middle";
    lines.forEach((ln, i) => g.fillText(ln, 90, startY + i * lineGap));

    // 副標
    if (subtitle) {
      g.fillStyle = t.text + "cc";
      g.font = `500 34px ${this.fontFamily}`;
      const subLines = this.wrapText(g, subtitle, 900);
      subLines.slice(0, 2).forEach((ln, i) => g.fillText(ln, 90, 820 + i * 48));
    }

    // 品牌標
    g.fillStyle = t.primary;
    g.font = `700 28px ${this.fontFamily}`;
    g.fillText(brand || "蘇菲 IP", 90, 990);

    return c.toDataURL("image/png");
  },

  // ===== 2. 重點資訊卡（1080x1350）=====
  buildInfoCard({ title, points, brand, theme = "trust" }) {
    const t = this.themes.find(x => x.id === theme) || this.themes[1];
    const c = document.createElement("canvas");
    c.width = 1080; c.height = 1350;
    const g = c.getContext("2d");

    // 底
    g.fillStyle = t.bg;
    g.fillRect(0, 0, 1080, 1350);

    // 上方色塊
    g.fillStyle = t.primary;
    g.fillRect(0, 0, 1080, 280);

    // 標題
    g.fillStyle = "#fff";
    g.font = `800 56px ${this.fontFamily}`;
    const titleLines = this.wrapText(g, title, 900);
    g.textBaseline = "middle";
    titleLines.slice(0, 2).forEach((ln, i) =>
      g.fillText(ln, 90, 110 + i * 70));

    // 重點條列
    let y = 360;
    const maxItems = Math.min(points.length, 5);
    const itemHeight = (1350 - 360 - 120) / Math.max(maxItems, 1);

    for (let i = 0; i < maxItems; i++) {
      const p = points[i];

      // 數字徽章
      g.fillStyle = t.accent;
      g.beginPath();
      g.arc(140, y + 32, 36, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "#fff";
      g.font = `900 36px ${this.fontFamily}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(String(i + 1), 140, y + 32);
      g.textAlign = "left";

      // 內容
      g.fillStyle = t.text;
      g.font = `600 36px ${this.fontFamily}`;
      const lines = this.wrapText(g, p, 800);
      lines.slice(0, 3).forEach((ln, j) =>
        g.fillText(ln, 210, y + 18 + j * 46));

      y += itemHeight;
    }

    // 品牌
    g.fillStyle = t.primary;
    g.font = `700 28px ${this.fontFamily}`;
    g.fillText(brand || "蘇菲 IP", 90, 1290);

    return c.toDataURL("image/png");
  },

  // ===== 排除非標題的噪音句子（內心獨白／前言／系統訊息）=====
  isNoiseLine(s) {
    if (!s) return true;
    const noise = [
      /^(資料齊了|資料已經|資料整理|資料完整|資料準備好)/,
      /^(以下為|以下是|以下提供|以下內容|這就是|這份)/,
      /^(我幫(您|你|妳)|我來幫|讓我來|為您|為你|為妳|我來|現在來|我會|讓我)/,
      /^(最終文案|文案如下|文案內容|生成的文案|完整文案|文案結尾)/,
      /^(根據(您|你|妳)的|根據主題|依據|依照|按照)/,
      /^(好的|沒問題|了解|收到|當然|是的)/,
      /^(這是一篇|這篇文案|這則文案|這篇貼文|這則貼文)/,
      /^(?:===|---|\*\*\*|———|━━━)/,
      /(開始生成|準備生成|現在開始|讓我們開始|完成了)/,
    ];
    return noise.some(re => re.test(s.trim()));
  },

  // ===== 智能封面標題抽取（排除噪音，找最有力的 Hook）=====
  smartExtractTitle(text, topic) {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    for (const ln of lines) {
      if (this.isNoiseLine(ln)) continue;
      // 去掉 emoji 前綴與 markdown
      let clean = ln
        .replace(/^[☀-➿\u{1F300}-\u{1FAFF}️]+\s*/u, "")
        .replace(/\*\*/g, "")
        .replace(/^[\-—\*•▶▌#]+\s*/, "")
        .trim();
      if (clean.length >= 6 && clean.length <= 40) return clean;
      if (clean.length > 40) {
        const cut = clean.split(/[，,。:：；;！!？?]/)[0];
        if (cut.length >= 6 && cut.length <= 40) return cut;
      }
    }
    return `${topic}｜值得知道的幾件事`;
  },

  // ===== 3. 從生成文案中抽重點（多格式 fallback）=====
  extractPoints(text, max = 5) {
    const points = [];
    const paragraphs = text.split(/\n\s*\n/);

    // (a) 合併「標題行+內容行」格式（如 Day 1\n腫脹瘀青）
    for (const para of paragraphs) {
      const lines = para.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length === 2) {
        const head = lines[0].replace(/^[\*【「『]+|[\*】」』]+$/g, "");
        const body = lines[1].replace(/^[\*【「『]+|[\*】」』]+$/g, "");
        if (head.length < 20 && body.length > 6 && body.length < 80 &&
            !this.isNoiseLine(head) && !this.isNoiseLine(body)) {
          points.push(`${head}：${body}`);
          if (points.length >= max) return points;
        }
      }
    }

    // (b) 單行條列：1./Day N/emoji/**粗體**/Q1
    if (points.length < max) {
      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
      for (const ln of lines) {
        if (this.isNoiseLine(ln)) continue;
        let content = null;
        let m = ln.match(/^(\d+)[\.\)、]\s*\*?\*?(.+?)\*?\*?$/);
        if (m) content = m[2];
        if (!content) {
          m = ln.match(/^(Day\s*\d+[-\d+]*)[\s::\-—]+(.+)$/i);
          if (m) content = `${m[1]}：${m[2]}`;
        }
        if (!content && /^\*\*.+\*\*$/.test(ln)) {
          content = ln.replace(/\*\*/g, "");
        }
        if (!content) {
          m = ln.match(/^Q\d+[\s::\-—]+(.+)$/i);
          if (m) content = m[1];
        }
        if (content) {
          content = content.replace(/[\*【】「」『』]/g, "").trim();
          if (content.length > 4 && content.length < 80 &&
              !points.some(p => p.includes(content))) {
            points.push(content);
            if (points.length >= max) break;
          }
        }
      }
    }

    // (c) 仍不足：抓實質完整句
    if (points.length < 3) {
      const sentences = text.replace(/\n/g, " ").split(/[。！？]/)
        .map(s => s.trim())
        .filter(s => s.length > 12 && s.length < 60 && !this.isNoiseLine(s));
      for (const s of sentences) {
        if (points.length >= max) break;
        if (!points.some(p => p.includes(s) || s.includes(p))) points.push(s);
      }
    }
    return points.slice(0, max);
  },

  // ===== 4. 主入口：優先用 AI 結構化 imagedata，沒有才 fallback =====
  generatePair({ topic, contentTypeLabel, fullText, brand, themePair, imagedata }) {
    const tp = themePair || ["warm", "trust"];

    let coverTitle, coverSubtitle, points;
    if (imagedata && imagedata.title) {
      // 優先用 AI 結構化資料
      coverTitle = imagedata.title;
      coverSubtitle = imagedata.subtitle || `${topic} · ${contentTypeLabel}`;
      points = Array.isArray(imagedata.points)
        ? imagedata.points.filter(p => p && String(p).length > 4)
        : [];
    } else {
      // Fallback：智能抽取
      coverTitle = this.smartExtractTitle(fullText, topic);
      coverSubtitle = `${topic} · ${contentTypeLabel}`;
      points = this.extractPoints(fullText, 5);
    }

    const cover = this.buildCover({
      title: coverTitle,
      subtitle: coverSubtitle,
      badge: contentTypeLabel,
      brand,
      theme: tp[0],
    });

    const infoCard = this.buildInfoCard({
      title: `${topic}\n重點整理`,
      points: points.length >= 3 ? points : [
        `${topic} 不是每個人都適合`,
        `效果與恢復期因人而異`,
        `諮詢時記得問醫師個別評估`,
        `術後追蹤跟術前評估一樣重要`,
        `挑醫師看的是專業判斷不是名氣`,
      ],
      brand,
      theme: tp[1],
    });

    return [
      { kind: "cover", url: cover, filename: `${topic}_封面.png` },
      { kind: "info",  url: infoCard, filename: `${topic}_重點卡.png` },
    ];
  },

  // ===== Utility: 圓角矩形 =====
  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  },
};
