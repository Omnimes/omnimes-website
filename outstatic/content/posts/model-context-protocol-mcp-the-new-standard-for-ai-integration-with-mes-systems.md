---
title: 'Model Context Protocol (MCP): the new standard for AI integration with MES systems. How to open production data to LLM agents without vendor lock-in'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'model-context-protocol-mcp-the-new-standard-for-ai-integration-with-mes-systems'
description: 'Model Context Protocol (MCP), released by Anthropic in November 2024 and adopted in 2025 by OpenAI, Google and Microsoft, has become the de facto standard for connecting LLM agents to external data and tools. For the MES world, it ends the era of "one integration per model" and starts an architecture in which a plant exposes its data once — and Claude, ChatGPT, Gemini, and home-grown agents all plug in. This article explains how MCP works, what to expose from an MES, how to design it safely (lethal trifecta, IT/OT zoning), and when MCP simply does not make sense.'
coverImage: '/images/post-mcp-mes/cover-mcp-mes.svg'
lang: 'en'
tags: [{"value":"AI","label":"AI"},{"value":"agentAi","label":"AGENT AI"},{"value":"omniMES","label":"OmniMES"},{"value":"mcp","label":"MCP"}]
publishedAt: '2026-04-27T08:00:00.000Z'
---

In November 2024, Anthropic released **Model Context Protocol (MCP)** — an open protocol for connecting large language model applications with external data sources and tools. For the first four months it was treated as "yet another interesting Anthropic project." On 26 March 2025 that changed: **OpenAI announced official MCP support in the Agents SDK, Responses API and ChatGPT Desktop**. Google DeepMind followed in April, Microsoft in May (Windows 11 and Copilot Studio). Monthly SDK downloads jumped from 8 million in March to **97 million in November 2025** ([Anthropic, anniversary post](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)). In December 2025 Anthropic donated MCP to the **Linux Foundation** (Agentic AI Foundation, co-founded with Block and OpenAI), ending the "single-vendor protocol" phase.

For industrial software — MES operators, integrators, SCADA and CMMS vendors — this is not just hype. It is an architectural shift you cannot afford to ignore. This article explains what MCP is, why it matters for MES-class systems, how to expose plant data to LLM agents, where the real security pitfalls lie, and when you should **not** deploy MCP.

## The problem MCP solves: M × N integrations

The classic AI-to-MES integration scenario looks like this: an in-house team (or partner) writes a wrapper on top of the MES REST API, tailored to a specific model — function calling for GPT-4, tool use for Claude, a custom loop for LangChain, a plugin for ChatGPT (deprecated since April 2024). Every new model = new wrapper. Every new plant = re-deployment. Every change to the MES API = updates across N wrappers.

This is the M × N problem: M models times N systems. In practice, most industrial AI projects stall right here — not because the LLM cannot generate a shift report, but because the cost of maintaining the integration grows faster than the value the agent delivers.

MCP fixes this by standardising the **client ↔ server** layer. The plant exposes a single **MCP server** (with OEE data, alarms, batch status, etc.), and any MCP client plugs in — Claude Desktop, ChatGPT Desktop, an IDE assistant, your own Python agent. Exactly the way Microsoft’s Language Server Protocol (LSP) decoupled editors from specific programming languages back in 2016.

