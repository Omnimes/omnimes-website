---
title: 'EU AI Act, sierpień 2026: które funkcje MES kwalifikują się jako „high-risk AI" — i co to znaczy w praktyce'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'eu-ai-act-sierpien-2026-ktore-funkcje-mes-kwalifikuja-sie-jako-high-risk-ai'
description: '2 sierpnia 2026 zaczynają obowiązywać przepisy AI Act dotyczące systemów wysokiego ryzyka. Część funkcji MES — predykcja awarii, monitoring operatorów, AI w kontroli jakości i wsparcie decyzji o przeniesieniach kadrowych — może zostać sklasyfikowana jako high-risk z karą do 15 mln EUR za naruszenia. Artykuł pokazuje konkretnie, które funkcje MES są pod regulacją (Annex I + Annex III), które prawie na pewno nie, jakie obowiązki musi spełnić deployer i provider, oraz co zrobić w pozostałych ~3 miesiącach.'
coverImage: '/images/post-ai-act-mes/cover-ai-act-mes.png'
lang: 'pl'
tags: [{"value":"AI","label":"AI"},{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"aiAct","label":"AI Act"}]
publishedAt: '2026-05-05T08:00:00.000Z'
---

**2 sierpnia 2026** to data, której większość zakładów produkcyjnych w Polsce jeszcze nie ma w kalendarzu compliance. Tego dnia w UE zaczynają w pełni obowiązywać przepisy [AI Act](https://artificialintelligenceact.eu/) dotyczące systemów wysokiego ryzyka (Annex III) oraz uprawnienia Komisji Europejskiej do egzekwowania zasad wobec dostawców GPAI ([DLA Piper, sierpień 2025](https://www.dlapiper.com/en-us/insights/publications/2025/08/latest-wave-of-obligations-under-the-eu-ai-act-take-effect)). Kary za naruszenia w obszarze high-risk sięgają **15 mln EUR lub 3% globalnego obrotu** (zob. Art. 99 AI Act). Za praktyki zakazane — **35 mln EUR lub 7%** ([artificialintelligenceact.eu/article/99](https://artificialintelligenceact.eu/article/99/)).

Dla świata MES, SCADA i CMMS to nie jest abstrakcyjna regulacja dla „dużego AI". Część funkcji, które już dziś działają na polskich halach — predykcja awarii sprzężona z systemem bezpieczeństwa maszyny, monitoring wydajności operatora wpływający na premie, AI klasyfikujące braki w kontroli jakości produktów medycznych — może podlegać klasyfikacji high-risk. Niżej rozbieram to bez wody: co dokładnie jest regulowane, co nie, i co trzeba zrobić w pozostałych miesiącach.

## Dwie ścieżki klasyfikacji — Annex I vs Annex III

AI Act ma dwie niezależne ścieżki, którymi system AI staje się high-risk. Zrozumienie tej dychotomii jest kluczowe, bo MES może wpaść w **obie** jednocześnie.

**Ścieżka 1: Annex I (Article 6(1))** — AI jako komponent bezpieczeństwa lub sam produkt podlegający harmonizacji UE. W tym koszyku jest m.in. **Rozporządzenie w sprawie maszyn 2023/1230** (zastępujące Dyrektywę Maszynową 2006/42/WE od **20 stycznia 2027**, [TÜV Rheinland](https://www.tuv.com/world/en/new-machinery-regulation-eu-2023-1230.html)). Nowe rozporządzenie wprost wymienia AI-based safety components i adaptive control systems. Jeżeli wasz MES integruje się z systemem bezpieczeństwa maszyny — np. AI predykuje rozkład łożyska i automatycznie zmienia parametry pracy linii by uniknąć awarii skutkującej ryzykiem dla operatora — to z dużym prawdopodobieństwem jesteście w Annex I.

**Ścieżka 2: Annex III (Article 6(2))** — osiem obszarów use-case'owych, w których AI jest high-risk z definicji, chyba że nie stwarza istotnego ryzyka dla zdrowia, bezpieczeństwa lub praw podstawowych ([Annex III, artificialintelligenceact.eu](https://artificialintelligenceact.eu/annex/3/)). Z perspektywy MES interesują nas trzy z tych ośmiu kategorii: **infrastruktura krytyczna**, **zatrudnienie i zarządzanie pracownikami**, oraz w wybranych branżach — **usługi podstawowe**.

Termin obowiązywania jest też różny: Annex III stosuje się od **2 sierpnia 2026**, Annex I — od **2 sierpnia 2027** dla większości produktów ([artificialintelligenceact.eu/article/6](https://artificialintelligenceact.eu/article/6/)). To oznacza, że deployer MES z modułem AI najpierw zderzy się z obowiązkami Annex III (workforce monitoring, krytyczna infrastruktura), a dopiero rok później — z pełnymi wymaganiami dla AI w maszynach.

## Funkcje MES, które kwalifikują się jako high-risk

Konkretnie, mapując typowe moduły MES/EMS/CMMS na zapisy AI Act:

**1. AI w predykcji awarii sprzężonej z systemem bezpieczeństwa maszyny (Annex I).** Klasyczny przykład: model XGBoost analizujący sygnały z czujników wibracji, który decyduje o automatycznym wyłączeniu agregatu zanim dojdzie do awarii zagrażającej operatorowi. To AI jako komponent bezpieczeństwa maszyny w rozumieniu Rozporządzenia 2023/1230. High-risk z mocy prawa.

**2. AI klasyfikujące braki w branżach regulowanych — produkcja medyczna, motoryzacja, lotnictwo (Annex I).** Wizja komputerowa wykrywająca defekty na linii produkcji wyrobów medycznych jest objęta MDR (Medical Device Regulation), a tym samym — Annex I AI Act. To samo dotyczy bezpieczeństwa pojazdów (Type Approval Regulation) i lotnictwa cywilnego (EASA). Zwykła kontrola wizyjna w produkcji opakowań plastikowych — nie.

**3. Monitoring wydajności i zachowania operatorów (Annex III, pkt 4b).** AI Act wprost klasyfikuje jako high-risk systemy AI „przeznaczone do monitorowania i oceny wydajności i zachowania osób w stosunkach pracy". Tu wpada większość modułów MES, które:
- generują rankingi operatorów na podstawie OEE/wydajności,
- liczą metryki indywidualne wpływające na premie/awanse,
- analizują kamerami zachowanie pracownika (czas spędzony przy stanowisku, kompletność procedury).

To **najczęściej pomijany** obszar. Polski kierownik produkcji często nie zdaje sobie sprawy, że dashboard z rankingiem operatorów połączony z systemem premiowym może być high-risk AI z perspektywy regulatora.

**4. AI wspierające decyzje kadrowe — task allocation, awanse, zwolnienia (Annex III, pkt 4b).** Jeżeli wasz MES rekomenduje przeniesienie operatora na inną linię na podstawie historii błędów, albo wspiera decyzje o redukcji zatrudnienia po analizie produktywności zespołów — to high-risk.

**5. AI w zarządzaniu krytyczną infrastrukturą energetyczną, wodną, gazową (Annex III, pkt 2).** Dotyczy zakładów, które są częścią dostaw energii elektrycznej, wody, gazu, ciepła. Jeżeli wasz EMS optymalizuje pracę agregatów kogeneracyjnych zasilających lokalną sieć, AI w warstwie sterowania tym procesem jest high-risk.

## Funkcje MES, które prawie na pewno NIE są high-risk

Tu dla równowagi — bo panika kosztuje równie dużo co zaniedbanie:

- **Raporty zmianowe generowane przez LLM** (np. ChatGPT/Claude streszcza dane z OEE i przyczyn przestojów). To narzędzie analityczne, nie podejmuje autonomicznych decyzji wpływających na zdrowie/prawa.
- **Chatbot dokumentacji technicznej** (jak nasz [LangChain + Outline w OmniMES](https://omnimes.com/pl/blog/jak-polaczylismy-langchain-z-outline-tworzac-inteligentnego-asystenta-dokumentacji-w-omnimes-nowoczesny-chatbot)) — informacja, nie decyzja.
- **Predykcja zużycia surowca pod planowanie zamówień** — funkcja biznesowa, nie safety, nie HR.
- **AI sugerujące optymalny harmonogram konserwacji prewencyjnej** — pod warunkiem, że człowiek zatwierdza wykonanie, a nie jest to sprzężone z auto-shutdownem maszyny.
- **Analiza energii w ramach EMS dla raportowania ESG/ISO 50001** — to compliance pod inną regulację, nie AI Act.

Granica jest w jednej kwestii: **czy AI ma wpływ na bezpieczeństwo, prawa podstawowe lub decyzje pracownicze?** Jeżeli nie — najprawdopodobniej nie jesteście w Annex.

## Co znaczy „high-risk" w praktyce — siedem obowiązków

Jeżeli funkcja MES wpada w high-risk, to provider (czyli wy, jeśli rozwijacie własne moduły AI; lub vendor, jeśli kupujecie) i deployer (czyli zakład produkcyjny używający systemu) muszą spełnić ([Article 17](https://www.euaiact.com/article/17), [Annex VI](https://artificialintelligenceact.eu/annex/6/), [Article 26](https://artificialintelligenceact.eu/article/26/)):

1. **System zarządzania jakością (QMS)** — udokumentowany proces rozwoju, walidacji i utrzymania systemu AI. Część może być zintegrowana z istniejącym ISO 9001.
2. **Dokumentacja techniczna** — architektura, dane treningowe, metryki dokładności, ocena ryzyka, plan testów. Aktualizowana w cyklu życia systemu.
3. **Conformity assessment** — wewnętrzny (Annex VI) lub przez notified body (Annex VII), zależnie od typu systemu i obszaru. Większość systemów Annex III idzie ścieżką wewnętrzną.
4. **Rejestracja w bazie danych UE** — przed wprowadzeniem na rynek system high-risk Annex III musi być wpisany do publicznej bazy.
5. **Post-market monitoring (Article 72)** — udokumentowany plan zbierania danych o wydajności i incydentach po wdrożeniu, raportowanie poważnych incydentów do organów nadzoru.
6. **Human oversight (Article 14)** — wbudowane mechanizmy umożliwiające człowiekowi monitorowanie, interwencję i nadrzędność nad decyzjami AI. Dla systemu klasyfikującego braki to znaczy: operator może zatwierdzić/odrzucić decyzję AI; logujemy każdą interwencję.
7. **Logowanie i audit trail** — automatyczne logi wszystkich istotnych zdarzeń, przechowywane przez minimum 6 miesięcy.

Dla deployera (czyli właściciela zakładu używającego high-risk MES) dochodzi jeszcze obowiązek z **Article 26**: **przed wdrożeniem high-risk AI w miejscu pracy musicie poinformować przedstawicieli pracowników i samych pracowników** o tym, że będą poddani działaniu takiego systemu. To nie jest opcjonalne i nie da się tego obejść regulaminem pracy podpisanym dwa lata wcześniej.

## Polska specyfika — KRiBSI i opóźnienie ustawy

Polska przyjęła unikalne podejście: zamiast rozdzielać kompetencje między UODO, UKE i sektorowych regulatorów, rząd zdecydował się na **jeden centralny organ — Komisję Rozwoju i Bezpieczeństwa Sztucznej Inteligencji (KRiBSI)** ([Rzeczpospolita, marzec 2026](https://www.rp.pl/prawo-w-polsce/art44076181-rzad-przyjal-projekt-ustawy-o-systemach-sztucznej-inteligencji-ma-wdrozyc-w-polsce-ai-act)). Polska razem z Litwą są jedynymi krajami UE, które poszły tą drogą.

Problem: stan na maj 2026 — **polska ustawa wdrażająca AI Act jeszcze nie weszła w życie**. Projekt został przyjęty przez rząd 31 marca 2026, ale przed nim cała ścieżka parlamentarna ([prawo.pl, kwiecień 2026](https://www.prawo.pl/biznes/ai-act-juz-obowiazuje-co-to-oznacza-dla-firm,534568.html)). Dla zakładów oznacza to dwie rzeczy:

- Obowiązki wynikające z **rozporządzenia UE** stosują się **bezpośrednio** od 2 sierpnia 2026 — nie czekacie na polską ustawę. Niezgodność = ryzyko kary nakładanej (po przejściu polskiej procedury) przez KRiBSI lub bezpośrednio przez Komisję Europejską w przypadku GPAI.
- Brak krajowych procedur enforcementowych nie jest argumentem obronnym — UODO już sygnalizuje, że w obszarze danych osobowych w AI będzie działać na podstawie RODO niezależnie od stanu polskiej ustawy AI.

Praktycznie: nie traktujcie braku polskiej ustawy jako luzu. Traktujcie jako okno do uporządkowania własnych spraw, zanim KRiBSI zacznie wydawać pierwsze decyzje (prognozowo Q4 2026 / Q1 2027).

## Kary i koszty niezgodności

Stawki z [Article 99 AI Act](https://artificialintelligenceact.eu/article/99/) — wybiera się **wyższą z dwóch wartości**:

- **Praktyki zakazane** (Article 5 — m.in. social scoring, manipulacja behawioralna): do **35 mln EUR lub 7% globalnego rocznego obrotu**.
- **Naruszenia obowiązków high-risk** (większość scenariuszy MES): do **15 mln EUR lub 3% obrotu**.
- **Podanie nieprawdziwych informacji** organom nadzoru: do **7,5 mln EUR lub 1% obrotu**.

Dla małych i średnich firm (SME) Article 99 przewiduje obniżkę — bierze się **niższą z dwóch wartości**. To realna ulga dla większości polskich zakładów produkcyjnych.

Koszt zgodności? Z naszej praktyki w OmniMES: **conformity assessment wewnętrzny (Annex VI) dla jednego modułu AI to typowo 15–30 dni roboczych zespołu (architekt, prawnik IP, data scientist)**. Notified body (Annex VII), jeżeli wymagane — 6–12 tygodni i koszty audytu od 25 do 80 tys. EUR. Dla porównania: jedna kara za naruszenie high-risk w wysokości 3% obrotu zakładu z przychodem 100 mln EUR to 3 mln EUR. Matematyka mówi sama za siebie.

## Co zrobić w pozostałych ~3 miesiącach — checklist

Realnie do 2 sierpnia 2026 zostały trzy miesiące. To wystarczy na **inwentaryzację i fundamenty**, nie na pełny conformity assessment. Sensowna sekwencja:

1. **Zinwentaryzujcie wszystkie funkcje MES/EMS/CMMS używające AI lub uczenia maszynowego.** Lista powinna obejmować: nazwę funkcji, model (jeśli znany), źródło (in-house vs vendor), opis decyzji, którą AI wspiera lub podejmuje.
2. **Zmapujcie każdą funkcję na Annex I lub Annex III** używając trzech pytań: (a) czy AI jest komponentem bezpieczeństwa maszyny lub produktu regulowanego (Annex I)? (b) czy AI ocenia ludzi w pracy lub wpływa na decyzje kadrowe (Annex III pkt 4)? (c) czy AI zarządza infrastrukturą krytyczną (Annex III pkt 2)?
3. **Dla funkcji oznaczonych high-risk** zacznijcie od dokumentacji technicznej i logów. To podstawa, na której oprzecie wszystko inne. Bez tego nie macie czego oceniać.
4. **Zorganizujcie spotkanie z przedstawicielami pracowników** w sprawie tych funkcji, które monitorują wydajność/zachowanie. Article 26 wymaga informacji **przed** wdrożeniem — jeżeli system już działa, to konsultacja powinna się odbyć asap.
5. **Sprawdźcie kontrakty z vendorami MES.** Kto jest providerem w rozumieniu AI Act? Czy vendor zobowiązuje się do conformity assessment? Czy macie dostęp do dokumentacji technicznej? To są negocjowane teraz, nie po pierwszej kontroli.
6. **Wyznaczcie osobę odpowiedzialną** — ktoś musi mieć w opisie stanowiska „AI Act compliance lead". Bez tego inicjatywa rozmydli się między IT, jakością i HR.

## Podsumowanie — niewygodna prawda

AI Act nie ma na celu zatrzymania automatyzacji w przemyśle. Ma zapewnić, że automatyzacja, która podejmuje decyzje wpływające na ludzi, jest **przejrzalna, audytowalna i kontrolowana**. Jeżeli OmniMES, SAP DM czy Siemens Opcenter już dziś robi audit log każdej decyzji, ma RBAC per moduł i pozwala kierownikowi nadrzędować nad rekomendacjami AI — to wymagania AI Act dla większości funkcji są bardziej proceduralne niż technologiczne.

Najgorszy scenariusz: zakład odkrywa we wrześniu 2026, że dashboard z rankingiem operatorów to high-risk AI, którego nie zinwentaryzował, nie udokumentował i nie skonsultował z przedstawicielami pracowników. KRiBSI nie będzie zainteresowane wymówką „myśleliśmy że to tylko Excel z OEE". Compliance to nie projekt na tydzień przed deadline'em — to system, który warto budować od teraz.

## Źródła

- AI Act Service Desk — [Timeline for the Implementation of the EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act)
- EU Artificial Intelligence Act — [Article 6: Classification Rules for High-Risk AI Systems](https://artificialintelligenceact.eu/article/6/)
- EU Artificial Intelligence Act — [Annex III: High-Risk AI Systems](https://artificialintelligenceact.eu/annex/3/)
- EU Artificial Intelligence Act — [Article 17: Quality Management System](https://www.euaiact.com/article/17)
- EU Artificial Intelligence Act — [Article 26: Obligations of Deployers of High-Risk AI Systems](https://artificialintelligenceact.eu/article/26/)
- EU Artificial Intelligence Act — [Article 72: Post-Market Monitoring](https://artificialintelligenceact.eu/article/72/)
- EU Artificial Intelligence Act — [Article 99: Penalties](https://artificialintelligenceact.eu/article/99/)
- EU Artificial Intelligence Act — [Annex VI: Conformity Assessment Procedure Based on Internal Control](https://artificialintelligenceact.eu/annex/6/)
- DLA Piper — [Latest wave of obligations under the EU AI Act take effect (sierpień 2025)](https://www.dlapiper.com/en-us/insights/publications/2025/08/latest-wave-of-obligations-under-the-eu-ai-act-take-effect)
- TÜV Rheinland — [New Machinery Regulation EU 2023/1230](https://www.tuv.com/world/en/new-machinery-regulation-eu-2023-1230.html)
- EU-OSHA — [Regulation 2023/1230/EU - machinery](https://osha.europa.eu/en/legislation/directive/regulation-20231230eu-machinery)
- Rzeczpospolita — [Rząd przyjął projekt ustawy o systemach sztucznej inteligencji (marzec 2026)](https://www.rp.pl/prawo-w-polsce/art44076181-rzad-przyjal-projekt-ustawy-o-systemach-sztucznej-inteligencji-ma-wdrozyc-w-polsce-ai-act)
- Prawo.pl — [Firmy muszą działać zgodnie z AI Act, mimo braku krajowych przepisów (kwiecień 2026)](https://www.prawo.pl/biznes/ai-act-juz-obowiazuje-co-to-oznacza-dla-firm,534568.html)
