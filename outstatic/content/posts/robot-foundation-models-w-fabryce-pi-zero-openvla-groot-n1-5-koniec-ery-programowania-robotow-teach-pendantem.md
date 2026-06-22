---
title: 'Robot Foundation Models w fabryce: Pi-Zero, OpenVLA, GR00T N1.5 — koniec ery programowania robotów teach pendantem'
status: 'draft'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'robot-foundation-models-w-fabryce-pi-zero-openvla-groot-n1-5-koniec-ery-programowania-robotow-teach-pendantem'
description: 'Przez 50 lat robot przemysłowy uczył się jednego zadania przez programowanie trajektorii w teach pendant. W 2024–2026 pojawiły się trzy otwarte foundation models dla manipulacji robotycznej — Pi-Zero od Physical Intelligence, OpenVLA ze Stanford i GR00T N1.5 od NVIDIA — które obiecują koniec tej ery. Operator pokazuje robotowi co ma zrobić w VR/AR przez 5–10 demonstracji, model generyczny tłumaczy to na trajektorię w czasie rzeczywistym. Artykuł rozbiera, jak to dziś działa, gdzie wystarcza, a gdzie wciąż nie — plus realne implikacje dla integratorów MES w Polsce.'
coverImage: '/images/post-robot-foundation-models/cover-robot-foundation-models.png'
lang: 'pl'
tags: [{"value":"AI","label":"AI"},{"value":"robotics","label":"robotics"},{"value":"physicalAI","label":"Physical AI"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-06-16T08:00:00.000Z'
---

Przez 50 lat robot przemysłowy uczył się jednego zadania przez **programowanie trajektorii w teach pendant** — punkt po punkcie, kąt po kącie, godziny pracy integratora dla jednej operacji pick-and-place. Drugi wariant produktu wymagał drugiego programu. Trzeci — trzeciego. To była rzeczywistość FANUC, KUKA, ABB, Yaskawa od dekady osiemdziesiątej.

W 2024 i 2025 pojawiły się trzy projekty, które tę rzeczywistość rozbroiły. **[Pi-Zero](https://www.physicalintelligence.company/blog/pi0)** (Physical Intelligence, listopad 2024) — pierwszy otwarty foundation model dla manipulacji robotycznej, trenowany na 10 tys. godzin demonstracji z różnych robotów. **[OpenVLA](https://openvla.github.io/)** (Stanford, czerwiec 2024) — 7-miliardowy Vision-Language-Action model, który łączy LLM z polityką motoryczną. **[GR00T N1.5](https://developer.nvidia.com/project-gr00t)** (NVIDIA, Computex 2026) — pierwsza wersja produkcyjna NVIDIA foundation model dla humanoidów i robotów manipulacyjnych. Wszystkie trzy z otwartymi wagami.

W praktyce zmienia się model integracji robota z linii produkcyjnej. Operator pokazuje robotowi w VR co ma zrobić (telep operacja, 5–10 demonstracji), model tłumaczy to na trajektorię w czasie rzeczywistym, MES zapisuje zadanie jako prompt plus few-shot demonstrations. Nowy wariant produktu na linii? Robot bierze prompt z MES-a, generuje ruch bez interwencji programisty.

Niżej rozbieram każdy z trzech modeli, gdzie to dziś realnie działa, gdzie jeszcze nie, i co znaczy dla polskich integratorów MES.

## Co dzieje się dziś — teach pendant w 2026

Standardowa procedura uruchamiania nowego stanowiska robotycznego w polskim zakładzie w 2026 wygląda mniej więcej tak:

1. **Integrator** spędza 3–5 dni z teach pendantem programując trajektorie — pozycje pickup, transitów, drop-off — dla każdego wariantu detalu (typowo 5–30 wariantów per linia)
2. **Walidacja jakości** — kolejne 2–3 dni testów z prawdziwym materiałem, debug zderzeń, doszukiwania optimum prędkości vs jakości chwytu
3. **Dokumentacja** — kod robota (KAREL dla FANUC, KRL dla KUKA, RAPID dla ABB) trafia do repozytorium, plus instrukcja zmiany wariantu dla operatora
4. **Zmiana wariantu produktu w produkcji** — operator wybiera program z menu teach pendantu albo trigger przez MES — zmiana waria zajmuje 30–90 sekund (zwykle przeładowanie programu + parametrów)

Koszt jednego stanowiska: **15–40 tys. zł** za robota + **20–60 tys. zł** za pracę integratora — zależnie od złożoności. Czas wdrożenia 4–8 tygodni.

Słabe strony tego modelu są znane od dekad:

- **Brak generalizacji.** Robot nauczony pakować butelki 0,5 L nie umie pakować butelek 0,7 L bez nowego programu, nawet jeśli różnica jest minimalna
- **Brak adaptacji do wariancji procesu.** Detal nieco inaczej pozycjonowany na wejściu? Trajektoria nie pasuje, kolizja, stop produkcji
- **Koszt zmiany.** Wprowadzenie nowego SKU = nowy projekt integratora 4–8 tygodni. To dyskwalifikuje robotyzację dla małoseryjnych zakładów (poniżej 5 tys. sztuk jednego wariantu)
- **Vendor lock-in.** Program w KAREL nie działa na KUKA. Klient ze stanowiskiem FANUC płaci 2× więcej za zmianę dostawcy

## Pi-Zero — pierwszy generic robot policy

[Physical Intelligence](https://www.physicalintelligence.company/) (założone 2024 w San Francisco, $400 mln finansowania w pierwszej rundzie) opublikowało Pi-Zero w listopadzie 2024. To **foundation model dla manipulacji** — analogicznie do GPT dla tekstu — trenowany na **10 tys. godzin demonstracji** z różnych robotów: cobots Universal Robots, ALOHA (dual-arm system), Franka Panda, niektóre humanoidy.

Architektura: **VLM (Vision-Language Model) jako szkielet** + **flow-matching action head** dla generowania trajektorii. Wejście: kamera RGB + język naturalny prompt („pick up the red cup and place it in the box"). Wyjście: sekwencja akcji w przestrzeni joint space, 50 Hz.

Co istotne dla MES: **few-shot transfer**. Model przeszkolony na 10 tys. godzin generic data potrafi nauczyć się nowego zadania z **5–10 demonstracji** (teleoperacja przez VR controller). Bez programowania, bez teach pendantu. Sukces w demonstracjach Physical Intelligence: składanie koszul (klasyczne zadanie tekstylne, dotychczas uważane za bardzo trudne), pakowanie wielowariantowe, podawanie narzędzi.

Pi-Zero otrzymał otwarte wagi w lipcu 2025 ([HuggingFace pi0](https://huggingface.co/lerobot/pi0)). Implementacja referencyjna w PyTorch, integracja z biblioteką LeRobot od Hugging Face. Dla integratora: bariery wejścia są niskie — GPU z 24 GB VRAM (RTX 4090 lub Jetson AGX Thor) wystarczą do inferencji, fine-tune wymaga klastra A100/H100 z 4–8 nodes.

**Realny case:** [Covariant](https://covariant.ai/) (kupione przez Amazon w 2024) używa pochodnej Pi-Zero w warehouse picking — 95% recall w pakowaniu artykułów konsumenckich, z 12-godzinnym fine-tunem dla nowego asortymentu zamiast 2-tygodniowego integracji.

## OpenVLA — academic baseline, ale działający

[OpenVLA](https://openvla.github.io/) ze Stanforda i Berkeley to **VLA (Vision-Language-Action) 7B model** — Llama-2-7B jako backbone + ViT (Vision Transformer) jako encoder obrazu + linear action head. Trenowany na **Open X-Embodiment** — agregowany dataset z 21 instytucji akademickich, 970 tys. trajektorii z 22 platform robotycznych.

Co jest interesujące dla industri: **otwartość kompletna**. Kod, dane treningowe, wagi, scripty fine-tune — wszystko w GitHubie pod licencją MIT. Można wziąć i postawić u siebie, bez negocjacji prawnych.

Praktycznie: OpenVLA jest **gorszy niż Pi-Zero** w manipulacji wieloetapowej, ale wystarczy dla pick-and-place jednorazowego (chwyt + przeniesienie + odłożenie). Latencja predykcji 60–80 ms na RTX 4090, recall na typowych zadaniach przemysłowych 80–88%.

**Use case dla MES:** asystent operatora w training mode. Operator pokazuje robotowi nowy wariant detalu przez 3–5 demonstracji w VR, OpenVLA fine-tune'uje się 30 minut, wynik wystarczy do produkcji nisko-stake'owej (kosmetyka, opakowania).

## GR00T N1.5 — NVIDIA na Computex 2026

[GR00T N1.5](https://developer.nvidia.com/project-gr00t), prezentowany na Computex 2026 (omawiałem w [retrospektywie keynote](/blog/computex-2026-piec-ogloszen-nvidia-amd-intel-ktore-zmienia-mes-w-2027-groot-n1-5-cosmos-omniverse-replicator)), to **wersja produkcyjna** NVIDIA foundation model. Co zmieniło się względem N1 (marzec 2026):

- **300% więcej danych treningowych**, znaczna część z syntetyków generowanych w Cosmos (NVIDIA world model)
- **Zero-shot manipulacja dla 50+ typów chwytaków** — od dwupalczastych przez podciśnieniowe po multi-finger
- **Latencja 80 ms na Jetson Thor** (był 220 ms na Jetson Orin AGX dla N1)
- **Wsparcie dla TwinCAT i Beckhoff** w default deployment kit — kluczowe dla europejskiego przemysłu, gdzie te platformy dominują automatykę

GR00T N1.5 ma najmocniejsze partnerstwa wśród trzech modeli. NVIDIA potwierdziła współpracę z **FANUC, KUKA, Boston Dynamics, Agility Robotics**. To znaczy, że w 2027 prawdopodobnie kupisz cobota FANUC z GR00T-em jako default integration option, nie z classical teach pendant flow.

Trade-off: GR00T jest open weight, ale **trening i fine-tune wymagają NVIDIA Hardware** (Jetson Thor lub serwer z H100/B200). Dla mniejszych zakładów to znaczy USD 5–20 tys. dodatkowo na hardware vs OpenVLA na konsumenckim GPU.

## Co realnie zmienia się dla integratora MES

Cztery konkretne zmiany w 2026–2027:

**1. Czas wdrożenia spada z tygodni do dni.** Zamiast 4–8 tygodni programowania trajektorii — 2–5 dni: setup hardware, 5–10 demonstracji per zadanie, fine-tune (30 min do 4 godzin), walidacja. Dla zakładu z 5–10 stanowiskami robotycznymi rocznie to oszczędność rzędu **200–400 tys. zł rocznie** na pracy integratora.

**2. Zmiana wariantu = nowy prompt, nie nowy projekt.** Operator pokazuje robotowi w VR nowy wariant przez 5–10 demonstracji. Robot generalizuje, MES rejestruje prompt jako parametr zadania. Czas: 30–60 minut zamiast tygodni. To dyskwalifikuje argument „nie opłaca się robotyzować małoseryjnych" — próg dochodu wdrożenia spada **z 5 tys. sztuk do ~500 sztuk** jednego wariantu.

**3. MES staje się store of prompts.** Nowy obowiązek MES: trzymanie biblioteki promptów per wariant produktu, wersjonowanie ich, walidacja przez approval workflow (kto może modyfikować prompt do robota? — to nowy poziom RBAC). To pasuje do istniejącego stack-u OmniMES — prompt to po prostu tekst plus reference do VR-recorded demonstrations.

**4. Vendor lock-in spada.** Pi-Zero, OpenVLA, GR00T — wszystkie three open weight, wszystkie wspierają wielu producentów robotów. Przejście z FANUC na KUKA przy fine-tunowanym foundation model wymaga 4–8 godzin re-training, a nie pełnego przepisania programu w innym języku DSL.

## Gdzie to NIE działa — uczciwa lista

Cztery przypadki, w których teach pendant nadal wygrywa w 2026:

**1. High-precision (poniżej 0,1 mm tolerancji).** Foundation models radzą sobie z manipulacją w skali 1–10 mm. Dla precyzyjnej assembly elektronicznej (SMT, micro-soldering, fiber optic alignment) ich dokładność jest zbyt niska. Tu klasyczne programowanie z force-torque feedback i dokładną kalibracją wygrywa o rząd wielkości.

**2. Cykl czasowy poniżej 2 sekund per pick.** Latencja predykcji 80 ms (GR00T) + planning + execution to typowo 0,8–1,5 s na operację. Dla high-throughput pakowania (np. linia rozlewania 12 tys. butelek/h) klasyczna trajektoria z PLC ma 200–400 ms cyklu — 3–5× szybciej.

**3. Safety-critical w bezpośredniej współpracy z człowiekiem.** Foundation models nie mają jeszcze certyfikacji ISO 10218 / ISO 13849 dla operacji safety-rated. Standardowy cobot z certified safety stop działa pod ISO. Foundation model jako control loop dla cobota wymaga osobnej warstwy safety, którą trzeba zbudować od zera.

**4. Bardzo wysokie obciążenie (powyżej 50 kg).** Modele trenowane są głównie na cobots i lekkich industrial arms (poniżej 20 kg payload). Manipulacja 100+ kg paletyzacja, automotive body-in-white welding — tu klasyczny industrial robot z planowaniem offline w RobotStudio/RoboGuide wciąż jest właściwym wyborem.

## Architektura referencyjna: MES + Robot Foundation Model

Stack, który spina foundation model z MES w sensowny sposób:

```
PLC / Robot Controller (FANUC R-30iB, KUKA KR C5, ABB OmniCore)
  ↕ EtherCAT / PROFINET (real-time, niezmienione)
GR00T-compatible Hardware (Jetson Thor lub edge GPU server)
  ↕ ROS 2 / DDS bridge
Foundation Model Inference (Pi-Zero / OpenVLA / GR00T N1.5)
  ↕ MQTT / Kafka events
MES Layer (OmniMES)
  ├── Prompt Store (per wariant produktu, w PostgreSQL)
  ├── Demonstration Library (VR recordings, S3-compatible)
  ├── Fine-tune Pipeline (orchestrated jobs)
  ├── Approval Workflow (RBAC dla promptów)
  └── Performance Monitoring (success rate per prompt, drift detection)
```

Kluczowy element to **MES jako store of prompts and demonstrations**. Każde zadanie robotyczne to:
- Prompt językowy (np. „pick the red package from the conveyor and place it in slot 3")
- 5–20 demonstracji VR per prompt (jako reference dla retraining)
- Wynik fine-tune jako artifact (model weights, ~200 MB)
- Telemetria z produkcji (success rate, czas wykonania, kolizje)

To dokładnie pasuje do architektury danych w OmniMES — prompty trzymane w PostgreSQL, demonstracje w obiektowym storage, telemetria w [TimescaleDB jako time-series](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie).

## Co znaczy dla polskich integratorów

FANUC, KUKA, ABB, Universal Robots — wszystkie cztery zapowiedziały integracje z foundation models w 2026–2027. Dla polskich integratorów regionalnych (Aluprof, AC, Promet, Apena) to dwie ścieżki:

**Ścieżka A: zostać classical integratorem.** Programowanie teach pendantem dla high-precision / high-throughput / safety-critical zostaje. Margines pracy nie znika — w istocie rośnie, bo na rynku jest mniej osób gotowych pisać KAREL/KRL/RAPID dla naprawdę trudnych przypadków. Specjalizacja jako droga.

**Ścieżka B: uczyć się foundation models, oferować hybrid integration.** Klient dostaje classical robot z foundation model jako default flow + classical fallback. Margines marketingowy duży — to nowa generacja oferty, brak konkurencji regionalnej do końca 2027. Wymaga inwestycji w kompetencje (PyTorch, ROS 2, NVIDIA stack) i hardware demo (Jetson Thor + cobot do POC).

Realna prognoza: do końca 2027 ~30% nowych wdrożeń robotów w polskim przemyśle będzie miało foundation model jako default, 70% pozostanie classical. Do 2030 te liczby się odwrócą.

## Wnioski dla dyrektora produkcji

Trzy konkrety:

**Po pierwsze**, foundation models w robotyce w 2026 to nie hype — to dojrzała technologia z trzema produkcyjnymi modelami open weight (Pi-Zero, OpenVLA, GR00T N1.5) i partnerstwami z dużymi producentami robotów (FANUC, KUKA, ABB). Realna ścieżka wdrożenia: 12–18 miesięcy od decyzji do pierwszego produkcyjnego POC.

**Po drugie**, najmocniejsza zmiana to **ekonomia małoseryjnych**. Foundation models robią ekonomicznie opłacalną robotyzację produktów, które do tej pory były ręczne (poniżej 5 tys. sztuk wariantu). Dla polskiego rynku custom manufacturing (motoryzacja niszowa, elektronika konsumencka, opakowania premium) — to fundamentalna zmiana.

**Po trzecie**, MES staje się elementem stacka robotycznego, nie tylko obserwatorem. Nowa rola: store of prompts, demonstration library, approval workflow, performance monitoring. To wymaga rozszerzenia istniejącego MES lub wymiany na MES gotowy na AI integration. Pomocna jest [architektura danych z TimescaleDB](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie) — telemetria z robotów to klasyczna time-series, którą hypertables obsługują bez modyfikacji.

Foundation models nie zastąpią klasycznego programowania robotów w 2026. Ale do 2028 stają się **default integration option** dla większości wdrożeń produkcyjnych. Polski przemysł, który zacznie eksperymentować w 2026, będzie miał 2-letnią przewagę nad konkurencją regionalną.

---

## Źródła

- [Pi-Zero (Physical Intelligence)](https://www.physicalintelligence.company/blog/pi0) — strona produktu, paper, demo videos
- [Pi-Zero open weights na HuggingFace](https://huggingface.co/lerobot/pi0) — model card, integracja z LeRobot
- [OpenVLA (Stanford + Berkeley)](https://openvla.github.io/) — paper, kod, wagi, dokumentacja
- [Open X-Embodiment Dataset](https://robotics-transformer-x.github.io/) — agregowany dataset 970 tys. trajektorii z 22 platform
- [NVIDIA Project GR00T](https://developer.nvidia.com/project-gr00t) — strona produktu, dokumentacja techniczna
- [LeRobot library (Hugging Face)](https://github.com/huggingface/lerobot) — referencyjna biblioteka PyTorch dla robot foundation models
- [Physical AI: roboty humanoidalne na hali produkcyjnej](/blog/physical-ai-roboty-humanoidalne-na-hali-produkcyjnej) — wcześniejszy artykuł o humanoidach
- [Agentic AI w produkcji](/blog/agentic-ai-w-produkcji-jak-autonomiczne-agenty-przejmuja-sterowanie-fabryka-w-2026) — kontekst agentic AI w fabryce
- [Computex 2026 — 5 ogłoszeń dla MES](/blog/computex-2026-piec-ogloszen-nvidia-amd-intel-ktore-zmienia-mes-w-2027-groot-n1-5-cosmos-omniverse-replicator) — retrospektywa Computex z GR00T N1.5
- [TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie) — architektura time-series dla telemetrii robotów
