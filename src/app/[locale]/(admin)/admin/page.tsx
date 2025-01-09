import { redirect } from "next/navigation"
import { getAllRequests, RoleRequest } from "@/actions/become-developer"
import { getCurrentUser } from "@/actions/session"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { DeveloperTable } from "@/components/dashboard/requsets/DeveloperTable"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "AdminDashboardMeta" })
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

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const requests = (await getAllRequests()) as RoleRequest[]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_250px] xl:grid-cols-3 xl:gap-8">
      <div className="auto-rows-max items-start gap-4 md:grid xl:col-span-2 xl:gap-8">
        <DeveloperTable requests={requests} />
      </div>
    </div>
  )
}
