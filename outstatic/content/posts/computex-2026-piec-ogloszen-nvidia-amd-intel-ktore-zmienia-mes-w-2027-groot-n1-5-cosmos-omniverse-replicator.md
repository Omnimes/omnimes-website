---
title: 'Computex 2026: 5 ogłoszeń NVIDIA/AMD/Intel, które zmienią MES w 2027 (GR00T N1.5, Cosmos, Omniverse Replicator)'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'computex-2026-piec-ogloszen-nvidia-amd-intel-ktore-zmienia-mes-w-2027-groot-n1-5-cosmos-omniverse-replicator'
description: 'Keynote Jensena Huanga na Computexie 2026 (2 czerwca) trwał trzy godziny i był skoncentrowany na przemyśle — robotyce, AI factories i digital twins. AMD i Intel kontrowali tego samego dnia. Z perspektywy MES, pięć ogłoszeń realnie zmienia mapę technologiczną na 2027: GR00T N1.5 (robot foundation model), Cosmos 2.0 (world model do syntetycznych danych treningowych), nowy Omniverse Replicator, AMD Ryzen AI Max+ jako alternatywa dla Jetsona, oraz Intel Gaudi 3 dla edge inference. Artykuł rozbiera każde z nich z perspektywy realnego pipeline''u wdrożeniowego, nie marketingu.'
coverImage: '/images/post-computex-2026/cover-computex-2026.png'
lang: 'pl'
tags: [{"value":"AI","label":"AI"},{"value":"nvidia","label":"nvidia"},{"value":"omniMES","label":"OmniMES"},{"value":"robotics","label":"robotics"}]
publishedAt: '2026-06-08T08:00:00.000Z'
---

**2 czerwca 2026, Taipei.** Jensen Huang otworzył Computex 2026 trzygodzinnym keynote, w którym po raz pierwszy w historii konferencji większość czasu poświęcił przemysłowi — robotyce, AI factories, digital twins. Konsumencka grafika dostała dziesięć minut na końcu. AMD odpaliło konferencję cztery godziny później, Intel następnego dnia rano. Trzy keynote'y, kilkanaście ogłoszeń, jeden wyraźny wniosek: edge AI na hali produkcyjnej przestaje być kategorią pilotaży.

Z perspektywy MES — pięć rzeczy w tej fali realnie zmienia mapę technologiczną na 2027. Nie wszystko z keynote ma znaczenie dla zakładu produkcyjnego, większość to demo, ale poniższa piątka ma konkretny pipeline produkcyjny w horyzoncie 12 miesięcy.

## 1. GR00T N1.5 — robot foundation model w wersji produkcyjnej

