/**
 * Jev SEO toolkit for omnimes.com.
 *
 * Jev (TypeSafe) returns typed decisions with probabilities and writes no text,
 * so it only finds what to fix. It runs through DigitalOcean Serverless
 * Inference and reads MODEL_ACCESS_KEY from the environment or .env.local.
 * Nothing here runs on the site: results land in gsc-data/jev/.
 *
 * Usage:
 *   npx tsx scripts/jev-seo.ts links-check     — report blog links without a locale or with a dead target
 *   npx tsx scripts/jev-seo.ts links-fix       — rewrite those links to /<lang>/blog/<slug>
 *   npx tsx scripts/jev-seo.ts pairs [--lang pl] [--top 8] [--limit 50] [--concurrency 6]
 *                                              — link and overlap decisions for similar post pairs
 *   npx tsx scripts/jev-seo.ts queries <file> [--min-impressions 5] [--limit 50]
 *                                              — does the page answer the query (file from `gsc.ts pairs`)
 *   npx tsx scripts/jev-seo.ts home [--site https://www.omnimes.com]
 *                                              — score every home page section, PL and EN
 *   npx tsx scripts/jev-seo.ts variants <file> — score copy variants: [{ id, lang, text }]
 *   npx tsx scripts/jev-seo.ts ask <file>      — any typed decisions: [{ id, state, questions }]
 */
import { appendFile, mkdir, readdir, readFile, writeFile } from "fs/promises"
import { join } from "path"
import { config } from "dotenv"
import matter from "gray-matter"

config({ path: ".env.local" })

const ENDPOINT = "https://inference.do-ai.run/v1/systemone"
const MODEL = "typesafe-jev-1.13.0"
const USD_PER_MILLION_INPUT_TOKENS = 0.042
const POSTS_DIR = join(process.cwd(), "outstatic", "content", "posts")
const OUT_DIR = join(process.cwd(), "gsc-data", "jev")
const LANGS = ["pl", "en"] as const

type Lang = (typeof LANGS)[number]

type Post = {
  file: string
  raw: string
  slug: string
  lang: Lang
  title: string
  description: string
  tags: string[]
  publishedAt: string
  headings: string[]
  lead: string
  links: Set<string>
}

type Answer = {
  type: string
  noul?: number
  score?: number
  choice?: string
  confidence?: number
  probabilities?: Record<string, number>
}

type Decision = { answers: Record<string, Answer>; inputTokens: number; ms: number }

const STOPWORDS = new Set(
  (
    "oraz jest jako przez przy dla nie tak aby lub czy które który która tego tym tych się może " +
    "this that with from have will your what when which their about into more than they them " +
    "omnimes system systemu systemy systems"
  ).split(" ")
)

function flag(args: string[], name: string, fallback: number): number {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? Number(args[i + 1]) : fallback
}

function flagText(args: string[], name: string): string | undefined {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : undefined
}

function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^#{1,6} .*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

