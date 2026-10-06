---
title: 'Paszport baterii (DPP): 5,5 miesiąca do 18 lutego 2027 — co fabryka musi mieć w MES (wnioski z pilotaży Battery Pass, Volvo i GBA)'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'digital-product-passport-baterie-do-18-lutego-2027-co-polska-fabryka-musi-miec-w-mes'
description: 'Od 18 lutego 2027 każda bateria LMT, przemysłowa powyżej 2 kWh i do pojazdów elektrycznych wprowadzana do obrotu w UE musi mieć paszport (art. 77 rozporządzenia 2023/1542). Na podstawie wytycznych Komisji z sierpnia 2026 opisujemy, które dane są obowiązkowe od lutego, czego jeszcze się nie wypełnia (ślad węglowy, recyklat, należyta staranność), co pokazały pilotaże Battery Pass, Volvo i GBA oraz jakie dane powinien przygotować MES.'
coverImage: '/images/post-dpp-batteries/cover-dpp-batteries.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"dpp","label":"DPP"}]
publishedAt: '2026-08-31T08:00:00.000Z'
---

*Artykuł poprawiony 6 października 2026 r. Pierwsza wersja zawierała błędne informacje o aktach wykonawczych, zakresie danych w paszporcie i pilotażach.*

18 lutego 2027 r. zaczyna obowiązywać pierwszy w UE obowiązkowy cyfrowy paszport produktu. Od tego dnia każda bateria LMT, każda bateria przemysłowa o pojemności powyżej 2 kWh i każda bateria do pojazdu elektrycznego wprowadzana do obrotu lub oddawana do użytku musi mieć elektroniczny zapis — paszport baterii (art. 77 ust. 1 [rozporządzenia (UE) 2023/1542](https://eur-lex.europa.eu/eli/reg/2023/1542/oj)). Od publikacji tego tekstu do tej daty zostaje pięć i pół miesiąca.

Termin jest stały, ale część aktów Komisji wciąż nie jest gotowa. Opisujemy, co jest obowiązkowe od lutego, czego jeszcze się nie wypełnia, co pokazały pilotaże i jakie dane powinien dostarczyć MES.

## Kogo dotyczy obowiązek od 18 lutego 2027

Rozporządzenie obejmuje pięć kategorii baterii (art. 1 ust. 3): przenośne, rozruchowe (SLI), LMT, do pojazdów elektrycznych i przemysłowe. Paszport dotyczy trzech z nich:

- **Baterie LMT** — zamknięte, o masie do 25 kg, zasilające napęd pojazdów kołowych, takich jak rowery i hulajnogi elektryczne (art. 3 ust. 1 pkt 11).
- **Baterie do pojazdów elektrycznych** — zasilające napęd pojazdów kategorii M, N i O, czyli także autobusów i ciężarówek, oraz pojazdów kategorii L, jeśli bateria waży ponad 25 kg (art. 3 ust. 1 pkt 14).
- **Baterie przemysłowe o pojemności powyżej 2 kWh** — w tym stacjonarne magazyny energii (art. 3 ust. 1 pkt 13 i 15).

Baterie przenośne paszportu nie mają, choć od 18 lutego 2027 r. wszystkie baterie muszą nosić kod QR prowadzący m.in. do deklaracji zgodności (art. 13 ust. 6). Rozporządzenia nie stosuje się do baterii w sprzęcie wojskowym i związanym z bezpieczeństwem państw ani w sprzęcie wysyłanym w przestrzeń kosmiczną (art. 1 ust. 5).

Liczy się moment wprowadzenia do obrotu, a nie data produkcji: bateria wyprodukowana w styczniu, ale wprowadzona do obrotu w marcu 2027 r., musi mieć paszport.

Data 18 lutego 2027 r. nie została przesunięta. Art. 77 ust. 1, inaczej niż wiele innych terminów rozporządzenia, nie uzależnia jej od przyjęcia aktów Komisji ([Battery-Tech Network, 14.08.2026](https://battery-tech.net/why-the-eu-is-about-to-miss-its-own-battery-passport-deadline-while-industrys-stays-fixed/)). Nie zmienia jej też pakiet upraszczający Omnibus IV, uzgodniony politycznie przez Radę i Parlament 9 czerwca 2026 r. ([InfoDPP](https://infodpp.eu/en/blog/omnibus-iv-digitalisation-dpp-impact/)). Przesunięto natomiast obowiązki w zakresie należytej staranności (due diligence): [rozporządzenie (UE) 2025/1561](https://eur-lex.europa.eu/eli/reg/2025/1561/oj) przeniosło ich początek z 18 sierpnia 2025 r. na 18 sierpnia 2027 r.

## Kto odpowiada za paszport

Za paszport odpowiada podmiot gospodarczy, który wprowadza baterię do obrotu. Musi zapewnić, że informacje są dokładne, kompletne i aktualne, i może pisemnie upoważnić inny podmiot do działania w swoim imieniu (art. 77 ust. 4). Dane przechowuje ten podmiot albo upoważniony operator, który nie może ich sprzedawać ani wykorzystywać poza zakresem usługi (art. 78 lit. c i d).

Centralnie przechowywane są tylko identyfikatory. Art. 77 ust. 10, dodany przez rozporządzenie w sprawie ekoprojektu ([ESPR, 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj), art. 78), nakazuje wgrać unikalny identyfikator baterii do rejestru paszportów produktów. Zasady rejestru określa [rozporządzenie wykonawcze (UE) 2026/1778](https://eur-lex.europa.eu/eli/reg_impl/2026/1778/oj) z 16 lipca 2026 r., które wprost obejmuje paszport baterii. Rejestr działa od 20 lipca 2026 r. ([Komisja Europejska](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/batteries_en)).

Dostawcy ogniw, materiałów i komponentów nie mają więc własnego obowiązku prowadzenia paszportu. Część danych, np. szczegółowy skład katody, anody i elektrolitu, powstaje jednak u nich. Nasza ocena: producent gotowej baterii będzie tych danych wymagał od dostawców w umowach, a nie z mocy przepisów.

## Co musi zawierać paszport — wytyczne Komisji w wersji 2.0

Zakres danych określa załącznik XIII rozporządzenia. Osobnego aktu wykonawczego z „modelem danych" nie ma. Praktyczną interpretację daje dokument Komisji „Digital Batteries Passport – data points by category" w wersji 2.0 z 15 sierpnia 2026 r., opublikowany 21 sierpnia ([KE](https://single-market-economy.ec.europa.eu/news/guidance-support-preparations-digital-batteries-passport-2026-08-21_en)). Zawiera 71 punktów danych i dla każdej z trzech kategorii wskazuje, czy punkt jest obowiązkowy, opcjonalny, wymagany w określonych przypadkach, czy nie wypełnia się go od lutego 2027 r. Wytyczne nie są wiążące.

**Obowiązkowe od lutego 2027 r.** są m.in.:

- identyfikacja: unikalny identyfikator, dane producenta, kategoria, model oraz numer partii lub seryjny, miejsce i data produkcji, masa, pojemność;
- skład: chemia, substancje niebezpieczne, środek gaśniczy, surowce krytyczne w stężeniu powyżej 0,1% masowo, udział materiałów odnawialnych, a dla uprawnionych — szczegółowy skład katody, anody i elektrolitu, numery części, informacje o demontażu i środki bezpieczeństwa;
- wydajność i trwałość: napięcia, moc, przewidywana żywotność w cyklach, rezystancja wewnętrzna, zakres temperatur;
- deklaracja zgodności UE, informacje o odpadach oraz raporty z badań (tylko dla organów);
- dane pojedynczej baterii: spadek pojemności i mocy, wzrost rezystancji, status (oryginalna, ponownie użyta, po zmianie przeznaczenia, po regeneracji, odpad), a dla baterii EV stan certyfikowanej energii (SOCE).

Liczba cykli, zdarzenia negatywne, rejestrowana temperatura i stan naładowania są wymagane „jeśli dotyczy". Według naszego zliczenia z tabeli Komisji dla baterii EV obowiązkowych jest ok. 46 z 71 punktów. Konsorcjum Battery Pass podawało ok. 80 obowiązkowych atrybutów dla baterii EV ([Battery Pass, Q&A](https://thebatterypass.eu/wp-content/uploads/q-a_content-guidance.pdf)) — przy innej szczegółowości podziału.

**Nie wypełnia się od lutego 2027 r.:**

- deklaracji i etykiety śladu węglowego — format określi dopiero akt wykonawczy;
- informacji o należytej staranności — wymagane od sierpnia 2027 r.;
- udziału kobaltu, litu, niklu i ołowiu z recyklingu — zgodnie z art. 8 i przyszłym aktem delegowanym;
- instrukcji użytkowania — wstrzymane do czasu przyjęcia pakietu Omnibus.

Paszport w pierwszej wersji nie zawiera więc ani śladu węglowego, ani udziału recyklatu.

### Trzy grupy dostępu

Art. 77 ust. 2 i załącznik XIII dzielą informacje na trzy grupy odbiorców: ogół społeczeństwa; osoby mające uzasadniony interes oraz Komisję; jednostki notyfikowane, organy nadzoru rynku i Komisję. Podstawowe dane modelu są publiczne; szczegółowy skład, demontaż i dane pojedynczej baterii trafiają do uprawnionych, a raporty z badań — do organów.

Kto ma „uzasadniony interes" i w jakim zakresie może pobierać i udostępniać dane, Komisja miała określić w aktach wykonawczych do 18 sierpnia 2026 r. (art. 77 ust. 9). Termin minął bez przyjęcia aktu, a harmonogram Komisji wskazuje IV kwartał 2026 r. ([Battery-Tech Network](https://battery-tech.net/why-the-eu-is-about-to-miss-its-own-battery-passport-deadline-while-industrys-stays-fixed/)).

### Identyfikatory i normy

Kod QR i unikalny identyfikator muszą być zgodne z normami ISO/IEC 15459-1 do 15459-6 lub równoważnymi (art. 77 ust. 3). [Decyzją wykonawczą (UE) 2026/1736](https://eur-lex.europa.eu/eli/dec_impl/2026/1736/oj) z 14 lipca 2026 r. Komisja opublikowała odniesienia do sześciu norm zharmonizowanych dla paszportów produktów: EN 18216 (protokoły wymiany danych), EN 18219 (unikalne identyfikatory), EN 18220 (nośniki danych), EN 18221 (przechowywanie, archiwizacja i trwałość danych), EN 18222 (interfejsy API) oraz EN 18223 (interoperacyjność systemów). To sześć z ośmiu norm komitetu CEN-CENELEC JTC 24.

### Jak długo istnieje paszport

Paszport przestaje istnieć dopiero po recyklingu baterii (art. 77 ust. 8). Musi pozostać dostępny także wtedy, gdy odpowiedzialny podmiot przestanie istnieć albo zakończy działalność w UE (art. 78 lit. e). Bateria po ponownym użyciu, zmianie przeznaczenia lub regeneracji dostaje nowy paszport, powiązany z paszportem baterii pierwotnej (art. 77 ust. 7). Niezależnie od tego producent przechowuje dokumentację techniczną i deklarację zgodności UE przez 10 lat od wprowadzenia baterii do obrotu (art. 38 ust. 4). Rozporządzenie nie określa wskaźnika dostępności usługi, wymaga natomiast integralności danych i wysokiego poziomu bezpieczeństwa (art. 78 lit. g i h).

## Ślad węglowy, recyklat i należyta staranność — terminy ruchome

**Ślad węglowy** (art. 7) deklaruje się dla każdego modelu baterii w każdym zakładzie produkcyjnym, w kg CO₂e na kWh energii dostarczonej przez baterię w całym przewidywanym okresie użytkowania, z podziałem na etapy cyklu życia. Dla baterii EV obowiązek zaczyna się 18 lutego 2025 r. albo 12 miesięcy po wejściu w życie aktu delegowanego z metodyką i aktu wykonawczego z formatem deklaracji — w zależności od tego, co nastąpi później. Na początku sierpnia 2026 r. akt delegowany nadal nie był przyjęty (projekt pochodzi z 30 kwietnia 2024 r.), a klas śladu węglowego nie zdefiniowano ([Cleo Labs, 9.08.2026](https://www.cleolabs.co/en/blog/eu-battery-carbon-footprint-class-2026)).

**Recyklat** (art. 8): dokumentacja udziału materiałów z odzysku obowiązuje od 18 sierpnia 2028 r. albo 24 miesiące po wejściu w życie aktu delegowanego. Minimalne udziały od 18 sierpnia 2031 r.: 16% kobaltu, 85% ołowiu, 6% litu i 6% niklu; od 18 sierpnia 2036 r.: 26% kobaltu, 85% ołowiu, 12% litu i 15% niklu.

**Należyta staranność** obejmuje kobalt, grafit naturalny, lit i nikiel i obowiązuje od 18 sierpnia 2027 r. (rozporządzenie 2025/1561).

**Sankcje** państwa członkowskie miały ustanowić do 18 sierpnia 2025 r.; mają być skuteczne, proporcjonalne i odstraszające (art. 93). W Polsce projekt ustawy o bateriach i zużytych bateriach (UC107) figuruje w wykazie prac legislacyjnych rządu z terminem przyjęcia przez Radę Ministrów w III kwartale 2026 r. Opis założeń zapowiada sankcje, ale nie podaje ich wysokości ([KPRM](https://www.gov.pl/web/premier/projekt-ustawy-o-bateriach-i-zuzytych-bateriach)).

## Pilotaże — co faktycznie wiadomo

### Battery Pass (Niemcy)

Trzyletni projekt Battery Pass zakończył się w marcu 2025 r. ([thebatterypass.eu](https://thebatterypass.eu/)). Prowadziła go firma Systemiq, a współfinansowało niemieckie ministerstwo gospodarki (BMWK). Konsorcjum tworzyło 11 partnerów: acatech, AUDI, BASF, BMW, Circulor, FIWARE Foundation, Fraunhofer IPK, Systemiq, TWAICE, Umicore i VDE Renewables ([Circulor](https://circulor.com/articles/batterypassconsortium)).

Najważniejsze publikacje:

- **Content Guidance** w wersji 1.0 ([kwiecień 2023](https://en.acatech.de/wp-content/uploads/sites/6/2023/04/1.1.-202304_Battery-Passport-Content-Guidance-Version-1.0_Executive-Summary.pdf)) i 1.1 ([grudzień 2023](https://thebatterypass.eu/news/the-battery-pass-consortium-launches-updated-content-guidance-on-eu-battery-passport/)). Dane pogrupowano w siedem obszarów, od informacji o producencie i śladu węglowego po obieg zamknięty, wydajność i trwałość.
- **Technical Guidance 1.0** z marca 2024 r. wraz z demonstratorem oprogramowania. Opisuje zdecentralizowany system danych i rekomenduje zdecentralizowane identyfikatory (DID); GS1 Digital Link wymienia jako jedną z opcji zapisu identyfikatora w adresie URL ([Battery Pass, Technical Guidance](https://thebatterypass.eu/assets/images/technical-guidance/pdf/2024_BatteryPassport_Technical_Guidance.pdf)).
- **DIN DKE SPEC 99100** (styczeń 2025) — wymagania dla atrybutów danych paszportu, oparte na Content Guidance ([acatech](https://en.acatech.de/publication/battery-passport-content-guidance/)).

Prace kontynuuje projekt BatteryPass-Ready (Fraunhofer IPK, acatech, GEFEG, TU Berlin). 27 sierpnia 2026 r. opublikował Data Attribute Longlist i model danych w wersji 2.0. Model danych jest dostępny w [repozytorium Battery Pass na GitHubie](https://github.com/batterypass).

### Volvo EX90 i Circulor

4 czerwca 2024 r. Volvo Cars i Circulor ogłosiły pierwszy na świecie paszport baterii samochodu elektrycznego, w modelu EX90 ([Circulor](https://circulor.com/articles/worlds-first-battery-passport)). Firmy pracowały nad nim od 2019 r. Paszport pokazuje pochodzenie kobaltu, niklu, grafitu i litu, ślad węglowy całego pakietu oraz udział materiałów z recyklingu. Dostęp zapewniają aplikacja Volvo Cars i kod QR na ramie drzwi kierowcy. Według prezesa Circulor, Douglasa Johnson-Poensgena, koszt wynosi ok. 10 USD na samochód w ciągu 15 lat ([Electrek, 4.06.2024](https://electrek.co/2024/06/04/volvo-ex90-launch-worlds-first-ev-battery-passport/)). W materiałach Volvo i Circulor nie znaleźliśmy liczby dostawców objętych systemem ani liczby pól danych.

### Global Battery Alliance

18 stycznia 2023 r. Global Battery Alliance pokazała pierwszą weryfikację koncepcji paszportu baterii. Prowadziły ją Audi i Tesla z partnerami z łańcucha wartości, m.in. BASF, CATL, LG Energy Solution i Umicore ([GBA](https://www.globalbattery.org/press-releases/global-battery-alliance-launches-world%E2%80%99s-first-battery-passport-proof-of-concept/)). 20 czerwca 2024 r. ruszyła druga fala: 11 konsorcjów prowadzonych przez producentów baterii — CATL, EVE Energy, Farasis Energy, FinDreams Battery, LG Energy Solution, Samsung SDI, Sunwoda i CALB — którzy razem mają ponad 80% światowego rynku baterii EV. Uczestnicy raportują według siedmiu zbiorów zasad, m.in. dotyczących emisji gazów cieplarnianych, praw człowieka, pracy dzieci i bioróżnorodności ([GBA](https://www.globalbattery.org/press-releases/gba-launches-second-wave-of-battery-passport-pilots/)).

Nasza ocena: pilotaże Volvo i GBA wykraczają poza wymogi rozporządzenia (oceny ESG, pochodzenie surowców) i dotyczą obszarów, których paszport od lutego 2027 r. jeszcze nie wymaga. Publicznych danych o kosztach wdrożeń jest niewiele.

## Polska na mapie paszportu baterii

- **LG Energy Solution Wrocław** — baterie do pojazdów elektrycznych; obecne moce 80 GWh, cel 90 GWh, ok. 700 tys. baterii EV rocznie ([LG Energy Solution](https://lgensol.pl/en/get-know-us/)).
- **Lyten w Gdańsku** (dawniej Northvolt Dwa) — magazyny energii (BESS), czyli baterie przemysłowe. Przejęcie zakończono 16 października 2025 r.; zakład ma wyposażenie na 6 GWh z możliwością rozbudowy do 12 GWh ([Lyten](https://news.cision.com/lyten/r/lyten-completes-acquisition-of-northvolt-bess-manufacturing-facility-in-poland,c4250998)).
- **Impact Clean Power Technology** (Pruszków, GigafactoryX) — systemy bateryjne dla transportu ciężkiego, m.in. autobusów elektrycznych. W 2024 r. moce wzrosły z 0,6 do 1,2 GWh, docelowo do 4 GWh ([Sustainable Bus](https://www.sustainable-bus.com/news/impact-gigafactory-x-new-production-line-batteries/)). Firma dostarcza baterie dla Solaris Bus & Coach (współpraca od 2012 r., umowa na lata 2024–2027, [Sustainable Bus](https://www.sustainable-bus.com/news/impact-batteries-solaris-new-contract/)); baterie autobusowe to w rozumieniu rozporządzenia baterie EV.
- **SK hi-tech battery materials** (Dąbrowa Górnicza) — separatory do ogniw litowo-jonowych, 340 mln m² rocznie na starcie produkcji w 2021 r. ([PAIH](https://www.paih.gov.pl/en/news/20211011-the_opening_ceremony_of_the_sk_hi_tech_battery_materials_factory/)). Jako dostawca materiału nie prowadzi paszportu.

## Rola MES: obowiązki od lutego i przygotowanie na kolejne akty

### Obowiązki prawne od 18 lutego 2027

1. **Identyfikacja** — nadanie unikalnego identyfikatora zgodnego z ISO/IEC 15459, powiązanie go z kodem QR, modelem, numerem partii lub numerem seryjnym, miejscem i datą produkcji oraz wgranie identyfikatora do rejestru.
2. **Skład** — chemia, substancje niebezpieczne, surowce krytyczne i szczegółowy skład, pobierane z receptury i zestawienia materiałowego.
3. **Wydajność i trwałość** — wartości z testów końcowych: pojemność, moc, rezystancja wewnętrzna, sprawność. Dokument z tymi parametrami towarzyszy bateriom przemysłowym powyżej 2 kWh, LMT i EV już od 18 sierpnia 2024 r. (art. 10 ust. 1), więc dane zwykle istnieją — trudniej powiązać je z konkretnym egzemplarzem.
4. **Raporty z badań** dla jednostek notyfikowanych i organów nadzoru.
5. **Dane dynamiczne** — wartości początkowe w chwili wprowadzenia do obrotu. Od 18 sierpnia 2024 r. system zarządzania baterią (BMS) w stacjonarnych magazynach energii, bateriach LMT i EV musi przechowywać aktualne parametry stanu zdrowia baterii (art. 14). Po sprzedaży dane aktualizuje BMS i serwis, nie MES.

### Przygotowanie na przyszłe akty (nasza rekomendacja)

- **Genealogia partii materiałów aktywnych.** Udział recyklatu będzie wyliczany dla modelu, roku i zakładu (art. 8), a należyta staranność obejmie pochodzenie kobaltu, grafitu naturalnego, litu i niklu. Bez genealogii partii trudno będzie to wykazać.
- **Zużycie energii przypisane do linii i partii.** Metodyka śladu węglowego nie jest przyjęta, ale deklaracja będzie dotyczyć modelu w danym zakładzie. Surowe dane ze znacznikiem czasu da się przeliczyć, gdy metodyka zostanie opublikowana.
- **Parametry procesu** (formowanie, suszenie, kalandrowanie) — nie są wymagane, ale przydają się w analizie jakości i reklamacjach.

Przy dużej liczbie egzemplarzy i pomiarów potrzebna jest baza szeregów czasowych — opisaliśmy to w artykule o [TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie).

## Bariery i ograniczenia

- Brak aktu o prawach dostępu (art. 77 ust. 9) — uprawnienia trzeba zaprojektować tak, by dało się je zmienić.
- Metodyki śladu węglowego i recyklatu nie są przyjęte, a obowiązki ruszą 12–24 miesiące po wejściu w życie aktów.
- Odniesienia do dwóch z ośmiu norm JTC 24 nie są jeszcze opublikowane w Dzienniku Urzędowym UE.
- Polska nie ustanowiła sankcji, choć termin minął w sierpniu 2025 r.

## Plan działań do lutego 2027 (nasza rekomendacja)

- **Wrzesień:** przypisanie każdego z 71 punktów danych do źródła (MES, ERP, PLM, LIMS, BMS, dostawca) i oznaczenie luk.
- **Październik:** schemat identyfikatorów i kodów QR zgodny z ISO/IEC 15459 i EN 18219; decyzja, kto przechowuje paszport (własna infrastruktura czy upoważniony operator); pierwsze testy rejestracji w rejestrze.
- **Listopad:** powiązanie wyników testów końcowych i składu z identyfikatorem baterii; zapisy w umowach z dostawcami o przekazywaniu danych o składzie.
- **Grudzień:** pilotaż na jednej linii, z kontrolą dostępu dla trzech grup odbiorców.
- **Styczeń:** wszystkie linie; sprawdzenie, czy Komisja przyjęła akt o prawach dostępu.
- **Od 18 lutego:** każda bateria wprowadzana do obrotu ma paszport.

## ESPR: co po bateriach

Plan roboczy ESPR na lata 2025–2030 ([COM(2025) 187 z 16 kwietnia 2025 r.](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:52025DC0187)) podaje orientacyjne lata **przyjęcia** aktów delegowanych: żelazo i stal — 2026; odzież, opony i aluminium — 2027; meble — 2028; materace — 2029. Wymogi horyzontalne to naprawialność (2027) oraz zawartość materiałów z recyklingu i recyklowalność sprzętu elektrycznego i elektronicznego (2029). Daty stosowania, w tym paszportu, określi każdy akt osobno. Szerszy kontekst opisaliśmy w artykule [DPP wchodzi do fabryki](/blog/digital-product-passport-dpp-wchodzi-do-fabryki-espr-i-battery-regulation-2027-co-mes-musi-umiec-do-lutego).

## Aktualizacja (6 października 2026)

- 8 września 2026 r. akt o prawach dostępu (art. 77 ust. 9) nadal nie był przyjęty ani opublikowany w projekcie; termin 18 lutego 2027 r. bez zmian ([EU Digital Product Passport](https://eudigitalproductpassport.org/updates/battery-passport-access-rights-implementing-act-delay)).
- W FAQ Komisji (aktualizacja z 30 września 2026 r.) zapowiedziano projekt tego aktu do konsultacji w październiku lub listopadzie 2026 r. Komisja doprecyzowała też, że paszport dotyczy gotowej baterii, która w przypadku baterii trakcyjnej obejmuje zwykle BMS. Jeśli baterię kompletuje producent pojazdu, np. dodając BMS, to on odpowiada za paszport. Pisemne upoważnienie nie przenosi odpowiedzialności prawnej, importowane ogniwa i moduły do dalszego montażu nie są gotową baterią, a pola danych z użytkowania mogą być puste przy rejestracji nowej baterii. Działa środowisko testowe rejestru ([KE, FAQ](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/eu-digital-product-passport-faq-batteries_en)).

---

## Źródła

- [Rozporządzenie (UE) 2023/1542 w sprawie baterii](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) — art. 1, 3, 7, 8, 10, 13, 14, 38, 77, 78, 93, załącznik XIII
- [Rozporządzenie (UE) 2025/1561](https://eur-lex.europa.eu/eli/reg/2025/1561/oj) — przesunięcie należytej staranności na 18 sierpnia 2027
- [Rozporządzenie (UE) 2024/1781 (ESPR)](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) — art. 78 dodający art. 77 ust. 10
- [Rozporządzenie wykonawcze (UE) 2026/1778](https://eur-lex.europa.eu/eli/reg_impl/2026/1778/oj) — rejestr paszportów produktów
- [Decyzja wykonawcza (UE) 2026/1736](https://eur-lex.europa.eu/eli/dec_impl/2026/1736/oj) — normy EN 18216, 18219, 18220, 18221, 18222, 18223
- [Komisja Europejska — paszport baterii](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/batteries_en) — rejestr od 20 lipca 2026, sześć z ośmiu norm JTC 24
- [Komisja Europejska — wytyczne z 21 sierpnia 2026](https://single-market-economy.ec.europa.eu/news/guidance-support-preparations-digital-batteries-passport-2026-08-21_en) oraz [dokument „Digital Batteries Passport – data points by category", wersja 2.0](https://single-market-economy.ec.europa.eu/document/download/cd1e5e6c-4a4a-4b99-995a-49eb6916187e_en?filename=Digital%20Batteries%20Passport%20-%20data%20point%20by%20category.pdf)
- [Komisja Europejska — FAQ dla paszportu baterii](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/eu-digital-product-passport-faq-batteries_en)
- [Battery-Tech Network, 14.08.2026](https://battery-tech.net/why-the-eu-is-about-to-miss-its-own-battery-passport-deadline-while-industrys-stays-fixed/) — termin aktu o prawach dostępu
- [EU Digital Product Passport, 8.09.2026](https://eudigitalproductpassport.org/updates/battery-passport-access-rights-implementing-act-delay) — stan aktu o prawach dostępu
- [InfoDPP — Omnibus IV](https://infodpp.eu/en/blog/omnibus-iv-digitalisation-dpp-impact/)
- [Cleo Labs, 9.08.2026](https://www.cleolabs.co/en/blog/eu-battery-carbon-footprint-class-2026) — stan aktu delegowanego o śladzie węglowym
- [KPRM — projekt ustawy o bateriach i zużytych bateriach (UC107)](https://www.gov.pl/web/premier/projekt-ustawy-o-bateriach-i-zuzytych-bateriach)
- [Circulor — Battery Pass: Technical Guidance i demonstrator](https://circulor.com/articles/batterypassconsortium)
- [thebatterypass.eu](https://thebatterypass.eu/) — zakończenie projektu, BatteryPass-Ready, model danych 2.0
- [Battery Pass — Q&A do Content Guidance](https://thebatterypass.eu/wp-content/uploads/q-a_content-guidance.pdf)
- [Battery Pass — Content Guidance 1.0, streszczenie](https://en.acatech.de/wp-content/uploads/sites/6/2023/04/1.1.-202304_Battery-Passport-Content-Guidance-Version-1.0_Executive-Summary.pdf)
- [Battery Pass — Content Guidance 1.1](https://thebatterypass.eu/news/the-battery-pass-consortium-launches-updated-content-guidance-on-eu-battery-passport/)
- [Battery Pass — Technical Guidance 1.0](https://thebatterypass.eu/assets/images/technical-guidance/pdf/2024_BatteryPassport_Technical_Guidance.pdf)
- [acatech — DIN DKE SPEC 99100](https://en.acatech.de/publication/battery-passport-content-guidance/)
- [Battery Pass — model danych na GitHubie](https://github.com/batterypass)
- [Circulor — paszport baterii Volvo EX90](https://circulor.com/articles/worlds-first-battery-passport)
- [Electrek — Volvo EX90 battery passport](https://electrek.co/2024/06/04/volvo-ex90-launch-worlds-first-ev-battery-passport/)
- [Global Battery Alliance — weryfikacja koncepcji, 2023](https://www.globalbattery.org/press-releases/global-battery-alliance-launches-world%E2%80%99s-first-battery-passport-proof-of-concept/)
- [Global Battery Alliance — druga fala pilotaży, 2024](https://www.globalbattery.org/press-releases/gba-launches-second-wave-of-battery-passport-pilots/)
- [LG Energy Solution Wrocław](https://lgensol.pl/en/get-know-us/)
- [Lyten — przejęcie zakładu w Gdańsku](https://news.cision.com/lyten/r/lyten-completes-acquisition-of-northvolt-bess-manufacturing-facility-in-poland,c4250998)
- [Sustainable Bus — Impact GigafactoryX](https://www.sustainable-bus.com/news/impact-gigafactory-x-new-production-line-batteries/)
- [Sustainable Bus — Impact i Solaris](https://www.sustainable-bus.com/news/impact-batteries-solaris-new-contract/)
- [PAIH — fabryka separatorów SK w Dąbrowie Górniczej](https://www.paih.gov.pl/en/news/20211011-the_opening_ceremony_of_the_sk_hi_tech_battery_materials_factory/)
- [Plan roboczy ESPR 2025–2030, COM(2025) 187](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:52025DC0187)
