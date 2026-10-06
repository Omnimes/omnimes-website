---
title: 'AI Act 15 dni po 2 sierpnia 2026: co UODO i UOKiK faktycznie kontrolują w polskim MES — i dlaczego obowiązki dla AI wysokiego ryzyka przesunięto na grudzień 2027'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'ai-act-w-akcji-15-dni-po-2-sierpnia-2026-co-uodo-i-uokik-faktycznie-kontroluja-w-polskim-mes'
description: '2 sierpnia 2026 r. nie uruchomił egzekucji obowiązków dla systemów AI wysokiego ryzyka. Pakiet Digital Omnibus (rozporządzenie 2026/1744) przesunął je na 2 grudnia 2027 r. dla załącznika III i na 2 sierpnia 2028 r. dla załącznika I. Wyjaśniamy, co fabryka z systemem MES musi spełniać już teraz (zakaz rozpoznawania emocji w miejscu pracy, obowiązki przejrzystości, RODO i ocena skutków przy monitorowaniu operatorów), kto w Polsce nadzoruje AI Act i jak wykorzystać czas do grudnia 2027 r.'
coverImage: '/images/post-ai-act-day15/cover-ai-act-day15.png'
lang: 'pl'
tags: [{"value":"AI","label":"AI"},{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"aiAct","label":"AI Act"}]
publishedAt: '2026-08-17T08:00:00.000Z'
---

*Artykuł poprawiony 6 października 2026 r. Pierwsza wersja zawierała błędne informacje o terminach stosowania AI Act i o organach nadzoru.*

**2 sierpnia 2026 r.** miał być dniem, od którego obowiązki AI Act dla systemów wysokiego ryzyka obejmą fabryki: monitorowanie operatorów, ocenę wyników pracy, przydział zadań na podstawie zachowania pracownika. Tak zakładaliśmy w [majowym artykule o klasyfikacji funkcji MES](/blog/eu-ai-act-sierpien-2026-ktore-funkcje-mes-kwalifikuja-sie-jako-high-risk-ai). Ten termin już nie obowiązuje. Pakiet Digital Omnibus, czyli rozporządzenie (UE) 2026/1744, wszedł w życie 27 lipca 2026 r. Przesunął stosowanie przepisów o systemach wysokiego ryzyka z załącznika III (Annex III) na **2 grudnia 2027 r.**, a dla systemów wbudowanych w produkty z załącznika I — na **2 sierpnia 2028 r.** ([K&L Gates](https://www.cyberlawwatch.com/2026/07/31/eu-digital-omnibus-on-ai-enters-into-force/), [Ministerstwo Cyfryzacji](https://www.gov.pl/web/cyfryzacja/ai-act--co-sie-zmienilo-2-sierpnia-2026-roku)).

Piętnaście dni po 2 sierpnia odpowiedź na pytanie z tytułu jest więc prostsza, niż sugerowały rynkowe zapowiedzi. Ani UODO, ani UOKiK nie są organem nadzoru rynku AI. Polska ustawa powierza tę rolę nowej Komisji Rozwoju i Bezpieczeństwa Sztucznej Inteligencji (KRiBSI), a przepisy o kontroli i karach wchodzą w życie dopiero 28 października 2026 r. UODO kontroluje to samo co wcześniej: przetwarzanie danych osobowych na podstawie RODO, także przez systemy AI.

## Digital Omnibus: co przesunięto i dlaczego

Komisja Europejska przedstawiła projekt 19 listopada 2025 r. Parlament i Rada osiągnęły porozumienie 7 maja 2026 r., a Parlament zatwierdził je 16 czerwca 2026 r.: 423 głosy za, 57 przeciw, 174 wstrzymujące się ([EPRS](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf)). Rozporządzenie z 8 lipca 2026 r. opublikowano w Dzienniku Urzędowym UE 24 lipca 2026 r. ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)).

Najważniejsze zmiany z perspektywy przemysłu:

