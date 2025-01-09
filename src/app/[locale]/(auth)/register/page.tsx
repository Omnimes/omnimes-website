import Image from "next/image"
import Link from "next/link"
import { getLocalePrimaryDialects } from "@/data/locales"
import Logo from "@/data/logo.svg"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { LuMoveLeft } from "react-icons/lu"

import { UserAuthForm } from "@/components/auth/UserAuthForm"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Register" })
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

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("RegisterPage")

  return (
    <div className="grid h-screen w-screen flex-col justify-center px-4 py-16 md:items-center md:py-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="md:text-dark dark:md:text-dark hover:bg-accent hover:text-accent-foreground absolute left-4 top-8 z-[2] flex items-center justify-center gap-2 text-white md:left-8"
      >
        <LuMoveLeft className="size-4" />
        {t("back")}
      </Link>
      <div className="relative h-full overflow-hidden rounded-none bg-slate-100 shadow-xl lg:block dark:bg-zinc-950">
        <video
          aria-label="video Omnimes"
          className="absolute min-h-full min-w-full rounded-none object-cover"
          src="/videos/register.mp4"
          autoPlay
          muted
          loop
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src={Logo.src}
              alt={"OmniMES logo"}
              width={44}
              height={36}
              priority
              className="mr-2"
              style={{ width: "44px", height: "auto" }}
            />
            <h1 className="text-2xl font-semibold tracking-tight">{t("create")}</h1>
            <p className="text-muted-foreground text-sm">{t("info")}</p>
          </div>
          <UserAuthForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            {t("info2")}{" "}
            <Link href="/terms" className="hover:text-brand underline underline-offset-4">
              {t("info3")}
            </Link>{" "}
            {t("info4")}{" "}
            <Link href="/privacy-policy" className="hover:text-brand underline underline-offset-4">
              {t("info5")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
