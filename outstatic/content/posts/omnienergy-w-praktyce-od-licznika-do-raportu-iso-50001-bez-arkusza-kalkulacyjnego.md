---
title: 'OmniEnergy w praktyce: od licznika do raportu ISO 50001 bez arkusza kalkulacyjnego'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'omnienergy-w-praktyce-od-licznika-do-raportu-iso-50001-bez-arkusza-kalkulacyjnego'
description: 'Przechodzimy przez moduł OmniEnergy w tej kolejności, w jakiej pracuje się w aplikacji: od podłączenia licznika, przez konfigurację ZWE i wskaźniki WEE, po porównanie okresów, harmonogram i raport w PDF. Pokazujemy też, dlaczego system zapisuje, kto wpisał wartość ręczną, pomija niekompletne migawki i blokuje porównania okresów różnej długości — bo od tego zależy, czy dane obronią się na audycie ISO 50001.'
coverImage: '/images/post-omnienergy-praktyka/cover-omnienergy-praktyka.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"omniEnergy","label":"OmniEnergy"},{"value":"iso50001","label":"ISO 50001"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-09-28T08:00:00.000Z'
---

Większość zakładów, które mówią „monitorujemy energię", ma liczniki, bazę z odczytami i arkusz kalkulacyjny, w którym raz w miesiącu ktoś skleja jedno z drugim. Arkusz działa do pierwszego audytu. Audytor pyta, skąd wzięła się liczba sztuk w marcu, kto ją wpisał i czy wskaźnik za luty liczono z tego samego mianownika. Wtedy okazuje się, że odpowiedź zna jedna osoba albo trzecia wersja pliku „energia_2026_final_poprawiony".

Termin jest konkretny. Dyrektywa (UE) 2023/1791 w sprawie efektywności energetycznej wymaga w art. 11, by przedsiębiorstwa zużywające średnio ponad 10 TJ energii rocznie (ok. 2,8 GWh) przeprowadziły audyt energetyczny do 11 października 2026 r., a te powyżej 85 TJ (ok. 23,6 GWh) miały wdrożony system zarządzania energią do 11 października 2027 r. Dla wielu zakładów to pierwsze spotkanie z audytorem, który ogląda dane, a nie deklaracje.

Poniżej przechodzimy przez moduł OmniEnergy w kolejności, w jakiej robi się to w aplikacji: od licznika do raportu, który trafia do dokumentacji przeglądu ISO 50001. Przy każdym kroku pokazujemy nie tylko, co się konfiguruje, ale też czego system pilnuje i dlaczego.

## 1. Źródła i punkty pomiarowe: skąd biorą się dane

Liczniki energii elektrycznej, gazu, sprężonego powietrza czy wody wysyłają odczyty po MQTT w formacie Sparkplug B — bezpośrednio albo przez sterownik lub bramkę komunikacyjną. OmniMES odbiera je z brokera i zapisuje każdy odczyt w TimescaleDB. O tym, jak ta baza radzi sobie z setkami milionów pomiarów dziennie, pisaliśmy w artykule [TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie).

W OmniEnergy nie podłącza się licznika drugi raz. Konfiguracja ma dwa poziomy:

- **Źródło pomiarów** to rodzaj sygnału, który już istnieje w systemie, np. energia czynna pobrana. Przy źródle ustawia się kategorię (energia, produkcja, media, środowisko, inne), sposób agregacji (suma, średnia, minimum, maksimum albo różnica) oraz to, czy jest źródłem głównym.
- **Punkt pomiarowy** wiąże źródło z konkretną maszyną w strukturze zakładu: serwer, linia, maszyna. Punkt nie kopiuje danych, tylko wskazuje sygnał, który i tak jest zbierany.

Przycisk „Odśwież punkty" przechodzi przez wszystkie źródła i tworzy punkty dla maszyn, które mają przypisany sygnał pomiarowy danego typu. Punkty, które przestały pasować — bo np. maszynie odpięto sygnał — są usuwane. Przy parku z kilkudziesięcioma maszynami to różnica między minutą a popołudniem przepisywania.

Sposób agregacji ma znaczenie przy licznikach narastających. Licznik energii pokazuje stan, a nie zużycie. Zużycie w okresie to różnica między ostatnim a pierwszym odczytem i tak liczy agregacja „różnica": pobiera dwa skrajne odczyty z okresu, zamiast sumować tysiące stanów licznika, co dałoby liczbę bez żadnego sensu fizycznego.

## 2. Konfiguracja ZWE: które maszyny naprawdę się liczą

