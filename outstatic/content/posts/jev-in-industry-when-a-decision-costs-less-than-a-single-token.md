---
title: 'Jev in industry: when a decision costs less than a single token'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'jev-in-industry-when-a-decision-costs-less-than-a-single-token'
description: 'TypeSafe has released Jev — a model that writes no text at all and instead returns typed decisions with calibrated probability. The cost of a single judgment drops below the price of a few tokens, and latency from seconds to milliseconds. We look at what this actually changes in an MES: where such a model belongs on the shop floor, where it must never be used, and how to wire it in without breaking your audit trail.'
coverImage: '/images/post-jev-decyzje/cover-jev-decyzje.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"AI","label":"AI"},{"value":"agentAi","label":"Agent AI"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-09-23T06:00:00.000Z'
---

Most of what a factory calls "artificial intelligence" is not writing text. It is judgment. Was this stoppage a failure or a changeover. Is this broker alarm meaningful, or noise from a sensor that has been flickering for a week. Does the defect description an operator typed at three in the morning belong to the same category as the five hundred before it. Which crew should take this work order.

For the last two years we have been doing this with a large language model, because there was nothing else. The model generated text, we asked it for JSON, then parsed the answer and hoped it would hold the schema. We paid for that in seconds of latency and in fractions of a cent that stop being fractions once you have twenty thousand events a day.

In September 2026 TypeSafe released **Jev** — a model without that loop, because it does not generate text at all.

## How Jev differs from a language model

Its maker describes Jev as a **"System One" model**: instead of producing a string token by token, it takes a **state** (a string or a JSON structure) and a **set of typed questions**, then answers all of them **in parallel, in a single pass** (Requesty, 2026).

Questions come in three primitives:

- **Noul** — a yes/no proposition, returning a probability in [0, 1];
- **Choice** — a selection from a predefined list, returning the label, a probability distribution across options and a confidence value;
- **Score** — a position on an ordered scale with described levels, returning a value and a distribution.

The critical consequence is architectural rather than about performance: **the set of permissible answers is defined in your schema before the call**. The model cannot return a category that is not on the list, nor break a type — not because it was asked nicely, but because there is no other exit. An entire class of errors that we currently patch with retries and validators simply disappears.

The second difference is in training. Instead of RLHF, which optimises for human conversational preference, TypeSafe uses **RLCD — Reinforcement Learning for Calibrated Decisions** — targeting decisions and honest probability estimates (DataCamp, 2026). That has a practical edge: a confidence of 0.9 should genuinely correspond to roughly 90% accuracy, rather than being a number the model produced because it sounded convincing. Large language models are notoriously overconfident on exactly this point.

## The numbers

| Metric | Jev | Frontier models (vendor comparison) |
|---|---|---|
| End-to-end latency | 70–500 ms | 10.1 s (GPT-5.6 Terra), 37.8 s (Claude Opus 5) |
| Median, 1 question / 3 questions | 275 ms / 310 ms | — |
| Input cost | USD 0.042 / million tokens | approx. 48× more (GPT-5.6 Terra) |
| Output cost | unmetered | billed |
| Cost per decision | approx. USD 0.0004 per case | USD 0.0304 (Terra), USD 0.1761 (Opus 5) |
| Accuracy (4 production workflows) | 67.8% | 67.9% (Terra), 73.1% (Opus 5) |
| Structured output error rate | 0% | 17.0% (GPT-5.6 Sol), 45.5% (Claude Haiku 4.5) |

Source: DataCamp (2026) and Spring AI (2026), both reporting TypeSafe's own benchmarks.

**These figures come from the vendor and have not been independently verified** — DataCamp says so explicitly. Treat them as an order of magnitude rather than a guarantee, and validate them on your own data before you build anything on top of them.

Hence the title. Spring AI quotes a fourteen-question call at **USD 0.000043 and 111 ms**, against USD 0.033 and 11–14 s for a reasoning model. At a rate of around USD 10 per million output tokens — typical for frontier models — a single output token costs USD 0.00001. Which means **the entire fourteen-question judgment costs about four tokens of generated text**. Not four sentences. Four tokens.

For the record, this also means that at 67.8% accuracy Jev is not smarter than the model you already use. It is as accurate as GPT-5.6 Terra and clearly weaker than Opus 5. The shift is not in the quality of judgments but in their price and speed — which changes not *how well* you decide, but **how many decisions are worth making at all**.

## Why this fits the shop floor

Production decisions have properties that suit Jev almost perfectly:

1. **The answer set is closed and known upfront.** Downtime reason codes, defect categories, ticket priorities, crews — these are dictionaries that already exist in the MES and are maintained by a process engineer.
2. **Volume is high and repetitive.** One line produces hundreds of events per shift. At USD 0.03 per judgment nobody classifies every micro-stoppage. At USD 0.0004 the question stops being a budget question.
3. **Response time is a hard requirement.** An operator at the machine will not wait ten seconds for a suggestion. At 300 ms the suggestion appears before they reach for the dropdown.
4. **The state is already structured.** Jev accepts a JSON record — and a JSON record is precisely what an MES holds: machine context, work order, recent readings, event history.

