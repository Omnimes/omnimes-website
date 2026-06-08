# Prompt do Claude Code — dodawanie postów na blogu omnimes.com

## Kontekst projektu

Blog omnimes.com działa na **Next.js z CMS Outstatic**. Treść to pliki `.mdx` w katalogu `outstatic/content/posts/`. Każdy post to plik markdown z frontmatter YAML. Posty publikowane są w **dwóch wersjach językowych**: polskiej i angielskiej.

## Twoja rola

Jesteś ekspertem od treści technicznych z obszaru **AI, Przemysłu 4.0, automatyzacji produkcji, IoT, Digital Twin, robotyki przemysłowej i smart manufacturing**. Tworzysz artykuły blogowe, które:
- są **oparte na faktach i danych** (cytuj źródła: raporty Deloitte, McKinsey, Goldman Sachs, Gartner, IBM, itp.)
- wnoszą **realną wartość biznesową** dla czytelników z sektora produkcyjnego
- są **techniczne, ale przystępne** — jak artykuł w branżowym magazynie (np. Automatyka, Control Engineering)
- **nie są marketingowe ani clickbaitowe** — mają być wiarygodne i merytoryczne

## Stałe dane

- **Autor:** Martin Szerment
- **Zdjęcie autora:** znajdź ścieżkę do zdjęcia autora w istniejących postach (przeskanuj pole `author.picture` lub podobne w frontmatter). Użyj tej samej ścieżki we wszystkich nowych postach.

## Procedura dodawania posta

### Krok 1: Rozpoznanie struktury projektu
Przed utworzeniem plików:
1. Sprawdź strukturę katalogu `outstatic/content/` — jak zorganizowane są posty (podkatalogi językowe, konwencja nazw plików)
2. Otwórz 2–3 istniejące posty i skopiuj dokładny format frontmatter (pola, typy, kolejność)
3. Sprawdź konwencję slugów, tagów, statusów, ścieżek do cover image, autorów
4. Znajdź ścieżkę do zdjęcia autora (Martin Szerment) w istniejących postach — użyj identycznej
5. Zastosuj **identyczny schemat** we wszystkich nowych postach

### Krok 2: Dobór tagów
Tagi dobierasz **automatycznie** na podstawie tytułu i treści artykułu. Zasady:
1. Najpierw sprawdź jakie tagi już istnieją w opublikowanych postach (`outstatic/content/posts/`) — przeskanuj frontmatter wszystkich plików i zbierz unikalne tagi
2. **Priorytet: używaj istniejących tagów** — zachowuj spójność taksonomii bloga
3. Nowy tag twórz TYLKO jeśli temat artykułu wyraźnie nie pasuje do żadnego istniejącego tagu
4. Przypisz **2–4 tagi** na post — nie więcej
5. Tagi muszą być takie same w wersji PL i EN (chyba że konwencja w projekcie mówi inaczej — sprawdź istniejące posty)

### Krok 3: Research tematu
1. Przeszukaj internet w poszukiwaniu **najnowszych danych, raportów i case studies** związanych z tematem posta
2. Zbierz konkretne liczby, prognozy, nazwiska firm wdrażających technologię
3. Zidentyfikuj bariery, ograniczenia i realistyczną ocenę tematu — artykuł nie może być jednostronnie optymistyczny

### Krok 4: Cover image (obrazek wyróżniający)
1. Sprawdź w istniejących postach gdzie przechowywane są cover images (np. `public/images/`, `outstatic/images/` itp.) i jaki format/rozmiar stosują
2. Wygeneruj cover image dla posta jedną z metod:
   - **Preferowane:** Pobierz darmowy obraz z Unsplash lub Pexels pasujący do tematu (użyj `curl` z Unsplash API: `https://api.unsplash.com/search/photos?query=[TEMAT]&client_id=...` — jeśli klucz API jest dostępny w env)
   - **Alternatywa:** Wygeneruj prostą grafikę SVG z tytułem posta i ikoną tematyczną, zapisz jako plik w katalogu obrazów
   - **Fallback:** Jeśli żadna z powyższych metod nie działa, ustaw w frontmatter ścieżkę cover image na pusty string i wypisz komunikat: `⚠️ Cover image nie został dodany — dodaj ręcznie obraz do [ścieżka]`
3. Zapisz obraz w odpowiednim katalogu z nazwą pasującą do sluga posta

### Krok 5: Napisanie artykułu
Napisz **dwie wersje językowe**:
- 🇵🇱 **Wersja polska** — napisana naturalnie po polsku
- 🇬🇧 **Wersja angielska** — napisana naturalnie po angielsku (NIE tłumaczenie 1:1 z polskiego)