async function loadPosts(): Promise<Post[]> {
  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"))
  const posts: Post[] = []
  for (const name of files) {
    const file = join(POSTS_DIR, name)
    const raw = await readFile(file, "utf8")
    const { data, content } = matter(raw)
    if (data.status !== "published" || !LANGS.includes(data.lang)) continue
    posts.push({
      file,
      raw,
      slug: data.slug,
      lang: data.lang,
      title: data.title,
      description: data.description ?? "",
      tags: (data.tags ?? []).map((t: { label: string }) => t.label),
      publishedAt: String(data.publishedAt),
      headings: [...content.matchAll(/^#{2,3} (.+)$/gm)].map((m) => m[1].trim()),
      lead: plainText(content).slice(0, 700),
      links: new Set(
        [
          ...content.matchAll(
            /\]\((?:https:\/\/www\.omnimes\.com)?\/(?:(?:pl|en)\/)?blog\/([a-z0-9-]+)/g
          ),
        ].map((m) => m[1])
      ),
    })
  }
  return posts
}

function tokens(text: string): string[] {
  return (text.toLowerCase().match(/[\p{L}\p{N}]{4,}/gu) ?? [])
    .filter((t) => !STOPWORDS.has(t))
    .map((t) => t.slice(0, 7))
}

function postTokens(post: Post): string[] {
  return [
    ...tokens(post.title),
    ...tokens(post.title),
    ...tokens(post.title),
    ...tokens(post.tags.join(" ")),
    ...tokens(post.tags.join(" ")),
    ...tokens(post.description),
    ...tokens(post.headings.join(" ")),
  ]
}

/** Top similar posts per post by TF-IDF cosine. Keeps Jev calls to pairs worth asking about. */
function candidatePairs(posts: Post[], top: number) {
  const docs = posts.map(postTokens)
  const df = new Map<string, number>()
  for (const doc of docs) for (const t of new Set(doc)) df.set(t, (df.get(t) ?? 0) + 1)

  const vectors = docs.map((doc) => {
    const tf = new Map<string, number>()
    for (const t of doc) tf.set(t, (tf.get(t) ?? 0) + 1)
    const vector = new Map<string, number>()
    let norm = 0
    for (const [t, n] of tf) {
      const weight = n * Math.log(posts.length / (df.get(t) ?? 1))
      vector.set(t, weight)
      norm += weight * weight
    }
    for (const [t, w] of vector) vector.set(t, w / (Math.sqrt(norm) || 1))
    return vector
  })

  const similarity = (a: Map<string, number>, b: Map<string, number>) => {
    let sum = 0
    for (const [t, w] of a) sum += w * (b.get(t) ?? 0)
    return sum
  }

  const seen = new Map<string, { a: Post; b: Post; similarity: number }>()
  posts.forEach((post, i) => {
    posts
      .map((other, j) => ({ j, score: i === j ? -1 : similarity(vectors[i], vectors[j]) }))
      .sort((x, y) => y.score - x.score)
      .slice(0, top)
      .forEach(({ j, score }) => {
        const key = [Math.min(i, j), Math.max(i, j)].join(":")
        if (!seen.has(key)) seen.set(key, { a: posts[i], b: posts[j], similarity: score })
      })
  })
  return [...seen.values()]
}

async function decide(
  state: unknown,
  questions: Record<string, unknown>,
  attempt = 1
): Promise<Decision> {
  const key = process.env.MODEL_ACCESS_KEY
  if (!key) throw new Error("Missing MODEL_ACCESS_KEY (environment or .env.local)")

  const started = Date.now()
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, state, questions }),
  }).catch(() => null)

  if (!res || res.status === 429 || res.status >= 500) {
    if (attempt >= 4) throw new Error(`Jev unavailable after ${attempt} attempts`)
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt))
    return decide(state, questions, attempt + 1)
  }
  if (!res.ok) throw new Error(`Jev ${res.status}: ${(await res.text()).slice(0, 200)}`)

  const body = await res.json()
  return {
    answers: body.answers,
    inputTokens: body.usage?.input_tokens ?? 0,
    ms: Date.now() - started,
  }
}

function pairQuestions(lang: Lang) {
  const pl = lang === "pl"
  return {
    a_links_to_b: {
      type: "noul",
      instructions: pl
        ? "Czytelnik post_a skorzystałby z linku do post_b, bo post_b rozwija coś, o czym mówi post_a."
        : "A reader of post_a would benefit from a link to post_b because post_b expands on something post_a covers.",
    },
    b_links_to_a: {
      type: "noul",
      instructions: pl
        ? "Czytelnik post_b skorzystałby z linku do post_a, bo post_a rozwija coś, o czym mówi post_b."
        : "A reader of post_b would benefit from a link to post_a because post_a expands on something post_b covers.",
    },
    relation: {
      type: "choice",
      instructions: pl ? "Jak te dwa posty mają się do siebie?" : "How do these two posts relate?",
      criteria: {
        same_intent: pl
          ? "Oba odpowiadają na to samo pytanie czytelnika i konkurują w wyszukiwarce o te same frazy."
          : "Both answer the same reader question and compete in search for the same phrases.",
        same_topic: pl
          ? "Ten sam temat, ale inne pytanie, inny odbiorca albo inny okres."
          : "Same topic, but a different question, audience or period.",
        related: pl
          ? "Różne tematy z sensownym powiązaniem."
          : "Different topics with a meaningful connection.",
        unrelated: pl ? "Brak sensownego powiązania." : "No meaningful connection.",
      },
    },
  }
}

