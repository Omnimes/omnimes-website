---
title: 'Unified Namespace in practice: one source of factory data on MQTT and Sparkplug B'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'unified-namespace-in-practice-one-source-of-factory-data-on-mqtt-and-sparkplug-b'
description: 'How to build a Unified Namespace on an MQTT broker and Sparkplug B without replacing your controllers: an ISA-95 topic hierarchy, birth and death certificates, data contracts, broker high availability, IT and OT segmentation and a 30-day plan to get started.'
coverImage: '/images/post-uns-sparkplug/cover-uns-sparkplug.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"uns","label":"UNS"},{"value":"mqtt","label":"MQTT"},{"value":"sparkplugB","label":"Sparkplug B"}]
publishedAt: '2026-10-12T08:00:00.000Z'
---

Take an example plant with every data path built separately. SCADA polls the PLC over OPC, the historian runs its own collector, the MES reads the same signals through another driver, energy meters feed a spreadsheet via a Modbus gateway, and the ERP gets a nightly CSV.

By simple arithmetic, ten systems wired point to point need up to 45 interfaces; twenty need up to 190. A **Unified Namespace (UNS)** flips that: each system connects once, to a broker, publishes what it knows and subscribes to what it needs. Below: building one on MQTT and Sparkplug B without replacing automation, and its limits.

## Where the idea came from

Inductive Automation credits Walker Reynolds, an IIoT and Industry 4.0 solutions architect, with coining and popularising the term. According to Kalypso, Reynolds created the UNS in 2005 (Kalypso, 2025). In February 2025 Reynolds and his team at 4.0 Solutions ran the ProveIt! conference in Dallas. HiveMQ reports 630 participants, 65% of them industrial end users (HiveMQ, 2025).

Inductive Automation defines a UNS as a standardised way to organise and name data that holds an enterprise's structure and events in one communication interface. Kalypso adds that a UNS is a model, not software (Kalypso, 2025).

### An ISA-95 topic hierarchy

The backbone is ISA-95 (IEC 62264), standards for integrating business systems with manufacturing control (ISA), whose hierarchy yields the usual topic path of enterprise, site, area, line and cell (HiveMQ, 2026). Example topics:

```
acme/gliwice/stamping/line-3/press-2/state
acme/gliwice/stamping/line-3/press-2/part-count
acme/gliwice/stamping/line-3/press-2/energy/active-power
acme/gliwice/stamping/line-3/oee
```

The original ISA-95 architecture relied on point-to-point communication between layers such as SCADA, MES and ERP (Inductive Automation). In a UNS, nodes publish to one central place and other nodes subscribe (Deloitte).

## A broker instead of a web of integrations

Andy Stanford-Clark of IBM and Arlen Nipper of Arcom created MQTT in 1999 to connect oil pipelines over satellite with minimal bandwidth and battery use (HiveMQ, MQTT Essentials).

Three properties matter. A client connects to the broker without any notion of other clients, so a device is decoupled from the applications consuming its data. The client opens the connection with a CONNECT packet (Eclipse Foundation, 2022), and a new consumer is a new subscription.

A broker is not a database: it holds at most the last message per topic (Automation World, 2023), so history needs a separate consumer that records the stream.

## What Sparkplug B adds

Plain MQTT defines transport, but not topic structure, payload format or whether a device is alive. Sparkplug fills those gaps.

### Birth and death certificates

An edge node opens its session with NBIRTH, each device behind it with DBIRTH. The birth certificate includes every metric the node will publish, with data types and current values. NDEATH is registered in the CONNECT packet as the MQTT Will Message, so subscribers get it even when the connection drops ungracefully. A `bdSeq` counter from 0 to 255 ties each death to the matching birth (Eclipse Foundation, 2022).

Our conclusion for the MES: without a death certificate it cannot tell a stopped machine from a broken link, as both show zero parts per minute. With one, it knows the data is stale and books no phantom downtime against OEE.

### Report by exception

After the birth, a node sends only changes; the specification says data should not be published periodically but by exception (RBE). Every message carries a sequence number from 0 to 255. If messages arrive out of order or malformed, a host may request a rebirth through the `Node Control/Rebirth` metric (Eclipse Foundation, 2022).

### The primary host and its state

The most important consumer, traditionally the SCADA host, publishes its state on `spBv1.0/STATE/` plus its host ID, as JSON with `online` and `timestamp` fields. If the primary host goes offline, an edge node can store data locally and forward it as historical later (Eclipse Foundation, 2022).

### Formal status

