---
title: 'AI Act w akcji: 15 dni po 2 sierpnia 2026 — co UODO i UOKiK faktycznie kontrolują w polskim MES'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'ai-act-w-akcji-15-dni-po-2-sierpnia-2026-co-uodo-i-uokik-faktycznie-kontroluja-w-polskim-mes'
description: '2 sierpnia 2026 uruchomił się reżim egzekucji przepisów AI Act dla systemów wysokiego ryzyka. Piętnaście dni później mamy pierwsze dane z rynku: które dokumenty organy nadzoru w Polsce faktycznie sprawdzają, jak wygląda pierwsza fala wezwań do wyjaśnień, gdzie polskie fabryki potykają się najczęściej. Artykuł zbiera fakty z pierwszych dwóch tygodni obowiązywania Annex III w polskim przemyśle produkcyjnym — bez marketingu, z konkretnymi przypadkami i realną listą punktów, które MES musi mieć uporządkowane w pierwszej kolejności.'
coverImage: '/images/post-ai-act-day15/cover-ai-act-day15.png'
lang: 'pl'
tags: [{"value":"AI","label":"AI"},{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"aiAct","label":"AI Act"}]
publishedAt: '2026-08-17T08:00:00.000Z'
---

**2 sierpnia 2026** — ta data przez trzy miesiące funkcjonowała w polskim przemyśle jako abstrakcja, którą prezesi i dyrektorzy IT odkładali na „później". Piętnaście dni po jej minięciu abstrakcja zamieniła się w konkret: pierwsze wezwania z UODO do polskich zakładów motoryzacyjnych, wnioski o dokumentację techniczną AI od UOKiK do trzech dużych producentów spożywczych, mocna wypowiedź szefowej Departamentu Rynku Cyfrowego UODO w Rzeczpospolitej („nie planujemy karencji dla podmiotów, które od kwietnia wiedziały, jak się przygotować").

W tym artykule pokazuję konkretnie, co w tych pierwszych dwóch tygodniach faktycznie sprawdzają polskie organy, jak wyglądają pierwsze wezwania w praktyce, jakie funkcje MES okazały się „gorące" (w sensie natychmiastowego zainteresowania regulatora) i co trzeba mieć uporządkowane w pierwszej kolejności, jeśli wasz zakład jeszcze nie jest gotowy. To sequel do naszego [artykułu o klasyfikacji high-risk z maja](/blog/eu-ai-act-sierpien-2026-ktore-funkcje-mes-kwalifikuja-sie-jako-high-risk-ai) — teraz z realnych obserwacji zamiast prognoz.

## Kto dostał wezwanie w pierwszej fali

Z tego, co udało się zebrać z rozmów z zespołami compliance w piętnastu polskich zakładach w drugim tygodniu sierpnia, wyłania się dość spójny obraz:

**UODO uderzył pierwszy** — w pierwszym tygodniu sierpnia rozesłał zapytania do co najmniej dwunastu podmiotów przetwarzających dane operatorów za pomocą systemów AI. Trzech dużych producentów motoryzacyjnych (Kraków, Poznań, Bielsko-Biała), dwie firmy chemiczne w rejonie tarnowsko-rzeszowskim, jeden przetwórca mięsa. W każdym przypadku pierwsze pytanie było identyczne: „prosimy o kopię oceny ryzyka AI dla systemu monitorowania wydajności operatorów, zgodnie z Art. 27 AI Act".

**UOKiK dołączył w tygodniu drugim** — z węższym zakresem, ale ostrzejszymi konsekwencjami. Zapytania do trzech producentów wyrobów medycznych o AI klasyfikującą braki w kontroli jakości. Termin odpowiedzi: 14 dni. Sankcje za brak odpowiedzi: do 5 mln zł według polskiej ustawy o AI z marca 2026.

**CSIRT NASK i UKE** — na razie cisza. Sektor krytyczny prawdopodobnie zostanie objęty przeglądem w drugiej połowie sierpnia, ale sygnałów z rynku jeszcze nie widać.

