---
title: 'Cyber Resilience Act: od 11 września 2026 producent ma 24 godziny na zgłoszenie podatności — co to zmienia dla MES i fabryki'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'cyber-resilience-act-24-godziny-na-zgloszenie-podatnosci-co-to-zmienia-dla-mes-i-fabryki'
description: 'Od 11 września 2026 producent oprogramowania, także systemu MES, ma 24 godziny na wczesne ostrzeżenie o aktywnie wykorzystywanej podatności i 72 godziny na pełne zgłoszenie do CSIRT i ENISA. Wyjaśniamy, kogo obejmuje art. 14 CRA i czego fabryka powinna wymagać od dostawcy.'
coverImage: '/images/post-cra-zglaszanie-podatnosci/cover-cra-zglaszanie-podatnosci.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"cyberbezpieczenstwo","label":"cyberbezpieczenstwo"},{"value":"cra","label":"CRA"}]
publishedAt: '2026-10-05T08:00:00.000Z'
---

Scenariusz przykładowy: piątek, 17:40. Integrator u klienta zgłasza, że na serwerze MES pojawiło się konto administratora, którego nikt nie zakładał. Po godzinie analizy wiadomo, że ktoś wykorzystał lukę w bibliotece obsługującej logowanie. Jeszcze w sierpniu to, czy i komu dostawca oprogramowania zgłosi takie zdarzenie, zależało głównie od umowy i dobrej woli. Od 11 września 2026 dostawca ma zegar: 24 godziny na wczesne ostrzeżenie do CSIRT i ENISA.

To pierwszy obowiązek z Aktu o cyberodporności (rozporządzenie UE 2024/2847, Cyber Resilience Act, CRA), który działa przed pełnym stosowaniem przepisów w grudniu 2027. Dotyczy każdego producenta oprogramowania udostępnianego na rynku UE, także dostawców MES, i obejmuje wersje zainstalowane u klientów wiele lat temu. Poniżej: co, komu i w jakim czasie trzeba zgłosić oraz co z tego wynika dla zakładu.

## Kalendarz CRA

Rozporządzenie weszło w życie 10 grudnia 2024 (Komisja Europejska, 2026). Stosowanie rozłożono na trzy daty (art. 71 ust. 2; Hogan Lovells Cadwalader, 2026):

- **11 czerwca 2026** — rozdział IV o notyfikacji jednostek oceniających zgodność (art. 35–51);
- **11 września 2026** — art. 14, czyli zgłaszanie aktywnie wykorzystywanych podatności i poważnych incydentów;
- **11 grudnia 2027** — pozostałe przepisy, m.in. wymagania zasadnicze z załącznika I, dokumentacja techniczna, deklaracja zgodności UE i oznakowanie CE.

## Co dokładnie trzeba zgłosić

Art. 14 nie dotyczy każdej podatności, tylko dwóch kategorii zdarzeń.

**Aktywnie wykorzystywana podatność** to taka, co do której istnieją wiarygodne dowody, że złośliwy podmiot wykorzystał ją w systemie bez zgody jego właściciela (art. 3 pkt 42). Luka znaleziona przez własny zespół testów albo zgłoszona przez badacza, ale niewykorzystana w praktyce, nie uruchamia art. 14. Taką lukę obsługuje się w innym trybie, a od grudnia 2027 według załącznika I.

**Poważny incydent mający wpływ na bezpieczeństwo produktu** negatywnie wpływa albo może wpłynąć na zdolność produktu do ochrony dostępności, autentyczności, integralności lub poufności wrażliwych lub ważnych danych albo funkcji. Drugi wariant to incydent, który doprowadził lub może doprowadzić do wykonania złośliwego kodu (art. 14 ust. 5). Przykład z MES: włamanie do infrastruktury producenta i zmodyfikowany pakiet w kanale aktualizacji.

### Trzy terminy

