---
title: 'Black Hat USA 2026 i DEF CON 34: trzy wektory ataku na MES i systemy OT — co fabryka powinna wdrożyć w 30 dni'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'blackhat-i-def-con-2026-trzy-nowe-wektory-ataku-na-mes-i-systemy-ot-co-polska-fabryka-musi-wdrozyc-w-30-dni'
description: 'Black Hat USA 2026 i DEF CON 34 przyniosły trzy wątki ważne dla zakładów produkcyjnych: kulisy ataku na polską energetykę i firmę produkcyjną z grudnia 2025 r. (wejście do sieci OT przez prywatny APN), słabości protokołów i narzędzi inżynierskich (CC-Link IE TSN, OPC UA, open62541, Siemens S7) oraz podatności lokalnych środowisk uruchomieniowych AI. Opisujemy, co faktycznie pokazano, i proponujemy listę działań na 30 dni.'
coverImage: '/images/post-blackhat-2026/cover-blackhat-2026.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"cyberbezpieczenstwo","label":"cyberbezpieczenstwo"},{"value":"itOt","label":"it-ot"},{"value":"nis2","label":"NIS2"}]
publishedAt: '2026-08-24T08:00:00.000Z'
---

*Artykuł poprawiony 6 października 2026 r. Pierwsza wersja zawierała nieprawdziwe informacje o prezentacjach, podatnościach i pakietach oprogramowania.*

Black Hat USA 2026 trwał od 1 do 6 sierpnia w Mandalay Bay w Las Vegas, a prelekcje odbyły się 5 i 6 sierpnia. Od 6 do 9 sierpnia w Las Vegas Convention Center odbywał się DEF CON 34. Z obu programów wybraliśmy trzy wątki, które bezpośrednio dotyczą sieci OT i otoczenia systemu MES w zakładzie produkcyjnym:

1. przebieg ataku na polską energetykę i firmę produkcyjną z 29 grudnia 2025 r.,
2. słabości protokołów przemysłowych i oprogramowania inżynierskiego,
3. bezpieczeństwo modeli AI uruchamianych lokalnie, na brzegu sieci.

Ton nadał panel o infrastrukturze krytycznej na Black Hat. Matthew Rogers, który w amerykańskiej agencji CISA odpowiada za cyberbezpieczeństwo OT, stwierdził, że w żadnej z obserwowanych w ostatnich miesiącach aktywności atakujący nie wykorzystali w OT ani jednej podatności z numerem CVE. Dodał, że komunikacja w tych sieciach zwykle nie jest ani szyfrowana, ani podpisywana (Cybersecurity Dive, 6.08.2026). Dwa pierwsze wątki poniżej to potwierdzają: atakujący wchodzą przez domyślne hasła, otwarte interfejsy administracyjne i słabo odseparowane sieci. Trzeci dotyczy nowszej warstwy, czyli modeli AI uruchamianych w zakładzie.

## Wektor 1 — od farmy wiatrowej do elektrociepłowni przez prywatny APN

### Co się stało 29 grudnia 2025 r.

Według raportu CERT Polska z 30 stycznia 2026 r. skoordynowane ataki z 29 grudnia objęły co najmniej 30 farm wiatrowych i fotowoltaicznych, elektrociepłownię dostarczającą ciepło do blisko pół miliona odbiorców oraz prywatną firmę z sektora produkcyjnego. Wszystkie miały charakter wyłącznie niszczący, bez żądania okupu. Infrastruktura atakującego w dużym stopniu pokrywała się z grupami aktywności opisywanymi jako Static Tundra, Berserk Bear, Ghost Blizzard i Dragonfly.

Na farmach punktem wejścia były urządzenia FortiGate pełniące rolę koncentratora VPN i zapory sieciowej. Interfejs VPN był dostępny z internetu i pozwalał logować się bez uwierzytelniania wieloskładnikowego. Dalej atakujący korzystał z domyślnych danych logowania:
- na sterownikach Hitachi RTU560 wgrał uszkodzone oprogramowanie układowe,
- serwery portów szeregowych Moxa NPort przywracał do ustawień fabrycznych, zmieniał w nich hasło i ustawiał nieosiągalny adres IP 127.0.0.1.