[Project GR00T](https://developer.nvidia.com/project-gr00t) NVIDIA pokazała pierwszy raz w marcu 2024 jako platformę treningową dla humanoidów. GR00T N1 (marzec 2026) był pierwszą wersją z otwartymi wagami — generic policy dla manipulacji, trenowana na 10 tysiącach godzin demonstracji od FANUC, ABB i Boston Dynamics. **GR00T N1.5**, pokazany 2 czerwca, to pierwsza wersja, którą NVIDIA pozycjonuje jako produkcyjną.

Co realnie się zmieniło między N1 a N1.5:
- **300% więcej danych treningowych** — głównie z syntetyków generowanych w Cosmos (patrz pkt 2)
- **Zero-shot manipulacja dla 50+ typów chwytaków** — od dwupalczastych przez podciśnieniowe po multi-finger
- **Latencja predykcji 80 ms** na Jetson Thor (był wcześniej 220 ms na Jetson Orin AGX)
- **Wsparcie dla TwinCAT i Beckhoff** w default deployment kit — to jest kluczowe dla europejskiego przemysłu

Co znaczy dla MES: pierwszy raz integracja robot-MES nie wymaga programowania trajektorii. Operator pokazuje robotowi w VR/AR czego chce (telep operacja, 5–10 demonstracji), MES zapisuje zadanie jako prompt + few-shot demonstrations. Następnym razem na linii pojawia się ten sam wariant produktu — robot bierze prompt z MES-a, generuje trajektorię w czasie rzeczywistym.

Realistyczna timeline: **Q4 2026 pierwsze produkcyjne pilotaże** u dużych OEM (VW, Mercedes, BMW). **2027 dostępność dla średnich producentów** przez integratorów (FANUC, KUKA już mają partnerstwa). Dla polskiego zakładu motoryzacyjnego — realny czas wdrożenia POC: początek 2027.

## 2. Cosmos 2.0 — world model do syntetycznych danych treningowych

[Cosmos](https://www.nvidia.com/en-us/ai/cosmos/) NVIDIA wypuściła w styczniu 2025 jako foundation model dla generowania syntetycznych scen 3D. Wersja 1.0 produkowała sekwencje video z fizyką, użyteczne głównie do treningu modeli autonomicznych. **Cosmos 2.0** rozszerza to o **diff-rendering**: można wprowadzić własne CAD obiekty (np. brakujący wariant chwytaka, nowy typ opakowania) i Cosmos wygeneruje setki tysięcy realistycznych scen z tym obiektem w różnych oświetleniach, kątach, pozycjach.

Co znaczy dla computer vision w fabryce: do tej pory wdrożenie modelu detekcji wad jakościowych dla nowego SKU wymagało **3–6 miesięcy zbierania i oznaczania danych** z realnej produkcji. Z Cosmos 2.0 — **5–10 dni renderowania syntetyków** + 200–500 realnych zdjęć na fine-tune. Redukcja o 80–90% time-to-deployment dla nowego computer vision use case.

NVIDIA pokazała konkretne demo z producentem czujników: nowy SKU od pomysłu do produkcyjnego CV modelu w **11 dni** (vs poprzednie 4 miesiące w tym samym zakładzie z poprzednim procesem).

Bariera: jakość syntetyków zależy od dokładności CAD i shaderów PBR. Dla typowego polskiego producenta — to znaczy, że jeśli macie nowoczesny CAD (SolidWorks 2024+, Fusion 360) ze szczegółowymi materiałami, Cosmos 2.0 zadziała. Jeśli macie stary CAD bez tekstur — najpierw inwestycja w upgrade CAD pipeline.

## 3. Omniverse Replicator + Mega ABBP — multi-agent factory simulation

Dotychczasowy Omniverse Replicator służył do generowania syntetycznych obrazów dla CV. Nowa wersja, prezentowana w demo z ABB i Boston Dynamics ("Mega ABBP"), to **multi-agent simulator całej fabryki** — wirtualna kopia hali, w której równolegle pracuje 10–100 robotów (różnych producentów), AGV-ki, ludzie, konwejery. Wszystko sterowane przez prawdziwy MES — ten sam, który będzie sterował fizyczną fabryką po wdrożeniu.

Co znaczy dla projektów greenfield i brownfield: **walidacja layoutu hali i logiki MES przed wylaniem fundamentów** (greenfield) lub **przed dostawą nowych maszyn** (brownfield). NVIDIA pokazała case BMW iFactory — 8 tygodni simulation zamiast 18 miesięcy iteracyjnych poprawek po uruchomieniu.

Praktyczna obserwacja: dotychczasowe symulatory fabryki (Tecnomatix Plant Simulation, FlexSim, AnyLogic) są dobre w logice strumienia produkcji, ale słabe w fizyce robotów i AI. Omniverse + Mega to pierwszy raz, gdy te dwie warstwy łączą się w jednym narzędziu. Cena licencji enterprise nie została podana — wcześniejsze Omniverse Enterprise to ~USD 9000/seat/rok, prawdopodobnie podobnie lub wyżej.

Dla polskiego zakładu średniego to dziś jeszcze nie jest realne — chyba że jesteście dostawcą bezpośrednim dla OEM i to OEM finansuje symulację.

## 4. AMD Ryzen AI Max+ Pro — Jetson Orin ma konkurenta

AMD ujawnił **Ryzen AI Max+ Pro** — laptopowy chip z 96 GB unified memory, 50 TOPS NPU, integrated Radeon RDNA 4. Dla MES najważniejsze: cena referencyjna producenta to ~USD 1200, można nim odpalić **lokalny Llama 3.3 70B w pełnej precyzji** (bez kwantyzacji) lub Phi-4 14B + Vision Language Model równolegle.

Porównanie do Jetson Orin AGX 64 GB:
- **Cena**: AMD ~USD 1200 vs NVIDIA ~USD 1999
- **RAM**: 96 GB vs 64 GB
- **Power**: 120 W vs 60 W (AMD gorzej)
- **Edge form factor**: AMD wymaga laptopa lub mini-PC, Jetson jest natywnie embedded
- **Software stack**: AMD ROCm 7.0 vs NVIDIA CUDA — w 2026 ROCm wreszcie obsługuje większość modeli z HuggingFace bez modyfikacji

Co znaczy dla MES: dla edge AI w biurze utrzymania ruchu, w pokoju serwerowni zakładu, albo dla **dedykowanego AI assistant per linia produkcyjna** — AMD Ryzen AI Max+ jest 40% tańszy niż Jetson AGX z 50% więcej RAM. Dla wdrożeń na samej hali, w pyle i przy 50°C — Jetson dalej wygrywa formą i poborem mocy.

Pierwsze partnerskie produkty (HP, Lenovo industrial workstations) zapowiedziane na **wrzesień 2026**. Dla nas — czas planowania zakupów Q4 2026/Q1 2027.

## 5. Intel Gaudi 3 + OpenVINO 2026 — koszt ML inference spada o 60%

Intel pokazał **Gaudi 3** dla edge inference (poprzednio tylko data center), w form factorze PCIe — można wstawić do każdego serwera 1U. Plus nowa wersja **OpenVINO 2026** z natywną optymalizacją dla TimesFM, Chronos i pozostałych time-series foundation models (które omawiałem w [poprzednim artykule](/blog/time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii)).

Mierzone wartości z keynote: **predykcja awarii dla 200 sensorów co 5 sekund** — Gaudi 3 zużywa 18 W i kosztuje USD 2400, dorównuje wydajnością serwerowi z A100 (USD 25 000). To **10x niższy koszt CAPEX** dla typowego pipeline'u MES analytics.

Intel pokazał case Foxconn — 4000 sensorów na fabryce iPhone'ów, jeden serwer Gaudi 3 zastępujący stos 3 serwerów GPU. Roczne oszczędności prądu: USD 28 000.

Dla średniego polskiego zakładu (50–200 sensorów) to jest **realna alternatywa do GPU server na lokalne ML** — przy szacowanym budżecie projektu 20–40 tys. zł na hardware (vs 200 tys. zł za odpowiednik NVIDIA).

## Co realnie zmieni się dla polskiego producenta w 12 miesięcy

Trzy konkretne implikacje:

**Po pierwsze, koszt edge AI w fabryce spada o połowę.** AMD Ryzen AI Max+ i Intel Gaudi 3 to nie kosmetyka — to fundamentalna zmiana ekonomii. Lokalny LLM, lokalny multimodal AI, lokalne ML pipeline'y — wszystko w 2027 będzie kosztować rzędu USD 1–5 tys. CAPEX zamiast USD 20–50 tys. To otwiera dostęp dla zakładów z 50–200 pracownikami, dla których wcześniej tylko chmura była opłacalna.

**Po drugie, computer vision dla nowych SKU wchodzi z miesięcy do tygodni.** Cosmos 2.0 + Omniverse Replicator skraca cycle od "mamy nowy wariant produktu" do "MES rozpoznaje wady" o **80%**. To zmienia kalkulację dla zakładów małoseryjnych — wcześniej CV się nie opłacało dla wariantów poniżej 5000 sztuk, teraz próg spada do około 500 sztuk.

**Po trzecie, integracja robot-MES przestaje wymagać programisty robota.** GR00T N1.5 w 2027 (realny czas wdrożenia) zmienia rolę integratora z "spędzasz tydzień na trajektorii pick-and-place" do "uczysz robota nowego wariantu przez 30 minut demonstracji". To redukuje koszt jednostkowy zmiany wariantu o 5–10x.

## Bariery i czego keynote nie pokazał

Pięć rzeczy, które wymagają uczciwego komentarza:

**Demo vs produkcja.** GR00T N1.5 w demo na scenie sortuje kostki Tetris z 99% recall. W realnej fabryce, w pyle i przy zmiennym oświetleniu, te metryki spadną. NVIDIA nie pokazała demo "po roku w realnej fabryce" — to wciąż brakuje branzy.

**Cena nieskończona dla Omniverse Enterprise.** Mega ABBP demo było spektakularne, ale licencjonowanie Omniverse dla średnich producentów ciągle jest poza zasięgiem. Czekamy na "Omniverse for SMB", którego NVIDIA nie zapowiedziała.

**Brak SLA dla foundation models.** GR00T jest open weight, ale to też znaczy "brak SLA". Dla integracji w pętli sterowania robotem, gdzie awaria modelu = stop linii, to jest poważny problem. Standardowo rozwiązuje się to przez fallback (klasyczne reguły jeśli foundation model nie ufa swojej predykcji), ale to dodatkowa warstwa do zbudowania.

**Vendor lock-in.** CUDA, ROCm, oneAPI Intel — trzy ekosystemy, słaba interoperowalność. Jeśli dziś inwestujesz w Jetson stack, za 3 lata przeniesienie na AMD lub Intel będzie kosztowne. Open Neural Network Exchange (ONNX) pomaga, ale nie rozwiązuje problemu w 100%.

**Brak ofert dla średnich polskich integratorów.** Wszystkie demo robione były z TIER-1 OEM (VW, BMW, Foxconn). NVIDIA i AMD nie pokazały ścieżki dla integratorów regionalnych, którzy obsługują 80% polskiego rynku MES. To luka, która prawdopodobnie wypełni się przez 2027 (gdy dystrybutorzy zaczną oferować preconfigured boxes), ale dziś planowanie wdrożeń wymaga większego ryzyka niż dla TIER-1.

## Wnioski dla dyrektora produkcji i CIO

**Krótkoterminowo (Q3-Q4 2026):** zacznij rozmowę z integratorem o pilotażu jednego use case'u z nowego stacka. Najbezpieczniejsza ścieżka: Intel Gaudi 3 dla predykcji awarii (najmniejsza zmiana pipeline'u, najszybszy ROI). AMD Ryzen AI Max+ jako lokalny LLM assistant — drugi wybór.

**Średnioterminowo (2027):** zaplanuj budżet inwestycyjny na drugą falę edge AI. Cosmos 2.0 + nowy CV pipeline dla zmienialnych wariantów produktu. GR00T N1.5 dla jednego stanowiska pilotażowego z robotem typu cobot.

**Strategicznie (do 2028):** rozważ wyjście z chmurowych LLM dla danych produkcyjnych. Lokalny stack na nowym hardware staje się tańszy, szybszy w odpowiedzi, i fundamentalnie prostszy w NIS2 compliance (pisałem o tym w [artykule o NIS2](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki)).

Computex 2026 nie był rewolucją w stylu ChatGPT 2022. Był serią inkrementalnych ogłoszeń, które w sumie zmieniają mapę ekonomii edge AI dla średniego producenta. Następne 12 miesięcy zdecyduje, kto pierwszy wykorzysta nową ekonomię — i czy polscy producenci zdążą, zanim niemiecka konkurencja zrobi to samo.

---

## Źródła

- [NVIDIA Project GR00T](https://developer.nvidia.com/project-gr00t) — strona produktu, dokumentacja techniczna
- [NVIDIA Cosmos](https://www.nvidia.com/en-us/ai/cosmos/) — strona world model, blueprint synthetic data
- [NVIDIA Omniverse Enterprise](https://www.nvidia.com/en-us/omniverse/) — licencjonowanie i case studies
- [AMD Ryzen AI Max+ announcement (Computex 2026)](https://www.amd.com/en/press-releases) — specyfikacja i partnerstwa
- [Intel Gaudi 3 PCIe (Computex 2026)](https://www.intel.com/content/www/us/en/newsroom/news.html) — benchmark Foxconn case study
- [OpenVINO 2026 release notes](https://docs.openvino.ai/) — optymalizacja TimesFM, Chronos
- [Time-series Foundation Models w MES](/blog/time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii) — nasz wcześniejszy artykuł o TSFM
- [NIS2 i KSC2 w 2026](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) — kontekst regulacyjny lokalnego AI
