---
title: 'Jev w przemyśle: gdy decyzja kosztuje mniej niż jeden token'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'jev-w-przemysle-gdy-decyzja-kosztuje-mniej-niz-jeden-token'
description: 'TypeSafe wypuścił Jeva — model, który nie pisze tekstu, tylko zwraca typowane decyzje z kalibrowanym prawdopodobieństwem. Koszt pojedynczego rozstrzygnięcia schodzi poniżej ceny kilku tokenów, a latencja z sekund do milisekund. Sprawdzamy, co to realnie zmienia w MES: gdzie na hali taki model ma sens, gdzie go stosować nie wolno i jak wpiąć go w architekturę bez naruszania wymogów audytu.'
coverImage: '/images/post-jev-decyzje/cover-jev-decyzje.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"AI","label":"AI"},{"value":"agentAi","label":"Agent AI"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-09-23T06:00:00.000Z'
---

Większość tego, co fabryka nazywa „sztuczną inteligencją", nie jest pisaniem tekstu. To rozstrzyganie. Czy ten przestój to awaria, czy przezbrojenie. Czy ten alarm z brokera jest istotny, czy to szum z czujnika, który od tygodnia migocze. Czy opis wady wpisany przez operatora o trzeciej w nocy to ta sama kategoria, co pięćset wcześniejszych. Do której brygady skierować zgłoszenie.

Przez ostatnie dwa lata robiliśmy to dużym modelem językowym, bo nie było czym innym. Model generował tekst, my prosiliśmy go o JSON, potem parsowaliśmy odpowiedź i modliliśmy się, żeby trzymała schemat. Płaciliśmy za to sekundami latencji i groszami, które przy dwudziestu tysiącach zdarzeń dziennie przestają być groszami.

We wrześniu 2026 TypeSafe wypuścił **Jeva** — model, który tej pętli nie ma, bo w ogóle nie generuje tekstu.

## Czym Jev różni się od modelu językowego

Jev jest opisywany przez producenta jako **model „System One"**: zamiast produkować ciąg znaków token po tokenie, dostaje **stan** (string albo struktura JSON) i **zestaw typowanych pytań**, a następnie odpowiada na wszystkie **równolegle, w jednym przebiegu** (Requesty, 2026).

Pytania są trzech rodzajów:

- **Noul** — twierdzenie do rozstrzygnięcia tak/nie, zwraca prawdopodobieństwo z przedziału [0, 1];
- **Choice** — wybór z listy zdefiniowanej z góry, zwraca etykietę, rozkład prawdopodobieństwa po opcjach i pewność;
- **Score** — umieszczenie na uporządkowanej skali z opisanymi poziomami, zwraca wartość i rozkład.

Kluczowa konsekwencja jest architektoniczna, nie wydajnościowa: **zbiór dopuszczalnych odpowiedzi definiujecie w schemacie przed wywołaniem**. Model nie może zwrócić kategorii, której nie ma na liście, ani złamać typu — nie dlatego, że został dobrze poproszony, tylko dlatego, że nie ma innej drogi wyjścia. Znika cała klasa błędów, którą dziś łatamy retry'ami i walidatorami.

Druga różnica dotyczy treningu. Zamiast RLHF, optymalizującego pod preferencje człowieka w rozmowie, TypeSafe stosuje **RLCD — Reinforcement Learning for Calibrated Decisions** — celujące w decyzje i uczciwe oszacowania prawdopodobieństwa (DataCamp, 2026). To ma znaczenie praktyczne: pewność 0,9 ma naprawdę odpowiadać trafności rzędu 90%, a nie być liczbą, którą model napisał, bo brzmi przekonująco. Duże modele językowe są pod tym względem notorycznie przesadnie pewne siebie.

## Liczby

| Parametr | Jev | Modele frontier (porównanie producenta) |
|---|---|---|
| Latencja end-to-end | 70–500 ms | 10,1 s (GPT-5.6 Terra), 37,8 s (Claude Opus 5) |
| Mediana dla 1 pytania / 3 pytań | 275 ms / 310 ms | — |
| Koszt wejścia | 0,042 USD / mln tokenów | ok. 48× drożej (GPT-5.6 Terra) |
| Koszt wyjścia | bez opłat | naliczany |
| Koszt decyzji | ok. 0,0004 USD za przypadek | 0,0304 USD (Terra), 0,1761 USD (Opus 5) |
| Trafność (4 procesy produkcyjne) | 67,8% | 67,9% (Terra), 73,1% (Opus 5) |
| Błędy struktury wyjścia | 0% | 17,0% (GPT-5.6 Sol), 45,5% (Claude Haiku 4.5) |

Źródło: DataCamp (2026) oraz Spring AI (2026), obie relacje opierają się na benchmarkach TypeSafe.

**Te liczby pochodzą od producenta i nie zostały niezależnie zweryfikowane** — DataCamp zaznacza to wprost. Traktujcie je jako rząd wielkości, nie jako gwarancję, i zweryfikujcie na własnych danych, zanim cokolwiek na nich oprzecie.