| Etap | Aktywnie wykorzystywana podatność | Poważny incydent |
|---|---|---|
| Wczesne ostrzeżenie | do 24 h od uzyskania wiedzy; wskazanie państw członkowskich, w których produkt udostępniono | do 24 h od uzyskania wiedzy |
| Zgłoszenie | do 72 h: informacje o produkcie, charakter exploita i podatności, środki naprawcze lub łagodzące | do 72 h: charakter incydentu, wstępna ocena, podjęte środki |
| Raport końcowy | najpóźniej 14 dni od udostępnienia poprawki lub środka łagodzącego: opis i dotkliwość, informacje o sprawcy, szczegóły aktualizacji | miesiąc od zgłoszenia incydentu: opis, prawdopodobna przyczyna źródłowa, środki zastosowane i prowadzone |

Źródło: art. 14 ust. 2 i 4 rozporządzenia 2024/2847.

Niezależnie od zgłoszeń do organów producent informuje użytkowników, których zdarzenie dotyczy, a w razie potrzeby wszystkich użytkowników, o podatności lub incydencie i o środkach zaradczych. Jeśli to możliwe, robi to w ustrukturyzowanym formacie, który da się przetwarzać automatycznie (art. 14 ust. 8).

### Kiedy rusza zegar

24 godziny liczy się od chwili, w której producent uzyskał wiedzę o zdarzeniu. Wytyczne Komisji Europejskiej z 27 lipca 2026 przyjmują, że następuje to wtedy, gdy po wstępnej ocenie producent ma uzasadniony stopień pewności, że podatność jest aktywnie wykorzystywana albo że incydent naruszył bezpieczeństwo produktu (Jones Day, 2026; Kirkland & Ellis, 2026). Nie ma obowiązku wstecznego zgłaszania wykorzystania, o którym producent wiedział przed 11 września 2026 (Jones Day, 2026).

Moment uzyskania wiedzy trzeba więc umieć wykazać: decyzja „mamy pewność” powinna mieć w systemie zgłoszeń datę, godzinę i autora.

### Dokąd trafia zgłoszenie

ENISA uruchomiła jednolitą platformę zgłoszeń (Single Reporting Platform, SRP) 11 września 2026, w dniu startu obowiązku (ENISA, 2026). Producent wysyła zgłoszenie raz, przez punkt przyjmowania zgłoszeń CSIRT koordynatora z państwa, w którym ma główne miejsce prowadzenia działalności, a ENISA otrzymuje je równocześnie (art. 14 ust. 7). CSIRT przekazuje informację zespołom z innych państw, w których produkt jest dostępny (ENISA, 2026). W Polsce tę rolę pełni CSIRT NASK, którego zadania realizuje CERT Polska (Ministerstwo Cyfryzacji, 2026; CERT Polska, 2026).

## Kogo to obejmuje

### Dostawcę MES, także za wersje sprzed lat

Produkt z elementami cyfrowymi to produkt programowy lub sprzętowy wraz z rozwiązaniami zdalnego przetwarzania danych (art. 3 pkt 1). MES instalowany na serwerze klienta jest takim produktem, a firma, która go rozwija i sprzedaje pod własną nazwą, jest producentem (art. 3 pkt 13).

Dla branży najważniejszy jest art. 69. Produkty wprowadzone do obrotu przed 11 grudnia 2027 podlegają wymaganiom CRA tylko wtedy, gdy po tej dacie przejdą istotną modyfikację (ust. 2). Wyjątkiem jest art. 14, który obejmuje wszystkie produkty objęte zakresem rozporządzenia, również te wprowadzone wcześniej (ust. 3). Przykładowo wersja MES wdrożona w 2019 roku i nigdy nieaktualizowana podlega więc obowiązkowi zgłoszenia, choć z samego CRA nie wynika dla niej obowiązek dostarczania poprawek.

### Chmurę i SaaS

Motyw 12 rozporządzenia wskazuje, że usługi chmurowe w modelach SaaS, PaaS i IaaS podlegają dyrektywie NIS2. CRA obejmuje zdalne przetwarzanie danych tylko w zakresie, w jakim jest niezbędne do działania produktu (motywy 11 i 12). Kirkland & Ellis zaleca ocenę każdego przypadku osobno (Kirkland & Ellis, 2026). Dostawca, który ten sam system sprzedaje w instalacji lokalnej i jako usługę w chmurze, ma prostszą sytuację, gdy przyjmie jeden proces dla obu wariantów.

