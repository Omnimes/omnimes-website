---
title: 'Partnerstwo OmniMES × Relpol — inteligentna sieć pomiarów energii dla polskiego przemysłu'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'partnerstwo-omnimes-relpol-inteligentna-siec-pomiarow-energii'
description: 'Multiprojekt (producent systemu OmniMES) i Relpol S.A. rozpoczynają wspólną ofertę: certyfikowane liczniki energii RMM od Relpolu plus system MES z modułem OmniEnergy zgodnym z ISO 50001. Pilotaż uruchomiony w zakładzie Relpol pokazuje kompletny ślad danych — od licznika na szynie DIN, przez stream telemetryczny, po pulpit ZWE gotowy do przeglądu ISO 50001. Jeden dostawca hardware, jeden dostawca software, jedna faktura, jedno wsparcie.'
coverImage: '/images/relpol/relpol-multiprojekt-handshake.png'
coverPosition: 'top'
lang: 'pl'
tags: [{"value":"omnimes","label":"Omnimes"},{"value":"omniEnergy","label":"OmniEnergy"},{"value":"relpol","label":"Relpol"},{"value":"ems","label":"EMS"},{"value":"iso50001","label":"ISO 50001"},{"value":"efektywnośćEnergetyczna","label":"efektywność energetyczna"}]
publishedAt: '2026-09-10T09:00:00.000Z'
---

W 2026 roku **Multiprojekt Automatyka** — producent systemu **OmniMES** — rozpoczyna strategiczną współpracę z **Relpol S.A.**, jednym z najstarszych polskich producentów przekaźników i mierników elektrycznych. Wspólna oferta łączy dwie warstwy, które dotąd polska fabryka musiała składać z osobnych zakupów: **sprzęt pomiarowy** (liczniki energii Relpol RMM montowane na szynie DIN) oraz **oprogramowanie zarządzające** (OmniMES z modułem OmniEnergy — zgodnym z normą ISO 50001).

![Partnerstwo Multiprojekt × Relpol — podpisanie współpracy](/images/relpol/relpol-multiprojekt-handshake.png)

Efekt dla klienta końcowego jest prosty: **jeden dostawca hardware, jeden dostawca software, jedna faktura, jedno wsparcie**. Nie trzeba osobno konfigurować bramki komunikacyjnej, mapować rejestrów Modbus i „doganiać" oprogramowaniem tego, co zmienił producent liczników — cały łańcuch jest zaprojektowany i przetestowany razem.

## Kim jest Relpol

Relpol S.A. z siedzibą w Żarach to polski producent aparatury elektrycznej: przekaźników przemysłowych, sterowników, mierników sieciowych i systemów pomiarów energii. Ich seria **RMM (Relpol Multi Meter)** to trójfazowe liczniki analizatory jakości energii — mierzą napięcie, prąd, moc czynną, bierną i pozorną, energię, częstotliwość, cos φ, harmoniczne, THD. Są certyfikowane, wykonane w standardzie MID, komunikują się przez RS-485 (Modbus RTU) oraz TCP/IP.

Kluczowe znaczenie ma to, że są to **liczniki polskiego producenta, dostępne z polskiego magazynu, z polskim wsparciem technicznym**. Dla zakładów produkcyjnych, które mają realną potrzebę wdrożenia audytu energetycznego pod ISO 50001, to skraca łańcuch dostaw i eliminuje ryzyko zależności od pojedynczego dostawcy zagranicznego.

![Liczniki Relpol RMM — inteligentna sieć pomiarów energii](/images/relpol/relpol-liczniki.jpg)

## Dlaczego partnerstwo z OmniMES

OmniMES to system klasy MES rozwijany przez Multiprojekt Automatyka od kilku lat — z modułem **OmniEnergy** dedykowanym zarządzaniu energią w standardzie ISO 50001. System zbiera pomiary z bramki (najczęściej po MQTT lub Sparkplug B), zapisuje je w bazie czasowej PostgreSQL + TimescaleDB, buduje wskaźniki wydajności energetycznej (WEE), definiuje bazy odniesienia (ENLB), obszary znaczącego wykorzystania energii (ZWE) i generuje dowody zgodności pod przegląd audytora.

