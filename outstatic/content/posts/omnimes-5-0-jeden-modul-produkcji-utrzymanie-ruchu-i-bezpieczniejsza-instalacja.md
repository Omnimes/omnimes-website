---
title: 'OmniMES 5.0: jeden moduł produkcji, utrzymanie ruchu i bezpieczniejsza instalacja'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'omnimes-5-0-jeden-modul-produkcji-utrzymanie-ruchu-i-bezpieczniejsza-instalacja'
description: 'OmniMES 5.0: Produkcja jest jedynym modułem zleceń, a zlecenia z ERP trafiają prosto do niej. Dochodzi Utrzymanie ruchu z przeglądami, MTBF i MTTR ze zgłoszeń oraz osią zdarzeń maszyn z notatkami, alarmy z Teams, Slackiem i eskalacją, jedna konfiguracja AI, kopie zapasowe z testem odtworzenia i aktualizacja z automatycznym wycofaniem. Opisujemy zmiany i to, co sprawdzić przed aktualizacją.'
coverImage: '/images/post-omnimes-5-0/cover-omnimes-5-0-pl.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"omniEnergy","label":"OmniEnergy"},{"value":"AI","label":"AI"},{"value":"cra","label":"CRA"}]
publishedAt: '2026-11-22T19:00:00.000Z'
---

Od dziś dostępny jest OmniMES 5.0. Zmiana pierwszej cyfry ma u nas konkretne znaczenie: według [polityki wydań](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/instalacja-wersja-on-premise-2tAS575nLs) oznacza wersję, która przy aktualizacji wymaga dodatkowych kroków. W 5.0 jest ich kilka naraz: nowa wersja brokera MQTT z kontami urządzeń, nowy Redash, osobne konta bazy danych dla każdej usługi, Python 3.12 w API i aktualizacja, która przy błędzie sama wraca do poprzedniej wersji.

Dla osób pracujących na co dzień w systemie najważniejsze są trzy zmiany. Produkcja stała się jedynym modułem zleceń, a zlecenia z ERP trafiają prosto do niej. Doszła grupa Utrzymanie ruchu: zgłoszenia awarii z panelu operatora, zlecenia serwisowe, przeglądy według kalendarza i motogodzin, MTBF i MTTR liczone ze zgłoszeń oraz Zdarzenia maszyn, czyli jedna oś czasu z notatkami przy awariach i postojach. Alarmy dostały reguły na sygnałach maszyn, powiadomienia w Microsoft Teams i Slacku oraz eskalację. Poniżej opisujemy wszystkie obszary po kolei, a na końcu to, co warto sprawdzić przed aktualizacją.

## Produkcja: jeden moduł zleceń

W wersji 4.14 pojawił się moduł Produkcja z marszrutami, harmonogramem i panelem operatora, ale obok niego działała jeszcze dawna Lista zleceń. W 5.0 Produkcja jest włączona na każdej instalacji i jest jedynym miejscem pracy ze zleceniami. Lista zleceń, stary harmonogram i ekran Konfiguracja czasu pracy znikają z menu, a ich dawne adresy prowadzą do nowych ekranów. Monitoring i analizy maszyn działają tak jak wcześniej.

- **Zlecenia z ERP w Produkcji.** Lista *Zlecenia produkcyjne* ma filtr *Źródło: z ERP*, kafelek *Meldunki z błędem* oraz kolumny opóźnienia i ostatniego meldunku do ERP. Odbiorca i priorytet przychodzą z ERP jako zwykłe pola mapowania, a szczegóły zlecenia mają zakładkę *ERP* z numerem i statusem w systemie źródłowym.
- **Kalendarz produkcji.** Widok miesiąca, tygodnia i dnia z linią „teraz” oraz panelem *Teraz w produkcji*. To szybki podgląd tego, co dzieje się na hali i co jest zaplanowane.
- **Kalendarz zasobów.** Zmiany dla całego zakładu, parku, linii albo pojedynczej maszyny, wyjątki (święta, postoje, dodatkowe zmiany) i podgląd dostępności są w jednym ekranie *Konfiguracji produkcji*. System ostrzega o zasobach bez ustawionego czasu pracy.
- **Planista co-jeśli.** Aplikacja porównuje do pięciu wariantów planu: postój zasobu, dodatkową zmianę, inne priorytety albo terminy. Symulacja niczego nie zapisuje. Wybrany wariant zatwierdza się w Harmonogramie razem z założeniami, a postoje i dodatkowe zmiany trafiają wtedy do Kalendarza zasobów.
- **Raporty w jednym miejscu.** *Wygeneruj raport*, *Wygenerowane raporty* i *Raporty cykliczne* zastępują trzy wcześniejsze ścieżki. OEE, dostępność, czas pracy i MTBF liczy jedna funkcja. Maszyna z kalendarzem zmian jest liczona według ISO 22400, a maszyna bez kalendarza tak jak dotąd: czas pracy podzielony przez sumę czasu pracy, przestojów i awarii.