function postState(post: Post) {
  return {
    title: post.title,
    description: post.description,
    tags: post.tags,
    headings: post.headings.slice(0, 12),
    lead: post.lead,
  }
}

class Run {
  done = 0
  errors = 0
  inputTokens = 0
  totalMs = 0
  started = new Date().toISOString()

  constructor(
    private phase: string,
    private total: number
  ) {}

  record(decision: Decision) {
    this.done += 1
    this.inputTokens += decision.inputTokens
    this.totalMs += decision.ms
  }

  summary() {
    return {
      phase: this.phase,
      done: this.done,
      total: this.total,
      errors: this.errors,
      inputTokens: this.inputTokens,
      costUsd: Number(((this.inputTokens / 1e6) * USD_PER_MILLION_INPUT_TOKENS).toFixed(4)),
      avgMs: this.done ? Math.round(this.totalMs / this.done) : 0,
      model: MODEL,
      startedAt: this.started,
      updatedAt: new Date().toISOString(),
    }
  }

  async save() {
    await writeFile(join(OUT_DIR, "progress.json"), JSON.stringify(this.summary(), null, 2))
  }
}

async function pool<T>(items: T[], size: number, work: (item: T) => Promise<void>) {
  let next = 0
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (next < items.length) await work(items[next++])
    })
  )
}

async function cmdPairs(args: string[]) {
  await mkdir(OUT_DIR, { recursive: true })
  const onlyLang = flagText(args, "lang") as Lang | undefined
  const top = flag(args, "top", 8)
  const limit = flag(args, "limit", Infinity)
  const concurrency = flag(args, "concurrency", 6)

  const posts = await loadPosts()
  const pairs = LANGS.filter((lang) => !onlyLang || lang === onlyLang)
    .flatMap((lang) =>
      candidatePairs(
        posts.filter((p) => p.lang === lang),
        top
      )
    )
    .slice(0, limit)

  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")
  const out = join(OUT_DIR, `pairs-${stamp}.jsonl`)
  const run = new Run("pairs", pairs.length)
  console.log(`${posts.length} posts → ${pairs.length} pairs → ${out}`)

  await pool(pairs, concurrency, async ({ a, b, similarity }) => {
    try {
      const decision = await decide(
        { post_a: postState(a), post_b: postState(b) },
        pairQuestions(a.lang)
      )
      run.record(decision)
      const { a_links_to_b: ab, b_links_to_a: ba, relation } = decision.answers
      await appendFile(
        out,
        JSON.stringify({
          lang: a.lang,
          a: a.slug,
          b: b.slug,
          aTitle: a.title,
          bTitle: b.title,
          similarity: Number(similarity.toFixed(3)),
          linkAtoB: ab.noul,
          linkBtoA: ba.noul,
          alreadyAtoB: a.links.has(b.slug),
          alreadyBtoA: b.links.has(a.slug),
          relation: relation.choice,
          relationConfidence: relation.confidence,
          relationProbabilities: relation.probabilities,
          ms: decision.ms,
        }) + "\n"
      )
    } catch (err: any) {
      run.errors += 1
      console.error(`${a.slug} × ${b.slug}: ${err.message}`)
    }
    if (run.done % 25 === 0) await run.save()
  })

  await run.save()
  console.log(JSON.stringify(run.summary(), null, 2))
}

