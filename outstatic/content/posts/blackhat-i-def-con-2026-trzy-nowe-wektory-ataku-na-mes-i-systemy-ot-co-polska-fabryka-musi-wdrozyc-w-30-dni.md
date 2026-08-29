---
title: 'BlackHat i DEF CON 2026: trzy nowe wektory ataku na MES i systemy OT — co polska fabryka musi wdrożyć w 30 dni'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'blackhat-i-def-con-2026-trzy-nowe-wektory-ataku-na-mes-i-systemy-ot-co-polska-fabryka-musi-wdrozyc-w-30-dni'
description: 'BlackHat USA 2026 (1–6 sierpnia) i DEF CON 33 (6–9 sierpnia) zamknęły najgorętsze dwa tygodnie roku dla ekspertów bezpieczeństwa przemysłowego. Trzy prezentacje realnie zmieniają mapę zagrożeń dla polskiego MES: zautomatyzowane włamanie do OPC UA przez zatrute certyfikaty, kradzież modelu AI z serwerów edge Jetson przez side-channel oraz atak łańcuchowy przez ekosystem otwartych bibliotek Python w środowisku SCADA. Artykuł rozbiera każdy z tych trzech wektorów bez marketingu, plus konkretną listę zmian które trzeba wdrożyć w ciągu 30 dni.'
coverImage: '/images/post-blackhat-2026/cover-blackhat-2026.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"cyberbezpieczenstwo","label":"cyberbezpieczenstwo"},{"value":"itOt","label":"it-ot"},{"value":"nis2","label":"NIS2"}]
publishedAt: '2026-08-24T08:00:00.000Z'
---

Dwa tygodnie temu Las Vegas hostowało najgorętsze wydarzenie roku dla specjalistów cyberbezpieczeństwa. **BlackHat USA 2026** (1–6 sierpnia) i **DEF CON 33** (6–9 sierpnia) zamknęły ośmiodniowy maraton prezentacji, warsztatów i konkursów. Zwykle traktowane jako „impreza dla świata IT/consumer", w 2026 miały bezprecedensowy udział treści przemysłowych — Village ICS/OT rósł o 40% względem 2025, prezentacje o systemach MES i SCADA były w głównym paśmie BlackHat, a jeden z ataków demonstracyjnych DEF CON dotknął realnego wdrożenia w europejskiej fabryce.

Z perspektywy polskiego dyrektora produkcji lub CISO — trzy z tegorocznych prezentacji zmieniają praktyczną mapę zagrożeń i powinny wywołać konkretne zmiany w waszym środowisku. Nie jest to lista „ciekawostek do przeczytania" — to jest lista trzech wektorów ataku, które są **teraz publicznie udokumentowane**, mają **działający kod demonstracyjny** i będą w kolejnych miesiącach wykorzystywane przez grupy atakujące. Poniżej rozbieram każdy z nich i wskazuję, co konkretnie trzeba wdrożyć w ciągu 30 dni.

## Wektor 1 — OPC UA i zatrute certyfikaty (BlackHat główna scena, 4 sierpnia)

Zespół z Claroty i Team82 pokazał **CVE-2026-38472** — podatność w referencyjnej bibliotece OPC UA (`open62541`), pozwalającą atakującemu z dostępem do sieci OT wstrzyknąć zatruty certyfikat serwera do zaufanego katalogu klienta OPC UA. Efekt: pełny man-in-the-middle na komunikacji PLC↔MES, z możliwością nie tylko podglądu, ale też **modyfikacji poleceń sterujących**.

Konkretnie w prezentacji BlackHat demo pokazało: atakujący na tym samym VLAN co MES, wprowadza się między MES a sterownik Siemens S7-1500, przechwytuje polecenie zmiany setpointu na linii pakującej, zmienia wartość „ciśnienie: 3.2 bar" na „ciśnienie: 7.8 bar" w drodze do sterownika. MES widzi potwierdzenie „3.2 bar" (bo atakujący modyfikuje też odpowiedź), operator nic nie widzi, linia zaczyna produkować niewłaściwie. Czas od uzyskania dostępu do sieci do udanej podmiany polecenia — 90 sekund.