Version 3.0.0, stewarded by the Eclipse Foundation, was released on 16 November 2022. On 7 November 2023 the foundation announced its publication as **ISO/IEC 20237:2023** via the JTC 1 PAS process, alongside a new product compatibility programme (Eclipse Foundation, 2023). Working group members include Chevron, Cirrus Link, HiveMQ and Inductive Automation. The current release is 3.0.0; the repository already accepts changes for 4.0.0 (Eclipse Sparkplug).

### Where Sparkplug chafes

A Sparkplug topic has a fixed shape, `spBv1.0/group_id/message_type/edge_node_id/device_id` (Eclipse Foundation, 2022), which HiveMQ says hampers enterprise hierarchies. The so-called Parris method packs the hierarchy into `group_id` with delimiters, as in `spBv1.0/Plant1:Area3:Line4:Cell2/NDATA/node1`. The Schultz method runs brokers at each level and aggregates them into an enterprise namespace. Since metrics travel bundled in messages, you cannot subscribe to a single data point (HiveMQ, 2026).

One answer is two tiers: Sparkplug at the edge, where session state matters, plain MQTT in the enterprise namespace. At ICC 2026 HiveMQ showed Ignition Edge reading OPC UA tags and publishing Sparkplug B, with the broker decoding it once and fanning it out as plain MQTT (HiveMQ, 2026).

## What MES, ERP and analytics get out of it

The next two paragraphs are our assessment. **The MES** gets events as they happen, without polling controllers, plus a reliable view of connectivity, so machine states and OEE can come from signals instead of manual entries.

**The ERP** needs no raw tags. It can subscribe to aggregates, such as good parts per work order, and publish orders for the MES to assign to lines.

**Analytics and AI** get data with context built into the name. Nearly 70% of manufacturers say data problems, including quality, contextualisation and validation, are the biggest obstacle to AI (Deloitte, 2024). In a survey of 600 executives at large manufacturers operating in the US, 54% reported a data standard through a unified data model and 45% an architecture standard (Deloitte, 2025). IoT Analytics estimates 21.1 billion connected IoT devices at the end of 2025 and forecasts 39 billion by 2030 (IoT Analytics, 2025).

## Who is doing it

- **Ford** chose HiveMQ as the backbone of IIoT monitoring for thousands of machines per plant across dozens of sites. Gopalakrishnan Rajaram, solution architect for industrial systems, cites "huge cost savings" from moving away from a distributed infrastructure. The case study does not mention UNS or Sparkplug (HiveMQ, 2025).
- **Mercedes-Benz** runs vehicle diagnostics on HiveMQ across 24 factories: 10,000 test devices, around 470 million messages a month. Downtime beyond 10 minutes risks stopping the assembly line (HiveMQ, 2023).
- **Eli Lilly** has been building an equipment connectivity platform since 2022, where several hundred lab and manufacturing instruments publish Sparkplug B data, linked to MES and LES (HiveMQ).
- **Anglian Water**, the largest UK water and water recycling company by area, built a UNS on MQTT with HiveMQ (HiveMQ, 2024). According to Novotek it covers more than 10,000 assets and over a million telemetry points (Novotek, 2025).

## What it looks like in a working MES

In OmniMES the UNS layer is an **EMQX** broker, exposing MQTT on port 1883 and encrypted MQTTS on 8883, with broker clients authenticated against PostgreSQL. The stream service (Node.js) subscribes to Sparkplug topics, writes measurements into a **TimescaleDB** hypertable and keeps the latest values. Since version 4.1, released in July 2026, it also ingests measurements from plain MQTT topics.

The MES is one consumer among several, not the centre. In UNS terms, the latest values mirror the current namespace state and the hypertable holds the history the broker lacks. Automatic signal discovery is narrowed by a topic name filter and filtering rules. Machine states and OEE are computed from signals, dashboards are built in Redash, and an MCP server exposes the same data to AI assistants. None of these consumers needs a change to the PLC.

## Namespace governance, semantics and data contracts

Some UNS problems are not technical. Departments and locations disagree on naming standards (Automation World, 2023), and Kalypso warns against expecting a UNS to translate raw data into business language by itself (Kalypso, 2025). Our proposed rules:

1. **One namespace owner** who approves new branches and renames.
2. **A convention written before the first publish.** Lower case, no spaces or diacritics, stable identifiers: "press-2", not "the old press by the gate".
3. **Raw data apart from processed data.** HiveMQ suggests an edge branch for raw tags, a functional branch for KPIs such as OEE or MTTR, and versioned namespaces (HiveMQ, 2026).
4. **A contract per signal**: type, unit, range, owner, consumers. Sparkplug helps: data types travel in the birth certificate, extra properties fit in a PropertySet, and complex structures can use templates defined only in NBIRTH (Eclipse Foundation, 2022). CESMII develops Smart Manufacturing Profiles, information models that move data together with its context (CESMII).
5. **A rename is a breaking change.** Every subscriber loses data, so keep the old topic alive during a transition.

An example contract:

```json
{
  "topic": "acme/gliwice/stamping/line-3/press-2/energy/active-power",
  "type": "Float",
  "unit": "kW",
  "range": [0, 400],
  "reporting": "on change, 0.5 kW deadband",
  "owner": "maintenance",
  "consumers": ["MES", "OmniEnergy", "historian"]
}
```

## Broker high availability

Carrying all traffic, a broker is a single point of failure; at Mercedes-Benz ten minutes of downtime threatens the line. One option is a cluster: EMQX 5 splits nodes into core and replicant roles, and in a vendor test a 23-node cluster handled 100 million connections and a million messages per second (EMQ, 2022). The other is broker clusters in each plant plus a central cluster in the cloud, which HiveMQ says mitigates single points of failure (HiveMQ, 2026).

From version 5.9, announced on 7 May 2025, EMQX ships under the Business Source License 1.1. A single node runs in production free of charge, as long as EMQX is not offered as a service or embedded in a product sold to third parties. Clustering needs a commercial licence, and each release converts to Apache 2.0 four years after it ships (EMQ, 2025).

## Security: TLS, authentication, segmentation

Texas A&M researchers report that, per Shodan, over 500,000 internet devices use MQTT without a username or password, home automation being the largest exposed category (Ghazi Asgar and Reddy, 2025). The Sparkplug specification treats security non-normatively, discussing three layers: TLS, client authentication and access control lists (Eclipse Foundation, 2022). Our recommendations:

- **TLS on port 8883**, the port reserved for MQTT over TLS (HiveMQ, 2026), at least for connections leaving the machine segment.
- **Separate credentials per node**, never one shared account for the floor.
- **Topic-level ACLs.** In the specification's example, edge node E1 in group G1 may publish only its own NBIRTH, NDATA and NDEATH, and subscribe only to its own commands and its primary host state. That makes spoofing other nodes with stolen credentials harder (Eclipse Foundation, 2022).
- **IT and OT segmentation** on the IEC 62443 zones and conduits model, where DMZ firewalls control the information flow (Phoenix Contact). HiveMQ recommends placing the broker in a DMZ, with additional firewall protection for internal systems (HiveMQ, 2026). Our conclusion: since the client opens the connection, a broker outside the controller network needs no inbound traffic into it.
- **Commands separate from reads.** NCMD and DCMD carry commands to nodes and devices, and the specification names ACLs as a way to limit who may publish them (Eclipse Foundation, 2022). Initially, reserve that right for the primary host.

## Getting started: a 30-day plan

This is our proposed scenario, not a research finding.

**Week 1: scope and names.** One line, a few dozen signals the MES needs: states, counters, energy. Write the naming convention and first contracts. Older PLCs without MQTT need a protocol conversion gateway (Automation World, 2023), here to Sparkplug B. The PLC program stays untouched.

**Week 2: broker and first node.** TLS and ACLs from day one, one edge node. Then the pulled-cable test: unplug the network, an NDEATH must arrive, and the MES must show lost communication, not downtime.

**Week 3: first consumers.** History, machine states and OEE in the MES, compared against reports for the same shift.

**Week 4: the real test.** Connect a second consumer, such as an energy dashboard or an ERP aggregate, with no change at the source. If you had to touch a PLC or gateway, fix the namespace before it spreads. End the month with a written high-availability plan and a named namespace owner.

## Barriers and limitations

- **A broker is not a historian.** It keeps only the last message, and historical and transactional data need extra integration (Automation World, 2023).
- **Sparkplug implementations vary.** Not every participant decodes messages correctly, and the device-centric design limits flexibility (Automation World, 2023).
- **Commands over MQTT are asynchronous**, so acknowledging execution is yours to build (Automation World, 2023).
- **Market maturity.** Even advocates admit UNS in its explicit form is not yet widely adopted (UMH, 2024). The case studies cited here come from technology vendors and their partners, and none quantifies return on investment.
- **The cost of high availability**, especially after the EMQX licence change.

## What follows