### Panel operatora i zlecenie

- **Czas pracy na zleceniu.** Operator zaczyna i kończy pracę przyciskami *Zacznij pracę* i *Zakończ pracę*. Zlecenie pokazuje roboczogodziny według operatorów i etapów, raport *Realizacja zleceń* ma kolumnę czasu pracy operatorów, a meldunki do ERP przekazują ten czas dalej.
- **Poprawienie ostatniego meldunku.** Operator poprawia pomyłkę w czasie ustawionym w konfiguracji, a kierownik także później, podając powód. Korekta trafia do historii zlecenia i do Dziennika zdarzeń.
- **Instrukcje stanowiskowe.** Instrukcja z załącznikami (PDF, zdjęcia, wideo MP4) jest przypisana do maszyny albo linii, wyrobu i etapu marszruty. Ma wersje: szkic, zatwierdzenie i wycofanie z powodem, a w danej chwili obowiązuje jedna wersja. Panel operatora może wymagać potwierdzenia zapoznania się z instrukcją przed startem etapu, raz na wersję i osobę.
- **Powiadomienia o zleceniu.** E-mail przy starcie i przy zakończeniu zlecenia trafia do osób przypisanych do zlecenia oraz na adresy spoza systemu. Wiadomość zawiera m.in. energię zlecenia i przycisk, który otwiera je w OmniMES.

Szczegóły: [Kalendarz produkcji](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/kalendarz-produkcji-CUxELiUeZt), [Panel operatora](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/panel-operatora-wvCZ1cDcB9), [Konfiguracja produkcji](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/konfiguracja-produkcji-0G0UmLbVGX), [Harmonogram](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/harmonogram-gantt-OMaGTEheEU).

## Utrzymanie ruchu

Nowa grupa menu *Utrzymanie ruchu* stoi zaraz po Produkcji i prowadzi awarię od zgłoszenia do potwierdzenia naprawy:

1. Operator klika *Zgłoś awarię* w panelu przy maszynie. Może dołączyć zdjęcie i powiązać zgłoszenie z bieżącym przestojem.
2. Wybrane osoby dostają powiadomienie w aplikacji i e-mailem. Gdy nikt nie przyjmie zgłoszenia, system przypomina o nim.
3. Kierownik przyjmuje zgłoszenie i tworzy zlecenie serwisowe dla technika albo grupy.
4. Technik na ekranie *Moje zlecenia* zapisuje czas pracy, części z kartoteki (z rozchodem z magazynu), notatki, przyczynę i wykonane działanie.
5. Produkcja potwierdza naprawę w panelu operatora albo odsyła zlecenie z informacją *Nie naprawione*.

Przeglądy planuje się według kalendarza (co określoną liczbę dni, tygodni albo miesięcy) albo według motogodzin. Licznik motogodzin liczy czas pracy z sygnału stanu maszyny, tak samo jak Monitoring i OEE, albo czyta wartość licznika z wybranego sygnału. Zlecenie przeglądu powstaje samo, gdy zbliża się termin.

MTBF i MTTR są liczone ze zgłoszeń awarii tą samą funkcją co wskaźniki z telemetrii w *Analiza → Czas pracy i OEE*, a opcja *Porównaj z telemetrią* pokazuje obie wartości obok siebie. Karta maszyny zbiera zgłoszenia, zlecenia, części i przeglądy na jednej osi czasu. Do katalogu raportów doszły trzy raporty: *Awarie i MTBF/MTTR*, *Realizacja przeglądów* oraz *Koszt utrzymania ruchu*.

### Zdarzenia maszyn

