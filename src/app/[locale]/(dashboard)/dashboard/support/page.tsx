import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/session"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { DashboardHeader } from "@/components/dashboard/Header"
import { DashboardShell } from "@/components/dashboard/Shell"
import { ComponentFormSupport } from "@/components/forms/support/ComponentFormSupport"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "SupportPageMeta" })
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

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  const { locale } = await params

  setRequestLocale(locale)
  const t = await getTranslations("SupportPage")

  return (
    <DashboardShell>
      <DashboardHeader heading={t("title")} text={t("desc")} />
      <div className="grid gap-10">
        <ComponentFormSupport
          user={{
            name: user.name,
            image: user.image,
            email: user.email,
            role: user.role,
          }}
        />
      </div>
    </DashboardShell>
  )
}
