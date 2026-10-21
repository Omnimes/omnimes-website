---
title: 'Unified Namespace w praktyce: jedno źródło danych fabryki na MQTT i Sparkplug B'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'unified-namespace-w-praktyce-jedno-zrodlo-danych-fabryki-na-mqtt-i-sparkplug-b'
description: 'Jak zbudować Unified Namespace na brokerze MQTT i Sparkplug B bez wymiany sterowników: hierarchia tematów według ISA-95, certyfikaty narodzin i śmierci, kontrakty danych, wysoka dostępność brokera, segmentacja sieci IT i OT oraz plan na pierwsze 30 dni.'
coverImage: '/images/post-uns-sparkplug/cover-uns-sparkplug-pl.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"uns","label":"UNS"},{"value":"mqtt","label":"MQTT"},{"value":"sparkplugB","label":"Sparkplug B"}]
publishedAt: '2026-10-12T08:00:00.000Z'
---

Weźmy przykładowy zakład, w którym dane z jednej maszyny trafiają do kilku systemów, a każdą z tych dróg ktoś zbudował osobno. SCADA odpytuje sterownik przez OPC, historian ma własny kolektor, MES czyta te same sygnały innym sterownikiem komunikacyjnym, liczniki energii idą przez bramkę Modbus do arkusza, a ERP dostaje nocny eksport w CSV.

Z prostego rachunku dziesięć systemów połączonych każdy z każdym to do 45 interfejsów, dwadzieścia to już do 190. **Unified Namespace (UNS)** odwraca ten rachunek: każdy system łączy się raz, z brokerem, publikuje to, co wie, i subskrybuje to, czego potrzebuje. Opisujemy, jak zbudować taką architekturę na MQTT i Sparkplug B bez wymiany istniejącej automatyki oraz gdzie kończą się jej możliwości.

## Skąd się wziął Unified Namespace

Inductive Automation podaje, że termin ukuł i spopularyzował Walker Reynolds, architekt rozwiązań IIoT i Przemysłu 4.0. Według Kalypso Reynolds stworzył UNS w 2005 roku (Kalypso, 2025). W lutym 2025 Reynolds i jego zespół z 4.0 Solutions zorganizowali w Dallas konferencję ProveIt!, na której dostawcy musieli na scenie dowieść, że ich rozwiązania działają. Według HiveMQ przyjechało 630 osób, w 65% użytkowników końcowych z przemysłu (HiveMQ, 2025).

Inductive Automation definiuje UNS jako ustandaryzowany sposób organizowania i nazywania danych, który zawiera strukturę przedsiębiorstwa i jego zdarzenia w jednym interfejsie komunikacyjnym. Kalypso dodaje, że UNS jest modelem, a nie oprogramowaniem (Kalypso, 2025). Nasz wniosek: można kupić broker i bramki, ale przestrzeń nazw trzeba zaprojektować samemu.

### Hierarchia tematów według ISA-95

Szkielet przestrzeni nazw daje ISA-95 (IEC 62264), zestaw norm integracji systemów biznesowych ze sterowaniem produkcją (ISA). Z hierarchii ISA-95 bierze się typowa ścieżka tematu: przedsiębiorstwo, zakład, obszar, linia, gniazdo (HiveMQ, 2026). Przykładowe tematy:

```
acme/gliwice/tloczenie/linia-3/prasa-2/stan
acme/gliwice/tloczenie/linia-3/prasa-2/licznik-sztuk
acme/gliwice/tloczenie/linia-3/prasa-2/energia/moc-czynna
acme/gliwice/tloczenie/linia-3/oee
```

Klasyczna architektura ISA-95 opierała się na połączeniach punkt-punkt między warstwami, takimi jak SCADA, MES i ERP (Inductive Automation). W UNS węzły publikują dane do wspólnego miejsca, a pozostałe pobierają je przez subskrypcję (Deloitte).

## Broker zamiast pajęczyny integracji

MQTT nadaje się do tej roli z powodu, dla którego powstał. Andy Stanford-Clark z IBM i Arlen Nipper z firmy Arcom zaprojektowali go w 1999 roku do łączności z rurociągami naftowymi przez satelitę, przy minimalnym zużyciu pasma i baterii (HiveMQ, MQTT Essentials).

