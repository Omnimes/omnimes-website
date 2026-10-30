---
title: 'Basal in the factory: a Polish decision model that makes downtime calls on-site'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'basal-in-the-factory-a-polish-decision-model-that-makes-downtime-calls-on-site'
description: 'Remigiusz Kinas''s Basal is a family of open-weight typed-decision models for Polish and English that run on your own server. Using a downtime event in OmniMES, we walk through the request, the cost matrix, deferral to a human and an honest comparison with Jev.'
coverImage: '/images/post-basal-decyzje/cover-basal-decyzje-en.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"AI","label":"AI"},{"value":"aiLocal","label":"AI local"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-10-19T08:00:00.000Z'
---

In September we wrote about Jev, a model that returns a decision with a probability instead of text. In many plants one fact ends that conversation: Jev is a hosted service in its maker's cloud, while an MES often runs on a plant network without cloud access and operator notes must stay on site (basal.si5.pl, Who uses basal, 2026).

On 29 September, six days after that post, Remigiusz Kinas announced basal-1.0 (Kinas, X, 2026). Basal follows the same idea, but its weights and engine are open under Apache-2.0 and its text models are built on Bielik, a Polish base model. Below we check the author's numbers and walk through one OmniMES downtime decision made on site.

## What Basal is

Basal is an inference engine and a family of "typed-decision" models for Polish and English, explicitly inspired by System 1 models such as Jev (GitHub basal, 2026). The model reads a state (a message, document or JSON record) and returns a probability for every permitted answer in one forward pass, without generating text, so the answer cannot fall outside your options.

Within three weeks came basal-1.0 in September 2026, basal-1.5 on 4 October, basal-2.0 with the experimental basal-omni line on 12 October, and engine 2.2, with custom calibration, on 19 October (basal.si5.pl, 2026).

### Question types

- `choice`: one of 2–255 options described in plain words;
- `noul`: the probability that a statement is true;
- `score`: a distribution over an ordered scale plus the expected level;
- `multi`: an independent probability for every label;
- `act`: the action with the lowest expected cost under your cost matrix;
- `tool`: an agent's next step, from OpenAI or MCP tool definitions.

`act` and `tool` are marked experimental, below production quality (GitHub basal, FEATURES, 2026).

SOAM ("state once, ask many") processes the state once for all questions in a request. `max_error` on an `act` or `tool` question sets a target error such as 0.05; below the threshold certified for it, the engine refuses the automatic action and returns `"deferred": true`.

### The model family

| Model | Parameters | Base model | Author's notes |
|---|---|---|---|
| basal-2.0-mini | 1.5B | Bielik v3 | high volume, laptops; 8,192-token context |
| basal-2.0 | 4.5B | Bielik v3 | main model; 32,768-token context |
| basal-2.0-max | 11B | Bielik v3 | most accurate text model |
| basal-omni-1.0-mini | 4B | Gemma 4 | text, images, audio; about 16 GB of GPU memory |
| basal-omni-1.0-max | 12B | Gemma 4 | text, images, audio; about 24 GB of GPU memory |
| basal-omni-1.0-ultra | 31B | Gemma 4 | text and images, no audio |

Source: GitHub basal and Hugging Face (2026). Both bases, Bielik v3 (SpeakLeash and ACK Cyfronet AGH) and Google's Gemma 4, are Apache-2.0.

## What the numbers show, and what they don't

The only complete comparison comes from the author. Werdykt (Polish for "verdict") is a hidden benchmark: 10 categories in Polish and English, 5,000 decisions whose items are not published. The board exported on 16 October covers 102 systems (basal.si5.pl, Werdykt, 2026).

| System | Accuracy, PL and EN | Calibration error (ECE) | p50 latency | USD per 1,000 decisions |
|---|---|---|---|---|
| basal-2.0-mini | 0.618 | 0.035 | 15.5 ms | 0.010 |
| basal-2.0 (4.5B) | 0.729 | 0.060 | 25.0 ms | 0.034 |
| basal-2.0-max | 0.784 | 0.044 | 37.4 ms | 0.068 |
| basal-omni-1.0-max | 0.823 | — | 76.2 ms | 0.263 |
| Jev 1.14 (API) | 0.822 | — | 267.6 ms | 0.071 |
| Gemini 3.8 Flash (API) | 0.996 | — | 3,314.5 ms | 2.530 |

Source: the Werdykt board and the project README (2026).

**These are the author's figures, not independent verification.** Hidden items cannot be rerun, and the board says its score "does not rate an entire product or guarantee correctness in a new workflow". The external JevBench ranking by Benchmark Heaven lists only the experimental basal-omni-1.0-ultra, near the top, and no basal-2.0 model (Benchmark Heaven, as of 19.10.2026).