### Komponenty open source

Oprogramowanie open source rozwijane poza działalnością komercyjną jest wyłączone z zakresu (Kirkland & Ellis, 2026). Organizacje systematycznie wspierające rozwój projektów open source (w angielskiej wersji: open-source software stewards) mają łagodniejszy reżim i obowiązek zgłoszeń dopiero od 11 grudnia 2027 (ENISA, 2026). Nie zwalnia to producenta MES, który te komponenty wbudowuje. Musi zachować należytą staranność przy integracji komponentów zewnętrznych (art. 13 ust. 5) i zgłaszać znalezione w nich podatności ich opiekunom (art. 13 ust. 6). Według wytycznych Komisji wykorzystywaną podatność w zewnętrznym komponencie zgłasza się, gdy da się ją wykorzystać w produkcie producenta i rzeczywiście ją w nim wykorzystano (Kirkland & Ellis, 2026).

### Integratora

Podmiot, który dokonuje istotnej modyfikacji produktu i udostępnia go na rynku, staje się producentem w zakresie zmienionej części, a gdy zmiana wpływa na cyberbezpieczeństwo całego produktu, odpowiada za całość (art. 22).

### Fabrykę

Zakład jako użytkownik nie ma obowiązków z art. 14, ale może dobrowolnie zgłosić podatność, incydent albo zdarzenie potencjalnie niebezpieczne (art. 15). Jeśli podlega NIS2, ma własny obowiązek: wczesne ostrzeżenie o poważnym incydencie w 24 godziny, zgłoszenie w 72 godziny i sprawozdanie końcowe w ciągu miesiąca (art. 23 dyrektywy 2022/2555). Jedno włamanie przez lukę w MES może więc wywołać dwa zgłoszenia od dwóch podmiotów.

Pakiet Digital Omnibus tego nie zmienia. Jego część o AI przyjęto jako rozporządzenie (UE) 2026/1744, które weszło w życie 27 lipca 2026 i zmienia m.in. AI Act, ale nie CRA (Komisja Europejska, 2026; Law & Technology, 2026). Część o danych i cyberbezpieczeństwie przewiduje wspólny punkt zgłaszania incydentów, który ENISA ma zbudować na doświadczeniach z platformy CRA. Ma on objąć NIS2, RODO, DORA, dyrektywę CER i rozporządzenie o europejskiej tożsamości cyfrowej, ale nie CRA (Komisja Europejska, 2025). Według stanu z 20 września 2026 ta część pozostaje projektem (Parlament Europejski, 2026).

## Dane: skala zjawiska

ENISA Threat Landscape 2025 objął 4875 incydentów z okresu od lipca 2024 do czerwca 2025. Wykorzystanie podatności odpowiadało za 21,3% wektorów wejścia, ustępując tylko phishingowi (ok. 60%), a kampanie przekształcały nowe podatności w narzędzia ataku w ciągu kilku dni od ujawnienia. Deklaracje grup ransomware dotyczyły najczęściej przemysłu (14,9%) (ENISA, 2025).

Według IBM produkcja piąty rok z rzędu jest najczęściej atakowaną branżą, z udziałem 27,7% incydentów obserwowanych przez X-Force. Wykorzystanie podatności było w 2025 roku główną przyczyną ataków, z udziałem 40% incydentów (IBM X-Force, 2026).

Nasza ocena, nie dane: dostawca MES częściej będzie zgłaszał podatność w komponencie dostarczanym razem z systemem (systemie operacyjnym w obrazie, serwerze WWW, brokerze, bibliotece) niż we własnym kodzie.

W badaniu OpenSSF i Linux Foundation z czerwca 2026 (843 respondentów) 66% badanych zna CRA słabo albo wcale, wobec 62% rok wcześniej. Tylko 32% producentów tworzy SBOM dla wszystkich produktów, a około czterech na dziesięciu nie ustaliło, czy rozporządzenie ich dotyczy (OpenSSF, 2026; Linux Foundation, 2026).