W UNS liczą się trzy cechy protokołu. Klient może się połączyć z brokerem, nie wiedząc nic o innych klientach, więc urządzenie jest odsprzęgnięte od aplikacji, która czyta jego dane. Połączenie nawiązuje klient, wysyłając do brokera pakiet CONNECT (Eclipse Foundation, 2022). Nowy odbiorca to nowa subskrypcja, a nie zmiana po stronie źródła.

Broker nie jest jednak bazą danych. Przechowuje co najwyżej ostatnią otrzymaną wiadomość w temacie (Automation World, 2023), więc historia i zapytania wymagają osobnego odbiorcy, który zapisuje strumień.

## Co dokłada Sparkplug B

Czyste MQTT określa transport, ale nie strukturę tematu, format wiadomości ani to, czy urządzenie działa. Te luki wypełnia Sparkplug.

### Certyfikaty narodzin i śmierci

Węzeł brzegowy zaczyna sesję od wiadomości NBIRTH, a podłączone do niego urządzenie od DBIRTH. Certyfikat narodzin zawiera wszystkie metryki, które węzeł będzie publikował, z typami danych i bieżącymi wartościami. Certyfikat śmierci NDEATH węzeł rejestruje już w pakiecie CONNECT jako testament MQTT (Will Message), więc broker dostarczy go także wtedy, gdy połączenie zerwie się bez pożegnania. Licznik `bdSeq` w zakresie od 0 do 255 wiąże konkretną śmierć z konkretnymi narodzinami (Eclipse Foundation, 2022).

Wniosek dla MES: bez certyfikatu śmierci system nie odróżni postoju od przerwanej komunikacji, bo w obu przypadkach widzi zero sztuk na minutę. Z certyfikatem wie, że dane są nieaktualne, i nie dolicza fałszywego przestoju do OEE.

### Raportowanie przy zmianie

Po narodzinach węzeł wysyła już tylko zmiany. Specyfikacja stwierdza wprost, że dane nie powinny być publikowane okresowo, tylko w trybie raportowania przy zmianie (RBE). Każda wiadomość niesie numer sekwencyjny od 0 do 255. Gdy wiadomości przychodzą w złej kolejności albo są uszkodzone, aplikacja może zażądać ponownych narodzin metryką `Node Control/Rebirth` (Eclipse Foundation, 2022).

### Aplikacja nadrzędna i jej stan

Najważniejszy odbiorca danych, w tradycyjnej SCADA serwer nadrzędny, publikuje swój stan w temacie `spBv1.0/STATE/` z własnym identyfikatorem, jako JSON z polami `online` i `timestamp`. Węzeł, który widzi, że aplikacja nadrzędna jest niedostępna, może przechowywać dane lokalnie i przesłać je jako historyczne po jej powrocie (Eclipse Foundation, 2022).

### Status formalny

Wersja 3.0.0 specyfikacji, rozwijanej przez Eclipse Foundation, ukazała się 16 listopada 2022 roku. 7 listopada 2023 fundacja ogłosiła jej publikację jako normy **ISO/IEC 20237:2023**, przyjętej w procedurze PAS komitetu JTC 1, i jednocześnie uruchomiła program zgodności produktów (Eclipse Foundation, 2023). W grupie roboczej są m.in. Chevron, Cirrus Link, HiveMQ i Inductive Automation. Aktualnym wydaniem pozostaje 3.0.0, a repozytorium przyjmuje już zmiany do 4.0.0 (Eclipse Sparkplug).

### Gdzie Sparkplug uwiera

Temat Sparkplug ma stałą strukturę `spBv1.0/group_id/typ/edge_node_id/device_id` (Eclipse Foundation, 2022). HiveMQ zwraca uwagę, że tak sztywne adresowanie utrudnia odwzorowanie hierarchii przedsiębiorstwa. Tak zwana metoda Parrisa upycha całą hierarchię w `group_id` z separatorami, np. `spBv1.0/Zaklad1:Obszar3:Linia4:Gniazdo2/NDATA/wezel1`. Metoda Schultza stawia osobne brokery na kolejnych poziomach i scala je w przestrzeń przedsiębiorstwa. Metryki jadą zbiorczo w wiadomościach, więc nie da się zasubskrybować pojedynczego punktu danych (HiveMQ, 2026).