Point three deserves emphasis, because it decides whether the shop floor accepts the thing at all. TypeSafe's demonstration, in which Jev **plays Doom by reacting to structured game state roughly ten times a second** (DataCamp, 2026), is a stunt, but it communicates something real: this is a model that fits inside an operator control loop, not inside a reporting loop.

### Where we see this in OmniMES

- **Downtime reason coding.** The operator types "feeder spring went again" — the model maps it to a dictionary code and returns confidence. Above a threshold it is written automatically; below it, it goes for approval. The gain is not in replacing the operator, it is that downtime data stops being a pile of free-text descriptions that cannot be summed.
- **Signal triage in automatic discovery.** The topic and tag filtering rules we described earlier sieve by pattern. Jev can answer the question a regular expression cannot: "does this tag look like a process variable worth recording, or like an internal diagnostic register of the controller".
- **Qualifying deviations in OmniEnergy.** Not "did consumption exceed the threshold" — SQL computes that, and SQL should keep computing it. Rather: "given this work order, this shift and this outside temperature, is the deviation expected".
- **Maintenance ticket routing.** A Choice across crews plus a Score for urgency, one call, both questions against the same state.
- **A gate in front of an expensive model** (the *cascade gating* pattern). Before you send an event to a reasoning model at three cents, ask Jev at a fraction of a cent whether it is worth it. Screening out 90% of traffic changes the bill by an order of magnitude.

## What Jev will not do — and why you must read this before deploying

The vendor and independent commentators agree on the limitations, and two of them are critical in an industrial context.

**First: no arithmetic, counting, date comparison or indirect questions** (Requesty, 2026). The recommendation is explicit: *keep exact calculations in code*. Do not ask Jev whether OEE dropped below 65%, how many pieces were produced between shifts, or whether an inspection is overdue. A SQL query does that, deterministically and cheaply. Give the model the **qualitative** question that SQL cannot handle.

**Second: no justifications.** Jev will not write down why it decided one way rather than another — it cannot generate text. DataCamp flags this as a problem for compliance audits, and in Europe that remark is more serious than it looks. We have written on this blog about what supervisory authorities actually look for in MES systems after 2 August 2026. If a model's judgment affects product classification, batch release or an assessment of someone's work, a bare "0.87" in the log will not do. The answer is architecture, not a promise: **record the full input state, the question text, the probability distribution and the schema version**, so that the judgment can be reconstructed. And leave high-stakes decisions to a human for approval — assisted by the model, not replaced by it.

The third caveat is technical but expensive if forgotten: **per-document work is one call per document** (Spring AI, 2026). Reranking twenty items means paying for twenty calls. The model **does not stream**, and the state must be a string, object, array or null. And — as the authors stress — **it is not a security boundary**; do not build access control on it.

## How to wire it in without rewriting the MES

Integration does not require a rebuild. Jev runs alongside your existing models rather than replacing them — in Spring AI it arrives as a separate client and a set of advisors for self-refinement, guardrails and document screening in RAG (Spring AI, 2026). The same layout carries over to MES architecture:

**Within a week**

1. **Pick one dictionary you already have and that is filled in badly.** For most of our clients that is downtime reason codes. Export 500 historical events with the operator description and the manually assigned code.
2. **Measure the baseline** before you connect anything: what percentage of events currently carry a code other than "other".

**Within a month**

3. **Run the classification silently** — the model computes, the result lands in a separate column, nobody on the floor sees it. After two weeks compare it against the operator's code and work out the confidence threshold at which agreement becomes acceptable. This is the before/after comparison without which a deployment decision is not worth making.
4. **Write the audit trail from day one** — state, question, distribution, schema version. Adding it later means the model's first months of work are unreproducible.

**What not to do on the first pass:** do not wire the model into batch release, shipment holds or operator evaluation. Start where an error costs a correction in a report, not a customer complaint.

## What follows from this

Jev is not smarter than the models you use today. At 67.8% accuracy it is exactly as good as a mid-tier frontier model and weaker than the best one. What changes is the economics: a judgment for a fraction of a cent, in 300 ms, with a guaranteed type and honestly calibrated confidence.

When the cost of a decision falls by two orders of magnitude, the rule that shaped your systems stops applying: that you only automate classification where it genuinely pays off. Suddenly it pays to classify every micro-stoppage, every alarm and every free-text operator comment — not because it is impressive, but because the resulting dataset is the first complete record a factory has ever had of its own events.

There is one condition, and it is not technological: **you have to know what to ask**. The model only answers questions whose answer set you defined in advance. Factories with tidy dictionaries and described states wired this in within a week. Factories with seventeen variants of "mechanical failure" have to clean house first — and that is work no model will do for them.

## Sources

- DataCamp, *Jev: TypeSafe's System One Model That Never Hallucinates*, September 2026 — https://www.datacamp.com/blog/system-one-models-jev
- Requesty, *TypeSafe Jev explained: how it works, LLM differences and API pricing*, September 2026 — https://www.requesty.ai/blog/typesafe-jev-explained
- Spring AI, *Spring AI and TypeSafe Jev: Fast, Cheap, Structured Decisions*, 21 September 2026 — https://spring.io/blog/2026/09/21/spring-ai-typesafe-structured-judgment/
- Kiln-AI, *jev_jsonschema — run a JSON Schema through the Jev API* — https://github.com/Kiln-AI/jev_jsonschema