Za naruszenie wymagań zasadniczych oraz obowiązków z art. 13 i 14 grozi kara do 15 mln euro albo do 2,5% całkowitego światowego rocznego obrotu, w zależności od tego, która kwota jest wyższa (art. 64 ust. 2). Mikro i małe przedsiębiorstwa nie są karane za przekroczenie terminu wczesnego ostrzeżenia (art. 64 ust. 10 lit. a), ale przy terminie 72 godzin takiego wyłączenia nie ma.

## Kto już ma to poukładane

**Siemens ProductCERT** przyjmuje, bada, koordynuje i raportuje zgłoszenia dotyczące produktów koncernu, a komunikaty bezpieczeństwa publikuje także jako kanał w formacie CSAF do automatycznego pobierania (Siemens). Tego rodzaju informacji dla użytkowników dotyczy art. 14 ust. 8.

**CERT Polska** od 1 sierpnia 2023 nadaje numery CVE i koordynuje ujawnianie podatności. Wpisy CVE publikuje 90 dni po przekazaniu producentowi szczegółów (CERT Polska). Producent MES, do którego badacz zgłosi lukę przez CERT Polska, ma więc wyznaczony termin niezależnie od CRA.

**Niemiecki BSI** opisał swoje rozumienie wymagań CRA w wytycznej TR-03183. Część 2 w wersji 2.1.0 z sierpnia 2025 wymaga SBOM w formacie CycloneDX 1.6 lub nowszym albo SPDX 3.0.1 lub nowszym i nowego SBOM dla każdej wersji oprogramowania (BSI; FOSSA, 2025). Sam CRA wymaga SBOM w powszechnie stosowanym formacie do odczytu maszynowego, obejmującego co najmniej zależności najwyższego poziomu (załącznik I część II pkt 1).

### Jak podchodzimy do tego w OmniMES

Multiprojekt jest producentem OmniMES w rozumieniu CRA: system instalujemy u klientów lokalnie i udostępniamy w chmurze. Przyjęliśmy ostrożną interpretację zakresu. OmniMES, moduł OmniEnergy i platformę chmurową OmniPlatform traktujemy jako jeden produkt z elementami cyfrowymi, z jednym procesem obsługi podatności. Prowadzimy SBOM w formacie do odczytu maszynowego i udostępniamy go na żądanie klientom, którzy kupili produkt, oraz organom nadzoru w zakresie wymaganym przepisami. Deklarujemy 5 lat wsparcia bezpieczeństwa od wydania wersji, ocenę zgodności prowadzimy w trybie kontroli wewnętrznej (moduł A), a deklarację zgodności UE i oznakowanie CE przewidujemy przed 11 grudnia 2027. Szczegóły opisuje publiczny rozdział dokumentacji o zgodności z CRA.

## Bariery i ograniczenia

**Producent nie widzi instalacji lokalnych.** Zegar rusza, gdy producent uzyska wiedzę, ale ślady wykorzystania podatności powstają zwykle u klienta: w logach serwera, w zaporze, w zespole monitorowania bezpieczeństwa. Bez uzgodnionego kanału informacja dociera do producenta z opóźnieniem albo wcale.

**Szare strefy.** Uzasadniony stopień pewności, próg poważnego incydentu i granica między SaaS a zdalnym przetwarzaniem danych wymagają interpretacji. Wytyczne Komisji pomagają, orzecznictwa jeszcze nie ma.

**Trzy reżimy naraz.** Incydent z wyciekiem danych osobowych może oznaczać zgłoszenie do organu ochrony danych w 72 godziny (art. 33 RODO), zgłoszenie z NIS2 po stronie fabryki i zgłoszenie z CRA po stronie producenta: różni adresaci, formularze i definicje.

**Mały dostawca i doba.** 24 godziny obejmują weekendy i święta. Zwolnienie mikro i małych firm z kar dotyczy tylko wczesnego ostrzeżenia, więc dyżur bezpieczeństwa trzeba zorganizować i tak.