Produkcja energii trwała, ale farmy straciły łączność z operatorami systemów dystrybucyjnych. W dużej elektrociepłowni system EDR zablokował uruchomienie programu niszczącego dane (wipera, nazwanego przez CERT Polska DynoWiper).

Firma produkcyjna była według CERT Polska celem oportunistycznym, niezwiązanym z pozostałymi. Atakujący wszedł przez urządzenie brzegowe Fortinet, które wcześniej było podatne. Jego konfiguracja wcześniej wyciekła i trafiła m.in. na forum przestępcze. Po przejęciu uprawnień administratora domeny atakujący rozesłał skrypt niszczący pliki (LazyWiper, napisany w PowerShell) przez obiekt zasad grupy.

CERT Polska opisuje też, że atakujący logował się do usług M365 danymi przejętymi w sieciach lokalnych. Pobierał z nich pliki i wiadomości dotyczące modernizacji sieci OT, systemów SCADA i prac technicznych w zaatakowanych organizacjach.

### Co pokazano na DEF CON 34

8 sierpnia na ścieżce głównej DEF CON 34 wystąpił Marcin Dudek, kierujący CERT Polska, z prezentacją „From Wind Farm to CHP Plant: The Untold Story of Lateral Movement in a Polish Energy Sector Attack”. Tego samego dnia CERT Polska opublikował raport uzupełniający. Dotyczy on drugiej, mniejszej elektrociepłowni, która dostarcza ciepło do około 50 tys. mieszkańców.

Ścieżka ataku zrekonstruowana przez CERT Polska wyglądała tak:

1. Dostęp do koncentratora VPN FortiGate na farmie wiatrowej.
2. Logowanie przez SSH do routera komórkowego Teltonika RUTX50 i najpewniej zestawienie tunelu SSH do prywatnego APN, czyli wydzielonej sieci transmisji danych operatora systemu dystrybucyjnego w sieci komórkowej.
3. Od 18 grudnia skanowanie prywatnego APN w poszukiwaniu usług VNC i HTTP oraz protokołów S7 i Modbus.
4. W elektrociepłowni atakujący znalazł sterownik WAGO PFC200 z wbudowanym modemem komórkowym. Jego interfejs WWW był dostępny od strony APN i chroniony domyślnym hasłem konta „admin”. Atakujący włączył na nim SSH i zrobił z niego bramę do sieci OT zakładu.
5. Od 18 do 25 grudnia trwał rekonesans, m.in. skanowanie portów S7 (102 TCP), Modbus (502 TCP) i CODESYS (11740 TCP). 25 grudnia atakujący połączył się protokołem S7 z trzema sterownikami Siemens.
6. 29 grudnia atakujący działał w sieci zakładu mniej więcej od 5:30 do 10:10. Według relacji personelu sterowniki S7-300, S7-1200 i S7-1500 zostały przełączone w tryb STOP i zabezpieczone hasłem. Turbina parowa i stacja uzdatniania wody technologicznej stanęły, a proces kogeneracji został przerwany.

Dzięki szybkiej reakcji operatorów odbiorcy nie odczuli przerwy w dostawach ciepła ani energii elektrycznej. Zakład początkowo uznał zdarzenie za błąd inżynierów wykonawcy, który prowadził prace serwisowe, i zgłosił je tylko informacyjnie. CERT Polska podjął obsługę incydentu przy założeniu, że może to być cyberatak, a analiza trwała ponad trzy miesiące. Przywrócenie sterowników do ustawień fabrycznych skróciło przestój, ale usunęło z nich dzienniki zdarzeń. Sterownik WAGO, który posłużył za bramę, atakujący uszkodził, niszcząc tablicę partycji.

Według CERT Polska to pierwszy zaobserwowany przypadek realnego ataku, w którym do sieci OT wchodzi się przez prywatny APN. Umożliwiła to konfiguracja, w której dowolne urządzenia w APN mogły się ze sobą komunikować. Z ankiet przeprowadzonych przez CERT Polska wynika, że taka konfiguracja była w Polsce powszechna, a według zespołu podobne ustawienia są szeroko stosowane także w innych krajach. Ten sam incydent omawiał w ICS Village Joe Slowik (Dataminr) w wystąpieniu „Lessons Learned from Poland and Beyond”.

