---
title: 'Digital Product Passport for batteries: 5.5 months to 18 February 2027 — what your MES must cover (lessons from the Battery Pass, Volvo and GBA pilots)'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'digital-product-passport-for-batteries-5-5-months-to-18-february-2027-what-your-mes-must-cover'
description: 'From 18 February 2027 every LMT battery, every industrial battery above 2 kWh and every EV battery placed on the EU market must have a battery passport (Article 77 of Regulation 2023/1542). Based on the European Commission guidance of August 2026 we explain which data points are mandatory from February, which are not yet filled in (carbon footprint, recycled content, due diligence), what the Battery Pass, Volvo and GBA pilots showed, and what data your MES should prepare.'
coverImage: '/images/post-dpp-batteries/cover-dpp-batteries.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"ue","label":"UE"},{"value":"dpp","label":"DPP"}]
publishedAt: '2026-08-31T08:00:00.000Z'
---

*Article corrected on 6 October 2026. The first version contained incorrect information about implementing acts, the scope of passport data and the pilot projects.*

On 18 February 2027 the EU's first mandatory digital product passport takes effect. From then on, every LMT battery, industrial battery above 2 kWh and electric vehicle battery placed on the market or put into service must have an electronic record — the battery passport (Article 77(1) of [Regulation (EU) 2023/1542](https://eur-lex.europa.eu/eli/reg/2023/1542/oj)). That is five and a half months away.

The date is fixed, but several Commission acts are not ready yet. Below: what is mandatory from February, what is not filled in yet, what the pilots have shown and what your MES needs to deliver.

## Who is in scope from 18 February 2027

Of the five battery categories in the regulation (Article 1(3)) — portable, SLI, LMT, electric vehicle and industrial — the passport covers three:

- **LMT batteries** — sealed, up to 25 kg, powering the traction of wheeled vehicles such as e-bikes and e-scooters (Article 3(1)(11)).
- **Electric vehicle batteries** — traction batteries for vehicle categories M, N and O (including buses and trucks) and for category L where the battery exceeds 25 kg (Article 3(1)(14)).
- **Industrial batteries above 2 kWh** — including stationary battery energy storage systems (Article 3(1)(13) and (15)).

Portable batteries do not get a passport, although from 18 February 2027 all batteries must carry a QR code linking, among other things, to the declaration of conformity (Article 13(6)). The regulation does not apply to batteries in military and security-related equipment or in equipment sent into space (Article 1(5)).

The trigger is placing on the market, not production: a battery built in January but placed on the market in March 2027 needs a passport.

