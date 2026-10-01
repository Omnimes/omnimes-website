---
title: 'OmniEnergy in practice: from energy meter to ISO 50001 report, with no spreadsheet in between'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'omnienergy-in-practice-from-energy-meter-to-iso-50001-report-with-no-spreadsheet'
description: 'A walk through the OmniEnergy module in the order you actually use it: connecting a meter, configuring SEUs and EnPIs, comparing periods, scheduling and exporting the report to PDF. Along the way we explain why the system records who entered every manual value, leaves incomplete snapshots off the charts and refuses to compare periods of different length — because that is what decides whether your data survives an ISO 50001 audit.'
coverImage: '/images/post-omnienergy-praktyka/cover-omnienergy-praktyka.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"omniEnergy","label":"OmniEnergy"},{"value":"iso50001","label":"ISO 50001"},{"value":"mesSystem","label":"MES System"}]
publishedAt: '2026-09-28T08:00:00.000Z'
---

Most plants that say they "monitor energy" have meters, a database full of readings and a spreadsheet where, once a month, somebody stitches the two together. The spreadsheet holds up until the first audit. Then the auditor asks where the March production count came from, who typed it in, and whether February's indicator used the same denominator. The answer turns out to live in one person's head, or in the third copy of a file called "energy_2026_final_v2".

The timing is not abstract. Article 11 of the Energy Efficiency Directive (EU) 2023/1791 requires enterprises consuming on average more than 10 TJ of energy a year (about 2.8 GWh) to carry out an energy audit by 11 October 2026, and those above 85 TJ (about 23.6 GWh) to have an energy management system in place by 11 October 2027. For many plants this will be the first auditor who looks at the data rather than at a policy document.

What follows is a tour of the OmniEnergy module in the order the work is done in the application — from the meter to the report that goes into the ISO 50001 review file. At each step we show what you configure, and also what the system enforces and why.

## 1. Measurement sources and points: where the data comes from

Electricity, gas, compressed-air and water meters publish readings over MQTT using Sparkplug B, either directly or through a PLC or gateway. OmniMES picks them up from the broker and stores every reading in TimescaleDB. We covered how that database copes with hundreds of millions of readings a day in [TimescaleDB in OmniMES](/blog/timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day).

OmniEnergy never asks you to connect a meter a second time. Configuration has two layers:

- A **measurement source** is a kind of signal that already exists in the system — active energy imported, for instance. For each source you set a category (energy, production, utilities, environment, other), an aggregation (sum, average, minimum, maximum or difference) and whether it is a primary source.
- A **measurement point** binds a source to a specific machine in the plant structure: server, line, machine. A point does not copy any data; it simply references a signal that is already being collected.

The "Refresh points" button walks through every source and creates points for all machines that carry a measurement signal of the matching type. Points that no longer fit — because a signal was unassigned from a machine, say — are removed. With a few dozen machines, that is the difference between one minute and an afternoon of data entry.

The aggregation setting matters for cumulative meters. An energy meter reports a register value, not consumption. Consumption over a period is the last reading minus the first, which is exactly what the "difference" aggregation computes: it fetches the two boundary readings instead of summing thousands of register values into a number with no physical meaning.

## 2. SEU configuration: which machines actually matter

ISO 50001 requires the energy review to identify significant energy uses, or SEUs (ISO 50001:2018, clause 6.3). In OmniEnergy an SEU configuration is a saved analysis scope: a server or line, any number of machines (an empty list means every machine in scope) and the sources to include (an empty list means the monitored primary sources).

Running the analysis for a period produces a **snapshot**: machines ranked by consumption, each with its share of the total and its cumulative share. Machines that together make up 80% of consumption are flagged as significant, following the Pareto principle. The machine that pushes the cumulative share past 80% is included as well, since it is the one that tips the balance.

A snapshot is self-contained. It stores the machine names, units and period as they were at the moment it was generated. If someone renames a machine or removes it from the structure six months later, the March report still shows what it showed in March. For an auditor that is the baseline requirement: a history that rewrites itself is not a history.

## 3. EnPIs: numerator, denominator, and the number no sensor provides

