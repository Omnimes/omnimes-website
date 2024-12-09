---
title: 'Zbieranie danych z rzeczywistych maszyn przemysłowych: Metody i narzędzia'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'zbieranie-danych-z-rzeczywistych-maszyn-przemyslowych-metody-i-narzedzia'
description: 'Zbieranie danych z maszyn przemysłowych – omówienie dwóch podejść: wdrożenia systemu MES, takiego jak OMNIMES firmy Multiprojekt, oraz wykorzystania publicznych danych z platform takich jak Statista i Kaggle. Praktyczne rozwiązania dla budowy modeli predykcji awarii'
coverImage: '/images/data-QzNj.png'
lang: 'pl'
tags: [{"label":"zbieranie danych przemysłowych","value":"zbieranieDanychPrzemysłowych"},{"label":"dane z maszyn","value":"daneZMaszyn"},{"label":"uczenie maszynowe w przemyśle","value":"uczenieMaszynoweWPrzemyśle"}]
publishedAt: '2024-09-15T10:29:21.000Z'
---

### **Wstęp**

Efektywne zarządzanie danymi z maszyn przemysłowych jest kluczowe dla predykcji awarii i optymalizacji procesów. W artykule omówimy dwa podejścia:

1. **Brak istniejących danych z maszyn**, gdy chcemy zbudować modele predykcji awarii.
2. **Wykorzystanie istniejących baz danych**, takich jak Statista czy Kaggle, które oferują rzeczywiste dane przemysłowe.

---

## **1. Brak danych z maszyn: Jak zacząć zbierać dane?**

### **System OMNIMES firmy Multiprojekt**

Jeśli w zakładzie nie ma jeszcze systemu zbierania danych, dobrym rozwiązaniem jest implementacja systemu MES (Manufacturing Execution System), takiego jak **OMNIMES** firmy Multiprojekt.

#### **Czym jest OMNIMES?**

- **OMNIMES** to zaawansowany system MES umożliwiający zbieranie, analizę i wizualizację danych z maszyn przemysłowych.
- System ten pozwala na monitorowanie parametrów produkcji, takich jak czasy cykli, liczba wyprodukowanych jednostek czy stany awarii maszyn.
- Dane z OMNIMES mogą być wykorzystywane do budowy modeli predykcyjnych, takich jak:
  - Przewidywanie awarii maszyn.
  - Optymalizacja harmonogramów konserwacji.

#### **Kluczowe funkcje OMNIMES:**

1. **Zbieranie danych w czasie rzeczywistym:** System zbiera dane bezpośrednio z maszyn, które są wyposażone w odpowiednie sterowniki PLC.
2. **Analiza wydajności:** OMNIMES umożliwia obliczanie wskaźników KPI, takich jak OEE (Overall Equipment Effectiveness).
3. **Integracja z istniejącymi systemami:** Możliwość integracji z ERP i SCADA.

Więcej informacji można znaleźć na stronie: [OMNIMES – Multiprojekt](https://www.omnimes.com/pl).

---

### **2. Wykorzystanie danych z publicznych źródeł**

Jeśli zakład przemysłowy nie posiada własnych danych, istnieje możliwość wykorzystania publicznie dostępnych baz danych. Oto dwa popularne źródła:

#### **a) Statista**

Statista to globalna platforma danych, oferująca informacje na temat różnych branż przemysłowych. W kontekście predykcji awarii można znaleźć:

- Raporty dotyczące wskaźników awaryjności maszyn.
- Analizy dotyczące efektywności produkcji w różnych branżach.
- Dane statystyczne dotyczące konserwacji maszyn i przestojów.

**Przykład zastosowania:** Dane z raportów Statista mogą być używane do zbudowania podstawowych modeli predykcyjnych opartych na statystykach branżowych.

#### **b) Kaggle**

Kaggle to platforma udostępniająca darmowe zestawy danych oraz narzędzia do analizy danych i uczenia maszynowego. Można znaleźć:

- Dane zebrane z rzeczywistych urządzeń przemysłowych.
- Zestawy danych dotyczące drgań, temperatury czy zużycia energii.
- Gotowe modele i skrypty do analizy predykcyjnej.

**Przykład zastosowania:** Na Kaggle dostępne są dane czasowe z rzeczywistych maszyn, które można wykorzystać do budowy modeli predykcji awarii za pomocą algorytmów takich jak LSTM, XGBoost czy TensorFlow.

---

## **Porównanie dwóch podejść**

| **Kryterium** | **Implementacja systemu (OMNIMES)** | **Dane publiczne (Statista/Kaggle)** |
| --- | --- | --- |
| **Koszt** | Średni (wdrożenie systemu) | Niski (dostęp do danych często darmowy) |
| **Dostosowanie do zakładu** | Idealne, dane z własnych maszyn | Ograniczone, dane ogólne |
| **Precyzja modeli** | Bardzo wysoka | Zależy od jakości danych |
| **Czas wdrożenia** | Śrdeni do miesiącu czasu (wdrożenie systemu MES) | Krótki (gotowe dane dostępne od razu) |
| **Dostępność danych historycznych** | Dostępne od razu bez konfiguracji po stronie systemu Omnimes - wystarczy sama instalacja systemu, po czym należy uruchomić wysyłanie w panelu HMI lub sterowniku na broker MQTT systemu Omnimes, jeśli nie ma takiej możliwości zintegrować czujniki lub sterowniki z bramką Weintek cmgt01 która będzie wysyłać dane z urządzeń na broker systemu Omnimes | Zwykle dostępne |

---

## **Podsumowanie**

1. **Brak danych:** Jeśli w zakładzie nie ma systemu zbierania danych, warto rozważyć wdrożenie rozwiązania takiego jak **OMNIMES** firmy Multiprojekt. System pozwala na zbieranie danych w czasie rzeczywistym i ich analizę, co ułatwia budowę precyzyjnych modeli predykcji awarii.

2. **Publiczne dane:** Dla szybkiego prototypowania modeli można skorzystać z platform takich jak **Statista** czy **Kaggle**, które oferują gotowe zestawy danych przemysłowych.

Optymalne podejście zależy od budżetu, dostępnych zasobów i czasu. Długoterminowo wdrożenie systemu MES, takiego jak OMNIMES, zapewni dokładniejsze dane i większe korzyści dla zakładu produkcyjnego.

4o