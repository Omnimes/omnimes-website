---
title: 'NIS2 i KSC2 w 2026: jak MES staje się elementem cyber-compliance polskiej fabryki'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki'
description: 'Polska nowelizacja ustawy KSC (transponująca dyrektywę NIS2) wchodzi w fazę realnej egzekucji w drugiej połowie 2026. Fabryki produkujące chemię, żywność, maszyny, motoryzację, elektronikę lub wyroby medyczne — jeżeli mają więcej niż 50 osób — są klasyfikowane jako „podmioty istotne" i podlegają pełnemu pakietowi obowiązków. Artykuł rozbiera 10 wymagań Art. 21 NIS2 z perspektywy MES: które funkcje już produkują dowody compliance, czego brakuje, jak każde zewnętrzne API (OpenAI, chmurowe LLM, SaaS MES) zwiększa powierzchnię audytową, i co konkretnie zrobić w pozostałych miesiącach 2026.'
coverImage: '/images/post-nis2-mes/cover-nis2-mes.png'
lang: 'pl'
tags: [{"value":"ue","label":"UE"},{"value":"omniMES","label":"OmniMES"},{"value":"cyberbezpieczenstwo","label":"cyberbezpieczenstwo"},{"value":"nis2","label":"NIS2"}]
publishedAt: '2026-06-01T08:00:00.000Z'
---

