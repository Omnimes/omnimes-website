---
title: 'MCP dotarł do sterowników: jak podłączyć agenta AI do linii, żeby czytał dane, a zmiany zatwierdzał człowiek'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'mcp-dotarl-do-sterownikow-jak-podlaczyc-agenta-ai-do-linii-zeby-czytal-dane-a-zmiany-zatwierdzal-czlowiek'
description: 'W 2026 r. serwery MCP dostały Ignition, CODESYS i OPC UA, a Rockwell i Siemens pokazali agentów inżynierskich. Pokazujemy przetestowany serwer MCP dla linii w Pythonie: odczyt z listy tagów, zmiana nastawy dopiero po zatwierdzeniu człowieka i miejsce takiego serwera w architekturze zakładu.'
coverImage: '/images/post-mcp-sterownik/cover-mcp-sterownik-pl.png'
lang: 'pl'
tags: [{"value":"mcp","label":"MCP"},{"value":"agentAi","label":"AGENT AI"},{"value":"AI","label":"AI"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-11-02T08:00:00.000Z'
---

21 października Rockwell Automation pokazał FactoryTalk Conductor, platformę, która ma koordynować agentów AI w pracy inżynierskiej od projektu po testy. To ostatnia z serii tegorocznych premier, po których agent AI przestał być dodatkiem do czatu i dostał dostęp do narzędzi automatyki: środowisk programowania sterowników, systemów SCADA i serwerów OPC UA. Wspólnym językiem większości tych integracji jest Model Context Protocol (MCP).

Dla zakładu pytanie nie brzmi już, czy agent dostanie dostęp do danych linii, tylko na jakich zasadach. Poniżej zbieramy, co się zmieniło, i pokazujemy przetestowany serwer MCP dla linii w Pythonie. Agent czyta w nim wybrane tagi, a nastawę może tylko zaproponować. Zmienia ją człowiek.

## Co przyniósł 2026 rok

![Oś czasu 2026: moduł MCP dla Ignition, specyfikacje OPC UA pod RAG i MCP, serwer MCP CODESYS, agent Siemens Eigen, nowa specyfikacja MCP, serwer MCP OPC Foundation i Rockwell FactoryTalk Conductor](/images/post-mcp-sterownik/mcp-os-czasu-pl.png)

**Serwery MCP w narzędziach automatyki.** Inductive Automation udostępnił 13 lutego moduł MCP dla Ignition w wersji early access. Do czasu wydania Ignition 8.3.5 wymaga on nocnej kompilacji platformy, dostęp opiera się na uprawnieniach i tokenach API, a producent zastrzega, że dla tej wersji nie ma wsparcia. CODESYS wydał serwer MCP dla swojego środowiska programistycznego: wersję 1.0 28 kwietnia i 1.1 22 lipca. Według karty produktu jego narzędzia przeglądają drzewo projektu, czytają i podmieniają kod w ST, odczytują konfigurację urządzeń i wejść-wyjść oraz sprawdzają błędy. OPC Foundation opublikowała 7 października stabilną wersję 2.0.0 serwera MCP dla OPC UA w pakiecie NuGet, a pięć dni później wersję 2.0.1. Serwer wystawia usługi z części 4 specyfikacji OPC UA jako narzędzia MCP, a ich zestaw ogranicza się profilem, np. `--profile core`.

**Agenci inżynierscy.** Siemens rozwija Eigen Engineering Agent. W czerwcu, na VivaTech w Paryżu, dodał generowanie tagów PLC z dokumentacji ECAD i tworzenie projektów zgodnych z Siemens Automation Framework na podstawie opisu maszyny w języku naturalnym. Firma podaje ponad 100 klientów w 19 krajach i pracę od 2 do 5 razy szybszą niż ręczna. To deklaracje producenta, których nie weryfikowaliśmy. Rockwell zapowiada FactoryTalk Conductor na I kwartał 2027 r., na start ze Studio 5000 Logix Designer, Logix Echo, Emulate3D i FactoryTalk Optix. Klient będzie mógł podłączyć własny model językowy, także uruchomiony lokalnie.

**Standardy.** OPC Foundation ogłosiła 20 kwietnia, że ponad 430 specyfikacji towarzyszących OPC UA przygotuje w formatach dla RAG i MCP. Specyfikacja samego MCP dostała 28 lipca nową wersję: protokół nie ma już sesji ani uzgadniania `initialize`, a każde żądanie niesie wersję protokołu i możliwości klienta.

Tło rynkowe pokazuje raport Rockwell Automation „State of Smart Manufacturing 2026”, oparty na odpowiedziach ponad 1500 producentów z 17 krajów. Średnio 34% operacji jest dziś wspieranych przez AI, a do 2030 r. ma to być ponad połowa. W tym samym badaniu 46% firm miało co najmniej jeden incydent cyberbezpieczeństwa.

## Dlaczego nie wystarczy „podłączyć asystenta do PLC”

Specyfikacja MCP mówi o tym wprost. Przy wywołaniach narzędzi zawsze powinien być człowiek, który może im odmówić. Adnotacje narzędzi, takie jak `readOnlyHint`, klient ma traktować jako niezaufane, chyba że pochodzą od zaufanego serwera. Serwer musi walidować dane wejściowe, kontrolować dostęp, ograniczać częstotliwość wywołań i oczyszczać wyniki, a klient powinien rejestrować użycie narzędzi do audytu.

Agencje cyberbezpieczeństwa idą dalej. Wspólne wytyczne CISA, australijskiego ACSC i siedmiu innych instytucji z 3 grudnia 2025 r. zalecają ograniczyć aktywne sterowanie infrastrukturą OT przez AI bez człowieka w pętli. Wskazują też architekturę, w której dane są wypychane z sieci OT albo przechodzą przez pośrednika, bez stałego dostępu przychodzącego do tej sieci. Przy przejściu do sieci biurowej zalecają transfer jednokierunkowy i audytowane bufory.

Z tego wynikają trzy zasady, które zastosowaliśmy w przykładzie:

1. **Agent widzi listę tagów, nie sterownik.** Serwer odrzuca każdą nazwę spoza listy.
2. **Zapis jest propozycją.** Narzędzie agenta zapisuje wniosek w kolejce. Do sterownika pisze osobny program, który uruchamia operator.
3. **Granice sprawdza serwer, nie model.** Zakres nastaw i uprawnienia są w kodzie serwera, a nie w opisie narzędzia.

## Gdzie postawić serwer MCP

![Architektura: sterownik i bramka w strefie OT wypychają dane przez MQTT Sparkplug B do brokera i TimescaleDB w strefie MES, serwer MCP czyta tę kopię, a zmiana nastawy wraca do sterownika przez kolejkę propozycji i operatora](/images/post-mcp-sterownik/mcp-architektura-pl.png)

W produkcji serwer MCP nie powinien łączyć się ze sterownikiem. Dane z linii trafiają przez bramkę i MQTT Sparkplug B do brokera i bazy szeregów czasowych poza siecią OT, a agent czyta ich kopię. Tak zbudowany jest OmniMES: system nie łączy się ze sterownikami, telemetria przychodzi przez MQTT Sparkplug B i trafia do TimescaleDB, a z tych danych korzysta serwer MCP. Zmiana nastawy wraca do OT jedyną drogą, przez człowieka.

Przykład poniżej łączy się z OPC UA bezpośrednio, bo tak najłatwiej uruchomić go na stanowisku testowym. Zasady pozostają te same, a zmienia się tylko źródło odczytu.

## Serwer MCP dla linii krok po kroku

Kod przetestowaliśmy z `mcp` 2.3.0 i `asyncua` 2.1.0 na Pythonie 3.11, na symulatorze OPC UA z czterema zmiennymi procesu i 300 rejestrami diagnostycznymi.

```bash
pip install "mcp==2.3.0" "asyncua==2.1.0"
```

### Serwer: odczyt z listy, zapis jako propozycja

```python
"""MCP server for line 1: reads only allow-listed tags, writes only as proposals for a human."""
import sqlite3
import time
import uuid

from asyncua import Client as OpcClient
from mcp.server.mcpserver import MCPServer
from mcp.server.mcpserver.exceptions import ToolError
from mcp.types import ToolAnnotations

ENDPOINT = "opc.tcp://127.0.0.1:4840/line1/"
DB = "proposals.db"

# The agent sees these tags and nothing else in the controller's address space
READABLE = {
    "press1.state": "ns=2;s=Press1.State",
    "press1.count": "ns=2;s=Press1.Count",
    "press1.oil_temp": "ns=2;s=Press1.OilTemp",
    "press1.pressure_setpoint": "ns=2;s=Press1.PressureSetpoint",
}
# Setpoints the agent may propose, with hard limits checked on the server side
PROPOSABLE = {"press1.pressure_setpoint": (150.0, 200.0)}

mcp = MCPServer("line1")
_opc = None


async def opc():
    global _opc
    if _opc is None:
        _opc = OpcClient(ENDPOINT)
        await _opc.connect()
    return _opc


def db():
    con = sqlite3.connect(DB)
    con.execute(
        "create table if not exists proposals (id text primary key, tag text, value real, reason text,"
        " created real, status text, approved_by text, executed real, before real, after real)"
    )
    return con


@mcp.tool(annotations=ToolAnnotations(read_only_hint=True, open_world_hint=False))
async def read_tags(tags: list[str]) -> dict:
    """Read current values of line 1 tags.

    Allowed: press1.state, press1.count, press1.oil_temp, press1.pressure_setpoint.
    """
    unknown = sorted(set(tags) - READABLE.keys())
    if unknown:
        raise ToolError(f"Tags not allowed: {unknown}. Allowed: {sorted(READABLE)}")
    client = await opc()
    result = {}
    for tag in tags:
        dv = await client.get_node(READABLE[tag]).read_data_value()
        stamp = dv.SourceTimestamp or dv.ServerTimestamp
        result[tag] = {
            "value": dv.Value.Value,
            "status": dv.StatusCode.name,
            "time": stamp.isoformat() if stamp else None,
        }
    return result


@mcp.tool(annotations=ToolAnnotations(read_only_hint=False, destructive_hint=False, open_world_hint=False))
async def propose_setpoint(tag: str, value: float, reason: str) -> dict:
    """Queue a setpoint change for a human to approve. Nothing changes on the line until then."""
    if tag not in PROPOSABLE:
        raise ToolError(f"No proposals allowed for {tag}. Allowed: {sorted(PROPOSABLE)}")
    low, high = PROPOSABLE[tag]
    if not low <= value <= high:
        raise ToolError(f"{value} is outside the permitted range {low}-{high}")
    proposal_id = uuid.uuid4().hex[:8]
    with db() as con:
        con.execute(
            "insert into proposals (id, tag, value, reason, created, status) values (?, ?, ?, ?, ?, 'pending')",
            (proposal_id, tag, value, reason, time.time()),
        )
    return {"proposal_id": proposal_id, "status": "pending human approval"}


if __name__ == "__main__":
    mcp.run(transport="stdio")
```

Narzędzie `read_tags` ma adnotację `read_only_hint=True`, a `propose_setpoint` nie. Klient nie musi jednak wierzyć adnotacjom, więc bezpieczeństwo zapewniają słowniki `READABLE` i `PROPOSABLE`. Model nie zobaczy rejestru spoza listy i nie zaproponuje ciśnienia 260, bo serwer sprawdza zakres przed zapisem do kolejki. Indeks przestrzeni nazw `ns=2` pochodzi z symulatora, więc w prawdziwym sterowniku trzeba go sprawdzić, zanim wpisze się identyfikatory węzłów.

### Zatwierdzenie: program operatora, nie agenta

```python
"""Operator side: approve a proposal and write it to the PLC. The agent never runs this."""
import asyncio
import sys
import time

from asyncua import Client as OpcClient, ua

from line_mcp import ENDPOINT, PROPOSABLE, db

WRITABLE = {"press1.pressure_setpoint": "ns=2;s=Press1.PressureSetpoint"}


async def approve(proposal_id: str, operator: str):
    with db() as con:
        row = con.execute("select tag, value, status from proposals where id = ?", (proposal_id,)).fetchone()
    if row is None or row[2] != "pending":
        raise SystemExit(f"No pending proposal {proposal_id}")
    tag, value, _ = row
    low, high = PROPOSABLE[tag]
    if not low <= value <= high:  # check again: the database is not the PLC's safety layer
        raise SystemExit(f"{value} is outside {low}-{high}")
    async with OpcClient(ENDPOINT) as opc:
        node = opc.get_node(WRITABLE[tag])
        before = await node.read_value()
        await node.write_value(value, ua.VariantType.Double)
        after = await node.read_value()
    with db() as con:
        con.execute(
            "update proposals set status = 'executed', approved_by = ?, executed = ?, before = ?, after = ? where id = ?",
            (operator, time.time(), before, after, proposal_id),
        )
    print(f"{tag}: {before} -> {after}, approved by {operator}")


if __name__ == "__main__":
    asyncio.run(approve(sys.argv[1], sys.argv[2]))
```

Program sprawdza zakres drugi raz, bo baza propozycji nie jest warstwą bezpieczeństwa. Zapisuje też wartość przed zmianą i po niej oraz nazwisko osoby, która zatwierdziła zmianę. W zakładzie to miejsce na panel HMI albo aplikację z logowaniem, a nie skrypt w konsoli.

### Test bez modelu językowego

Klient z SDK łączy się z serwerem w tym samym procesie, więc całość można sprawdzić bez modelu:

```python
import asyncio

from mcp import Client

import line_mcp


async def main():
    async with Client(line_mcp.mcp) as client:
        result = await client.call_tool("read_tags", {"tags": ["press1.oil_temp"]})
        print(result.is_error, result.content[0].text)


asyncio.run(main())
```

Wyniki naszego przebiegu:

| Wywołanie | Wynik |
|---|---|
| `read_tags` dla trzech tagów z listy | wartości ze statusem `Good` i znacznikiem czasu |
| `read_tags` dla `Diagnostics.Reg007` | błąd: tag spoza listy, razem z listą dozwolonych nazw |
| `propose_setpoint` z wartością 260 | błąd: wartość poza zakresem 150–200 |
| `propose_setpoint` z wartością 172,5 | propozycja w kolejce, nastawa w sterowniku bez zmian |
| `approve.py` z nazwiskiem operatora | nastawa 180,0 → 172,5, wpis w bazie propozycji |

Z prawdziwym klientem serwer uruchamia się poleceniem `python line_mcp.py` i komunikuje przez standardowe wejście i wyjście. Symulator do testów to serwer OPC UA z biblioteki `asyncua` z obiektem `Press1` (zmienne `State`, `Count`, `OilTemp` i zapisywalna `PressureSetpoint`) oraz 300 rejestrami w obiekcie `Diagnostics`.

### Dwie pułapki w SDK 2.x

**Klasa `FastMCP` zniknęła.** W wersji 2 nazywa się `MCPServer` i importuje się ją z `mcp.server.mcpserver`. Import z `mcp.server.fastmcp` kończy się błędem z odesłaniem do przewodnika migracji, więc wiele przykładów z sieci wymaga poprawki.

**Zwykły wyjątek ukrywa treść błędu.** Gdy narzędzie rzuci `ValueError`, model dostaje tylko komunikat „Error executing tool read_tags” i nie wie, które tagi są dozwolone. Treść błędu trafia do modelu dopiero wtedy, gdy narzędzie rzuca `ToolError`. Sprawdziliśmy oba warianty: z `ToolError` agent dostaje listę dozwolonych nazw i może sam poprawić wywołanie. W wynikach SDK pole błędu nazywa się `is_error`.

## Ile danych trafia do modelu

![Rozmiar odpowiedzi narzędzia: 37 397 bajtów dla całej przestrzeni nazw sterownika z 304 zmiennymi, 465 bajtów dla czterech tagów z listy](/images/post-mcp-sterownik/mcp-rozmiar-pl.png)

Narzędzie „pokaż wszystkie tagi” kusi, bo działa od razu. Na naszym symulatorze zrzut całej przestrzeni nazw sterownika, czyli 304 zmiennych, zajął 37 397 bajtów, a odczyt czterech tagów z listy 465 bajtów. To 80 razy mniej. Każdy z tych bajtów trafia do kontekstu modelu, kosztuje i rozprasza. Prawdziwy sterownik ma inną liczbę zmiennych, więc proporcja będzie inna, ale kierunek pozostaje ten sam.

## Ile swobody dać agentowi

![Cztery poziomy dostępu agenta: odczyt z listy, propozycja zatwierdzana przez człowieka, zapis w wąskich granicach bez zatwierdzenia, pełna autonomia](/images/post-mcp-sterownik/mcp-poziomy-pl.png)

Proponujemy cztery poziomy. Odczyt z listy tagów to punkt startu dla każdej linii. Propozycja zatwierdzana przez człowieka to rozsądny cel dla większości zastosowań. Zapis w wąskich granicach bez zatwierdzenia ma sens tylko po ocenie ryzyka i nigdy dla funkcji bezpieczeństwa. Pełnej autonomii w OT nie zalecamy. To nasza propozycja, a nie norma, oparta na cytowanych wytycznych CISA i specyfikacji MCP.

## Bariery i ograniczenia

- **Dojrzałość narzędzi.** Moduł MCP dla Ignition jest w early access bez wsparcia. Serwer MCP CODESYS nie ma wsparcia technicznego w cenie i działa naraz tylko w jednym środowisku programistycznym. FactoryTalk Conductor będzie dostępny dopiero w 2027 r.
- **Deklaracje producentów.** Przyspieszenie od 2 do 5 razy w Eigen Engineering Agent to dane Siemensa. Przed decyzją trzeba je zmierzyć na własnych projektach.
- **Bezpieczeństwo połączenia.** Przykład używa OPC UA bez szyfrowania. W zakładzie potrzebny jest tryb SignAndEncrypt z certyfikatami, osobne konto dla serwera MCP i prawa tylko do odczytu po stronie serwera OPC UA.
- **Dane jako wejście modelu.** Wartość tagu, opis alarmu czy komentarz operatora trafiają do modelu jako tekst. Specyfikacja MCP zaleca walidować wyniki narzędzi, zanim trafią do modelu.
- **Czego przykład nie robi.** Nie ogranicza częstotliwości wywołań i nie zapisuje dziennika odczytów, a specyfikacja wymaga ograniczania częstotliwości. Nie wznawia też zerwanego połączenia z OPC UA. SQLite jako kolejka i skrypt jako panel operatora wystarczą do testu, ale nie do pracy zmianowej.

## Co zrobić w tym tygodniu

1. **Spiszcie tagi** potrzebne do pierwszego zastosowania. Zwykle jest ich kilkanaście, a nie kilkaset.
2. **Ustalcie źródło odczytu:** historyk, broker lub baza poza siecią OT, a nie sterownik.
3. **Opiszcie każdą nastawę,** którą agent mógłby proponować: zakres i osobę, która zatwierdza zmianę.
4. **Uruchomcie przykład na symulatorze** i sprawdźcie, co dostaje model przy błędnym wywołaniu.
5. **Włączcie dziennik wywołań od pierwszego dnia,** zanim agent trafi do kogokolwiek z produkcji.

## MCP w OmniMES

OmniMES ma wbudowany serwer MCP od wersji 4.3.0. Asystent AI łączy się z nim za pomocą tokenu, może konfigurować maszyny i budować dashboardy, a surowa telemetria maszyn pozostaje tylko do odczytu. Jak to wygląda w praktyce, pokazaliśmy w artykule [MCP w OmniMES w praktyce](/pl/blog/mcp-w-omnimes-w-praktyce-dashboard-jednym-poleceniem). O źródle danych, z którego czyta agent, pisaliśmy w tekście [Unified Namespace w praktyce](/pl/blog/unified-namespace-w-praktyce-jedno-zrodlo-danych-fabryki-na-mqtt-i-sparkplug-b).

## Źródła

- Rockwell Automation, *Rockwell Automation Introduces FactoryTalk Conductor, an AI-Native Orchestration Platform for Industrial Automation*, PR Newswire, 21.10.2026 — https://www.manilatimes.net/2026/10/21/tmt-newswire/pr-newswire/rockwell-automation-introduces-factorytalk-conductor-an-ai-native-orchestration-platform-for-industrial-automation/2450721
- Siemens, *Siemens takes AI for the physical world to the next level with two new Eigen Engineering Agent capabilities*, 17.06.2026 — https://press.siemens.com/global/en/pressrelease/siemens-takes-ai-physical-world-next-level-two-new-eigen-engineering-agent
- CODESYS, karta produktu *CODESYS Development System MCP Server* — https://us.store.codesys.com/media/n98_media_assets/files/2101000023/2/CODESYS%20Development%20System%20MCP%20Server_en.pdf
- SIM Solutions, *AI in OT update, Q4 2026: PLC and SCADA news that matters*, 25.10.2026 — https://simsolutions.be/insights/ai-in-ot-update-2026-q4/
- NuGet, pakiet *OPCFoundation.NetStandard.Opc.Ua.Mcp* — https://www.nuget.org/packages/OPCFoundation.NetStandard.Opc.Ua.Mcp
- OPC Foundation, *OPC Foundation Advances OPC UA for the AI Era with Companion Specifications Optimized for Agentic AI*, 20.04.2026 — https://opcfoundation.org/news/press-releases/opc-foundation-advances-opc-ua-for-the-ai-era-with-companion-specifications-optimized-for-agentic-ai/
- Inductive Automation, *MCP Module Early Access*, forum, 13.02.2026 — https://forum.inductiveautomation.com/t/mcp-module-early-access/113966
- Model Context Protocol, *Key Changes*, wersja 2026-07-28 — https://modelcontextprotocol.io/specification/2026-07-28/changelog
- Model Context Protocol, *Tools*, wersja 2026-07-28 — https://modelcontextprotocol.io/specification/2026-07-28/server/tools
- MCP Python SDK, przewodnik migracji do wersji 2 — https://py.sdk.modelcontextprotocol.io/v2/migration/
- CISA i in., *Principles for the Secure Integration of Artificial Intelligence in Operational Technology*, 3.12.2025 — https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology
- Process Online, *Rockwell Automation releases 2026 State of Smart Manufacturing Report*, 20.05.2026 — https://www.processonline.com.au/content/business/news/rockwell-automation-releases-2026-state-of-smart-manufacturing-report-1482753481