**Stare wersje.** Zgłosić trzeba, naprawiać według CRA nie trzeba (art. 69). Fabryka z MES sprzed lat może dostać informację o wykorzystywanej luce bez gwarancji poprawki dla swojej wersji. To argument za planowaniem aktualizacji.

**Kary formalnie od grudnia 2027.** Art. 71 ust. 2 wyłącza z ogólnej daty stosowania tylko art. 14 i rozdział IV, więc przepis o karach (art. 64) zacznie być stosowany 11 grudnia 2027. To nasza lektura tekstu, nie stanowisko organu. Obowiązek zgłoszenia działa jednak od 11 września i tej różnicy dat nie należy traktować jako okresu ochronnego.

## Co to oznacza dla fabryki: czego wymagać od dostawcy MES

1. **Potwierdzenia statusu**, czyli informacji, czy dostawca uważa się za producenta w rozumieniu CRA, w którym państwie ma główne miejsce działalności i czy ma konto na platformie ENISA. Kirkland & Ellis zaleca rejestrację przed pierwszym incydentem (Kirkland & Ellis, 2026).
2. **Jednego punktu kontaktowego dla zgłoszeń podatności.** Od grudnia 2027 to obowiązek (art. 13 ust. 17), ale można go wymagać już teraz, np. jako pliku security.txt według RFC 9116 (securitytxt.org).
3. **SBOM dla zainstalowanej u was wersji**, w formacie CycloneDX albo SPDX. Bez niego komunikat o podatności w konkretnej bibliotece nic nie mówi o waszym serwerze.
4. **Klauzuli o wzajemnym powiadamianiu.** Fabryka przekazuje dostawcy podejrzenie wykorzystania luki w ciągu kilku godzin, a dostawca informuje fabrykę zgodnie z art. 14 ust. 8 i wskazuje, czy zgłosił zdarzenie do CSIRT. Zgranie tego z procedurą NIS2 oszczędza dwóch równoległych dochodzeń.
5. **Komunikatów bezpieczeństwa w formacie maszynowym**, np. CSAF, z możliwością subskrypcji.
6. **Jawnego okresu wsparcia i listy wersji objętych poprawkami.** Dla produktów wprowadzanych od grudnia 2027 CRA wymaga co najmniej pięciu lat wsparcia (art. 13 ust. 8), a każda aktualizacja bezpieczeństwa ma pozostać dostępna co najmniej 10 lat (art. 13 ust. 9).
7. **Po własnej stronie:** aktualnej ewidencji wersji (MES, broker, baza danych, system operacyjny) i logów przechowywanych na tyle długo, żeby producent mógł ustalić przyczynę źródłową do raportu końcowego.

Dostawcy MES potrzebują z kolei procedury z szablonami na każdy etap zgłoszenia, wyznaczonego dyżuru, rejestru decyzji o uzyskaniu wiedzy oraz SBOM dla każdego wydania, automatycznie porównywanego z europejską bazą podatności EUVD, którą ENISA prowadzi od 13 maja 2025 (ENISA, 2025).

## Co z tego wynika

Art. 14 jest wąski. Obejmuje tylko podatności wykorzystywane w praktyce i poważne incydenty, a u większości dostawców MES takie zdarzenia będą, naszym zdaniem, rzadkie. Wymaga jednak procesu, którego nie da się zbudować w ciągu pierwszych 24 godzin: ewidencji wersji u klientów, SBOM, kanału zgłoszeń i dyżuru.

Dla fabryki najważniejsza zmiana jest praktyczna. Termin producenta liczy się od chwili, w której dowie się on o zdarzeniu, a dowody zwykle leżą po stronie zakładu. Umowa z dostawcą MES powinna przewidywać ten przepływ informacji przed pierwszym incydentem, bo w trakcie incydentu nie będzie czasu na jej negocjowanie.

## Źródła