A UNS is a discipline, not a product. An MQTT broker and Sparkplug B handle transport, session state and signal discovery, but the value comes from a well-kept namespace with data contracts, and no vendor can write those for your plant.

Getting started needs no new automation. In our assessment, a gateway next to an existing PLC, a broker with TLS and one line are enough to test, within a month, what matters most: whether the second and third consumers connect without touching the source. If they do, each further system costs a subscription, not an integration project. Plan high availability and segmentation before a plant-wide rollout, because then production starts to depend on the broker.

## Sources

- Inductive Automation, *What is Unified Namespace (UNS)* — https://inductiveautomation.com/resources/article/uns-unified-namespace
- Kalypso, *Unified Namespace and Data Management*, May 2025 — https://kalypso.com/viewpoints/entry/unified-namespace-and-data-management
- UMH, *Chapter 2: The Rise of the Unified Namespace*, January 2024 — https://www.umh.app/insight/chapter-2-the-rise-of-the-unified-namespace
- HiveMQ, *Insights from ProveIt! 2025*, 2025 — https://www.hivemq.com/blog/insights-proveit-2025-unified-namespace-solutions-in-action/
- ISA, *ISA-95 Standard* — https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard
- HiveMQ, *MQTT Essentials Part 1* — https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt/
- Eclipse Foundation: Sparkplug 3.0.0 specification, release page (16 November 2022) and ISO/IEC 20237 announcement (7 November 2023) — https://sparkplug.eclipse.org/specification/version/3.0/documents/sparkplug-specification-3.0.0.pdf, https://projects.eclipse.org/projects/iot.sparkplug/releases/3.0.0/plan, https://newsroom.eclipse.org/node/39754
- Eclipse Sparkplug, working group and repository — https://sparkplug.eclipse.org/, https://github.com/eclipse-sparkplug/sparkplug
- HiveMQ (Manditereza), articles on implementing, designing and securing a UNS, 2026 — https://www.hivemq.com/blog/implementing-unified-namespace-uns-mqtt-sparkplug/, https://www.hivemq.com/blog/designing-your-uns-semantic-information-hierarchy/, https://www.hivemq.com/blog/securing-unified-namespace-architecture-for-iiot/
- HiveMQ, *HiveMQ at ICC 2026*, 2 October 2026 — https://www.hivemq.com/blog/hivemq-ignition-icc-industrial-data-context/
- Deloitte, *Industrial DataOps and unified namespace* — https://www.deloitte.com/us/en/services/consulting/articles/industrial-dataops-and-unified-namespace.html
- Deloitte, *2025 Manufacturing Industry Outlook*, 20 November 2024 — https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-industry-outlook/2025.html
- Deloitte, *2025 Smart Manufacturing and Operations Survey*, 2025 — https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/2025-smart-manufacturing-survey.html
- IoT Analytics, *Number of connected IoT devices*, 28 October 2025 — https://iot-analytics.com/number-connected-iot-devices/
- HiveMQ, case studies: Ford (2025), Mercedes-Benz (2023), Eli Lilly, Anglian Water (2024) — https://www.hivemq.com/case-studies/ford/, https://www.hivemq.com/case-studies/daimler/, https://www.hivemq.com/case-studies/eli-lilly/, https://www.hivemq.com/case-studies/anglian-water/
- Novotek, *How Anglian Water unified their OT data*, July 2025 — https://www.novotek.com/co-uk/news/how-anglian-water-unified-their-ot-data-for-predictive-maintenance/
- EMQ, *How EMQX 5.0 achieves 100 million MQTT connections*, August 2022 — https://www.emqx.com/en/blog/how-emqx-5-0-achieves-100-million-mqtt-connections
- EMQ, move to BSL 1.1, 7 May 2025, and licensing FAQ — https://www.emqx.com/en/blog/adopting-business-source-license-to-accelerate-mqtt-and-ai-innovation, https://www.emqx.com/en/content/license-faq
- S. A. Ghazi Asgar, N. Reddy, *Analysis of Misconfigured IoT MQTT Deployments*, NDSS SDIoTSec 2025 — https://www.ndss-symposium.org/wp-content/uploads/sdiotsec25-10.pdf
- Phoenix Contact, *Zones and conduits* — https://engineer.plcnext.help/latest/ZonesConduits.htm
- CESMII, *SM Profiles* — https://www.cesmii.org/platform/sm-profiles/
- Automation World (Koreshkov), *UNS: Real-World Applications and Challenges*, 11 December 2023 — https://www.automationworld.com/factory/iiot/article/33016191/unified-namespace-real-world-applications-and-challenges
