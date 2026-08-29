---
title: 'BlackHat and DEF CON 2026: three new attack vectors on MES and OT systems — what EU factories must deploy in 30 days'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'blackhat-and-def-con-2026-three-new-attack-vectors-on-mes-and-ot-systems-what-eu-factories-must-deploy-in-30-days'
description: 'BlackHat USA 2026 (1–6 August) and DEF CON 33 (6–9 August) closed the hottest two weeks of the year for industrial security experts. Three presentations genuinely change the threat map for European MES: automated OPC UA break-in through poisoned certificates, AI model theft from edge Jetson servers via side-channel, and a supply-chain attack through the open-source Python ecosystem in SCADA environments. This article walks through each of the three vectors without marketing, plus a concrete list of changes to deploy within 30 days.'
coverImage: '/images/post-blackhat-2026/cover-blackhat-2026.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"cyberbezpieczenstwo","label":"cyberbezpieczenstwo"},{"value":"itOt","label":"it-ot"},{"value":"nis2","label":"NIS2"}]
publishedAt: '2026-08-24T08:00:00.000Z'
---

Two weeks ago Las Vegas hosted the hottest event of the year for cybersecurity specialists. **BlackHat USA 2026** (1–6 August) and **DEF CON 33** (6–9 August) closed an eight-day marathon of presentations, workshops and competitions. Usually treated as "an event for the IT/consumer world", in 2026 they had an unprecedented share of industrial content — the ICS/OT Village grew by 40% year-over-year, MES and SCADA presentations were on the BlackHat main track, and one of the DEF CON demonstrations hit a real deployment in a European plant.

From the perspective of a European production director or CISO — three of this year's presentations change the practical threat map and should trigger concrete changes in your environment. This is not a "read for curiosity" list — it is a list of three attack vectors that are **now publicly documented**, have **working proof-of-concept code**, and will be used by attacker groups in the coming months. Below I walk through each and indicate what to deploy within 30 days.

## Vector 1 — OPC UA and poisoned certificates (BlackHat main stage, 4 August)

A team from Claroty and Team82 disclosed **CVE-2026-38472** — a vulnerability in the reference OPC UA library (`open62541`), allowing an attacker with OT network access to inject a poisoned server certificate into the OPC UA client's trusted directory. Effect: full man-in-the-middle on PLC↔MES communication, with the ability not only to view but also to **modify control commands**.

Specifically, the BlackHat demo showed: an attacker on the same VLAN as the MES inserts themselves between the MES and a Siemens S7-1500 controller, intercepts a command changing the setpoint on a packaging line, changes the value "pressure: 3.2 bar" to "pressure: 7.8 bar" on its way to the controller. The MES sees a "3.2 bar" acknowledgement (because the attacker also modifies the response), the operator sees nothing, and the line starts producing off-spec output. Time from network access to a successful command substitution — 90 seconds.

Why this is a problem for European plants:
- `open62541` and related libraries are in most modern MES and SCADA stacks, including part of the OmniMES OPC UA client deployments
- OT networks are still often poorly segmented — an attacker who got into the office network via phishing has an easy path to the OT VLAN in many plants
- Signed OPC UA certificates are rarely rotated — typically once at deployment and "forever"

What to actually do in 30 days:
1. **Check the OPC UA library version** in your MES and SCADA. Versions of `open62541` before 1.4.2 are vulnerable. Upgrading to 1.4.2 or later is a priority.
2. **Enable hostname verification in OPC UA certificates** — many integrators disabled this by default "because it works more easily"; that is now a direct backdoor.
3. **IT/OT VLAN segmentation** with a "default deny" rule on the industrial firewall — if you did not have this deployed per [our IT/OT article](/blog/good-practices-for-communication-between-it-and-ot-networks-how-to-build-a-secure-and-modern-industrial-architecture), it is now genuinely urgent.
4. **OPC UA certificate rotation** — plan at least once every 12 months, with an old-certificate revocation procedure.

## Vector 2 — AI model theft from Jetson Orin via side-channel (DEF CON, 7 August)

A Hardware Hacking Village presentation showed **a side-channel attack on Jetson Orin AGX** allowing extraction of a neural model's weights running locally on the device, by measuring power consumption and electromagnetic emissions. Authorship — researchers from Ruhr-Universität Bochum plus an independent team from Warsaw University of Technology (important — Polish participation, so the topic is already in the Polish academic environment).

Specifically: an attacker with physical access to a Jetson Orin (e.g. a service technician, a hired operator, someone on production with server-room access) mounts a measurement probe for 4 to 8 hours. During that time the model running on the Jetson performs standard inference. The probe measures the processor's electromagnetic emissions, the attacker reconstructs the model weights with accuracy sufficient to use it in another location or sell to competition.

Why this is a problem for European industry:
- More and more plants deploy [local AI models on Jetson Orin](/blog/local-rag-in-the-factory-phi-4-sqlite-vec-on-jetson-orin-mes-assistant-without-cloud-data-leakage) — our May article showed this is a sensible architecture for cost and GDPR, but did not discuss the device's physical security
- A model trained on your production data (failure prediction, defect classification in QC, personalized operator assistant) is **valuable IP** — model theft is theft of years of your engineers' work
- Many integrators install Jetsons in easily accessible places on the production floor, without physical protection

What to actually do in 30 days:
1. **Inventory the physical location of all Jetsons in your plant.** If any sits in a place accessible to an outside person — immediately to a locked rack cabinet.
2. **Model watermarking** — a technique of marking a model with a unique "watermark" allowing proof of theft. The `torch-watermark` library is free and can be deployed within a week.
3. **Model splitting** — for the most important models, split inference across two devices in physically separate locations. Substantially complicates a side-channel attack.
4. **Consider quantizing the model to lower precision (INT4) right before production deployment** — quantization makes weight reconstruction via side-channel harder (though it does not eliminate the problem).