Dawna Historia zdarzeń zmieniła się w ekran *Zdarzenia maszyn* w grupie Utrzymanie ruchu. To jedna oś czasu maszyny, linii albo całego parku: awarie i postoje z przyczynami, alarmy, zgłoszenia awarii i zlecenia serwisowe, pauzy operatora i zmiany przyczyn przestojów. Awarie i postoje to te same odcinki co w OEE, z tym samym początkiem, końcem, przyczyną i rodzajem straty.

Przy awarii, postoju albo alarmie można zapisać notatkę: co się stało, co zrobiono, co sprawdzić następnym razem. Ta sama notatka jest widoczna na osi, na liście przestojów w *Czas pracy i OEE* i w historii maszyny na karcie w Utrzymaniu ruchu, więc nie trzeba jej przepisywać. Filtr *Bez notatki* razem z rodzajem *Awaria* pokazuje awarie, których nikt nie opisał. To gotowa lista na odprawę zmiany.

Ze zdarzenia można od razu przypisać przyczynę przestoju (OEE i Pareto przeliczają się od razu) albo zgłosić awarię powiązaną z tym przestojem, także już zakończonym. Początek awarii w zgłoszeniu jest wtedy początkiem przestoju, więc MTBF i MTTR ze zgłoszeń liczą prawdziwy czas awarii. Zdarzenia z bieżącymi filtrami eksportuje się do CSV (do 20 000 wierszy), a jeden widok obejmuje okres do 31 dni. Do grupy Utrzymanie ruchu trafił też ekran Alarmy.

Opis modułu: [Utrzymanie ruchu](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/utrzymanie-ruchu-u0oBxfY3rk), [Zdarzenia maszyn](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/zdarzenia-maszyn-eOUkscxZYm).

## Alarmy, powiadomienia i stan systemu

Ekran *Alarmy* zbiera reguły z całego systemu:

| Zakres | Reguły |
|---|---|
| Maszyna | brak danych z maszyny, postój maszyny |
| Sygnał | wartość powyżej albo poniżej progu, poza zakresem, zmiana w czasie, stan sygnału (z histerezą) |
| Energia | odchylenie EnPI od linii bazowej, CUSUM EnPI |
| Utrzymanie ruchu | nowe zgłoszenia awarii, przeglądy zbliżające się albo po terminie |
| System | brak danych ze streamu, mało miejsca na dysku, kopia zapasowa nieudana albo zaległa, kolejka zadań zatkana, błędy wysyłki poczty, usługa niedostępna, licencja wygasa |

Powiadomienia trafiają do aplikacji, na e-mail oraz na kanały Microsoft Teams i Slack. Reguła może mieć kilka poziomów eskalacji, a potwierdzenie alarmu z komentarzem zatrzymuje eskalację. Reguły maszyn mogą liczyć czas tylko w godzinach zmian z kalendarza zasobu, a wyciszenia ustawia się tygodniowo albo jednorazowo.

Wiadomości e-mail, m.in. raporty, automatyzacje OmniEnergy i alarmy, wysyła jedna usługa poczty. Zakładka *E-mail* pokazuje jej stan, pozwala wysłać wiadomość testową i wyświetla ostatnie wysyłki. Nieudana wysyłka jest ponawiana po 1, 5 i 15 minutach.

Nowy ekran *Administracja → Stan systemu* pokazuje w kafelkach API, bazę danych, kolejkę zadań, stream, broker MQTT, pocztę, dysk, kopię zapasową, licencję, serwer MCP i Redash. Administrator widzi baner 30, 14 i 7 dni przed końcem ważności licencji, a po tej dacie system działa jeszcze przez okres karencji (domyślnie 14 dni).

Szczegóły: [Alarmy](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/alarmy-AmkPFAPI0b), [Stan systemu](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/stan-systemu-b9J0QmhKUd), [Konfiguracja ogólna](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/konfiguracja-ogolna-RlKJVcXkdg).

## OmniEnergy

