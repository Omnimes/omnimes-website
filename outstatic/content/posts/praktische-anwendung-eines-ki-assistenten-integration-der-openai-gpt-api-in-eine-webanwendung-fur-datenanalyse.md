---
title: 'Praktische Anwendung eines KI-Assistenten: Integration der OpenAI GPT-API in eine Webanwendung für Datenanalyse'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'praktische-anwendung-eines-ki-assistenten-integration-der-openai-gpt-api-in-eine-webanwendung-fur-datenanalyse'
description: 'Learn how to integrate the GPT-4 API with a web application step by step to leverage advanced data analysis features. Example in Python and Flask, along with settings and data security.'
coverImage: '/images/2.png'
lang: 'de'
tags: [{"value":"ai","label":"AI"},{"label":"Datenanalyse","value":"datenanalyse"},{"value":"datensicherheit","label":"Datensicherheit"},{"value":"apiGpt4","label":"API GPT-4"},{"label":"LLM-Modelle","value":"llmModelle"}]
publishedAt: '2024-06-10T07:08:06.000Z'
---

In der heutigen dynamischen technologischen Welt wird die Integration intelligenter Assistenten wie GPT-4 in Webanwendungen immer beliebter. GPT-4, entwickelt von [OpenAI](https://openai.com/), bietet leistungsstarke Datenanalysefähigkeiten, die die Funktionalität und den Wert von Webanwendungen erheblich verbessern können. In diesem Artikel werden wir einen Schritt-für-Schritt-Leitfaden vorstellen, wie man die GPT-4 API mit einer Webanwendung zur Datenanalyse verbindet.

![OpenAI logo](/images/image-cxMD.png)

Natürlich bedeutet die Verbindung eines solchen GPT-Assistenten oder eines anderen großen Sprachmodells (LLM) über externe Server, dass die Webanwendung, die vom Endbenutzer verwendet wird, Zugang zum externen Internet haben muss.

GPT-Modelle ab Version 3.5 werden über eine API zur Verfügung gestellt, befinden sich jedoch ausschließlich auf den Servern von [OpenAI](https://openai.com/).

Eine lokale Lösung umfasst das GPT-2.0-Modell, das in drei Gewichtsvarianten verfügbar ist, wobei die größte XL-Version etwa 6 GB wiegt. Dieses Modell ist qualitativ schwächer im Vergleich zur Version 3.5, eignet sich jedoch für einfache Aufgaben. Es ist zu beachten, dass es nur die englische Sprache unterstützt.

 Another solution is to use LLM (Large Language Model) models available from [Hugging Face](https://huggingface.co/).

Diese Modelle können lokal verwendet werden und sind für verschiedene Anwendungen trainiert.

Ich werde über die Bereitstellung lokaler Sprachmodelle (LLMs) und die Sicherheit der an externe Server übertragenen Daten im nächsten Artikel schreiben. Für den Moment werde ich eine einfache Möglichkeit vorstellen, einen GPT-Assistenten über die OpenAI API mithilfe des Flask-Frameworks zu implementieren, aufgrund seiner schnellen Anwendungsentwicklungsfähigkeiten für APIs.

Außerdem werde ich eine praktische Anwendung des GPT-Assistenten mit einem konkreten Beispiel vorstellen, nämlich dem [Omnimes-System](https://www.omnimes.com/), das von [Multiprojekt ](https://www.multiprojekt.pl/)entwickelt wurde.

Dieses besprochene System wird zur Überwachung und Verwaltung der Produktion in Fabriken und Produktionsanlagen eingesetzt.

## Schritt 1: Registrierung und Erhalt des API-Schlüssels

Der erste Schritt besteht darin, sich auf der OpenAI-Plattform zu registrieren und einen API-Schlüssel zu erhalten. Dieser Schlüssel ist erforderlich für die Authentifizierung und die Kommunikation mit dem OpenAI-Server.

1. Registrieren Sie sich auf der [OpenAI](https://openai.com/) Website.
2. Nach dem Einloggen gehen Sie zum Abschnitt "API" und erstellen Sie einen neuen API-Schlüssel.
3. Notieren Sie sich den API-Schlüssel, der in Ihrer Anwendung verwendet werden wird.

## Schritt 2: Einrichten der Webanwendungsumgebung

Um die GPT-4 API zu integrieren, benötigen Sie eine Programmierumgebung für Ihre Webanwendung. In diesem Artikel verwenden wir ein Beispiel in Python mit dem Flask-Framework.

### Installation von Flask

Falls Sie Flask noch nicht installiert haben, können Sie dies mit pip nachholen:

```python
pip install Flask
```

### Erstellung einer grundlegenden Flask-Anwendung

Erstellen Sie eine neue Datei mit dem Namen `app.py` und fügen Sie den grundlegenden Flask-Anwendungscode hinzu:

```python
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# OpenAI API-Schlüssel
openai.api_key = 'DEIN_API_SCHLÜSSEL'

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Kein Prompt angegeben'}), 400

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )

    return jsonify(response.choices[0].text)

if __name__ == '__main__':
    app.run(debug=True)
```

## Schritt 3: Konfiguration und Aufruf der GPT-4 API

### API-Konfiguration

Im obigen Code haben wir den OpenAI API-Schlüssel konfiguriert sowie den `/analyze` Endpunkt definiert, der POST-Anfragen mit JSON-Daten akzeptiert, die Prompts zur Analyse enthalten.

### Beispielhafter API-Aufruf

Um unsere Anwendung zu testen, können wir Tools wie Postman oder curl verwenden. Hier ist ein Beispiel für die Verwendung von curl, um eine Anfrage zu senden:

```bash
curl -X POST http://127.0.0.1:5000/analyze \
-H "Content-Type: application/json" \
-d '{"prompt": "Beispieltext zur Analyse"}'
```

Die Anwendung sollte eine Antwort zurückgeben, die die Analyse des durch GPT-4 durchgeführten Prompts enthält.

## Schritt 4: Integration mit der Webanwendung

 

Als nächstes müssen wir unseren Endpoint mit dem Frontend der Webanwendung integrieren. Dies können wir mit AJAX in JavaScript erreichen.

### Beispielhafte Integration mit dem Frontend

In der HTML-Datei fügen wir ein Formular zum Eingeben von Text und einen Button hinzu, um Daten an unseren Endpoint zu senden:

```html
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <title>Integration mit GPT-4</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  </head>
  <body>
    <h1>Textanalyse mit GPT-4</h1>
    <textarea id="prompt" rows="10" cols="50"></textarea>
    <br />
    <button id="analyze-button">Analysieren</button>
    <h2>Ergebnis:</h2>
    <pre id="result"></pre>

    <script>
      $(document).ready(function() {
        $('#analyze-button').click(function() {
          const prompt = $('#prompt').val();
          $.ajax({
            url: '/analyze',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ prompt: prompt }),
            success: function(response) {
              $('#result').text(response);
            },
            error: function(error) {
              $('#result').text('Fehler aufgetreten: ' + error.responseJSON.error);
            }
          });
        });
      });
    </script>
  </body>
</html>
```

## Praktische Anwendung eines KI-Assistenten: Fallstudie des Produktionsmanagementsystems Omnimes

Das folgende Beispiel behandelt ausschließlich den Betrieb des GPT-Assistenten innerhalb des bereits funktionierenden Produktionsmanagementsystems Omnimes. 

![Einstellungen für den GPT OpenAI-Assistenten in Omnimes](/images/image-IxOD.png)

Das obige Bild zeigt die Einstellungsoptionen des Assistenten. Im ersten Feld muss der Benutzer den OpenAI API-Token eingeben. In diesem Beispiel hat der Benutzer zwei Modelloptionen: Version 3.5 und 4. Persönlich empfehle ich die Verwendung von Version 3.5, da sie wesentlich kostengünstiger ist. Der Hauptunterschied besteht darin, dass Version 4 in längeren Gesprächen besser abschneidet. In diesem Beispiel werden wir den Assistenten eine Frage mit bereitgestellten Produktionsdaten zur schnellen Analyse stellen.

Die nachfolgenden Felder sind recht bedeutend. Im ersten Feld geben wir an, welche Rolle der Assistent verkörpern soll. Das zweite Feld ist die Hauptabfrage, die ausgeführt werden soll. Für jede Abfrage werden Daten aus der Zusammenfassung angehängt, die sich auf dem Hauptdashboard des Systems befindet.

Die folgenden Felder dienen dazu, die Länge der Antwort des Assistenten und die Menge der aus der Zusammenfassung gesendeten Daten zu begrenzen.

Eine praktische Funktion ist die Möglichkeit, den GPT-Assistentenmodus im gesamten System zu verstecken.

Die Abfrage des Assistenten erfolgt durch das Senden der Hauptabfrage gemäß der früheren Konfiguration und dem Anfügen von Daten aus der Zusammenfassung, die der Benutzer selbst erstellen kann. Unten sind Bilder aus dem Hauptpanel:

![Omnimes GPT OpenAI Assistant – Abfrage an den GPT-Assistenten](/images/image-I3ND.png)

In der oberen rechten Ecke befindet sich eine Schaltfläche zur Durchführung der Analyse, mit der wir buchstäblich mit einem Klick eine Analyse der gesendeten Daten erhalten, die in den Diagrammen sichtbar ist. Nachfolgend finden Sie das Ergebnis der Analyse.

![Das Ergebnis der GPT-Analyse](/images/image-U4OT.png)

Eine coole Anwendung ist die Möglichkeit, die vom Assistenten durchgeführten Analysen zu durchsuchen und Informationen über das verwendete Modell und die Anzahl der verwendeten Token zu erhalten.

![Liste der GPT-Analysen zusammen mit Details zum Token-Verbrauch](/images/image-AxNz.png)

## Zusammenfassung

Die Integration der GPT-4 API in eine Webanwendung ermöglicht die Nutzung fortschrittlicher Datenanalysefunktionen, die den Wert und die Funktionalität Ihrer Anwendung erheblich verbessern können. Dieser Prozess beinhaltet das Beschaffen eines API-Schlüssels, die Konfiguration der Backend-Anwendung und deren Integration mit dem Frontend. Als Ergebnis können Benutzer Ihrer Anwendung von den leistungsstarken analytischen Fähigkeiten profitieren, die GPT-4 bietet.

Jedoch stellt sich bei der Nutzung solcher Lösungen die Frage nach der Datenschutzrichtlinie.

Die Antwort ist einfach: Es muss berücksichtigt werden, dass nur ein Fragment von Daten an einen solchen Assistenten gesendet wird, das aus einem größeren Ganzen extrahiert wird, und ein einzelnes Fragment hat global betrachtet wenig Wert.

Obwohl eine solche Argumentation wirksam sein kann, stellt sie möglicherweise dennoch eine unüberwindliche Hürde in Bezug auf die Datenschutzrichtlinien einiger Unternehmen dar.

Daher besteht die Möglichkeit, ein LLM-Modell lokal bereitzustellen, worüber ich im nächsten Artikel schreiben werde.