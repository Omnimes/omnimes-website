---
title: 'Traceability in MES: building the product genealogy the Digital Product Passport demands — five months to 18 February 2027'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'traceability-in-mes-building-product-genealogy-for-the-digital-product-passport-five-months-to-18-february-2027'
description: 'From 18 February 2027 the product passport becomes mandatory for industrial batteries above 2 kWh, EV and LMT batteries. A passport cannot be assembled from a spreadsheet after the fact — it needs product genealogy captured by the MES while the goods are being made. Here is which data has to be linked, which standards now govern it (EN 18219, EN 18220), and what a mid-sized factory can realistically finish in five months.'
coverImage: '/images/post-traceability-dpp/cover-traceability-dpp-foto.jpg'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"dpp","label":"DPP"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-09-14T08:00:00.000Z'
---

We have covered the Digital Product Passport twice on this blog — first the legal shape of it, then the deadlines. Both times the same question came back from the room: fine, but where is the data supposed to come from? Because a product passport is not a document the quality department fills in once a quarter. It is a record of what actually happened to a specific unit or batch on the shop floor — and if you were not capturing it while the goods were being made, you cannot reconstruct it afterwards.

This article is about the layer underneath the passport: **product genealogy**. The ability to take any serial number and answer "which material, which machine, which process settings, which operator" — and to run the same question backwards: "which raw material lot ended up in which finished units".

There are five months left until 18 February 2027.

## What changed in the summer of 2026

For two years the product passport was a conference topic. In the summer of 2026 it stopped being one.

**On 20 July 2026 the European Commission launched the DPP Registry**, together with a testing environment (European Commission, 2026). It is the central place where an economic operator registers unique product identifiers and the metadata attached to them. The architectural detail that matters: **the Registry does not store product data itself** — that stays with the manufacturer or with a passport service provider. The Registry holds identifiers and points to where the content lives. Registration works through a web interface or an API, and an operator can request electronic proof of registration to demonstrate compliance in B2B transactions.

The first step has no product-category deadline attached to it at all: before you can register a single passport, the company has to become a **verified economic operator**. That is a one-time identity check, governed by the same rules as a qualified electronic signature — and it can be started today (Cleo Labs, 2026).

The second change is more concrete still. **CEN/CENELEC JTC 24 published six of its eight European standards in 2026** — EN 18216, 18219, 18220, 18221, 18222 and 18223 — with prEN 18239 and prEN 18246 still in development (Regen Studio, 2026). Two of them land directly on the factory:

- **EN 18219** — unique identifiers. It codifies five permitted product-identifier schemes, including web-enabled structured paths such as a GS1 Digital Link URI.
- **EN 18220** — data carriers. It governs how the identifier is applied to the product: 2D symbols (QR Code, Data Matrix) and RFID (HF, NFC and UHF/RAIN), with rules on placement, marking and print quality.

Which means the in-house numbering convention you have used for fifteen years is no longer a free choice. The identifier has to follow a recognised scheme, and the carrier has to meet quality requirements.

### The calendar that is already running

For batteries this is enforcement, not announcement:

| Date | What takes effect |
|---|---|
| 18 February 2026 | Carbon footprint declaration for rechargeable batteries above 2 kWh |
| 18 August 2026 | New physical labelling requirements (capacity, chemistry, hazard information) |
| 18 August 2026 | Deadline for the Commission delegated act on passport details — access rights, rules for entering and updating passport data |
| **18 February 2027** | **Passport mandatory: LMT, industrial above 2 kWh, EV batteries** |
| 18 August 2027 | Due diligence obligations for critical raw materials (postponed by two years from 2025) |

ESPR runs in parallel: the first delegated acts in 2026 cover iron and steel, with aluminium, textiles and tyres joining in 2027 (passportcraft, 2026). If you make something other than batteries, the queue simply moves out by a year or so — the mechanism is identical.

## What product genealogy actually means

Genealogy is the linkage that lets you travel **in both directions**:

- **backward** — from a finished unit to everything that produced it: material lots, components, machine, work cell, tooling, process settings, operator, shift;
- **forward** — from a raw material lot to every finished unit that lot ended up in, down to the shipping documents.

The forward direction is the one companies forget, and it is the one that decides the size of a recall. Without it you withdraw everything produced in the suspect time window. With it, you withdraw the units that actually received the defective component.

### Resolution: lot or unit

This is the first design decision, and it has immediate cost consequences.

**Lot-level tracking** is enough where the product is homogeneous and the unit of complaint is the batch — chemicals, food, bulk goods. **Unit-level tracking** becomes mandatory when every item carries its own serial number and its own passport, which is precisely what the Battery Regulation requires above 2 kWh.

