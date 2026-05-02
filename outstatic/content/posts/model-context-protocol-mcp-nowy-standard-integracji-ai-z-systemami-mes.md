---
title: 'Model Context Protocol (MCP) — nowy standard integracji AI z systemami MES. Jak otworzyć dane produkcyjne dla agentów LLM bez vendor lock-inu'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'model-context-protocol-mcp-nowy-standard-integracji-ai-z-systemami-mes'
description: 'Model Context Protocol (MCP), opublikowany przez Anthropic w listopadzie 2024 i przyjęty w 2025 przez OpenAI, Google i Microsoft, stał się de facto standardem łączenia agentów LLM z danymi i narzędziami zewnętrznymi. Dla świata MES oznacza to koniec ery integracji „każdy model osobno" — i początek architektury, w której fabryka wystawia swoje dane raz, a podpinają się do nich Claude, ChatGPT, Gemini i agenci własnej produkcji. Artykuł pokazuje, jak działa MCP, co warto eksponować z systemu MES, jak to zaprojektować bezpiecznie (lethal trifecta, IT/OT) i kiedy MCP po prostu nie ma sensu.'
coverImage: '/images/post-mcp-mes/cover-mcp-mes.svg'
lang: 'pl'
tags: [{"value":"AI","label":"AI"},{"value":"agentAi","label":"AGENT AI"},{"value":"omniMES","label":"OmniMES"},{"value":"mcp","label":"MCP"}]
publishedAt: '2026-04-27T08:00:00.000Z'
---

W listopadzie 2024 roku Anthropic opublikował **Model Context Protocol (MCP)** — otwarty protokół do łączenia aplikacji opartych o duże modele językowe ze źródłami danych i narzędziami zewnętrznymi. Przez pierwsze cztery miesiące traktowano go jako „kolejny ciekawy projekt Anthropica". 26 marca 2025 wszystko się zmieniło: **OpenAI ogłosiło oficjalne wsparcie MCP w Agents SDK, Responses API i ChatGPT Desktop**. W kwietniu dołączył Google DeepMind, w maju — Microsoft (Windows 11 i Copilot Studio). Liczba pobrań SDK skoczyła z 8 milionów miesięcznie w marcu do **97 milionów w listopadzie 2025** ([Anthropic, anniversary post](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)). W grudniu 2025 Anthropic przekazał MCP do **Linux Foundation** (Agentic AI Foundation, wspólnie z Block i OpenAI), kończąc tym samym fazę „protokołu jednego vendora".

Dla świata przemysłowego — operatorów MES, integratorów, dostawców SCADA i CMMS — to nie jest kolejny hype. To zmiana architektury, której nie da się zignorować. Artykuł pokazuje, czym MCP jest, dlaczego ma znaczenie dla systemów klasy MES, jak otworzyć dane fabryki dla agentów LLM, gdzie czyhają realne pułapki bezpieczeństwa i kiedy lepiej **nie** wdrażać MCP.

## Problem, który MCP rozwiązuje: integracje M × N

Klasyczny scenariusz integracji AI z systemem MES wygląda tak: zespół wewnętrzny (lub partner) pisze wrapper na REST API MES-a, dopasowany pod konkretny model — function calling dla GPT-4, tool use dla Claude, własna pętla dla LangChaina, plugin dla ChatGPT (deprecated od kwietnia 2024). Każdy nowy model = nowy wrapper. Każdy nowy zakład = ponowne wdrożenie. Każda zmiana w API MES = aktualizacja N wrapperów.

To problem M × N: M modeli razy N systemów. W praktyce większość projektów AI w przemyśle utyka właśnie tutaj — nie dlatego, że LLM nie potrafi wygenerować raportu zmianowego, ale dlatego, że koszt utrzymania integracji rośnie szybciej niż wartość, którą daje agent.

MCP rozwiązuje to przez standaryzację warstwy **klient ↔ serwer**. Fabryka wystawia jeden **MCP server** (eksponujący np. dane OEE, alarmy, status partii), a do niego podpinają się dowolne klienty MCP — Claude Desktop, ChatGPT Desktop, IDE z asystentem, własny agent w Pythonie. Dokładnie tak, jak Language Server Protocol (LSP) Microsoftu w 2016 roku odciął edytory od konkretnych języków programowania.

The New Stack nazwał MCP **„USB-C dla integracji AI"** ([thenewstack.io](https://thenewstack.io/why-the-model-context-protocol-won/)). Określenie sloganowe, ale trafne: jeden konektor, wiele urządzeń.

