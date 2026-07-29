---
title: 'Datenvisualisierung – Der Erfolg der Analyse. Redash'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'datenvisualisierung-der-erfolg-der-analyse-redash'
description: 'In der heutigen Welt ist die rasante Entwicklung der Technologie und die zunehmenden Marktbedürfnisse machen effizientes Produktionsmanagement für den Erfolg eines Unternehmens entscheidend. Systeme wie Omnimes bieten fortschrittliche Werkzeuge zur Prozessoptimierung, einschließlich Datenvisualisierung, die Analyse und Entscheidungsfindung unterstützt.'
coverImage: '/images/5.png'
lang: 'de'
tags: [{"value":"redash","label":"redash"},{"label":"Datenvisualisierung","value":"datenvisualisierung"},{"value":"bigData","label":"big data"},{"label":"Berichte","value":"berichte"}]
publishedAt: '2024-06-15T07:31:17.000Z'
---

![Logo redash](/images/image-U2ND.png)

## Einführung

In der heutigen Welt machen die rasante Entwicklung der Technologie und die zunehmenden Marktbedürfnisse effizientes Produktionsmanagement entscheidend für den Erfolg eines Unternehmens. Systeme wie Omnimes bieten fortschrittliche Werkzeuge zur Prozessoptimierung, einschließlich Datenvisualisierung, die Analyse und Entscheidungsfindung unterstützt.

Datenvisualisierung wandelt Rohdaten in wertvolle Informationen um, die auf verschiedenen Ebenen innerhalb einer Organisation leicht interpretierbar sind. Mit Werkzeugen wie Redash können Omnimes-Benutzer interaktive Dashboards erstellen, die wichtige Leistungsindikatoren (KPIs) darstellen, die Produktionsfortschritte überwachen und Bereiche zur Verbesserung identifizieren.

In diesem Artikel werden wir diskutieren, wie die Integration von Omnimes mit Redash die Produktion durch effektive Datenvisualisierung unterstützt. Wir werden spezifische Anwendungsbeispiele vorstellen, die Vorteile wie Produktionsoptimierung, verbesserte Teamkommunikation, schnellere Problembehebung und informiertere Entscheidungsfindung demonstrieren.

## Was ist Redash?

In der schnelllebigen Technologiewelt ist effektives Produktionsmanagement entscheidend. Das Omnimes-System, integriert mit der Redash-Plattform, bietet fortschrittliche Werkzeuge zur Prozessoptimierung, einschließlich Datenvisualisierung, die Analyse und Entscheidungsfindung unterstützt.

Redash ist eine selbstbedienbare, Open-Source-Plattform für Datenabfrage und -visualisierung. Schnell einzurichten, arbeitet sie mit zahlreichen Datenquellen wie Redshift, Google BigQuery, MongoDB, Google Sheets, PostgreSQL, MySQL und ElasticSearch zusammen.

### Hauptmerkmale von Redash:

- **Browser-basiert und REST-API**: Funktioniert vollständig in einem Webbrowser mit sharebaren URLs und einer gut definierten API-Schnittstelle.
- **Abfrage-Editor**: Erstellen Sie SQL- und NoSQL-Abfragen mit einem Schema-Browser und Autovervollständigung. Möglichkeit, Abfrage-Snippets zu erstellen und wiederzuverwenden, um Daten in Diagrammen darzustellen.
- **Visualisierung und Dashboards**: Erstellen Sie Visualisierungen mithilfe einer Drag-and-Drop-Methode. Gruppieren Sie Visualisierungen in Dashboards, die automatisch aktualisiert werden.
- **Benachrichtigungen**: Definieren Sie Auslösebedingungen und erhalten Sie sofortige Benachrichtigungen bei Datenänderungen, z. B. Überschreiten eines festgelegten Drucks oder einer Temperatur.

Die Redash-Plattform unterstützt eine Vielzahl von Produkten, was sie zu einem vielseitigen Werkzeug für die Datenvisualisierung innerhalb des Omnimes-Systems macht.

![Unternehmen, die Redash verwenden](/images/image-AzMT.png)

