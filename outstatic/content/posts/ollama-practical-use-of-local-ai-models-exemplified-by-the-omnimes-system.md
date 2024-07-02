---
title: 'Ollama - Practical Use of Local AI Models Exemplified by the OMNIMES System'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'ollama-practical-use-of-local-ai-models-exemplified-by-the-omnimes-system'
description: 'The Ollama project is an open, free software that allows running local AI models, specifically large language models (LLMs), on your own computer or server. Due to its low hardware requirements, this software is accessible to medium and small businesses, providing access to 93 AI models without significant limitations.'
coverImage: '/images/1.png'
lang: 'en'
tags: [{"value":"ai","label":"AI"},{"value":"aiLocal","label":"AI local"},{"value":"llama3","label":"llama3"},{"value":"meta","label":"Meta"},{"value":"gemma","label":"Gemma"},{"value":"mistral","label":"Mistral"},{"value":"gpt4","label":"GPT-4"},{"value":"gpt35","label":"GPT-3.5"}]
publishedAt: '2024-07-02T05:47:43.362Z'
---

![Meta - ollama logo - model AI](/images/image-E3MT.png)

Let's start from the beginning: what is the **Ollama project**? It is open, free software for running local AI models, specifically large language models (LLMs), on your own computer or server with relatively low hardware requirements. This software, along with one of the models, **Llama3**, originates from **META (formerly Facebook)**.

Currently, the software allows medium and small businesses to use 93 available AI models with few or no restrictions.

The software is available on all platforms, including Windows/Linux/MacOS, and is also available on Docker.

## Launching

