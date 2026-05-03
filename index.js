// src/index.js
// 두피부 인스타그램 캐러셀 자동 생성기 — 메인 진입점
// 실행: node src/index.js
// 테스트: node src/index.js --dry-run

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { getCurrentSolarTerm, getNextSolarTerm } = require("./solar-terms");
const { generateCarouselContent } = require("./content-generator");
const { buildFigmaPluginCode } = require("./figma-builder");

// ─── 실행 횟수 판별 (월=1, 수=2) ───
function getRunCount(date) {
  const day = date.getDay(); // 0:일 1:월 2:화 3:수 ...
  return day === 3 ? 2 : 1;  // 수요일이면 2번째 실행
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");
  const today = new Date();

  console.log("═══════════════════════════════════════");
  console.log("  🌿 두피부 캐러셀 자동 생성기 시작");
  console.log("═══════════════════════════════════════");
  console.log(`📅 실행 날짜: ${today.toLocaleDateString("ko-KR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`);
  if (isDryRun) console.log("🧪 DRY-RUN 모드: 피그마에 실제 생성하지 않음\n");

  // ── 1. 절기 계산 ──
  const solarTerm = getCurrentSolarTerm(today);
  const nextTerm = getNextSolarTerm(today);
  const runCount = getRunCount(today);

  console.log(`🌿 현재 절기: ${solarTerm.name} (${solarTerm.season})`);
  console.log(`⏭️  다음 절기: ${nextTerm.name} (${nextTerm.month}월 ${nextTerm.day}일)`);
  console.log(`🔢 이번 주 실행 순서: ${runCount}번째 (${runCount === 1 ? "월요일" : "수요일"})`);
  console.log(`📌 케어 테마: ${solarTerm.theme}\n`);

  // ── 2. Claude AI 콘텐츠 생성 ──
  console.log("🤖 Claude AI로 콘텐츠 생성 중...");
  let content;
  try {
    content = await generateCarouselContent(solarTerm, today, runCount);
    console.log(`✅ 콘텐츠 생성 완료: "${content.slideTitle}"\n`);
  } catch (err) {
    console.error(`❌ 콘텐츠 생성 실패: ${err.message}`);
    process.exit(1);
  }

  // ── 3. 피그마 Plugin API 코드 생성 ──
  console.log("🎨 피그마 코드 생성 중...");
  const figmaCode = buildFigmaPluginCode(content, solarTerm, today, runCount);
  console.log(`✅ 피그마 코드 생성 완료 (${figmaCode.length.toLocaleString()} 문자)\n`);

  // ── 4. 결과 저장 ──
  const outputDir = path.join(__dirname, "..", "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const dateStamp = today.toISOString().split("T")[0];
  const runLabel = runCount === 1 ? "mon" : "wed";

  // 생성된 콘텐츠 JSON 저장
  const contentPath = path.join(outputDir, `${dateStamp}_${runLabel}_content.json`);
  fs.writeFileSync(contentPath, JSON.stringify({ meta: { date: today.toISOString(), solarTerm, runCount }, content }, null, 2), "utf8");
  console.log(`💾 콘텐츠 저장: ${contentPath}`);

  // 피그마 코드 저장 (디버깅·수동 실행용)
  const codePath = path.join(outputDir, `${dateStamp}_${runLabel}_figma_code.js`);
  fs.writeFileSync(codePath, figmaCode, "utf8");
  console.log(`💾 피그마 코드 저장: ${codePath}`);

  // ── 5. 피그마 실행 (DRY-RUN이 아닐 때만) ──
  if (!isDryRun && process.env.FIGMA_TOKEN && process.env.FIGMA_FILE_KEY) {
    console.log("\n🎨 피그마에 캐러셀 생성 중...");
    try {
      const { runCodeInFigma } = require("./figma-builder");
      await runCodeInFigma(figmaCode);
      console.log("✅ 피그마 캐러셀 생성 완료!");
      console.log(`🔗 https://www.figma.com/design/${process.env.FIGMA_FILE_KEY}/`);
    } catch (err) {
      console.error(`❌ 피그마 생성 실패: ${err.message}`);
      console.log("💡 output/ 폴더의 _figma_code.js 파일을 피그마에서 수동으로 실행할 수 있습니다.");
      process.exit(1);
    }
  } else if (isDryRun) {
    console.log("\n✅ DRY-RUN 완료! output/ 폴더를 확인하세요.");
    console.log("📋 생성된 콘텐츠 미리보기:\n");
    console.log(`   제목: ${content.slideTitle}`);
    console.log(`   커버: ${content.cover.hookCopy}`);
    console.log(`   슬라이드 수: ${content.slides.length + 2}장 (커버 + ${content.slides.length}장 + CTA)`);
    console.log(`   CTA: ${content.cta.mainCopy}`);
    console.log(`   해시태그: ${content.cta.hashtags}`);
  } else {
    console.log("\n⚠️ FIGMA_TOKEN 또는 FIGMA_FILE_KEY 환경변수가 없습니다.");
    console.log("   .env 파일을 확인하거나 GitHub Secrets를 설정해주세요.");
  }

  console.log("\n═══════════════════════════════════════");
  console.log("  ✅ 두피부 캐러셀 자동 생성 완료!");
  console.log("═══════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("❌ 치명적 오류:", err);
  process.exit(1);
});