Dotychczasowy problem polskich fabryk średniej wielkości: **sprzęt pomiarowy kupuje się od jednego dostawcy, oprogramowanie do jego obsługi — od innego, bramkę komunikacyjną — od jeszcze innego**. Konfiguracja tego stacka to często 2–3 tygodnie pracy integratora, a każda aktualizacja firmware licznika może wywrócić mapowanie. Partnerstwo Multiprojekt × Relpol znosi ten dług architektoniczny: liczniki RMM i OmniMES mają wspólnie przetestowaną konfigurację, a nowe wersje firmware licznika są weryfikowane po stronie oprogramowania przed publikacją.

## Pilotaż w zakładzie Relpol

Żeby partnerstwo miało realne pokrycie, pilotażowa instalacja została uruchomiona **w zakładzie produkcyjnym samego Relpolu**. To case study, który pokazuje synergię „na żywo" — ich własne liczniki RMM podłączone do OmniEnergy, monitorujące własną halę produkcyjną. Dane w systemie są prawdziwe, wskaźniki liczą się na bieżąco.

### Monitoring maszyn na żywo

Na ekranie monitoringu pojawiają się cztery obszary parku maszynowego Relpolu: **Drążarki, Frezarki, Galwanizernia 1, Galwanizernia 2**. Każda karta pokazuje bieżącą energię pobraną, moc pozorną, prąd na każdej fazie, częstotliwość, napięcia min/max/aktualne oraz cos φ.

![Monitoring maszyn Relpol w OmniMES](/images/relpol/relpol-monitoring.png)

Prędkościomierz z zielono-żółto-czerwoną skalą klasyfikuje stan pracy maszyny na podstawie mocy pozornej — konfigurowalne progi (wprowadzone w wersji OmniMES 4.2.0) pozwalają odróżnić pracę pełną od jałowej bez potrzeby doprowadzania dodatkowych sygnałów binarnych ze sterownika.

### Panel główny — perspektywa ISO 50001

Zaraz po zalogowaniu zarząd zakładu widzi jeden ekran z odpowiedzią na kluczowe pytania audytu ISO 50001: **ile jest obszarów znaczącego wykorzystania energii (ZWE), jakie pokrycie zapewniają wobec sumy poboru całej fabryki, jak wygląda ich rozkład Pareto, jak wygląda trend godzinowy w ostatnim tygodniu**.

![Panel główny ZWE — Relpol](/images/relpol/relpol-panel-zwe.png)

Na screenie z pilotażu widać 10 obszarów ZWE, pokrycie 82,3% (norma ISO 50001 wymaga minimum 80%), oraz szacowany roczny koszt energii ZWE poza godzinami pracy (1 635 971 PLN — ekstrapolowane z ostatnich 7 dni danych). Ta ostatnia liczba to konkretne wskazanie potencjału oszczędnościowego: energia płacona za maszyny, które w nocy i weekendy nie produkują.

### Porównywarka okien czasowych — wykrywanie regresji

Nowa funkcja OmniEnergy (wersja 4.4.0) — porównywanie zużycia w wielu oknach czasowych na jednym wykresie — pozwala szybko wykryć, czy modernizacja maszyny lub zmiana surowca faktycznie zmniejszyła pobór, czy tylko przesunęła go w czasie.

![Porównywarka okien czasowych ZWE](/images/relpol/relpol-porownanie-zwe.png)

Na przykładzie widocznym w pilotażu Relpolu porównanie pięciu dni pokazuje, że zmiana grupy sięga +172,75% — konkretny sygnał do zbadania, co się wydarzyło w tym oknie i czy jest to zamierzone (np. uruchomienie nowej linii), czy anomalia do naprawienia.

### Dashboard „Energia — przegląd zarządczy"

Dla dyrektora zakładu lub odpowiedzialnego za energię przygotowany jest osobny pulpit zarządczy: profil mocy czynnej, biernej i pozornej w oknach 15-minutowych (48 godzin do tyłu), struktura poboru wg obszarów (donut, ostatnie 24 h), top 10 obszarów z podziałem na pracę i postój, mapa cieplna „obszar × godzina doby".