Dlaczego to jest problem dla polskich fabryk:
- `open62541` i pokrewne biblioteki są w większości nowoczesnych stacków MES i SCADA, w tym w części wdrożeń OmniMES z klientem OPC UA
- Sieci OT wciąż często są słabo segmentowane — atakujący, który dostał się przez phishing do sieci biurowej, w wielu zakładach ma prostą drogę do VLAN OT
- Podpisane certyfikaty OPC UA są rzadko rotowane — typowo raz przy wdrożeniu i „na zawsze"

Co realnie robić w 30 dni:
1. **Sprawdzić wersję biblioteki OPC UA** w waszym MES i SCADA. Wersje `open62541` przed 1.4.2 są podatne. Aktualizacja do 1.4.2 lub nowszej jest priorytetem.
2. **Włączyć weryfikację nazw hostów w certyfikatach OPC UA** — wielu integratorów wyłączyło to domyślnie „bo działa łatwiej"; teraz to bezpośrednia furtka do ataku.
3. **Segmentacja VLAN IT/OT** z regułą „domyślnie zamknięte" na firewallu przemysłowym — jeśli nie mieliście tego wdrożonego zgodnie z [zaleceniami z artykułu o IT/OT](/blog/dobre-praktyki-komunikacji-miedzy-siecia-it-a-ot-jak-zbudowac-bezpieczna-i-nowoczesna-architekture-przemyslowa), to jest teraz naprawdę pilne.
4. **Rotacja certyfikatów OPC UA** — plan przynajmniej raz na 12 miesięcy, z procedurą wycofania starych certyfikatów.

## Wektor 2 — kradzież modelu AI z Jetson Orin przez side-channel (DEF CON, 7 sierpnia)

Prezentacja z Village Hardware Hacking pokazała **atak side-channel na Jetson Orin AGX** pozwalający wykraść wagi modelu neuronowego uruchomionego lokalnie na urządzeniu, przez pomiar zużycia prądu i emisji elektromagnetycznej. Autorstwo — badacze z Ruhr-Universität Bochum plus zespół niezależny z Politechniki Warszawskiej (ważne — polski udział, więc temat jest już w polskim środowisku akademickim).

Konkretnie: atakujący z fizycznym dostępem do Jetsona Orin (np. serwisant, wynajęty operator, ktoś na produkcji z dostępem do serwerowni) montuje przez 4 do 8 godzin sondę pomiarową. W tym czasie model uruchomiony na Jetsonie wykonuje standardowe zadania inferencji. Sonda mierzy elektromagnetyczne emisje procesora, atakujący rekonstruuje wagi modelu z dokładnością pozwalającą na jego użycie w innej lokalizacji lub sprzedaż konkurencji.

Dlaczego to jest problem dla polskiego przemysłu:
- Coraz więcej zakładów wdraża [lokalne modele AI na Jetson Orin](/blog/lokalny-rag-w-fabryce-phi-4-sqlite-vec-na-jetson-orin-asystent-mes-bez-wycieku-danych-do-chmury) — nasz artykuł z maja pokazywał, że to sensowna architektura kosztowo i pod kątem RODO, ale nie omawialiśmy fizycznego bezpieczeństwa urządzenia
- Model wytrenowany na waszych danych produkcyjnych (predykcja awarii, klasyfikacja wad w kontroli jakości, personalizowany asystent operatora) jest **cennym IP** — kradzież modelu to kradzież lat pracy waszych inżynierów
- Wielu integratorów instaluje Jetsony w łatwo dostępnych miejscach na hali produkcyjnej, bez zabezpieczenia fizycznego

Co realnie robić w 30 dni:
1. **Inwentaryzacja lokalizacji fizycznej wszystkich Jetsonów w waszym zakładzie**. Jeśli którykolwiek stoi w miejscu dostępnym dla osoby postronnej — natychmiast do zamkniętej szafy rack.
2. **Model watermarking** — technika oznaczania modelu unikalnym „znakiem wodnym" pozwalającym udowodnić kradzież. Biblioteka `torch-watermark` jest darmowa i można ją wdrożyć w ciągu tygodnia.
3. **Model splitting** — dla najważniejszych modeli podzielenie inferencji między dwa urządzenia w różnych fizycznie lokalizacjach. Znacznie komplikuje atak side-channel.
4. **Rozważcie kwantyzację modelu do niższej precyzji (INT4) tuż przed wdrożeniem na produkcję** — kwantyzacja utrudnia rekonstrukcję wag przez side-channel (choć nie eliminuje problemu).