Jednym z rozwiązań jest układ dwuwarstwowy: Sparkplug na brzegu sieci, gdzie liczy się stan sesji, i zwykłe tematy MQTT w przestrzeni przedsiębiorstwa. HiveMQ pokazywał go na konferencji ICC 2026: Ignition Edge pobierał tagi z OPC UA i publikował Sparkplug B, a broker dekodował go raz i rozsyłał jako zwykłe MQTT (HiveMQ, 2026).

## Co z tego mają MES, ERP i analityka

Poniższe dwa akapity to nasza ocena. **MES** dostaje zdarzenia w chwili ich wystąpienia, bez odpytywania sterowników, oraz wiarygodną informację o łączności, więc stany maszyn i OEE można liczyć z sygnałów zamiast z ręcznych wpisów.

**ERP** nie potrzebuje surowych tagów. Może subskrybować agregaty, na przykład liczbę dobrych sztuk na zlecenie, i publikować zlecenia, które MES przypisze do linii.

**Analityka i AI** dostają dane z kontekstem zapisanym w nazwie. Blisko 70% producentów wskazuje problemy z danymi, czyli jakość, kontekst i walidację, jako największą przeszkodę we wdrażaniu AI (Deloitte, 2024). W badaniu 600 menedżerów dużych firm produkcyjnych działających w USA 54% deklaruje standard danych w postaci ujednoliconego modelu, a 45% standard architektury (Deloitte, 2025). IoT Analytics szacuje liczbę podłączonych urządzeń IoT na 21,1 mld na koniec 2025 roku i prognozuje 39 mld w 2030 (IoT Analytics, 2025).

## Kto to wdraża

- **Ford** wybrał HiveMQ jako szkielet ogólnofirmowego systemu monitorowania IIoT dla tysięcy maszyn w każdym z kilkudziesięciu zakładów. Gopalakrishnan Rajaram, architekt systemów przemysłowych Forda, mówi o ogromnych oszczędnościach po odejściu od rozproszonej infrastruktury. Studium nie używa nazw UNS ani Sparkplug (HiveMQ, 2025).
- **Mercedes-Benz** prowadzi na HiveMQ system diagnostyki pojazdów w 24 fabrykach: 10 tysięcy urządzeń testowych, około 470 mln wiadomości miesięcznie. Niedostępność dłuższa niż 10 minut grozi zatrzymaniem linii montażowej (HiveMQ, 2023).
- **Eli Lilly** od 2022 roku buduje platformę łączności, w której kilkaset instrumentów laboratoryjnych i produkcyjnych publikuje dane w Sparkplug B, a platforma łączy je z systemami MES i LES (HiveMQ).
- **Anglian Water**, największe pod względem obszaru przedsiębiorstwo wodno-kanalizacyjne w Wielkiej Brytanii, zbudowało UNS na MQTT z HiveMQ (HiveMQ, 2024). Według Novotek obejmuje on ponad 10 tysięcy obiektów i ponad milion punktów telemetrycznych (Novotek, 2025).

## Jak to wygląda w działającym MES

W OmniMES warstwę UNS tworzy broker **EMQX**. Wystawia MQTT na porcie 1883 i szyfrowane MQTTS na porcie 8883, a klientów brokera uwierzytelnia przez PostgreSQL. Usługa stream (Node.js) subskrybuje tematy Sparkplug, zapisuje pomiary do hypertable w **TimescaleDB** i utrzymuje ostatnie wartości. Od wersji 4.1 z lipca 2026 przyjmuje też pomiary z bezpośrednich tematów MQTT.

MES jest tu jednym z odbiorców, a nie środkiem architektury. W kategoriach UNS ostatnie wartości odpowiadają bieżącemu stanowi przestrzeni nazw, a hypertable przechowuje historię, której broker nie trzyma. Automatyczne wykrywanie sygnałów zawęża nasłuch filtrem nazwy tematu i regułami filtrowania. Z sygnałów liczone są stany maszyn i OEE, pulpity powstają w Redash, a serwer MCP udostępnia te same dane asystentom AI. Żaden z tych odbiorców nie wymaga zmian w sterowniku.

## Przestrzeń nazw, semantyka i kontrakty danych

Część kłopotów z UNS nie jest techniczna. Działy i lokalizacje spierają się o standardy nazw (Automation World, 2023). Kalypso ostrzega przed przekonaniem, że UNS sam przetłumaczy surowe dane na język biznesu (Kalypso, 2025). Proponujemy następujące zasady:

