/**
 * Google Search Console audit toolkit for omnimes.com.
 *
 * Auth: OAuth 2.0 user flow against Desktop app client. The client config
 * lives at ~/.gsc/oauth-client.json (downloaded from GCP). On first run a
 * browser tab opens for consent; refresh token is cached at
 * ~/.gsc/oauth-token.json and reused thereafter.
 *
 * Usage:
 *   npx tsx scripts/gsc.ts auth             — run once to authorize browser
 *   npx tsx scripts/gsc.ts sites            — list properties the user can see
 *   npx tsx scripts/gsc.ts top [days]       — top pages by clicks (default 28d)
 *   npx tsx scripts/gsc.ts queries [days]   — top search queries
 *   npx tsx scripts/gsc.ts sitemaps         — sitemap statuses
 *   npx tsx scripts/gsc.ts inspect <url>    — URL inspection (indexing status)
 *   npx tsx scripts/gsc.ts audit            — full audit, dump to gsc-data/
 *
 * Site identifier is auto-discovered. Override with GSC_SITE
 * (e.g. GSC_SITE='sc-domain:omnimes.com' or 'https://omnimes.com/').
 */
import { google, searchconsole_v1 } from "googleapis"
import { OAuth2Client } from "google-auth-library"
import { mkdir, readFile, writeFile } from "fs/promises"
import { existsSync } from "fs"
import { homedir } from "os"
import { join } from "path"
import { createServer } from "http"
import { exec } from "child_process"
import { AddressInfo } from "net"

const CLIENT_FILE = process.env.GSC_OAUTH_CLIENT || join(homedir(), ".gsc", "oauth-client.json")
const TOKEN_FILE = process.env.GSC_OAUTH_TOKEN || join(homedir(), ".gsc", "oauth-token.json")
const SITE_OVERRIDE = process.env.GSC_SITE
const DATA_DIR = join(process.cwd(), "gsc-data")
const SCOPES = [
  "https://www.googleapis.com/auth/webmasters",
  "https://www.googleapis.com/auth/webmasters.readonly",
]

type ClientSecrets = {
  installed?: { client_id: string; client_secret: string; redirect_uris?: string[] }
  web?: { client_id: string; client_secret: string; redirect_uris?: string[] }
}

async function loadClient(): Promise<{ client_id: string; client_secret: string }> {
  const raw = JSON.parse(await readFile(CLIENT_FILE, "utf8")) as ClientSecrets
  const c = raw.installed ?? raw.web
  if (!c) throw new Error(`Invalid OAuth client file at ${CLIENT_FILE}`)
  return { client_id: c.client_id, client_secret: c.client_secret }
}

async function authorize(): Promise<OAuth2Client> {
  const { client_id, client_secret } = await loadClient()

  // Reuse cached token if present.
  if (existsSync(TOKEN_FILE)) {
    const tokens = JSON.parse(await readFile(TOKEN_FILE, "utf8"))
    const oauth = new OAuth2Client({ clientId: client_id, clientSecret: client_secret })
    oauth.setCredentials(tokens)
    // Persist updated tokens automatically when googleapis refreshes them.
    oauth.on("tokens", async (t) => {
      const merged = { ...tokens, ...t }
      await writeFile(TOKEN_FILE, JSON.stringify(merged, null, 2))
    })
    return oauth
  }

  // First-time flow: spin up loopback server on a free port, open browser.
  return await new Promise<OAuth2Client>((resolve, reject) => {
    let redirectUri = ""
    const server = createServer(async (req, res) => {
      try {
        if (!req.url) return
        const url = new URL(req.url, `http://localhost`)
        const code = url.searchParams.get("code")
        const error = url.searchParams.get("error")
        if (error) {
          res.end(`Auth failed: ${error}. You can close this tab.`)
          server.close()
          return reject(new Error(`OAuth error: ${error}`))
        }
        if (!code) return
        res.end("Auth complete. You can close this tab and return to the terminal.")

        const oauth = new OAuth2Client({
          clientId: client_id,
          clientSecret: client_secret,
          redirectUri,
        })
        const { tokens } = await oauth.getToken(code)
        server.close()
        if (!tokens.refresh_token) {
          console.warn(
            "Warning: no refresh_token returned. Revoke the client at https://myaccount.google.com/permissions and re-run."
          )
        }
        oauth.setCredentials(tokens)
        await mkdir(join(homedir(), ".gsc"), { recursive: true })
        await writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2))
        console.log(`Token saved to ${TOKEN_FILE}`)
        resolve(oauth)
      } catch (err) {
        reject(err)
      }
    })
    server.listen(0, () => {
      const port = (server.address() as AddressInfo).port
      redirectUri = `http://localhost:${port}`
      const oauth = new OAuth2Client({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri,
      })
      const authUrl = oauth.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: SCOPES,
      })
      console.log("\nOpening browser for Google sign-in...")
      console.log("If it doesn't open automatically, paste this URL:\n")
      console.log(authUrl)
      console.log("")
      const opener =
        process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open"
      exec(`${opener} "${authUrl}"`)
    })
  })
}

async function client(): Promise<searchconsole_v1.Searchconsole> {
  const auth = await authorize()
  return google.searchconsole({ version: "v1", auth })
}

async function pickSite(sc: searchconsole_v1.Searchconsole): Promise<string> {
  if (SITE_OVERRIDE) return SITE_OVERRIDE
  const { data } = await sc.sites.list()
  const sites = data.siteEntry ?? []
  if (sites.length === 0) {
    throw new Error("Zero sites visible. Add the user to a GSC property first.")
  }
  const omnimes = sites.find((s) => (s.siteUrl ?? "").toLowerCase().includes("omnimes"))
  if (!omnimes?.siteUrl) {
    throw new Error(
      `No omnimes property visible. Available: ${sites.map((s) => s.siteUrl).join(", ")}`
    )
  }
  return omnimes.siteUrl
}

