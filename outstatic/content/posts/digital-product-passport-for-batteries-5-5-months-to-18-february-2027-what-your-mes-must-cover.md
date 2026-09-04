---
title: 'Digital Product Passport for batteries: 5.5 months to 18 February 2027 — what your MES must cover (lessons from the first EU pilots)'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'digital-product-passport-for-batteries-5-5-months-to-18-february-2027-what-your-mes-must-cover'
description: 'On 18 February 2027 the Digital Product Passport obligation goes live for industrial batteries above 2 kWh and EV batteries (Regulation 2023/1542). Five and a half months is not much time — OEM suppliers (Volkswagen, Stellantis, BMW) are already, from August 2026, asking sub-suppliers for MES-side data readiness. This piece gathers what the DPP must contain in detail, the role of MES in that structure, lessons from the first 12 EU pilots (Battery Pass Consortium, Circulor/Volvo, ACC, Verkor), and a concrete 5.5-month roadmap for a European battery plant.'
coverImage: '/images/post-dpp-batteries/cover-dpp-batteries.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"dpp","label":"DPP"}]
publishedAt: '2026-08-31T08:00:00.000Z'
---

On 18 February 2027 the first hard Digital Product Passport deadline in the European Union goes live. Category: industrial batteries above 2 kWh and batteries for electric vehicles. Legal basis: [Regulation 2023/1542 on batteries](https://eur-lex.europa.eu/eli/reg/2023/1542/oj), Article 77 (battery passport). Five and a half months remain to the start date. Contrary to widespread opinion — that is not much time, and it is not just about battery producers. Sub-suppliers of anodes, cathodes, casings, connectors, battery management systems (BMS) must have MES-side data ready to pass to OEMs by November 2026 at the latest, so the OEM can compile the DPP for the first batch of batteries produced after 18 February.

This piece gathers what specifically must be in a battery DPP, what the data architecture looks like (over ninety mandatory fields, some competitively sensitive), what the first pilots in Battery Pass Consortium and at Circulor/Volvo showed, and a realistic 5.5-month roadmap for a European plant. No marketing — with concrete regulation citations and a real list of items a MES must cover.

## Who is in scope from 18 February 2027 — three categories

Regulation 2023/1542 splits batteries into five categories (Art. 3(9-13)). The Digital Product Passport obligation from 18 February 2027 covers three of them:

**LMT batteries (Light Means of Transport)** — batteries for light means of transport: electric bikes, electric scooters, electric mopeds. No lower capacity limit. European producers: Bosch eBike Systems, Yamaha Motor Europe, plus many private importers.

**Industrial batteries above 2 kWh** — stationary batteries (energy storage, industrial UPS), forklift batteries, batteries for AGVs and mobile robots. The 2 kWh threshold eliminates small tool batteries and office UPS. Europe has a strong position here: plants across Germany, France, Sweden, and Central Europe including Impact Clean Power Technology (Poland), Solaris Bus & Coach (Poland, batteries for electric buses), Northvolt legacy lines in Skellefteå (Sweden — uncertain status after November 2024 bankruptcy).

**Electric vehicle (EV) batteries** — all batteries for passenger cars, trucks and electric buses. This is the biggest category by volume in Europe — LG Energy Solution Wrocław (55 GWh annual production), SK On Dąbrowa Górnicza (Poland, planned expansion to 30 GWh), Verkor Dunkerque (France, 16 GWh), ACC (Automotive Cells Company, France/Germany joint venture Stellantis-Mercedes-TotalEnergies).

**Who is not in scope yet**: portable batteries (for consumer electronics, power tools) get DPP only from 18 August 2028. Batteries for aviation and space are entirely excluded (Art. 1(5)).

## What specifically must be in a battery DPP — data structure

Article 77 of the regulation defines the DPP framework, and the detailed data model is defined by a European Commission implementing act (adopted in April 2026, published as Regulation (EU) 2026/425 of 3 April). The model splits data into six areas:

**Area 1 — General product information** (10 mandatory fields): unique battery identifier (UID), producer, model, production date, category, weight, dimensions, chemistry (Li-NMC, LFP, LTO, sodium-ion, etc.), nominal capacity, nominal voltage.

**Area 2 — Carbon footprint** (12 fields, split by lifecycle stage): raw-material extraction emissions, cell production emissions, pack assembly emissions, transport emissions, carbon-footprint class (A–G, following the energy-label pattern), calculation method (PEFCR — Product Environmental Footprint Category Rules), verification year, reference unit (kg CO₂-eq/kWh of energy delivered over the full life cycle).

**Area 3 — Materials and chemical composition** (30+ fields): full list of substances in the battery, split by active cathode materials, anode, electrolyte, separator, casing. For critical raw materials (cobalt, lithium, nickel, natural graphite) — minimum share of recycled materials (from 2031 mandatory thresholds; in 2027 report-only without thresholds).

**Area 4 — Operational data (for EV and industrial >2 kWh)** — data recorded by the BMS during operation: State of Health (SoH), number of charge cycles, operating temperatures, depth of discharge. This is data that **must be updated over the life of the battery**, not only at the moment of production.

**Area 5 — Compliance and certification** (15 fields): producer identifier (EORI), CE compliance numbers, certificates from notified body, REACH and RoHS declarations of conformity, list of tested safety standards (UN 38.3, IEC 62660, etc.).

**Area 6 — End-of-life and second life** (15 fields): disassembly instructions, second-use capability (repurposing for stationary storage), hazardous-material disposal instructions, network of authorised recyclers, producer contact for EPR (Extended Producer Responsibility).

In total — over 90 mandatory fields plus 30+ optional. For comparison, current battery labelling requirements (Directive 2006/66/EC) had fewer than 10 fields. The scale-up is over 10x.

## The MES role — the source of data that cannot be reconstructed later

An analysis of DPP fields shows a clear split between data that can be added after the fact (technical model data, chemistry, dimensions) and data that **the MES must record during production, because later it cannot be reconstructed**. The second category is critical:

**Carbon footprint per cell** — must be calculated from actual plant-line energy consumption, not from averages. That means the MES must record exact kWh consumption per cell batch, link it with the energy mix on the day of production (data from the energy supplier plus PPA plus guarantee-of-origin certificates), and divide by the number of cells in the batch. Without MES integration with the plant's energy system — there is no way to calculate this.

**Batch genealogy and raw-material traceability** — for each cell you must know from which lithium batch, which cobalt batch, which copper batch it was made. This requires recording in MES the raw-material batch ID at every step where the qualifier changes (mixing powders, coating, cutting electrodes, cell assembly). Standard: [ISA-95 batch genealogy](https://www.isa.org/standards-and-publications/isa-standards/isa-95). For batteries this practically means at least 15 full genealogy records per cell — from raw material to final assembly.

**Process parameters that affect SoH** — formation cycling length, temperatures during electrode drying, calendering pressure, humidity during assembly. This data affects later battery degradation and must be shared with second-life operators and recyclers.

**Quality measurements** — QC results for every critical operation (electrode thickness, adhesion, initial electrochemical tests, EIS — Electrochemical Impedance Spectroscopy). In practice this means integrating MES with a LIMS (Laboratory Information Management System) and archiving results for a 10-year retention period (Art. 77(5) retention obligation).

For example — LG Energy Solution's Wrocław plant produces about 15 million cells per month. Each cell requires recording at least 200 production data points. That is 3 billion data points per month from just one plant, requiring 10-year archival and DPP-API accessibility. Without a time-series-based MES architecture (like [TimescaleDB in OmniMES](/blog/timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day)) — unrealistic.

## Lessons from the first 12 EU pilots — what actually works

The most practical experience comes from **Battery Pass Consortium** — a consortium funded by the German Ministry of Economic Affairs (BMWK), gathering 11 firms: BASF, BMW, Umicore, TWAICE, Circulor, VDE, iPoint, TÜV Rheinland, DEKRA, Fraunhofer IPK and Systemiq. The pilot ran from 2022 to 2024, results published in the [Battery Passport Content Guidance v1.0](https://thebatterypass.eu) report in April 2023 and updated as v2.0 in March 2025.

Three most important lessons from Battery Pass:

**Lesson 1 — competitively sensitive data must be split across access levels.** The DPP requires sharing data with the producer, distributor, end user, recycler, supervisory authority. But not every level sees everything. Carbon footprint per cell (split by stage) is commercial information — competitors can figure out your energy mix and process efficiency. Battery Pass proposed a five-level structure: public (visible to anyone with the QR code), semi-public (suppliers and customers), technical (service, recyclers), regulatory (supervisory authority only), full (producer only). The MES must support multi-tier APIs instead of a single endpoint.

**Lesson 2 — data decentralisation is a requirement, not an option.** Battery Pass stated clearly: a central EU database for DPP does not scale at 300 million batteries per year (CATL/BloombergNEF forecast for 2027). Solution: the producer stores the data in its own infrastructure, the DPP is just an address (URL/URI) in the QR code that redirects to the producer's server. Consequence for MES: the plant must have its **own DPP endpoint** — not just send data to some central database, but host it for 10 years with 99.5% availability guarantee (obligation from Art. 77(8)).

**Lesson 3 — synchronisation between the cell producer and the pack producer is the biggest bottleneck.** In a typical structure: plant A produces cells, plant B assembles cells into modules, plant C assembles modules into packs, OEM D installs packs in cars. Four different companies, four different MES, four different tracking systems. The DPP requires merging data from all four under one identifier — without the risk of duplicates and conflicts. Battery Pass proposed a standard based on [GS1 Digital Link](https://www.gs1.org/standards/gs1-digital-link) plus blockchain notarisation for integrity verification (Circulor Technology).

## The Circulor / Volvo pilot — first DPPs in serial production

**Circulor** (a British critical-raw-material tracking firm) plus **Volvo Cars** ran between 2022–2024 the first full DPP deployment in serial production — for batteries in the Volvo EX90 (electric SUV). Volvo published results at the [Circular Materials Conference 2025](https://www.circularmaterialsconference.com) in Gothenburg.

Key numbers from the Volvo pilot:

- **9 months** — from the decision to deploy DPP to the first vehicle with a full passport (March 2023 → December 2023)
- **11 sub-suppliers** in the chain had to integrate with the Circulor platform (cobalt from the DRC, lithium from Australia and Chile, nickel from Indonesia and Australia, graphite from Norway, aluminium from Norway, LG Chem cathode, Northvolt casing, etc.)
- **EUR 4.2 million** — deployment cost on Volvo's side (excluding supplier-side costs)
- **63 data fields** in the first DPP version (fewer than the regulatory requirement, being a pilot)
- **97.8%** — data completeness achieved after 12 months from launch
- **2.3%** — gaps mostly from suppliers of smaller components (gaskets, connectors) without digital documentation

Volvo publicly stated that the biggest challenge was not the data model or technology, but **convincing suppliers from Asia to share carbon-footprint data**. Three Chinese suppliers initially refused, arguing that this was commercial information. Ultimately Volvo had to propose a tiered access model (aligned with the Battery Pass recommendation) and sign an NDA with each supplier separately.

For European battery plants the lesson is clear: **negotiations with Asian suppliers will take at least 3–6 months**. If you do not start in August 2026, you will not make it by February 2027.

## Barriers — what is still not ready

An honest assessment: 5.5 months to launch, and the list of gaps in the DPP ecosystem is long.

**No reference technical implementation.** The European Commission published the data model but there is no official technical implementation (open-source SDK for producers). Battery Pass Consortium released the [Battery Pass Reference Implementation](https://github.com/batterypass) in March 2025, but it is a prototype, not production-ready. Producers must either pay for commercial solutions (Circulor, iPoint, TWAICE — EUR 200-500k annually) or build their own from scratch.

**No common standard for cell identifier.** The regulation says "unique identifier" but does not specify the format. GS1 promotes GS1 Digital Link, GS1 SGTIN, Battery Pass promotes its own format. This is a fragmentation risk — if different OEMs demand different formats, sub-suppliers will have to support several in parallel.

**Incompleteness of implementing act for second-life cells.** The regulation assumes that a second-life battery (e.g. from an EV to a stationary storage) gets a new DPP, but the procedure to hand data from the first DPP to the second has not yet been detailed. The Commission promises an implementing act in Q1 2027 — that is after the start of the obligation.

**Sanction risk unknown.** Art. 92 of the regulation only says "sanctions must be effective, proportionate and dissuasive". Member states define specific rates. Poland's draft implementing act (not yet adopted as of August 2026) introduces sanctions up to 4% of global annual turnover — that is GDPR level, much higher than current fines for environmental directives.

## 5.5-month roadmap for a European battery plant

A realistic schedule for a cell or pack producer who has not yet started DPP deployment:

**September 2026 (Month 1): data audit.** Check which of the 90+ DPP fields you already record in MES, which you do not have at all, which you have in non-extractable formats (Excel, manual entries). Audit result — a one-page map: DPP field → data source → readiness level (0-100%).

**October 2026 (Month 2): architectural decision.** DPP platform choice: own or commercial (Circulor, iPoint, TWAICE). For a cell producer below 5 GWh annually — commercial almost always more cost-effective than building your own. For above 5 GWh — building your own starts becoming economically justified (licence cost vs development cost).

**November 2026 (Month 3): MES ↔ DPP platform integration.** Extending the MES to record missing fields (most often: exact energy consumption per batch, full raw-material genealogy 4 levels deep into the chain, LIMS integration for QC results). Deploying API adapters to the DPP platform.

**December 2026 (Month 4): pilot on one line.** Selecting one production line (preferably with stabilised production, not prototype) and running it through the full DPP cycle: data recording in MES → transfer to platform → QR-code generation → validation by an external audit firm (TÜV, DEKRA). Target: data completeness above 95% by end of month.

**January 2027 (Month 5): scaling to all lines and final tests.** Extending to all production lines. Load testing DPP APIs (whether the platform holds up under production peak). Final verification with OEMs (if you are a sub-supplier — Volkswagen, Stellantis, BMW have their own DPP supplier validation procedures).

**February 2027 (Month 6): production with full DPP.** On 18 February the first battery with a full DPP comes off the line. From that date every produced battery must have a DPP.

**After 18 February 2027**: obligation to maintain the DPP for 10 years, update operational data (SoH from BMS) over the full battery lifecycle, handle queries from recyclers and second-life operators.

## What it means for European industry

Europe has around thirty gigawatt-scale battery plants (Germany, France, Poland, Sweden, Hungary) plus 400+ component sub-suppliers. Real DPP deployment demand in Europe by February 2027 — well above 500 projects.

Plants that started in Q1 2026 are today in pilot testing and will comfortably meet the deadline. Plants starting in September 2026 will hit the deadline in emergency mode. Plants starting in November 2026 or later — most likely will not make it, and the first batches produced after 18 February will sit in warehouses (unsellable in the EU) until the DPP is completed.

For European MES integrators this is a business window of EUR 500 million to 1 billion in the next 12 months (average DPP deployment project in the mid-segment: EUR 300-500k including licences). For battery producers it is a hard regulatory deadline without a transition period — the Commission stated clearly in a July 2026 communication that no extension is planned.

Batteries are the first product category with a DPP obligation. Next in line: textiles (2028), consumer electronics (2029), furniture (2030), full ESPR scope by 2032. Experience from battery DPP will set the standard for the whole cycle. It is worth building the competence in-house rather than only buying an external service — in three years the same requirements will hit all the other manufacturing sectors.

---

## Sources

- [Regulation 2023/1542 on batteries](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) — Art. 77 (Digital Product Passport), Art. 92 (sanctions)
- [Regulation (EU) 2026/425 — implementing act for battery DPP](https://eur-lex.europa.eu) — detailed data model (April 2026)
- [Battery Pass Consortium — Content Guidance v2.0](https://thebatterypass.eu) — BMWK-funded consortium, DPP data standard
- [Global Battery Alliance — Battery Passport Pilot](https://www.globalbattery.org) — Volvo pilot (2022–2023)
- [Circulor — Volvo EX90 case study](https://www.circulor.com) — first full DPP deployment in serial production
- [GS1 Digital Link](https://www.gs1.org/standards/gs1-digital-link) — product identifier standard in DPP
- [ISA-95 batch genealogy](https://www.isa.org/standards-and-publications/isa-standards/isa-95) — batch genealogy data model in MES
- BloombergNEF — Long-Term Electric Vehicle Outlook 2026 — forecast of 300 million EV batteries annually in 2027
- [Our article: TimescaleDB in OmniMES](/blog/timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day) — database architecture for high-scale process data
- [Our article: NIS2 and the Polish KSC2 Act in 2026](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) — cybersecurity regulatory context for DPP infrastructure
- [OmniMES — traceability module documentation](https://docs.omnimes.com)