- **Wykres migawek EnPI** pokazuje na osi poziomej okres, którego dotyczy migawka, a nie chwilę jej wygenerowania. Podpowiedź podaje okres „od – do”.
- **Korekta przesuniętych okresów.** Przez błąd stref czasowych część okresów migawek EnB i EnPI zapisała się z przesunięciem o 1–2 godziny, np. 23:00 dnia poprzedniego zamiast północy. Polecenie korekty najpierw pokazuje plan, robi kopię zmienianych wierszy i pozwala cofnąć zmianę. Uruchamiamy je przy aktualizacji, po przejrzeniu planu. Rekordy niejednoznaczne zostają bez zmian i są wypisane do ręcznej oceny.
- **Alarmy odchylenia EnPI i CUSUM.** Reguła porównuje zużycie z energią oczekiwaną z linii bazowej (model regresji albo iloraz) po zakończeniu każdego okresu: doby, tygodnia, miesiąca albo zmiany. Reguła CUSUM wykrywa skumulowane odchylenie i pokazuje jego wykres w szczegółach alarmu.
- **Raport „Energia i stany maszyn”.** Stany pracy i profil zużycia energii na jednej osi czasu, energia jałowa, średnia moc w pracy i poza pracą, koszt i emisja CO2. Raport pobierzecie jako PDF (A4 poziomo), wyślecie e-mailem albo ustawicie jako raport cykliczny. Obejmuje do 92 dni i 50 maszyn i działa także bez zleceń.

Szczegóły: [Migawki EnPI](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/migawki-enpi-dawniej-wee-qVGJ4W7Cne), [Wygeneruj raport](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/wygeneruj-raport-hVK1X6GL2N).

## Analiza: jeden ekran pomiarów

*Analiza → Pomiary* łączy wykres z tabelą danych. Można wybrać do 50 pomiarów naraz, oglądać dane surowe albo średnią, minimum, maksimum i ostatnią wartość w przedziałach od 1 minuty do 1 dnia. Eksport CSV ma dwa formaty: dla polskiego Excela (średnik i przecinek dziesiętny) oraz standardowy. Jeden plik mieści do 5 mln wierszy, a każdy eksport trafia do Dziennika zdarzeń. Opis: [Pomiary: dane i eksport CSV](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/pomiary-dane-i-eksport-csv-mCrQeezBpQ).

## AI: jedna konfiguracja i asystent z uprawnieniami użytkownika

Do tej pory funkcje AI konfigurowało się w trzech miejscach. W 5.0 jest jedna zakładka *Konfiguracja ogólna → AI*:

- **Połączenia:** Claude (zalecane), dowolne API zgodne z OpenAI albo lokalna Ollama. Klucze API zostają na serwerze i nie trafiają do przeglądarki.
- **Modele według zadań:** poziom *Szybki* (propozycje zapytań SQL i wykresy w Pulpitach), *Standardowy* (analiza danych, pytania do AI, ustalenia audytów energii) i *Zaawansowany* (czat Studia aplikacji, tylko Claude). Każdy poziom może korzystać z innego połączenia, np. dwa pierwsze z lokalnej Ollamy, a trzeci z Claude.
- **Zużycie** z ostatnich 30 dni.

Asystent AI, np. Claude Desktop, łączy się z OmniMES przez osobiste połączenie użytkownika (menu użytkownika → *Połączenie z asystentem AI*). Działa z uprawnieniami tej osoby: widzi to, co ona, i zmienia tylko to, co ona może zmienić. Każde wywołanie narzędzia zapisu trafia do Dziennika zdarzeń z nazwiskiem użytkownika. Administrator wybiera tryb zmian: wykonywanie od razu, propozycje do zatwierdzenia na ekranie *Do zatwierdzenia* albo tylko odczyt. Niektórych obszarów asystent nie zmieni w żadnym trybie, m.in. ustawień, użytkowników, uprawnień, tokenów i licencji. Usunięcie rekordu przez asystenta oznacza archiwizację, którą można cofnąć.

W instalacjach z publicznym adresem HTTPS, np. w chmurze OmniMES, Claude w przeglądarce, Claude na telefonie i ChatGPT łączą się przez logowanie OAuth, bez kopiowania tokenu. Asystent ma też gotowe scenariusze: *Analiza zmiany*, *Plan na jutro*, *Reklamacja partii* i *Energia w miesiącu*.

Analizy AI w Analizie, Pulpitach i audytach energii liczą się w tle, więc ekran można dalej używać. Historię analiz widzi tylko jej autor, a wszystkie analizy administrator.

### Studio aplikacji i Hala 3D