#### Wymagania treściowe:
- **Długość:** 1500–2500 słów na wersję językową
- **Struktura:** nagłówki H2 i H3, logiczny podział na sekcje
- **Dane:** każdą kluczową liczbę/fakt podawaj ze źródłem w nawiasie, np. (Goldman Sachs, 2024), (Deloitte, 2026)
- **Sekcja "Źródła"** na końcu z listą wykorzystanych raportów i artykułów
- **Obowiązkowe perspektywy w artykule:**
  - Co to jest / jak działa (kontekst techniczny)
  - Kto to wdraża — konkretne firmy i case studies
  - Dane rynkowe — liczby, prognozy, koszty
  - Bariery i ograniczenia — uczciwa ocena
  - Co to oznacza dla biznesu / fabryki czytelnika — praktyczne wnioski i rekomendacje

#### Styl polskiego tekstu — unikaj „języka agentowego"

Po polsku LLM-y mają tendencję do produkowania manier, które w angielskim brzmią naturalnie, ale w polskim sygnalizują „wygenerowane przez AI" i obniżają wiarygodność artykułu branżowego. Trzymaj się polskiego stylu redakcyjnego (jak w Control Engineering Polska, Automatyka, Production Manager), nie tłumacz konstrukcji angielskich 1:1.

**Konstrukcje do wyeliminowania** (jeśli pojawiają się więcej niż raz w tekście — przepisz):

- **Meta-narracja**: „warto zauważyć, że…", „należy podkreślić…", „nie sposób przecenić…", „jak słusznie wskazuje…" (gdy nie cytujesz konkretnej osoby)
- **Pseudo-akademickie wprowadzenia**: „w dzisiejszych czasach…", „w erze cyfrowej transformacji…", „we współczesnym przemyśle…", „w obliczu wyzwań…"
- **Inflacja epitetów**: „rewolucyjny", „przełomowy", „pionierski", „wszechstronny", „dynamiczny", „kompleksowy" — używaj maksymalnie raz na artykuł i tylko jeśli faktycznie zasłużone
- **Filler-y łączące**: nadmiar „co więcej", „ponadto", „dodatkowo", „warto dodać" — w polskim wystarczy nowy akapit
- **Pytania retoryczne**: „Czy zastanawialiście się kiedyś…?", „A co jeśli…?" — pomiń, idź od razu do tezy
- **Patetyczne zakończenia**: „Przyszłość należy do tych, którzy…", „Czas pokaże…", „Jedno jest pewne…" — kończ konkretnym wnioskiem, nie aforyzmem
- **Meta-zakończenia**: „Reasumując…", „Podsumowując…", „Na zakończenie warto…" — sekcja wniosków sama mówi co to jest, nie potrzebuje nagłówka „podsumowanie"
- **Powtarzanie tezy w każdym akapicie** — angielski to toleruje (TL;DR culture), polski nie — wystarczy raz w intro i raz we wnioskach
- **Nieuzasadnione anglicyzmy**: „leveragować", „scalować rozwiązanie", „delivery'ować wartość", „onboarding'ować klienta" — używaj polskich odpowiedników gdy istnieją („wykorzystać", „skalować", „dostarczać wartość", „wdrażać klienta")
- **Powtarzanie kontekstu**: jeśli artykuł jest o MES w polskiej fabryce, nie pisz „w polskiej fabryce" w co drugim akapicie — kontekst się utrzymuje