## Vector 3 — supply-chain attack through the Python ecosystem in SCADA (BlackHat, 5 August)

A team from Sonatype showed an advanced version of a supply-chain attack, specifically targeted at SCADA environments using open-source Python libraries. Vector: the attacker publishes a Python library with a name deceptively similar to a popular one (typically a well-known library for working with Modbus, MQTT or OPC UA). Installing the package leads to code execution which for three to six months stays in "dormant" mode (no offensive actions), and after that period activates and starts exfiltrating data from the OT network to the attacker's external server.

Specifically, the BlackHat presentation showed four real cases of such libraries detected in the last 8 months: `pymodbus-async` (not to be confused with the legitimate `pymodbus-async-client`), `opcua-utils` (similar to `opcua`), `mqtt-connector` (similar to `paho-mqtt`), `scada-tools`. All four were installed in at least several hundred SCADA environments worldwide at the moment of detection.

Why this is a problem for European industry:
- Many SCADA and MES integrators use Python for integration scripts, custom modules, data pipelines
- Installing a new library via `pip install` is treated in many teams as a trivial operation, without source verification
- OT networks often have outgoing connectivity to the internet (for updates, vendor telemetry, cloud integration) — the attacker has a path for data exfiltration

What to actually do in 30 days:
1. **Introduce a "lock-file only" policy for all Python environments in SCADA and MES** — zero installations of new libraries on production without a pull request, code review and checksum verification.
2. **Audit existing dependencies** — tools like `pip-audit`, `safety` or commercial `Snyk`. Check every installed library for known vulnerabilities and typo-squatting.
3. **Block outgoing traffic from the OT network to the internet**, except for specifically defined destinations (e.g. the MES vendor's update server). This is the single most effective control — even if you install a compromised library, data does not go anywhere externally.
4. **Private PyPI repository (e.g. Artifactory, Nexus)** for SCADA environments — all installations go through a trusted server, no direct access to public PyPI.

## How these three vectors differ from previous years

Three important observations:

**First**, all three presentations showed **working proof-of-concept code** — these are not theoretical attacks. The code is public (two of three on GitHub), so criminal groups will start deploying them in ransomware campaigns within the next 3–6 months. Previous BlackHat presentations about OT were often in the "theoretically possible" register — now they are in the "ready to use" register.

**Second**, two of three vectors (OPC UA and Python supply chain) are **easy to deploy** for an attacker with basic technical knowledge. Previous OT attacks required deep knowledge of specific PLC controllers — the new vectors work universally and can be deployed without knowledge of your specific environment.

**Third**, all three are **directly connected to a real MES deployment** — these are not attacks on some abstract "critical infrastructure", but on a concrete software layer that your plant probably has installed right now.

## Priority action list for the next 30 days

If you had time only for one action from this article — it is blocking outgoing OT-network traffic to the internet with an "allow-list" of precisely defined destinations. This is the single most effective control against all three vectors.

If you have time for three actions — add to it upgrading `open62541` to version 1.4.2 or later and moving AI Jetsons from the production floor to a locked server room.

If you have time for five — add a Python dependency audit (`pip-audit`) and OPC UA certificate rotation.

All these actions fall within the scope of deployer obligations under [NIS2 and the Polish KSC2](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory), so beyond preventing the attack you also close the compliance debt. This is a rare situation where security and compliance priorities align fully — both sides want the same thing.

## Broader context — BlackHat 2026 and industry

It is worth noting something that is not the content of a single presentation, but the direction of the entire conference: **industry has become a priority target** for attacker groups in 2026. There are several reasons. US and EU sanctions regimes cut some organized groups off from traditional revenue sources — ransomware campaigns against producers from wealthy markets (Germany, Poland, Italy) became the main source of financing. The growth of automation and AI integration means that a production-line outage costs more than ever. And the regulatory obligations of incident notification ([NIS2 Art. 23](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory)) mean attacks are increasingly publicly visible, which for the attackers is an additional negotiation lever.

Practical consequence: cybersecurity budgets in European plants must grow faster in 2026 and 2027 than other IT items. Plants that in the next 12 months do not close the three vectors described above will face a ransomware campaign — not "if", but "when".

---

## Sources

- [BlackHat USA 2026 — Briefings archive](https://www.blackhat.com/us-26/briefings.html) — full catalogue of presentations
- [DEF CON 33 — talks and demos](https://defcon.org/html/defcon-33/dc-33-schedule.html) — Hardware Hacking Village, ICS Village
- [CVE-2026-38472](https://nvd.nist.gov/vuln/detail/CVE-2026-38472) — vulnerability in `open62541`
- [Claroty Team82 blog — OPC UA MITM attack](https://claroty.com/team82) — technical description
- [Sonatype State of the Software Supply Chain 2026](https://www.sonatype.com/state-of-the-software-supply-chain) — report on supply-chain attacks
- [Our article: NIS2 and the Polish KSC2 Act in 2026](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) — regulatory context
- [Our article: Good practices for IT/OT communication](/blog/good-practices-for-communication-between-it-and-ot-networks-how-to-build-a-secure-and-modern-industrial-architecture) — VLAN segmentation
- [Our article: Local RAG in the factory — Phi-4 on Jetson Orin](/blog/local-rag-in-the-factory-phi-4-sqlite-vec-on-jetson-orin-mes-assistant-without-cloud-data-leakage) — AI-on-edge architecture
- [OmniMES — cybersecurity and CRA compliance](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/cybersecurity-compliance-cra-pPJBcC6sBf)
