<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# 安裝 Onyou Office

[Releases 頁面](https://github.com/dodamworks/onyouoffice/releases/latest)

## 選擇適合你電腦的檔案

| 平台                                    | 需求                                     | 檔案                               |
| --------------------------------------- | ---------------------------------------- | ---------------------------------- |
| **Windows**                             | Windows 10 或更新版本，64 位元 Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac（Beta）**，Apple 晶片             | macOS 12 或更新版本，M1 或更新的晶片     | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac（Beta）**，Intel                  | macOS 12 或更新版本，Intel 處理器        | `OnyouOffice-<version>-x64.dmg`    |
| **Linux（Beta）**，任何發行版           | 64 位元（x86_64）; glibc ≥ 2.35          | `OnyouOffice-<version>.AppImage`   |
| **Linux（Beta）**，Ubuntu/Debian 系列   | 64 位元（x86_64）; glibc ≥ 2.35          | `onyouoffice_<version>_amd64.deb`  |
| **Linux（Beta）**，Fedora/RHEL/openSUSE | 64 位元（x86_64）; glibc ≥ 2.35          | `onyouoffice-<version>.x86_64.rpm` |

## 在 Windows 上

1. 從 Releases 頁面下載 `OnyouOffice-Setup-<version>.exe`。
2. 執行它。安裝程式沒有程式碼簽章，所以 Windows 可能會先跳出一個藍色的「Windows 已保護您的電腦」視窗。請選擇**其他資訊**，再選擇**仍要執行**。實際的文字會因 Windows 版本而異。
3. 依照安裝程式的指示完成安裝。

它會把 Onyou Office 放進開始功能表，並註冊 `.docx`、`.xlsx`、`.pptx`、`.pdf` 等格式，按兩下檔案就會用 Onyou Office 開啟。

由於安裝程式沒有簽章，請只執行從上面的 Releases 頁面下載的檔案。

## Windows 擋下下載或安裝時

### Edge 提示檔案「不常被下載」

Microsoft Defender SmartScreen 遇到很少人下載過的檔案時，會這樣發出警告。Microsoft 提供的保留檔案方法如下：

1. 開啟 Edge 的下載清單（**Ctrl+J**），按檔案旁邊的 **…**，選擇**保留**。
2. 在開啟的視窗中按**顯示更多**，再按**仍然保留**。檔案會留在你的「下載」資料夾中。

這個視窗裡還有一個回報檔案安全的按鈕。它只會開啟 Microsoft 的回報頁面（`feedback.smartscreen.microsoft.com`），並不會保留檔案。請關閉該頁面，改為在視窗中按**顯示更多**。

如果視窗中沒有**顯示更多**或**仍然保留**：

- 在學校或公司管理的電腦上，系統管理員可以禁止略過這些警告（一項 Edge 原則）。這時這台電腦上誰都無法保留該檔案；請找系統管理員代為安裝或放行。
- 用另一個瀏覽器從 Releases 頁面下載，得到的也是同一個檔案。

### 出現「Windows 已保護您的電腦」視窗

Microsoft Defender SmartScreen 第一次遇到沒有簽章的安裝程式時，會顯示這個視窗。按**其他資訊**，就會出現**仍要執行**按鈕。在學校或公司管理的電腦上，系統管理員的設定可能會隱藏這個按鈕；請洽詢系統管理員。

## 在 Mac 上（Beta）

需要 macOS 12（Monterey）或更新版本。Mac 版沒有 Apple 開發者簽章，所以第一次開啟時，macOS 會提示無法驗證該 App 不含惡意軟體，並且不會打開它。照下面的步驟允許一次即可。

1. 打開 dmg，把 `Onyou Office.app` 拖進**應用程式**資料夾。
2. 從「應用程式」資料夾打開 Onyou Office。出現警告時，按**完成**。
3. 打開**系統設定 ▸ 隱私權與安全性**。在靠近底部、寫著 Onyou Office 已被阻擋的那一行旁邊，按**強制打開**，並輸入 Mac 的密碼。這個按鈕在你嘗試打開 App 後大約一小時內會顯示。
4. 在再次出現的視窗中按**打開**。此後再打開就不會有警告了。

在 macOS 12 上，位置是**系統偏好設定 ▸ 安全性與隱私權 ▸ 一般**，按鈕同樣是那裡的**強制打開**。

如果 macOS 提示這台 Mac 不支援該 App，請檢查兩件事：

- Intel Mac 無法執行 Apple 晶片版的檔案（`-arm64.dmg`）。在**關於這台 Mac**中查看「處理器」，刪除已安裝的 App，改為安裝 `-x64.dmg` 檔案。
- macOS 11 或更早的版本無法執行 Onyou Office。**關於這台 Mac**中也會顯示 macOS 版本。

在 Mac 上還要注意：

- AI 連線卡片上沒有安裝按鈕。請依照卡片上的官方安裝指南連結來安裝 Claude Code 或 Codex。
- 登入會在瀏覽器中完成。如果瀏覽器要求你貼上代碼，請自己在「終端機」中執行 `claude auth login` 或 `codex login`。請見[訂閱連線](help://subscription)。

## 在 Linux 上（Beta）

- **AppImage**：給它加上可執行權限（`chmod +x OnyouOffice-<version>.AppImage`），然後執行該檔案。沒有安裝步驟。
- **deb**：用 `sudo apt install ./onyouoffice_<version>_amd64.deb` 安裝。
- **rpm**：用 `sudo dnf install ./onyouoffice-<version>.x86_64.rpm` 安裝。在 openSUSE 上，請用 `sudo zypper install ./onyouoffice-<version>.x86_64.rpm` 安裝。

deb 和 rpm 會安裝到 `/opt/Onyou Office`，並連結終端機指令 `/usr/bin/onyouoffice`。與 Mac 一樣，AI 連線卡片上沒有安裝按鈕；登入要求輸入代碼時，請自己在終端機中執行 `claude auth login` 或 `codex login`。

## 更新

[Releases 頁面](https://github.com/dodamworks/onyouoffice/releases/latest)

## 你正在執行的建置

**設定 ▸ 關於** 是應用程式回報你目前的版本、它跟隨的更新通道，以及專案所在位置的地方。這裡也會寫明本應用程式所根據的開放原始碼專案。

## 命令列隨著一起安裝

每次安裝都會附帶一個 `onyouoffice` 命令，它與視窗呼叫的是同一套引擎，因此兩者對同一個檔案不會有分歧。`onyouoffice install-cli` 會把它放進你的 `PATH`。它能做什麼，請見[命令列與智慧代理](help://cli)。
