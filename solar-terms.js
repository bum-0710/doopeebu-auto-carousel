// src/solar-terms.js
// 24절기 기반 두피케어 테마 매핑
// 날짜로 현재 절기 및 다음 절기를 자동 판별합니다.

const SOLAR_TERMS = [
  {
    name: "소한", month: 1, day: 6,
    season: "겨울", seasonEn: "WINTER",
    theme: "혹한기 두피 보습 집중 케어",
    bgColor: { r: 0.937, g: 0.945, b: 0.965 },
    accentColor: { r: 0.365, g: 0.435, b: 0.698 },
    symptoms: ["극심한 추위로 두피 모세혈관 수축", "건성 두피·심한 각질 악화", "정전기로 인한 모발 손상"],
    tips: ["두피 전용 핫 오일 마사지 (주 3회)", "미지근한 물 세정 + 고보습 샴푸", "린스 후 헤어 오일 한 방울로 모발 코팅"],
    product: "딥 윈터 모이스처 오일"
  },
  {
    name: "대한", month: 1, day: 20,
    season: "겨울", seasonEn: "WINTER",
    theme: "일 년 중 가장 건조한 두피 케어",
    bgColor: { r: 0.937, g: 0.945, b: 0.965 },
    accentColor: { r: 0.365, g: 0.435, b: 0.698 },
    symptoms: ["두피 수분량 연중 최저 시기", "가려움·비듬 극심 악화", "모발 끝 갈라짐·탈색"],
    tips: ["주 1회 두피 보습 팩 (20분 방치)", "가습기로 실내 습도 50~60% 유지", "두피 앰플 + 세럼 이중 보습 루틴"],
    product: "대한 집중 보습 세럼"
  },
  {
    name: "입춘", month: 2, day: 4,
    season: "봄", seasonEn: "SPRING",
    theme: "겨울에서 봄으로 — 두피 환절기 준비",
    bgColor: { r: 0.949, g: 0.965, b: 0.929 },
    accentColor: { r: 0.478, g: 0.647, b: 0.435 },
    symptoms: ["건조 → 피지 과잉 전환 혼합성 두피", "두피 pH 불균형으로 트러블 시작", "봄맞이 탈모 증가 예고"],
    tips: ["피지 조절 + 보습 균형 샴푸로 교체", "두피 pH 밸런싱 토닉 도입", "모근 강화 영양제 복용 시작"],
    product: "입춘 밸런싱 토닉"
  },
  {
    name: "우수", month: 2, day: 19,
    season: "봄", seasonEn: "SPRING",
    theme: "봄비 습도 — 두피 수분 밸런싱 루틴",
    bgColor: { r: 0.949, g: 0.965, b: 0.929 },
    accentColor: { r: 0.478, g: 0.647, b: 0.435 },
    symptoms: ["습도 변화로 두피 피지 불균형", "두피 냄새 증가 시작", "축축한 두피로 세균 번식 주의"],
    tips: ["순한 클렌징 샴푸로 매일 세정", "드라이 후 두피 에센스 즉시 도포", "항균 성분(티트리) 토닉으로 두피 청결 유지"],
    product: "우수 클렌징 에센스"
  },
  {
    name: "경칩", month: 3, day: 6,
    season: "봄", seasonEn: "SPRING",
    theme: "겨울잠에서 깨어난 두피 — 피지 조절",
    bgColor: { r: 0.949, g: 0.965, b: 0.929 },
    accentColor: { r: 0.478, g: 0.647, b: 0.435 },
    symptoms: ["피지 분비 급증으로 번들거리는 두피", "모공 막힘으로 두피 트러블", "가려움·각질 지속"],
    tips: ["살리실산 성분 딥클렌징 샴푸 주 2회", "두피 스케일링으로 묵은 각질 제거", "오일프리 두피 세럼으로 유수분 조절"],
    product: "경칩 딥클렌즈 스케일러"
  },
  {
    name: "춘분", month: 3, day: 21,
    season: "봄", seasonEn: "SPRING",
    theme: "봄 탈모 시즌 — 모근 집중 강화",
    bgColor: { r: 0.949, g: 0.965, b: 0.929 },
    accentColor: { r: 0.478, g: 0.647, b: 0.435 },
    symptoms: ["봄 환절기 탈모 급증 (1·2위 계절)", "호르몬 변화로 모발 주기 혼란", "두피 혈액순환 저하"],
    tips: ["두피 마사지 5분/일로 혈액순환 촉진", "비오틴·판테놀 성분 앰플 집중 케어", "단백질 풍부한 식단 + 철분 섭취"],
    product: "춘분 헤어폴 앰플"
  },
  {
    name: "청명", month: 4, day: 5,
    season: "봄", seasonEn: "SPRING",
    theme: "미세먼지 최악 시즌 — 두피 세정 루틴",
    bgColor: { r: 0.949, g: 0.965, b: 0.929 },
    accentColor: { r: 0.478, g: 0.647, b: 0.435 },
    symptoms: ["황사·미세먼지로 두피 오염 극심", "먼지 쌓인 모공으로 두피 트러블", "꽃가루 알레르기성 두피 반응"],
    tips: ["외출 후 반드시 당일 세정 필수", "두피 전용 클렌징 브러시 활용", "항산화 성분(비타민C) 두피 토닉 사용"],
    product: "청명 안티폴루션 샴푸"
  },
  {
    name: "곡우", month: 4, day: 20,
    season: "봄", seasonEn: "SPRING",
    theme: "봄비 속 두피 영양 공급 골든타임",
    bgColor: { r: 0.949, g: 0.965, b: 0.929 },
    accentColor: { r: 0.478, g: 0.647, b: 0.435 },
    symptoms: ["봄 탈모 마무리 — 영양 회복 필요", "두피 세정 과다로 인한 장벽 손상", "모발 볼륨·탄력 저하"],
    tips: ["영양 샴푸 + 두피 팩 콤비 케어", "단백질 트리트먼트로 모발 강화", "두피 오일 마사지로 영양 흡수 극대화"],
    product: "곡우 뉴트리션 팩"
  },
  {
    name: "입하", month: 5, day: 6,
    season: "여름", seasonEn: "SUMMER",
    theme: "여름 두피 케어 — 쿨링 루틴 시작",
    bgColor: { r: 0.929, g: 0.953, b: 0.965 },
    accentColor: { r: 0.22, g: 0.545, b: 0.714 },
    symptoms: ["기온 상승으로 두피 열감 증가", "땀 분비 증가로 두피 냄새 시작", "피지 과잉으로 모공 막힘"],
    tips: ["쿨링 멘톨 샴푸로 두피 열감 진정", "세정 후 두피 쿨링 미스트 즉시 분사", "가벼운 워터 베이스 두피 에센스 사용"],
    product: "입하 쿨링 미스트 토닉"
  },
  {
    name: "소만", month: 5, day: 21,
    season: "여름", seasonEn: "SUMMER",
    theme: "땀·피지 이중 관리 — 여름 두피 루틴",
    bgColor: { r: 0.929, g: 0.953, b: 0.965 },
    accentColor: { r: 0.22, g: 0.545, b: 0.714 },
    symptoms: ["과도한 피지·땀으로 두피 악취", "잦은 세정으로 두피 장벽 손상 위험", "두피 뾰루지·모낭염 주의"],
    tips: ["두피 전용 드라이 샴푸로 세정 횟수 조절", "항균 성분 두피 토닉으로 위생 관리", "세정 후 즉시 완전 건조 필수"],
    product: "소만 안티박테리아 토닉"
  },
  {
    name: "망종", month: 6, day: 6,
    season: "여름", seasonEn: "SUMMER",
    theme: "두피 UV 차단 — 여름 햇살로부터 보호",
    bgColor: { r: 0.929, g: 0.953, b: 0.965 },
    accentColor: { r: 0.22, g: 0.545, b: 0.714 },
    symptoms: ["직사광선에 의한 두피 화상 위험", "UV로 인한 모발 색소 손상·탈색", "두피 광노화 시작"],
    tips: ["외출 시 두피 전용 SPF50+ 차단제 사용", "모자·양산 착용으로 물리적 차단 병행", "항산화 두피 세럼으로 UV 후 진정"],
    product: "망종 두피 UV 프로텍터"
  },
  {
    name: "하지", month: 6, day: 21,
    season: "여름", seasonEn: "SUMMER",
    theme: "연중 최고 열감 — 두피 열 진정 케어",
    bgColor: { r: 0.929, g: 0.953, b: 0.965 },
    accentColor: { r: 0.22, g: 0.545, b: 0.714 },
    symptoms: ["두피 체온 과열로 모근 약화", "땀·피지 분비 연중 최고조", "두피 홍조·열감·따가움"],
    tips: ["차가운 물로 마지막 헹굼 (쿨 린스)", "쿨링 두피 팩 주 2회로 열감 제거", "두피 열 낮추는 박하·캐모마일 성분 제품"],
    product: "하지 쿨링 두피 팩"
  },
  {
    name: "소서", month: 7, day: 7,
    season: "여름", seasonEn: "SUMMER",
    theme: "장마철 두피 — 습도와의 전쟁",
    bgColor: { r: 0.929, g: 0.953, b: 0.965 },
    accentColor: { r: 0.22, g: 0.545, b: 0.714 },
    symptoms: ["장마 고습도로 두피 세균·곰팡이 번식", "두피 냄새 최악 시기", "습진성 두피 트러블 증가"],
    tips: ["항균·항진균 성분 샴푸로 교체", "세정 후 드라이어로 두피 완전 건조", "두피 각질 제거 스크럽 주 1회"],
    product: "소서 안티펑거스 샴푸"
  },
  {
    name: "대서", month: 7, day: 23,
    season: "여름", seasonEn: "SUMMER",
    theme: "폭염 두피 탈모 주의 — 여름 탈모 케어",
    bgColor: { r: 0.929, g: 0.953, b: 0.965 },
    accentColor: { r: 0.22, g: 0.545, b: 0.714 },
    symptoms: ["폭염 스트레스로 인한 여름 탈모", "두피 과열로 모근 세포 손상", "잦은 실내외 온도차로 두피 혈액순환 저하"],
    tips: ["탈모 케어 앰플 + 두피 마사지 병행", "수분 섭취 하루 2L 이상 유지", "두피 전용 영양 에센스 세정 후 도포"],
    product: "대서 여름 탈모케어 앰플"
  },
  {
    name: "입추", month: 8, day: 7,
    season: "가을", seasonEn: "AUTUMN",
    theme: "가을 탈모 시즌 알림 — 지금 준비하세요",
    bgColor: { r: 0.976, g: 0.953, b: 0.929 },
    accentColor: { r: 0.784, g: 0.435, b: 0.216 },
    symptoms: ["여름 손상 누적으로 가을 탈모 예고", "두피 피지·수분 균형 급격한 변화", "모발 탄력 저하·부러짐 증가"],
    tips: ["여름 케어에서 가을 케어로 제품 전환", "탈모 예방 영양제(비오틴·아연) 시작", "두피 마사지 루틴 강화"],
    product: "입추 트랜지션 케어 세트"
  },
  {
    name: "처서", month: 8, day: 23,
    season: "가을", seasonEn: "AUTUMN",
    theme: "여름 손상 두피 회복 — 집중 재생 루틴",
    bgColor: { r: 0.976, g: 0.953, b: 0.929 },
    accentColor: { r: 0.784, g: 0.435, b: 0.216 },
    symptoms: ["여름 UV·열 손상으로 두피 약화", "모발 건조·푸석푸석 심화", "두피 민감도 증가"],
    tips: ["두피 재생 앰플로 손상 케어 집중 시작", "저자극 순한 샴푸로 전환", "단백질 트리트먼트 주 2회"],
    product: "처서 리페어 재생 앰플"
  },
  {
    name: "백로", month: 9, day: 8,
    season: "가을", seasonEn: "AUTUMN",
    theme: "모근 강화 골든타임 — 가을 탈모 방어",
    bgColor: { r: 0.976, g: 0.953, b: 0.929 },
    accentColor: { r: 0.784, g: 0.435, b: 0.216 },
    symptoms: ["가을 탈모 본격 시작", "환절기 호르몬 변화로 모발 주기 혼란", "두피 혈액순환 저하로 모근 영양 부족"],
    tips: ["두피 마사지 5분/일 — 모근 혈액순환 촉진", "탈모 방지 샴푸 + 두피 토닉 듀얼 케어", "두피 영양 앰플 매일 도포"],
    product: "백로 헤어폴 방어 토닉"
  },
  {
    name: "추분", month: 9, day: 23,
    season: "가을", seasonEn: "AUTUMN",
    theme: "영양 집중 공급 — 두피 황금 케어 시즌",
    bgColor: { r: 0.976, g: 0.953, b: 0.929 },
    accentColor: { r: 0.784, g: 0.435, b: 0.216 },
    symptoms: ["탈모 최고조 — 빗에 모발 많이 빠짐", "두피 건조 시작으로 각질 재등장", "모발 윤기 저하·칙칙해짐"],
    tips: ["영양 집중 두피 팩 주 2회", "철분·비오틴·판토텐산 영양제 복용", "오메가3 섭취로 두피 유수분 조절"],
    product: "추분 뉴트리션 두피 팩"
  },
  {
    name: "한로", month: 10, day: 8,
    season: "가을", seasonEn: "AUTUMN",
    theme: "겨울 케어 전환 준비 — 두피 보습 스타트",
    bgColor: { r: 0.976, g: 0.953, b: 0.929 },
    accentColor: { r: 0.784, g: 0.435, b: 0.216 },
    symptoms: ["기온 하강으로 두피 수분 급감 시작", "건조한 공기로 두피 당김·가려움", "모발 정전기 시작"],
    tips: ["보습 샴푸로 교체 시작", "두피 오일 에센스 도입으로 유분 보충", "헤어 미스트로 모발 수분 유지"],
    product: "한로 보습 트랜지션 오일"
  },
  {
    name: "상강", month: 10, day: 23,
    season: "가을", seasonEn: "AUTUMN",
    theme: "겨울 전 마지막 점검 — 두피 완전 케어",
    bgColor: { r: 0.976, g: 0.953, b: 0.929 },
    accentColor: { r: 0.784, g: 0.435, b: 0.216 },
    symptoms: ["서리 내리는 건조한 공기 속 두피 수분 손실", "비듬 재등장 주의 시기", "모발 끝 건조·갈라짐"],
    tips: ["두피 보습 마스크 주 2회 집중 케어", "비듬 방지 성분(피록톤 올아민) 샴푸 도입", "모발 끝 집중 오일 트리트먼트"],
    product: "상강 안티댄드러프 세트"
  },
  {
    name: "입동", month: 11, day: 7,
    season: "겨울", seasonEn: "WINTER",
    theme: "겨울 시작 — 두피 보온 케어 루틴",
    bgColor: { r: 0.937, g: 0.945, b: 0.965 },
    accentColor: { r: 0.365, g: 0.435, b: 0.698 },
    symptoms: ["급격한 기온 하강으로 두피 혈액순환 저하", "난방으로 실내 건조 — 두피 수분 손실 가속", "모자 착용 증가로 두피 환기 부족"],
    tips: ["두피 혈액순환 촉진 마사지 매일 5분", "자기 전 두피 오일 도포 (오버나이트 케어)", "모자 착용 시 두피 통기성 유지 위해 면 소재 선택"],
    product: "입동 나이트 케어 오일"
  },
  {
    name: "소설", month: 11, day: 22,
    season: "겨울", seasonEn: "WINTER",
    theme: "건성 두피 집중 케어 — 겨울 보습 루틴",
    bgColor: { r: 0.937, g: 0.945, b: 0.965 },
    accentColor: { r: 0.365, g: 0.435, b: 0.698 },
    symptoms: ["건성 두피 최악 — 당김·가려움 극심", "비듬·각질 폭발 시기", "두피 민감도 최고조"],
    tips: ["세정 횟수 줄이기 (주 3회로 조절)", "고보습 두피 크림 세럼 도입", "목욕 후 즉시 두피 보습제 도포 루틴 확립"],
    product: "소설 하이드라 크림 세럼"
  },
  {
    name: "대설", month: 12, day: 7,
    season: "겨울", seasonEn: "WINTER",
    theme: "눈처럼 쌓인 각질 제거 — 두피 오일 케어",
    bgColor: { r: 0.937, g: 0.945, b: 0.965 },
    accentColor: { r: 0.365, g: 0.435, b: 0.698 },
    symptoms: ["두피 각질·비듬 연중 최고 악화", "건조한 난방 공기로 두피 극건성", "정전기로 인한 모발 부서짐"],
    tips: ["두피 오일 트리트먼트 주 3회 집중 시행", "저온 드라이로 두피 과열 방지", "아르간·호호바 오일 성분 제품으로 집중 보습"],
    product: "대설 아르간 오일 트리트먼트"
  },
  {
    name: "동지", month: 12, day: 22,
    season: "겨울", seasonEn: "WINTER",
    theme: "밤이 가장 긴 날 — 두피 재생 집중 케어",
    bgColor: { r: 0.937, g: 0.945, b: 0.965 },
    accentColor: { r: 0.365, g: 0.435, b: 0.698 },
    symptoms: ["수면 중 두피 재생 저하 — 건조 악화", "연말 스트레스로 탈모 증가", "두피 피부장벽 약화"],
    tips: ["오버나이트 두피 마스크로 수면 중 재생 케어", "스트레스 관리 + 충분한 수면 7~8시간 확보", "연말 두피 상태 점검 + 새해 케어 루틴 설계"],
    product: "동지 슬리핑 두피 마스크"
  }
];

function getCurrentSolarTerm(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let current = SOLAR_TERMS[SOLAR_TERMS.length - 1]; // 기본: 동지
  for (const term of SOLAR_TERMS) {
    if (month > term.month || (month === term.month && day >= term.day)) {
      current = term;
    }
  }
  return current;
}

function getNextSolarTerm(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const term of SOLAR_TERMS) {
    if (month < term.month || (month === term.month && day < term.day)) {
      return term;
    }
  }
  return SOLAR_TERMS[0]; // 새해 첫 절기
}

module.exports = { getCurrentSolarTerm, getNextSolarTerm, SOLAR_TERMS };
