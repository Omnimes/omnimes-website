---
title: 'MCP już w OmniMES — steruj systemem produkcji z dowolnego asystenta AI'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'mcp-w-omnimes-sterowanie-z-asystenta-ai'
description: 'Model Context Protocol jest już wdrożony w OmniMES (wersja 4.3.0). Podłącz Claude, ChatGPT, Cursor lub Copilot, wklej token i w języku naturalnym buduj dashboardy, konfiguruj maszyny i czytaj stan produkcji — bez klikania po interfejsie i bez SQL.'
coverImage: '/images/omnimes-mcp-cover.png'
lang: 'pl'
publishedAt: '2026-07-23T09:00:00.000Z'
---

Od wersji **4.3.0** OmniMES ma wbudowaną obsługę **MCP (Model Context Protocol)** — otwartego standardu, dzięki któremu dowolny asystent AI łączy się bezpośrednio z Twoim systemem produkcji. Podłączasz Claude Desktop, ChatGPT, Cursor czy Copilot, wklejasz token i w języku naturalnym budujesz dashboardy, konfigurujesz maszyny i statusy oraz odczytujesz bieżący stan produkcji — bez klikania po interfejsie i bez pisania SQL.

<video controls width="100%" preload="metadata" poster="/images/omnimes-mcp-cover.png">
  <source src="/videos/omnimes-mcp.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje odtwarzania wideo HTML5.
</video>

> **Zastrzeżenie:** Nazwa „WOODCRAFT" oraz zakład pokazany w wideo są **fikcyjne** — użyte wyłącznie do demonstracji działania protokołu MCP w OmniMES. Żadne wdrożenie w firmie o tej nazwie nie miało miejsca. Ewentualne podobieństwo do istniejących podmiotów jest przypadkowe.

## Co dostajesz

- **Połączenie w minutę** — gotowe rozszerzenie do Claude Desktop z już wpisanym adresem serwera i tokenem, albo ręczne wklejenie danych w dowolnym asystencie wspierającym MCP. Bez instalacji Pythona ani Node.
- **Sterowanie rozmową** — „zbuduj dashboard z dostępnością maszyn i kosztem energii na sztukę dla parku WOODCRAFT" i po chwili masz gotowy pulpit w Redashu złożony z kilkunastu wykresów.
- **Konfiguracja bez interfejsu** — struktura fabryki (parki, linie, maszyny), statusy maszyn, alarmy, harmonogramy oraz źródła i punkty pomiarowe OmniEnergy.
- **Dane pod kontrolą** — model dobierasz świadomie: komercyjny (Claude, GPT, Gemini) dla jakości, darmowy przez OpenRouter (Llama, Qwen, DeepSeek) dla kosztów, albo lokalny (Ollama, LM Studio), gdy dane muszą zostać w sieci fabryki. Surowa telemetria maszyn pozostaje **tylko do odczytu**.

Zobacz pełny scenariusz krok po kroku — od pustego systemu po gotowy dashboard — w artykule: [MCP w OmniMES w praktyce](/pl/blog/mcp-w-omnimes-w-praktyce-dashboard-jednym-poleceniem). Pełną listę zmian znajdziesz w [historii zmian](/pl/lista-zmian).
