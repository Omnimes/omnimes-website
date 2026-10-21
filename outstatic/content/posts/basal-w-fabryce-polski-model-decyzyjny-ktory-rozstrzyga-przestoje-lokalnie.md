---
title: 'Basal w fabryce: polski model decyzyjny, który rozstrzyga przestoje lokalnie'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'basal-w-fabryce-polski-model-decyzyjny-ktory-rozstrzyga-przestoje-lokalnie'
description: 'Basal Remigiusza Kinasa to otwarte modele typowanych decyzji dla polskiego i angielskiego, uruchamiane na własnym serwerze. Na przykładzie przestoju w OmniMES pokazujemy zapytanie, macierz kosztów, odsyłanie niepewnych przypadków do człowieka i uczciwe porównanie z Jevem.'
coverImage: '/images/post-basal-decyzje/cover-basal-decyzje-pl.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"AI","label":"AI"},{"value":"aiLocal","label":"AI local"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-10-19T08:00:00.000Z'
---

We wrześniowym tekście o Jevie opisaliśmy model, który nie pisze odpowiedzi, tylko zwraca decyzję z prawdopodobieństwem. Jev ma jednak cechę, która w wielu zakładach zamyka temat na starcie: działa jako usługa w chmurze producenta. MES pracuje często w sieci zakładowej bez dostępu do chmury, a notatki operatorów i historia awarii mają zostać w zakładzie (basal.si5.pl, Kto używa, 2026).

29 września, sześć dni po tamtej publikacji, Remigiusz Kinas ogłosił basal-1.0 (Kinas, X, 2026). Basal działa na tej samej zasadzie co Jev, ale wagi i silnik są otwarte na licencji Apache-2.0, a tekstowa linia modeli powstała na polskim Bieliku. Poniżej sprawdzamy liczby autora i pokazujemy jedną decyzję przestojową w OmniMES rozstrzygniętą w zakładzie.

## Czym jest Basal

Basal to silnik inferencji i rodzina modeli „typowanych decyzji” dla polskiego i angielskiego, wprost inspirowana modelami typu System 1, takimi jak Jev (GitHub basal, 2026). Model czyta stan, czyli wiadomość, dokument albo rekord JSON, i zwraca prawdopodobieństwo każdej dozwolonej odpowiedzi. Robi to w jednym przebiegu, bez generowania tekstu, więc odpowiedź nie może wyjść poza listę opcji.

W trzy tygodnie ukazały się: basal-1.0 we wrześniu 2026, basal-1.5 4 października, basal-2.0 z eksperymentalną linią basal-omni 12 października, silnik 2.2 z kalibracją na własnych danych 19 października (basal.si5.pl, 2026).

### Typy pytań

- `choice`: jedna z 2–255 opcji opisanych słowami;
- `noul`: prawdopodobieństwo, że twierdzenie jest prawdziwe;
- `score`: rozkład po uporządkowanej skali i poziom oczekiwany;
- `multi`: osobne prawdopodobieństwo dla każdej etykiety;
- `act`: działanie o najniższym oczekiwanym koszcie według macierzy kosztów;
- `tool`: następny krok agenta z definicji narzędzi OpenAI lub MCP.

`act` i `tool` autor oznacza jako eksperymentalne, poniżej jakości produkcyjnej (GitHub basal, FEATURES, 2026).

Dla hali liczą się dwa mechanizmy. SOAM („state once, ask many”) przetwarza stan raz i odpowiada na nim na wszystkie pytania żądania. `max_error` w pytaniu `act` lub `tool` ustala docelowy błąd, na przykład 0,05: gdy pewność jest poniżej progu certyfikowanego dla tego celu, silnik odmawia działania automatycznego i zwraca `"deferred": true`.

### Rodzina modeli

| Model | Parametry | Model bazowy | Uwagi autora |
|---|---|---|---|
| basal-2.0-mini | 1,5 mld | Bielik v3 | duże wolumeny, laptopy; kontekst 8192 tokeny |
| basal-2.0 | 4,5 mld | Bielik v3 | model główny; kontekst 32 768 tokenów |
| basal-2.0-max | 11 mld | Bielik v3 | najtrafniejszy w linii tekstowej |
| basal-omni-1.0-mini | 4 mld | Gemma 4 | tekst, obraz, dźwięk; ok. 16 GB pamięci GPU |
| basal-omni-1.0-max | 12 mld | Gemma 4 | tekst, obraz, dźwięk; ok. 24 GB pamięci GPU |
| basal-omni-1.0-ultra | 31 mld | Gemma 4 | tekst i obraz, bez dźwięku |

