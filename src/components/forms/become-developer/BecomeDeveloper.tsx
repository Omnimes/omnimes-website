"use client"

import { useState } from "react"
import { createPromisesToBecomeDeveloper } from "@/actions/become-developer"
import { cn } from "@/utils/utils"
import { becomeDeveloperSchema } from "@/utils/validations/become-developer"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { LuLoaderCircle } from "react-icons/lu"
import * as z from "zod"

import { Button, buttonVariants } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { toast } from "@/components/ui/UseToast"
import { ComponentFormBlurInfo } from "@/components/forms/component-form/ComponentFromBlurInfo"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">
  data: CompanyStatus & { haveRoleRequest: boolean }
}

interface BelongsCompanyStatus {
  status: "belongs"
  name: string
  nip: string
}

interface NoDataOrSendedCompanyStatus {
  status: "noData" | "sended"
  name: null
  nip: null
}

export type CompanyStatus = BelongsCompanyStatus | NoDataOrSendedCompanyStatus
type FormData = z.infer<typeof becomeDeveloperSchema>

export function BecomeDeveloperForm({ user, data, className, ...props }: UserNameFormProps) {
  const t = useTranslations("BecomeDeveloperForm")
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(becomeDeveloperSchema),
    defaultValues: {
      company: data.status === "belongs" ? data.name : "",
      nip: data.status === "belongs" ? data.nip : "",
      name: user.name ?? "",
    },
  })
  const [isSending, setIsSending] = useState<boolean>(false)

  async function onSubmit() {
    setIsSending(true)
    const response = await createPromisesToBecomeDeveloper(user.id)

    if (response.success) {
      toast({
        description: t(response.message),
        variant: "success",
      })
    } else {
      toast({
        description: response.message ? t(response.message) : t("toastWrongDesc"),
        variant: "destructive",
      })
    }
    setIsSending(false)
  }

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Card className="relative">
        <ComponentFormBlurInfo
          haveRequest={data.haveRoleRequest}
          userId={user.id}
          status={data.status}
        />
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="grid gap-1">
            <Label htmlFor="company">{t("companyName")}</Label>
            <Input id="company" className="w-full" size={32} {...register("company")} />
            {errors?.company && (
              <p className="px-1 text-xs text-red-600">{t(errors.company.message)}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="nip">{t("NIP")}</Label>
            <Input
              id="nip"
              className="w-full"
              size={32}
              type="number"
              disabled={true}
              min={0}
              {...register("nip")}
            />
            {errors?.nip && <p className="px-1 text-xs text-red-600">{t(errors.nip.message)}</p>}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              className="w-full"
              size={32}
              type="text"
              min={0}
              {...register("name")}
            />
            {errors?.name && <p className="px-1 text-xs text-red-600">{t(errors.name.message)}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            aria-label={t("send")}
            aria-labelledby={t("send")}
            title={t("send")}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), className)}
            disabled={isSending}
          >
            {isSending && <LuLoaderCircle className="mr-2 size-4 animate-spin" />}
            <span>{t("send")}</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
