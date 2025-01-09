import { redirect } from "next/navigation"
import {
  getAllUsersFromComapny,
  getCompanyUser,
  GetIsAdminCompany,
  getRequestsForAdmin,
} from "@/actions/company"
import { getCurrentUser } from "@/actions/session"
import { getLocalePrimaryDialects } from "@/data/locales"
import { cn } from "@/utils/utils"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { CompanyUsersTable } from "@/components/dashboard/company/CompanyUsersTable"
import { ComponentCompany } from "@/components/dashboard/company/ComponentCompany"
import { ComponentRequests } from "@/components/dashboard/requsets/ComponentRequestsTable"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "DashboardPanelMeta" })
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

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const { status, data } = await getCompanyUser(user.id)
  const isAdminCompany = await GetIsAdminCompany(user.id)

  if (!isAdminCompany.isAdmin) {
    return (
      <div className={"grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"}>
        <ComponentCompany status={status} data={data} />
      </div>
    )
  }

  const CompanyRequset = async () => {
    if (isAdminCompany.user?.adminCompanyId) {
      const requests = await getRequestsForAdmin(isAdminCompany.user?.adminCompanyId)
      return <ComponentRequests requests={requests} />
    }
  }

  const CompanyUsers = async () => {
    if (isAdminCompany.user?.adminCompanyId) {
      const allUsersComapny = await getAllUsersFromComapny(data?.id ?? "")
      return <CompanyUsersTable allUsersComapny={allUsersComapny} />
    }
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-[1fr_250px] xl:grid-cols-3 xl:gap-8")}>
      <div className="grid auto-rows-max grid-cols-1 gap-4 xl:col-span-2 xl:gap-8">
        <CompanyRequset />
        <CompanyUsers />
      </div>
      <div className="grid auto-rows-max grid-cols-1 gap-4 xl:gap-8">
        <ComponentCompany status={status} data={data} />
      </div>
    </div>
  )
}
