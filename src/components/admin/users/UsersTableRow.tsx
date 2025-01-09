"use client"

import { useState } from "react"
import { changeRoleUser, deleteUserById } from "@/actions/user"
import { useTranslations } from "next-intl"
import { LuLoaderCircle, LuTrash2 } from "react-icons/lu"

import { Button } from "@/components/ui/Button"
import { TableCell, TableRow } from "@/components/ui/Table"
import { toast } from "@/components/ui/UseToast"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/Select"
import { SelectUser } from "./UsersTable"

type role = "admin" | "user" | "developer"
export function UserTableRow({ user }: { user: SelectUser }) {
  const t = useTranslations("AdminUsers")
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingSelect, setLoadingSelect] = useState<boolean>(false)

  const userId = user.id

  const handleDeleteUser = async () => {
    setLoading(true)
    const result = await deleteUserById(user.id)
    if (result.success) {
      toast({
        description: t(result.message),
        variant: "success",
      })
    } else if (result.error) {
      toast({
        description: t(result.message),
        variant: "destructive",
      })
    }
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  const handleChangeRoleInComapny = async (role: role) => {
    setLoadingSelect(true)
    const result = await changeRoleUser(userId, role)
    if (result.success) {
      toast({
        description: t(result.message),
        variant: "success",
      })
    } else if (result.error) {
      toast({
        description: t(result.message),
        variant: "destructive",
      })
    }
    setLoadingSelect(false)
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell>
        <Select
          disabled={loadingSelect}
          onValueChange={(e: role) => {
            handleChangeRoleInComapny(e)
          }}
          defaultValue={user.role}
        >
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder={t("placeholderRole")}>
              <span className="flex items-center gap-2">
                {loadingSelect && <LuLoaderCircle className="animate-spin" />}
                {user.role}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">{t("admin")}</SelectItem>
            <SelectItem value="developer">{t("developer")}</SelectItem>
            <SelectItem value="user">{t("user")}</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Button
          className="w-fit"
          size="sm"
          variant="destructive"
          aria-label={t("delete")}
          aria-labelledby={t("delete")}
          title={t("delete")}
          role="button"
          disabled={loading}
          formAction={handleDeleteUser}
        >
          {loading ? <LuLoaderCircle className="animate-spin" /> : <LuTrash2 />}
        </Button>
      </TableCell>
    </TableRow>
  )
}
