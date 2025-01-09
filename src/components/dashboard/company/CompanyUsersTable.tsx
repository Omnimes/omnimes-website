import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

import { UserRow } from "./CompanyUsersRow"

type Props = {
  allUsersComapny: UserComapny[]
}

type UserComapny = {
  id: string
  name: string | null
  email: string | null
  companyId: string | null
  adminCompanyId: string | null
}

export const CompanyUsersTable = async ({ allUsersComapny }: Props) => {
  const t = await getTranslations("CompanyUsersTable")

  if (!allUsersComapny.length) return null
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[150px]">{t("name")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("email")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("role")}</TableHead>
                <TableHead>{t("action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-auto">
              {allUsersComapny.map((user) => {
                return <UserRow key={user.id} user={user} />
              })}
              {!allUsersComapny.length && (
                <TableRow className="text-center">
                  <TableCell colSpan={4}>{t("noData")}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </form>
  )
}