The New Stack called MCP **"the USB-C of AI integrations"** ([thenewstack.io](https://thenewstack.io/why-the-model-context-protocol-won/)). A slogan, but an apt one: one connector, many devices.

## What MCP actually is

MCP is a client–server protocol on top of JSON-RPC 2.0. The server can expose three primary primitives to the client:

- **Tools** — functions the LLM can call (typed via JSON Schema). Example: `getOEE(line, range)`, `acknowledgeAlarm(alarmId)`.
- **Resources** — read-only data the host can attach to model context (files, DB rows, telemetry).
- **Prompts** — server-supplied prompt templates (e.g. "shift report for line X in customer Y’s SOP format").

The 2025 spec added two more: **Sampling** (the server can ask the client’s LLM to complete a generation — this is what enables agentic loops) and **Roots/Elicitation** (scoped resource boundaries, structured user input).

Transports:

- **stdio** — local process (default for desktop clients).
- **Streamable HTTP** — introduced in spec `2025-03-26`, replacing the earlier HTTP+SSE (officially deprecated in `2025-06-18`). Single endpoint, optional SSE upgrade, supports running the server in a cluster behind a load balancer. In March 2026 Zylos called this **"the single most impactful change in MCP’s history"** ([zylos.ai](https://zylos.ai/research/2026-03-08-mcp-remote-evolution-streamable-http-enterprise-adoption)) — without Streamable HTTP, enterprise deployments were practically impossible.

Authentication: in March 2025 **OAuth 2.1 + PKCE** became normative. In June 2025 MCP servers were redefined as **OAuth Resource Servers** — token issuance moved to external Identity Providers (Auth0, Keycloak, Microsoft Entra ID). The November 2025 revision made PKCE mandatory and added Client Instance Metadata Document (CIMD) for per-instance identity ([Stack Overflow Blog, January 2026](https://stackoverflow.blog/2026/01/21/is-that-allowed-authentication-and-authorization-in-model-context-protocol/)).

This is critical for industrial use: **MCP does not require you to abandon your existing IdP**. Your Keycloak or AD FS remains the source of truth on who can call what.

## How we know this isn’t another fad — the hard numbers

- **Gartner, August 2025:** 40% of enterprise applications will feature task-specific AI agents by end of 2026, up from less than 5% in 2025 ([Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)).
- **Gartner, April 2026:** SCM software with embedded agentic AI will grow from under USD 2 B (2025) to **USD 53 B by 2030** ([Gartner SCM forecast](https://www.gartner.com/en/newsroom/press-releases/2026-04-07-gartner-forecasts-supply-chain-management-software-with-agentic-ai-will-grow-to-53-billion-in-spend-by-2030)).
- **Gartner — caveat:** more than **40% of agentic AI projects will be cancelled by end of 2027** because of weak ROI, governance gaps, and "fear-driven" deployments.
- **MCP Registry (Linux Foundation):** from ~5,800 servers mid-2025 to **roughly 18,000 servers** by March 2026 (PulseMCP/Zylos). Read with caution — many are pet projects — but the growth curve is unmistakable.

In its 2025 update of "The Economic Potential of Generative AI," McKinsey estimates the value added by agents at **USD 2.6–4.4 trillion annually** at enterprise scale. Treat as an upper bound, but the direction is unambiguous.

## MCP for an MES — what to expose

At OmniMES we keep a shortlist of MES capabilities that benefit most from MCP exposure. Five candidates to start with:

1. **`getOEE(line, range)`** — OEE indicators for a line and a time window. The most common question from operators and production managers. Read-only, low risk.
2. **`getDowntimeReasons(line, shift)`** — downtime causes from the last shift, classified against a reason tree. Excellent input for LLM-generated shift reports.
3. **`getCurrentBatchStatus()`** — status of active batches, progress, process parameters. Ideal for multi-line operators who want to ask "which batch is going to stop on me today."
4. **`queryAlarms(severity, since)`** — alarms above a severity threshold. Pair this with an agent that classifies alarms into real incidents vs. noise.
5. **`searchDocs(query)`** — search across technical documentation (we already have this in OmniMES via the LangChain–Outline integration — see the article [How we connected LangChain with Outline](https://omnimes.com/en/blog/how-we-integrated-langchain-with-outline-to-build-smart-documentation-assistant-in-omnimes)). MCP gives this a standard façade.

What you should **not** expose in the first iteration: writes to OPC UA, recipe modifications, production schedule changes, control of critical alarms. These are operations where the cost of an agent error exceeds the value of automation. Get back to them only once you have a strong audit log and RBAC policies.

## Implementation — 30 lines of Python

The simplest MCP server exposing an OEE indicator from OmniMES, using FastMCP (the official high-level wrapper around the MCP SDK):

```python
from fastmcp import FastMCP
import httpx, os
from datetime import datetime, timedelta

mcp = FastMCP("omnimes-mes")
OMNIMES_URL = os.environ["OMNIMES_API_URL"]
OMNIMES_TOKEN = os.environ["OMNIMES_TOKEN"]

@mcp.tool()
async def get_oee(line: str, hours: int = 8) -> dict:
    """Returns OEE, availability, performance and quality for a production line.

    Args:
        line: line identifier, e.g. "L-CNC-03"
        hours: lookback window in hours (default 8 — current shift)
    """
    since = (datetime.utcnow() - timedelta(hours=hours)).isoformat()
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{OMNIMES_URL}/data/oee",
            params={"line": line, "since": since},
            headers={"Authorization": f"Bearer {OMNIMES_TOKEN}"},
            timeout=10.0,
        )
        r.raise_for_status()
        return r.json()

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

That’s it. After registering the server in Claude Desktop (`claude_desktop_config.json`) or ChatGPT Desktop, the model sees the `get_oee` tool with its description and parameter types. It can call it on its own in response to an operator’s question like "how is CNC line three doing today."

In production, three more layers come in:

- **Auth** — wrap with OAuth 2.1 (e.g. via `mcp-server-oauth-proxy` or native integration with your IdP).
- **Per-tool RBAC** — a production manager sees a different toolset than an operator or maintenance lead.
- **Rate limit + audit log** — every call recorded with user_id, agent_id, parameters and result (essential for later EU AI Act compliance).

## Architecture in OmniMES — sidecar, not monolith

The most common design mistake: bolting the MCP server directly onto a monolithic MES backend. Our approach in OmniMES is a **sidecar**: the MCP server is a separate microservice that talks to the existing MES REST API. Reasons:

- **Failure isolation** — an MCP server crash (e.g. a memory leak in the SDK) does not bring down production.
- **Independent release cycle** — the MCP spec is still moving fast (four revisions in 2025); you do not want monolith deploys coupled to that.
- **Scalability** — one MCP server can serve multiple MES instances (plants A, B, C), or conversely you can run one MCP server per plant in isolated OT networks.
- **Security** — the MCP server lives in a DMZ zone, with access to MES only through whitelisted endpoints. PLC, OPC UA and SCADA stay two zones away (per IEC 62443 zones-and-conduits).

In practice: a single OmniMES customer can run one MCP server locally on the shop floor (read-only telemetry) and a second one in OmniCloud (reports and documentation). The AI client (an operator’s Claude Desktop, the QA team’s home-grown agent) connects to each independently.

## Security — where it actually hurts

MCP itself is no more or less secure than any other RPC protocol. Problems start with **what you expose**. Three attack patterns to know about before your first deploy:

**1. Simon Willison’s "lethal trifecta"** ([simonwillison.net](https://simonwillison.net/tags/lethal-trifecta/)). Any agent that simultaneously has (a) access to private data, (b) exposure to untrusted content and (c) the ability to communicate externally is exploitable. MCP servers create that combination very easily. For an MES this means: do not let the agent read documents from outside (e.g. supplier PDFs) and at the same time call tools that send data anywhere.

**2. Real CVEs from 2025.** The `mcp-remote` package — RCE with CVSS 9.6, 437,000 downloads before the patch. Anthropic Git MCP Server — three CVEs in July 2025 (path bypass, argument injection in `git_diff`, unrestricted `git_init`). GitHub MCP — in May 2025, Invariant Labs demonstrated private-repository data exfiltration via prompt injection in the body of a public issue ([devclass.com](https://devclass.com/2025/05/27/researchers-warn-of-prompt-injection-vulnerability-in-github-mcp-with-no-obvious-fix/)). The phrase used in the report was "no obvious fix."

**3. Tool poisoning.** A malicious MCP server can swap its tool descriptions after the user has approved them (Invariant Labs, March 2025). Implications for a plant: do not trust servers from unofficial registries, sign your own servers, log every change to a tool schema.

For industry the takeaway is one: **MCP in production should be read-only by default, in a segregated network zone, with per-tool RBAC and a full audit log of every call**. Any function that writes anything into the control layer requires a separate risk decision — and probably human-in-the-loop approval until you have operational statistics.

## Honest assessment of industry adoption

Let’s say it plainly: **none of the major MES vendors (SAP DM, Siemens Opcenter, Rockwell Plex, AVEVA System Platform) had shipped an official MCP server by the end of Q1 2026**. Activity is real, though:

- **Inductive Automation Ignition** — at ICC 2025 (September) Inductive demoed an MCP module exposing tags, UDTs, alarms and scripts with audit logs and environment separation. Status as of March 2026: not yet GA.
- **AWS IoT SiteWise MCP server** — the most comprehensive official industrial MCP, **47 tools across 8 categories**, including anomaly detection.
- **InfluxData** — official InfluxDB MCP server (mid-2025), directly useful for time-series telemetry.
- **OPC UA** — several community implementations on GitHub (e.g. `coderfengyun/opcua-mcp-server`); none official from the OPC Foundation.
- **FrameworX (Tatsoft)** — positions itself as "the first SCADA platform with native MCP server support."

The implication: today, the advantage goes to companies that **build their own** MCP server on top of their MES — without waiting for the vendor. The cost is days, not months. Strategically it is an investment in an integration layer that will likely stay with us for a decade.

## The business case — when MCP pays off

In the model: one MCP server = N model integrations saved. Concretely:

- **Implementation cost:** 5–15 developer-days for a single MCP server with five tools, OAuth and an audit log (assuming a team that already knows the MES API).
- **Maintenance cost:** marginal — the MCP spec is stabilising (Linux Foundation), SDKs are mature, breaking changes are rare.
- **Savings:** every new AI model added to the organisation (in 2026 typically: Claude for documentation, GPT for reports, Gemini for multimodal analysis) plugs in without a new wrapper.
- **Vendor lock-in:** zero — if a 10× cheaper model appears in two years, you change one parameter in the client config.
- **Compliance:** the MCP call audit log is ready material for EU AI Act and NIS2 (cybersecurity) compliance.

When does MCP **not** make sense? When you have one specific use case, one model, and no expansion plans — direct function calling integration is simpler and cheaper. When your plant has no REST API on the MES yet — MCP fixes nothing here, the missing piece is the data layer. When you have no team to maintain anything beyond a REST endpoint — MCP adds another system to operate.

## Recommendation — what to do next week

1. **Pick three read-only tools** with the highest value for operators and production managers (most often: OEE, downtime reasons, current batch status).
2. **Stand up a sidecar MCP server** in a separate container, with access only to whitelisted MES endpoints, OAuth and an audit log from day one.
3. **Roll it out to two or three power users** (production manager, maintenance lead) on Claude Desktop or ChatGPT Desktop. Measure: calls per day, time saved, model errors, situations in which the agent did something odd.
4. **After 4–6 weeks** decide: scale up (more tools, more users, your own agent) or shut it down. Do not leave a "pilot nobody uses" zombie running.
5. **Critical:** do not expose write-tools before you have statistics from the read-only phase. The first incident with an agent changing a parameter on a line will set the project back six months.

MCP is not "another AI framework." It is an integration layer that is likely to play, in the era of agents, the role REST played for the web. In an industry where software life cycles are measured in decades, an early, controlled adoption gives you an advantage you will not recover after the fact.

## Sources

- Anthropic — [MCP Anniversary Post (25 November 2025)](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)
- The New Stack — [Why the Model Context Protocol Won](https://thenewstack.io/why-the-model-context-protocol-won/)
- Stack Overflow Blog — [Authentication and Authorization in MCP (January 2026)](https://stackoverflow.blog/2026/01/21/is-that-allowed-authentication-and-authorization-in-model-context-protocol/)
- Zylos — [MCP Remote Evolution: Streamable HTTP & Enterprise Adoption (March 2026)](https://zylos.ai/research/2026-03-08-mcp-remote-evolution-streamable-http-enterprise-adoption)
- Gartner — [40% of Enterprise Apps with AI Agents by 2026 (August 2025)](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)
- Gartner — [Supply Chain Management Software with Agentic AI to $53B by 2030 (April 2026)](https://www.gartner.com/en/newsroom/press-releases/2026-04-07-gartner-forecasts-supply-chain-management-software-with-agentic-ai-will-grow-to-53-billion-in-spend-by-2030)
- Simon Willison — [Lethal Trifecta tag](https://simonwillison.net/tags/lethal-trifecta/)
- DEVCLASS — [GitHub MCP Prompt Injection Vulnerability (May 2025)](https://devclass.com/2025/05/27/researchers-warn-of-prompt-injection-vulnerability-in-github-mcp-with-no-obvious-fix/)
- Industrial IoT Blog — [MCP Explained: Making IIoT Smarter (November 2025)](https://iiotblog.com/2025/11/04/model-context-protocol-mcp-explained-making-iiot-smarter/)
- ChatForest — [Manufacturing & Industrial MCP Servers Review](https://chatforest.com/reviews/manufacturing-industrial-mcp-servers/)
- Wikipedia — [Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol)