### Co to oznacza dla fabryki

Raport uzupełniający kończy się zaleceniami dla podmiotów korzystających z prywatnych APN:
- włączyć izolację klientów, czyli zablokować bezpośrednią komunikację między urządzeniami w APN,
- traktować APN jako sieć niezaufaną, a jeśli organizacja nie kontroluje jego konfiguracji, to na równi z internetem,
- dopuszczać ruch między siecią OT a bramą APN tylko według listy dozwolonych połączeń,
- monitorować ten ruch i centralnie zbierać dzienniki zdarzeń,
- nie udostępniać od strony APN interfejsów administracyjnych (WWW, SSH, Telnet),
- zmienić domyślne hasła,
- objąć APN testami penetracyjnymi i przeglądami architektury.

Nasza ocena: routery komórkowe, sterowniki z modemami i zdalny dostęp serwisowy dostawców maszyn są też w zakładach produkcyjnych. Te zalecenia warto więc stosować szerzej niż tylko w energetyce. Druga lekcja pochodzi wprost od CERT Polska: zgłaszać nie tylko potwierdzone incydenty, ale też niewyjaśnione awarie i zakłócenia pracy.

## Wektor 2 — protokoły przemysłowe i oprogramowanie inżynierskie

### CC-Link IE TSN: zmiana wartości wejść i wyjść

Nozomi Networks przygotowało na Black Hat USA 2026 nagraną sesję „Deterministic Chaos — Exploiting and Securing Predictable Timing in TSN Industrial Networks”, dostępną dla uczestników konferencji. Prowadzili ją Alessandro Di Pinto, Luca Cremona i Gabriele Quagliarella. Badacze opisali atak na protokół CC-Link IE TSN firmy Mitsubishi Electric. Łączy on podatności dnia zerowego w przełącznikach TSN ze wstrzykiwaniem pakietów na poziomie protokołu. Efekt to precyzyjna i trudna do wykrycia zmiana wartości wejść i wyjść przesyłanych między sterownikiem a urządzeniami polowymi.

30 lipca 2026 r. Mitsubishi Electric opublikowało komunikat o podatności CVE-2026-13584 w protokole CC-Link IE TSN, z podziękowaniem dla zespołu Nozomi Networks za jej zgłoszenie. Kategoria to CWE-924 (niewystarczające egzekwowanie integralności wiadomości), a ocena CVSS v4 wynosi 7,1. Atakujący z dostępem do sieci CC-Link IE TSN może przy określonych warunkach czasowych zmieniać dane sterujące. Podatność dotyczy wszystkich wersji wymienionych produktów: sterowników MELSEC, modułów ruchu, falowników, serwonapędów i kontrolerów robotów. Producent nie wskazuje wersji z poprawką. Zaleca natomiast:
- ograniczenie fizycznego dostępu (kontrola wejść na obiekt, zamykane szafy sterownicze, blokady portów Ethernet),
- pracę w zaufanej sieci oddzielonej zaporą,
- właściwe ustawienie haseł i uprawnień na urządzeniach na granicy sieci.

### Oprogramowanie do projektowania HMI jako część łańcucha dostaw

Na DEF CON 34 badacze firmy CYTUR (Jiwoon Yoo, TaeWoo Kim, Eunji Choi) przedstawili wystąpienie „Drag, Drop, Deploy, Compromise”. Opisali podatności w oprogramowaniu inżynierskim do projektowania ekranów HMI:
- uszkodzenie pamięci przy otwieraniu plików projektu,
- przejmowanie bibliotek DLL przez kolejność ich wyszukiwania,
- ładowanie niepodpisanych komponentów,
- podszywanie się pod elementy interfejsu przez cichą instalację czcionek,
- przechodzenie na komunikację jawną, gdy bezpieczne połączenie OPC UA się nie uda.

Główna teza wystąpienia: łańcuch dostaw w automatyce nie zaczyna się dopiero na serwerze aktualizacji producenta. Należą do niego również pliki projektów od klientów, szablony od integratorów i kopie zapasowe z prac serwisowych.

