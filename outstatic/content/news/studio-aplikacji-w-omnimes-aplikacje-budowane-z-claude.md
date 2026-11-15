---
title: 'Studio aplikacji w OmniMES — opisz, czego potrzebujesz, a Claude zbuduje aplikację na danych z produkcji'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'studio-aplikacji-w-omnimes-aplikacje-budowane-z-claude'
description: 'OmniMES 4.9.0 wprowadza Studio aplikacji (Beta): opisujesz zwykłym językiem, czego potrzebujesz, a Claude buduje interaktywną aplikację na żywych danych z maszyn, zleceń i pomiarów. Aplikacja trafia do menu, udostępniasz ją wybranym osobom, a każda z nich widzi w niej tylko to, do czego ma uprawnienia. Wszystko w otwartym standardzie MCP Apps.'
coverImage: '/images/news/studio-aplikacji/cover-pl.jpg'
lang: 'pl'
publishedAt: '2026-11-15T12:00:00.000Z'
---

Każdy zakład ma pytania, na które żaden gotowy ekran nie odpowiada wprost: ile złotych kosztowały wczorajsze przestoje na linii cięcia, które zlecenia nie zdążą na termin, co przekazać następnej zmianie. Zwykle kończy się to arkuszem kalkulacyjnym albo zamówieniem kolejnego raportu. Od wersji **4.9.0** OmniMES ma **Studio aplikacji**: opisujesz w rozmowie z Claude, czego potrzebujesz, a Claude buduje interaktywną aplikację na żywych danych z Twojej produkcji — ze wskaźnikami, wykresami, tabelami, notatkami i formularzami. Gotowa aplikacja trafia do menu OmniMES, obok pozostałych ekranów. Studio opiera się na otwartym standardzie **MCP Apps** i jest oznaczone w menu jako **[Beta]**.

<video controls width="100%" preload="metadata" poster="/videos/omnimes-studio-aplikacji-pl.jpg">
  <source src="/videos/omnimes-studio-aplikacji-pl.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje odtwarzania wideo HTML5.
</video>

## Jak to działa

1. **Opisujesz.** W zakładce **Kreator** piszesz zwykłym językiem, np. „pokaż, ile złotych tracimy na przestojach na każdej linii, i wskaż trzy przyczyny, które kosztują najwięcej”.
2. **Claude buduje.** Korzysta z danych OmniMES — maszyn, sygnałów, zdarzeń, pomiarów, danych BI i zleceń produkcyjnych — i składa z nich aplikację. Po każdym zapisie podgląd obok czatu odświeża się na żywych danych, więc poprawki dopisujesz w tej samej rozmowie: „dodaj wybór okresu”, „pokaż przyczyny na wykresie Pareto”.
3. **Dodajesz do menu.** Aplikację umieszczasz w menu bocznym — w sekcjach i podmenu, które tworzysz sam, np. „Aplikacje zakładu”.
4. **Udostępniasz.** Wybranym grupom użytkowników (np. kierownikom i dyrektorom) albo konkretnym osobom.

Każda zmiana zapisuje się jako nowa wersja aplikacji. Jeśli poprawka nie wyszła, przywracasz poprzednią wersję.

![Okno „Dodaj aplikację do menu” w Studiu aplikacji: wybór sekcji, nazwy po polsku i angielsku, ikona oraz udostępnienie grupom Dyrektorzy i Kierownicy](/images/news/studio-aplikacji/pl-menu-udostepnianie.webp)

*Aplikację dodajesz do wybranej sekcji menu i udostępniasz grupom albo konkretnym osobom.*

## Dwie drogi budowania aplikacji

- **W OmniMES, w Kreatorze.** Czat z Claude działa wprost w systemie. Potrzebny jest klucz API Claude z Claude Console — wpisuje go superuser w zakładce **Połączenie z Claude**, a koszty zapytań rozlicza Claude Console. Plany Claude Max, Ultra i Team zawierają co miesiąc kredyty API.
- **W Claude Desktop, na własnej subskrypcji Claude.** W zakładce **Połączenie z Claude** pobierasz rozszerzenie OmniMES z Twoim osobistym tokenem i instalujesz je w Claude Desktop. Wspólny konektor MCP z Konfiguracji ogólnej tu nie wystarczy — nie daje narzędzi Studia.

Dzięki standardowi MCP Apps te same aplikacje otworzysz też w rozmowie w Claude Desktop.

Zalecamy model **Claude Opus 5.5**. Do wyboru są też Fable 5.2, Sonnet 5.5, Haiku 5.5 oraz inne zgodne modele, które OmniMES pobiera z API Anthropic.

## Bezpieczeństwo: aplikacja może tyle, ile osoba, która ją otwiera