async function cmdQueries(args: string[]) {
  const [file] = args
  if (!file) throw new Error("Usage: jev-seo queries <file from gsc.ts pairs>")
  await mkdir(OUT_DIR, { recursive: true })
  const minImpressions = flag(args, "min-impressions", 5)
  const limit = flag(args, "limit", Infinity)
  const concurrency = flag(args, "concurrency", 6)

  const posts = await loadPosts()
  const bySlug = new Map(posts.map((p) => [`${p.lang}/${p.slug}`, p]))
  const { rows } = JSON.parse(await readFile(file, "utf8"))

  const jobs = rows
    .filter((r: { impressions: number }) => r.impressions >= minImpressions)
    .map((r: { page: string }) => {
      const match = r.page.match(/\/(pl|en)\/blog\/([a-z0-9-]+)/)
      return { row: r, post: match ? bySlug.get(`${match[1]}/${match[2]}`) : undefined }
    })
    .filter((job: { post?: Post }) => job.post)
    .slice(0, limit)

  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")
  const out = join(OUT_DIR, `queries-${stamp}.jsonl`)
  const run = new Run("queries", jobs.length)
  console.log(`${rows.length} rows → ${jobs.length} query-page pairs → ${out}`)

  await pool(jobs, concurrency, async ({ row, post }: { row: any; post: Post }) => {
    const pl = post.lang === "pl"
    try {
      const decision = await decide(
        { search_query: row.query, page: postState(post) },
        {
          answers_query: {
            type: "noul",
            instructions: pl
              ? "Ta strona dobrze odpowiada na to, czego szuka osoba wpisująca search_query."
              : "This page answers well what the person typing search_query is looking for.",
          },
          intent: {
            type: "choice",
            instructions: pl
              ? "Jaka jest intencja search_query?"
              : "What is the intent of search_query?",
            criteria: {
              learn: pl ? "Chce się czegoś dowiedzieć." : "Wants to learn something.",
              compare: pl
                ? "Porównuje rozwiązania lub dostawców."
                : "Compares solutions or vendors.",
              buy: pl
                ? "Szuka produktu lub wdrożenia do kupienia."
                : "Looks for a product or implementation to buy.",
              brand: pl
                ? "Szuka konkretnej marki lub firmy."
                : "Looks for a specific brand or company.",
            },
          },
        }
      )
      run.record(decision)
      await appendFile(
        out,
        JSON.stringify({
          ...row,
          lang: post.lang,
          slug: post.slug,
          title: post.title,
          answersQuery: decision.answers.answers_query.noul,
          intent: decision.answers.intent.choice,
          intentConfidence: decision.answers.intent.confidence,
          ms: decision.ms,
        }) + "\n"
      )
    } catch (err: any) {
      run.errors += 1
      console.error(`${row.query}: ${err.message}`)
    }
    if (run.done % 25 === 0) await run.save()
  })

  await run.save()
  console.log(JSON.stringify(run.summary(), null, 2))
}

function homeReader(lang: Lang) {
  return lang === "pl"
    ? "Strona główna OmniMES. Czytelnik to kierownik produkcji, utrzymania ruchu lub energetyk w zakładzie produkcyjnym, który trafił tu pierwszy raz i nie zna tych nazw."
    : "OmniMES home page. The reader is a production, maintenance or energy manager at a factory who landed here for the first time and does not know these names."
}

