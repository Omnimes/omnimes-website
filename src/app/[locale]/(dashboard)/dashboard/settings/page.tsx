import { redirect } from "next/navigation"
import { doesUserHaveRequest, getUserCompanyInfo } from "@/actions/company"
import { getCurrentUser } from "@/actions/session"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { DashboardHeader } from "@/components/dashboard/Header"
import { DashboardShell } from "@/components/dashboard/Shell"
import { CompanyForm } from "@/components/forms/settings/CompanyForm"
import { UserNameForm } from "@/components/forms/settings/UserNameForm"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "SettingsPage" })
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
  const meta = genPageMetadata(obj)
  return meta
}
export default async function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  const { locale } = await params

  setRequestLocale(locale)
  const t = await getTranslations("SettingsPage")

  const { belongCompany, company, isAdmin } = await getUserCompanyInfo(user.id)
  const requestCompany = await doesUserHaveRequest(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading={t("title")} text={t("desc")} />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
      <div id="company" className="grid gap-10">
        <CompanyForm
          user={{ id: user.id }}
          isAdminCompany={isAdmin}
          belongCompany={belongCompany}
          company={company}
          requestCompany={requestCompany}
        />
      </div>
    </DashboardShell>
  )
}
