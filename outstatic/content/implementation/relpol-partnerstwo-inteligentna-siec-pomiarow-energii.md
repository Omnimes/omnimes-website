---
title: 'Relpol — partnerstwo i inteligentna sieć pomiarów energii'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'relpol-partnerstwo-inteligentna-siec-pomiarow-energii'
description: 'W 2026 roku Multiprojekt Automatyka (producent OmniMES) rozpoczął partnerstwo z Relpol S.A. — polskim producentem przekaźników i liczników energii serii RMM. Wspólna oferta łączy sprzęt pomiarowy Relpolu z systemem OmniMES + OmniEnergy zgodnym z ISO 50001. Pilotaż uruchomiony w zakładzie Relpol pokazuje działanie stacka na żywo.'
coverImage: '/images/relpol/relpol-liczniki.jpg'
lang: 'pl'
tags: [{"label":"Relpol","value":"relpol"},{"label":"Omnimes","value":"omnimes"},{"label":"OmniEnergy","value":"omniEnergy"},{"label":"Partnerstwo","value":"partnerstwo"},{"label":"ISO 50001","value":"iso50001"}]
publishedAt: '2026-09-10T09:00:00.000Z'
---

W 2026 roku [Multiprojekt Automatyka](https://multiprojekt.pl) — producent systemu **OmniMES** — nawiązał strategiczne partnerstwo z [Relpol S.A.](https://relpol.com.pl), polskim producentem przekaźników i mierników sieciowych. Wspólna oferta łączy dwie warstwy potrzebne do wdrożenia zarządzania energią pod ISO 50001: **certyfikowane liczniki energii Relpol RMM** oraz **system OmniMES z modułem OmniEnergy**.

Rezultat dla klienta: jeden dostawca hardware, jeden dostawca software, jedna faktura, jedno wsparcie techniczne — zamiast trzech osobnych projektów integracyjnych. Liczniki RMM (trójfazowe analizatory jakości energii z komunikacją Modbus RTU / TCP/IP) mają wspólnie z OmniMES przetestowaną konfigurację, a nowe wersje firmware licznika są walidowane po stronie oprogramowania przed publikacją.

## Pilotaż w zakładzie Relpol

Żeby partnerstwo miało realne pokrycie, pilotażowa instalacja została uruchomiona w **zakładzie produkcyjnym samego Relpolu** — ich własne liczniki RMM podłączone do OmniEnergy, monitorujące własną halę produkcyjną (Drążarki, Frezarki, dwie Galwanizernie). Dane w systemie są prawdziwe, wskaźniki liczą się na bieżąco.

Pilotaż pokrywa cztery obszary systemu OmniMES:

- **Monitoring maszyn na żywo** — bieżąca energia, moc pozorna, prąd na każdej fazie, klasyfikacja stanu pracy z progu mocy pozornej
- **Panel główny OmniEnergy** — obszary znaczącego wykorzystania energii (ZWE), pokrycie 82,3% (norma ISO 50001 wymaga min. 80%), Pareto poboru, trend godzinowy 7 dni
- **Porównywarka okien czasowych ZWE** — zestawienie zużycia w wielu oknach naraz z detekcją regresji
- **Dashboard „Energia — przegląd zarządczy"** — profil mocy czynnej/biernej/pozornej (48 h), struktura poboru wg obszarów, top 10, mapa cieplna „obszar × godzina doby"

Efektem jest **kompletny ślad danych** — od licznika na szynie DIN, przez stream telemetryczny, po pulpit ZWE gotowy do przeglądu ISO 50001.

## Dla kogo ten stack

Oferta partnerska powstała z myślą o polskich zakładach średniej wielkości, które chcą uruchomić realny system zarządzania energią pod ISO 50001 — bez skomplikowanego projektu integracyjnego wymagającego łączenia dostawców z trzech różnych krajów. Dla zakładów, które już mają liczniki Relpol RMM zainstalowane, wdrożenie OmniMES sprowadza się do podłączenia bramki i konfiguracji struktury parku, **bez wymiany istniejącej infrastruktury pomiarowej**.

Pełny opis partnerstwa wraz ze screenami z pilotażu w zakładzie Relpol znajdziesz w artykule [Partnerstwo OmniMES × Relpol — inteligentna sieć pomiarów energii](/pl/blog/partnerstwo-omnimes-relpol-inteligentna-siec-pomiarow-energii).
