---
title: 'CBAM for steel, aluminium and cement exporters: first definitive-period report by 1 August 2026 — what MES + EMS must measure'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'cbam-for-steel-aluminium-cement-exporters-first-definitive-period-report-by-1-august-2026-what-mes-ems-must-measure'
description: 'The CBAM definitive period started on 1 January 2026, and 1 August 2026 is the deadline for the first periodic report under the new regime. European companies in steel, aluminium, cement, fertilisers, hydrogen and electricity — whether importing into the EU or exporting to carbon-aware markets — need to start computing embedded emissions per tonne of product. This article walks through what data MES + EMS must produce, how to map it to PCF (ISO 14067), which tools actually work, what it costs and what the penalties are. Plus a six-week roadmap to the deadline.'
coverImage: '/images/post-cbam-mes/cover-cbam-mes.png'
lang: 'en'
tags: [{"value":"ue","label":"UE"},{"value":"omniMES","label":"OmniMES"},{"value":"cbam","label":"CBAM"},{"value":"ems","label":"EMS"}]
publishedAt: '2026-06-22T08:00:00.000Z'
---

**1 August 2026** is the deadline for the first periodic CBAM report under the new, definitive period. The regime took effect on **1 January 2026** after the transitional phase (1 Oct 2023 – 31 Dec 2025). For European companies in **steel, aluminium, cement, nitrogen fertilisers, hydrogen and electricity**, this is the first moment when not having embedded-emissions data per tonne of product starts to cost money — reporting-wise now, payment-wise from 2027. Penalties for failing to report: **EUR 10–50 per tonne of CO₂** not declared ([Article 26 of CBAM Regulation 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj)). For missing certificates from 2027: **EUR 100 per tonne** plus a market-access ban on further consignments.