The difference is not academic. Unit-level tracking means marking every item, reading the identifier at every operation, and preserving identity through lot splits and merges. In practice that means adding readers and marking stations to lines that do not have them today.

### Where genealogy usually breaks

Three failure points show up in implementation after implementation:

1. **Lot splits** — one material lot feeds two lines, and the system records only total consumption. The backward link stops being unambiguous.
2. **Rework** — a unit returns to an earlier operation. If the system appends a new event but does not preserve the history of the previous pass, the audit trail has a hole exactly where an auditor looks first.
3. **Process materials** — adhesives, coatings, electrolyte. Formally "not a component", so nobody tracks them by lot. When a complaint arrives, they turn out to be the root cause.

## What the MES has to capture for a passport to be issuable

A battery passport is roughly **90 data attributes across seven content clusters**, split into three access layers: public data (identification, carbon footprint, recyclability), data for regulatory authorities (test results, certificates, declaration of conformity), and data for service and recycling (disassembly instructions, state of health, charging cycle history) — per the Battery Pass Consortium guidance (Battery Pass Consortium, 2024; attribute longlist updated January 2025 to align with DIN DKE SPEC 99100).

It is worth sorting those attributes by origin, because that splits the project across three different departments:

- **From ERP and purchasing records** — supplier data, material declarations, certificates. Not an MES job.
- **From the lab and quality** — test results, declaration of conformity.
- **From the shop floor, meaning the MES** — and this is the part you cannot buy or backfill: when a given unit was made, on which machine, at which settings, from which material lot, how much energy it consumed, what events and stoppages occurred while it was being made.

That last point deserves emphasis, because a unit-level carbon footprint is calculated **from actual energy consumption attributed to the production order**, not from an annual average divided by output. If you meter energy per machine and you know which order was running at the time, you have something to calculate from. If you do not, you are left with an estimate that an auditor is entitled to challenge.

## What this looks like architecturally — the OmniMES example

Let me use our own system, because specifics beat architecture diagrams.

OmniMES collects machine telemetry over MQTT using Sparkplug B and writes it to PostgreSQL with the TimescaleDB extension — readings land in a hypertable, which at tens of millions of records per day is what keeps historical queries answerable. Alongside telemetry it maintains a production schedule with orders (machine, line, time window, volume, assigned person), order statuses with completed and defective counts, and machine events — stoppages, micro-stoppages, threshold breaches — stored with start and end timestamps.

That gives you a **time axis**: for any time window you know what happened on a given machine and which order was running. It is a solid foundation for genealogy — but on its own it is not yet unit genealogy.

One binding is missing, and I will be straight about it because it is the typical gap in **most MES deployments**, not just ours: **item identity**. Turning a time axis into a passport takes three additions:

1. **An identifier for the unit or the finished lot**, assigned at the first operation and conforming to one of the EN 18219 schemes — most often GS1 Digital Link in practice, because the same QR code serves both logistics and the passport link.
2. **Reading that identifier at every operation**, so events and measurements bind to the item rather than to a machine and a timestamp.
3. **Recording material consumption together with the supplier lot number** at the moment it is drawn to the station — this is the link that cannot be reconstructed later.

Only with those three in place does the query "show me everything about unit X" return the full picture: order, machine, settings, consumed lots, events from the production window, and energy attributed to that window. The rest of the passport — certificates, material declarations — arrives from ERP and quality.

So the sensible sequence is: **identity and material consumption first, Registry integration second**. Doing it the other way round leaves you with registered identifiers that point at nothing worth showing.

## Who is already doing this

Look at the people who have completed a full cycle rather than at showcase pilots.

**Automotive** is furthest along, because genealogy was required there long before any passport — through IATF 16949 and OEM customer requirements. Battery makers building plants in Europe design lines with unit-level marking and lot-level electrolyte recording from day one.

**Food and pharma** have had lot genealogy for years, forced by food safety rules and GDP. Their challenge is not capture, it is resolution — moving from lot to unit.

**Steel and aluminium** are the first group into ESPR. Charge identification and the link to a heat number have existed in mill documentation for decades; the work is moving that into a format that can be served over an API.

The common thread: **nobody started from the passport**. Everybody started from genealogy already forced on them by quality, complaints or safety — and the passport turned out to be a layer on top of data they already had.

## What the absence of genealogy costs

US market figures give the scale: **in the first quarter of 2026 alone, US companies recalled 492 million product units — a 27% jump in a single quarter** (Sedgwick, US Recall Index, 2026). The average food recall runs to **USD 10 million in direct costs**, before brand damage and lost contracts. In automotive, a single non-conformance without documented genealogy can stop a line, and that stoppage is costed at **USD 250,000 per hour** (Metalphoto of Cincinnati, 2026).

