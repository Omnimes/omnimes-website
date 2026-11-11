---
title: 'Hologram w OmniMES — Twoja hala w 3D: na żywo, z symulacją i zbudowana przez AI'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'hologram-w-omnimes-hala-3d-na-zywo'
description: 'OmniMES 4.6.0 wprowadza Hologram — model 3D hali produkcyjnej, w którym maszyny świecą kolorem swojego stanu na żywo, a w trybie symulacji widać przepływ materiału i wąskie gardło. Model buduje asystent AI przez MCP: kopiujesz gotowe polecenie i gotowe.'
coverImage: '/images/omnimes-hologram-cover.jpg'
lang: 'pl'
publishedAt: '2026-11-11T21:00:00.000Z'
---

Planogram jest płaski, Monitoring to kafelki, a hala… hala ma trzy wymiary. Od wersji **4.6.0** OmniMES ma nowy ekran — **Hologram**: model 3D Twojej hali, w którym maszyny świecą kolorem swojego stanu, wózki widłowe jeżdżą alejkami, a detale płyną od stanowiska do stanowiska. Bez gogli VR, bez projektanta 3D i bez tygodni modelowania.

<video controls width="100%" preload="metadata" poster="/images/omnimes-hologram-live.jpg">
  <source src="/videos/omnimes-hologram-live.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje odtwarzania wideo HTML5.
</video>

## Co widać na Hologramie

- **Stan każdej maszyny na żywo** — sygnalizator na maszynie, obrys na posadzce w kolorze statusu i tabliczka z numerem stanowiska. Zielony: pracuje. Żółty: postój. Czerwony: awaria. Z drugiego końca hali widać, dokąd trzeba iść.
- **Karty stanowisk w kolejności procesu** — z aktualnymi pomiarami: energia, moc, temperatury, liczba sztuk. Klikasz kartę, a kamera sama podlatuje do maszyny i otwiera panel ze wszystkimi odczytami.
- **Liczniki na górze** — ile maszyn pracuje, ile stoi, ile ma awarię i ile sygnałów właśnie przyszło z hali.
- **Widok z góry i pełny ekran** — dobre na telewizor na hali albo na poranną odprawę. Karty stanowisk ustawisz z boku, na dole albo schowasz, gdy liczy się sam model.

## Symulacja, czyli „a co, jeśli…?”

<video controls width="100%" preload="metadata" poster="/images/omnimes-hologram-symulacja.jpg">
  <source src="/videos/omnimes-hologram-symulacja.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje odtwarzania wideo HTML5.
</video>

Ten sam model przełączasz w tryb symulacji i patrzysz, jak materiał płynie przez linie. OmniMES liczy wydajność i gotowe sztuki, a do tego pokazuje palcem wąskie gardło. Skracasz cykl na stanowisku albo dokładasz miejsc w buforze — i od razu widzisz, czy to w ogóle coś daje, czy korek przesunął się tylko o jedną maszynę dalej. Całą zmianę (8 godzin) przeliczasz jednym kliknięciem. Eksperyment kosztuje zero złotych i zero zatrzymanych linii.

## Kto buduje model? Asystent AI

Nikt nie musi siedzieć tygodniami w programie CAD. Model hali buduje asystent AI (najlepsze wyniki daje Claude Opus 5.5 i nowsze modele) przez [serwer MCP w OmniMES](/pl/news/mcp-w-omnimes-sterowanie-z-asystenta-ai), na podstawie parków maszynowych, linii i maszyn, które już są w systemie:

1. W **Hologram – ustawienia** wybierasz zakres: cały park maszynowy, wybrane linie albo tylko kilka maszyn.
2. Kreator składa gotowe polecenie z właściwymi identyfikatorami — kopiujesz je do asystenta.
3. Asystent układa halę: maszyny w realnych wymiarach, regały, alejki, wózki, suwnice i przepływy. Po każdym zapisie OmniMES sprawdza model (czy są wszystkie maszyny, czy nic na siebie nie nachodzi, czy każda maszyna jest w przepływie) i mówi asystentowi, co poprawić.
4. Każda zmiana to nowa wersja z opisem — do poprzedniej wracasz jednym kliknięciem. Gdy dojdą nowe maszyny, model się rozbudowuje, a nie rysuje od nowa.

Dla porządku: model anglojęzycznego zakładu **WOODCRAFT** z naszego demo (zobacz [angielską wersję tego newsa](/en/news/hologram-in-omnimes-your-plant-in-live-3d)) powstał dokładnie tak. Asystent dostał listę 11 maszyn z 4 linii, a oddał halę 80 × 44 m z magazynem surowca, alejkami, dwoma wózkami, AGV i przepływem w kształcie litery U. Kontrola jakości: bez uwag.

## Gdzie to zobaczyć

Hologram działa na [demo OmniMES](https://demo.omnimes.com) — w menu **Podgląd → Hologram**. Opis krok po kroku znajdziesz w [rozdziale Hologram w dokumentacji](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/hologram-4c8uZjjt0b), a pełną listę zmian w wersji 4.6.0 — w [historii zmian](/pl/lista-zmian).

> **Zastrzeżenie:** Zakłady „Stalownia” i „WOODCRAFT” pokazane w filmach są **fikcyjne** — to dane demonstracyjne OmniMES. Ewentualne podobieństwo do istniejących podmiotów jest przypadkowe.
