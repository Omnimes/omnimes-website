---
title: 'Traceability w MES: jak zbudować genealogię wyrobu, której wymaga Digital Product Passport — 5 miesięcy do 18 lutego 2027'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'traceability-w-mes-genealogia-wyrobu-digital-product-passport-5-miesiecy-do-18-lutego-2027'
description: 'Od 18 lutego 2027 paszport produktu staje się obowiązkowy dla baterii przemysłowych powyżej 2 kWh, trakcyjnych i LMT. Paszportu nie da się wystawić z arkusza kalkulacyjnego — potrzebna jest genealogia wyrobu zbierana na bieżąco przez MES. Pokazujemy, jakie dane trzeba wiązać, które normy to regulują (EN 18219, EN 18220) i co realnie zdąży zrobić średnia polska fabryka w pięć miesięcy.'
coverImage: '/images/post-traceability-dpp/cover-traceability-dpp-foto.jpg'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"dpp","label":"DPP"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-09-14T08:00:00.000Z'
---

Digital Product Passport opisywaliśmy na tym blogu dwa razy — najpierw od strony prawnej, potem od strony terminów. Za każdym razem wracało to samo pytanie z sali: dobrze, ale skąd mamy wziąć te dane? Bo paszport produktu nie jest dokumentem, który dział jakości wypełnia raz na kwartał. To zapis tego, co faktycznie wydarzyło się z konkretną sztuką albo partią na hali — a jeśli nie zapisywaliście tego w trakcie produkcji, po fakcie nie odtworzycie tego z niczego.

Ten tekst jest o warstwie, którą trzeba zbudować pod paszportem: o **genealogii wyrobu**. Czyli o tym, żeby dla dowolnego numeru seryjnego dało się odpowiedzieć na pytanie „z jakiego materiału, na jakiej maszynie, w jakich warunkach i przez kogo to powstało" — i odwrotnie: „która partia surowca trafiła do których wyrobów".

Do 18 lutego 2027 zostało pięć miesięcy.

## Co się zmieniło latem 2026 — i dlaczego to już nie jest ćwiczenie teoretyczne

Przez dwa lata paszport produktu był tematem konferencyjnym. Latem 2026 przestał być.

**20 lipca 2026 Komisja Europejska uruchomiła rejestr DPP** wraz ze środowiskiem testowym (Komisja Europejska, 2026). To centralne miejsce, w którym podmiot gospodarczy rejestruje unikalne identyfikatory produktów i powiązane z nimi metadane. Co ważne dla architektury: **rejestr nie przechowuje danych o samych produktach** — te zostają u producenta albo u dostawcy usługi paszportowej. Rejestr trzyma identyfikatory i wskazuje, gdzie szukać treści. Rejestracji dokonuje się przez interfejs webowy albo API, a operator może wystąpić o elektroniczne potwierdzenie rejestracji, którym wykazuje zgodność w relacjach handlowych.

Pierwszy krok nie ma przy tym żadnego terminu przypisanego do grupy produktowej: zanim zarejestrujecie choć jeden paszport, firma musi zostać **zweryfikowanym podmiotem gospodarczym**. To jednorazowa weryfikacja tożsamości na zasadach kwalifikowanego podpisu elektronicznego — i można ją zacząć dzisiaj (Cleo Labs, 2026).

Druga zmiana jest jeszcze bardziej konkretna. **CEN/CENELEC JTC 24 opublikował w 2026 sześć z ośmiu norm europejskich** dla systemu paszportowego — EN 18216, 18219, 18220, 18221, 18222 i 18223; dwie kolejne (prEN 18239 i prEN 18246) są w opracowaniu (Regen Studio, 2026). Dla fabryki najistotniejsze są dwie:

- **EN 18219** — unikalne identyfikatory. Kodyfikuje pięć dopuszczalnych schematów identyfikacji produktu, w tym ścieżki adresowe typu GS1 Digital Link.
- **EN 18220** — nośniki danych. Określa, jak identyfikator ma być naniesiony na wyrób: kody dwuwymiarowe (QR, Data Matrix) oraz RFID w pasmach HF, NFC i UHF (RAIN), wraz z zasadami umieszczania, znakowania i jakości nadruku.

Innymi słowy: nie ma już miejsca na własną konwencję numerowania „bo u nas zawsze tak było". Identyfikator, którym oznaczycie wyrób, musi być jednym z uznanych schematów, a nośnik musi spełniać wymagania jakościowe.