ISO 50001 wymaga, żeby w przeglądzie energetycznym wskazać obszary znaczącego wykorzystania energii, czyli ZWE (ISO 50001:2018, pkt 6.3). W OmniEnergy konfiguracja ZWE to zapisany zakres analizy: serwer lub linia, dowolna liczba maszyn (pusta lista oznacza wszystkie maszyny w zakresie) oraz źródła (pusta lista oznacza monitorowane źródła główne).

Wygenerowanie ZWE dla wybranego okresu tworzy **migawkę**: ranking maszyn według zużycia, udział każdej z nich w sumie i udział skumulowany. Za znaczące uznawane są pozycje, które razem składają się na 80% zużycia, zgodnie z zasadą Pareto. Do ZWE wchodzi także maszyna, która przekracza próg 80%, bo to ona o nim przesądza.

Migawka jest samowystarczalna. Zapisuje nazwy maszyn, jednostki i okres z chwili, w której powstała. Jeśli za pół roku ktoś zmieni nazwę maszyny albo usunie ją ze struktury, raport z marca nadal pokaże to, co pokazywał w marcu. Dla audytora to warunek podstawowy: historia, która zmienia się wstecz, nie jest historią.

## 3. Wskaźniki WEE: licznik, mianownik i liczba spoza pomiarów

Wskaźnik efektywności energetycznej (WEE, w angielskiej wersji normy EnPI) to zwykle iloraz energii i produkcji, np. kWh na sztukę albo kWh na tonę (ISO 50001:2018, pkt 6.4; szczegółowe wytyczne w ISO 50006:2023). W OmniEnergy definicja WEE określa nazwę i jednostki, a konfiguracja linii bazowej (EnLB) mówi, skąd biorą się obie części ilorazu:

- **licznik** — automatycznie z licznika energii albo wpisywany ręcznie,
- **mianownik** — brak (wskaźnikiem jest wtedy sama energia), automatycznie z licznika produkcji albo wpisywany ręcznie.

Zmierzony mianownik to w wielu zakładach rzadkość. Liczba wyprodukowanych sztuk pochodzi z raportu zmianowego albo z ERP, a nie z czujnika na linii. Do wersji 4.4.0 wartość ręczna była stałą w konfiguracji, więc ta sama liczba trafiała do każdego okresu. Skutki widać na prostym przykładzie (liczby przykładowe):

| | Marzec | Kwiecień |
|---|---|---|
| Energia | 60 000 kWh | 48 000 kWh |
| Rzeczywista produkcja | 12 000 szt. | 8 000 szt. |
| WEE rzeczywisty | 5,0 kWh/szt. | 6,0 kWh/szt. |
| WEE ze stałą 10 000 szt. | 6,0 kWh/szt. | 4,8 kWh/szt. |

Rzeczywista efektywność pogorszyła się o 20%, a wykres liczony ze stałej pokazuje poprawę o 20%. Kierunek trendu jest odwrócony, choć nikt nie pomylił się w obliczeniach. Błąd tkwił w modelu danych.

Od wersji 4.4.0 wartość ręczną podaje się dla konkretnej migawki, czyli konkretnego okresu. Pierwszeństwo ma wartość z migawki, a dopiero gdy jej brak — stała z konfiguracji. Przy każdej wartości ręcznej system zapisuje, kto ją wprowadził i kiedy. Pomiar da się w każdej chwili odtworzyć z bazy, liczby przepisanej z raportu zmianowego już nie. Dlatego przy przeglądzie ISO 50001 musi być ona identyfikowalna co do osoby i daty.

## 4. Migawki i porównywarka okien czasowych ZWE

Pojedyncza migawka ZWE mówi, kto zużył najwięcej w danym okresie. Przegląd energetyczny pyta o coś innego: co się zmieniło. Do tego służy porównywarka okien czasowych ZWE. Wybiera się w niej od dwóch do 90 migawek tej samej konfiguracji, co wystarcza na kwartał dzień po dniu albo kilka lat przy migawkach miesięcznych.

Zestawienie pokazuje zużycie każdej maszyny w każdym okresie oraz dwie zmiany:

- **względem poprzedniego okresu z danymi** — widać, kiedy zużycie skoczyło i kiedy wróciło,
- **między pierwszym a ostatnim okresem** — widać, dokąd to w sumie doprowadziło.

Sama zmiana „od pierwszego do ostatniego" gubi to, co działo się po drodze. Sprężarka, która w maju zużyła o 30% więcej, a w czerwcu wróciła do normy po wymianie zaworu, w zestawieniu dwóch skrajnych okresów w ogóle nie istnieje. Dla przeglądu energetycznego to właśnie takie epizody są najciekawsze.

Porównywarka trzyma się trzech reguł:

1. **Okresy muszą mieć zbliżoną długość.** Różnica powyżej 20% blokuje porównanie. Tydzień zestawiony z miesiącem dałby „spadek zużycia o 77%", który niczego nie mówi o efektywności. Tolerancja przepuszcza miesiące kalendarzowe, bo luty i marzec różnią się o ok. 10%. Po wybraniu pierwszego okresu niepasujące są ukrywane na liście.
2. **Okresy muszą pochodzić z tej samej konfiguracji ZWE.** Inny zakres maszyn albo źródeł to inna populacja, a porównanie jej sum nie ma sensu.
3. **Maszyna, która pojawia się w którymkolwiek okresie, ma wiersz we wszystkich.** Brak danych to kreska, a nie brak wiersza. Nic nie znika między okresami bez śladu — a ciche „zniknięcie" maszyny z zestawienia to klasyczny sposób, w jaki arkusz kalkulacyjny poprawia wynik.

Sumaryczne zużycie jest liczone osobno dla każdej jednostki, bo kilowatogodzin nie dodaje się do metrów sześciennych. Przy dużej liczbie okresów tabela pokazuje podsumowanie serii (pierwszy, ostatni, minimum, maksimum, średnia), a pełny przebieg widać na wykresie.

## 5. Automatyzacja: raport przychodzi sam

Harmonogram automatyzacji wykonuje cztery rodzaje zadań: tworzy migawkę ZWE, tworzy migawkę WEE, uruchamia audyt albo zestawia ostatnie okresy ZWE i wysyła porównanie mailem. Każde zadanie ma okno czasowe, cykl uruchomienia i listę adresatów.

Okno czasowe łatwo zlekceważyć. „Ostatnie 30 dni" to okno kroczące: uruchomione 1 marca obejmie też końcówkę stycznia. „Poprzedni pełny miesiąc kalendarzowy" obejmie dokładnie luty. Do przeglądu ISO 50001 potrzebne są okresy zamknięte, bo tylko takie da się porównać rok do roku. Harmonogram ma więc obok okien kroczących również poprzedni pełny dzień, poprzedni tydzień od poniedziałku do niedzieli i poprzedni miesiąc kalendarzowy.

Typowa konfiguracja w zakładzie wygląda tak:

1. Pierwszego dnia miesiąca, wcześnie rano — migawka ZWE za poprzedni pełny miesiąc.
2. Godzinę później — porównanie ostatnich 12 migawek tej konfiguracji, wysłane do energetyka i kierownika zakładu.

Porównanie w mailu liczy ta sama funkcja, która zasila okno porównywarki w aplikacji. To świadoma decyzja projektowa: gdyby mail i ekran liczyły każde po swojemu, prędzej czy później pokazałyby różne liczby, a wtedy żadnej nie dałoby się obronić.

Osobny przypadek to WEE z mianownikiem wpisywanym ręcznie. O szóstej rano pierwszego dnia miesiąca harmonogram nie zna jeszcze liczby sztuk za poprzedni miesiąc. Do wyboru są dwa tryby: użyć stałej z konfiguracji albo utworzyć migawkę oznaczoną jako **czekająca na dane**. W drugim trybie lista migawek pokazuje, ile okresów czeka na uzupełnienie, a brakującą wartość wpisuje się wprost z listy. Dopóki jej nie ma:

- migawka nie trafia na wykres, bo pokazałaby fałszywy spadek do zera,
- audyt na tej migawce jest wstrzymany z komunikatem, których wartości brakuje,
- mail z raportem zamiast liczb mówi, czego brakuje i gdzie to uzupełnić.

Na tym polega różnica między „mierzymy energię" a „nasze dane obronią się na audycie". Zero na wykresie wygląda jak wynik. Brakująca wartość opisana jako brakująca jest tym, czym jest — brakiem danych.

## 6. Raport: PDF, PNG i co trafia do dokumentacji przeglądu

Migawkę ZWE i wynik porównania okresów można wyeksportować do PDF albo PNG. Plik powstaje po stronie serwera, PDF układa się na stronach A4, a wykresy z porównywarki trafiają do niego w takiej postaci, w jakiej były na ekranie. Każdy wygenerowany plik trafia też do archiwum na serwerze, więc raport przekazany audytorowi da się później wskazać.

Raport ZWE zawiera ranking maszyn z wartością, udziałem i udziałem skumulowanym, zestawienie w układzie linia, maszyna i źródło oraz listę maszyn o największym zużyciu.

Audyty w OmniEnergy mają trzy typy: wewnętrzny, zewnętrzny i przegląd zarządzania. Do audytu podpina się konfigurację ZWE, konfigurację WEE, cel energetyczny i dokumentację, a raport z audytu może trafić mailem do wskazanych osób.