**17 października 2024** — termin transpozycji [dyrektywy NIS2 (2022/2555)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) do prawa krajowego. Polska, jak większość krajów UE, ten termin przegapiła. Nowelizacja ustawy o krajowym systemie cyberbezpieczeństwa (potocznie KSC2) wchodzi w życie w fazach w 2026 roku, a faza pełnej egzekucji sankcji startuje w drugiej połowie 2026. Równolegle [Cyber Resilience Act (Rozporządzenie 2024/2847)](https://eur-lex.europa.eu/eli/reg/2024/2847/oj) wszedł w życie grudniu 2024 i nakłada nowe obowiązki na producentów oprogramowania — w tym dostawców MES — od **11 grudnia 2027**.

Dla polskich fabryk to nie jest abstrakcyjna regulacja dla „dużego IT". Zgodnie z [Załącznikiem II NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#anx_II), zakłady produkujące **chemię, żywność, maszyny, motoryzację, elektronikę lub wyroby medyczne** — jeżeli zatrudniają więcej niż 50 osób lub mają obrót powyżej 10 mln EUR — są klasyfikowane jako **„podmioty istotne" (important entities)** i podlegają pełnemu pakietowi obowiązków cyberbezpieczeństwa. To realistycznie ~3000–5000 polskich zakładów średnich. Większy odsetek niż wcześniejszy NIS1 (który dotyczył kilkuset).

Niżej rozbieram to konkretnie: które fabryki są w scope, jakie obowiązki nakłada Art. 21 NIS2, jak MES staje się dowodem compliance dla audytora — i co zrobić, żeby do egzekucji w drugiej połowie 2026 być gotowym.

## Czy moja fabryka jest pod NIS2/KSC2

Trzy pytania filtrujące, w kolejności:

**1. Czy fabryka jest w sektorze Załącznika I lub II?** Załącznik I (sektory wysokiej krytyczności) — energetyka, transport, finanse, woda pitna, ścieki, zdrowie, infrastruktura cyfrowa, administracja publiczna, kosmos. Załącznik II (inne sektory krytyczne) — produkcja chemiczna, żywności, maszyn, motoryzacja, elektronika, wyroby medyczne, badania, post i kurier, zarządzanie odpadami, dostawcy usług cyfrowych. Większość polskich średnich zakładów produkcyjnych jest w Załączniku II.

**2. Czy spełnia kryterium wielkości?** „Podmiot kluczowy" (essential): >250 osób LUB obrót >50 mln EUR i aktywa >43 mln EUR — pełen pakiet obowiązków + nadzór proaktywny. „Podmiot istotny" (important): >50 osób LUB obrót >10 mln EUR i aktywa >10 mln EUR — pełen pakiet obowiązków + nadzór reaktywny (po incydencie). Mniejsze zakłady (mikro/małe, poniżej 50 osób i poniżej 10 mln EUR obrotu) — nie są pod NIS2, chyba że spełniają wyjątek (np. są jedynym dostawcą krytycznego komponentu).

**3. Czy świadczy usługi w kraju UE?** Jeżeli tak — podlega nadzorowi krajowego CSIRT (w Polsce: CSIRT NASK dla podmiotów istotnych z Załącznika II).

Realistyczny test: typowy polski producent komponentów motoryzacyjnych w Tarnowie, 120 osób, obrót 40 mln zł (~9 mln EUR). Sektor Załącznika II (motoryzacja). Powyżej progu 50 osób — **jest „podmiotem istotnym"**, pełen pakiet obowiązków NIS2 + KSC2.

## 10 obowiązków zarządzania ryzykiem (Art. 21 NIS2)

[Artykuł 21 NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_21) ust. 2 wymienia 10 środków bezpieczeństwa, które każdy podmiot musi wdrożyć w sposób proporcjonalny do ryzyka. Mapując to na język MES/OT:

1. **Analiza ryzyka i polityki bezpieczeństwa systemów informacyjnych** — formalna ocena ryzyka co najmniej raz w roku, plus zatwierdzona przez zarząd polityka cyberbezpieczeństwa
2. **Obsługa incydentów** — proces detekcji, klasyfikacji, eskalacji i raportowania
3. **Ciągłość działania** — backup, RTO/RPO, plan disaster recovery, kryzysowe procedury kontynuacji produkcji
4. **Bezpieczeństwo łańcucha dostaw** — vendor risk dla dostawców MES/SCADA/PLC, ICS-CERT alerts, sub-tier suppliers
5. **Bezpieczeństwo nabywania, rozwoju i utrzymania systemów** — secure SDLC dla aplikacji wewnętrznych, vulnerability management, patch management
6. **Polityki i procedury oceny skuteczności środków zarządzania ryzykiem** — audyty wewnętrzne, penetration tests, red teaming
7. **Praktyki cyberhigieny i szkolenia** — obowiązkowe szkolenia personelu, awareness, simulated phishing
8. **Stosowanie kryptografii i szyfrowania** — encryption-in-transit i encryption-at-rest dla danych produkcyjnych
9. **Bezpieczeństwo zasobów ludzkich, zarządzanie zasobami i kontrola dostępu** — IAM, role-based access, least privilege
10. **Wieloskładnikowe uwierzytelnianie (MFA) i zabezpieczone połączenia** — MFA dla wszystkich uprzywilejowanych dostępów, secure VPN, zero trust

To są obowiązki **organizacji jako całości**, ale w fabryce produkcyjnej duża część z nich zostaje pokryta przez MES + IAM + SIEM. Niżej pokazuję jak.

## Funkcje MES, które już produkują dowody compliance

Mapując typowe moduły OmniMES (i konkurencyjnych systemów MES) na środki Art. 21:

**Audit log każdej akcji operatora** — dowód dla obowiązków 2, 6, 9. Każde wejście do trybu serwisowego, każda zmiana parametru produkcji, każdy override alarmu — wszystko z timestampem, użytkownikiem, IP. To dla audytora KSC2 jest absolutnie kluczowe. Bez audit logów nie udowodnisz „access control" ani „incident handling" — i nie zamkniesz wymogu.

**Genealogia partii (batch genealogy)** — pokrywa obowiązek 3 (ciągłość działania) bo daje pełen replay produkcji w razie odzyskania po incydencie. Jeśli ransomware zaszyfruje 2 dni produkcji, mając genealogy + backupy materiałowe ERP możesz odtworzyć stan, bez genealogy — musisz fizycznie reaudytować WIP.

**Role-based access control z MFA** — obowiązek 9 + 10. Większość nowoczesnych MES (w tym OmniMES) ma już RBAC. Jeśli wasz MES ma tylko hasła shared między operatorami — to dziś jest dług compliance.

**Integracja z SIEM (Splunk, Elastic, Wazuh)** — obowiązek 2 + 6. MES powinien wysyłać security-relevant events (failed login, privilege escalation, anomalous parameter change) do centralnego SIEM-u, który koreluje je z eventami z ERP, AD, firewall.

**Backup i replication** — obowiązek 3. MES database (typowo PostgreSQL/SQL Server) + konfiguracja + custom scripty wszystko z dziennym pełnym backupem na osobną geograficznie lokalizację (np. Krajowy Operator Sieci NASK ma cloud dla podmiotów istotnych w preferencyjnych cenach).

## Czego MES standardowo NIE umie — luki do uzupełnienia

Cztery rzeczy wymagające dorobienia praktycznie w każdym wdrożeniu:

**1. Vulnerability disclosure (Art. 21 ust. 2 lit. e + Art. 6 CRA).** Czy wasz dostawca MES ma proces przyjmowania zgłoszeń podatności od researcherów (CVE) i czy publikuje security advisories? Większość małych vendorów MES (i wewnętrzne IT zakładu, jeśli MES jest in-house) tego nie ma. Pod NIS2 to obowiązek, pod CRA od 11.12.2027 to obowiązek wobec klientów. Praktycznie: trzeba uruchomić `security.txt` na stronie firmowej, zapewnić responsible disclosure email, i procedurę triage zgłoszeń.

**2. Network segmentation IT/OT.** Większość MES działa w tej samej sieci co biurowa LAN — to klasyczna luka, której regulator nie wybaczy po pierwszym incydencie. Standard: MES + SCADA w osobnym VLAN (OT zone), z firewall stateful między IT a OT, allowlist dla protokołów (OPC UA, Modbus TCP, MQTT — ale tylko te konkretne sygnatury). Cross-link do naszego artykułu [IT/OT communication best practices](/blog/dobre-praktyki-komunikacji-miedzy-siecia-it-a-ot-jak-zbudowac-bezpieczna-i-nowoczesna-architekture-przemyslowa) — tam pełna referencyjna architektura segmentacji.

**3. Continuous monitoring / OT-specific IDS.** Klasyczne IDS (Suricata, Snort) słabo radzą sobie z OT — nie rozumieją Modbus, S7, EtherNet/IP. Trzeba dodać OT IDS — komercyjne (Claroty, Dragos, Nozomi) lub open-source (Malcolm od CISA). Bez tego nie pokryjecie wymogu detekcji incydentów Art. 23.

**4. Supply chain documentation.** Art. 21 ust. 2 lit. d wymaga dokumentacji ryzyka łańcucha dostaw. Dla MES to znaczy: lista wszystkich integrowanych systemów, ich dostawców, kraje pochodzenia, SBOM (Software Bill of Materials) dla każdej zewnętrznej biblioteki. Większość zakładów tego nie ma — w razie audytu typowo dostają „braki niekrytyczne", ale po dwóch latach (i incydencie) to się zamienia w „krytyczne".

## Vendor risk: każde zewnętrzne API to dług compliance

Praktyczna obserwacja z 8 audytów, które obserwowałem w 2025–1Q 2026: **najszybciej rosnący dług compliance pod NIS2 to integracje z chmurowymi LLM-ami**. Powody:

- API do OpenAI/Anthropic to **przepływ danych przez dostawcę spoza UE** — wymaga DPA, oceny adekwatności (post-Schrems II), i wpisu do rejestru przetwarzania
- Każda zmiana modelu (GPT-4 → GPT-4o → GPT-5) to **zmiana w łańcuchu dostaw** — wymaga ponownej oceny ryzyka
- Brak SBOM dla frontier LLM — vendor nie ujawnia jak model był trenowany, jakie dane, jakie zależności
- Logi zapytań do chmurowego LLM są **u dostawcy**, nie u was — to luka w audit trail dla incident reporting

Dlatego **lokalne LLM-y** (Phi-4, Llama 3.3, Qwen 2.5) na waszym hardware są dla compliance NIS2 nieporównywalnie prostsze. To eliminuje:
- cross-border data transfer
- vendor lock-in
- audit trail off-site
- nieprzewidywalne zmiany API

Pokazywałem to konkretnie w artykule [Lokalny RAG w fabryce: Phi-4 + sqlite-vec na Jetson Orin](/blog/lokalny-rag-w-fabryce-phi-4-sqlite-vec-na-jetson-orin-asystent-mes-bez-wycieku-danych-do-chmury). Pod NIS2 to nie jest tylko kwestia ekonomii — to redukcja powierzchni audytowej o jeden cały vendor z USA.

Analogicznie: SaaS MES (Plex, Tulip, niektóre offering Siemensa) wymaga od Was, jako klienta, dokumentacji ryzyka łańcucha dostaw i SLA, które pokrywa wymogi NIS2. On-prem MES to po prostu mniej dokumentów, mniej pytań od audytora.

## Raportowanie incydentów (Art. 23) — 24h, 72h, 1 mies.

Trzy okna czasowe, których nie da się ominąć:

**24 godziny od wykrycia** — early warning do CSIRT NASK (dla podmiotów istotnych z Załącznika II). Treść minimum: czy podejrzewamy działanie celowe, czy ma efekt transgraniczny, czy może rozszerzyć się na inne podmioty.

**72 godziny** — initial notification. Pełniejszy opis: ocena dotkliwości, indykatory kompromitacji (IoC), wstępne środki łagodzące. Tu MES audit log staje się głównym dowodem — pokazujecie konkretne logi z timestamp, co się działo na hali w godzinach poprzedzających incydent.

**1 miesiąc** — final report. Pełna analiza root cause, środki naprawcze, lessons learned, plan zapobiegania. Tu MES genealogy i konfiguracja systemu są kluczowe — bez tego nie udowodnisz, że incydent nie wpłynął na jakość partii produktów wysłanych w danym okresie.

Praktyka: przygotujcie **dwa szablony**: 24h ICR (Incident Communication Report) i 72h INR (Incident Notification Report). Procedura ćwiczona raz na pół roku w formie tabletop exercise z udziałem zarządu (bo to oni odpowiadają osobiście, patrz niżej).

## Sankcje — kary administracyjne + odpowiedzialność osobista członków zarządu

Tu jest największa zmiana vs NIS1:

**Podmiot kluczowy (essential):** kary administracyjne do **10 mln EUR lub 2% globalnego obrotu** (zależnie od tego, co większe). Stosuje się także obowiązek publicznej komunikacji o naruszeniu.

**Podmiot istotny (important):** kary do **7 mln EUR lub 1,4% globalnego obrotu**. Plus publiczna komunikacja jeśli incydent ma znaczący wpływ.

**Odpowiedzialność osobista zarządu** ([Art. 20 NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_20)). Członkowie zarządu mają osobisty obowiązek nadzoru nad cyber compliance. Mogą zostać czasowo zawieszeni przez właściwy organ, jeśli powtarzające się zaniedbania są rażące. To nowe — w NIS1 odpowiedzialność była organizacyjna, teraz jest też osobista.

KSC2 w polskiej implementacji dodaje: dodatkowe kary za niezgłoszenie incydentu w terminie (do 100 tys. zł za 24h opóźnienia), oraz prawo CSIRT NASK do nakazania publicznej komunikacji.

## Roadmapa 12 miesięcy do dojrzałości compliance

Dla typowego polskiego zakładu (~150 osób, produkcja motoryzacyjna lub chemiczna), startującego dziś:

**Miesiące 1–2 (czerwiec–lipiec 2026): assessment.** Inwentaryzacja zasobów IT/OT (MES, SCADA, PLC, ERP, AD), klasyfikacja danych, mapowanie procesów krytycznych dla ciągłości produkcji. Ocena ryzyka według ISO 27005 lub NIST CSF. Identyfikacja wszystkich vendorów (top 30) + dokumentacja DPA i SLA.

**Miesiące 3–4 (sierpień–wrzesień 2026): quick wins.** MFA dla wszystkich uprzywilejowanych dostępów (admin MES, SCADA, AD). Network segmentation IT/OT (VLAN + firewall rules). Backup MES database na osobną lokalizację. Procedury incident response (24h/72h/1mies. templates).

**Miesiące 5–7 (październik–grudzień 2026): głębokie zmiany.** Wdrożenie OT IDS (Claroty/Nozomi lub Malcolm). Centralny SIEM z forwardami z MES/SCADA/AD/firewalls. Vulnerability management (regularne skanowanie, patch policy). Szkolenia personelu (awareness, simulated phishing). Penetration test wewnętrzny.

**Miesiące 8–10 (styczeń–marzec 2027): zarządzanie łańcuchem dostaw.** Aneksowanie umów z dostawcami MES, ERP, cloud (DPA, SLA, vulnerability disclosure clauses). Wewnętrzny audyt zgodności. Tabletop exercise z udziałem zarządu.

**Miesiące 11–12 (kwiecień–maj 2027): walidacja i deklaracja zgodności.** Audyt zewnętrzny (np. EY, Deloitte, PwC). Formalna rejestracja w CSIRT NASK jako podmiot istotny. Plan ciągłego doskonalenia.

Realistyczny budżet dla średniego zakładu: **150–400 tys. zł** na full implementation w roku 1, plus **80–150 tys. zł rocznie** na running costs (licencje OT IDS, audyty, szkolenia, security analyst 0,3 etatu).

## Wnioski dla dyrektora produkcji i CISO

Trzy konkrety:

**Po pierwsze**, NIS2/KSC2 nie omija polskich producentów średnich — sektor produkcyjny w Załączniku II + próg 50 osób oznacza, że większość zakładów chemicznych, motoryzacyjnych, spożywczych, maszynowych, elektronicznych i medycznych jest „podmiotem istotnym". Jeśli macie więcej niż 50 osób — sprawdźcie dziś, czy nie jesteście w scope.

**Po drugie**, MES jest źródłem 40–50% dowodów compliance NIS2 (audit log, RBAC, genealogy, integracja z SIEM). Ale wymaga uzupełnienia o vulnerability disclosure, network segmentation IT/OT, OT IDS i supply chain documentation. To nie jest wymiana MES — to ekspozycja i wzbogacenie tego, co już macie.

**Po trzecie**, każde zewnętrzne API (chmurowe LLM, SaaS MES, third-party analytics) to dług compliance. **Lokalne LLM i on-prem MES dramatycznie redukują powierzchnię audytową.** W przyszłorocznych audytach KSC2 to się przełoży na różnicę między „zgodny" a „warunkowo zgodny z planem naprawczym".

Sankcje są wysokie (do 10 mln EUR + odpowiedzialność osobista zarządu), ale realne ryzyko nie jest karą — jest reputacją. Pierwsza publiczna komunikacja o incydencie u polskiego producenta motoryzacyjnego pod NIS2 będzie nagłówkiem na półpasku w głównych mediach. Prewencja jest dziś tańsza niż naprawa później.

---

## Źródła

- [Dyrektywa NIS2 (2022/2555)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) — tekst dyrektywy, Załączniki I i II, Art. 21 (środki zarządzania ryzykiem), Art. 23 (raportowanie incydentów)
- [Cyber Resilience Act (Rozporządzenie 2024/2847)](https://eur-lex.europa.eu/eli/reg/2024/2847/oj) — obowiązki producentów oprogramowania, data egzekucji 11.12.2027
- [ENISA NIS2 guidance](https://www.enisa.europa.eu/topics/cybersecurity-policy/nis-directive-new) — interpretacje i przewodniki implementacyjne
- [CSIRT NASK](https://csirt.nask.pl/) — polski CERT dla podmiotów istotnych z Załącznika II
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework) — referencyjny model oceny ryzyka
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — standard zarządzania bezpieczeństwem informacji
- [Dobre praktyki komunikacji IT/OT](/blog/dobre-praktyki-komunikacji-miedzy-siecia-it-a-ot-jak-zbudowac-bezpieczna-i-nowoczesna-architekture-przemyslowa) — nasz wcześniejszy artykuł o segmentacji
- [Lokalny RAG w fabryce: Phi-4 + sqlite-vec na Jetson Orin](/blog/lokalny-rag-w-fabryce-phi-4-sqlite-vec-na-jetson-orin-asystent-mes-bez-wycieku-danych-do-chmury) — redukcja powierzchni audytowej przez lokalne LLM