Źródło: GitHub basal oraz karta modelu na Hugging Face (2026). Bazy to Bielik v3 (SpeakLeash i ACK Cyfronet AGH) oraz Gemma 4 (Google), obie na licencji Apache-2.0.

## Co mówią liczby, a czego nie mówią

Jedyny pełny zestaw porównawczy pochodzi od autora. Werdykt to ukryty benchmark: 10 kategorii po polsku i angielsku, 5000 decyzji, których treść nie jest publikowana. Tablica z 16 października obejmuje 102 systemy (basal.si5.pl, Werdykt, 2026).

| System | Trafność PL i EN | Błąd kalibracji (ECE) | Czas p50 | USD za 1000 decyzji |
|---|---|---|---|---|
| basal-2.0-mini | 0,618 | 0,035 | 15,5 ms | 0,010 |
| basal-2.0 (4.5B) | 0,729 | 0,060 | 25,0 ms | 0,034 |
| basal-2.0-max | 0,784 | 0,044 | 37,4 ms | 0,068 |
| basal-omni-1.0-max | 0,823 | — | 76,2 ms | 0,263 |
| Jev 1.14 (API) | 0,822 | — | 267,6 ms | 0,071 |
| Gemini 3.8 Flash (API) | 0,996 | — | 3314,5 ms | 2,530 |

Źródło: tablica Werdyktu i README projektu (2026).

**To liczby autora, nie niezależna weryfikacja.** Pytań Werdyktu nikt z zewnątrz nie powtórzy, a sama tablica zastrzega, że wynik „nie jest oceną całego produktu ani gwarancją poprawności w nowym procesie”. Zewnętrzny ranking JevBench serwisu Benchmark Heaven obejmuje tylko eksperymentalny basal-omni-1.0-ultra, będący tam w czołówce; modeli basal-2.0 w nim nie ma (Benchmark Heaven, stan na 19.10.2026).

**Czas i koszt mierzono w różnych warunkach.** Basal liczono na jednym H100 przy pełnym obciążeniu, po stawce 3,95 USD za godzinę; przy małym ruchu decyzja kosztuje więcej. Czasy Jeva i Gemini to wywołania API dostawców.

**Ceną jest trafność.** Autor pisze to wprost na blogu projektu (Kinas, 2026). Jev 1.14 jest trafniejszy od każdego tekstowego modelu basal-2.0, a duże modele API rozstrzygają Werdykt prawie bezbłędnie. Innych liczb nie mieszamy z tą tabelą. Podawane przez nas we wrześniu 67,8% Jeva to wynik własnej ewaluacji TypeSafe na czterech procesach (DataCamp, 2026), a pierwsze wpisy autora porównywały basal-1.0 z Jevem na osobnym, polskim zbiorze (Kinas, X, 29.09.2026).

### Kategorie i automatyzacja

Najsłabiej wypadają „reguły i terminy”: basal-2.0 (4.5B) ma tu 0,350, czołowe modele API 1,000. Najlepiej kierowanie zgłoszeń, decyzje RAG i rzeczywiste dokumenty, gdzie max osiąga 0,966–0,974 (Kinas, blog basal-2.0, 2026). W naszej ocenie kodowanie przyczyny przestoju jest w istocie kierowaniem zgłoszenia, a pytanie, czy przegląd jest po terminie, to reguła z datą i należy do SQL.

W Werdykcie próg dobrany do celu 5% błędu przyjmuje automatycznie 51,3% decyzji modelu 4.5B przy zmierzonym błędzie 5,08%. Na rodzinach pytań nieobecnych w treningu jest to 33,2% przy błędzie 2,39%, a progu dla 1% dołączony plik kalibracji nie certyfikuje (Hugging Face, 2026). Nowa dziedzina, taka jak przestoje, wymaga więc kalibracji na własnych danych. W przykładzie autora `basal-calibrate` obniżył błąd kalibracji około 3,2 razy dla `choice`, 2 razy dla `score` i o 30% dla pytań tak lub nie (GitHub basal, 2026).

## Praktyczny przykład: sprężyna w podajniku

