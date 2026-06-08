---
title: 'NIS2 i KSC2 w 2026: jak MES staje się elementem zgodności cyberbezpieczeństwa polskiej fabryki'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki'
description: 'Polska nowelizacja ustawy KSC (transponująca dyrektywę NIS2) wchodzi w fazę realnej egzekucji w drugiej połowie 2026. Fabryki produkujące chemię, żywność, maszyny, motoryzację, elektronikę lub wyroby medyczne — jeżeli mają więcej niż 50 osób — są klasyfikowane jako „podmioty istotne" i podlegają pełnemu pakietowi obowiązków. Artykuł omawia 10 wymagań Art. 21 NIS2 z perspektywy MES: które funkcje już dostarczają dowodów zgodności, czego brakuje, jak każde zewnętrzne API (OpenAI, chmurowe modele LLM, MES w modelu SaaS) zwiększa powierzchnię audytową i co konkretnie zrobić w pozostałych miesiącach 2026.'
coverImage: '/images/post-nis2-mes/cover-nis2-mes.png'
lang: 'pl'
tags: [{"value":"ue","label":"UE"},{"value":"omniMES","label":"OmniMES"},{"value":"cyberbezpieczenstwo","label":"cyberbezpieczenstwo"},{"value":"nis2","label":"NIS2"}]
publishedAt: '2026-06-01T08:00:00.000Z'
---