### open62541: seria podatności z przełomu lipca i sierpnia

Od 30 lipca do 6 sierpnia 2026 r. w bazie NVD opublikowano kilkanaście wpisów CVE dotyczących open62541, otwartej implementacji OPC UA w języku C. Dominują odmowa usługi i błędy pamięci. Trzy przykłady:
- **CVE-2026-65423** (CVSS 8,8, 30 lipca): przepełnienie przy obliczaniu arrayDimensions prowadzi do zapisu poza buforem. Podatne są wersje do 1.3.17, 1.4.16 i 1.5.4.
- **CVE-2026-63035** (CVSS 8,1, 30 lipca): użycie zwolnionej pamięci w usłudze TransferSubscriptions, które według opisu może pozwolić uwierzytelnionemu atakującemu na wykonanie kodu.
- **CVE-2026-67870** (CVSS 9,8, sierpień): niepełna walidacja w obsłudze AddReferences w wersji 1.5.5 pozwala zdalnie zatrzymać serwer.

To błędy w kodzie, a nie słabości pozwalające podsłuchać czy podmienić komunikację OPC UA.

27 lipca opiekunowie projektu wydali wersje utrzymaniowe 1.5.6 i 1.4.18, a 20 sierpnia wersje 1.5.7 i 1.4.19. W notatkach do tych wydań wymieniono poprawki w tych samych obszarach, których dotyczą opisy CVE: arrayDimensions, AddReferences, GDS, HistoryRead i obsługa discoveryUrl. Nie każdy wpis wskazuje wersję z poprawką, dlatego bezpieczniej przyjąć najnowsze wydanie z danej gałęzi.

Problemy z OPC UA to jednak nie tylko błędy w kodzie. Badanie wdrożeń OPC UA osiągalnych z internetu (Dahlmanns i in., IMC 2020) wykazało błędy konfiguracji zabezpieczeń w 92% z nich:
- brak kontroli dostępu w 24% hostów,
- wyłączone funkcje bezpieczeństwa w 24%,
- przestarzałe algorytmy kryptograficzne w 25%.

Kilkaset urządzeń współdzieliło ten sam certyfikat.

### Siemens S7: komunikat CISA AA26-231A

19 sierpnia 2026 r. NSA, CISA, FBI, amerykański Departament Energii i agencja EPA wydały komunikat AA26-231A o aktywnym zagrożeniu dla sterowników Siemens S7, od serii S7-200 po S7-1500. Atakujący wyszukują w serwisach skanujących internet (np. Censys, ZoomEye) sterowniki wystawione do sieci lub słabo odseparowane. Używają skryptów w Pythonie wygenerowanych z pomocą AI i opartych na bibliotece snap7. Skrypty podszywają się pod narzędzia monitorujące i odczytują oraz zapisują bloki danych sterownika. Wśród zagrożonych sektorów komunikat wymienia przemysł o znaczeniu krytycznym (Critical Manufacturing), energetykę, gospodarkę wodno-ściekową, chemię, rolnictwo i żywność oraz obiekty komercyjne.

Komunikat zaleca inwentaryzację sterowników, pilne wgranie krytycznych poprawek, weryfikację segmentacji (bez dostępu do sterowników z internetu), wzmocnienie kontroli dostępu, pełne rejestrowanie zdarzeń oraz utwardzenie konfiguracji S7. To ten sam protokół, przez który zatrzymano sterowniki w polskiej elektrociepłowni.

## Wektor 3 — lokalne AI na brzegu sieci

W majowym artykule o lokalnym RAG opisaliśmy architekturę, w której model Phi-4 działa na Jetson Orin przez llama.cpp lub Ollama. 7 sierpnia na ścieżce głównej DEF CON 34 Ofek Itach i Vladimir Tokarev z firmy Cyera wystąpili z prezentacją „Breaking Local AI Runtimes: Exploiting llama.cpp and Ollama”. Pokazali, że takie środowiska uruchomieniowe to zwykłe oprogramowanie natywne, ze wszystkimi jego błędami:

