<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Installing Onyou Office

[Releases page](https://github.com/dodamworks/onyouoffice/releases/latest)

## Pick the file for your machine

| Platform                               | Requirements                          | File                               |
| -------------------------------------- | ------------------------------------- | ---------------------------------- |
| **Windows**                            | Windows 10 or later, 64-bit Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon          | macOS 12 or later, M1 or newer chip   | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                  | macOS 12 or later, Intel processor    | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, any distribution     | 64-bit (x86_64); glibc ≥ 2.35         | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, Ubuntu/Debian family | 64-bit (x86_64); glibc ≥ 2.35         | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE | 64-bit (x86_64); glibc ≥ 2.35         | `onyouoffice-<version>.x86_64.rpm` |

## On Windows

1. Download `OnyouOffice-Setup-<version>.exe` from the Releases page.
2. Run it. The installer is not code-signed, so Windows may first show a blue "Windows protected your PC" window. Choose **More info**, then **Run anyway**. The exact wording depends on your Windows version.
3. Follow the installer to the end.

It puts Onyou Office in the Start menu and registers `.docx`, `.xlsx`, `.pptx`, `.pdf` and friends so double-clicking a file opens it.

Because the installer is not signed, only run one you downloaded from the Releases page above.

## When Windows blocks the download or the install

### Edge says the file "isn't commonly downloaded"

Microsoft Defender SmartScreen warns this way about a file it has not seen many people download. Microsoft's guide to keep the file is:

1. Open Edge's download list (**Ctrl+J**), press **…** next to the file and choose **Keep**.
2. In the window that opens, press **Show more**, then **Keep anyway**. The file stays in your Downloads folder.

That window also has a button that reports the file as safe. It only opens Microsoft's report page (`feedback.smartscreen.microsoft.com`) and does not keep the file. Close that page and press **Show more** in the window instead.

If the window has no **Show more** or no **Keep anyway**:

- On a PC that a school or company manages, the administrator can switch off skipping these warnings (an Edge policy). Then nobody on that PC can keep the file; ask the administrator to install it or to allow it.
- Downloading from the Releases page in a different browser gives you the same file.

### A "Windows protected your PC" window appears

Microsoft Defender SmartScreen shows this window the first time it sees an unsigned installer. Press **More info** and a **Run anyway** button appears. On a PC that a school or company manages, an administrator setting can hide that button; ask the administrator.

## On a Mac (beta)

You need macOS 12 (Monterey) or later. The Mac build has no Apple developer signature, so the first time you open it macOS says it cannot verify the app is free of malware and does not open it. Allow it once, as below.

1. Open the dmg and drag `Onyou Office.app` into the **Applications** folder.
2. Open Onyou Office from the Applications folder. When the warning appears, press **Done**.
3. Open **System Settings ▸ Privacy & Security**. Near the bottom, next to the line saying Onyou Office was blocked, press **Open Anyway** and enter your Mac password. The button shows for about an hour after you tried to open the app.
4. In the window that appears again, press **Open**. From then on it opens without a warning.

On macOS 12 the place is **System Preferences ▸ Security & Privacy ▸ General**, and the button is **Open Anyway** there.

If macOS says the app is not supported on this Mac, check two things:

- An Intel Mac cannot run the Apple Silicon file (`-arm64.dmg`). Check "Processor" under **About This Mac**, delete the app you installed, and install the `-x64.dmg` file instead.
- macOS 11 or earlier cannot run Onyou Office. **About This Mac** also shows the macOS version.

Also on a Mac:

- The AI connection cards have no install button. Follow the card's official install guide link to install Claude Code or Codex.
- Signing in finishes in the browser. If the browser asks you to paste a code, run `claude auth login` or `codex login` in Terminal yourself. See [Subscription connection](help://subscription).

## On Linux (beta)

- **AppImage**: make it executable (`chmod +x OnyouOffice-<version>.AppImage`) and run the file. There is no install step.
- **deb**: install with `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: install with `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. On openSUSE, use `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

The deb and rpm packages install to `/opt/Onyou Office` and link the terminal command `/usr/bin/onyouoffice`. As on a Mac, the AI connection cards have no install button, and when a sign-in asks for a code you run `claude auth login` or `codex login` in a terminal yourself.

## Updates

[Releases page](https://github.com/dodamworks/onyouoffice/releases/latest)

## The build you are running

**Settings ▸ About** is where the app reports the version you have, the channel it follows and where the project lives. It also names the open-source project this app is based on.

## The command line comes with it

Every install ships an `onyouoffice` command that talks to the same engines the window does, so the two never disagree about a file. `onyouoffice install-cli` puts it on your `PATH`. See [Command line and agents](help://cli) for what it can do.
