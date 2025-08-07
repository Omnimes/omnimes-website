import { getLocalePrimaryDialects } from "@/data/locales"
import { Button, Link } from "@nextui-org/react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import Image from "next/image"

import { genPageMetadata } from "@/app/seo"
import { DescriptionPrimary } from "@/components/ui/Description"
import { Heading } from "@/components/ui/Heading"
import { SubtitleNormal } from "@/components/ui/Subtitle"

type Data = {
  count: number
  next: unknown | null
  previous: unknown | null
  results: {
    id: number
    period: number
    machine: number
    price: number
    archive: number
  }[]
}

interface MachineRow {
  key: string
  machine: string
  period3: string
  period6: string
  period9: string
  period12: string
}
export const revalidate = 3600
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "OfferMeta" })
  const title = t("title")
  const description = t("desc")
  const keywords = t("keywords")
  const localeShort = getLocalePrimaryDialects(locale)
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  return genPageMetadata(obj)
}

async function getData(): Promise<Data> {
  const token = process.env.API_TOKEN

  if (!token) {
    console.warn("Brak API_TOKEN – zwracam mockowane dane")
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }
  }

  const res = await fetch(
    "https://licencje.eomni.pl/package-price/?limit=20&offset=0&ordering=period",
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  )

  if (!res.ok) {
    const errText = await res.text()
    console.error("Błąd pobierania package-price:", res.status, errText)
    throw new Error("Failed to fetch data from package-price")
  }

  return res.json()
}


async function getSettings() {
  const token = process.env.API_TOKEN

  if (!token) {
    console.warn("Brak API_TOKEN – zwracam mockowane ustawienia")
    return {
      results: [
        {
          data: JSON.stringify({
            base: 100,
            currency: "PLN",
            base_eu: 25,
            currency_eu: "EUR",
            base_usd: 25,
            currency_us: "USD",
          }),
        },
      ],
    }
  }

  const res = await fetch("https://licencje.eomni.pl/settings/", {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error("Błąd pobierania settings:", res.status, errText)
    throw new Error("Failed to fetch data from settings")
  }

  return res.json()
}


export default async function OfferPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Offer")

  const data: Data = await getData()
  const settings = await getSettings()

  const price = {
    base: JSON.parse(settings.results[0].data)["base"] || 100,
    currency: JSON.parse(settings.results[0].data)["currency"] || "PLN",
    base_eu: JSON.parse(settings.results[0].data)["base_eu"] || 25,
    currency_eu: JSON.parse(settings.results[0].data)["currency_eu"] || "EUR",
    base_usd: JSON.parse(settings.results[0].data)["base_usd"] || 25,
    currency_us: JSON.parse(settings.results[0].data)["currency_us"] || "USD",
  }

  const periods = Array.from(new Set(data.results.map((item) => item.period))).sort((a, b) => a - b)
  const columns = periods.map((period) => ({
    key: `period${period}`,
    label: period + " " + t("message", { count: period }),
  }))
  columns.unshift({ key: "machine", label: t("howMany") })

  const rows: Record<string, MachineRow> = {}

  data.results.forEach((item) => {
    if (!rows[item.machine]) {
      const startCountMachine: number = item.machine == 30 ? item.machine - 14 : item.machine - 4
      rows[item.machine] = {
        key: item.machine.toString(),
        machine: t("machineDesc", { startMachine: startCountMachine, machine: item.machine }),
        period3: "",
        period6: "",
        period9: "",
        period12: "",
      }
    }

    const periodKey = `period${item.period}` as keyof MachineRow
    if (locale == "pl") {
      rows[item.machine][periodKey] =
        (item.price * price.base).toFixed(2).toString() +
        " " +
        price.currency +
        " " +
        t("perMachine")
    } else if (locale == "de") {
      rows[item.machine][periodKey] =
        (item.price * price.base_eu).toFixed(2).toString() +
        " " +
        price.currency_eu +
        " " +
        t("perMachine")
    } else {
      rows[item.machine][periodKey] =
        (item.price * price.base_usd).toFixed(2).toString() +
        " " +
        price.currency_us +
        " " +
        t("perMachine")
    }
  })

  const result: MachineRow[] = Object.values(rows)

  return (
    <main className="px-0 py-16 md:text-center">
      <AbstractBackgroundSecond />
      <SubtitleNormal text={t("subtitle")} />
      <Heading omnimes={true} text={t("heading")} />
      <DescriptionPrimary text={t("descript")} />
      <section className="text-left">
        <div className="mx-auto max-w-screen-xl items-center gap-8 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
          <Image
            className="z-0 w-full dark:hidden"
            src="/images/offer/monitoring.png"
            alt="omnimes mockup"
            width={992}
            height={715}
          />
          <Image
            className="z-0 hidden w-full dark:block"
            src="/images/offer/monitoring-dark.png"
            alt="omnimes mockup"
            width={992}
            height={715}
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
              {t("head2")}
            </h2>
            <p className="mb-6 text-lg font-light leading-8 text-gray-500 md:text-lg dark:text-gray-400">
              {t("head2desc")}
            </p>
            <Button
              as={Link}
              href="/contact"
              aria-label={t("buttonAria")}
              aria-labelledby={t("buttonAria")}
              title={t("contact")}
              role="button"
              showAnchorIcon
              className="mt-8 bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
            >
              {t("cta")}
            </Button>
          </div>
        </div>
      </section>
      {/* <p className="mb-5 font-bold">
        <small className="text-danger">{t("info")}</small>
      </p> */}
      {/* <ComponentOfferTable columns={columns} rows={result} aria={t("aria")} /> */}
      <section className="text-left">
        <div className="max-w-screen-xl py-8 sm:py-16 lg:px-6">
          <div className="max-w-screen-sm md:mx-auto md:text-center">
            <h2 className="mb-4 mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
              {t("head3")}
            </h2>
            <p className="mb-6 text-lg font-light leading-8 text-gray-500 md:text-lg dark:text-gray-400">
              {t("head3desc")}
            </p>
            <Button
              as={Link}
              href="/contact"
              showAnchorIcon
              className="mt-8 bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
            >
              {t("contact")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

const AbstractBackgroundSecond = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[-1] grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
    >
      <div className="from-primary h-56 bg-gradient-to-br to-purple-400 blur-[106px] dark:from-fuchsia-700"></div>
      <div className="h-32 bg-gradient-to-r from-fuchsia-700 to-pink-200 blur-[106px] dark:from-red-300 dark:to-purple-400 "></div>
    </div>
  )
}
