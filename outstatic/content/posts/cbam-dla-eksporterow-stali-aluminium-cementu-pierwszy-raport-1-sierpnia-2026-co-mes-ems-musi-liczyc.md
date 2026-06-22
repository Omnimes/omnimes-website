---
title: 'CBAM dla eksporterów ze stali, aluminium i cementu: pierwszy raport definitive period 1 sierpnia 2026 — co MES + EMS musi liczyć'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'cbam-dla-eksporterow-stali-aluminium-cementu-pierwszy-raport-1-sierpnia-2026-co-mes-ems-musi-liczyc'
description: 'Definitive period CBAM startuje 1 stycznia 2026, a 1 sierpnia 2026 mija termin pierwszego okresowego raportu w nowym reżimie. Polskie firmy w sektorach stali, aluminium, cementu, nawozów, wodoru i energii — zarówno jako importerzy do UE, jak i eksporterzy do rynków wymagających carbon reporting — muszą zacząć liczyć embedded emissions per tonę produktu. Artykuł rozbiera bez wody: jakie dane z MES + EMS są źródłem, jak je mapować na PCF (ISO 14067), które narzędzia działają, ile to kosztuje, jakie są sankcje. Plus 6-tygodniowa roadmapa do deadline''u.'
coverImage: '/images/post-cbam-mes/cover-cbam-mes.png'
lang: 'pl'
tags: [{"value":"ue","label":"UE"},{"value":"omniMES","label":"OmniMES"},{"value":"cbam","label":"CBAM"},{"value":"ems","label":"EMS"}]
publishedAt: '2026-06-22T08:00:00.000Z'
---

**1 sierpnia 2026** — termin pierwszego raportu okresowego CBAM w nowym, definitive period. Reżim zaczął obowiązywać **1 stycznia 2026** po zakończeniu fazy przejściowej (1.10.2023 – 31.12.2025). Dla polskich firm w sektorach **stali, aluminium, cementu, nawozów azotowych, wodoru i energii elektrycznej** to pierwszy moment, w którym brak danych o embedded emissions per tonę produktu zaczyna kosztować — najpierw raportowo, od 2027 płatnościowo. Sankcje za brak raportowania: **10–50 EUR za tonę CO₂** nie ujętą w raporcie ([Art. 26 Rozporządzenia CBAM 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj)). Za brak certyfikatów (od 2027): **100 EUR za tonę** plus odmowa wjazdu produktu na rynek UE.

