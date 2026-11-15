---
title: 'Studio aplikacji w OmniMES: własne narzędzia produkcyjne budowane rozmową z Claude'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'studio-aplikacji-w-omnimes-wlasne-narzedzia-produkcyjne-budowane-rozmowa-z-claude'
description: 'OmniMES 4.9.0 wprowadza Studio aplikacji (wersja Beta). Kierownik produkcji, utrzymanie ruchu czy dział jakości opisują w rozmowie z Claude, czego potrzebują, a Claude buduje interaktywną aplikację na bieżących danych zakładu. Pokazujemy, jak to działa, dwa przykłady z liczbami, zasady bezpieczeństwa oraz to, kiedy wybrać aplikację, a kiedy pulpit BI.'
coverImage: '/images/blog/studio-aplikacji/cover-studio-aplikacji-pl.jpg'
lang: 'pl'
tags: [{"value":"mcp","label":"MCP"},{"value":"agentAi","label":"AGENT AI"},{"value":"AI","label":"AI"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-11-15T08:00:00.000Z'
---

Od dziś OmniMES 4.9.0 ma nową zakładkę: **Studio aplikacji**, na razie oznaczoną jako Beta. W rozmowie z Claude opisujecie, czego potrzebujecie, np. „ile złotych tracimy na przestojach linii cięcia i które przyczyny usunąć najpierw”. Claude buduje z tego interaktywną aplikację z kaflami wskaźników, wykresami, tabelami, notatkami i formularzami. Aplikacja działa na bieżących danych OmniMES: maszynach, sygnałach, zdarzeniach, pomiarach, danych BI i zleceniach produkcyjnych. Gotową aplikację dodajecie do menu bocznego, we własnej sekcji, i udostępniacie wybranym grupom albo konkretnym osobom.

Poniżej wyjaśniamy, po co to zrobiliśmy, jak przebiega budowa aplikacji, co pokazały dwie aplikacje zbudowane w trakcie testów i na jakich zasadach bezpieczeństwa to wszystko działa. Na końcu porównujemy aplikację z pulpitem BI i podpowiadamy, od czego zacząć.

<video controls width="100%" preload="metadata" poster="/videos/omnimes-studio-aplikacji-pl.jpg">
  <source src="/videos/omnimes-studio-aplikacji-pl.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje odtwarzania wideo HTML5.
</video>

## Każdy zakład ma pytania, których nie przewidział żaden dostawca

System MES jest budowany pod to, co wspólne dla wielu zakładów: stany maszyn, OEE, zlecenia, raporty zmianowe. Na co dzień kierownik produkcji zadaje jednak pytania, które są tylko jego:

- ile kosztuje nas godzina postoju na tej konkretnej gilotynie, licząc po naszej stawce,
- które zlecenie nie zdąży na termin i ile sztuk na godzinę trzeba robić, żeby jednak zdążyło,
- co przekazać następnej zmianie, żeby nie zaczynała od szukania informacji.

Do tej pory były na to trzy drogi. Pierwsza to prośba do dostawcy systemu i czekanie na wydanie. Trwa to tygodnie albo miesiące, a funkcja potrzebna jednemu zakładowi często w ogóle nie trafia do planu rozwoju. Druga to eksport do arkusza, który po tygodniu jest nieaktualny i który rozumie jedna osoba. Trzecia to pulpit BI. Pokazuje liczby, ale do jego budowy trzeba znać SQL, a sam pulpit nie pozwala zapisać decyzji ani przypisać działania.

Studio aplikacji zmienia to, kto buduje takie narzędzia. Robią to ludzie, którzy znają problem: kierownik produkcji, utrzymanie ruchu, dział jakości. Zakres jest wąski: jedna aplikacja odpowiada na jedno pytanie i ma kilka ekranów, a nie kilkadziesiąt. Nadzór zostaje po stronie działu IT: uprawnienia, dziennik zdarzeń i historia wersji.

## Jak to działa: od opisu do pozycji w menu

![Kreator w Studiu aplikacji: z lewej okno rozmowy z Claude z wpisanym opisem zmiany, z prawej podgląd aplikacji Koszty przestojów na żywych danych](/images/blog/studio-aplikacji/studio-kreator-pl.webp)

1. **Opis w kreatorze.** W zakładce *Studio aplikacji → Kreator* piszecie zwykłym językiem, czego potrzebujecie. Dobry opis mówi, jakie dane są potrzebne, kto będzie z aplikacji korzystał i jaką decyzję ma ona wspierać.
2. **Claude czyta dane i buduje aplikację.** Claude sprawdza strukturę zakładu, sygnały, zdarzenia i zlecenia, z uprawnieniami osoby, która z nim rozmawia. Potem pisze aplikację i zapisuje ją w OmniMES.
3. **Podgląd na żywo.** Po prawej stronie kreatora aplikacja od razu działa na prawdziwych danych. Poprawki zgłaszacie kolejną wiadomością, np. „dodaj wybór zmiany i pokaż koszt strat osobno dla każdej zmiany”.
4. **Wersje.** Każdy zapis tworzy nową wersję z opisem zmiany i autorem. Starszą wersję można obejrzeć i przywrócić jednym kliknięciem.
5. **Menu i udostępnianie.** W zakładce *Menu i udostępnianie* tworzycie własne sekcje menu bocznego, np. „Aplikacje zakładu”, i decydujecie, kto je widzi: wszyscy, wybrane grupy albo konkretne osoby.

![Menu boczne OmniMES z zakładką Studio aplikacji oznaczoną jako Beta i własną sekcją Aplikacje zakładu z aplikacjami Koszty przestojów i Realizacja zleceń](/images/blog/studio-aplikacji/menu-aplikacje-zakladu-pl.webp)

Dla użytkownika aplikacja niczym się nie różni od innych ekranów OmniMES. Klika pozycję w menu i pracuje.

### Dwie drogi do Claude

Aplikację można zbudować na dwa sposoby:

- **W OmniMES, w kreatorze.** Rozmowa z Claude wymaga klucza API Claude z Claude Console. Klucz wpisuje administrator główny w zakładce *Połączenie z Claude*, a koszty zapytań rozlicza Claude Console. Plany Claude Max, Ultra i Team mają w cenie miesięczne kredyty na API: 100 USD w planie Max, 200 USD w planie Ultra i do 500 USD wspólnej puli w planie Team (Anthropic, 2026). Klucz z organizacji Claude Console połączonej z takim planem działa w Studiu tak samo jak każdy inny klucz API.
- **W Claude Desktop, na własnej subskrypcji Claude.** W zakładce *Połączenie z Claude* każdy użytkownik pobiera rozszerzenie OmniMES z własnym, osobistym tokenem i instaluje je w Claude Desktop. Claude może wtedy tworzyć i zapisywać aplikacje, a aplikacje wyświetlają się także w samej rozmowie z Claude.

## Przykład 1: Koszty przestojów

Obie aplikacje opisane niżej powstały z Claude podczas testów Studia. Działają na danych z naszej instancji demonstracyjnej, którą zasila symulator sygnałów. Liczby pokazują więc działanie aplikacji, a nie wyniki prawdziwego zakładu.

![Aplikacja Koszty przestojów: kafle z kosztem strat, prognozą miesięczną, dostępnością, czasem strat i udziałem trzech największych przyczyn, wykres kosztu według maszyn, wykres Pareto, ranking strat i plan działań](/images/blog/studio-aplikacji/koszty-przestojow-pl.webp)

**Pytanie:** ile złotych linia traci na przestojach i od czego zacząć ich usuwanie.

Aplikacja przelicza czas przestojów na pieniądze według stawki, którą zakład ustawia sam w oknie *Ustawienia kosztów*. W teście była to stawka 1500 zł za godzinę. Dla Linii Cięcia i Przygotowania Wsadu w ostatniej dobie aplikacja pokazała:

- **6856 zł** kosztu strat i **4 h 34 min** czasu strat w 8 zdarzeniach,
- **dostępność 86,0%**, liczoną jako czas pracy do sumy czasu pracy i strat,
- **205 694 zł** prognozy miesięcznej przy obecnym tempie strat,
- **86,9%** wszystkich kosztów w trzech największych przyczynach.

Nad wykresami aplikacja sama formułuje wniosek: największa strata to nieplanowany postój Gilotyny Nożycowej, 1 h 28 min, czyli 2219 zł w okresie i ok. 66,6 tys. zł miesięcznie. Usunięcie trzech największych przyczyn to potencjalnie 178 693 zł miesięcznie. Postoje planowane (tu 4 h 06 min) są pokazane osobno i nie liczą się do strat.

Niżej jest wykres kosztu według maszyn, wykres Pareto przyczyn i ranking strat. Przy każdej przyczynie jest przycisk *Dodaj działanie*. Działanie trafia do planu z osobą odpowiedzialną, terminem, szacowaną oszczędnością miesięczną i statusem, a liczniki nad planem pokazują działania otwarte, potencjał i oszczędności już zrealizowane.

**Jaką decyzję wspiera:** gdzie najpierw wysłać utrzymanie ruchu i ile to jest warte. Minuty postoju przeliczone na złotówki łatwiej obronić na spotkaniu z zarządem niż procent dostępności. Plan działań zostaje w aplikacji, więc za tydzień widać, co zrobiono i ile to dało.

## Przykład 2: Realizacja zleceń

![Aplikacja Realizacja zleceń: kafle z liczbą zleceń w toku i zagrożonych, wykonaniem planu, brakami i niewykonanymi sztukami, ostrzeżenie o zleceniach, które mogą nie zdążyć, oraz tabela zleceń w toku z potrzebnym tempem, prognozą końca i komentarzem](/images/blog/studio-aplikacji/realizacja-zlecen-pl.webp)

**Pytanie:** które zlecenia nie zdążą na termin i co trzeba zrobić, żeby zdążyły.

Aplikacja bierze tempo, w jakim zlecenie było dotąd realizowane, i liczy z niego prognozę końca oraz tempo potrzebne do dotrzymania terminu. Na danych demonstracyjnych z 142 zleceń cztery były w toku i wszystkie cztery okazały się zagrożone. Wartość zagrożonej produkcji wyniosła ok. 320 tys. zł.

Przykład z ekranu: zlecenie na Linii Wykończenia i Kontroli Jakości ma wykonane 21 z 500 sztuk i termin 19 listopada. Przy obecnym tempie skończy się dopiero ok. 16 stycznia 2027 r., a w dniu terminu zabraknie ok. 445 sztuk. Aplikacja pisze wprost: potrzebne tempo to **4,6 szt./h zamiast 0,3 szt./h**, czyli 14,3 raza szybciej. Przy innym zleceniu potrzeba 11,1 szt./h zamiast 0,8 szt./h.

Tabela zleceń w toku pokazuje dla każdego zlecenia pasek postępu (wykonane dobre sztuki na tle upływu czasu do terminu), tempo obecne i potrzebne, prognozę końca, braki i status. Ostatnia kolumna to pole *Komentarz / działanie*, np. „dodatkowa zmiana w sobotę”. Komentarz zapisuje się w aplikacji i widzą go wszyscy, którzy z niej korzystają. Wyżej są kafle z wykonaniem planu, brakami i ich kosztem oraz liczbą i wartością niewykonanych sztuk. Wartość sztuki i koszt braku ustawia się w oknie *Ustawienia wartości*. Pod tabelą są wykresy wykonania planu i braków według linii, braki tydzień po tygodniu oraz lista zakończonych zleceń z największą stratą.

**Jaką decyzję wspiera:** poranną odprawę. Zamiast ogólnego „mamy opóźnienie” zespół widzi, że zlecenie wymaga tempa 14 razy wyższego. Tego nie nadrobi jedna nadgodzina, więc trzeba zdecydować: dodatkowa zmiana, przeniesienie na inną linię albo rozmowa z klientem o terminie. Decyzja trafia do komentarza i następna zmiana ją widzi.

Ta aplikacja ma już dwie wersje. Druga powstała po pierwszym teście na danych: doszło w niej wyliczenie, ile razy szybciej trzeba produkować, oraz informacja o pozostałych zagrożonych zleceniach. Tak wygląda typowa praca ze Studiem: pierwsza wersja, sprawdzenie na prawdziwych danych, poprawka zapisana jako kolejna wersja.

Trzeci przykład, tablicę przekazania zmiany w wersji angielskiej, właśnie przygotowujemy.

## MCP Apps po ludzku

O samym MCP (Model Context Protocol) pisaliśmy już w artykule [MCP w OmniMES w praktyce](/pl/blog/mcp-w-omnimes-w-praktyce-dashboard-jednym-poleceniem). W skrócie: to otwarty protokół, przez który asystenci AI korzystają z narzędzi innych systemów.

MCP Apps to pierwsze oficjalne rozszerzenie MCP, ogłoszone 26 stycznia 2026 r. (MCP, 2026). Dzięki niemu serwer MCP może zwrócić nie tylko tekst, ale też interaktywny interfejs: formularz, wykres albo tabelę. Interfejs wyświetla aplikacja gospodarza, np. Claude, ChatGPT, Goose albo Visual Studio Code. Standard opisuje też zasady bezpieczeństwa: interfejs działa w odizolowanej ramce przeglądarki, komunikuje się z gospodarzem wyłącznie wiadomościami, które da się rejestrować, a gospodarz może wymagać zgody użytkownika na wywołania narzędzi zainicjowane z interfejsu.

OmniMES korzysta z tego standardu po obu stronach. Jako gospodarz wyświetla aplikacje w swoim menu. Jako serwer MCP udostępnia te same aplikacje w Claude Desktop. Dla zakładu to oznacza dwie rzeczy. Aplikacja nie jest zamknięta w naszym prywatnym formacie. Reguły izolacji wynikają z otwartej specyfikacji, którą można sprawdzić, a nie tylko z naszych zapewnień.

## Bezpieczeństwo i nadzór: swoboda dla zakładu, kontrola dla IT

Aplikację pisze model językowy, a uruchamiają ją ludzie z różnymi uprawnieniami. Dlatego granice są zapisane w kodzie OmniMES, a nie w poleceniach dla Claude:

- **Prawa oglądającego, nigdy więcej niż autora.** Aplikacja działa na koncie osoby, która ją otworzyła, ale może tylko to, na co pozwalają uprawnienia zarówno tej osoby, jak i autora aplikacji. Technolog, który udostępni aplikację dyrektorowi, nie odczyta przez nią niczego, czego sam nie widzi.
- **Izolacja.** Aplikacja działa w odizolowanej ramce. Nie ma dostępu do tokenów logowania, ciasteczek ani internetu. Jedyną drogą do danych są wywołania, które sprawdza serwer OmniMES.
- **Każdy zapis potwierdza człowiek.** Zapis do danych OmniMES wymaga zgody osoby, która korzysta z aplikacji. Okno potwierdzenia rysuje OmniMES, a nie aplikacja, i pokazuje, która aplikacja, czyjego autorstwa, co i gdzie chce zapisać. W Claude Desktop zapisy do OmniMES są wyłączone, działa tylko odczyt. Komentarze i plan działań aplikacja trzyma we własnym, wydzielonym magazynie danych.
- **Aplikacje administracyjne tylko przez administratora głównego.** Zapis w obszarach administracyjnych, takich jak użytkownicy, uprawnienia czy ustawienia, jest możliwy wyłącznie w aplikacji, którą zatwierdził administrator główny.
- **Dziennik.** Zakładka *Dziennik* rejestruje zmiany aplikacji, menu i udostępniania, osobiste tokeny, każdy zapis danych z aplikacji i każdą odmowę dostępu. Odczyty danych nie są rejestrowane.
- **Kto może budować.** Ekran Studia ma domyślnie tylko grupa Administratorzy. Innym grupom nadaje się go w *Uprawnieniach dostępu*, tak jak każdy inny ekran. Klucz API Claude ustawia wyłącznie administrator główny.

![Okno edycji sekcji menu w Studiu aplikacji: nazwy w dwóch językach, ikona, kontekst oraz udostępnianie wszystkim, wybranym grupom albo wybranym użytkownikom](/images/blog/studio-aplikacji/udostepnianie-pl.webp)

![Historia wersji aplikacji Realizacja zleceń: dwie wersje z datą, autorem, opisem zmiany, poziomem i przyciskiem Przywróć, poniżej podgląd wybranej wersji](/images/blog/studio-aplikacji/wersje-pl.webp)

Aplikacje, ich wersje i dane są zapisane w bazie OmniMES. Nie potrzeba dodatkowych serwerów ani usług, a kopia zapasowa systemu obejmuje je razem z resztą danych.

## Aplikacja czy pulpit BI?

OmniMES ma pulpity BI w Redashu i nadal warto z nich korzystać. Różnica jest prosta: pulpit BI pokazuje liczby, a aplikacja dodaje do nich logikę, decyzje i działania.

| | Pulpit BI (Redash) | Aplikacja ze Studia |
|---|---|---|
| Najlepszy do | trendów, porównań i raportów dla wielu odbiorców | jednej konkretnej decyzji podejmowanej regularnie |
| Kto buduje | analityk znający SQL albo asystent AI przez MCP | osoba, która zna problem, w rozmowie z Claude |
| Co zawiera | wykresy i tabele z zapytań | wskaźniki, wykresy i tabele oraz wyliczenia, np. potrzebne tempo albo koszt przyczyny według stawki zakładu |
| Działania | brak, tylko odczyt | komentarze, plan działań, ustawienia, zapis do OmniMES po potwierdzeniu |
| Gdzie działa | Redash, link, osadzenie na stronie | menu OmniMES, Claude Desktop |
| Nadzór | uprawnienia Redasha | uprawnienia OmniMES, wersje, dziennik |

Prosta reguła: jeśli odpowiedzią jest liczba albo trend, który ogląda wiele osób, wystarczy pulpit. Jeśli odpowiedź prowadzi do decyzji i ktoś musi zapisać, co z nią zrobiono, lepsza będzie aplikacja. Oba narzędzia dobrze się uzupełniają: aplikacja jest ekranem roboczym zespołu, a pulpit raportem dla kierownictwa.

## Ograniczenia i co oznacza Beta

- **To wersja Beta.** Studio będziemy dalej testować, a ekrany i zachowanie mogą się jeszcze zmienić. Uwagi od użytkowników wpływają na kolejne wersje.
- **Aplikacja jest tak dobra jak opis i dane.** Claude buduje aplikację, ale założenia obliczeń, np. stawkę za godzinę postoju albo wartość sztuki, ustala zakład. Zanim aplikacja zacznie wspierać decyzje, warto porównać jej wyniki z ekranami OmniMES, np. z Czasem pracy albo OEE.
- **Prognozy są proste.** Prognoza miesięczna i prognoza końca zlecenia wynikają z obecnego tempa. To szybka ocena, a nie model przewidujący przyszłość.
- **Aplikacja nie pokaże tego, czego nie mierzycie.** Bez sygnałów, statusów i zleceń w OmniMES nie będzie z czego liczyć.
- **Koszty.** Rozmowa w kreatorze zużywa tokeny API rozliczane przez Claude Console. Zbudowanie i poprawienie aplikacji to zwykle kilka wiadomości.
- **To nie zastępuje rozwoju produktu.** Jeśli tej samej aplikacji potrzebuje wiele zakładów, jest to sygnał, że funkcja powinna trafić do OmniMES na stałe.

## Jak zacząć

1. **Wybierzcie jedno pytanie**, które co tydzień kosztuje czas albo pieniądze, najlepiej omawiane na porannej odprawie.
2. **Nadajcie dostęp do Studia** grupie, która ma budować aplikacje, w *Uprawnieniach dostępu*.
3. **Wybierzcie drogę do Claude:** klucz API wpisany przez administratora głównego w zakładce *Połączenie z Claude* albo rozszerzenie OmniMES dla Claude Desktop z osobistym tokenem.
4. **Opiszcie aplikację tak, jak opisalibyście ją koledze:** jakie dane, kto z niej korzysta, jaką decyzję ma wspierać i co ma się dać zapisać.
5. **Sprawdźcie liczby w podglądzie** i poprawiajcie aplikację kolejnymi wiadomościami.
6. **Dodajcie aplikację do sekcji menu**, udostępnijcie ją grupie, a po tygodniu przejrzyjcie *Dziennik*.

Studio aplikacji jest dostępne od wersji 4.9.0. Pełną listę zmian znajdziecie w [historii zmian](/pl/lista-zmian), a o tym, jak asystent AI pracuje z OmniMES przez MCP i dlaczego zmiany zatwierdza człowiek, piszemy też w artykule [MCP dotarł do sterowników](/pl/blog/mcp-dotarl-do-sterownikow-jak-podlaczyc-agenta-ai-do-linii-zeby-czytal-dane-a-zmiany-zatwierdzal-czlowiek). Jeśli chcecie zobaczyć Studio na własnych danych, [napiszcie do nas](/pl/kontakt).

## Źródła

- Model Context Protocol, *MCP Apps - Bringing UI Capabilities To MCP Clients*, 26.01.2026 — https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/
- Model Context Protocol, repozytorium specyfikacji MCP Apps — https://github.com/modelcontextprotocol/ext-apps
- Anthropic, *API credits for Max, Ultra, and Team plans* — https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers
- OmniMES, lista zmian, wersja 4.9.0 — https://www.omnimes.com/pl/lista-zmian
