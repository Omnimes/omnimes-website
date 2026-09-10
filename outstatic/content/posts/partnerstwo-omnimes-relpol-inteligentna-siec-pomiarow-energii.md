---
title: 'Partnerstwo OmniMES × Relpol — inteligentna sieć pomiarów energii dla polskiego przemysłu'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'partnerstwo-omnimes-relpol-inteligentna-siec-pomiarow-energii'
description: 'Multiprojekt (producent systemu OmniMES) oraz Relpol S.A. rozpoczynają wspólną ofertę: certyfikowane liczniki energii RMM od Relpolu w połączeniu z systemem MES i modułem OmniEnergy zgodnym z ISO 50001. Jeden dostawca sprzętu, jeden dostawca oprogramowania, jedna faktura, jedno wsparcie techniczne — zamiast trzech osobnych projektów integracyjnych.'
coverImage: '/images/relpol/relpol-multiprojekt-cover.jpg'
lang: 'pl'
tags: [{"value":"omnimes","label":"Omnimes"},{"value":"omniEnergy","label":"OmniEnergy"},{"value":"relpol","label":"Relpol"},{"value":"ems","label":"EMS"},{"value":"iso50001","label":"ISO 50001"},{"value":"efektywnośćEnergetyczna","label":"efektywność energetyczna"}]
publishedAt: '2026-09-10T09:00:00.000Z'
---

W 2026 roku **Multiprojekt Automatyka** — producent systemu **OmniMES** — rozpoczyna strategiczną współpracę z **Relpol S.A.**, jednym z najstarszych polskich producentów przekaźników i mierników elektrycznych. Wspólna oferta łączy dwie warstwy, które dotąd polska fabryka musiała składać z osobnych zakupów: **sprzęt pomiarowy** (liczniki energii Relpol RMM montowane na szynie DIN) oraz **oprogramowanie zarządzające** (OmniMES z modułem OmniEnergy — zgodnym z normą ISO 50001).

![Partnerstwo Multiprojekt oraz Relpol — podpisanie współpracy](/images/relpol/relpol-multiprojekt-handshake.jpg)

Efekt dla klienta końcowego jest prosty: **jeden dostawca sprzętu, jeden dostawca oprogramowania, jedna faktura, jedno wsparcie**. Nie trzeba osobno konfigurować bramki komunikacyjnej, mapować rejestrów Modbus i „doganiać" oprogramowaniem tego, co zmienił producent liczników — cały łańcuch jest zaprojektowany i przetestowany razem.

## Kim jest Relpol

Relpol S.A. z siedzibą w Żarach to polski producent aparatury elektrycznej: przekaźników przemysłowych, sterowników, mierników sieciowych i systemów pomiarów energii. Ich seria **RMM (Relpol Multi Meter)** to trójfazowe liczniki analizatory jakości energii — mierzą napięcie, prąd, moc czynną, bierną i pozorną, energię, częstotliwość, cos φ, harmoniczne oraz THD. Są certyfikowane, wykonane w standardzie MID, komunikują się przez RS-485 (Modbus RTU) oraz TCP/IP.

Kluczowe znaczenie ma to, że są to **liczniki polskiego producenta, dostępne z polskiego magazynu, z polskim wsparciem technicznym**. Dla zakładów produkcyjnych, które mają realną potrzebę wdrożenia audytu energetycznego pod ISO 50001, skraca to łańcuch dostaw i eliminuje ryzyko zależności od pojedynczego dostawcy zagranicznego.

![Liczniki Relpol RMM — inteligentna sieć pomiarów energii](/images/relpol/relpol-liczniki.jpg)

## Dlaczego partnerstwo z OmniMES

OmniMES to system klasy MES rozwijany przez Multiprojekt Automatyka od kilku lat — z modułem **OmniEnergy** dedykowanym zarządzaniu energią w standardzie ISO 50001. System zbiera pomiary z bramki komunikacyjnej (najczęściej po MQTT lub Sparkplug B), zapisuje je w bazie czasowej PostgreSQL z rozszerzeniem TimescaleDB, buduje wskaźniki wydajności energetycznej (WEE), definiuje bazy odniesienia (ENLB), obszary znaczącego wykorzystania energii (ZWE) i generuje dowody zgodności pod przegląd audytora.

Dotychczasowy problem polskich fabryk średniej wielkości: **sprzęt pomiarowy kupuje się od jednego dostawcy, oprogramowanie do jego obsługi — od innego, a bramkę komunikacyjną — od jeszcze innego**. Konfiguracja tego zestawu to często dwa lub trzy tygodnie pracy integratora, a każda aktualizacja firmware licznika może wywrócić mapowanie. Partnerstwo Multiprojekt oraz Relpol znosi ten dług architektoniczny: liczniki RMM i OmniMES mają wspólnie przetestowaną konfigurację, a nowe wersje firmware licznika są weryfikowane po stronie oprogramowania przed publikacją.

## Co konkretnie dostaje klient

