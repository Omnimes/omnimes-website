---
title: 'Digital Product Passport dla baterii: 5,5 miesiąca do 18 lutego 2027 — co polska fabryka musi mieć w MES, żeby zdążyć (wnioski z pierwszych pilotaży EU)'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'digital-product-passport-baterie-do-18-lutego-2027-co-polska-fabryka-musi-miec-w-mes'
description: '18 lutego 2027 dla baterii przemysłowych powyżej 2 kWh i baterii pojazdów elektrycznych startuje obowiązek Digital Product Passport (rozporządzenie 2023/1542). Pięć i pół miesiąca to nie jest dużo czasu — dostawcy do OEM (Volkswagen, Stellantis, BMW) już od sierpnia 2026 zaczynają wymagać gotowości danych w MES od poddostawców. Artykuł zbiera co dokładnie musi znaleźć się w DPP, jaka jest rola MES w tej strukturze, jakie są wnioski z pierwszych 12 pilotaży EU (Battery Pass Consortium, Circulor/Volvo, ACC, Verkor), i konkretną roadmapę na 5,5 miesiąca dla polskiej fabryki baterii.'
coverImage: '/images/post-dpp-batteries/cover-dpp-batteries.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"dpp","label":"DPP"}]
publishedAt: '2026-08-31T08:00:00.000Z'
---

