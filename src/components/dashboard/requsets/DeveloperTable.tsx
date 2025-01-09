import { RoleRequest } from "@/actions/become-developer"
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

import { DeveloperTableRow } from "./DeveloperTableRow"

export function DeveloperTable({ requests }: { requests: RoleRequest[] }) {
  const t = useTranslations("AdminUsers")
  return (
    <>
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
                  <TableHead className="max-w-[150px]">{t("email")}</TableHead>
                  <TableHead>{t("company")}</TableHead>
                  <TableHead>{t("action")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <DeveloperTableRow key={req.userId} req={req} />
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
    </>
  )
}
