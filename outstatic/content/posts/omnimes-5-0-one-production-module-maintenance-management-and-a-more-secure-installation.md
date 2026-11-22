---
title: 'OmniMES 5.0: one production module, maintenance management and a more secure installation'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'omnimes-5-0-one-production-module-maintenance-management-and-a-more-secure-installation'
description: 'In OmniMES 5.0, Production is the only order module and ERP orders land straight in it. A new Maintenance area with inspections, MTBF and MTTR from failure requests and a machine event timeline with notes, alarms with Teams, Slack and escalation, one AI configuration, backups with a restore test and updates that roll back automatically. What changes, and what to check before you update.'
coverImage: '/images/post-omnimes-5-0/cover-omnimes-5-0-en.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"omniEnergy","label":"OmniEnergy"},{"value":"AI","label":"AI"},{"value":"cra","label":"CRA"}]
publishedAt: '2026-11-22T19:00:00.000Z'
---

OmniMES 5.0 is available as of today. A new first digit means something specific for us: under our [release policy](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/installation-on-premise-TERmBAyCCe) it marks a version whose update needs extra steps. Version 5.0 has several of them at once: a new MQTT broker version with per-device accounts, a new Redash, a separate database account for every service, Python 3.12 in the API, and an update procedure that rolls itself back when something fails.

For the people who use the system every day, three changes matter most. Production is now the only order module, and orders from the ERP go straight into it. A new Maintenance area covers failure requests from the operator panel, maintenance work orders, inspections by calendar or running hours, MTBF and MTTR calculated from failure requests, and Machine events: one timeline with notes on failures and stops. Alarms gained rules on machine signals, notifications in Microsoft Teams and Slack, and escalation. Below we go through every area, and at the end we list what is worth checking before you update.

## Production: one order module

Version 4.14 introduced the Production module with routings, a schedule and an operator panel, but the old List of orders was still running next to it. In 5.0, Production is switched on in every installation and is the only place where orders are handled. The List of orders, the old schedule and the Work time configuration screen leave the menu, and their old addresses lead to the new screens. Monitoring and machine analytics work as before.

- **ERP orders inside Production.** The *Production orders* list has a *Source: From ERP* filter, a *Failed reports* tile and columns for the delay and the last report sent to the ERP. Customer and priority come from the ERP as ordinary mapping fields, and the order details have an *ERP* tab with the number and status in the source system.
- **Production calendar.** Month, week and day views with a "now" line and a *Now in production* panel: a quick look at what is happening on the shop floor and what is planned.
- **Resource calendar.** Shifts for the whole plant, a site, a line or a single machine, exceptions (holidays, planned stops, extra shifts) and an availability preview sit on one *Production setup* screen. The system warns about resources without working time.
- **What-if planner.** The app compares up to five plan variants: a resource stop, an extra shift, different priorities or due dates. The simulation saves nothing. You approve the chosen variant in the Schedule together with its assumptions, and the stops and extra shifts then go into the Resource calendar.
- **Reports in one place.** *Generate a report*, *Generated reports* and *Recurring reports* replace three earlier paths. OEE, availability, working time and MTBF come from a single calculation. A machine with a shift calendar is calculated according to ISO 22400; a machine without one is calculated as before, as working time divided by the sum of working time, downtime and failures.

### Operator panel and order

- **Working time on the order.** Operators start and end their work with *Start work* and *End work*. The order shows labour hours by operator and stage, the order progress report has an operator working time column, and reports to the ERP pass this time on.
- **Correcting the last report.** An operator fixes a mistake within a time window set in the configuration; a manager can do it later as well, giving a reason. The correction goes into the order history and the Event log.
- **Work instructions.** An instruction with attachments (PDF, photos, MP4 video) is assigned to a machine or line, a product and a routing stage. It has versions (draft, approval, withdrawal with a reason), and only one version applies at a time. The operator panel can require operators to confirm they have read the instruction before a stage starts, once per version and person.
- **Order notifications.** An e-mail at the start and at the end of an order goes to the people assigned to it and to addresses outside the system. It includes, among other things, the order's energy and a button that opens it in OmniMES.