Launching the software is incredibly simple. Below, I'll briefly summarize the process using a Windows example. For detailed installation instructions, please refer to the project's website: [https://ollama.com](https://www.ollama.com/)

From the project website, simply download the installer. One click and the software is installed. After installation, type in your browser:

```bash
localhost:11434
```

You should see that the server has started.

![Screenshot of the Console Showing the Running Ollama Server](/images/image-ExNT.png)

The available models along with their descriptions are on the project's website [https://ollama.com/library](https://www.ollama.com/library)

After installation, simply download a model by typing the following in **cmd**, for example:

```bash
ollama pull llama3
```

And from now on, we have a ready server with the Llama3 model. There are several ways to communicate with the model. The simplest one, if we want to check the model's operation, is through **cmd**. Simply enter:

```javascript
ollama run llama3
```

After which we will have a ready communication interface.

![The communication interface of Ollama](/images/image-I3OT.png)

We enter a question and wait for the answer.

![Answer to the question "who is Elon Musk?" by the Ollama language model](/images/image-UyND.png)

Of course, not everyone will prefer this type of communication interface. Another way is through a web interface, but this requires Docker to be installed. If we have Docker installed, then from the website: 

[https://github.com/open-webui/open-webui](https://www.github.com/open-webui/open-webui)

We can download the version that interests us. I choose the standard version, and all I need to do is paste the following into **cmd**:

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

We open a web browser and type in:

```bash
localhost:3000
```

and the interface very well known from OpenAI will appear before your eyes:

![The picture shows the graphical interface of Ollama. The interface is similar to the one known from OpenAI.](/images/image-kzNj.png)

From now on, we can fully utilize our local model through the same interface as ChatGPT.

For configuring this interface and complete server installation of **Ollama**, I invite you to watch this video:

[https://www.youtube.com/watchv=Wjrdr0NU4Sk](https://youtube.com/watchv=Wjrdr0NU4Sk)

We've covered a brief overview of the software and its installation. In another post, I'll present a complete installation of the **Ollama** server as a remote AI server, along with a comparison of the best available models.

## Technical Requirements

**Of course, it's worth noting that the Ollama server also offers an API that we can use for our own applications, eliminating the need to install a web interface.**

Another interesting feature is the ability to add custom models outside of the Ollama library. This means we can create our own AI model and add it to the server in a format compatible with Ollama.

**As for technical requirements - everything depends on the model used, the number of queries to the model, and the size of the AI model itself.**

For personal use or operating as a small AI, **a single graphics card is sufficient** - this has been tested on a server with an RTX 3070 Ti (350W) and on an RTX 4060 laptop version (140W), **with the Llama3 AI model**.

The performance is surprisingly good, with responses taking between 5 to 10 seconds, which is very good for a local AI model.

The quality of responses is also high, especially in terms of logical syntax. A more detailed comparison of models will be covered in another post. For now, let's focus on the **Llama3** model - an AI model endorsed by META (formerly Facebook).

## Comparison with Other Models

Arguably the best comparison showcasing the capabilities of the Llama3 model would be its comparison with models like GPT-2, GPT-3.5, GPT-4, as well as with Google's AI model Gemma and Apache's Mistral. Such a comparison can be made by benchmarking these models.

![Table comparing language models.](/images/image-gxNz.png)

**Significance of Benchmarks:**

- **MMLU** is an indicator of overall performance and versatility of the language model across a wide range of language tasks.
- **GPQA** measures general knowledge and the ability to answer questions.
- **HumanEval** assesses the ability to generate correct programming code.
- **GSM-8K** evaluates skills in solving basic mathematical problems.
- **MATH** tests more advanced mathematical abilities.

The most significant result comes from the **MMLU** test, where we see that **the Llama3 model outperforms GPT-3.5 by 8.5 units**.

**As a result, the performance of using this model as our local AI reflects a positive experience in its usage.**

Now that we have described the Ollama software and the Llama3 model, including a partial comparison with other models, let's proceed to demonstrate its functionality in action using the production execution system example - **Ominmes**.

## Utilizing Ollama with Omnimes Example

Using the Ollama server API, we have implemented the use of local AI within the Omnimes system. Its operation is based on straightforward data setup similar to using the OpenAI API, as discussed in my earlier post linked below:

[https://www.omnimes.com/en/blog/practical-application-of-ai-assistant-integration-of-openai-s-gpt-api-with-a-web-application-for-data-analysis](https://www.omnimes.com/en/blog/practical-application-of-ai-assistant-integration-of-openai-s-gpt-api-with-a-web-application-for-data-analysis)

![Settings for the AI model in the Omnimes system](/images/image-U0Nj.png)

Currently, within the Omnimes system, we have the option to choose whether to use external AI, specifically the API from OpenAI, or internal AI, which is Ollama.

Once the AI type is selected, in the case of Ollama AI, we can choose the specific AI model.

The number of available models depends on the models downloaded onto the Ollama server. Additionally, we have the option to add our own model, ensuring it is saved in a format compatible with Ollama software.

Below is an overview of data analysis from the summary located on the main panel of the Omnimes system.

![Dashboard in the Omnimes system](/images/redash3-c1Nz.png)

*Analysis result by GPT-3.5*

![Analysis result by GPT-3.5](/images/image-I2Mj.png)

*Analysis result by Llama3*

![Analysis result by Llama3](/images/image-kxNT.png)

As we can see, the logical syntax of the local Llama3 model is very good and comparable to GPT-3.5. It's worth noting that the Llama3 model itself weighs only 4.5 GB, whereas the GPT-2 XL model weighs 6 GB. The weight of the GPT-3.5 model has not been publicly disclosed.

## Summary

As we can see, using local AI provided by **Ollama** software does not lag behind using external **Open AI** servers through their API in any way.

This gives us significant capabilities, albeit hardware and therefore financial constraints apply, as the performance of the AI depends solely on the hardware we use. The **Llama3** model also offers a **larger version, Llama3:70b, but this model weighs 40 GB**, requiring more than a single graphics card to operate.

However, utilizing **Ollama** for enterprise needs in systems like **Omnimes**, which focuses on production execution, is a good approach and addresses the **strict security policies of the enterprise**, such as **inability to connect production data systems to external servers or even lack of external internet in the production facility**.

Additionally, we benefit from an AI model that is less susceptible to external world misinformation, thereby reducing the risk of hallucinations or false outputs.

If you are interested in our solution for your machinery park or production floor to enhance production processes using modern data collection and analysis methods, I invite you to explore our system's offerings [Omnimes](https://omnimes.com/en/offer)

 