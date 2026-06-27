# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 유의사항

- **감정 표현 금지, 존댓말 필수** — "좋아요!", "훌륭합니다!" 같은 표현 없이 사실만 전달. 모든 답변은 존댓말로.
- **작업 전 커밋 필수** — 코드 변경을 시작하기 전 현재 변경 사항을 먼저 커밋. push는 사용자가 "커밋해줘"라고 할 때만.
- **옵션 제공** — 방향이 갈리는 경우 A안·B안 형태로 제시해 사용자가 선택하도록 함.
- **변경 사항 안내** — 작업 완료 후 무엇이 어떻게 바뀌었는지 간략히 알림.

## 명령어

```bash
npm run dev       # 개발 서버 실행 (http://localhost:5173/portfolio/)
npm run build     # 프로덕션 빌드 → dist/
npm run preview   # 프로덕션 빌드 미리보기
```

lint·테스트 스크립트는 없음. Prettier는 설정만 되어 있으므로 포맷팅은 에디터 또는 `npx prettier --write .`으로 직접 실행.

## 아키텍처

**Vite + 바닐라 JS + SCSS + GSAP**으로 구성된 싱글 페이지 포트폴리오 사이트.

- `index.html` — 유일한 HTML 파일. 모든 섹션이 하나의 스크롤 페이지로 존재
- `src/main.js` — 모든 JavaScript: GSAP ScrollTrigger 애니메이션, 커스텀 커서, 히어로 타이핑 효과
- `src/styles/main.scss` — SCSS 진입점. 순서대로 모든 파일을 임포트

### SCSS 구조

```
src/styles/
  abstracts/      ← _variables.scss, _mixins.scss (모든 파셜에서 `as *`로 임포트)
  base/           ← reset, fonts
  layout/         ← 페이지 섹션별 파일 (visual, about, highlight, portfolio 등)
  components/     ← cursor, common
```

모든 파셜은 `@use 'abstracts/variables' as *`와 `@use 'abstracts/mixins' as *`로 임포트해 네임스페이스 없이 토큰을 사용.

### main.js 주요 애니메이션 패턴

- **Visual 섹션** — `ScrollTrigger.create`로 핀 고정. About 섹션이 위로 덮어 올라오는 효과 (`pinSpacing: false`)
- **Highlight 섹션** — 자체 핀 고정 후 스크롤에 따라 단어 색상이 `#d0d0d0` → `#333`으로 전환 (accent 단어는 `$color-primary: #ffe36d`). 핀 종료 직후 portfolio-wrap이 자연스럽게 이어지도록 `marginTop`을 scrub 거리 기반으로 동적 계산
- **타이핑 효과** — 히어로 `.name`의 각 `span`을 순차적으로 나타내고, `.name-cursor`(`_`)를 글자 너비(`charWidth`)만큼 GSAP timeline으로 이동
- **커스텀 커서** — `.cursor` div를 `gsap.ticker`로 마우스를 추적. `.visual-wrap` 내부에서는 `.white` 클래스 추가
- `ScrollTrigger.refresh()` — 모든 트리거 등록 후 마지막에 한 번 호출해 핀 위치 재계산

### 주석 처리된 섹션 (미활성)

- 가로 스크롤 슬라이드 (`.sld-wrap`) — HTML 마크업과 JS 모두 주석 처리됨
- 줌/렌즈 텍스트 효과 (`.zoom-wrap`) — JS와 HTML 모두 주석 처리됨
- 타이핑 텍스트 reveal (`.text-wrap`)

Vite `base`가 `/portfolio/`로 설정되어 있어 에셋 경로 및 빌드 미리보기 시 주의.

## 포맷팅

Prettier 설정 (`.prettierrc`): 세미콜론 없음, 싱글 쿼트, trailing comma 없음, 줄 너비 100자, 들여쓰기 2칸.

## 커밋 워크플로우

**작업 시작 전** — 현재 변경 사항이 있으면 먼저 커밋 (push 없이).

**사용자가 "커밋해줘"라고 하면** 확인 없이 아래 순서를 자동 실행한다.

1. `git status` + `git diff` 로 변경 내역 파악
2. 변경 내용을 분석해 **한국어** 커밋 메시지 작성
3. 관련 파일 스테이징 → 커밋
4. `git push` 로 원격 반영

### 커밋 메시지 규칙

형식: `타입: 한 줄 요약 (한국어)`

| 타입 | 사용 상황 |
|------|-----------|
| `feat` | 새 기능 추가 |
| `fix` | 버그·오류 수정 |
| `style` | 레이아웃·색상·간격 등 시각적 변경 (동작 무관) |
| `refactor` | 동작 변경 없이 코드 구조 개선 |
| `chore` | 설정 파일·패키지·빌드 관련 변경 |
| `docs` | 문서·주석 변경 |

예시:
```
feat: 포트폴리오 섹션 스크롤 애니메이션 추가
fix: 커서 white 클래스 해제 누락 수정
style: about 섹션 간격 및 폰트 사이즈 조정
chore: vite base 경로 설정 변경
```