Scenariusz jest przykładowy. Linia L2, godzina 6:42. Podajnik detali przed prasą stoi od siedmiu minut, sterownik zgłasza alarm braku podawania. Operator wpisuje w panelu OmniMES: „znowu poszła sprężyna w podajniku, wymieniłem na zapasową, ale ta też słabo trzyma”.

MES najpierw liczy czas postoju, liczbę podobnych postojów z ostatniej doby i stan sygnałów. Fakty trafiają do stanu jako gotowe wartości, bo arytmetyka jest słabym punktem decyzji w jednym przebiegu. Każdą przyczynę ze słownika zakładu opisuje zdanie, nie sam kod. Żądanie idzie do lokalnego serwera `basal-serve --model Remek/basal-2.0-4.5B --mode fast --template-prefix off --port 8000`, na adres `POST /v1/systemone`.

```json
{
  "state": {
    "linia": "L2, podajnik detali przed prasą",
    "czas_postoju_min": 7,
    "alarm_plc": "E217 brak podawania",
    "sygnaly": {"predkosc_podajnika": 0, "czujnik_detalu": false},
    "podobne_postoje_24h": "2 (21:15, 12 min, MECH-PODAJNIK; 03:40, 9 min, MECH-PODAJNIK)",
    "notatka_operatora": "znowu poszła sprężyna w podajniku, wymieniłem na zapasową, ale ta też słabo trzyma"
  },
  "questions": {
    "przyczyna": {
      "type": "choice",
      "instructions": "Jaka jest przyczyna postoju według słownika zakładu?",
      "criteria": {
        "MECH-PODAJNIK": "Usterka mechaniczna podajnika: sprężyny, rolki, prowadnice, zacięcia",
        "ELEK-NAPED": "Usterka elektryczna lub napędu: silnik, falownik, zabezpieczenia",
        "MAT-BRAK": "Brak materiału lub detali z logistyki",
        "MAT-JAKOSC": "Materiał niezgodny: wymiar, wada, zła partia",
        "PRZEZBROJENIE": "Planowane przezbrojenie lub zmiana zlecenia",
        "ORGANIZACJA": "Brak operatora, przerwa, odprawa",
        "NIEUSTALONA": "Z opisu i sygnałów nie da się ustalić przyczyny"
      }
    },
    "wezwac_ur": {
      "type": "noul",
      "instructions": "Czy zgłoszenie wymaga wezwania utrzymania ruchu?"
    },
    "pilnosc": {
      "type": "score",
      "instructions": "Jak pilna jest interwencja?",
      "criteria": ["do najbliższego przeglądu", "w ciągu zmiany", "w ciągu godziny", "natychmiast"]
    },
    "reakcja": {
      "type": "act",
      "instructions": "Czy bez interwencji utrzymania ruchu usterka wróci w tej zmianie?",
      "criteria": {
        "true": "Usterka wróci, potrzebna naprawa przez UR",
        "false": "Operator usunął przyczynę, praca może trwać"
      },
      "costs": {
        "kontynuuj":           {"true": 900, "false": 0},
        "zatrzymaj_i_sprawdz": {"true": 200, "false": 30},
        "wezwij_ur":           {"true": 40,  "false": 150},
        "brygadzista":         {"true": 70,  "false": 70}
      },
      "defer_action": "brygadzista",
      "max_error": 0.05
    }
  }
}
```

Koszty w macierzy są przykładowe; w praktyce szacuje je zakład, w złotówkach. Silnik liczy dla każdego działania koszt oczekiwany (suma iloczynów prawdopodobieństwa wyniku i kosztu) i wybiera najtańsze. Z tej przykładowej macierzy wynika (nasze wyliczenie), że kontynuacja wygrywa tylko przy prawdopodobieństwie powrotu usterki poniżej około 4%, krótkie sprawdzenie w przedziale 4–24%, wezwanie UR powyżej około 73%, a pomiędzy taniej jest zapytać brygadzistę. Dokumentacja ostrzega przed przesadnie wysokim kosztem błędu, bo silnik odracza wtedy decyzję z samego rachunku kosztów (Hugging Face, 2026).

`noul` i `act` pytają tu o zbliżoną rzecz celowo. `noul` daje surowe prawdopodobieństwo do raportów UR i wymaga progu dobranego ręcznie, a `act` zamienia ocenę na działanie według kosztów.

### Przykładowa odpowiedź

