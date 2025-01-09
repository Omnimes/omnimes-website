"use client"

import { useState } from "react"
import { aproveRequestDeveloper, deleteRequest, RoleRequest } from "@/actions/become-developer"
import { useTranslations } from "next-intl"
import { LuCheck, LuLoaderCircle, LuTrash2 } from "react-icons/lu"

import { Button } from "@/components/ui/Button"
import { TableCell, TableRow } from "@/components/ui/Table"
import { toast } from "@/components/ui/UseToast"

type status = "aprove" | "delete" | false
export function DeveloperTableRow({ req }: { req: RoleRequest }) {
  const t = useTranslations("AdminUsers")
  const userId = req.userId
  const [loading, setLoading] = useState<status>(false)
  const [disabled, setDisabled] = useState<boolean>(false)

  const handleDeleteRequestWithId = async () => {
    setLoading("delete")
    setDisabled(true)
    const result = await deleteRequest(userId)
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
      setDisabled(false)
    }, 3000)
  }
  const handleAproveRequestWithId = async () => {
    setLoading("aprove")
    setDisabled(true)
    const result = await aproveRequestDeveloper(userId)
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
      setDisabled(false)
    }, 3000)
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{req.user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{req.user.email}</TableCell>
      <TableCell className="hidden md:table-cell">{req.company.name}</TableCell>
      <TableCell className="flex gap-2">
        <Button
          className="w-fit"
          size="sm"
          variant="success"
          aria-label={t("check")}
          aria-labelledby={t("check")}
          title={t("check")}
          role="button"
          disabled={disabled}
          formAction={handleAproveRequestWithId}
        >
          {loading == "aprove" ? <LuLoaderCircle className="animate-spin" /> : <LuCheck />}
        </Button>
        <Button
          className="w-fit"
          size="sm"
          variant="destructive"
          aria-label={t("delete")}
          aria-labelledby={t("delete")}
          title={t("delete")}
          role="button"
          disabled={disabled}
          formAction={handleDeleteRequestWithId}
        >
          {loading == "delete" ? <LuLoaderCircle className="animate-spin" /> : <LuTrash2 />}
        </Button>
      </TableCell>
    </TableRow>
  )
}
