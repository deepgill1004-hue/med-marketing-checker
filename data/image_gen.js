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

  // ===== 3. 從生成文案中抽重點（給 buildInfoCard 用）=====
  extractPoints(text, max = 5) {
    // 找 1./2./3. 或 「**」 開頭的條列
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const points = [];
    for (const ln of lines) {
      // 數字列表（如 "1. xxx" / "1) xxx"）
      let m = ln.match(/^(\d+)[\.\)、]\s*\*?\*?(.+?)\*?\*?$/);
      if (m) {
        const content = m[2].replace(/[\*【】「」『』]/g, "").trim();
        if (content.length > 4 && content.length < 80) points.push(content);
      }
      // 粗體標題（如 "**xxx**"）
      else if (/^\*\*.+\*\*$/.test(ln)) {
        const content = ln.replace(/\*\*/g, "").trim();
        if (content.length > 4 && content.length < 50) points.push(content);
      }
      if (points.length >= max) break;
    }
    // 若不足，從句子中切（依「。」分句後選 max 個有意義的）
    if (points.length < 3) {
      const sentences = text.replace(/\n/g, " ").split(/[。！？]/)
        .map(s => s.trim()).filter(s => s.length > 12 && s.length < 60);
      for (const s of sentences) {
        if (points.length >= max) break;
        if (!points.includes(s)) points.push(s);
      }
    }
    return points.slice(0, max);
  },

  // ===== 4. 主入口：依文案產 2 張圖 =====
  generatePair({ topic, contentTypeLabel, fullText, brand, themePair }) {
    const tp = themePair || ["warm", "trust"];

    // 取主標題（爆款 Hook 通常是文案第一句）
    const firstLine = (fullText.split("\n").find(l => l.trim()) || topic).trim();
    let coverTitle = firstLine.length > 30 ? topic + "｜知道這幾件事再做" : firstLine;

    // 封面
    const cover = this.buildCover({
      title: coverTitle,
      subtitle: `${topic} · ${contentTypeLabel}`,
      badge: contentTypeLabel,
      brand,
      theme: tp[0],
    });

    // 重點卡
    const points = this.extractPoints(fullText, 5);
    const infoTitle = `${topic}\n重點整理`;
    const infoCard = this.buildInfoCard({
      title: infoTitle,
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
