import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "PrivacyMeta" })
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

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("PrivacyPolicy")

  return (
    <main className="flex flex-col gap-4">
      <header className="my-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          {t("heading")}
        </h1>
      </header>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading1")}
        </h2>
        <p className="mb-2">{t("paragraph1")}</p>
        <p className="mb-2">{t("paragraph2")}</p>
        <p className="mb-2">{t("paragraph3")}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading2")}
        </h2>
        <p className="mb-2">
          {t("paragraph4")}&nbsp;
          <a href="mailto:krakow@multiprojekt.pl">{t("anchor")}</a>&nbsp;
          {t("paragraph4b")}
        </p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading3")}
        </h2>
        <p className="mb-2">{t("paragraph5")}</p>
        <ul className="list-disc text-left">
          <li className="mb-1 ml-5 sm:ml-7">{t("list1")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list2")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list3")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list4")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list5")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list6")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list7")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list8")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list9")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list10")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list11")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list12")}</li>
        </ul>
        <p className="mb-2">{t("paragraph6")}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading4")}
        </h2>
        <p className="mb-2">{t("paragraph7")}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading5")}
        </h2>
        <p className="mb-2">{t("paragraph8")}</p>
        <ul className="mb-2 list-disc">
          <li className="mb-1 ml-5 sm:ml-7">{t("list13")}</li>
          <li className="mb-1 ml-5 sm:ml-7">{t("list14")}</li>
        </ul>
        <p className="mb-2">{t("paragraph9")}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading6")}
        </h2>
        <p className="mb-2">{t("paragraph10")}</p>
        <p className="mb-2">{t("paragraph11")}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading7")}
        </h2>
        <p className="mb-2">{t("paragraph12")}</p>
        <p className="mb-2">
          {t("paragraph13")}
          <a href="mailto:krakow@multiprojekt.pl">{t("anchor")}</a>.
        </p>
        <p className="mb-2">{t("paragraph14")}</p>
        <p className="mb-2">{t("paragraph15")}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading8")}
        </h2>
        <p className="mb-2">{t("paragraph16")}</p>
        <p className="mb-2">{t("paragraph17")}</p>
        <p className="mb-2">{t("paragraph18")}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading9")}
        </h2>
        <p className="mb-2">{t("paragraph19")}</p>
        <p className="mb-2">{t("paragraph20")}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {t("privacyHeading10")}
        </h2>
        <p className="mb-2">{t("paragraph21")}</p>
        <p className="mb-2">{t("paragraph22")}</p>
        <p className="mb-2">{t("paragraph23")}</p>
      </section>

      <footer>
        <p className="mb-2">&copy; 2024 Multiprojekt Automatyka Sp. z o.o.</p>
      </footer>
    </main>
  )
}