**Latency and cost come from different setups.** Basal ran on one H100 at full load, costed at USD 3.95 per hour, so low traffic means a higher cost per decision. Jev and Gemini times are vendor API calls.

**"The trade-off is accuracy,"** as the author puts it (Kinas, 2026). Jev 1.14 beats every basal-2.0 text model, and large API models solve Werdykt almost perfectly. Other figures stay out of this table. The 67.8% for Jev we cited in September is TypeSafe's own evaluation on four workflows (DataCamp, 2026), and the author's first posts compared basal-1.0 with Jev on a separate Polish set (Kinas, X, 29.09.2026).

### Categories and automation rates

The weakest category is "rules and deadlines": basal-2.0 (4.5B) scores 0.350 there, the leading API models 1.000. The strongest are ticket routing, RAG decisions and real documents, where max reaches 0.966–0.974 (Kinas, basal-2.0 blog, 2026). In our view, coding a downtime reason is essentially ticket routing, while whether an inspection is overdue is a date rule for SQL.

On Werdykt, a threshold set for a 5% error target accepts 51.3% of the 4.5B model's decisions at 5.08% observed error. On question families held out from training it accepts 33.2% at 2.39% error, and the shipped file certifies no 1% threshold (Hugging Face, 2026). Downtime is a new domain and needs your own calibration; in the author's example `basal-calibrate` cut calibration error about 3.2 times for `choice`, 2 times for `score` and by 30% for yes-or-no questions (GitHub basal, 2026).

## Worked example: a feeder spring

This scenario is an example. Line L2, 6:42 a.m. The feeder in front of the press has been down for seven minutes and the PLC reports a feed alarm. The operator types in Polish: "znowu poszła sprężyna w podajniku" (the feeder spring went again).

The MES first computes stop duration, similar stops in 24 hours and signal states, and passes them as facts, since arithmetic is a weak spot of one-pass decisions. Each dictionary reason is defined by a sentence. The request goes to a local `basal-serve --model Remek/basal-2.0-4.5B --mode fast --template-prefix off --port 8000`, at `POST /v1/systemone`. We translated it; Basal picks the prompt language from the text.

```json
{
  "state": {
    "line": "L2, feeder before the press",
    "stop_duration_min": 7,
    "plc_alarm": "E217 no feed",
    "signals": {"feeder_speed": 0, "part_sensor": false},
    "similar_stops_24h": "2 (21:15, 12 min, MECH-FEEDER; 03:40, 9 min, MECH-FEEDER)",
    "operator_note": "feeder spring went again, swapped in the spare but it isn't holding either"
  },
  "questions": {
    "reason": {
      "type": "choice",
      "instructions": "What caused this stop, per the plant dictionary?",
      "criteria": {
        "MECH-FEEDER": "Mechanical feeder fault: springs, rollers, guides, jams",
        "ELEC-DRIVE": "Electrical or drive fault: motor, inverter, protection",
        "MAT-SHORTAGE": "No material or parts from logistics",
        "MAT-QUALITY": "Non-conforming material: dimensions, defects, wrong batch",
        "CHANGEOVER": "Planned changeover or order change",
        "ORGANISATIONAL": "No operator, break, briefing",
        "UNDETERMINED": "Cause cannot be determined from note and signals"
      }
    },
    "call_maintenance": {
      "type": "noul",
      "instructions": "Does this report require calling maintenance?"
    },
    "urgency": {
      "type": "score",
      "instructions": "How urgent is the intervention?",
      "criteria": ["next scheduled service", "within the shift", "within the hour", "immediately"]
    },
    "response": {
      "type": "act",
      "instructions": "Without maintenance, will the fault return this shift?",
      "criteria": {
        "true": "Fault will return; maintenance repair needed",
        "false": "Operator removed the cause; work can continue"
      },
      "costs": {
        "continue":          {"true": 900, "false": 0},
        "stop_and_check":    {"true": 200, "false": 30},
        "call_maintenance":  {"true": 40,  "false": 150},
        "shift_supervisor":  {"true": 70,  "false": 70}
      },
      "defer_action": "shift_supervisor",
      "max_error": 0.05
    }
  }
}
```

The costs are example values; in practice the plant estimates them, in zloty. The engine picks the action with the lowest expected cost, the sum of outcome probability times cost. With this example matrix (our calculation), carrying on wins only when the chance of the fault returning is below about 4%, a quick check between 4 and 24%, calling maintenance above about 73%, and in between asking the shift supervisor is cheaper. The documentation warns against very large error costs, which make the engine defer on expected cost alone (Hugging Face, 2026).

`noul` and `act` overlap on purpose: `noul` gives a raw probability for maintenance reports and leaves the threshold to you, `act` turns a similar judgment into an action.