function rangeDays(days: number) {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - days)
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  }
}

async function cmdAuth() {
  await authorize()
  console.log("OK — authorized.")
}

async function cmdSites() {
  const sc = await client()
  const { data } = await sc.sites.list()
  console.log(JSON.stringify(data.siteEntry ?? [], null, 2))
}

async function cmdTop(days = 28) {
  const sc = await client()
  const siteUrl = await pickSite(sc)
  const { data } = await sc.searchanalytics.query({
    siteUrl,
    requestBody: {
      ...rangeDays(days),
      dimensions: ["page"],
      rowLimit: 50,
    },
  })
  const rows = data.rows ?? []
  console.log(`Site: ${siteUrl}  |  Window: ${days}d  |  ${rows.length} pages`)
  console.table(
    rows.slice(0, 30).map((r) => ({
      page: (r.keys?.[0] ?? "").replace("https://omnimes.com", "").slice(0, 70),
      clicks: r.clicks,
      impr: r.impressions,
      ctr: ((r.ctr ?? 0) * 100).toFixed(1) + "%",
      pos: (r.position ?? 0).toFixed(1),
    }))
  )
}

async function cmdQueries(days = 28) {
  const sc = await client()
  const siteUrl = await pickSite(sc)
  const { data } = await sc.searchanalytics.query({
    siteUrl,
    requestBody: {
      ...rangeDays(days),
      dimensions: ["query"],
      rowLimit: 50,
    },
  })
  console.table(
    (data.rows ?? []).slice(0, 30).map((r) => ({
      query: r.keys?.[0],
      clicks: r.clicks,
      impr: r.impressions,
      ctr: ((r.ctr ?? 0) * 100).toFixed(1) + "%",
      pos: (r.position ?? 0).toFixed(1),
    }))
  )
}

async function cmdSitemaps() {
  const sc = await client()
  const siteUrl = await pickSite(sc)
  const { data } = await sc.sitemaps.list({ siteUrl })
  const items = data.sitemap ?? []
  console.log(`Site: ${siteUrl}  |  ${items.length} sitemaps`)
  console.table(
    items.map((s) => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted?.slice(0, 10),
      lastDownloaded: s.lastDownloaded?.slice(0, 10),
      isPending: s.isPending,
      errors: s.errors,
      warnings: s.warnings,
    }))
  )
}

async function cmdInspect(url: string) {
  const sc = await client()
  const siteUrl = await pickSite(sc)
  const { data } = await sc.urlInspection.index.inspect({
    requestBody: { inspectionUrl: url, siteUrl, languageCode: "pl-PL" },
  })
  console.log(JSON.stringify(data.inspectionResult, null, 2))
}

async function cmdAudit() {
  await mkdir(DATA_DIR, { recursive: true })
  const sc = await client()
  const siteUrl = await pickSite(sc)
  const stamp = new Date().toISOString().slice(0, 10)
  console.log(`Auditing ${siteUrl} → ${DATA_DIR}/audit-${stamp}.json`)

  const days = 90
  const [topPages, topQueries, sitemaps, deviceBreak] = await Promise.all([
    sc.searchanalytics.query({
      siteUrl,
      requestBody: { ...rangeDays(days), dimensions: ["page"], rowLimit: 1000 },
    }),
    sc.searchanalytics.query({
      siteUrl,
      requestBody: { ...rangeDays(days), dimensions: ["query"], rowLimit: 200 },
    }),
    sc.sitemaps.list({ siteUrl }),
    sc.searchanalytics.query({
      siteUrl,
      requestBody: { ...rangeDays(days), dimensions: ["device"], rowLimit: 10 },
    }),
  ])

  const dump = {
    site: siteUrl,
    generatedAt: new Date().toISOString(),
    windowDays: days,
    topPages: topPages.data.rows ?? [],
    topQueries: topQueries.data.rows ?? [],
    sitemaps: sitemaps.data.sitemap ?? [],
    deviceBreakdown: deviceBreak.data.rows ?? [],
  }
  const out = join(DATA_DIR, `audit-${stamp}.json`)
  await writeFile(out, JSON.stringify(dump, null, 2))
  console.log(`Wrote ${out}`)
  console.log(
    `Summary: ${dump.topPages.length} pages, ${dump.topQueries.length} queries, ${dump.sitemaps.length} sitemaps`
  )
}

const [, , cmd, ...rest] = process.argv
;(async () => {
  try {
    switch (cmd) {
      case "auth":
        await cmdAuth()
        break
      case "sites":
        await cmdSites()
        break
      case "top":
        await cmdTop(rest[0] ? Number(rest[0]) : 28)
        break
      case "queries":
        await cmdQueries(rest[0] ? Number(rest[0]) : 28)
        break
      case "sitemaps":
        await cmdSitemaps()
        break
      case "inspect":
        if (!rest[0]) throw new Error("Usage: gsc inspect <url>")
        await cmdInspect(rest[0])
        break
      case "audit":
        await cmdAudit()
        break
      default:
        console.error(
          "Commands: auth | sites | top [days] | queries [days] | sitemaps | inspect <url> | audit"
        )
        process.exit(2)
    }
  } catch (err: any) {
    console.error("ERROR:", err?.message ?? err)
    if (err?.response?.data) console.error(JSON.stringify(err.response.data, null, 2))
    process.exit(1)
  }
})()
