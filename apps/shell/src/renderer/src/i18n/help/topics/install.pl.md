<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Instalacja Onyou Office

[stronie Releases](https://github.com/dodamworks/onyouoffice/releases/latest)

## Wybierz plik dla swojego komputera

| Platforma                               | Wymagania                                  | Plik                               |
| --------------------------------------- | ------------------------------------------ | ---------------------------------- |
| **Windows**                             | Windows 10 lub nowszy, 64-bitowy Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon           | macOS 12 lub nowszy, układ M1 lub nowszy   | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                   | macOS 12 lub nowszy, procesor Intel        | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, dowolna dystrybucja   | 64-bitowy (x86_64); glibc ≥ 2.35           | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, rodzina Ubuntu/Debian | 64-bitowy (x86_64); glibc ≥ 2.35           | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE  | 64-bitowy (x86_64); glibc ≥ 2.35           | `onyouoffice-<version>.x86_64.rpm` |

## W systemie Windows

1. Pobierz plik `OnyouOffice-Setup-<version>.exe` ze strony Releases.
2. Uruchom go. Instalator nie ma podpisu cyfrowego, więc Windows może najpierw wyświetlić niebieskie okno „System Windows ochronił ten komputer”. Wybierz **Więcej informacji**, a potem **Uruchom mimo to**. Dokładne brzmienie zależy od wersji systemu Windows.
3. Przejdź przez instalator do końca.

Instalator umieszcza Onyou Office w menu Start i rejestruje `.docx`, `.xlsx`, `.pptx`, `.pdf` i podobne, więc dwuklik na plik go otwiera.

Ponieważ instalator nie jest podpisany, uruchamiaj tylko taki, który został pobrany z podanej wyżej strony Releases.

## Gdy system Windows blokuje pobieranie lub instalację

### Edge informuje, że plik „nie jest często pobierany”

Microsoft Defender SmartScreen ostrzega w ten sposób przed plikiem, którego nie pobrało jeszcze wiele osób. Według przewodnika Microsoftu plik zachowuje się tak:

1. Otwórz listę pobrań w Edge (**Ctrl+J**), naciśnij **…** obok pliku i wybierz **Zachowaj**.
2. W oknie, które się otworzy, naciśnij **Pokaż więcej**, a potem **Zachowaj mimo to**. Plik zostanie w folderze Pobrane.

To okno ma też przycisk zgłaszający plik jako bezpieczny. Otwiera on tylko stronę zgłoszeń Microsoftu (`feedback.smartscreen.microsoft.com`) i nie zachowuje pliku. Zamknij tę stronę i zamiast tego naciśnij **Pokaż więcej** w oknie.

Jeśli w oknie nie ma przycisku **Pokaż więcej** albo **Zachowaj mimo to**:

- Na komputerze zarządzanym przez szkołę lub firmę administrator może wyłączyć pomijanie tych ostrzeżeń (zasada Edge). Wtedy nikt na tym komputerze nie może zachować pliku; poproś administratora, aby go zainstalował lub na niego zezwolił.
- Pobranie ze strony Releases w innej przeglądarce daje ten sam plik.

### Pojawia się okno „System Windows ochronił ten komputer”

Microsoft Defender SmartScreen wyświetla to okno przy pierwszym spotkaniu z niepodpisanym instalatorem. Naciśnij **Więcej informacji**, a pojawi się przycisk **Uruchom mimo to**. Na komputerze zarządzanym przez szkołę lub firmę ustawienie administratora może ukryć ten przycisk; zwróć się do administratora.

## Na Macu (beta)

Potrzebny jest macOS 12 (Monterey) lub nowszy. Wersja dla Maca nie ma podpisu programisty Apple, więc przy pierwszym otwarciu macOS informuje, że nie może sprawdzić, czy aplikacja jest wolna od złośliwego oprogramowania, i jej nie otwiera. Zezwól na nią jednorazowo, jak poniżej.

1. Otwórz plik dmg i przeciągnij `Onyou Office.app` do folderu **Programy**.
2. Otwórz Onyou Office z folderu Programy. Gdy pojawi się ostrzeżenie, naciśnij **Gotowe**.
3. Otwórz **Ustawienia systemowe ▸ Prywatność i ochrona**. Przy dole, obok wiersza informującego, że Onyou Office zablokowano, naciśnij **Otwórz mimo to** i wpisz hasło do Maca. Przycisk jest widoczny przez mniej więcej godzinę od próby otwarcia aplikacji.
4. W oknie, które pojawi się ponownie, naciśnij **Otwórz**. Od tej chwili otwiera się bez ostrzeżenia.

W macOS 12 to miejsce to **Preferencje systemowe ▸ Ochrona i prywatność ▸ Ogólne**, a przycisk nazywa się tam **Otwórz mimo to**.

Jeśli macOS informuje, że aplikacja nie jest obsługiwana na tym Macu, sprawdź dwie rzeczy:

- Mac z procesorem Intel nie uruchomi pliku dla Apple Silicon (`-arm64.dmg`). Sprawdź pozycję „Procesor” w oknie **Ten Mac**, usuń zainstalowaną aplikację i zainstaluj zamiast niej plik `-x64.dmg`.
- macOS 11 lub starszy nie uruchomi Onyou Office. Okno **Ten Mac** pokazuje też wersję macOS.

Ponadto na Macu:

- Karty połączenia z AI nie mają przycisku instalacji. Aby zainstalować Claude Code lub Codex, skorzystaj z odnośnika do oficjalnego przewodnika instalacji na karcie.
- Logowanie kończy się w przeglądarce. Jeśli przeglądarka poprosi o wklejenie kodu, samodzielnie uruchom w Terminalu `claude auth login` lub `codex login`. Zobacz [Połączenie z subskrypcją](help://subscription).

## W systemie Linux (beta)

- **AppImage**: nadaj mu uprawnienia do uruchamiania (`chmod +x OnyouOffice-<version>.AppImage`) i uruchom plik. Nie ma kroku instalacji.
- **deb**: zainstaluj poleceniem `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: zainstaluj poleceniem `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. W systemie openSUSE użyj polecenia `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Pakiety deb i rpm instalują się w `/opt/Onyou Office` i dołączają polecenie terminala `/usr/bin/onyouoffice`. Podobnie jak na Macu, karty połączenia z AI nie mają przycisku instalacji, a gdy logowanie prosi o kod, samodzielnie uruchamiasz w terminalu `claude auth login` lub `codex login`.

## Aktualizacje

[stronie Releases](https://github.com/dodamworks/onyouoffice/releases/latest)

## Kompilacja, którą uruchamiasz

**Ustawienia ▸ O aplikacji** to miejsce, w którym aplikacja zgłasza posiadaną wersję, kanał, za którym podąża, i to, gdzie mieszka projekt. Podaje też nazwę projektu open source, na którym ta aplikacja jest oparta.

## Wiersz poleceń jest w zestawie

Każda instalacja zawiera polecenie `onyouoffice`, które komunikuje się z tymi samymi silnikami co okno, więc oba nigdy nie różnią się w ocenie pliku. `onyouoffice install-cli` umieszcza je w `PATH`. Co potrafi, dowiesz się w rozdziale [Wiersz poleceń i agenci](help://cli).
