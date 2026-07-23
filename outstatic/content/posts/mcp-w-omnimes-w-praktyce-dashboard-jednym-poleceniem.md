---
title: 'MCP w OmniMES w praktyce — park maszynowy i dashboard produkcyjny jednym poleceniem'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'mcp-w-omnimes-w-praktyce-dashboard-jednym-poleceniem'
description: 'OmniMES udostępnia endpoint MCP (Model Context Protocol) — most, przez który dowolny asystent AI rozmawia bezpośrednio z Twoim systemem produkcji. Pokazujemy krok po kroku, jak od pustego systemu dojść do gotowego dashboardu na fikcyjnym przykładzie zakładu mebli WOODCRAFT — bez interfejsu i bez jednej linijki SQL.'
coverImage: '/images/omnimes-mcp-banner.png'
coverFit: 'contain'
lang: 'pl'
tags: [{"value":"mcp","label":"MCP"},{"value":"agentAi","label":"AGENT AI"},{"value":"ai","label":"AI"},{"value":"omnimes","label":"Omnimes"},{"value":"redash","label":"Redash"}]
publishedAt: '2026-07-20T10:00:00.000Z'
---

OmniMES udostępnia teraz standardowy endpoint **MCP (Model Context Protocol)** — most, przez który dowolny asystent AI (Claude Desktop, ChatGPT, Cursor, Copilot) rozmawia bezpośrednio z Twoim systemem produkcji. Zamiast klikać po interfejsie albo pisać SQL, opisujesz w języku naturalnym, co chcesz osiągnąć, a asystent wykonuje to w OmniMES: buduje strukturę fabryki, konfiguruje sygnały, tworzy raporty i dashboardy, odczytuje bieżący stan produkcji. Poniżej pokazujemy, jak wygląda to w praktyce — na przykładzie zakładu mebli drewnianych WOODCRAFT, od zera do gotowego pulpitu.

> **Zastrzeżenie:** Nazwa „WOODCRAFT" oraz opisany w artykule i wideo zakład są **fikcyjne** — użyte wyłącznie do demonstracji działania protokołu MCP w systemie OmniMES. Żadne wdrożenie w firmie o tej nazwie nie miało miejsca. Ewentualne podobieństwo do istniejących podmiotów jest przypadkowe.

<video controls width="100%" preload="metadata" poster="/images/omnimes-mcp-cover.png">
  <source src="/videos/omnimes-mcp.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje odtwarzania wideo HTML5.
</video>

## Czym jest MCP i dlaczego zmienia zasady gry

MCP to otwarty standard, który pozwala modelom językowym korzystać z zewnętrznych narzędzi w ustrukturyzowany, przewidywalny sposób. OmniMES wystawia swoją logikę — maszyny, linie, statusy, pomiary, energię i Redash — jako zestaw takich narzędzi. Efekt: cała wiedza o Twoim systemie trafia do asystenta AI, a Ty sterujesz produkcją rozmową. To nie jest chatbot doklejony do aplikacji — to bezpośredni dostęp modelu do funkcji systemu, z zachowaniem twardej zasady: **surowa telemetria maszyn jest tylko do odczytu**.

## Krok 1. Połączenie w mniej niż minutę

W OmniMES wchodzisz w **Konfiguracja ogólna → zakładka MCP (AI)**. Masz dwie drogi:

- **Wklej ręcznie** — kopiujesz adres serwera MCP oraz token dostępu i wklejasz je w swoim asystencie AI.
- **Gotowe rozszerzenie (rekomendowane)** — pobierasz plik `.dxt` z już wpisanym adresem i tokenem, po czym instalujesz go w Claude Desktop (Ustawienia → Extensions). Korzysta z wbudowanego Node.js — nie wymaga instalacji Pythona ani Node.

Od tej chwili asystent „widzi" Twój OmniMES i może działać na jego danych.

## Krok 2. Budowa parku maszynowego z jednego opisu

Zamiast ręcznie dodawać park → linię → maszynę, klik po kliknięciu, wklejasz asystentowi strukturę zakładu:

```
Zakład Mebli Drewnianych WOODCRAFT
- Linia „Przyjęcie i Skład Surowca": Waga Surowca WS-01, Skaner Jakości Drewna SK-01
- Linia „Wykrawanie i Cięcie CNC": Wytrakarki CNC WC-01/02/03, Piła Taśmowa PT-01
- Linia „Obróbka CNC i Wiercenie": CNC Router CR-01/02, Wiertarka Wielowrzecionowa WW-01
- Linia „Montaż i Pakowanie": Linia Montażowa LM-01, Stacja Pakowania SP-01
```

Dopisujesz jedno zdanie: *„Utwórz wszystkie maszyny sekwencyjnie, przypisując je do właściwych linii"*. Asystent tworzy park, cztery linie i jedenaście maszyn — w kolejności wymuszonej zależnościami (najpierw park, potem linie, na końcu maszyny) — a Ty widzisz je od razu w widoku **Struktura**.

## Krok 3. Sygnały i statusy pracy

Analogicznie podłączasz sygnały pomiarowe i definiujesz stany pracy maszyn (praca / awaria / postój planowany / nieplanowany). Stany mogą wynikać wprost z pomiaru — np. *„prąd silnika powyżej 12 A oznacza, że maszyna pracuje"* — dzięki czemu OEE i raporty odzwierciedlają faktyczny stan bez doprowadzania dodatkowych sygnałów binarnych z PLC.

Konfigurację OmniEnergy uruchamiasz tak samo: *„dodaj źródła pomiarów energii dla parku WOODCRAFT i odśwież punkty pomiarowe"*. Asystent tworzy źródła i jednym poleceniem generuje punkty pomiarowe, mapując je automatycznie na maszyny, które mają odpowiednie sygnały.

## Krok 4. Dashboard jednym poleceniem

To najmocniejszy moment całego procesu. Jedno zdanie:

> „Zbuduj dashboard „WOODCRAFT — Podgląd" z dostępnością maszyn, awaryjnością, strukturą przestojów, kosztem energii na sztukę i zużyciem mediów. Wykresy ułóż po dwa w wierszu."

Asystent pisze kilkanaście zapytań SQL bezpośrednio do bazy **TimescaleDB**, dobiera typy wykresów (słupkowe, kołowe, liniowe), tworzy wizualizacje w Redashu, układa je na dashboardzie i zwraca gotowy link. Wszystko z jednego polecenia — bez jednej linijki SQL napisanej przez Ciebie.

## Co to znaczy w praktyce

- **Wdrożenie liczone w minutach, nie w dniach.** Struktura, sygnały i pierwszy pulpit powstają w czasie jednej rozmowy.
- **Zero bariery interfejsu.** Kierownik zmiany, technolog czy właściciel mniejszej firmy dostają to, o co proszą — własnymi słowami.
- **Pełnoprawne obiekty.** Wykresy to normalne wizualizacje Redasha: można je dalej edytować, kopiować, osadzać w iframe, podłączać pod alarmy.
- **Dane pod kontrolą.** Model dobierasz świadomie: komercyjny (Claude, GPT, Gemini) — gdy zależy na jakości; darmowy przez OpenRouter (Llama, Qwen, DeepSeek) — gdy zależy na kosztach; lokalny (Ollama, LM Studio) — gdy dane muszą zostać w sieci fabryki.

## Dla kogo

- **Właściciele i kadra MŚP** — pełny system MES sterowany rozmową, bez potrzeby zatrudniania integratora do każdej zmiany konfiguracji.
- **Kierownicy produkcji** — analizy i raporty ad-hoc na żądanie, bez czekania na dział IT.
- **Integratorzy** — błyskawiczna konfiguracja wdrożeń u klientów: struktura, sygnały i pulpity w kilka minut.

## Podsumowanie

MCP zamienia OmniMES w system, którym sterujesz językiem naturalnym z dowolnego asystenta AI. Cała logika produkcyjna jest dostępna dla modelu przez otwarty protokół, przy zachowaniu zasady „telemetria tylko do odczytu". Zobacz, jak to działa, na nagraniu powyżej, a listę wszystkich zmian znajdziesz w [historii zmian](/pl/lista-zmian).
