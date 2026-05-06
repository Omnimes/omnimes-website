---
title: 'EU AI Act, August 2026: which MES functions qualify as "high-risk AI" — and what it means in practice'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'eu-ai-act-august-2026-which-mes-functions-qualify-as-high-risk-ai'
description: 'On 2 August 2026, the EU AI Act high-risk rules become fully enforceable. A subset of MES functions — predictive maintenance tied to machine safety, operator performance monitoring, AI in medical-grade quality control, and AI-assisted workforce decisions — may be classified as high-risk, with fines up to €15M for breaches. This article maps concrete MES modules to Annex I and Annex III, lists the seven obligations of high-risk operators, and gives a 3-month action checklist for plant owners.'
coverImage: '/images/post-ai-act-mes/cover-ai-act-mes.png'
lang: 'en'
tags: [{"value":"AI","label":"AI"},{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"aiAct","label":"AI Act"}]
publishedAt: '2026-05-05T08:00:00.000Z'
---

**2 August 2026** is a date most European manufacturing plants do not yet have on their compliance calendar. On that day, the [EU AI Act](https://artificialintelligenceact.eu/) high-risk rules (Annex III) become fully applicable, and the European Commission gains enforcement powers against general-purpose AI (GPAI) providers ([DLA Piper, August 2025](https://www.dlapiper.com/en-us/insights/publications/2025/08/latest-wave-of-obligations-under-the-eu-ai-act-take-effect)). Penalties for high-risk non-compliance reach **€15 million or 3% of global annual turnover** (Article 99). For prohibited practices — **€35 million or 7%** ([artificialintelligenceact.eu/article/99](https://artificialintelligenceact.eu/article/99/)).

For the MES, SCADA and CMMS world, this is not abstract regulation aimed at "big AI." Several functions already running on European shop floors today — predictive maintenance coupled with a machine safety system, operator performance monitoring tied to bonus pay, AI classifying defects on medical-device production lines — may fall under high-risk classification. Below is the unvarnished version: what is regulated, what is not, and what to do in the months that remain.

## Two classification paths — Annex I vs Annex III

The AI Act creates two independent paths by which an AI system becomes high-risk. Understanding this dichotomy matters because an MES can land in **both** simultaneously.

**Path 1: Annex I (Article 6(1))** — AI as a safety component of, or itself being, a product covered by EU harmonised legislation. The list contains over 30 directives and regulations, including the new **Machinery Regulation 2023/1230** (replacing Directive 2006/42/EC from **20 January 2027**, [TÜV Rheinland](https://www.tuv.com/world/en/new-machinery-regulation-eu-2023-1230.html)). The new regulation explicitly names AI-based safety components and adaptive control systems. If your MES integrates with the safety layer of a machine — say, AI predicts a bearing failure and automatically alters line parameters to prevent an accident affecting the operator — you are likely in Annex I scope.

**Path 2: Annex III (Article 6(2))** — eight use-case areas in which AI is high-risk by default, unless it does not pose a significant risk to health, safety or fundamental rights ([Annex III, artificialintelligenceact.eu](https://artificialintelligenceact.eu/annex/3/)). For MES, three of those eight matter: **critical infrastructure**, **employment and workers management**, and — for some sectors — **essential services**.

The application dates differ: Annex III applies from **2 August 2026**, Annex I — for most products — from **2 August 2027** ([artificialintelligenceact.eu/article/6](https://artificialintelligenceact.eu/article/6/)). In practice a plant deploying an AI-enabled MES will hit Annex III obligations (workforce monitoring, critical infrastructure) first, and only a year later face the full set of requirements for AI inside machinery.

## MES functions that qualify as high-risk

Mapping typical MES/EMS/CMMS modules onto the AI Act:

**1. Predictive maintenance tied to a machine safety system (Annex I).** Classic example: an XGBoost model fed by vibration sensors that automatically shuts down a unit before failure that would endanger an operator. That is AI as a safety component under Regulation 2023/1230. High-risk by operation of law.

**2. AI-based defect classification in regulated industries — medical devices, automotive, aviation (Annex I).** Computer vision spotting defects on a medical-device production line is covered by the MDR (Medical Device Regulation), which sits in Annex I of the AI Act. The same goes for vehicle safety (Type Approval Regulation) and civil aviation (EASA). Routine vision QC on plastic packaging — no.

**3. Performance and behaviour monitoring of operators (Annex III, point 4b).** The AI Act explicitly classifies as high-risk AI systems "intended to be used to monitor and evaluate the performance and behaviour of persons in work-related relationships." This is where most MES modules end up if they:
- generate operator rankings based on OEE or output,
- compute individual KPIs that drive bonuses or promotions,
- analyse camera feeds of worker behaviour (time at workstation, completeness of procedure).

This is the **most overlooked** category. A production manager in Poland often does not realise that a dashboard ranking operators and feeding the bonus system can be high-risk AI from a regulator's perspective.

**4. AI-assisted workforce decisions — task allocation, promotions, dismissals (Annex III, point 4b).** If your MES recommends moving an operator to a different line based on error history, or supports headcount decisions based on team productivity analysis, that is high-risk.

**5. AI in management of critical energy, water or gas infrastructure (Annex III, point 2).** Applies to plants that are part of electricity, water, gas or heat supply. If your EMS optimises co-generation units feeding the local grid, the AI in that control layer is high-risk.

## MES functions that almost certainly are NOT high-risk

For balance — panic costs as much as neglect:

- **LLM-generated shift reports** (e.g. ChatGPT/Claude summarising OEE and downtime causes). An analytical tool, no autonomous decisions affecting health or rights.
- **Technical documentation chatbots** (like our [LangChain + Outline integration in OmniMES](https://omnimes.com/en/blog/how-we-integrated-langchain-with-outline-to-build-smart-documentation-assistant-in-omnimes)) — information, not decision.
- **Material consumption prediction for procurement planning** — business function, not safety, not HR.
- **AI suggesting an optimal preventive maintenance schedule** — provided a human approves execution and it is not coupled with auto-shutdown of the machine.
- **Energy analysis inside an EMS for ESG / ISO 50001 reporting** — that is compliance under different regulation, not the AI Act.

The line is single-question: **does the AI affect safety, fundamental rights, or workforce decisions?** If not, you are most likely outside the Annex.

## What "high-risk" means in practice — seven obligations

If an MES function is high-risk, the provider (you, if you build the AI module; the vendor, if you buy it) and the deployer (the plant using the system) must satisfy ([Article 17](https://www.euaiact.com/article/17), [Annex VI](https://artificialintelligenceact.eu/annex/6/), [Article 26](https://artificialintelligenceact.eu/article/26/)):

1. **Quality Management System (QMS)** — a documented process for development, validation and lifecycle maintenance of the AI system. Often integrable with existing ISO 9001.
2. **Technical documentation** — architecture, training data, accuracy metrics, risk assessment, test plan. Updated across the lifecycle.
3. **Conformity assessment** — internal (Annex VI) or via a notified body (Annex VII), depending on system type and area. Most Annex III systems take the internal path.
4. **EU database registration** — before market entry, an Annex III high-risk system must be entered in a public EU database.
5. **Post-market monitoring (Article 72)** — a documented plan for collecting performance and incident data after deployment, with reporting of serious incidents to supervisory authorities.
6. **Human oversight (Article 14)** — built-in mechanisms enabling a human to monitor, intervene in, and override AI decisions. For a defect-classification system: the operator can accept or reject the AI verdict; every override is logged.
7. **Logging and audit trail** — automatic logs of all material events, retained for at least six months.

For the deployer (the plant owner running the high-risk MES) there is an additional duty under **Article 26**: **before deploying high-risk AI in the workplace, you must inform workers' representatives and the workers themselves** that they will be subject to such a system. This is not optional and cannot be bypassed by an employment policy signed two years earlier.

## Polish specifics — KRiBSI and a delayed national act

Poland has taken an unusual approach: instead of dispersing competence across the data protection authority, the electronic communications regulator and sector-specific bodies, the government opted for **a single central body — the Commission for the Development and Security of Artificial Intelligence (KRiBSI)** ([Rzeczpospolita, March 2026](https://www.rp.pl/prawo-w-polsce/art44076181-rzad-przyjal-projekt-ustawy-o-systemach-sztucznej-inteligencji-ma-wdrozyc-w-polsce-ai-act)). Poland and Lithuania are the only two EU countries to have made this choice.

The catch: as of May 2026 the **Polish implementing act has not yet entered into force**. The draft was adopted by the Council of Ministers on 31 March 2026 but still has to clear the full parliamentary process ([prawo.pl, April 2026](https://www.prawo.pl/biznes/ai-act-juz-obowiazuje-co-to-oznacza-dla-firm,534568.html)). For plants this means two things:

- Obligations stemming directly from the **EU regulation** apply **from 2 August 2026** regardless of the Polish implementing act. Non-compliance = exposure to enforcement (once the Polish procedure is in place) by KRiBSI, or directly by the European Commission for GPAI matters.
- The absence of a national enforcement framework is not a defence. The Polish DPA (UODO) has already signalled that it will act on AI-related personal data matters under GDPR independently of the AI act timeline.

Practical takeaway: do not treat the missing national act as breathing room. Treat it as a window to put your own house in order before KRiBSI starts issuing first decisions (likely Q4 2026 / Q1 2027).

## Penalties and the cost of non-compliance

The thresholds in [Article 99 AI Act](https://artificialintelligenceact.eu/article/99/) — the **higher of the two** values applies:

- **Prohibited practices** (Article 5 — including social scoring, behavioural manipulation): up to **€35M or 7% of global annual turnover**.
- **Breach of high-risk obligations** (most MES scenarios): up to **€15M or 3% of turnover**.
- **Providing false or misleading information** to authorities: up to **€7.5M or 1% of turnover**.

For SMEs, Article 99 grants relief — the **lower** of the two values applies. That is real protection for most mid-sized European manufacturers.

Cost of compliance? From our OmniMES practice: **an internal conformity assessment (Annex VI) for one AI module typically takes 15–30 person-days of effort (architect, IP counsel, data scientist)**. A notified body assessment (Annex VII), where required — 6–12 weeks and €25–80k in audit fees. Compare to a single high-risk fine of 3% of turnover for a plant doing €100M revenue: €3M. The maths speaks for itself.

## What to do in the remaining ~3 months — a checklist

Realistically, you have three months until 2 August 2026. Enough time for **inventory and foundations**, not for a full conformity assessment. A sensible sequence:

1. **Inventory every MES/EMS/CMMS function that uses AI or machine learning.** The list should include: function name, model (if known), source (in-house vs vendor), description of the decision the AI supports or makes.
2. **Map each function to Annex I or Annex III** using three questions: (a) is the AI a safety component of a machine or a regulated product (Annex I)? (b) does the AI evaluate people at work or shape workforce decisions (Annex III point 4)? (c) does the AI manage critical infrastructure (Annex III point 2)?
3. **For functions flagged as high-risk** start with technical documentation and logging. That is the foundation everything else rests on. Without it there is nothing to assess.
4. **Convene a meeting with workers' representatives** for any function that monitors performance or behaviour. Article 26 requires information **before** deployment — if the system is already live, hold the consultation as soon as possible.
5. **Review your MES vendor contracts.** Who is the provider in AI Act terms? Does the vendor commit to a conformity assessment? Do you have access to the technical documentation? These are negotiated now, not after the first inspection.
6. **Appoint a single accountable person** — someone needs "AI Act compliance lead" in their job description. Without it, the initiative dissolves between IT, quality and HR.

## Closing — the inconvenient truth

The AI Act is not designed to halt automation in industry. It exists to ensure that automation making decisions about people is **transparent, auditable and controllable**. If OmniMES, SAP DM or Siemens Opcenter already logs every decision, has per-module RBAC and lets the supervisor override AI recommendations — then for most functions the AI Act requirements are more procedural than technological.

Worst-case scenario: a plant discovers in September 2026 that its operator-ranking dashboard is high-risk AI it never inventoried, never documented, and never consulted with workers' representatives. KRiBSI will not be moved by "we thought it was just an Excel with OEE." Compliance is not a project for the week before the deadline — it is a system worth building from now.

## Sources

- AI Act Service Desk — [Timeline for the Implementation of the EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act)
- EU Artificial Intelligence Act — [Article 6: Classification Rules for High-Risk AI Systems](https://artificialintelligenceact.eu/article/6/)
- EU Artificial Intelligence Act — [Annex III: High-Risk AI Systems](https://artificialintelligenceact.eu/annex/3/)
- EU Artificial Intelligence Act — [Article 17: Quality Management System](https://www.euaiact.com/article/17)
- EU Artificial Intelligence Act — [Article 26: Obligations of Deployers of High-Risk AI Systems](https://artificialintelligenceact.eu/article/26/)
- EU Artificial Intelligence Act — [Article 72: Post-Market Monitoring](https://artificialintelligenceact.eu/article/72/)
- EU Artificial Intelligence Act — [Article 99: Penalties](https://artificialintelligenceact.eu/article/99/)
- EU Artificial Intelligence Act — [Annex VI: Conformity Assessment Procedure Based on Internal Control](https://artificialintelligenceact.eu/annex/6/)
- DLA Piper — [Latest wave of obligations under the EU AI Act take effect (August 2025)](https://www.dlapiper.com/en-us/insights/publications/2025/08/latest-wave-of-obligations-under-the-eu-ai-act-take-effect)
- TÜV Rheinland — [New Machinery Regulation EU 2023/1230](https://www.tuv.com/world/en/new-machinery-regulation-eu-2023-1230.html)
- EU-OSHA — [Regulation 2023/1230/EU - machinery](https://osha.europa.eu/en/legislation/directive/regulation-20231230eu-machinery)
- Rzeczpospolita — [Government adopts the draft AI systems act (March 2026)](https://www.rp.pl/prawo-w-polsce/art44076181-rzad-przyjal-projekt-ustawy-o-systemach-sztucznej-inteligencji-ma-wdrozyc-w-polsce-ai-act)
- Prawo.pl — [Companies must comply with the AI Act despite the missing national legislation (April 2026)](https://www.prawo.pl/biznes/ai-act-juz-obowiazuje-co-to-oznacza-dla-firm,534568.html)