- **Załącznik III** (m.in. zatrudnienie i zarządzanie pracownikami): przepisy rozdziału III stosuje się od 2 grudnia 2027 r. zamiast od 2 sierpnia 2026 r.
- **Załącznik I** (AI w produktach objętych unijnym prawodawstwem harmonizacyjnym): od 2 sierpnia 2028 r.
- **Maszyny:** zgodnie z porozumieniem maszyny z funkcjami AI wyłączono z bezpośredniego stosowania reżimu wysokiego ryzyka AI Act. Wymagania mają spełniać w ramach rozporządzenia maszynowego 2023/1230, do którego Komisja doda je aktami delegowanymi ([EPRS](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf)).
- **Kompetencje w zakresie AI (art. 4):** obowiązek „zapewnienia" odpowiedniego poziomu kompetencji personelu zastąpiono obowiązkiem podejmowania działań wspierających ich rozwój. Przepis wprost nie wymaga gwarantowania określonego poziomu u każdej osoby ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)).
- **Nowe zakazy** generowania treści intymnych bez zgody oraz materiałów przedstawiających seksualne wykorzystywanie dzieci — od 2 grudnia 2026 r. ([harmonogram Komisji Europejskiej](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act)).

Ministerstwo Cyfryzacji uzasadnia zmianę tak: „Przesunięcie terminów ma umożliwić przygotowanie norm, narzędzi i procedur potrzebnych do jednolitego stosowania wymagań w całej Unii" ([gov.pl, 3.08.2026](https://www.gov.pl/web/cyfryzacja/ai-act--co-sie-zmienilo-2-sierpnia-2026-roku)). Biuro analiz Parlamentu Europejskiego wskazuje na opóźnienia w wyznaczaniu organów krajowych i w publikacji norm zharmonizowanych ([EPRS](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf)).

Treść obowiązków dla systemów wysokiego ryzyka się nie zmieniła. Zmienił się termin.

## Co obowiązuje fabrykę z MES już dziś

### Zakaz rozpoznawania emocji w miejscu pracy

