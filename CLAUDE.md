# CLAUDE.md — instrukcje dla asystenta w projekcie omnimes-website

## Tworzenie i edycja treści blog / news po polsku

**ZASADA NADRZĘDNA: nie mieszaj polskiego z angielskim.** Polskie posty muszą brzmieć jak napisane po polsku, nie jak przetłumaczony automatycznie tekst techniczny z anglicyzmami wsadzonymi „bo tak brzmi profesjonalnie". Chodzi o budowanie autorytetu — czytelnik ma widzieć profesjonalną polską redakcję, nie tekst LLM-a łamany na angielski.

### Przykład problemu (tak NIE pisać)

> „Operator pokazuje robotowi w VR co ma zrobić (telep operacja, 5–10 demonstracji), model tłumaczy to na trajektorię w czasie rzeczywistym, MES zapisuje zadanie jako **prompt** plus **few-shot demonstrations**."

Wtręty „prompt" i „few-shot demonstrations" w środku polskiego zdania to sygnał braku redakcji. Wersja poprawna:

> „...MES zapisuje zadanie jako zapytanie do modelu wraz z kilkoma przykładowymi demonstracjami (few-shot — kilka przykładów w zapytaniu)."

### Reguły praktyczne

**Zamień na polskie odpowiedniki** (przykłady niewyczerpujące — kieruj się zasadą „czy jest naturalne polskie słowo?"):

| Anglicyzm | Polska wersja |
|---|---|
| prompt (w sensie zapytania do LLM) | zapytanie / instrukcja / polecenie |
| few-shot demonstrations | kilka przykładowych demonstracji |
| compliance | zgodność |
| roadmap | plan rozwoju / harmonogram |
| scope | zakres |
| vendor / vendor risk | dostawca / ryzyko dostawcy |
| quick wins | szybkie usprawnienia / szybkie zwycięstwa |
| running costs | koszty utrzymania |
| assessment | ocena stanu |
| lessons learned | wnioski z incydentu |
| root cause | przyczyna źródłowa |
| audit log / audit trail | dziennik audytu / ślad audytowy |
| encryption-in-transit / at-rest | szyfrowanie podczas przesyłu / w spoczynku |
| supply chain documentation | dokumentacja łańcucha dostaw |
| network segmentation | segmentacja sieci |
| vulnerability disclosure | zgłaszanie podatności |
| security advisories | ogłoszenia o podatnościach |
| backup | kopia zapasowa |
| disaster recovery | odtwarzanie po awarii |
| in-house | wewnętrzny / własnymi siłami |
| custom scripts | własne skrypty |
| stateful firewall | firewall stanowy |
| allowlist | lista dozwolona |
| on-prem / on-premise | wdrożony lokalnie |
| SaaS MES | MES w modelu SaaS |
| high-risk AI | AI wysokiego ryzyka |
| early warning | wczesne ostrzeżenie |
| initial notification | zgłoszenie wstępne |
| final report | raport końcowy |
| tabletop exercise | ćwiczenia teoretyczne (tabletop) |
| batch (produkcyjny) | partia produkcyjna |
| batch genealogy | genealogia partii |
| dashboard | pulpit (borderline — w kontekście UI można zostawić) |
| pipeline (danych) | potok danych (borderline — jak termin techniczny można zostawić) |

**ZOSTAW w oryginale** (technika: nie tłumacz):

- **Akronimy techniczne:** MES, ERP, OEE, MTBF, RBAC, MFA, SBOM, IoT, IIoT, GDP, NIS2, KSC2, CRA, CVE, MQTT, PLC, SCADA, SDLC, IDS, SIEM, VLAN, LLM, SaaS, API, AD, ISO, GDPR, DPP, ESPR, CBAM, EU/UE, RAG, AI, ML
- **Nazwy produktów, frameworków, narzędzi:** TimescaleDB, PostgreSQL, MongoDB, Apache Iceberg, DuckDB, Vue, React, Next.js, Claude, GPT, OpenAI, Anthropic, Llama, Qwen, DeepSeek, Ollama, LM Studio, Suricata, Snort, Claroty, Dragos, Nozomi, Wazuh, Splunk, Elastic, TensorFlow, PyTorch, XGBoost, LightGBM, CatBoost, Chronos, TimesFM, Moirai, OpenVLA, Groot, Cosmos, Omniverse, Replicator, Phi-4, Jetson Orin, NVIDIA, AMD, Intel, Sparkplug B, OPC UA, Modbus, EtherNet/IP, S7
- **Utrwalone zapożyczenia programistyczne:** commit, push, deploy, cache

**Zasada rozstrzygająca w wątpliwościach:**
1. Jeśli jest naturalne polskie słowo, którego użyłby polski autor techniczny — użyj go.
2. Jeśli angielskie słowo JEST terminem technicznym (nie ma dobrego polskiego odpowiednika, albo polski odpowiednik zabija znaczenie) — zostaw, ale dodaj kontekst po polsku, np. „few-shot (kilka przykładów w zapytaniu)".
3. Jeśli tekst jest zapożyczeniem z anglojęzycznego źródła (raport EY, dokumentacja producenta) i cytujesz nazwę własną sekcji — zostaw jak w źródle.

### Co robić przy edycji istniejących postów

- Podmieniaj **słowa i zwroty**, nie przebudowuj zdań ani struktury.
- Nie zmieniaj faktów, liczb, cytatów źródeł, kodu, YAML frontmatter (poza `description` jeśli sam zawiera anglicyzmy).
- W razie wątpliwości — zostaw. Lepiej niedopoprawić niż nadpisać sens.

### Co robić przy pisaniu nowych postów

- Pisz od razu po polsku (nie tłumacz z angielskiego brudnopisu w głowie).
- Po napisaniu — przejrzyj i wyłap wtręty: każde angielskie słowo w środku polskiego zdania to kandydat do redakcji.
- Sprawdź tytuł i `description` — one lądują w meta tags i social sharingu, tam anglicyzmy najbardziej rzucają się w oczy.
