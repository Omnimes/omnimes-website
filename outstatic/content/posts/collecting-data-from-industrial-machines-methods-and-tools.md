---
title: 'Collecting Data from Industrial Machines: Methods and Tools'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'collecting-data-from-industrial-machines-methods-and-tools'
description: 'An overview of two approaches for collecting industrial machine data: implementing an MES system such as OMNIMES by Multiprojekt, and using public datasets from platforms like Statista and Kaggle. Practical solutions for building predictive maintenance models.'
coverImage: '/images/data-QzNj.png'
lang: 'en'
tags: 
  - label: 'industrial data collection'
    value: 'industrial-data-collection'
  - label: 'machine data'
    value: 'machine-data'
  - label: 'machine learning in industry'
    value: 'machine-learning-in-industry'
publishedAt: '2024-09-15T10:29:21.000Z'
---

### **Introduction**

Effective management of data from industrial machines is critical for predicting failures and optimizing processes. In this article, we discuss two approaches:

1. **Lack of existing machine data**, where models for predictive maintenance need to be built from scratch.
2. **Utilizing existing datasets** from platforms such as Statista and Kaggle, which provide real-world industrial data.

---

## **1. No Machine Data: How to Start Collecting Data?**

### **OMNIMES by Multiprojekt**

If a factory lacks a data collection system, implementing an MES (Manufacturing Execution System) such as **OMNIMES** by Multiprojekt is a good solution.

#### **What is OMNIMES?**

- **OMNIMES** is an advanced MES system that facilitates data collection, analysis, and visualization from industrial machines.
- It enables monitoring of production parameters, such as cycle times, number of units produced, and machine failure statuses.
- OMNIMES data can be used to build predictive models, such as:
  - Predicting machine failures.
  - Optimizing maintenance schedules.

#### **Key Features of OMNIMES:**

1. **Real-time Data Collection:** The system gathers data directly from machines equipped with appropriate PLCs.
2. **Performance Analysis:** OMNIMES calculates KPIs such as Overall Equipment Effectiveness (OEE).
3. **Integration with Existing Systems:** It supports integration with ERP and SCADA.

For more details, visit: [OMNIMES – Multiprojekt](https://www.omnimes.com/pl).

---

### **2. Using Public Data Sources**

When a factory does not have its own data, publicly available datasets can be a viable option. Here are two popular sources:

#### **a) Statista**

Statista is a global data platform offering insights into various industrial sectors. For predictive maintenance, you can find:

- Reports on machine failure rates.
- Analyses of production efficiency across industries.
- Statistical data on machine maintenance and downtimes.

**Example Use Case:** Reports from Statista can be used to build basic predictive models based on industry statistics.

#### **b) Kaggle**

Kaggle provides free datasets and tools for data analysis and machine learning. You can find:

- Data collected from real industrial equipment.
- Datasets on vibrations, temperature, or energy consumption.
- Ready-to-use models and scripts for predictive analysis.

**Example Use Case:** Kaggle offers time-series data from real machines that can be used to build failure prediction models with algorithms like LSTM, XGBoost, or TensorFlow.

---

## **Comparison of Two Approaches**

| **Criterion**               | **System Implementation (OMNIMES)**       | **Public Data (Statista/Kaggle)** |
|-----------------------------|--------------------------------------------|-----------------------------------|
| **Cost**                    | Medium (system implementation)            | Low (data often free)            |
| **Adaptation to Facility**  | Ideal, data from your machines             | Limited, generalized data        |
| **Model Precision**         | Very high                                 | Depends on data quality          |
| **Implementation Time**     | Moderate (up to one month for MES setup)  | Short (ready-to-use data)        |
| **Historical Data Access**  | Immediately available after OMNIMES setup | Usually available immediately    |

---

## **Conclusion**

1. **No Data:** If no data collection system exists, consider implementing a solution like **OMNIMES** by Multiprojekt. It enables real-time data collection and analysis, simplifying the creation of accurate predictive models.

2. **Public Data:** For quick prototyping, platforms like **Statista** and **Kaggle** offer ready-to-use industrial datasets.

The optimal approach depends on your budget, available resources, and timeline. Long-term, implementing an MES like OMNIMES ensures precise data and greater benefits for your production facility.