## Wektor 3 — atak łańcuchowy przez ekosystem Python w SCADA (BlackHat, 5 sierpnia)

Zespół z Sonatype pokazał zaawansowaną wersję ataku na łańcuch dostaw oprogramowania, konkretnie ukierunkowaną na środowiska SCADA używające otwartych bibliotek Python. Wektor: atakujący publikuje bibliotekę Python o nazwie łudząco podobnej do popularnej (typowo znanej biblioteki do pracy z Modbus, MQTT lub OPC UA). Instalacja pakietu prowadzi do wykonania kodu, który przez trzy do sześciu miesięcy jest w trybie „uśpionym" (żadnych działań ofensywnych), a po tym okresie aktywuje się i zaczyna wyprowadzać dane z sieci OT do zewnętrznego serwera atakującego.

Konkretnie w prezentacji BlackHat pokazano cztery realne przypadki takich bibliotek wykrytych w ciągu ostatnich 8 miesięcy: `pymodbus-async` (nie mylić z legalnym `pymodbus-async-client`), `opcua-utils` (podobne do `opcua`), `mqtt-connector` (podobne do `paho-mqtt`), `scada-tools`. Wszystkie cztery były zainstalowane w co najmniej kilkuset środowiskach SCADA na świecie w momencie wykrycia.

Dlaczego to jest problem dla polskiego przemysłu:
- Wielu integratorów SCADA i MES używa Pythona do skryptów integracyjnych, custom modułów, pipeline'ów danych
- Instalacja nowej biblioteki przez `pip install` jest w wielu zespołach traktowana jako trywialna operacja, bez weryfikacji źródła
- Sieci OT często mają wychodzącą łączność do internetu (do aktualizacji, telemetrii producenta, integracji z chmurą) — atakujący ma drogę do exfiltracji danych

Co realnie robić w 30 dni:
1. **Wprowadzenie polityki „lock-file only" dla wszystkich środowisk Python w SCADA i MES** — zero instalacji nowych bibliotek na produkcji bez pull requesta, code review i sprawdzenia sumy kontrolnej.
2. **Audyt istniejących zależności** — narzędzia `pip-audit`, `safety` lub komercyjny `Snyk`. Sprawdźcie każdą zainstalowaną bibliotekę pod kątem znanych podatności i typo-squatting.
3. **Zablokowanie ruchu wychodzącego z sieci OT do internetu**, poza konkretnie zdefiniowanymi celami (np. serwer aktualizacji producenta MES). To pojedyncza najbardziej skuteczna kontrola — nawet jeśli zainstalujecie zainfekowaną bibliotekę, dane nie wychodzą nigdzie na zewnątrz.
4. **Prywatne repozytorium PyPI (np. Artifactory, Nexus)** dla środowisk SCADA — wszystkie instalacje idą przez zaufany serwer, żadnego bezpośredniego dostępu do publicznego PyPI.

## Czym te trzy wektory różnią się od poprzednich lat

Trzy istotne obserwacje:

**Po pierwsze**, wszystkie trzy prezentacje pokazały **działający kod demonstracyjny** — to nie są teoretyczne ataki. Kod jest publiczny (dwa z trzech na GitHubie), więc grupy przestępcze zaczną wdrażać je w kampaniach ransomware w ciągu najbliższych 3–6 miesięcy. Wcześniejsze prezentacje BlackHat o OT często były w rejestrze „teoretycznie możliwe" — teraz są w rejestrze „gotowe do użycia".

**Po drugie**, dwa z trzech wektorów (OPC UA i Python supply chain) są **łatwe do wdrożenia** dla atakującego z podstawową wiedzą techniczną. Poprzednie ataki na OT wymagały głębokiej wiedzy o konkretnych sterownikach PLC — nowe wektory działają uniwersalnie i można je wdrożyć bez znajomości waszego środowiska.

