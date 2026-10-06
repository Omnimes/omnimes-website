---
title: 'AI Act 15 days after 2 August 2026: what supervisors can actually check in MES — and why high-risk AI obligations moved to December 2027'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'ai-act-in-action-15-days-after-2-august-2026-what-eu-supervisors-actually-check-in-mes'
description: 'The 2 August 2026 date did not start enforcement of high-risk AI obligations. The Digital Omnibus (Regulation (EU) 2026/1744) moved them to 2 December 2027 for Annex III systems and to 2 August 2028 for Annex I. What a factory running an MES must comply with today (the workplace emotion-recognition ban, transparency duties, GDPR and DPIAs for operator monitoring), who supervises the AI Act in Poland, and how to use the time until December 2027.'
coverImage: '/images/post-ai-act-day15/cover-ai-act-day15.png'
lang: 'en'
tags: [{"value":"AI","label":"AI"},{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"aiAct","label":"AI Act"}]
publishedAt: '2026-08-17T08:00:00.000Z'
---

*Article corrected on 6 October 2026. The first version contained incorrect information about AI Act application dates and about supervisory authorities.*

**2 August 2026** was supposed to be the day high-risk AI Act obligations reached the shop floor: operator monitoring, performance evaluation, task allocation based on worker behaviour. That is what we assumed in our [May article on classifying MES functions](/blog/eu-ai-act-august-2026-which-mes-functions-qualify-as-high-risk-ai). The date no longer holds. The Digital Omnibus on AI, Regulation (EU) 2026/1744, entered into force on 27 July 2026. It moved the application of high-risk rules for Annex III systems to **2 December 2027**, and for AI embedded in products covered by Annex I to **2 August 2028** ([K&L Gates](https://www.cyberlawwatch.com/2026/07/31/eu-digital-omnibus-on-ai-enters-into-force/), [European Commission timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act)).

Fifteen days in, the answer to "what are supervisors checking" is narrower than market chatter suggested. In Poland, our worked example, neither the data protection authority (UODO) nor the consumer authority (UOKiK) is the AI market surveillance authority. That role goes to a new Commission for Artificial Intelligence Development and Security (KRiBSI), whose inspection and penalty provisions take effect only on 28 October 2026. UODO keeps supervising personal data processing under the GDPR, including by AI systems.

## The Digital Omnibus: what moved and why

The Commission tabled the proposal on 19 November 2025. Parliament and Council reached a deal on 7 May 2026, and Parliament approved it on 16 June 2026 with 423 votes in favour, 57 against and 174 abstentions ([EPRS](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf)). The regulation is dated 8 July 2026 and was published in the Official Journal on 24 July 2026 ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)).

Key changes for manufacturers:

- **Annex III** (including employment and workers management): Chapter III high-risk rules apply from 2 December 2027 instead of 2 August 2026.
- **Annex I** (AI in products covered by EU harmonisation legislation): from 2 August 2028.
- **Machinery:** AI-enabled machinery was removed from the direct applicability of the AI Act high-risk regime and follows the Machinery Regulation 2023/1230, into which the Commission will add AI requirements by delegated acts ([EPRS](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf)).
- **AI literacy (Article 4):** the duty to "ensure" sufficient staff literacy became a duty to take measures supporting it, with no specific level to be guaranteed for any individual ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)).
- **New prohibitions** on generating non-consensual intimate content and child sexual abuse material apply from 2 December 2026 ([European Commission timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act)).

Poland's Ministry of Digital Affairs explains the postponement as giving time to prepare the standards, tools and procedures needed to apply the requirements uniformly across the EU ([gov.pl, 3 August 2026](https://www.gov.pl/web/cyfryzacja/ai-act--co-sie-zmienilo-2-sierpnia-2026-roku)). The European Parliament's research service points to delays in designating national authorities and in publishing harmonised standards ([EPRS](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf)).

The substance of the high-risk obligations did not change. The deadline did.

## What already applies to a factory running an MES

### The workplace emotion-recognition ban

