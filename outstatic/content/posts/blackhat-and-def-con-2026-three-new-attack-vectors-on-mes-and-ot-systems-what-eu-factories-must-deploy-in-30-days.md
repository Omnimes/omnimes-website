---
title: 'Black Hat USA 2026 and DEF CON 34: three attack vectors against MES and OT systems — what factories should deploy in 30 days'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'blackhat-and-def-con-2026-three-new-attack-vectors-on-mes-and-ot-systems-what-eu-factories-must-deploy-in-30-days'
description: 'Black Hat USA 2026 and DEF CON 34 brought three threads that matter to manufacturers: the inside story of the December 2025 attack on Poland''s energy sector and a manufacturing company (lateral movement into OT through a private APN), weaknesses in industrial protocols and engineering software (CC-Link IE TSN, OPC UA, open62541, Siemens S7), and vulnerabilities in local AI runtimes. We cover what was actually presented and propose a 30-day action list.'
coverImage: '/images/post-blackhat-2026/cover-blackhat-2026.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"cyberbezpieczenstwo","label":"cyberbezpieczenstwo"},{"value":"itOt","label":"it-ot"},{"value":"nis2","label":"NIS2"}]
publishedAt: '2026-08-24T08:00:00.000Z'
---

*This article was corrected on 6 October 2026. The first version contained false information about conference presentations, vulnerabilities and software packages.*

Black Hat USA 2026 ran from 1 to 6 August at Mandalay Bay in Las Vegas, with the Briefings on 5 and 6 August. DEF CON 34 followed from 6 to 9 August at the Las Vegas Convention Center. We picked three threads that bear directly on OT networks and the systems around an MES: the 29 December 2025 attack on Poland's energy sector and a manufacturing company, weaknesses in industrial protocols and engineering software, and the security of AI models running at the network edge.

A Black Hat panel on critical infrastructure set the tone. Matthew Rogers, who leads OT cybersecurity at CISA, said: "Out of all the activity we've seen over the past couple of months, none of it is using a single CVE in OT." He added: "Nobody's using TLS. All of this is unencrypted and unsigned" (Cybersecurity Dive, 6 August 2026). The first two threads bear him out: attackers got in through default passwords, exposed admin interfaces and poorly separated networks. The third concerns a newer layer, AI models deployed inside the plant.

## Vector 1 — from a wind farm to a heat and power plant via a private APN

### What happened on 29 December 2025

According to CERT Polska's report of 30 January 2026, coordinated attacks on 29 December hit at least 30 wind and solar farms, a combined heat and power (CHP) plant supplying heat to nearly half a million customers, and a private company in the manufacturing sector. All of them were purely destructive, with no ransom demand. The attacker's infrastructure overlapped heavily with activity clusters known as Static Tundra, Berserk Bear, Ghost Blizzard and Dragonfly.

At the renewable sites, the entry point was a FortiGate device acting as VPN concentrator and firewall, with the VPN exposed to the internet and no multi-factor authentication. From there the attacker used default credentials to upload corrupted firmware to Hitachi RTU560 controllers and to reset Moxa NPort serial device servers, changing their password and setting the unreachable IP address 127.0.0.1. Generation continued, but the farms lost communication with the distribution system operators. At the large CHP plant, EDR blocked execution of the wiper, which CERT Polska named DynoWiper.

The manufacturing company was, according to CERT Polska, an opportunistic target. The attacker entered through a Fortinet perimeter device that had been vulnerable in the past and whose configuration had been stolen and published, including on a criminal forum. With administrative access to a domain controller, the attacker pushed a PowerShell file-destruction script (LazyWiper) through a Group Policy Object. CERT Polska also describes the attacker logging into M365 with credentials taken from on-premises networks and downloading files and emails about OT modernisation and SCADA systems.

### What was presented at DEF CON 34

On 8 August, Marcin Dudek, head of CERT Polska, spoke on the DEF CON 34 main track: "From Wind Farm to CHP Plant: The Untold Story of Lateral Movement in a Polish Energy Sector Attack". The same day CERT Polska published a follow-up report on a second, smaller CHP plant that supplies heat to about 50,000 residents. The reconstructed attack path:

1. Access to the FortiGate VPN concentrator at a wind farm.
2. SSH into a Teltonika RUTX50 cellular router, then most likely an SSH tunnel into the private APN (a dedicated mobile data network) run by the distribution system operator.
3. From 18 December, scans of the APN for VNC, HTTP, S7 and Modbus.
4. At the CHP plant, a WAGO PFC200 PLC with a built-in cellular modem, its web admin interface reachable from the APN with default "admin" credentials. The attacker enabled SSH and used it as a gateway into the plant's OT network.
5. Reconnaissance from 18 to 25 December, including scans for S7 (TCP port 102), Modbus (TCP 502) and CODESYS (TCP 11740). On 25 December the attacker connected over S7 to three Siemens PLCs.
6. On 29 December the attacker was active in the plant network from roughly 5:30 to 10:10. According to plant staff, S7-300, S7-1200 and S7-1500 PLCs were switched to STOP mode and password-protected. The steam turbine and the process-water treatment system shut down, interrupting cogeneration.

Quick action by the operators meant customers saw no interruption in heat or electricity supply. The plant first blamed an error by a maintenance contractor and reported the event for information only; CERT Polska treated it as a possible cyberattack, and the analysis took more than three months. Restoring the PLCs to factory settings shortened the outage but wiped their logs. The attacker also corrupted the partition table of the WAGO gateway.

CERT Polska believes this is the first observed real-world attack that reached an OT network through a private APN. It was possible because any two devices on the APN could talk to each other. CERT Polska's surveys found this configuration common in Poland, and the team believes it is widespread in other countries too. Joe Slowik (Dataminr) also discussed the incident in his ICS Village talk, "Lessons Learned from Poland and Beyond".

### What this means for a factory

CERT Polska recommends that private APN users enable client isolation, and treat the APN as untrusted (as equivalent to the internet if they do not control it). They should allow OT-to-APN traffic only through allowlist rules and monitor it, with central logging. Admin services (web, SSH, Telnet) should not be exposed towards the APN, default credentials should be changed, and APNs should be included in penetration tests and red team exercises.

Our assessment: plants also run cellular routers, PLCs with modems and remote vendor service access, so these recommendations apply well beyond energy. The second lesson comes straight from CERT Polska: report not only confirmed incidents but also unexplained failures and operational disruptions.

## Vector 2 — industrial protocols and engineering software

### CC-Link IE TSN: manipulating I/O values

At Black Hat USA 2026, Nozomi Networks offered paying attendees a recorded session, "Deterministic Chaos — Exploiting and Securing Predictable Timing in TSN Industrial Networks" (Alessandro Di Pinto, Luca Cremona, Gabriele Quagliarella). It describes an attack on Mitsubishi Electric's CC-Link IE TSN protocol that chains zero-day vulnerabilities in TSN switches with protocol-level packet injection, allowing precise, stealthy manipulation of I/O values between controllers and field devices.

On 30 July 2026 Mitsubishi Electric published an advisory for CVE-2026-13584 in CC-Link IE TSN, crediting Nozomi Networks researchers. It is a CWE-924 issue (improper enforcement of message integrity) with a CVSS v4 base score of 7.1. An attacker with access to a CC-Link IE TSN network can tamper with control I/O data by sending crafted packets under specific timing conditions. All versions of the listed products are affected, including MELSEC controllers, motion modules, inverters, servo drives and robot controllers. The vendor lists no fixed version. Instead it recommends restricting physical access (site access control, locked control panels, Ethernet port locks), running the products on a trusted network behind a firewall, and configuring credentials properly on boundary devices.

### HMI engineering tools as part of the supply chain

At DEF CON 34, researchers from CYTUR (Jiwoon Yoo, TaeWoo Kim, Eunji Choi) presented "Drag, Drop, Deploy, Compromise". They found vulnerabilities in HMI engineering software: memory corruption when parsing project files, DLL search-path hijacking, loading of unsigned components, UI spoofing through silent font installation, and fallback to plaintext when a secure OPC UA connection fails. Their argument: the ICS supply chain does not start at a vendor's update server. It also includes customers' project files, integrators' templates and maintenance backups.

