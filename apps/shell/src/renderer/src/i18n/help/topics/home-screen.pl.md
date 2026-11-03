# Ekran strony głównej: gdzie mieszkają Twoje pliki

Strona główna to punkt wyjścia GenOffice: pasek nawigacyjny po lewej, listy plików i karty szybkiego tworzenia po prawej.

## Nawigacja na pasku bocznym

- **Ostatnie**: pliki, które ostatnio otwierałeś. Każdy wiersz ma na sobie czas — dzisiaj, wczoraj albo datę.
- **Ulubione**: pliki oznaczone gwiazdką. Najedź na wiersz pliku i kliknij gwiazdkę, aby dodać lub usunąć plik. **Przenieś do grupy** w menu ⋯ porządkuje pliki z gwiazdką w nazwane grupy; widok Oznaczone filtruje po nich.
- **Podręcznik użytkownika**: otwiera ten podręcznik.
- **Magazyn wiedzy**: Domyślnym źródłem są dokumenty zarejestrowane w aplikacji: ostatnie i ulubione pliki, dodane foldery oraz projekty. Nie przeszukuje to całego komputera.
- **Projekty**: foldery (projekty), z którymi może pracować AI. Utwórz projekt lub użyj istniejącego folderu i otwórz go, aby zarządzać jego instrukcjami, pamięcią, plikami i rozmowami. Zobacz [Projekty](help://projects).
- **Foldery**: katalogi dodane do paska bocznego przyciskiem **Dodaj folder…** albo przeciągnięte tam z menedżera plików. Każdy staje się katalogiem głównym, który można otworzyć, utworzyć w nim podfoldery, zmienić jego nazwę i usunąć; ten, który przestanie być dostępny, jest oznaczany jako niedostępny i można go zdjąć z listy. **Nowy folder** tworzy kolejny.
- **Wiersz na dole**: pokazuje, czy AI jest połączone — **Połącz AI** albo nazwę połączonej subskrypcji — i otwiera Ustawienia.

Nie ma tu pozycji Kosz. Usunięte pliki trafiają do kosza systemowego, a ich przywrócenie to zadanie systemu operacyjnego.

## Lista plików

Każdy wiersz pokazuje ikonę, nazwę pliku, czas modyfikacji i inne dane. **⋯ menu** w wierszu oferuje:

- **Otwórz**, a także **Pokaż w folderze**, aby zlokalizować plik w menedżerze plików.
- **Kopiuj ścieżkę**.
- **Przenieś do folderu…**: otwiera wybór folderu i naprawdę przenosi plik; jeśli w miejscu docelowym jest już plik o tej nazwie, możesz go pominąć, nadpisać albo zmienić jego nazwę.
- **Zmień nazwę**: zmiana w miejscu, rozszerzenie zachowywane automatycznie.
- **Dodaj do ulubionych / Usuń z ulubionych** — gwiazdki pozostają po restarcie i towarzyszą plikowi także po jego przemianowaniu.
- **Utwórz kopię**: tworzy kopię w tym samym folderze.
- **Usuń**: przenosi plik do kosza systemowego — to nie jest trwałe usunięcie.
- **Usuń z listy**, w głównym widoku **Ostatnie**, aby zniknęła pozycja bez ruszania pliku.

### Wiele plików naraz

Zaznacz pole wyboru w wierszu lub kliknij ⌘/ctrl, aby zbudować zaznaczenie; pole w nagłówku zaznacza wszystko, co jest teraz na liście, a pasek nad listą podaje (**Wybrano: {n}**), ile plików jest zaznaczonych, i oferuje **Przenieś do folderu…** oraz **Usuń pliki** dla całego zestawu. Zaznaczenie wielokrotne możesz też przeciągnąć na folder w pasku bocznym.

## Wyszukiwanie

Pole wyszukiwania u góry filtruje naraz dwie rzeczy:

- **Nazwy plików**: szybkie filtrowanie po nazwie.
- **Zawartość plików**: GenOffice indeksuje Twoje pliki w tle (tekst w docx/odt/xlsx/pptx/pdf/md/html), więc wyszukiwanie po treści znajduje również pliki. Zakres i przełączniki ustawia się w ustawieniach wyszukiwania.

## Karty szybkiego startu

Karty nad listami tworzą nowy dokument jednym krokiem. Kliknięcie karty tworzy plik danego typu i otwiera jego edytor — możesz od razu pisać albo pozwolić, aby AI przygotował wstęp (każdy edytor ma **przycisk AI** na wstążce oraz **Zapytaj AI** w menu kontekstowym zaznaczenia).

Nowy plik trafia do folderu aktualnie zaznaczonego na pasku bocznym; jeśli nic nie jest zaznaczone, trafia do folderu domyślnego.

Aby ukryć karty lub zmienić ich kolejność, użyj **Nowe dokumenty na stronie głównej** w Ustawienia → Ogólne. Wyłączony typ znika tylko z kart i z menu Nowy; pliki tego typu nadal się otwierają. Na stronie głównej ⌘N/Ctrl+N tworzy pierwszy wciąż widoczny typ.

Co robi każda karta:

- **AI Docs** (.docx): pusty dokument tekstowy w edytorze Docs. Plik zostaje zapisany na dysku dopiero przy **pierwszym zapisaniu**; nowe dokumenty otwierają się z rozwiniętym panelem AI (wyłączasz to w Ustawienia → „Otwieraj panel AI w nowych dokumentach”).
- **AI Sheets** (.xlsx): pusty arkusz w edytorze Sheets. Dopóki nie zapiszesz, na dysku nie ma żadnego pliku — nazwa jest zarezerwowana na pierwsze zapisanie; po pierwszym wygenerowaniu przez AI plik można też automatycznie zmienić na podstawie jego zawartości.
- **AI Slides** (.pptx): pusta prezentacja w edytorze Slides.
- **AI Markdown** (.md): pusty dokument Markdown w edytorze Markdown.
- **AI HTML** (.html): pusta strona internetowa w edytorze HTML.
- **AI PDF** (.pdf): inaczej niż pozostałe — **natychmiast** tworzy prawdziwy pusty plik PDF o jednej stronie w folderze docelowym i otwiera go jako zwykły plik (edytor PDF pracuje na prawdziwych plikach). Dobra do nanoszenia adnotacji, zaciemniania i dodawania tekstu; przy pierwszym zapisaniu plik można automatycznie zmienić na podstawie jego zawartości.
- **Otwórz plik lokalny**: systemowy selektor plików dla programów Word (.docx/.doc/.odt), Excel (.xlsx/.xlsm/.xls/.csv/.tsv), PowerPoint (.pptx/.ppt), PDF, Markdown (.md/.markdown) i stron internetowych (.html/.htm). Można zaznaczyć kilka plików; każdy dostaje własną kartę. Pliki tekstowe (.txt, .json) też tu się otwierają — trafiają do widoku źródła edytora Markdown.

> Wskazówka: Plik ▸ Nowy na pasku menu tworzy te same typy dokumentów (⌘N/Ctrl+N domyślnie tworzy dokument tekstowy); przeciągnięcie pliku do okna otwiera go.

## Magazyn wiedzy

- Domyślnym źródłem są dokumenty zarejestrowane w aplikacji: ostatnie i ulubione pliki, dodane foldery oraz projekty. Nie przeszukuje to całego komputera.
- Nad polem wpisywania wybierz zarejestrowane dokumenty, projekt, konkretne dokumenty lub ulubione. Zmiana źródła rozpoczyna nową rozmowę i anuluje pytania oczekujące na połączenie.
- Połącz AI w Ustawienia → AI. Nazwy i istotna treść wybranego źródła mogą trafić do dostawcy AI. Ukryte i wykluczone pliki projektu pozostają wykluczone. Odpowiedzi wskazują źródła.
- Rozmowy projektu są zapisywane w jego folderze. Pozostałe są tylko w pamięci i znikają po zamknięciu aplikacji.