The Article 5 prohibitions have applied since 2 February 2025 ([LEX](https://www.lex.pl/ai-act-od-2-sierpnia-2026-r-kluczowe-wymogi-i-terminy,50129.html)). For industry the key one is Article 5(1)(f): AI systems may not be used to infer the emotions of a natural person in the workplace or in education, unless the system is intended for medical or safety reasons ([Article 5](https://artificialintelligenceact.eu/article/5/)). Prohibited practices carry fines of up to EUR 35 million or 7% of total worldwide annual turnover ([Article 99](https://artificialintelligenceact.eu/article/99/)).

The Commission's guidelines on prohibited practices, released on 4 February 2025, draw the lines ([Lewis Silkin](https://www.lewissilkin.com/insights/2025/02/17/understanding-the-eu-ai-acts-prohibited-practices-key-workplace-and-advertising-102k011)). Physical states such as fatigue or pain are not emotions, so inferring a driver's or pilot's fatigue to prevent accidents is outside the ban. The safety exception is narrow and does not cover general wellbeing: detecting stress or burnout remains prohibited. Banned examples include inferring emotions from facial expressions, posture, movements or typing patterns.

For an MES this means reviewing workstation cameras, voice analytics and any module that scores operator "engagement". If one of them infers how a worker feels, rather than a safety-relevant physical state, the problem exists today, Omnibus or not.

### Transparency duties (Article 50)

Article 50 has applied since 2 August 2026 ([European Commission timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act)). Providers must tell users when they are interacting with AI and mark generative outputs in a machine-readable format; deployers must inform people exposed to emotion recognition or biometric categorisation and disclose deepfakes ([Article 50](https://artificialintelligenceact.eu/article/50/)). Generative systems placed on the market before 2 August 2026 have until 2 December 2026 for machine-readable marking ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)). On a factory floor this mostly concerns language-model assistants for operators and maintenance; the duty sits with the provider, but the plant should check it at acceptance.

### AI literacy (Article 4)

Article 4 has applied since 2 February 2025 ([LEX](https://www.lex.pl/ai-act-od-2-sierpnia-2026-r-kluczowe-wymogi-i-terminy,50129.html)), and since 27 July 2026 in its softened form ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)). In practice: documented training for operators and shift leaders using AI modules.

### GDPR and data protection impact assessments

Operator monitoring is first of all personal data processing, where the data protection authority has full powers. UODO states that a system monitoring employees' working time and the flow of information in their work tools requires a data protection impact assessment (DPIA). As a rule, a DPIA is needed when processing meets at least two criteria from the list in the UODO President's communication of 17 June 2019 ([UODO](https://uodo.gov.pl/pl/598/3617)).

On 16 July 2026 the President of UODO, Mirosław Wróblewski, asked the labour ministry to draft rules protecting job candidates and employees from discrimination caused by AI, arguing that AI systems carry a serious risk of reproducing biases present in training data. UODO also stresses that the AI Act fundamental rights impact assessment is meant to complement the DPIA, not replace it ([UODO](https://uodo.gov.pl/pl/138/4493)).

We found no public information about AI Act requests from UODO or UOKiK to manufacturing plants. They would have no basis today: the high-risk rules do not yet apply, and neither office is the AI market surveillance authority.

## Who supervises the AI Act in Poland

The Sejm passed the Act on artificial intelligence systems on 11 June 2026 by 421 votes to 3, with 18 abstentions ([rp.pl](https://www.rp.pl/prawo-w-polsce/art44606901-sejm-przyjal-ustawe-o-sztucznej-inteligencji-komisja-ds-ai-i-piaskownice-regulacyjne-dla-firm)) and accepted 24 of 25 Senate amendments on 3 July ([CyberDefence24](https://cyberdefence24.pl/polityka-i-prawo/polska/koniec-parlamentarnych-prac-nad-ustawa-o-sztucznej-inteligencji-czas-na-ruch-prezydenta)). President Karol Nawrocki signed it on 24 July ([CyberDefence24](https://cyberdefence24.pl/polityka-i-prawo/polska/prezydent-podpisal-ustawe-o-systemach-ai)). The Act of 3 July 2026 (Journal of Laws 2026, item 1003, published 27 July) entered into force on 11 August 2026 ([ELI](https://eli.gov.pl/eli/DU/2026/1003/ogl/pol)).

Key provisions ([full text](https://api.sejm.gov.pl/eli/acts/DU/2026/1003/text.pdf)):

- **Market surveillance authority.** KRiBSI is the sole market surveillance authority and the single point of contact (Article 5). It consists of a chair, two deputies and four members nominated by the President of UOKiK, the Polish Financial Supervision Authority, the National Broadcasting Council and the President of UKE, the telecoms regulator (Article 19).
- **UODO, UOKiK and CSIRT NASK** cooperate with KRiBSI on defined matters (Article 20): UODO on personal data, UOKiK and other product market surveillance authorities on matters under Article 74(1) to (5) of the AI Act, and the CSIRT teams on incident information. The data protection act now states this cooperation explicitly (Article 123).
- **Timing.** Provisions on inspections, proceedings, settlements, penalties and individual opinions enter into force on 28 October 2026 (Article 127). Deputy Digital Affairs Minister Dariusz Standerski told Rzeczpospolita that the chair would be in place in October and the commission would start operating in November ([rp.pl, 24 July 2026](https://www.rp.pl/prawo-w-polsce/art44882741-polska-komisja-ds-ai-rozpocznie-prace-w-listopadzie)).
- **Fines.** The Act sets no amounts of its own. KRiBSI applies Chapter XII of the AI Act, converting euro amounts into zloty at the National Bank of Poland rate of 28 January each year (Article 104). The AI Act ceilings: EUR 35 million or 7% of turnover for prohibited practices, EUR 15 million or 3% for most other infringements, EUR 7.5 million or 1% for misleading information to authorities; for SMEs, the lower of the two ([Article 99](https://artificialintelligenceact.eu/article/99/)).
- **Mitigation.** A settlement with KRiBSI can cut a fine by 20 to 70%, or by 30 to 90% where proceedings started from the infringer's own disclosure (Articles 70(6) and 84). Carrying out the measures in a warning within three months of the fining decision can reduce the fine by 10 to 50% (Article 107).
- **Individual opinions.** A request costs PLN 150, and KRiBSI must answer within 30 days, or 60 days in particularly complex cases (Articles 11 and 12).
- **Fundamental rights bodies (AI Act Article 77).** The ministry has designated the Ombudsman for Children, the Patient Ombudsman and the National Labour Inspectorate (from 2 November 2024) and the President of UODO (from 9 May 2025). They may access high-risk AI documentation where needed for their mandates ([gov.pl](https://www.gov.pl/web/cyfryzacja/wykaz-organow-i-instytucji-publicznych-w-polsce-z-obszaru-ochrony-praw-podstawowych-w-rozumieniu-rozporzadzenia-20241689-akt-o-sztucznej-inteligencji)).

## Data: how widely Polish companies use AI

According to Statistics Poland (GUS), 8.7% of enterprises reported using AI in 2025, up from 5.9% a year earlier. Among large enterprises the share was 42.0%, and in manufacturing 7.8%. AI in the production process was used by 2.6% of enterprises. The most common way to acquire AI was buying a ready-to-use commercial solution, reported by 6.4% of firms ([GUS, Information society in Poland in 2025](https://stat.gov.pl/files/gfx/portalinformacyjny/pl/defaultaktualnosci/5497/1/19/1/spoleczenstwo_informacyjne_w_polsce_2025.pdf)).

Our reading: since most AI-using companies buy off-the-shelf systems, most plants will be AI Act **deployers**, not providers, which changes what they must do.

The Polish state's spending cap for implementing the Act is PLN 9.30 million in 2026 and PLN 23.74 million in 2027 (Article 126 of the [Act](https://api.sejm.gov.pl/eli/acts/DU/2026/1003/text.pdf)).

## Provider or deployer: who owes what from 2 December 2027

**Providers** draw up the Annex IV technical documentation (Article 11) and must design the system so that it technically allows automatic recording of events over its lifetime ([Article 12](https://artificialintelligenceact.eu/article/12/)). A plant that only uses a purchased system does not write that documentation.

**Deployers** have their own duties under [Article 26](https://artificialintelligenceact.eu/article/26/):

- use the system according to the provider's instructions;
- assign human oversight to people with the necessary competence, training and authority;
- ensure input data under their control is relevant and sufficiently representative;
- monitor operation and inform the provider of risks;
- keep automatically generated logs for at least six months, unless other law provides otherwise (paragraph 6);
- inform workers' representatives and affected workers before workplace use (paragraph 7);
- use the provider's information for the DPIA (paragraph 9).

A plant becomes a **provider** if it puts its name or trademark on a high-risk system, makes a substantial modification, or changes a system's intended purpose so that it becomes high-risk ([Article 25](https://artificialintelligenceact.eu/article/25/)), which matters for plants building or heavily reworking AI modules.

**The fundamental rights impact assessment (FRIA, Article 27)** does not apply to every deployer. It covers bodies governed by public law, private entities providing public services, and deployers of Annex III point 5(b) and (c) systems, that is creditworthiness assessment and life and health insurance pricing ([Article 27](https://artificialintelligenceact.eu/article/27/)). A typical private manufacturer does not need one, but the GDPR DPIA still applies; after the Omnibus, a FRIA may cross-reference a DPIA ([nicfab](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/)).

**Which MES functions may be high-risk.** Annex III point 4(b) covers AI used to make decisions affecting terms of work relationships, promotion or termination, to allocate tasks based on individual behaviour or personal traits, or to monitor and evaluate performance and behaviour ([Annex III](https://artificialintelligenceact.eu/annex/3/)). Article 6(3) carves out systems that pose no significant risk, including by not materially influencing the outcome of decision making, but a system that profiles natural persons is always high-risk ([Article 6](https://artificialintelligenceact.eu/article/6/)).

**What counts as an AI system at all.** Under the Commission guidelines on the AI system definition (C(2025) 5053), systems improving mathematical optimisation, such as linear or logistic regression methods, fall outside the definition (paragraph 42), as do simple prediction systems based on a basic statistical rule such as the mean (paragraph 49). The guidelines are not binding; the Court of Justice has the final word (paragraph 7) ([European Commission](https://ai-act-service-desk.ec.europa.eu/sites/default/files/2025-08/commission_guidelines_on_the_definition_of_an_artificial_intelligence_system_established_by_regulation_eu_20241689_ai_actenglish_nf2skcqfrtjdfggjavcodopcwz4_112455.PDF)). Our assessment: failure prediction on machine data that does not evaluate people usually falls outside Annex III, even when it is an AI system.

## Barriers and limitations

**No harmonised standards yet.** This is the main reason for the delay. A plant preparing now works from the regulation's text, not finished standards, and the boundaries of the AI system definition and the emotion-recognition ban rest on non-binding Commission guidelines.

**An institutional gap.** According to the ministry, KRiBSI should start work in November 2026. Until then no body issues individual opinions.

**Fixed dates, not conditional ones.** The Commission had proposed tying application to the availability of standards, with 2 December 2027 as the latest date for Annex III. The co-legislators chose fixed deadlines ([EPRS](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf)), so December 2027 holds whether or not the standards are ready.

**Overlapping rules.** An operator-monitoring module falls under the AI Act, the GDPR and labour law at once, and the infrastructure it runs on under cybersecurity rules as well (see our [article on NIS2 and the Polish KSC act](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory)).

**Customers may move faster than the law.** The Mercedes-Benz February 2026 awareness package asks suppliers to build awareness of technical compliance risks, including AI-related ones, and to document them objectively and transparently ([Mercedes-Benz](https://docmaster.supplier.mercedes-benz.com/DMPublic/en/doc/ALD00001630.2026-02.EN.pdf)). For an automotive supplier, customer questions may arrive before any inspection.

## What it means for a plant: a 15-month plan

The plan below is **our recommendation**, not a legal requirement.

**Stage 1 — by the end of October 2026**

1. Inventory MES modules and connected systems using machine learning or language models: people or machines, provider or deployer?
2. Check against Article 5(1)(f): does any function infer workers' emotions?
3. Carry out a DPIA for operator monitoring if missing.
4. Document training for users of AI modules (Article 4).

**Stage 2 — first half of 2027**

5. Classify functions against Annex III point 4 and Article 6(3), with a written rationale for every function treated as not high-risk.
6. Update supplier contracts: instructions for use, information needed for the DPIA, access to logs.
7. Appoint the people responsible for human oversight.

**Stage 3 — second half of 2027**

8. Run an AI decision log with retention of at least six months.
9. Inform workers' representatives and workers before 2 December 2027.
10. Update the DPIA using the provider's information.

**What an MES should be able to do** (our assessment, based on Articles 12 and 26). For every AI recommendation or decision concerning people, record the time, model version, input reference, model output, action taken and who approved or rejected it. Retention should be configurable and at least six months, records exportable on an authority's request, and AI suggestions clearly marked in the interface.

High-risk AI obligations start in December 2027, not August 2026. The emotion-recognition ban, transparency duties and the GDPR apply now.

## Update (6 October 2026)

- On 18 September 2026 the Sejm appointed Pamela Krzypkowska, previously director of the Research and Innovation Department at the Ministry of Digital Affairs, as chair of KRiBSI, with 271 votes in favour, 24 against and 140 abstentions ([rp.pl](https://www.rp.pl/prawo-w-polsce/art45159621-sejm-powolal-pamele-krzypkowska-na-szefowa-komisji-rozwoju-i-bezpieczenstwa-ai)). The Senate consented on 24 September 2026 ([wnp.pl](https://www.wnp.pl/rynki/senat-za-powolaniem-pameli-krzypkowskiej-na-szefowa-komisji-rozwoju-i-bezpieczenstwa-ai,1102315.html)).
- The inspection and penalty provisions of the Polish Act take effect on 28 October 2026 (Article 127).
- The first version described requests from data protection and consumer authorities to plants, a statement by the "head of the Digital Market Department at UODO", parallel activity in other member states and a PLN 5 million penalty cap. We could not confirm any of this: UODO has no such department ([UODO](https://uodo.gov.pl/pl/p/o-nas)), and the Act refers to the fines in Article 99 of the AI Act. We have removed that content.

---

## Sources

- [EPRS, Digital Omnibus on AI (briefing)](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/782651/EPRS_BRI%282026%29782651_EN.pdf) — legislative timeline, Parliament vote, new dates, machinery, reasons for delay
- [K&L Gates, EU Digital Omnibus on AI Enters Into Force](https://www.cyberlawwatch.com/2026/07/31/eu-digital-omnibus-on-ai-enters-into-force/) — Regulation 2026/1744, publication 24 July 2026, entry into force 27 July 2026, new dates
- [nicfab, Digital Omnibus on AI in the Official Journal](https://www.nicfab.eu/en/posts/digital-omnibus-ai-official-journal/) — date of the regulation, changes to Articles 4, 27 and 50
- [European Commission, AI Act implementation timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act) — 2 August 2026, 2 December 2026, 2 December 2027, 2 August 2028
- [Ministry of Digital Affairs, AI Act — what changed on 2 August 2026 (in Polish)](https://www.gov.pl/web/cyfryzacja/ai-act--co-sie-zmienilo-2-sierpnia-2026-roku) — new dates and rationale
- [LEX, AI Act from 2 August 2026 (in Polish)](https://www.lex.pl/ai-act-od-2-sierpnia-2026-r-kluczowe-wymogi-i-terminy,50129.html) — prohibitions and Article 4 applicable since 2 February 2025
- AI Act text: [Article 5](https://artificialintelligenceact.eu/article/5/), [Article 6](https://artificialintelligenceact.eu/article/6/), [Article 12](https://artificialintelligenceact.eu/article/12/), [Article 25](https://artificialintelligenceact.eu/article/25/), [Article 26](https://artificialintelligenceact.eu/article/26/), [Article 27](https://artificialintelligenceact.eu/article/27/), [Article 50](https://artificialintelligenceact.eu/article/50/), [Article 99](https://artificialintelligenceact.eu/article/99/), [Annex III](https://artificialintelligenceact.eu/annex/3/)
- [Commission Guidelines on the definition of an AI system, C(2025) 5053](https://ai-act-service-desk.ec.europa.eu/sites/default/files/2025-08/commission_guidelines_on_the_definition_of_an_artificial_intelligence_system_established_by_regulation_eu_20241689_ai_actenglish_nf2skcqfrtjdfggjavcodopcwz4_112455.PDF) — paragraphs 7, 42 and 49
- [Lewis Silkin, Commission guidelines on prohibited practices](https://www.lewissilkin.com/insights/2025/02/17/understanding-the-eu-ai-acts-prohibited-practices-key-workplace-and-advertising-102k011) — workplace emotion recognition, fatigue, safety exception
- [Polish Act of 3 July 2026 on artificial intelligence systems, Journal of Laws 2026 item 1003 (text, in Polish)](https://api.sejm.gov.pl/eli/acts/DU/2026/1003/text.pdf) and [ELI record](https://eli.gov.pl/eli/DU/2026/1003/ogl/pol)
- [rp.pl, Sejm passes the AI act (in Polish)](https://www.rp.pl/prawo-w-polsce/art44606901-sejm-przyjal-ustawe-o-sztucznej-inteligencji-komisja-ds-ai-i-piaskownice-regulacyjne-dla-firm) — vote of 11 June 2026
- [CyberDefence24, end of parliamentary work](https://cyberdefence24.pl/polityka-i-prawo/polska/koniec-parlamentarnych-prac-nad-ustawa-o-sztucznej-inteligencji-czas-na-ruch-prezydenta) and [presidential signature](https://cyberdefence24.pl/polityka-i-prawo/polska/prezydent-podpisal-ustawe-o-systemach-ai) (in Polish)
- [rp.pl, Polish AI commission to start in November (in Polish)](https://www.rp.pl/prawo-w-polsce/art44882741-polska-komisja-ds-ai-rozpocznie-prace-w-listopadzie) — Deputy Minister Dariusz Standerski
- [Ministry of Digital Affairs, list of Article 77 fundamental rights bodies (in Polish)](https://www.gov.pl/web/cyfryzacja/wykaz-organow-i-instytucji-publicznych-w-polsce-z-obszaru-ochrony-praw-podstawowych-w-rozumieniu-rozporzadzenia-20241689-akt-o-sztucznej-inteligencji)
- [UODO, AI in employment needs regulation, 16 July 2026 (in Polish)](https://uodo.gov.pl/pl/138/4493)
- [UODO, When is a DPIA required? (in Polish)](https://uodo.gov.pl/pl/598/3617)
- [UODO, About us — organisational structure (in Polish)](https://uodo.gov.pl/pl/p/o-nas)
- [GUS, Information society in Poland in 2025 (in Polish)](https://stat.gov.pl/files/gfx/portalinformacyjny/pl/defaultaktualnosci/5497/1/19/1/spoleczenstwo_informacyjne_w_polsce_2025.pdf) — AI use in enterprises
- [Mercedes-Benz, tCMS awareness package for suppliers (February 2026)](https://docmaster.supplier.mercedes-benz.com/DMPublic/en/doc/ALD00001630.2026-02.EN.pdf)
- [rp.pl, Sejm appoints Pamela Krzypkowska](https://www.rp.pl/prawo-w-polsce/art45159621-sejm-powolal-pamele-krzypkowska-na-szefowa-komisji-rozwoju-i-bezpieczenstwa-ai) and [wnp.pl (PAP), Senate consent](https://www.wnp.pl/rynki/senat-za-powolaniem-pameli-krzypkowskiej-na-szefowa-komisji-rozwoju-i-bezpieczenstwa-ai,1102315.html) (in Polish)
