import { redirect } from "next/navigation"
import { getCompanyAndRoleRequestStatus } from "@/actions/become-developer"
import { getCurrentUser } from "@/actions/session"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { DashboardHeader } from "@/components/dashboard/Header"
import { DashboardShell } from "@/components/dashboard/Shell"
import { BecomeDeveloperForm } from "@/components/forms/become-developer/BecomeDeveloper"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "BecomeDeveloperPage" })
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
export default async function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  if (user.role == "developer") redirect("/dashboard")

  setRequestLocale(locale)
  const t = await getTranslations("BecomeDeveloperPage")

  const data = await getCompanyAndRoleRequestStatus(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading={t("title")} text={t("desc")} />
      <div className="grid gap-10">
        <BecomeDeveloperForm user={{ id: user.id, name: user.name || "" }} data={data} />
      </div>
    </DashboardShell>
  )
}