### Sample response

**Every value below, probabilities and latency included, is illustrative. None of it comes from running the model.**

```json
{
  "model": "basal-2.0-4.5B",
  "answers": {
    "reason": {
      "type": "choice", "choice": "MECH-FEEDER",
      "probabilities": {"MECH-FEEDER": 0.91, "ELEC-DRIVE": 0.04, "MAT-QUALITY": 0.02,
                        "UNDETERMINED": 0.02, "MAT-SHORTAGE": 0.01, "CHANGEOVER": 0.0, "ORGANISATIONAL": 0.0},
      "confidence": 0.91
    },
    "call_maintenance": {"type": "noul", "noul": 0.88, "probabilities": {"true": 0.88, "false": 0.12}, "confidence": 0.88},
    "urgency": {
      "type": "score", "score": 2.1,
      "legend": {"0": "next scheduled service", "1": "within the shift", "2": "within the hour", "3": "immediately"},
      "probabilities": {"0": 0.03, "1": 0.17, "2": 0.47, "3": 0.33}, "confidence": 0.47
    },
    "response": {
      "type": "act", "action": "shift_supervisor", "refused": "call_maintenance", "deferred": true,
      "expected_costs": {"continue": 774.0, "stop_and_check": 176.2, "call_maintenance": 55.4, "shift_supervisor": 70.0},
      "answer": "true", "probabilities": {"true": 0.86, "false": 0.14},
      "confidence": 0.86, "calibration": "validated"
    }
  },
  "usage": {"input_tokens": 640, "output_tokens": 0, "questions": 4, "branches": 4, "latency_ms": 48}
}
```

How the MES reads it:

- **Reason:** MECH-FEEDER at 0.91. `max_error` applies only to `act` and `tool`, so OmniMES applies the `choice` threshold in its own code: above it the code is written and flagged as model-assigned, below it the operator sees two or three suggestions.
- **Urgency:** 2.1 on a 0–3 scale, 33% on "immediately": high in the maintenance queue.
- **Response:** calling maintenance is cheapest (55.4), but here 0.86 sits below the threshold certified for the 5% target, so the engine refuses to automate and hands the case, with costs, to the shift supervisor.

## Wiring it into OmniMES

This is our integration plan, not a shipped feature.

1. **Event.** The stream service records the state change from MQTT Sparkplug B; when the operator adds a note, the backend assembles signals, SQL-computed facts, the note and the dictionary.
2. **Local server.** A background task calls `basal-serve` on the plant network. The HTTP API has no authentication, so bind it to 127.0.0.1 or put a gateway in front (GitHub basal, 2026).
3. **Decision record.** Store the state, questions, probabilities, action, `deferred` flag, model, engine version, calibration file hash, and who confirmed or overrode the call. Basal writes no rationale, so only this record can reconstruct a decision.
4. **Thresholds.** Above the certified threshold, write automatically; below it, suggest; deferred `act` answers go to the supervisor. Safety alarms bypass the model by a hard rule.
5. **Validation.** Take 500 historical stops with codes confirmed by maintenance, feed part to `basal-calibrate`, hold out the rest. A few hundred items usually certify the 5% target; 1% needs about 1,000 (GitHub basal, API, 2026). Calibrate on the engine and quantisation used in production (Kinas, basal 2.2 blog, 2026). Shadow mode, as in our [Jev article](/en/blog/jev-in-industry-when-a-decision-costs-less-than-a-single-token), still applies.

The AI Act requires high-risk systems to record events automatically (Article 12) and allow effective human oversight (Article 14). In our interpretation, downtime coding that leaves decisions to people is usually not high-risk, as we argued when [classifying MES functions](/en/blog/eu-ai-act-august-2026-which-mes-functions-qualify-as-high-risk-ai); the line lies where a model stops machines or assesses workers.

### Hardware

The 4.5B model takes 4.9 GB as FP8 and 4.8 GB as GGUF Q8_0; its MLX port answers in 278 ms on an M4 Pro Mac (Hugging Face, 2026). Mini also runs on a CPU. One showcase user runs basal-1.5 (4.5B) on an RTX 3060 at about a second per item (basal.si5.pl, 2026). Our estimate, not a measurement: one GPU workstation covers a plant's downtime volume.

## Basal and Jev, without cheerleading

| Criterion | Jev | Basal |
|---|---|---|
| Delivery | API in TypeSafe's cloud | Apache-2.0 open weights on your own hardware |
| Werdykt accuracy | 0.822 (Jev 1.14) | 0.729 (4.5B), 0.784 (max) |
| Werdykt p50 latency | 267.6 ms via API | 25.0 ms on an H100 |
| Calibration | the vendor's | your own, via `basal-calibrate` |
| Operations | the vendor | the plant: GPU, updates, monitoring |