Klient końcowy — polska fabryka średniej wielkości chcąca wdrożyć zarządzanie energią pod ISO 50001 — z jednej rozmowy z Multiprojekt Automatyka może uzyskać:

- **Certyfikowane liczniki Relpol RMM** dobrane do liczby punktów pomiarowych, z gotową konfiguracją Modbus oraz RS-485
- **Bramka komunikacyjna** (przemysłowy komputer z Ethernet oraz RS-485) skonfigurowana pod dany zestaw liczników
- **System OmniMES z modułem OmniEnergy** wraz z gotową strukturą parku maszynowego, wstępnie zdefiniowanymi wskaźnikami WEE, bazą odniesienia ENLB oraz szablonami raportów pod przegląd zarządzania ISO 50001
- **Wdrożenie i szkolenie zespołu** — konfiguracja liczników, kalibracja pomiarów, warsztat z zarządzaniem energią i normą ISO 50001
- **Jedno wsparcie techniczne** obejmujące cały zestaw: liczniki, bramkę oraz oprogramowanie

Dla zakładów, które już mają liczniki Relpol RMM (a jest ich w polskim przemyśle sporo — Relpol jest jednym z popularniejszych producentów w tym segmencie), wdrożenie OmniMES sprowadza się do podłączenia bramki i konfiguracji struktury parku. **Bez wymiany istniejącej infrastruktury pomiarowej.**

## Co daje ta synergia w praktyce

Z perspektywy dyrektora zakładu lub kierownika utrzymania ruchu wspólny zestaw pomiarowo-programowy przekłada się na kilka konkretnych efektów:

- **Widoczność zużycia energii na poziomie pojedynczego obszaru** — nie tylko zbiorczy pobór z licznika głównego, ale też podział na linie produkcyjne oraz najbardziej energochłonne procesy. Bez tego audyt ISO 50001 wymaga ręcznego obliczania na podstawie faktur i szacunków, a plan działań energetycznych opiera się na intuicji zamiast na danych.
- **Automatyczne monitorowanie stanu pracy maszyn** — klasyfikacja praca, praca jałowa, przezbrojenie oraz postój wyznaczana z progu mocy pozornej, bez potrzeby doprowadzania dodatkowych sygnałów binarnych ze sterownika. Konfigurowalne progi (wprowadzone w wersji OmniMES 4.2.0) sprawiają, że wskaźnik OEE oraz raporty produkcyjne uwzględniają faktyczny stan maszyny.
- **Wczesne wykrywanie strat energii poza godzinami produkcji** — zestawienia pokazujące zużycie w podziale na godziny robocze oraz weekendy pomagają wskazać maszyny, które nie zostały wyłączone i generują ukryty koszt operacyjny.
- **Dowody zgodności gotowe do przeglądu ISO 50001** — dziennik audytu wartości pomiarowych, ślad wprowadzanych ręcznie wartości oraz raporty okresowe generowane z jednego źródła danych.

## Dlaczego to ma znaczenie w 2026 roku

Rok 2026 to rok, w którym w Polsce zaczyna realnie egzekwować się szereg regulacji energetyczno-środowiskowych: [nowelizacja ustawy o efektywności energetycznej](https://www.ure.gov.pl/), [CBAM od 1 sierpnia dla eksporterów](/blog/cbam-dla-eksporterow-stali-aluminium-cementu-pierwszy-raport-1-sierpnia-2026-co-mes-ems-musi-liczyc) stali, aluminium oraz cementu, [KSC2 od drugiej połowy 2026](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) w cyberbezpieczeństwie. ISO 50001 — mimo że formalnie dobrowolna — staje się w tym kontekście standardowym wymaganiem ze strony największych klientów łańcuchów dostaw (motoryzacja, elektronika, przetwórstwo).

Zakład, który dziś ma **udokumentowany system zarządzania energią** — nie tylko liczniki, ale też wskaźniki WEE, bazę odniesienia, plan działań oraz przegląd zarządzania — jest znacznie prostszy do zaudytowania i taniej ubezpieczany, a jego oferta jest łatwiej akceptowana w przetargach z klauzulami zrównoważonego rozwoju.

Partnerstwo Multiprojekt oraz Relpol powstało po to, żeby polskie fabryki średniej wielkości mogły dojść do tego stanu **bez skomplikowanego projektu integracyjnego**. Sprzęt, oprogramowanie, wdrożenie — w jednym miejscu, z polskim wsparciem, z pełną kontrolą nad tym, gdzie fizycznie leżą Wasze dane.

---

## Zainteresowany

- **Demo OmniMES z modułem OmniEnergy** — [wersja demo systemu produkcji](https://www.omnimes.com/pl/demo) do przetestowania online
- **Kontakt handlowy** — [formularz kontaktowy](/contact) lub bezpośrednio przez [Multiprojekt Automatyka](https://multiprojekt.pl)
- **Więcej o Relpol RMM** — [oferta liczników Relpol](https://relpol.com.pl)
- **Historia zmian OmniMES** — [wszystkie wydania oraz roadmap](/pl/lista-zmian)
