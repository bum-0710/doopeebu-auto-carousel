// src/content-generator.js
// Claude API를 활용해 절기별 두피케어 캐러셀 콘텐츠를 자동 생성합니다.

const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateCarouselContent(solarTerm, date, runCount = 1) {
  const dateStr = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  // 같은 절기라도 월·수 두 번 실행 → 다른 각도의 콘텐츠 생성
  const angleHint =
    runCount === 1
      ? "첫 번째 게시물: 이 절기의 '두피 증상과 원인' 중심으로 교육적인 콘텐츠"
      : "두 번째 게시물: 이 절기의 '구체적인 케어 방법과 제품 추천' 중심으로 실용적인 콘텐츠";

  const prompt = `당신은 두피케어 전문 브랜드 "두피부(DOOPEEBU)"의 인스타그램 콘텐츠 기획자입니다.
두피부는 자연주의 프리미엄 두피케어 브랜드로, 절기와 계절에 맞는 두피케어 솔루션을 제공합니다.

오늘 날짜: ${dateStr}
현재 절기: ${solarTerm.name} (${solarTerm.season} / 테마: ${solarTerm.theme})
콘텐츠 방향: ${angleHint}

인스타그램 캐러셀 7장 분량의 콘텐츠를 JSON 형식으로 생성해주세요.
반드시 아래 JSON 구조만 출력하고 다른 텍스트, 마크다운 코드블록은 절대 포함하지 마세요.

{
  "slideTitle": "이번 주 캐러셀 대표 제목 (15자 이내, 강렬하게)",
  "cover": {
    "hookCopy": "커버 훅 카피 (12자 이내, 궁금증 유발)",
    "subCopy": "서브카피 (25자 이내, 구체적 상황 묘사)",
    "solarTermLabel": "${solarTerm.name} 두피케어"
  },
  "slides": [
    {
      "slideNum": "02",
      "title": "슬라이드 제목 (15자 이내)",
      "sectionLabel": "이 절기의 두피 고민",
      "points": ["고민 1 (20자 이내)", "고민 2 (20자 이내)", "고민 3 (20자 이내)"]
    },
    {
      "slideNum": "03",
      "title": "슬라이드 제목 (15자 이내)",
      "sectionLabel": "두피부 솔루션",
      "points": ["솔루션 1 (20자 이내)", "솔루션 2 (20자 이내)", "솔루션 3 (20자 이내)"]
    },
    {
      "slideNum": "04",
      "title": "슬라이드 제목 (15자 이내)",
      "sectionLabel": "성분 이야기",
      "points": ["핵심 성분 1과 효능 (25자 이내)", "핵심 성분 2와 효능 (25자 이내)", "핵심 성분 3과 효능 (25자 이내)"]
    },
    {
      "slideNum": "05",
      "title": "슬라이드 제목 (15자 이내)",
      "sectionLabel": "두피부 추천 제품",
      "points": ["추천 제품명 1 + 한줄 설명", "추천 제품명 2 + 한줄 설명", "추천 제품명 3 + 한줄 설명"]
    },
    {
      "slideNum": "06",
      "title": "슬라이드 제목 (15자 이내)",
      "sectionLabel": "오늘의 두피 루틴",
      "points": ["아침 루틴 (20자 이내)", "저녁 루틴 (20자 이내)", "주간 루틴 (20자 이내)"]
    }
  ],
  "cta": {
    "mainCopy": "CTA 메인 문구 (15자 이내)",
    "subCopy": "CTA 서브 문구 (25자 이내)",
    "buttonText": "버튼 텍스트 (8자 이내)",
    "hashtags": "#두피부 #두피케어 #절기에맞는두피케어 및 관련 태그 5~7개"
  }
}

${solarTerm.name} 절기의 두피·헤어 특성을 반영하여 전문적이고 실용적인 내용으로 작성해주세요.`;

  let retries = 3;
  while (retries > 0) {
    try {
      const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      });

      const raw = response.content[0].text.trim();
      // JSON 파싱 시도
      const parsed = JSON.parse(raw);
      console.log(`✅ Claude 콘텐츠 생성 완료: ${parsed.slideTitle}`);
      return parsed;
    } catch (err) {
      retries--;
      if (retries === 0) throw new Error(`콘텐츠 생성 실패: ${err.message}`);
      console.log(`⚠️ 재시도 중... (${3 - retries}/3)`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

module.exports = { generateCarouselContent };
