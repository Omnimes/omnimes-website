import { useTranslations } from "next-intl"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

import { UserTableActions } from "./UsersTableActions"
import { UserTableRow } from "./UsersTableRow"

export type SelectUser = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export function UsersTable({
  users,
  offset,
  prevOffset,
  totalUsers,
}: {
  users: SelectUser[]
  offset: number | null
  prevOffset: number | null
  totalUsers: number | null
}) {
  const t = useTranslations("AdminUsers")

  return (
    <form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[150px]">{t("name")}</TableHead>
            <TableHead className="hidden md:table-cell">{t("email")}</TableHead>
            <TableHead className="hidden md:table-cell">{t("role")}</TableHead>
            <TableHead>{t("action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserTableRow key={user.id} user={user} />
          ))}
          {!users.length && (
            <TableRow className="text-center">
              <TableCell colSpan={4}>{t("noData")}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UserTableActions offset={offset} prevOffset={prevOffset} totalUsers={totalUsers} />
    </form>
  )
}