More: [Production calendar](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/production-calendar-uEMIhaFk1q), [Operator panel](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/operator-panel-E7OG2DpV5k), [Production setup](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/production-setup-P6MDLC8Qc9), [Schedule](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/schedule-gantt-8D7dLU0Gij).

## Maintenance

The new *Maintenance* menu group sits right after Production and takes a failure from the request to the confirmed fix:

1. The operator clicks *Report a failure* in the panel at the machine, optionally adding a photo and linking the request to the current stop.
2. The chosen people get a notification in the app and by e-mail. If nobody accepts the request, the system sends a reminder.
3. The maintenance manager accepts the request and creates a work order for a technician or a group.
4. On the *My work orders* screen, the technician records working time, parts from the item master (issued from stock), notes, the cause and the action taken.
5. Production confirms the fix in the operator panel, or sends the order back as *Not fixed*.

Inspections are planned by calendar (every so many days, weeks or months) or by running hours. The running-hours counter takes working time from the machine state signal, the same way Monitoring and OEE do, or reads the counter value from a chosen signal. The inspection work order is created automatically as the due date approaches.

MTBF and MTTR are calculated from failure requests with the same function as the telemetry-based indicators in *Analyse → Work time and OEE*, and *Compare with telemetry* shows both values side by side. The machine card puts requests, work orders, parts and inspections on one timeline. Three reports were added to the report catalogue: *Failures and MTBF/MTTR*, *Inspection compliance* and *Maintenance cost*.

### Machine events

The old History events screen has become *Machine events* in the Maintenance group. It is one timeline for a machine, a line or a whole park: failures and stops with their reasons, alarms, failure requests and work orders, operator pauses and downtime reason changes. Failures and stops are the same segments as in OEE, with the same start, end, reason and loss type.

On a failure, stop or alarm you can write a note: what happened, what was done, what to check next time. The same note appears on the timeline, on the downtime list in *Work time and OEE* and in the machine history on the Maintenance machine card, so nobody has to copy it. The *Without a note* filter combined with the *Failure* type lists the failures nobody has described, which makes a ready agenda for the shift briefing.

From an event you can assign a downtime reason straight away (OEE and the Pareto are recalculated at once) or report a failure linked to that stop, even one that has already ended. The failure start in the request is then the start of the stop, so MTBF and MTTR from requests use the real failure time. Events with the current filters can be exported to CSV (up to 20,000 rows), and one view covers a period of up to 31 days. The Alarms screen has moved to the Maintenance group as well.

Module description: [Maintenance](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/maintenance-mfXqYdhBue), [Machine events](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/machine-events-Pdr1EQyq23).

## Alarms, notifications and system status

The *Alarms* screen collects rules from the whole system:

| Scope | Rules |
|---|---|
| Machine | no data from the machine, machine stop |
| Signal | value above or below a threshold, out of range, change over time, signal state (with hysteresis) |
| Energy | EnPI deviation from the baseline, EnPI CUSUM |
| Maintenance | new failure requests, inspections approaching or overdue |
| System | no data from the stream, low disk space, backup failed or overdue, task queue stuck, e-mail sending errors, service unavailable, licence expiring |

Notifications go to the app, to e-mail and to Microsoft Teams and Slack channels. A rule can have several escalation levels, and acknowledging the alarm with a comment stops the escalation. Machine rules can count time only within the shifts of the resource calendar, and mute periods can be weekly or one-off.

E-mails, including reports, OmniEnergy automations and alarms, are sent by one mail service. The *Email* tab shows its status, lets you send a test message and lists recent e-mails. A failed send is retried after 1, 5 and 15 minutes.

The new *Administration → System status* screen shows tiles for the API, database, task queue, stream, MQTT broker, e-mail, disk, backup, licence, MCP server and Redash. Administrators see a banner 30, 14 and 7 days before the licence expires, and after that date the system keeps running for a grace period (14 days by default).

More: [Alarms](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/alarms-exwag5kxqj), [System status](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/system-status-stuOhdRfmY), [General configuration](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/general-configuration-1TPIxjFPPg).

## OmniEnergy

