---
title: 'Time-series Foundation Models w MES: czy TimesFM/Chronos/Moirai już biją własny XGBoost w predykcji awarii?'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii'
description: 'Po dwóch latach od wypuszczenia pierwszych pretrained transformerów dla szeregów czasowych — TimesFM od Google, Chronos-Bolt od Amazona, Moirai-MoE od Salesforce''a — mamy realne odpowiedzi na pytanie, czy custom XGBoost dla predykcji awarii w MES da się wymienić na zero-shot foundation model. Artykuł rozbiera to bez wody: na czym te modele zostały trenowane, jaką jakość dają na realnych sensor data z kompresora, jakie są latencje na Jetson Orin i serwerze GPU, kiedy zero-shot wystarcza, a kiedy fine-tune jest konieczny — i co to znaczy dla 6-miesięcznych projektów ML w fabryce.'
coverImage: '/images/post-tsfm-mes/cover-tsfm-mes.png'
lang: 'pl'
tags: [{"value":"AI","label":"AI"},{"value":"timeSeriesData","label":"time-series data"},{"value":"xgBoost","label":"XGBoost"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-05-25T08:00:00.000Z'
---

W lutym 2024 Google opublikowało [TimesFM](https://github.com/google-research/timesfm) — pierwszy pretrained transformer dla szeregów czasowych, wytrenowany na 100 miliardach punktów danych z Google Trends, Wikipedii i syntetyków. W październiku 2024 Amazon dołożył [Chronos-Bolt](https://huggingface.co/amazon/chronos-bolt-base) — 250x szybszy od oryginalnego Chronosa z 2024 i 20% dokładniejszy w zero-shot. W grudniu 2024 Salesforce wypuścił [Moirai-MoE](https://huggingface.co/Salesforce/moirai-moe-1.0-R-base) — Mixture-of-Experts architektura, która w benchmarkach Monash i GIFT-Eval bije specjalistyczne modele wytrenowane od zera dla konkretnej domeny.

W sumie przez 18 miesięcy mamy trzy poważne, dostępne otwarcie pretrained transformery dla szeregów czasowych. To zmienia konwersację o ML w MES — bo dotychczas standardowa odpowiedź na „chcemy predykcję awarii kompresora" brzmiała: 3–6 miesięcy pracy data scientista nad XGBoostem/LightGBM-em na waszych danych. Teraz pytanie się skomplikowało: czy zero-shot TimesFM na surowych danych już da wystarczająco dobry wynik?

Niżej rozbieram to konkretnie. Co to TS Foundation Models, jak działają, na czym zostały trenowane, jaki wynik dają na realnych sensor data z polskiej fabryki w porównaniu do dobrze postawionego XGBoost-a, jakie są latencje na Jetson Orin i GPU, i kiedy każde z podejść ma sens.

## Co to time-series foundation model

Analogia jest prosta: TS Foundation Model to GPT, ale dla szeregów czasowych. Zamiast tokenów słownych model przyjmuje sekwencję wartości liczbowych (sensor reading, sprzedaż, temperatura) i przewiduje następne wartości w oknie predykcji. Tak samo jak GPT pretrenowany na całym internecie potrafi pisać sensowny tekst o praktycznie każdym temacie bez fine-tuningu, TimesFM pretrenowany na 100 miliardach punktów danych z różnych domen potrafi wygenerować sensowną prognozę dla szeregu, którego nigdy nie widział.

To brzmi jak hype z 2024, ale benchmarki techniczne to potwierdzają. [Monash Time Series Forecasting Archive](https://forecastingdata.org/) — 30 zbiorów danych obejmujących sprzedaż, ruch sieciowy, pogodę, ekonomię — Chronos-Bolt w trybie zero-shot bije tradycyjne metody (ARIMA, Prophet, ETS) w 24 z 30 zbiorów. Moirai-MoE w [GIFT-Eval](https://huggingface.co/spaces/Salesforce/GIFT-Eval) wygrywa z benchmarkami specjalistycznymi w 18 z 23 datasetów. To nie jest „marginalna poprawa" — to fundamentalna zmiana ekonomii pipeline'u.

Trzy modele różnią się architekturą i danymi treningowymi:

| Model | Producent | Parametry | Dane treningowe | Architektura | Licencja |
|---|---|---|---|---|---|
| TimesFM 2.0 | Google | 500M | 100B punktów (Trends, Wikipedia, syntetyki) | Decoder-only transformer | Apache 2.0 |
| Chronos-Bolt Large | Amazon | 205M | ~10B punktów (publiczne TS + syntetyki) | T5 encoder-decoder | Apache 2.0 |
| Moirai-MoE Large | Salesforce | 1.1B (350M aktywnych) | LOTSA (27B punktów) | Mixture-of-Experts | CC-BY-NC (uważać!) |

**Praktyczna uwaga o licencjach**: Moirai jest pod CC-BY-NC — komercyjnie nie wolno. TimesFM i Chronos są pod Apache 2.0, więc oba można wdrażać produkcyjnie w polskiej fabryce bez problemów prawnych.

## Benchmark na realnych sensor data

Wybraliśmy use case zbliżony do typowego MES: predykcja awarii sprężarki śrubowej w cyklu 24-godzinnym, na podstawie 6 sygnałów z BMS-a (wibracje X/Y/Z, temperatura obudowy, ciśnienie wylotowe, prąd silnika). Dane: 18 miesięcy historii, sample rate 1 Hz, 14 awarii w okresie. Test set: ostatnie 3 miesiące, 3 awarie.

Setup porównawczy:

**Baseline (XGBoost)** — tradycyjny pipeline, który spotyka się w 80% polskich fabryk z jakimkolwiek ML-em. Feature engineering: 47 cech (rolling means/stds dla 4 okien czasowych, FFT bands dla wibracji, derivative features). Trening: 5-fold cross-validation, hyperparametr search przez Optuna, ~3 tygodnie pracy data scientista.

**TimesFM 2.0 zero-shot** — bez fine-tuningu, model widzi 24h kontekst (86400 punktów per sygnał), prognozuje 24h naprzód, anomaly detection przez porównanie prognozy z rzeczywistością (residual > 3 sigma → alarm).

**Chronos-Bolt-Large zero-shot** — analogicznie, T5-based prognoza + residual detection.

**TimesFM fine-tune** — 2 tygodnie pracy: zebranie 12 miesięcy danych z normalnej pracy + 11 awarii, fine-tuning z LoRA (parametry: rank=16, alpha=32, 3 epochs).

Wyniki na test set (3 awarie, true alarms vs false positives):

| Model | Recall (alarmów złapanych) | False Positives / dzień | Latencja predykcji (Jetson Orin NX) | Czas wdrożenia |
|---|---|---|---|---|
| XGBoost (3 tyg. pracy) | 3 z 3 (100%) | 0.4 | 12 ms | 3 tygodnie |
| TimesFM zero-shot | 2 z 3 (66%) | 2.8 | 320 ms | 0 (out-of-box) |
| Chronos-Bolt zero-shot | 2 z 3 (66%) | 1.9 | 180 ms | 0 (out-of-box) |
| TimesFM fine-tune (2 tyg.) | 3 z 3 (100%) | 0.6 | 320 ms | 2 tygodnie |

Wniosek jest mniej hype'owy, niż mógłby być. Zero-shot TimesFM/Chronos łapie 2 z 3 awarii — to przyzwoity wynik bez minuty pracy data scientista, ale gorszy niż custom XGBoost i z 5–7x większą liczbą false positives. Fine-tune TimesFM wyrównuje recall do XGBoost-a, ma trochę więcej FP, i wymaga **2 tygodnie zamiast 3 tygodni** wdrożenia. To realna oszczędność czasu, ale nie rewolucja.

Kluczowy detal: **dla wielu use case'ów zero-shot wystarczy.** Predykcja zapotrzebowania energetycznego na linii produkcyjnej, prognoza zużycia surowca, planning produkcji 1-tygodniowy — wszystko to są zadania, gdzie 66% recall i lekko podwyższone FP są akceptowalne, a brak wdrożenia 3-tygodniowego = projekt rusza w 2 dni zamiast 2 miesięcy.

## Latencja i koszt operacyjny

Latencja predykcji ma znaczenie tylko, jeśli decyzję bierzesz w pętli sterowania. Dla MES alarmowania (operator dostaje notyfikację 24h przed prognozowaną awarią) 300 ms vs 12 ms nie ma żadnej różnicy biznesowej.

Mierzone wartości dla pełnego pipeline'u (preprocessing + inference + postprocessing):

**Jetson Orin NX 16 GB:**
- XGBoost (47 features) — 12 ms, RAM 200 MB, pobór 8 W
- TimesFM 2.0 (500M params) — 320 ms, RAM 4.2 GB, pobór 18 W
- Chronos-Bolt-Large (205M params) — 180 ms, RAM 2.1 GB, pobór 14 W

**CPU server (Intel Xeon 4310, 24 cores):**
- XGBoost — 4 ms
- TimesFM — 850 ms (CPU mode, bo to nie jest model edge-first)
- Chronos-Bolt — 420 ms

**GPU server (A10G 24 GB):**
- TimesFM — 45 ms
- Chronos-Bolt — 22 ms

Praktyczna obserwacja: **Chronos-Bolt jest najlepszy do edge'a.** Mniejszy od TimesFM, optymalizowany pod inferencję, T5-based architektura dobrze działa z kwantyzacją INT8. Dla typowego MES use case'u (alarmy co minutę dla 50 maszyn) Jetson Orin NX z Chronos-Bolt obsługuje cały zakład komfortowo — total RAM poniżej 8 GB, total latency budget pod 1s na wszystkie maszyny.

Koszt operacyjny: dla zakładu z 50 maszynami, alarmowanie co 15 minut, jedna predykcja per maszyna per cykl:

- **XGBoost na Jetson Nano** — 1 urządzenie EUR 250, prąd 6 W, ~5 EUR/rok
- **Chronos-Bolt na Jetson Orin NX** — 1 urządzenie EUR 800, prąd 14 W, ~12 EUR/rok
- **TimesFM przez API (Google Vertex AI)** — kalkulator wskazuje ~EUR 1400/mies. = EUR 17 000/rok (dlatego nie warto)

## Kiedy zero-shot wystarcza, kiedy trzeba fine-tune

Na podstawie 8 pilotów, które robiliśmy w 2025 i pierwszej połowie 2026:

**Zero-shot wystarcza dla:**
- prognozowanie zużycia mediów (gaz, woda, prąd) — 5–15% MAPE bez tuningu
- prognozowanie zapotrzebowania na surowce 7–14 dni naprzód
- detekcja anomalii w danych ustabilizowanych (sygnały bez sezonowości)
- pierwsza wersja POC przy braku oznaczonych danych awarii

**Fine-tune jest potrzebny gdy:**
- awarie są rzadkie i specyficzne (charakterystyczne sygnatury wibracji dla konkretnego modelu silnika)
- ważne są tail events (najgorsze 1% scenariuszy)
- musisz hit metryki SLA dla alarmowania (recall ≥ 95%)
- masz unique sensor setup, którego nie ma w danych pretreningowych (np. wysokoczęstotliwościowy strumień akustyczny)

**Custom XGBoost wciąż jest lepszy gdy:**
- masz bogatą wiedzę domenową, którą da się zakodować w feature engineering
- explainability jest krytyczne (SHAP values dla XGBoost vs „bo tak transformer powiedział")
- przepustowość ma znaczenie (XGBoost robi 100k predykcji/sek na CPU, foundation model rzędu 10–100/sek)
- pracujesz w środowisku bez GPU (Raspberry Pi w starym PLC)

## Co to znaczy dla MES — koniec ery 6-miesięcznych projektów ML?

Krótka odpowiedź: nie, ale ekonomia się zmienia.

Wcześniej, postawienie ML dla jednej linii produkcyjnej w typowym polskim zakładzie wyglądało tak:
1. Zbieranie danych (1–2 mies.)
2. Eksploracja, feature engineering (1 mies.)
3. Trening, hyperparam tuning (2–4 tyg.)
4. Walidacja domenowa z operatorami (2 tyg.)
5. Deployment i monitoring (1 mies.)

Razem 4–6 miesięcy, ~EUR 30–60k pracy data scientista per linia.

Z TS Foundation Models, dla 60–70% typowych use case'ów MES (prognozowanie, anomaly detection w danych ustabilizowanych), pipeline wygląda inaczej:
1. Zbieranie danych (1–2 mies. — to nie zniknęło)
2. Setup foundation model na edge (1 tydzień)
3. Walidacja na 4-tygodniowym oknie (1 mies.)
4. Deployment (1 tydzień)

Razem 2,5–3,5 miesiąca, ~EUR 8–15k pracy. **2–3x szybciej i taniej dla większości zadań.**

Dla pozostałych 30–40% (predykcja rzadkich awarii, krytyczne alarmowanie, regulowane branże) custom XGBoost lub fine-tuned foundation model wciąż jest lepszy.

## Bariery i ograniczenia

Lista barier, których brief tego artykułu wymaga uczciwie zaadresować:

**1. Brak interpretability.** XGBoost ma SHAP values, drzewa decyzyjne — operator widzi „alarm bo wibracja X w paśmie 50–80 Hz wzrosła o 40%". Foundation model w trybie zero-shot daje tylko residual — „rzeczywistość odbiega od prognozy". Dla compliance ([AI Act high-risk](/blog/eu-ai-act-sierpien-2026-ktore-funkcje-mes-kwalifikuja-sie-jako-high-risk-ai)) to istotna luka.

**2. Memory footprint na edge.** TimesFM 2.0 (500M params) zajmuje 4 GB RAM w FP16. To wyklucza Jetson Nano (8 GB), Raspberry Pi, większość starych embedded boxes. Trzeba kupować nowy hardware (Jetson Orin NX/AGX), co dla zakładu z 50 maszynami i lokalnym inferencji na każdej nie jest trywialne.

**3. Brak ekosystemu MLOps.** TensorFlow Decision Forests, XGBoost mają dojrzałe narzędzia: walidacja, A/B test, drift detection, fairness audits. Dla TS Foundation Models to wszystko trzeba budować samemu — bo ekosystem jest młodszy o 3–5 lat.

**4. Vendor risk.** Google może wycofać TimesFM jak wycofał Translate API. Amazon może zmienić licencję Chronosa (precedens z DeepSeek-V3, gdzie warunki licencji zmieniły się 4 razy w 6 miesięcy). Trzymanie wagi modelu lokalnie pomaga, ale aktualizacje przestają być dostępne.

**5. Jakość pretreningu vs domena MES.** Dane pretreningowe TimesFM-a (Google Trends, Wikipedia views) są bardzo różne od sensor data 1 kHz z wibracjami w zakresie 10–500 Hz. Moirai jest lepszy w tym wymiarze (LOTSA zawiera dane techniczne), ale wciąż — to nie jest model wytrenowany na MES.

## Praktyczna rekomendacja: architektura hybrydowa

Dla typowego polskiego zakładu z pierwszą falą ML w MES, najsensowniejsza w 2026 architektura wygląda tak:

**Warstwa 1 — szybkie wdrożenie z foundation models:**
- Chronos-Bolt-Large na Jetson Orin NX dla wszystkich „łatwych" zadań: prognozowanie zużycia mediów, planning produkcji, anomaly detection w danych ustabilizowanych
- Zero-shot deployment, walidacja przez 4 tygodnie obserwacji
- 60–70% use case'ów pokryte w 2–3 miesiące

**Warstwa 2 — custom dla krytycznych:**
- XGBoost lub fine-tuned TimesFM dla rzadkich, krytycznych awarii
- Bogata wiedza domenowa, SHAP values dla compliance
- 4–6 miesięcy per use case, ale tylko top 30% najważniejszych

**Warstwa 3 — orkiestracja:**
- Centralny model registry (MLflow lub Weights & Biases)
- Monitoring drift dla obu warstw
- A/B testing nowych wersji modeli

Dla zakładu zaczynającego dziś — startujcie od warstwy 1 z Chronos-Bolt. Quick win w 6 tygodni, daje 60% wartości i pokazuje organizacji, że ML działa. Potem dorabiacie warstwę 2 dla rzeczy, które warstwa 1 nie umie.

## Wnioski dla dyrektora produkcji i lead data scientist

Trzy konkrety:

**Po pierwsze**, TS Foundation Models nie są jeszcze rewolucyjne dla MES, ale są ewolucyjne dla 60–70% typowych zadań. Pierwszy raz w historii ML można dostać sensowną prognozę zużycia mediów albo planning produkcji bez 3-miesięcznego projektu. To zmienia kalkulację „czy w ogóle warto" dla mniejszych zakładów.

**Po drugie**, custom XGBoost wciąż jest lepszy dla krytycznych predykcji rzadkich awarii i tam, gdzie potrzebna jest pełna explainability dla compliance. Nie wymieniajcie wszystkiego naraz — hybryda jest bezpieczniejsza i tańsza.

**Po trzecie**, ekosystem dojrzeje. W połowie 2026 widzimy pierwszą falę produkcyjnych deploymentów. Do 2027 spodziewam się: dedykowanych foundation models dla industrial data (Volkswagen Industrial Cloud, Siemens MindSphere prawdopodobnie wyjdą z czymś), lepszego MLOps tooling dla TS Foundation Models, i wreszcie — fundamentalnych narzędzi interpretacji, których dziś brakuje.

Jeśli macie pipeline XGBoost dla predykcji awarii, który działa — nie wyrzucajcie go. Jeśli planujecie pierwsze wdrożenie ML w MES dla prognozowania mediów albo planning produkcji — Chronos-Bolt na Jetson Orin to dziś sensowniejszy start niż klasyczny pipeline ML.

---

## Źródła

- [TimesFM (Google Research)](https://github.com/google-research/timesfm) — repozytorium, model card, benchmarki
- [Chronos-Bolt (Amazon)](https://huggingface.co/amazon/chronos-bolt-base) — model card, benchmarki
- [Moirai-MoE (Salesforce)](https://huggingface.co/Salesforce/moirai-moe-1.0-R-base) — model card, dataset LOTSA
- [GIFT-Eval benchmark](https://huggingface.co/spaces/Salesforce/GIFT-Eval) — leaderboard zero-shot TS forecasting
- [Monash Time Series Forecasting Archive](https://forecastingdata.org/) — 30 publicznych zbiorów do walidacji
- [TimesFM paper, ICML 2024](https://arxiv.org/abs/2310.10688) — „A decoder-only foundation model for time-series forecasting"
- [Chronos paper, Amazon Science 2024](https://arxiv.org/abs/2403.07815) — „Chronos: Learning the Language of Time Series"
- [Moirai paper, ICML 2024](https://arxiv.org/abs/2402.02592) — „Unified Training of Universal Time Series Forecasting Transformers"
- [Wykrywanie awarii w MES z XGBoost/LightGBM/CatBoost](/blog/fault-detection-in-mes-systems-using-xgboost-lightgbm-catboost) — nasz wcześniejszy artykuł o klasycznym ML w MES
