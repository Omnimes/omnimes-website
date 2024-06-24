---
title: 'Wizualizacja danych - sukcesem analizy. Redash'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'wizualizacja-danych-sukcesem-analizy-redash'
description: 'Wizualizacja danych - sukcesem analizy. Redash'
coverImage: ''
lang: 'pl'
tags: [{"label":"redash","value":"redash"},{"label":"wizualziacja danych","value":"wizualziacjaDanych"},{"label":"big data","value":"bigData"},{"label":"raporty","value":"raporty"}]
publishedAt: '2024-06-15T21:02:14.000Z'
---

![](/images/image-U2ND.png)

## Wstępem

W dzisiejszych czasach dynamiczny rozwój technologii i rosnące wymagania rynkowe sprawiają, że efektywne zarządzanie produkcją jest kluczowe dla sukcesu firm. Systemy takie jak Omnimes oferują zaawansowane narzędzia do optymalizacji procesów, w tym wizualizację danych, która wspomaga analizę i podejmowanie decyzji.

Wizualizacja danych przekształca surowe dane w wartościowe informacje, łatwe do interpretacji na różnych poziomach organizacji. Dzięki narzędziom takim jak REdash, użytkownicy Omnimes mogą tworzyć interaktywne dashboardy prezentujące kluczowe wskaźniki wydajności (KPI), monitorować postęp produkcji i identyfikować obszary do poprawy.

W artykule omówimy, jak integracja Omnimes z Redash wspiera produkcję poprzez efektywną wizualizację danych. Przedstawimy konkretne przykłady zastosowań, pokazujące korzyści takie jak optymalizacja produkcji, lepsza komunikacja w zespole, szybsze reagowanie na problemy i bardziej świadome podejmowanie decyzji.

## Czym jest Redash

W dynamicznie rozwijającej się technologii, efektywne zarządzanie produkcją jest kluczowe. System Omnimes, zintegrowany z platformą REdash, oferuje zaawansowane narzędzia do optymalizacji procesów, w tym wizualizację danych, która wspomaga analizę i podejmowanie decyzji.

REdash to samoobsługowa platforma open source do tworzenia zapytań i wizualizacji danych. Szybka w konfiguracji, współpracuje z wieloma źródłami danych jak Redshift, Google BigQuery, MongoDB, Google Sheets, PostgreSQL, MySQL i ElasticSearch.

### Główne cechy Redash:

- **Przeglądarka i API REST**: działa w pełni w przeglądarce, z udostępnianymi URL i dobrze zdefiniowanym interfejsem API.
- **Edytor zapytań**: tworzenie zapytań SQL i NoSQL z przeglądarką schematów i autouzupełnianiem. Możliwość tworzenia i ponownego użycia fragmentów w celu przedstawienia danych na wykresach.
- **Wizualizacja i dashboardy**: Tworzenie wizualizacji metodą przeciągnij i upuść. Grupowanie wizualizacji w pulpity nawigacyjne, automatycznie aktualizowane.
- **Alerty**: Definiowanie warunków wyzwalania i natychmiastowe powiadomienia w przypadku zmiany danych, np. przekroczenia ustalonego ciśnienia lub temperatury.

Platforma Redash wspiera różnorodne produkty, co czyni ją wszechstronnym narzędziem do wizualizacji danych w systemie Omnimes.

![Firmy korzytające z Redash](/images/image-AzMT.png)