The operations row is our assessment. Jev wins on accuracy and on having no server to run; cost per decision is the same order of magnitude. Basal wins where data cannot leave the plant, the network has no internet and response time cannot depend on an outside link. The author stresses that a hosted decision API cannot be recalibrated on your data, while a basal model can (GitHub basal, 2026).

Neither writes justifications or does arithmetic. Basal is also young: Remigiusz Kinas is the author, with five contributors adding changes through pull requests (GitHub basal, 2026). Pin versions and re-check thresholds after every model change, since each model ships its own calibration file (Kinas, basal-2.0 blog, 2026).

## Who is deploying it

As of 19 October 2026 we found no publicly documented industrial production deployment with results; the model is weeks old. The project's showcase holds 19 user-submitted stories, published after moderation: self-reports, not verified case studies (basal.si5.pl, Who uses basal, 2026). The closest to production:

- **Leksio:** classifies court rulings and tax interpretations on its own GPU, checking results before saving;
- **Visacom:** matches bank statement lines to invoices in SAP Business One; Basal picks from at most six candidates, an accountant handles low-confidence lines, and accuracy is still being measured;
- **Puentoo ERP:** pre-launch, rolling Basal into mail routing, an assistant action gate and document checks;
- **OmniMES:** our own entry on classifying downtime reasons, status "planned deployment", validation first.

The author lists order documentation checks, ticket handling, rule compliance, RAG source coverage, agent steps and decisions from scans, photos and recordings (basal.si5.pl, 2026); manufacturing is not a category.

## Barriers and limitations

- **Arithmetic.** Rules, deadlines and thresholds stay in code; `"facts": "auto"` adds dates and amounts for Polish text only.
- **Experimental features.** `act`, `tool` and many-label `multi` need a human in the loop.
- **Context.** Mini has 8,192 tokens; longer states are cut in the middle.
- **World knowledge.** A small model knows little; put rules and facts in the state.
- **Media.** basal-omni reads images and audio zero-shot with text calibration; validate separately.
- **People.** Decisions with serious consequences for people, such as operator assessment, need human review (GitHub basal, 2026).

## What this means for your plant

Basal is not more accurate than Jev or the large models. It offers decisions inside the plant, in tens of milliseconds on an H100-class GPU and a fraction of a second on a Mac, calibrated to your dictionary, under an open licence.

Start with the 4.5B model and one dictionary, ideally downtime reasons, each defined in a sentence, plus an "undetermined" option. Export 500 events, run `basal-calibrate`, shadow-run for two weeks and keep the full record from day one. Let `act` reach people as suggestions first; automate maintenance calls only after comparing them with supervisors' decisions.

The model is ready to be tested on your data, not trusted on its author's word. A plant with a clean reason dictionary and 500 described stops can, in our estimate, check it in two weeks without a single record leaving its network.

## Sources

- Remigiusz Kinas, *basal* repository and docs, GitHub, 2026 — https://github.com/rkinas/basal
- Hugging Face, model card `Remek/basal-2.0-4.5B`, 2026 — https://huggingface.co/Remek/basal-2.0-4.5B
- basal.si5.pl, project website — https://basal.si5.pl/en/
- basal.si5.pl, *Werdykt*, export of 16 October 2026 — https://basal.si5.pl/en/benchmark/
- Remigiusz Kinas, basal-2.0 and basal-omni release post, 12 October 2026 — https://basal.si5.pl/en/blog/basal-2-0/
- Remigiusz Kinas, *basal 2.2 engine: calibration on your own data*, 19 October 2026 — https://basal.si5.pl/en/blog/basal-2-2/
- basal.si5.pl, *Who uses basal*, as of 19 October 2026 — https://basal.si5.pl/en/community/
- Remek Kinas, X post on basal-1, 29 September 2026 — https://x.com/KinasRemek/status/2104805264528413012
- Remek Kinas, X post on basal-1.5, 4 October 2026 — https://x.com/KinasRemek/status/2106639959004176440
- Benchmark Heaven, *JevBench*, October 2026 — https://benchmarkheaven.com/jev-models
- OmniMES, *Jev in industry: when a decision costs less than a single token*, 23 September 2026 — https://www.omnimes.com/en/blog/jev-in-industry-when-a-decision-costs-less-than-a-single-token
- DataCamp, *Jev: TypeSafe's System One Model Explained*, 16 September 2026 — https://www.datacamp.com/blog/system-one-models-jev
- AI Act (Regulation (EU) 2024/1689), Articles 12 and 14 — https://artificialintelligenceact.eu/article/12/ and https://artificialintelligenceact.eu/article/14/