Aplikacje dostarczane z systemem aktualizują się razem z OmniMES i mają w Studiu zakładkę *Z systemem*. Oprócz *Planisty co-jeśli* są wśród nich *Kreator mapowania ERP*, który podpowiada mapowanie z przykładowego pliku CSV, JSON albo XML i grupuje błędy importu według przyczyny, oraz *Analiza SPC i zdolności procesu* z rankingiem zdolności wszystkich cech. Aplikację zmienioną lokalnie aktualizacja nadpisuje tylko na wyraźne polecenie i po zrobieniu kopii.

Hala 3D przyjmuje gotowy model hali z pliku .glb (glTF 2.0 do 48 MB, także z kompresją Draco, meshopt i teksturami KTX2). Części modelu podpina się do maszyn ręcznie, a całą halę albo pojedyncze modele można wyeksportować do pliku .glb.

Szczegóły: [Połączenie z asystentem AI](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/polaczenie-z-asystentem-ai-3GQLfhtyBK), [Propozycje zmian asystenta AI](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/propozycje-zmian-asystenta-ai-gMM0gn0Obj), [Hala 3D](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/hala-3d-4c8uZjjt0b).

## Bezpieczeństwo: od logowania po broker

Największa część pracy nad 5.0 dotyczyła bezpieczeństwa. Zmiany wynikają z przeglądu systemu pod kątem wymagań Cyber Resilience Act (CRA), o którym pisaliśmy w artykule [o zgłaszaniu podatności](/pl/blog/cyber-resilience-act-24-godziny-na-zgloszenie-podatnosci-co-to-zmienia-dla-mes-i-fabryki).

- **Logowanie.** Pięć nieudanych prób w ciągu 15 minut blokuje konto, a kolejne blokady trwają dłużej. Hasło ma co najmniej 12 znaków i sprawdza je serwer. Sesja wygasa po 12 godzinach bez aktywności albo po 7 dniach, a zmiana hasła i przycisk *Wyloguj ze wszystkich urządzeń* kończą pozostałe sesje. Kody operatora w panelu też mają limit prób.
- **Nowa instalacja** dostaje własne klucze Redasha, a administrator musi ustawić własne hasło przy pierwszym logowaniu. Panele administracyjne brokera, Adminer i Ollama są dostępne tylko z serwera, a dane dla pulpitów BI tylko z tokenem.
- **Konta bazy danych.** API, stream, broker i Redash łączą się z PostgreSQL osobnymi kontami z minimalnymi uprawnieniami, bez uprawnień superużytkownika. Aktualizacja instalacji lokalnej sama przełącza usługi na te konta.
- **Redash.** Redash nie korzysta już z hasła OmniMES. Przycisk Redasha loguje jednorazowym linkiem ważnym 60 sekund, a klucz administratora Redasha zostaje na serwerze: pulpity i raporty idą przez API OmniMES z kontrolą uprawnień.
- **Broker MQTT.** EMQX 5.8 sprawdza logowanie i reguły dostępu w PostgreSQL. Każda bramka może mieć własne konto (ekran *Konta MQTT*) i publikować tylko we własnej grupie Sparkplug B. Konto bramki nie wyśle poleceń do maszyn (NCMD, DCMD) ani nie odczyta cudzych tematów. Połączenie szyfruje TLS na porcie 8883. Nowe instalacje mają to od razu, a w zaktualizowanych urządzenia łączą się tak jak wcześniej i na konta bramek przechodzi się świadomie, urządzenie po urządzeniu.
- **Pliki i interfejs.** Raporty i dokumenty pobiera się po zalogowaniu, przez link ważny 10 minut, a nie pod stałym adresem dostępnym bez logowania. Interfejs ma nagłówki bezpieczeństwa i politykę Content-Security-Policy, a serwer robi zrzuty pulpitów tylko z adresu Redasha zapisanego w ustawieniach.
- **Zależności.** Każde wydanie ma SBOM w formacie CycloneDX i przechodzi skan podatności. Podatność krytyczna albo wysoka bez udokumentowanej oceny (VEX) zatrzymuje wydanie.

