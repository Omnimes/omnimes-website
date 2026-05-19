---
title: 'Digital Product Passport (DPP) wchodzi do fabryki: ESPR i Battery Regulation 2027 — co MES musi umieć do lutego'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'digital-product-passport-dpp-wchodzi-do-fabryki-espr-i-battery-regulation-2027-co-mes-musi-umiec-do-lutego'
description: '18 lutego 2027 paszport baterii staje się obowiązkowy dla baterii EV, przemysłowych powyżej 2 kWh i LMT — pierwszy moment, w którym Digital Product Passport (DPP) z koncepcji unijnej zmienia się w konkretny wymóg produkcyjny. Dla MES oznacza to obowiązek wystawienia kilkunastu atrybutów per sztuka: pochodzenie surowców, ślad węglowy, zawartość recyklatu, batch ID, durability, dane o zdrowiu ogniwa. Artykuł rozbiera ESPR (2024/1781) i Battery Regulation (2023/1542) bez wody: które funkcje MES już to produkują, czego brakuje, jak architektonicznie podpiąć GS1 Digital Link, i co zrobić w pozostałych 9 miesiącach przed deadline''em.'
coverImage: '/images/post-dpp-mes/cover-dpp-mes.png'
lang: 'pl'
tags: [{"value":"ue","label":"UE"},{"value":"omniMES","label":"OmniMES"},{"value":"dpp","label":"DPP"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-05-18T08:00:00.000Z'
---

**18 lutego 2027** — to data, którą większość polskich zakładów produkujących baterie, komponenty elektroniki przemysłowej, stal, tekstylia lub akumulatory dla EV powinna już mieć w kalendarzu compliance. Tego dnia, zgodnie z Art. 77 [Battery Regulation 2023/1542](https://eur-lex.europa.eu/eli/reg/2023/1542/oj), [Digital Product Passport (DPP)](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) staje się obowiązkowy dla wszystkich baterii przemysłowych powyżej 2 kWh, baterii pojazdów elektrycznych i baterii lekkich środków transportu (LMT — hulajnogi, e-rowery). Bez paszportu — produkt nie może być wprowadzony na rynek UE. Art. 25 [ESPR 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) daje organom nadzoru rynku uprawnienie do zakazu obrotu, a państwa członkowskie ustalają kary administracyjne (Niemcy — do **4% rocznego obrotu** za poważne naruszenia, [Bundesnetzagentur 2025](https://www.bundesnetzagentur.de/EN/Areas/Energy/Companies/SecurityOfSupply/Battery_Regulation/start.html)).

Dla świata MES, ERP i PLM nie jest to abstrakcyjny temat ESG. To konkretny wymóg na dane operacyjne — kilkunastu atrybutów per sztuka produktu, dostępnych przez publiczny URL z QR-em na obudowie. Jeżeli wasz MES dziś nie produkuje tych danych w sposób strukturalnie zlinkowany do batch ID, to do lutego 2027 macie 9 miesięcy roboczych na nadgonienie. Niżej rozbieram to bez wody: która regulacja czego wymaga, które funkcje MES już to mają, jakich brakuje, i co konkretnie zrobić w pozostałych miesiącach.

## Dwie regulacje, jeden mechanizm — ESPR i Battery Regulation

ESPR (Ecodesign for Sustainable Products Regulation, **2024/1781**) wszedł w życie **18 lipca 2024** i ustanawia generalne ramy dla wszystkich produktów na rynku UE. Komisja Europejska, w aktach delegowanych, będzie kolejno dodawać konkretne grupy produktowe: tekstylia (2026–2027), żelazo i stal (2026), elektronika ICT (2027), opony, meble, detergenty, farby. Każda taka grupa dostaje własny szczegółowy zestaw atrybutów DPP. W planie pracy Komisji 2025–2030 ([Working Plan ESPR, marzec 2025](https://commission.europa.eu/news/working-plan-ecodesign-and-energy-labelling-2025-2030-2025-04-16_en)) wymieniono **6 grup priorytetowych z pełnym DPP w 2027 lub 2028**.

Battery Regulation (**2023/1542**) jest w tym mechanizmie pionierem — wszedł w życie wcześniej (luty 2024) i ma własną, twardą datę: **18 lutego 2027**. Dotyczy:

- **baterii pojazdów elektrycznych** (EV) wszystkich typów,
- **baterii przemysłowych powyżej 2 kWh** (czyli realistycznie wszystkich w energetyce, magazynach energii, automatyce mobilnej),
- **baterii lekkich środków transportu (LMT)** powyżej 25 V — hulajnogi elektryczne, e-rowery,
- z **wykluczeniem** baterii rozruchowych aut spalinowych, baterii w urządzeniach konsumenckich małej mocy (typu narzędzia ręczne).

Dla polskiego producenta to ważne rozróżnienie: jeżeli produkujecie baterie do robotów AGV, magazynów energii, EV — jesteście pod regulacją. Jeżeli sprzedajecie baterki AA — nie.

## Co konkretnie musi być w DPP — 17 atrybutów Annex XIII

[Annex XIII Battery Regulation](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) wymienia konkretne grupy informacji, które muszą być dostępne w paszporcie baterii. Mapując to na języki MES/PLM, to grubo:

**Dane statyczne (na model produktu):**
1. **Producent** — pełne dane, EORI, numer rejestracyjny EPR (Extended Producer Responsibility)
2. **Typ chemii** — np. LFP, NMC, NCA, sodium-ion (klucz dla cyklu życia)
3. **Skład materiałowy ogniwa** — substancje krytyczne wg [CRMA](https://eur-lex.europa.eu/eli/reg/2024/1252/oj), recyklat % per metal (Co, Li, Ni, Pb)
4. **Carbon footprint** (CFP) — kg CO₂-eq na kWh pojemności, weryfikowany przez stronę trzecią
5. **Stan zgodności** — certyfikaty, deklaracje CE, EU type-examination
6. **Klasyfikacja użytkowa** — EV, LMT, industrial, plus zakres napięć i pojemności
7. **Dokumentacja techniczna** — manual instalacji, BHP, transportu (ADR/UN38.3)

**Dane dynamiczne (per sztuka, aktualizowane w cyklu życia):**

8. **Batch ID** — unikalny identyfikator partii produkcyjnej
9. **Numer seryjny** — unikalny per ogniwo (lub pakiet)
10. **Data produkcji** + lokalizacja (zakład)
11. **State of Health (SoH)** — dane diagnostyczne z BMS
12. **State of Charge (SoC)** — bieżący stan naładowania
13. **Pojemność nominalna i aktualna**
14. **Liczba cykli ładowania**
15. **Historia napraw** — kto, kiedy, co wymienił
16. **Dane recyklingu** — gdzie zakończy życie, jakie strumienie surowca, ile odzyskano
17. **Status w cyklu życia** — produkcja, użycie, second-life, recykling

Większość atrybutów 1–7 to konfiguracja jednorazowa w PLM/ERP. To 8–17 jest interesujące dla MES — szczególnie **8–10 i 14–15**, które produkujecie codziennie, ale prawie nigdy nie wystawiacie publicznie po stronie URL z QR-em.

## Funkcje MES, które już produkują dane do DPP

Mapując typowe moduły MES/EMS/CMMS na atrybuty Annex XIII:

**Genealogia partii (batch genealogy).** Każdy MES warty tego określenia produkuje batch ID i wiąże go z surowcami, operatorem, maszyną i zmianą. To pokrywa atrybuty 8–10 bezpośrednio. Jeżeli mamy dobrze postawioną genealogię, dane DPP są w bazie — kwestia tylko ekspozycji.

**OEE i performance tracking per linia.** Tu OEE per pakiet baterii dostarcza pośrednią proxy dla atrybutu 4 (carbon footprint) — bo CFP zależy od zużycia energii na sztukę w produkcji. Łącząc OEE z EMS (Energy Management System) i ISO 50001, można policzyć kWh elektryczności na pakiet, a dalej kg CO₂-eq (mnożąc przez emission factor sieci).

**Kontrola jakości / SPC.** Atrybuty 11–13 (SoH, SoC, pojemność) wynikają z testów end-of-line, które MES standardowo loguje. Tu typowo dane już są — tylko siedzą w zamkniętym systemie quality i nie są wiązane z numerem seryjnym pakietu w sposób publicznie dostępny.

**Traceability surowców (jeśli macie SCM-MES integration).** Atrybut 3 (skład materiałowy, recyklat %) wymaga ścieżki w dół do dostawcy materiałów aktywnych — kobalt z konkretnej kopalni, lit z konkretnego brine pool. Większość polskich MES tego nie robi, ale jeśli macie integrację z dostawcami w ERP, to architektonicznie da się to spiąć.

**CMMS dla repair history.** Atrybut 15 (historia napraw) — to klasyczna funkcja CMMS. Wyzwanie tylko techniczne: musi być dostępna pod konkretnym numerem seryjnym przez REST API, nie jako PDF w SharePoint.

## Czego MES standardowo NIE umie

Kilka rzeczy wymagających dorobienia praktycznie w każdej fabryce, którą widziałem:

**1. Carbon footprint per sztuka, weryfikowany przez stronę trzecią.** Annex XIII wymaga CFP z metodologii zatwierdzonej przez Komisję ([Recommendation 2021/2279](https://eur-lex.europa.eu/eli/reco/2021/2279/oj) — Product Environmental Footprint method). Większość MES nie liczy CO₂ na sztukę, bo nie ma związanego LCA. Co najmniej trzeba wdrożyć moduł integrujący zużycie energii (z EMS) + emission factors z sieci + alokację per produkt. Niemiecki Volkswagen używa do tego SAP S/4HANA Sustainability Footprint Management — w open-source ekwiwalenty to np. [openLCA](https://www.openlca.org/) + custom integracja.

**2. Sub-tier supply chain tracking.** Atrybut 3 (recyklat %, pochodzenie surowca) wymaga schodzenia o 2–3 poziomy w dół łańcucha. Większość ERP zatrzymuje się na bezpośrednim dostawcy. Battery Passport Initiative pracuje nad standardem ([Battery Pass project, lipiec 2025](https://thebatterypass.eu/)) — w praktyce trzeba aneksować umowy z dostawcami, żeby przekazywali składowe DPP.

**3. Publiczna ekspozycja danych.** Atrybut publiczny dostępny przez URL+QR — to inna kategoria niż wewnętrzne dashboardy MES. Wymaga publicznego endpointu (HTTPS, podpisanego, z weryfikacją), z odpowiednim authorization model: trzy poziomy dostępu wg Battery Regulation Art. 78 (publiczny, ograniczony dla repair operators, pełny dla regulatorów).

**4. Aktualizacje w cyklu życia.** Atrybuty 11–17 (SoH, repair, recycling) muszą być aktualizowalne PO opuszczeniu fabryki — przez serwis, repair operator, recykler. To wymaga API, którym mogą pisać podmioty trzecie z odpowiednią autoryzacją. Architektonicznie to webhook + event-sourced storage.

**5. Format wymiany.** Dane muszą być w standardzie interoperacyjnym. Komisja Europejska wskazuje na **GS1 Digital Link** ([standardizacja GS1, 2025](https://www.gs1.org/standards/gs1-digital-link)) jako preferowany sposób linkowania QR → struktura JSON, i **W3C Verifiable Credentials** dla danych podpisanych kryptograficznie.

## Architektura referencyjna: GS1 Digital Link + W3C VC + anchoring opcjonalny

Stos, który spełnia minimum Battery Regulation 2027 w dojrzałym MES, wygląda tak:

**Warstwa danych (źródło):** istniejący MES + ERP + EMS + CMMS, z wyciągami przez wewnętrzny event bus (Kafka, MQTT). Wszystkie atrybuty 1–17 muszą tu istnieć — to fundament, którego nie da się ominąć.

**Warstwa agregacji (DPP store):** osobna baza zorientowana na produkt (nie batch). Każdy numer seryjny pakietu baterii = jeden dokument JSON-LD. Sub-second aktualizacje z MES events. PostgreSQL z JSONB + GIN index na seryjnym lub nowy dokumentowy store (MongoDB, Elasticsearch).

**Warstwa standardu (GS1 Digital Link):** URL pattern: `https://dpp.firma.com/01/<GTIN>/21/<SerialNumber>`. Server odpowiada zgodnie z [GS1 Digital Link 1.4.0](https://ref.gs1.org/standards/digital-link/) JSON Schemą.

**Warstwa autoryzacji:** trzy poziomy zgodne z Art. 78 Battery Regulation:
- **Publiczny** — chemia, producent, CFP, recyklat % (wymagane przez konsumenta)
- **Restricted** — repair operators (po podpisaniu NDA z producentem) — pełna historia napraw, schemat ogniw
- **Regulatory** — pełen dostęp dla organów nadzoru rynku, w tym dane konkurencyjne

**Warstwa zaufania (opcjonalna, anchoring):** dla najwyższych wymagań compliance — podpisanie kryptograficzne danych (W3C Verifiable Credentials) + opcjonalnie anchoring hash na blockchain publicznym (Ethereum, Polkadot) dla niezaprzeczalności. Battery Pass Project rekomenduje to dla CFP i recyklat %, gdzie dane mogą być audytowane retroaktywnie. Cross-link do naszego art. [blockchain w przemyśle 4.0](/blog/blockchain-w-przemysle-4-0-dlaczego-energetyka-i-zgodnosc-z-przepisami-to-jedyne-racjonalne-przypadki-uzycia-web3) — to dokładnie ten use case, który tam opisywałem jako jeden z dwóch racjonalnych dla web3 w przemyśle.

**Warstwa publikacji (QR + URL):** QR code generowany podczas etykietowania, drukowany na obudowie pakietu lub trwałej naklejce ([Battery Regulation Art. 13 ust. 6](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) wymaga trwałości przez cały cykl życia).

## Sankcje — co konkretnie ryzykujemy

Battery Regulation ([Art. 93](https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng#art_93)) wymaga, by państwa członkowskie ustaliły „skuteczne, proporcjonalne i odstraszające" kary. Implementacje krajowe wchodzą w 2025–2026:

- **Niemcy** — Bundesnetzagentur, kary do **4% obrotu** za poważne naruszenia, do **EUR 100 000** za drobniejsze; zakaz wprowadzenia na rynek dla produktów bez ważnego DPP
- **Francja** — DGCCRF, podobny poziom, plus francuski rejestr „Registres Uniques" (RUP) z dodatkowymi obowiązkami raportowania
- **Polska** — UOKiK pracuje nad implementacją (stan na 1Q 2026), prawdopodobne kary w widełkach **0,1–3% obrotu** plus zakaz wprowadzenia na rynek

ESPR ([Art. 74](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)) dodatkowo daje uprawnienia do **wycofania produktu z rynku** w razie wykrycia braku DPP po wprowadzeniu — analogicznie do MDR dla wyrobów medycznych. Strata reputacyjna i logistyczna z tego tytułu bywa większa niż sama kara.

## Roadmapa 9 miesięcy do lutego 2027

Dla zespołów, które dziś nie mają DPP w planie:

**Miesiące 1–2 (maj–czerwiec 2026): assessment i klasyfikacja.** Czy produkujemy baterie objęte regulacją (>2 kWh przemysłowe, EV, LMT)? Jeśli tak — pełne 17 atrybutów. Inwentaryzacja źródeł danych w MES/ERP/EMS/CMMS. Identyfikacja luk (typowo: CFP, sub-tier supply chain, repair API).

**Miesiące 3–4 (lipiec–sierpień 2026): pilot na jednym produkcie.** Wybierz jeden model baterii — najlepiej już produkowany w niskim wolumenie. Postaw DPP store + GS1 Digital Link endpoint + QR generator. Etap CO₂ — przyjmij wstępnie emission factor z mixu krajowego (KOBiZE dla PL, IFEU dla EU), zostaw room na uściślenie.

**Miesiące 5–6 (wrzesień–październik 2026): supply chain.** Aneksuj umowy z dostawcami katod, anod, elektrolitu, separatorów — wymóg przekazywania danych do DPP. Battery Pass Initiative ma gotowe template'y kontraktowe. Tutaj typowo największe opóźnienia — niektórzy dostawcy nie są gotowi.

**Miesiące 7–8 (listopad–grudzień 2026): walidacja i rozszerzenie.** Pełne pokrycie portfolio. Walidacja przez third-party verifier (TÜV, DEKRA, SGS) — wymagane dla CFP. Test stress endpointu publicznego.

**Miesiąc 9 (styczeń 2027): rollout do produkcji.** Wszystkie nowe pakiety wychodzą z fabryki z QR. Plan obsługi pierwszych zapytań od kupujących i regulatorów.

Koszt realistyczny: dla średniej fabryki baterii (1 linia, ~50 MWh/rok wolumen) — **EUR 150–400 tys.** na pełne wdrożenie, plus running cost ~EUR 30–60 tys./rok na utrzymanie i audyty.

## Wnioski dla dyrektora produkcji

Trzy konkrety:

**Po pierwsze**, deadline 18.02.2027 jest twardy i niemożliwy do przesunięcia bez nowego rozporządzenia. To 9 miesięcy roboczych. Jeżeli nie macie zespołu projektowego dla DPP — uruchomcie go w maju.

**Po drugie**, MES jest źródłem 60–70% danych do DPP (genealogia, OEE/CFP, quality data, repair). Pozostałe 30% to ERP (supply chain) i nowy moduł DPP store + publikacja. **Nie chodzi o wymianę MES, tylko o ekspozycję danych, które już są.**

**Po trzecie**, Battery Regulation 2027 to pierwsza fala. ESPR delegowane akty dla tekstyliów, stali i elektroniki wchodzą 2027–2028. Jeśli produkujecie cokolwiek innego pod regulacją UE, ten sam stack (MES + DPP store + GS1 Digital Link) obsłuży kolejne grupy produktowe z minimalnymi modyfikacjami. **Inwestycja w 2026 amortyzuje się przez 3–5 lat.**

DPP to nie jest cykliczny ESG-flavour-of-the-month, to nowa infrastruktura informacyjna rynku UE. Producenci, którzy są gotowi pierwsi, dostają przewagę negocjacyjną w przetargach publicznych i u dużych OEM (Volkswagen, Stellantis, Bosch już wymagają DPP-ready od dostawców).

---

## Źródła

- [Battery Regulation 2023/1542](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) — tekst rozporządzenia, w tym Annex XIII (atrybuty DPP) i Art. 77 (data obowiązywania)
- [ESPR 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) — Ecodesign for Sustainable Products Regulation
- [ESPR Working Plan 2025–2030 (marzec 2025)](https://commission.europa.eu/news/working-plan-ecodesign-and-energy-labelling-2025-2030-2025-04-16_en) — lista grup produktowych priorytetowych
- [Recommendation 2021/2279](https://eur-lex.europa.eu/eli/reco/2021/2279/oj) — Product Environmental Footprint (PEF) method
- [Critical Raw Materials Act 2024/1252](https://eur-lex.europa.eu/eli/reg/2024/1252/oj) — definicja substancji krytycznych
- [GS1 Digital Link 1.4.0](https://ref.gs1.org/standards/digital-link/) — standard URL → JSON dla DPP
- [W3C Verifiable Credentials 2.0](https://www.w3.org/TR/vc-data-model-2.0/) — model danych dla podpisanych atrybutów
- [The Battery Pass Project](https://thebatterypass.eu/) — konsorcjum BMW, BASF, SAP, Circulor — referencyjna implementacja
- [Bundesnetzagentur, Battery Regulation guidance](https://www.bundesnetzagentur.de/EN/Areas/Energy/Companies/SecurityOfSupply/Battery_Regulation/start.html) — niemiecka implementacja sankcji
