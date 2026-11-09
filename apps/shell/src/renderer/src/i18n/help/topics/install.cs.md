<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Instalace Onyou Office

[stránce Releases](https://github.com/dodamworks/onyouoffice/releases/latest)

## Vyberte soubor pro svůj počítač

| Platforma                              | Požadavky                                   | Soubor                             |
| -------------------------------------- | ------------------------------------------- | ---------------------------------- |
| **Windows**                            | Windows 10 nebo novější, 64bitový Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon          | macOS 12 nebo novější, čip M1 nebo novější  | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                  | macOS 12 nebo novější, procesor Intel       | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, libovolná distribuce | 64bitový (x86_64); glibc ≥ 2.35             | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, rodina Ubuntu/Debian | 64bitový (x86_64); glibc ≥ 2.35             | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE | 64bitový (x86_64); glibc ≥ 2.35             | `onyouoffice-<version>.x86_64.rpm` |

## V systému Windows

1. Stáhněte soubor `OnyouOffice-Setup-<version>.exe` ze stránky Releases.
2. Spusťte ho. Instalátor není digitálně podepsaný, takže Windows může nejprve zobrazit modré okno „Systém Windows ochránil váš počítač“. Zvolte **Další informace** a potom **Přesto spustit**. Přesné znění závisí na verzi Windows.
3. Projděte instalátor až do konce.

Instalátor umístí Onyou Office do nabídky Start a zaregistruje `.docx`, `.xlsx`, `.pptx`, `.pdf` a podobné, takže dvojklik na soubor jej otevře.

Protože instalátor není podepsaný, spouštějte jen ten, který jste stáhli z výše uvedené stránky Releases.

## Když Windows zablokuje stažení nebo instalaci

### Edge hlásí, že soubor „se obvykle nestahuje“

Microsoft Defender SmartScreen takto varuje před souborem, který zatím stáhlo jen málo lidí. Podle návodu Microsoftu soubor zachováte takto:

1. Otevřete seznam stahování v Edge (**Ctrl+J**), stiskněte vedle souboru **…** a zvolte **Zachovat**.
2. V okně, které se otevře, stiskněte **Zobrazit více** a potom **Přesto zachovat**. Soubor zůstane ve složce Stažené soubory.

V tomto okně je také tlačítko, které soubor nahlásí jako bezpečný. Jen otevře stránku Microsoftu pro hlášení (`feedback.smartscreen.microsoft.com`) a soubor nezachová. Tu stránku zavřete a místo toho v okně stiskněte **Zobrazit více**.

Pokud v okně chybí **Zobrazit více** nebo **Přesto zachovat**:

- Na počítači, který spravuje škola nebo firma, může správce přeskakování těchto varování vypnout (zásada Edge). Pak soubor na tomto počítači nezachová nikdo; požádejte správce, aby aplikaci nainstaloval nebo ji povolil.
- Když soubor stáhnete ze stránky Releases v jiném prohlížeči, získáte stejný soubor.

### Zobrazí se okno „Systém Windows ochránil váš počítač“

Microsoft Defender SmartScreen zobrazí toto okno, když poprvé vidí nepodepsaný instalátor. Stiskněte **Další informace** a objeví se tlačítko **Přesto spustit**. Na počítači, který spravuje škola nebo firma, může toto tlačítko skrýt nastavení správce; obraťte se na správce.

## Na Macu (beta)

Potřebujete macOS 12 (Monterey) nebo novější. Verze pro Mac nemá vývojářský podpis Apple, takže při prvním otevření macOS oznámí, že nemůže ověřit, zda aplikace neobsahuje malware, a neotevře ji. Povolíte ji jednou, jak je uvedeno níže.

1. Otevřete soubor dmg a přetáhněte `Onyou Office.app` do složky **Aplikace**.
2. Otevřete Onyou Office ze složky Aplikace. Když se objeví varování, stiskněte **Hotovo**.
3. Otevřete **Nastavení systému ▸ Soukromí a zabezpečení**. Dole vedle řádku, který říká, že Onyou Office byl zablokován, stiskněte **Přesto otevřít** a zadejte heslo k Macu. Tlačítko se zobrazuje asi hodinu od chvíle, kdy jste se aplikaci pokusili otevřít.
4. V okně, které se znovu objeví, stiskněte **Otevřít**. Od té doby se otevírá bez varování.

V macOS 12 je to místo **Předvolby systému ▸ Zabezpečení a soukromí ▸ Obecné** a tlačítko je tam také **Přesto otevřít**.

Pokud macOS hlásí, že aplikace na tomto Macu není podporována, zkontrolujte dvě věci:

- Mac s procesorem Intel nedokáže spustit soubor pro Apple Silicon (`-arm64.dmg`). Podívejte se na „Procesor“ v okně **O tomto Macu**, nainstalovanou aplikaci smažte a místo ní nainstalujte soubor `-x64.dmg`.
- V macOS 11 nebo starším Onyou Office nespustíte. Verzi macOS také ukazuje **O tomto Macu**.

Dále na Macu:

- Karty připojení AI nemají tlačítko instalace. Claude Code nebo Codex nainstalujete podle odkazu na oficiální návod k instalaci na kartě. Desktopová aplikace Claude není Claude Code, takže Claude Code je potřeba nainstalovat zvlášť, i když desktopovou aplikaci už máte.
- Přihlášení se dokončí v prohlížeči. Pokud vás prohlížeč požádá o vložení kódu, spusťte sami v Terminálu `claude auth login` nebo `codex login`. Viz [Připojení předplatného](help://subscription).

## V Linuxu (beta)

- **AppImage**: nastavte mu právo ke spuštění (`chmod +x OnyouOffice-<version>.AppImage`) a soubor spusťte. Žádný krok instalace není.
- **deb**: nainstalujte příkazem `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: nainstalujte příkazem `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. V openSUSE použijte `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Balíčky deb a rpm se instalují do `/opt/Onyou Office` a propojují příkaz terminálu `/usr/bin/onyouoffice`. Stejně jako na Macu nemají karty připojení AI tlačítko instalace, a když přihlášení požádá o kód, spustíte sami v terminálu `claude auth login` nebo `codex login`.

## Aktualizace

[stránce Releases](https://github.com/dodamworks/onyouoffice/releases/latest)

## Sestavení, které právě běží

**Nastavení ▸ O aplikaci** je místo, kde aplikace oznamuje verzi, kterou máte, kanál, který sleduje, a kde projekt sídlí. Uvádí také open-source projekt, na kterém je tato aplikace založena.

## Příkazová řádka je součástí

Každá instalace obsahuje příkaz `onyouoffice`, který mluví se stejnými enginy jako okno, takže se oba na souboru vždy shodnou. `onyouoffice install-cli` jej umístí do vaší `PATH`. Co umí, se dozvíte v kapitole [Příkazová řádka a agenti](help://cli).
