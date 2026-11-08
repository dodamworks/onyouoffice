<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Onyou Office installieren

[Releases-Seite](https://github.com/dodamworks/onyouoffice/releases/latest)

## Die Datei für Ihren Rechner wählen

| Plattform                                | Voraussetzungen                         | Datei                              |
| ---------------------------------------- | --------------------------------------- | ---------------------------------- |
| **Windows**                              | Windows 10 oder neuer, 64-Bit Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (Beta)**, Apple Silicon            | macOS 12 oder neuer, Chip M1 oder neuer | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (Beta)**, Intel                    | macOS 12 oder neuer, Intel-Prozessor    | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (Beta)**, jede Distribution      | 64-Bit (x86_64); glibc ≥ 2.35           | `OnyouOffice-<version>.AppImage`   |
| **Linux (Beta)**, Ubuntu-/Debian-Familie | 64-Bit (x86_64); glibc ≥ 2.35           | `onyouoffice_<version>_amd64.deb`  |
| **Linux (Beta)**, Fedora/RHEL/openSUSE   | 64-Bit (x86_64); glibc ≥ 2.35           | `onyouoffice-<version>.x86_64.rpm` |

## Unter Windows

1. Laden Sie `OnyouOffice-Setup-<version>.exe` von der Releases-Seite herunter.
2. Führen Sie die Datei aus. Das Installationsprogramm ist nicht codesigniert; Windows zeigt deshalb möglicherweise zuerst ein blaues Fenster „Der Computer wurde durch Windows geschützt“. Wählen Sie **Weitere Informationen** und dann **Trotzdem ausführen**. Der genaue Wortlaut hängt von Ihrer Windows-Version ab.
3. Folgen Sie dem Installationsprogramm bis zum Ende.

Es legt Onyou Office im Startmenü ab und registriert `.docx`, `.xlsx`, `.pptx`, `.pdf` und Verwandte, sodass ein Doppelklick auf eine Datei sie öffnet.

Weil das Installationsprogramm nicht signiert ist, führen Sie nur eines aus, das Sie von der oben genannten Releases-Seite heruntergeladen haben.

## Wenn Windows den Download oder die Installation blockiert

### Edge meldet, die Datei werde „nicht häufig heruntergeladen“

So warnt Microsoft Defender SmartScreen vor einer Datei, die bisher nur wenige Menschen heruntergeladen haben. Laut der Anleitung von Microsoft behalten Sie die Datei so:

1. Öffnen Sie die Download-Liste von Edge (**Strg+J**), klicken Sie neben der Datei auf **…** und wählen Sie **Beibehalten**.
2. Klicken Sie in dem Fenster, das sich öffnet, auf **Mehr anzeigen** und dann auf **Trotzdem beibehalten**. Die Datei bleibt in Ihrem Ordner „Downloads“.

Dieses Fenster hat außerdem eine Schaltfläche, mit der Sie die Datei als sicher melden. Sie öffnet nur die Meldeseite von Microsoft (`feedback.smartscreen.microsoft.com`) und behält die Datei nicht. Schließen Sie diese Seite und klicken Sie stattdessen im Fenster auf **Mehr anzeigen**.

Fehlt im Fenster **Mehr anzeigen** oder **Trotzdem beibehalten**:

- Auf einem PC, den eine Schule oder Firma verwaltet, kann der Administrator das Übergehen dieser Warnungen abschalten (eine Edge-Richtlinie). Dann kann niemand auf diesem PC die Datei behalten; bitten Sie den Administrator, sie zu installieren oder freizugeben.
- Wenn Sie die Datei in einem anderen Browser von der Releases-Seite herunterladen, erhalten Sie dieselbe Datei.

### Ein Fenster „Der Computer wurde durch Windows geschützt“ erscheint

Microsoft Defender SmartScreen zeigt dieses Fenster, wenn es ein nicht signiertes Installationsprogramm zum ersten Mal sieht. Klicken Sie auf **Weitere Informationen**, dann erscheint die Schaltfläche **Trotzdem ausführen**. Auf einem PC, den eine Schule oder Firma verwaltet, kann eine Administratoreinstellung diese Schaltfläche ausblenden; wenden Sie sich dann an den Administrator.

## Auf einem Mac (Beta)

Sie benötigen macOS 12 (Monterey) oder neuer. Die Mac-Version hat keine Entwicklersignatur von Apple. Deshalb meldet macOS beim ersten Öffnen, es könne nicht überprüfen, ob die App frei von Schadsoftware ist, und öffnet sie nicht. Erlauben Sie sie einmalig, wie unten beschrieben.

1. Öffnen Sie die dmg-Datei und ziehen Sie `Onyou Office.app` in den Ordner **Programme**.
2. Öffnen Sie Onyou Office aus dem Ordner „Programme“. Wenn die Warnung erscheint, klicken Sie auf **Fertig**.
3. Öffnen Sie **Systemeinstellungen ▸ Datenschutz & Sicherheit**. Klicken Sie weiter unten neben der Zeile, die besagt, dass Onyou Office blockiert wurde, auf **Dennoch öffnen** und geben Sie Ihr Mac-Passwort ein. Die Schaltfläche erscheint etwa eine Stunde lang, nachdem Sie versucht haben, die App zu öffnen.
4. Klicken Sie im erneut erscheinenden Fenster auf **Öffnen**. Danach öffnet sie sich ohne Warnung.

Unter macOS 12 finden Sie die Stelle unter **Systemeinstellungen ▸ Sicherheit ▸ Allgemein**, und die Schaltfläche heißt dort ebenfalls **Dennoch öffnen**.

Meldet macOS, die App werde auf diesem Mac nicht unterstützt, prüfen Sie zwei Dinge:

- Ein Intel-Mac kann die Datei für Apple Silicon (`-arm64.dmg`) nicht ausführen. Sehen Sie unter **Über diesen Mac** bei „Prozessor“ nach, löschen Sie die installierte App und installieren Sie stattdessen die Datei `-x64.dmg`.
- Unter macOS 11 oder älter läuft Onyou Office nicht. **Über diesen Mac** zeigt auch die macOS-Version.

Außerdem auf dem Mac:

- Die KI-Verbindungskarten haben keine Installationsschaltfläche. Folgen Sie dem Link zur offiziellen Installationsanleitung auf der Karte, um Claude Code oder Codex zu installieren.
- Die Anmeldung wird im Browser abgeschlossen. Fordert der Browser Sie auf, einen Code einzufügen, führen Sie `claude auth login` oder `codex login` selbst im Terminal aus. Siehe [Abonnement-Verbindung](help://subscription).

## Unter Linux (Beta)

- **AppImage**: Machen Sie die Datei ausführbar (`chmod +x OnyouOffice-<version>.AppImage`) und starten Sie sie. Es gibt keinen Installationsschritt.
- **deb**: Installieren Sie mit `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: Installieren Sie mit `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. Unter openSUSE verwenden Sie `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Die Pakete deb und rpm werden nach `/opt/Onyou Office` installiert und verknüpfen den Terminal-Befehl `/usr/bin/onyouoffice`. Wie auf dem Mac haben die KI-Verbindungskarten keine Installationsschaltfläche, und wenn eine Anmeldung nach einem Code fragt, führen Sie `claude auth login` oder `codex login` selbst in einem Terminal aus.

## Updates

[Releases-Seite](https://github.com/dodamworks/onyouoffice/releases/latest)

## Der Build, den Sie ausführen

**Einstellungen ▸ Über** ist der Ort, an dem die App meldet, welche Version Sie haben, welchem Kanal sie folgt und wo das Projekt zu Hause ist. Dort steht auch, auf welchem Open-Source-Projekt diese App basiert.

## Die Kommandozeile ist dabei

Jede Installation bringt den Befehl `onyouoffice` mit, der mit denselben Engines spricht wie das Fenster: Die beiden können sich bei einer Datei also nicht widersprechen. `onyouoffice install-cli` legt ihn in Ihren `PATH`. Was er kann, steht in [Kommandozeile und Agenten](help://cli).
