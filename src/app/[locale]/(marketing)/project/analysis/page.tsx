import Image from "next/image"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "AnalysisMeta" })
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
export default async function AnalysisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("AnalysisPage")
  const localPath = locale == "pl" ? "pl" : "en"
  return (
    <main>
      <h1
        className="animate-fade-up font-display mt-20 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] sm:text-4xl md:text-7xl md:leading-[5rem] dark:from-white"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        {t("title")}
      </h1>
      <p className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">
        {t("subTitle")}
      </p>
      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t("heading1")}
      </h2>
      <p className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p1")}</p>

      <ol className="mt-0 list-decimal">
        <li className="my-3 ml-5 text-lg leading-8 text-gray-500 dark:text-gray-400">
          <p
            dangerouslySetInnerHTML={{ __html: t.raw("l1") }}
            className="my-6 text-lg font-bold leading-8 text-gray-500 dark:text-gray-400"
          />
          <p
            dangerouslySetInnerHTML={{ __html: t.raw("l1-p") }}
            className="mb-10 mt-3 text-lg leading-8 text-gray-500 dark:text-gray-400"
          />
          <Image
            src={`/images/project/${localPath}/analysis/light.png`}
            alt={t("altLight")}
            width={1650}
            height={656}
            className="my-10 h-auto w-full rounded-md object-contain shadow-md dark:hidden"
          />
          <Image
            src={`/images/project/${localPath}/analysis/dark.png`}
            alt={t("altDark")}
            width={1650}
            height={656}
            className="my-10 hidden h-auto w-full rounded-md object-contain shadow-md dark:flex"
          />
          <p
            dangerouslySetInnerHTML={{ __html: t.raw("l1-p2") }}
            className="mb-10 mt-3 text-lg leading-8 text-gray-500 dark:text-gray-400"
          />
          <Image
            src={`/images/project/${localPath}/analysis/1light.png`}
            alt={t("altLight1")}
            width={1650}
            height={656}
            className="my-10 h-auto w-full rounded-md object-contain shadow-md dark:hidden"
          />
          <Image
            src={`/images/project/${localPath}/analysis/1dark.png`}
            alt={t("altDark1")}
            width={1650}
            height={656}
            className="my-10 hidden h-auto w-full rounded-md object-contain shadow-md dark:flex"
          />
        </li>

        <li className="my-3 ml-5 text-lg leading-8 text-gray-500 dark:text-gray-400">
          <p
            dangerouslySetInnerHTML={{ __html: t.raw("l2") }}
            className="my-6 text-lg font-bold leading-8 text-gray-500 dark:text-gray-400"
          />
          <p
            dangerouslySetInnerHTML={{ __html: t.raw("l2-p") }}
            className="mb-10 mt-3 text-lg leading-8 text-gray-500 dark:text-gray-400"
          />
          <Image
            src={`/images/project/${localPath}/analysis/2light.png`}
            alt={t("altLight2")}
            width={1650}
            height={656}
            className="my-10 h-auto w-full rounded-md object-contain shadow-md dark:hidden"
          />
          <Image
            src={`/images/project/${localPath}/analysis/2dark.png`}
            alt={t("altDark2")}
            width={1650}
            height={656}
            className="my-10 hidden h-auto w-full rounded-md object-contain shadow-md dark:flex"
          />
          <p
            dangerouslySetInnerHTML={{ __html: t.raw("l2-p2") }}
            className="mb-10 mt-3 text-lg leading-8 text-gray-500 dark:text-gray-400"
          />
          <Image
            src={`/images/project/${localPath}/analysis/3light.png`}
            alt={t("altLight3")}
            width={1650}
            height={656}
            className="my-10 h-auto w-full rounded-md object-contain shadow-md dark:hidden"
          />
          <Image
            src={`/images/project/${localPath}/analysis/3dark.png`}
            alt={t("altDark3")}
            width={1650}
            height={656}
            className="my-10 hidden h-auto w-full rounded-md object-contain shadow-md dark:flex"
          />
        </li>

        <li className="my-3 ml-5 text-lg leading-8 text-gray-500 dark:text-gray-400">
          <p
            dangerouslySetInnerHTML={{ __html: t.raw("l3") }}
            className="my-6 text-lg font-bold leading-8 text-gray-500 dark:text-gray-400"
          />
          <p
            dangerouslySetInnerHTML={{ __html: t.raw("l3-p") }}
            className="mb-10 mt-3 text-lg leading-8 text-gray-500 dark:text-gray-400"
          />
          <Image
            src={`/images/project/${localPath}/analysis/4light.png`}
            alt={t("altLight4")}
            width={1650}
            height={656}
            className="my-10 h-auto w-full rounded-md object-contain shadow-md dark:hidden"
          />
          <Image
            src={`/images/project/${localPath}/analysis/4dark.png`}
            alt={t("altDark4")}
            width={1650}
            height={656}
            className="my-10 hidden h-auto w-full rounded-md object-contain shadow-md dark:flex"
          />
        </li>
      </ol>
    </main>
  )
}
