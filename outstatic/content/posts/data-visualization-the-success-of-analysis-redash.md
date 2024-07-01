---
title: 'Data Visualization - The Success of Analysis. Redash'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'data-visualization-the-success-of-analysis-redash'
description: 'In today''s world, the rapid development of technology and increasing market demands make efficient production management crucial for a company''s success. Systems like Omnimes offer advanced tools for process optimization, including data visualization, which supports analysis and decision-making.'
coverImage: '/images/5.png'
lang: 'en'
tags: [{"value":"redash","label":"redash"},{"label":"Data Visualization","value":"dataVisualization"},{"value":"bigData","label":"big data"},{"label":"Reports","value":"reports"}]
publishedAt: '2024-07-01T06:47:38.501Z'
---

![Logo redash](/images/image-U2ND.png)

## Introduction

In today's world, the rapid development of technology and increasing market demands make efficient production management crucial for a company's success. Systems like Omnimes offer advanced tools for process optimization, including data visualization, which supports analysis and decision-making.

Data visualization transforms raw data into valuable information that is easy to interpret at various levels within an organization. With tools like Redash, Omnimes users can create interactive dashboards that present key performance indicators (KPIs), monitor production progress, and identify areas for improvement.

In this article, we will discuss how the integration of Omnimes with Redash supports production through effective data visualization. We will present specific application examples, showcasing benefits such as production optimization, improved team communication, quicker problem resolution, and more informed decision-making.

## What is Redash?

In rapidly evolving technology, effective production management is crucial. The Omnimes system, integrated with the Redash platform, offers advanced tools for process optimization, including data visualization, which supports analysis and decision-making.

Redash is a self-service, open-source platform for data querying and visualization. Quick to set up, it works with numerous data sources such as Redshift, Google BigQuery, MongoDB, Google Sheets, PostgreSQL, MySQL, and ElasticSearch.

### Key Features of Redash:

- **Browser-Based and REST API**: Fully operates in a web browser, with shareable URLs and a well-defined API interface.
- **Query Editor**: Create SQL and NoSQL queries with a schema browser and autocomplete. Ability to create and reuse query snippets for data presentation in charts.
- **Visualization and Dashboards**: Create visualizations using a drag-and-drop method. Group visualizations into dashboards, which are automatically updated.
- **Alerts**: Define trigger conditions and receive instant notifications when data changes, such as exceeding a set pressure or temperature.

The Redash platform supports a wide range of products, making it a versatile tool for data visualization within the Omnimes system.

!\[Companies Using Redash\](/images/image-AzMT.png)

For more information about Redash, as well as its configuration and implementation into your own project, please visit: [redash.io](https://redash.io).

After this brief overview of the Redash tool, I will present the new possibilities within the Omnimes system following its implementation.

## Redash in Omnimes

After launching Redash, there are three steps to create a data dashboard:

- **Creating a query**: This involves retrieving data from the database.
- **Creating a chart**: Based on the retrieved data.
- **Adding the chart to a dashboard**.

Two practical features of such a dashboard are worth noting:

1. **Sharing without account creation**: This type of dashboard can be shared with anyone without requiring the creation of a user account in the Omnimes system. For example, it can be used for viewing on the production floor by traffic management supervisors or higher-level personnel, and for motivating employees.

2. **Frequent data refreshing**: The shared dashboard can be set to refresh as frequently as every minute, allowing for continuous, up-to-date summaries of what is happening on the shop floor.

To facilitate this, we have introduced our own query editor in the Omnimes system, as shown below:

![Query editor for Redash in Omnimes](/images/redash1-k5Mj.png)!

After creating the queries of interest, we proceed to Redash itself to access the list of created data queries.

![The list of queries in Redash](/images/image-UyNT.png)

Next, we access the specific query and edit it within Redash. If our connection to the data source is correct, we receive the results.

![Editing a query in Redash](/images/image-k1OT.png)

Next, we move to the "Chart" tab in Redash, where we create visualizations by specifying how data should be presented. There are many options available, both in terms of chart types and presentation styles. Below is an example of a "bar" chart that compares machines based on the occurrence of the most common errors.

![A data chart in Redash](/images/image-Y2MT.png)

After creating the charts of interest with the data, we proceed to the "Dashboard" tab in Redash, where we decide which charts should be included on it.

![Adding a chart to a dashboard in Redash](/images/image-c4MD.png)

At this point, we can enable public sharing of the dashboard and set the data refresh interval in Redash.

In Omnimes, we have the option to decide which dashboards should appear on the system's homepage. This does not limit the creation of additional dashboards, which can be shared with other departments or individuals.

![List of dashboards in Omnimes](/images/redash2-MyNj.png)

As a result, we get a finished dashboard as shown below:

![Completed dashboard in Omnimes](/images/redash3-c1Nz.png)

The data prepared in this way can be further utilized, for example, for analysis through AI, as is the case with the Omnimes system.

![Utilizing data from Redash in AI analysis](/images/redash4-M2MD.png)

And obtain a comprehensive summary, similar to this one:

![Result of AI analysis](/images/redash5-I4Nj.png)

## Summary

In today's rapidly evolving world of technology, effective production management is crucial for the success of companies. Systems like **Omnimes**, integrated with data visualization tools such as **Redash**, offer advanced capabilities for optimizing production processes.

Redash is a versatile open-source platform for querying and visualizing data, compatible with various data sources like Redshift, Google BigQuery, and PostgreSQL.

**Integrating Redash with Omnimes** allows for the creation of interactive dashboards that can be publicly shared without requiring user accounts, and enables frequent data refresh for real-time production insights. Within the **Omnimes** system, users can also decide which dashboards appear on the homepage and create additional dashboards for internal use.

**The examples presented demonstrate how these tools can support effective production management, improve team communication, and enable faster response to issues**.

As a result, companies can make more informed decisions, optimize production processes, and enhance product quality.

Ultimately, **implementing Redash in the Omnimes system** leads to the creation of advanced dashboards **that can be used for further data analysis, including leveraging artificial intelligence**, thereby providing comprehensive summaries and improving production management.