- Aplikacja działa **z uprawnieniami oglądającego** i nigdy z większymi niż uprawnienia jej autora. Kierownik zmiany zobaczy w niej tylko to, co i tak widzi w OmniMES.
- Aplikacja **nie ma dostępu** do tokenu użytkownika, ciasteczek ani internetu.
- **Każdy zapis danych** z aplikacji oglądający potwierdza w oknie, które pokazuje, co dokładnie zostanie zapisane i kto napisał aplikację. W Claude Desktop zapis z aplikacji jest wyłączony.
- Aplikacje administracyjne może włączyć **tylko superuser**.
- **Dziennik** rejestruje zmiany aplikacji, zmiany menu i udostępniania, osobiste tokeny, zapisy danych i odmowy dostępu.

Aplikacje są przechowywane w bazie OmniMES — bez dodatkowych kontenerów — więc trafiają do zwykłych kopii zapasowych razem z resztą systemu.

![Dziennik Studia aplikacji: data, użytkownik, aplikacja, zdarzenie, źródło (czat Studia albo Claude Desktop) i wynik — udane albo odmowa](/images/news/studio-aplikacji/pl-dziennik.webp)

*Dziennik: kto, kiedy i co zmienił, skąd przyszło polecenie i czy system je wykonał, czy odmówił.*

## Przykłady: aplikacje, które liczą pieniądze

**Koszty przestojów.** Ile złotych linia traci na przestojach, które maszyny i przyczyny kosztują najwięcej (wykres Pareto), jaka jest prognoza strat na cały miesiąc oraz plan działań naprawczych z szacowaną oszczędnością. Na porannej odprawie zamiast „mieliśmy cztery godziny postojów” pada kwota i nazwa maszyny, która kosztuje najwięcej.

![Aplikacja „Koszty przestojów” w sekcji „Aplikacje zakładu”: koszt strat w okresie, prognoza miesięczna, dostępność i największa strata](/images/news/studio-aplikacji/pl-koszty-przestojow.webp)

*„Koszty przestojów” w menu OmniMES, w sekcji „Aplikacje zakładu”. Tuż nad nią pozycja „Studio aplikacji [Beta]”.*

**Realizacja zleceń.** Które zlecenia nie zdążą na termin, jakie tempo jest do tego potrzebne w porównaniu z obecnym, ile kosztują braki i jaka jest wartość niewykonanych sztuk. Przy każdym zleceniu zespół zapisuje wspólne komentarze z działaniami, np. „dodatkowa zmiana w sobotę”.

![Aplikacja „Realizacja zleceń”: zlecenia zagrożone terminem, wartość zagrożonej produkcji oraz tempo potrzebne wobec obecnego](/images/news/studio-aplikacji/pl-realizacja-zlecen.webp)

*„Realizacja zleceń”: zlecenia zagrożone terminem i tempo, które pozwoli zdążyć.*

**Przekazanie zmiany.** Tablica dla zmiany, która przejmuje halę: stan wszystkich linii na żywo, zatrzymania i czas przestojów na każdej linii za dziś albo za bieżącą zmianę, wspólna lista otwartych spraw i automatyczne podsumowanie dla następnej zmiany. Aplikacja powstała w czacie Kreatora i mówi po polsku albo po angielsku — zależnie od języka, który użytkownik wybrał w OmniMES.

![Aplikacja „Przekazanie zmiany”: linie w normalnej pracy, maszyny w awarii, przestoje nieplanowane, postoje w okresie, alarmy procesowe i stan każdej linii](/images/news/studio-aplikacji/pl-przekazanie-zmiany.webp)

*„Przekazanie zmiany”: to, co następna zmiana musi wiedzieć, na jednym ekranie.*

## Beta

Studio aplikacji jest oznaczone w menu jako **[Beta]**. Przez najbliższy tydzień nadal je testujemy i dopracowujemy, dlatego chętnie poznamy Twoje uwagi i pomysły na aplikacje — [napisz do nas](/pl/kontakt).

## Jak zacząć

Po aktualizacji do wersji 4.9.0 w menu OmniMES pojawi się pozycja **Studio aplikacji [Beta]**. Zacznij od zakładki **Połączenie z Claude**: superuser wpisuje tam klucz API Claude, żeby działał czat w Kreatorze, a każdy, kto woli Claude Desktop, pobiera tam rozszerzenie OmniMES z osobistym tokenem. Potem opisz w Kreatorze pierwszą aplikację — zacznij od jednego zdania o tym, co chcesz zobaczyć.

Pełną listę zmian w wersji 4.9.0 znajdziesz w [historii zmian](/pl/lista-zmian), a o tym, jak OmniMES współpracuje z asystentami AI, przeczytasz w newsie [MCP w OmniMES](/pl/news/mcp-w-omnimes-sterowanie-z-asystenta-ai).

> **Zastrzeżenie:** Zakłady, linie, maszyny, zlecenia i kwoty widoczne na zrzutach ekranu to dane demonstracyjne OmniMES.
