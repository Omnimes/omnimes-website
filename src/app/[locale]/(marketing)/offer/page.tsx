import { genPageMetadata } from '@/app/seo'
import { ComponentOfferTable } from '@/components/ComponentOfferTable'
import { DescriptionPrimary } from '@/components/ui/Description'
import { Heading } from '@/components/ui/Heading'
import { SubtitleNormal } from '@/components/ui/Subtitle'
import { getLocalePrimaryDialects } from '@/data/locales'
import { Button, Link } from '@nextui-org/react'
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
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
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'OfferMeta' })
  const title = t('title')
  const description = t('desc')
  const keywords = t('keywords')
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
  const res = await fetch(
    'https://licencje.webface.pl/package-price/?limit=20&offset=0&ordering=period',
    {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: `Token ${process.env.API_TOKEN}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getSettings() {
  const res = await fetch('https://licencje.webface.pl/settings/', {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      Authorization: `Token ${process.env.API_TOKEN}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function OfferPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('Offer')

  const data: Data = await getData();
  const settings = await getSettings();

  const price = {
    base: JSON.parse(settings.results[0].data)['base'] || 100,
    currency: JSON.parse(settings.results[0].data)['currency'] || "PLN",
    base_eu: JSON.parse(settings.results[0].data)['base_eu'] || 25,
    currency_eu: JSON.parse(settings.results[0].data)['currency_eu'] || 'EUR',
    base_usd: JSON.parse(settings.results[0].data)['base_usd'] || 25,
    currency_us: JSON.parse(settings.results[0].data)['currency_us'] || 'USD',
  }

  const periods = Array.from(new Set(data.results.map((item) => item.period))).sort((a, b) => a - b)
  const columns = periods.map((period) => ({
    key: `period${period}`,
    label: period + ' ' + t('message', { count: period }),
  }))
  columns.unshift({ key: 'machine', label: t('howMany') })

  const rows: Record<string, MachineRow> = {}

  data.results.forEach((item) => {
    if (!rows[item.machine]) {
      rows[item.machine] = {
        key: item.machine.toString(),
        machine: t('machineDesc', { machine: item.machine }),
        period3: '',
        period6: '',
        period9: '',
        period12: '',
      }
    }

    const periodKey = `period${item.period}` as keyof MachineRow
    if (locale == 'pl') {
      rows[item.machine][periodKey] =
        (item.price * price.base).toFixed(2).toString() +
        ' ' +
        price.currency +
        ' ' +
        t('perMachine')
    } else if (locale == 'de') {
      rows[item.machine][periodKey] =
        (item.price * price.base_eu).toFixed(2).toString() +
        ' ' +
        price.currency_eu +
        ' ' +
        t('perMachine')
    } else {
      rows[item.machine][periodKey] =
        (item.price * price.base_usd).toFixed(2).toString() +
        ' ' +
        price.currency_us +
        ' ' +
        t('perMachine')
    }
  })

  const result: MachineRow[] = Object.values(rows)

  return (
    <main className="px-0 py-16 md:text-center">
      <AbstractBackgroundSecond />
      <SubtitleNormal text={t('subtitle')} />
      <Heading omnimes={true} text={t('heading')} />
      <DescriptionPrimary text={t('descript')} />
      <section className="text-left">
        <div className="mx-auto max-w-screen-xl items-center gap-8 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
          <Image
            className="w-full dark:hidden z-0"
            src="/images/offer/monitoring.png"
            alt="omnimes mockup"
            width={992}
            height={715}
          />
          <Image
            className="hidden w-full dark:block z-0"
            src="/images/offer/monitoring-dark.png"
            alt="omnimes mockup"
            width={992}
            height={715}
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
              {t('head2')}
            </h2>
            <p className="mb-6 text-lg font-light leading-8 text-gray-500 dark:text-gray-400 md:text-lg">
              {t('head2desc')}
            </p>
            <Button
              as={Link}
              href="/contact"
              aria-label={t('buttonAria')}
              aria-labelledby={t('buttonAria')}
              title={t('contact')}
              role="button"
              showAnchorIcon
              className="mt-8 bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
            >
              {t('cta')}
            </Button>
          </div>
        </div>
      </section>
      <p className="mb-5 font-bold">
        <small className="text-danger">{t('info')}</small>
      </p>
      <ComponentOfferTable columns={columns} rows={result} aria={t('aria')} />
      <section className="text-left">
        <div className="max-w-screen-xl py-8 sm:py-16 lg:px-6">
          <div className="max-w-screen-sm md:text-center md:mx-auto">
            <h2 className="mb-4 mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
              {t('head3')}
            </h2>
            <p className="mb-6 text-lg font-light leading-8 text-gray-500 dark:text-gray-400 md:text-lg">
              {t('head3desc')}
            </p>
            <Button
              as={Link}
              href="/contact"
              showAnchorIcon
              className="mt-8 bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
            >
              {t('contact')}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

const AbstractBackgroundSecond = () => {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-[-1]">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-fuchsia-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-fuchsia-700 dark:from-red-300 to-pink-200 dark:to-purple-400 "></div>
    </div>
  )
}