- **The EnPI snapshot chart** now puts the period a snapshot covers on the horizontal axis, instead of the moment it was generated. The tooltip shows the period "from – to".
- **Correcting shifted periods.** A time-zone bug saved some EnB and EnPI snapshot periods shifted by one to two hours, for example 23:00 on the previous day instead of midnight. The correction command first shows a plan, backs up the rows it changes and can be undone. We run it during the update, after reviewing the plan. Ambiguous records stay unchanged and are listed for manual review.
- **EnPI deviation and CUSUM alarms.** The rule compares consumption with the energy expected from the baseline (a regression model or a ratio) after each period ends: day, week, month or shift. The CUSUM rule detects cumulative deviation and shows its chart in the alarm details.
- **"Energy and machine states" report.** Machine states and the energy profile on one timeline, idle energy, average power in and out of production, cost and CO2 emissions. Download it as a PDF (A4 landscape), send it by e-mail or set it up as a recurring report. It covers up to 92 days and 50 machines and works without production orders too.

More: [Energy configuration](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/energy-configuration-wchoGorIP5), [Generate a report](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/generate-a-report-oneQXspWI7).

## Analyse: one measurements screen

*Analyse → Measurements* combines the chart with a data table. You can pick up to 50 measurements at once and view raw data or the average, minimum, maximum and last value in intervals from 1 minute to 1 day. CSV export comes in two formats: one for Excel with Polish settings (semicolon and decimal comma) and a standard one. A single file holds up to 5 million rows, and every export is written to the Event log. Description: [Measurements: data and CSV export](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/measurements-data-and-csv-export-vtXc4xa5C7).

## AI: one configuration and an assistant with the user's permissions

AI features used to be configured in three places. In 5.0 there is one tab, *General configuration → AI*:

- **Connections:** Claude (recommended), any OpenAI-compatible API, or a local Ollama. API keys stay on the server and never reach the browser.
- **Models by task:** the *Fast* tier (SQL query suggestions and charts in Desktops), *Standard* (data analysis, questions to the AI, energy audit findings) and *Advanced* (the App Studio chat, Claude only). Each tier can use a different connection, for example the first two a local Ollama and the third Claude.
- **Usage** over the last 30 days.

An AI assistant such as Claude Desktop connects to OmniMES through the user's personal connection (user menu → *AI assistant connection*). It works with that person's permissions: it sees what they see and changes only what they are allowed to change. Every call of a write tool goes into the Event log with the user's name. The administrator chooses the change mode: apply immediately, propose changes for approval on the *Pending approval* screen, or read only. Some areas the assistant cannot change in any mode, including settings, users, permissions, tokens and the licence. When the assistant deletes a record, the record is archived and can be restored.

In installations with a public HTTPS address, such as the OmniMES cloud, Claude in the browser, Claude on a phone and ChatGPT connect through OAuth sign-in, without copying a token. The assistant also offers ready-made scenarios: shift analysis, plan for tomorrow, lot complaint and energy in the month.

AI analyses in Analyse, Desktops and energy audits run in the background, so the screen stays usable. Each user sees only their own analysis history; the administrator sees all of them.

### App Studio and 3D Hall

Apps supplied with the system are updated together with OmniMES and have their own *Built-in* tab in App Studio. Besides the *What-if planner*, they include the *ERP mapping wizard*, which suggests a mapping from a sample CSV, JSON or XML file and groups import errors by cause, and *SPC and process capability*, with a capability ranking of all characteristics. An update overwrites a locally modified app only when you ask for it, and only after making a copy.

The 3D Hall accepts a ready-made hall model from a .glb file (glTF 2.0 up to 48 MB, also with Draco and meshopt compression and KTX2 textures). Model parts are connected to machines by hand, and the whole hall or single models can be exported to a .glb file.

More: [AI assistant connection](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/ai-assistant-connection-Xbr2840qoC), [AI assistant change proposals](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/ai-assistant-change-proposals-7Y5NnnMh4u), [3D Hall](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/3d-hall-xG1tKbrxg7).

## Security: from sign-in to the broker