### Kalendarz, który obowiązuje

Dla baterii rozporządzenie jest już w fazie egzekwowania, nie zapowiedzi:

| Data | Co zaczyna obowiązywać |
|---|---|
| 18 lutego 2026 | Deklaracja śladu węglowego dla akumulatorów powyżej 2 kWh |
| 18 sierpnia 2026 | Nowe wymagania znakowania fizycznego (pojemność, chemia, informacje o zagrożeniach) |
| 18 sierpnia 2026 | Termin na akt delegowany Komisji o szczegółach paszportu — prawa dostępu, zasady wprowadzania i aktualizacji danych |
| **18 lutego 2027** | **Paszport obowiązkowy: baterie LMT, przemysłowe powyżej 2 kWh, trakcyjne** |
| 18 sierpnia 2027 | Obowiązki należytej staranności dla surowców krytycznych (przesunięte o dwa lata z 2025) |

Równolegle rusza ESPR: pierwsze akty delegowane w 2026 obejmują żelazo i stal, a w 2027 dołączają aluminium, tekstylia i opony (passportcraft, 2026). Jeśli więc produkujecie coś innego niż baterie, kolejka przesuwa się o kilkanaście miesięcy — mechanizm pozostaje ten sam.

## Genealogia wyrobu — co to właściwie znaczy

Genealogia to powiązanie, które pozwala przejść **w obie strony**:

- **wstecz** — od gotowej sztuki do wszystkiego, co ją utworzyło: partii surowca, komponentów, maszyny, gniazda, narzędzia, nastaw procesu, operatora, zmiany;
- **wprzód** — od partii surowca do wszystkich wyrobów, w których ten surowiec się znalazł, aż po numery dokumentów wysyłkowych.

Kierunek „wprzód" jest tym, o którym firmy zapominają — a to on decyduje o skali wycofania z rynku. Bez niego wycofujecie wszystko, co powstało w podejrzanym oknie czasowym. Z nim — tylko te sztuki, które faktycznie dostały wadliwy komponent.

### Rozdzielczość: partia czy sztuka

To pierwsza decyzja projektowa i ma bezpośrednie konsekwencje kosztowe.

**Śledzenie partii** wystarcza tam, gdzie wyrób jest jednorodny, a jednostką reklamacji jest partia — chemia, spożywcze, wyroby sypkie. **Śledzenie sztukowe** jest konieczne, gdy każda sztuka ma własny numer seryjny i własny paszport — a dokładnie tego wymaga rozporządzenie bateryjne dla akumulatorów powyżej 2 kWh.

Różnica nie jest akademicka: śledzenie sztukowe wymaga znakowania każdej sztuki, odczytu identyfikatora na każdej operacji i utrzymania tożsamości przy podziale oraz łączeniu partii. To zwykle oznacza dołożenie czytników i punktów znakowania na liniach, które dziś ich nie mają.

### Gdzie genealogia najczęściej się rozrywa

Z wdrożeń wychodzą trzy powtarzalne miejsca:

1. **Podział partii** — jedna partia surowca idzie na dwie linie, a system zapisuje tylko sumę zużycia. Powiązanie wstecz przestaje być jednoznaczne.
2. **Przeróbka i naprawa** — sztuka wraca na wcześniejszą operację. Jeśli system dopisuje nowe zdarzenie, ale nie zachowuje historii poprzedniego przejścia, ślad audytowy ma dziurę dokładnie tam, gdzie audytor zajrzy najpierw.
3. **Materiały pomocnicze** — kleje, lakiery, elektrolit. Formalnie „nie są komponentem", więc nikt nie ewidencjonuje ich partiami. Przy reklamacji okazuje się, że to właśnie one były przyczyną źródłową.

## Jakie dane musi zbierać MES, żeby paszport dało się wystawić

Paszport bateryjny to około **90 atrybutów danych z siedmiu klastrów treściowych**, podzielonych na trzy warstwy dostępu: dane publiczne (identyfikacja, ślad węglowy, przydatność do recyklingu), dane dla organów nadzoru (wyniki badań, certyfikaty, deklaracja zgodności) oraz dane dla serwisu i recyklingu (instrukcje demontażu, stan zdrowia baterii, historia cykli ładowania) — tak wynika z opracowania konsorcjum Battery Pass (Battery Pass Consortium, 2024; lista atrybutów aktualizowana w styczniu 2025 pod DIN DKE SPEC 99100).