**Wszystkie wartości poniżej, łącznie z prawdopodobieństwami i czasem, są ilustracyjne. Nie pochodzą z uruchomienia modelu.** Struktura jest zgodna z dokumentacją API.

```json
{
  "model": "basal-2.0-4.5B",
  "answers": {
    "przyczyna": {
      "type": "choice", "choice": "MECH-PODAJNIK",
      "probabilities": {"MECH-PODAJNIK": 0.91, "ELEK-NAPED": 0.04, "MAT-JAKOSC": 0.02,
                        "NIEUSTALONA": 0.02, "MAT-BRAK": 0.01, "PRZEZBROJENIE": 0.0, "ORGANIZACJA": 0.0},
      "confidence": 0.91
    },
    "wezwac_ur": {"type": "noul", "noul": 0.88, "probabilities": {"true": 0.88, "false": 0.12}, "confidence": 0.88},
    "pilnosc": {
      "type": "score", "score": 2.1,
      "legend": {"0": "do najbliższego przeglądu", "1": "w ciągu zmiany", "2": "w ciągu godziny", "3": "natychmiast"},
      "probabilities": {"0": 0.03, "1": 0.17, "2": 0.47, "3": 0.33}, "confidence": 0.47
    },
    "reakcja": {
      "type": "act", "action": "brygadzista", "refused": "wezwij_ur", "deferred": true,
      "expected_costs": {"kontynuuj": 774.0, "zatrzymaj_i_sprawdz": 176.2, "wezwij_ur": 55.4, "brygadzista": 70.0},
      "answer": "true", "probabilities": {"true": 0.86, "false": 0.14},
      "confidence": 0.86, "calibration": "validated"
    }
  },
  "usage": {"input_tokens": 640, "output_tokens": 0, "questions": 4, "branches": 4, "latency_ms": 48}
}
```

Jak MES czyta tę odpowiedź:

- **Przyczyna** MECH-PODAJNIK z pewnością 0,91. `max_error` działa tylko w `act` i `tool`, więc dla `choice` próg stosuje kod OmniMES. Powyżej progu kod przyczyny wpisuje się sam z oznaczeniem, że nadał go model; poniżej operator dostaje dwie lub trzy podpowiedzi.
- **Pilność** 2,1 na skali 0–3, z 33% na „natychmiast”, więc zgłoszenie trafia wysoko w kolejce UR.
- **Reakcja.** Najniższy koszt oczekiwany ma wezwanie UR (55,4), ale w tej ilustracji pewność 0,86 jest poniżej progu certyfikowanego dla celu 5%. Silnik odrzuca działanie automatyczne i oddaje sprawę brygadziście, który widzi podpowiedź, koszty i notatkę.

## Jak to wpiąć w OmniMES

To nasz plan integracji, nie gotowa funkcja systemu.

1. **Zdarzenie.** Stream zapisuje zmianę stanu maszyny z MQTT Sparkplug B, a gdy operator dopisze notatkę, backend składa stan z sygnałów, faktów z SQL, notatki i słownika.
2. **Lokalny serwer.** Zadanie w tle wysyła żądanie do `basal-serve` w sieci zakładu; zewnętrzne API nie jest potrzebne. Interfejs HTTP nie ma uwierzytelniania, więc serwer nasłuchuje na 127.0.0.1 albo stoi za bramką (GitHub basal, 2026).
3. **Zapis decyzji.** W bazie zostaje pełny stan, treść pytań i kryteriów, rozkład prawdopodobieństw, działanie, flaga `deferred`, model, wersja silnika, skrót pliku kalibracji oraz to, kto decyzję potwierdził lub zmienił. Basal nie pisze uzasadnień, więc tylko taki zapis odtworzy rozstrzygnięcie po miesiącach.
4. **Progi.** Powyżej certyfikowanego progu zapis automatyczny, poniżej podpowiedzi dla operatora, odroczone `act` do brygadzisty. Alarm bezpieczeństwa omija model regułą w kodzie.
5. **Walidacja.** Bierzecie 500 historycznych przestojów z kodem potwierdzonym przez UR: część do `basal-calibrate`, reszta do sprawdzenia. Kilkaset przykładów zwykle certyfikuje cel 5%; cel 1% wymaga w praktyce około 1000 (GitHub basal, API, 2026). Kalibrujcie na tym samym silniku i kwantyzacji, które pójdą na produkcję (Kinas, blog basal 2.2, 2026). Tryb cichy z [artykułu o Jevie](/blog/jev-w-przemysle-gdy-decyzja-kosztuje-mniej-niz-jeden-token) obowiązuje bez zmian.

