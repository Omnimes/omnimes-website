---
title: 'MQTT vs Sparkplug B: Porównanie Protokółów Komunikacyjnych cz I'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'mqtt-vs-sparkplug-b-porownanie-protokolow-komunikacyjnych'
description: 'Porównanie protokołów komunikacyjnych MQTT i Sparkplug B w kontekście przemysłowego Internetu Rzeczy (IIoT). Dowiedz się o ich zaletach, różnicach, jakości usług (QoS) oraz retencyjności wiadomości. Odkryj, który protokół lepiej spełnia wymagania Twojego projektu IoT.'
coverImage: ''
tags: 'MQTT, Sparkplug B, Internet of Things, IIoT, Protokół komunikacyjny, Jakość usług, QoS, Retencyjność wiadomości, Przemysłowy Internet Rzeczy, Protokół MQTT, Protokół Sparkplug, Komunikacja IoT, Omnimes, Przemysł 4.0, Standardy komunikacyjne'
lang: 'pl'
publishedAt: '2024-06-06T10:56:31.490Z'
---

#### **Wprowadzenie**

W świecie przemysłowego Internetu Rzeczy (IIoT), wybór odpowiedniego protokołu komunikacyjnego jest kluczowy.

Dwa popularne protokoły to **MQTT i Sparkplug B**. Oba mają swoje unikalne cechy i zastosowania. W tym artykule omówimy te protokoły, ich powstanie, działanie, jakość usług, retencyjność wiadomości oraz różnice między nimi, jak również na końcu przedstawię zastosowanie SparkPlug B w systemie Omnimes firmy Multiprojekt.

#### **Powstanie MQTT**

Protokół MQTT został wynaleziony w 1999 roku przez **Andy'ego Stanforda-Clarka z IBM i Arlena Nippera z Arcom** (obecnie Cirrus Link). Jego główne założenia to:

- Prosta implementacja
- Dostarczanie danych dotyczących jakości usług (QOS)
- Lekkość i efektywność pod względem przepustowości
- Niezależność danych
- Ciągłość sesji (retencyjność)

#### **Działanie MQTT**

MQTT działa w trybie nasłuchiwania, gdzie klient subskrybuje określone topiki i odbiera wiadomości. Przykładowy topik może wyglądać tak: `switch/light/`, a ładunek to dokument JSON:

`{status:”ON”, color:"red", date:"2023-01-08", time:"10:23"}`

![](/images/image-Y0Nj.png)

#### **Jakość usług (QoS) w MQTT**

MQTT oferuje trzy poziomy QoS:

- **QoS 0**: "zwykły list" - wiadomość dostarczana raz, bez potwierdzenia.
- **QoS 1**: "list polecony" - wiadomość dostarczana przynajmniej raz, z potwierdzeniem odbioru.
- **QoS 2**: "list polecony z informacją zwrotną" - wiadomość dostarczana dokładnie raz, z potwierdzeniem odbioru i informacją zwrotną dla nadawcy.

#### **Retencyjność wiadomości w MQTT**

Retencyjność wiadomości pozwala na zapisanie ostatniego stanu wiadomości, co jest przydatne np. w przypadku powiadomień o stanie urządzeń. Dzięki temu, nowy użytkownik może dowiedzieć się o ostatnim stanie maszyny.

#### **Powstanie Sparkplug B**

Sparkplug B to protokół oparty na MQTT, rozwijany przez **Arlena Nippera (założyciela Cirrus Link)**. Został stworzony jako odpowiedź na potrzeby przemysłu, oferując bardziej ustandaryzowany i mniej złożony protokół niż **OPC UA**.

#### **Różnice między MQTT a Sparkplug B**

1. **Schemat kanału i ładunku:**

   - **Sparkplug B**: Ustandaryzowany schemat topików i ładunków. Przykładowy topik: `spBv1.0/switch/light/#`. Przykładowy ładunek:
   - `{"timestamp":1673262477011, "metrics":[{"name":"status", "timestamp":1673262477011, "dataType":"Int16", "value":"ON"}, {"name":"color", "timestamp":1673262477011, "dataType":"Int16", "value":"red"}], "seq":9}`.
   - **MQTT**: Dowolność w tworzeniu topików i ładunków. Przykładowy topik: `switch/light/`. Przykładowy ładunek: `{status:”ON”, color:"red", date:"2023-01-08", time:"10:23"}`.

2. **Retencyjność wiadomości:**

   - **Sparkplug B**: Brak natywnej retencyjności wiadomości. Konieczne jest stworzenie magazynu danych, który będzie przechowywał ostatnie stany/informacje z danego urządzenia.
   - **MQTT**: Wbudowana funkcjonalność retencyjności.

#### **Zastosowanie Sparkplug B w systemie Omnimes firmy Multiprojekt**

Implementacja Sparkplug B w systemie Omnimes przyniosła kilka korzyści:

- Stworzenie kreatora konfiguracji
- Ułatwienie konfigurowania połączeń
- Brak narzucania struktury danych użytkownikowi
- Przerzucenie odpowiedzialności za konfigurację na użytkownika

![](/images/image-UyOT.png)

#### **Podsumowanie**

Wybór między MQTT a Sparkplug B zależy od specyficznych potrzeb i wymagań aplikacji.

MQTT jest bardziej elastyczny i posiada natywną retencyjność wiadomości, podczas gdy Sparkplug B oferuje ustandaryzowane struktury i jest bardziej zoptymalizowany dla zastosowań przemysłowych.

Oba protokoły mają swoje miejsce w ekosystemie IIoT i warto dokładnie przeanalizować, który z nich najlepiej spełni wymagania Twojego projektu.