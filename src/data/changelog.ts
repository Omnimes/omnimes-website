export type ChangeCategory = "added" | "changed" | "fixed" | "security"

export type ChangelogEntry = {
  category: ChangeCategory
  scope: string
  body: string
}

export type Release = {
  version: string
  /** Nazwa publiczna wydania X.Y.0, np. „OmniMES 5.0” (instalacje/POLITYKA_WYDAN.md, sekcja 1); version zostaje X.Y.Z. */
  name?: string
  date: string
  entries: ChangelogEntry[]
}

export type UpcomingFeature = {
  scope: string
  body: string
  eta?: string
}

export const roadmap: Record<"pl" | "en", UpcomingFeature[]> = {
  pl: [],
  en: [],
}

export const changelog: Record<"pl" | "en", Release[]> = {
  pl: [
    {
      version: "5.1.0",
      name: "OmniMES 5.1",
      date: "2026-11-25",
      entries: [
        {
          category: "added",
          scope: "OmniEnergy: drzewko zużycia",
          body: "Nowy ekran OmniEnergy → Drzewko zużycia pokazuje zużycie wybranego nośnika (np. energii elektrycznej, gazu, wody) w wybranym okresie w strukturze zakładu: najpierw cały zakład, po rozwinięciu parki, linie i maszyny — z udziałem każdej pozycji w poziomie wyżej, od największego zużycia, i z przeliczeniem na kWh. Nie wymaga konfiguracji: drzewo powstaje ze struktury zakładu i źródeł OmniEnergy.",
        },
        {
          category: "added",
          scope: "Sterowanie maszynami: propozycje od asystenta AI",
          body: "Asystent AI połączony z OmniMES osobistym połączeniem MCP może zaproponować polecenie dla maszyny, ale go nie wyśle. Propozycja trafia do zakładki „Do zatwierdzenia” z oznaczeniem „Asystent AI”, uzasadnieniem i bieżącą wartością sygnału, a do maszyny idzie dopiero po zatwierdzeniu przez osobę z uprawnieniem. Każdy krok jest zapisany w Dzienniku zdarzeń.",
        },
        {
          category: "added",
          scope: "Informacja o nowej wersji",
          body: "Raz na dobę OmniMES sprawdza na serwerze licencji, czy jest nowsza wersja. Administrator widzi wtedy baner z listą zmian, a Stan systemu pokazuje wersję produktu i informację o aktualizacji. Wysyłane są tylko identyfikator produktu, losowy identyfikator instalacji, wersja i stan licencji — bez danych osobowych. Ustawienie OMNIMES_UPDATE_CHECK=0 wyłącza sprawdzanie.",
        },
        {
          category: "added",
          scope: "Instalacja bez internetu",
          body: "Paczka offline zawiera gotowe obrazy Dockera z sumami kontrolnymi, więc OmniMES zainstalujesz i zaktualizujesz na serwerze bez dostępu do internetu (instrukcja Instalacja, sekcja 17).",
        },
        {
          category: "added",
          scope: "Instalacja: dobór serwera i profile bazy",
          body: "Instrukcja ma tabelę doboru serwera do liczby maszyn i sygnałów, opartą na teście obciążenia. Nowe ustawienie OMNIMES_DB_PROFIL (mała, średnia, duża) stroi bazę pod wielkość instalacji, a OMNIMES_DB_MEM_LIMIT ogranicza pamięć bazy. Bez tych ustawień baza działa tak jak dotąd.",
        },
        {
          category: "changed",
          scope: "Sterowanie maszynami w chmurze",
          body: "W instancji OmniMES Cloud ekrany sterowania informują, że polecenia idą do maszyn przez internet — przez broker instancji i bramkę w zakładzie. W instalacji u klienta bez zmian.",
        },
        {
          category: "security",
          scope: "Sprawdzenie paczki instalacyjnej",
          body: "Paczka instalacyjna zawiera plik SHA256SUMS, więc przed instalacją sprawdzisz ją poleceniem sha256sum -c. Każde wydanie jest też archiwizowane na serwerze licencji z sumą SHA-256.",
        },
      ],
    },
    {
      version: "5.0.2",
      date: "2026-11-25",
      entries: [
        {
          category: "added",
          scope: "Sterowanie maszynami po MQTT",
          body: "Nowy ekran Utrzymanie ruchu → Sterowanie maszynami: wysyłka do maszyn wyłącznie komend dopuszczonych przez administratora (maszyna, metryka Sparkplug B, typ, zakres albo lista wartości). Przed wysyłką podsumowanie „było → będzie”, ponowne hasło i opcjonalnie zatwierdzenie drugiej osoby; potwierdzenie z odczytu maszyny i każda próba w historii oraz w Dzienniku zdarzeń. Moduł jest domyślnie wyłączony — włącza go administrator w Administracja → Konfiguracja sterowania.",
        },
        {
          category: "added",
          scope: "OmniEnergy: ceny energii z rynku i taryfa dynamiczna",
          body: "Opcjonalne pobieranie godzinowych cen energii z PSE (RCE albo cena SDAC) oraz taryfa dynamiczna: cena rynkowa × mnożnik + marża. Rachunek, koszt energii zleceń i wycena oszczędności planów działań liczą się z cen rynkowych; godzina bez ceny oznacza rachunek niepełny, a nie zerowy koszt. Ceny można też wczytać z pliku CSV.",
        },
        {
          category: "added",
          scope: "Instalacja: szyfrowany dostęp HTTPS",
          body: "Instalator ma wbudowany, domyślnie wyłączony reverse proxy z TLS: OmniMES, API, MCP i Redash po HTTPS z certyfikatem samopodpisanym, certyfikatem firmy albo z Let's Encrypt, z nagłówkami bezpieczeństwa i przekierowaniem z HTTP. Aktualizacja niczego nie zmienia, dopóki proxy nie zostanie włączone (instrukcja Instalacja, sekcja 10.5).",
        },
        {
          category: "changed",
          scope: "OmniEnergy: polskie skróty",
          body: "W polskiej wersji OmniEnergy używa polskich skrótów: WEE zamiast EnPI, EnLB zamiast EnB i ZWE zamiast SEU — na ekranach, w komunikatach i raportach. Wersja angielska bez zmian.",
        },
        {
          category: "changed",
          scope: "Traceability: partia bez stanu na stanowisku",
          body: "Gdy partia na stanowisku nie ma już stanu, panel operatora pokazuje ostrzeżenie. Nowe ustawienie „Blokuj start etapu przy wyczerpanej partii” pozwala zablokować start i wznowienie etapu. Zużycie ponad stan partii nie robi już stanu ujemnego — reszta idzie jako rozchód bez partii z oznaczoną luką w genealogii.",
        },
        {
          category: "changed",
          scope: "Zdarzenia maszyn: szybsza oś zakładu",
          body: "Oś zdarzeń całego zakładu liczy się kilka razy szybciej (np. 97 maszyn z doby: z ok. 17 s do ok. 3–4 s); ekran domyślnie pokazuje ostatnie 24 godziny.",
        },
        {
          category: "security",
          scope: "Poprawki z wewnętrznego testu bezpieczeństwa",
          body: "Zamknięte znaleziska z wewnętrznego testu penetracyjnego, w tym ważne: aplikacja Studia nie ma już dostępu do tokenów asystenta AI osoby, która ją ogląda. Ponadto układy Panelu głównego zmienia tylko właściciel, kod RFID/PIN operatora widać tylko na ekranie Użytkownicy, zmiana adresu Redasha usuwa zapisany klucz, a eksport CSV nie przenosi formuł arkusza.",
        },
        {
          category: "security",
          scope: "Redash na koncie tylko do odczytu",
          body: "Zapytania Redasha do bazy OmniMES działają na osobnym koncie z prawem tylko do odczytu zamiast konta administratora bazy.",
        },
      ],
    },
    {
      version: "5.0.1",
      date: "2026-11-23",
      entries: [
        {
          category: "changed",
          scope: "Asystent AI tylko przez MCP",
          body: "Rozmowa z AI o danych odbywa się w asystencie AI użytkownika połączonym z OmniMES przez MCP (menu użytkownika → Połączenie z asystentem AI) — z uprawnieniami użytkownika i zapisem w Dzienniku zdarzeń. Z ekranów analiz, Panelu głównego i Zdarzeń maszyn zniknął przycisk „Analiza AI”, z menu pozycja „Analiza asystenta AI” (stary adres prowadzi do Panelu głównego), a ze Studia aplikacji czat — aplikacje buduje się przez „Połączenie z Claude”. Zostają funkcje AI, których wynik trafia do formularza: „Podpowiedz SQL” i „Zaproponuj wykres” w Pulpitach oraz ustalenia, rekomendacje i podsumowanie w audycie energetycznym.",
        },
        {
          category: "changed",
          scope: "Zdarzenia maszyn: wartości sygnałów (diagnostyka)",
          body: "Zakładka z surowymi wartościami sygnałów nazywa się teraz „Wartości sygnałów (diagnostyka)” i widzą ją tylko osoby z prawem konfiguracji statusów (Struktura albo Konfigurator statusów); pozostali widzą samą oś zdarzeń. Przy zdarzeniu „Stan nieznany” przycisk „Przypisz status” otwiera tę zakładkę z maszyną i okresem zdarzenia.",
        },
      ],
    },
    {
      version: "5.0.0",
      name: "OmniMES 5.0",
      date: "2026-11-22",
      entries: [
        {
          category: "added",
          scope: "Utrzymanie ruchu",
          body: "Nowy moduł dla działu utrzymania ruchu. Operator zgłasza awarię z panelu operatora — ze zdjęciem i powiązaniem z przestojem — a technik prowadzi zlecenie serwisowe: status, przydział, czas pracy, części z kartoteki z rozchodem z magazynu, przyczynę i wykonane działania. Przeglądy planowe według kalendarza albo motogodzin same tworzą zlecenia. MTBF i MTTR policzysz ze zgłoszeń albo z telemetrii (przełącznik źródła w Analizie). Karta maszyny pokazuje jej historię, technik ma ekran „Moje zlecenia”, a do dyspozycji są trzy raporty utrzymania ruchu.",
        },
        {
          category: "added",
          scope: "Utrzymanie ruchu: zdarzenia maszyn",
          body: "Dawna Historia zdarzeń to teraz „Zdarzenia maszyn” w sekcji Utrzymanie ruchu: jedna oś czasu maszyny, linii albo parku ze stanami, przestojami, alarmami, zgłoszeniami utrzymania ruchu i pauzami operatora. Przy awarii, postoju i alarmie dodasz notatkę, ze zdarzenia przypiszesz przyczynę przestoju albo zgłosisz awarię, a listę wyeksportujesz do CSV. Alarmy też są w sekcji Utrzymanie ruchu.",
        },
        {
          category: "added",
          scope: "Alarmy i powiadomienia",
          body: "Nowy ekran Alarmy z regułami, listą alarmów i historią powiadomień. Reguły: brak danych z maszyny, postój maszyny dłuższy niż zadany czas oraz reguły procesowe na dowolnym sygnale — próg, zakres, zmiana w czasie albo stan — z histerezą i czasem trwania. Powiadomienia trafiają e-mailem, do dzwonka na górnym pasku, do Microsoft Teams albo Slacka. Reguła może działać tylko w czasie zmian, ma przypomnienia, wyciszenia i eskalację do 5 poziomów, którą zatrzymuje potwierdzenie alarmu z komentarzem. Po aktualizacji aktywna jest tylko reguła „Licencja wygasa” (dzwonek dla Administratorów) — pozostałe reguły zakładasz sam.",
        },
        {
          category: "added",
          scope: "OmniEnergy: alarmy odchylenia EnPI",
          body: "Dwie nowe reguły alarmów: „Odchylenie EnPI od linii bazowej” (próg w %, kierunek, kilka kolejnych okresów — doba, tydzień, miesiąc albo zmiana) i „CUSUM EnPI” (próg w % albo kWh, opcjonalnie zmiana trendu) z wykresem CUSUM w szczegółach alarmu. Reguły liczą się po zakończeniu okresu.",
        },
        {
          category: "added",
          scope: "Produkcja: kalendarz produkcji",
          body: "Produkcja → Kalendarz produkcji pokazuje zlecenia i operacje w widoku miesiąca, tygodnia i dnia — zaplanowane według planu, a trwające i zakończone według wykonania — z linią „teraz”, panelem „Teraz w produkcji” i filtrami parku, linii i zasobu. Zastępuje dawny ekran Podgląd → Harmonogram produkcji.",
        },
        {
          category: "added",
          scope: "Produkcja: korekta meldunku",
          body: "Operator poprawia swój ostatni meldunek ilości w panelu w ustawionym oknie czasu (domyślnie 10 minut), a kierownik — każdy meldunek, po upływie okna z obowiązkowym powodem. Korekta przelicza etap, partię, zużycie i wyrób, trafia do historii zlecenia i Dziennika zdarzeń z wartościami przed i po, a ERP dostaje meldunek z różnicą.",
        },
        {
          category: "added",
          scope: "Produkcja: czas pracy operatorów",
          body: "Operator zaczyna pracę na zleceniu kartą na stanowisku albo przyciskiem „Zacznij pracę”, a sesja kończy się przyciskiem, wylogowaniem, końcem zmiany z kalendarza albo końcem operacji. Roboczogodziny widać w zakładce „Operatorzy” zlecenia (z podziałem na osoby i etapy), w raporcie „Realizacja zleceń” i w meldunku zakończenia zlecenia dla ERP.",
        },
        {
          category: "added",
          scope: "Produkcja: instrukcje stanowiskowe",
          body: "Wersjonowane instrukcje przy maszynie lub linii, wyrobie albo etapie marszruty, z załącznikami PDF, obrazami i filmami MP4 (Konfiguracja produkcji → Instrukcje stanowiskowe). Wersja przechodzi od szkicu przez zatwierdzenie (osobne uprawnienie) do zastąpienia, obowiązuje zawsze jedna, a wersje można porównać. W panelu operatora instrukcje są przy zadaniu, a przed startem etapu operator potwierdza, że zapoznał się z obowiązującą wersją.",
        },
        {
          category: "added",
          scope: "Produkcja: powiadomienia e-mail o zleceniach",
          body: "Zlecenie ma listę odbiorców powiadomień (konta i adresy e-mail), a ustawienia modułu — domyślnych odbiorców. Przy starcie i zakończeniu zlecenia wychodzi wiadomość z ilościami, czasem, energią i linkiem, w języku konta odbiorcy (PL albo EN).",
        },
        {
          category: "added",
          scope: "Analiza: pomiary — dane i eksport CSV",
          body: "Analiza → Pomiary ma dwie zakładki: „Wykres” (jak dotąd) i „Dane i eksport CSV” — tabelę pomiarów wybranych maszyn z agregacją (surowe, średnia, minimum, maksimum, ostatnia wartość w przedziałach od 1 minuty do 1 doby), w układzie długim albo szerokim, z wykresem z osią dla każdej jednostki. Eksport CSV idzie strumieniem, więc obejmuje także miliony wierszy (do 5 mln), w formacie dla polskiego Excela albo standardowym; każde pobranie trafia do Dziennika zdarzeń.",
        },
        {
          category: "added",
          scope: "Raporty: energia i stany maszyn",
          body: "Nowy raport w katalogu raportów (sekcja Energia): wspólna oś czasu stanów maszyny i profilu energii (15 min, 1 h albo doba), energia jałowa, średnia moc w pracy i poza pracą, koszt i CO2. Raport pobierzesz jako PDF, wyślesz e-mailem albo ustawisz jako raport cykliczny.",
        },
        {
          category: "added",
          scope: "Hala 3D: modele z pliku .glb",
          body: "W Hala 3D – ustawienia halę zaimportujesz z pliku glTF 2.0 (.glb, do 48 MB) — np. z programu CAD, z Blendera albo od producenta maszyny, także z kompresją Draco lub meshopt i teksturami KTX2 — i przypiszesz do parku, linii albo wybranych maszyn. Maszyny podpinasz do części modelu ręcznie (klik w model), automatycznie po nazwie albo przez asystenta AI, a podpięta część pokazuje stan maszyny. Każdą halę wyeksportujesz do pliku .glb, np. do poprawek w Blenderze.",
        },
        {
          category: "added",
          scope: "AI: jedna konfiguracja",
          body: "Konfiguracja ogólna → AI zastępuje zakładki „Asystent AI” i „MCP (AI)”. Łączysz Claude (zalecany), dowolne API zgodne z OpenAI albo lokalny model Ollama — klucze są tylko do zapisu, a test połączenia i lista modeli przychodzą od dostawcy. Modele dobierasz do zadań: Szybki (zapytania i wykresy Redasha), Standardowy (analiza danych, pytania, audyt energii) i Zaawansowany (czat Studia aplikacji). Zakładka pokazuje zużycie z 30 dni i listę rzeczy do ustawienia. Aktualizacja przenosi dotychczasowe ustawienia AI.",
        },
        {
          category: "added",
          scope: "AI: asystent na uprawnieniach użytkownika",
          body: "Menu użytkownika → „Połączenie z asystentem AI” daje osobisty token i gotowe rozszerzenie Claude Desktop. Asystent widzi i zmienia tylko to, do czego masz uprawnienia, a każda jego zmiana trafia do Dziennika zdarzeń z Twoim nazwiskiem. Tryb pracy wybierasz: zmiany od razu, propozycje do zatwierdzenia albo tylko odczyt. Ustawień, kont, uprawnień, tokenów, licencji ani Dziennika zdarzeń asystent nie zmienia. Gdy administrator włączy logowanie OAuth, a instalacja jest dostępna publicznie przez HTTPS, połączysz też claude.ai i ChatGPT, logując się kontem OmniMES.",
        },
        {
          category: "added",
          scope: "AI: propozycje zmian do zatwierdzenia",
          body: "Ekran „Do zatwierdzenia” z licznikiem na górnym pasku zbiera zmiany zaproponowane przez asystenta AI i aplikacje w Claude. Zatwierdzenie wykonuje zmianę z uprawnieniami osoby zatwierdzającej i zostawia wpis w Dzienniku zdarzeń; nierozpatrzone propozycje wygasają po 7 dniach.",
        },
        {
          category: "added",
          scope: "Asystent AI (MCP): nowe narzędzia i gotowe scenariusze",
          body: "Asystent ma nowe narzędzia: przyczyny przestojów, scenariusze i Gantt harmonogramu, symulacja planu, SPC i zdolność procesu oraz diagnostyka integracji ERP. Wskaźniki (OEE, dostępność, MTBF) bierze z tych samych obliczeń co ekrany. Gotowe polecenia: „Analiza zmiany”, „Plan na jutro”, „Reklamacja partii” i „Energia w miesiącu”. Usunięcie konfiguracji z czatu archiwizuje rekord, który można przywrócić.",
        },
        {
          category: "added",
          scope: "Studio aplikacji: aplikacje dostarczane z systemem",
          body: "Studio aplikacji ma zakładkę „Z systemem”: aplikacje producenta z numerem wersji, aktualizowane razem z OmniMES, o ile nie zmieniono ich lokalnie. Nowe aplikacje: „Planista co-jeśli” — porównanie do 5 wariantów planu (postój zasobu, dodatkowa zmiana, priorytety, terminy) i propozycja do zatwierdzenia w Harmonogramie, która może wpisać postoje i dodatkowe zmiany do Kalendarza zasobów oraz zmienić priorytety i terminy zleceń; „Kreator mapowania ERP” — podpowiedź mapowania z przykładowego pliku CSV, JSON albo XML i diagnoza błędów importu; „Analiza SPC i zdolności procesu” — ranking cech według Cpk, karty X̄-R i I-MR z regułami Western Electric i histogram z tolerancjami. Aplikacje działają też w Claude.",
        },
        {
          category: "added",
          scope: "Jakość: ranking Cpk w SPC",
          body: "Zakładka SPC ekranu Jakość ma ranking zdolności procesu (Cpk) i filtr linii albo zasobu dla wyników kontroli na etapach produkcji.",
        },
        {
          category: "added",
          scope: "Poczta: test wysyłki i dziennik wiadomości",
          body: "Konfiguracja ogólna → E-mail pokazuje stan poczty (z ostrzeżeniem, gdy nie jest skonfigurowana), pozwala wybrać szyfrowanie (STARTTLS, SSL/TLS albo bez) i wysłać wiadomość testową z czytelnym opisem błędu, a tabela ostatnich wysyłek pokazuje, co wyszło. Wszystkie wiadomości — raporty, automatyzacje OmniEnergy, audyty energii, alarmy — idą jedną usługą, która po błędzie przejściowym ponawia wysyłkę. Bez konfiguracji poczty wysyłka ma status „pominięto” zamiast błędu.",
        },
        {
          category: "added",
          scope: "Licencja: przypomnienia i okres karencji",
          body: "Administrator widzi baner 30, 14 i 7 dni przed końcem licencji i dostaje powiadomienie w dzwonku. Po wygaśnięciu system działa w pełni jeszcze przez okres karencji (domyślnie 14 dni, z banerem), a potem pokazuje komunikat z kontaktem zamiast pustych ekranów. Licznik dni do końca licencji liczy poprawnie.",
        },
        {
          category: "added",
          scope: "Administracja: stan systemu",
          body: "Ekran Administracja → Stan systemu pokazuje w jednym miejscu API, bazę danych, kolejkę zadań, stream, broker, pocztę, dysk, kopię zapasową, licencję, serwer MCP, Redash i wersję, z odświeżaniem co 30 s. Reguły alarmów systemowych powiadamiają m.in. o braku danych ze streamu, zapełnionym dysku, nieudanej kopii zapasowej, problemach kolejki zadań i błędach poczty. Adres /health podaje stan dla monitoringu zewnętrznego, wszystkie usługi mają kontrole zdrowia Dockera, a niezdrowe kontenery (poza bazą i brokerem) uruchamiają się ponownie same.",
        },
        {
          category: "added",
          scope: "Instalacja: kopie zapasowe",
          body: "Usługa kopii zapasowych robi codziennie o 2:30 zaszyfrowaną kopię baz, plików zapisanych przez system (raporty, dokumenty, załączniki, instrukcje) i ustawień instalacji, a telemetrii — raz w tygodniu. Przechowuje 7 kopii dziennych, 4 tygodniowe i 12 miesięcznych, może wysyłać kopię poza serwer (SFTP albo S3) i raz w miesiącu sprawdza, czy z najnowszej kopii da się odtworzyć bazy. Stan kopii widać na ekranie Stan systemu.",
        },
        {
          category: "added",
          scope: "Instalacja: aktualizacja z automatycznym wycofaniem",
          body: "Aktualizacja robi kopię ustawień i baz, buduje nowe obrazy przy działającym systemie, wykonuje migracje przed podmianą kontenerów i sprawdza, czy system działa (API, bazy, logowanie, strona). Gdy któryś krok się nie powiedzie, sama wraca do poprzedniej wersji, razem z bazami. Przerwa przy zmianach w bazie trwa zwykle 1–3 minuty, a problem zauważony później cofnie polecenie omnimes rollback. Kod API i interfejsu jest częścią obrazów, a ustawienia instalacji są w pliku omnimes/.env.",
        },
        {
          category: "added",
          scope: "Instalacja: narzędzie administratora omnimes",
          body: "Jedno polecenie dla Windows, Linuksa i macOS zamiast wielu skryptów: preflight (procesor, pamięć RAM, dysk i porty przed instalacją i aktualizacją), install, status, update, rollback, backup, restore, uninstall oraz support-bundle — paczka diagnostyczna dla serwisu bez haseł i kluczy. Polecenia, które zmieniają instalację, pokazują plan i proszą o potwierdzenie. Komunikaty są po polsku albo po angielsku (opcja --lang albo zmienna OMNIMES_LANG).",
        },
        {
          category: "added",
          scope: "Dokumentacja: podręcznik administratora",
          body: "Nowy rozdział dokumentacji PL i EN dla administratora: bezpieczne uruchomienie, lista kontrolna bezpiecznej eksploatacji (hasła i konta, TLS, zapora i porty, kopie, aktualizacje, uprawnienia, tokeny, monitorowanie, reakcja na incydent), kopie i odtwarzanie, rozwiązywanie problemów, wycofanie z eksploatacji i informacje dla integratorów — według załącznika II Cyber Resilience Act.",
        },
        {
          category: "changed",
          scope: "Produkcja: jeden moduł zleceń",
          body: "Produkcja jest jedynym modułem zleceń na każdej instalacji: aktualizacja ją włącza i chowa dawną Listę zleceń, stary Harmonogram i Konfigurację czasu pracy, a stare adresy prowadzą do nowych ekranów. Zlecenia z ERP są na liście „Zlecenia produkcyjne” z filtrem „Źródło: z ERP”, kafelkiem „Meldunki z błędem” i kolumnami opóźnienia i ostatniego meldunku; odbiorcę i priorytet zlecenia ERP przesyła jako pola mapowania. Czas pracy zasobów ustawiasz na jednym ekranie Kalendarz zasobów: zmiany dla zakładu, parku, linii albo maszyny, wyjątki i podgląd dostępności. Monitoring i analizy maszyn działają jak dotąd.",
        },
        {
          category: "changed",
          scope: "Raporty w jednym miejscu",
          body: "Raporty mają trzy ekrany: „Wygeneruj raport” (katalog, razem z raportami produkcji), „Wygenerowane raporty” (archiwum) i „Raporty cykliczne” (dawny „Harmonogram automatyzacji” razem z subskrypcjami raportów produkcji). Raport zlecenia liczy się na module Produkcja.",
        },
        {
          category: "changed",
          scope: "OEE i czas pracy: jedno źródło liczb",
          body: "OEE, dostępność, czas pracy i MTBF liczą się w jednym miejscu, więc ekrany, raporty i asystent AI pokazują te same wartości, a Analiza → „Czas pracy i OEE” to jeden ekran. Maszyna z kalendarzem zmian jest liczona według ISO 22400, maszyna bez kalendarza — jak dotąd. Próg mikroprzestojów ustawiasz w jednym miejscu (Ustawienia systemowe → Mikroprzestoje), partie są na jednej liście, a Kartoteka wyrobów ma kolor, cenę i stan minimalny.",
        },
        {
          category: "changed",
          scope: "Wydajność: raporty, pulpity i analizy AI w tle",
          body: "Długie raporty, zrzuty pulpitów i analizy AI liczą się w tle z paskiem postępu — ekranu można dalej używać. Zrzut pulpitu Redasha trwa kilkanaście sekund zamiast kilku minut, pulpity Redasha ładują się szybciej, a serwer API obsługuje więcej żądań naraz.",
        },
        {
          category: "changed",
          scope: "Wydajność: dane pomiarowe",
          body: "Najnowsze wartości sygnałów — dla pulpitów Redasha, asystenta AI, Studia aplikacji, Hali 3D i reguł procesowych alarmów — liczy baza danych zamiast serwera aplikacji: zapytanie po całej historii trwa ułamek sekundy zamiast kilkudziesięciu sekund i nie obciąża pamięci. Telemetria korzysta z kompresji kolumnowej TimescaleDB i nowego indeksu, dzięki czemu typowe zapytania są kilka do kilkudziesięciu razy szybsze przy tych samych wynikach. Odpowiedź z danymi BI ma limit 100 000 wierszy (zmienna OMNIMES_BI_MAX_ROWS).",
        },
        {
          category: "changed",
          scope: "Stream: bez utraty danych i pełny Sparkplug B",
          body: "Usługa stream odbiera pomiary z potwierdzeniem (QoS 1) w trwałej sesji, a gdy baza jest niedostępna, zapisuje je w buforze na dysku i dopisuje później. Obsługuje pełny Sparkplug B (BIRTH i DEATH, aliasy, numerację seq i bdSeq, rebirth, wartości puste) i oznacza urządzenia offline. Ostatnia wartość sygnału nie jest nadpisywana starszą wiadomością, duplikaty są pomijane, a po restarcie albo podmianie brokera stream sam odnawia subskrypcję.",
        },
        {
          category: "changed",
          scope: "Nowe wersje platformy",
          body: "API działa na Pythonie 3.12 i Django 5.2 LTS (wcześniej Python 3.9 i Django 3.2), broker MQTT to EMQX 5.8, pulpity — Redash 26.9, a baza telemetrii — TimescaleDB 2.31. Wersje obrazów i zależności są przypięte, więc każda instalacja danej wersji ma te same składniki.",
        },
        {
          category: "changed",
          scope: "Usunięte ekrany Panorama parku i kreator szablonu raportu",
          body: "Nieużywane ekrany Panorama parku i kreator szablonu raportu (ukryte w menu) zostały usunięte. Szablony raportów działają jak dotąd.",
        },
        {
          category: "fixed",
          scope: "Zmiana czasu (marzec i październik)",
          body: "Doby 23- i 25-godzinne liczą się poprawnie: przestój w podwójnej godzinie nie znika, zmiana nocna ma 7 albo 9 godzin zamiast zawsze 8, migawki zmian nie scalają się w jedną (także w zwykłe dni), ekran Czas pracy nie pokazuje ujemnego przestoju, a raport „Energia i stany maszyn” pokazuje wszystkie 25 godzin doby. Planowanie, traceability, prognozy, alarmy i sesje liczą czas trwania według rzeczywistego upływu czasu. Czas w bazie jest zapisywany w UTC, a aplikacja i API pokazują daty jak dotąd w czasie zakładu. Zapisane wcześniej OEE z dób zmiany czasu przeliczy na życzenie polecenie administratora.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy: migawki EnPI i EnB",
          body: "Wykres migawek EnPI działa (wcześniej kończył się błędem), oś czasu pokazuje środek okresu, a podpowiedź — okres od–do. Filtry dat list EnPI i EnB obejmują ostatni dzień zakresu. Okresy migawek zapisane wcześniej z przesunięciem o 1–2 godziny (np. 22:00 zamiast północy) poprawia jednorazowe polecenie administratora: najpierw pokazuje plan, zmienia po zatwierdzeniu i można je cofnąć.",
        },
        {
          category: "fixed",
          scope: "Wyszukiwanie na listach",
          body: "Wyszukiwanie na listach — m.in. maszyn, linii, użytkowników i pozycji rejestru SEU — działa; wcześniej kończyło się błędem.",
        },
        {
          category: "fixed",
          scope: "Produkcja: bilans materiałów, OEE według wyrobu i partie",
          body: "Bilans materiałów zlecenia i raport „Strata materiałowa” liczą normę ze wszystkich partii zlecenia (wcześniej przy kilku partiach strata wychodziła np. 200%). OEE według wyrobu wlicza ilości zameldowane przy zakończeniu etapu, zakładka Proces zamkniętej partii wyrobu pokazuje podsumowanie zamiast „Partia w toku”, a kolumna „Od kiedy” w Kwarantannie liczy dni kalendarzowe.",
        },
        {
          category: "fixed",
          scope: "Tłumaczenia i formaty",
          body: "Teksty z serwera (Studio aplikacji, OmniEnergy, Dziennik zdarzeń, dane startowe) pojawiają się w języku interfejsu, liczby i daty — w formacie wybranego języka, a brakujące tłumaczenia i teksty wpisane na sztywno są uzupełnione w PL i EN. Część ekranów, np. zakładka AI, pokazywała w wersji produkcyjnej klucze zamiast tekstów. Formularze mają jednolity układ, a pola wyboru, które wyglądały na puste, pokazują wartości.",
        },
        {
          category: "fixed",
          scope: "Konfiguracja ogólna: „Zapisz”",
          body: "Gdy pole w innej zakładce ma niepoprawną wartość, „Zapisz” przechodzi do tej zakładki, podświetla pole i pokazuje komunikat — wcześniej zapis po cichu nic nie robił.",
        },
        {
          category: "fixed",
          scope: "Stream: wartości logiczne w historii",
          body: "Sygnały typu Boolean trafiają do historii pomiarów jako 1 i 0 — wcześniej zapisywały się bez wartości.",
        },
        {
          category: "fixed",
          scope: "Aktualizacja zachowuje pliki",
          body: "Aktualizacja API nie usuwa archiwum raportów, dokumentów OmniEnergy, załączników jakości ani plików wymiany z ERP — leżą w osobnych wolumenach, a pierwsza aktualizacja przenosi je tam sama. Aktualizacja usługi stream zachowuje jej identyfikator i bufor pomiarów.",
        },
        {
          category: "fixed",
          scope: "Ponowne uruchomienie instalatora",
          body: "Ponowne uruchomienie instalatora albo przebudowa (recreated_omnimes.bat) na działającej instalacji nie nadpisuje baz czystą bazą z paczki i nie zmienia haseł, kont MQTT ani kluczy — użytkownicy, maszyny, menu i ustawienia zostają. Przerwaną instalację instalator dokańcza.",
        },
        {
          category: "security",
          scope: "Logowanie i sesje",
          body: "Po 5 nieudanych próbach w ciągu 15 minut konto blokuje się na 15 minut, przy kolejnych dłużej (do 24 h); działa też limit prób z jednego adresu IP, a konto odblokujesz na ekranie Użytkownicy. Hasło ma co najmniej 12 znaków i sprawdza je serwer. Każde logowanie to osobna sesja, która wygasa po 12 godzinach bezczynności albo po 7 dniach; zmiana hasła i „Wyloguj ze wszystkich urządzeń” kończą pozostałe sesje i tokeny asystenta AI. Konto stanowiska na hali oznaczasz jako „Konto kiosku” (sesja bez wygasania), a kod operatora i karta RFID w panelu mają własny limit prób.",
        },
        {
          category: "security",
          scope: "Nowa instalacja bez wspólnych sekretów",
          body: "Czysta baza w paczce nie zawiera tokenów, haseł ani kluczy, klucze Redasha są losowe dla każdej instalacji, a administrator OmniMES zmienia hasło przy pierwszym logowaniu. Aktualizacja wypisuje, czy instalacja ma jeszcze klucze znane z dawnych paczek — ich wymianę wykonuje serwis OmniMES.",
        },
        {
          category: "security",
          scope: "Pliki tylko dla uprawnionych",
          body: "Raporty, dokumenty OmniEnergy i załączniki pobierzesz tylko po zalogowaniu, z uprawnieniem do zasobu, albo podpisanym linkiem ważnym 10 minut; nowe pliki mają losowe nazwy. Zapisane wcześniej adresy /media/… przestają działać, a dokumenty OmniEnergy pobierają się zamiast otwierać w karcie przeglądarki.",
        },
        {
          category: "security",
          scope: "Ochrona treści w przeglądarce",
          body: "Treści wpisywane przez użytkowników (raporty, opisy OmniEnergy, monitoring) są oczyszczane przed wyświetleniem, a serwer WWW wysyła nagłówki bezpieczeństwa, m.in. Content-Security-Policy. Wzory i filtry danych są odczytywane parserem, bez wykonywania kodu.",
        },
        {
          category: "security",
          scope: "Połączenia z adresami zewnętrznymi",
          body: "Zrzuty pulpitów są pobierane wyłącznie z adresu Redasha z ustawień, a adresy dostawców AI, ERP i drukarek są sprawdzane przed połączeniem. Raport cykliczny z adresem pulpitu spoza Redasha z ustawień (np. po zmianie domeny) kończy się czytelnym komunikatem — wybierz pulpit ponownie.",
        },
        {
          category: "security",
          scope: "Redash bez hasła OmniMES",
          body: "Przyciski Redasha logują jednorazowym linkiem, konto w Redashu ma losowe hasło, a zapisane wcześniej hasła OmniMES zostały usunięte. Klucz administratora Redasha zostaje na serwerze — pulpity i zapytania idą przez OmniMES z kontrolą uprawnień.",
        },
        {
          category: "security",
          scope: "Historia analiz AI",
          body: "Każde konto widzi tylko swoje analizy AI; wszystkie widzi superuser i konto z modułem Ustawienia. Po aktualizacji zwykłe konta zaczynają z pustą historią, a wcześniejsze analizy widzi administrator.",
        },
        {
          category: "security",
          scope: "Broker MQTT: konta urządzeń i szyfrowanie",
          body: "Broker MQTT sprawdza logowanie i uprawnienia do tematów w bazie OmniMES: każde konto ma uprawnienia do określonych tematów, a pozostałe tematy są zablokowane. Na nowym ekranie Konta MQTT zakładasz osobne konta bramek i urządzeń, a połączenie może być szyfrowane (TLS, port 8883). Nowe instalacje startują z TLS i kontami bramek, bez konta wspólnego. Po starcie brokera porty MQTT otwierają się dopiero, gdy logowanie i uprawnienia są gotowe, więc dane wysłane zaraz po połączeniu nie giną.",
        },
        {
          category: "security",
          scope: "Konta bazy danych usług",
          body: "API, stream, broker i Redash łączą się z bazą osobnymi kontami z minimalnymi uprawnieniami zamiast konta administratora. Aktualizacja przełącza istniejące instalacje, sprawdza działanie i przy błędzie wraca do poprzedniego konta.",
        },
        {
          category: "security",
          scope: "Panele administracyjne tylko z serwera",
          body: "Panel EMQX, Adminer i Ollama nasłuchują tylko na serwerze (127.0.0.1), a Adminer startuje wyłącznie na żądanie. Nowe instalacje działają w trybie bezpiecznym API (dozwolone adresy i CORS z adresu instalacji, bez trybu debugowania) i wydają dane BI tylko z tokenem. Opis API (Swagger, ReDoc) jest dostępny po zalogowaniu.",
        },
        {
          category: "security",
          scope: "Zależności, SBOM i skan podatności",
          body: "Zależności są zaktualizowane, a wersje obrazów i pakietów przypięte. Każde wydanie ma wykaz komponentów SBOM (CycloneDX) dla API, interfejsu www, streamu i serwera MCP, przechodzi skan podatności — podatność krytyczna albo wysoka bez udokumentowanej oceny zatrzymuje wydanie — i kontrolę, czy paczka nie zawiera sekretów.",
        },
        {
          category: "changed",
          scope: "Aktualizacja do 5.0: z której wersji",
          body: "Do OmniMES 5.0 aktualizujesz bezpośrednio z wersji 4.5.1 i nowszych, bez wersji pośrednich. Wersje 4.1.0–4.5.0 aktualizujesz z pomocą serwisu OmniMES, a wersje 4.0.0 i starsze (baza MongoDB) wymagają najpierw przeniesienia danych na PostgreSQL z TimescaleDB.",
        },
        {
          category: "changed",
          scope: "Aktualizacja do 5.0: przed aktualizacją",
          body: "Skopiuj z nowej paczki katalogi i skrypty wymienione w instrukcji (rozdział Instalacja, sekcja 8.2) — API na Pythonie 3.12 nie wystartuje ze starym plikiem omnimes/api/dockerfile. Wymagany jest Docker Compose v2 albo v1 w wersji 1.29 lub nowszej; klucza licencji nie trzeba wymieniać. Własne zmiany w docker-compose.yaml przenieś do docker-compose.override.yaml, bo aktualizacja zastępuje ten plik wersją z paczki. Sprawdź własne integracje, które wołały Redasha bezpośrednio z przeglądarki (przestaną działać), i urządzenia publikujące poza tematami spBv1.0/ i omni/raw/ — broker domyślnie je blokuje.",
        },
        {
          category: "changed",
          scope: "Aktualizacja do 5.0: przebieg",
          body: "Aktualizacja API przenosi w tym samym przebiegu bazę na TimescaleDB 2.31, Redasha na 26.9 i broker na EMQX 5, z kopią i automatycznym wycofaniem, oraz przełącza usługi na osobne konta bazy danych. Broker jest niedostępny przez kilkanaście sekund, bramki i usługa stream łączą się ponownie same, a skrypt sprawdza, czy pomiary znów docierają — jeśli nie, wraca do poprzedniej wersji razem z brokerem. W zaktualizowanej instalacji konto wspólne MQTT i port 1883 działają jak dotąd, więc bramki nie wymagają zmian.",
        },
        {
          category: "changed",
          scope: "Aktualizacja do 5.0: po aktualizacji",
          body: "Zapisz poza serwerem klucz kopii zapasowych omnimes/konfiguracja/kopie_age.key — bez niego kopii nie da się odtworzyć. Konta stanowisk na hali (np. tablety z panelem operatora) oznacz jako „Konto kiosku”, bo pozostałe sesje wygasają po 12 godzinach bezczynności. Wyślij wiadomość testową z zakładki E-mail — ustawienia szyfrowania poczty są teraz respektowane. Jednorazowo uruchom korektę okresów migawek EnB i EnPI (najpierw plan). Panele administracyjne zamyka pełna odbudowa w oknie serwisowym. Wspólny token MCP zapisany w instalacji działa dalej, ale serwer MCP nie przyjmuje już połączeń bez tokenu.",
        },
      ],
    },
    {
      version: "4.14.0",
      date: "2026-11-20",
      entries: [
        {
          category: "added",
          scope: "Produkcja: zlecenia, marszruty i harmonogram",
          body: "Nowe menu Produkcja prowadzi zlecenie od planu do zakończenia. Zlecenie produkcyjne ma marszrutę — etapy na maszynach, liniach albo bez zasobu, z normą czasu cyklu i przezbrojeniem. Harmonogram (Gantt) pokazuje operacje na zasobach: przeciągasz je myszą, widzisz kolizje i blokady, a „Zaplanuj automatycznie” przygotowuje propozycję planu do zatwierdzenia z uwzględnieniem kalendarza zmian. Normy czasu cyklu wyrób × maszyna wpisujesz ręcznie, bierzesz z ERP albo wyliczasz z historii produkcji.",
        },
        {
          category: "added",
          scope: "Panel operatora",
          body: "Operator przy stanowisku widzi swoją kolejkę, uruchamia, wstrzymuje i kończy etap, melduje sztuki dobre i braki z przyczyną oraz przekazuje partię na następny etap. Skan partii materiału czytnikiem kodów albo kamerą tabletu pilnuje, żeby na stanowisko trafił właściwy materiał w kolejności FEFO; panel pokazuje też dostępność materiału i braki do przeróbki.",
        },
        {
          category: "added",
          scope: "Magazyn materiałów i dostępność materiału",
          body: "Stany materiałów, przyjęcia i ruchy magazynowe z numerem zlecenia. Harmonogram, kolejka operacji, panel i zlecenie pokazują, czy materiału wystarczy według receptury (BOM). Planowanie automatyczne bierze to pod uwagę, „Przelicz od teraz” odświeża plan, a przy zwalnianiu zlecenia widać braki.",
        },
        {
          category: "added",
          scope: "OEE według ISO 22400 i przyczyny przestojów",
          body: "Ekran OEE liczy dostępność, wydajność i jakość według ISO 22400 dla maszyny, linii i okresu, z zakładkami: Pareto strat, OEE według zmiany i według wyrobu, MTBF i MTTR oraz przestoje z korektą przyczyny. Przyczyna przestoju przypisuje się automatycznie z sygnału maszyny, a mikroprzestoje rozpoznawane są według typu zdarzenia, nie tylko czasu trwania — praca nie jest mikroprzestojem.",
        },
        {
          category: "added",
          scope: "Raporty produkcji",
          body: "Katalog raportów produkcji: zlecenia, produkcja w okresie i raporty traceability. Raport zlecenia pokazuje czas pracy, przestojów i wyłączeń maszyn w oknie zlecenia oraz energię, koszt i emisję CO2 na zlecenie, na sztukę i na stan maszyny.",
        },
        {
          category: "added",
          scope: "Partie i genealogia (traceability)",
          body: "Każda partia materiału, półproduktu i wyrobu ma numer, status jakości (np. kwarantanna, zablokowana) i kartę z historią. Genealogia prowadzi wstecz do dostawców i naprzód do odbiorców, a raport identyfikowalności zbiera ją w PDF. Partię znajdziesz polem „Szukaj partii” w górnym pasku — wpisując numer albo skanując kod czytnikiem lub kamerą. Zakładka Proces pokazuje parametry krytyczne z granicami (przekroczenie oznacza partię jako podejrzaną) i energię zużytą na partię, a ekran pokazuje partie, które były na maszynie w wybranym czasie — np. po awarii czujnika.",
        },
        {
          category: "added",
          scope: "Etykiety i palety",
          body: "Etykiety partii i palet z kodem QR, GS1 DataMatrix albo GS1-128 — jako PDF na dowolną drukarkę albo ZPL na drukarki Zebra. Szablony i drukarki ustawiasz w konfiguracji, a dziennik wydruków pokazuje każdy wydruk i dodruk. Palety dostają numer SSCC, wydanie palety skanem można cofnąć, etykiety drukują się także przy przyjęciu materiału, a kartoteka wyrobów ma pole GTIN.",
        },
        {
          category: "added",
          scope: "Wycofanie produktu i bilans masy",
          body: "Kreator wycofania prowadzi od podejrzanej partii do listy partii pochodnych, ilości, miejsc i odbiorców oraz raportu PDF. Tryb testowy niczego nie blokuje i mierzy czas — to ćwiczenie wycofania przed audytem (BRCGS, IFS); każda sprawa trafia do rejestru wycofań. Bilans masy partii i zlecenia pokazuje stratę materiałową, a partie na stanie można dzielić, łączyć, przepakowywać i przerabiać — także braki do przeróbki zgłoszone w panelu operatora.",
        },
        {
          category: "added",
          scope: "Jakość",
          body: "Plany kontroli z charakterystykami i granicami, wyniki pomiarów, niezgodności z kwarantanną i decyzją o dyspozycji. Blokada partii przenosi się na partie z niej wytworzone, a karty SPC pokazują stabilność procesu.",
        },
        {
          category: "added",
          scope: "Dziennik zdarzeń",
          body: "Nowy ekran Administracja → Dziennik zdarzeń pokazuje, kto, co i kiedy zmienił: logowania, konta, uprawnienia, tokeny, licencję, ustawienia, produkcję i odczyty — z wartościami przed i po zmianie. Wpisów nie można zmienić ani usunąć. Eksport do CSV, wysyłka do serwera syslog (RFC 5424) i ustawiany czas przechowywania.",
        },
        {
          category: "added",
          scope: "Integracje ERP: kartoteka, receptury i wymiana plików",
          body: "ERP przesyła do OmniMES indeksy wyrobów i materiałów z recepturami (BOM) — przez API, plik albo katalog wymiany, także po SFTP (np. SAP). Nowy ekran Kartoteka wyrobów pokazuje wyroby, materiały, jednostki i receptury. Klucz API integracji ma zakres uprawnień, a opis API jest dostępny w formacie OpenAPI.",
        },
        {
          category: "added",
          scope: "Integracje ERP: bezpośrednie połączenie z Business Central, SAP S/4HANA i Odoo",
          body: "Konektor loguje się sam — OAuth2 (np. Microsoft Entra ID dla Business Central), sesja SAP Business One, sesja z tokenem, Basic albo stałe nagłówki — i pobiera zlecenia także zapytaniami POST oraz z OData v2. Gotowe ustawienia startowe dla Business Central, SAP S/4HANA i Odoo, bez programu pośredniczącego.",
        },
        {
          category: "added",
          scope: "Integracje ERP: wynik produkcji zapisywany w ERP",
          body: "OmniMES zapisuje meldunki bezpośrednio w ERP: przyjęcie wyrobu (PW), potwierdzenie operacji albo raport produkcji w Odoo, SAP Business One i SAP S/4HANA, a w innych systemach przez szablon HTTP. Ponowienie po błędzie nie księguje drugi raz, a podgląd wywołania pokazuje, co trafi do ERP.",
        },
        {
          category: "added",
          scope: "Integracje ERP: partie, normy, czas pracy i energia",
          body: "ERP przesyła partie materiałów i palety, a OmniMES odsyła zużycie i produkcję z numerami partii, zmiany statusu partii i genealogię; ustawiasz, kto nadaje numery partii, i przeliczniki jednostek dla każdego materiału. Normy czasu cyklu przychodzą z ERP, kontrola mapowania pokazuje gniazda i jednostki bez przypisania, a wiele meldunków ponawiasz naraz. Meldunki i API dla ERP zawierają czas pracy i przestojów oraz energię, koszt i CO2 zlecenia, a widok Zlecenia z ERP pokazuje prognozę końca zlecenia i opóźnienia.",
        },
        {
          category: "added",
          scope: "Studio aplikacji: eksport, import i dane produkcji",
          body: "Aplikację Studia wyeksportujesz do pliku i zaimportujesz w innym systemie OmniMES, a przed każdym importem powstaje kopia zapasowa wszystkich aplikacji — kopię zrobisz też ręcznie i z niej przywrócisz. Aplikacje korzystają z danych ERP, modułu zleceń i partii — gotowe są m.in. „Tablica zleceń ERP” i „Dochodzenie reklamacyjne” (od numeru partii z reklamacji do dostawców i odbiorców).",
        },
        {
          category: "added",
          scope: "Asystent AI (MCP)",
          body: "Asystent AI (np. Claude) odpowiada na pytania o zlecenia, kolejki i postęp produkcji, OEE i straty, partie i genealogię, rachunek za energię, bilans liczników oraz zlecenia z ERP — z tych samych obliczeń co ekrany.",
        },
        {
          category: "added",
          scope: "OmniEnergy: nośniki, emisje CO2 i ESRS",
          body: "Ekran Nośniki i emisje (ESRS E1) przelicza zużycie nośników na energię końcową i pierwotną oraz emisje CO2 według wskaźników KOBiZE i przygotowuje dane do raportu ESRS E1-5 i E1-6.",
        },
        {
          category: "added",
          scope: "OmniEnergy: liczniki, bilans i odczyty ręczne",
          body: "Liczniki układasz w drzewo (licznik główny i podliczniki), dodajesz liczniki wirtualne z formułą i przekładnie, a bilans pokazuje straty między licznikiem głównym a podlicznikami. Liczniki bez transmisji wpisujesz ręcznie albo importem CSV — system pilnuje, żeby odczyt nie był mniejszy od poprzedniego, i obsługuje wymianę licznika.",
        },
        {
          category: "added",
          scope: "OmniEnergy: taryfy, rachunek i profil mocy",
          body: "Taryfy energii ze strefami czasowymi, mocą umowną, energią bierną i opłatami stałymi. Ekran Rachunek i profil mocy liczy rachunek za miesiąc z profilu 15-minutowego, pokazuje przekroczenia mocy umownej i tg φ oraz porównanie z poprzednim miesiącem.",
        },
        {
          category: "added",
          scope: "OmniEnergy: linia bazowa z regresji i temperatura",
          body: "Linia bazowa może być modelem regresji według ISO 50006 — z produkcją i stopniodniami z temperatury zewnętrznej — z oceną jakości modelu (R², CV(RMSE), istotność); oszczędność jest normalizowana do warunków okresu raportowego. Mianownikiem EnPI może być produkcja z modułu zleceń.",
        },
        {
          category: "added",
          scope: "OmniEnergy: rejestr SEU, plany działań i raport z audytu",
          body: "Rejestr znaczącego użytkowania energii (ISO 50001, pkt 6.3), plany działań z weryfikacją oszczędności (M&V) oraz raport z audytu energetycznego przygotowany z danych systemu.",
        },
        {
          category: "changed",
          scope: "OmniEnergy: nazwy ISO 50001 i cele",
          body: "Ekrany i raporty używają nazw z ISO 50001: EnPI, SEU i EnB. Cel może mieć kierunek „mniej znaczy lepiej” z postępem liczonym od linii bazowej, a audyt nie zamyka się, gdy wskaźnik się pogorszył. Okresy SEU liczone są w czasie lokalnym także przy zmianie czasu.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy: raport SEU do PDF i PNG",
          body: "Pobieranie raportu SEU jako PDF albo PNG działa — wcześniej kończyło się błędem.",
        },
      ],
    },
    {
      version: "4.13.1",
      date: "2026-11-19",
      entries: [
        {
          category: "fixed",
          scope: "Aktualizacja instalacji on-premise",
          body: "Skrypty aktualizacji (updated_api, updated_www, updated_www_api, updated_mcp) działają na instalacjach postawionych z wcześniejszych paczek: migracje kolejki zadań nie przerywają aktualizacji API, zmienione hasło bazy danych (set_pass.py) zostaje zachowane po przebudowie API, z plików frontu znika stary katalog repozytorium, a serwer MCP dostaje poprawny token do API.",
        },
      ],
    },
    {
      version: "4.13.0",
      date: "2026-11-19",
      entries: [
        {
          category: "added",
          scope: "Integracje ERP",
          body: "Nowy ekran Konfiguracja → Integracje ERP łączy OmniMES z systemem ERP. Zlecenia produkcyjne trafiają do OmniMES automatycznie — pobierane z API systemu ERP co kilka minut, wysyłane przez ERP na API OmniMES z kluczem integracji albo importowane z pliku CSV lub JSON. OmniMES odsyła do ERP meldunki o postępie, zakończeniu i anulowaniu zleceń (webhook z podpisem HMAC). Pola, jednostki, statusy i gniazda robocze mapujesz na ekranie i sprawdzasz testem bez zapisu; gotowe ustawienia startowe dla SAP Business One, enova365, Comarch Optima i XL, Symfonii, Subiekta oraz plików CSV. Dziennik komunikatów i kolejka meldunków pokazują, co przyszło z ERP i co do niego wyszło.",
        },
        {
          category: "added",
          scope: "Norma czasu cyklu w zleceniu",
          body: "Zlecenie ma pole „norma czasu cyklu” (sekundy na sztukę) — na ekranie Zlecenia → Wprowadzone, w API i w mapowaniu z ERP. Z niej raport zlecenia liczy wydajność OEE.",
        },
        {
          category: "added",
          scope: "Hala 3D: wskaźnik ładowania",
          body: "Podczas wczytywania modelu hali widać wskaźnik „Ładowanie modelu hali…” zamiast pustego obszaru.",
        },
        {
          category: "changed",
          scope: "OEE w raporcie zlecenia",
          body: "Wydajność jest liczona z normy czasu cyklu: norma × wyprodukowane sztuki / czas pracy. Wcześniej wychodziła prawie zawsze 100%, więc OEE było w praktyce iloczynem dostępności i jakości. Zlecenie bez normy pokazuje „brak normy czasu cyklu w zleceniu” zamiast zmyślonych 100%, a wyprodukowane sztuki to dobre plus braki.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy: zużycie z liczników",
          body: "WEE, linia bazowa i ZWE liczą zużycie z liczników narastających za cały okres, a nie z ostatnich 10 000 odczytów. Chwilowy błędny odczyt nie zeruje już okresu, a reset lub wymiana licznika są rozpoznawane. Okresy liczone są w czasie lokalnym (wcześniej były przesunięte o 1–2 godziny), a wartości ręczne przypisane do kilku maszyn nie są sumowane wielokrotnie. Sygnał, który nie wygląda na licznik narastający, jest oznaczany.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy: brak produkcji, nośniki i jednostki",
          body: "Gdy mianownik wskaźnika (np. produkcja) wynosi 0 albo go brak, WEE i linia bazowa pokazują „czeka na dane” lub „brak produkcji” zamiast dzielić przez 1. Ranking ZWE i udziały są liczone osobno dla każdego nośnika, jednostka WEE wynika z definicji licznika i mianownika, a konfiguracja linii bazowej bez zakresu pokazuje „Brak zakresu” zamiast liczyć cały zakład. Działają dymki na ekranach OmniEnergy, a podpowiedź pod rankingiem ZWE pokazuje liczby.",
        },
        {
          category: "fixed",
          scope: "MTTR, MTTF i MTBF w raporcie zlecenia",
          body: "Wskaźniki niezawodności liczone są według właściwych wzorów — wcześniej pola były zamienione, a MTBF wychodził mniejszy niż MTTF. Raport zlecenia obejmuje cały zadeklarowany okres, a nie tylko ostatnią dobę.",
        },
        {
          category: "fixed",
          scope: "Wykres pomiarów",
          body: "Maszyna bez własnych danych w wybranym okresie nie pokazuje już wartości i stanów innych maszyn z tym samym tagiem.",
        },
        {
          category: "fixed",
          scope: "Pulpit, zlecenia i harmonogram",
          body: "Widżet „Ostatnio wygenerowany raport” nie pokazuje OEE 0,00% ani normy „NaN s”, zlecenie wskazuje wygenerowany raport, a okno zlecenia w harmonogramie pokazuje „Wyprodukowanych” i nie wyświetla „Invalid date”.",
        },
        {
          category: "fixed",
          scope: "Zmiana hasła bazy danych",
          body: "Po zmianie hasła bazy (set_pass.py, panel chmury) filtr i wzbogacanie sygnałów działają dalej — hasło połączenia między bazami aktualizuje się razem z hasłem bazy.",
        },
        {
          category: "fixed",
          scope: "Stopka w wersji angielskiej",
          body: "Stopka wersji angielskiej pokazuje poprawny znak ©.",
        },
      ],
    },
    {
      version: "4.12.0",
      date: "2026-11-18",
      entries: [
        {
          category: "added",
          scope: "Studio aplikacji: gotowa aplikacja w menu jednym kliknięciem",
          body: "Gotową aplikację dodasz do menu bocznego prosto z listy aplikacji albo z zakładki Menu. W tym samym oknie możesz od razu założyć dla niej nową sekcję menu — bez przechodzenia między ekranami.",
        },
        {
          category: "changed",
          scope: "Hala 3D i Pomiary",
          body: "Hologram nazywa się teraz Hala 3D, a zakładka Media w Analizie — Pomiary. Nowe nazwy widać w menu, ustawieniach i na ekranach.",
        },
        {
          category: "changed",
          scope: "Analiza: bez zakładki OEE i raportu manualnego",
          body: "Zakładka Analiza → OEE i typ „raport manualny” w generatorze raportów zostały usunięte. Widżet pulpitu z analizą OEE ostatniego zlecenia działa dalej, a wcześniej wygenerowane raporty manualne zostają na liście raportów.",
        },
        {
          category: "fixed",
          scope: "Menu po aktualizacji",
          body: "Osoby zalogowane przed aktualizacją nie widzą już w menu pozycji, których ekranów nie ma w nowej wersji — wcześniej kliknięcie takiej pozycji kończyło się pustą stroną.",
        },
        {
          category: "fixed",
          scope: "Asystent dokumentacji",
          body: "Asystent odpowiada w języku pytania i zna najnowsze rozdziały instrukcji, a link do źródła prowadzi do wersji w tym samym języku.",
        },
        {
          category: "security",
          scope: "Własne hasła każdej nowej instalacji",
          body: "Instalator losuje przy instalacji hasła bazy danych, brokera MQTT, panelu EMQX oraz administratora OmniMES i Redasha, a także klucze sesji i API — każda instalacja ma własne poświadczenia zamiast wspólnych z paczki. Na koniec instalacji hasła są wyświetlane i zapisywane w pliku DANE_DOSTEPOWE.txt. Istniejące instalacje zachowują swoje hasła.",
        },
        {
          category: "security",
          scope: "Bezpieczniejsze obrazy i chmura",
          body: "Serwer aplikacji nie udostępnia plików roboczych repozytorium i blokuje pliki ukryte. Agent zarządzający instancjami w chmurze uwierzytelnia się tajnym kluczem.",
        },
        {
          category: "security",
          scope: "Podpisywane licencje",
          body: "OmniMES obsługuje nowy format licencji podpisany kryptograficznie (Ed25519). Dotychczasowe licencje działają bez zmian.",
        },
      ],
    },
    {
      version: "4.11.0",
      date: "2026-11-16",
      entries: [
        {
          category: "added",
          scope: "Hologram: największe zużycie mediów",
          body: "Nad modelem 3D pojawia się pasek z największymi odbiorcami energii elektrycznej, wody, gazu, sprężonego powietrza czy ciepła z ostatnich 24 godzin, 7 albo 30 dni: łączne zużycie i trzy maszyny o największym udziale — kliknięcie przybliża maszynę. Ci sami odbiorcy dostają na modelu znacznik z ikoną medium i miejscem w rankingu. Osoba z uprawnieniem do ustawień hologramu wybiera, które pomiary oznaczają zużycie, i przypisuje im medium. Liczniki liczone są jako przyrost, a wartości chwilowe (np. kW, m³/h) jako zużycie w czasie.",
        },
        {
          category: "added",
          scope: "Hologram: rekomendacje zużycia dla całej hali",
          body: "Rozwijana lista nad modelem podpowiada, gdzie szukać oszczędności: które maszyny zużywają większość danego medium, gdzie zużycie wzrosło względem poprzedniego okresu i które urządzenia pobierają energię, wodę albo sprężone powietrze także w przerwach (czuwanie, nieszczelności, wycieki). Rekomendacje wynikają z danych OmniMES — bez modelu predykcyjnego.",
        },
      ],
    },
    {
      version: "4.10.0",
      date: "2026-11-16",
      entries: [
        {
          category: "added",
          scope: "Hologram: warstwy widoku",
          body: "Przycisk „Warstwy” nad modelem 3D zastępuje „Etykiety”: osobno włączasz nazwy maszyn, ich stan, parametry, strefy, przepływ materiału i oświetlenie. Parametry widać bezpośrednio nad maszynami — z daleka jako jedna linia wartości, z bliska jako tabelka — i możesz wybrać, które pomiary pokazać. Ustawienie zapamiętuje przeglądarka.",
        },
        {
          category: "added",
          scope: "Hologram: rekomendacje na karcie maszyny",
          body: "Po kliknięciu maszyny panel podpowiada, dlaczego stoi i co zrobić: jak długo trwa awaria lub postój na tle wcześniejszych, czy przyczyna leży wcześniej w procesie (poprzednie stanowisko nie podaje materiału) czy dalej (następne nie odbiera), ile było mikropostojów, jaka jest dostępność z 7 dni, MTBF i MTTR, które pomiary wyszły poza typowy zakres i ile energii maszyna pobiera w postojach. Rekomendacje wynikają z historii maszyny w OmniMES i stanu sąsiednich stanowisk — bez modelu predykcyjnego. Te same dane dostaje asystent AI przez MCP.",
        },
        {
          category: "added",
          scope: "Hologram: oświetlenie hali",
          body: "Model może pokazywać oprawy oświetlenia pod stropem przypięte do obwodów monitorowanych w OmniMES. Świecą, przygasają w trybie oszczędnym, gasną albo migają przy awarii obwodu — zgodnie ze stanem na żywo.",
        },
      ],
    },
    {
      version: "4.9.0",
      date: "2026-11-15",
      entries: [
        {
          category: "added",
          scope: "Studio aplikacji [Beta] — aplikacje budowane rozmową z Claude (MCP Apps)",
          body: "Opisujesz w czacie, czego potrzebujesz, a Claude buduje interaktywną aplikację na danych OmniMES: wskaźniki, wykresy, tabele, notatki i formularze. Aplikacje trafiają do menu bocznego, do sekcji i podmenu, które tworzysz sam, a udostępniasz je wybranym grupom albo osobom. Każda zmiana zapisuje nową wersję, do której można wrócić. Aplikacje działają w otwartym standardzie MCP Apps, więc te same aplikacje otworzysz też w rozmowie w Claude Desktop.",
        },
        {
          category: "added",
          scope: "Dwie drogi budowania aplikacji",
          body: "W OmniMES (zakładka Kreator) z kluczem API Claude z Claude Console — plany Claude Max, Ultra i Team zawierają co miesiąc kredyty API. Poza OmniMES w Claude Desktop, na własnej subskrypcji Claude, przez rozszerzenie OmniMES z osobistym tokenem. Do wyboru Claude Opus 5.5 (zalecany), Fable 5.2, Sonnet 5.5, Haiku 5.5 oraz inne zgodne modele pobierane z API Anthropic.",
        },
        {
          category: "added",
          scope: "Dziennik Studia aplikacji",
          body: "Superuser widzi, kto utworzył i zmienił aplikację, kto zmienił menu i udostępnianie, kto utworzył albo odwołał osobisty token, jakie dane aplikacje zapisały i czego system odmówił — z filtrem po aplikacji i rodzaju zdarzenia.",
        },
        {
          category: "security",
          scope: "Bezpieczne aplikacje Studia",
          body: "Aplikacja działa z uprawnieniami oglądającego i nigdy z większymi niż jej autora; nie ma dostępu do tokenu, ciasteczek ani internetu. Każdy zapis danych z aplikacji potwierdza oglądający w oknie, które pokazuje, co zostanie zapisane i kto napisał aplikację; w Claude Desktop zapis jest wyłączony. Aplikacje z funkcjami administracyjnymi włącza wyłącznie superuser.",
        },
      ],
    },
    {
      version: "4.8.0",
      date: "2026-11-14",
      entries: [
        {
          category: "added",
          scope: "Uprawnienia sprawdzane także przez serwer",
          body: "Ekrany przypisane grupie w „Uprawnieniach dostępu” decydują teraz również o tym, jakie dane użytkownik odczyta i zmieni przez API, także z pominięciem interfejsu. Hasła i klucze z Konfiguracji ogólnej widzą tylko grupy, których ekrany z nich korzystają. Nowe instalacje mają egzekwowanie włączone od razu. W zaktualizowanych instalacjach system najpierw tylko rejestruje, czego by odmówił, a administrator włącza egzekwowanie po przejrzeniu raportu odmów (opis: BEZPIECZENSTWO_API.md w instalatorze).",
        },
        {
          category: "changed",
          scope: "Konfiguracja ogólna → Redash",
          body: "Przy polu „Adres Redash” jest przycisk „Otwórz Redash”, który otwiera Redash w nowej karcie. Techniczny panel stanu danych BI zniknął z ekranu; ten sam stan pokazuje raport administracyjny.",
        },
        {
          category: "changed",
          scope: "Usuwanie użytkownika",
          body: "Usunięcie konta potwierdza się w oknie aplikacji z loginem usuwanego konta (zamiast okna przeglądarki), a gdy system odmówi, wyświetla komunikat z powodem.",
        },
        {
          category: "fixed",
          scope: "Usuwanie użytkownika przy nowszym Redashu",
          body: "Użytkownika da się usunąć także wtedy, gdy Redash nie ma rozszerzenia OmniMES do usuwania kont. Konto w Redashu jest wtedy wyłączane, a jego adres e-mail zwalniany, więc tę samą osobę można dodać ponownie.",
        },
        {
          category: "fixed",
          scope: "Raporty z szablonu: błędny wzór",
          body: "Błędny wzór w elemencie raportu (np. pusty nawias albo brakująca wartość) daje wynik „błąd składni” zamiast błędu serwera.",
        },
        {
          category: "fixed",
          scope: "Kopie zapasowe: import starszych kopii",
          body: "Import kopii zapisanej w starszym formacie nie kończy się błędem serwera.",
        },
        {
          category: "fixed",
          scope: "Konfiguracja ogólna bez zbędnych błędów",
          body: "Osoby bez prawa zmiany ustawień nie widzą już błędu przy liście modeli asystenta AI.",
        },
        {
          category: "security",
          scope: "Ochrona kont administracyjnych",
          body: "Konta administratora głównego (np. omni), konta serwisowe (mcp, redash_bi) i członków grupy Administratorzy może zmienić (hasło, login, e-mail, profil, usunięcie) wyłącznie administrator główny; tylko on przypisuje też do grupy Administratorzy. Zasada działa niezależnie od trybu uprawnień.",
        },
        {
          category: "security",
          scope: "Hasła użytkowników niedostępne dla innych kont",
          body: "Usunięto lukę, przez którą zalogowany użytkownik mógł odczytać hasło innej osoby, także administratora. Po aktualizacji zalecamy zmianę haseł kont administracyjnych.",
        },
        {
          category: "security",
          scope: "Wzory w raportach liczone bezpiecznie",
          body: "Usunięto lukę, przez którą zalogowany użytkownik mógł wykonać polecenia na serwerze przy generowaniu raportu z szablonu. Wzory przyjmują teraz wyłącznie liczby, działania arytmetyczne i nawiasy. Zalecamy aktualizację wszystkim instalacjom.",
        },
        {
          category: "security",
          scope: "Kopie zapasowe bez tokenów dostępu",
          body: "Kopie zapasowe nie zawierają tokenów dostępu do API, a import kopii z kontami użytkowników może wykonać tylko administrator główny.",
        },
        {
          category: "security",
          scope: "Paczka instalacyjna sprawdzana przed wydaniem",
          body: "Każde wydanie sprawdza paczkę instalacyjną pod kątem kluczy i haseł, które nie powinny do niej trafić.",
        },
      ],
    },
    {
      version: "4.7.0",
      date: "2026-11-13",
      entries: [
        {
          category: "added",
          scope: "Ustawienia → Redash: dostęp do danych BI",
          body: "Administrator widzi, w jakim trybie działa dostęp do danych BI, kto w ostatnich 7 dniach pobierał je bez tokenu (adres i program) oraz kiedy i z jakim skutkiem system ostatnio dopisał token do zapytań Redasha. Dzięki temu wiadomo, kiedy można bezpiecznie włączyć tryb wymagający tokenu.",
        },
        {
          category: "changed",
          scope: "Pulpity i asystent AI dopisują token do zapytań Redasha",
          body: "Nowe zapytania utworzone w module Pulpity i przez asystenta AI (MCP) od razu mają nagłówek z tokenem, a analiza pulpitów przez asystenta AI czyta dane także wtedy, gdy token jest wymagany.",
        },
        {
          category: "fixed",
          scope: "Opisy kolumn w kreatorze zapytań",
          body: "Kreator zapytań pobiera opisy kolumn z adresu API, którego używa przeglądarka (wcześniej z adresu przeznaczonego dla Redasha, często nieosiągalnego z komputera użytkownika), i poprawnie rozpoznaje adres w zapytaniach zapisanych w kilku liniach.",
        },
        {
          category: "fixed",
          scope: "Błędny token — czytelna odpowiedź zamiast błędu serwera",
          body: "Zapytanie z nieprawidłowym lub wygasłym tokenem dostaje odpowiedź „brak uwierzytelnienia” (401) zamiast błędu serwera (500).",
        },
        {
          category: "security",
          scope: "Bezpieczne ustawienia API (Cyber Resilience Act)",
          body: "Nowa, opcjonalna sekcja SECURITY w konfiguracji instalacji: wyłączony tryb debugowania, lista adresów, pod którymi działa API, dostęp z przeglądarki (CORS) tylko dla adresu OmniMES i własny tajny klucz każdej instalacji. Raporty BI, dokumenty OmniEnergy i panel administracyjny działają także w tym trybie. Bez tej sekcji system działa dokładnie jak dotąd — aktualizacja niczego nie zmienia, a w logu pojawia się przypomnienie. Instrukcja dla wdrożeniowców: BEZPIECZENSTWO_API.md w instalatorze.",
        },
        {
          category: "security",
          scope: "Dane BI dla Redasha chronione tokenem",
          body: "Pulpity Redasha pobierają dane z OmniMES z tokenem konta serwisowego, które może wyłącznie odczytywać dane BI. Token dopisuje się sam do istniejących zapytań w ciągu 15 minut po aktualizacji (treść sprzed zmiany jest zachowana), a pulpity — także udostępnione osobom trzecim linkiem publicznym — działają bez zmian. Trzy tryby: otwarty, loguj (domyślny: pobieranie bez tokenu działa, ale jest widoczne w Ustawieniach) i wymagaj (bez tokenu odmowa).",
        },
      ],
    },
    {
      version: "4.6.1",
      date: "2026-11-13",
      entries: [
        {
          category: "added",
          scope: "Dokumentacja — rozdział Hologram",
          body: "Instrukcja (online i PDF w instalatorze) ma nowy rozdział o Hologramie: tryb na żywo, symulacja z przykładem szukania wąskiego gardła, konfiguracja, historia wersji oraz budowa modelu przez asystenta AI krok po kroku.",
        },
        {
          category: "changed",
          scope: "Hologram — objaśnienia w symulacji",
          body: "Okno parametrów symulacji wyjaśnia, czym są Miejsca, Bufor oraz praca między postojami i postój. Legenda na pasku symulacji ma podpis „Stany w symulacji”, żeby nie myliła się ze stanami maszyn z Konfiguratora statusów. Kreator polecenia dla asystenta AI podpowiada, że inny park albo zakres wybiera się w kreatorze, a nie poprawia ręcznie w poleceniu.",
        },
        {
          category: "fixed",
          scope: "Hologram — nazwy maszyn zawsze z OmniMES",
          body: "Model 3D, karty stanowisk, panel szczegółów i symulacja pokazują nazwy maszyn dokładnie takie jak w strukturze OmniMES — także wtedy, gdy asystent AI zapisał w modelu inne, np. przetłumaczone. Przenośniki bez własnej nazwy mają w symulacji czytelne opisy, np. „Przenośnik c2”, zamiast samego oznaczenia.",
        },
      ],
    },
    {
      version: "4.6.0",
      date: "2026-11-11",
      entries: [
        {
          category: "added",
          scope: "Hologram — model 3D hali produkcyjnej z danymi na żywo",
          body: "Nowy ekran obok Monitoringu i Planogramu: hala z maszynami, liniami, regałami, wózkami i przepływem materiału w 3D. Każda maszyna pokazuje swój stan na żywo (sygnalizator na maszynie, obrys na posadzce w kolorze statusu, tabliczka z numerem stanowiska), a karty stanowisk w kolejności procesu podają aktualne pomiary. U góry liczniki: maszyny w pracy, postoje i awarie. Kliknięcie karty przybliża widok do maszyny; dostępny jest widok z góry i pełny ekran, a karty stanowisk można ustawić z boku, na dole albo je ukryć.",
        },
        {
          category: "added",
          scope: "Hologram — symulacja przepływu",
          body: "Ten sam model w trybie symulacji pokazuje, jak materiał płynie przez linie: wydajność, liczbę gotowych wyrobów i wąskie gardło. Czas cyklu i liczbę miejsc w buforach można zmienić przy stanowisku i od razu zobaczyć efekt — bez ryzyka dla produkcji.",
        },
        {
          category: "added",
          scope: "Hologram — model budowany przez asystenta AI (MCP)",
          body: "Model hali tworzy asystent AI (zalecany Claude Opus 5.5 lub nowszy) przez serwer MCP, na podstawie maszyn i linii zapisanych w systemie. Zakres może obejmować cały park maszynowy, wybrane linie albo pojedyncze maszyny. Kreator w „Hologram – ustawienia” przygotowuje gotowe polecenie do skopiowania, a po każdym zapisie system sprawdza model (brakujące maszyny, nachodzące na siebie elementy, maszyny poza przepływem) i podpowiada asystentowi, co poprawić. Istniejący model można rozbudować o kolejne maszyny.",
        },
        {
          category: "added",
          scope: "Hologram — wersje i konfiguracja",
          body: "Każda zmiana modelu zapisuje nową wersję z autorem i opisem; wcześniejszą wersję można przywrócić jednym kliknięciem. W konfiguracji można zmienić nazwę i opis, zapisać widok startowy kamery, powiązać element modelu z maszyną albo usunąć element.",
        },
      ],
    },
    {
      version: "4.5.1",
      date: "2026-11-10",
      entries: [
        {
          category: "changed",
          scope: "Dokumentacja — zalecany system: Linux z Dockerem",
          body: "Wymagania sprzętowe i instrukcja instalacji jasno wskazują zalecane środowisko serwera produkcyjnego: Linux (Debian lub Ubuntu Server LTS) z Docker Engine. Przy infrastrukturze opartej na Windows zalecamy maszynę wirtualną z Linuksem. Instalacja na Windows Server wymaga indywidualnych ustaleń, a dokumentacja wyjaśnia dlaczego: Docker Desktop nie jest tam wspierany przez producenta, a system startuje dopiero po zalogowaniu użytkownika.",
        },
        {
          category: "changed",
          scope: "Dokumentacja — nowe minimalne wymagania sprzętowe",
          body: "Minimalna konfiguracja serwera to teraz 16 GB RAM i procesor z co najmniej 4 rdzeniami i 8 wątkami. Dzięki temu system ma zapas na telemetrię, pulpity BI i funkcje AI działające jednocześnie.",
        },
        {
          category: "changed",
          scope: "Instalator — przypięty do numeru wersji",
          body: "Paczka instalacyjna zawiera numer wersji i instaluje dokładnie tę wersję, z którą została wydana — także przy ponownej instalacji lub przebudowie usług. Wcześniej instalator pobierał zawsze najnowszy kod, więc ta sama paczka mogła zainstalować różne wersje w różnych dniach.",
        },
        {
          category: "fixed",
          scope: "Instalacja — budowa interfejsu www",
          body: "Na nowszych systemach budowa interfejsu przerywała instalację i aktualizację z błędem pobierania kodu. Sposób pobierania został poprawiony i działa zarówno na starszych, jak i nowych wersjach narzędzi.",
        },
        {
          category: "fixed",
          scope: "Asystent AI (MCP) — instalacja",
          body: "Świeża instalacja mogła pobrać niezgodną, nową wersję biblioteki MCP, przez co serwer dla asystentów AI (Claude, Cursor) się nie uruchamiał. Wersja biblioteki jest teraz przypięta do zgodnej.",
        },
      ],
    },
    {
      version: "4.5.0",
      date: "2026-10-02",
      entries: [
        {
          category: "added",
          scope: "OmniEnergy — cykliczne porównanie okresów ZWE wysyłane mailem",
          body: "W harmonogramie automatyzacji nowy typ zadania „Porównanie okresów ZWE”. System sam zestawia wybraną liczbę ostatnich okresów konfiguracji ZWE i wysyła mailem tabelę porównania (maszyna i źródło w wierszach, okresy w kolumnach, zmiana procentowa i zmiana łącznie) z załącznikiem CSV. Liczby są identyczne z tymi w oknie porównania w aplikacji. Gdy brakuje okresów o zbliżonej długości, zadanie zostaje pominięte z czytelnym powodem, zamiast zgłaszać błąd.",
        },
        {
          category: "added",
          scope: "OmniEnergy — eksport raportu ZWE i porównania okresów do PDF i PNG",
          body: "Raport i porównanie można pobrać jako PDF (format A4 z podziałem na strony) albo PNG, z wykresami dokładnie takimi jak na ekranie. Pliki trafiają też do archiwum na serwerze, tak jak raporty z pulpitów BI.",
        },
        {
          category: "added",
          scope: "OmniEnergy — sumaryczne zużycie w porównywarce okresów",
          body: "Przy zmianie procentowej widać sumę zużycia w każdym porównywanym okresie, w nagłówku raportu i w każdej grupie źródeł. Sumy liczone są osobno dla każdej jednostki, więc kWh nie są dodawane do metrów sześciennych.",
        },
        {
          category: "added",
          scope: "OmniEnergy — filtr listy ZWE po konfiguracji",
          body: "Listę raportów ZWE można zawęzić do wybranej konfiguracji; wybór jest zapamiętywany razem z pozostałymi filtrami.",
        },
        {
          category: "added",
          scope: "Planogram — układanie kafelków",
          body: "Zaznaczone kafelki można wyrównać w jednej linii poziomej lub pionowej, rozmieścić w równych odstępach albo ułożyć w siatce. Wyrównanie liczone jest względem środków kafelków, więc kafelki różnej wielkości układają się równo.",
        },
        {
          category: "added",
          scope: "Logo firmy w aplikacji",
          body: "W Konfiguracji ogólnej można wgrać logo klienta (wersję jasną i ciemną); wyświetla się w nagłówku systemu obok logo OmniMES.",
        },
        {
          category: "added",
          scope: "Konfigurator statusów — jednostka parametru",
          body: "Przy dodawaniu parametru w nowym profilu można od razu podać jego jednostkę.",
        },
        {
          category: "changed",
          scope: "Logowanie — nazwa użytkownika albo e-mail",
          body: "Do OmniMES można się zalogować nazwą użytkownika albo adresem e-mail (bez rozróżniania wielkości liter), czyli tym samym adresem co do Redasha. E-mail jest wymagany i unikalny dla nowych kont, a jego zmiana w panelu użytkownika od razu obowiązuje przy logowaniu. Dotychczasowe loginy działają bez zmian.",
        },
        {
          category: "changed",
          scope: "Konfiguracja ogólna — podpowiedź portu brokera",
          body: "Podpowiedź zależy od protokołu: MQTT → 1883, szyfrowany MQTTS → 8883; nazwy protokołów zapisane wielkimi literami.",
        },
        {
          category: "changed",
          scope: "Wykrywanie sygnałów — filtr tematu w regułach filtrowania",
          body: "Filtr nazwy tematu MQTT jest w sekcji „Reguły filtrowania”, z opisem różnicy względem reguł działających na tagach. Zwinięcie sekcji czyści filtry, więc wykrywanie nie zawęża się już po cichu.",
        },
        {
          category: "fixed",
          scope: "Pulpity — zapytania JSON w instalacji lokalnej",
          body: "Zapytania JSON tworzone kreatorem nie wykonywały się w Redashu w instalacji lokalnej, bo Redash próbował połączyć się sam ze sobą. W konfiguracji Redasha doszło pole z adresem OmniMES dla Redasha, domyślnie ustawione tak, by instalacja lokalna działała bez zmian.",
        },
        {
          category: "fixed",
          scope: "Wykrywanie sygnałów — reguły filtrowania",
          body: "Poprawiono błędy, przez które reguły filtrowania działały inaczej, niż wskazywała konfiguracja.",
        },
        {
          category: "fixed",
          scope: "Czas pracy — wszystkie zdarzenia w instalacji lokalnej",
          body: "Widok pokazywał tylko zdarzenia maszyn klasyfikowanych na podstawie pomiarów; teraz pokazuje zdarzenia wszystkich maszyn.",
        },
        {
          category: "fixed",
          scope: "Konfigurator statusów — pole „wartość tagu”",
          body: "Po użyciu klasyfikacji na podstawie pomiaru pole pozostawało zablokowane nawet po usunięciu zakresu, więc nie dało się wrócić do klasycznej klasyfikacji stanów.",
        },
        {
          category: "fixed",
          scope: "Profile — segmenty prędkościomierza",
          body: "Konfiguracja nowego profilu pokazuje tyle segmentów, ile widać na podglądzie.",
        },
        {
          category: "fixed",
          scope: "Planogram — zmiana rozmiaru kafla",
          body: "Wpisanie nowego rozmiaru kafla w edytorze planogramu powodowało błędy.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — miesięczne podsumowania z automatyzacji",
          body: "Mail z podsumowaniem przychodzi pierwszego dnia miesiąca z danymi za cały poprzedni miesiąc; wcześniej w miesiącach 31-dniowych przychodził 30. dnia.",
        },
      ],
    },
    {
      version: "4.4.0",
      date: "2026-07-29",
      entries: [
        {
          category: "added",
          scope: "Monitoring — własna kolejność kafelków",
          body: "Kafelki maszyn można ułożyć w dowolnej kolejności w obrębie linii, zamiast wyłącznie alfabetycznie. Ustawienie jest wspólne dla wszystkich użytkowników i zapamiętywane, a wybór sposobu sortowania (A–Z, Z–A, własna) zostaje przy kolejnym wejściu na ekran.",
        },
        {
          category: "added",
          scope: "Monitoring — własna nazwa podstatusu dla pojedynczej maszyny",
          body: "Nazwę wyświetlaną pod kafelkiem można nadpisać dla jednej maszyny bez zmieniania profilu wspólnego dla wszystkich. Wcześniej jedyną drogą było duplikowanie całego profilu.",
        },
        {
          category: "added",
          scope: "OmniEnergy — ręczne wartości WEE za konkretny okres",
          body: "Jeśli licznik lub mianownik wskaźnika nie pochodzi z pomiaru (np. liczba wyprodukowanych sztuk z raportu zmianowego), można podać wartość dla danej migawki, a nie jedną stałą dla wszystkich okresów. Do tej pory ta sama liczba trafiała do każdego okresu, przez co trend potrafił pokazywać odwrotny kierunek niż rzeczywisty.",
        },
        {
          category: "added",
          scope: "OmniEnergy — automatyzacja czekająca na dane",
          body: "Harmonogram może utworzyć migawkę i oznaczyć ją jako oczekującą na wartość, zamiast podstawiać stałą z konfiguracji. Lista migawek pokazuje, ile okresów czeka na uzupełnienie, a wartość można wpisać wprost z listy.",
        },
        {
          category: "added",
          scope: "OmniEnergy — porównywarka okien czasowych ZWE",
          body: "Zestawienie zużycia per maszyna dla wielu wybranych okresów naraz, ze zmianą względem poprzedniego okresu i podsumowaniem od pierwszego do ostatniego. Porównanie okresów o wyraźnie różnej długości jest blokowane, bo dawałoby mylące wyniki.",
        },
        {
          category: "added",
          scope: "Konfigurator statusów — filtr tematu przy wykrywaniu sygnałów",
          body: "Przy automatycznym wykrywaniu sygnałów można zawęzić nasłuch do wybranego tematu MQTT, zamiast przeglądać wszystko, co nadaje broker.",
        },
        {
          category: "changed",
          scope: "Konfigurator statusów — jednolity zapis przyciskiem",
          body: "Profile statusów i lista statusów zapisują się dopiero po kliknięciu „Zapisz”, a nie po każdym opuszczeniu pola. Zmienione wiersze są oznaczane, a zamknięcie okna z niezapisanymi zmianami wymaga potwierdzenia.",
        },
        {
          category: "changed",
          scope: "OmniEnergy — czytelniejsza konfiguracja EnLB",
          body: "Wartość bazowa i wskaźnik dla maszyn są rozdzielone ramkami; pola wartości ręcznych opisane są jednostką z definicji wskaźnika zamiast określeniami „licznik” i „mianownik”.",
        },
        {
          category: "changed",
          scope: "OmniEnergy — ślad audytowy wartości ręcznych",
          body: "Przy każdej wartości podanej ręcznie zapisywane jest, kto i kiedy ją wprowadził. Wartości ręcznych nie da się odtworzyć z pomiarów, więc przy przeglądzie ISO 50001 muszą być identyfikowalne.",
        },
        {
          category: "fixed",
          scope: "Monitoring — brakujące maszyny na liście",
          body: "Ekran pokazywał maksymalnie 30 maszyn na linię; przy większej liczbie część kafelków była niewidoczna bez żadnego ostrzeżenia. Teraz zawsze wyświetlane są wszystkie maszyny z linii.",
        },
        {
          category: "fixed",
          scope: "Konfigurator statusów — limit wykrywanych sygnałów",
          body: "Ustawiony limit był ignorowany i wykrywanie potrafiło zebrać wielokrotnie więcej sygnałów, niż wskazano. Poprawiono też filtry, w których pusta reguła przepuszczała lub blokowała wszystko.",
        },
        {
          category: "fixed",
          scope: "Profile statusów — wartości ułamkowe prędkościomierza",
          body: "Maksymalna wartość zakresu była po cichu zaokrąglana do liczby całkowitej. Kolumna w bazie została doprowadzona do zgodności z modelem, wraz z brakującymi kolumnami raportów.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — zafałszowane wykresy i wskaźniki",
          body: "Migawki bez kompletu danych trafiały na wykres jako zero, tworząc pozorny spadek. Migawki niekompletne są teraz pomijane na wykresie i blokowane w audytach oraz raportach. Sprostowanie: mianownik równy zero był w tej wersji nadal zamieniany na 1 przy liczeniu wskaźnika — poprawka weszła w późniejszej wersji.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — wybór godziny w harmonogramie",
          body: "Pole „Następne wykonanie” korzystało z kontrolki przeglądarki, w której w Firefoksie nie dało się wybrać godziny. Wszystkie pola dat w harmonogramie używają teraz tego samego komponentu co reszta systemu.",
        },
        {
          category: "fixed",
          scope: "Konfiguracja — jednostka parametru",
          body: "Po wyborze parametru jednostka uzupełnia się automatycznie, z możliwością ręcznej zmiany.",
        },
      ],
    },
    {
      version: "4.3.0",
      date: "2026-07-23",
      entries: [
        {
          category: "added",
          scope: "MCP (Model Context Protocol) — OmniMES sterowany z dowolnego asystenta AI",
          body: "Dostępne po instalacji: OmniMES wystawia standardowy endpoint MCP na serwerze fabryki. W dowolnym asystencie AI wspierającym MCP (Claude Desktop, ChatGPT, Cursor, Copilot) instalujesz wtyczkę „OmniMES”, wklejasz token dostępu do serwera i gotowe. Z dowolnego komputera w sieci firmowej, w języku naturalnym, budujesz kompletne dashboardy i raporty, konfigurujesz strukturę parku, statusy maszyn, alarmy i harmonogramy, odczytujesz bieżący stan produkcji oraz źródła i punkty pomiarowe OmniEnergy — bez znajomości interfejsu i bez pisania SQL. Przykład z praktyki: jednym poleceniem „zbuduj dashboard z dostępnością, awaryjnością i kosztem energii na sztukę dla parku maszynowego” asystent tworzy kilkanaście zapytań SQL, wizualizacji i gotowy pulpit w Redashu. Model dobierasz świadomie: komercyjny (Claude, GPT, Gemini) — gdy zależy na jakości; darmowy przez OpenRouter (Llama, Qwen, DeepSeek) — gdy zależy na kosztach; lokalny (Ollama, LM Studio) — gdy dane muszą zostać w sieci fabrycznej.",
        },
      ],
    },
    {
      version: "4.2.1",
      date: "2026-07-10",
      entries: [
        {
          category: "changed",
          scope: "Monitoring",
          body: "Liczniki (wskaźniki) układają się teraz obok siebie i zawijają automatycznie zależnie od szerokości karty maszyny. Przy ustawieniu „1 maszyna w wierszu” (szeroka karta) mieści się ich wiele w jednym rzędzie, przy większej liczbie maszyn w wierszu zawijają się same.",
        },
        {
          category: "fixed",
          scope: "Monitoring",
          body: "Usunięto narastające zużycie pamięci i procesora przy przełączaniu serwera / linii / sortowania (poprzednie połączenia z brokerem nie były zamykane). Ekran monitoringu może być teraz otwarty przez długi czas bez zawieszania przeglądarki, także przy dużej liczbie maszyn.",
        },
        {
          category: "security",
          scope: "Monitoring i stream",
          body: "Odporność na błędny zegar bramki lub sterownika PLC. Czas „z przyszłości” (np. +1 h po zmianie czasu letniego lub zła strefa) jest odrzucany na rzecz czasu serwera, więc nie zafałszowuje archiwum ani wyświetlanego stanu maszyny.",
        },
      ],
    },
    {
      version: "4.2.0",
      date: "2026-07-09",
      entries: [
        {
          category: "added",
          scope: "Klasyfikacja stanu pracy maszyny na podstawie pomiaru",
          body: "Zamiast polegać wyłącznie na sygnałach cyfrowych ze sterownika, stan pracy maszyny (praca / praca jałowa / przezbrojenie / postój) można teraz wyznaczać z progu dowolnego pomiaru analogowego — prądu silnika, ciśnienia hydrauliki, obrotów wrzeciona. Przykład: prąd silnika > 12 A → maszyna pracuje; 3–12 A → praca jałowa; < 3 A → wyłączona. Progi konfiguruje się w konfiguratorze statusów, klasyfikacja działa na żywo w Monitoringu i jest zapisywana w historii, dzięki czemu OEE, MTBF i raporty produkcyjne uwzględniają faktyczny stan maszyny bez potrzeby doprowadzania dodatkowych sygnałów binarnych z PLC.",
        },
      ],
    },
    {
      version: "4.1.0",
      date: "2026-07-08",
      entries: [
        {
          category: "changed",
          scope: "Silnik danych: PostgreSQL + TimescaleDB",
          body: "Zamiast MongoDB — szybsze zapytania i wyraźnie mniejsze zużycie miejsca dla telemetrii, przy zachowaniu dotychczasowej funkcjonalności. Przykład: rok telemetrii z ~150 maszyn zajmował w MongoDB ok. 80 GB, po migracji do PostgreSQL + TimescaleDB (z kompresją hypertables) — ok. 7 GB. To ~10× mniej miejsca przy identycznej ilości danych źródłowych i szybszych zapytaniach na oknach czasowych.",
        },
        {
          category: "added",
          scope: "Bezpośrednia obsługa MQTT (obok Sparkplug B)",
          body: "Stream OmniMES może teraz przyjmować pomiary bezpośrednio z topików MQTT — nie tylko z ramek Sparkplug B. Ułatwia to integrację ze sterownikami, bramkami IIoT i urządzeniami publikującymi dane w formacie natywnym (JSON lub prosty payload), bez konieczności dokładania warstwy Sparkplug po stronie źródła.",
        },
        {
          category: "fixed",
          scope: "Monitoring",
          body: "Poprawne przypisywanie statusów po temacie MQTT oraz tagu; naprawiono błędne dopasowania i pobieranie ostatnich zdarzeń.",
        },
      ],
    },
    {
      version: "4.0.0",
      date: "2026-06-17",
      entries: [
        {
          category: "changed",
          scope: "Nowy interfejs użytkownika: Vue 3 + PrimeVue v4 (motyw Sakai)",
          body: "Powiadomienia w formie Toast oraz zapamiętywanie stanu widoków lokalnie w przeglądarce.",
        },
      ],
    },
  ],
  en: [
    {
      version: "5.1.0",
      name: "OmniMES 5.1",
      date: "2026-11-25",
      entries: [
        {
          category: "added",
          scope: "OmniEnergy: consumption tree",
          body: "The new OmniEnergy → Consumption tree screen shows the consumption of a selected utility (e.g. electricity, gas, water) over a selected period across the plant structure: the whole plant first, then parks, lines and machines as you expand them — with each item's share of the level above, sorted from the largest consumer, and converted to kWh. No setup needed: the tree is built from the plant structure and OmniEnergy sources.",
        },
        {
          category: "added",
          scope: "Machine control: proposals from the AI assistant",
          body: "An AI assistant connected to OmniMES through a personal MCP connection can propose a machine command but cannot send it. The proposal lands in the “Awaiting approval” tab, marked “AI assistant”, with its justification and the signal's current value, and goes to the machine only after a person with the permission approves it. Every step is recorded in the Event log.",
        },
        {
          category: "added",
          scope: "New version notice",
          body: "Once a day OmniMES checks with the licence server whether a newer version is available. Administrators then see a banner with the list of changes, and System status shows the product version and update information. Only the product ID, a random installation ID, the version and the licence status are sent — no personal data. Setting OMNIMES_UPDATE_CHECK=0 turns the check off.",
        },
        {
          category: "added",
          scope: "Installation without internet",
          body: "The offline package contains ready-made Docker images with checksums, so you can install and update OmniMES on a server with no internet access (Installation guide, section 17).",
        },
        {
          category: "added",
          scope: "Installation: server sizing and database profiles",
          body: "The guide now has a server sizing table by number of machines and signals, based on a load test. The new OMNIMES_DB_PROFIL setting (small, medium, large) tunes the database to the size of the installation, and OMNIMES_DB_MEM_LIMIT caps the database's memory. Without these settings the database works as before.",
        },
        {
          category: "changed",
          scope: "Machine control in the cloud",
          body: "In an OmniMES Cloud instance the control screens explain that commands reach machines over the internet — through the instance's broker and the plant gateway. On-premise installations are unchanged.",
        },
        {
          category: "security",
          scope: "Installation package verification",
          body: "The installation package includes a SHA256SUMS file, so you can verify it with sha256sum -c before installing. Every release is also archived on the licence server with its SHA-256 checksum.",
        },
      ],
    },
    {
      version: "5.0.2",
      date: "2026-11-25",
      entries: [
        {
          category: "added",
          scope: "Machine control over MQTT",
          body: "New screen Maintenance → Machine control: send to machines only the commands approved by the administrator (machine, Sparkplug B metric, type, range or list of values). Before sending you see an “old → new” summary, re-enter your password and optionally get a second person’s approval; the machine’s reading confirms the change and every attempt is kept in the history and in the Audit log. The module is off by default — the administrator enables it in Administration → Control configuration.",
        },
        {
          category: "added",
          scope: "OmniEnergy: market energy prices and dynamic tariff",
          body: "Optional download of hourly energy prices from PSE (RCE or SDAC price) and a dynamic tariff: market price × multiplier + margin. The bill, order energy cost and action plan savings are calculated from market prices; an hour without a price marks the bill as incomplete instead of counting zero cost. Prices can also be imported from a CSV file.",
        },
        {
          category: "added",
          scope: "Installation: encrypted HTTPS access",
          body: "The installer includes a built-in reverse proxy with TLS, off by default: OmniMES, API, MCP and Redash over HTTPS with a self-signed certificate, your company certificate or Let's Encrypt, with security headers and redirection from HTTP. Updating changes nothing until you enable the proxy (Installation guide, section 10.5).",
        },
        {
          category: "changed",
          scope: "OmniEnergy: Polish abbreviations",
          body: "The Polish version of OmniEnergy now uses Polish abbreviations (WEE, EnLB, ZWE instead of EnPI, EnB, SEU) on screens, in messages and reports. The English version is unchanged.",
        },
        {
          category: "changed",
          scope: "Traceability: lot without stock at the workstation",
          body: "When a lot at the workstation has no stock left, the operator panel shows a warning. A new setting “Block stage start with an exhausted lot” can block starting and resuming the stage. Consumption above the lot’s stock no longer creates negative stock — the rest is booked as an issue without a lot, with the genealogy gap marked.",
        },
        {
          category: "changed",
          scope: "Machine events: faster plant timeline",
          body: "The event timeline for the whole plant is calculated several times faster (e.g. 97 machines over one day: from about 17 s to about 3–4 s); the screen shows the last 24 hours by default.",
        },
        {
          category: "security",
          scope: "Fixes from the internal security test",
          body: "Findings from the internal penetration test are closed, including an important one: a Studio app can no longer access the AI assistant tokens of the person viewing it. In addition, Main panel layouts can be changed only by their owner, the operator’s RFID/PIN code is visible only on the Users screen, changing the Redash address removes the stored key, and CSV exports no longer carry spreadsheet formulas.",
        },
        {
          category: "security",
          scope: "Redash with a read-only account",
          body: "Redash queries to the OmniMES database run on a separate read-only account instead of the database administrator account.",
        },
      ],
    },
    {
      version: "5.0.1",
      date: "2026-11-23",
      entries: [
        {
          category: "changed",
          scope: "AI assistant only via MCP",
          body: "Conversations with AI about your data now take place in the user's own AI assistant connected to OmniMES via MCP (user menu → Connection with AI assistant) — with the user's permissions and an entry in the Event log. The “AI analysis” button has been removed from the analysis screens, the Main dashboard and Machine events, the “AI assistant analysis” menu item has been removed (the old address leads to the Main dashboard) and the chat has been removed from the App Studio — apps are built through “Connection with Claude”. AI functions whose result goes into a form remain: “Suggest SQL” and “Suggest a chart” in Desktops, and findings, recommendations and summary in the energy audit.",
        },
        {
          category: "changed",
          scope: "Machine events: signal values (diagnostics)",
          body: "The tab with raw signal values is now called “Signal values (diagnostics)” and is visible only to users allowed to configure statuses (Structure or Status configurator); others see the event timeline only. For an “Unknown state” event the “Assign status” button opens this tab with the machine and the event period.",
        },
      ],
    },
    {
      version: "5.0.0",
      name: "OmniMES 5.0",
      date: "2026-11-22",
      entries: [
        {
          category: "added",
          scope: "Maintenance",
          body: "A new module for the maintenance team. The operator reports a breakdown from the operator panel — with a photo and a link to the downtime — and the technician runs a work order: status, assignment, labour time, spare parts from the item master issued from stock, cause and actions taken. Planned inspections by calendar or operating hours create work orders automatically. MTBF and MTTR can be calculated from breakdown reports or from telemetry (source switch in Analysis). The machine card shows its history, technicians have a “My work orders” screen, and there are three maintenance reports.",
        },
        {
          category: "added",
          scope: "Maintenance: machine events",
          body: "The former Event history is now “Machine events” in the Maintenance section: one timeline per machine, line or park with states, downtimes, alarms, maintenance reports and operator pauses. You can add a note to a breakdown, downtime or alarm, assign a downtime reason or report a breakdown straight from the event, and export the list to CSV. Alarms have also moved to the Maintenance section.",
        },
        {
          category: "added",
          scope: "Alarms and notifications",
          body: "A new Alarms screen with rules, an alarm list and notification history. Rules: no data from a machine, machine stopped for longer than a set time, and process rules on any signal — threshold, range, rate of change or state — with hysteresis and duration. Notifications go by email, to the bell in the top bar, to Microsoft Teams or to Slack. A rule can be limited to shift time and has reminders, silencing and escalation up to 5 levels, which stops when someone acknowledges the alarm with a comment. After the update only the “License expires” rule is active (bell notification for Administrators) — you set up the other rules yourself.",
        },
        {
          category: "added",
          scope: "OmniEnergy: EnPI deviation alarms",
          body: "Two new alarm rules: “EnPI deviation from baseline” (threshold in %, direction, several consecutive periods — day, week, month or shift) and “EnPI CUSUM” (threshold in % or kWh, optionally a trend change), with a CUSUM chart in the alarm details. The rules are evaluated once the period has ended.",
        },
        {
          category: "added",
          scope: "Production: production calendar",
          body: "Production → Production calendar shows orders and operations in month, week and day views — planned ones according to the plan, running and finished ones according to actual execution — with a “now” line, a “Now in production” panel and park, line and resource filters. It replaces the former Overview → Production schedule screen.",
        },
        {
          category: "added",
          scope: "Production: correcting a quantity report",
          body: "The operator can correct their last quantity report in the panel within a set time window (10 minutes by default), and a supervisor can correct any report — after the window, with a mandatory reason. The correction recalculates the stage, lot, consumption and finished product, is recorded in the order history and the Event log with before and after values, and ERP receives a report with the difference.",
        },
        {
          category: "added",
          scope: "Production: operator working time",
          body: "The operator starts work on an order with their card at the workstation or with the “Start work” button; the session ends with a button, logout, the end of the shift from the calendar or the end of the operation. Labour hours are shown in the order’s “Operators” tab (split by person and stage), in the order execution report and in the order completion message to ERP.",
        },
        {
          category: "added",
          scope: "Production: work instructions",
          body: "Versioned work instructions attached to a machine or line, a product or a routing stage, with PDF, image and MP4 video attachments (Production configuration → Work instructions). A version goes from draft through approval (a separate permission) to superseded, exactly one version is in force, and versions can be compared. In the operator panel the instructions are shown with the task, and before starting a stage the operator confirms they have read the version in force.",
        },
        {
          category: "added",
          scope: "Production: order email notifications",
          body: "An order has a list of notification recipients (accounts and email addresses), and the module settings hold default recipients. When an order starts and when it finishes, a message with quantities, time, energy and a link is sent in the recipient’s account language (PL or EN).",
        },
        {
          category: "added",
          scope: "Analysis: measurements — data and CSV export",
          body: "Analysis → Measurements has two tabs: “Chart” (as before) and “Data and CSV export” — a table of measurements for the selected machines with aggregation (raw, average, minimum, maximum, last value in buckets from 1 minute to 1 day), in long or wide layout, with a chart that has an axis for each unit. The CSV export is streamed, so it also handles millions of rows (up to 5 million), in Polish Excel format or standard format; every download is recorded in the Event log.",
        },
        {
          category: "added",
          scope: "Reports: energy and machine states",
          body: "A new report in the report catalogue (Energy section): a shared timeline of machine states and the energy profile (15 min, 1 h or 1 day), idle energy, average power while running and while not running, cost and CO2. Download it as PDF, send it by email or set it up as a recurring report.",
        },
        {
          category: "added",
          scope: "3D Hall: models from .glb files",
          body: "In 3D Hall settings you can import a hall from a glTF 2.0 file (.glb, up to 48 MB) — e.g. from a CAD program, from Blender or from a machine manufacturer, including Draco or meshopt compression and KTX2 textures — and assign it to a park, lines or selected machines. Machines are linked to parts of the model manually (click on the model), automatically by name or by the AI assistant, and a linked part shows the machine state. Any hall can be exported to a .glb file, e.g. for edits in Blender.",
        },
        {
          category: "added",
          scope: "AI: one configuration",
          body: "General configuration → AI replaces the “AI assistant” and “MCP (AI)” tabs. Connect Claude (recommended), any OpenAI-compatible API or a local Ollama model — keys are write-only, and the connection test and model list come from the provider. Models are matched to tasks: Fast (Redash queries and charts), Standard (data analysis, questions, energy audit) and Advanced (App Studio chat). The tab shows 30-day usage and a list of things still to set up. The update carries over your existing AI settings.",
        },
        {
          category: "added",
          scope: "AI: an assistant with the user’s permissions",
          body: "User menu → “AI assistant connection” gives you a personal token and a ready-made Claude Desktop extension. The assistant sees and changes only what you have permission for, and each change it makes is recorded in the Event log under your name. You choose the mode: apply changes immediately, as proposals for approval, or read-only. The assistant never changes settings, accounts, permissions, tokens, the license or the Event log. When the administrator enables OAuth login and the installation is publicly reachable over HTTPS, you can also connect claude.ai and ChatGPT by signing in with your OmniMES account.",
        },
        {
          category: "added",
          scope: "AI: change proposals for approval",
          body: "The “Pending approval” screen, with a counter in the top bar, collects changes proposed by the AI assistant and by apps in Claude. Approval applies the change with the approver’s permissions and leaves an entry in the Event log; proposals not handled within 7 days expire.",
        },
        {
          category: "added",
          scope: "AI assistant (MCP): new tools and ready-made scenarios",
          body: "The assistant has new tools: downtime reasons, schedule scenarios and Gantt, plan simulation, SPC and process capability, and ERP integration diagnostics. It takes KPIs (OEE, availability, MTBF) from the same calculations as the screens. Ready-made prompts cover shift analysis, tomorrow’s plan, a lot complaint and energy for the month. Deleting configuration from the chat archives the record, which can be restored.",
        },
        {
          category: "added",
          scope: "App Studio: apps shipped with the system",
          body: "App Studio has a “Built-in” tab: vendor apps with a version number that are updated together with OmniMES unless they were changed locally. New apps: “What-if planner” — compares up to 5 plan variants (resource downtime, extra shift, priorities, due dates) and creates a proposal for approval in the Schedule, which can add the downtimes and extra shifts to the Resource calendar and change order priorities and due dates; “ERP mapping wizard” — suggests the mapping from a sample CSV, JSON or XML file and diagnoses import errors; “SPC and process capability” — ranking of characteristics by Cpk, X̄-R and I-MR charts with Western Electric rules, and a histogram with tolerances. The apps also work in Claude.",
        },
        {
          category: "added",
          scope: "Quality: Cpk ranking in SPC",
          body: "The SPC tab of the Quality screen has a process capability (Cpk) ranking and a line or resource filter for inspection results from production stages.",
        },
        {
          category: "added",
          scope: "Email: test message and send log",
          body: "General configuration → Email shows the mail status (with a warning when it is not configured), lets you choose encryption (STARTTLS, SSL/TLS or none) and send a test message with a clear error description, and a table of recent messages shows what was sent. All messages — reports, OmniEnergy automations, energy audits, alarms — go through one service that retries after a temporary error. Without a mail configuration a message gets the status “skipped” instead of an error.",
        },
        {
          category: "added",
          scope: "License: reminders and grace period",
          body: "The administrator sees a banner 30, 14 and 7 days before the license ends and gets a bell notification. After expiry the system keeps working fully during a grace period (14 days by default, with a banner), and then shows a message with contact details instead of empty screens. The countdown of days left on the license is now correct.",
        },
        {
          category: "added",
          scope: "Administration: system status",
          body: "The Administration → System status screen shows the API, database, task queue, stream, broker, mail, disk, backup, license, MCP server, Redash and version in one place, refreshed every 30 s. System alarm rules notify you about, among other things, no data from the stream, a full disk, a failed backup, task queue problems and mail errors. The /health address reports the status for external monitoring, all services have Docker health checks, and unhealthy containers (except the database and the broker) restart automatically.",
        },
        {
          category: "added",
          scope: "Installation: backups",
          body: "The backup service makes an encrypted backup of the databases, files saved by the system (reports, documents, attachments, instructions) and installation settings every day at 2:30, and of telemetry once a week. It keeps 7 daily, 4 weekly and 12 monthly backups, can send a copy off the server (SFTP or S3) and once a month checks that the databases can be restored from the latest backup. The backup status is shown on the System status screen.",
        },
        {
          category: "added",
          scope: "Installation: update with automatic rollback",
          body: "The update backs up settings and databases, builds the new images while the system keeps running, runs migrations before swapping containers and checks that the system works (API, databases, login, web page). If any step fails, it returns to the previous version on its own, including the databases. The break during database changes is usually 1–3 minutes, and a problem noticed later is undone with omnimes rollback. The API and interface code is part of the images, and installation settings are in the omnimes/.env file.",
        },
        {
          category: "added",
          scope: "Installation: the omnimes administration tool",
          body: "One command for Windows, Linux and macOS instead of many scripts: preflight (CPU, RAM, disk and ports before installation and update), install, status, update, rollback, backup, restore, uninstall and support-bundle — a diagnostic package for support without passwords or keys. Commands that change the installation show a plan and ask for confirmation. Messages are in Polish or English (the --lang option or the OMNIMES_LANG variable).",
        },
        {
          category: "added",
          scope: "Documentation: administrator manual",
          body: "A new chapter of the PL and EN documentation for administrators: secure start-up, a checklist for secure operation (passwords and accounts, TLS, firewall and ports, backups, updates, permissions, tokens, monitoring, incident response), backup and restore, troubleshooting, decommissioning and information for integrators — following Annex II of the Cyber Resilience Act.",
        },
        {
          category: "changed",
          scope: "Production: one order module",
          body: "Production is the only order module on every installation: the update turns it on and hides the former Order list, the old Schedule and Working time configuration, and old addresses lead to the new screens. Orders from ERP are on the “Production orders” list with the “Source: from ERP” filter, a “Failed reports” tile and columns for delay and the last report; ERP sends the customer and priority of an order as mapping fields. Resource working time is set on a single Resource calendar screen: shifts for the plant, park, line or machine, exceptions and an availability preview. Machine monitoring and analyses work as before.",
        },
        {
          category: "changed",
          scope: "Reports in one place",
          body: "Reports have three screens: “Generate report” (the catalogue, including production reports), “Generated reports” (the archive) and “Recurring reports” (the former “Automation schedule” together with production report subscriptions). The order report is calculated from the Production module.",
        },
        {
          category: "changed",
          scope: "OEE and working time: one source of figures",
          body: "OEE, availability, working time and MTBF are calculated in one place, so screens, reports and the AI assistant show the same values, and Analysis → “Work time and OEE” is a single screen. A machine with a shift calendar is calculated according to ISO 22400, a machine without a calendar as before. The micro-stop threshold is set in one place (System settings → Micro-stops), lots are on a single list, and the Item master has colour, price and minimum stock.",
        },
        {
          category: "changed",
          scope: "Performance: reports, dashboards and AI analyses in the background",
          body: "Long reports, dashboard snapshots and AI analyses run in the background with a progress bar — you can keep using the screen. A Redash dashboard snapshot takes a dozen or so seconds instead of several minutes, Redash dashboards load faster, and the API server handles more requests at once.",
        },
        {
          category: "changed",
          scope: "Performance: measurement data",
          body: "The latest signal values — for Redash dashboards, the AI assistant, App Studio, the 3D Hall and process alarm rules — are calculated by the database instead of the application server: a query over the whole history takes a fraction of a second instead of tens of seconds and does not load memory. Telemetry uses TimescaleDB columnstore compression and a new index, so typical queries are several to several dozen times faster with the same results. A BI data response is limited to 100,000 rows (the OMNIMES_BI_MAX_ROWS variable).",
        },
        {
          category: "changed",
          scope: "Stream: no data loss and full Sparkplug B",
          body: "The stream service receives measurements with acknowledgement (QoS 1) in a persistent session, and when the database is unavailable it keeps them in a buffer on disk and writes them later. It supports full Sparkplug B (BIRTH and DEATH, aliases, seq and bdSeq numbering, rebirth, null values) and marks devices as offline. The latest value of a signal is not overwritten by an older message, duplicates are skipped, and after a broker restart or replacement the stream renews its subscription on its own.",
        },
        {
          category: "changed",
          scope: "New platform versions",
          body: "The API runs on Python 3.12 and Django 5.2 LTS (previously Python 3.9 and Django 3.2), the MQTT broker is EMQX 5.8, dashboards run on Redash 26.9 and the telemetry database on TimescaleDB 2.31. Image and dependency versions are pinned, so every installation of a given version has the same components.",
        },
        {
          category: "changed",
          scope: "Park panorama and report template wizard removed",
          body: "The unused Park panorama and report template wizard screens (hidden in the menu) have been removed. Report templates work as before.",
        },
        {
          category: "fixed",
          scope: "Daylight saving time changes (March and October)",
          body: "23- and 25-hour days are calculated correctly: downtime in the repeated hour no longer disappears, the night shift has 7 or 9 hours instead of always 8, shift snapshots no longer merge into one (also on ordinary days), the Work time screen no longer shows negative downtime, and the “Energy and machine states” report shows all 25 hours of the day. Planning, traceability, forecasts, alarms and sessions calculate durations by actual elapsed time. Time is stored in the database in UTC, while the application and the API show dates in plant time as before. OEE saved earlier for DST change days can be recalculated on request with an administrator command.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy: EnPI and EnB snapshots",
          body: "The EnPI snapshot chart works (it used to end with an error), the time axis shows the middle of the period and the tooltip shows the period from–to. Date filters on the EnPI and EnB lists include the last day of the range. Snapshot periods saved earlier with a 1–2 hour shift (e.g. 22:00 instead of midnight) are corrected by a one-off administrator command: it shows a plan first, changes data only after confirmation and can be undone.",
        },
        {
          category: "fixed",
          scope: "Search on lists",
          body: "Search on lists — including machines, lines, users and SEU register items — works; previously it ended with an error.",
        },
        {
          category: "fixed",
          scope: "Production: material balance, OEE by product and lots",
          body: "The order material balance and the material loss report calculate the standard from all lots of the order (previously, with several lots, the loss came out at e.g. 200%). OEE by product includes quantities reported when a stage is finished, the Process tab of a closed product lot shows the summary instead of “Lot in progress”, and the “since” column in Quarantine counts calendar days.",
        },
        {
          category: "fixed",
          scope: "Translations and formats",
          body: "Texts coming from the server (App Studio, OmniEnergy, Event log, start-up data) appear in the interface language, numbers and dates use the format of the selected language, and missing translations and hard-coded texts have been completed in PL and EN. Some screens, e.g. the AI tab, showed keys instead of texts in the production build. Forms have a consistent layout, and selection fields that looked empty show their values.",
        },
        {
          category: "fixed",
          scope: "General configuration: “Save”",
          body: "When a field on another tab has an invalid value, “Save” switches to that tab, highlights the field and shows a message — previously saving silently did nothing.",
        },
        {
          category: "fixed",
          scope: "Stream: Boolean values in history",
          body: "Boolean signals are stored in measurement history as 1 and 0 — previously they were saved without a value.",
        },
        {
          category: "fixed",
          scope: "Updates keep files",
          body: "An API update no longer deletes the report archive, OmniEnergy documents, quality attachments or ERP exchange files — they are kept in separate volumes, and the first update moves them there automatically. A stream service update keeps its identifier and measurement buffer.",
        },
        {
          category: "fixed",
          scope: "Running the installer again",
          body: "Running the installer again or rebuilding (recreated_omnimes.bat) on a working installation no longer overwrites the databases with the clean database from the package and does not change passwords, MQTT accounts or keys — users, machines, menus and settings stay. An interrupted installation is completed by the installer.",
        },
        {
          category: "security",
          scope: "Login and sessions",
          body: "After 5 failed attempts within 15 minutes an account is locked for 15 minutes, and longer after further attempts (up to 24 h); there is also a limit on attempts from one IP address, and you unlock an account on the Users screen. A password has at least 12 characters and is checked by the server. Each login is a separate session that expires after 12 hours of inactivity or after 7 days; a password change and “Sign out from all devices” end the other sessions and AI assistant tokens. A shared shop floor workstation account is marked as a “Kiosk account” (session without expiry), and the operator code and RFID card in the panel have their own attempt limit.",
        },
        {
          category: "security",
          scope: "New installations without shared secrets",
          body: "The clean database in the package contains no tokens, passwords or keys, Redash keys are random for each installation, and the OmniMES administrator changes the password at first login. The update reports whether the installation still has keys known from older packages — support replaces them.",
        },
        {
          category: "security",
          scope: "Files only for authorised users",
          body: "Reports, OmniEnergy documents and attachments can be downloaded only after logging in, with permission for the resource, or with a signed link valid for 10 minutes; new files get random names. Previously saved /media/… addresses stop working, and OmniEnergy documents are downloaded instead of opening in a browser tab.",
        },
        {
          category: "security",
          scope: "Content protection in the browser",
          body: "Content entered by users (reports, OmniEnergy descriptions, monitoring) is sanitised before display, and the web server sends security headers, including Content-Security-Policy. Formulas and data filters are read by a parser without executing code.",
        },
        {
          category: "security",
          scope: "Connections to external addresses",
          body: "Dashboard snapshots are taken only from the Redash address in the settings, and AI provider, ERP and printer addresses are checked before connecting. A recurring report with a dashboard address outside the configured Redash (e.g. after a domain change) ends with a clear message — select the dashboard again.",
        },
        {
          category: "security",
          scope: "Redash without the OmniMES password",
          body: "Redash buttons log in with a one-time link, the Redash account has a random password, and previously stored OmniMES passwords have been removed. The Redash administrator key stays on the server — dashboards and queries go through OmniMES with permission checks.",
        },
        {
          category: "security",
          scope: "AI analysis history",
          body: "Each account sees only its own AI analyses; a superuser and accounts with the Settings module see all of them. After the update regular accounts start with an empty history, and earlier analyses are visible to the administrator.",
        },
        {
          category: "security",
          scope: "MQTT broker: device accounts and encryption",
          body: "The MQTT broker checks logins and topic permissions in the OmniMES database: each account has permissions for specific topics, and other topics are blocked. On the new MQTT accounts screen you create separate accounts for gateways and devices, and the connection can be encrypted (TLS, port 8883). New installations start with TLS and gateway accounts, without a shared account. After the broker starts, the MQTT ports open only once logins and permissions are ready, so data sent right after connecting is not lost.",
        },
        {
          category: "security",
          scope: "Database accounts for services",
          body: "The API, stream, broker and Redash connect to the database with separate accounts with minimal permissions instead of the administrator account. The update switches existing installations, checks that everything works and returns to the previous account on error.",
        },
        {
          category: "security",
          scope: "Administration panels only from the server",
          body: "The EMQX dashboard, Adminer and Ollama listen only on the server (127.0.0.1), and Adminer starts only on demand. New installations run the API in secure mode (allowed addresses and CORS from the installation address, no debug mode) and serve BI data only with a token. The API description (Swagger, ReDoc) is available after logging in.",
        },
        {
          category: "security",
          scope: "Dependencies, SBOM and vulnerability scan",
          body: "Dependencies are updated, and image and package versions are pinned. Every release has an SBOM (CycloneDX) for the API, web interface, stream and MCP server, goes through a vulnerability scan — a critical or high vulnerability without a documented assessment stops the release — and a check that the package contains no secrets.",
        },
        {
          category: "changed",
          scope: "Updating to 5.0: from which version",
          body: "You can update to OmniMES 5.0 directly from version 4.5.1 and later, without intermediate versions. Versions 4.1.0–4.5.0 are updated with the help of OmniMES support, and versions 4.0.0 and older (MongoDB database) first need their data moved to PostgreSQL with TimescaleDB.",
        },
        {
          category: "changed",
          scope: "Updating to 5.0: before the update",
          body: "Copy the directories and scripts listed in the manual (Installation chapter, section 8.2) from the new package — the API on Python 3.12 will not start with the old omnimes/api/dockerfile. Docker Compose v2 or v1 version 1.29 or later is required; the license key does not need to be replaced. Move your own changes in docker-compose.yaml to docker-compose.override.yaml, because the update replaces that file with the version from the package. Check your own integrations that called Redash directly from the browser (they will stop working) and devices publishing outside the spBv1.0/ and omni/raw/ topics — the broker blocks them by default.",
        },
        {
          category: "changed",
          scope: "Updating to 5.0: what happens",
          body: "In the same run, the API update moves the database to TimescaleDB 2.31, Redash to 26.9 and the broker to EMQX 5, with a backup and automatic rollback, and switches the services to separate database accounts. The broker is unavailable for a dozen or so seconds, gateways and the stream service reconnect on their own, and the script checks that measurements are arriving again — if not, it returns to the previous version together with the broker. In an updated installation the shared MQTT account and port 1883 work as before, so gateways need no changes.",
        },
        {
          category: "changed",
          scope: "Updating to 5.0: after the update",
          body: "Store the backup key omnimes/konfiguracja/kopie_age.key outside the server — without it backups cannot be restored. Mark shop floor workstation accounts (e.g. tablets with the operator panel) as a “Kiosk account”, because other sessions expire after 12 hours of inactivity. Send a test message from the Email tab — mail encryption settings are now respected. Run the EnB and EnPI snapshot period correction once (plan first). Administration panels are closed by a full rebuild in a service window. A shared MCP token saved in the installation keeps working, but the MCP server no longer accepts connections without a token.",
        },
      ],
    },
    {
      version: "4.14.0",
      date: "2026-11-20",
      entries: [
        {
          category: "added",
          scope: "Production: orders, routings and schedule",
          body: "The new Production menu takes an order from plan to completion. A production order has a routing — stages on machines, lines or without a resource, with a cycle-time standard and changeover. The schedule (Gantt) shows operations on resources: drag them with the mouse, see collisions and locks, and “Plan automatically” prepares a plan proposal for approval that respects the shift calendar. Cycle-time standards per product × machine are entered manually, taken from ERP or calculated from production history.",
        },
        {
          category: "added",
          scope: "Operator panel",
          body: "At the workstation the operator sees their queue, starts, pauses and finishes a stage, reports good parts and scrap with a reason, and passes the lot on to the next stage. Scanning the material lot with a barcode reader or a tablet camera makes sure the right material reaches the station in FEFO order; the panel also shows material availability and parts for rework.",
        },
        {
          category: "added",
          scope: "Material stock and availability",
          body: "Material stock levels, receipts and stock movements with the order number. The schedule, the operation queue, the panel and the order show whether there is enough material according to the bill of materials (BOM). Automatic planning takes it into account, “Recalculate from now” refreshes the plan, and shortages are shown when an order is released.",
        },
        {
          category: "added",
          scope: "OEE according to ISO 22400 and downtime reasons",
          body: "The OEE screen calculates availability, performance and quality according to ISO 22400 for a machine, line and period, with tabs for the loss Pareto, OEE by shift and by product, MTBF and MTTR, and downtimes with reason correction. The downtime reason is assigned automatically from the machine signal, and micro-stops are recognised by event type, not only by duration — running is never a micro-stop.",
        },
        {
          category: "added",
          scope: "Production reports",
          body: "A catalogue of production reports: orders, production in a period and traceability reports. The order report shows working time, downtime and machine-off time within the order window, plus energy, cost and CO2 emissions per order, per piece and per machine state.",
        },
        {
          category: "added",
          scope: "Lots and genealogy (traceability)",
          body: "Every lot of material, semi-finished product and finished product has a number, a quality status (e.g. quarantine, blocked) and a card with its history. Genealogy goes back to suppliers and forward to customers, and the traceability report puts it into a PDF. Find a lot with the “Find lot” field in the top bar — type the number or scan the code with a reader or a camera. The Process tab shows critical parameters with limits (a breach marks the lot as suspect) and the energy used for the lot, and the screen lists the lots that were on a machine in a chosen time window — e.g. after a sensor failure.",
        },
        {
          category: "added",
          scope: "Labels and pallets",
          body: "Lot and pallet labels with a QR, GS1 DataMatrix or GS1-128 code — as a PDF for any printer or as ZPL for Zebra printers. Templates and printers are set in the configuration, and the print log records every print and reprint. Pallets get an SSCC number, a pallet shipped by scanning can be reverted, labels are also printed at material receipt, and the item master has a GTIN field.",
        },
        {
          category: "added",
          scope: "Product recall and mass balance",
          body: "The recall wizard goes from the suspect lot to the list of derived lots, quantities, locations and customers, and a PDF report. Test mode blocks nothing and measures the time — a recall drill before an audit (BRCGS, IFS); every case goes into the recall register. The lot and order mass balance shows material loss, and lots in stock can be split, merged, repacked and reworked — including parts for rework reported in the operator panel.",
        },
        {
          category: "added",
          scope: "Quality",
          body: "Inspection plans with characteristics and limits, measurement results, and nonconformities with quarantine and a disposition decision. Blocking a lot is propagated to the lots made from it, and SPC charts show process stability.",
        },
        {
          category: "added",
          scope: "Event log",
          body: "The new Administration → Event log screen shows who changed what and when: logins, accounts, permissions, tokens, licence, settings, production and readings — with the values before and after the change. Entries cannot be edited or deleted. CSV export, forwarding to a syslog server (RFC 5424) and a configurable retention period.",
        },
        {
          category: "added",
          scope: "ERP integrations: item master, BOMs and file exchange",
          body: "The ERP sends product and material items with their bills of materials (BOM) to OmniMES — through the API, a file or an exchange folder, also over SFTP (e.g. SAP). The new Item master screen shows products, materials, units and BOMs. The integration API key has a permission scope, and the API is described in OpenAPI format.",
        },
        {
          category: "added",
          scope: "ERP integrations: direct connection to Business Central, SAP S/4HANA and Odoo",
          body: "The connector signs in by itself — OAuth2 (e.g. Microsoft Entra ID for Business Central), SAP Business One session, session with a token, Basic or fixed headers — and also fetches orders with POST requests and from OData v2. Ready-made starter settings for Business Central, SAP S/4HANA and Odoo, with no middleware.",
        },
        {
          category: "added",
          scope: "ERP integrations: production results posted to the ERP",
          body: "OmniMES posts reports directly to the ERP: goods receipt of the product, operation confirmation or production report in Odoo, SAP Business One and SAP S/4HANA, and in other systems through an HTTP template. A retry after an error never posts twice, and the call preview shows what will reach the ERP.",
        },
        {
          category: "added",
          scope: "ERP integrations: lots, standards, working time and energy",
          body: "The ERP sends material lots and pallets, and OmniMES returns consumption and production with lot numbers, lot status changes and genealogy; you choose who assigns lot numbers and set unit conversions per material. Cycle-time standards come from the ERP, the mapping check lists work centres and units without an assignment, and many reports can be retried at once. Reports and the ERP API include working time and downtime as well as the energy, cost and CO2 of the order, and the ERP orders view shows the forecast order end and delays.",
        },
        {
          category: "added",
          scope: "App Studio: export, import and production data",
          body: "Export a Studio app to a file and import it into another OmniMES system; a backup of all apps is made before every import — you can also make a backup yourself and restore from it. Apps can use ERP data, the order module and lots — ready-made apps include the “ERP order board” and “Complaint investigation” (from the lot number in a complaint to suppliers and customers).",
        },
        {
          category: "added",
          scope: "AI assistant (MCP)",
          body: "The AI assistant (e.g. Claude) answers questions about orders, queues and production progress, OEE and losses, lots and genealogy, the energy bill, the meter balance and ERP orders — using the same calculations as the screens.",
        },
        {
          category: "added",
          scope: "OmniEnergy: carriers, CO2 emissions and ESRS",
          body: "The Energy carriers and emissions (ESRS E1) screen converts carrier consumption into final and primary energy and CO2 emissions using KOBiZE factors, and prepares the data for ESRS E1-5 and E1-6 reporting.",
        },
        {
          category: "added",
          scope: "OmniEnergy: meters, balance and manual readings",
          body: "Arrange meters in a tree (main meter and sub-meters), add virtual meters with a formula and transformer ratios, and the balance shows losses between the main meter and its sub-meters. Meters without data transmission are entered manually or imported from CSV — the system makes sure a reading is not lower than the previous one and handles meter replacement.",
        },
        {
          category: "added",
          scope: "OmniEnergy: tariffs, bill and power profile",
          body: "Energy tariffs with time zones, contracted power, reactive energy and fixed charges. The Bill and power profile screen calculates the monthly bill from the 15-minute profile and shows contracted-power overruns, tan φ and a comparison with the previous month.",
        },
        {
          category: "added",
          scope: "OmniEnergy: regression baseline and temperature",
          body: "The energy baseline can be a regression model according to ISO 50006 — with production and degree days from the outdoor temperature — with model quality checks (R², CV(RMSE), significance); savings are normalised to the conditions of the reporting period. The EnPI denominator can be production from the order module.",
        },
        {
          category: "added",
          scope: "OmniEnergy: SEU register, action plans and audit report",
          body: "A register of significant energy uses (ISO 50001, clause 6.3), action plans with savings verification (M&V) and an energy audit report prepared from system data.",
        },
        {
          category: "changed",
          scope: "OmniEnergy: ISO 50001 names and targets",
          body: "Screens and reports use the ISO 50001 names: EnPI, SEU and EnB. A target can be “lower is better”, with progress measured from the baseline, and an audit is not closed when the indicator got worse. SEU periods are calculated in local time, also when the clock changes.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy: SEU report as PDF and PNG",
          body: "Downloading the SEU report as PDF or PNG works — it used to end with an error.",
        },
      ],
    },
    {
      version: "4.13.1",
      date: "2026-11-19",
      entries: [
        {
          category: "fixed",
          scope: "Updating on-premise installations",
          body: "The update scripts (updated_api, updated_www, updated_www_api, updated_mcp) work on installations set up from earlier packages: task queue migrations no longer stop the API update, a changed database password (set_pass.py) is kept after the API is rebuilt, the old repository folder is removed from the front-end files, and the MCP server gets a valid API token.",
        },
      ],
    },
    {
      version: "4.13.0",
      date: "2026-11-19",
      entries: [
        {
          category: "added",
          scope: "ERP integrations",
          body: "The new Configuration → ERP integrations screen connects OmniMES to your ERP system. Production orders reach OmniMES automatically — pulled from the ERP API every few minutes, pushed by the ERP to the OmniMES API with an integration key, or imported from a CSV or JSON file. OmniMES sends progress, completion and cancellation reports back to the ERP (webhook signed with HMAC). You map fields, units, statuses and work centres on screen and check them with a dry-run test; ready-made starting presets cover SAP Business One, enova365, Comarch Optima and XL, Symfonia, Subiekt and CSV files. The message log and the report queue show what came in from the ERP and what went out.",
        },
        {
          category: "added",
          scope: "Cycle time standard on orders",
          body: "An order has a “cycle time standard” field (seconds per piece) — on the Orders → Entered screen, in the API and in the ERP mapping. The order report uses it to calculate OEE performance.",
        },
        {
          category: "added",
          scope: "3D hall: loading indicator",
          body: "While the hall model loads you see a “Loading the hall model…” indicator instead of an empty area.",
        },
        {
          category: "changed",
          scope: "OEE in the order report",
          body: "Performance is calculated from the cycle time standard: standard × pieces produced / run time. Before, it came out at almost exactly 100%, so OEE was in practice availability × quality. An order without a standard shows “no cycle time standard on the order” instead of a made-up 100%, and pieces produced means good plus scrap.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy: consumption from meters",
          body: "EnPI, the baseline and SEU calculate consumption from cumulative meters over the whole period, not from the latest 10,000 readings. A single faulty reading no longer zeroes the period, and a meter reset or replacement is recognised. Periods use local time (they were shifted by 1–2 hours), and manual values assigned to several machines are no longer added up several times. A signal that does not behave like a cumulative meter is flagged.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy: no production, carriers and units",
          body: "When an indicator's denominator (e.g. production) is 0 or missing, EnPI and the baseline show “waiting for data” or “no production” instead of dividing by 1. The SEU ranking and shares are calculated separately for each energy carrier, the EnPI unit comes from the meter and denominator definition, and a baseline configuration without a scope shows “No scope” instead of covering the whole plant. Tooltips on OmniEnergy screens work, and the hint under the SEU ranking shows numbers.",
        },
        {
          category: "fixed",
          scope: "MTTR, MTTF and MTBF in the order report",
          body: "Reliability indicators use the correct formulas — the fields were swapped before and MTBF came out lower than MTTF. The order report covers the whole declared period, not just the last day.",
        },
        {
          category: "fixed",
          scope: "Measurements chart",
          body: "A machine with no data of its own in the selected period no longer shows values and states of other machines with the same tag.",
        },
        {
          category: "fixed",
          scope: "Dashboard, orders and schedule",
          body: "The “Last generated report” widget no longer shows OEE 0.00% or a “NaN s” standard, an order points to its generated report, and the order window in the schedule shows “Produced” and no longer displays “Invalid date”.",
        },
        {
          category: "fixed",
          scope: "Database password change",
          body: "After the database password is changed (set_pass.py, cloud panel), signal filtering and enrichment keep working — the password of the link between databases is updated together with the database password.",
        },
        {
          category: "fixed",
          scope: "Footer in English",
          body: "The English footer shows a correct © sign.",
        },
      ],
    },
    {
      version: "4.12.0",
      date: "2026-11-18",
      entries: [
        {
          category: "added",
          scope: "App Studio: add a ready app to the menu in one click",
          body: "Add a finished app to the side menu straight from the app list or from the Menu tab. In the same dialog you can create a new menu section for it right away — no switching between screens.",
        },
        {
          category: "changed",
          scope: "3D Hall and Measurements",
          body: "Hologram is now called 3D Hall, and the Media tab under Analysis is now Measurements. The new names appear in the menu, settings and on screens.",
        },
        {
          category: "changed",
          scope: "Analysis: OEE tab and manual report removed",
          body: "The Analysis → OEE tab and the “manual report” type in the report generator have been removed. The dashboard widget with the OEE analysis of the latest order still works, and previously generated manual reports stay on the reports list.",
        },
        {
          category: "fixed",
          scope: "Menu after an update",
          body: "Users who were logged in before an update no longer see menu items whose screens are not in the new version — previously clicking such an item led to an empty page.",
        },
        {
          category: "fixed",
          scope: "Documentation assistant",
          body: "The assistant answers in the language of the question and knows the latest manual chapters, and the source link points to the version in the same language.",
        },
        {
          category: "security",
          scope: "Unique passwords for every new installation",
          body: "The installer generates random passwords for the database, the MQTT broker, the EMQX dashboard and the OmniMES and Redash administrator, as well as session and API keys — every installation gets its own credentials instead of ones shared through the package. At the end of the installation the passwords are displayed and saved to DANE_DOSTEPOWE.txt. Existing installations keep their passwords.",
        },
        {
          category: "security",
          scope: "Safer images and cloud",
          body: "The application server no longer exposes repository working files and blocks hidden files. The agent that manages cloud instances authenticates with a secret key.",
        },
        {
          category: "security",
          scope: "Signed licences",
          body: "OmniMES supports a new cryptographically signed licence format (Ed25519). Existing licences keep working unchanged.",
        },
      ],
    },
    {
      version: "4.11.0",
      date: "2026-11-16",
      entries: [
        {
          category: "added",
          scope: "Hologram: top utility consumers",
          body: "A bar above the 3D model shows the largest consumers of electricity, water, gas, compressed air or heat over the last 24 hours, 7 or 30 days: total consumption and the three machines with the largest share — click one to zoom in. The same consumers get a marker on the model with the utility icon and their rank. A user with hologram settings rights chooses which measurements represent consumption and assigns the utility. Counters are calculated as the increase, instantaneous values (e.g. kW, m³/h) as consumption over time.",
        },
        {
          category: "added",
          scope: "Hologram: consumption recommendations for the whole hall",
          body: "An expandable list above the model shows where to look for savings: which machines use most of a utility, where consumption grew compared with the previous period, and which devices draw power, water or compressed air during breaks too (standby, leaks). Recommendations come from OmniMES data — no predictive model.",
        },
      ],
    },
    {
      version: "4.10.0",
      date: "2026-11-16",
      entries: [
        {
          category: "added",
          scope: "Hologram: view layers",
          body: "A “Layers” button above the 3D model replaces “Labels”: switch machine names, machine state, parameters, zones, material flow and lighting on and off separately. Parameters appear right above the machines — a single line of values from afar, a small table close up — and you choose which measurements to show. The browser remembers the setting.",
        },
        {
          category: "added",
          scope: "Hologram: recommendations on the machine card",
          body: "Click a machine and the panel explains why it has stopped and what to do: how long the failure or stop has lasted compared with earlier ones, whether the cause is upstream (the previous station is not feeding material) or downstream (the next one is not taking parts), how many micro-stops there were, 7-day availability, MTBF and MTTR, which measurements are outside their typical range and how much energy the machine draws while stopped. Recommendations come from the machine’s history in OmniMES and the state of neighbouring stations — no predictive model. The AI assistant gets the same data through MCP.",
        },
        {
          category: "added",
          scope: "Hologram: hall lighting",
          body: "The model can show ceiling luminaires linked to lighting circuits monitored in OmniMES. They light up, dim in economy mode, switch off or flicker on a circuit failure — following the live state.",
        },
      ],
    },
    {
      version: "4.9.0",
      date: "2026-11-15",
      entries: [
        {
          category: "added",
          scope: "App Studio [Beta] — apps built by talking to Claude (MCP Apps)",
          body: "Describe what you need in the chat and Claude builds an interactive app on OmniMES data: KPIs, charts, tables, notes and forms. Apps appear in the side menu, in sections and submenus you create yourself, and you share them with chosen groups or people. Every change saves a new version you can go back to. Apps use the open MCP Apps standard, so the same apps also open in a Claude Desktop conversation.",
        },
        {
          category: "added",
          scope: "Two ways to build apps",
          body: "In OmniMES (Builder tab) with a Claude API key from the Claude Console — Claude Max, Ultra and Team plans include monthly API credits. Outside OmniMES in Claude Desktop, on your own Claude subscription, through the OmniMES extension with a personal token. Choose Claude Opus 5.5 (recommended), Fable 5.2, Sonnet 5.5, Haiku 5.5 or other compatible models fetched from the Anthropic API.",
        },
        {
          category: "added",
          scope: "App Studio audit log",
          body: "A superuser sees who created and changed an app, who changed the menu and sharing, who created or revoked a personal token, what data apps wrote and what the system denied — filtered by app and event type.",
        },
        {
          category: "security",
          scope: "Secure App Studio apps",
          body: "An app runs with the viewer's permissions and never with more than its author's; it has no access to the token, cookies or the internet. Every data write from an app is confirmed by the viewer in a dialog showing what will be written and who wrote the app; writes are disabled in Claude Desktop. Apps with administrative functions can only be enabled by a superuser.",
        },
      ],
    },
    {
      version: "4.8.0",
      date: "2026-11-14",
      entries: [
        {
          category: "added",
          scope: "Permissions also checked by the server",
          body: "The screens assigned to a group in Access now also decide which data a user can read and change through the API, including outside the interface. Passwords and keys from General configuration are visible only to groups whose screens use them. New installations have enforcement enabled from the start. In upgraded installations the system first only records what it would deny, and the administrator enables enforcement after reviewing the report of denied requests (see BEZPIECZENSTWO_API.md in the installer).",
        },
        {
          category: "changed",
          scope: "General configuration → Redash",
          body: "Next to the Redash address field there is an Open Redash button that opens Redash in a new tab. The technical BI data status panel has been removed from the screen; the same status is available in the administrative report.",
        },
        {
          category: "changed",
          scope: "Deleting a user",
          body: "Deleting an account is confirmed in an application dialog showing the login of the account being deleted (instead of a browser pop-up), and if the system refuses, a message explains why.",
        },
        {
          category: "fixed",
          scope: "Deleting a user with a newer Redash",
          body: "A user can be deleted even when Redash lacks the OmniMES account-removal extension. The Redash account is then disabled and its e-mail address released, so the same person can be added again.",
        },
        {
          category: "fixed",
          scope: "Template reports: invalid formula",
          body: "An invalid formula in a report element (e.g. empty brackets or a missing value) now returns a syntax error result instead of a server error.",
        },
        {
          category: "fixed",
          scope: "Backups: importing older backups",
          body: "Importing a backup saved in an older format no longer ends with a server error.",
        },
        {
          category: "fixed",
          scope: "General configuration without unnecessary errors",
          body: "Users without permission to change settings no longer see an error at the AI assistant model list.",
        },
        {
          category: "security",
          scope: "Protection of administrative accounts",
          body: "The main administrator account (e.g. omni), service accounts (mcp, redash_bi) and members of the Administrators group can be changed (password, login, e-mail, profile, deletion) only by the main administrator, who is also the only one able to assign users to the Administrators group. This rule applies regardless of the permission mode.",
        },
        {
          category: "security",
          scope: "User passwords not accessible to other accounts",
          body: "Fixed a vulnerability that allowed a logged-in user to read another person's password, including an administrator's. After updating, we recommend changing the passwords of administrative accounts.",
        },
        {
          category: "security",
          scope: "Report formulas evaluated safely",
          body: "Fixed a vulnerability that allowed a logged-in user to run commands on the server when generating a report from a template. Formulas now accept only numbers, arithmetic operations and brackets. We recommend updating all installations.",
        },
        {
          category: "security",
          scope: "Backups without access tokens",
          body: "Backups no longer contain API access tokens, and only the main administrator can import a backup that includes user accounts.",
        },
        {
          category: "security",
          scope: "Installation package checked before release",
          body: "Every release checks the installation package for keys and passwords that should not be included.",
        },
      ],
    },
    {
      version: "4.7.0",
      date: "2026-11-13",
      entries: [
        {
          category: "added",
          scope: "Settings → Redash: access to BI data",
          body: "Administrators can see which mode BI data access runs in, who fetched BI data without a token over the last 7 days (address and program), and when and with what result the system last added the token to Redash queries. This shows when it is safe to switch on the token-required mode.",
        },
        {
          category: "changed",
          scope: "Dashboards and the AI assistant add the token to Redash queries",
          body: "New queries created in the Dashboards module and by the AI assistant (MCP) get the token header right away, and dashboard analysis by the AI assistant reads the data even when the token is required.",
        },
        {
          category: "fixed",
          scope: "Column descriptions in the query builder",
          body: "The query builder loads column descriptions from the API address the browser uses (previously from the address meant for Redash, often unreachable from the user's computer) and correctly recognises the address in queries written over several lines.",
        },
        {
          category: "fixed",
          scope: "Invalid token — a clear response instead of a server error",
          body: "A request with an invalid or expired token gets a “not authenticated” response (401) instead of a server error (500).",
        },
        {
          category: "security",
          scope: "Secure API settings (Cyber Resilience Act)",
          body: "A new, optional SECURITY section in the installation configuration: debug mode off, a list of addresses the API answers on, browser access (CORS) only for the OmniMES address and a secret key of its own for every installation. BI reports, OmniEnergy documents and the admin panel keep working in this mode. Without the section the system behaves exactly as before — the update changes nothing, and the log shows a reminder. Guide for implementers: BEZPIECZENSTWO_API.md in the installer.",
        },
        {
          category: "security",
          scope: "BI data for Redash protected by a token",
          body: "Redash dashboards fetch OmniMES data with the token of a service account that can only read BI data. The token is added to existing queries automatically within 15 minutes of the update (the previous text is kept), and dashboards — including those shared with third parties via a public link — keep working unchanged. Three modes: open, log (default: fetching without a token works but is visible in Settings) and require (no token, no data).",
        },
      ],
    },
    {
      version: "4.6.1",
      date: "2026-11-13",
      entries: [
        {
          category: "added",
          scope: "Documentation — Hologram chapter",
          body: "The user guide (online and the PDF in the installer) has a new chapter on Hologram: live mode, the simulation with a bottleneck-hunting example, configuration, version history and building the model with an AI assistant step by step.",
        },
        {
          category: "changed",
          scope: "Hologram — explanations in the simulation",
          body: "The simulation parameters dialog explains Slots, Buffer, run time between stops and stop. The legend on the simulation bar is labelled “Simulation states” so it is not confused with machine states from the Status configurator. The AI assistant prompt wizard explains that a different park or scope is chosen in the wizard rather than by editing the prompt.",
        },
        {
          category: "fixed",
          scope: "Hologram — machine names always from OmniMES",
          body: "The 3D model, station cards, details panel and simulation show machine names exactly as in the OmniMES structure — even when the AI assistant saved different, e.g. translated, names in the model. Conveyors without their own name get readable labels in the simulation, e.g. “Conveyor c2”, instead of a bare identifier.",
        },
      ],
    },
    {
      version: "4.6.0",
      date: "2026-11-11",
      entries: [
        {
          category: "added",
          scope: "Hologram — a live 3D model of the production hall",
          body: "A new screen next to Monitoring and Planogram: the hall with its machines, lines, racks, forklifts and material flow in 3D. Every machine shows its live state (a stack light on the machine, a floor outline in the status colour, a plate with the station number), and station cards in process order show current measurements. Counters at the top: machines running, stops and failures. Clicking a card flies the view to the machine; there is a top view and full screen, and the station cards can sit on the side, at the bottom or be hidden.",
        },
        {
          category: "added",
          scope: "Hologram — flow simulation",
          body: "The same model in simulation mode shows how material moves through the lines: throughput, finished parts and the bottleneck. Cycle time and buffer capacity can be changed at a station and the effect is visible right away — with no risk to production.",
        },
        {
          category: "added",
          scope: "Hologram — model built by an AI assistant (MCP)",
          body: "The hall model is built by an AI assistant (Claude Opus 5.5 or newer recommended) through the MCP server, from the machines and lines already in the system. The scope can cover the whole machine park, selected lines or individual machines. A wizard in “Hologram – settings” prepares a ready prompt to copy, and after every save the system checks the model (missing machines, overlapping elements, machines outside the flow) and tells the assistant what to fix. An existing model can be extended with more machines.",
        },
        {
          category: "added",
          scope: "Hologram — versions and configuration",
          body: "Every change to the model saves a new version with its author and note; an earlier version can be restored in one click. The configuration lets you change the name and description, save the camera's start view, bind a model element to a machine or remove an element.",
        },
      ],
    },
    {
      version: "4.5.1",
      date: "2026-11-10",
      entries: [
        {
          category: "changed",
          scope: "Documentation — recommended system: Linux with Docker",
          body: "The hardware requirements and the installation guide clearly state the recommended environment for a production server: Linux (Debian or Ubuntu Server LTS) with Docker Engine. For Windows-based infrastructure we recommend a Linux virtual machine. An installation on Windows Server requires individual arrangements, and the documentation explains why: Docker Desktop is not supported there by its vendor, and the system only starts after a user logs in.",
        },
        {
          category: "changed",
          scope: "Documentation — new minimum hardware requirements",
          body: "The minimum server configuration is now 16 GB RAM and a processor with at least 4 cores and 8 threads, which leaves headroom for telemetry, BI dashboards and AI features running at the same time.",
        },
        {
          category: "changed",
          scope: "Installer — pinned to the version number",
          body: "The installation package carries its version number and installs exactly the version it was released with — also when reinstalling or rebuilding services. Previously the installer always fetched the latest code, so the same package could install different versions on different days.",
        },
        {
          category: "fixed",
          scope: "Installation — building the web interface",
          body: "On newer systems, building the interface interrupted installation and updates with a code download error. The download method has been fixed and works with both older and newer versions of the tools.",
        },
        {
          category: "fixed",
          scope: "AI assistant (MCP) — installation",
          body: "A fresh installation could pull an incompatible new version of the MCP library, which prevented the server for AI assistants (Claude, Cursor) from starting. The library version is now pinned to a compatible one.",
        },
      ],
    },
    {
      version: "4.5.0",
      date: "2026-10-02",
      entries: [
        {
          category: "added",
          scope: "OmniEnergy — recurring SEU period comparison by email",
          body: "A new task type in the automation schedule: „SEU period comparison”. The system compares the chosen number of most recent periods of an SEU configuration and emails the comparison table (machine and source in rows, periods in columns, percentage change and total change) with a CSV attachment. The numbers are identical to those in the comparison window in the app. When there are not enough periods of similar length, the task is skipped with a clear reason instead of reporting an error.",
        },
        {
          category: "added",
          scope: "OmniEnergy — export of the SEU report and period comparison to PDF and PNG",
          body: "The report and the comparison can be downloaded as PDF (A4, split into pages) or PNG, with charts exactly as on screen. Files are also stored in the server archive, just like BI dashboard reports.",
        },
        {
          category: "added",
          scope: "OmniEnergy — total consumption in the period comparison",
          body: "Next to the percentage change you now see total consumption in each compared period, in the report header and in each source group. Totals are calculated separately for each unit, so kWh are never added to cubic metres.",
        },
        {
          category: "added",
          scope: "OmniEnergy — filtering the SEU list by configuration",
          body: "The SEU report list can be narrowed down to a selected configuration; the choice is remembered together with the other filters.",
        },
        {
          category: "added",
          scope: "Planogram — arranging tiles",
          body: "Selected tiles can be aligned on one horizontal or vertical line, distributed at equal spacing or arranged in a grid. Alignment uses tile centres, so tiles of different sizes line up neatly.",
        },
        {
          category: "added",
          scope: "Company logo in the app",
          body: "In General configuration you can upload the customer's logo (light and dark version); it is shown in the system header next to the OmniMES logo.",
        },
        {
          category: "added",
          scope: "Status configurator — parameter unit",
          body: "When adding a parameter to a new profile, you can set its unit right away.",
        },
        {
          category: "changed",
          scope: "Sign-in — username or email",
          body: "You can sign in to OmniMES with your username or email address (case-insensitive) — the same address you use for Redash. Email is required and unique for new accounts, and changing it in the user panel applies to sign-in immediately. Existing logins keep working.",
        },
        {
          category: "changed",
          scope: "General configuration — broker port hint",
          body: "The hint depends on the protocol: MQTT → 1883, encrypted MQTTS → 8883; protocol names are written in capitals.",
        },
        {
          category: "changed",
          scope: "Signal discovery — topic filter in filtering rules",
          body: "The MQTT topic name filter now sits in the „Filtering rules” section, with an explanation of how it differs from rules applied to tags. Collapsing the section clears the filters, so discovery is no longer narrowed silently.",
        },
        {
          category: "fixed",
          scope: "Dashboards — JSON queries in local installations",
          body: "JSON queries created with the wizard did not run in Redash in local installations, because Redash tried to connect to itself. Redash settings now include a field with the OmniMES address for Redash, set by default so that local installations work without changes.",
        },
        {
          category: "fixed",
          scope: "Signal discovery — filtering rules",
          body: "Fixed bugs that made filtering rules behave differently from what the configuration specified.",
        },
        {
          category: "fixed",
          scope: "Working time — all events in local installations",
          body: "The view showed only events of machines classified from measurements; it now shows events of all machines.",
        },
        {
          category: "fixed",
          scope: "Status configurator — „tag value” field",
          body: "After using measurement-based classification the field stayed locked even after removing the range, so it was impossible to go back to classic state classification.",
        },
        {
          category: "fixed",
          scope: "Profiles — speedometer segments",
          body: "The configuration of a new profile shows as many segments as the preview.",
        },
        {
          category: "fixed",
          scope: "Planogram — resizing a tile",
          body: "Typing a new tile size in the planogram editor caused errors.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — monthly automation summaries",
          body: "The summary email arrives on the first day of the month with data for the whole previous month; previously, in 31-day months it arrived on the 30th.",
        },
      ],
    },
    {
      version: "4.4.0",
      date: "2026-07-29",
      entries: [
        {
          category: "added",
          scope: "Monitoring — custom tile order",
          body: "Machine tiles can be arranged in any order within a line instead of alphabetically only. The setting is shared by all users and persisted, and the chosen sort mode (A–Z, Z–A, custom) is remembered between visits.",
        },
        {
          category: "added",
          scope: "Monitoring — per-machine sub-status name",
          body: "The name shown under a tile can be overridden for a single machine without changing the profile shared by all of them. Previously the only way was to duplicate the whole profile.",
        },
        {
          category: "added",
          scope: "OmniEnergy — manual EnPI values for a specific period",
          body: "When the numerator or denominator does not come from a measurement (for example the number of units produced, taken from a shift report), the value can be entered for a given snapshot instead of a single constant used for every period. Until now the same figure was applied to every period, which could make the trend point in the opposite direction to reality.",
        },
        {
          category: "added",
          scope: "OmniEnergy — automation that waits for data",
          body: "A schedule can create a snapshot and mark it as awaiting a value instead of substituting the constant from the configuration. The snapshot list shows how many periods await completion, and the value can be entered directly from the list.",
        },
        {
          category: "added",
          scope: "OmniEnergy — SEU time window comparison",
          body: "Per-machine consumption compared across several selected periods at once, with the change versus the previous period and a summary from the first to the last one. Comparing periods of clearly different length is blocked because the result would be misleading.",
        },
        {
          category: "added",
          scope: "Status configurator — topic filter during signal discovery",
          body: "Automatic signal discovery can be narrowed to a selected MQTT topic instead of scanning everything the broker publishes.",
        },
        {
          category: "changed",
          scope: "Status configurator — consistent save button",
          body: "Status profiles and the status list are now saved only after clicking “Save”, not on every field exit. Changed rows are highlighted and closing the dialog with unsaved changes requires confirmation.",
        },
        {
          category: "changed",
          scope: "OmniEnergy — clearer EnB configuration",
          body: "The baseline value and the per-machine indicator are separated into framed sections; manual value fields are labelled with the unit from the indicator definition instead of “numerator” and “denominator”.",
        },
        {
          category: "changed",
          scope: "OmniEnergy — audit trail for manual values",
          body: "Every manually entered value records who entered it and when. Manual values cannot be reconstructed from measurements, so they must be traceable during an ISO 50001 review.",
        },
        {
          category: "fixed",
          scope: "Monitoring — missing machines in the list",
          body: "The screen displayed at most 30 machines per line; with more than that some tiles were invisible without any warning. All machines of a line are now always shown.",
        },
        {
          category: "fixed",
          scope: "Status configurator — signal discovery limit",
          body: "The configured limit was ignored and discovery could collect many times more signals than requested. Filters were also fixed, where an empty rule let everything through or blocked everything.",
        },
        {
          category: "fixed",
          scope: "Status profiles — fractional speedometer values",
          body: "The maximum range value was silently rounded to an integer. The database column was brought in line with the model, together with missing report columns.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — distorted charts and indicators",
          body: "Snapshots without complete data were plotted as zero, creating an apparent drop. Incomplete snapshots are now skipped on the chart and blocked in audits and reports. Correction: in this version a denominator of zero was still replaced with 1 when calculating the indicator — the fix came in a later version.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — time selection in the schedule",
          body: "The “Next run” field used a browser control in which Firefox offered no way to pick the time. All date fields in the schedule now use the same component as the rest of the system.",
        },
        {
          category: "fixed",
          scope: "Configuration — parameter unit",
          body: "After choosing a parameter the unit is filled in automatically, with manual override still possible.",
        },
      ],
    },
    {
      version: "4.3.0",
      date: "2026-07-23",
      entries: [
        {
          category: "added",
          scope: "MCP (Model Context Protocol) — control OmniMES from any AI assistant",
          body: "Available right after installation: OmniMES exposes a standard MCP endpoint on the factory server. In any MCP-capable AI assistant (Claude Desktop, ChatGPT, Cursor, Copilot) you install the „OmniMES” plugin, paste an access token to your server, and you're done. From any computer on the company network, in natural language, you build complete dashboards and reports, configure the plant structure, machine statuses, alarms and schedules, and read the live production state as well as OmniEnergy measurement sources and points — without knowing the UI and without writing SQL. A real-world example: a single instruction „build a dashboard with availability, failure rate and energy cost per unit for the machine park” has the assistant create a dozen SQL queries, visualizations and a finished Redash dashboard. Choose the model deliberately: commercial (Claude, GPT, Gemini) — when quality matters; free via OpenRouter (Llama, Qwen, DeepSeek) — when cost matters; local (Ollama, LM Studio) — when data must stay inside the factory network.",
        },
      ],
    },
    {
      version: "4.2.1",
      date: "2026-07-10",
      entries: [
        {
          category: "changed",
          scope: "Monitoring",
          body: "Counters (indicators) now line up next to each other and wrap automatically depending on the width of the machine card. With the “1 machine per row” setting (wide card) many fit in a single row; with more machines per row they wrap on their own.",
        },
        {
          category: "fixed",
          scope: "Monitoring",
          body: "Eliminated the growing memory and CPU usage when switching server / line / sorting (previous broker connections were not being closed). The monitoring screen can now stay open for extended periods without hanging the browser, even with a large number of machines.",
        },
        {
          category: "security",
          scope: "Monitoring and stream",
          body: "Resilience against a wrong clock on the gateway or PLC. Timestamps “from the future” (e.g. +1h after a DST change or a wrong timezone) are rejected in favor of the server time, so they cannot corrupt the archive or the displayed machine state.",
        },
      ],
    },
    {
      version: "4.2.0",
      date: "2026-07-09",
      entries: [
        {
          category: "added",
          scope: "Machine state classification based on measurement",
          body: "Instead of relying solely on digital signals from the controller, the machine's working state (running / idle / changeover / stopped) can now be derived from a threshold on any analog measurement — motor current, hydraulic pressure, spindle RPM. Example: motor current > 12 A → machine running; 3–12 A → idle; < 3 A → stopped. Thresholds are defined in the status configurator; classification runs live in Monitoring and is persisted in history, so OEE, MTBF and production reports reflect the real machine state without wiring additional binary signals from the PLC.",
        },
      ],
    },
    {
      version: "4.1.0",
      date: "2026-07-08",
      entries: [
        {
          category: "changed",
          scope: "Data engine: PostgreSQL + TimescaleDB",
          body: "Replacing MongoDB — faster queries and noticeably lower storage footprint for telemetry, while keeping the existing functionality intact. Example: one year of telemetry from ~150 machines took roughly 80 GB in MongoDB, and roughly 7 GB in PostgreSQL + TimescaleDB (with hypertable compression) — about 10× less storage for the same source data, plus faster time-window queries.",
        },
        {
          category: "added",
          scope: "Native MQTT ingestion (alongside Sparkplug B)",
          body: "The OmniMES stream can now ingest measurements directly from MQTT topics — not only from Sparkplug B frames. This simplifies integration with controllers, IIoT gateways and devices that publish in native formats (JSON or plain payload), without requiring a Sparkplug layer on the source side.",
        },
        {
          category: "fixed",
          scope: "Monitoring",
          body: "Correct status assignment by MQTT topic and tag; fixed incorrect matches and retrieval of the latest events.",
        },
      ],
    },
    {
      version: "4.0.0",
      date: "2026-06-17",
      entries: [
        {
          category: "changed",
          scope: "New user interface: Vue 3 + PrimeVue v4 (Sakai theme)",
          body: "Toast-style notifications and per-view state persistence stored locally in the browser.",
        },
      ],
    },
  ],
}