- W integracji llama.cpp z Androidem kod Java może zwolnić natywny kontekst modelu, którego kod natywny wciąż używa. Autorzy pokazali wykonanie kodu w aplikacji osadzającej model.
- W serwerze llama.cpp zwalnianie bezczynnego modelu może wejść w wyścig z aktywnym zapytaniem i zostawić wskaźnik do zwolnionej pamięci. Autorzy pokazali zdalne wykorzystanie błędu i opisali kroki brakujące do stabilnego wykonania kodu.
- W Ollama złośliwe metadane pliku GGUF powodują podczas kwantyzacji odczyt poza buforem i zwrot fragmentów pamięci.

Drugi temat to kradzież samego modelu. Te prace nie były prezentowane w Las Vegas, ale pokazują stan badań:
- **BarraCUDA** (USENIX Security 2025; Radboud University, Masaryk University, Ruhr-Universität Bochum): odzyskiwanie wag sieci neuronowych z Jetson Nano i Jetson Orin Nano przez analizę emisji elektromagnetycznej, przy fizycznym dostępie do urządzenia. Dla Orin Nano z wagami INT8 zbieranie pomiarów trwało dobę, wyrównanie kolejną, a potem około 5 minut na wagę. Odtworzono przy tym tylko wagi pierwszej warstwy.
- **Kraken** (IEEE SaTML 2026), kontynuacja tego zespołu: pierwsze wydobycie parametrów z rdzeni Tensor w GPU oraz wstępna analiza wycieku hiperparametrów i wag modeli językowych z odległości 100 cm, przez szkło.

## Bariery i ograniczenia

- **Nie wszystko da się załatać.** Dla CVE-2026-13584 producent zaleca środki ograniczające ryzyko, nie aktualizację. Rogers zauważył, że w USA brakuje urządzeń sterowania, by wymieniać sprzęt na dużą skalę.
- **Biblioteki w cudzych produktach.** Jeśli open62541 jest wbudowana w produkt dostawcy SCADA lub HMI, tempo aktualizacji zależy od niego (nasza ocena).
- **Szybkie przywrócenie pracy kontra analiza.** Reset do ustawień fabrycznych skraca przestój, ale niszczy ślady, jak w opisanej elektrociepłowni.
- **Kanały boczne to nie zagrożenie z dnia na dzień.** BarraCUDA wymagała fizycznego dostępu, sprzętu pomiarowego i kilku dni pracy. Ryzyko jest realne dla cennych modeli, ale ma niższy priorytet niż podstawy z wektorów 1 i 2 (nasza ocena).
- **Zabezpieczenia protokołu nie zastąpią segmentacji.** Przejście narzędzi HMI na komunikację jawną i wyniki badania IMC 2020 pokazują, że dostępne zabezpieczenia OPC UA nie zawsze są włączone.

## Lista działań na 30 dni

Poniższa lista to nasza rekomendacja na podstawie opisanych źródeł, a nie wymóg któregokolwiek z nich.

**Tydzień 1 — drogi dostępu z zewnątrz.**
1. Spis wszystkich punktów zdalnego dostępu: koncentratorów VPN, routerów komórkowych, sterowników z modemami i dostępu serwisowego dostawców maszyn. Uwierzytelnianie wieloskładnikowe na każdym VPN.
2. Przegląd domyślnych haseł na urządzeniach OT: RTU, serwerach portów szeregowych, sterownikach i przełącznikach.

**Tydzień 2 — segmentacja sieci.**
3. Ruch między siecią OT a łączami WAN, APN i siecią biurową tylko według listy dozwolonych połączeń, z zasadą „domyślnie zamknięte”. Szczegóły opisaliśmy w artykule o [komunikacji między siecią IT a OT](/blog/dobre-praktyki-komunikacji-miedzy-siecia-it-a-ot-jak-zbudowac-bezpieczna-i-nowoczesna-architekture-przemyslowa).
4. Wyłączenie interfejsów WWW, SSH i Telnet od strony sieci zewnętrznych. Sprawdzenie, że żaden sterownik S7 nie jest osiągalny z internetu.
5. Przy prywatnym APN: rozmowa z operatorem o izolacji klientów.

