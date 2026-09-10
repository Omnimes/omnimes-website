---
title: 'OmniMES × Relpol partnership — a smart energy metering network for Polish industry'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-ExOT.jpg'
slug: 'omnimes-relpol-partnership-smart-energy-metering-network'
description: 'Multiprojekt (the maker of OmniMES) and Relpol S.A. are launching a joint offering: certified Relpol RMM energy meters combined with the OmniMES system and the OmniEnergy module compliant with ISO 50001. One hardware vendor, one software vendor, one invoice, one point of technical support — instead of three separate integration projects.'
coverImage: '/images/relpol/relpol-multiprojekt-cover.jpg'
lang: 'en'
tags: [{"value":"omnimes","label":"Omnimes"},{"value":"omniEnergy","label":"OmniEnergy"},{"value":"relpol","label":"Relpol"},{"value":"ems","label":"EMS"},{"value":"iso50001","label":"ISO 50001"},{"value":"energyEfficiency","label":"energy efficiency"}]
publishedAt: '2026-09-10T09:00:00.000Z'
---

In 2026, **Multiprojekt Automatyka** — the maker of the **OmniMES** system — is entering a strategic partnership with **Relpol S.A.**, one of Poland's most established manufacturers of relays and electrical meters. The joint offering combines two layers that Polish factories used to have to source separately: **metering hardware** (Relpol RMM DIN-rail energy meters) and **management software** (OmniMES with the OmniEnergy module, ISO 50001 compliant).

![Multiprojekt and Relpol partnership — signing the agreement](/images/relpol/relpol-multiprojekt-handshake.jpg)

The outcome for the end customer is simple: **one hardware vendor, one software vendor, one invoice, one support desk**. You no longer separately configure the gateway, map Modbus registers, and chase the software to keep up with whatever the meter vendor changed — the whole chain is designed and tested together.

## Who is Relpol

Relpol S.A., headquartered in Żary, Poland, is a manufacturer of electrical apparatus: industrial relays, controllers, network meters, and energy metering systems. Their **RMM (Relpol Multi Meter)** family are three-phase energy analyzers — they measure voltage, current, active, reactive and apparent power, energy, frequency, cos φ, harmonics as well as THD. They are certified, MID-compliant, and communicate over RS-485 (Modbus RTU) as well as TCP/IP.

Critically, these are **meters from a Polish manufacturer, stocked in Poland, with Polish-language technical support**. For factories that actually need to deploy an energy audit under ISO 50001, this shortens the supply chain and removes single-vendor lock-in with a foreign supplier.

![Relpol RMM meters — smart energy metering network](/images/relpol/relpol-liczniki.jpg)

## Why the OmniMES partnership

OmniMES is an MES-class system developed by Multiprojekt Automatyka over the past several years — with an **OmniEnergy** module dedicated to energy management under ISO 50001. The system ingests measurements from a communication gateway (typically over MQTT or Sparkplug B), stores them in a PostgreSQL time-series database with the TimescaleDB extension, builds energy performance indicators (EnPI), defines baselines (EnB), significant energy uses (SEU) and generates evidence for auditor reviews.

The recurring pain point for mid-sized Polish factories: **metering hardware comes from one vendor, the software to operate it from another, and the communication gateway from yet another**. Configuring that setup usually takes an integrator two or three weeks, and every meter firmware update can break the register mapping. The Multiprojekt and Relpol partnership removes that architectural debt: RMM meters and OmniMES have a jointly tested configuration, and new meter firmware releases are validated on the software side before publication.

## What the customer gets, concretely

A typical end customer — a mid-sized Polish factory looking to implement energy management under ISO 50001 — can get from a single conversation with Multiprojekt Automatyka:

- **Certified Relpol RMM meters** sized to the number of measurement points, with a ready Modbus and RS-485 configuration
- **A communication gateway** (an industrial PC with Ethernet plus RS-485) configured for the specific meter set
- **The OmniMES system with the OmniEnergy module** with a ready machine park structure, pre-defined EnPI indicators, an EnB baseline and report templates for the ISO 50001 management review
- **Deployment and training** — meter configuration, measurement calibration, a workshop on energy management and the ISO 50001 standard
- **A single point of technical support** covering the whole set: meters, gateway as well as software

For plants that already have Relpol RMM meters installed (and there are many in Polish industry — Relpol is a popular choice in this segment), rolling out OmniMES boils down to connecting the gateway and configuring the park structure. **Without replacing the existing measurement infrastructure.**

## What the synergy delivers in practice

From the perspective of a plant director or a maintenance manager, the combined metering-and-software set translates into a few concrete outcomes:

- **Energy visibility at the level of a single area** — not just aggregate consumption from the main meter, but a breakdown by production line and by the most energy-intensive processes. Without this, an ISO 50001 audit requires manual computation from invoices and estimates, and the energy action plan rests on intuition rather than data.
- **Automatic machine working-state monitoring** — a running, idle, changeover, stopped classification derived from an apparent power threshold, without wiring additional binary signals from the controller. Configurable thresholds (introduced in OmniMES 4.2.0) mean the OEE indicator and production reports reflect the real machine state.
- **Early detection of energy losses outside production hours** — summaries showing consumption split into working hours and weekends help identify machines that were not switched off and generate a hidden operating cost.
- **ISO 50001 review evidence** — an audit trail of measured values, a record of manually entered values, and periodic reports generated from a single data source.

## Why this matters in 2026

2026 is the year Poland begins the real enforcement of a wave of energy and environmental regulations: the [updated Energy Efficiency Act](https://www.ure.gov.pl/), [CBAM from 1 August for exporters](/blog/cbam-for-steel-aluminium-cement-exporters-first-definitive-period-report-by-1-august-2026-what-mes-ems-must-measure) of steel, aluminium as well as cement, [KSC2 from the second half of 2026](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) in cybersecurity. ISO 50001 — although formally voluntary — is becoming, in this context, a de facto requirement from the largest customers in supply chains (automotive, electronics, food processing).

A plant that today has a **documented energy management system** — not just meters, but also EnPI indicators, a baseline, an action plan and management review — is materially easier to audit, cheaper to insure, and its bids are more easily accepted in tenders with sustainability clauses.

The Multiprojekt and Relpol partnership was formed so that mid-sized Polish factories can reach that state **without a complex integration project**. Hardware, software, deployment — from one place, with Polish-language support, and full control over where your data physically resides.

---

## Interested

- **OmniMES with OmniEnergy demo** — [live demo of the production system](https://www.omnimes.com/en/demo) to try online
- **Sales contact** — [contact form](/contact) or directly through [Multiprojekt Automatyka](https://multiprojekt.pl)
- **More about Relpol RMM** — [Relpol meters offering](https://relpol.com.pl)
- **OmniMES changelog** — [all releases and roadmap](/en/changelog)