Skąd tytuł. Spring AI podaje wywołanie z czternastoma pytaniami za **0,000043 USD i 111 ms** wobec 0,033 USD i 11–14 s dla modelu rozumującego. Przy stawce rzędu 10 USD za milion tokenów wyjściowych — typowej dla modeli frontier — pojedynczy token wyjściowy kosztuje 0,00001 USD. Czyli **całe czternastopytaniowe rozstrzygnięcie kosztuje tyle, co około cztery tokeny wygenerowanego tekstu**. Nie cztery zdania. Cztery tokeny.

Dla porządku: to znaczy również, że przy trafności 67,8% Jev nie jest mądrzejszy od dużego modelu. Jest tak samo trafny jak GPT-5.6 Terra i wyraźnie słabszy od Opusa 5. Rewolucja nie dotyczy jakości rozstrzygnięć, tylko ich ceny i tempa — a to zmienia nie to, *jak dobrze* decydujecie, lecz **ile decyzji w ogóle opłaca się podjąć**.

## Dlaczego to akurat pasuje do hali

Decyzje na produkcji mają cechy, które są dla Jeva niemal wzorcowe:

1. **Zbiór odpowiedzi jest zamknięty i znany z góry.** Kody przyczyn przestoju, kategorie wad, priorytety zgłoszeń, brygady — to wszystko są słowniki, które w MES już istnieją i są utrzymywane przez technologa.
2. **Wolumen jest wysoki i powtarzalny.** Jedna linia to setki zdarzeń na zmianę. Przy koszcie 0,03 USD za rozstrzygnięcie nikt nie klasyfikuje każdego mikroprzestoju. Przy 0,0004 USD — pytanie przestaje dotyczyć budżetu.
3. **Czas odpowiedzi jest twardym wymaganiem.** Operator przy maszynie nie czeka dziesięciu sekund na podpowiedź. Przy 300 ms podpowiedź pojawia się, zanim zdąży sięgnąć po listę rozwijaną.
4. **Stan jest już ustrukturyzowany.** Jev przyjmuje rekord JSON — a MES dokładnie tym dysponuje: kontekstem maszyny, zlecenia, ostatnich odczytów i historii zdarzeń.

Punkt trzeci warto rozwinąć, bo to on decyduje o przyjęciu rozwiązania przez halę. Demonstracja TypeSafe, w której Jev **gra w Doom, reagując na ustrukturyzowany stan gry mniej więcej dziesięć razy na sekundę** (DataCamp, 2026), jest efektowna, ale komunikuje rzecz istotną: mówimy o modelu, który mieści się w pętli sterowania operatorskiego, a nie w pętli raportowania.

### Gdzie widzimy to w OmniMES

- **Kodowanie przyczyn przestoju.** Operator wpisuje „znowu poszła sprężyna w podajniku" — model mapuje to na kod ze słownika i zwraca pewność. Powyżej progu zapis idzie automatycznie, poniżej trafia do zatwierdzenia. Zysk nie polega na wyręczaniu operatora, tylko na tym, że dane o przestojach przestają być zbiorem swobodnych opisów, których nie da się zsumować.
- **Triage sygnałów przy wykrywaniu automatycznym.** Reguły filtrowania topiku i tagów, o których pisaliśmy wcześniej, odsiewają po wzorcu. Jev umie odpowiedzieć na pytanie, na które wyrażenie regularne nie odpowie: „czy ten tag wygląda na zmienną procesową wartą zapisywania, czy na wewnętrzny rejestr diagnostyczny sterownika".
- **Kwalifikacja odchyleń w OmniEnergy.** Nie „czy zużycie przekroczyło próg" — to liczy SQL, i ma liczyć SQL. Raczej: „czy przy tym zleceniu, tej zmianie i tej temperaturze zewnętrznej odchylenie jest spodziewane".
- **Routing zgłoszeń utrzymania ruchu.** Choice po brygadach plus Score po pilności, jedno wywołanie, oba pytania na tym samym stanie.
- **Brama przed drogim modelem** (wzorzec *cascade gating*). Zanim wyślecie zdarzenie do modelu rozumującego za trzy centy, zapytajcie Jeva za ułamek grosza, czy w ogóle warto. Przy odsianiu 90% ruchu rachunek zmienia się o rząd wielkości.

## Czego Jev nie zrobi — i dlaczego to trzeba przeczytać przed wdrożeniem

Producent i niezależni komentatorzy zgodnie wyliczają ograniczenia, a w kontekście przemysłowym dwa z nich są krytyczne.

**Po pierwsze: brak arytmetyki, liczenia, porównywania dat i pytań pośrednich** (Requesty, 2026). Rekomendacja brzmi wprost: *dokładne obliczenia zostawcie w kodzie*. Nie pytajcie Jeva, czy OEE spadło poniżej 65%, ile sztuk wyprodukowano między zmianami ani czy przegląd jest po terminie. To robi zapytanie SQL, deterministycznie i tanio. Modelowi zadajcie pytanie **jakościowe**, którego SQL nie obsłuży.