**Tydzień 3 — oprogramowanie.**
6. Spis komponentów OPC UA w MES, SCADA i HMI. Pytanie do dostawców o wersję open62541 i plan aktualizacji. Tam, gdzie macie wpływ na wersję, minimum to 1.5.7 lub 1.4.19.
7. Stacje inżynierskie: pliki projektów HMI i PLC tylko ze sprawdzonych źródeł. Przegląd ustawień OPC UA pod kątem przechodzenia w tryb bez zabezpieczeń.
8. Lokalne modele AI: aktualne wersje llama.cpp i Ollama, pliki GGUF tylko z zaufanych źródeł, serwer modelu niedostępny spoza swojego segmentu, urządzenia brzegowe w zamykanych szafach. Więcej o tej architekturze w artykule o [lokalnym RAG na Jetson Orin](/blog/lokalny-rag-w-fabryce-phi-4-sqlite-vec-na-jetson-orin-asystent-mes-bez-wycieku-danych-do-chmury).

**Tydzień 4 — wykrywanie i reagowanie.**
9. Centralne zbieranie dzienników zdarzeń z urządzeń brzegowych, bram APN i stacji inżynierskich. Monitorowanie nietypowych połączeń S7 i Modbus.
10. Procedura: każda niewyjaśniona awaria sterownika trafia do zespołu bezpieczeństwa. Przed resetem do ustawień fabrycznych trzeba zabezpieczyć, co się da: dzienniki, konfigurację i kopię logiki.
11. Ćwiczenia teoretyczne (tabletop) na scenariuszu z polskiej elektrociepłowni.

Art. 23 dyrektywy NIS2 nakłada na podmioty kluczowe i ważne trzy terminy: wczesne ostrzeżenie w ciągu 24 godzin od wykrycia poważnego incydentu, zgłoszenie w ciągu 72 godzin i raport końcowy w ciągu miesiąca. Punkty 9–11 bezpośrednio pomagają tych terminów dotrzymać. Kontekst krajowy opisaliśmy w artykule o [NIS2 i KSC2](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki).

## Aktualizacja (6 października 2026)

- **open62541.** 6 września ukazały się wersje 1.5.8 i 1.4.20, a 4 października wersje 1.5.9 i 1.4.21. 31 sierpnia w NVD opublikowano kolejną podatność, CVE-2026-82623 (CVSS 5,3). Aktualne zalecenie: najnowsze wydanie z używanej gałęzi.
- **CC-Link IE TSN.** 17 września Mitsubishi Electric zaktualizowało komunikat o CVE-2026-13584 i zmieniło listę podatnych produktów. W zaktualizowanym komunikacie ICSA-26-211-07 CISA podaje, że poprawka nie jest planowana.
- **Ransomware.** Według NCC Group w lipcu 2026 r. odnotowano 894 ataki ransomware, o 22% więcej niż w czerwcu. Na sektor przemysłowy przypadło 28% z nich, na Europę 29% (raport z 26 sierpnia). W sierpniu było 1073 ataki: 31% dotyczyło przemysłu, 26% Europy, a najaktywniejsza była grupa Qilin ze 164 atakami (Infosecurity Magazine, 23 września).
- **Korekta.** Pierwsza wersja artykułu przypisywała bibliotece open62541 numer CVE-2026-38472. Ten numer dotyczy w rzeczywistości podatności XSS w aplikacji GazellePW. Opisane wcześniej prezentacje Claroty i Sonatype, atak na Jetson Orin AGX, pakiety Pythona i biblioteka do znakowania modeli nie mają potwierdzenia w źródłach, dlatego usunęliśmy je z tekstu.

---

## Źródła

