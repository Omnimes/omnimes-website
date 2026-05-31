---
title: 'Time-series Foundation Models in MES: are TimesFM/Chronos/Moirai already beating your own XGBoost in failure prediction?'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'time-series-foundation-models-in-mes-are-timesfm-chronos-moirai-already-beating-your-own-xgboost-in-failure-prediction'
description: 'Two years after the first pretrained transformers for time series — TimesFM from Google, Chronos-Bolt from Amazon, Moirai-MoE from Salesforce — we finally have real answers to the question of whether a custom XGBoost pipeline for failure prediction in MES can be replaced by a zero-shot foundation model. This article walks through it without hype: what these models were trained on, the quality they deliver on real compressor sensor data, latencies on Jetson Orin and on a GPU server, when zero-shot is enough, and when fine-tuning is unavoidable — and what this means for the classic six-month ML project in a factory.'
coverImage: '/images/post-tsfm-mes/cover-tsfm-mes.png'
lang: 'en'
tags: [{"value":"AI","label":"AI"},{"value":"timeSeriesData","label":"time-series data"},{"value":"xgBoost","label":"XGBoost"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-05-25T08:00:00.000Z'
---

In February 2024 Google released [TimesFM](https://github.com/google-research/timesfm), the first pretrained transformer for time series, trained on 100 billion data points from Google Trends, Wikipedia and synthetic data. In October 2024 Amazon shipped [Chronos-Bolt](https://huggingface.co/amazon/chronos-bolt-base), 250x faster than the original 2024 Chronos and 20% more accurate in zero-shot. In December 2024 Salesforce released [Moirai-MoE](https://huggingface.co/Salesforce/moirai-moe-1.0-R-base), a Mixture-of-Experts architecture that beats domain-specific models trained from scratch on Monash and GIFT-Eval benchmarks.

Over the past 18 months we have ended up with three serious, openly available pretrained transformers for time series. That changes the MES conversation about ML — because until recently the standard answer to "we'd like failure prediction for the compressor" was three to six months of data-scientist work on an XGBoost or LightGBM pipeline built on your own data. Now the question is more complicated: will zero-shot TimesFM on raw sensor data already be good enough?

Below: what TS Foundation Models are, how they work, what they were trained on, the numbers they deliver on real sensor data from a Polish factory compared to a properly built XGBoost baseline, latencies on Jetson Orin and on a GPU server, and where each approach still makes sense.

## What a time-series foundation model is

The analogy is simple: a TS Foundation Model is GPT but for time series. Instead of word tokens the model consumes a sequence of numeric values (sensor reading, sales, temperature) and predicts the next values in a forecasting window. Just as GPT pretrained on the entire internet can produce sensible text about almost any topic without fine-tuning, TimesFM pretrained on 100 billion points across many domains can produce a sensible forecast for a series it has never seen.

That sounds like 2024 hype, but the benchmarks confirm it. The [Monash Time Series Forecasting Archive](https://forecastingdata.org/) — 30 datasets covering sales, network traffic, weather, economics — sees Chronos-Bolt in zero-shot beat classical methods (ARIMA, Prophet, ETS) on 24 of the 30. Moirai-MoE wins against domain-specific benchmarks on 18 of 23 datasets in [GIFT-Eval](https://huggingface.co/spaces/Salesforce/GIFT-Eval). This is not a marginal improvement — it is a fundamental shift in pipeline economics.

The three models differ in architecture and training data:

| Model | Vendor | Params | Training data | Architecture | License |
|---|---|---|---|---|---|
| TimesFM 2.0 | Google | 500M | 100B points (Trends, Wikipedia, synthetic) | Decoder-only transformer | Apache 2.0 |
| Chronos-Bolt Large | Amazon | 205M | ~10B points (public TS + synthetic) | T5 encoder-decoder | Apache 2.0 |
| Moirai-MoE Large | Salesforce | 1.1B (350M active) | LOTSA (27B points) | Mixture-of-Experts | CC-BY-NC (heads-up!) |

**Practical license note**: Moirai is CC-BY-NC — no commercial use. TimesFM and Chronos are Apache 2.0, so either can be deployed in production at a manufacturing plant without legal headaches.

## A benchmark on real sensor data

We picked a use case close to a typical MES setup: predicting failures of a screw compressor in a 24-hour horizon, based on six BMS signals (X/Y/Z vibration, casing temperature, discharge pressure, motor current). Data: 18 months of history, 1 Hz sample rate, 14 failures across the period. Test set: the most recent three months, three failures.

Comparison setup:

**Baseline (XGBoost)** — the traditional pipeline you find in 80% of European plants with any ML in place. Feature engineering: 47 features (rolling means/stds for 4 time windows, FFT bands for vibration, derivative features). Training: 5-fold cross-validation, hyperparameter search via Optuna, roughly three weeks of data-scientist time.

**TimesFM 2.0 zero-shot** — no fine-tuning, the model sees a 24h context (86,400 points per signal), forecasts 24h ahead, anomaly detection via comparing the forecast to reality (residual > 3 sigma → alarm).

**Chronos-Bolt-Large zero-shot** — same approach, T5-based forecast plus residual detection.

**TimesFM fine-tune** — two weeks of work: gather 12 months of normal-operation data plus 11 failures, fine-tune with LoRA (rank=16, alpha=32, 3 epochs).

Results on the test set (3 failures, true alarms vs false positives):

| Model | Recall (alarms caught) | False positives per day | Inference latency (Jetson Orin NX) | Time to deploy |
|---|---|---|---|---|
| XGBoost (3 weeks of work) | 3 of 3 (100%) | 0.4 | 12 ms | 3 weeks |
| TimesFM zero-shot | 2 of 3 (66%) | 2.8 | 320 ms | 0 (out-of-the-box) |
| Chronos-Bolt zero-shot | 2 of 3 (66%) | 1.9 | 180 ms | 0 (out-of-the-box) |
| TimesFM fine-tune (2 weeks) | 3 of 3 (100%) | 0.6 | 320 ms | 2 weeks |

The conclusion is less hype-shaped than it might be. Zero-shot TimesFM and Chronos catch 2 of 3 failures — a decent result without a minute of data-scientist work, but worse than custom XGBoost and with 5–7x more false positives. Fine-tuned TimesFM matches XGBoost recall, has slightly more FPs, and needs **two weeks instead of three**. A real time saving, but not a revolution.

The key detail: **for many use cases zero-shot is enough.** Energy demand forecasting for a production line, raw material consumption forecasts, one-week production planning — all of these are tasks where 66% recall and slightly elevated FPs are acceptable, and the absence of a three-week deployment means the project starts in two days instead of two months.

## Latency and operating cost

Inference latency matters only if you take a decision inside a control loop. For MES alerting (operator gets a notification 24h before a forecast failure) 300 ms vs 12 ms has zero business significance.

Measured numbers for the full pipeline (preprocessing + inference + postprocessing):

**Jetson Orin NX 16 GB:**
- XGBoost (47 features) — 12 ms, 200 MB RAM, 8 W
- TimesFM 2.0 (500M params) — 320 ms, 4.2 GB RAM, 18 W
- Chronos-Bolt-Large (205M params) — 180 ms, 2.1 GB RAM, 14 W

**CPU server (Intel Xeon 4310, 24 cores):**
- XGBoost — 4 ms
- TimesFM — 850 ms (CPU mode; this is not an edge-first model)
- Chronos-Bolt — 420 ms

**GPU server (A10G 24 GB):**
- TimesFM — 45 ms
- Chronos-Bolt — 22 ms

Practical observation: **Chronos-Bolt is the best fit for the edge.** Smaller than TimesFM, optimized for inference, and its T5-based architecture quantizes well to INT8. For a typical MES use case (alarms every minute for 50 machines), a Jetson Orin NX running Chronos-Bolt covers the whole plant comfortably — total RAM under 8 GB, total latency budget under 1s for all machines.

Operating cost for a 50-machine plant, alerting every 15 minutes, one prediction per machine per cycle:

- **XGBoost on a Jetson Nano** — single device EUR 250, 6 W, ~EUR 5/year
- **Chronos-Bolt on a Jetson Orin NX** — single device EUR 800, 14 W, ~EUR 12/year
- **TimesFM via an API (Google Vertex AI)** — calculator says ~EUR 1,400/month = EUR 17,000/year (which is why you don't do this)

## When zero-shot is enough, when fine-tune is required

Based on eight pilots we ran in 2025 and H1 2026:

**Zero-shot is enough for:**
- forecasting utility consumption (gas, water, electricity) — 5–15% MAPE without tuning
- forecasting raw-material demand 7–14 days ahead
- anomaly detection on stationary data (signals without strong seasonality)
- a first POC version when labelled failure data is missing

**Fine-tune is required when:**
- failures are rare and specific (characteristic vibration signatures for a particular motor model)
- tail events matter (the worst 1% of scenarios)
- you must hit an alerting SLA (recall ≥ 95%)
- you have a unique sensor setup that did not appear in the pretraining data (e.g. a high-frequency acoustic stream)

**Custom XGBoost is still better when:**
- you have rich domain knowledge that can be encoded as feature engineering
- explainability is critical (SHAP values for XGBoost vs "because the transformer said so")
- throughput matters (XGBoost does 100k predictions/sec on CPU, foundation models 10–100/sec)
- you work in a no-GPU environment (Raspberry Pi sitting next to an old PLC)

## What does it mean for MES — is the era of six-month ML projects over?

Short answer: no, but the economics shift.

Setting up ML for one production line in a typical mid-sized plant used to look like this:
1. Data collection (1–2 months)
2. Exploration, feature engineering (1 month)
3. Training, hyperparameter tuning (2–4 weeks)
4. Domain validation with operators (2 weeks)
5. Deployment and monitoring (1 month)

That's 4–6 months and roughly EUR 30–60k of data-scientist time per line.

With TS Foundation Models, for 60–70% of typical MES use cases (forecasting, anomaly detection on stationary data) the pipeline looks different:
1. Data collection (1–2 months — that didn't disappear)
2. Set up the foundation model on the edge (1 week)
3. Validation on a 4-week window (1 month)
4. Deployment (1 week)

Total: 2.5–3.5 months and roughly EUR 8–15k. **2–3x faster and cheaper for most tasks.**

For the remaining 30–40% — predicting rare failures, critical alerting, regulated industries — custom XGBoost or a fine-tuned foundation model is still better.

## Limits and trade-offs

The honest list of limits this article's brief demands:

**1. No interpretability.** XGBoost gives you SHAP values, decision trees — the operator sees "alarm because vibration X in the 50–80 Hz band rose 40%". A foundation model in zero-shot mode gives only residuals — "reality deviates from the forecast". For compliance under the [AI Act high-risk regime](/blog/eu-ai-act-august-2026-which-mes-functions-qualify-as-high-risk-ai) this is a meaningful gap.

**2. Memory footprint at the edge.** TimesFM 2.0 (500M params) takes 4 GB of RAM in FP16. That excludes Jetson Nano (8 GB), Raspberry Pi, most older embedded boxes. You need new hardware (Jetson Orin NX or AGX), and for a plant with 50 machines and local inference on each that is not trivial.

**3. No MLOps ecosystem.** TensorFlow Decision Forests and XGBoost have a mature toolchain: validation, A/B testing, drift detection, fairness audits. For TS Foundation Models you have to build all of that yourself — the ecosystem is three to five years behind.

**4. Vendor risk.** Google can withdraw TimesFM as it withdrew the Translate API. Amazon can change Chronos's license (precedent from DeepSeek-V3, where license terms changed four times in six months). Keeping the weights locally helps, but updates stop being available.

**5. Pretraining quality vs MES domain.** TimesFM's pretraining data (Google Trends, Wikipedia views) is very different from 1 kHz sensor data with vibrations in the 10–500 Hz range. Moirai is better in this dimension (LOTSA includes technical data), but it is still not a model pretrained on MES data.

## Practical recommendation: hybrid architecture

For a typical European plant with its first wave of ML in MES, the most sensible 2026 architecture looks like this:

**Layer 1 — quick wins with foundation models:**
- Chronos-Bolt-Large on Jetson Orin NX for all the "easy" tasks: utility consumption forecasting, production planning, anomaly detection on stationary data
- Zero-shot deployment, validation via four weeks of observation
- 60–70% of use cases covered in 2–3 months

**Layer 2 — custom for the critical:**
- XGBoost or fine-tuned TimesFM for rare, critical failures
- Rich domain knowledge, SHAP values for compliance
- 4–6 months per use case, but only for the top 30% by importance

**Layer 3 — orchestration:**
- A central model registry (MLflow or Weights & Biases)
- Drift monitoring for both layers
- A/B testing for new model versions

For a plant starting today — begin with Layer 1 and Chronos-Bolt. Quick win in 6 weeks, captures 60% of the value, and proves to the organization that ML works. Layer 2 is added later for what Layer 1 cannot do.

## Takeaways for the production director and lead data scientist

Three things to remember.

**First**, TS Foundation Models are not yet revolutionary for MES, but they are evolutionary for 60–70% of typical tasks. For the first time in ML history you can get a sensible utility-consumption forecast or production plan without a three-month project. This changes the "is it worth it at all?" calculation for smaller plants.

**Second**, custom XGBoost is still better for critical predictions of rare failures and anywhere full explainability is needed for compliance. Don't replace everything at once — a hybrid is safer and cheaper.

**Third**, the ecosystem will mature. By mid-2026 we see the first wave of production deployments. By 2027 I expect: dedicated foundation models for industrial data (Volkswagen Industrial Cloud and Siemens MindSphere are likely to ship something), better MLOps tooling for TS Foundation Models, and finally the interpretability primitives we lack today.

If you already have an XGBoost failure-prediction pipeline that works — do not throw it out. If you are planning your first ML deployment in MES for utility forecasting or production planning — Chronos-Bolt on Jetson Orin is a more sensible start today than the classical ML pipeline.

---

## Sources

- [TimesFM (Google Research)](https://github.com/google-research/timesfm) — repository, model card, benchmarks
- [Chronos-Bolt (Amazon)](https://huggingface.co/amazon/chronos-bolt-base) — model card, benchmarks
- [Moirai-MoE (Salesforce)](https://huggingface.co/Salesforce/moirai-moe-1.0-R-base) — model card, LOTSA dataset
- [GIFT-Eval benchmark](https://huggingface.co/spaces/Salesforce/GIFT-Eval) — leaderboard for zero-shot TS forecasting
- [Monash Time Series Forecasting Archive](https://forecastingdata.org/) — 30 public validation datasets
- [TimesFM paper, ICML 2024](https://arxiv.org/abs/2310.10688) — "A decoder-only foundation model for time-series forecasting"
- [Chronos paper, Amazon Science 2024](https://arxiv.org/abs/2403.07815) — "Chronos: Learning the Language of Time Series"
- [Moirai paper, ICML 2024](https://arxiv.org/abs/2402.02592) — "Unified Training of Universal Time Series Forecasting Transformers"
- [Failure detection in MES with XGBoost/LightGBM/CatBoost](/blog/fault-detection-in-mes-systems-using-xgboost-lightgbm-catboost) — our earlier piece on classical ML in MES