Zapis z punktu 3 ma wymiar prawny. AI Act wymaga od systemów wysokiego ryzyka automatycznego rejestrowania zdarzeń (art. 12) i skutecznego nadzoru człowieka (art. 14). W naszej interpretacji kodowanie przestojów z decyzją oddawaną ludziom zwykle nie jest takim systemem, o czym pisaliśmy przy [klasyfikacji funkcji MES](/blog/eu-ai-act-sierpien-2026-ktore-funkcje-mes-kwalifikuja-sie-jako-high-risk-ai). Granica przebiega tam, gdzie model sam zatrzymuje maszynę albo ocenia pracowników.

### Sprzęt

Model 4.5B w pakiecie FP8 zajmuje 4,9 GB, w GGUF Q8_0 4,8 GB, a na Macu z M4 Pro port MLX odpowiada na pytanie w 278 ms (Hugging Face, 2026). Mini działa też na CPU, do testów. Jeden z użytkowników uruchamia basal-1.5 (4.5B) na karcie RTX 3060 i podaje około sekundy na pozycję (basal.si5.pl, 2026). Nasz szacunek, nie pomiar: przy typowym wolumenie zdarzeń przestojowych wystarczy jedna stacja robocza z GPU.

## Basal i Jev: porównanie bez kibicowania

| Kryterium | Jev | Basal |
|---|---|---|
| Dostarczanie | API w chmurze TypeSafe | otwarte wagi Apache-2.0 na własnym sprzęcie |
| Trafność w Werdykcie | 0,822 (Jev 1.14) | 0,729 (4.5B), 0,784 (max) |
| Czas p50 w Werdykcie | 267,6 ms przez API | 25,0 ms na H100 |
| Koszt w Werdykcie | 0,071 USD za 1000 decyzji | 0,034 USD przy pełnym obciążeniu GPU |
| Kalibracja | po stronie dostawcy | własna, przez `basal-calibrate` |
| Utrzymanie | dostawca | zakład: GPU, aktualizacje, monitoring |

Wiersz „Utrzymanie” to nasza ocena. Jev wygrywa trafnością i tym, że nie trzeba utrzymywać serwera. Basal wygrywa tam, gdzie dane nie mogą wyjść poza zakład, sieć nie ma internetu, a czas odpowiedzi nie może zależeć od łącza. Autor podkreśla, że hostowanego API decyzyjnego nie da się skalibrować na własnych danych, a modelu basal tak (GitHub basal, 2026).

Żaden z nich nie pisze uzasadnień ani nie liczy. Basal jest przy tym młodym projektem: autorem jest Remigiusz Kinas, a pięć osób dołożyło zmiany przez pull requesty (GitHub basal, 2026). Wersje trzeba przypinać, a po każdej zmianie modelu sprawdzać progi od nowa, bo każdy model ma własny plik kalibracji (Kinas, blog basal-2.0, 2026).

## Kto wdraża

Na 19 października 2026 nie znaleźliśmy publicznie udokumentowanego wdrożenia produkcyjnego w przemyśle z opublikowanymi wynikami. Model ma kilka tygodni. Projekt prowadzi księgę zastosowań z 19 historiami przysyłanymi przez użytkowników i publikowanymi po moderacji; to deklaracje, nie zweryfikowane studia przypadków (basal.si5.pl, Kto używa, 2026). Najbliżej produkcji są:

- **Leksio:** klasyfikacja orzeczeń sądowych i interpretacji podatkowych, model lokalnie na własnym GPU, wyniki sprawdzane przed zapisaniem;
- **Visacom:** dopasowanie pozycji wyciągu bankowego do faktur w SAP Business One; Basal wybiera fakturę spośród najwyżej sześciu kandydatów, pozycje poniżej progu przypisuje księgowa, a pomiar trafności trwa;
- **Puentoo ERP:** przed startem, Basal w pierwszych modułach (poczta, bramka akcji asystenta, kontrola dokumentów);
- **OmniMES:** nasz wpis o klasyfikacji przyczyn awarii i postojów, ze statusem „planowane wdrożenie” i walidacją na historycznych zgłoszeniach jako pierwszym krokiem.