Most of the work on 5.0 went into security. The changes come from a review of the system against the requirements of the Cyber Resilience Act (CRA), which we wrote about in our article [on reporting vulnerabilities](/en/blog/cyber-resilience-act-24-hours-to-report-an-exploited-vulnerability-what-it-means-for-mes).

- **Sign-in.** Five failed attempts within 15 minutes lock the account, and each further lock lasts longer. Passwords have at least 12 characters and are checked by the server. A session expires after 12 hours of inactivity or after 7 days, and changing the password or clicking *Sign out from all devices* ends the other sessions. Operator codes in the panel are also limited in the number of attempts.
- **A new installation** gets its own Redash keys, and the administrator has to set their own password at first sign-in. The broker admin panels, Adminer and Ollama are reachable only from the server, and BI dashboard data only with a token.
- **Database accounts.** The API, stream, broker and Redash connect to PostgreSQL with separate least-privilege accounts, none of them a superuser. Updating an on-premise installation switches the services to these accounts automatically.
- **Redash.** Redash no longer uses the OmniMES password. The Redash button signs in with a one-time link valid for 60 seconds, and the Redash admin key stays on the server: dashboards and reports go through the OmniMES API with permission checks.
- **MQTT broker.** EMQX 5.8 checks sign-in and access rules in PostgreSQL. Each gateway can have its own account (the *MQTT accounts* screen) and publish only in its own Sparkplug B group. A gateway account cannot send commands to machines (NCMD, DCMD) or read other gateways' topics. Connections are encrypted with TLS on port 8883. New installations get all of this from the start. In updated installations, devices keep connecting as before, and you move them to gateway accounts deliberately, one device at a time.
- **Files and the web interface.** Reports and documents are downloaded after sign-in through a link valid for 10 minutes, not from a fixed address open without sign-in. The interface sends security headers and a Content-Security-Policy, and the server takes dashboard snapshots only from the Redash address saved in the settings.
- **Dependencies.** Every release has an SBOM in CycloneDX format and goes through a vulnerability scan. A critical or high vulnerability without a documented assessment (VEX) stops the release.

A new chapter of the documentation, the [Administrator guide](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/administrator-guide-zmIqVnF9xv), follows Annex II of the CRA. It covers secure start-up in 12 steps, a checklist for secure operation (passwords and accounts, TLS and HTTPS, firewall and ports, backups, updates, logs, tokens), known risks and reasonably foreseeable misuse, RPO and RTO, troubleshooting, decommissioning with data deletion, and information for integrators (API, MCP, MQTT, Redash). The state of the security features is also described in the [Cybersecurity & Compliance (CRA)](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/cybersecurity-compliance-cra-pPJBcC6sBf) chapter.

## Installation, updates and backups

- **Updates that roll back automatically.** The script saves a copy of the settings and databases, builds the new images while the system keeps running, runs migrations in a separate container, and checks that the API responds, the databases are reachable, sign-in works and the web page opens. If any step fails, it returns to the previous images, settings and, when needed, the databases from the copy. When the new version changes the database, the API stops for the duration of the update, usually for 1–3 minutes.
- **Backups.** The backup service makes an encrypted copy of the databases, system files and settings every day at 2:30, and of the telemetry once a week. It keeps 7 daily, 4 weekly and 12 monthly copies. Copies can also be sent off the server, to an SFTP server or to S3-compatible storage. Once a month the service checks that the databases can be restored from the latest copy. The result is shown in *System status*, and a failed or overdue backup raises an alarm.
- **The `omnimes` admin tool.** One command for running the installation: `preflight` (checks CPU, memory, disk and ports before installing), `install`, `status`, `support-bundle` (a diagnostic package without passwords or keys), `update`, `rollback`, `backup`, `restore` and `uninstall`. Every command ends with a clear result, and commands that change the installation show a plan first and ask for confirmation. The tool speaks Polish or English: the language comes from the `--lang` option or the `OMNIMES_LANG` variable, and for a new installation from the system language.
- **Monitoring.** The `/health` address reports the state of the databases, task queue, licence and stream. Every service has a Docker health check, and an unhealthy container restarts by itself (except the database and the broker).
- **Code in images, configuration in the `.env` file.** Updates keep the files saved by the system: the report archive, OmniEnergy documents, attachments, work instructions and the ERP exchange folder.

