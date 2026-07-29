---
title: 'SPARKPLUG B vs OPC UA: Vergleich der Kommunikationsprotokolle Teil II'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'sparkplug-b-vs-opc-ua-vergleich-der-kommunikationsprotokolle-teil-ii'
description: 'Vergleich der Kommunikationsprotokolle Sparkplug B und OPC UA im Kontext des industriellen Internets der Dinge (IIoT)
Erfahren Sie mehr über ihre Architekturen, Datenformate, Sicherheit und Anwendungen. Entdecken Sie, welches Protokoll die Anforderungen Ihres Industrieautomatisierungsprojekts besser erfüllt.'
coverImage: '/images/3.png'
lang: 'de'
tags: [{"value":"sparkplugB","label":"Sparkplug B"},{"value":"opcUa","label":"OPC UA"},{"value":"mqtt","label":"MQTT"},{"value":"kommunikationsprotokoll","label":"Kommunikationsprotokoll"},{"value":"iIoT","label":"IIoT"},{"label":"Industrielle Automatisierung","value":"industrielleAutomatisierung"},{"label":"Client/Server-Architektur","value":"client/serverArchitektur"},{"label":"Datensicherheit","value":"datensicherheit"},{"label":"Datenstandardisierung","value":"datenstandardisierung"}]
publishedAt: '2024-06-06T06:09:12.000Z'
---

## **Einführung**

In der industriellen Automatisierung und im Internet der Dinge (IIoT) spielen Kommunikationsprotokolle eine entscheidende Rolle bei der Sicherstellung eines effizienten Datenaustauschs zwischen verschiedenen Systemen und Geräten. Zwei beliebte Protokolle in diesem Bereich sind OPC UA und Sparkplug B. Dieser Artikel bietet einen detaillierten Vergleich dieser beiden Protokolle, ihrer Architekturen, Datenformate und Anwendungen.

## **OPC UA (OPC Unified Architecture)**

OPC UA ist ein Kommunikationsprotokoll, das von der OPC Foundation entwickelt wurde, um den Austausch von Daten und Informationen zwischen verschiedenen industriellen Automatisierungssystemen zu standardisieren. Es wurde 2008 als Nachfolger der OPC Classic-Protokolle eingeführt.

![Ein Diagramm, das ein Netzwerk von OPC-Clients und -Servern illustriert. Drei Blöcke auf der linken Seite mit der Bezeichnung "OPC Client (Anfrage)" sind durch Pfeile mit drei Blöcken auf der rechten Seite mit der Bezeichnung "OPC Server (Antwort)" verbunden. Blaue Pfeile stellen Anfragen dar, und orangefarbene Pfeile stellen Antworten dar. © HiveMQ GmbH.](/images/image-q4nt-c5Nj.png)

## **Hauptmerkmale von OPC UA:**

- Standardisierter Datenaustausch
- Datenübertragungsformate
- Client/Server-Architektur
- Verwendete Protokolle
- Sicherheit
- Gateway-Kompatibilität
- Umfangreiche Dokumentation

**Architektur von OPC UA**: OPC UA basiert auf einer Client/Server-Architektur und verwendet TCP/IP und HTTP/SOAP als grundlegende Technologien. Der OPC UA-Server konvertiert Hardware-Kommunikationsprotokolle, sodass Gerätedaten durch ein standardisiertes Gerätemodell übertragen werden. Der OPC UA-Client entscheidet, wann und welche Daten der Server aus den zugrunde liegenden Systemen abruft.

![Ein Diagramm, das die Integration verschiedener Industriegeräte, Sensoren und Protokolle mit SCADA, MES, Historian, Analytics und Anwendungen veranschaulicht. Die linke Seite zeigt Geräte und Gateways, während die rechte Seite mit Softwareplattformen verbunden ist, wobei Pfeile die Verbindungen anzeigen.](/images/image-k1mz-EwOT.png)

## **Sparkplug B**

Sparkplug B ist ein auf MQTT basierendes Protokoll, das von Arlen Nipper, einem der Erfinder von MQTT, entwickelt wurde. Es erfüllt die Anforderungen der Industrie und bietet ein standardisierteres Protokoll als OPC UA, jedoch mit geringerer Komplexität.

### **Hauptmerkmale von Sparkplug B:**

- Einfache Implementierung
- Quality of Service (QoS)
- Leichtgewichtig und effizient
- Datenunabhängigkeit
- Sitzungsfortsetzung (Retention)
- Zentralisierte Datenarchitektur

![This diagram illustrates an industrial communication system using the Sparkplug protocol. On the left side, various devices such as sensors, digital and analog inputs, OPC UA devices, and Modbus devices are connected to three gateways and a PLC, all supporting the Sparkplug protocol. These elements communicate with a central broker, which then transmits data to MES, Historian, Analytics, and other applications positioned on the right side, all of which also support the Sparkplug protocol.](/images/image-y5mt-IzMD.png)

## **Vergleich der Architekturen von OPC UA und Sparkplug B**

- **OPC UA**: Client/Server-Architektur, dezentrale Struktur, Protokolle TCP/HTTP und SOAP, Sicherheit durch TLS und Zertifikate verstärkt.

- **Sparkplug B**: Basierend auf MQTT, zentralisierte Datenarchitektur mit einem MQTT-Broker, einfache Implementierung und leichtgewichtig.

![This table compares the characteristics of Sparkplug B and OPC UA based on scalability, data integrity, efficiency, ease of integration, cloud connectivity, complexity of specification, lightweightness, and centralization.](/images/image-c2mj.png)

## **Datenformat: OPC UA vs. Sparkplug B**

- **OPC UA**: Präferiert das XML-Format, kann aber auch Daten in JSON übertragen. Die Daten umfassen Header mit Metadaten, was die Komplexität erhöht.
- **Sparkplug B**: Das Datenformat ist leichter und effizienter ohne zusätzliche Metadaten-Header.

![XML vs JSON - Hauptunterschiede im Datenformat](/images/image-AxNT2.png)

Der Hauptunterschied zwischen den beiden Protokollen liegt in der fehlenden Zentralisierung bei OPC UA, was sich als Herausforderung beim Sammeln von Daten erweisen kann.

![Diagramm, das die Netzwerkstrukturen von MQTT/Sparkplug B und OPC UA vergleicht, wobei MQTT/Sparkplug B einen zentralen Knoten zeigt, während OPC UA ein vollständig verbundenes Netzwerk darstellt.](/images/image-q3ot-U4MD.png)

## **Zusammenfassung**

Beide Protokolle, OPC UA und Sparkplug B, haben ihre einzigartigen Vorteile und werden in verschiedenen industriellen Kontexten eingesetzt. OPC UA bietet eine umfassendere und sicherere Struktur, die ideal für komplexe Systeme ist, die hohe Sicherheits- und Standardisierungsanforderungen haben. Auf der anderen Seite ist Sparkplug B leichter, einfacher und effizienter, was es zu einer idealen Wahl für Anwendungen macht, die geringe Latenzzeiten und eine einfache Implementierung erfordern.