![Dashboard zarządczy Energia — Relpol](/images/relpol/relpol-przeglad-zarzadczy.png)

Rozjazd między krzywą kW a krzywą kVA to natychmiastowy wskaźnik ryzyka opłat ponadumownych za pobór mocy biernej — coś, co bez ciągłego monitoringu wychodzi dopiero na fakturze raz w miesiącu.

## Co konkretnie dostaje klient

Klient końcowy — polska fabryka średniej wielkości chcąca wdrożyć zarządzanie energią pod ISO 50001 — z jednej rozmowy z Multiprojekt Automatyka może uzyskać:

- **Certyfikowane liczniki Relpol RMM** dobrane do liczby punktów pomiarowych, z gotową konfiguracją Modbus/RS-485
- **Bramka komunikacyjna** (przemysłowy komputer z Ethernet + RS-485) skonfigurowana pod dany zestaw liczników
- **System OmniMES + OmniEnergy** z gotową strukturą parku maszynowego, wstępnie zdefiniowanymi wskaźnikami WEE, bazą odniesienia ENLB i szablonami raportów pod przegląd zarządzania ISO 50001
- **Wdrożenie i szkolenie zespołu** — konfiguracja liczników, kalibracja pomiarów, warsztat z zarządzaniem energią i normą ISO 50001
- **Jedno wsparcie techniczne** obejmujące cały stack: liczniki, bramkę, oprogramowanie

Dla zakładów, które już mają liczniki Relpol RMM (a jest ich w polskim przemyśle sporo — Relpol jest jednym z popularniejszych producentów w tym segmencie), wdrożenie OmniMES sprowadza się do podłączenia bramki i konfiguracji struktury parku. **Bez wymiany istniejącej infrastruktury pomiarowej.**

## Dlaczego to ma znaczenie w 2026 roku

Rok 2026 to rok, w którym w Polsce zaczyna realnie egzekwować się szereg regulacji energetyczno-środowiskowych: [nowelizacja ustawy o efektywności energetycznej](https://www.ure.gov.pl/), [CBAM od 1 sierpnia dla eksporterów](/blog/cbam-dla-eksporterow-stali-aluminium-cementu-pierwszy-raport-1-sierpnia-2026-co-mes-ems-musi-liczyc) stali, aluminium, cementu, [KSC2 od drugiej połowy 2026](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) w cyberbezpieczeństwie. ISO 50001 — mimo że formalnie dobrowolna — staje się w tym kontekście standardowym wymaganiem ze strony największych klientów łańcuchów dostaw (motoryzacja, elektronika, przetwórstwo).

Zakład, który dziś ma **udokumentowany system zarządzania energią** — nie tylko liczniki, ale też wskaźniki WEE, bazę odniesienia, plan działań i przegląd zarządzania — jest znacznie prostszy do zaudytowania i taniej ubezpieczany, a jego oferta jest łatwiej akceptowana w przetargach z klauzulami zrównoważonego rozwoju.

Partnerstwo Multiprojekt × Relpol powstało po to, żeby polskie fabryki średniej wielkości mogły dojść do tego stanu **bez skomplikowanego projektu integracyjnego**. Sprzęt, oprogramowanie, wdrożenie — w jednym miejscu, z polskim wsparciem, z pełną kontrolą nad tym, gdzie fizycznie leżą Wasze dane.

---

## Zainteresowany?

- **Demo OmniMES + OmniEnergy** — [wersja demo systemu produkcji](https://www.omnimes.com/pl/demo) do przetestowania online
- **Kontakt handlowy** — [formularz kontaktowy](/contact) lub bezpośrednio przez [Multiprojekt Automatyka](https://multiprojekt.pl)
- **Więcej o Relpol RMM** — [oferta liczników Relpol](https://relpol.com.pl)
- **Historia zmian OmniMES** — [wszystkie wydania i roadmap](/pl/lista-zmian)