Zakazy z art. 5 AI Act stosuje się od 2 lutego 2025 r. ([LEX](https://www.lex.pl/ai-act-od-2-sierpnia-2026-r-kluczowe-wymogi-i-terminy,50129.html)). Dla przemysłu najważniejszy jest art. 5 ust. 1 lit. f: zakaz używania systemów AI do wyciągania wniosków o emocjach osób fizycznych w miejscu pracy i w placówkach edukacyjnych. Wyjątek obejmuje systemy wprowadzane ze względów medycznych lub bezpieczeństwa ([art. 5](https://artificialintelligenceact.eu/article/5/)). Za stosowanie zakazanych praktyk grozi kara do 35 mln EUR albo 7% całkowitego rocznego światowego obrotu ([art. 99](https://artificialintelligenceact.eu/article/99/)).

Wytyczne Komisji w sprawie zakazanych praktyk z 4 lutego 2025 r. doprecyzowują granice ([Lewis Silkin](https://www.lewissilkin.com/insights/2025/02/17/understanding-the-eu-ai-acts-prohibited-practices-key-workplace-and-advertising-102k011)). Stany fizyczne, takie jak zmęczenie czy ból, nie są emocjami. System wykrywający zmęczenie kierowcy lub pilota, żeby ostrzec go przed wypadkiem, nie podlega więc zakazowi. Wyjątek bezpieczeństwa Komisja interpretuje wąsko: nie obejmuje ogólnego dobrostanu, więc wykrywanie stresu czy wypalenia pozostaje zakazane. Wśród zakazanych przykładów wytyczne wymieniają wnioskowanie o emocjach na podstawie mimiki, postawy ciała, ruchów czy sposobu pisania na klawiaturze.

Dla MES oznacza to przegląd kamer na stanowiskach, analizy głosu i modułów mierzących „zaangażowanie" operatora. Jeżeli któryś z nich ocenia emocje pracownika, a nie jego stan fizyczny w celu bezpieczeństwa, problem istnieje już dziś — niezależnie od Omnibusu.

### Obowiązki przejrzystości (art. 50)

Art. 50 stosuje się od 2 sierpnia 2026 r. ([harmonogram Komisji Europejskiej](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act)). Dostawca systemu do bezpośredniej interakcji z ludźmi musi zadbać, by użytkownik wiedział, że rozmawia z AI, a dostawca systemu generatywnego — oznaczać wyniki w formacie odczytywalnym maszynowo. Podmiot stosujący informuje osoby poddane rozpoznawaniu emocji lub kategoryzacji biometrycznej i ujawnia treści typu deepfake ([art. 50](https://artificialintelligenceact.eu/article/50/)). Systemy generatywne wprowadzone do obrotu przed 2 sierpnia 2026 r. mają na oznaczanie treści czas do 2 grudnia 2026 r. ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)).

W fabryce chodzi głównie o asystentów opartych na modelach językowych, z których korzystają operatorzy i służby utrzymania ruchu. Obowiązek spoczywa na dostawcy, ale zakład powinien go sprawdzić przy odbiorze systemu.

### Kompetencje w zakresie AI (art. 4)

Art. 4 obowiązuje od 2 lutego 2025 r. ([LEX](https://www.lex.pl/ai-act-od-2-sierpnia-2026-r-kluczowe-wymogi-i-terminy,50129.html)), a od 27 lipca 2026 r. w złagodzonym brzmieniu. Dostawcy i podmioty stosujące mają podejmować działania wspierające rozwój kompetencji personelu ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)). W praktyce chodzi o udokumentowane szkolenie operatorów i kierowników zmian, którzy korzystają z modułów AI.

### RODO i ocena skutków dla ochrony danych

Monitorowanie operatorów to przede wszystkim przetwarzanie danych osobowych, w którym UODO ma pełne kompetencje. Według UODO wdrożenie systemu monitorowania czasu pracy pracowników i przepływu informacji w ich narzędziach wymaga oceny skutków dla ochrony danych (DPIA). Co do zasady ocenę przeprowadza się, gdy przetwarzanie spełnia co najmniej dwa kryteria z wykazu ogłoszonego komunikatem Prezesa UODO z 17 czerwca 2019 r. ([UODO](https://uodo.gov.pl/pl/598/3617)).

16 lipca 2026 r. Prezes UODO Mirosław Wróblewski skierował do ministry pracy, rodziny i polityki społecznej wniosek o przepisy chroniące kandydatów i pracowników przed dyskryminacją wynikającą ze stosowania AI. Uzasadnił go tym, że systemy AI „rodzą poważne ryzyko powielania uprzedzeń istniejących w danych treningowych". UODO podkreśla też, że ocena skutków dla praw podstawowych z art. 27 AI Act ma jedynie uzupełniać ocenę skutków dla ochrony danych, a nie ją zastępować ([UODO](https://uodo.gov.pl/pl/138/4493)).

Nie znaleźliśmy publicznych informacji o wezwaniach UODO lub UOKiK do zakładów produkcyjnych na podstawie AI Act. Nie miałyby one dziś podstawy: przepisy o systemach wysokiego ryzyka jeszcze nie obowiązują, a żaden z tych urzędów nie jest organem nadzoru rynku AI.

## Kto w Polsce nadzoruje AI Act

Sejm uchwalił ustawę o systemach sztucznej inteligencji 11 czerwca 2026 r. (421 posłów za, 3 przeciw, 18 wstrzymujących się — [rp.pl](https://www.rp.pl/prawo-w-polsce/art44606901-sejm-przyjal-ustawe-o-sztucznej-inteligencji-komisja-ds-ai-i-piaskownice-regulacyjne-dla-firm)). 3 lipca przyjął 24 z 25 poprawek Senatu ([CyberDefence24](https://cyberdefence24.pl/polityka-i-prawo/polska/koniec-parlamentarnych-prac-nad-ustawa-o-sztucznej-inteligencji-czas-na-ruch-prezydenta)), a 24 lipca ustawę podpisał prezydent Karol Nawrocki ([CyberDefence24](https://cyberdefence24.pl/polityka-i-prawo/polska/prezydent-podpisal-ustawe-o-systemach-ai)). Ustawa z 3 lipca 2026 r. (Dz.U. 2026 poz. 1003, ogłoszona 27 lipca) weszła w życie 11 sierpnia 2026 r. ([ELI](https://eli.gov.pl/eli/DU/2026/1003/ogl/pol)).

Najważniejsze rozwiązania ([tekst ustawy](https://api.sejm.gov.pl/eli/acts/DU/2026/1003/text.pdf)):

- **Organ nadzoru rynku.** Jest nim wyłącznie KRiBSI, która pełni też funkcję pojedynczego punktu kontaktowego (art. 5). W jej skład wchodzą przewodniczący, dwóch zastępców oraz czterech członków wskazanych przez Prezesa UOKiK, Komisję Nadzoru Finansowego, Krajową Radę Radiofonii i Telewizji oraz Prezesa UKE (art. 19).
- **UODO, UOKiK, CSIRT NASK.** Współpracują z KRiBSI w określonych sprawach (art. 20): Prezes UODO w zakresie danych osobowych, Prezes UOKiK i inne organy nadzoru rynku produktów w sprawach z art. 74 ust. 1–5 AI Act, zespoły CSIRT przy wymianie informacji o incydentach. Do ustawy o ochronie danych osobowych dodano art. 59a: „Prezes Urzędu współpracuje z Komisją Rozwoju i Bezpieczeństwa Sztucznej Inteligencji" (art. 123).
- **Terminy.** Przepisy o kontroli, postępowaniu, układzie, karach oraz opiniach indywidualnych wchodzą w życie 28 października 2026 r. (art. 127). Wiceminister cyfryzacji Dariusz Standerski zapowiadał w „Rzeczpospolitej": „To oznacza, że w październiku będzie przewodniczący, a w listopadzie komisja rozpocznie działalność" ([rp.pl, 24.07.2026](https://www.rp.pl/prawo-w-polsce/art44882741-polska-komisja-ds-ai-rozpocznie-prace-w-listopadzie)).
- **Kary.** Ustawa nie wprowadza własnych stawek. KRiBSI nakłada kary na warunkach z rozdziału XII AI Act, a kwoty w euro przelicza się na złote po średnim kursie NBP z 28 stycznia danego roku (art. 104). Górne granice z art. 99 AI Act: 35 mln EUR lub 7% obrotu za zakazane praktyki, 15 mln EUR lub 3% za większość pozostałych naruszeń, 7,5 mln EUR lub 1% za wprowadzające w błąd informacje dla organów. Dla małych i średnich przedsiębiorstw stosuje się niższą z dwóch wartości ([art. 99](https://artificialintelligenceact.eu/article/99/)).
- **Łagodzenie sankcji.** Układ z KRiBSI pozwala obniżyć karę o 20–70%, a gdy postępowanie wszczęto na podstawie zgłoszenia samego naruszającego — o 30–90% (art. 70 ust. 6 i art. 84). Wykonanie ostrzeżenia w ciągu trzech miesięcy od doręczenia decyzji o karze pozwala ją obniżyć o 10–50% (art. 107).
- **Opinie indywidualne.** Wniosek do KRiBSI kosztuje 150 zł, a opinia ma być wydana w 30 dni, w sprawach szczególnie skomplikowanych w 60 dni (art. 11 i 12).
- **Organy ochrony praw podstawowych (art. 77 AI Act).** Ministerstwo Cyfryzacji wskazało Rzecznika Praw Dziecka, Rzecznika Praw Pacjenta i Państwową Inspekcję Pracy (od 2 listopada 2024 r.) oraz Prezesa UODO (od 9 maja 2025 r.). Mają one dostęp do dokumentacji systemów wysokiego ryzyka w zakresie potrzebnym do swoich zadań ([gov.pl](https://www.gov.pl/web/cyfryzacja/wykaz-organow-i-instytucji-publicznych-w-polsce-z-obszaru-ochrony-praw-podstawowych-w-rozumieniu-rozporzadzenia-20241689-akt-o-sztucznej-inteligencji)).

## Dane: skala AI w polskich firmach

Według GUS w 2025 r. wykorzystanie technologii AI deklarowało 8,7% przedsiębiorstw (5,9% rok wcześniej). W dużych firmach odsetek ten wyniósł 42,0%, a w przetwórstwie przemysłowym 7,8%. AI w procesie produkcji stosowało 2,6% przedsiębiorstw. Najczęstszym sposobem pozyskania AI był zakup gotowego rozwiązania komercyjnego, wskazany przez 6,4% firm ([GUS, Społeczeństwo informacyjne w Polsce w 2025 r.](https://stat.gov.pl/files/gfx/portalinformacyjny/pl/defaultaktualnosci/5497/1/19/1/spoleczenstwo_informacyjne_w_polsce_2025.pdf)).

Nasza interpretacja: skoro większość firm korzystających z AI kupuje gotowe systemy, większość zakładów będzie w rozumieniu AI Act **podmiotami stosującymi**, a nie dostawcami. To zmienia zakres obowiązków.

Limit wydatków państwa na skutki ustawy wynosi 9,30 mln zł w 2026 r. i 23,74 mln zł w 2027 r. (art. 126 [ustawy](https://api.sejm.gov.pl/eli/acts/DU/2026/1003/text.pdf)).

## Dostawca czy podmiot stosujący: kto za co odpowie od 2 grudnia 2027 r.

**Dostawca** sporządza dokumentację techniczną z załącznika IV (art. 11) i odpowiada za to, by system technicznie umożliwiał automatyczne rejestrowanie zdarzeń przez cały cykl życia ([art. 12](https://artificialintelligenceact.eu/article/12/)). Zakład, który tylko używa kupionego systemu, tej dokumentacji nie sporządza.

**Podmiot stosujący** ma własne obowiązki z art. 26 ([art. 26](https://artificialintelligenceact.eu/article/26/)):

- używa systemu zgodnie z instrukcją dostawcy;
- powierza nadzór osobom, które mają niezbędne kompetencje, przeszkolenie i uprawnienia;
- dba, by dane wejściowe, nad którymi ma kontrolę, były adekwatne i wystarczająco reprezentatywne;
- monitoruje działanie systemu i informuje dostawcę o ryzykach;
- przechowuje automatycznie generowane rejestry zdarzeń przez co najmniej sześć miesięcy, chyba że inne przepisy stanowią inaczej (ust. 6);
- przed oddaniem systemu do użytku w miejscu pracy informuje przedstawicieli pracowników i samych pracowników (ust. 7);
- wykorzystuje informacje od dostawcy przy ocenie skutków dla ochrony danych (ust. 9).

Zakład staje się **dostawcą**, gdy umieszcza na systemie wysokiego ryzyka własną nazwę lub znak towarowy, wprowadza istotną zmianę albo zmienia przeznaczenie systemu tak, że staje się on systemem wysokiego ryzyka ([art. 25](https://artificialintelligenceact.eu/article/25/)). Dotyczy to zakładów, które same budują moduły AI albo głęboko przerabiają kupione rozwiązania.

**Ocena skutków dla praw podstawowych (FRIA, art. 27)** nie dotyczy każdego podmiotu stosującego. Obejmuje podmioty prawa publicznego, podmioty prywatne świadczące usługi publiczne oraz podmioty stosujące systemy z załącznika III pkt 5 lit. b i c, czyli ocenę zdolności kredytowej oraz ubezpieczenia na życie i zdrowotne ([art. 27](https://artificialintelligenceact.eu/article/27/)). Typowy prywatny zakład produkcyjny nie musi jej sporządzać, ale ocena skutków dla ochrony danych z RODO nadal go obowiązuje. Po zmianach FRIA może odsyłać do odpowiednich części DPIA ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)).

**Które funkcje MES mogą trafić do wysokiego ryzyka.** Załącznik III pkt 4 lit. b obejmuje systemy do podejmowania decyzji wpływających na warunki zatrudnienia, awans lub rozwiązanie stosunku pracy, przydziału zadań na podstawie indywidualnego zachowania lub cech osobowych oraz monitorowania i oceny wyników i zachowania pracowników ([załącznik III](https://artificialintelligenceact.eu/annex/3/)). Wyjątek z art. 6 ust. 3 obejmuje systemy, które nie stwarzają znaczącego ryzyka, w tym nie wpływają istotnie na wynik decyzji. Nie dotyczy jednak systemów profilujących osoby fizyczne — te zawsze są systemami wysokiego ryzyka ([art. 6](https://artificialintelligenceact.eu/article/6/)).

**Co w ogóle jest systemem AI.** Według wytycznych Komisji w sprawie definicji systemu AI (C(2025) 5053) poza definicją są systemy usprawniające optymalizację matematyczną, np. z użyciem regresji liniowej lub logistycznej (pkt 42), oraz proste systemy predykcyjne oparte na podstawowej regule statystycznej, np. prognozie średniej (pkt 49). Wytyczne nie są wiążące — ostateczna wykładnia należy do Trybunału Sprawiedliwości UE (pkt 7) ([Komisja Europejska](https://ai-act-service-desk.ec.europa.eu/sites/default/files/2025-08/commission_guidelines_on_the_definition_of_an_artificial_intelligence_system_established_by_regulation_eu_20241689_ai_actenglish_nf2skcqfrtjdfggjavcodopcwz4_112455.PDF)). Nasza ocena: predykcja awarii na danych z maszyn, która nie służy ocenie ludzi, zwykle nie mieści się w załączniku III, nawet jeśli jest systemem AI.

## Bariery i ograniczenia

**Brak norm zharmonizowanych.** To główny powód przesunięcia terminów. Zakład, który przygotowuje się teraz, pracuje na wymaganiach z rozporządzenia, a nie na gotowych normach technicznych. Granice definicji systemu AI i zakazu rozpoznawania emocji wyznaczają na razie niewiążące wytyczne Komisji.

**Luka instytucjonalna.** Według zapowiedzi Ministerstwa Cyfryzacji KRiBSI ma rozpocząć działalność w listopadzie 2026 r. Do tego czasu nie ma organu, który wydawałby przedsiębiorcom opinie indywidualne.

**Stałe daty zamiast warunkowych.** Komisja proponowała, by obowiązki zaczęły się stosować po potwierdzeniu dostępności norm, najpóźniej 2 grudnia 2027 r. dla załącznika III. Ustawodawcy wybrali sztywne terminy ([EPRS](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf)), więc grudzień 2027 r. obowiązuje niezależnie od tego, czy normy zdążą powstać.

**Nakładanie się przepisów.** Moduł monitorowania operatorów podlega jednocześnie AI Act, RODO i Kodeksowi pracy, a infrastruktura — wymaganiom cyberbezpieczeństwa (zob. [artykuł o NIS2 i KSC](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki)).

**Wymagania klientów mogą wyprzedzić prawo.** Przykład: materiał Mercedes-Benz dla dostawców z lutego 2026 r. oczekuje od nich budowania świadomości ryzyk zgodności technicznej, w tym związanych z AI, oraz rzetelnego dokumentowania tych ryzyk ([Mercedes-Benz](https://docmaster.supplier.mercedes-benz.com/DMPublic/en/doc/ALD00001630.2026-02.EN.pdf)). Dla dostawcy motoryzacyjnego pytania od klienta mogą pojawić się wcześniej niż pierwsza kontrola.

## Co to oznacza dla fabryki: plan na 15 miesięcy

Poniższy plan to **nasza rekomendacja**, a nie wymóg prawny.

**Etap 1 — do końca października 2026 r.**

1. Inwentaryzacja modułów MES i systemów współpracujących, które korzystają z uczenia maszynowego lub modeli językowych: czy dotyczą ludzi czy maszyn, czy zakład jest dostawcą czy podmiotem stosującym.
2. Przegląd pod kątem art. 5 ust. 1 lit. f: czy któraś funkcja wnioskuje o emocjach pracowników.
3. Ocena skutków dla ochrony danych dla monitorowania operatorów, jeśli jeszcze jej nie ma.
4. Udokumentowane szkolenia użytkowników modułów AI (art. 4).

**Etap 2 — pierwsza połowa 2027 r.**

5. Klasyfikacja funkcji według załącznika III pkt 4 i art. 6 ust. 3, z pisemnym uzasadnieniem dla funkcji uznanych za niebędące systemem wysokiego ryzyka.
6. Uzupełnienie umów z dostawcami: instrukcja użytkowania, informacje potrzebne do DPIA, dostęp do rejestrów zdarzeń.
7. Wyznaczenie osób sprawujących nadzór człowieka.

**Etap 3 — druga połowa 2027 r.**

8. Uruchomienie rejestru decyzji AI z przechowywaniem przez co najmniej sześć miesięcy.
9. Poinformowanie przedstawicieli pracowników i pracowników przed 2 grudnia 2027 r.
10. Aktualizacja DPIA z wykorzystaniem informacji od dostawcy.

**Co powinien umieć system MES** (nasza ocena, na podstawie art. 12 i 26). Przy każdej rekomendacji lub decyzji modułu AI dotyczącej ludzi system powinien zapisywać czas zdarzenia, wersję modelu, odniesienie do danych wejściowych, wynik modelu, podjęte działanie i osobę, która je zatwierdziła lub odrzuciła. Okres przechowywania powinien być konfigurowalny i nie krótszy niż sześć miesięcy, zapis — możliwy do wyeksportowania na żądanie organu, a podpowiedzi pochodzące z AI — wyraźnie oznaczone w interfejsie.

Obowiązki dla AI wysokiego ryzyka zaczną się stosować w grudniu 2027 r., a nie w sierpniu 2026 r. Zakaz rozpoznawania emocji, obowiązki przejrzystości i RODO obowiązują już teraz.

## Aktualizacja (6 października 2026)

- 18 września 2026 r. Sejm powołał Pamelę Krzypkowską na przewodniczącą KRiBSI: 271 posłów za, 24 przeciw, 140 wstrzymujących się. Wcześniej była dyrektorką Departamentu Badań i Innowacji w Ministerstwie Cyfryzacji ([rp.pl](https://www.rp.pl/prawo-w-polsce/art45159621-sejm-powolal-pamele-krzypkowska-na-szefowa-komisji-rozwoju-i-bezpieczenstwa-ai)). 24 września 2026 r. Senat wyraził zgodę na jej powołanie ([wnp.pl](https://www.wnp.pl/rynki/senat-za-powolaniem-pameli-krzypkowskiej-na-szefowa-komisji-rozwoju-i-bezpieczenstwa-ai,1102315.html)).
- 28 października 2026 r. wchodzą w życie przepisy o kontroli i karach (art. 127 ustawy).
- Pierwsza wersja artykułu opisywała wezwania UODO i UOKiK do zakładów, wypowiedź „szefowej Departamentu Rynku Cyfrowego UODO" i karę do 5 mln zł z polskiej ustawy. Żadnej z tych informacji nie potwierdziliśmy: UODO nie ma takiego departamentu ([UODO](https://uodo.gov.pl/pl/p/o-nas)), a ustawa odsyła do kar z art. 99 AI Act. Usunęliśmy te treści i przepraszamy czytelników.

---

## Źródła

- [EPRS, Digital Omnibus on AI (briefing)](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf) — przebieg prac, głosowanie w Parlamencie, nowe terminy, maszyny, przyczyny opóźnień
- [K&L Gates, EU Digital Omnibus on AI Enters Into Force](https://www.cyberlawwatch.com/2026/07/31/eu-digital-omnibus-on-ai-enters-into-force/) — rozporządzenie 2026/1744, publikacja 24.07.2026, wejście w życie 27.07.2026, nowe terminy
- [nicfab, Digital Omnibus on AI in the Official Journal](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/) — data rozporządzenia, zmiany art. 4, art. 27 i art. 50, piaskownice
- [Komisja Europejska, harmonogram stosowania AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act) — terminy 2.08.2026, 2.12.2026, 2.12.2027, 2.08.2028
- [Ministerstwo Cyfryzacji, AI Act — co się zmieniło 2 sierpnia 2026 roku](https://www.gov.pl/web/cyfryzacja/ai-act--co-sie-zmienilo-2-sierpnia-2026-roku) — nowe terminy i uzasadnienie przesunięcia
- [LEX, AI Act od 2 sierpnia 2026 r.](https://www.lex.pl/ai-act-od-2-sierpnia-2026-r-kluczowe-wymogi-i-terminy,50129.html) — stosowanie zakazów i art. 4 od 2.02.2025
- [AI Act — art. 5](https://artificialintelligenceact.eu/article/5/), [art. 6](https://artificialintelligenceact.eu/article/6/), [art. 12](https://artificialintelligenceact.eu/article/12/), [art. 25](https://artificialintelligenceact.eu/article/25/), [art. 26](https://artificialintelligenceact.eu/article/26/), [art. 27](https://artificialintelligenceact.eu/article/27/), [art. 50](https://artificialintelligenceact.eu/article/50/), [art. 99](https://artificialintelligenceact.eu/article/99/), [załącznik III](https://artificialintelligenceact.eu/annex/3/) — tekst przepisów
- [Wytyczne Komisji w sprawie definicji systemu AI, C(2025) 5053](https://ai-act-service-desk.ec.europa.eu/sites/default/files/2025-08/commission_guidelines_on_the_definition_of_an_artificial_intelligence_system_established_by_regulation_eu_20241689_ai_actenglish_nf2skcqfrtjdfggjavcodopcwz4_112455.PDF) — pkt 7, 42 i 49
- [Lewis Silkin, wytyczne Komisji w sprawie zakazanych praktyk](https://www.lewissilkin.com/insights/2025/02/17/understanding-the-eu-ai-acts-prohibited-practices-key-workplace-and-advertising-102k011) — rozpoznawanie emocji w miejscu pracy, zmęczenie, wyjątek bezpieczeństwa
- [Ustawa z 3 lipca 2026 r. o systemach sztucznej inteligencji, Dz.U. 2026 poz. 1003 (tekst)](https://api.sejm.gov.pl/eli/acts/DU/2026/1003/text.pdf) oraz [metryka ELI](https://eli.gov.pl/eli/DU/2026/1003/ogl/pol)
- [rp.pl, Sejm przyjął ustawę o sztucznej inteligencji](https://www.rp.pl/prawo-w-polsce/art44606901-sejm-przyjal-ustawe-o-sztucznej-inteligencji-komisja-ds-ai-i-piaskownice-regulacyjne-dla-firm) — głosowanie 11.06.2026
- [CyberDefence24, koniec prac parlamentarnych](https://cyberdefence24.pl/polityka-i-prawo/polska/koniec-parlamentarnych-prac-nad-ustawa-o-sztucznej-inteligencji-czas-na-ruch-prezydenta) oraz [podpis prezydenta](https://cyberdefence24.pl/polityka-i-prawo/polska/prezydent-podpisal-ustawe-o-systemach-ai)
- [rp.pl, Polska komisja ds. AI ma ruszyć w listopadzie](https://www.rp.pl/prawo-w-polsce/art44882741-polska-komisja-ds-ai-rozpocznie-prace-w-listopadzie) — wypowiedź wiceministra Dariusza Standerskiego
- [Ministerstwo Cyfryzacji, wykaz organów ochrony praw podstawowych (art. 77 AI Act)](https://www.gov.pl/web/cyfryzacja/wykaz-organow-i-instytucji-publicznych-w-polsce-z-obszaru-ochrony-praw-podstawowych-w-rozumieniu-rozporzadzenia-20241689-akt-o-sztucznej-inteligencji)
- [UODO, Prezes UODO wskazuje na potrzebę uregulowania stosowania systemów AI w zatrudnieniu (16.07.2026)](https://uodo.gov.pl/pl/138/4493)
- [UODO, Kiedy trzeba przeprowadzić ocenę skutków dla ochrony danych?](https://uodo.gov.pl/pl/598/3617)
- [UODO, O nas — struktura urzędu](https://uodo.gov.pl/pl/p/o-nas)
- [GUS, Społeczeństwo informacyjne w Polsce w 2025 r.](https://stat.gov.pl/files/gfx/portalinformacyjny/pl/defaultaktualnosci/5497/1/19/1/spoleczenstwo_informacyjne_w_polsce_2025.pdf) — wykorzystanie AI w przedsiębiorstwach
- [Mercedes-Benz, tCMS awareness package for suppliers (luty 2026)](https://docmaster.supplier.mercedes-benz.com/DMPublic/en/doc/ALD00001630.2026-02.EN.pdf)
- [rp.pl, Sejm powołał Pamelę Krzypkowską](https://www.rp.pl/prawo-w-polsce/art45159621-sejm-powolal-pamele-krzypkowska-na-szefowa-komisji-rozwoju-i-bezpieczenstwa-ai) oraz [wnp.pl (PAP), zgoda Senatu](https://www.wnp.pl/rynki/senat-za-powolaniem-pameli-krzypkowskiej-na-szefowa-komisji-rozwoju-i-bezpieczenstwa-ai,1102315.html)