- [CERT Polska — Energy Sector Incident Report, 30.01.2026](https://cert.pl/en/posts/2026/01/incident-report-energy-sector-2025/) — przebieg ataków z 29.12.2025 (farmy, elektrociepłownia, firma produkcyjna)
- [CERT Polska — Follow-Up Report of the December 2025 Energy Sector Incident, 08.08.2026](https://cert.pl/en/posts/2026/08/incident-follow-up-report-energy-sector-2025/) — druga elektrociepłownia, prywatny APN, zalecenia
- [DEF CON 34 — prelegenci ścieżki głównej](https://defcon.org/html/defcon-34/dc-34-speakers.html) — wystąpienia CERT Polska i Cyera
- [DEF CON 34 — wystąpienia Creator Talks](https://defcon.org/html/defcon-34/dc-34-creator-talks.html) — wystąpienia CYTUR (HMI) i Joe Slowika (ICS Village)
- [DEF CON 34 — strona konferencji](https://defcon.org/html/defcon-34/dc-34-index.html) — termin i miejsce
- [Black Hat USA 2026 — przewodnik po konferencji](https://www.decryptiondigest.com/blog/black-hat-usa-2026-guide) — termin szkoleń i prelekcji
- [Nozomi Networks — Black Hat USA 2026](https://www.nozominetworks.com/featured-event/black-hat-2026) — sesja „Deterministic Chaos” o CC-Link IE TSN
- [Mitsubishi Electric — komunikat 2026-005 (CVE-2026-13584)](https://www.mitsubishielectric.com/psirt/vulnerability/pdf/2026-005_en.pdf)
- [CISA — ICSA-26-211-07, Mitsubishi Electric CC-Link IE TSN](https://www.cisa.gov/news-events/ics-advisories/icsa-26-211-07)
- [OpenCVE — podatności open62541](https://app.opencve.io/cve/?vendor=open62541)
- [OpenCVE — CVE-2026-65423](https://app.opencve.io/cve/CVE-2026-65423), [CVE-2026-63035](https://app.opencve.io/cve/CVE-2026-63035), [CVE-2026-67870](https://app.opencve.io/cve/CVE-2026-67870)
- [open62541 — wydania w serwisie GitHub](https://github.com/open62541/open62541/releases) — notatki do wersji 1.4.18–1.4.21 i 1.5.6–1.5.9
- [Dahlmanns i in., „Easing the Conscience with OPC UA”, IMC 2020](https://arxiv.org/abs/2010.13539)
- [CISA — AA26-231A, Defending Against an Active Threat to Siemens S7 Series PLCs, 19.08.2026](https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-231a)
- [Cybersecurity Dive — panel o atakach na OT na Black Hat USA 2026, 6.08.2026](https://www.cybersecuritydive.com/news/critical-infrastructure-destructive-cyberattacks-black-hat/827260/)
- [Horvath i in., „BarraCUDA: Edge GPUs do Leak DNN Weights”, USENIX Security 2025](https://www.usenix.org/conference/usenixsecurity25/presentation/horvath) oraz [wersja arXiv](https://arxiv.org/abs/2312.07783)
- [Horvath i in., „Kraken: Higher-order EM Side-Channel Attacks on DNNs in Near and Far Field”, IEEE SaTML 2026](https://arxiv.org/abs/2603.02891)
- [Advisera — NIS2, art. 23 „Reporting obligations”](https://advisera.com/nis2/reporting-obligations/)
- [NCC Group — Monthly Threat Pulse, lipiec 2026](https://www.nccgroup.com/newsroom/ncc-group-monthly-threat-pulse-review-of-july-2026/)
- [Infosecurity Magazine — rekordowy sierpień 2026 w danych NCC Group](https://www.infosecurity-magazine.com/news/ransomware-attacks-reach-record/)
- [OpenCVE — CVE-2026-38472 (GazellePW)](https://app.opencve.io/cve/CVE-2026-38472) — do korekty pierwszej wersji

## Powiązane artykuły

- [NIS2 i KSC2 w 2026: jak MES staje się elementem zgodności cyberbezpieczeństwa polskiej fabryki](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki)
- [Dobre praktyki komunikacji między siecią IT a OT](/blog/dobre-praktyki-komunikacji-miedzy-siecia-it-a-ot-jak-zbudowac-bezpieczna-i-nowoczesna-architekture-przemyslowa)
- [Lokalny RAG w fabryce: Phi-4 + sqlite-vec na Jetson Orin](/blog/lokalny-rag-w-fabryce-phi-4-sqlite-vec-na-jetson-orin-asystent-mes-bez-wycieku-danych-do-chmury)
- [OmniMES — cyberbezpieczeństwo i zgodność z CRA](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/cyberbezpieczenstwo-i-zgodnosc-cra-6dbPWZS59e)
