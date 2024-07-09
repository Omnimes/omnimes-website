---
title: 'Ollama - Praktische Anwendung lokaler KI-Modelle am Beispiel des OMNIMES-Systems'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'ollama-praktische-anwendung-lokaler-ki-modelle-am-beispiel-des-omnimes-systems'
description: 'Das Ollama-Projekt ist eine offene und kostenlose Software, die es ermöglicht, lokale KI-Modelle, insbesondere große Sprachmodelle (LLMs), auf Ihrem eigenen Computer oder Server auszuführen. Aufgrund seiner geringen Hardware-Anforderungen ist diese Software für mittlere und kleine Unternehmen zugänglich und bietet Zugang zu 93 KI-Modellen ohne signifikante Einschränkungen.'
coverImage: '/images/1.png'
lang: 'de'
tags: [{"value":"ai","label":"AI"},{"value":"aiLocal","label":"AI local"},{"value":"llama3","label":"llama3"},{"value":"meta","label":"Meta"},{"value":"gemma","label":"Gemma"},{"value":"mistral","label":"Mistral"},{"value":"gpt4","label":"GPT-4"},{"value":"gpt35","label":"GPT-3.5"}]
publishedAt: '2024-06-20T08:28:30.000Z'
---

![Meta - ollama logo - model AI](/images/image-E3MT.png)

Lass uns von vorne anfangen: Was ist das **Ollama-Projekt**? Es handelt sich um eine offene und kostenlose Software, mit der lokale KI-Modelle, insbesondere große Sprachmodelle (LLMs), auf Ihrem eigenen Computer oder Server mit vergleichsweise geringen Hardware-Anforderungen ausgeführt werden können. Diese Software, zusammen mit einem der Modelle, **Llama3**, stammt von **META (ehemals Facebook)**.

Aktuell ermöglicht die Software mittleren und kleinen Unternehmen die Nutzung von 93 verfügbaren KI-Modellen mit wenigen oder keinen Einschränkungen.

Die Software ist auf allen Plattformen verfügbar, einschließlich Windows/Linux/MacOS, und kann auch über Docker genutzt werden.

 Starten

 