function homeQuestions(lang: Lang) {
  const pl = lang === "pl"
  return {
    clarity: {
      type: "score",
      instructions: pl
        ? "Jak jasno ta sekcja mówi, co czytelnik dostaje?"
        : "How clearly does this section say what the reader gets?",
      criteria: pl
        ? ["niejasne", "ogólne", "dość jasne", "całkowicie jasne"]
        : ["unclear", "vague", "fairly clear", "fully clear"],
    },
    concreteness: {
      type: "score",
      instructions: pl ? "Jak konkretna jest ta sekcja?" : "How concrete is this section?",
      criteria: pl
        ? ["same hasła", "mało konkretów", "kilka konkretów", "funkcje, liczby i przykłady"]
        : ["slogans only", "few specifics", "some specifics", "features, numbers and examples"],
    },
    proof: {
      type: "noul",
      instructions: pl
        ? "Sekcja podaje dowód: wynik z wdrożenia, nazwę klienta albo sposób samodzielnego sprawdzenia."
        : "The section gives proof: a deployment result, a customer name or a way to verify it yourself.",
    },
    problem: {
      type: "noul",
      instructions: pl
        ? "Czytelnik rozumie, jaki problem jego zakładu to rozwiązuje."
        : "The reader understands which problem of their factory this solves.",
    },
    next_step: {
      type: "noul",
      instructions: pl
        ? "Po tej sekcji czytelnik wie, co może zrobić dalej."
        : "After this section the reader knows what to do next.",
    },
    jargon: {
      type: "noul",
      instructions: pl
        ? "Sekcja używa nazw własnych lub żargonu bez objaśnienia."
        : "The section uses product names or jargon without explaining them.",
    },
  }
}

function homeSections(html: string) {
  const main = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .split(/<footer\b/)[0]
  const decode = (text: string) =>
    text
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim()
  const parts = main.split(/(?=<h[12]\b)/).slice(1)
  return parts.map((part) => {
    const heading = decode(part.match(/<h[12]\b[^>]*>([\s\S]*?)<\/h[12]>/)?.[1] ?? "")
    const lines = part.split(/(?=<(?:h3|p|li|a|button)\b)/).map(decode)
    const text = [...new Set(lines)].filter(Boolean).join(" ").slice(0, 2500)
    return { heading, text }
  })
}

async function cmdHome(args: string[]) {
  await mkdir(OUT_DIR, { recursive: true })
  const site = flagText(args, "site") ?? "https://www.omnimes.com"
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")
  const rows: Record<string, unknown>[] = []

  for (const lang of LANGS) {
    const html = await (await fetch(`${site}/${lang}`)).text()
    const sections = homeSections(html)
    const run = new Run(`home-${lang}`, sections.length)
    await pool(
      sections.map((section, index) => ({ section, index })),
      4,
      async ({ section, index }) => {
        const decision = await decide({ page: homeReader(lang), section }, homeQuestions(lang))
        run.record(decision)
        const a = decision.answers
        rows.push({
          lang,
          index,
          heading: section.heading,
          clarity: a.clarity.score,
          concreteness: a.concreteness.score,
          proof: a.proof.noul,
          problem: a.problem.noul,
          nextStep: a.next_step.noul,
          jargon: a.jargon.noul,
        })
      }
    )
    await run.save()
    console.log(JSON.stringify(run.summary()))
  }

  rows.sort(
    (a, b) => String(a.lang).localeCompare(String(b.lang)) || Number(a.index) - Number(b.index)
  )
  const out = join(OUT_DIR, `home-${stamp}.json`)
  await writeFile(out, JSON.stringify(rows, null, 2))
  console.table(rows)
  console.log(`Wrote ${out}`)
}

/** Scores copy variants from a JSON file: [{ id, lang, text }]. Claude writes them, Jev ranks them. */
async function cmdVariants(args: string[]) {
  const [file] = args
  if (!file) throw new Error("Usage: jev-seo variants <file>")
  await mkdir(OUT_DIR, { recursive: true })
  const variants: { id: string; lang: Lang; text: string }[] = JSON.parse(
    await readFile(file, "utf8")
  )
  const rows: Record<string, unknown>[] = []
  await pool(variants, 4, async (variant) => {
    const pl = variant.lang === "pl"
    const decision = await decide(
      { page: homeReader(variant.lang), first_screen: variant.text },
      {
        ...homeQuestions(variant.lang),
        product: {
          type: "choice",
          instructions: pl ? "Co ta firma sprzedaje?" : "What does this company sell?",
          criteria: {
            mes: pl
              ? "System MES do nadzoru produkcji w zakładzie."
              : "A MES for supervising factory production.",
            energy: pl ? "Narzędzie do zarządzania energią." : "An energy management tool.",
            ai: pl ? "Asystenta AI." : "An AI assistant.",
            unclear: pl ? "Nie wiadomo." : "Cannot tell.",
          },
        },
      }
    )
    const a = decision.answers
    rows.push({
      id: variant.id,
      lang: variant.lang,
      clarity: a.clarity.score,
      concreteness: a.concreteness.score,
      problem: a.problem.noul,
      nextStep: a.next_step.noul,
      jargon: a.jargon.noul,
      product: a.product.choice,
      productConfidence: a.product.confidence,
    })
  })
  rows.sort((a, b) => String(a.id).localeCompare(String(b.id)))
  console.table(rows)
  await writeFile(join(OUT_DIR, "variants.json"), JSON.stringify(rows, null, 2))
}