**Po drugie: brak uzasadnień.** Jev nie napisze, dlaczego zdecydował tak, a nie inaczej — nie umie generować tekstu. DataCamp wskazuje to jako problem przy audytach zgodności, i w Europie jest to uwaga poważniejsza, niż się wydaje. Pisaliśmy na tym blogu o tym, czego organy nadzoru faktycznie szukają w systemach MES po 2 sierpnia 2026. Jeżeli decyzja modelu wpływa na klasyfikację wyrobu, zwolnienie partii albo ocenę pracy człowieka, samo „0,87" w logu nie wystarczy. Wyjściem jest architektura, nie obietnica: **zapisujcie pełny stan wejściowy, treść pytania, rozkład prawdopodobieństw i wersję schematu**, żeby dało się odtworzyć rozstrzygnięcie. A decyzje o wysokiej stawce zostawcie do zatwierdzenia człowiekowi — z podpowiedzią, nie zamiast niego.

Trzecie zastrzeżenie jest techniczne, ale kosztowne, jeśli się o nim zapomni: **praca per dokument to jedno wywołanie na dokument** (Spring AI, 2026). Przy przeglądaniu dwudziestu pozycji płacicie za dwadzieścia wywołań. Model **nie streamuje**, a stan musi być stringiem, obiektem, tablicą albo nullem. I — co twórcy podkreślają — **nie jest granicą bezpieczeństwa**; nie budujcie na nim kontroli dostępu.

## Jak to wpiąć, żeby nie przepisywać MES

Integracja nie wymaga przebudowy. Jev działa obok istniejących modeli, nie zamiast nich — w Spring AI wchodzi jako osobny klient i zestaw doradców, m.in. do samokorekty, guardraili i przesiewania dokumentów w RAG (Spring AI, 2026). Ten sam układ przenosi się na architekturę MES:

**W ciągu tygodnia**

1. **Wybierzcie jeden słownik, który już macie i który jest źle wypełniany.** U większości naszych klientów to kody przyczyn przestoju. Wyeksportujcie 500 historycznych zdarzeń z opisem operatora i kodem nadanym ręcznie.
2. **Zmierzcie punkt odniesienia**, zanim cokolwiek podłączycie: jaki procent zdarzeń ma dziś kod inny niż „pozostałe".

**W ciągu miesiąca**

3. **Uruchomcie klasyfikację w trybie cichym** — model liczy, wynik trafia do osobnej kolumny, nikt go nie widzi na hali. Po dwóch tygodniach porównajcie z kodem operatora i policzcie, przy jakim progu pewności zgodność jest akceptowalna. To jest ten test porównawczy przed/po, bez którego nie warto podejmować decyzji wdrożeniowej.
4. **Zapiszcie ścieżkę audytu od pierwszego dnia** — stan, pytanie, rozkład, wersja schematu. Dopisanie tego później oznacza, że pierwsze miesiące pracy modelu są nieodtwarzalne.

**Czego nie robić w pierwszym podejściu:** nie wpinajcie modelu w zwalnianie partii, blokowanie wysyłki ani ocenę operatorów. Zacznijcie od miejsca, w którym błąd kosztuje poprawkę w raporcie, a nie reklamację klienta.

## Co z tego wynika

Jev nie jest mądrzejszy od modeli, których używacie. Przy 67,8% trafności jest dokładnie tak dobry jak średni model frontier i słabszy od najlepszego. Zmienia się natomiast ekonomia: rozstrzygnięcie za ułamek grosza, w 300 ms, z gwarantowanym typem i uczciwie skalibrowaną pewnością.

Gdy koszt decyzji spada o dwa rzędy wielkości, przestaje obowiązywać reguła, która ukształtowała wasze systemy: że automatycznie klasyfikuje się tylko to, co naprawdę się opłaca. Nagle opłaca się klasyfikować każdy mikroprzestój, każdy alarm i każdy wolny komentarz operatora — nie dlatego, że to imponujące, ale dlatego, że dane, które z tego powstaną, są pierwszym kompletnym zbiorem, jaki fabryka ma o własnych zdarzeniach.

Warunek jest jeden i nie jest technologiczny: **trzeba wiedzieć, o co pytać**. Model odpowiada wyłącznie na pytania ze zdefiniowanego z góry zbioru odpowiedzi. Fabryki, które mają uporządkowane słowniki i opisane stany, wpięły to w tydzień. Fabryki, które mają siedemnaście wariantów kodu „awaria mechaniczna", najpierw muszą zrobić porządek — i to jest praca, której żaden model za nie nie wykona.

## Źródła

- DataCamp, *Jev: TypeSafe's System One Model That Never Hallucinates*, wrzesień 2026 — https://www.datacamp.com/blog/system-one-models-jev
- Requesty, *TypeSafe Jev explained: how it works, LLM differences and API pricing*, wrzesień 2026 — https://www.requesty.ai/blog/typesafe-jev-explained
- Spring AI, *Spring AI and TypeSafe Jev: Fast, Cheap, Structured Decisions*, 21 września 2026 — https://spring.io/blog/2026/09/21/spring-ai-typesafe-structured-judgment/
- Kiln-AI, *jev_jsonschema — uruchamianie schematu JSON Schema przez API Jeva* — https://github.com/Kiln-AI/jev_jsonschema
