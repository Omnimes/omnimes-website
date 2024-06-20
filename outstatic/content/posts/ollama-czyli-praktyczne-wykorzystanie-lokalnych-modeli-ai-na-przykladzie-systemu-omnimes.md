---
title: 'Ollama - czyli praktyczne wykorzystanie lokalnych modeli AI na przykładzie systemu OMNIMES'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'ollama-czyli-praktyczne-wykorzystanie-lokalnych-modeli-ai-na-przykladzie-systemu-omnimes'
description: ''
coverImage: ''
tags: [{"value":"ai","label":"AI"},{"label":"Ollama","value":"ollama"},{"label":"llama3","value":"llama3"},{"label":"Meta","value":"meta"},{"label":"Gemma","value":"gemma"},{"label":"Mistral","value":"mistral"},{"label":"GPT-4","value":"gpt4"},{"label":"GPT-3.5","value":"gpt35"},{"label":"AI local","value":"aiLocal"}]
lang: 'pl'
publishedAt: '2024-06-20T12:47:51.265Z'
---

![](/images/image-E3MT.png)

Może od początku czym jest projekt Ollama ? Jest to otwarte bezpłatne oprogramowanie do uruchamiania lokalnych (na własnym komputerze/serwerze) modeli AI typu LLM (duże modele językowe) przy stosunkowo niskich wymaganiach sprzętowych. Oprogramowanie to jak i jeden z modeli llama3 pochodzi od META (wcześniej Facebook)\
\
Oprogramowanie to pozwala na korzystanie na chwilę obecną z dostępnych 93 modeli AI przez średnie i małe firmy z niewielkimi lub żadnymi ograniczeniami.

Oprogramowanie jest dostępne na każdą platformę czyli Windows/Linux/MacOs jak również jest dostępne na Docker.

## Uruchomienie