All of this is described in the [Installation](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/installation-on-premise-TERmBAyCCe) chapter, sections 8 (updates), 14 (monitoring), 15 (backups) and 16 (the `omnimes` tool).

## Performance and stability

The figures below come from our own tests, mostly on a copy of our demo instance's database (about 73 million telemetry rows). In the query comparisons, the results before and after the change were identical.

- **The latest values of signals across the whole history** (the "only last" option in BI data): 0.29 s instead of 22.6 s. Redash dashboards, the AI assistant, App Studio apps, the 3D Hall and alarm rules on signals all benefit.
- **TimescaleDB 2.31 columnar compression** and a new index on signal and time make typical queries several to several dozen times faster, for example the latest values from 7 days: 29 ms instead of 255 ms.
- **Long reports and dashboard snapshots** run in the background with a progress bar. A dashboard snapshot in three formats took 10.5 s in our test, down from about 320 s.
- **The stream no longer loses data** when the database connection drops: it keeps the data in an on-disk buffer (up to 256 MB) and writes it once the database is back. It handles the full Sparkplug B cycle (BIRTH and DEATH, aliases, sequence numbers, rebirth), and Boolean values are stored in the history as 1 and 0. Before, they were not stored at all.
- **Time is stored in UTC in the database.** Reports, shifts, energy and forecasts handle the 23-hour and 25-hour days of daylight saving changes without an hour's shift.
- **Technical foundation:** Python 3.12 and Django 5.2 LTS in the API, Redash 26.9, TimescaleDB 2.31, and a user interface now fully moved to Vue 3.

## What to know before you update

- **Updating to 5.0 takes more steps than usual.** On-premise installations maintained by the OmniMES service team are updated by us in an agreed maintenance window, and cloud instances are updated by the vendor. If you maintain your installation yourself, take the new `omnimes/api/dockerfile` and the other files from the new package; the full list is in section 8.2 of the Installation chapter.
- **MQTT devices keep working as before,** but the broker rejects topics for which the account has no access rule. Devices that publish outside the Sparkplug B namespace are worth checking before the update.
- **The old order screens are switched off.** The List of orders and the old schedule are no longer available, and their addresses lead to the Production module.
- **A new menu layout.** History events is now called Machine events and sits in the Maintenance group together with Alarms. The address and permissions stay the same, and the new layout appears after signing in again.
- **Kiosk accounts.** Tablets and PCs on the shop floor where OmniMES should stay signed in must be marked as kiosk accounts. Otherwise the session expires after 12 hours of inactivity.
- **Your own Redash integrations.** Integrations that called Redash from the browser with the admin key will stop working. Redash 26.9 disables Custom charts (with their own JavaScript code) by default; you enable them with a line in the `redash/.env` file.
- **AI analysis history.** Regular accounts start with an empty history. Older analyses without an assigned author are visible to the administrator.
- **Maintenance notifications** are sent only after the recipients are set on the *Dictionaries and settings → Maintenance notifications* tab.
- **AI features need a connection** to Claude, an OpenAI-compatible API or Ollama. Queries to cloud models are billed by their provider, and the App Studio chat works with Claude only.

The full list of changes in version 5.0 is in the [changelog](/en/changelog), and the support period of each version is on the [Support period and updates](/en/security/support) page. If you would like to see 5.0 on your own data or plan an update, [get in touch](/en/contact).

## Sources

- OmniMES documentation: Installation (sections 8, 8.2, 14, 15, 16), Administrator guide, Maintenance, Machine events, Alarms, System status, General configuration (AI and Email tabs), AI assistant connection, Production calendar, Operator panel, Measurements: data and CSV export, 3D Hall, Cybersecurity & Compliance (CRA) — https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/introduction-98dAKUj3hP
- OmniMES changelog, version 5.0 — https://www.omnimes.com/en/changelog
- Performance figures: OmniMES team tests on a copy of the demo instance database, November 2026 (results before and after compared row by row).
