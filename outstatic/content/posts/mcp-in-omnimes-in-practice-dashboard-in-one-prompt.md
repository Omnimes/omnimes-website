---
title: 'MCP in OmniMES in practice — a machine park and a production dashboard in one prompt'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'mcp-in-omnimes-in-practice-dashboard-in-one-prompt'
description: 'OmniMES exposes an MCP (Model Context Protocol) endpoint — a bridge through which any AI assistant talks directly to your production system. We walk through, step by step, how to go from an empty system to a finished dashboard using the WOODCRAFT furniture plant as an example — with no UI and not a single line of SQL.'
coverImage: '/images/omnimes-mcp-cover.png'
lang: 'en'
tags: [{"value":"mcp","label":"MCP"},{"value":"agentAi","label":"AGENT AI"},{"value":"ai","label":"AI"},{"value":"omnimes","label":"Omnimes"},{"value":"redash","label":"Redash"}]
publishedAt: '2026-07-23T10:00:00.000Z'
---

OmniMES now exposes a standard **MCP (Model Context Protocol)** endpoint — a bridge through which any AI assistant (Claude Desktop, ChatGPT, Cursor, Copilot) talks directly to your production system. Instead of clicking through the UI or writing SQL, you describe in natural language what you want to achieve, and the assistant does it inside OmniMES: it builds the plant structure, configures signals, creates reports and dashboards, reads the live production state. Below we show what this looks like in practice — using the WOODCRAFT wooden-furniture plant, from zero to a finished dashboard.

<video controls width="100%" preload="metadata" poster="/images/omnimes-mcp-cover.png">
  <source src="/videos/omnimes-mcp.mp4" type="video/mp4" />
  Your browser does not support HTML5 video playback.
</video>

## What MCP is and why it changes the game

MCP is an open standard that lets language models use external tools in a structured, predictable way. OmniMES exposes its logic — machines, lines, statuses, measurements, energy and Redash — as a set of such tools. The result: all knowledge about your system flows into the AI assistant, and you drive production through conversation. This is not a chatbot glued onto the app — it is direct model access to the system's functions, while keeping one hard rule: **raw machine telemetry is read-only**.

## Step 1. Connected in under a minute

In OmniMES you open **General configuration → MCP (AI) tab**. You have two paths:

- **Paste manually** — copy the MCP server address and the access token and paste them into your AI assistant.
- **Ready-made extension (recommended)** — download a `.dxt` file with the address and token already filled in, then install it in Claude Desktop (Settings → Extensions). It uses the built-in Node.js — no Python or Node install required.

From this point on, the assistant "sees" your OmniMES and can operate on its data.

## Step 2. Building the machine park from a single description

Instead of adding park → line → machine by hand, click after click, you paste the plant structure to the assistant:

```
WOODCRAFT Wooden Furniture Plant
- Line "Material Receiving & Storage": Material Scale WS-01, Wood Quality Scanner SK-01
- Line "CNC Nesting & Cutting": CNC Nesting WC-01/02/03, Band Saw PT-01
- Line "CNC Machining & Drilling": CNC Router CR-01/02, Multi-spindle Drill WW-01
- Line "Assembly & Packaging": Assembly Line LM-01, Packaging Station SP-01
```

You add one sentence: *"Create all machines sequentially, assigning them to the correct lines"*. The assistant creates the park, four lines and eleven machines — in the order forced by dependencies (park first, then lines, then machines) — and you see them immediately in the **Structure** view.

## Step 3. Signals and working states

You connect measurement signals the same way and define machine working states (running / failure / planned stop / unplanned stop). States can be derived straight from a measurement — e.g. *"a motor current above 12 A means the machine is running"* — so OEE and reports reflect the real state without wiring extra binary signals from the PLC.

You start OmniEnergy configuration the same way: *"add energy measurement sources for the WOODCRAFT park and refresh the measurement points"*. The assistant creates the sources and, with a single command, generates the measurement points, mapping them automatically onto the machines that carry the matching signals.

## Step 4. A dashboard in one prompt

This is the strongest moment of the whole process. One sentence:

> "Build a 'WOODCRAFT — Overview' dashboard with machine availability, failure rate, downtime breakdown, energy cost per unit and utility consumption. Lay out the charts two per row."

The assistant writes a dozen SQL queries directly against the **TimescaleDB** database, picks the chart types (bar, pie, line), creates the visualizations in Redash, arranges them on a dashboard and returns a ready link. All from a single prompt — without a single line of SQL written by you.

## What this means in practice

- **Deployment measured in minutes, not days.** Structure, signals and the first dashboard come together within a single conversation.
- **No UI barrier.** A shift manager, a process engineer or the owner of a smaller company gets exactly what they ask for — in their own words.
- **First-class objects.** The charts are ordinary Redash visualizations: you can edit them, copy them, embed them in an iframe, attach alerts.
- **Data under control.** Choose the model deliberately: commercial (Claude, GPT, Gemini) when quality matters; free via OpenRouter (Llama, Qwen, DeepSeek) when cost matters; local (Ollama, LM Studio) when data must stay inside the factory network.

## Who it is for

- **SME owners and staff** — a full MES driven by conversation, without hiring an integrator for every configuration change.
- **Production managers** — ad-hoc analyses and reports on demand, without waiting for IT.
- **Integrators** — lightning-fast setup of customer deployments: structure, signals and dashboards in a few minutes.

## Summary

MCP turns OmniMES into a system you control with natural language from any AI assistant. The entire production logic is available to the model through an open protocol, while the "telemetry is read-only" rule stays in force. See how it works in the video above, and find the complete list of changes in the [changelog](/en/changelog).
