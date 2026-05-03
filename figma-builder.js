// src/figma-builder.js
// Figma Plugin API 코드를 생성하여 피그마 파일에 캐러셀 슬라이드를 자동으로 만듭니다.
// GitHub Actions에서 @figma/plugin-typings 없이 동작하는 REST 방식입니다.

const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

// ─────────────────────────────────────────
// 피그마 Plugin API 코드를 문자열로 생성
// (use_figma 도구에 전달할 코드와 동일한 구조)
// ─────────────────────────────────────────
function buildFigmaPluginCode(content, solarTerm, date, runCount) {
  const dateLabel = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const runLabel = runCount === 1 ? "월요일" : "수요일";

  // JSON을 안전하게 인라인으로 삽입
  const contentJson = JSON.stringify(content);
  const solarTermJson = JSON.stringify(solarTerm);

  return `
// ====================================================
// 두피부 자동 캐러셀 생성기
// 날짜: ${dateLabel} (${runLabel})  |  절기: ${solarTerm.name}
// ====================================================

const CONTENT = ${contentJson};
const SOLAR = ${solarTermJson};

const PAGE_W = 1080;
const PAGE_H = 1080;
const GAP = 60;

// ─── 색상 ───
const C = {
  deepGreen:  { r: 0.133, g: 0.239, b: 0.192 },
  midGreen:   { r: 0.204, g: 0.361, b: 0.29 },
  lightGreen: { r: 0.776, g: 0.851, b: 0.808 },
  creamWhite: { r: 0.976, g: 0.965, b: 0.941 },
  gold:       { r: 0.796, g: 0.671, b: 0.467 },
  warmGray:   { r: 0.878, g: 0.863, b: 0.839 },
  charcoal:   { r: 0.157, g: 0.157, b: 0.157 },
  white:      { r: 1, g: 1, b: 1 },
  accent:     SOLAR.accentColor,
  bg:         SOLAR.bgColor,
};

// ─── 폰트 로드 ───
await figma.loadFontAsync({ family: "Noto Sans KR", style: "Regular" });
await figma.loadFontAsync({ family: "Noto Sans KR", style: "Medium" });
await figma.loadFontAsync({ family: "Noto Sans KR", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });

// ─── 유틸 함수 ───
function makeRect(x, y, w, h, color, opacity = 1, radius = 0) {
  const n = figma.createRectangle();
  n.x = x; n.y = y; n.resize(w, h);
  n.fills = [{ type: 'SOLID', color, opacity }];
  if (radius) n.cornerRadius = radius;
  return n;
}

function makeText(str, x, y, size, color, weight = "Regular", align = "LEFT") {
  const n = figma.createText();
  n.fontName = { family: "Noto Sans KR", style: weight };
  n.characters = String(str);
  n.fontSize = size;
  n.fills = [{ type: 'SOLID', color }];
  n.x = x; n.y = y;
  n.textAlignHorizontal = align;
  return n;
}

function makeTag(label, x, y, bg, fg) {
  const fr = figma.createFrame();
  fr.fills = [{ type: 'SOLID', color: bg }];
  fr.cornerRadius = 6;
  const t = figma.createText();
  t.fontName = { family: "Inter", style: "Bold" };
  t.characters = label;
  t.fontSize = 17;
  t.fills = [{ type: 'SOLID', color: fg }];
  t.x = 16; t.y = 10;
  fr.appendChild(t);
  fr.resize(t.width + 32, t.height + 20);
  fr.x = x; fr.y = y;
  return fr;
}

function makeLine(x, y, w, color) {
  const n = figma.createLine();
  n.x = x; n.y = y; n.resize(w, 0);
  n.strokes = [{ type: 'SOLID', color }];
  n.strokeWeight = 1.5;
  return n;
}

function makeCircle(cx, cy, r, color, opacity = 1) {
  const n = figma.createEllipse();
  n.resize(r * 2, r * 2);
  n.x = cx - r; n.y = cy - r;
  n.fills = [{ type: 'SOLID', color, opacity }];
  return n;
}

function addAll(frame, nodes) {
  for (const n of nodes) frame.appendChild(n);
}

// 새 페이지 추가
const pageName = "${dateLabel} | ${solarTerm.name} | ${runLabel} 캐러셀";
const newPage = figma.createPage();
newPage.name = pageName;
await figma.setCurrentPageAsync(newPage);
const page = figma.currentPage;

const frames = [];

// ════════════════════════════════
// SLIDE 01 — 커버
// ════════════════════════════════
{
  const f = figma.createFrame();
  f.name = "01 커버";
  f.resize(PAGE_W, PAGE_H); f.x = 0; f.y = 0;
  f.fills = [{ type: 'SOLID', color: C.deepGreen }];

  addAll(f, [
    makeCircle(PAGE_W * 0.85, PAGE_H * 0.18, 290, C.midGreen, 0.55),
    makeCircle(PAGE_W * 0.08, PAGE_H * 0.80, 200, C.midGreen, 0.35),
    makeCircle(PAGE_W * 0.5, PAGE_H * 0.5, 400, C.white, 0.025),
    makeLine(72, 108, PAGE_W - 144, C.gold),
    makeTag("DOOPEEBU · " + SOLAR.name.toUpperCase(), 72, 128, C.gold, C.deepGreen),
    makeText(CONTENT.cover.hookCopy, 72, 240, 96, C.creamWhite, "Bold"),
    makeText(CONTENT.cover.subCopy, 72, 370, 34, C.lightGreen, "Regular"),
    makeLine(72, 450, 200, C.gold),
    makeText(SOLAR.name + " 절기 두피케어", 72, 476, 28, C.gold, "Medium"),
    makeText("${dateLabel}", 72, 540, 24, C.lightGreen, "Regular"),
    makeText("SWIPE →", PAGE_W - 72 - 140, PAGE_H - 120, 20, C.gold, "Regular"),
    makeLine(72, PAGE_H - 92, PAGE_W - 144, C.gold),
    makeText("01 / 07", PAGE_W - 72 - 80, PAGE_H - 68, 20, C.lightGreen, "Regular"),
  ]);
  page.appendChild(f);
  frames.push(f);
}

// ════════════════════════════════
// SLIDE 02~06 — 콘텐츠 슬라이드
// ════════════════════════════════
const ICON_SYMBOLS = ["◆", "◇", "●"];

for (let i = 0; i < CONTENT.slides.length; i++) {
  const s = CONTENT.slides[i];
  const idx = i + 1;
  const f = figma.createFrame();
  f.name = s.slideNum + " " + s.title;
  f.resize(PAGE_W, PAGE_H);
  f.x = (PAGE_W + GAP) * idx; f.y = 0;
  f.fills = [{ type: 'SOLID', color: C.bg }];

  // 상단 컬러 배너
  const banner = makeRect(0, 0, PAGE_W, 200, C.accent);
  f.appendChild(banner);
  addAll(f, [
    makeCircle(PAGE_W - 90, 100, 170, C.white, 0.07),
    makeTag(SOLAR.seasonEn + " · " + SOLAR.name, 72, 54, C.white, C.accent),
    makeText(s.title, 72, 102, 56, C.white, "Bold"),
    makeText(s.slideNum + " / 07", PAGE_W - 72 - 80, 148, 20, C.white, "Regular"),
    makeLine(72, 228, 100, C.accent),
    makeText(s.sectionLabel, 72, 252, 26, C.accent, "Bold"),
  ]);

  // 포인트 목록
  let ty = 310;
  for (let j = 0; j < s.points.length; j++) {
    const numBg = makeRect(72, ty, 36, 36, C.accent, 1, 18);
    f.appendChild(numBg);
    const numT = figma.createText();
    numT.fontName = { family: "Inter", style: "Bold" };
    numT.characters = String(j + 1);
    numT.fontSize = 18;
    numT.fills = [{ type: 'SOLID', color: C.white }];
    numT.x = 72 + 10; numT.y = ty + 8;
    f.appendChild(numT);

    const pt = makeText(s.points[j], 122, ty + 6, 28, C.charcoal, "Regular");
    pt.resize(PAGE_W - 122 - 72, pt.height);
    f.appendChild(pt);
    ty += pt.height + 28;
  }

  // 하단 브랜드
  addAll(f, [
    makeLine(72, PAGE_H - 88, PAGE_W - 144, C.warmGray),
    makeText("DOOPEEBU", 72, PAGE_H - 64, 20, C.accent, "Bold"),
    makeText("@doopeebu_official", PAGE_W - 72 - 260, PAGE_H - 64, 20, C.charcoal, "Regular"),
  ]);

  page.appendChild(f);
  frames.push(f);
}

// ════════════════════════════════
// SLIDE 07 — CTA
// ════════════════════════════════
{
  const f = figma.createFrame();
  f.name = "07 CTA";
  f.resize(PAGE_W, PAGE_H);
  f.x = (PAGE_W + GAP) * 6; f.y = 0;
  f.fills = [{ type: 'SOLID', color: C.creamWhite }];

  const topBlock = makeRect(0, 0, PAGE_W, 360, C.deepGreen);
  f.appendChild(topBlock);
  addAll(f, [
    makeCircle(PAGE_W - 80, 180, 260, C.midGreen, 0.5),
    makeCircle(100, 360, 130, C.lightGreen, 0.2),
    makeTag("DOOPEEBU · 지금 시작하세요", 72, 72, C.gold, C.deepGreen),
    makeText(CONTENT.cta.mainCopy, 72, 152, 76, C.creamWhite, "Bold"),
    makeText(CONTENT.cta.subCopy, 72, 268, 30, C.lightGreen, "Regular"),
    makeText(CONTENT.cta.subCopy.length > 0 ? "" : "", 72, 320, 26, C.lightGreen, "Regular"),
    makeRect(72, 400, 520, 88, C.deepGreen, 1, 44),
    makeText(CONTENT.cta.buttonText + "  →", 72 + 56, 400 + 24, 32, C.creamWhite, "Bold"),
    makeText(CONTENT.cta.hashtags, 72, 536, 22, C.midGreen, "Regular"),
    makeLine(72, 640, PAGE_W - 144, C.warmGray),
    makeText("DOOPEEBU  ·  " + SOLAR.theme, 72, 666, 22, C.charcoal, "Regular"),
    makeText("@doopeebu_official  ·  " + "${dateLabel}", 72, 702, 22, C.midGreen, "Medium"),
    makeText("07 / 07", PAGE_W - 72 - 80, PAGE_H - 68, 20, C.charcoal, "Regular"),
  ]);

  page.appendChild(f);
  frames.push(f);
}

// ─── 뷰포트 이동 ───
figma.viewport.scrollAndZoomIntoView(frames);
figma.notify("✅ " + SOLAR.name + " 캐러셀 7장 생성 완료! 🌿", { timeout: 5000 });
"done";
`;
}

// ─────────────────────────────────────────
// REST API로 피그마에 직접 코드 실행 요청
// (실제 자동화 시 사용)
// ─────────────────────────────────────────
async function runCodeInFigma(code) {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/plugins/run`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "X-Figma-Token": FIGMA_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Figma API 오류: ${res.status} — ${err}`);
  }

  return await res.json();
}

module.exports = { buildFigmaPluginCode, runCodeInFigma };