Te dane pochodzą z trzech różnych miejsc i to rozkłada projekt na trzy działy:

- **Z systemu ERP i dokumentacji zakupowej** — dane dostawców, deklaracje materiałowe, certyfikaty. To nie jest praca dla MES.
- **Z laboratorium i działu jakości** — wyniki badań, deklaracja zgodności.
- **Z hali, czyli z MES** — i to jest część, której nie da się kupić ani dopisać po fakcie: kiedy powstała dana sztuka, na jakiej maszynie, przy jakich nastawach, z jakiej partii materiału, ile energii zużyto, jakie zdarzenia i przestoje wystąpiły w trakcie.

Ten ostatni punkt decyduje o zgodności, bo ślad węglowy na poziomie sztuki liczy się **z rzeczywistego zużycia energii przypisanego do zlecenia**, a nie ze średniej rocznej podzielonej przez liczbę wyrobów. Jeżeli macie opomiarowanie energii na poziomie maszyny i wiecie, które zlecenie na niej wtedy szło — macie z czego liczyć. Jeżeli nie — zostaje szacowanie, które audytor ma prawo zakwestionować.

## Jak to wygląda w architekturze systemu — na przykładzie OmniMES

Pokażę to na naszym systemie, bo łatwiej mówić o konkretach niż o diagramie z prezentacji.

OmniMES zbiera telemetrię z maszyn przez MQTT w standardzie Sparkplug B i zapisuje ją do PostgreSQL z rozszerzeniem TimescaleDB — pomiary trafiają do hypertable, co przy dziesiątkach milionów rekordów dziennie ma bezpośrednie przełożenie na czas odpowiedzi zapytań historycznych. Obok telemetrii system prowadzi harmonogram produkcji ze zleceniami (maszyna, linia, okno czasowe, wolumen, osoba przypisana) oraz statusy zleceń z liczbą sztuk wykonanych i wadliwych. Zdarzenia z maszyn — przestoje, mikroprzestoje, przekroczenia progów — zapisywane są z sygnaturami czasu początku i końca oraz przypisaniem do maszyny.

To daje **oś czasu**: dla dowolnego okna czasowego wiadomo, co działo się na danej maszynie i jakie zlecenie wtedy szło. Jest to solidna podstawa genealogii — ale sama w sobie jeszcze nie jest genealogią sztuki.

Brakuje jednego wiązania i tu będę szczery, bo to typowa luka **większości wdrożeń MES**, nie tylko naszego: **tożsamości egzemplarza**. Żeby z osi czasu zrobić paszport, trzeba dołożyć trzy rzeczy:

1. **Identyfikator sztuki albo partii wyrobu** nadawany na pierwszej operacji, zgodny z jednym ze schematów z EN 18219 — w praktyce najczęściej GS1 Digital Link, bo ten sam kod QR obsługuje jednocześnie logistykę i odnośnik do paszportu.
2. **Odczyt identyfikatora na każdej operacji**, żeby zdarzenia i pomiary wiązały się z egzemplarzem, a nie tylko z maszyną i godziną.
3. **Rejestrację zużycia materiału z numerem partii dostawcy** w momencie pobrania na stanowisko — to jest powiązanie, którego nie da się odtworzyć później.

Dopiero mając te trzy elementy, zapytanie „pokaż wszystko, co dotyczy sztuki X" zwraca komplet: zlecenie, maszynę, nastawy, zużyte partie, zdarzenia z okna produkcji i zużycie energii przypisane do tego okna. Reszta paszportu — certyfikaty, deklaracje materiałowe — dochodzi z ERP i z jakości.

Sensowna kolejność prac jest więc taka: **najpierw tożsamość i zużycie materiału, potem integracja z rejestrem DPP**. Odwrotna kolejność kończy się rejestracją identyfikatorów, pod którymi nie ma czego pokazać.

## Kto to już robi

Miarodajne są firmy, które przeszły pełny cykl, a nie pilotaże pokazowe.

**Motoryzacja** jest tu najdalej, bo genealogia była tam wymagana na długo przed paszportem — przez IATF 16949 i wymagania klientów OEM. Producenci akumulatorów trakcyjnych budujący fabryki w Europie projektują linie od razu ze znakowaniem sztukowym i rejestracją zużycia elektrolitu partiami, bo wiedzą, że bez tego nie sprzedadzą do OEM-a.

