---
title: 'Digital Product Passport (DPP) enters the factory: ESPR and Battery Regulation 2027 — what MES must deliver by February'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'digital-product-passport-dpp-enters-the-factory-espr-and-battery-regulation-2027-what-mes-must-deliver-by-february'
description: 'On 18 February 2027 the battery passport becomes mandatory for EV batteries, industrial batteries above 2 kWh, and LMT batteries — the first concrete moment when the Digital Product Passport (DPP) turns from EU concept into a hard production requirement. For an MES, this means exposing roughly seventeen attributes per unit: material origin, carbon footprint, recycled content, batch ID, durability, cell health data. This article walks through ESPR (2024/1781) and the Battery Regulation (2023/1542) without fluff: which MES functions already produce the data, what is missing, how to wire it up architecturally with GS1 Digital Link, and what to do in the nine months left before the deadline.'
coverImage: '/images/post-dpp-mes/cover-dpp-mes.png'
lang: 'en'
tags: [{"value":"ue","label":"UE"},{"value":"omniMES","label":"OmniMES"},{"value":"dpp","label":"DPP"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-05-11T08:00:00.000Z'
---

**18 February 2027** is the date most European battery, electronics, steel, and textile manufacturers should already have on their compliance calendar. On that day, under Article 77 of the [Battery Regulation 2023/1542](https://eur-lex.europa.eu/eli/reg/2023/1542/oj), the [Digital Product Passport (DPP)](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) becomes mandatory for every industrial battery above 2 kWh, every EV battery, and every battery for Light Means of Transport (LMT — e-scooters, e-bikes). Without a passport, the product cannot be placed on the EU market. Article 25 of the [ESPR 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) gives market surveillance authorities the power to ban distribution, and member states define the administrative penalties (Germany — up to **4% of annual turnover** for serious breaches, [Bundesnetzagentur 2025](https://www.bundesnetzagentur.de/EN/Areas/Energy/Companies/SecurityOfSupply/Battery_Regulation/start.html)).

For the world of MES, ERP and PLM, this is not an abstract ESG topic. It is a concrete data requirement — about seventeen attributes per unit of product, exposed through a public URL behind a QR code printed on the casing. If your MES today does not produce that data in a structure linked to the batch ID, you have nine working months to catch up. Below: what each regulation requires, which MES functions already deliver it, where the gaps usually are, and what to do in the months remaining.

## Two regulations, one mechanism — ESPR and Battery Regulation

ESPR (Ecodesign for Sustainable Products Regulation, **2024/1781**) entered into force on **18 July 2024** and establishes a generic framework for all products placed on the EU market. Through delegated acts, the European Commission will gradually add specific product groups: textiles (2026–2027), iron and steel (2026), ICT electronics (2027), tyres, furniture, detergents, paints. Each group gets its own detailed attribute set. The Commission's [Ecodesign Working Plan 2025–2030, March 2025](https://commission.europa.eu/news/working-plan-ecodesign-and-energy-labelling-2025-2030-2025-04-16_en) lists **six priority groups with a full DPP by 2027 or 2028**.

The Battery Regulation (**2023/1542**) is the pioneer in this mechanism — it came into force earlier (February 2024) and carries its own hard date: **18 February 2027**. It covers:

- **Electric vehicle batteries** of all types,
- **Industrial batteries above 2 kWh** (realistically: every battery in energy storage, mobile automation, AGV systems),
- **Light Means of Transport (LMT) batteries** above 25 V — e-scooters, e-bikes,
- with **exclusions** for starter batteries in combustion-engine cars and small consumer power tools.

For a manufacturer this distinction matters: if you build batteries for AGV robots, energy storage, or EVs, you are in scope. If you sell AA cells, you are not.

## What goes into the DPP — the seventeen attributes of Annex XIII

[Annex XIII of the Battery Regulation](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) lists the information groups required in the battery passport. Mapping that to MES/PLM language, it is roughly:

**Static data (per product model):**
1. **Manufacturer** — full identification, EORI, EPR registration number
2. **Cell chemistry** — LFP, NMC, NCA, sodium-ion (the key for life-cycle treatment)
3. **Cell material composition** — critical substances per [CRMA](https://eur-lex.europa.eu/eli/reg/2024/1252/oj), recycled-content percentage per metal (Co, Li, Ni, Pb)
4. **Carbon footprint (CFP)** — kg CO₂-eq per kWh of capacity, third-party verified
5. **Compliance status** — certificates, CE declarations, EU type-examination
6. **Functional classification** — EV, LMT, industrial, plus voltage and capacity ranges
7. **Technical documentation** — installation manual, safety, transport rules (ADR/UN38.3)

**Dynamic data (per unit, updated throughout the life cycle):**

8. **Batch ID** — unique production batch identifier
9. **Serial number** — unique per cell or pack
10. **Manufacturing date** + plant location
11. **State of Health (SoH)** — BMS diagnostic data
12. **State of Charge (SoC)** — current charge level
13. **Nominal and current capacity**
14. **Cycle count**
15. **Repair history** — who, when, what was replaced
16. **Recycling data** — end-of-life destination, recovered material streams
17. **Lifecycle status** — production, use, second-life, recycling

Attributes 1–7 are mostly a one-off configuration sitting in PLM or ERP. Attributes 8–17 are the interesting part for MES — especially **8–10 and 14–15**, which you generate every day but almost never expose on a public URL behind a QR code.

## MES functions that already produce DPP data

Mapping typical MES/EMS/CMMS modules onto Annex XIII attributes:

**Batch genealogy.** Any MES worth the name produces a batch ID and links it to raw materials, operator, machine and shift. That covers attributes 8–10 directly. If genealogy is in place, the DPP data is already in the database — it is purely a question of exposure.

**OEE and per-line performance tracking.** OEE per battery pack delivers an indirect proxy for attribute 4 (carbon footprint), because CFP depends on energy consumption per unit produced. Combining OEE with an EMS (Energy Management System) and ISO 50001 instrumentation, you can compute kWh of electricity per pack and, multiplied by the grid emission factor, kg CO₂-eq.

**Quality control / SPC.** Attributes 11–13 (SoH, SoC, capacity) come from end-of-line tests that MES logs by default. The data is usually already there — it just sits in a closed quality system and is not bound to the pack serial number in a publicly addressable way.

**Raw-material traceability (where you have SCM–MES integration).** Attribute 3 (material composition, recycled content) requires descending the supply chain to active-material suppliers — cobalt from a specific mine, lithium from a specific brine pool. Most mid-sized European MES do not do this, but if you have a supplier integration in ERP, the link is architecturally feasible.

**CMMS for repair history.** Attribute 15 (repair history) is a classic CMMS function. The challenge is purely technical: it must be reachable by serial number via REST API, not as a PDF on SharePoint.

## What MES typically cannot do out of the box

A few things almost every plant I have seen needs to build:

**1. Carbon footprint per unit, third-party verified.** Annex XIII requires CFP under a Commission-approved methodology ([Recommendation 2021/2279](https://eur-lex.europa.eu/eli/reco/2021/2279/oj) — Product Environmental Footprint method). Most MES installations do not compute CO₂ per unit because they have no LCA tie-in. At minimum you need a module bridging energy use (from EMS), grid emission factors, and per-product allocation. VW uses SAP S/4HANA Sustainability Footprint Management for this; the open-source equivalent is [openLCA](https://www.openlca.org/) plus custom integration.

**2. Sub-tier supply-chain tracking.** Attribute 3 (recycled content, material origin) requires descending two to three levels into the supply chain. Most ERPs stop at the direct supplier. The Battery Pass project ([July 2025 release](https://thebatterypass.eu/)) is working on a standard interface — in practice you need to amend supplier contracts to require DPP-relevant data feeds.

**3. Public data exposure.** A public attribute reachable by URL + QR is a different category than internal MES dashboards. You need a public HTTPS endpoint, signed, with authorization based on the three access levels defined in Article 78 of the Battery Regulation: public, restricted (for repair operators), and full (for regulators).

**4. Lifecycle updates.** Attributes 11–17 (SoH, repair, recycling) must remain editable AFTER the product leaves the factory — by service centers, repair operators, recyclers. That requires an API that third parties can write to with appropriate authorization. Architecturally: a webhook plus event-sourced storage.

**5. Interchange format.** Data must be in an interoperable standard. The Commission points to **GS1 Digital Link** ([GS1 standardization, 2025](https://www.gs1.org/standards/gs1-digital-link)) as the preferred way to map QR → structured JSON, and to **W3C Verifiable Credentials** for cryptographically signed attributes.

## Reference architecture: GS1 Digital Link + W3C VC + optional anchoring

The stack that meets the minimum Battery Regulation 2027 bar in a mature MES looks like this:

**Source-data layer:** existing MES + ERP + EMS + CMMS, exported through an internal event bus (Kafka, MQTT). All attributes 1–17 must exist here — there is no shortcut around this foundation.

**Aggregation layer (DPP store):** a product-oriented (not batch-oriented) data store. Each pack serial number is one JSON-LD document. Sub-second updates from MES events. PostgreSQL with JSONB and GIN indexes on serial number, or a document store (MongoDB, Elasticsearch).

**Standard layer (GS1 Digital Link):** URL pattern `https://dpp.company.com/01/<GTIN>/21/<SerialNumber>`. The server responds with a JSON document compliant with the [GS1 Digital Link 1.4.0](https://ref.gs1.org/standards/digital-link/) schema.

**Authorization layer:** three levels aligned with Article 78 of the Battery Regulation:
- **Public** — chemistry, manufacturer, CFP, recycled content (required for end consumer)
- **Restricted** — for repair operators under NDA with the manufacturer — full repair history, cell schematics
- **Regulatory** — full access for market surveillance authorities, including commercially sensitive data

**Trust layer (optional, anchoring):** for the highest compliance bar — cryptographic signing of data (W3C Verifiable Credentials) plus optional anchoring of data hashes on a public blockchain (Ethereum, Polkadot) for non-repudiation. The Battery Pass project recommends this for CFP and recycled content, where data may be audited retrospectively. Cross-link to our piece on [blockchain in Industry 4.0](/blog/blockchain-in-industry-4-0-why-energy-and-compliance-are-the-only-rational-web3-use-cases-today) — this is exactly the use case I argued there is one of the two rational reasons for web3 in industry.

**Publication layer (QR + URL):** QR code is generated during labelling and printed on the pack casing or a durable label ([Battery Regulation Article 13(6)](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) requires durability over the whole product lifetime).

## Penalties — what you actually risk

The Battery Regulation ([Article 93](https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng#art_93)) requires member states to set "effective, proportionate and dissuasive" penalties. National implementations are landing in 2025–2026:

- **Germany** — Bundesnetzagentur, fines up to **4% of turnover** for serious breaches, up to **EUR 100,000** for minor ones; market entry ban for products without a valid DPP
- **France** — DGCCRF, similar levels, plus the French "Registres Uniques" with extra reporting obligations
- **Poland** — UOKiK is working on implementation (as of Q1 2026), fines likely in the **0.1–3% of turnover** range plus market ban

ESPR ([Article 74](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)) additionally empowers authorities to **withdraw products from the market** if missing DPP is discovered after placement — by analogy to MDR for medical devices. The reputational and logistical loss from a withdrawal often exceeds the fine itself.

## Nine-month roadmap to February 2027

For teams that have no DPP plan today:

**Months 1–2 (May–June 2026): assessment and scoping.** Do we produce batteries within scope (>2 kWh industrial, EV, LMT)? If yes — all 17 attributes. Inventory of data sources in MES / ERP / EMS / CMMS. Identify gaps (typically: CFP, sub-tier supply chain, repair API).

**Months 3–4 (July–August 2026): pilot on one product.** Pick one battery model — ideally already in low-volume production. Stand up the DPP store, the GS1 Digital Link endpoint, the QR generator. For CFP use a national grid emission factor for now (KOBiZE for Poland, IFEU for the EU), with room to refine.

**Months 5–6 (September–October 2026): supply chain.** Amend contracts with suppliers of cathodes, anodes, electrolyte, separators — require DPP-relevant data feeds. The Battery Pass Initiative has ready contractual templates. This is where the longest delays usually appear — some suppliers are not ready.

**Months 7–8 (November–December 2026): validation and rollout.** Full portfolio coverage. Third-party verification (TÜV, DEKRA, SGS) — required for CFP. Stress-test the public endpoint.

**Month 9 (January 2027): production cut-over.** All new packs leave the plant with a QR code. Operating model for first inquiries from buyers and regulators.

Realistic cost: for a mid-sized battery plant (one line, ~50 MWh/year throughput) — **EUR 150–400k** for full implementation, plus running cost of EUR 30–60k/year for maintenance and audits.

## Takeaways for the production director

Three things to remember:

**First**, the 18 February 2027 deadline is hard and cannot be pushed without new EU legislation. That is nine working months. If you do not have a DPP project team yet — stand one up in May.

**Second**, MES is the source of 60–70% of DPP data (genealogy, OEE/CFP, quality data, repair). The remaining 30% comes from ERP (supply chain) and a new DPP store plus publication layer. **This is not an MES replacement, it is data exposure.**

**Third**, Battery Regulation 2027 is wave one. ESPR delegated acts for textiles, steel and electronics will land in 2027–2028. If you produce anything else within EU regulatory scope, the same stack (MES + DPP store + GS1 Digital Link) will serve the next product groups with minimal modifications. **A 2026 investment amortizes over three to five years.**

DPP is not the cyclic ESG flavour of the month. It is new market information infrastructure for the EU. Manufacturers that are ready first gain a negotiating edge in public tenders and with large OEMs (Volkswagen, Stellantis and Bosch already require DPP-ready capability from suppliers).

---

## Sources

- [Battery Regulation 2023/1542](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) — regulation text, including Annex XIII (DPP attributes) and Article 77 (effective date)
- [ESPR 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) — Ecodesign for Sustainable Products Regulation
- [ESPR Working Plan 2025–2030 (March 2025)](https://commission.europa.eu/news/working-plan-ecodesign-and-energy-labelling-2025-2030-2025-04-16_en) — priority product groups
- [Recommendation 2021/2279](https://eur-lex.europa.eu/eli/reco/2021/2279/oj) — Product Environmental Footprint (PEF) method
- [Critical Raw Materials Act 2024/1252](https://eur-lex.europa.eu/eli/reg/2024/1252/oj) — definition of critical substances
- [GS1 Digital Link 1.4.0](https://ref.gs1.org/standards/digital-link/) — URL-to-JSON standard for DPP
- [W3C Verifiable Credentials 2.0](https://www.w3.org/TR/vc-data-model-2.0/) — data model for signed attributes
- [The Battery Pass Project](https://thebatterypass.eu/) — BMW, BASF, SAP, Circulor consortium — reference implementation
- [Bundesnetzagentur, Battery Regulation guidance](https://www.bundesnetzagentur.de/EN/Areas/Energy/Companies/SecurityOfSupply/Battery_Regulation/start.html) — German implementation of sanctions