**17 października 2024** — termin transpozycji [dyrektywy NIS2 (2022/2555)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) do prawa krajowego. Polska, jak większość krajów UE, ten termin przegapiła. Nowelizacja ustawy o krajowym systemie cyberbezpieczeństwa (potocznie KSC2) wchodzi w życie w fazach w 2026 roku, a faza pełnej egzekucji sankcji startuje w drugiej połowie 2026. Równolegle [Cyber Resilience Act (Rozporządzenie 2024/2847)](https://eur-lex.europa.eu/eli/reg/2024/2847/oj) wszedł w życie grudniu 2024 i nakłada nowe obowiązki na producentów oprogramowania — w tym dostawców MES — od **11 grudnia 2027**.

Dla polskich fabryk to nie jest abstrakcyjna regulacja dla „dużego IT". Zgodnie z [Załącznikiem II NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#anx_II), zakłady produkujące **chemię, żywność, maszyny, motoryzację, elektronikę lub wyroby medyczne** — jeżeli zatrudniają więcej niż 50 osób lub mają obrót powyżej 10 mln EUR — są klasyfikowane jako **„podmioty istotne"** i podlegają pełnemu pakietowi obowiązków cyberbezpieczeństwa. Realnie to około 3000–5000 polskich zakładów średniej wielkości. Znacznie większy odsetek niż przy wcześniejszym NIS1, który obejmował zaledwie kilkaset podmiotów.

W dalszej części omawiam to konkretnie: które fabryki są objęte regulacją, jakie obowiązki nakłada Art. 21 NIS2, jak MES staje się dowodem zgodności dla audytora — i co zrobić, żeby do egzekucji w drugiej połowie 2026 być przygotowanym.

## Czy moja fabryka jest pod NIS2/KSC2

Trzy pytania filtrujące, w kolejności:

**1. Czy fabryka jest w sektorze Załącznika I lub II?** Załącznik I (sektory wysokiej krytyczności) — energetyka, transport, finanse, woda pitna, ścieki, zdrowie, infrastruktura cyfrowa, administracja publiczna, kosmos. Załącznik II (inne sektory krytyczne) — produkcja chemiczna, żywności, maszyn, motoryzacja, elektronika, wyroby medyczne, badania, usługi pocztowe i kurierskie, gospodarka odpadami, dostawcy usług cyfrowych. Większość polskich średnich zakładów produkcyjnych mieści się w Załączniku II.

**2. Czy spełnia kryterium wielkości?** „Podmiot kluczowy": powyżej 250 osób LUB obrót powyżej 50 mln EUR i aktywa powyżej 43 mln EUR — pełen pakiet obowiązków oraz nadzór proaktywny. „Podmiot istotny": powyżej 50 osób LUB obrót powyżej 10 mln EUR i aktywa powyżej 10 mln EUR — pełen pakiet obowiązków oraz nadzór reaktywny (uruchamiany po incydencie). Mniejsze zakłady (mikro i małe, poniżej 50 osób i poniżej 10 mln EUR obrotu) nie podlegają NIS2, chyba że spełniają wyjątek (np. są jedynym dostawcą krytycznego komponentu).

**3. Czy świadczy usługi w kraju UE?** Jeżeli tak — podlega nadzorowi krajowego CSIRT (w Polsce: CSIRT NASK dla podmiotów istotnych z Załącznika II).

Test na realnym przykładzie: typowy polski producent komponentów motoryzacyjnych w Tarnowie, 120 osób, obrót 40 mln zł (około 9 mln EUR). Sektor Załącznika II (motoryzacja). Powyżej progu 50 osób — **jest „podmiotem istotnym"**, podlega pełnemu pakietowi obowiązków NIS2 + KSC2.

## 10 obowiązków zarządzania ryzykiem (Art. 21 NIS2)

[Artykuł 21 NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_21) ust. 2 wymienia 10 środków bezpieczeństwa, które każdy podmiot musi wdrożyć w sposób proporcjonalny do ryzyka. Mapując to na język MES/OT:

1. **Analiza ryzyka i polityki bezpieczeństwa systemów informacyjnych** — formalna ocena ryzyka co najmniej raz w roku oraz zatwierdzona przez zarząd polityka cyberbezpieczeństwa
2. **Obsługa incydentów** — proces wykrywania, klasyfikacji, eskalacji i raportowania
3. **Ciągłość działania** — kopie zapasowe, RTO/RPO, plan odtwarzania po awarii, kryzysowe procedury kontynuacji produkcji
4. **Bezpieczeństwo łańcucha dostaw** — ocena ryzyka dostawców MES/SCADA/PLC, śledzenie alertów ICS-CERT, weryfikacja poddostawców
5. **Bezpieczeństwo nabywania, rozwoju i utrzymania systemów** — bezpieczny cykl wytwarzania oprogramowania (SDLC) dla aplikacji wewnętrznych, zarządzanie podatnościami i aktualizacjami
6. **Polityki i procedury oceny skuteczności środków zarządzania ryzykiem** — audyty wewnętrzne, testy penetracyjne, ćwiczenia red team
7. **Praktyki cyberhigieny i szkolenia** — obowiązkowe szkolenia personelu, budowanie świadomości, symulowane kampanie phishingowe
8. **Stosowanie kryptografii i szyfrowania** — szyfrowanie danych produkcyjnych podczas przesyłu i w spoczynku
9. **Bezpieczeństwo zasobów ludzkich, zarządzanie zasobami i kontrola dostępu** — zarządzanie tożsamością (IAM), dostęp oparty na rolach, zasada najmniejszych uprawnień
10. **Wieloskładnikowe uwierzytelnianie (MFA) i zabezpieczone połączenia** — MFA dla wszystkich uprzywilejowanych dostępów, bezpieczne tunele VPN, architektura zero trust

To są obowiązki **organizacji jako całości**, ale w fabryce produkcyjnej znaczną ich część pokrywa MES wraz z IAM i SIEM. W dalszej części pokazuję, jak to wygląda w praktyce.

## Funkcje MES, które już dostarczają dowodów zgodności

Mapując typowe moduły OmniMES (i konkurencyjnych systemów MES) na środki Art. 21:

**Dziennik audytu każdej akcji operatora** — dowód dla obowiązków 2, 6 i 9. Każde wejście do trybu serwisowego, każda zmiana parametru produkcji, każde wymuszone wyciszenie alarmu — wszystko ze znacznikiem czasu, identyfikatorem użytkownika i adresem IP. Dla audytora KSC2 jest to absolutnie kluczowe. Bez dzienników audytu nie udowodnicie ani kontroli dostępu, ani obsługi incydentów — i nie zamkniecie wymogu.

**Genealogia partii** — pokrywa obowiązek 3 (ciągłość działania), ponieważ pozwala odtworzyć pełny przebieg produkcji po incydencie. Jeśli ransomware zaszyfruje dwa dni produkcji, mając genealogię i kopie zapasowe danych materiałowych z ERP da się odtworzyć stan; bez genealogii — trzeba fizycznie ponownie zaudytować produkcję w toku (WIP).

**Kontrola dostępu oparta na rolach (RBAC) z MFA** — obowiązki 9 i 10. Większość nowoczesnych systemów MES (w tym OmniMES) ma wbudowane RBAC. Jeśli wasz MES używa wyłącznie haseł współdzielonych między operatorami — to dziś jest dług zgodności.

**Integracja z SIEM (Splunk, Elastic, Wazuh)** — obowiązki 2 i 6. MES powinien wysyłać zdarzenia istotne dla bezpieczeństwa (nieudane logowania, podniesienie uprawnień, nietypowe zmiany parametrów) do centralnego SIEM, który koreluje je ze zdarzeniami z ERP, Active Directory i firewalla.

**Kopie zapasowe i replikacja** — obowiązek 3. Baza danych MES (zazwyczaj PostgreSQL/SQL Server), konfiguracja oraz własne skrypty — wszystko z dziennym pełnym backupem do osobnej geograficznie lokalizacji (np. NASK oferuje chmurę dla podmiotów istotnych na preferencyjnych warunkach).

## Czego MES standardowo NIE umie — luki do uzupełnienia

Cztery rzeczy wymagające dorobienia praktycznie w każdym wdrożeniu:

**1. Zgłaszanie podatności (Art. 21 ust. 2 lit. e + Art. 6 CRA).** Czy wasz dostawca MES ma proces przyjmowania zgłoszeń o podatnościach od badaczy bezpieczeństwa (CVE) i czy publikuje ogłoszenia o podatnościach? Większość mniejszych dostawców MES (a także wewnętrznych zespołów IT, gdy MES jest budowany własnymi siłami) tego nie ma. Pod NIS2 to obowiązek; pod CRA od 11.12.2027 — obowiązek wobec klientów. W praktyce: trzeba opublikować plik `security.txt` na stronie firmowej, udostępnić adres do odpowiedzialnego zgłaszania podatności i wdrożyć procedurę wstępnej oceny zgłoszeń.

**2. Segmentacja sieci IT/OT.** Większość systemów MES działa w tej samej sieci co biurowy LAN — to klasyczna luka, której regulator nie wybaczy po pierwszym incydencie. Standardem jest umieszczenie MES i SCADA w osobnym VLAN-ie (strefa OT), z firewallem stanowym między IT a OT i listą dozwolonych protokołów (OPC UA, Modbus TCP, MQTT — i tylko ich konkretne sygnatury). Odsyłam do naszego artykułu [Dobre praktyki komunikacji IT/OT](/blog/dobre-praktyki-komunikacji-miedzy-siecia-it-a-ot-jak-zbudowac-bezpieczna-i-nowoczesna-architekture-przemyslowa) — znajdziecie tam pełną referencyjną architekturę segmentacji.

**3. Ciągłe monitorowanie i system IDS dedykowany OT.** Klasyczne systemy IDS (Suricata, Snort) słabo radzą sobie z OT — nie rozumieją protokołów Modbus, S7 ani EtherNet/IP. Trzeba dodać IDS dla OT — komercyjny (Claroty, Dragos, Nozomi) lub open source (Malcolm od CISA). Bez tego nie pokryjecie wymogu wykrywania incydentów z Art. 23.

**4. Dokumentacja łańcucha dostaw.** Art. 21 ust. 2 lit. d wymaga dokumentacji ryzyka łańcucha dostaw. Dla MES oznacza to: listę wszystkich zintegrowanych systemów, ich dostawców, kraje pochodzenia oraz zestawienie komponentów oprogramowania (SBOM) dla każdej zewnętrznej biblioteki. Większość zakładów tego nie ma — w razie audytu zwykle dostają uwagę „braki niekrytyczne", ale po dwóch latach (i ewentualnym incydencie) zamienia się ona w „krytyczne".

## Ryzyko dostawców: każde zewnętrzne API to dług zgodności

Praktyczna obserwacja z 8 audytów, w których uczestniczyłem w 2025 i I kwartale 2026: **najszybciej rosnący dług zgodności pod NIS2 to integracje z chmurowymi modelami LLM**. Powody:

- API do OpenAI/Anthropic oznacza **przepływ danych przez dostawcę spoza UE** — wymaga umowy powierzenia (DPA), oceny adekwatności (po wyroku Schrems II) oraz wpisu do rejestru czynności przetwarzania
- Każda zmiana modelu (GPT-4 → GPT-4o → GPT-5) to **zmiana w łańcuchu dostaw** — wymaga ponownej oceny ryzyka
- Brak SBOM dla najnowszej generacji modeli LLM — dostawca nie ujawnia, jak model był trenowany, na jakich danych ani jakie ma zależności
- Logi zapytań do chmurowego LLM są **u dostawcy**, a nie u was — to luka w śladzie audytowym przy raportowaniu incydentów

Dlatego **lokalne modele LLM** (Phi-4, Llama 3.3, Qwen 2.5) działające na waszym sprzęcie są pod kątem zgodności z NIS2 nieporównywalnie prostsze. Pozwalają wyeliminować:
- transgraniczny transfer danych
- uzależnienie od dostawcy
- ślad audytowy poza siedzibą
- nieprzewidywalne zmiany API

Pokazywałem to konkretnie w artykule [Lokalny RAG w fabryce: Phi-4 + sqlite-vec na Jetson Orin](/blog/lokalny-rag-w-fabryce-phi-4-sqlite-vec-na-jetson-orin-asystent-mes-bez-wycieku-danych-do-chmury). Pod NIS2 to nie tylko kwestia ekonomii — to redukcja powierzchni audytowej o całego dostawcę z USA.

Analogicznie: MES w modelu SaaS (Plex, Tulip, niektóre produkty Siemensa) wymaga od Was, jako klienta, dokumentacji ryzyka łańcucha dostaw oraz SLA pokrywającego wymogi NIS2. MES wdrożony lokalnie (on-premise) to po prostu mniej dokumentów i mniej pytań od audytora.

## Raportowanie incydentów (Art. 23) — 24h, 72h, 1 mies.

Trzy okna czasowe, których nie da się ominąć:

**24 godziny od wykrycia** — wczesne ostrzeżenie do CSIRT NASK (dla podmiotów istotnych z Załącznika II). Minimum treści: czy podejrzewamy działanie celowe, czy incydent ma skutek transgraniczny, czy może rozszerzyć się na inne podmioty.

**72 godziny** — zgłoszenie wstępne. Pełniejszy opis: ocena dotkliwości, wskaźniki kompromitacji (IoC), wstępne środki łagodzące. Tu dziennik audytu MES staje się głównym dowodem — pokazujecie konkretne wpisy ze znacznikami czasu, co działo się na hali w godzinach poprzedzających incydent.

**1 miesiąc** — raport końcowy. Pełna analiza przyczyn źródłowych, środki naprawcze, wnioski z incydentu, plan zapobiegania. Tu genealogia partii w MES i konfiguracja systemu są kluczowe — bez tego nie udowodnicie, że incydent nie wpłynął na jakość partii produktów wysłanych w danym okresie.

W praktyce: przygotujcie **dwa szablony** — 24-godzinny raport komunikacyjny incydentu (ICR) i 72-godzinne zgłoszenie incydentu (INR). Procedurę warto ćwiczyć raz na pół roku w formie ćwiczeń teoretycznych (tabletop) z udziałem zarządu — to oni odpowiadają osobiście, patrz niżej.

## Sankcje — kary administracyjne + odpowiedzialność osobista członków zarządu

Tu jest największa zmiana vs NIS1:

**Podmiot kluczowy:** kary administracyjne do **10 mln EUR lub 2% globalnego obrotu** (zależnie od tego, co większe). Obowiązuje też publiczne ujawnienie informacji o naruszeniu.

**Podmiot istotny:** kary do **7 mln EUR lub 1,4% globalnego obrotu**. Dodatkowo publiczne ujawnienie, jeśli incydent ma znaczący wpływ.

**Odpowiedzialność osobista zarządu** ([Art. 20 NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_20)). Członkowie zarządu osobiście odpowiadają za nadzór nad zgodnością w obszarze cyberbezpieczeństwa. Mogą zostać czasowo zawieszeni przez właściwy organ, jeśli powtarzające się zaniedbania są rażące. To nowość — w NIS1 odpowiedzialność była wyłącznie organizacyjna, teraz jest też osobista.

KSC2 w polskiej implementacji dodaje: dodatkowe kary za niezgłoszenie incydentu w terminie (do 100 tys. zł za każde 24 godziny opóźnienia) oraz prawo CSIRT NASK do nakazania publicznego ujawnienia.

## Plan na 12 miesięcy do dojrzałości w zakresie zgodności

Dla typowego polskiego zakładu (~150 osób, produkcja motoryzacyjna lub chemiczna), startującego dziś:

**Miesiące 1–2 (czerwiec–lipiec 2026): ocena stanu.** Inwentaryzacja zasobów IT/OT (MES, SCADA, PLC, ERP, AD), klasyfikacja danych, mapowanie procesów krytycznych dla ciągłości produkcji. Ocena ryzyka według ISO 27005 lub NIST CSF. Identyfikacja wszystkich dostawców (top 30) wraz z dokumentacją umów powierzenia (DPA) i SLA.

**Miesiące 3–4 (sierpień–wrzesień 2026): szybkie zwycięstwa.** MFA dla wszystkich uprzywilejowanych dostępów (administrator MES, SCADA, AD). Segmentacja sieci IT/OT (VLAN i reguły firewalla). Kopia zapasowa bazy danych MES w osobnej lokalizacji. Procedury reagowania na incydenty (szablony zgłoszeń 24h/72h/1 miesiąc).

**Miesiące 5–7 (październik–grudzień 2026): głębokie zmiany.** Wdrożenie IDS dla OT (Claroty/Nozomi lub Malcolm). Centralny SIEM zbierający zdarzenia z MES, SCADA, AD i firewalli. Zarządzanie podatnościami (regularne skanowanie, polityka łatania). Szkolenia personelu (budowanie świadomości, symulowane kampanie phishingowe). Wewnętrzny test penetracyjny.

**Miesiące 8–10 (styczeń–marzec 2027): zarządzanie łańcuchem dostaw.** Aneksowanie umów z dostawcami MES, ERP i chmury (DPA, SLA, klauzule dotyczące zgłaszania podatności). Wewnętrzny audyt zgodności. Ćwiczenia teoretyczne (tabletop) z udziałem zarządu.

**Miesiące 11–12 (kwiecień–maj 2027): walidacja i deklaracja zgodności.** Audyt zewnętrzny (np. EY, Deloitte, PwC). Formalna rejestracja w CSIRT NASK jako podmiot istotny. Plan ciągłego doskonalenia.

Realistyczny budżet dla średniego zakładu: **150–400 tys. zł** na pełne wdrożenie w pierwszym roku, plus **80–150 tys. zł rocznie** na koszty utrzymania (licencje IDS dla OT, audyty, szkolenia, analityk bezpieczeństwa na 0,3 etatu).

## Wnioski dla dyrektora produkcji i CISO

Trzy konkrety:

**Po pierwsze**, NIS2/KSC2 nie omija polskich producentów średniej wielkości — sektor produkcyjny w Załączniku II i próg 50 osób oznacza, że większość zakładów chemicznych, motoryzacyjnych, spożywczych, maszynowych, elektronicznych i medycznych jest „podmiotem istotnym". Jeśli macie więcej niż 50 osób — sprawdźcie dziś, czy nie jesteście objęci regulacją.

**Po drugie**, MES jest źródłem 40–50% dowodów zgodności z NIS2 (dziennik audytu, RBAC, genealogia partii, integracja z SIEM). Wymaga jednak uzupełnienia o procedurę zgłaszania podatności, segmentację sieci IT/OT, IDS dla OT i dokumentację łańcucha dostaw. To nie jest wymiana MES — to rozszerzenie i uzupełnienie tego, co już macie.

**Po trzecie**, każde zewnętrzne API (chmurowe modele LLM, MES w modelu SaaS, zewnętrzna analityka) to dług zgodności. **Lokalne modele LLM i MES wdrożony lokalnie dramatycznie redukują powierzchnię audytową.** W przyszłorocznych audytach KSC2 przełoży się to na różnicę między „zgodny" a „warunkowo zgodny z planem naprawczym".

Sankcje są wysokie (do 10 mln EUR i odpowiedzialność osobista zarządu), ale prawdziwym ryzykiem nie jest kara — jest reputacja. Pierwsze publiczne ujawnienie informacji o incydencie u polskiego producenta motoryzacyjnego pod NIS2 będzie nagłówkiem w głównych mediach. Prewencja jest dziś tańsza niż naprawa później.

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