Das Starten der Software ist unglaublich einfach. Hier werde ich kurz den Prozess anhand eines Windows-Beispiels zusammenfassen. Für detaillierte Installationsanweisungen bitte auf der Website des Projekts nachschauen: [https://ollama.com](https://www.ollama.com/)

Vom Projektwebsite einfach den Installer herunterladen. Mit einem Klick ist die Software installiert. Nach der Installation geben Sie in Ihrem Browser ein:

```bash
localhost:11434
```

Dort sollte angezeigt werden, dass der Server gestartet wurde.

![Screenshot der Konsole mit dem laufenden Ollama-Server](/images/image-ExNT.png)

I can't browse the internet or fetch live information, but you can visit [\[https://ollama.com/library\](https://www.ollama.com/library](https://ollama.com/library]\(https://www.ollama.com/library\))) directly to view the available models and their descriptions.

Nach der Installation können Sie ein Modell einfach herunterladen, indem Sie zum Beispiel Folgendes in der **cmd** eingeben:

```bash
ollama pull llama3
```

Ab sofort haben wir einen einsatzbereiten Server mit dem Modell Llama3. Es gibt mehrere Möglichkeiten, mit dem Modell zu kommunizieren. Die einfachste Möglichkeit, die Funktionsweise des Modells zu überprüfen, ist über **cmd**. Geben Sie einfach Folgendes ein:

```bash
ollama run llama3
```

Nach der Ausführung des Befehls haben wir eine einsatzbereite Kommunikationsschnittstelle.

![Die Kommunikationsschnittstelle von Ollama.](/images/image-I3OT.png)

Wir geben eine Frage ein und warten auf die Antwort.

![Antwort des Ollama-Sprachmodells auf die Frage "Wer ist Elon Musk?".](/images/image-UyND.png)

Natürlich bevorzugt nicht jeder diese Art der Kommunikationsschnittstelle. Eine andere Möglichkeit ist über eine Web-Schnittstelle, die jedoch die Installation von Docker erfordert. Falls Docker installiert ist, können wir von der Website:

\[[https://github.com/open-webui/open-webui\](https://www.github.com/open-webui/open-webui)](https://github.com/open-webui/open-webui]\(https://www.github.com/open-webui/open-webui\))

die gewünschte Version herunterladen. Ich wähle die Standardversion und füge Folgendes in **cmd** ein:

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

Öffnen Sie einen Webbrowser und geben Sie ein:

```bash
localhost:3000
```

und die Benutzeroberfläche, die Ihnen von OpenAI bekannt ist, wird vor Ihren Augen erscheinen.

![Das Bild zeigt die grafische Benutzeroberfläche von Ollama. Die Oberfläche ähnelt derjenigen, die von OpenAI bekannt ist.](/images/image-kzNj.png)

From now on, können wir unser lokales Modell durch dieselbe Benutzeroberfläche wie bei ChatGPT vollständig nutzen.

Für die Konfiguration dieser Benutzeroberfläche und die vollständige Serverinstallation von **Ollama** lade ich Sie ein, dieses Video anzusehen:

[\[https://www.youtube.com/watchv=Wjrdr0NU4Sk\](https://youtube.com/watchv=Wjrdr0NU4Sk](https://www.youtube.com/watchv=Wjrdr0NU4Sk]\(https://youtube.com/watchv=Wjrdr0NU4Sk\)))

Wir haben einen kurzen Überblick über die Software und deren Installation gegeben. In einem weiteren Beitrag werde ich eine vollständige Installation des **Ollama**-Servers als Remote-KI-Server vorstellen und einen Vergleich der besten verfügbaren Modelle durchführen.

## Technische Anforderungen

Natürlich ist es erwähnenswert, dass der Ollama-Server auch eine API anbietet, die wir für unsere eigenen Anwendungen nutzen können, wodurch die Notwendigkeit entfällt, eine Web-Oberfläche zu installieren.

Eine weitere interessante Funktion ist die Möglichkeit, benutzerdefinierte Modelle außerhalb der Ollama-Bibliothek hinzuzufügen. Das bedeutet, wir können unser eigenes KI-Modell erstellen und in einem kompatiblen Format dem Server hinzufügen.

Was die technischen Anforderungen betrifft - alles hängt vom verwendeten Modell, der Anzahl der Abfragen an das Modell und der Größe des KI-Modells selbst ab.

Für den persönlichen Gebrauch oder den Betrieb als kleine KI ist eine einzelne Grafikkarte ausreichend - dies wurde auf einem Server mit einer RTX 3070 Ti (350W) und auf einer Laptop-Version mit RTX 4060 (140W) getestet, jeweils mit dem Llama3 KI-Modell.

Die Leistung ist überraschend gut, mit Antwortzeiten zwischen 5 und 10 Sekunden, was für ein lokales KI-Modell sehr gut ist.

Auch die Qualität der Antworten ist hoch, insbesondere in Bezug auf logische Syntax. Ein detaillierterer Vergleich der Modelle wird in einem anderen Beitrag behandelt werden. Im Moment konzentrieren wir uns auf das Llama3-Modell - ein KI-Modell, das von META (ehemals Facebook) unterstützt wird.

## Vergleich mit anderen Modellen

Eine der besten Möglichkeiten, die Fähigkeiten des Llama3-Modells zu zeigen, ist ein Vergleich mit Modellen wie GPT-2, GPT-3.5, GPT-4 sowie mit Googles KI-Modell Gemma und Apaches Mistral. Ein solcher Vergleich kann durch Benchmark-Tests dieser Modelle durchgeführt werden.

![Tabelle zum Vergleich von Sprachmodellen.](/images/image-gxNz.png)

**Bedeutung der Benchmarks:**

- **MMLU** ist ein Indikator für die Gesamtleistung und Vielseitigkeit des Sprachmodells über eine breite Palette von Sprachaufgaben hinweg.
- **GPQA** misst das Allgemeinwissen und die Fähigkeit, Fragen zu beantworten.
- **HumanEval** bewertet die Fähigkeit, korrekten Programmcode zu generieren.
- **GSM-8K** bewertet die Fähigkeiten bei der Lösung grundlegender mathematischer Probleme.
- **MATH** testet fortgeschrittenere mathematische Fähigkeiten.

Das signifikanteste Ergebnis stammt aus dem **MMLU**-Test, bei dem wir sehen, dass **das Llama3-Modell GPT-3.5 um 8,5 Einheiten übertrifft**.

**Daher spiegelt die Leistung der Verwendung dieses Modells als unsere lokale KI eine positive Erfahrung in seiner Anwendung wider.**

Nachdem wir nun die Ollama-Software und das Llama3-Modell beschrieben haben, einschließlich eines teilweisen Vergleichs mit anderen Modellen, wollen wir fortfahren und seine Funktionalität anhand eines Beispiels aus dem Produktionsausführungssystem - **Ominmes** - demonstrieren.

## Nutzung von Ollama mit Omnimes Beispiel

Mit Hilfe der Ollama-Server-API haben wir die Nutzung von lokaler KI innerhalb des Omnimes-Systems implementiert. Der Betrieb basiert auf einer einfachen Dateneinrichtung, ähnlich der Verwendung der OpenAI-API, wie in meinem früheren Beitrag unten diskutiert:

\[[https://www.omnimes.com/en/blog/practical-application-of-ai-assistant-integration-of-openai-s-gpt-api-with-a-web-application-for-data-analysis\](https://www.omnimes.com/en/blog/practical-application-of-ai-assistant-integration-of-openai-s-gpt-api-with-a-web-application-for-data-analysis)](https://www.omnimes.com/en/blog/practical-application-of-ai-assistant-integration-of-openai-s-gpt-api-with-a-web-application-for-data-analysis]\(https://www.omnimes.com/en/blog/practical-application-of-ai-assistant-integration-of-openai-s-gpt-api-with-a-web-application-for-data-analysis\))

![Einstellungen für das KI-Modell im Omnimes-System](/images/image-U0Nj.png)

Aktuell bietet das Omnimes-System die Option, zwischen der Nutzung externer KI, speziell der API von OpenAI, oder interner KI, nämlich Ollama, zu wählen.

Nach Auswahl des KI-Typs können wir im Fall der Ollama-KI das spezifische KI-Modell auswählen.

Die Anzahl der verfügbaren Modelle hängt von den auf dem Ollama-Server heruntergeladenen Modellen ab. Zusätzlich besteht die Möglichkeit, unser eigenes Modell hinzuzufügen, vorausgesetzt es ist im für die Ollama-Software kompatiblen Format gespeichert.

Nachfolgend finden Sie eine Übersicht der Datenanalyse aus der Zusammenfassung, die sich auf dem Hauptpanel des Omnimes-Systems befindet.

![Dashboard im Omnimes-System](/images/redash3-c1Nz.png)

*Analyseergebnis von GPT-3.5*

![Analyseergebnis von GPT-3.5](/images/image-I2Mj.png)

*Analyseergebnis von Llama3*

![Analyseergebnis von Llama3](/images/image-kxNT.png)

Wie wir sehen können, ist die logische Syntax des lokalen Llama3-Modells sehr gut und vergleichbar mit GPT-3.5. Es ist erwähnenswert, dass das Llama3-Modell selbst nur 4,5 GB wiegt, während das GPT-2 XL-Modell 6 GB wiegt. Das Gewicht des GPT-3.5-Modells wurde nicht öffentlich bekannt gegeben.

## Zusammenfassung

 

Wie wir sehen können, hinkt die Verwendung von lokaler KI durch die **Ollama**-Software in keiner Weise der Nutzung externer **Open AI**-Server über deren API hinterher.

Dies bietet uns erhebliche Möglichkeiten, obwohl hardware- und daher finanzielle Einschränkungen gelten, da die Leistung der KI ausschließlich von der verwendeten Hardware abhängt. Das **Llama3**-Modell bietet auch eine **größere Version, Llama3:70b, aber dieses Modell wiegt 40 GB**, was mehr als eine einzelne Grafikkarte erfordert, um betrieben zu werden.

Die Nutzung von **Ollama** für Unternehmensbedürfnisse in Systemen wie **Omnimes**, die sich auf die Produktionsabwicklung konzentrieren, ist jedoch ein guter Ansatz und berücksichtigt die **strengen Sicherheitsrichtlinien des Unternehmens**, wie z.B. die **Unmöglichkeit, Produktionsdatensysteme mit externen Servern zu verbinden oder sogar das Fehlen eines externen Internets in der Produktionsstätte**.

Zusätzlich profitieren wir von einem KI-Modell, das weniger anfällig für externe Desinformationen ist, wodurch das Risiko von Halluzinationen oder falschen Ausgaben reduziert wird.

Wenn Sie an unserer Lösung für Ihren Maschinenpark oder Ihre Produktionsfläche interessiert sind, um Produktionsprozesse mit modernen Daten- und Analysemethoden zu verbessern, lade ich Sie ein, unser Angebotssystem [Omnimes](https://omnimes.com/en/offer) zu erkunden.