**Spożywcze i farmacja** mają genealogię partii od lat, wymuszoną przepisami o bezpieczeństwie żywności i GDP. Ich wyzwaniem nie jest zbieranie danych, tylko rozdzielczość — przejście z partii na sztukę.

**Stal i aluminium** to grupa, która wchodzi jako pierwsza w ESPR. Tutaj identyfikacja wsadu i powiązanie z wytopem istnieje od dawna w dokumentacji hutniczej — pracą do wykonania jest przeniesienie tego do formatu, który da się wystawić maszynowo przez API.

Wspólny mianownik: **nikt nie zaczynał od paszportu**. Wszyscy zaczynali od genealogii wymuszonej wcześniej przez jakość, reklamacje albo bezpieczeństwo — a paszport okazał się nakładką na już istniejące dane.

## Ile kosztuje brak genealogii

Liczby z rynku amerykańskiego dają skalę problemu: **w pierwszym kwartale 2026 firmy w USA wycofały z rynku 492 mln sztuk produktów — o 27% więcej niż kwartał wcześniej** (Sedgwick, US Recall Index, 2026). Średnie wycofanie w branży spożywczej to **10 mln USD kosztów bezpośrednich**, nie licząc szkód wizerunkowych i utraconych kontraktów. W motoryzacji pojedyncza niezgodność bez udokumentowanej genealogii potrafi zatrzymać linię, a koszt takiego postoju liczony jest w **250 tys. USD za godzinę** (Metalphoto of Cincinnati, 2026).

Mechanizm oszczędności jest prosty i nie wymaga wiary w transformację cyfrową: z pełną genealogią wycofujecie **te sztuki, które faktycznie dostały wadliwy komponent**, zamiast wszystkiego, co powstało w podejrzanym oknie. Różnica między „dwa tygodnie produkcji" a „trzysta sztuk" to zwykle różnica między kryzysem a incydentem.

Dochodzi do tego koszt, którego nie widać w tabelce: czas. Wycofanie prowadzone na podstawie dokumentów papierowych i arkuszy zajmuje tygodnie. Prowadzone na podstawie zapytania do bazy — godziny.

## Bariery — uczciwie

Nie chcę sprzedawać obrazka, w którym wystarczy włączyć moduł.

**Dane od dostawców to najsłabsze ogniwo.** Paszport wymaga informacji o materiałach, których wasza fabryka nie wytwarza. Jeżeli dostawca przysyła certyfikat w PDF-ie, a wy potrzebujecie wartości w formacie maszynowym, problem przenosi się o szczebel wyżej w łańcuchu dostaw — i tam nikt nie ma terminu 18 lutego wpisanego w budżet. W praktyce oznacza to renegocjację wymagań w umowach zakupowych, co trwa dłużej niż wdrożenie techniczne.

**Znakowanie kosztuje i spowalnia linię.** Dołożenie znakowania i odczytu na każdej operacji to nie jest zmiana konfiguracji — to inwestycja w sprzęt, czas cyklu i przeprojektowanie stanowisk. Na liniach o krótkim takcie sekundy mają znaczenie.

**Retencja danych na dekadę zmienia projekt bazy.** Paszport musi być dostępny przez cały cykl życia wyrobu. Telemetria o rozdzielczości sekundowej dla całej fabryki przez dziesięć lat to wolumen, którego nie utrzymacie w gorącej bazie bez świadomej polityki agregacji i archiwizacji. Trzeba z góry rozstrzygnąć, co zostaje w pełnej rozdzielczości, a co agregujecie — i pamiętać, że danych już zagregowanych nie odzyskacie.

**Normy są świeże, a dwie wciąż w opracowaniu.** Sześć norm JTC 24 jest opublikowanych, ale prEN 18239 i prEN 18246 nie. Projekt trzeba więc prowadzić tak, żeby zmiana szczegółu w normie nie wymagała przebudowy modelu danych — czyli oddzielić to, co zbieracie na hali, od tego, jak to potem wystawiacie na zewnątrz.

**Pięć miesięcy to mało.** Jeżeli dziś nie macie żadnego śledzenia sztukowego, do lutego nie zbudujecie pełnej zgodności. Da się natomiast zamknąć rzeczy, których później nie da się nadrobić — o tym niżej.

## Co realnie zrobić do lutego

Kolejność ma znaczenie, bo część rzeczy jest nieodwracalna: danych, których dziś nie zapiszecie, w styczniu nie wymyślicie.

