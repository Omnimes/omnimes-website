import { getUserCount, getUsers } from "@/actions/user"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { UsersTable } from "@/components/admin/users/UsersTable"
import { Search } from "@/components/dashboard/Search"
import { SearchRole } from "@/components/dashboard/SearchRole"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "AdminUsersMeta" })
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

export default async function UsersPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ q: string; offset: string; r: string }>
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { q, r, offset: resolvedOffset } = await searchParams

  setRequestLocale(locale)
  const search = q ?? ""
  const searchRole = r ?? ""
  const offset = resolvedOffset != null ? (Number(resolvedOffset) < 0 ? 0 : resolvedOffset) : 0
  const { users, newOffset, prevOffset } = await getUsers(search, Number(offset), searchRole)
  const totalUsers = await getUserCount()
  const t = await getTranslations("AdminUsers")

  return (
    <section className="flex w-full flex-1 flex-col md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("users")}</CardTitle>
          <CardDescription>{t("descUsers")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex w-full gap-4">
            <Search value={q} />
            <SearchRole value={r} />
          </div>
          <UsersTable
            users={users}
            offset={newOffset}
            prevOffset={prevOffset}
            totalUsers={totalUsers}
          />
        </CardContent>
      </Card>
    </section>
  )
}
