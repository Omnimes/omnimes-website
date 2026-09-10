---
title: 'OmniMES × Relpol partnership — a smart energy metering network for Polish industry'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-ExOT.jpg'
slug: 'omnimes-relpol-partnership-smart-energy-metering-network'
description: 'Multiprojekt (the maker of OmniMES) and Relpol S.A. are launching a joint offering: certified Relpol RMM energy meters plus the OmniMES system with the OmniEnergy module compliant with ISO 50001. A pilot deployment at the Relpol plant showcases the full data trace — from a DIN-rail meter, through the telemetry stream, to a ready ISO 50001 review dashboard. One hardware vendor, one software vendor, one invoice, one point of support.'
coverImage: '/images/relpol/relpol-multiprojekt-handshake.png'
lang: 'en'
tags: [{"value":"omnimes","label":"Omnimes"},{"value":"omniEnergy","label":"OmniEnergy"},{"value":"relpol","label":"Relpol"},{"value":"ems","label":"EMS"},{"value":"iso50001","label":"ISO 50001"},{"value":"energyEfficiency","label":"energy efficiency"}]
publishedAt: '2026-09-10T09:00:00.000Z'
---

In 2026, **Multiprojekt Automatyka** — the maker of the **OmniMES** system — is entering a strategic partnership with **Relpol S.A.**, one of Poland's most established manufacturers of relays and electrical meters. The joint offering combines two layers that Polish factories used to have to source separately: **metering hardware** (Relpol RMM DIN-rail energy meters) and **management software** (OmniMES with the OmniEnergy module, ISO 50001 compliant).

![Multiprojekt × Relpol partnership — signing the agreement](/images/relpol/relpol-multiprojekt-handshake.png)

The outcome for the end customer is simple: **one hardware vendor, one software vendor, one invoice, one support desk**. You no longer separately configure the gateway, map Modbus registers, and chase the software to keep up with whatever the meter vendor changed — the whole chain is designed and tested together.

## Who is Relpol

Relpol S.A., headquartered in Żary, Poland, is a manufacturer of electrical apparatus: industrial relays, controllers, network meters, and energy metering systems. Their **RMM (Relpol Multi Meter)** family are three-phase energy analyzers — they measure voltage, current, active, reactive and apparent power, energy, frequency, cos φ, harmonics, THD. They are certified, MID-compliant, and communicate over RS-485 (Modbus RTU) and TCP/IP.

Critically, these are **meters from a Polish manufacturer, stocked in Poland, with Polish-language technical support**. For factories that actually need to deploy an energy audit under ISO 50001, this shortens the supply chain and removes single-vendor lock-in with a foreign supplier.

![Relpol RMM meters — smart energy metering network](/images/relpol/relpol-liczniki.jpg)

## Why the OmniMES partnership

OmniMES is an MES-class system developed by Multiprojekt Automatyka over the past several years — with an **OmniEnergy** module dedicated to energy management under ISO 50001. The system ingests measurements from a gateway (typically over MQTT or Sparkplug B), stores them in a PostgreSQL + TimescaleDB time-series database, builds energy performance indicators (EnPI), defines baselines (EnB), significant energy uses (SEU) and generates evidence for auditor reviews.

The recurring pain point for mid-sized Polish factories: **metering hardware comes from one vendor, the software to operate it from another, and the communication gateway from yet another**. Configuring that stack usually takes an integrator 2–3 weeks, and every meter firmware update can break the register mapping. The Multiprojekt × Relpol partnership removes that architectural debt: RMM meters and OmniMES have a jointly tested configuration, and new meter firmware releases are validated on the software side before publication.

## Pilot deployment at the Relpol plant

To back the partnership with real data, a pilot deployment has been launched **at Relpol's own production plant**. It is a case study that shows the synergy live — Relpol's own RMM meters connected to OmniEnergy, monitoring their own production hall. The data in the system is real, indicators are computed on the fly.

### Live machine monitoring

The monitoring screen shows four areas of the Relpol machine park: **EDM machines, Milling, Galvanizing 1, Galvanizing 2**. Each card presents live energy consumed, apparent power, per-phase current, frequency, min/max/current voltage, and cos φ.

![Relpol machine monitoring in OmniMES](/images/relpol/relpol-monitoring.png)