## Czym dokładnie jest MCP

MCP to protokół klient-serwer nad JSON-RPC 2.0. Zdefiniowane są trzy podstawowe prymitywy, które serwer może wystawić klientowi:

- **Tools** — funkcje, które LLM może wywołać (typowane przez JSON Schema). Przykład: `getOEE(line, range)`, `acknowledgeAlarm(alarmId)`.
- **Resources** — dane tylko do odczytu, które host może załączyć do kontekstu modelu (pliki, wiersze z bazy, telemetria).
- **Prompts** — szablony promptów dostarczane przez serwer (np. „raport zmianowy dla linii X w formacie SOP klienta Y").

Spec dorzucił w 2025 dwa kolejne mechanizmy: **Sampling** (serwer może poprosić LLM klienta o dokończenie generacji — to umożliwia pętle agentowe) oraz **Roots/Elicitation** (kontrolowane zakresy zasobów, ustrukturyzowane wejście od użytkownika).

Transporty:

- **stdio** — proces lokalny (domyślny dla klientów desktopowych).
- **Streamable HTTP** — wprowadzony w wersji `2025-03-26`, zastąpił poprzedni HTTP+SSE (oficjalnie deprecated w `2025-06-18`). Jeden endpoint, opcjonalny upgrade do SSE, pozwala uruchomić serwer w klastrze za load balancerem. Zylos w marcu 2026 nazwał go **„najistotniejszą zmianą w historii MCP"** ([zylos.ai](https://zylos.ai/research/2026-03-08-mcp-remote-evolution-streamable-http-enterprise-adoption)) — bez Streamable HTTP wdrożenia korporacyjne były praktycznie niemożliwe.

Autoryzacja: w marcu 2025 normatywna stała się **OAuth 2.1 + PKCE**. W czerwcu 2025 serwery MCP zostały przedefiniowane jako **OAuth Resource Servers** — wydawanie tokenów przeniesiono do zewnętrznych Identity Providerów (Auth0, Keycloak, Microsoft Entra ID). Listopadowa rewizja 2025 dodała mandatoryjne PKCE i identyfikację instancji klienta (CIMD) ([Stack Overflow Blog, styczeń 2026](https://stackoverflow.blog/2026/01/21/is-that-allowed-authentication-and-authorization-in-model-context-protocol/)).

To jest kluczowe dla przemysłu: **MCP nie wymaga rezygnacji z istniejących IdP**. Twój Keycloak czy AD FS pozostaje źródłem prawdy o tym, kto i co może wywołać.

## Skąd wiemy, że to nie kolejna moda — twarde liczby

- **Gartner, sierpień 2025:** 40% aplikacji korporacyjnych będzie miało dedykowanych agentów AI do końca 2026, w porównaniu z mniej niż 5% w 2025 ([Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)).
- **Gartner, kwiecień 2026:** rynek oprogramowania SCM z wbudowaną agentic AI urośnie z poniżej 2 mld USD (2025) do **53 mld USD do 2030 roku** ([Gartner SCM forecast](https://www.gartner.com/en/newsroom/press-releases/2026-04-07-gartner-forecasts-supply-chain-management-software-with-agentic-ai-will-grow-to-53-billion-in-spend-by-2030)).
- **Gartner — przestroga:** ponad **40% projektów agentic AI zostanie anulowanych do końca 2027 roku** z powodu słabego ROI, problemów z governance i decyzji wdrożeniowych podejmowanych „ze strachu, żeby nie zostać w tyle".
- **MCP Registry (Linux Foundation):** od ~5 800 serwerów w połowie 2025 do **ok. 18 000 serwerów** w marcu 2026 (PulseMCP/Zylos). Trzeba czytać z dystansem — wiele to pet projects, ale skala wzrostu jest wyraźna.

McKinsey w aktualizacji „Economic Potential of Generative AI" (2025) szacuje wartość dodaną agentów na **2,6–4,4 biliona USD rocznie** w skali enterprise. To liczby, które trzeba traktować jako górną granicę, ale kierunek nie pozostawia wątpliwości.

## MCP dla systemu MES — co warto wystawić

W OmniMES analizujemy, które obszary najbardziej zyskują na ekspozycji przez MCP. Pięć kandydatów, od których warto zacząć:

1. **`getOEE(line, range)`** — wskaźniki OEE dla linii i przedziału czasu. Najczęstsze pytanie operatora i kierownika produkcji. Read-only, niskie ryzyko.
2. **`getDowntimeReasons(line, shift)`** — przyczyny przestojów z ostatniej zmiany, sklasyfikowane wg drzewa przyczyn. Świetne pod raporty zmianowe generowane przez LLM.
3. **`getCurrentBatchStatus()`** — status aktywnych partii produkcyjnych, postęp, parametry procesowe. Idealne dla operatorów wieloliniowych, którzy chcą zapytać „która partia mi się dzisiaj zatrzyma".
4. **`queryAlarms(severity, since)`** — alarmy z określonym poziomem ważności. Można podpiąć do agenta klasyfikującego alarmy na realne incydenty vs. szum.
5. **`searchDocs(query)`** — przeszukiwanie dokumentacji technicznej (już to mamy zrealizowane w OmniMES przez integrację LangChain z Outline — patrz artykuł [„Jak połączyliśmy LangChain z Outline"](https://omnimes.com/pl/blog/jak-polaczylismy-langchain-z-outline-tworzac-inteligentnego-asystenta-dokumentacji-w-omnimes-nowoczesny-chatbot)). MCP daje temu standardową fasadę.

Czego **nie** warto wystawiać w pierwszej iteracji: write’y do OPC UA, modyfikacji receptur, zmian planu produkcyjnego, sterowania alarmami krytycznymi. To są operacje, w których cena błędu agenta przewyższa wartość automatyzacji. Wracamy do nich dopiero gdy mamy mocny audit log i polityki RBAC.

## Implementacja — 30 linii Pythona

Najprostszy MCP server eksponujący wskaźnik OEE z OmniMES, w bibliotece FastMCP (oficjalna wysokopoziomowa nakładka na MCP SDK):

```python
from fastmcp import FastMCP
import httpx, os
from datetime import datetime, timedelta

mcp = FastMCP("omnimes-mes")
OMNIMES_URL = os.environ["OMNIMES_API_URL"]
OMNIMES_TOKEN = os.environ["OMNIMES_TOKEN"]

@mcp.tool()
async def get_oee(line: str, hours: int = 8) -> dict:
    """Zwraca OEE, dostępność, wydajność i jakość dla linii produkcyjnej.

    Args:
        line: identyfikator linii, np. "L-CNC-03"
        hours: zakres wstecz w godzinach (domyślnie 8 — bieżąca zmiana)
    """
    since = (datetime.utcnow() - timedelta(hours=hours)).isoformat()
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{OMNIMES_URL}/data/oee",
            params={"line": line, "since": since},
            headers={"Authorization": f"Bearer {OMNIMES_TOKEN}"},
            timeout=10.0,
        )
        r.raise_for_status()
        return r.json()

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

To wszystko. Po zarejestrowaniu serwera w Claude Desktop (`claude_desktop_config.json`) lub w ChatGPT Desktop, model widzi tool `get_oee` z opisem i typami parametrów. Może go wywołać samodzielnie w odpowiedzi na pytanie operatora „jak dziś idzie linia CNC trójka".

W produkcji oczywiście dochodzą trzy warstwy:

- **Auth** — opakowanie w OAuth 2.1 (np. przez `mcp-server-oauth-proxy` albo natywną integrację z waszym IdP).
- **RBAC per tool** — kierownik widzi inne tool-e niż operator i niż dział utrzymania ruchu.
- **Rate limit + audit log** — każde wywołanie zapisane z user_id, agent_id, parametrami i wynikiem (kluczowe dla późniejszej zgodności z EU AI Act).

## Architektura w OmniMES — sidecar, nie monolit

Najczęstsza pomyłka projektowa: wpinanie MCP servera bezpośrednio w monolitowy backend MES. Nasze podejście w OmniMES to **sidecar**: MCP server to osobny mikroserwis, który komunikuje się z istniejącym REST API MES-a. Powody:

- **Izolacja awarii** — wywrotka MCP servera (np. memory leak w SDK) nie kładzie produkcji.
- **Niezależny cykl release** — MCP spec jeszcze się szybko zmienia (cztery rewizje w 2025), nie chcecie wiązać z tym deployów monolitu.
- **Skalowalność** — jeden MCP server może obsłużyć wiele instancji MES (zakład A, B, C) lub odwrotnie — wiele MCP serverów per zakład w izolowanych sieciach OT.
- **Bezpieczeństwo** — MCP server siedzi w strefie DMZ, ma dostęp do MES tylko przez whitelistowane endpointy. PLC, OPC UA i SCADA są dwie strefy dalej (zgodnie z IEC 62443 zones-and-conduits).

W praktyce: jeden klient OmniMES może mieć MCP server uruchomiony lokalnie na hali (do read-only telemetrii) i drugi w chmurze OmniCloud (do raportów i dokumentacji). Klient AI (Claude Desktop operatora, własny agent działu jakości) łączy się z każdym z nich osobno.

## Bezpieczeństwo — gdzie to naprawdę boli

MCP sam w sobie nie jest mniej ani bardziej bezpieczny niż każdy inny protokół RPC. Problemy zaczynają się przy **tym, co wystawiamy**. Trzy wzorce ataków, o których trzeba wiedzieć przed pierwszym deployem:

**1. „Lethal trifecta" Simona Willisona** ([simonwillison.net](https://simonwillison.net/tags/lethal-trifecta/)). Każdy agent, który jednocześnie ma (a) dostęp do prywatnych danych, (b) ekspozycję na nieufne treści i (c) możliwość komunikacji ze światem zewnętrznym — jest podatny. MCP servery tworzą tę kombinację bardzo łatwo. Dla MES oznacza to: nie pozwalaj agentowi czytać dokumentów z zewnątrz (np. plików PDF od dostawców) i jednocześnie wywoływać tooli, które wysyłają coś dalej.

**2. Realne CVE z 2025 roku.** Pakiet `mcp-remote` — RCE z CVSS 9.6, 437 000 pobrań przed łatką. Anthropic Git MCP Server — trzy CVE z lipca 2025 (path bypass, argument injection w `git_diff`, niekontrolowane `git_init`). GitHub MCP — w maju 2025 Invariant Labs pokazał exfiltrację danych z prywatnego repozytorium przez prompt injection w treści publicznego issue ([devclass.com](https://devclass.com/2025/05/27/researchers-warn-of-prompt-injection-vulnerability-in-github-mcp-with-no-obvious-fix/)). „No obvious fix" — to słowa raportu.

**3. Tool poisoning.** Złośliwy serwer MCP może podmienić opisy swoich tooli już po tym, jak użytkownik je zatwierdził (Invariant Labs, marzec 2025). Konsekwencje dla fabryki: nie ufaj serwerom z nieoficjalnych rejestrów; rób signing własnych serwerów; loguj zmiany w schemacie tooli.

Dla przemysłu wniosek jest jeden: **MCP w produkcji powinno być domyślnie read-only, w wydzielonej strefie sieciowej, z RBAC per tool i pełnym audit logiem każdego wywołania**. Każda funkcja zapisująca cokolwiek w warstwie sterowania wymaga osobnej decyzji ryzyka — i prawdopodobnie zatwierdzania human-in-the-loop, dopóki nie uzbieramy statystyk operacyjnych.

## Stan adopcji w przemyśle — uczciwie

Trzeba to powiedzieć wprost: **żaden z dużych dostawców MES (SAP DM, Siemens Opcenter, Rockwell Plex, AVEVA System Platform) nie opublikował oficjalnego serwera MCP do końca pierwszego kwartału 2026**. Aktywność jest jednak realna:

- **Inductive Automation Ignition** — na konferencji ICC 2025 (wrzesień) zaprezentowano moduł MCP eksponujący tagi, UDT, alarmy i skrypty z audit logiem i separacją środowisk. Status na marzec 2026: jeszcze nie GA.
- **AWS IoT SiteWise MCP server** — najobszerniejszy oficjalny przemysłowy MCP, **47 tooli w 8 kategoriach**, w tym detekcja anomalii.
- **InfluxData** — oficjalny MCP server dla InfluxDB (połowa 2025), bezpośrednio przydatny do telemetrii czasowej.
- **OPC UA** — kilka community implementacji na GitHubie (np. `coderfengyun/opcua-mcp-server`), żadna od OPC Foundation.
- **FrameworX (Tatsoft)** — pozycjonuje się jako „pierwsza platforma SCADA z natywnym MCP".

To znaczy, że dziś przewagę zyskują firmy, które **same** wystawią MCP server na swój MES — nie czekając, aż zrobi to vendor. Kosztowo to dni, nie miesiące. Strategicznie to inwestycja w warstwę integracji, która prawdopodobnie pozostanie z nami na dekadę.

## Biznes case — kiedy MCP się opłaca

Modelowo: jeden MCP server = N integracji z modelami zaoszczędzonych. Konkretnie:

- **Koszt wdrożenia:** 5–15 dni roboczych dla jednego MCP servera z 5 toolami, OAuth i audit logiem (zakładając zespół znający MES API).
- **Koszt utrzymania:** marginalny — spec MCP jest w trakcie ustabilizowania (Linux Foundation), SDK są dojrzałe, breaking change’y rzadkie.
- **Oszczędności:** każdy nowy model AI w organizacji (w 2026 typowo: Claude do dokumentacji, GPT do raportów, Gemini do analizy multimodalnej) podpina się bez nowego wrappera.
- **Vendor lock-in:** zerowy — jeśli za dwa lata pojawi się nowy model, który okaże się 10× tańszy, podmieniacie jeden parametr w konfigu klienta.
- **Zgodność:** audit log wywołań MCP to gotowy materiał na compliance pod EU AI Act i NIS2 (cyberbezpieczeństwo).

Kiedy MCP **nie** ma sensu? Gdy macie jeden konkretny use case, jeden model i nie planujecie ekspansji — wtedy bezpośrednia integracja przez function calling jest prostsza i tańsza. Gdy wasza fabryka nie ma jeszcze REST API na MES — MCP nic tu nie naprawi, problemem jest brak warstwy danych. Gdy nie macie zespołu utrzymującego coś więcej niż endpoint REST — MCP doda kolejny system do utrzymania.

## Rekomendacja — od czego zacząć w przyszłym tygodniu

1. **Wybierzcie 3 read-only tool-e** z największą wartością dla operatora i kierownika produkcji (najczęściej: OEE, przyczyny przestojów, status aktualnej partii).
2. **Postawcie sidecar MCP server** w wydzielonym kontenerze, z dostępem tylko do whitelistowanych endpointów MES, OAuth i audit logiem od pierwszego dnia.
3. **Wdrożcie u 2–3 użytkowników power-user** (kierownik produkcji, lead utrzymania ruchu) z Claude Desktop lub ChatGPT Desktop. Mierzycie: liczbę wywołań na dzień, czas oszczędzony, błędy modelu, sytuacje, w których agent zrobił coś dziwnego.
4. **Po 4–6 tygodniach** podejmijcie decyzję: rozszerzać (więcej tooli, więcej użytkowników, własny agent) czy wyłączyć. Nie zostawiajcie szarej strefy „pilotażu, którego nikt nie używa".
5. **Krytyczne**: nie wystawiajcie write-tooli zanim macie statystyki z fazy read-only. Pierwszy incydent z agentem zmieniającym parametr na linii cofnie projekt o pół roku.

MCP to nie jest „kolejny framework AI". To warstwa integracji, która prawdopodobnie odegra w epoce agentów rolę, jaką REST odegrał dla weba. W przemyśle — gdzie cykl życia oprogramowania mierzy się dziesięcioleciami — wczesne, kontrolowane wdrożenie daje przewagę, której nie odzyska się po fakcie.

## Źródła

- Anthropic — [MCP Anniversary Post (25 listopada 2025)](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)
- The New Stack — [Why the Model Context Protocol Won](https://thenewstack.io/why-the-model-context-protocol-won/)
- Stack Overflow Blog — [Authentication and Authorization in MCP (styczeń 2026)](https://stackoverflow.blog/2026/01/21/is-that-allowed-authentication-and-authorization-in-model-context-protocol/)
- Zylos — [MCP Remote Evolution: Streamable HTTP & Enterprise Adoption (marzec 2026)](https://zylos.ai/research/2026-03-08-mcp-remote-evolution-streamable-http-enterprise-adoption)
- Gartner — [40% of Enterprise Apps with AI Agents by 2026 (sierpień 2025)](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)
- Gartner — [Supply Chain Management Software with Agentic AI to $53B by 2030 (kwiecień 2026)](https://www.gartner.com/en/newsroom/press-releases/2026-04-07-gartner-forecasts-supply-chain-management-software-with-agentic-ai-will-grow-to-53-billion-in-spend-by-2030)
- Simon Willison — [Lethal Trifecta tag](https://simonwillison.net/tags/lethal-trifecta/)
- DEVCLASS — [GitHub MCP Prompt Injection Vulnerability (maj 2025)](https://devclass.com/2025/05/27/researchers-warn-of-prompt-injection-vulnerability-in-github-mcp-with-no-obvious-fix/)
- Industrial IoT Blog — [MCP Explained: Making IIoT Smarter (listopad 2025)](https://iiotblog.com/2025/11/04/model-context-protocol-mcp-explained-making-iiot-smarter/)
- ChatForest — [Manufacturing & Industrial MCP Servers Review](https://chatforest.com/reviews/manufacturing-industrial-mcp-servers/)
- Wikipedia — [Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol)
