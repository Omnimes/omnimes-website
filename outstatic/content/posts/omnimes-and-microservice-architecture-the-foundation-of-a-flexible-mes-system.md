---
title: 'OmniMES and Microservice Architecture – The Foundation of a Flexible MES System'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-E3Nj.jpeg'
slug: 'omnimes-and-microservice-architecture-the-foundation-of-a-flexible-mes-system'
description: 'OmniMES is a modern Manufacturing Execution System (MES) designed on a microservice architecture.
This model ensures scalability, flexibility, and independent development of individual modules — from machine communication to data analytics and production management.'
coverImage: '/images/microservices-vs-monolit-M5NT.png'
lang: 'en'
tags: [{"value":"omniMES","label":"OmniMES"},{"value":"docker","label":"docker"},{"value":"microServices","label":"Micro Services"}]
publishedAt: '2025-10-06T20:24:44.323Z'
---

**OmniMES** is a modern **Manufacturing Execution System (MES)** designed on a **microservice architecture**.\
This model ensures scalability, flexibility, and independent development of individual modules — from machine communication to data analytics and production management.

---

### 1. What Are Microservices

A **microservice architecture** divides an application into independent components (services), each responsible for a specific business function.\
Each microservice:

- runs as a separate process (e.g., a Docker container),

- communicates with others through **REST API** or **MQTT/Sparkplug B**,

- can be deployed, scaled, and updated independently.

Unlike monolithic architecture, microservices reduce the risk of total system failure and enable much faster implementation of new features.

---

### 2. How OmniMES Uses Microservices

OmniMES consists of several independent services running in a **Docker Compose** environment or in the **cloud** (e.g., DigitalOcean, OVH).

| Service | Description | Technology |
| --- | --- | --- |
| **api** | Central REST API built with Django REST Framework – user management, production data, ERP integration | Python / Django |
| **stream** | Receives machine data via MQTT Sparkplug B and stores it in the database | Node.js |
| **simulate** | Simulates machine operation and generates test production data | Node.js / Python |
| **redash** | Data analytics and visualization | Python / Flask |
| **grafana** | Real-time dashboards | Go |
| **mqtt-broker (EMQX)** | Central communication broker for IIoT devices | Erlang |
| **nginx-proxy** | Reverse proxy and HTTPS load balancer | Nginx |
| **certbot / ssl** | Automatic management of Let's Encrypt certificates | Python |
| **faiss-index** | Documentation vectorization and AI-powered question answering (RAG module) | Python / LangChain |

Each of these services plays a clearly defined role but together they form a **cohesive ecosystem**, communicating through shared APIs and message queues.

---

### 3. Advantages of Microservice Architecture in OmniMES

1. **Scalability** – Any service can run in multiple instances (e.g., scale only `stream` when signal traffic increases).

2. **Independent updates** – Updating `api` or `simulate` doesn’t require restarting the whole system.

3. **Fault tolerance** – A failure of one service (e.g., `grafana`) doesn’t stop the others.

4. **Deployment automation** – Docker and CI/CD integration allow fast, repeatable updates.

5. **Flexible development** – Different teams can develop microservices in different technologies (Python, Node.js, Go) without dependency conflicts.

---

### 4. Example Data Flow

1. The machine sends data in **MQTT Sparkplug B** format to the **EMQX broker**.

2. The `stream` service decodes messages, analyzes frequency, and saves data to **MongoDB or PostgreSQL**.

3. The `api` service exposes this data via **REST API** to dashboards and web applications.

4. **Redash** and **Grafana** visualize production data and KPIs.

5. **faiss-index** enables the **AI assistant** to answer user questions based on technical documentation (RAG module).

---

### 5. Deployment and Management

OmniMES can operate both:

- **On-premise** – within a factory on a local server,

- **In the cloud (SaaS)** – on DigitalOcean droplets or OVH VPS.

Microservice management is performed using:

- **Docker Compose** – for test environments,

- **Docker Swarm / Kubernetes** – for production environments with auto-scaling and monitoring.

---

### 6. Summary

The microservice architecture is the **core of OmniMES** — making the system:

- **Modular**,

- **Scalable**,

- **Secure**,

- **Easily integrable** with ERP, SCADA, and AI systems.

OmniMES is therefore not just a monitoring tool — it’s a **complete IIoT + MES + AI platform**, adaptable to any industrial environment.