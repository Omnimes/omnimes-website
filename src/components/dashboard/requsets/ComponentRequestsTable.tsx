import { useTranslations } from "next-intl"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

import { UserRow } from "./ComponentRequestsRow"

type User = {
  id: string
  name: string | null
  email: string | null
}

export type CompanyRequest = {
  id: string
  userId: string
  companyId: string
  createdAt: Date
  updatedAt: Date
  user: User
}

export type Requests = CompanyRequest[]

export const ComponentRequests = ({ requests }: { requests: Requests }) => {
  const t = useTranslations("dashboardTable")

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
                <TableHead>{t("action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-auto">
              {requests.map((user) => (
                <UserRow key={user.id} userProps={user} />
              ))}
              {!requests.length && (
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