The savings mechanism requires no faith in digital transformation: with full genealogy you recall **the units that actually received the defective component** instead of everything made in a suspect window. The difference between "two weeks of production" and "three hundred units" is usually the difference between a crisis and an incident.

There is also a cost that does not show up in any table: time. A recall run on paperwork and spreadsheets takes weeks. A recall run on a database query takes hours.

## The honest list of barriers

I am not going to sell the version where you switch on a module.

**Supplier data is the weakest link.** A passport requires information about materials your factory does not make. If your supplier sends a certificate as a PDF and you need machine-readable values, the problem moves one tier up the supply chain — where nobody has 18 February in their budget. In practice this means renegotiating purchasing contracts, which takes longer than the technical work.

**Marking costs money and slows the line.** Adding marking and reading at every operation is not a configuration change; it is hardware, cycle time and workstation redesign. On short-takt lines, seconds matter.

**A decade of retention changes the database design.** Second-resolution telemetry for an entire factory over ten years is a volume you will not keep in a hot database without a deliberate aggregation and archiving policy. Decide up front what stays at full resolution — once aggregated, the detail is gone.

**The standards are new, and two are still in progress.** Six JTC 24 standards are published; prEN 18239 and prEN 18246 are not. Separate what you capture on the floor from how you publish it outward, so a detail changing in a standard does not force a rebuild of your data model.

**Five months is not much.** If you have no unit-level tracking today, you will not reach full compliance by February. You can, however, close the doors that cannot be reopened later.

## What to actually do before February

Sequence matters, because some of this is irreversible: data you do not capture today cannot be invented in January.

**Now, independently of everything else:**

1. **Register as a verified economic operator.** One-time identity check, no product-category deadline, no dependency on system readiness. It blocks everything downstream.
2. **Start recording material consumption with the supplier lot number.** Even if the rest of the passport does not exist yet — this is the link you will never reconstruct from invoices.

**Within a month:**

3. **Run a data inventory**: list the ~90 attributes and mark each one with its origin (ERP, quality, MES, supplier) and whether it exists at all today. Usually the MES turns out to hold more than expected, and the real gap sits with suppliers.
4. **Choose an EN 18219-conformant identifier scheme** and settle the resolution question — lot or unit. This decision cannot wait, because it determines the hardware.

**Within three months:**

5. **Roll out marking and reading at critical operations** — not everywhere at once. Critical means the operations where declarable material enters, and the ones after which the product changes identity.
6. **Move carbon footprint onto actual per-order energy consumption** if you have metering. If you do not, this is the last sensible moment to add it.

**The final test** is the one your auditor will run: **take a random unit from the warehouse and try to reconstruct its full history within an hour**. If you cannot, you have found your gap. Run that exercise in November, not in February.

## In summary

A product passport is a data exchange format, not a data source. The source is the shop floor and whatever the system recorded while the goods were being made. Factories that already have genealogy add the passport layer in weeks. Factories that do not discover in January that there is nothing to export.

Five months will not buy you everything. It will buy you the irreversible parts: operator registration, the resolution decision, and material consumption recorded with lot numbers. The rest is engineering work.

## Sources

- European Commission, *The Digital Product Passport Registry is now live*, 20 July 2026 — https://single-market-economy.ec.europa.eu/news/digital-product-passport-registry-now-live-2026-07-20_en
- Cleo Labs, *EU product passport registry 2026 — the one step every brand must complete first*, 2026 — https://www.cleolabs.co/en/blog/eu-product-passport-registry-2026
- Regen Studio, *The DPP System Standards Are Here: A Field Guide to CEN/CENELEC JTC 24 Eight Standards*, 2026 — https://www.regenstudio.world/blog/dpp-system-standards/
- GS1 EU, *GS1 Standards enabling the EU digital product passport*, 2024 — https://gs1.eu/wp-content/uploads/2024/12/GS1-Standards-Enabling-DPP.pdf
- Battery Pass Consortium, *Battery Passport Content Guidance* and *Data Attribute Longlist* (updated January 2025 to align with DIN DKE SPEC 99100) — https://thebatterypass.eu/assets/images/content-guidance/pdf/2023_Battery_Passport_Content_Guidance.pdf
- Circularise, *EU battery passport regulation requirements*, 2026 — https://www.circularise.com/blogs/eu-battery-passport-regulation-requirements
- passportcraft, *ESPR Working Plan 2025–2030: Timeline & Delegated Acts*, 2026 — https://passportcraft.com/insights/espr-timeline-what-brands-need-to-know
- Metalphoto of Cincinnati, *Traceability in Manufacturing: The Expert Guide (2026)* — recall figures per Sedgwick US Recall Index — https://mpofcinci.com/blog/traceability-in-manufacturing-guide/
