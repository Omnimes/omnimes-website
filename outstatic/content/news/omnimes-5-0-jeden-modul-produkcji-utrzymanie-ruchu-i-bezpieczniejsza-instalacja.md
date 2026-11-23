---
title: 'OmniMES 5.0: zlecenia, awarie i alarmy w jednym systemie'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'omnimes-5-0-jeden-modul-produkcji-utrzymanie-ruchu-i-bezpieczniejsza-instalacja'
description: 'OmniMES 5.0 jest dostępny. Zlecenia z ERP trafiają prosto do Produkcji, awaria przechodzi od zgłoszenia operatora do potwierdzonej naprawy w jednym module, a alarmy docierają przez Teams, Slack i e-mail z eskalacją. Do tego bezpieczniejsza instalacja, codzienne kopie z testem odtworzenia i aktualizacja, która przy błędzie sama się wycofuje.'
coverImage: '/images/post-omnimes-5-0/cover-omnimes-5-0-pl.png'
lang: 'pl'
publishedAt: '2026-11-22T19:00:00.000Z'
---

Od 22 listopada dostępny jest **OmniMES 5.0**. To wydanie porządkuje codzienną pracę zakładu: zlecenia, awarie i alarmy obsługuje się w jednym systemie, a sama instalacja jest bezpieczniejsza i prostsza w utrzymaniu.

## Co zyskuje zakład

**Jedno miejsce na zlecenia.** Moduł Produkcja zastępuje dawną listę zleceń. Zlecenia z ERP trafiają do niego bezpośrednio, a meldunki wracają do ERP razem z czasem pracy operatorów. Kierownik od razu widzi zlecenia opóźnione i meldunki, które nie dotarły do ERP. Kalendarz produkcji pokazuje, co dzieje się na hali i co jest zaplanowane, a planista co-jeśli pozwala porównać do pięciu wariantów planu (np. postój maszyny albo dodatkowa zmiana), zanim cokolwiek się zmieni.

**Utrzymanie ruchu od zgłoszenia do naprawy.** Operator zgłasza awarię z panelu przy maszynie, także ze zdjęciem. Kierownik tworzy zlecenie dla technika, technik zapisuje czas, części i przyczynę, a produkcja potwierdza naprawę. Zlecenia przeglądów powstają same, według kalendarza albo motogodzin liczonych z sygnałów maszyny. MTBF i MTTR wynikają z prawdziwych zgłoszeń, a raport *Koszt utrzymania ruchu* pokazuje, ile ta praca kosztuje.

**Historia maszyny w jednym widoku.** Ekran *Zdarzenia maszyn* zbiera na jednej osi czasu awarie, postoje, alarmy i zlecenia serwisowe. Notatka przy awarii („co się stało, co zrobiono”) jest widoczna także w analizie OEE i na karcie maszyny, a filtr *Bez notatki* daje gotową listę na odprawę zmiany.

**Alarmy, które docierają do właściwych osób.** Reguły obejmują maszyny, sygnały, energię, utrzymanie ruchu i stan samego systemu. Powiadomienia idą do aplikacji, na e-mail, do Microsoft Teams i Slacka, a nieobsłużony alarm przechodzi na kolejny poziom eskalacji.

**Energia pod kontrolą.** OmniEnergy ostrzega, gdy zużycie odbiega od linii bazowej EnPI. Nowy raport *Energia i stany maszyn* pokazuje energię zużytą poza pracą, koszt i emisję CO2 dla wybranych maszyn.

**AI, które działa w granicach uprawnień.** Funkcje AI konfiguruje się w jednym miejscu: Claude, dowolne API zgodne z OpenAI albo lokalna Ollama, gdy dane nie mogą opuścić zakładu. Asystent AI widzi i zmienia tylko to, co użytkownik, w którego imieniu działa. Każda zmiana trafia do Dziennika zdarzeń, a administrator może wymagać zatwierdzenia zmian przed ich wykonaniem.

## Bezpieczeństwo i ciągłość działania

Wersja 5.0 to także odpowiedź na wymagania Cyber Resilience Act (CRA):

- **Ochrona dostępu:** blokada konta po nieudanych próbach logowania, silniejsze hasła, wygasające sesje, osobne konta bazy danych dla każdej usługi.
- **Bezpieczna komunikacja z maszynami:** broker MQTT z kontami urządzeń i szyfrowaniem TLS. Bramka publikuje tylko w swojej grupie i nie wyśle poleceń do maszyn.
- **Kopie zapasowe, które da się odtworzyć:** codzienna, szyfrowana kopia, opcjonalnie poza serwerem (SFTP albo S3), z comiesięcznym automatycznym testem odtworzenia.
- **Aktualizacja bez ryzyka:** gdy coś pójdzie nie tak, system sam wraca do poprzedniej wersji.
- **Przejrzystość:** każde wydanie ma wykaz składników (SBOM) i skan podatności, a nowy [Podręcznik administratora](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/podrecznik-administratora-QDejua8ox1) opisuje bezpieczne uruchomienie i eksploatację.

System jest też szybszy. W naszych testach ostatnie wartości sygnałów pobierają się w 0,29 s zamiast 22,6 s, zrzut pulpitu powstaje w 10,5 s zamiast ok. 5 minut, a przy przerwie w połączeniu z bazą dane z maszyn czekają w buforze i nie giną.

## Jak przejść na 5.0

Instalacje utrzymywane przez nasz serwis oraz instancje w chmurze OmniMES aktualizujemy sami, w uzgodnionym oknie serwisowym. Przed aktualizacją warto:

- oznaczyć tablety i komputery na hali jako **konta kiosku**, żeby pozostały zalogowane;
- sprawdzić urządzenia MQTT, które publikują dane poza Sparkplug B;
- wskazać odbiorców powiadomień utrzymania ruchu.

Dawna lista zleceń i stary harmonogram znikają, a ich adresy prowadzą do modułu Produkcja. Zespoły, które utrzymują instalację samodzielnie, znajdą procedurę w rozdziale [Instalacja](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/instalacja-wersja-on-premise-2tAS575nLs) (sekcja 8.2).

Pełny wykaz zmian jest na stronie [Lista zmian](/pl/lista-zmian), a opisy modułów w [dokumentacji](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/wstep-XMdRkBsh9c). Chcecie zobaczyć 5.0 na własnych danych albo zaplanować aktualizację? [Napiszcie do nas](/pl/kontakt).