Po więcej informacji na temat Redash oraz jego konfiguracji i wdrażania do własnego projektu odsyłam pod adres: [redash.io](https://redash.io)

Po tym krótkim opisie narzędzia Redash przedstawię nowe możliwości w systemie Omnimes po jego zaimplementowaniu.

## Redash w Omnimes

Po uruchomieniu Redash mamy do wykonania trzy kroki, aby stworzyć dashboard z danymi, mianowicie:

- stworzenie zapytanie - czyli pobranie danych z bazy danych
- na podstawie pobranych danych, stworzenie wykresu
- umieszczenie wykresu na dashbordzie

Warto zwrócić uwagę na dwie praktyczne możliwości takiego dashboardu:

1. **Udostępnianie bez potrzeby tworzenia konta**: Taki dashboard można udostępnić każdemu bez konieczności tworzenia konta użytkownika w systemie Omnimes. Przykładowo, może być używany do podglądu na hali produkcyjnej przez kierowników zarządzania ruchem lub osoby na wyższych szczeblach, a także w celu mobilizacji pracowników.

2. **Częste odświeżanie danych**: Udostępniony dashboard można ustawić na minimalny czas odświeżania co minutę, co pozwala na ciągłe, aktualne podsumowanie tego, co dzieje się na parku maszynowym.

Dla ułatwienia, w systemie Omnimes wprowadziliśmy własny edytor tworzenia zapytań, jak pokazano poniżej:\
\
![Edytor zapytań do REdash w Omnimes](/images/image-U4OT.png)

Po stworzeniu interesujących nas zapytań przechodzimy do do samego Redash do listy z utworzonymi zapytaniami o dane.

![Lista zapytań w Redash](/images/image-UyNT.png)

Następnie wchodzimy w dane zapytanie i je edytujemy oraz jeśli jesteśmy prawidłowo podłączeni do źródła danych otrzymujemy wyniki:\
![Edycja zapytania w Redash](/images/image-k1OT.png)

Następnie przechodzimy do zakładki "Chart", gdzie tworzymy wizualizacje, określając sposób przedstawienia danych. Możliwości jest wiele, zarówno pod względem typów wykresów, jak i sposobów ich prezentacji. Poniżej znajduje się przykład wykresu typu "bar", który zestawia maszyny pod kątem występowania najczęstszych błędów.

![Wykres danych w Redash](/images/image-Y2MT.png)

Po stworzeniu interesujących nas wykresów z danymi, przechodzimy do zakładki "Dashboard", gdzie decydujemy, które z wykresów mają się na nim znaleźć.

![Dodanie wykresu na dshboard w Redash](/images/image-c4MD.png)

W tym miejscu możemy włączyć publiczne udostępnianie dashboardu oraz ustawić, co jaki czas dane mają się odświeżać.\
\
W systemie Omnimes mamy możliwość zdecydowania, który z dashboardów ma znaleźć się na stronie głównej systemu. Nie ogranicza to tworzenia kolejnych dashboardów, które można udostępniać innym działom lub osobom.

![Lista dashbordow w Omnimes](/images/image-MxND.png)

W rezultacie otrzymujemy gotowy dashboard jak poniżej:\
\
![Gotowy dashboard w Omnimes](/images/image-A4NT.png)

Tak przygotowane dane możemy wykorzystać dalej jak do chociażby do analizy poprzez AI - tak jak to się dzieje w przypadku systemu Omnimes.

![Wykorzystania danych z Redash w anlizie AI](/images/image-Q1MT.png)

I uzyskać pełne podsumowanie jak np. to:

![Wynik analizy AI](/images/image-k3Mj.png)

## Podsumowanie

W dynamicznie rozwijającym się świecie technologii, efektywne zarządzanie produkcją jest kluczowe dla sukcesu firm. Systemy takie jak **Omnimes**, zintegrowane z narzędziami do wizualizacji danych, takimi jak **Redash**, oferują zaawansowane możliwości optymalizacji procesów produkcyjnych.

Redash to wszechstronna platforma open source do tworzenia zapytań i wizualizacji danych, współpracująca z wieloma źródłami danych, jak Redshift, Google BigQuery czy PostgreSQL.

**Integracja Redash z Omnimes** pozwala na tworzenie interaktywnych dashboardów, które można udostępniać publicznie bez potrzeby tworzenia konta, oraz ustawiać częste odświeżanie danych, co zapewnia aktualne informacje na temat produkcji. W systemie **Omnimes** użytkownicy mogą także decydować, które dashboardy mają być widoczne na stronie głównej, oraz tworzyć dodatkowe dashboardy do użytku wewnętrznego.

**Przedstawione przykłady pokazują, jak takie narzędzia mogą wspierać efektywne zarządzanie produkcją, lepszą komunikację w zespole oraz szybsze reagowanie na problemy**.

Dzięki temu firmy mogą podejmować bardziej świadome decyzje, optymalizować procesy produkcyjne i poprawiać jakość swoich produktów.

W rezultacie, **zastosowanie Redash w systemie Omnimes** prowadzi do stworzenia zaawansowanych dashboardów, **które można wykorzystać do dalszej analizy danych, na przykład z użyciem sztucznej inteligencji**, co umożliwia uzyskanie pełnego podsumowania i lepsze zarządzanie produkcją.