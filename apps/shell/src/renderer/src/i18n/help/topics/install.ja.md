<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Onyou Office のインストール

[Releases ページ](https://github.com/dodamworks/onyouoffice/releases/latest)

## 自分のマシンに合わせてファイルを選ぶ

| プラットフォーム                                    | 要件                                 | ファイル                           |
| --------------------------------------------------- | ------------------------------------ | ---------------------------------- |
| **Windows**                                         | Windows 10 以降、64 ビット Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac（ベータ）**、Apple シリコン                   | macOS 12 以降、M1 以降のチップ       | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac（ベータ）**、Intel                            | macOS 12 以降、Intel プロセッサ      | `OnyouOffice-<version>-x64.dmg`    |
| **Linux（ベータ）**、どのディストリビューションでも | 64 ビット（x86_64）; glibc ≥ 2.35    | `OnyouOffice-<version>.AppImage`   |
| **Linux（ベータ）**、Ubuntu/Debian 系               | 64 ビット（x86_64）; glibc ≥ 2.35    | `onyouoffice_<version>_amd64.deb`  |
| **Linux（ベータ）**、Fedora/RHEL/openSUSE           | 64 ビット（x86_64）; glibc ≥ 2.35    | `onyouoffice-<version>.x86_64.rpm` |

## Windows で

1. Releases ページから `OnyouOffice-Setup-<version>.exe` をダウンロードします。
2. 実行します。インストーラーにはコード署名がないため、Windows が最初に青い「Windows によって PC が保護されました」というウィンドウを表示することがあります。**詳細情報** を選び、続いて **実行** を選びます。実際の文言は Windows のバージョンによって異なります。
3. インストーラーの指示に従って最後まで進めます。

Onyou Office がスタートメニューに追加され、`.docx`、`.xlsx`、`.pptx`、`.pdf` などが登録されるので、ファイルをダブルクリックすれば開きます。

インストーラーには署名がないため、上の Releases ページからダウンロードしたものだけを実行してください。

## Windows がダウンロードやインストールを止めるとき

### Edge が「一般的にダウンロードされていません」と表示する

Microsoft Defender SmartScreen は、ダウンロードした人がまだ少ないファイルについて、このように警告します。ファイルを残す方法についての Microsoft の案内は次のとおりです。

1. Edge のダウンロード一覧（**Ctrl+J**）を開き、ファイルの横の **…** を押して **保存** を選びます。
2. 開いたウィンドウで **詳細表示** を押し、続いて **保持する** を押します。ファイルはダウンロード フォルダーに残ります。

このウィンドウには、ファイルが安全であると報告するボタンもあります。このボタンは Microsoft の報告ページ（`feedback.smartscreen.microsoft.com`）を開くだけで、ファイルは残りません。そのページを閉じ、代わりにウィンドウの **詳細表示** を押してください。

ウィンドウに **詳細表示** や **保持する** がないとき:

- 学校や会社が管理している PC では、管理者がこの警告を無視できないように設定できます（Edge のポリシー）。その場合、その PC ではだれもファイルを残せません。管理者にインストールか許可を頼んでください。
- 別のブラウザーで Releases ページからダウンロードしても、同じファイルが手に入ります。

### 「Windows によって PC が保護されました」というウィンドウが表示される

Microsoft Defender SmartScreen は、署名のないインストーラーを初めて見たときにこのウィンドウを表示します。**詳細情報** を押すと **実行** ボタンが表示されます。学校や会社が管理している PC では、管理者の設定によってこのボタンが表示されないことがあります。その場合は管理者に相談してください。

## Mac で（ベータ）

macOS 12（Monterey）以降が必要です。Mac 版には Apple の開発者署名がないため、最初に開くときに macOS は、アプリにマルウェアが含まれていないことを検証できないと表示し、アプリを開きません。次の手順で、一度だけ許可します。

1. dmg を開き、`Onyou Office.app` を **アプリケーション** フォルダーにドラッグします。
2. アプリケーション フォルダーから Onyou Office を開きます。警告が出たら **完了** を押します。
3. **システム設定 ▸ プライバシーとセキュリティ** を開きます。下のほうにある、Onyou Office がブロックされたという行の横の **このまま開く** を押し、Mac のパスワードを入力します。このボタンは、アプリを開こうとしてから 1 時間ほど表示されます。
4. もう一度表示されるウィンドウで **開く** を押します。以降は警告なしで開きます。

macOS 12 では、場所は **システム環境設定 ▸ セキュリティとプライバシー ▸ 一般** で、ボタンはそこにある **このまま開く** です。

macOS が、このアプリはこの Mac ではサポートされていないと表示した場合は、次の 2 点を確認してください。

- Intel Mac では Apple シリコン用のファイル（`-arm64.dmg`）は動きません。**このMacについて** の「プロセッサ」を確認し、インストールしたアプリを削除してから、`-x64.dmg` のファイルをインストールしてください。
- macOS 11 以前では Onyou Office は動きません。macOS のバージョンも **このMacについて** に表示されます。

Mac ではほかにも次の点に注意してください。

- AI 接続のカードにはインストールボタンがありません。カードにある公式のインストールガイドのリンクに従って、Claude Code や Codex をインストールしてください。Claude デスクトップアプリは Claude Code ではないため、デスクトップアプリがあっても Claude Code は別にインストールする必要があります。
- サインインはブラウザーで完了します。ブラウザーでコードを貼り付けるよう求められたら、ターミナル で `claude auth login` または `codex login` をご自身で実行してください。[サブスクリプションの接続](help://subscription) を参照してください。

## Linux で（ベータ）

- **AppImage**：実行権限を付け（`chmod +x OnyouOffice-<version>.AppImage`）、そのファイルを実行します。インストールの手順はありません。
- **deb**：`sudo apt install ./onyouoffice_<version>_amd64.deb` でインストールします。
- **rpm**：`sudo dnf install ./onyouoffice-<version>.x86_64.rpm` でインストールします。openSUSE では `sudo zypper install ./onyouoffice-<version>.x86_64.rpm` を使います。

deb と rpm は `/opt/Onyou Office` にインストールされ、ターミナル用のコマンド `/usr/bin/onyouoffice` がリンクされます。Mac と同じく、AI 接続のカードにはインストールボタンがありません。サインインでコードを求められたら、ターミナルで `claude auth login` または `codex login` をご自身で実行します。

## 更新

[Releases ページ](https://github.com/dodamworks/onyouoffice/releases/latest)

## いま動かしているビルド

**設定 ▸ 情報** は、お使いのバージョン、追随しているチャネル、プロジェクトが置かれている場所をアプリが示す場所です。このアプリのもとになったオープンソースプロジェクトの名前も、ここに記されています。

## コマンドラインも同梱されています

どのインストールにも `onyouoffice` コマンドが含まれ、ウィンドウと同じエンジンを動かします。そのため、同じファイルについて両者の結果が食い違うことはありません。`onyouoffice install-cli` で `PATH` に追加できます。何ができるかは [コマンドラインとエージェント](help://cli) を参照してください。
