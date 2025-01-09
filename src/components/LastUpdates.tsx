import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { OstDocument } from "outstatic"
import { LuNewspaper } from "react-icons/lu"

import { Alert, AlertDescription, AlertTitle } from "./ui/Alerts"
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid"
import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

export const LastUpdates = ({
  allNews,
  allPosts,
  locale,
}: {
  allNews: OstDocument[]
  allPosts: OstDocument[]
  locale: string
}) => {
  const t = useTranslations("OmniNews")
  return (
    <>
      <div className="mt-8 scroll-mt-20 sm:mt-0 sm:scroll-mt-8 md:text-center">
        <SubtitleNormal text={t("small")} />
        <Heading text={t("title")} />
        <DescriptionPrimary text={t("desc")} />
      </div>
      <h3 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t("lastNews")}&nbsp;
        <small className="text-primary-500">
          <Link href="/news" className="text-sm">
            {t("seeAll")}
          </Link>
        </small>
      </h3>
      {!allNews.length ? (
        <Alert className="my-12" variant={"primary"}>
          <LuNewspaper className="size-4" />
          <AlertTitle>{t("lackNews")}</AlertTitle>
          <AlertDescription>{t("lackNewsDesc")}</AlertDescription>
        </Alert>
      ) : (
        <BentoGrid className={"py-12"}>
          {allNews.map((item, i) => (
            <BentoGridItem
              key={i}
              slug={"/news/" + item.slug}
              title={item.title}
              description={item.description}
              header={<Skeleton src={item.coverImage} />}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              date={item.publishedAt}
              locale={locale}
            />
          ))}
        </BentoGrid>
      )}

      <h3 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t("lastPosts")}&nbsp;
        <small className="text-primary-500">
          <Link href="/blog" className="text-sm">
            {t("seeAll")}
          </Link>
        </small>
      </h3>
      {!allPosts.length ? (
        <Alert className="my-12" variant={"primary"}>
          <LuNewspaper className="size-4" />
          <AlertTitle>{t("lackPosts")}</AlertTitle>
          <AlertDescription>{t("lackPostsDesc")}</AlertDescription>
        </Alert>
      ) : (
        <BentoGrid className="py-12">
          {allPosts.map((item, i) => (
            <BentoGridItem
              key={i}
              slug={"/blog/" + item.slug}
              title={item.title}
              description={item.description}
              header={<Skeleton src={item.coverImage} />}
              className={i === 0 || i === 5 ? "md:col-span-2" : ""}
              date={item.publishedAt}
              locale={locale}
            />
          ))}
        </BentoGrid>
      )}
    </>
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
          className="h-auto max-h-[250px] w-full object-cover object-center"
        />
      </div>
    )
  }
}
