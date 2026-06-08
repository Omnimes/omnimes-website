---
title: 'NIS2 and the Polish KSC2 Act in 2026: how MES becomes cyber-compliance evidence for an EU factory'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory'
description: 'The Polish amendment to the National Cybersecurity Act (KSC2), transposing the EU NIS2 Directive, enters real enforcement in the second half of 2026. Factories producing chemicals, food, machinery, automotive, electronics or medical devices — if they employ more than 50 people — are classified as "important entities" and fall under the full obligations package. This article walks through the ten Article 21 NIS2 requirements from an MES perspective: which functions already produce compliance evidence, what is missing, how every external API (OpenAI, cloud LLM, SaaS MES) grows your audit surface, and what to do concretely in the remaining months of 2026.'
coverImage: '/images/post-nis2-mes/cover-nis2-mes.png'
lang: 'en'
tags: [{"value":"ue","label":"UE"},{"value":"omniMES","label":"OmniMES"},{"value":"cyberbezpieczenstwo","label":"cyberbezpieczenstwo"},{"value":"nis2","label":"NIS2"}]
publishedAt: '2026-06-01T08:00:00.000Z'
---

**17 October 2024** — the deadline to transpose [Directive NIS2 (2022/2555)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) into national law. Poland, like most EU member states, missed it. The amendment to the Act on the National Cybersecurity System (informally KSC2) is entering force in phases through 2026, and the full enforcement window opens in the second half of 2026. In parallel, the [Cyber Resilience Act (Regulation 2024/2847)](https://eur-lex.europa.eu/eli/reg/2024/2847/oj) entered into force in December 2024 and imposes new obligations on software vendors — including MES vendors — from **11 December 2027**.

For European manufacturing this is not an abstract "big IT" regulation. Under [Annex II of NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#anx_II), plants producing **chemicals, food, machinery, automotive components, electronics or medical devices** — if they employ more than 50 people or turn over more than EUR 10 million — are classified as **"important entities"** and fall under the full cybersecurity obligations package. That realistically covers roughly 3,000–5,000 mid-sized Polish plants and many tens of thousands across the EU. A much larger share than under NIS1 (which covered a few hundred).

Below: who is in scope, what Article 21 requires, how MES becomes the auditor's evidence — and what to do to be ready for the H2 2026 enforcement window.

## Is my plant under NIS2/KSC2?

Three filter questions, in order:

**1. Is the plant in a sector listed in Annex I or II?** Annex I (sectors of high criticality) — energy, transport, finance, drinking water, wastewater, health, digital infrastructure, public administration, space. Annex II (other critical sectors) — chemicals, food, machinery, automotive, electronics, medical devices, research, post and courier, waste management, digital service providers. Most mid-sized European manufacturing plants fall under Annex II.

**2. Does it meet the size threshold?** "Essential entity": >250 staff OR turnover >EUR 50 million and assets >EUR 43 million — full obligations + proactive supervision. "Important entity": >50 staff OR turnover >EUR 10 million and assets >EUR 10 million — full obligations + reactive supervision (post-incident). Smaller plants (micro/small, under 50 staff and under EUR 10 million in turnover) — out of scope, unless they qualify for an exception (e.g. they are the sole supplier of a critical component).

**3. Does it operate in an EU country?** If yes, it is supervised by the national CSIRT (in Poland: CSIRT NASK for Annex II important entities).

A realistic test: a typical Polish automotive-component manufacturer in Tarnów, 120 people, PLN 40 million in revenue (~EUR 9 million). Annex II sector (automotive). Above the 50-staff threshold — **it is an "important entity"**, full NIS2 + KSC2 obligations.

## The ten risk-management obligations (Article 21 NIS2)

[Article 21 of NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_21) paragraph 2 lists ten security measures every entity must implement in a manner proportionate to its risk. Mapped to MES/OT language:

1. **Risk analysis and information-system security policies** — formal risk assessment at least annually, plus a board-approved cybersecurity policy
2. **Incident handling** — detection, classification, escalation and reporting processes
3. **Business continuity** — backup, RTO/RPO, disaster-recovery plan, crisis procedures for production continuation
4. **Supply-chain security** — vendor risk for MES/SCADA/PLC suppliers, ICS-CERT alerts, sub-tier suppliers
5. **Secure acquisition, development and maintenance of systems** — secure SDLC for in-house apps, vulnerability management, patch management
6. **Policies and procedures to assess the effectiveness of risk-management measures** — internal audits, penetration tests, red teaming
7. **Cyber-hygiene practices and training** — mandatory staff training, awareness, simulated phishing
8. **Use of cryptography and encryption** — encryption in transit and at rest for production data
9. **Human-resource security, asset management and access control** — IAM, role-based access, least privilege
10. **Multi-factor authentication and secured connections** — MFA for all privileged access, secure VPN, zero trust

These are obligations of **the organization as a whole**, but in a manufacturing plant a large share is covered by MES + IAM + SIEM. Below: how.

## MES functions that already produce compliance evidence

Mapping typical MES modules (OmniMES and equivalents) onto the Article 21 measures:

**Per-operator audit log of every action** — evidence for obligations 2, 6, 9. Every entry into service mode, every change of a production parameter, every alarm override — all timestamped, by user, by IP. This is absolutely critical for a KSC2 auditor. Without audit logs you cannot prove "access control" or "incident handling" — and you cannot close the requirement.

**Batch genealogy** — covers obligation 3 (business continuity) because it provides a full production replay after recovery from an incident. If ransomware encrypts two days of production data, with genealogy plus ERP material backups you can rebuild state; without genealogy you have to physically re-audit work-in-progress.

**Role-based access control with MFA** — obligations 9 + 10. Most modern MES (OmniMES included) already have RBAC. If your MES still uses shared passwords across operators — that is compliance debt today.

**SIEM integration (Splunk, Elastic, Wazuh)** — obligations 2 + 6. The MES should forward security-relevant events (failed login, privilege escalation, anomalous parameter change) to a central SIEM, which correlates them with events from ERP, AD and firewalls.

**Backup and replication** — obligation 3. The MES database (typically PostgreSQL/SQL Server) plus configuration plus custom scripts, all with daily full backups to a geographically separate location.

## What MES typically does not do out of the box — the gaps

Four things almost every implementation needs to add:

**1. Vulnerability disclosure (Article 21(2)(e) plus CRA Article 6).** Does your MES vendor have a process for accepting vulnerability reports from researchers (CVE) and publishing security advisories? Most small MES vendors (and the in-house IT team if MES is built in-house) do not. Under NIS2 this is required, under CRA it becomes a duty to customers from 11 December 2027. Practically: stand up a `security.txt` on your corporate site, set up a responsible-disclosure email, and define a triage procedure for reports.

**2. IT/OT network segmentation.** Most MES installations run in the same network as office LAN — a classic gap a regulator will not forgive after the first incident. Standard: MES + SCADA in a separate VLAN (the OT zone), with a stateful firewall between IT and OT, allowlisting protocols (OPC UA, Modbus TCP, MQTT — but only the specific signatures you need). Cross-link to our piece on [IT/OT communication best practices](/blog/good-practices-for-communication-between-it-and-ot-networks-how-to-build-a-secure-and-modern-industrial-architecture) — the full reference segmentation architecture is there.

**3. Continuous monitoring / OT-specific IDS.** Classical IDS (Suricata, Snort) handle OT poorly — they don't understand Modbus, S7 or EtherNet/IP. You need an OT IDS — commercial (Claroty, Dragos, Nozomi) or open-source (Malcolm from CISA). Without it you cannot meet the Article 23 incident-detection requirement.

**4. Supply-chain documentation.** Article 21(2)(d) requires supply-chain risk documentation. For MES that means: a list of all integrated systems, their vendors, countries of origin, and an SBOM (Software Bill of Materials) for every external library. Most plants do not have this — in an audit they typically get "non-critical findings", but two years (and an incident) later that turns into "critical".

## Vendor risk: every external API is compliance debt

A practical observation from eight audits I have watched in 2025–Q1 2026: **the fastest-growing compliance debt under NIS2 is integrations with cloud LLMs**. Reasons:

- An OpenAI/Anthropic API call is **a data flow through a non-EU provider** — it needs a DPA, an adequacy assessment (post-Schrems II), and a register-of-processing entry
- Every model change (GPT-4 → GPT-4o → GPT-5) is **a change in the supply chain** — it needs a fresh risk assessment
- No SBOM for a frontier LLM — the vendor will not disclose how the model was trained, on what data, or its dependencies
- Cloud LLM query logs sit **with the provider**, not with you — that is a gap in the audit trail for incident reporting

This is why **local LLMs** (Phi-4, Llama 3.3, Qwen 2.5) on your own hardware are incomparably simpler for NIS2 compliance. They eliminate:
- cross-border data transfer
- vendor lock-in
- off-site audit trail
- unpredictable API changes

I made this case concretely in our piece on [Local RAG in the factory: Phi-4 + sqlite-vec on Jetson Orin](/blog/local-rag-in-the-factory-phi-4-sqlite-vec-on-jetson-orin-mes-assistant-without-cloud-data-leakage). Under NIS2 this is not just an economics question — it shrinks the audit surface by an entire US vendor.

Same logic applies to SaaS MES (Plex, Tulip, parts of the Siemens offering): you, as the customer, need supply-chain risk documentation and an SLA that covers NIS2 obligations. On-prem MES simply means fewer documents and fewer questions from the auditor.

## Incident reporting (Article 23) — 24h, 72h, 1 month

Three timing windows you cannot dodge:

**24 hours after detection** — an early warning to the national CSIRT (CSIRT NASK for Polish Annex II important entities). Minimum content: whether we suspect a deliberate act, whether it has a cross-border effect, whether it could spread to other entities.

**72 hours** — initial notification. A fuller picture: severity assessment, indicators of compromise (IoC), preliminary mitigation steps. This is where the MES audit log becomes the primary evidence — you produce concrete logs with timestamps showing what happened on the shop floor in the hours leading up to the incident.

**1 month** — final report. Full root-cause analysis, corrective actions, lessons learned, prevention plan. Here MES genealogy and system configuration are critical — without them you cannot prove the incident did not affect the quality of product batches shipped in the period.

In practice: prepare **two templates** — a 24h ICR (Incident Communication Report) and a 72h INR (Incident Notification Report). Run the procedure as a tabletop exercise every six months, with board attendance (because they are personally liable — see below).

## Penalties — administrative fines plus personal liability of management

This is the biggest change vs NIS1:

**Essential entity:** administrative fines up to **EUR 10 million or 2% of global turnover** (whichever is higher). Also a mandatory public-disclosure obligation about the breach.

**Important entity:** fines up to **EUR 7 million or 1.4% of global turnover**. Plus public disclosure if the incident has a significant impact.

**Personal liability of management** ([Article 20 NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_20)). Board members have a personal duty to oversee cyber compliance. They can be temporarily suspended by the competent authority if repeated breaches are flagrant. This is new — under NIS1 liability was organizational, now it is also personal.

The Polish KSC2 implementation adds: extra fines for failure to report an incident on time (up to PLN 100,000 per 24-hour delay), and the power for CSIRT NASK to order public disclosure.

## A 12-month roadmap to compliance maturity

For a typical Polish plant (~150 people, automotive or chemical), starting today:

**Months 1–2 (June–July 2026): assessment.** Inventory of IT/OT assets (MES, SCADA, PLC, ERP, AD), data classification, mapping of processes critical for production continuity. Risk assessment under ISO 27005 or NIST CSF. Identify all vendors (top 30) plus DPA/SLA documentation.

**Months 3–4 (August–September 2026): quick wins.** MFA for all privileged access (MES admin, SCADA, AD). IT/OT segmentation (VLAN + firewall rules). MES database backup to a separate location. Incident-response procedures (24h/72h/1-month templates).

**Months 5–7 (October–December 2026): deeper changes.** Deploy an OT IDS (Claroty/Nozomi or Malcolm). Central SIEM with forwarders from MES/SCADA/AD/firewalls. Vulnerability management (regular scanning, patch policy). Staff training (awareness, simulated phishing). Internal pentest.

**Months 8–10 (January–March 2027): supply-chain management.** Amend contracts with MES, ERP, cloud suppliers (DPA, SLA, vulnerability-disclosure clauses). Internal compliance audit. Tabletop exercise with board attendance.

**Months 11–12 (April–May 2027): validation and conformity declaration.** External audit (EY, Deloitte, PwC). Formal registration with CSIRT NASK as an important entity. Continuous-improvement plan.

Realistic budget for a mid-sized plant: **PLN 150–400k** for full year-one implementation, plus **PLN 80–150k/year** running costs (OT IDS licences, audits, training, a 0.3 FTE security analyst).

## Takeaways for the production director and CISO

Three things to remember:

**First**, NIS2/KSC2 does not exempt mid-sized European manufacturers — Annex II coverage plus the 50-staff threshold means most chemical, automotive, food, machinery, electronics and medical-device plants are "important entities". If you have more than 50 staff — check today whether you are in scope.

**Second**, MES is the source of 40–50% of NIS2 compliance evidence (audit log, RBAC, genealogy, SIEM integration). But it needs to be complemented with vulnerability disclosure, IT/OT segmentation, an OT IDS and supply-chain documentation. **This is not an MES replacement — it is enrichment of what you already have.**

**Third**, every external API (cloud LLM, SaaS MES, third-party analytics) is compliance debt. **Local LLMs and on-prem MES dramatically reduce the audit surface.** In next year's KSC2 audits this will translate into the difference between "compliant" and "conditionally compliant with a remediation plan".

The fines are high (up to EUR 10 million plus personal management liability), but the real risk is not the fine — it is reputation. The first public-disclosure notice from a Polish automotive manufacturer under NIS2 will be a headline in the major business press. Prevention is cheaper today than remediation later.

---

## Sources

- [Directive NIS2 (2022/2555)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) — directive text, Annexes I and II, Article 21 (risk-management measures), Article 23 (incident reporting)
- [Cyber Resilience Act (Regulation 2024/2847)](https://eur-lex.europa.eu/eli/reg/2024/2847/oj) — obligations on software vendors, enforcement date 11 December 2027
- [ENISA NIS2 guidance](https://www.enisa.europa.eu/topics/cybersecurity-policy/nis-directive-new) — implementation guides and interpretations
- [CSIRT NASK](https://csirt.nask.pl/) — Polish CERT for Annex II important entities
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework) — reference risk-assessment model
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — information-security management standard
- [Good practices for IT/OT communication](/blog/good-practices-for-communication-between-it-and-ot-networks-how-to-build-a-secure-and-modern-industrial-architecture) — our earlier piece on segmentation
- [Local RAG in the factory: Phi-4 + sqlite-vec on Jetson Orin](/blog/local-rag-in-the-factory-phi-4-sqlite-vec-on-jetson-orin-mes-assistant-without-cloud-data-leakage) — shrinking the audit surface via local LLMs
- [OmniMES — cybersecurity and CRA compliance](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/cybersecurity-compliance-cra-pPJBcC6sBf) — product documentation: how OmniMES meets the CRA obligations applicable to MES vendors
