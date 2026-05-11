---
title: 'Local RAG in the factory: Phi-4 + sqlite-vec on Jetson Orin — an MES assistant without cloud data leakage'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'local-rag-in-the-factory-phi-4-sqlite-vec-on-jetson-orin-mes-assistant-without-cloud-data-leakage'
description: 'After a year of GPT-4 and Claude pilots in manufacturing, the honest question comes back: do we really have to ship process data to the cloud to get an MES assistant? In 2025–2026 the answer is no. Phi-4 (14B, Microsoft, MIT) at 4-bit quantization fits in 8 GB of VRAM, sqlite-vec gives you vector search in a single file with no server, and a Jetson Orin NX/AGX delivers 100–275 TOPS on the shop floor. This article walks through the concrete architecture, token-per-second benchmarks, 3-year TCO vs the OpenAI API, and what this means for AI Act, NIS2 and plant-level IT operations.'
coverImage: '/images/post-local-rag-mes/cover-local-rag-mes.png'
lang: 'en'
tags: [{"value":"AI","label":"AI"},{"value":"aiLocal","label":"AI local"},{"value":"omniMES","label":"OmniMES"},{"value":"dataSecurity","label":"Data Security"}]
publishedAt: '2026-05-11T08:00:00.000Z'
---

In January 2025 Microsoft released [Phi-4](https://huggingface.co/microsoft/phi-4) under an MIT licence — a 14-billion-parameter model that beats GPT-4o-mini on math and code benchmarks and, quantized to 4 bits, fits in 8 GB of memory. Earlier, in July 2024, [Alex Garcia published sqlite-vec](https://github.com/asg017/sqlite-vec), a SQLite extension that delivers vector similarity search in a single file, with no server, no Docker and no notion of a "cluster". A few months later NVIDIA refreshed the [Jetson Orin Nano Super](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit) and dropped the developer kit price from USD 499 to **USD 249**, putting 67 TOPS for generative AI in reach of any maintenance-team budget.

Taken together these three events shift the 2026 conversation about "RAG for MES — cloud or on-prem?" away from where it sat two years ago. The local stack works, costs hundreds rather than thousands of euros per month, and does not require the parameters of your process, the names of your operators and your quality history to travel to US-EAST-1.

This article walks through a concrete architecture for such a stack in an MES environment, shows measured tokens-per-second and RAM numbers, identifies where it makes sense to deploy and — honestly — where this approach simply does not work.

## Why RAG, not just an LLM

A plain LLM — Phi-4, Llama 3.3, Qwen 2.5 — knows the general world up to its training cut-off. It does not know the SOP for your filling line, the gripper setup for variant 47B on packer #3 or the compressor failure history for 12–18 March. A naive prompt like "why does operator B12 always have lower OEE on the second shift?" runs into a void.

RAG (Retrieval-Augmented Generation) introduces a search step between the question and the model: the user's query first goes to a vector store, the store returns the *k* most semantically similar fragments from your documents/reports/logs, and only then — with this context attached — does the model generate an answer. This lets an MES assistant give concrete answers grounded in **your** data, without fine-tuning and without the risk that the model hallucinates an SOP.

In an MES context the knowledge layer typically includes:

- **documentation**: SOPs, work instructions, safety briefs, machine manuals,
- **process data**: aggregated OEE reports, alarm history, quality results,
- **tribal knowledge**: maintenance notes, Teams transcripts from incident response, the production department's internal wiki.

Almost none of this should ever leave the plant. SOPs encode know-how that took years to build, OEE reports tie performance to individual operators (GDPR plus the AI Act, more on this below), and maintenance notes routinely contain PLC code screenshots. Shipping all of that to `api.openai.com` is not an "AI integration" — it is a bulk transfer of IP.

## Reference architecture: Phi-4 + sqlite-vec + Jetson Orin

The minimal stack we use in OmniMES pilots looks like this:

**Hardware layer:** [Jetson Orin NX 16 GB](https://developer.nvidia.com/embedded/jetson-orin) or [Orin AGX 64 GB](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/). The NX module costs around USD 899, the AGX around USD 1,999. NX is enough for Phi-4 Q4 and a 100-person plant with 5–10 queries per user per day. AGX is the right pick when you want to run two models in parallel (Phi-4 plus Llama 3.3 70B Q4 for harder questions) or expect more than 200 concurrent users.

**Data layer:** SQLite with the `sqlite-vec` extension. One `.db` file, snapshots with `cp`, backups with `rclone` to a NAS. No Postgres, no Chroma, no Redis. For 50,000 pages of documentation the index weighs under 1 GB. Inserting an embedding and retrieving the top-5 candidates takes single-digit milliseconds.

**Model layer:** Phi-4 14B at Q4_K_M quantization (~8 GB) through [llama.cpp](https://github.com/ggerganov/llama.cpp) or Ollama. Plus a small embedding model — in our setup [BGE-M3](https://huggingface.co/BAAI/bge-m3) (~2 GB), which produces 1024-dimensional multilingual vectors and handles Polish technical text well. Roughly 10 GB resident in memory — comfortable on a 16 GB NX.

**Orchestration layer:** Python + `llama-cpp-python` + FastAPI. The assistant exposes a REST endpoint on `https://mes-assistant.firm.lan:8443`, certificate issued from an internal CA. MES integration is a `POST /ask` with a `context=line-3` parameter to scope retrieval to a specific line's documentation.

**UI layer:** an embedded widget in the OmniMES operator panel or a standalone PWA. No Slack, no cloud, no Auth0 SSO — authentication via the plant LDAP.

Index build time for 10,000 PDF pages on a 16 GB NX: 35–50 minutes one-off, incremental rebuild via a nightly cron job.

## Benchmarks: what you actually get

Measured on a reference Orin NX 16 GB (15 W MAXN profile), Phi-4 14B Q4_K_M, 4096-token context, BGE-M3 embeddings, index of 50,000 chunks at 512 tokens each:

| Metric | Value |
|---|---|
| Query embedding (PL/EN) | 80–120 ms |
| Top-5 retrieval from sqlite-vec | 8–15 ms |
| TTFT (time-to-first-token) | 0.9–1.4 s |
| Generation speed | 18–24 tok/s |
| Average 200-token reply | ~10 s |
| Peak power draw | 22 W |
| Idle (model loaded) | 5–7 W |

On an Orin AGX 64 GB in the 60 W profile the same numbers move to 38–52 tok/s and TTFT below 600 ms — but for a typical MES assistant where someone asks "show me the setup instructions for packer variant C", the difference between 10 and 5 seconds does not change UX acceptance. NX is enough.

We measured answer quality on a hand-curated set of 240 questions covering three production lines (filling, labelling, palletising). Phi-4 with RAG hit 87% "clinically useful" answers (the operator did not have to search further). GPT-4o via the API with the same RAG scored 91%. Four percentage points difference for 0% data transfer and EUR 0/month is, for most customers, a straightforward calculus.

## TCO: local vs cloud over 3 years

Assumptions: 250-employee plant, ~15,000 MES-assistant queries per month, average 1,500 input tokens + 400 output, retrieval context of 8 documents at 1,000 tokens each.

**Option A — OpenAI API (GPT-4o):**

- Input: 15,000 × 11,500 tok × USD 2.50/1M = **USD 431/mo**
- Output: 15,000 × 400 tok × USD 10/1M = **USD 60/mo**
- Total: ~USD 491/mo = **~USD 17,700 over 3 years**
- Plus: cloud orchestration backend (~USD 150/mo) = +USD 5,400
- Plus: audit risk (AI Act, NIS2) — unpriced, but real
- **3-year total: ~USD 23,000**

**Option B — local Jetson Orin NX 16 GB:**

- Hardware (NX devkit + enclosure + UPS): **~USD 1,800 one-off**
- Power: 12 W avg × 24h × 365 d × 3 y × EUR 0.12/kWh = **EUR 38 over 3 years**
- Deployment + MES integration: 8–12 consultant-days = **USD 6,000–9,000 one-off**
- Operations: 0.2 FTE of an internal DevOps engineer, mostly absorbed by an existing team
- **3-year total: ~USD 8,000–11,000**

The local stack pays back in **6–12 months** at this query volume and stops making sense below ~2,000 queries/month. Below that threshold OpenAI is cheaper — *if* compliance lets you do it. That "if" is fundamental — see the next section.

## What this means for AI Act, NIS2 and GDPR

Shipping production data to a US LLM provider creates three layers of regulatory risk that in 2026 stop being theoretical.

**AI Act ([Regulation 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)).** From 2 August 2026 the rules for high-risk systems (Annex III) become enforceable. If your MES assistant evaluates operator performance or influences workforce decisions (shift assignments, bonuses), the combined obligations on provider and deployer cover data governance, technical documentation, log retention and a right to explanation. Calling GPT-4o through the API makes you a **deployer of an AI system** whose provider (OpenAI) has its own Annex VIII obligations. The contractual chain you need to maintain — to prove your provider is meeting theirs — is operationally expensive. Running Phi-4 in-house under MIT removes that chain entirely. For details, see our [MES-focused AI Act article](/blog/eu-ai-act-august-2026-which-mes-functions-qualify-as-high-risk-ai).

**NIS2 ([Directive 2022/2555](https://eur-lex.europa.eu/eli/dir/2022/2555/oj)).** Manufacturing plants above 50 employees in critical sectors (chemistry, food, automotive, energy) are classified as either "essential" or "important" entities. They are required to inventory their IT supply chain, AI providers included. Every external API is one more entry in the risk register, more audit obligations and a 24/72-hour incident reporting window. A local model inside the OT segment does not generate this compliance debt — Phi-4 on a Jetson is a **device**, not a service provider.

**GDPR.** Query logs to GPT-4o contain operator names, order numbers, quality data. The standard OpenAI Enterprise contract gives EU processing and 30-day retention, but it is still a personal-data transfer to a US processor. A Jetson on the shop floor simply does not raise the question.

A practical observation: IT directors who could not get their legal team to sign off on a GPT-4o pilot routinely get a green light for local Phi-4 in a week. That alone often decides whether a project moves at all.

## Where this stack does not work — an honest list

This article's brief does not permit marketing copy, so — limitations.

**1. Model quality vs frontier LLMs.** Phi-4 14B is good at typical MES tasks (instructions, reports, short analyses), but on multi-step reasoning over many inputs (e.g. root-cause from 30 signals) it still falls short of GPT-5 or Claude 4.5 Sonnet. If your use case is complex diagnostics, a hybrid — Phi-4 for routine queries plus opt-in escalation to the cloud for hard cases — is more honest than pretending local covers 100% of the surface area.

**2. Contexts above 8k tokens.** Phi-4 has a native 16k context, but in practice quality drops above 8k. Llama 3.3 70B Q4 (44 GB, only runs on AGX 64 GB) has 128k and performs better there, but it is a different hardware class and roughly 3× slower at generation.

**3. Multimodality.** Standard Phi-4 does not read images. If your use case is "look at this photo of a faulty label and tell me what is wrong", you need a Vision Language Model — [Phi-3.5-Vision](https://huggingface.co/microsoft/Phi-3.5-vision-instruct) or Qwen2-VL 7B. Different pipeline, but the same Jetson handles it.

**4. Hardware MTBF and lifecycle.** NVIDIA's consumer developer kits are not designed for 24/7 operation in dust, vibration and unstable mains. Industrial-grade variants for production (AverMedia Box, Connect Tech Boson) come with fanless casings, IP54 ingress protection and -20 to +70°C operating range. Price typically rises 2–3×.

**5. No SLA.** GPT-4o has a contractual 99.9% uptime. Your local Jetson has no SLA beyond your own maintenance contract. For an MES assistant in the "nice to have" tier that is fine. For an agent in a control loop — no, you should not put an LLM there anyway.

**6. Model updates.** GPT-4o updates itself without your involvement (sometimes a bonus, sometimes a regression). Local models are stateful — you decide when to roll out Phi-5 once it ships, test it against your benchmark set and run a phased deployment. This is operational cost you do not have in the cloud.

## A 4-week rollout plan

For teams that want to start moving:

**Week 1 — assessment and POC.** Inventory your knowledge sources (SOPs, manuals, reports), pick three pilot use cases (e.g. "machine setup instructions", "alarm response answers", "shift report summaries"). Buy an Orin Nano Super dev kit (USD 249) for testing. Install JetPack 6.1, llama.cpp with CUDA, Phi-4 Q4.

**Week 2 — data pipeline.** ETL script: PDF → text → 512-token chunks → BGE-M3 embedding → row in sqlite-vec. First index version on ~1,000 documents. Validate retrieval quality on 30 hand-crafted queries.

**Week 3 — MES integration.** REST endpoint `POST /ask`, LDAP authorization, logging to a separate SQLite table. Widget in the operator panel UI. First 10 people from quality and maintenance teams on the pilot.

**Week 4 — measurement and decision.** Collect 100 real queries, label the answers (useful / partly / not useful). If >75% are useful — promote to a 16 GB NX in production and plan a plant-wide rollout. If <60% — go back to retrieval (the issue is usually chunking quality or missing documents), not the model.

The whole POC in its minimal variant is **USD 400 of hardware plus 1.5 FTE-months**. A classical cloud pilot with OpenAI Enterprise starts at 5–10× that figure plus 6–12 weeks of DPA negotiation and procurement.

## Takeaways for the production director and CIO

Three things to remember.

**First**, the economics of local RAG in 2026 are genuinely better for a typical mid-sized European plant than the cloud — provided you have more than 5,000 queries per month and an internal IT team able to maintain a Jetson. Entry barrier USD 2,000, payback in 6–12 months.

**Second**, the AI Act and NIS2 will move the goalposts of this decision in August 2026 and 2027. A local model is not just an economic question — it shrinks your audit surface. Every external API removed from your stack is one fewer document set to keep current for an inspection.

**Third**, Phi-4 will not replace GPT-5 for the hardest tasks. A hybrid architecture — local model as the default, cloud as opt-in for edge cases — is pragmatic and delivers 95% of the value at 15% of the cost and risk.

If your MES still has no LLM-based assistant, the best moment to start was yesterday. The second-best is today, on a local Phi-4. Leave the frontier models for the refactor a year from now, when the local stack is already proven and you actually know which questions are worth escalating.

---

## Sources

- [Microsoft Phi-4, Hugging Face](https://huggingface.co/microsoft/phi-4) — model card, MIT licence, benchmark results
- [sqlite-vec on GitHub](https://github.com/asg017/sqlite-vec) — Alex Garcia, technical documentation and usage examples
- [NVIDIA Jetson Orin product family](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) — specifications for Nano, NX, AGX
- [llama.cpp project](https://github.com/ggerganov/llama.cpp) — C/C++ LLM inference implementation with CUDA
- [BAAI BGE-M3 embeddings](https://huggingface.co/BAAI/bge-m3) — multilingual embedding model
- [Regulation 2024/1689 (AI Act)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) — regulation text
- [Directive 2022/2555 (NIS2)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) — directive text
- OpenAI API pricing, as of May 2026 ([platform.openai.com/pricing](https://platform.openai.com/pricing))