### open62541: a wave of CVEs around the turn of July and August

Between 30 July and 6 August 2026, NVD published more than a dozen CVE entries for open62541, the open-source C implementation of OPC UA. Most are denial-of-service and memory-safety bugs. Three examples:
- **CVE-2026-65423** (CVSS 8.8, 30 July): an integer overflow in the arrayDimensions calculation leads to an out-of-bounds write. Versions up to 1.3.17, 1.4.16 and 1.5.4 are affected.
- **CVE-2026-63035** (CVSS 8.1, 30 July): a use-after-free in the TransferSubscriptions service. According to its description, it may let an authenticated attacker execute code.
- **CVE-2026-67870** (CVSS 9.8, August): incomplete validation in AddReferences in version 1.5.5 lets a remote attacker crash the server.

These are coding bugs, not flaws that allow OPC UA traffic to be intercepted or rewritten.

The maintainers shipped maintenance releases 1.5.6 and 1.4.18 on 27 July, then 1.5.7 and 1.4.19 on 20 August. Their release notes list fixes in the same areas the CVEs describe: arrayDimensions, AddReferences, GDS, HistoryRead and discoveryUrl handling. Not every CVE entry names a fixed version, so the safer assumption is the latest release on your branch.

OPC UA problems are not only about code. A study of internet-reachable OPC UA deployments (Dahlmanns et al., IMC 2020) found security misconfigurations on 92% of them: missing access control (24% of hosts), disabled security functionality (24%) and deprecated cryptography (25%). Several hundred devices shared the same certificate.

### Siemens S7: CISA advisory AA26-231A

On 19 August 2026, NSA, CISA, FBI, the US Department of Energy and the EPA issued joint advisory AA26-231A on an active threat to Siemens S7 PLCs, from the S7-200 up to the S7-1500. Threat actors use internet scanning services such as Censys and ZoomEye to find S7 PLCs that are internet-exposed or poorly segmented. They then run AI-generated Python scripts built on the snap7 library. The scripts masquerade as legitimate monitoring tools and read and write PLC data blocks. The affected sectors listed are Critical Manufacturing, Energy, Water and Wastewater, Chemical, Food and Agriculture, and Commercial Facilities.

The advisory calls for an inventory of S7 PLCs, critical patches, verified segmentation with no internet exposure, stronger access controls, comprehensive logging and S7-specific hardening. It is the same protocol that was used to stop the PLCs at the Polish CHP plant.

## Vector 3 — local AI at the edge

Our May article on local RAG described an architecture that runs Phi-4 on Jetson Orin through llama.cpp or Ollama. On 7 August, on the DEF CON 34 main track, Ofek Itach and Vladimir Tokarev of Cyera presented "Breaking Local AI Runtimes: Exploiting llama.cpp and Ollama". Their point: these runtimes are ordinary native code, with the usual bugs.

- In the llama.cpp Android integration, Java can free a native model context still in use; the authors demonstrated code execution in the embedding app.
- In the llama.cpp server, idle-model teardown can race an active request and leave a dangling pointer. The authors showed remote exploitation of this primitive and outlined the remaining steps to stable code execution.
- In Ollama, malicious GGUF metadata can trigger an out-of-bounds read during quantization that returns heap data.

The second topic is theft of the model itself. This research was not presented in Las Vegas, but it reflects the state of the art:
- **BarraCUDA** (USENIX Security 2025; Radboud University, Masaryk University, Ruhr University Bochum) recovered neural-network weights from a Jetson Nano and a Jetson Orin Nano through electromagnetic analysis, which requires physical access. On the INT8 Orin Nano, trace collection took one day and alignment another, then about five minutes per weight, and only the first layer's weights were recovered.
- **Kraken** (IEEE SaTML 2026), largely the same team, reports the first parameter extraction from GPU Tensor Cores and an exploratory analysis of LLM hyperparameter and weight leakage from 100 cm away, through glass.

## Barriers and limitations

