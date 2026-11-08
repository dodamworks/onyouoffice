<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# 安装 Onyou Office

[Releases 页面](https://github.com/dodamworks/onyouoffice/releases/latest)

## 选择适合你机器的文件

| 平台                                    | 需求                                   | 文件                               |
| --------------------------------------- | -------------------------------------- | ---------------------------------- |
| **Windows**                             | Windows 10 或更高版本，64 位 Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac（Beta）**，Apple 芯片             | macOS 12 或更高版本，M1 或更新的芯片   | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac（Beta）**，Intel                  | macOS 12 或更高版本，Intel 处理器      | `OnyouOffice-<version>-x64.dmg`    |
| **Linux（Beta）**，任意发行版           | 64 位（x86_64）; glibc ≥ 2.35          | `OnyouOffice-<version>.AppImage`   |
| **Linux（Beta）**，Ubuntu/Debian 系     | 64 位（x86_64）; glibc ≥ 2.35          | `onyouoffice_<version>_amd64.deb`  |
| **Linux（Beta）**，Fedora/RHEL/openSUSE | 64 位（x86_64）; glibc ≥ 2.35          | `onyouoffice-<version>.x86_64.rpm` |

## 在 Windows 上

1. 从 Releases 页面下载 `OnyouOffice-Setup-<version>.exe`。
2. 运行它。安装程序没有代码签名，所以 Windows 可能会先弹出一个蓝色的“Windows 已保护你的电脑”窗口。点**更多信息**，再点**仍要运行**。具体文字因 Windows 版本而异。
3. 按照安装程序的提示一直走到最后。

它会把 Onyou Office 放进开始菜单，并注册 `.docx`、`.xlsx`、`.pptx`、`.pdf` 等格式，双击文件就会用 Onyou Office 打开。

因为安装程序没有签名，请只运行从上面的 Releases 页面下载的文件。

## Windows 拦截下载或安装时

### Edge 提示文件“不常被下载”

Microsoft Defender SmartScreen 遇到很少有人下载过的文件时，会这样发出警告。Microsoft 给出的保留文件的方法如下：

1. 打开 Edge 的下载列表（**Ctrl+J**），点文件旁边的 **…**，选择**保留**。
2. 在打开的窗口中点**显示更多**，再点**仍然保留**。文件会留在你的“下载”文件夹中。

这个窗口里还有一个报告文件安全的按钮。它只会打开 Microsoft 的报告页面（`feedback.smartscreen.microsoft.com`），并不会保留文件。请关闭该页面，改为在窗口中点**显示更多**。

如果窗口中没有**显示更多**或**仍然保留**：

- 在学校或公司管理的电脑上，管理员可以禁止跳过这些警告（一项 Edge 策略）。这时这台电脑上谁都无法保留该文件；请让管理员替你安装或放行。
- 用另一个浏览器从 Releases 页面下载，得到的也是同一个文件。

### 出现“Windows 已保护你的电脑”窗口

Microsoft Defender SmartScreen 第一次遇到没有签名的安装程序时，会显示这个窗口。点**更多信息**，就会出现**仍要运行**按钮。在学校或公司管理的电脑上，管理员的设置可能会隐藏这个按钮；请联系管理员。

## 在 Mac 上（Beta）

需要 macOS 12（Monterey）或更高版本。Mac 版没有 Apple 开发者签名，所以第一次打开时，macOS 会提示无法验证该应用不含恶意软件，并且不会打开它。按下面的步骤允许一次即可。

1. 打开 dmg，把 `Onyou Office.app` 拖进**应用程序**文件夹。
2. 从“应用程序”文件夹打开 Onyou Office。出现警告时，点**完成**。
3. 打开**系统设置 ▸ 隐私与安全性**。在靠近底部、写着 Onyou Office 已被阻止的那一行旁边，点**仍要打开**，并输入 Mac 的密码。这个按钮在你尝试打开应用后大约一小时内会显示。
4. 在再次出现的窗口中点**打开**。此后再打开就不会有警告了。

在 macOS 12 上，位置是**系统偏好设置 ▸ 安全性与隐私 ▸ 通用**，按钮同样是那里的**仍要打开**。

如果 macOS 提示这台 Mac 不支持该应用，请检查两件事：

- Intel Mac 无法运行 Apple 芯片版的文件（`-arm64.dmg`）。在**关于本机**中查看“处理器”，删除已安装的应用，改为安装 `-x64.dmg` 文件。
- macOS 11 或更早的版本无法运行 Onyou Office。**关于本机**中也会显示 macOS 版本。

在 Mac 上还要注意：

- AI 连接卡片上没有安装按钮。请按卡片上的官方安装指南链接来安装 Claude Code 或 Codex。
- 登录会在浏览器中完成。如果浏览器要求你粘贴代码，请自己在“终端”中运行 `claude auth login` 或 `codex login`。见[订阅连接](help://subscription)。

## 在 Linux 上（Beta）

- **AppImage**：给它加上可执行权限（`chmod +x OnyouOffice-<version>.AppImage`），然后运行该文件。没有安装步骤。
- **deb**：用 `sudo apt install ./onyouoffice_<version>_amd64.deb` 安装。
- **rpm**：用 `sudo dnf install ./onyouoffice-<version>.x86_64.rpm` 安装。在 openSUSE 上，用 `sudo zypper install ./onyouoffice-<version>.x86_64.rpm` 安装。

deb 和 rpm 会安装到 `/opt/Onyou Office`，并链接终端命令 `/usr/bin/onyouoffice`。与 Mac 一样，AI 连接卡片上没有安装按钮；登录要求输入代码时，请自己在终端中运行 `claude auth login` 或 `codex login`。

## 更新

[Releases 页面](https://github.com/dodamworks/onyouoffice/releases/latest)

## 你正在运行的构建

**设置 ▸ 关于** 是应用报告你所用的版本、它跟随的更新通道以及项目所在地的地方。这里还写明了本应用所基于的开源项目。

## 命令行随包附带

每个安装版本都带一个 `onyouoffice` 命令，它和窗口调用的是同一套引擎，因此两者对同一个文件不会给出不同的结果。`onyouoffice install-cli` 会把它放进你的 `PATH`。它能做什么，见[命令行与智能体](help://cli)。