Nowy rozdział dokumentacji, [Podręcznik administratora](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/podrecznik-administratora-QDejua8ox1), jest ułożony według Załącznika II CRA. Zawiera bezpieczne uruchomienie w 12 krokach, listę kontrolną bezpiecznej eksploatacji (hasła i konta, TLS i HTTPS, zapora i porty, kopie, aktualizacje, logi, tokeny), znane ryzyka i przewidywalne błędne użycie, RPO i RTO, rozwiązywanie problemów, wycofanie z eksploatacji z usunięciem danych oraz informacje dla integratorów (API, MCP, MQTT, Redash). Stan zabezpieczeń opisuje też rozdział [Cyberbezpieczeństwo i zgodność (CRA)](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/cyberbezpieczenstwo-i-zgodnosc-cra-6dbPWZS59e).

## Instalacja, aktualizacja i kopie zapasowe

- **Aktualizacja z automatycznym wycofaniem.** Skrypt zapisuje kopię ustawień i baz, buduje nowe obrazy przy działającym systemie, wykonuje migracje w osobnym kontenerze i sprawdza, czy API odpowiada, bazy są dostępne, logowanie działa, a strona się otwiera. Gdy któryś krok się nie uda, wraca do poprzednich obrazów, ustawień i w razie potrzeby baz z kopii. Gdy nowa wersja zmienia bazę, API zatrzymuje się na czas aktualizacji, zwykle na 1–3 minuty.
- **Kopie zapasowe.** Usługa kopii codziennie o 2:30 robi zaszyfrowaną kopię baz, plików systemu i ustawień, a kopię telemetrii raz w tygodniu. Zostaje 7 kopii dziennych, 4 tygodniowe i 12 miesięcznych. Kopie można wysyłać poza serwer, na serwer SFTP albo do magazynu zgodnego z S3. Raz w miesiącu usługa sprawdza, czy z najnowszej kopii da się odtworzyć bazy. Wynik widać w *Stanie systemu*, a nieudana albo zaległa kopia wywołuje alarm.
- **Narzędzie administratora `omnimes`.** Jedno polecenie do obsługi instalacji: `preflight` (sprawdza procesor, pamięć, dysk i porty przed instalacją), `install`, `status`, `support-bundle` (paczka diagnostyczna bez haseł i kluczy), `update`, `rollback`, `backup`, `restore` i `uninstall`. Każde polecenie kończy się jednoznacznym wynikiem, a polecenia zmieniające instalację najpierw pokazują plan i proszą o potwierdzenie. Narzędzie mówi po polsku albo po angielsku: język wybiera opcja `--lang` albo zmienna `OMNIMES_LANG`, a przy nowej instalacji język systemu.
- **Monitorowanie.** Adres `/health` zwraca stan baz, kolejki zadań, licencji i streamu. Wszystkie usługi mają kontrolę zdrowia w Dockerze, a niezdrowy kontener uruchamia się ponownie sam (poza bazą i brokerem).
- **Kod w obrazach, konfiguracja w pliku `.env`.** Aktualizacja zachowuje pliki zapisane przez system: archiwum raportów, dokumenty OmniEnergy, załączniki, instrukcje stanowiskowe i katalog wymiany z ERP.

Opis w rozdziale [Instalacja](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/instalacja-wersja-on-premise-2tAS575nLs), sekcje 8 (aktualizacja), 14 (monitorowanie), 15 (kopie zapasowe) i 16 (narzędzie `omnimes`).

## Wydajność i stabilność

Liczby poniżej pochodzą z naszych testów, głównie na kopii bazy instancji demonstracyjnej (ok. 73 mln wierszy telemetrii). W porównaniach zapytań wyniki przed zmianą i po niej były identyczne.

- **Ostatnie wartości sygnałów z całej historii** (opcja „tylko ostatni” w danych BI): 0,29 s zamiast 22,6 s. Korzystają z tego pulpity Redasha, asystent AI, aplikacje Studia, Hala 3D i reguły alarmów na sygnałach.
- **Kompresja kolumnowa TimescaleDB 2.31** i nowy indeks po sygnale i czasie przyspieszają typowe zapytania od kilku do kilkudziesięciu razy, np. ostatnie wartości z 7 dni: 29 ms zamiast 255 ms.
- **Długie raporty i zrzuty pulpitów** liczą się w tle z paskiem postępu. Zrzut pulpitu w trzech formatach trwał w naszym teście 10,5 s zamiast ok. 320 s.
- **Stream nie gubi danych** przy przerwie w połączeniu z bazą: odkłada je do bufora na dysku (do 256 MB) i zapisuje po powrocie bazy. Obsługuje pełny cykl Sparkplug B (BIRTH i DEATH, aliasy, numery sekwencji, rebirth), a wartości logiczne trafiają do historii jako 1 i 0. Wcześniej nie były w niej zapisywane.
- **Czas w bazie jest zapisywany w UTC.** Raporty, zmiany, energia i prognozy liczą doby 23- i 25-godzinne przy zmianie czasu bez przesunięcia o godzinę.
- **Fundament techniczny:** Python 3.12 i Django 5.2 LTS w API, Redash 26.9, TimescaleDB 2.31 oraz interfejs w całości przeniesiony na Vue 3.