- **Not everything can be patched.** For CVE-2026-13584 the vendor offers mitigations, not a fix. Rogers noted that the US lacks enough ICS equipment to replace devices at any scale.
- **Libraries inside vendor products.** If open62541 is embedded in a SCADA or HMI product, the vendor sets the pace of updates (our assessment).
- **Fast recovery versus forensics.** A factory reset shortens downtime but destroys evidence, as at the CHP plant.
- **Side channels are not an overnight threat.** BarraCUDA needed physical access, lab equipment and days of work. The risk is real for valuable models but ranks below the basics in vectors 1 and 2 (our assessment).
- **Protocol security does not replace segmentation.** The HMI plaintext fallback and the IMC 2020 findings show that having OPC UA security features does not mean they are switched on.

## 30-day action list

This list is our recommendation, not a requirement of any of the sources.

**Week 1 — inbound access paths.**
1. Inventory every remote access point (VPN concentrators, cellular routers, PLCs with modems, vendor service access) and enforce multi-factor authentication on every VPN.
2. Hunt for default credentials on RTUs, serial device servers, PLCs and switches.

**Week 2 — network segmentation.**
3. Allowlist-only traffic between OT and WAN links, APNs and the office network, with default deny (see our [IT and OT networking article](/blog/good-practices-for-communication-between-it-and-ot-networks-how-to-build-a-secure-and-modern-industrial-architecture)).
4. No web, SSH or Telnet admin interfaces on external-facing sides; no S7 PLC reachable from the internet.
5. On a private APN, ask your operator about client isolation.

**Week 3 — software.**
6. Inventory OPC UA components in MES, SCADA and HMI and ask vendors which open62541 version they ship. Where you control it, run at least 1.5.7 or 1.4.19.
7. Open HMI and PLC project files only from verified sources; check OPC UA settings for silent fallback to unsecured modes.
8. Keep llama.cpp and Ollama current, load GGUF files only from trusted sources, keep inference servers inside their segment and lock edge devices in cabinets (see our [local RAG on Jetson Orin article](/blog/local-rag-in-the-factory-phi-4-sqlite-vec-on-jetson-orin-mes-assistant-without-cloud-data-leakage)).

**Week 4 — detection and response.**
9. Centralise logs from edge devices, APN gateways and engineering workstations; watch for unusual S7 and Modbus connections.
10. Route every unexplained PLC failure to the security team, and preserve logs, configuration and logic before any factory reset.
11. Run a tabletop exercise on the Polish CHP scenario.

Article 23 of the NIS2 Directive requires essential and important entities to send an early warning within 24 hours of becoming aware of a significant incident, a notification within 72 hours and a final report within one month. Items 9–11 make those deadlines far easier to meet. For the Polish and EU context, see our article on [NIS2 and the Polish KSC2 Act](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory).

## Update (6 October 2026)

- **open62541.** Releases 1.5.8 and 1.4.20 shipped on 6 September, and 1.5.9 and 1.4.21 on 4 October. NVD published another entry, CVE-2026-82623 (CVSS 5.3), on 31 August. Current advice: run the latest release on your branch.
- **CC-Link IE TSN.** On 17 September Mitsubishi Electric updated its CVE-2026-13584 advisory with a revised list of affected products. CISA's updated advisory ICSA-26-211-07 states that no fix is planned.
- **Ransomware.** NCC Group counted 894 ransomware attacks in July 2026, up 22% on June. Industrials accounted for 28% and Europe for 29% (report dated 26 August). August brought 1,073 attacks: 31% on industrials, 26% in Europe, with Qilin the most active group at 164 incidents (Infosecurity Magazine, 23 September).
- **Correction.** The first version attributed CVE-2026-38472 to open62541; it is in fact a cross-site scripting flaw in GazellePW. The Claroty and Sonatype talks, the Jetson Orin AGX attack, the Python packages and the model-watermarking library described earlier could not be confirmed in any source and have been removed.

---

## Sources