1. **Jeden właściciel przestrzeni nazw**, który zatwierdza nowe gałęzie i zmiany nazw.
2. **Konwencja zapisana przed pierwszą publikacją.** Małe litery, bez spacji i polskich znaków, stałe identyfikatory: „prasa-2", a nie „stara prasa przy bramie".
3. **Dane surowe osobno od przetworzonych.** HiveMQ proponuje gałąź brzegową na surowe tagi, gałąź funkcjonalną na wskaźniki takie jak OEE czy MTTR oraz wersjonowanie przestrzeni nazw (HiveMQ, 2026).
4. **Kontrakt dla każdego sygnału**: typ, jednostka, zakres, właściciel, odbiorcy. Sparkplug pomaga, bo typ danych każdej metryki jest w certyfikacie narodzin, dodatkowe właściwości można przekazać w strukturze PropertySet, a złożone struktury opisać szablonami definiowanymi wyłącznie w NBIRTH (Eclipse Foundation, 2022). Konsorcjum CESMII rozwija profile Smart Manufacturing, czyli modele informacji przenoszące dane razem z kontekstem (CESMII).
5. **Zmiana nazwy to zmiana niekompatybilna.** Każdy subskrybent traci dane, więc stary temat utrzymuje się równolegle przez okres przejściowy.

Przykład kontraktu:

```json
{
  "temat": "acme/gliwice/tloczenie/linia-3/prasa-2/energia/moc-czynna",
  "typ": "Float",
  "jednostka": "kW",
  "zakres": [0, 400],
  "raportowanie": "przy zmianie, martwa strefa 0,5 kW",
  "wlasciciel": "utrzymanie ruchu",
  "odbiorcy": ["MES", "OmniEnergy", "historian"]
}
```

## Wysoka dostępność brokera

Gdy wszystko idzie przez broker, staje się on pojedynczym punktem awarii, a w przykładzie Mercedesa 10 minut niedostępności grozi zatrzymaniem linii. Pierwszy układ to klaster. EMQX od wersji 5 dzieli węzły na typy core i replicant, a w teście producenta klaster 23 węzłów obsłużył 100 mln połączeń i milion wiadomości na sekundę (EMQ, 2022). Drugi to klastry brokerów w każdym zakładzie i klaster centralny w chmurze, co według HiveMQ ogranicza ryzyko pojedynczych punktów awarii (HiveMQ, 2026). W naszej ocenie klaster lokalny pozwala hali pracować dalej, gdy padnie łącze do centrali.

Od wersji 5.9, ogłoszonej 7 maja 2025, EMQX jest dystrybuowany na Business Source License 1.1. Pojedynczy węzeł działa produkcyjnie bez opłat, o ile EMQX nie jest oferowany jako usługa ani wbudowany w produkt sprzedawany dalej. Klaster wymaga licencji komercyjnej, a każda wersja przechodzi na Apache 2.0 cztery lata po wydaniu (EMQ, 2025).

## Bezpieczeństwo: TLS, uwierzytelnianie, segmentacja

Badacze z Texas A&M University podają, że według Shodana ponad 500 tysięcy urządzeń w internecie używa MQTT bez nazwy użytkownika i hasła; najwięcej odsłoniętych instalacji dotyczy automatyki domowej (Ghazi Asgar i Reddy, 2025). Specyfikacja Sparkplug nie reguluje bezpieczeństwa normatywnie, ale omawia trzy warstwy: TLS, uwierzytelnianie klientów i listy kontroli dostępu (Eclipse Foundation, 2022). Nasze zalecenia:

- **TLS na porcie 8883**, zarezerwowanym dla MQTT przez TLS (HiveMQ, 2026), przynajmniej dla połączeń opuszczających segment maszyn.
- **Osobne poświadczenia dla każdego węzła**, nigdy wspólne konto dla całej hali.
- **ACL na poziomie tematów.** Według wzoru ze specyfikacji węzeł E1 w grupie G1 publikuje tylko własne NBIRTH, NDATA i NDEATH, a subskrybuje tylko skierowane do siebie polecenia i stan aplikacji nadrzędnej. Utrudnia to podszywanie się pod inne węzły skradzionymi poświadczeniami (Eclipse Foundation, 2022).
- **Segmentacja IT i OT** według modelu stref i kanałów z IEC 62443, w którym przepływ informacji kontrolują zapory strefy zdemilitaryzowanej (Phoenix Contact). HiveMQ zaleca umieszczenie brokera w takiej strefie, z dodatkową zaporą chroniącą dostęp do systemów wewnętrznych (HiveMQ, 2026). Nasz wniosek: skoro połączenie nawiązuje klient, przy brokerze poza siecią sterowników nie trzeba otwierać do niej ruchu przychodzącego.
- **Polecenia osobno od odczytu.** Wiadomości NCMD i DCMD wysyłają polecenia do węzłów i urządzeń, a specyfikacja wskazuje ACL jako sposób na ograniczenie, kto może je publikować (Eclipse Foundation, 2022). Na start zostawcie to prawo tylko aplikacji nadrzędnej.

## Jak zacząć: plan na 30 dni

To nasz proponowany scenariusz, a nie wynik badania.

**Tydzień 1. Zakres i nazwy.** Jedna linia, kilkadziesiąt sygnałów, których MES naprawdę potrzebuje: stany, liczniki, energia. Spiszcie konwencję nazw i pierwsze kontrakty. Starsze sterowniki bez MQTT wymagają bramki konwertującej protokół (Automation World, 2023), tu na Sparkplug B. Program sterownika zostaje bez zmian.

**Tydzień 2. Broker i pierwszy węzeł.** Broker z TLS i ACL od pierwszego dnia, jeden węzeł brzegowy. Test wyciągniętego kabla: po odłączeniu sieci musi przyjść NDEATH, a MES ma pokazać brak komunikacji, nie postój.

**Tydzień 3. Pierwsi odbiorcy.** Historia, stany maszyn i OEE w MES. Porównajcie wyniki z raportami z tej samej zmiany.

**Tydzień 4. Test właściwy.** Podłączcie drugiego odbiorcę, na przykład pulpit energii albo agregat dla ERP, bez żadnej zmiany po stronie źródła. Jeśli trzeba było ruszyć sterownik albo bramkę, przestrzeń nazw wymaga poprawki, zanim obejmie kolejne linie. Na koniec zapiszcie plan wysokiej dostępności i nazwisko właściciela przestrzeni nazw.

## Bariery i ograniczenia

- **Broker nie zastąpi historiana.** Przechowuje tylko ostatnią wiadomość, a dane historyczne i transakcyjne wymagają dodatkowej integracji (Automation World, 2023).
- **Implementacje Sparkplug bywają niezgodne.** Nie wszyscy uczestnicy ekosystemu poprawnie dekodują wiadomości, a model zorientowany na urządzenia ogranicza swobodę modelowania (Automation World, 2023).
- **Polecenia przez MQTT są asynchroniczne**, więc potwierdzenie wykonania trzeba zaprogramować samemu (Automation World, 2023).
- **Kompetencje.** Potrzebna jest wiedza z architektury sieci, analityki danych i cyberbezpieczeństwa (Automation World, 2023).
- **Dojrzałość rynku.** Nawet zwolennicy przyznają, że UNS w jawnej postaci nie jest jeszcze szeroko wdrożony (UMH, 2024). Studia przypadku cytowane w tym tekście pochodzą od dostawców technologii i ich partnerów, a żadne nie podaje liczbowego zwrotu z inwestycji.
- **Koszt wysokiej dostępności**, szczególnie po zmianie licencji EMQX.

## Co z tego wynika

UNS to dyscyplina, nie produkt. Broker MQTT i Sparkplug B rozwiązują transport, stan sesji i wykrywanie sygnałów, ale wartość daje dopiero uporządkowana przestrzeń nazw z kontraktami danych, których żaden dostawca nie przygotuje za zakład.

Start nie wymaga wymiany automatyki. W naszej ocenie bramka obok istniejącego sterownika, broker z TLS i jedna linia wystarczą, żeby w miesiąc sprawdzić rzecz najważniejszą: czy drugi i trzeci odbiorca podłącza się bez dotykania źródła. Jeśli tak, każdy następny system kosztuje jedną subskrypcję zamiast projektu integracyjnego. Wysoką dostępność i segmentację trzeba zaplanować przed rozszerzeniem na cały zakład, bo wtedy od brokera zaczyna zależeć praca linii.

## Źródła