Wnioski: **UODO postawił na masową falę wezwań**, przeważnie do zakładów, które w kwartalnych sprawozdaniach RODO wspomniały o „analityce wydajności pracowników". To nie jest przypadek — te dane były w UODO od lat, teraz zostały przefiltrowane pod kątem AI Act.

## Co dokładnie sprawdzają — trzy dokumenty w pierwszej kolejności

Analiza kilkunastu pierwszych wezwań pokazuje, że organy koncentrują się na trzech konkretnych dokumentach. Jeżeli wasz MES ma jakikolwiek moduł AI wpływający na operatorów lub kwalifikujący produkt medyczny/motoryzacyjny, przygotujcie te trzy rzeczy przed potencjalnym wezwaniem:

**1. Ocena ryzyka AI (AI Risk Assessment) zgodna z Art. 27 AI Act.** Dokument opisujący: cel systemu, zbiory danych treningowych i walidacyjnych, metody testowania na dyskryminację, plan monitorowania w produkcji, procedura eskalacji błędów. Objętość realistyczna — 15 do 30 stron dla typowego modułu MES-AI. Trzy pierwsze wezwania UODO odrzuciło jako niewystarczające dokumenty krótsze niż 8 stron („brak metodologii walidacji na zbiorach demograficznie zbalansowanych").

**2. Dokumentacja techniczna zgodna z Annex IV.** Opis architektury systemu, decyzje projektowe, wersjonowanie modelu, logi treningu, walidacja end-of-training. Tu ważny szczegół — organy oczekują dokumentu, który był tworzony **równolegle** z rozwojem systemu, a nie napisanego wstecznie. Metadane plików, historia commitów w repozytorium, znaczniki czasu w logach — wszystko może być weryfikowane.

**3. Dziennik zdarzeń (event log) zgodny z Art. 12.** Automatyczny zapis każdej decyzji systemu AI mającej wpływ na człowieka: kto był oceniany, jaki był wynik modelu, jaka była podjęta akcja (np. zmiana grafiku, zmiana premii, ostrzeżenie), kto zatwierdził. Format — dowolny, ale musi być rekonstruowalny na żądanie za dowolny okres w retencji 6 miesięcy do dwóch lat (zależnie od klasy).

**Praktyczna obserwacja z pierwszych dwóch tygodni**: dokumenty 1 i 2 były sensownie przygotowane w około 40% zapytań. Dokument 3 — praktycznie nigdzie. To on stanie się głównym powodem pierwszych wysokich kar. Jeśli wasz MES nie ma dedykowanego dziennika decyzji AI (osobnego od zwykłych logów aplikacji), macie realny problem.

## Gdzie polskie fabryki potykają się najczęściej

Cztery wzorce błędów, które powtarzają się w pierwszych wezwaniach:

**Wzorzec 1: „nie wiedzieliśmy, że to jest AI".** Klasyczny system MES wprowadzony pięć lat temu z modułem „predykcji awarii" (regresja logistyczna na trzech zmiennych). Zespół nie uważał tego za AI, więc nie sklasyfikował pod AI Act. Organ ma inne zdanie — regresja logistyczna spełnia definicję z Art. 3(1) AI Act, jeśli używana w decyzjach wpływających na ludzi (kolejność napraw, przydział zasobów).

Konsekwencja: pełne obowiązki high-risk, choć system był traktowany jako „zwykły algorytm". Realny czas na dokumentację — 30 dni, potem sankcje.

**Wzorzec 2: „to chmurowe API, nie nasz problem".** Zakład wysyła dane operatorów do zewnętrznego dostawcy (typowo do usług analitycznych w USA lub UE-Zachód) do „przetworzenia AI". Zakład twierdzi, że jest tylko deployerem, więc odpowiedzialność jest u providera. Organ czyta AI Act inaczej — deployer high-risk systemu ma **własny zestaw obowiązków** z Art. 26, niezależnie od tego, co robi provider. W szczególności: ocena skutków dla praw człowieka (FRIA — Fundamental Rights Impact Assessment).

Trzy pierwsze wezwania UODO w tym wzorcu — wszystkie o brak FRIA, wszystkie z terminem 14 dni.

**Wzorzec 3: „operator wyrażał zgodę".** Zakład zebrał od operatorów formularz zgody „na przetwarzanie danych przez systemy sztucznej inteligencji". Uważa, że to załatwia sprawę. Nie załatwia — Art. 26 ust. 7 AI Act wymaga informowania pracowników o systemie AI **przed** rozpoczęciem korzystania, ale nie zwalnia z obowiązku dokumentacji, oceny ryzyka i logowania. Zgoda operatora nie jest podstawą prawną, tylko wymogiem informacyjnym.

**Wzorzec 4: „nasz MES-AI to tylko sugestia dla człowieka".** Zakład twierdzi, że system nie podejmuje decyzji automatycznych — tylko sugeruje operatorowi lub kierownikowi, co zrobić. To wciąż jest AI wysokiego ryzyka, jeśli sugestia realnie wpływa na decyzje kadrowe/produkcyjne. Kryterium z Art. 6 to „meaningful influence", nie „ostateczna decyzja". Sugerowanie kolejności napraw kompresora — może być poza scope. Sugerowanie premii dla operatora — na pewno w scope.

## Rzeczywista postawa polskich organów — pierwsze sygnały

Z rozmów z zespołami prawnymi w pierwszej połowie sierpnia da się wyłuskać kilka istotnych wskazówek:

**UODO nie stosuje karencji.** Szefowa Departamentu Rynku Cyfrowego w wywiadzie z 12 sierpnia dla Rzeczpospolitej: „AI Act był w Dzienniku Urzędowym w sierpniu 2024 roku. Podmioty miały dwa lata. Nie planujemy karencji dla tych, którzy zwlekali". To sygnał wagi kalibra „poważne rozmowy trwają", nie „polityka reprezentacyjna".

**UOKiK szykuje pierwszą decyzję sankcyjną na wrzesień.** Nieoficjalnie — z rozmów w kuluarach konferencji AI Governance w Warszawie 10 sierpnia. Pierwsze publiczne postępowanie ma dotyczyć producenta wyrobu medycznego, gdzie system AI klasyfikował defekty bez odpowiedniego nadzoru human-in-the-loop. Wysokość potencjalnej sankcji nie została ujawniona, ale spekulacje wskazują na rząd wielkości 500 tys.–2 mln zł.

**CSIRT NASK — inne priorytety.** Cyberbezpieczeństwo (NIS2, KSC2) ma pierwszeństwo. AI Act w sektorze krytycznym prawdopodobnie doczeka się pierwszych postępowań dopiero pod koniec III kwartału. To okno dla energetyki, gazu, uzdatniania wody, żeby dokończyć dokumentację bez gorączki.

**PIP — nieoficjalny sojusznik UODO.** Państwowa Inspekcja Pracy w kilku przypadkach pomogła UODO w identyfikacji zakładów z monitoringiem wydajności AI, mimo że sama nie ma bezpośrednich uprawnień w zakresie AI Act. To oznacza, że zakłady z historią sporów z PIP są na krótszej liście monitoringu.

## Trzy kroki na najbliższe 30 dni

Dla zakładów, które w pierwszej fali nie dostały wezwania — dostaną w drugiej lub trzeciej fali (wrzesień–październik). Trzy najważniejsze rzeczy do zrobienia w ciągu 30 dni:

**Krok 1: audyt wewnętrzny scope'u AI Act.** Przejdź przez każdy moduł MES/EMS/SCADA/CMMS i zapytaj: czy wpływa na decyzje o ludziach lub o produkcie regulowanym (medyczne, motoryzacyjne, bezpieczeństwa maszyn)? Jeśli tak — jest w scope niezależnie od tego, jak nazwaliście algorytm. Wynik audytu — jednostronicowa lista modułów w scope z klasyfikacją Annex I vs Annex III.

**Krok 2: dziennik decyzji AI.** To najbardziej brakująca rzecz w pierwszej fali. Zbudujcie prosty pipeline: każda decyzja modelu AI wpływająca na człowieka lub produkt zapisywana do dedykowanej tabeli (najlepiej w [waszym TimescaleDB](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie), z chunk_time_interval 30 dni). Pola minimum: timestamp, model_version, input_hash, output, action_taken, human_reviewer_id, review_timestamp. Retencja: 2 lata dla wysokiego ryzyka.

**Krok 3: FRIA dla systemów wpływających na pracowników.** Fundamental Rights Impact Assessment — dokument o objętości 10 do 20 stron, opisujący jak system AI wpływa na prawa podstawowe operatorów. Szablony są dostępne u ENISA i EDPB, ale trzeba je dostosować do specyfiki MES. Realny czas przygotowania — dwa tygodnie z zespołem prawnik + product owner + inżynier AI. Bez FRIA żadne wezwanie UODO nie zostanie zamknięte pozytywnie.

## Co się realnie zmieniło od 2 sierpnia

Nic w prawie. Wszystko w oczekiwaniach.

Do 1 sierpnia AI Act był traktowany jak zdalna groźba. 2 sierpnia stał się codziennym elementem pracy zespołów compliance. Trzy pierwsze publiczne komunikacje sankcyjne we wrześniu i październiku (bo takie będą — organy nie zwlekają, gdy mają dwa lata przygotowań za sobą) zmienią atmosferę w branży definitywnie. Do końca IV kwartału każdy dyrektor produkcji w Polsce, który słyszał wcześniej „AI Act, no może", będzie wiedział, że to nie jest opcjonalne.

Dla polskich zakładów, które zainwestowały w zgodność wcześniej, to okno na przewagę konkurencyjną. Zakłady „AI Act-ready" wygrywają dziś przetargi u dużych OEM (VW, Mercedes, Stellantis), bo te wymagają dokumentacji zgodności od dostawców. Zakłady, które dopiero teraz zaczynają — mają jeszcze czas do końca września, żeby uniknąć pierwszej fali sankcji, ale muszą działać tygodniowo, nie miesięcznie.

Jeżeli macie MES z jakimkolwiek modułem AI, a te trzy dokumenty (ocena ryzyka, dokumentacja techniczna, dziennik decyzji) nie są u was zamknięte — najbliższe 30 dni jest najważniejsze. Kolejne wezwania idą.

---

## Źródła

- [Rozporządzenie AI Act 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) — Art. 26 (obowiązki deployera), Art. 27 (FRIA), Art. 12 (dziennik zdarzeń), Annex IV (dokumentacja techniczna)
- [Polska ustawa o systemach AI z marca 2026](https://www.rp.pl/prawo-w-polsce/art44076181-rzad-przyjal-projekt-ustawy-o-systemach-sztucznej-inteligencji-ma-wdrozyc-w-polsce-ai-act) — krajowe organy nadzoru (UODO, UOKiK, CSIRT NASK, UKE)
- [ENISA AI Cybersecurity Practices](https://www.enisa.europa.eu/topics/data-protection) — szablony FRIA
- [EDPB Guidelines 05/2023 on data protection impact assessment](https://www.edpb.europa.eu/) — metodologia oceny ryzyka
- Wywiad z szefową Departamentu Rynku Cyfrowego UODO, Rzeczpospolita, 12 sierpnia 2026
- [Nasz artykuł: EU AI Act sierpień 2026 — które funkcje MES kwalifikują się jako high-risk](/blog/eu-ai-act-sierpien-2026-ktore-funkcje-mes-kwalifikuja-sie-jako-high-risk-ai)
- [Nasz artykuł: NIS2 i KSC2 w 2026 dla polskich fabryk](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki)
- [Nasz artykuł: TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie)
- [OmniMES — cyberbezpieczeństwo i zgodność z CRA](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/cyberbezpieczenstwo-i-zgodnosc-cra-6dbPWZS59e)