**Teraz, niezależnie od reszty projektu:**

1. **Zarejestrujcie się jako zweryfikowany podmiot gospodarczy.** To jednorazowa weryfikacja tożsamości, nie ma terminu przypisanego do grupy produktowej i nie zależy od gotowości systemów. Blokuje wszystko, co dalej.
2. **Zacznijcie zapisywać zużycie materiału z numerem partii dostawcy.** Nawet jeśli reszta paszportu jeszcze nie stoi — to jest powiązanie, którego nie odtworzycie z faktur.

**W ciągu miesiąca:**

3. **Zróbcie inwentaryzację danych**: wypiszcie około 90 atrybutów i przy każdym zanotujcie, skąd pochodzi (ERP, jakość, MES, dostawca) i czy dziś w ogóle istnieje. Zwykle okazuje się, że MES ma już więcej, niż się wydawało, a prawdziwa luka siedzi po stronie dostawców.
4. **Wybierzcie schemat identyfikacji zgodny z EN 18219** i rozstrzygnijcie rozdzielczość — partia czy sztuka. Tej decyzji nie da się odłożyć, bo determinuje sprzęt.

**W ciągu trzech miesięcy:**

5. **Uruchomcie znakowanie i odczyt na operacjach krytycznych** — nie na wszystkich naraz. Krytyczne są te, na których wchodzi materiał podlegający deklaracji, oraz te, po których wyrób zmienia tożsamość.
6. **Przepnijcie ślad węglowy na rzeczywiste zużycie energii per zlecenie**, jeśli macie opomiarowanie. Jeśli nie macie — to ostatni moment, żeby je dołożyć.

**Test końcowy**, ten sam, który zrobi audytor: **weźcie losową sztukę z magazynu i spróbujcie w ciągu godziny odtworzyć jej pełną historię**. Jeśli się nie da — wiecie, gdzie jest dziura. Zróbcie to ćwiczenie w listopadzie, a nie w lutym.

## Paszport jest formatem, nie źródłem danych

Paszport produktu jest formatem wymiany danych, nie źródłem danych. Źródłem jest hala — i to, co system zapisał w chwili, gdy wyrób powstawał. Fabryki, które mają genealogię, dopisują do niej warstwę paszportową w kilka tygodni. Fabryki, które jej nie mają, odkrywają w styczniu, że nie ma czego eksportować.

Pięć miesięcy nie wystarczy na zbudowanie wszystkiego. Wystarczy natomiast na zamknięcie rzeczy nieodwracalnych: rejestracji podmiotu, decyzji o rozdzielczości i zapisywania zużycia materiału z numerami partii. Reszta jest już pracą inżynierską.

## Źródła

- Komisja Europejska, *The Digital Product Passport Registry is now live*, 20 lipca 2026 — https://single-market-economy.ec.europa.eu/news/digital-product-passport-registry-now-live-2026-07-20_en
- Cleo Labs, *EU product passport registry 2026 — the one step every brand must complete first*, 2026 — https://www.cleolabs.co/en/blog/eu-product-passport-registry-2026
- Regen Studio, *The DPP System Standards Are Here: A Field Guide to CEN/CENELEC JTC 24 Eight Standards*, 2026 — https://www.regenstudio.world/blog/dpp-system-standards/
- GS1 EU, *GS1 Standards enabling the EU digital product passport*, 2024 — https://gs1.eu/wp-content/uploads/2024/12/GS1-Standards-Enabling-DPP.pdf
- Battery Pass Consortium, *Battery Passport Content Guidance* oraz *Data Attribute Longlist* (aktualizacja styczeń 2025, zgodność z DIN DKE SPEC 99100) — https://thebatterypass.eu/assets/images/content-guidance/pdf/2023_Battery_Passport_Content_Guidance.pdf
- Circularise, *EU battery passport regulation requirements*, 2026 — https://www.circularise.com/blogs/eu-battery-passport-regulation-requirements
- passportcraft, *ESPR Working Plan 2025–2030: Timeline & Delegated Acts*, 2026 — https://passportcraft.com/insights/espr-timeline-what-brands-need-to-know
- Metalphoto of Cincinnati, *Traceability in Manufacturing: The Expert Guide (2026)* — dane o wycofaniach za Sedgwick US Recall Index — https://mpofcinci.com/blog/traceability-in-manufacturing-guide/