Mit, który trzeba na początek rozbroić: **CBAM nie dotyczy tylko importerów do UE**. Polski producent stali eksportujący do UK (gdzie [CBAM UK startuje 1 stycznia 2027](https://www.gov.uk/government/consultations/factsheet-the-uks-carbon-border-adjustment-mechanism)), niemiecki OEM żądający PCF od polskiego dostawcy komponentów aluminium, holenderski klient cementu wymagający embedded emissions zgodnie z [Battery Regulation DPP](/blog/digital-product-passport-dpp-wchodzi-do-fabryki-espr-i-battery-regulation-2027-co-mes-musi-umiec-do-lutego) — wszyscy potrzebują tych samych danych. Skala: w branży motoryzacyjnej wg [VDA Sustainability Initiative](https://www.vda.de/en/topics/environment-and-climate/sustainability) 70% europejskich OEM już wymaga PCF od dostawców na 2027.

Niżej rozbieram konkretnie, kto jest objęty, jakie dane musi dostarczyć MES + EMS, jak to liczyć, ile to kosztuje i co zrobić w pozostałych 6 tygodniach.

## Co to CBAM w skrócie

CBAM (Carbon Border Adjustment Mechanism) to opłata wyrównująca, którą Unia Europejska nakłada na **embedded emissions** w importowanych produktach z sektorów emisyjnych. Cel: zapobiec **carbon leakage** — sytuacji, w której produkcja przenosi się poza UE, żeby uniknąć kosztów EU ETS. W praktyce CBAM zamyka tę lukę przez nałożenie na importera analogicznej opłaty, jak gdyby produkt powstał w UE pod reżimem ETS.

Sektory objęte CBAM ([Annex I Rozporządzenia](https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng#anx_I)):

- **Cement** (klinkier, cement portlandzki, cementy mieszane)
- **Żelazo i stal** (surówka, stal nieobrobiona, wyroby walcowane, rury, druty)
- **Aluminium** (surowe, odlewy, profile)
- **Nawozy** (mocznik, azotan amonu, kompleksowe NPK)
- **Wodór** (bez zakresu wodór niskoemisyjny dla regulacji RED III)
- **Energia elektryczna** (importowana z poza UE)

Od 2027 prawdopodobnie dojdą: **stopy aluminium**, **wyroby przetworzone ze stali**, **plastiki** (decyzja Komisji do końca 2026).

## Kogo to dotyczy w polskich realiach

Trzy ścieżki — większość polskich firm w sektorach Annex I jest na jednej lub kilku:

**1. Polski importer materiałów objętych Annex I.** Klasyczny przypadek: producent maszyn kupuje stal z Białorusi lub Ukrainy. Od 1.01.2026 musisz mieć status **CBAM declarant** w polskim rejestrze (KOBiZE jako Krajowy Ośrodek Bilansowania), zgłaszać kwartalnie embedded emissions importowanych ton i — od 2027 — kupować odpowiednią liczbę certyfikatów CBAM po cenie indeksowanej do EU ETS.

**2. Polski eksporter na rynki carbon-aware (UK, US, Kanada, Japonia).** Wielka Brytania uruchamia własny CBAM od **1.01.2027**, z metodologią zbliżoną do unijnej. USA pracują nad CCA (Clean Competition Act). Polski producent stali sprzedający do UK musi już dziś podać embedded emissions per tonę — bez tego klient nie zaakceptuje zamówienia po 2026.

**3. Dostawca europejski dla OEM wymagających PCF.** Volkswagen, Mercedes, Stellantis, Siemens, Bosch — wszyscy mają politykę „PCF or no contract" dla nowych umów od 2026. To nie jest CBAM, ale dane są te same: kg CO₂-eq per tonę / per sztukę z metodologią ISO 14067 lub PEF Commission Recommendation 2021/2279.

Jeżeli wasza firma produkuje stal, aluminium lub cement w Polsce — sprawdźcie listę klientów. Co najmniej połowa już ma PCF w wymaganiach przetargowych na 2027.

## Embedded emissions — co to konkretnie

Embedded emissions to **całkowite emisje CO₂-eq „wbudowane" w 1 tonę gotowego produktu**, mierzone od bramy zakładu (gate-to-gate) lub od kołyski do bramy (cradle-to-gate). CBAM wymaga **direct + indirect emissions**:

- **Scope 1 (direct)** — emisje z procesów wewnątrz fabryki: spalanie gazu, koksu, pył reaktantów chemicznych (np. dekarbonacja CaCO₃ w piecu cementowym)
- **Scope 2 (indirect)** — emisje z energii elektrycznej zakupowanej z sieci: w Polsce dziś ~650 kg CO₂/MWh wg [KOBiZE 2025](https://www.kobize.pl/), w Niemczech ~370, w Norwegii ~30 (hydro)
- **Embedded emissions raw materials** (precursors) — emisje z surowców już skumulowane przed wejściem do procesu (np. ferromanganez w hucie stali)

Dla tony stali konwerterowej typowy przedział: **1,6–2,4 tCO₂/t**. Dla tony cementu portlandzkiego: **0,8–1,1 tCO₂/t** (głównie z dekarbonacji). Dla tony aluminium pierwotnego z elektrolizy: **8–18 tCO₂/t**, zależnie od mixu energetycznego — to jest właśnie powód, dla którego norweski aluminium ma przewagę nad polskim na rynku UE.

## Skąd MES bierze te dane

Embedded emissions to nie pojedyncza liczba — to **per batch** (partia produkcyjna), zsumowana z trzech źródeł:

**1. Genealogia partii (z MES).** Każda partia ma swój zestaw surowców (BOM), maszyn, czasów cyklu, operatorów. To podstawa alokacji — jeśli batch A i batch B przeszły przez ten sam piec, ale A trwał 4 godziny a B 6 godzin, energia (i CO₂) muszą być alokowane proporcjonalnie do czasu pracy pieca.

**2. Zużycie energii per maszyna / per linia (z EMS).** System Energy Management mierzy kWh energii elektrycznej i m³ gazu per maszyna w rozdzielczości minutowej lub sekundowej. Jeśli mam batch A w piecu od 08:00 do 12:00, EMS daje mi dokładnie ile MWh prądu i ile m³ gazu zużyła ta maszyna w tym oknie czasowym.

**3. Bill of Materials z ERP** (surowce, ich emission factors). Surowiec ferromanganu z konkretnej kopalni ma swój PCF (dostarczony przez dostawcę albo wartość default z bazy KOBiZE). MES wie, ile kg surowca trafiło do batcha A. Mnożymy: kg surowca × kg CO₂/kg surowca = embedded emissions z prekursorów.

Razem: **embedded CO₂ per tonę produktu = (scope 1 + scope 2 + precursors) / wyprodukowane tony**.

Naturalny stack OmniMES dla tego: MES (genealogia) + EMS (energy metering) + ERP (BOM + supplier data) + warstwa kalkulacyjna PCF (w bazie czasowej — w [TimescaleDB](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie) trzymamy emission factors jako time-series, bo emission factor sieci zmienia się rok do roku, a regulator wymaga **kontemporalnego** mnożnika).

## Standardy: ISO 14067, GHG Protocol, EU CBAM methodology

Trzy ramy metodyczne, które praktycznie zazębiają się:

**[ISO 14067:2018](https://www.iso.org/standard/71206.html)** — Carbon footprint of products. Międzynarodowy standard, najszerszy zasięg, dobrze zinterpretowany. Definiuje granice systemu, sposób alokacji między ko-produktami, wymagania weryfikacji przez trzecią stronę.

**[GHG Protocol Product Standard](https://ghgprotocol.org/product-standard)** — bardziej elastyczny, używany w USA. Akceptowany w niektórych ramach CBAM-like (US Clean Competition Act).

**[EU CBAM Implementing Regulation 2023/1773](https://eur-lex.europa.eu/eli/reg_impl/2023/1773/oj)** — szczegóły jak liczyć embedded emissions specyficznie dla CBAM. Definiuje **default values** (używane gdy nie mamy verified data od dostawcy) — typowo o 20–40% wyższe niż realistyczne wartości, żeby motywować do dostarczania weryfikowanych danych.

W praktyce wewnątrz UE dominuje ISO 14067. Dla CBAM declarant zawsze trzeba zmapować ISO 14067 PCF na format CBAM (drobne różnice w granicy systemu, ale narzędzia robią to automatycznie).

## Narzędzia: co realnie działa w 2026

Cztery realne opcje:

**SAP S/4HANA Sustainability Footprint Management.** Komercyjne, drogie (rzędu 50–150 tys. EUR rocznie dla średniego zakładu), ale integruje się natywnie z ERP. Jeśli macie SAP, to obvious choice. Plus: pełna obsługa CBAM, raportowanie do KOBiZE.

**Microsoft Cloud for Sustainability.** Alternatywa dla SAP, integracja z Microsoft Dynamics 365 i Azure. Lepsze ceny dla mid-market.

**[openLCA](https://www.openlca.org/)** — open-source LCA tool. Darmowy, ale wymaga manualnej integracji z MES/EMS. Dobre dla startupów i mniejszych zakładów, słabsze dla compliance audit (ślad audytowy mniej dojrzały).

**Custom — bezpośrednio w MES.** Dla zakładów, które już mają solidny stack (PostgreSQL + TimescaleDB + Grafana), kalkulator embedded emissions to ~200 linii SQL/Python. Plus baza emission factors (importowana z KOBiZE rocznie). To realna ścieżka — robimy tak w OmniMES, bo emission factors mapują się 1:1 na continuous aggregates per zmiana × per linia.

Co wybrać: dla zakładów >100 mln EUR obrotu z SAP — SFM. Dla mid-market 10–100 mln EUR z PostgreSQL + custom MES — własna kalkulacja jest tańsza i bardziej elastyczna. Dla najmniejszych — openLCA + Excel.

## Default values: pułapka dla nieprzygotowanych

Jeżeli polski importer aluminium z Białorusi nie ma weryfikowanych danych o embedded emissions od białoruskiego dostawcy (bo dostawca po prostu nie raportuje), CBAM nakazuje stosować **default values**. Dla aluminium pierwotnego default to **16,5 tCO₂/t** — czyli najwyższy realny przedział dla węgla.

Realna stawka CBAM 2027 (indeksowana do ETS): ~80 EUR/t CO₂. Czyli **importer zapłaci ~1320 EUR/t aluminium dodatkowo, jeśli używa default**. Verified data od dostawcy może obniżyć to do 800–1000 EUR/t aluminium — różnica 300–500 EUR na tonie.

Wniosek: **inwestycja w pozyskanie verified data od dostawców spoza UE zwraca się natychmiast.** Polscy importerzy stali z Ukrainy lub Turcji powinni już dziś podpisywać aneksy do umów z wymogiem CBAM-ready PCF. To samo dla aluminium z ZEA, Indii, Bahrajnu.

## Roadmapa 6 tygodni do 1 sierpnia 2026

Dla firm, które dziś nie mają jeszcze CBAM workflow:

**Tydzień 1–2 (22 czerwca – 5 lipca):** rejestracja jako CBAM declarant w KOBiZE. Inwentaryzacja co dokładnie importujemy/eksportujemy (CN codes z Annex I). Lista TIER-1 dostawców spoza UE i ich kontaktów.

**Tydzień 3–4 (6 lipca – 19 lipca):** zbieranie raw data. Z MES — quarterly summary partii produkcyjnych Q2 2026. Z EMS — energia elektryczna + gaz per linia. Z ERP — BOM + invoices za surowce. Z dostawców spoza UE — verified PCF lub akceptacja default.

**Tydzień 5–6 (20 lipca – 1 sierpnia):** kalkulacja embedded emissions per CN code, walidacja przez wewnętrzny audyt lub external verifier (TÜV, DEKRA, SGS dla high-stakes). Złożenie raportu w portalu CBAM. Plan działań na Q3.

Realny koszt pierwszego raportu dla średniego zakładu (50–500 ton importu Annex I miesięcznie): **15–40 tys. EUR** (konsultant + external verifier + setup tooling). Plus 0,2 etatu na bieżącą obsługę.

Najwięcej czasu zajmie **dostawcy spoza UE** — typowo 4–6 tygodni od pierwszego maila do PCF, jeśli dostawca to widzi po raz pierwszy. Stąd presja czasowa.

## Sankcje — co konkretnie ryzykujemy

[Art. 26 Rozporządzenia CBAM 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng#art_26) i [Art. 16 Rozporządzenia wykonawczego 2023/1773](https://eur-lex.europa.eu/eli/reg_impl/2023/1773/oj) ustalają:

- **Brak raportowania:** kara 10–50 EUR za tonę CO₂ niereportowaną, plus obowiązek uzupełnienia z opłatą wsteczną
- **Nieprawidłowe raportowanie:** kara 30–50 EUR/t plus naprawa raportu w 30 dniach
- **Brak certyfikatów (od 2027):** 100 EUR/t plus zakaz wprowadzania kolejnych partii produktu na rynek UE
- **Powtarzające się naruszenia:** propozycja Komisji KE z marca 2026 — kara do 4% globalnego obrotu

Polski regulator (KOBiZE + UOKiK) ma uprawnienia do nakazania publicznej komunikacji o naruszeniu. To dla firm B2B (większość polskiego eksportu) jest gorsze niż sama kara — straci pierwszy duży kontrakt po ujawnieniu i już nie nadrobi.

## Wnioski dla dyrektora produkcji i CFO

Trzy konkrety:

**Po pierwsze**, CBAM dotyczy realnie 3000+ polskich zakładów (sektor Annex I + powiązania importowo-eksportowe). Jeżeli wasza firma jest w stalach, aluminium, cemencie, nawozach lub elektronice z metalowymi komponentami — sprawdźcie status na ten tydzień. Termin 1.08.2026 jest twardy.

**Po drugie**, MES + EMS są fundamentem danych dla CBAM (60–70% potrzebnych informacji). Genealogia partii z MES, energy metering z EMS, BOM z ERP — to wszystko już macie. Trzeba dodać warstwę kalkulacyjną i interfejs do raportowania. Koszt 15–40 tys. EUR + dwa miesiące pracy konsultanta. Nie wymiana stacku, tylko ekspozycja danych.

**Po trzecie**, CBAM zamyka cluster regulacyjny UE 2026: [AI Act](/blog/eu-ai-act-sierpien-2026-ktore-funkcje-mes-kwalifikuja-sie-jako-high-risk-ai) (sierpień), [DPP/Battery Regulation](/blog/digital-product-passport-dpp-wchodzi-do-fabryki-espr-i-battery-regulation-2027-co-mes-musi-umiec-do-lutego) (luty 2027), [NIS2/KSC2](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) (H2 2026), CBAM (sierpień 2026). Cztery filary, jeden wspólny mianownik: **MES jako źródło dowodów compliance**. Firmy, które potraktują to jako jedną platformę danych zamiast czterech osobnych projektów, zaoszczędzą 40–60% kosztu wdrożenia.

CBAM nie zniknie. Jeżeli polski przemysł chce konkurować na rynkach carbon-aware (UE, UK, USA od 2027), embedded emissions per tonę staną się standardową specyfikacją produktu — obok wymiarów, składu chemicznego i wytrzymałości. Najlepszy moment, żeby zacząć liczyć, był rok temu. Drugi najlepszy — to dzisiaj.

---

## Źródła

- [Rozporządzenie CBAM 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj) — tekst rozporządzenia, Annex I (sektory), Art. 26 (sankcje)
- [Rozporządzenie wykonawcze CBAM 2023/1773](https://eur-lex.europa.eu/eli/reg_impl/2023/1773/oj) — szczegóły metodologii liczenia
- [ISO 14067:2018](https://www.iso.org/standard/71206.html) — Carbon footprint of products
- [GHG Protocol Product Standard](https://ghgprotocol.org/product-standard) — alternatywna metodologia
- [PEF Recommendation 2021/2279](https://eur-lex.europa.eu/eli/reco/2021/2279/oj) — Product Environmental Footprint
- [KOBiZE — Krajowy Ośrodek Bilansowania](https://www.kobize.pl/) — polski regulator emisji, baza emission factors
- [UK CBAM consultation](https://www.gov.uk/government/consultations/factsheet-the-uks-carbon-border-adjustment-mechanism) — start 1.01.2027
- [VDA Sustainability Initiative](https://www.vda.de/en/topics/environment-and-climate/sustainability) — wymagania PCF dla motoryzacji
- [openLCA](https://www.openlca.org/) — open-source LCA tool
- [DPP wchodzi do fabryki](/blog/digital-product-passport-dpp-wchodzi-do-fabryki-espr-i-battery-regulation-2027-co-mes-musi-umiec-do-lutego) — nasz wcześniejszy artykuł o paszporcie produktu, naturalny powiązany
- [TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie) — architektura przechowywania emission factors jako time-series
- [OmniMES — cyberbezpieczeństwo i zgodność z CRA](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/cyberbezpieczenstwo-i-zgodnosc-cra-6dbPWZS59e) — dokumentacja produktu