An energy performance indicator (EnPI) is usually a ratio of energy to output — kWh per unit or kWh per tonne (ISO 50001:2018, clause 6.4; detailed guidance in ISO 50006:2023). In OmniEnergy the EnPI definition holds the name and units, while the energy baseline (EnB) configuration says where each half of the ratio comes from:

- **numerator** — read automatically from an energy meter, or entered manually,
- **denominator** — none (the indicator is then plain energy), read automatically from a production counter, or entered manually.

A metered denominator is rarer than you might expect. In many plants the production count comes from a shift report or the ERP, not from a sensor on the line. Before release 4.4.0, a manual value was a constant in the configuration, so the same number was applied to every period. A simple example (illustrative figures) shows what that does:

| | March | April |
|---|---|---|
| Energy | 60,000 kWh | 48,000 kWh |
| Actual production | 12,000 units | 8,000 units |
| Actual EnPI | 5.0 kWh/unit | 6.0 kWh/unit |
| EnPI using a fixed 10,000 units | 6.0 kWh/unit | 4.8 kWh/unit |

Real performance got 20% worse. The chart built on the constant shows a 20% improvement. The trend points the wrong way, and nobody made an arithmetic mistake — the error was in the data model.

Since 4.4.0, a manual value is entered for a specific snapshot, which means a specific period. The snapshot value takes precedence; the configuration constant is used only when it is missing. For every manual value the system records who entered it and when. A meter reading can always be reconstructed from the database; a number copied from a shift report cannot. That is why, in an ISO 50001 review, it has to be traceable to a person and a date.

## 4. Snapshots and the SEU time-window comparison

A single SEU snapshot tells you who used the most energy in a given period. An energy review asks a different question: what changed? That is what the SEU time-window comparison is for. You pick between two and 90 snapshots of the same configuration — enough for a quarter day by day, or several years of monthly snapshots.

The comparison shows each machine's consumption in each period, plus two kinds of change:

- **versus the previous period with data** — so you can see when consumption jumped and when it came back,
- **between the first and the last period** — so you can see where it ended up.

The first-to-last figure on its own hides everything in between. A compressor that used 30% more in May and returned to normal in June after a valve was replaced simply does not exist in a comparison of the two end points. For an energy review, episodes like that are the most interesting part.

The comparison enforces three rules:

1. **Periods must be of similar length.** A difference of more than 20% blocks the comparison. A week set against a month would produce a "77% drop in consumption" that says nothing about efficiency. The tolerance lets calendar months through, since February and March differ by roughly 10%. Once you pick the first period, incompatible ones are hidden from the list.
2. **Periods must come from the same SEU configuration.** A different set of machines or sources is a different population, and comparing its totals is meaningless.
3. **A machine that appears in any period gets a row in every period.** Missing data shows as a dash, not as a missing row. Nothing silently drops out between periods — and a machine quietly vanishing from the table is a classic way for a spreadsheet to flatter the result.

Totals are calculated separately for each unit, because kilowatt-hours do not add up with cubic metres. With many periods selected, the table switches to a series summary (first, last, minimum, maximum, average) and the full course is shown on the chart.

## 5. Automation: the report arrives on its own

The automation schedule runs four kinds of task: generate an SEU snapshot, generate an EnPI snapshot, run an audit, or compare recent SEU periods and send the result by email. Each task has a time window, a run cycle and a list of recipients.

The time window is easy to underestimate. "Last 30 days" is a rolling window: triggered on 1 March, it also covers the tail end of January. "Previous full calendar month" covers February exactly. An ISO 50001 review needs closed periods, because only those can be compared year on year. Alongside the rolling windows, the schedule therefore offers the previous full day, the previous Monday-to-Sunday week and the previous calendar month.

A typical setup looks like this:

1. Early on the first day of each month — an SEU snapshot for the previous full month.
2. An hour later — a comparison of the last 12 snapshots of that configuration, emailed to the energy manager and the plant manager.

The emailed comparison is computed by the same function that drives the comparison window in the application. That was a deliberate design choice: if the email and the screen each did their own maths, sooner or later they would disagree, and then neither number could be defended.

EnPIs with a manually entered denominator are a separate case. At 6 a.m. on the first of the month the schedule does not yet know last month's production count. There are two modes to choose from: use the constant from the configuration, or create a snapshot flagged as **awaiting input**. In the second mode, the snapshot list shows how many periods are waiting, and the missing value can be entered straight from the list. Until it is:

