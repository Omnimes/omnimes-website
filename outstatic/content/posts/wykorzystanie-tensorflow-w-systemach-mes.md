---
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
coverImage: '/images/tensorflow-ml-engineer-c2ND.png'
title: 'Wykorzystanie TensorFlow w systemach MES'
status: 'published'
slug: 'wykorzystanie-tensorflow-w-systemach-mes'
description: 'Porównanie algorytmów TensorFlow, XGBoost, LightGBM i CatBoost w wykrywaniu awarii w systemach MES. Praktyczne zastosowania, analiza danych czasowych i tabelarycznych oraz wydajność pod kątem szybkości i zasobów obliczeniowych.'
lang: 'pl'
tags: [{"label":"TensorFlow","value":"tensorFlow"},{"label":"XGBoost","value":"xgBoost"},{"label":"LightGBM","value":"lightGbm"},{"label":"CatBoost","value":"catBoost"},{"label":"MES system","value":"mesSystem"},{"label":"wydajność algorytmów","value":"wydajnośćAlgorytmów"}]
publishedAt: '2024-08-15T10:11:34.000Z'
---

### **Czym jest TensorFlow?**

TensorFlow to biblioteka open-source opracowana przez Google, służąca do budowy modeli głębokiego uczenia (deep learning) oraz tradycyjnych algorytmów uczenia maszynowego.

### **Zastosowanie w MES**

TensorFlow umożliwia budowę zaawansowanych modeli opartych na sieciach neuronowych do analizy dużych, złożonych zestawów danych przemysłowych.

#### **Proces implementacji:**

1. **Przygotowanie danych:**

   - Dane MES są zorganizowane w postaci strumieni czasowych (np. temperatury, wibracje, ciśnienie).
   - Dane są poddawane normalizacji i uzupełnianiu brakujących wartości.

2. **Architektura modelu:**

   - TensorFlow umożliwia budowę sieci neuronowych RNN (Recurrent Neural Networks) lub LSTM (Long Short-Term Memory) do analizy sekwencji czasowych.
   - W przypadku klasyfikacji stanów można zastosować prostą sieć MLP (Multilayer Perceptron).

3. **Trenowanie modelu:**

   - Model uczy się na podstawie danych historycznych o stanach maszyn.
   - Sieci neuronowe TensorFlow mają zdolność do automatycznego wykrywania złożonych zależności w danych.

4. **Wykrywanie i przewidywanie:**

   - Model analizuje dane wejściowe w czasie rzeczywistym i klasyfikuje aktualny stan maszyny.
   - Na podstawie analizy trendów model może również prognozować, czy wystąpi awaria.

---

## **Porównanie TensorFlow z XGBoost, LightGBM i CatBoost**

### **1. Szybkość wykonania**

- **XGBoost, LightGBM, CatBoost:**\
  Algorytmy gradient boosting są znacznie szybsze w trenowaniu i predykcji niż TensorFlow. Działają efektywnie nawet na maszynach o ograniczonej mocy obliczeniowej.
  - **Czas trenowania:** Krótszy (rzędu minut lub godzin dla średnich zbiorów danych).
  - **Czas predykcji:** Bardzo szybki (rzędu milisekund).
- **TensorFlow:**\
  TensorFlow wymaga większej mocy obliczeniowej, szczególnie w przypadku sieci głębokiego uczenia, takich jak LSTM.
  - **Czas trenowania:** Zależny od dostępnych zasobów – na GPU lub TPU czas może wynosić godziny lub dni.
  - **Czas predykcji:** Wolniejszy niż algorytmy boostingowe, zwłaszcza dla dużych modeli.

### **2. Zużycie zasobów**

- **XGBoost, LightGBM, CatBoost:**

  - Wymagają mniej pamięci i mocy obliczeniowej.
  - Dobrze działają na CPU, co czyni je bardziej wydajnymi na standardowych serwerach.

- **TensorFlow:**

  - Wymaga większej mocy obliczeniowej (GPU lub TPU) oraz większej ilości pamięci RAM.
  - Jest bardziej zasobożerny, szczególnie w zastosowaniach z dużymi sieciami neuronowymi.

### **3. Dokładność**

- **XGBoost, LightGBM, CatBoost:**

  - Bardzo dobra dokładność w klasyfikacji stanów na danych tabelarycznych.
  - Nieco mniej efektywne w analizie sekwencji czasowych.

- **TensorFlow:**

  - Lepszy w analizie skomplikowanych danych, takich jak dane czasowe lub dane wielowymiarowe.
  - Wysoka dokładność w wykrywaniu nieliniowych zależności, ale wymaga starannej optymalizacji.

### **4. Elastyczność**

- **XGBoost, LightGBM, CatBoost:**

  - Łatwiejsze w implementacji.
  - Sprawdzają się w przypadku danych tabelarycznych.

- **TensorFlow:**

  - Większa elastyczność i możliwość budowy zaawansowanych modeli.
  - Idealny do analizy sekwencji czasowych, obrazów i danych wielowymiarowych.

---

## **Kiedy wybrać TensorFlow?**

- **Analiza danych czasowych:** W przypadku strumieni czasowych, takich jak temperatura, ciśnienie czy wibracje, TensorFlow (np. modele LSTM) przewyższa algorytmy gradient boosting.
- **Kompleksowe zależności:** Jeśli dane mają skomplikowaną strukturę, TensorFlow lepiej poradzi sobie z ich modelowaniem.

## **Kiedy wybrać XGBoost, LightGBM lub CatBoost?**

- **Dane tabelaryczne:** Algorytmy gradient boosting są wydajniejsze i łatwiejsze w implementacji przy danych tabelarycznych, takich jak historia zdarzeń awarii.
- **Ograniczone zasoby obliczeniowe:** Jeśli nie masz dostępu do GPU lub chcesz szybkie wyniki, boosting jest lepszym wyborem.

---

## **Podsumowanie**

### **Wydajność i zasoby:**

- Jeśli zależy Ci na szybkości i niskim zużyciu zasobów, lepszym wyborem będą algorytmy gradient boosting (XGBoost, LightGBM, CatBoost).
- W przypadku analizy złożonych zależności, szczególnie w danych czasowych, TensorFlow może być bardziej efektywny.

### **Rekomendacje:**

- Wybierz **XGBoost, LightGBM lub CatBoost**, jeśli:

  - Twoje dane są tabelaryczne.
  - Zależy Ci na szybkiej predykcji i prostocie wdrożenia.

- Wybierz **TensorFlow**, jeśli:

  - Analizujesz dane czasowe lub wielowymiarowe.
  - Masz dostęp do zasobów GPU/TPU i zależy Ci na dokładności.

Oba podejścia mają swoje zastosowania i mogą być również stosowane hybrydowo, gdzie TensorFlow analizuje dane czasowe, a algorytmy boostingowe obsługują klasyfikację w danych tabelarycznych.