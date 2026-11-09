<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# 온유오피스 설치

[Releases 페이지](https://github.com/dodamworks/onyouoffice/releases/latest)

## 내 컴퓨터에 맞는 파일 고르기

| 플랫폼                                 | 필요한 것                         | 파일                               |
| -------------------------------------- | --------------------------------- | ---------------------------------- |
| **Windows**                            | Windows 10 이상, 64비트 Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (베타)**, Apple Silicon          | macOS 12 이상, M1 이후 칩         | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (베타)**, Intel                  | macOS 12 이상, Intel 프로세서     | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (베타)**, 모든 배포판          | 64비트(x86_64); glibc ≥ 2.35      | `OnyouOffice-<version>.AppImage`   |
| **Linux (베타)**, Ubuntu·Debian 계열   | 64비트(x86_64); glibc ≥ 2.35      | `onyouoffice_<version>_amd64.deb`  |
| **Linux (베타)**, Fedora·RHEL·openSUSE | 64비트(x86_64); glibc ≥ 2.35      | `onyouoffice-<version>.x86_64.rpm` |

## Windows에서

1. Releases 페이지에서 `OnyouOffice-Setup-<version>.exe`를 내려받습니다.
2. 실행합니다. 설치 파일에 코드 서명이 없어서, Windows가 먼저 파란색 "Windows의 PC 보호" 창을 띄울 수 있습니다. **추가 정보**를 누른 다음 **실행**을 누릅니다. 창에 나오는 정확한 문구는 Windows 버전에 따라 다를 수 있습니다.
3. 설치 프로그램의 안내를 끝까지 따라갑니다.

온유오피스를 시작 메뉴에 넣고 `.docx`, `.xlsx`, `.pptx`, `.pdf` 등을 등록해서, 파일을 두 번 클릭하면 열립니다.

서명이 없는 설치 파일이므로, 위 Releases 페이지에서 내려받은 것만 실행하세요.

## Windows에서 내려받기나 설치가 막힐 때

### Edge가 "일반적으로 다운로드되지 않습니다"라고 할 때

내려받는 사람이 아직 많지 않은 파일에 Microsoft Defender SmartScreen이 붙이는 경고입니다. Microsoft가 안내하는 파일 남기는 방법은 이렇습니다.

1. Edge의 다운로드 목록(**Ctrl+J**)을 열고 그 파일 옆의 **…**을 눌러 **유지**를 고릅니다.
2. 새로 뜨는 창에서 **자세히 표시**를 누르고 **그래도 계속**을 고릅니다. 파일이 '다운로드' 폴더에 남습니다.

그 창에는 파일이 안전하다고 신고하는 단추도 있습니다. 이 단추는 Microsoft의 신고 페이지(`feedback.smartscreen.microsoft.com`)를 열 뿐이고 파일을 남기지 않습니다. 그 페이지는 닫고, 창에서 **자세히 표시**를 누르세요.

창에 **자세히 표시**나 **그래도 계속**이 없으면:

- 학교나 회사가 관리하는 PC에서는 관리자가 이 경고를 건너뛰지 못하게 막아 둘 수 있습니다(Edge 정책). 그러면 그 PC에서는 누구도 파일을 남길 수 없으니, 관리자에게 설치나 허용을 부탁하세요.
- 다른 브라우저로 Releases 페이지에 들어가 받아도 같은 파일입니다.

### "Windows의 PC 보호" 창이 뜰 때

Microsoft Defender SmartScreen이 서명 없는 설치 파일을 처음 보면 띄우는 창입니다. **추가 정보**를 누르면 **실행** 단추가 나옵니다. 학교나 회사가 관리하는 PC에서는 관리자 설정 때문에 이 단추가 나오지 않을 수 있으니 관리자에게 물어보세요.

## Mac에서 (베타)

macOS 12(Monterey) 이상이 필요합니다. Mac판에는 Apple 개발자 서명이 없어서, 처음 열 때 macOS가 "Apple은 악성 코드가 없음을 확인할 수 없습니다"라는 뜻의 경고를 띄우고 열지 않습니다. 처음 한 번만 아래처럼 허용하면 됩니다.

1. dmg를 열고 `Onyou Office.app`을 **응용 프로그램** 폴더로 끌어다 놓습니다.
2. 응용 프로그램 폴더에서 `Onyou Office.app`을 엽니다. 경고 창이 뜨면 **완료**를 누릅니다.
3. **시스템 설정 ▸ 개인정보 보호 및 보안**을 열고, 아래쪽에 앱이 차단되었다는 줄(앱 이름은 영문으로 나옵니다) 옆의 **그래도 열기**를 누른 뒤 Mac 암호를 넣습니다. 이 단추는 앱을 열려고 한 뒤 1시간쯤 동안 보입니다.
4. 다시 뜨는 창에서 **열기**를 누릅니다. 이후로는 경고 없이 열립니다.

macOS 12에서는 **시스템 환경설정 ▸ 보안 및 개인 정보 보호 ▸ 일반**에 있고, 단추 이름은 **확인 없이 열기**입니다.

"이 Mac에서 지원되지 않는다"는 말이 나오면 두 가지를 확인합니다.

- Intel Mac에서는 Apple Silicon용 파일(`-arm64.dmg`)이 열리지 않습니다. **이 Mac에 관하여**의 "프로세서"를 확인하고, 설치한 앱을 지운 뒤 `-x64.dmg` 파일로 다시 설치합니다.
- macOS 11 이하에서는 온유오피스를 쓸 수 없습니다. macOS 버전도 **이 Mac에 관하여**에 나옵니다.

Mac에서 그 밖에 다른 점:

- AI 연결 카드에 설치 단추가 없습니다. 카드의 공식 설치 안내 링크를 따라 Claude Code나 Codex를 설치합니다. Claude 데스크톱 앱은 Claude Code가 아니므로, 데스크톱 앱이 있어도 Claude Code는 따로 설치해야 합니다.
- 로그인은 브라우저에서 끝납니다. 브라우저가 코드를 붙여 넣으라고 하면 터미널에서 `claude auth login` 또는 `codex login`을 직접 실행합니다. [구독 연결](help://subscription)을 보세요.

## Linux에서 (베타)

- **AppImage**: 실행 권한을 준 뒤(`chmod +x OnyouOffice-<version>.AppImage`) 그 파일을 실행합니다. 설치 과정이 없습니다.
- **deb**: `sudo apt install ./onyouoffice_<version>_amd64.deb`로 설치합니다.
- **rpm**: `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`로 설치합니다. openSUSE에서는 `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`을 씁니다.

deb와 rpm은 `/opt/Onyou Office`에 설치되고, 터미널 명령 `/usr/bin/onyouoffice`를 연결합니다. Mac처럼 AI 연결 카드에 설치 단추가 없고, 로그인 중에 코드를 붙여 넣으라고 하면 터미널에서 `claude auth login` 또는 `codex login`을 직접 실행합니다.

## 업데이트

[Releases 페이지](https://github.com/dodamworks/onyouoffice/releases/latest)

## 지금 실행 중인 빌드

**설정 ▸ 정보**는 앱이 지금 가진 버전, 따르는 업데이트 채널, 프로젝트가 있는 곳을 보여 주는 곳입니다. 이 앱의 바탕이 된 오픈 소스 프로젝트도 여기에 적혀 있습니다.

## 명령줄도 함께 옵니다

모든 설치본에는 `onyouoffice` 명령이 들어 있고, 창이 쓰는 바로 그 엔진을 구동합니다. 같은 파일에 대한 둘의 판단이 어긋날 일은 없습니다. `onyouoffice install-cli`로 `PATH`에 넣습니다. 무엇을 할 수 있는지는 [명령줄과 에이전트](help://cli)를 보세요.