- Inductive Automation, *What is Unified Namespace (UNS)* — https://inductiveautomation.com/resources/article/uns-unified-namespace
- Kalypso, *Unified Namespace and Data Management*, maj 2025 — https://kalypso.com/viewpoints/entry/unified-namespace-and-data-management
- UMH, *Chapter 2: The Rise of the Unified Namespace*, styczeń 2024 — https://www.umh.app/insight/chapter-2-the-rise-of-the-unified-namespace
- HiveMQ, *Insights from ProveIt! 2025*, 2025 — https://www.hivemq.com/blog/insights-proveit-2025-unified-namespace-solutions-in-action/
- ISA, *ISA-95 Standard* — https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard
- HiveMQ, *MQTT Essentials Part 1* — https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt/
- Eclipse Foundation: specyfikacja Sparkplug 3.0.0, strona wydania (16 listopada 2022) i komunikat o ISO/IEC 20237 (7 listopada 2023) — https://sparkplug.eclipse.org/specification/version/3.0/documents/sparkplug-specification-3.0.0.pdf, https://projects.eclipse.org/projects/iot.sparkplug/releases/3.0.0/plan, https://newsroom.eclipse.org/node/39754
- Eclipse Sparkplug, grupa robocza i repozytorium — https://sparkplug.eclipse.org/, https://github.com/eclipse-sparkplug/sparkplug
- HiveMQ (Manditereza), *Implementing UNS with MQTT Sparkplug*, *Designing Your UNS Semantic Information Hierarchy* i *Securing UNS Architecture for IIoT*, 2026 — https://www.hivemq.com/blog/implementing-unified-namespace-uns-mqtt-sparkplug/, https://www.hivemq.com/blog/designing-your-uns-semantic-information-hierarchy/, https://www.hivemq.com/blog/securing-unified-namespace-architecture-for-iiot/
- HiveMQ, *HiveMQ at ICC 2026*, 2 października 2026 — https://www.hivemq.com/blog/hivemq-ignition-icc-industrial-data-context/
- Deloitte, *Industrial DataOps and unified namespace* — https://www.deloitte.com/us/en/services/consulting/articles/industrial-dataops-and-unified-namespace.html
- Deloitte, *2025 Manufacturing Industry Outlook*, 20 listopada 2024 — https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-industry-outlook/2025.html
- Deloitte, *2025 Smart Manufacturing and Operations Survey*, 2025 — https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/2025-smart-manufacturing-survey.html
- IoT Analytics, *Number of connected IoT devices*, 28 października 2025 — https://iot-analytics.com/number-connected-iot-devices/
- HiveMQ, studia przypadków Ford (2025), Mercedes-Benz (2023), Eli Lilly, Anglian Water (2024) — https://www.hivemq.com/case-studies/ford/, https://www.hivemq.com/case-studies/daimler/, https://www.hivemq.com/case-studies/eli-lilly/, https://www.hivemq.com/case-studies/anglian-water/
- Novotek, *How Anglian Water unified their OT data*, lipiec 2025 — https://www.novotek.com/co-uk/news/how-anglian-water-unified-their-ot-data-for-predictive-maintenance/
- EMQ, *How EMQX 5.0 achieves 100 million MQTT connections*, sierpień 2022 — https://www.emqx.com/en/blog/how-emqx-5-0-achieves-100-million-mqtt-connections
- EMQ, zmiana licencji na BSL 1.1, 7 maja 2025, oraz FAQ licencyjne — https://www.emqx.com/en/blog/adopting-business-source-license-to-accelerate-mqtt-and-ai-innovation, https://www.emqx.com/en/content/license-faq
- S. A. Ghazi Asgar, N. Reddy, *Analysis of Misconfigured IoT MQTT Deployments*, NDSS SDIoTSec 2025 — https://www.ndss-symposium.org/wp-content/uploads/sdiotsec25-10.pdf
- Phoenix Contact, *Zones and conduits* — https://engineer.plcnext.help/latest/ZonesConduits.htm
- CESMII, *SM Profiles* — https://www.cesmii.org/platform/sm-profiles/
- Automation World (Koreshkov), *Unified Namespace: Real-World Applications and Challenges*, 11 grudnia 2023 — https://www.automationworld.com/factory/iiot/article/33016191/unified-namespace-real-world-applications-and-challenges