## Co warto wiedzieć przed aktualizacją

- **Aktualizacja do 5.0 ma więcej kroków niż zwykle.** Instalacje lokalne, które utrzymuje serwis OmniMES, aktualizujemy sami w uzgodnionym oknie serwisowym, a instancje w chmurze aktualizuje producent. Przy instalacji utrzymywanej samodzielnie trzeba wziąć z nowej paczki m.in. nowy plik `omnimes/api/dockerfile`; pełna lista jest w sekcji 8.2 rozdziału Instalacja.
- **Urządzenia MQTT działają jak dotąd,** ale broker odrzuca tematy, dla których konto nie ma reguły dostępu. Urządzenia publikujące poza przestrzenią Sparkplug B warto sprawdzić przed aktualizacją.
- **Dawne ekrany zleceń są wyłączone.** Lista zleceń i stary harmonogram nie są już dostępne, a ich adresy prowadzą do modułu Produkcja.
- **Nowy układ menu.** Historia zdarzeń nazywa się teraz Zdarzenia maszyn i razem z Alarmami jest w grupie Utrzymanie ruchu. Adres i uprawnienia zostają, a nowy układ widać po ponownym zalogowaniu.
- **Konta kiosku.** Tablety i komputery na hali, na których OmniMES ma być stale zalogowany, trzeba oznaczyć jako konta kiosku. Inaczej sesja wygaśnie po 12 godzinach bez aktywności.
- **Własne integracje z Redashem.** Integracje, które wywoływały Redasha z przeglądarki kluczem administratora, przestaną działać. Wykresy typu Custom (z własnym kodem JavaScript) Redash 26.9 domyślnie wyłącza; włącza się je wpisem w pliku `redash/.env`.
- **Historia analiz AI.** Zwykłe konta zaczynają z pustą historią. Starsze analizy, które nie mają przypisanego autora, widzi administrator.
- **Powiadomienia utrzymania ruchu** wychodzą dopiero po ustawieniu odbiorców w zakładce *Słowniki i ustawienia → Powiadomienia*.
- **Funkcje AI wymagają połączenia** z Claude, API zgodnym z OpenAI albo Ollamą. Koszt zapytań do modeli w chmurze rozlicza ich dostawca, a czat Studia aplikacji działa tylko z Claude.

Pełna lista zmian wersji 5.0 jest na stronie [Lista zmian](/pl/lista-zmian), a okres wsparcia wersji na stronie [Okres wsparcia i aktualizacje](/pl/bezpieczenstwo/okres-wsparcia). Jeśli chcecie zobaczyć 5.0 na własnych danych albo zaplanować aktualizację, [napiszcie do nas](/pl/kontakt).

## Źródła

- OmniMES, dokumentacja: Instalacja (sekcje 8, 8.2, 14, 15, 16), Podręcznik administratora, Utrzymanie ruchu, Zdarzenia maszyn, Alarmy, Stan systemu, Konfiguracja ogólna (zakładki AI i E-mail), Połączenie z asystentem AI, Kalendarz produkcji, Panel operatora, Pomiary: dane i eksport CSV, Hala 3D, Cyberbezpieczeństwo i zgodność (CRA) — https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/wstep-XMdRkBsh9c
- OmniMES, lista zmian, wersja 5.0 — https://www.omnimes.com/pl/lista-zmian
- Pomiary wydajności: testy zespołu OmniMES na kopii bazy instancji demonstracyjnej, listopad 2026 (wyniki przed zmianą i po niej porównane wiersz po wierszu).
