---
title: 'Wizualizacja danych - sukcesem analizy. Redash'
status: 'draft'
author:
  name: 'Martin Szerment'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'wizualizacja-danych-sukcesem-analizy-redash'
description: ''
coverImage: ''
lang: 'pl'
tags: [{"label":"redash","value":"redash"},{"label":"wizualziacja danych","value":"wizualziacjaDanych"},{"label":"big data","value":"bigData"},{"label":"raporty","value":"raporty"}]
publishedAt: '2024-06-15T21:02:14.000Z'
---

![](/images/image-EzOT.png)

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

![](/images/image-AzMT.png)

Po więcej informacji na temat Redash oraz jego konfiguracji i wdrażania do własnego projektu odsyłam pod adres: <https://redash.io>

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
![](/images/image-Y0OT.png)