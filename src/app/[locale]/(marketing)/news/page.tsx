import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"
import Image from "next/image"
import { OstDocument } from "outstatic"
import { load } from "outstatic/server"

import { genPageMetadata } from "@/app/seo"
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "NewsMeta" })
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

async function getData(locale: string) {
  const db = await load()
  const allNews = await db
    .find<OstDocument>({ collection: "news", status: "published", lang: locale }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
    ])
    .sort({ publishedAt: -1 })
    .limit(20)
    .toArray()

  return allNews
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const allNews = await getData(locale)

  return (
    <main className="py-24">
      <BentoGrid className="mx-auto max-w-screen-xl">
        {allNews.map((item, i) => (
          <BentoGridItem
            key={i}
            slug={"/news/" + item.slug}
            title={item.title}
            description={item.description}
            header={<Skeleton src={item.coverImage} />}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </main>
  )
}

const Skeleton = ({ src }: { src: string | undefined }) => {
  if (src == undefined || src == "") {
    return (
      <div className="flex size-full min-h-40 flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
    )
  } else {
    return (
      <div className="relative flex size-full min-h-40 flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <Image
          src={src}
          alt={"News photo"}
          width={1096}
          height={282}
          className="h-auto max-h-[300px] w-full object-cover object-center"
        />
      </div>
    )
  }
}