- Rozporządzenie (UE) 2024/2847, tekst urzędowy — https://eur-lex.europa.eu/eli/reg/2024/2847/oj (odczyt: https://www.european-cyber-resilience-act.com/)
- Dyrektywa (UE) 2022/2555, tekst urzędowy — https://eur-lex.europa.eu/eli/dir/2022/2555/oj (odczyt: https://www.nis-2-directive.com/)
- RODO, art. 33 — https://gdpr-info.eu/art-33-gdpr/
- Komisja Europejska, Cyber Resilience Act, 7 września 2026 — https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act
- Komisja Europejska, CRA Reporting obligations, 11 września 2026 — https://digital-strategy.ec.europa.eu/en/policies/cra-reporting
- Komisja Europejska, wytyczne do stosowania CRA, 27 lipca 2026 — https://digital-strategy.ec.europa.eu/en/news/commission-publishes-new-guidance-support-businesses-implementation-cyber-resilience-act
- Komisja Europejska, Digital Package, pytania i odpowiedzi, 20 listopada 2025 — https://digital-strategy.ec.europa.eu/en/faqs/digital-package
- Komisja Europejska, AI Omnibus enters into force, 27 lipca 2026 — https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force
- Law & Technology, rozporządzenie (UE) 2026/1744, 24 lipca 2026 — https://lawandtechnology.eu/en/digital-omnibus-on-ai-official-journal-regulation-2026-1744/
- Parlament Europejski, Legislative Train, Digital Omnibus 2025/0360(COD), 20 września 2026 — https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package
- ENISA, uruchomienie platformy SRP, 11 września 2026 — https://www.enisa.europa.eu/news/the-cra-single-reporting-platform-is-launched
- ENISA, Europejska Baza Podatności EUVD, 13 maja 2025 — https://www.enisa.europa.eu/news/consult-the-european-vulnerability-database-to-enhance-your-digital-security
- ENISA, Threat Landscape 2025, październik 2025 — https://www.enisa.europa.eu/sites/default/files/2026-01/ENISA%20Threat%20Landscape%202025_v1.2.pdf
- Ministerstwo Cyfryzacji, platforma zgłoszeń CRA, 24 września 2026 — https://www.gov.pl/web/cyfryzacja/europejska-platforma-zglaszania-podatnosci-i-incydentow-w-ramach-aktu-o-cyberodpornosci
- CERT Polska, wpis o CRA, 25 maja 2026 — https://cert.pl/posts/2026/05/cra-dobre-praktyki/
- CERT Polska, program CVD — https://wiedza.cert.pl/polityki-i-procedury/program-cvd/
- Hogan Lovells Cadwalader, CRA w 2026, 20 stycznia 2026 — https://www.hlc.com/en/publications/eu-cyber-resilience-act-getting-ready-for-cra-compliance-in-2026
- Jones Day, obowiązki zgłoszeń CRA, 27 lipca 2026 — https://www.jonesday.com/en/insights/2026/07/eu-cyber-resilience-act-24hour-reporting-duties-start-september-11-2026
- Kirkland & Ellis, obowiązki zgłoszeń CRA, 22 września 2026 — https://www.kirkland.com/publications/kirkland-alert/2026/09/the-eu-cyber-resilience-act
- IBM, X-Force Threat Index 2026, 25 lutego 2026 — https://newsroom.ibm.com/2026-02-25-ibm-2026-x-force-threat-index-ai-driven-attacks-are-escalating-as-basic-security-gaps-leave-enterprises-exposed
- OpenSSF i Linux Foundation, 2026 CRA Awareness and Readiness Report, 8 czerwca 2026 — https://openssf.org/resources/publications/2026-cra-awareness-and-readiness-report/
- Linux Foundation, gotowość do CRA w 2025 i 2026, 19 czerwca 2026 — https://www.linuxfoundation.org/blog/the-cra-readiness-reality-what-changed-and-what-didnt-between-2025-and-2026
- Siemens ProductCERT — https://cert-portal.siemens.com/
- BSI, TR-03183 — https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html
- FOSSA, BSI TR-03183-2 w wersji 2.1.0, 2025 — https://fossa.com/blog/germany-bsi-sbom-guidelines/
- securitytxt.org, RFC 9116 — https://securitytxt.org/
- OmniMES, Cyberbezpieczeństwo i zgodność (CRA) — https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/cyberbezpieczenstwo-i-zgodnosc-cra-6dbPWZS59e