The 18 February 2027 date has not moved. Unlike many other deadlines in the regulation, Article 77(1) does not depend on further Commission acts ([Battery-Tech Network, 14 August 2026](https://battery-tech.net/why-the-eu-is-about-to-miss-its-own-battery-passport-deadline-while-industrys-stays-fixed/)). The Omnibus IV simplification package, politically agreed by the Council and Parliament on 9 June 2026, leaves it unchanged too ([InfoDPP](https://infodpp.eu/en/blog/omnibus-iv-digitalisation-dpp-impact/)). What did move is due diligence: [Regulation (EU) 2025/1561](https://eur-lex.europa.eu/eli/reg/2025/1561/oj) pushed its start from 18 August 2025 to 18 August 2027.

## Who is responsible

The economic operator placing the battery on the market is responsible for the passport. It must keep the information accurate, complete and up to date, and may give another operator written authorisation to act on its behalf (Article 77(4)). The data is stored by that operator or an authorised operator, which may not sell or re-use it beyond the service provided (Article 78(c) and (d)).

Only identifiers are held centrally: Article 77(10), added by the Ecodesign for Sustainable Products Regulation ([ESPR, 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj), Article 78), requires the unique identifier to be uploaded to the product passport registry. The registry is governed by [Implementing Regulation (EU) 2026/1778](https://eur-lex.europa.eu/eli/reg_impl/2026/1778/oj) of 16 July 2026, which explicitly covers battery passports, and has been live since 20 July 2026 ([European Commission](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/batteries_en)).

Suppliers of cells, materials and components have no passport obligation of their own, yet some data, such as detailed cathode, anode and electrolyte composition, originates with them. Our assessment: battery producers will require it through supplier contracts rather than by law.

## What the passport must contain — Commission guidance version 2.0

Content is defined by Annex XIII; there is no separate implementing act with a "data model". The practical reference is the Commission's "Digital Batteries Passport – data points by category", version 2.0 dated 15 August 2026 and published on 21 August ([European Commission](https://single-market-economy.ec.europa.eu/news/guidance-support-preparations-digital-batteries-passport-2026-08-21_en)). It lists 71 data points and, for each of the three categories, marks each as mandatory, optional, required in specific cases, or not to be filled in as of February 2027. The guidance is not binding.

**Mandatory from February 2027** are, among others:

- identification: unique identifier, manufacturer details, category, model and batch or serial number, place and date of manufacture, weight, capacity;
- composition: chemistry, hazardous substances, extinguishing agent, critical raw materials above 0.1% by weight, renewable content share and, in the restricted part, detailed cathode, anode and electrolyte composition, part numbers, dismantling information and safety measures;
- performance and durability: voltages, power, expected lifetime in cycles, internal resistance, temperature range;
- the EU declaration of conformity, waste information and test reports (authorities only);
- individual battery data: capacity and power fade, resistance increase, status (original, re-used, repurposed, remanufactured, waste) and, for EV batteries, the state of certified energy (SOCE).

Cycle count, negative events, recorded temperature and state of charge are required "if applicable". By our count from the Commission table, about 46 of the 71 data points are mandatory for EV batteries. The Battery Pass consortium cited around 80 mandatory attributes for EV batteries ([Battery Pass Q&A](https://thebatterypass.eu/wp-content/uploads/q-a_content-guidance.pdf)), at a different level of detail.

**Not filled in as of February 2027:**

- the carbon footprint declaration and label — the format still awaits an implementing act;
- responsible sourcing information — required from August 2027;
- recycled cobalt, lithium, nickel and lead shares — to follow Article 8 and a future delegated act;
- instructions for use — on hold pending the Omnibus package.

So the first version of the passport carries neither a carbon footprint nor recycled content.

### Three access groups

Article 77(2) and Annex XIII split the information between three audiences: the general public; persons with a legitimate interest together with the Commission; and notified bodies, market surveillance authorities and the Commission. Basic model data is public; detailed composition, dismantling information and individual battery data go to those with a legitimate interest, and test reports to authorities.

Implementing acts defining who has a legitimate interest, and how far they may download, share and re-use data, were due by 18 August 2026 (Article 77(9)). The deadline passed; the Commission timetable points to Q4 2026 ([Battery-Tech Network](https://battery-tech.net/why-the-eu-is-about-to-miss-its-own-battery-passport-deadline-while-industrys-stays-fixed/)).

### Identifiers and standards

The QR code and unique identifier must comply with ISO/IEC 15459-1 to 15459-6 or equivalent (Article 77(3)). [Implementing Decision (EU) 2026/1736](https://eur-lex.europa.eu/eli/dec_impl/2026/1736/oj) of 14 July 2026 cites six harmonised standards for product passports: EN 18216 (data exchange protocols), EN 18219 (unique identifiers), EN 18220 (data carriers), EN 18221 (data storage, archiving and persistence), EN 18222 (APIs) and EN 18223 (system interoperability). These are six of the eight standards developed by CEN-CENELEC JTC 24.

### How long the passport lives

The passport ceases to exist only once the battery is recycled (Article 77(8)) and must remain available even if the responsible operator ceases to exist or leaves the EU (Article 78(e)). A battery that is re-used, repurposed or remanufactured gets a new passport linked to the original one (Article 77(7)). The manufacturer also keeps the technical documentation and EU declaration of conformity for 10 years after placing the battery on the market (Article 38(4)). The regulation sets no service-availability percentage; it does require data integrity and a high level of security (Article 78(g) and (h)).

## Carbon footprint, recycled content and due diligence — moving targets

**Carbon footprint** (Article 7) is declared per battery model per manufacturing plant, in kg CO₂e per kWh of total energy delivered over the battery's expected service life, broken down by life cycle stage. For EV batteries the obligation applies from 18 February 2025 or 12 months after the delegated act (methodology) and implementing act (format) enter into force, whichever is later. In early August 2026 the delegated act was still pending (draft of 30 April 2024) and no carbon footprint classes existed ([Cleo Labs, 9 August 2026](https://www.cleolabs.co/en/blog/eu-battery-carbon-footprint-class-2026)).

**Recycled content** (Article 8): documentation applies from 18 August 2028 or 24 months after the delegated act enters into force. Minimum shares from 18 August 2031: 16% cobalt, 85% lead, 6% lithium and 6% nickel; from 18 August 2036: 26% cobalt, 85% lead, 12% lithium and 15% nickel.

**Due diligence** covers cobalt, natural graphite, lithium and nickel and applies from 18 August 2027 (Regulation 2025/1561).

**Penalties** were to be laid down by Member States by 18 August 2025 and must be effective, proportionate and dissuasive (Article 93). In Poland, the draft act on batteries and waste batteries (UC107) is on the government legislative list, with Council of Ministers adoption planned for Q3 2026. The published outline announces sanctions but gives no amounts ([Polish Chancellery of the Prime Minister](https://www.gov.pl/web/premier/projekt-ustawy-o-bateriach-i-zuzytych-bateriach)).

## The pilots — what is actually known

### Battery Pass

The three-year Battery Pass project, led by Systemiq and co-funded by the German economy ministry (BMWK), concluded in March 2025 ([thebatterypass.eu](https://thebatterypass.eu/)). Its 11 partners were acatech, AUDI, BASF, BMW, Circulor, FIWARE Foundation, Fraunhofer IPK, Systemiq, TWAICE, Umicore and VDE Renewables ([Circulor](https://circulor.com/articles/batterypassconsortium)).

- **Content Guidance** version 1.0 ([April 2023](https://en.acatech.de/wp-content/uploads/sites/6/2023/04/1.1.-202304_Battery-Passport-Content-Guidance-Version-1.0_Executive-Summary.pdf)) and 1.1 ([December 2023](https://thebatterypass.eu/news/the-battery-pass-consortium-launches-updated-content-guidance-on-eu-battery-passport/)), organising the data into seven clusters, from manufacturer information and carbon footprint to circularity, performance and durability.
- **Technical Guidance 1.0** of March 2024 with a software demonstrator. It describes a decentralised data system and recommends Decentralised Identifiers (DIDs); GS1 Digital Link is listed as one option for embedding identifiers in URLs ([Battery Pass Technical Guidance](https://thebatterypass.eu/assets/images/technical-guidance/pdf/2024_BatteryPassport_Technical_Guidance.pdf)).
- **DIN DKE SPEC 99100** (January 2025), data attribute requirements built on the Content Guidance ([acatech](https://en.acatech.de/publication/battery-passport-content-guidance/)).

The work continues in BatteryPass-Ready (Fraunhofer IPK, acatech, GEFEG, TU Berlin), which published Data Attribute Longlist v2.0 and Data Model v2.0 on 27 August 2026; the data model is on [GitHub](https://github.com/batterypass).

### Volvo EX90 and Circulor

On 4 June 2024 Volvo Cars and Circulor announced the world's first EV battery passport, on the EX90, after working on it since 2019 ([Circulor](https://circulor.com/articles/worlds-first-battery-passport)). It shows the origin of cobalt, nickel, graphite and lithium, the pack's carbon footprint and recycled content share, and is accessed via the Volvo Cars app and a QR code on the driver's door frame. According to Circulor CEO Douglas Johnson-Poensgen, the cost is around 10 USD per car over 15 years ([Electrek, 4 June 2024](https://electrek.co/2024/06/04/volvo-ex90-launch-worlds-first-ev-battery-passport/)). We found no published figures on the number of suppliers or data fields involved.

### Global Battery Alliance

On 18 January 2023 the Global Battery Alliance presented the first battery passport proof of concept, led by Audi and Tesla with value chain partners including BASF, CATL, LG Energy Solution and Umicore ([GBA](https://www.globalbattery.org/press-releases/global-battery-alliance-launches-world%E2%80%99s-first-battery-passport-proof-of-concept/)). A second wave started on 20 June 2024: 11 consortia led by battery makers — CATL, EVE Energy, Farasis Energy, FinDreams Battery, LG Energy Solution, Samsung SDI, Sunwoda and CALB — representing over 80% of the global EV battery market. Participants report against seven rulebooks, covering among others greenhouse gas emissions, human rights, child labour and biodiversity ([GBA](https://www.globalbattery.org/press-releases/gba-launches-second-wave-of-battery-passport-pilots/)).

Our assessment: both pilots go beyond the regulation (ESG scoring, material provenance), into areas the February 2027 passport does not yet require. Public data on implementation costs is scarce.

## Poland on the battery passport map

- **LG Energy Solution Wrocław** — EV batteries; current capacity 80 GWh, target 90 GWh, about 700,000 EV batteries a year ([LG Energy Solution](https://lgensol.pl/en/get-know-us/)).
- **Lyten in Gdańsk** (formerly Northvolt Dwa) — battery energy storage systems (industrial batteries); acquisition closed on 16 October 2025, equipment for 6 GWh, expandable to 12 GWh ([Lyten](https://news.cision.com/lyten/r/lyten-completes-acquisition-of-northvolt-bess-manufacturing-facility-in-poland,c4250998)).
- **Impact Clean Power Technology** (Pruszków, GigafactoryX) — battery systems for heavy transport, including e-buses; capacity rose from 0.6 to 1.2 GWh in 2024, targeting up to 4 GWh ([Sustainable Bus](https://www.sustainable-bus.com/news/impact-gigafactory-x-new-production-line-batteries/)). It supplies Solaris Bus & Coach (partnership since 2012, contract for 2024–2027, [Sustainable Bus](https://www.sustainable-bus.com/news/impact-batteries-solaris-new-contract/)); bus batteries count as EV batteries under the regulation.
- **SK hi-tech battery materials** (Dąbrowa Górnicza) — lithium-ion battery separators, 340 million m² a year at start-up in 2021 ([PAIH](https://www.paih.gov.pl/en/news/20211011-the_opening_ceremony_of_the_sk_hi_tech_battery_materials_factory/)). As a material supplier it does not hold passports.

## The MES role: legal obligations versus preparing for the next acts

### Legal obligations from 18 February 2027

1. **Identification** — assign a unique identifier compliant with ISO/IEC 15459, link it to the QR code, model, batch or serial number, place and date of manufacture, and upload it to the registry.
2. **Composition** — chemistry, hazardous substances, critical raw materials and detailed composition, taken from the recipe and bill of materials.
3. **Performance and durability** — end-of-line test values: capacity, power, internal resistance, efficiency. Since 18 August 2024 a document with these parameters must accompany industrial batteries above 2 kWh, LMT and EV batteries (Article 10(1)), so the data usually exists; the hard part is linking it to each battery.
4. **Test reports** for notified bodies and market surveillance authorities.
5. **Dynamic data** — initial values when the battery is placed on the market. Since 18 August 2024 the battery management system (BMS) of stationary storage, LMT and EV batteries must hold up-to-date state-of-health parameters (Article 14). After sale, the BMS and service network, not the MES, update the data.

### Preparing for future acts (our recommendation)

- **Batch genealogy of active materials.** Recycled content will be calculated per model, year and plant (Article 8), and due diligence covers cobalt, natural graphite, lithium and nickel; both are hard to demonstrate without batch genealogy.
- **Energy consumption per line and batch.** The carbon footprint methodology is not adopted, but the declaration will be per model per plant. Raw, timestamped data can be recalculated once the methodology is published.
- **Process parameters** (formation, drying, calendering) — not required, but useful for quality analysis and warranty claims.

High data volumes call for a time-series database — see our article on [TimescaleDB in OmniMES](/blog/timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day).

## Barriers and limitations

- No access-rights act yet (Article 77(9)) — permissions must be designed to change later.
- Carbon footprint and recycled content methodologies are not adopted; the obligations start 12–24 months after the acts enter into force.
- References to two of the eight JTC 24 standards are not yet published in the Official Journal.
- Poland has not laid down penalties, although the deadline passed in August 2025.

## Action plan to February 2027 (our recommendation)

- **September:** map each of the 71 data points to a source (MES, ERP, PLM, LIMS, BMS, supplier) and flag the gaps.
- **October:** identifiers and QR codes per ISO/IEC 15459 and EN 18219; decide where the passport is stored (in-house or an authorised operator); first registry tests.
- **November:** link end-of-line test results and composition to the battery identifier; add data-sharing clauses on composition to supplier contracts.
- **December:** pilot on one line, with access control for the three audiences.
- **January:** all lines; check whether the Commission has adopted the access-rights act.
- **From 18 February:** every battery placed on the market has a passport.

## ESPR: what comes after batteries

The ESPR working plan for 2025–2030 ([COM(2025) 187 of 16 April 2025](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025DC0187)) gives indicative years for **adopting** delegated acts: iron and steel — 2026; textiles (apparel), tyres and aluminium — 2027; furniture — 2028; mattresses — 2029. Horizontal measures cover repairability (2027) and recycled content and recyclability of electrical and electronic equipment (2029). Application dates, including passports, will be set in each act. Wider context: our article [DPP enters the factory](/blog/digital-product-passport-dpp-enters-the-factory-espr-and-battery-regulation-2027-what-mes-must-deliver-by-february).

## Update (6 October 2026)

- On 8 September 2026 the access-rights act (Article 77(9)) was still neither adopted nor published in draft; the 18 February 2027 date is unchanged ([EU Digital Product Passport](https://eudigitalproductpassport.org/updates/battery-passport-access-rights-implementing-act-delay)).
- According to the Commission FAQ (updated 30 September 2026), the draft act is expected for public feedback in October or November 2026. It also clarifies that the passport applies to the finished battery (for traction batteries normally including the BMS); a vehicle manufacturer that completes the battery, e.g. by adding the BMS, is responsible for it. Written authorisation does not transfer legal responsibility, imported cells and modules for assembly are not finished batteries, and usage data fields may be empty at registration. A registry testing environment is available ([European Commission FAQ](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/eu-digital-product-passport-faq-batteries_en)).

---

## Sources

- [Regulation (EU) 2023/1542 on batteries](https://eur-lex.europa.eu/eli/reg/2023/1542/oj) — Articles 1, 3, 7, 8, 10, 13, 14, 38, 77, 78, 93, Annex XIII
- [Regulation (EU) 2025/1561](https://eur-lex.europa.eu/eli/reg/2025/1561/oj) — due diligence postponed to 18 August 2027
- [Regulation (EU) 2024/1781 (ESPR)](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) — Article 78 adding Article 77(10)
- [Implementing Regulation (EU) 2026/1778](https://eur-lex.europa.eu/eli/reg_impl/2026/1778/oj) — product passport registry
- [Implementing Decision (EU) 2026/1736](https://eur-lex.europa.eu/eli/dec_impl/2026/1736/oj) — EN 18216, 18219, 18220, 18221, 18222, 18223
- [European Commission — battery passport](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/batteries_en) — registry since 20 July 2026, six of eight JTC 24 standards
- [European Commission — guidance of 21 August 2026](https://single-market-economy.ec.europa.eu/news/guidance-support-preparations-digital-batteries-passport-2026-08-21_en) and the [document "Digital Batteries Passport – data points by category", version 2.0](https://single-market-economy.ec.europa.eu/document/download/cd1e5e6c-4a4a-4b99-995a-49eb6916187e_en?filename=Digital%20Batteries%20Passport%20-%20data%20point%20by%20category.pdf)
- [European Commission — battery passport FAQ](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/eu-digital-product-passport-faq-batteries_en)
- [Battery-Tech Network, 14 August 2026](https://battery-tech.net/why-the-eu-is-about-to-miss-its-own-battery-passport-deadline-while-industrys-stays-fixed/) — access-rights act timetable
- [EU Digital Product Passport, 8 September 2026](https://eudigitalproductpassport.org/updates/battery-passport-access-rights-implementing-act-delay) — status of the access-rights act
- [InfoDPP — Omnibus IV](https://infodpp.eu/en/blog/omnibus-iv-digitalisation-dpp-impact/)
- [Cleo Labs, 9 August 2026](https://www.cleolabs.co/en/blog/eu-battery-carbon-footprint-class-2026) — carbon footprint delegated act status
- [Polish Chancellery of the Prime Minister — draft act on batteries (UC107)](https://www.gov.pl/web/premier/projekt-ustawy-o-bateriach-i-zuzytych-bateriach)
- [Circulor — Battery Pass Technical Guidance and demonstrator](https://circulor.com/articles/batterypassconsortium)
- [thebatterypass.eu](https://thebatterypass.eu/) — project conclusion, BatteryPass-Ready, data model v2.0
- [Battery Pass — Content Guidance Q&A](https://thebatterypass.eu/wp-content/uploads/q-a_content-guidance.pdf)
- [Battery Pass — Content Guidance 1.0, executive summary](https://en.acatech.de/wp-content/uploads/sites/6/2023/04/1.1.-202304_Battery-Passport-Content-Guidance-Version-1.0_Executive-Summary.pdf)
- [Battery Pass — Content Guidance 1.1](https://thebatterypass.eu/news/the-battery-pass-consortium-launches-updated-content-guidance-on-eu-battery-passport/)
- [Battery Pass — Technical Guidance 1.0](https://thebatterypass.eu/assets/images/technical-guidance/pdf/2024_BatteryPassport_Technical_Guidance.pdf)
- [acatech — DIN DKE SPEC 99100](https://en.acatech.de/publication/battery-passport-content-guidance/)
- [Battery Pass — data model on GitHub](https://github.com/batterypass)
- [Circulor — Volvo EX90 battery passport](https://circulor.com/articles/worlds-first-battery-passport)
- [Electrek — Volvo EX90 battery passport](https://electrek.co/2024/06/04/volvo-ex90-launch-worlds-first-ev-battery-passport/)
- [Global Battery Alliance — proof of concept, 2023](https://www.globalbattery.org/press-releases/global-battery-alliance-launches-world%E2%80%99s-first-battery-passport-proof-of-concept/)
- [Global Battery Alliance — second wave of pilots, 2024](https://www.globalbattery.org/press-releases/gba-launches-second-wave-of-battery-passport-pilots/)
- [LG Energy Solution Wrocław](https://lgensol.pl/en/get-know-us/)
- [Lyten — Gdańsk plant acquisition](https://news.cision.com/lyten/r/lyten-completes-acquisition-of-northvolt-bess-manufacturing-facility-in-poland,c4250998)
- [Sustainable Bus — Impact GigafactoryX](https://www.sustainable-bus.com/news/impact-gigafactory-x-new-production-line-batteries/)
- [Sustainable Bus — Impact and Solaris](https://www.sustainable-bus.com/news/impact-batteries-solaris-new-contract/)
- [PAIH — SK separator plant in Dąbrowa Górnicza](https://www.paih.gov.pl/en/news/20211011-the_opening_ceremony_of_the_sk_hi_tech_battery_materials_factory/)
- [ESPR working plan 2025–2030, COM(2025) 187](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025DC0187)
