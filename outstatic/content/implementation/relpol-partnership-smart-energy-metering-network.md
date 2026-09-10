---
title: 'Relpol — partnership and a smart energy metering network'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'relpol-partnership-smart-energy-metering-network'
description: 'In 2026 Multiprojekt Automatyka (the maker of OmniMES) entered a partnership with Relpol S.A. — a Polish manufacturer of relays and RMM-series energy meters. The joint offering combines Relpol''s metering hardware with the OmniMES + OmniEnergy system compliant with ISO 50001. A pilot deployment at the Relpol plant showcases the stack running live.'
coverImage: '/images/relpol/relpol-liczniki.jpg'
lang: 'en'
tags: [{"label":"Relpol","value":"relpol"},{"label":"Omnimes","value":"omnimes"},{"label":"OmniEnergy","value":"omniEnergy"},{"label":"Partnership","value":"partnership"},{"label":"ISO 50001","value":"iso50001"}]
publishedAt: '2026-09-10T09:00:00.000Z'
---

In 2026 [Multiprojekt Automatyka](https://multiprojekt.pl) — the maker of the **OmniMES** system — entered a strategic partnership with [Relpol S.A.](https://relpol.com.pl), a Polish manufacturer of relays and network meters. The joint offering combines two layers needed to deploy energy management under ISO 50001: **certified Relpol RMM energy meters** and the **OmniMES system with the OmniEnergy module**.

The result for the customer: one hardware vendor, one software vendor, one invoice, one point of technical support — instead of three separate integration projects. The RMM meters (three-phase energy analyzers with Modbus RTU / TCP/IP communication) share a jointly tested configuration with OmniMES, and new meter firmware releases are validated on the software side before publication.

## Pilot at the Relpol plant

To back the partnership with real data, a pilot deployment has been launched **at Relpol's own production plant** — their own RMM meters connected to OmniEnergy, monitoring their own production hall (EDM machines, Milling, two Galvanizing lines). The data in the system is real, indicators are computed on the fly.

The pilot covers four areas of the OmniMES system:

- **Live machine monitoring** — current energy, apparent power, per-phase current, working-state classification from an apparent-power threshold
- **OmniEnergy main dashboard** — Significant Energy Uses (SEU), 82.3% coverage (ISO 50001 requires a minimum of 80%), Pareto of consumption, hourly trend over 7 days
- **SEU time window comparison** — consumption across many windows at once, with regression detection
- **"Energy — management overview" dashboard** — active / reactive / apparent power profile (48 h), consumption structure by area, top 10, "area × hour of day" heat map

The outcome is a **full data trace** — from a DIN-rail meter, through the telemetry stream, to a ready ISO 50001 review dashboard.

## Who this stack is for

The partnership offering is aimed at mid-sized Polish factories that want to launch a real energy management system under ISO 50001 — without a complex integration project involving vendors from three different countries. For plants that already have Relpol RMM meters installed, rolling out OmniMES boils down to connecting the gateway and configuring the park structure, **without replacing the existing measurement infrastructure**.

The full description of the partnership together with screens from the pilot at the Relpol plant is available in the article [OmniMES × Relpol partnership — a smart energy metering network](/en/blog/omnimes-relpol-partnership-smart-energy-metering-network).
