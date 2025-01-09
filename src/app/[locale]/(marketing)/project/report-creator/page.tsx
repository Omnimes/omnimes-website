import Image from "next/image"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ReportMeta" })
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

export default async function ReportCreatorPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("CreatorPage")
  const localPath = locale == "pl" ? "pl" : "en"
  return (
    <main>
      <h1
        className="animate-fade-up font-display mt-20 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] sm:text-4xl md:text-7xl md:leading-[5rem] dark:from-white"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        {t("title")}
      </h1>
      <p
        dangerouslySetInnerHTML={{ __html: t.raw("subTitle") }}
        className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400"
      />
      <p
        dangerouslySetInnerHTML={{ __html: t.raw("p1") }}
        className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400"
      />
      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t("heading1")}
      </h2>
      <p
        dangerouslySetInnerHTML={{ __html: t.raw("p2") }}
        className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400"
      />

      <Image
        src={`/images/project/${localPath}/report/light.png`}
        alt={t("altLight")}
        width={1650}
        height={656}
        className="my-10 h-auto w-full rounded-md object-contain shadow-md dark:hidden"
      />
      <Image
        src={`/images/project/${localPath}/report/dark.png`}
        alt={t("altDark")}
        width={1650}
        height={656}
        className="my-10 hidden h-auto w-full rounded-md object-contain shadow-md dark:flex"
      />

      <p
        dangerouslySetInnerHTML={{ __html: t.raw("p3") }}
        className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400"
      />
      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t("heading2")}
      </h2>
      <p className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p4")}</p>

      <Image
        src={`/images/project/${localPath}/report/1light.png`}
        alt={t("altLight1")}
        width={1650}
        height={656}
        className="my-10 h-auto w-full rounded-md object-contain shadow-md dark:hidden"
      />
      <Image
        src={`/images/project/${localPath}/report/1dark.png`}
        alt={t("altDark1")}
        width={1650}
        height={656}
        className="my-10 hidden h-auto w-full rounded-md object-contain shadow-md dark:flex"
      />

      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t("heading3")}
      </h2>
      <ul className="mt-0 list-disc">
        <li
          dangerouslySetInnerHTML={{ __html: t.raw("l1") }}
          className="mb-3 ml-8 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400"
        />
        <li
          dangerouslySetInnerHTML={{ __html: t.raw("l2") }}
          className="my-3 ml-8 text-lg leading-8 text-gray-500 dark:text-gray-400"
        />
        <li
          dangerouslySetInnerHTML={{ __html: t.raw("l3") }}
          className="my-3 ml-8 pb-7 text-lg leading-8 text-gray-500 dark:text-gray-400"
        />
      </ul>
      <p className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p5")}</p>
    </main>
  )
}