/** Any typed decisions from a JSON file: [{ id, state, questions }]. */
async function cmdAsk(args: string[]) {
  const [file] = args
  if (!file) throw new Error("Usage: jev-seo ask <file>")
  const items: { id: string; state: unknown; questions: Record<string, unknown> }[] = JSON.parse(
    await readFile(file, "utf8")
  )
  const rows: Record<string, unknown>[] = []
  await pool(items, 4, async (item) => {
    const { answers } = await decide(item.state, item.questions)
    const values = Object.entries(answers).map(([name, a]) => [name, a.noul ?? a.score ?? a.choice])
    rows.push({ id: item.id, ...Object.fromEntries(values) })
  })
  rows.sort((a, b) => String(a.id).localeCompare(String(b.id)))
  console.table(rows)
}

/**
 * The site always prefixes the locale, so /blog/x is a 307 that resolves by
 * cookie or Accept-Language. Crawlers land on Polish, which sends English
 * posts' links through two redirects to the Polish translation.
 */
async function fixLinks(apply: boolean) {
  const posts = await loadPosts()
  const byKey = new Map(posts.map((p) => [`${p.lang}/${p.slug}`, p]))
  const sameLang = (source: Post, slug: string) => {
    if (byKey.has(`${source.lang}/${slug}`)) return slug
    const other = posts.find((p) => p.slug === slug)
    if (!other) return null
    return (
      posts.find((p) => p.lang === source.lang && p.publishedAt === other.publishedAt)?.slug ?? null
    )
  }

  let rewritten = 0
  let dead = 0
  for (const post of posts) {
    const next = post.raw.replace(
      /\]\(\/blog\/([a-z0-9-]+)([#?][^)]*)?\)/g,
      (whole, slug, rest = "") => {
        const target = sameLang(post, slug)
        if (!target) {
          dead += 1
          console.log(`dead: ${post.lang}/${post.slug} → ${slug}`)
          return whole
        }
        rewritten += 1
        if (target !== slug)
          console.log(`translated: ${post.lang}/${post.slug}: ${slug} → ${target}`)
        return `](/${post.lang}/blog/${target}${rest})`
      }
    )
    if (apply && next !== post.raw) await writeFile(post.file, next)
  }
  console.log(`${apply ? "rewrote" : "would rewrite"} ${rewritten} links, ${dead} dead`)
}

const [, , cmd, ...rest] = process.argv
;(async () => {
  try {
    switch (cmd) {
      case "links-check":
        await fixLinks(false)
        break
      case "links-fix":
        await fixLinks(true)
        break
      case "pairs":
        await cmdPairs(rest)
        break
      case "queries":
        await cmdQueries(rest)
        break
      case "home":
        await cmdHome(rest)
        break
      case "variants":
        await cmdVariants(rest)
        break
      case "ask":
        await cmdAsk(rest)
        break
      default:
        console.error(
          "Commands: links-check | links-fix | pairs | queries <file> | home | variants <file> | ask <file>"
        )
        process.exit(2)
    }
  } catch (err: any) {
    console.error("ERROR:", err?.message ?? err)
    process.exit(1)
  }
})()