A myth worth dispelling first: **CBAM is not only about EU importers**. A Polish steel producer exporting to the UK (where [the UK CBAM begins on 1 January 2027](https://www.gov.uk/government/consultations/factsheet-the-uks-carbon-border-adjustment-mechanism)), a German OEM asking for a PCF from a Polish aluminium-component supplier, a Dutch cement customer requiring embedded emissions for [Battery Regulation DPP](/blog/digital-product-passport-dpp-enters-the-factory-espr-and-battery-regulation-2027-what-mes-must-deliver-by-february) — all need the same numbers. Scale: in automotive, according to [VDA's Sustainability Initiative](https://www.vda.de/en/topics/environment-and-climate/sustainability), 70% of European OEMs already require PCF data from suppliers for 2027.

Below: who is in scope, what data MES + EMS must produce, how to compute it, what it costs and what to do in the six weeks remaining.

## What CBAM is in short

CBAM (Carbon Border Adjustment Mechanism) is an equalising levy that the European Union imposes on **embedded emissions** in imports from carbon-intensive sectors. Its purpose: to prevent **carbon leakage** — production migrating outside the EU to avoid EU ETS costs. In practice CBAM closes that loophole by charging the importer a fee analogous to what an EU producer would pay under ETS.

Sectors covered by CBAM ([Annex I of the Regulation](https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng#anx_I)):

- **Cement** (clinker, Portland cement, blended cements)
- **Iron and steel** (pig iron, crude steel, rolled products, tubes, wires)
- **Aluminium** (primary, castings, profiles)
- **Fertilisers** (urea, ammonium nitrate, NPK complex)
- **Hydrogen** (excluding low-carbon hydrogen under the RED III regime)
- **Electricity** (imported from outside the EU)

From 2027 likely additions: **aluminium alloys**, **processed steel products**, **plastics** (Commission decision by end of 2026).

## Who this applies to in real life

Three paths — most companies in Annex I sectors sit on one or several:

**1. European importer of Annex I materials.** Classic case: a machinery manufacturer buying steel from Belarus or Ukraine. From 1.01.2026 you need **CBAM declarant** status in the national registry (in Poland: KOBiZE), report embedded emissions of imported tonnes quarterly, and — from 2027 — buy enough CBAM certificates at a price indexed to EU ETS.

**2. EU exporter to carbon-aware markets (UK, US, Canada, Japan).** The United Kingdom launches its own CBAM on **1 January 2027**, with methodology close to the EU's. The US is working on CCA (Clean Competition Act). A Polish steel producer selling to the UK must already today provide embedded emissions per tonne — without it the customer will not accept orders past 2026.

**3. European supplier to PCF-demanding OEMs.** Volkswagen, Mercedes, Stellantis, Siemens, Bosch — all have "PCF or no contract" policies for new agreements from 2026. This is not CBAM, but the data is the same: kg CO₂-eq per tonne / per unit, methodology ISO 14067 or PEF Commission Recommendation 2021/2279.

If your company produces steel, aluminium or cement in the EU — check the customer list. At least half already have PCF requirements in tenders for 2027.

## Embedded emissions — what they actually are

Embedded emissions are the **total CO₂-eq emissions "embedded" in 1 tonne of finished product**, measured from the plant gate (gate-to-gate) or from cradle to gate. CBAM requires **direct + indirect emissions**:

- **Scope 1 (direct)** — emissions from in-plant processes: gas, coke and dust combustion of chemical reactants (e.g. CaCO₃ decarbonation in a cement kiln)
- **Scope 2 (indirect)** — emissions from grid electricity: in Poland today around 650 kg CO₂/MWh per [KOBiZE 2025](https://www.kobize.pl/), in Germany around 370, in Norway around 30 (hydro)
- **Embedded emissions of raw materials** (precursors) — emissions already accumulated in input materials before they enter the process (e.g. ferromanganese for steelmaking)

For a tonne of converter steel a typical range is **1.6–2.4 tCO₂/t**. For a tonne of Portland cement: **0.8–1.1 tCO₂/t** (mostly from decarbonation). For a tonne of primary aluminium from smelting: **8–18 tCO₂/t**, depending on the energy mix — which is precisely why Norwegian aluminium has the edge over Polish on the EU market.

## How MES sources this data

Embedded emissions are not a single number — they are **per batch** (production batch), summed from three sources:

**1. Batch genealogy (from MES).** Each batch has its own raw materials set (BOM), machines, cycle times, operators. This is the basis for allocation — if batch A and batch B passed through the same furnace, but A ran 4 hours and B ran 6 hours, energy (and CO₂) must be allocated proportionally to furnace runtime.

**2. Energy use per machine / per line (from EMS).** An Energy Management System measures kWh of electricity and m³ of gas per machine at minute or second resolution. If batch A is in the furnace from 08:00 to 12:00, EMS gives the exact MWh of power and m³ of gas the machine consumed in that window.

**3. Bill of Materials from ERP** (raw materials, their emission factors). Ferromanganese from a specific mine has its own PCF (provided by the supplier or default value from a national database). MES knows how many kg of raw material entered batch A. Multiply: kg of input × kg CO₂/kg input = embedded emissions from precursors.

Together: **embedded CO₂ per tonne of product = (scope 1 + scope 2 + precursors) / produced tonnes**.

A natural OmniMES stack for this: MES (genealogy) + EMS (energy metering) + ERP (BOM + supplier data) + a PCF calculation layer (on a time-series database — in [TimescaleDB](/blog/timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day) we keep emission factors as time-series, because grid emission factors shift year to year and the regulator requires a **contemporaneous** multiplier).

## Standards: ISO 14067, GHG Protocol, EU CBAM methodology

Three methodological frames that in practice overlap:

**[ISO 14067:2018](https://www.iso.org/standard/71206.html)** — Carbon footprint of products. International standard, broadest reach, well-understood. Defines system boundaries, allocation across co-products, third-party verification requirements.

**[GHG Protocol Product Standard](https://ghgprotocol.org/product-standard)** — more flexible, widely used in the US. Accepted in some CBAM-like regimes (US Clean Competition Act).

**[EU CBAM Implementing Regulation 2023/1773](https://eur-lex.europa.eu/eli/reg_impl/2023/1773/oj)** — the details of computing embedded emissions specifically for CBAM. Defines **default values** (used when verified data is missing from the supplier) — typically 20–40% higher than realistic numbers, to incentivise verified data submission.

In practice inside the EU ISO 14067 dominates. A CBAM declarant always maps an ISO 14067 PCF onto the CBAM format (minor differences in system boundary, but tools do that mapping automatically).

## Tools: what actually works in 2026

Four realistic options:

**SAP S/4HANA Sustainability Footprint Management.** Commercial, expensive (EUR 50–150k per year for a mid-sized plant), but integrates natively with ERP. If you run SAP, this is the obvious pick. Plus full CBAM support and direct reporting to national registries.

**Microsoft Cloud for Sustainability.** Alternative to SAP, integrates with Microsoft Dynamics 365 and Azure. Better pricing for mid-market.

**[openLCA](https://www.openlca.org/)** — open-source LCA tool. Free, but requires manual integration with MES/EMS. Good for startups and smaller plants, weaker for compliance audit (less mature audit trail).

**Custom — directly inside MES.** For plants that already have a solid stack (PostgreSQL + TimescaleDB + Grafana), an embedded-emissions calculator is roughly 200 lines of SQL/Python. Plus an emission-factors table (imported annually). That is a real path — we use it in OmniMES, because emission factors map 1:1 to continuous aggregates per shift × per line.

What to pick: for plants with EUR 100M+ revenue already on SAP — SFM. For mid-market EUR 10–100M with PostgreSQL plus custom MES — in-house calculation is cheaper and more flexible. For the smallest — openLCA plus Excel.

## Default values: the trap for the unprepared

If a Polish aluminium importer from Belarus has no verified embedded-emissions data from the Belarusian supplier (because the supplier simply does not report), CBAM mandates **default values**. For primary aluminium the default is **16.5 tCO₂/t** — the worst realistic range for coal-powered smelters.

Likely 2027 CBAM rate (indexed to ETS): around EUR 80/t CO₂. So **the importer pays about EUR 1,320 extra per tonne of aluminium when using defaults**. Verified supplier data can bring this to EUR 800–1,000/t — a difference of EUR 300–500 per tonne.

The conclusion: **investment in getting verified data from non-EU suppliers pays back immediately.** Polish importers of steel from Ukraine or Turkey should be signing contract addenda today requiring CBAM-ready PCF. Same for aluminium from the UAE, India, Bahrain.

## Six-week roadmap to 1 August 2026

For companies that do not yet have a CBAM workflow:

**Week 1–2 (22 June – 5 July):** registration as a CBAM declarant in the national registry. Inventory of exactly what is imported/exported (CN codes from Annex I). List of TIER-1 non-EU suppliers and contacts.

**Week 3–4 (6 July – 19 July):** raw data collection. From MES — Q2 2026 quarterly summary of production batches. From EMS — electricity + gas per line. From ERP — BOM + raw-material invoices. From non-EU suppliers — verified PCF or acceptance of defaults.

**Week 5–6 (20 July – 1 August):** embedded-emissions calculation per CN code, validation through internal audit or an external verifier (TÜV, DEKRA, SGS for high-stakes filings). Submission to the CBAM portal. Q3 action plan.

Realistic cost of the first report for a mid-sized plant (50–500 tonnes of Annex I imports per month): **EUR 15–40k** (consultant + external verifier + tooling setup). Plus 0.2 FTE for ongoing work.

The longest item is **non-EU suppliers** — typically 4–6 weeks from the first email to a PCF, if the supplier is seeing the request for the first time. Hence the time pressure.

## Penalties — what is actually at stake

[Article 26 of CBAM Regulation 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng#art_26) and [Article 16 of Implementing Regulation 2023/1773](https://eur-lex.europa.eu/eli/reg_impl/2023/1773/oj) set:

- **Failure to report:** EUR 10–50/t of CO₂ not reported, plus the obligation to backfill with retroactive payment
- **Inaccurate reporting:** EUR 30–50/t plus report correction within 30 days
- **Missing certificates (from 2027):** EUR 100/t plus a ban on bringing further product batches to the EU market
- **Repeat offences:** Commission proposal from March 2026 — fines of up to 4% of global turnover

National regulators have powers to mandate public disclosure of the breach. For B2B companies (most European industrial exports) this is worse than the fine itself — they lose the first major contract after disclosure and do not catch up.

## Takeaways for the production director and CFO

Three things to remember:

**First**, CBAM realistically applies to thousands of mid-market European plants (Annex I plus import/export linkages). If your company is in steel, aluminium, cement, fertilisers or electronics with metal components — check status this week. The 1.08.2026 deadline is hard.

**Second**, MES + EMS are the foundation of CBAM data (60–70% of the needed information). Batch genealogy from MES, energy metering from EMS, BOM from ERP — you already have all of this. Add a calculation layer and a reporting interface. Cost EUR 15–40k plus two months of consultant time. Not a stack replacement, just data exposure.

**Third**, CBAM closes the EU 2026 regulatory cluster: [AI Act](/blog/eu-ai-act-august-2026-which-mes-functions-qualify-as-high-risk-ai) (August), [DPP / Battery Regulation](/blog/digital-product-passport-dpp-enters-the-factory-espr-and-battery-regulation-2027-what-mes-must-deliver-by-february) (February 2027), [NIS2 / KSC2](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) (H2 2026), CBAM (August 2026). Four pillars, one common denominator: **MES as the source of compliance evidence**. Companies that treat this as one data platform instead of four separate projects will save 40–60% on implementation.

CBAM is not going away. If the European industry wants to compete in carbon-aware markets (EU, UK, US from 2027), embedded emissions per tonne will become a standard product specification — alongside dimensions, chemical composition and mechanical strength. The best time to start measuring was a year ago. The second-best is today.

---

## Sources

- [CBAM Regulation 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj) — regulation text, Annex I (sectors), Article 26 (penalties)
- [CBAM Implementing Regulation 2023/1773](https://eur-lex.europa.eu/eli/reg_impl/2023/1773/oj) — methodology details
- [ISO 14067:2018](https://www.iso.org/standard/71206.html) — Carbon footprint of products
- [GHG Protocol Product Standard](https://ghgprotocol.org/product-standard) — alternative methodology
- [PEF Recommendation 2021/2279](https://eur-lex.europa.eu/eli/reco/2021/2279/oj) — Product Environmental Footprint
- [KOBiZE — Polish emissions registry](https://www.kobize.pl/) — Polish national emissions regulator, emission-factors database
- [UK CBAM consultation](https://www.gov.uk/government/consultations/factsheet-the-uks-carbon-border-adjustment-mechanism) — launch 1.01.2027
- [VDA Sustainability Initiative](https://www.vda.de/en/topics/environment-and-climate/sustainability) — automotive PCF requirements
- [openLCA](https://www.openlca.org/) — open-source LCA tool
- [DPP enters the factory](/blog/digital-product-passport-dpp-enters-the-factory-espr-and-battery-regulation-2027-what-mes-must-deliver-by-february) — our earlier piece on the product passport, naturally linked
- [TimescaleDB in OmniMES](/blog/timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day) — storing emission factors as time-series
- [OmniMES — cybersecurity and CRA compliance](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/cybersecurity-compliance-cra-pPJBcC6sBf) — product documentation
