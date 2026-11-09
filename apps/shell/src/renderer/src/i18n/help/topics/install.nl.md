<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Onyou Office installeren

[Releases-pagina](https://github.com/dodamworks/onyouoffice/releases/latest)

## Kies het bestand voor je computer

| Platform                                | Vereisten                                | Bestand                            |
| --------------------------------------- | ---------------------------------------- | ---------------------------------- |
| **Windows**                             | Windows 10 of nieuwer, 64-bits Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (bèta)**, Apple Silicon           | macOS 12 of nieuwer, M1-chip of nieuwer  | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (bèta)**, Intel                   | macOS 12 of nieuwer, Intel-processor     | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (bèta)**, elke distributie      | 64-bits (x86_64); glibc ≥ 2.35           | `OnyouOffice-<version>.AppImage`   |
| **Linux (bèta)**, Ubuntu/Debian-familie | 64-bits (x86_64); glibc ≥ 2.35           | `onyouoffice_<version>_amd64.deb`  |
| **Linux (bèta)**, Fedora/RHEL/openSUSE  | 64-bits (x86_64); glibc ≥ 2.35           | `onyouoffice-<version>.x86_64.rpm` |

## Op Windows

1. Download `OnyouOffice-Setup-<version>.exe` van de Releases-pagina.
2. Voer het uit. Het installatieprogramma heeft geen digitale handtekening, dus Windows kan eerst een blauw venster "Uw pc wordt beschermd" tonen. Kies **Meer informatie** en daarna **Toch uitvoeren**. De precieze tekst hangt af van je Windows-versie.
3. Volg het installatieprogramma tot het einde.

Het zet Onyou Office in het Startmenu en registreert `.docx`, `.xlsx`, `.pptx`, `.pdf` en soortgelijke, zodat een dubbelklik op een bestand het opent.

Omdat het installatieprogramma niet is ondertekend, voer je alleen een exemplaar uit dat je van de Releases-pagina hierboven hebt gedownload.

## Als Windows de download of de installatie blokkeert

### Edge zegt dat het bestand "niet vaak wordt gedownload"

Microsoft Defender SmartScreen waarschuwt zo voor een bestand dat het nog niet door veel mensen heeft zien downloaden. De handleiding van Microsoft om het bestand te behouden is:

1. Open de downloadlijst van Edge (**Ctrl+J**), druk naast het bestand op **…** en kies **Behouden**.
2. Druk in het venster dat opent op **Meer weergeven** en daarna op **Toch behouden**. Het bestand blijft in je map Downloads staan.

Dat venster heeft ook een knop die het bestand als veilig meldt. Die opent alleen de meldpagina van Microsoft (`feedback.smartscreen.microsoft.com`) en behoudt het bestand niet. Sluit die pagina en druk in plaats daarvan op **Meer weergeven** in het venster.

Heeft het venster geen **Meer weergeven** of geen **Toch behouden**:

- Op een pc die door een school of bedrijf wordt beheerd, kan de beheerder het overslaan van deze waarschuwingen uitschakelen (een Edge-beleid). Dan kan niemand op die pc het bestand behouden; vraag de beheerder het te installeren of toe te staan.
- Download je van de Releases-pagina in een andere browser, dan krijg je hetzelfde bestand.

### Er verschijnt een venster "Uw pc wordt beschermd"

Microsoft Defender SmartScreen toont dit venster de eerste keer dat het een installatieprogramma zonder handtekening ziet. Druk op **Meer informatie** en er verschijnt een knop **Toch uitvoeren**. Op een pc die door een school of bedrijf wordt beheerd, kan een beheerdersinstelling die knop verbergen; vraag het de beheerder.

## Op een Mac (bèta)

Je hebt macOS 12 (Monterey) of nieuwer nodig. De Mac-versie heeft geen ontwikkelaarshandtekening van Apple, dus de eerste keer dat je hem opent, zegt macOS dat niet kan worden gecontroleerd of de app vrij is van malware en opent het hem niet. Sta hem eenmalig toe, zoals hieronder.

1. Open het dmg-bestand en sleep `Onyou Office.app` naar de map **Programma's**.
2. Open Onyou Office vanuit de map Programma's. Druk op **Gereed** wanneer de waarschuwing verschijnt.
3. Open **Systeeminstellingen ▸ Privacy en beveiliging**. Druk onderaan, naast de regel die zegt dat Onyou Office is geblokkeerd, op **Open toch** en voer je Mac-wachtwoord in. De knop is ongeveer een uur zichtbaar nadat je de app probeerde te openen.
4. Druk in het venster dat opnieuw verschijnt op **Open**. Vanaf dan opent hij zonder waarschuwing.

Op macOS 12 is de plek **Systeemvoorkeuren ▸ Beveiliging en privacy ▸ Algemeen**, en daar heet de knop **Open toch**.

Zegt macOS dat de app niet wordt ondersteund op deze Mac, controleer dan twee dingen:

- Een Intel-Mac kan het Apple Silicon-bestand (`-arm64.dmg`) niet uitvoeren. Kijk bij "Processor" onder **Over deze Mac**, verwijder de app die je hebt geïnstalleerd en installeer in plaats daarvan het `-x64.dmg`-bestand.
- macOS 11 of ouder kan Onyou Office niet uitvoeren. **Over deze Mac** toont ook de macOS-versie.

Verder op een Mac:

- De AI-verbindingskaarten hebben geen installatieknop. Volg de link naar de officiële installatiegids op de kaart om Claude Code of Codex te installeren. De Claude-desktopapp is niet Claude Code, dus Claude Code moet je ook apart installeren als de desktopapp er al is.
- Inloggen wordt in de browser afgerond. Vraagt de browser je een code te plakken, voer dan zelf `claude auth login` of `codex login` uit in Terminal. Zie [Abonnementsverbinding](help://subscription).

## Op Linux (bèta)

- **AppImage**: maak het uitvoerbaar (`chmod +x OnyouOffice-<version>.AppImage`) en voer het bestand uit. Er is geen installatiestap.
- **deb**: installeer met `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: installeer met `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. Gebruik op openSUSE `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

De deb- en rpm-pakketten installeren naar `/opt/Onyou Office` en koppelen het terminalcommando `/usr/bin/onyouoffice`. Net als op een Mac hebben de AI-verbindingskaarten geen installatieknop, en als inloggen om een code vraagt, voer je zelf `claude auth login` of `codex login` uit in een terminal.

## Updates

[Releases-pagina](https://github.com/dodamworks/onyouoffice/releases/latest)

## De build die je draait

**Instellingen ▸ Over** is waar de app meldt welke versie je hebt, welk kanaal hij volgt en waar het project woont. Daar staat ook op welk opensourceproject deze app is gebaseerd.

## De opdrachtregel zit erbij

Elke installatie bevat een `onyouoffice`-commando dat met dezelfde engines praat als het venster, zodat de twee nooit over een bestand het oneens zijn. `onyouoffice install-cli` zet het in je `PATH`. Wat het kan doen, lees je in [Opdrachtregel en agents](help://cli).
