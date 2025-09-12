---
title: 'Jak połączyliśmy LangChain z Outline, tworząc inteligentnego asystenta dokumentacji w OmniMES - nowoczesny chatbot'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'jak-polaczylismy-langchain-z-outline-tworzac-inteligentnego-asystenta-dokumentacji-w-omnimes-nowoczesny-chatbot'
description: 'W świecie przemysłowego IT, gdzie dokumentacja techniczna rośnie szybciej niż produkcja w szczycie sezonu, znalezienie konkretnej informacji staje się wyzwaniem. Dlatego postanowiliśmy połączyć dwa potężne narzędzia: LangChain i Outline, tworząc inteligentnego asystenta dokumentacji, który rozumie pytania użytkowników i odpowiada na nie na podstawie aktualnej bazy wiedzy.'
coverImage: '/images/langchain_openai-QwND.png'
tags: ["modeleLlm","langchainLlm","langchain","faiss","chatbot","gpt"]
lang: 'pl'
publishedAt: '2025-05-28T00:00:00.000Z'
---

**Wstęp**

W świecie przemysłowego IT, gdzie dokumentacja techniczna rośnie szybciej niż produkcja w szczycie sezonu, znalezienie konkretnej informacji staje się wyzwaniem. Dlatego postanowiliśmy połączyć dwa potężne narzędzia: **LangChain** i **Outline**, tworząc inteligentnego asystenta dokumentacji, który rozumie pytania użytkowników i odpowiada na nie na podstawie aktualnej bazy wiedzy.

W tym artykule pokażemy **krok po kroku**, jak zrealizowaliśmy to wdrożenie w naszym systemie **OmniMES**. Efekt możesz zobaczyć i przetestować tutaj:\
[Chatbot Omnimes](https://cloud.omnimes.com/askme)

## Narzędzia, które połączyliśmy

### **Outline**

Open-source'owy system do zarządzania dokumentacją. Intuicyjny, wspiera Markdown, wersjonowanie, prawa dostępu i webhooki. W naszym przypadku służy jako **źródło wiedzy**, do którego odwołuje się nasz chatbot.

### **LangChain**

Framework do budowy aplikacji opartych na dużych modelach językowych (LLM). Umożliwia integrację z bazami wektorowymi, LLM API i źródłami danych w celu **budowania systemów pytanie-odpowiedź, agenta AI czy asystenta dokumentacji**.

---

## Co zbudowaliśmy?

Stworzyliśmy inteligentnego asystenta dokumentacji technicznej, który:

- Indeksuje treści dokumentacji w Outline do bazy wektorowej (FAISS)
- Synchronizuje dokumentację automatycznie dzięki webhookom
- Pozwala zadawać pytania językiem naturalnym i otrzymywać odpowiedzi z konkretnych fragmentów dokumentacji

Przykład wykorzystania możesz zobaczyć w praktyce tutaj:\
[Chatbot Omnimes](https://cloud.omnimes.com/askme) Działa w oparciu o dokumentację m.in. tego komponentu:\
[Dokumentacja Omnimes](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/wstep-XMdRkBsh9c)

---

## Architektura rozwiązania

1. **Pozyskiwanie danych** – Outline przechowuje dokumentację w PostgreSQL.
2. **Webhook trigger** – Zmiana w dokumencie wywołuje webhook pod `/webhook/outline/documents`.
3. **LangChain pipeline** – Webhook przetwarza zawartość, dzieli ją na chunk'i i aktualizuje wektorową bazę danych FAISS.
4. **Interfejs użytkownika** – Frontend Vue (PrimeVue) kieruje pytania do API FastAPI + LangChain, który:
   - Wyszukuje najbardziej pasujące dokumenty (vector similarity)
   - Przesyła je jako kontekst do modelu GPT (np. GPT-4o)
   - Zwraca odpowiedź opartą na rzeczywistej dokumentacji

---

## Przykładowy scenariusz

**Pytanie:** *„Jakie dane są wymagane przy uruchamianiu zlecenia produkcyjnego?”*\
**Odpowiedź AI:**\
„Zgodnie z dokumentem *Profil systemu OMNIMES*, przy uruchamianiu zlecenia wymagane są: numer zlecenia, produkt, ilość docelowa, operator oraz przypisanie do linii produkcyjnej.”

---

## Co zyskaliśmy?

- Błyskawiczny dostęp do wiedzy
- Naturalna forma interakcji z dokumentacją
- Dynamiczne aktualizacje wiedzy bez restartów systemu
- Znaczące odciążenie zespołu wsparcia technicznego

---

## Dla kogo to rozwiązanie?

Dla każdej firmy, która:

- Ma rozbudowaną dokumentację techniczną
- Chce ułatwić pracownikom i klientom szybki dostęp do wiedzy
- Szuka realnego zastosowania AI w codziennej pracy

---

## Podsumowanie

Połączenie Outline i LangChain daje realne, mierzalne korzyści. Nie jest to tylko futurystyczna zabawka – to narzędzie, które już teraz zmienia sposób pracy z dokumentacją techniczną.\
Co więcej, **LangChain znajduje zastosowanie nie tylko w obsłudze dokumentacji**, ale również w budowie agentów AI, systemów przetwarzania danych, analizy zapytań SQL, integracji z bazami wiedzy, a nawet automatyzacji procesów biznesowych opartych na języku naturalnym.