Osiemnastego lutego 2027 wchodzi w życie pierwszy twardy termin Digital Product Passport w Unii Europejskiej. Kategoria: baterie przemysłowe powyżej 2 kWh oraz baterie do pojazdów elektrycznych. Podstawa prawna: [rozporządzenie 2023/1542 o bateriach](https://eur-lex.europa.eu/eli/reg/2023/1542/oj), Artykuł 77 (paszport baterii). Do daty startu pozostało pięć i pół miesiąca. Wbrew powszechnej opinii — to nie jest dużo czasu, i nie chodzi tylko o producentów baterii. Poddostawcy anody, katody, obudów, konektorów, systemów zarządzania baterią (BMS) muszą mieć dane w MES gotowe do przekazania OEM najpóźniej w listopadzie 2026, żeby OEM zdążył złożyć DPP dla pierwszej partii baterii wyprodukowanych po 18 lutego.

Ten artykuł zbiera co konkretnie musi być w DPP dla baterii, jak wygląda architektura danych (dziewięćdziesiąt kilka pól obowiązkowych, w tym dane wrażliwe konkurencyjnie), co pokazały pierwsze pilotaże w konsorcjum Battery Pass i u Circulor/Volvo, oraz jaka jest realistyczna roadmapa na 5,5 miesiąca dla polskiej fabryki. Bez marketingu — z konkretnymi zapisami z rozporządzenia i realną listą punktów, które MES musi obsłużyć.

## Kto podlega DPP od 18 lutego 2027 — trzy kategorie

Rozporządzenie 2023/1542 dzieli baterie na pięć kategorii (Art. 3 pkt 9–13). Digital Product Passport od 18 lutego 2027 obowiązuje trzy z nich:

**Baterie LMT (Light Means of Transport)** — baterie do lekkich środków transportu: rowery elektryczne, hulajnogi elektryczne, motorowery elektryczne. Pojemność bez limitu dolnego. Producenci w Polsce: Kross, Romet (montaż), plus wielu importerów prywatnych.

**Baterie przemysłowe powyżej 2 kWh** — baterie stacjonarne (magazyny energii, UPS przemysłowe), baterie do wózków widłowych, do AGV, do robotów mobilnych. Threshold 2 kWh eliminuje drobne baterie narzędziowe i UPS-y biurowe. Polska ma tu silną pozycję: fabryki Impact Clean Power Technology (Pruszków), Solaris Bus & Coach (Bolechowo, baterie do autobusów), ElectroMobility Poland (Izera — planowany start produkcji).

**Baterie do pojazdów elektrycznych (EV)** — wszystkie baterie do samochodów osobowych, ciężarowych i autobusów elektrycznych. To największa kategoria w Polsce w liczbach — LG Energy Solution Wrocław (55 GWh rocznej produkcji), SK On Dąbrowa Górnicza (planowana rozbudowa do 30 GWh), Northvolt (upadłość w listopadzie 2024, ale linie produkcyjne w Skellefteå zostały wykupione przez inwestora — status niepewny na sierpień 2026).

**Kto nie podlega jeszcze**: baterie przenośne (do elektroniki użytkowej, narzędzi elektrycznych) mają DPP dopiero od 18 sierpnia 2028. Baterie do środków lotniczych i kosmicznych są całkowicie wyłączone (Art. 1 ust. 5).

## Co dokładnie musi być w DPP baterii — struktura danych

Artykuł 77 rozporządzenia definiuje ramy DPP, a szczegółowy model danych określa akt wykonawczy Komisji Europejskiej (przyjęty w kwietniu 2026, opublikowany jako Regulation (EU) 2026/425 z 3 kwietnia). Model dzieli dane na sześć obszarów:

**Obszar 1 — Ogólne informacje o produkcie** (10 pól obowiązkowych): unikalny identyfikator baterii (UID), producent, model, data produkcji, kategoria, waga, wymiary, chemia (Li-NMC, LFP, LTO, sodium-ion itd.), pojemność nominalna, napięcie nominalne.

**Obszar 2 — Ślad węglowy** (12 pól, z podziałem na etapy cyklu życia): emisje z pozyskania surowców, emisje z produkcji ogniw, emisje z montażu pakietu, emisje z transportu, klasa śladu węglowego (A–G, na wzór etykiet energetycznych), metoda kalkulacji (PEFCR — Product Environmental Footprint Category Rules), rok weryfikacji, jednostka odniesienia (kg CO₂-eq/kWh dostarczonej energii przez cały cykl życia).

**Obszar 3 — Materiały i skład chemiczny** (30+ pól): pełny wykaz substancji w baterii z podziałem na aktywne materiały katody, anody, elektrolitu, separatora, obudowy. Dla surowców krytycznych (kobalt, lit, nikiel, grafit naturalny) — minimalny udział materiałów z recyklingu (od 2031 obligatoryjne progi, w 2027 tylko raport bez progów).

**Obszar 4 — Dane operacyjne (dla EV i przemysłowych >2 kWh)** — dane rejestrowane przez BMS w trakcie eksploatacji: State of Health (SoH), liczba cykli ładowania, temperatury pracy, głębokość rozładowania. To dane, które **muszą być aktualizowane w trakcie życia baterii**, a nie tylko w momencie produkcji.

**Obszar 5 — Zgodność i certyfikacja** (15 pól): identyfikator producenta (EORI), numery zgodności CE, certyfikaty od jednostki notyfikowanej, deklaracje zgodności REACH i RoHS, lista przetestowanych norm bezpieczeństwa (UN 38.3, IEC 62660 itd.).

**Obszar 6 — Koniec życia i drugie życie** (15 pól): instrukcje demontażu, zdolność do drugiego zastosowania (repurposing dla magazynów stacjonarnych), instrukcje utylizacji materiałów niebezpiecznych, sieć autoryzowanych recyklerów, kontakt do producenta w sprawie EPR (Extended Producer Responsibility).

Łącznie — powyżej 90 pól obowiązkowych plus 30+ opcjonalnych. Dla porównania, obecne wymogi znakowania baterii (dyrektywa 2006/66/WE) miały poniżej 10 pól. Skok skali danych jest ponad 10-krotny.

## Rola MES — źródło danych, które nie mogą być odtworzone później

Analiza pól DPP pokazuje jasny podział na dane, które da się dodać po fakcie (dane techniczne modelu, chemia, wymiary), i dane, które **musi zarejestrować MES w trakcie produkcji, bo później nie da się ich odtworzyć**. Ta druga kategoria jest krytyczna:

**Ślad węglowy per ogniwo** — musi być liczony na podstawie rzeczywistego zużycia energii linii produkcyjnej, nie na podstawie średnich. To znaczy: MES musi rejestrować dokładne zużycie kWh na partię ogniw, powiązać z miksem energetycznym w dniu produkcji (dane od dostawcy energii + PPA + certyfikaty gwarancji pochodzenia), i podzielić przez liczbę ogniw w partii. Bez integracji MES z systemem energetycznym fabryki — nie ma jak to policzyć.

**Genealogia partii i identyfikowalność surowców** — dla każdego ogniwa trzeba wiedzieć z której partii litu, z której partii kobaltu, z której partii miedzi zostało zrobione. To wymaga rejestrowania w MES ID partii surowca na każdym etapie zmiany kwalifikatora (wymieszanie proszków, powlekanie, cięcie elektrod, montaż ogniwa). Standard: [ISA-95 batch genealogy](https://www.isa.org/standards-and-publications/isa-standards/isa-95). Dla baterii to praktycznie oznacza minimum 15 pełnych rejestracji genealogii per ogniwo — od surowca do końcowego montażu.

**Parametry procesu wpływające na SoH** — długość cyklu formowania (formation cycling), temperatury podczas suszenia elektrod, ciśnienie kalandrowania, wilgotność podczas montażu. Te dane wpływają na późniejszą degradację baterii i muszą być udostępnione dla drugiego życia i recyklerów.

**Pomiary jakościowe** — wyniki QC dla każdej krytycznej operacji (grubość elektrody, adhesja, testy elektrochemiczne inicjalne, EIS — Electrochemical Impedance Spectroscopy). W praktyce oznacza integrację MES z systemem LIMS (Laboratory Information Management System) i archiwizację wyników na okres 10 lat (obowiązek retencji z Art. 77 ust. 5).

Dla przykładu — fabryka LG Energy Solution we Wrocławiu produkuje około 15 milionów ogniw miesięcznie. Każde ogniwo wymaga rejestracji minimum 200 punktów danych z produkcji. To 3 miliardy punktów danych miesięcznie tylko z jednej fabryki, wymagających archiwizacji na 10 lat i udostępnienia przez API do systemu DPP. Bez architektury MES opartej na bazie czasowej (jak [TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hipertabele-postgresa-obsluguja-200m-odczytow-dziennie)) — nierealne.

## Wnioski z pierwszych 12 pilotaży EU — co faktycznie działa

Najwięcej praktyki mamy z **Battery Pass Consortium** — konsorcjum finansowane przez niemieckie Ministerstwo Gospodarki (BMWK), skupiające 11 firm: BASF, BMW, Umicore, TWAICE, Circulor, VDE, iPoint, TÜV Rheinland, DEKRA, Fraunhofer IPK i Systemiq. Pilotaż trwał od 2022 do 2024, wyniki opublikowane w raporcie [Battery Passport Content Guidance v1.0](https://thebatterypass.eu) w kwietniu 2023 i uzupełnione wersją v2.0 w marcu 2025.

Trzy najważniejsze wnioski z Battery Pass:

**Wniosek 1 — dane wrażliwe konkurencyjnie muszą być podzielone na poziomy dostępu.** DPP wymaga udostępnienia danych producentowi, dystrybutorowi, użytkownikowi końcowemu, recyklerowi, organowi nadzoru. Ale nie każdy poziom widzi wszystko. Ślad węglowy per ogniwo (w rozbiciu na etapy) to informacja handlowa — konkurencja może zorientować się, jaki masz miks energetyczny i jaka efektywność procesu. Battery Pass zaproponował strukturę pięciostopniową: publiczne (widoczne dla każdego z kodu QR), semi-publiczne (dostawcy i klienci), techniczne (serwis, recyklerzy), regulacyjne (tylko organ nadzoru), pełne (tylko producent). MES musi wspierać wielopoziomowe API zamiast pojedynczego endpointu.

**Wniosek 2 — decentralizacja danych jest wymogiem, nie opcją.** Battery Pass jasno stwierdził: centralna baza EU dla DPP nie skaluje się przy 300 milionach baterii rocznie (prognoza CATL/BloombergNEF na 2027). Rozwiązanie: dane przechowuje producent w swojej infrastrukturze, DPP jest tylko adresem (URL/URI) w kodzie QR, który przekierowuje do serwera producenta. Konsekwencja dla MES: fabryka musi mieć **własny endpoint DPP** — nie tylko wysłać dane do jakiejś centralnej bazy, ale hostować je 10 lat z gwarancją dostępności 99,5% (obowiązek z Art. 77 ust. 8).

**Wniosek 3 — synchronizacja między producentem ogniwa a producentem pakietu jest największym wąskim gardłem.** W typowej strukturze: fabryka A produkuje ogniwa, fabryka B montuje ogniwa w moduły, fabryka C montuje moduły w pakiety, OEM D instaluje pakiety w samochodach. Cztery różne firmy, cztery różne MES, cztery różne systemy śledzenia. DPP wymaga scalenia danych z wszystkich czterech pod jednym identyfikatorem — bez ryzyka duplikatów i konfliktów. Battery Pass zaproponował standard oparty na [GS1 Digital Link](https://www.gs1.org/standards/gs1-digital-link) plus notariat blockchain dla weryfikacji integralności (Circulor Technology).

## Pilotaż Circulor / Volvo — pierwsze DPP w produkcji seryjnej

**Circulor** (brytyjska firma śledzenia surowców krytycznych) plus **Volvo Cars** przeprowadziły w latach 2022–2024 pierwsze pełne wdrożenie DPP w produkcji seryjnej — dla baterii do Volvo EX90 (SUV elektryczny). Volvo publikowało wyniki na konferencji [Circular Materials Conference 2025](https://www.circularmaterialsconference.com) w Göteborgu.

Kluczowe liczby z pilotażu Volvo:

- **9 miesięcy** — od decyzji o wdrożeniu DPP do pierwszego pojazdu z pełnym paszportem (marzec 2023 → grudzień 2023)
- **11 poddostawców** w łańcuchu musiało zintegrować się z platformą Circulor (kobalt z DRC, lit z Australii i Chile, nikiel z Indonezji i Australii, grafit z Norwegii, aluminium z Norwegii, katoda LG Chem, obudowa Northvolt itd.)
- **4,2 mln EUR** — koszt wdrożenia po stronie Volvo (bez kosztów po stronie dostawców)
- **63 pola danych** w pierwszej wersji DPP (mniej niż wymóg regulacyjny, bo pilotaż)
- **97,8%** — kompletność danych osiągnięta po 12 miesiącach od startu
- **2,3%** — braki wynikające głównie z dostawców pomniejszych komponentów (uszczelki, konektory) bez cyfrowej dokumentacji

Volvo publicznie stwierdziło, że największym wyzwaniem nie był model danych ani technologia, tylko **przekonanie dostawców z Azji do udostępnienia danych o śladzie węglowym**. Trzej dostawcy chińscy początkowo odmówili, argumentując że to informacja handlowa. Ostatecznie Volvo musiało zaproponować model dostępu warstwowego (zgodny z rekomendacją Battery Pass) i podpisać NDA z każdym dostawcą osobno.

Dla polskich fabryk baterii wniosek jest jednoznaczny: **negocjacje z dostawcami z Azji zajmą minimum 3–6 miesięcy**. Jeśli nie zaczniesz w sierpniu 2026, nie zdążysz do lutego 2027.

## Bariery — co jeszcze nie jest gotowe

Uczciwa ocena: 5,5 miesiąca do startu, a lista braków w ekosystemie DPP jest długa.

**Brak referencyjnej implementacji technicznej.** Komisja Europejska opublikowała model danych, ale nie ma oficjalnej implementacji technicznej (open-source SDK dla producentów). Battery Pass Consortium wypuścił [Battery Pass Reference Implementation](https://github.com/batterypass) w marcu 2025, ale to prototype, nie production-ready. Producenci muszą albo płacić za komercyjne rozwiązania (Circulor, iPoint, TWAICE — 200-500k EUR rocznie), albo budować własne od zera.

**Brak wspólnego standardu identyfikatora ogniwa.** Rozporządzenie mówi "unikalny identyfikator", ale nie precyzuje formatu. GS1 promuje GS1 Digital Link, GS1 SGTIN, Battery Pass promuje własny format. To ryzyko fragmentacji — jeśli różni OEM zażądają różnych formatów, poddostawca będzie musiał obsługiwać kilka równolegle.

**Niekompletność aktu wykonawczego dla ogniw z drugiego życia.** Rozporządzenie zakłada, że bateria z drugim życiem (np. z EV do magazynu stacjonarnego) dostaje nowy DPP, ale procedura przekazania danych z pierwszego DPP do drugiego nie została jeszcze doprecyzowana. Komisja obiecuje akt wykonawczy w Q1 2027 — czyli już po dacie startu obowiązku.

**Ryzyko sankcji nieznane.** Art. 92 rozporządzenia mówi tylko "sankcje muszą być skuteczne, proporcjonalne i odstraszające". Kraje członkowskie definiują konkretne stawki. Polski projekt ustawy implementacyjnej (jeszcze nieprzyjęty na sierpień 2026) wprowadza sankcje do 4% globalnego rocznego obrotu — to poziom GDPR, dużo więcej niż obecne kary dla dyrektyw środowiskowych.

## Roadmapa 5,5 miesiąca dla polskiej fabryki baterii

Realistyczny harmonogram dla producenta ogniw lub pakietów, który dziś jeszcze nie zaczął wdrożenia DPP:

**Wrzesień 2026 (Miesiąc 1): audyt danych.** Sprawdzić, które z 90+ pól DPP masz już rejestrowane w MES, których nie masz w ogóle, które masz w formatach nieekstrahowalnych (Excel, ręczne wpisy). Wynik audytu — jednostronicowa mapa: pole DPP → źródło danych → poziom gotowości (0-100%).

**Październik 2026 (Miesiąc 2): decyzja architektoniczna.** Wybór platformy DPP: własna czy komercyjna (Circulor, iPoint, TWAICE). Dla producenta ogniw poniżej 5 GWh rocznie — komercyjna prawie zawsze bardziej opłacalna niż budowa własna. Dla powyżej 5 GWh — budowa własna zaczyna być zasadna ekonomicznie (koszty licencji vs koszty developmentu).

**Listopad 2026 (Miesiąc 3): integracja MES ↔ platforma DPP.** Rozszerzenie MES o rejestrację brakujących pól (najczęściej: dokładne zużycie energii per partia, pełna genealogia surowców do 4 poziomu w głąb łańcucha, integracja z LIMS dla wyników jakości). Deploy adapterów API do platformy DPP.

**Grudzień 2026 (Miesiąc 4): pilotaż na jednej linii.** Wybór jednej linii produkcyjnej (najlepiej z ustabilizowaną produkcją, nie prototypowej) i przepuszczenie przez pełen cykl DPP: rejestracja danych w MES → transfer do platformy → wygenerowanie kodu QR → walidacja przez zewnętrzną firmę audytową (TÜV, DEKRA). Cel: kompletność danych powyżej 95% na koniec miesiąca.

**Styczeń 2027 (Miesiąc 5): skalowanie na wszystkie linie i finalne testy.** Rozszerzenie na wszystkie linie produkcyjne. Testy obciążeniowe API DPP (czy platforma wytrzyma szczyt produkcyjny). Ostateczna weryfikacja z OEM (jeśli jesteś poddostawcą — Volkswagen, Stellantis, BMW mają własne procedury walidacji dostawcy DPP).

**Luty 2027 (Miesiąc 6): produkcja z pełnym DPP.** 18 lutego pierwsza bateria z pełnym DPP schodzi z linii. Od tej daty każda produkowana bateria musi mieć DPP.

**Po 18 lutego 2027**: obowiązek utrzymania DPP przez 10 lat, aktualizacja danych operacyjnych (SoH z BMS) przez cały cykl życia baterii, obsługa zapytań od recyklerów i drugiego życia.

## Co to oznacza dla polskiego sektora

Polska ma trzy fabryki baterii w skali gigawatt (LG Wrocław, SK On Dąbrowa Górnicza, Impact Pruszków) plus 40+ poddostawców komponentów. Realny popyt na wdrożenia DPP w Polsce do lutego 2027 — powyżej 50 projektów.

Fabryki, które zaczęły w Q1 2026, są dziś w fazie testów pilotażowych i zdążą bez problemu. Fabryki, które zaczną we wrześniu 2026, zdążą w trybie awaryjnym. Fabryki, które zaczną w listopadzie 2026 lub później — najprawdopodobniej nie zdążą i pierwsze partie produkowane po 18 lutego trafią do magazynu (bez możliwości sprzedaży w UE) do czasu skompletowania DPP.

Dla polskich integratorów MES to okno biznesowe rzędu 50–100 mln PLN w najbliższych 12 miesiącach (średni projekt wdrożenia DPP w segmencie średnim: 1-2 mln PLN łącznie z licencjami). Dla producentów baterii to twardy termin regulacyjny bez okresu przejściowego — Komisja jasno stwierdziła w komunikacie z lipca 2026, że nie planuje przedłużenia.

Bateria to pierwsza kategoria produktu z obowiązkiem DPP. Kolejne w kolejce: tekstylia (2028), elektronika użytkowa (2029), meble (2030), pełny zakres ESPR do 2032. Doświadczenia z DPP baterii ustawią standard dla całego cyklu. Warto zbudować kompetencję u siebie wewnętrznie, a nie tylko wykupić usługę zewnętrzną — za trzy lata te same wymogi trafią do wszystkich pozostałych sektorów wytwórczych.

---

## Źródła

- [Rozporządzenie 2023/1542 o bateriach](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) — Art. 77 (Digital Product Passport), Art. 92 (sankcje)
- [Regulation (EU) 2026/425 — akt wykonawczy do DPP baterii](https://eur-lex.europa.eu) — szczegółowy model danych (kwiecień 2026)
- [Battery Pass Consortium — Content Guidance v2.0](https://thebatterypass.eu) — konsorcjum finansowane przez BMWK, standard danych DPP
- [Global Battery Alliance — Battery Passport Pilot](https://www.globalbattery.org) — pilotaż z Volvo (2022–2023)
- [Circulor — case study Volvo EX90](https://www.circulor.com) — pierwsze pełne wdrożenie DPP w produkcji seryjnej
- [GS1 Digital Link](https://www.gs1.org/standards/gs1-digital-link) — standard identyfikatora produktu w DPP
- [ISA-95 batch genealogy](https://www.isa.org/standards-and-publications/isa-standards/isa-95) — model danych genealogii partii w MES
- BloombergNEF — Long-Term Electric Vehicle Outlook 2026 — prognoza 300 mln baterii EV rocznie w 2027
- [Nasz artykuł: TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hipertabele-postgresa-obsluguja-200m-odczytow-dziennie) — architektura bazy danych dla dużej skali odczytów procesowych
- [Nasz artykuł: NIS2 i polska ustawa KSC2 w 2026](/blog/nis2-i-polska-ustawa-ksc2-w-2026-jak-mes-staje-sie-dowodem-cyber-compliance-dla-polskiej-fabryki) — kontekst regulacyjny cybersecurity dla infrastruktury DPP
- [OmniMES — dokumentacja modułu traceability](https://docs.omnimes.com)