The green-yellow-red gauge classifies the machine's working state from apparent power — configurable thresholds (introduced in OmniMES 4.2.0) let you distinguish full operation from idle without wiring additional binary signals from the PLC.

### Main dashboard — ISO 50001 perspective

Right after login the plant management sees a single screen answering the key ISO 50001 audit questions: **how many Significant Energy Uses (SEU) are there, what coverage they provide against the plant's total consumption, what is their Pareto distribution, what does the hourly trend look like over the last week**.

![Main SEU dashboard — Relpol](/images/relpol/relpol-panel-zwe.png)

The pilot screen shows 10 SEUs, 82.3% coverage (ISO 50001 requires at least 80%), and the projected annual cost of SEU energy consumed outside working hours (PLN 1,635,971 — extrapolated from the last 7 days of data). That last figure is a concrete indicator of savings potential: energy paid for by machines that don't produce at night or on weekends.

### Time window comparison — spotting regressions

A new OmniEnergy feature (version 4.4.0) — comparing consumption across many time windows on a single chart — quickly reveals whether a machine upgrade or a change in raw material actually reduced consumption, or merely shifted it in time.

![SEU time window comparison](/images/relpol/relpol-porownanie-zwe.png)

In the example visible from the Relpol pilot, comparing five days shows a group change of +172.75% — a concrete signal to investigate what happened in that window and whether it was intentional (e.g. launching a new line) or an anomaly to fix.

### "Energy — management overview" dashboard

For a plant director or an energy manager there is a dedicated management pulpit: active, reactive and apparent power profile in 15-minute windows (48 h back), consumption structure by area (donut, last 24 h), top 10 areas split by working vs. idle hours, and an "area × hour of day" heat map.

![Management energy dashboard — Relpol](/images/relpol/relpol-przeglad-zarzadczy.png)

A gap between the kW and the kVA curves is an immediate indicator of the risk of over-consumption penalties for reactive power — something that, without continuous monitoring, only surfaces on the invoice once a month.

## What the customer gets, concretely

A typical end customer — a mid-sized Polish factory looking to implement energy management under ISO 50001 — can get from a single conversation with Multiprojekt Automatyka:

- **Certified Relpol RMM meters** sized to the number of measurement points, with a ready Modbus/RS-485 configuration
- **A communication gateway** (an industrial PC with Ethernet + RS-485) configured for the specific meter set
- **The OmniMES + OmniEnergy system** with a ready machine park structure, pre-defined EnPI indicators, an EnB baseline and report templates for the ISO 50001 management review
- **Deployment and training** — meter configuration, measurement calibration, a workshop on energy management and the ISO 50001 standard
- **A single point of technical support** covering the whole stack: meters, gateway, software

For plants that already have Relpol RMM meters installed (and there are many in Polish industry — Relpol is a popular choice in this segment), rolling out OmniMES boils down to connecting the gateway and configuring the park structure. **Without replacing the existing measurement infrastructure.**

## Why this matters in 2026

2026 is the year Poland begins the real enforcement of a wave of energy and environmental regulations: the [updated Energy Efficiency Act](https://www.ure.gov.pl/), [CBAM from 1 August for exporters](/blog/cbam-for-steel-aluminium-cement-exporters-first-definitive-period-report-by-1-august-2026-what-mes-ems-must-measure) of steel, aluminium and cement, [KSC2 from the second half of 2026](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) in cybersecurity. ISO 50001 — although formally voluntary — is becoming, in this context, a de facto requirement from the largest customers in supply chains (automotive, electronics, food processing).

A plant that today has a **documented energy management system** — not just meters, but also EnPI indicators, a baseline, an action plan and management review — is materially easier to audit, cheaper to insure, and its bids are more easily accepted in tenders with sustainability clauses.

The Multiprojekt × Relpol partnership was formed so that mid-sized Polish factories can reach that state **without a complex integration project**. Hardware, software, deployment — from one place, with Polish-language support, and full control over where your data physically resides.

---

## Interested?

- **OmniMES + OmniEnergy demo** — [live demo of the production system](https://www.omnimes.com/en/demo) to try online
- **Sales contact** — [contact form](/contact) or directly through [Multiprojekt Automatyka](https://multiprojekt.pl)
- **More about Relpol RMM** — [Relpol meters offering](https://relpol.com.pl)
- **OmniMES changelog** — [all releases and roadmap](/en/changelog)
