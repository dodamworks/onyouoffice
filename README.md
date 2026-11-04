<!-- Modified by Onyou Office on 2026-11-04 for the Onyou Office fork. -->

# 온유오피스 / Onyou Office

**한국어** · [English](README.en.md)

문서를 열고 편집하고, 필요할 때 AI와 함께 작업하는 무료 데스크톱 오피스입니다.
문서, 스프레드시트, 프레젠테이션, PDF, 한글(HWP·HWPX), Markdown, HTML,
마인드맵, EPUB을 한 앱에서 다룹니다. 형식에 따라 편집·변환 범위가 다릅니다.

온유오피스는 [이음오피스](https://github.com/pblsketch/openoffice)를
바탕으로 한 독립 포크입니다. 이음오피스의 원본은
[GenOffice](https://github.com/genspark-ai/genoffice)입니다. 문서 엔진과 많은
편집 기능은 이 프로젝트들과 다른 오픈소스 기여자들의 작업에서 왔습니다.
온유오피스는 브랜드, 첫 실행·홈 화면, 공용 AI 패널, 프로젝트·지식 창고와
제품별 저장·설치 경로를 정리했습니다. [비교 기록](docs/dodam/UPSTREAM-INTEGRATION.md)에서
원본 기능과 자체 변경을 구분합니다.

## 현재 배포 상태

현재는 공개 배포를 준비하는 개발 버전입니다. 공식 설치본과 업데이트 피드는
아직 제공하지 않습니다. 다른 프로젝트의 릴리스를 온유오피스 설치본으로
안내하지 않습니다. Windows·macOS·Linux용 빌드 구성이 있지만, 운영체제별
공식 지원 범위와 첫 배포 대상은 설치 검증 후 안내합니다.

## AI 연결과 비용

- 온유오피스 데스크톱 앱은 무료로 제공합니다. AI 없이도 문서를 열고 편집할 수 있습니다.
- Claude·ChatGPT·Codex 및 외부 AI 서비스의 요금·구독·사용 한도는 각 제공자의 조건을 따릅니다.
- 설정 → AI에서 연결을 선택합니다. OpenRouter·Gemini·API 키·로컬 AI 연결 등은 기존 구현을 유지합니다. 무료 이용 범위는 제공자가 바꿀 수 있습니다.
- 이 개발 버전에서는 공식 Codex 프로그램을 통한 지식 창고 질문과 후속 대화를 확인했습니다. ChatGPT 직접 로그인은 제공자 동의 단계의 오류가 남아 있어 성공한 경로로 안내하지 않습니다. [알려진 문제](docs/tracking/findings.md)
- AI를 사용하면 요청에 필요한 문서 내용·첨부·대화가 선택한 제공자에게 전송됩니다. [개인정보 안내](PRIVACY.md)에서 범위와 제한을 확인하세요.

## 직접 실행하기

Node.js 24, npm, Rust 도구 체인(`cargo`)이 필요합니다. 네이티브 빌드에는
운영체제별 추가 도구가 필요합니다. 기존 lockfile과 패키지 이름은 유지합니다.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

저장소를 비공개로 준비하는 동안에는 접근 권한이 있는 사람만 복제할 수 있습니다.
AI 계정 없이도 개발·모의 제공자 테스트를 할 수 있습니다. 개발 실행과 설치본은
서로 다른 데이터 폴더를 사용합니다. 기본 문서 폴더 이름은 `onyouoffice`이며,
기존 사용자 문서를 자동으로 옮기거나 이름을 바꾸지 않습니다.

첫 실행 전 전체 빌드는 각 편집기의 실행 코드와 preload, 네이티브 도구를 준비합니다.
앱이 열리면 홈에서 파일을 열거나 새 문서를 만들 수 있습니다. AI가 필요하면
설정 → AI에서 연결을 선택한 뒤, 문서의 AI 도우미에서 요청을 입력하세요.

- [기여·검증 안내](CONTRIBUTING.md)
- [구조와 요청 흐름](docs/architecture.md)
- [보안 신고](SECURITY.md)
- [개발 환경과 도구](docs/dodam/DESKTOP-TOOLING.md)
- [공개·배포 준비 상태](docs/PUBLIC-RELEASE.md)

## 문제 신고와 기여

공개 저장소 운영을 시작하면 [이 저장소의 Issues](https://github.com/dodamworks/onyouoffice/issues)와
Pull Request로 버그 재현·문서·번역·코드 기여를 받습니다. 현재 접근할 수 없다면
`support@onyouoffice.com`으로 연락해 주세요. 답변 시간이나 해결 시점을 보장하지 않습니다.
개인 문서·키·계정 정보는 공개 이슈에 올리지 마세요. 가능한 한 합성 파일로 재현해 주세요.
보안 문제는 [비공개 신고 경로](SECURITY.md)를 이용하세요.

커뮤니티의 검토는 유지보수에 도움이 되지만, 배포할 버전의 검증과 알려진 문제
안내는 관리자의 책임입니다. 기여 방법과 원본 개선을 받아오는 기준은
[CONTRIBUTING.md](CONTRIBUTING.md)에 있습니다.

## 라이선스와 출처

프로젝트 소스는 [Apache License 2.0](LICENSE)을 따릅니다. 별도 고지가 있는
제3자 소스·글꼴·이미지·도구는 각각의 조건을 따릅니다.
[NOTICE](NOTICE), [기여자 기록](CONTRIBUTORS.md), 설치본의 제3자 고지를 보존합니다.

이음오피스·GenOffice·rhwp와 여러 오픈소스 프로젝트에 감사드립니다.
[이음오피스 원본 소개](https://github.com/pblsketch/openoffice#readme)와
[GenOffice 원본 소개](https://github.com/genspark-ai/genoffice#readme)도 확인할 수 있습니다.
이 프로젝트는 원본 프로젝트나 AI·문서 형식 제공자와 제휴·후원 관계를 주장하지 않습니다.

Apache-2.0은 재사용·수정·상업적 배포를 허용하며, 다른 사람이 만든 변경을
공개하도록 강제하지 않습니다. 온유오피스 이름과 로고, 원본 프로젝트들의
상표 사용권은 소스 라이선스와 별개입니다. [브랜드 사용 안내](TRADEMARKS.md)
