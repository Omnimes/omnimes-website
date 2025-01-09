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
  const t = await getTranslations({ locale, namespace: "Login" })
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

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("LoginPage")

  return (
    <div className="flex h-screen w-full flex-col items-center px-4 py-16 md:justify-center md:py-0">
      <Link
        href="/"
        className="hover:bg-accent hover:text-accent-foreground absolute left-4 top-8 flex items-center justify-center gap-2 rounded-md px-3 py-1 md:left-8"
      >
        <LuMoveLeft className="size-4" />
        {t("back")}
      </Link>
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
          <h1 className="text-2xl font-semibold tracking-tight">{t("welcome")}</h1>
          <p className="text-muted-foreground text-sm">{t("info")}</p>
        </div>
        <UserAuthForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            {t("link")}
          </Link>
        </p>
      </div>
    </div>
  )
}