- [CERT Polska — Energy Sector Incident Report, 30 January 2026](https://cert.pl/en/posts/2026/01/incident-report-energy-sector-2025/) — the 29 December 2025 attacks (renewables, CHP plant, manufacturing company)
- [CERT Polska — Follow-Up Report of the December 2025 Energy Sector Incident, 8 August 2026](https://cert.pl/en/posts/2026/08/incident-follow-up-report-energy-sector-2025/) — second CHP plant, private APN, recommendations
- [DEF CON 34 — main track speakers](https://defcon.org/html/defcon-34/dc-34-speakers.html) — CERT Polska and Cyera talks
- [DEF CON 34 — Creator Talks](https://defcon.org/html/defcon-34/dc-34-creator-talks.html) — CYTUR (HMI) and Joe Slowik (ICS Village)
- [DEF CON 34 — conference home page](https://defcon.org/html/defcon-34/dc-34-index.html) — dates and venue
- [Black Hat USA 2026 — conference guide](https://www.decryptiondigest.com/blog/black-hat-usa-2026-guide) — training and Briefings dates
- [Nozomi Networks — Black Hat USA 2026](https://www.nozominetworks.com/featured-event/black-hat-2026) — "Deterministic Chaos" session on CC-Link IE TSN
- [Mitsubishi Electric — advisory 2026-005 (CVE-2026-13584)](https://www.mitsubishielectric.com/psirt/vulnerability/pdf/2026-005_en.pdf)
- [CISA — ICSA-26-211-07, Mitsubishi Electric CC-Link IE TSN](https://www.cisa.gov/news-events/ics-advisories/icsa-26-211-07)
- [OpenCVE — open62541 vulnerabilities](https://app.opencve.io/cve/?vendor=open62541)
- [OpenCVE — CVE-2026-65423](https://app.opencve.io/cve/CVE-2026-65423), [CVE-2026-63035](https://app.opencve.io/cve/CVE-2026-63035), [CVE-2026-67870](https://app.opencve.io/cve/CVE-2026-67870)
- [open62541 — GitHub releases](https://github.com/open62541/open62541/releases) — release notes for 1.4.18–1.4.21 and 1.5.6–1.5.9
- [Dahlmanns et al., "Easing the Conscience with OPC UA", IMC 2020](https://arxiv.org/abs/2010.13539)
- [CISA — AA26-231A, Defending Against an Active Threat to Siemens S7 Series PLCs, 19 August 2026](https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-231a)
- [Cybersecurity Dive — Black Hat USA 2026 panel on OT attacks, 6 August 2026](https://www.cybersecuritydive.com/news/critical-infrastructure-destructive-cyberattacks-black-hat/827260/)
- [Horvath et al., "BarraCUDA: Edge GPUs do Leak DNN Weights", USENIX Security 2025](https://www.usenix.org/conference/usenixsecurity25/presentation/horvath) and [arXiv version](https://arxiv.org/abs/2312.07783)
- [Horvath et al., "Kraken: Higher-order EM Side-Channel Attacks on DNNs in Near and Far Field", IEEE SaTML 2026](https://arxiv.org/abs/2603.02891)
- [Advisera — NIS2 Article 23 "Reporting obligations"](https://advisera.com/nis2/reporting-obligations/)
- [NCC Group — Monthly Threat Pulse, July 2026](https://www.nccgroup.com/newsroom/ncc-group-monthly-threat-pulse-review-of-july-2026/)
- [Infosecurity Magazine — NCC Group data for August 2026](https://www.infosecurity-magazine.com/news/ransomware-attacks-reach-record/)
- [OpenCVE — CVE-2026-38472 (GazellePW)](https://app.opencve.io/cve/CVE-2026-38472) — for the correction of the first version

## Related reading

- [NIS2 and the Polish KSC2 Act in 2026: how MES becomes cyber-compliance evidence for an EU factory](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory)
- [Good practices for communication between IT and OT networks](/blog/good-practices-for-communication-between-it-and-ot-networks-how-to-build-a-secure-and-modern-industrial-architecture)
- [Local RAG in the factory: Phi-4 + sqlite-vec on Jetson Orin](/blog/local-rag-in-the-factory-phi-4-sqlite-vec-on-jetson-orin-mes-assistant-without-cloud-data-leakage)
- [OmniMES — cybersecurity and CRA compliance](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/cybersecurity-compliance-cra-pPJBcC6sBf)