Norma w pkt 9.3 wymienia wśród danych wejściowych do przeglądu zarządzania m.in. efektywność energetyczną i jej poprawę ocenianą na podstawie wyników monitorowania i pomiarów, w tym WEE, oraz stopień realizacji celów. W praktyce do dokumentacji przeglądu trafia:

- **lista ZWE** z rankingiem i progiem kwalifikacji — dowód do pkt 6.3,
- **trend WEE względem linii bazowej**, bez okresów niekompletnych — pkt 6.4 i 6.5,
- **porównanie okresów tej samej długości** ze zmianą krok po kroku — pkt 9.1,
- **informacja przy każdej wartości ręcznej**, kto i kiedy ją wpisał — odpowiedź na pytanie „skąd ta liczba".

## Czego OmniEnergy za was nie zrobi

System porządkuje dane i pilnuje reguł, ale kilku rzeczy nie załatwi:

- **Nie zmierzy tego, czego nie opomiarowano.** Maszyna bez licznika nie pojawi się w rankingu ZWE. Jeśli część energii zakładu przechodzi przez rozdzielnię bez podliczników, ranking dotyczy wyłącznie opomiarowanej części i trzeba to audytorowi powiedzieć wprost.
- **Nie sprawdzi wartości wpisanej ręcznie.** Zapisze, kto i kiedy ją podał, ale nie wie, czy raport zmianowy był poprawny. Dokument źródłowy musi istnieć i być dostępny.
- **Próg 80% to kryterium zużycia, a nie całe kryterium ZWE.** Norma pozwala uznać obszar za znaczący także ze względu na duży potencjał poprawy. Maszyna o małym zużyciu, którą łatwo usprawnić, wymaga decyzji zespołu i opisu w dokumentacji.
- **Długość okresu jest kontrolowana, warunki pracy — nie.** Tolerancja 20% przepuści luty z marcem, ale nie wyrówna różnic w liczbie dni roboczych, temperaturze czy asortymencie. Do porównania surowego zużycia warto dołożyć WEE, który odnosi energię do produkcji.
- **Wymiana licznika w trakcie okresu wymaga uwagi.** Agregacja „różnica" odejmuje pierwszy odczyt od ostatniego. Gdy licznik zostanie wymieniony albo wyzerowany, ujemny wynik jest zastępowany zerem, żeby nie powstało ujemne zużycie. Taki okres trzeba dla danego punktu sprawdzić i opisać.
- **System nie certyfikuje.** Certyfikat ISO 50001 wydaje akredytowana jednostka certyfikująca. OmniEnergy dostarcza dowody — uporządkowane, identyfikowalne i powtarzalne — ale procedury, odpowiedzialności i decyzje kierownictwa pozostają po stronie organizacji.

## Co z tego wynika

Arkusz kalkulacyjny nie przegrywa z systemem dlatego, że liczy wolniej. Przegrywa, bo nie pamięta, skąd wzięła się liczba, pozwala zestawić tydzień z miesiącem i zamienia brak danych w zero. Każda z opisanych reguł — ślad audytowy wartości ręcznych, pomijanie niekompletnych migawek, blokada porównań okresów różnej długości, wiersz dla każdej maszyny we wszystkich okresach — zamyka jedną z tych dziur.

Plan na pierwszy miesiąc pracy z modułem:

1. Sprawdźcie, które maszyny z czołówki rankingu ZWE mają własne liczniki, a których zużycie wyliczacie z różnicy innych odczytów.
2. Ustalcie, skąd pochodzi mianownik każdego WEE i kto odpowiada za jego wpisanie.
3. Ustawcie harmonogram na zamknięte okresy kalendarzowe, a dla wartości ręcznych włączcie tryb czekania na dane.
4. Po trzech miesiącach uruchomcie porównanie okresów i sprawdźcie, czy wynik da się obronić bez otwierania żadnego pliku spoza systemu.

Pełną listę zmian w OmniEnergy znajdziecie w [historii zmian](/pl/lista-zmian).

## Źródła

- ISO 50001:2018, *Energy management systems — Requirements with guidance for use* — https://www.iso.org/standard/69426.html
- ISO 50006:2023, *Energy management systems — Evaluating energy performance using energy performance indicators and energy baselines* — https://www.iso.org/standard/79367.html
- Dyrektywa Parlamentu Europejskiego i Rady (UE) 2023/1791 z 13 września 2023 r. w sprawie efektywności energetycznej, art. 11 — https://eur-lex.europa.eu/eli/dir/2023/1791/oj
- OmniMES, lista zmian, wersja 4.4.0 — https://www.omnimes.com/pl/lista-zmian