Samo uruchomienie oprogramowania jest banalnie proste. Poniżej streszczę w wielkim skrócie na przykładzie uruchomienia na Windows, zaś po dokładną instrukcję instalacji odsyłam pod adres projektu:[https://ollama.com](https://ollama.com/)

Z strony projektu wystarczy pobrać instalator. Jedno kliknięcie i w tej chwili już mamy zainstalowane oprogramowanie. Wpisując po instalacji w przeglądarce:

```bash
localhost:11434
```

Powinniśmy zobaczyć że serwer został uruchomiony

![](/images/image-ExNT.png)

Dostępne modele wraz z ich opisami są na stronie projektu <https://ollama.com/library>

Po instalacji wystarczy pobrać model wpisując w **cmd** np. :

```bash
ollama pull llama3
```

I od tej chwili mamy gotowy serwer z modelem, llama3. Mamy parę sposobów na komunikowanie się z modelem. Pierwszy najprostszy jeśli chcemy sprawdzić działanie modelu jest poprzez **cmd** wystarczy wpisać:

```javascript
ollama run llama3 
```

Po czym uzyskamy gotowy interfejs komunikacji,

![](/images/image-I3OT.png)

Wpisujemy pytanie i czekamy na odpowiedź:\
\
![](/images/image-UyND.png)\
\
Oczywiście nie wszyscy będą preferować tego typu interfejs komunikacji. Innym sposób to interfejs webowy ale tu jest wymagany zainstalowany Docker. Jeśli go mamy to z strony:

<https://github.com/open-webui/open-webui>

możemy pobrać interesującą nas wersję. Ja wybieram standardową i wystarczy że w **cmd** wkleję:

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

Wchodzimy do przeglądarki wpisujemy:

```bash
localhost:3000
```

i na czym oczom ukaże się interfejs bardzo dobrze znany z OpenAI:

![](/images/image-kzNj.png)

Od teraz możemy w pełni korzystać z naszego lokalnego modelu poprzez taki sam interfejs jak Chat GPT

O konfiguracji tego interfejsu jak i pełnej instalacji serwera **Ollama** zapraszam na obejrzenie tego filmiku:

<https://www.youtube.com/watchv=Wjrdr0NU4Sk>

Dość krótkie przedstawienie oprogramowania i jego instalacji mamy za sobą. W innym poście przedstawię pełną instalację serwera **Ollama** jako zdalny serwer AI jak i zestawienie najlepszych dostępnych modeli.

## Wymaganie techniczne

**Oczywiście warto dodać że serwer Ollama oferuje nam również API które możemy wykorzystać do własnych aplikacji, gdzie nie będzie wymagane instalwoanie interfejsu webowego.**

Ciekawą funkcjonalnością jest również dodawanie własnych modeli spoza biblioteki Ollamy. Czyli możemy stworzyć własny model AI i w formacie zgodnym z Ollama dodać go na serwer.

**Co do wymagań technicznych - wszsytko zależy oczywiście od używanego modelu oraz liczby zapytań do modelu, jak i wielkości samego modelu AI.**\
\
Ale do własnych celów lub do działania jako mała AI **wystarczy pojedyńcza karta graficzna** - tu sprawdzane na serwerze z RTX 3070Ti 350W oraz na RTX 4060 w wersji na laptop 140W, **z modelem AI llama3**.

Wrażenia są zaskakująco dobre, odpowiedź trwa od 5 do 10s. Co jak na lokalną AI jest bardzo dobrym wynikiem.

Jakość odpowiedzi jest również na poziomie - jeśli chodzi o logiczną składnie. Większe porównanie modeli w innym poście. Teraz skupimy się na modelu **Llama3** - firmowanym modelu AI od META (dawniej FaceBook).

## Porównanie z innymi modelami

Chyba najlepszy porównaniem świadczącym o **możliwościach modelu Llama3 będzie jego zestawienie z modelem GPT 2, 3.5 czy 4 oraz np.: modelem AI Gemma od Googla oraz Mistral od Apache.** Porównanie takie możemy dokonać zestawiając modele w benchmarkach.

![](/images/image-gxNz.png)

### Znaczenie benchmarków:

- **MMLU** jest wskaźnikiem ogólnej wydajności i wszechstronności modelu językowego w szerokim zakresie zadań językowych.
- **GPQA** mierzy ogólną wiedzę i zdolność do odpowiedzi na pytania.
- **HumanEval** ocenia zdolność do generowania poprawnego kodu programistycznego.
- **GSM-8K** sprawdza umiejętności rozwiązywania problemów matematycznych na podstawowym poziomie.
- **MATH** testuje bardziej zaawansowane umiejętności matematyczne.

Największe znaczenie ma wynik testu **MMLU** gdzie widzimy że **model llama3 przewyższa GPT 3,5 o 8,5 jednostek**.

**W związku z czym wynik używania tego modelu jako naszej lokalnej AI odzwierciedla pozytywne odczucie w jej używaniu.**

Skoro mamy już opis oprogramowanie Ollama oraz modelu Llama3 z częściowym porównaniem go na tle innych modeli, przystąpmy do przedstawienia jego działania w akcji na przykładzie systemu do realizacji produkcji - OMNIMES.

## Wykorzystanie Ollama na przykładzie Omnimes

Korzystając z API serwera Ollama zaimplementowaliśmy korzystanie lokalnej AI w systemie Omnimes. Jej działanie opiera się na bardzo prostym ustawianiu danych podobnych jak w przypadku korzystania z API od Open AI o czym pisałem we wczęsnijszym poście link poniżej:

<https://www.omnimes.com/pl/blog/praktyczne-zastosowanie-aystenta-ai-integracja-api-gpt-4-z-aplikacja-webowa-do-analizy-danych>

![](/images/image-U0Nj.png)

Obecnie w systemie Omnimes mamy do wyboru czy chcemy korzystać z zewnętrznej AI czyli tu - API od Open AI lub wewnętrznej AI tu - Ollama

Po wybraniu typu AI, w przypadku AI od Ollama mamy możliwość wyboru modelu AI.

**Ilość modeli zależy ilości pobranych modeli na serwer Ollama. Możemy również dodać swój własny model, pamiętając tylko by został zapisany w formacie zgodnym dla oprogramowania Ollama.**

A tu poniżej przedstawienie analizy danych z podsumowania znajdującego się na panelu głównym systemu Omnimes

![](/images/image-gyNz.png)

*Wynik analizy przez GPT 3.5*

![](/images/image-M5NT.png)

*Wynik analizy przez Llama3*

![](/images/image-c0Nz.png)

Jak widzimy, składnia logiczna lokalnego modelu Llama3 jest bardzo dobra i niczym nie odstępuje od GPT 3.5. Warto dodać że sam model Llama3 waży zaledwie 4,5 GB zaś model GPT 2 w wersji XL 6GB, waga modelu GPT 3.5 nie została podana do wiadomości publicznej.

## Podsumowanie

Jak widzimy korzystanie z lokalnej AI jaką nam oferujemy oprogramowanie **Ollama** nie odstępuje w żaden sposób od korzystania z zewnętrznych serwerów **Open AI** poprzez ich API.

Daje nam to duże możliwości oczywiście ograniczone sprzętowo a tym samym finansowo bo tutaj działanie samej AI zależy wyłącznie od sprzętu z jakiego korzystamy model **Llama3** oferuje również **większą wersję Llama3:70b ale sam model waży 40 GB**, a do jego obsługi już raczej nam nie wystarczy pojedyńcza karta graficzna.

Jednakże używanie **Ollama** dla potrzeb przedsiębiorstw jak w tego typu systemach jak **Omnimes**, który skupia się na realizacji produkcji jest dobrym podejściem jak również odpowiedzią na **restrykcyjną politykę bezpieczeństwa danego przedsiębiorstwa** czyli **brak możliwości podłączania systemu z danymi produkcyjnymi do zewnętrznych serwerów lub chociażby brak zewnętrznego internetu na hali produkcyjnej**.\
\
Dodatkowo otrzymujemy model AI nieskażony błędnymi informacjami ze świata zewnętrznego - przez to mniej podatny na tzw. halucynacje czyli krótko mówiąc przekłamywaniu lub wymyślaniu.

Jeśli jesteś zainteresowany naszym rozwiązaniem na swoim parku maszynowym lub hali produkcyjnej i usprawnieniu procesu produkcyjnego wykorzystując przy tym nowoczesne metody zbierania danych i ich analizowaniu zapraszam do zapoznania się z oferta systemu [Omnimes](https://www.omnimes.com/pl/oferta)