Für weitere Informationen über Redash, sowie seine Konfiguration und Implementierung in Ihr eigenes Projekt, besuchen Sie bitte: [redash.io](https://redash.io).

Nach diesem kurzen Überblick über das Redash-Tool werde ich die neuen Möglichkeiten innerhalb des Omnimes-Systems nach seiner Implementierung vorstellen.

## Redash in Omnimes

Nach dem Start von Redash gibt es drei Schritte zur Erstellung eines Daten-Dashboards:

- **Erstellung einer Abfrage**: Dies umfasst das Abrufen von Daten aus der Datenbank.
- **Erstellung eines Diagramms**: Basierend auf den abgerufenen Daten.
- **Hinzufügen des Diagramms zu einem Dashboard**.

Zwei praktische Funktionen eines solchen Dashboards sind erwähnenswert:

1. **Teilen ohne Erstellung eines Kontos**: Ein solches Dashboard kann ohne Erstellung eines Benutzerkontos im Omnimes-System mit anderen geteilt werden. Zum Beispiel kann es von Verkehrsmanagement-Supervisoren oder höherem Personal auf der Produktionsfläche eingesehen werden, um Mitarbeiter zu motivieren.

2. **Häufige Aktualisierung der Daten**: Das geteilte Dashboard kann so eingestellt werden, dass es sich so häufig wie jede Minute aktualisiert, um kontinuierliche und aktuelle Zusammenfassungen dessen zu liefern, was auf der Shop-Floor passiert.

Um dies zu erleichtern, haben wir im Omnimes-System unseren eigenen Abfrage-Editor eingeführt, wie unten dargestellt:

![Abfrage-Editor für Redash in Omnimes](/images/redash1-k5Mj.png)

Nachdem die gewünschten Abfragen erstellt wurden, gehen wir zu Redash selbst, um auf die Liste der erstellten Datenabfragen zuzugreifen.

![Die Liste der Abfragen in Redash](/images/image-UyNT.png)

Als nächstes greifen wir auf die spezifische Abfrage zu und bearbeiten sie innerhalb von Redash. Wenn unsere Verbindung zur Datenquelle korrekt ist, erhalten wir die Ergebnisse.

![Eine Abfrage in Redash bearbeiten](/images/image-k1OT.png)

Als nächstes wechseln wir zum Tab "Diagramm" in Redash, wo wir Visualisierungen erstellen, indem wir angeben, wie Daten dargestellt werden sollen. Es gibt viele Optionen, sowohl für Diagrammtypen als auch für Darstellungsstile. Hier ist ein Beispiel für ein "Balken"-Diagramm, das Maschinen basierend auf dem Auftreten der häufigsten Fehler vergleicht.

![Ein Daten-Diagramm in Redash](/images/image-Y2MT.png)

Nachdem wir die gewünschten Diagramme mit den Daten erstellt haben, gehen wir zum Tab "Dashboard" in Redash, wo wir entscheiden, welche Diagramme darin enthalten sein sollen.

![Ein Diagramm zu einem Dashboard in Redash hinzufügen](/images/image-c4MD.png)

An diesem Punkt können wir die öffentliche Freigabe des Dashboards aktivieren und das Datenaktualisierungsintervall in Redash festlegen.

In Omnimes haben wir die Möglichkeit zu entscheiden, welche Dashboards auf der Startseite des Systems angezeigt werden sollen. Dies beschränkt nicht die Erstellung zusätzlicher Dashboards, die mit anderen Abteilungen oder Personen geteilt werden können.

![Liste der Dashboards in Omnimes](/images/redash2-MyNj.png)

Als Ergebnis erhalten wir ein fertiges Dashboard, wie unten dargestellt:

![Fertiges Dashboard in Omnimes](/images/redash3-c1Nz.png)

Die auf diese Weise vorbereiteten Daten können weiterhin genutzt werden, beispielsweise für die Analyse durch Künstliche Intelligenz, wie es im Fall des Omnimes-Systems der Fall ist.

![Nutzung von Daten aus Redash für die AI-Analyse](/images/redash4-M2MD.png)

Und erhalten eine umfassende Zusammenfassung, ähnlich wie diese:

![Ergebnis der KI-Analyse](/images/redash5-I4Nj.png)

## Zusammenfassung

In der heutigen schnelllebigen Welt der Technologie ist eine effektive Produktionsmanagement entscheidend für den Erfolg von Unternehmen. Systeme wie **Omnimes**, die mit Datenvisualisierungstools wie **Redash** integriert sind, bieten fortschrittliche Funktionen zur Optimierung von Produktionsprozessen.

Redash ist eine vielseitige Open-Source-Plattform für Abfragen und Datenvisualisierungen, die mit verschiedenen Datenquellen wie Redshift, Google BigQuery und PostgreSQL kompatibel ist.

**Die Integration von Redash mit Omnimes** ermöglicht die Erstellung interaktiver Dashboards, die öffentlich geteilt werden können, ohne dass Benutzerkonten erforderlich sind, und ermöglicht häufige Datenaktualisierungen für Echtzeit-Einblicke in die Produktion. Innerhalb des **Omnimes**-Systems können Benutzer auch entscheiden, welche Dashboards auf der Startseite angezeigt werden sollen, und zusätzliche Dashboards für den internen Gebrauch erstellen.

**Die vorgestellten Beispiele zeigen, wie diese Tools ein effektives Produktionsmanagement unterstützen können, die Teamkommunikation verbessern und eine schnellere Reaktion auf Probleme ermöglichen**.

Als Ergebnis können Unternehmen fundiertere Entscheidungen treffen, Produktionsprozesse optimieren und die Produktqualität verbessern.

Letztlich führt die **Implementierung von Redash im Omnimes-System** zur Erstellung fortschrittlicher Dashboards, **die für weitere Datenanalysen genutzt werden können, einschließlich der Nutzung von Künstlicher Intelligenz**, um umfassende Zusammenfassungen bereitzustellen und das Produktionsmanagement zu verbessern.