Autor wymienia przypadki biznesowe: kontrolę dokumentacji zamówienia, obsługę zgłoszeń, zgodność z zasadami firmy, pokrycie odpowiedzi w źródłach RAG, krok agenta oraz decyzje ze skanów, zdjęć i nagrań (basal.si5.pl, 2026). Przemysłu nie ma wśród nich jako kategorii.

## Bariery i ograniczenia

- **Obliczenia.** Reguły, terminy i progi zostają w kodzie; opcja `"facts": "auto"` dolicza daty i kwoty tylko w polskim tekście.
- **Funkcje eksperymentalne.** `act`, `tool` i `multi` z wieloma etykietami wymagają człowieka w pętli.
- **Kontekst.** Mini ma 8192 tokeny; dłuższy stan jest przycinany w środku.
- **Wiedza modelu.** Reguły i fakty trzeba podać w stanie, bo mały model wie niewiele o świecie.
- **Media.** basal-omni czyta obrazy i dźwięk bez treningu na mediach, z kalibracją z tekstu, więc wymaga osobnej walidacji.
- **Ludzie.** Decyzje o poważnych skutkach dla ludzi, na przykład ocenę operatorów, powinien sprawdzać człowiek (GitHub basal, 2026).

## Co z tego wynika dla zakładu

Basal nie jest trafniejszy od Jeva ani od dużych modeli. Daje decyzję na serwerze w zakładzie, w dziesiątkach milisekund na GPU klasy H100 i w ułamku sekundy na Macu, z kalibracją dopasowaną do własnego słownika i otwartą licencją.

Zacznijcie od modelu 4.5B i jednego słownika, najlepiej przyczyn przestojów. Opiszcie każdą przyczynę zdaniem i dodajcie opcję „nie da się ustalić”. Wyeksportujcie 500 zdarzeń, uruchomcie `basal-calibrate`, przez dwa tygodnie liczcie w trybie cichym i od pierwszego dnia zapisujcie pełny ślad. Działania z `act` niech na początku trafiają do ludzi jako podpowiedź; automatyczne wezwanie UR włączcie dopiero po porównaniu z decyzjami brygadzistów.

Model jest gotowy do testu na własnych danych, nie do zaufania na słowo. Zakład z uporządkowanym słownikiem i 500 opisanymi przestojami sprawdzi go, w naszej ocenie, w dwa tygodnie, bez wysyłania jednego rekordu poza własną sieć.

## Źródła

- Remigiusz Kinas, repozytorium *basal*: README i dokumentacja, GitHub, 2026 — https://github.com/rkinas/basal
- Hugging Face, karta modelu `Remek/basal-2.0-4.5B`, 2026 — https://huggingface.co/Remek/basal-2.0-4.5B
- basal.si5.pl, strona projektu — https://basal.si5.pl/
- basal.si5.pl, *Werdykt*, eksport z 16 października 2026 — https://basal.si5.pl/benchmark/
- Remigiusz Kinas, *basal-2.0 i basal-omni: więcej decyzji na sekundę, lepsza kalibracja, obraz i dźwięk*, 12 października 2026 — https://basal.si5.pl/blog/basal-2-0/
- Remigiusz Kinas, *Silnik basal 2.2: kalibracja na własnych danych*, 19 października 2026 — https://basal.si5.pl/blog/basal-2-2/
- basal.si5.pl, *Kto używa basal*, stan na 19 października 2026 — https://basal.si5.pl/kto-uzywa/
- Remek Kinas, wpis na X o basal-1, 29 września 2026 — https://x.com/KinasRemek/status/2104805264528413012
- Remek Kinas, wpis na X o basal-1.5, 4 października 2026 — https://x.com/KinasRemek/status/2106639959004176440
- Benchmark Heaven, *JevBench*, październik 2026 — https://benchmarkheaven.com/jev-models
- OmniMES, *Jev w przemyśle: gdy decyzja kosztuje mniej niż jeden token*, 23 września 2026 — https://www.omnimes.com/pl/blog/jev-w-przemysle-gdy-decyzja-kosztuje-mniej-niz-jeden-token
- DataCamp, *Jev: TypeSafe's System One Model Explained*, 16 września 2026 — https://www.datacamp.com/blog/system-one-models-jev
- AI Act (rozporządzenie (UE) 2024/1689), art. 12 i art. 14 — https://artificialintelligenceact.eu/article/12/ oraz https://artificialintelligenceact.eu/article/14/
