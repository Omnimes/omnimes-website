---
title: 'MQTT vs. Sparkplug B: Vergleich der Kommunikationsprotokolle Teil I'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'mqtt-vs-sparkplug-b-vergleich-der-kommunikationsprotokolle-teil-i'
description: 'Vergleich der Kommunikationsprotokolle MQTT und Sparkplug B im Kontext des industriellen Internets der Dinge (IIoT). Erfahren Sie mehr über ihre Vorteile, Unterschiede, die Dienstgüte (QoS) und die Nachrichtenaufbewahrung. Entdecken Sie, welches Protokoll die Anforderungen Ihres IoT-Projekts besser erfüllt.'
coverImage: '/images/4.png'
lang: 'de'
tags: [{"value":"mqtt","label":"MQTT"},{"value":"sparkplugB","label":"Sparkplug B"},{"value":"qoS","label":"QoS"},{"value":"iIoT","label":"IIoT"},{"value":"omniMES","label":"OmniMES"},{"value":"industry40","label":"Industry 4.0"},{"label":"Kommunikationsprotokoll","value":"kommunikationsprotokoll"},{"label":"IoT-Kommunikation","value":"ioTKommunikation"},{"label":"Kommunikationsstandards","value":"kommunikationsstandards"}]
publishedAt: '2024-06-05T05:46:42.000Z'
---

## **Einführung**

In der Welt des industriellen Internets der Dinge (IIoT) ist die Wahl des richtigen Kommunikationsprotokolls entscheidend.

Zwei beliebte Protokolle sind **MQTT und Sparkplug B**. Beide haben ihre einzigartigen Merkmale und Anwendungen. In diesem Artikel werden wir diese Protokolle, ihre Ursprünge, Funktionsweise, Dienstgüte, Nachrichtenaufbewahrung und die Unterschiede zwischen ihnen besprechen. Zusätzlich werden wir die Anwendung von Sparkplug B im Omnimes-System von Multiprojekt vorstellen.

## **Ursprung von MQTT**

Das MQTT-Protokoll wurde 1999 von **Andy Stanford-Clark von IBM und Arlen Nipper von Arcom** (heute Cirrus Link) entwickelt. Seine Hauptprinzipien sind:

- Einfache Implementierung
- Bereitstellung von Dienstgütedaten (QoS)
- Leichtgewichtig und bandbreiteneffizient
- Datenunabhängigkeit
- Sitzungsfortsetzung (Nachrichtenaufbewahrung)

## **Funktionsweise von MQTT**

MQTT arbeitet in einem Publish/Subscribe-Modell, bei dem ein Client bestimmte Themen abonniert und Nachrichten empfängt. Ein Beispielthema könnte `switch/light/` sein, und die Nutzlast könnte ein JSON-Dokument sein: 

```json
{status: "ON", color:"red", date:"2023-01-08", time:"10:23"}
```

![Ein Diagramm, das einen zentralen roten Block mit der Bezeichnung "Broker" zeigt, mit Pfeilen, die zu fünf grauen Blöcken mit den Bezeichnungen "Gerät 1", "Gerät 2", "Gerät 3", "Gerät 4" und "Gerät 5" führen. Pfeile, die "Subscription" und "Publication" anzeigen, veranschaulichen die MQTT-Kommunikation.](/images/publikacja-EyOD.png)

## **Dienstgüte (Quality of Service, QoS) in MQTT**

MQTT bietet drei QoS-Stufen:

- **QoS 0**: "Höchstens einmal" - Die Nachricht wird einmal geliefert, ohne Bestätigung.
- **QoS 1**: "Mindestens einmal" - Die Nachricht wird mindestens einmal geliefert, mit Empfangsbestätigung.
- **QoS 2**: "Genau einmal" - Die Nachricht wird genau einmal geliefert, mit Empfangsbestätigung und Rückmeldung an den Sender.

## **Nachrichtenaufbewahrung (Message Retention) in MQTT**

Die Nachrichtenaufbewahrung ermöglicht es, den letzten Zustand einer Nachricht zu speichern, was nützlich ist für Benachrichtigungen über den Status von Geräten. Auf diese Weise kann ein neuer Benutzer den letzten bekannten Zustand der Maschine erfahren.

## **Ursprung von Sparkplug B**

Sparkplug B ist ein auf MQTT basierendes Protokoll, das von **Arlen Nipper (Gründer von Cirrus Link)** entwickelt wurde. Es wurde als Reaktion auf die Anforderungen der Industrie geschaffen und bietet im Vergleich zu **OPC UA** ein standardisierteres und weniger komplexes Protokoll.

## **Unterschiede zwischen MQTT und Sparkplug B**

1. **Kanal- und Nutzlastschema**:
   - **Sparkplug B**: Standardisiertes Thema und Nutzlastschema. Beispielthema: `spBv1.0/switch/light/#`. Beispiel-Nutzlast:

      ```json
     {
       "timestamp": 1673262477011,
       "metrics": [
         {
           "name": "status",
           "timestamp": 1673262477011,
           "dataType": "Int16",
           "value": "ON"
         },
         {
           "name": "color",
           "timestamp": 1673262477011,
           "dataType": "Int16",
           "value": "red"
         }
       ],
       "seq": 9
     }
     ```
   - **MQTT**: Flexibility in der Gestaltung von Themen und Nutzlasten. Beispielthema: `switch/light/`. Beispiel-Nutzlast:

   ```json
     {
       "status": "ON",
       "color": "red",
       "date": "2023-01-08",
       "time": "10:23"
     }
     ```
2. **Nachrichtenaufbewahrung**:
   - **Sparkplug B**: Keine natürliche Nachrichtenaufbewahrung. Es ist notwendig, einen Datenspeicher zu erstellen, der die letzten Zustände/Informationen eines bestimmten Geräts aufrechterhält.
   - **MQTT**: Eingebaute Nachrichtenaufbewahrungsfunktionalität.

## **Anwendung von Sparkplug B im Omnimes System von Multiprojekt**

Die Implementierung von Sparkplug B im Omnimes System hat mehrere Vorteile gebracht:

- Erstellung eines Konfigurationsassistenten
- Vereinfachte Verbindungseinrichtung
- Keine Vorgabe der Datenstruktur für den Benutzer
- Verlagerung der Verantwortung für die Konfiguration auf den Benutzer

![Auf dem Computerbildschirm wird ein Dashboard mit polnischem Text, Tabellen und Diagrammen angezeigt. Zwei grüne Pfeile zeigen von einem JSON-Code-Snippet oben zu Elementen im unteren Bereich und veranschaulichen die Verbindung zwischen Eingabedaten und Steuerelementen auf dem Dashboard des Omnimes-Systems.](/images/image-uyot-YwNT.png)

## **Zusammenfassung**

Die Wahl zwischen MQTT und Sparkplug B hängt von den spezifischen Bedürfnissen und Anforderungen der Anwendung ab.

- **MQTT**: Flexibler mit nativer Nachrichtenaufbewahrung.
- **Sparkplug B**: Bietet standardisierte Strukturen und ist besser für industrielle Anwendungen optimiert.

Beide Protokolle haben ihren Platz im IIoT-Ökosystem, und es ist wichtig, sorgfältig zu analysieren, welches am besten die Anforderungen Ihres Projekts erfüllt.