- the snapshot stays off the chart, because it would show a false drop to zero,
- an audit based on it is held back, with a message saying which values are missing,
- the emailed report carries no figures, only a note on what is missing and where to fill it in.

This is the whole difference between "we measure energy" and "our data will stand up in an audit". A zero on a chart looks like a result. A missing value labelled as missing is exactly what it is: a gap in the data.

## 6. The report: PDF, PNG, and what goes into the review file

SEU snapshots and period comparisons can be exported to PDF or PNG. The file is rendered on the server, the PDF is laid out on A4 pages, and the charts from the comparison window are embedded exactly as they appeared on screen. Every generated file is also saved to an archive on the server, so a report handed to an auditor can be traced later.

An SEU report contains the machine ranking with value, share and cumulative share, a breakdown by line, machine and source, and a list of the largest consumers.

Audits in OmniEnergy come in three types: internal, external and management review. An audit is linked to an SEU configuration, an EnPI configuration, an energy objective and supporting documents, and the audit report can be emailed to named recipients.

Clause 9.3 of the standard lists, among the inputs to management review, energy performance and its improvement based on monitoring and measurement results including EnPIs, and the extent to which objectives have been met. In practice the review file receives:

- **the SEU list** with its ranking and qualification threshold — evidence for clause 6.3,
- **the EnPI trend against the baseline**, with incomplete periods excluded — clauses 6.4 and 6.5,
- **a comparison of equal-length periods** with step-by-step change — clause 9.1,
- **who entered each manual value and when** — the answer to "where did this number come from?"

## What OmniEnergy will not do for you

The system organises the data and enforces the rules, but a few things remain your job:

- **It cannot measure what is not metered.** A machine without a meter will not appear in the SEU ranking. If part of the plant's energy flows through a switchboard without sub-meters, the ranking covers only the metered part — and the auditor needs to hear that plainly.
- **It cannot verify a manual value.** It records who entered it and when, but it has no way of knowing whether the shift report was right. The source document has to exist and be available.
- **The 80% threshold is a consumption criterion, not the whole SEU definition.** The standard also allows an area to be significant because of its improvement potential. A small consumer that is easy to improve needs a decision by the team and a note in the documentation.
- **Period length is checked; operating conditions are not.** The 20% tolerance will let February through against March, but it will not even out differences in working days, outdoor temperature or product mix. Raw consumption comparisons are best read alongside an EnPI that relates energy to output.
- **A meter replaced mid-period needs attention.** The "difference" aggregation subtracts the first reading from the last. If a meter is replaced or reset, a negative result is replaced with zero so that negative consumption never appears. That period needs to be checked and annotated for the affected point.
- **It does not certify anything.** ISO 50001 certificates are issued by accredited certification bodies. OmniEnergy supplies the evidence — organised, traceable and repeatable — but procedures, responsibilities and management decisions stay with the organisation.

## What this adds up to

A spreadsheet does not lose to a system because it calculates more slowly. It loses because it forgets where a number came from, lets you compare a week with a month, and turns missing data into a zero. Each rule described above — the audit trail on manual values, incomplete snapshots kept off the charts, the block on comparing periods of different length, a row for every machine in every period — closes one of those gaps.

A plan for the first month with the module:

1. Check which machines at the top of the SEU ranking have their own meters, and which are derived as the difference between other readings.
2. Agree where each EnPI denominator comes from and who is responsible for entering it.
3. Set the schedule to closed calendar periods and switch manual values to the awaiting-input mode.
4. After three months, run a period comparison and see whether the result can be defended without opening a single file outside the system.

The full list of OmniEnergy changes is in the [changelog](/en/changelog).

## Sources

- ISO 50001:2018, *Energy management systems — Requirements with guidance for use* — https://www.iso.org/standard/69426.html
- ISO 50006:2023, *Energy management systems — Evaluating energy performance using energy performance indicators and energy baselines* — https://www.iso.org/standard/79367.html
- Directive (EU) 2023/1791 of the European Parliament and of the Council of 13 September 2023 on energy efficiency, Article 11 — https://eur-lex.europa.eu/eli/dir/2023/1791/oj
- OmniMES changelog, release 4.4.0 — https://www.omnimes.com/en/changelog