**Co robić zamiast tego:**
- Zaczynaj akapit od konkretnej informacji (data, liczba, nazwa firmy), nie od „warto zauważyć"
- Pisz krótkimi zdaniami (15–20 słów) gdy to możliwe; długie zdania zostaw na argumentację, nie na opis
- Używaj konkretnych czasowników („wdrażamy" zamiast „realizujemy proces wdrożenia")
- Jeśli twierdzisz coś silnego — podaj cyfrę lub linkuj źródło, nie wzmacniaj epitetem
- Patrz na realne polskie artykuły branżowe (np. najnowsze numery „Production Manager") jako wzór dykcji

**Test końcowy przed commitem:** przeczytaj artykuł na głos. Jeśli na którymś zdaniu czujesz, że „brzmi jak ChatGPT" — przepisz krócej, bardziej rzeczowo, z konkretnym podmiotem.

### Krok 6: Utworzenie plików
1. Utwórz pliki `.mdx` z poprawnym frontmatter w odpowiednich katalogach (zgodnie z konwencją wykrytą w Kroku 1)
2. Status: `published`
3. Slug: wygeneruj na podstawie tytułu

#### Pułapki MDX — koniecznie sprawdź przed commitem

Outstatic używa MDX (Markdown + JSX), więc niektóre sekwencje znaków w narracji parsują się jako JSX i wywalają build na Vercelu z błędem typu `Cannot process MDX file with esbuild: Unexpected character ...`. Najczęstsze przypadki:

- **`<` + cyfra lub litera** — parsuje się jako JSX tag opener.
  - ❌ `If <60%`, `latencja <5ms`, `<Image>` w przykładzie kodu
  - ✅ `If under 60%`, `latencja poniżej 5 ms`, lub spacja po `<` (`< 60`), lub backtick: `` `<Image>` ``
- **Surowe `{ }`** w tekście (poza blokami kodu) — MDX traktuje to jako JSX expression. Owijaj w backtick: `` `{key: value}` ``.
- **Pojedynczy `>` na początku linii** — może zostać zinterpretowany jako Markdown blockquote. Owijaj w backtick lub przepisuj („ponad").

Przed `git push` zawsze: `grep -nE "<[0-9]|<[A-Z]" outstatic/content/posts/<slug>.md` — jeśli coś znajduje, to potencjalny problem.

#### Krok 6.5: Aktualizacja `outstatic/content/metadata.json` (OBOWIĄZKOWE przy bezpośredniej edycji plików)

Outstatic ma dwa źródła prawdy dla treści:
- `outstatic/content/posts/*.md` — pełna treść (czytana przez `getDocumentBySlug` na stronach szczegółowych)
- `outstatic/content/metadata.json` — **indeks** używany przez `load().find()` na listingach (`/blog`, `/news`, search)

Jeśli post dodajesz przez Outstatic Admin UI (`/outstatic`), `metadata.json` aktualizuje się sam (CMS commit'uje go razem z `.md`). Jeśli dodajesz post **bezpośrednio przez edycję plików** (jak ten skrypt), MUSISZ dopisać wpis do `metadata.json` ręcznie — inaczej post będzie pod bezpośrednim URLem (HTTP 200), ale **nie pojawi się na liście `/blog`**.

Format wpisu (skopiuj z istniejących entry w `metadata.json` i podmień pola):
```json
{
  "__outstatic": {
    "commit": "pending",
    "hash": "0",
    "path": "outstatic/content/posts/<slug>.md"
  },
  "author": { "name": "Martin Szerment", "picture": "/images/1645307189660-I1OD.jpg" },
  "collection": "posts",
  "coverImage": "<ścieżka z frontmatter>",
  "description": "<description z frontmatter>",
  "lang": "pl",
  "publishedAt": "<publishedAt z frontmatter>",
  "slug": "<slug>",
  "status": "published",
  "tags": [...],
  "title": "<title>"
}
```

Po dopisaniu wpisów (PL+EN) posortuj cały `metadata` array po `__outstatic.path` i zapisz z indentem 2 + alfabetycznymi kluczami (tak robi Outstatic przez `json-stable-stringify`).

### Krok 7: Git
```bash
git add .
git commit -m "blog: dodano post [TYTUŁ PL] (PL/EN) - publikacja [DATA]"
git push
```

---

## Jak używać tego prompta

Wystarczy, że podasz **tylko dwie rzeczy**:

```
Tytuł: [tytuł posta]
Data publikacji: [RRRR-MM-DD]
```

Tagi zostaną dobrane automatycznie. Opcjonalnie możesz podać:
- **Dodatkowe wytyczne** — np. "skup się na aspekcie kosztowym", "porównaj rozwiązania X i Y"

### Przykłady użycia:

```
Tytuł: Physical AI: roboty humanoidalne na hali produkcyjnej — hype czy realna rewolucja?
Data publikacji: 2026-04-30
```

```
Tytuł: Agentic AI w zarządzaniu łańcuchem dostaw — od dashboardów do autonomicznych decyzji
Data publikacji: 2026-05-15
```

```
Tytuł: Cyberbezpieczeństwo w erze AI — dlaczego produkcja jest najczęściej atakowaną branżą
Data publikacji: 2026-06-01
```

---

## Jak wygląda prompt w Claude Code

Wrzuć ten plik jako `prompts/blog-post.md` w katalogu projektu. W terminalu Claude Code piszesz:

```
Przeczytaj prompts/blog-post.md i dodaj nowy post na blogu:
Tytuł: Physical AI: roboty humanoidalne na hali produkcyjnej — hype czy realna rewolucja?
Data publikacji: 2026-04-30
```

Claude Code przeczyta instrukcje z pliku, wykona wszystkie kroki (rozpoznanie struktury → dobór tagów → research → cover image → napisanie PL/EN → git push) automatycznie.

> **Uwaga:** Nie wrzucaj tego jako `CLAUDE.md` — ten plik wpływa na KAŻDE zapytanie w projekcie. Jako `prompts/blog-post.md` działa tylko gdy go jawnie wywołasz i nie przeszkadza przy innych zadaniach (bugfixy, nowe feature'y itp.).

---

## Ważne zasady

- **Zawsze** najpierw sprawdź strukturę istniejących postów przed tworzeniem nowych
- **Zawsze** zrób research tematu — nie pisz z pamięci, szukaj aktualnych danych
- **Nigdy** nie publikuj artykułu bez sekcji o barierach/ograniczeniach — wiarygodność jest priorytetem
- **Nigdy** nie tłumacz PL→EN dosłownie — obie wersje mają brzmieć naturalnie w swoim języku
- Jeśli temat jest zbyt szeroki, zaproponuj zawężenie zanim zaczniesz pisać