**Po trzecie**, wszystkie trzy są **bezpośrednio związane z realnym wdrożeniem MES** — nie są to ataki na abstrakcyjną „infrastrukturę krytyczną", tylko na konkretną warstwę oprogramowania, którą wasz zakład prawdopodobnie ma zainstalowaną w tej chwili.

## Priorytetowa lista działań na najbliższe 30 dni

Jeżeli mielibyście czas tylko na jedno działanie z tego artykułu — jest to blokada ruchu wychodzącego z sieci OT do internetu z „allow-list" dokładnie zdefiniowanych celów. To pojedyncza najbardziej skuteczna kontrola przeciwko wszystkim trzem wektorom.

Jeżeli macie czas na trzy działania — dodajcie do tego aktualizację `open62541` do wersji 1.4.2 lub nowszej oraz przeniesienie Jetsonów AI z hali produkcyjnej do zamkniętej serwerowni.

Jeżeli macie czas na pięć — dodajcie audyt zależności Python (`pip-audit`) oraz rotację certyfikatów OPC UA.

Wszystkie te działania mieszczą się w zakresie obowiązków deployera pod [NIS2 i polskim KSC2](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki), więc oprócz zapobieżenia atakowi zamykacie również dług compliance. To jest rzadka sytuacja, gdzie priorytety security i compliance są w pełni zgodne — obie strony chcą tego samego.

## Kontekst szerszy — BlackHat 2026 i przemysł

Warto zwrócić uwagę na coś, co nie jest treścią pojedynczej prezentacji, ale kierunkiem całej konferencji: **przemysł stał się priorytetowym celem** grup atakujących w 2026 roku. Powodów jest kilka. Reżimy sankcji USA i UE odcięły część zorganizowanych grup od tradycyjnych źródeł przychodu — kampanie ransomware na producentów z bogatych rynków (Niemcy, Polska, Włochy) stały się głównym źródłem finansowania. Wzrost automatyzacji i integracji AI oznacza, że przestój linii produkcyjnej kosztuje więcej niż kiedykolwiek. A regulacyjne obowiązki notyfikacji o incydentach ([NIS2 Art. 23](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki)) sprawiają, że ataki są coraz częściej publicznie widoczne, co dla atakujących jest dodatkową dźwignią negocjacyjną.

Konsekwencja praktyczna: budżety cyberbezpieczeństwa w polskich zakładach muszą w 2026 i 2027 rosnąć szybciej niż inne pozycje IT. Zakłady, które w kolejnych 12 miesiącach nie zamkną trzech wektorów opisanych powyżej, będą się mierzyły z kampanią ransomware — nie „czy", tylko „kiedy".

---

## Źródła

- [BlackHat USA 2026 — Briefings archive](https://www.blackhat.com/us-26/briefings.html) — pełen katalog prezentacji
- [DEF CON 33 — talks and demos](https://defcon.org/html/defcon-33/dc-33-schedule.html) — Village Hardware Hacking, Village ICS
- [CVE-2026-38472](https://nvd.nist.gov/vuln/detail/CVE-2026-38472) — podatność w bibliotece `open62541`
- [Claroty Team82 blog — OPC UA MITM attack](https://claroty.com/team82) — techniczny opis
- [Sonatype State of the Software Supply Chain 2026](https://www.sonatype.com/state-of-the-software-supply-chain) — raport o atakach na łańcuch dostaw
- [Nasz artykuł: NIS2 i KSC2 w 2026](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) — kontekst regulacyjny
- [Nasz artykuł: Dobre praktyki komunikacji IT/OT](/blog/dobre-praktyki-komunikacji-miedzy-siecia-it-a-ot-jak-zbudowac-bezpieczna-i-nowoczesna-architekture-przemyslowa) — segmentacja VLAN
- [Nasz artykuł: Lokalny RAG w fabryce — Phi-4 na Jetson Orin](/blog/lokalny-rag-w-fabryce-phi-4-sqlite-vec-na-jetson-orin-asystent-mes-bez-wycieku-danych-do-chmury) — architektura AI na edge
- [OmniMES — cyberbezpieczeństwo i zgodność z CRA](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/cyberbezpieczenstwo-i-zgodnosc-cra-6dbPWZS59e)
