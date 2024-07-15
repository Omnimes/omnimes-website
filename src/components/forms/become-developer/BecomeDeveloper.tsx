"use client"

import * as React from "react"
import * as z from "zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { becomeDeveloperSchema } from "@/utils/validations/become-developer"
import { cn } from "@/utils/utils"
import { toast } from "../../atoms/UseToast"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/atoms/Label"
import { Input } from "../../atoms/Input"
import { buttonVariants } from "../../atoms/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../atoms/Card"
import { useTranslations } from "next-intl"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">
}

type FormData = z.infer<typeof becomeDeveloperSchema>

export function BecomeDeveloperForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(becomeDeveloperSchema),
    defaultValues: {
      company: "",
      nip: ""
    },
  });
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const t = useTranslations("BecomeDeveloperForm")

  async function onSubmit(data: FormData) {
    setIsSending(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: data.company,
      }),
    })

    setIsSending(false)

    if (!response?.ok) {
      return toast({
        title: t("toastWrong"),
        description: t("toastWrongDesc"),
        variant: "destructive",
      })
    }

    toast({
      description: t("toastSuccessDesc"),
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>
          {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <div className="grid gap-1">
            <Label htmlFor="company">
            {t("companyName")}
            </Label>
            <Input
              id="company"
              className="w-full"
              size={32}
              {...register("company")}
            />
            {errors?.company && (
              <p className="px-1 text-xs text-red-600">{t(errors.company.message)}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="nip">
            {t("NIP")}
            </Label>
            <Input
              id="nip"
              className="w-full"
              size={32}
              type="number"
              min={0}
              {...register("nip")}
            />
            {errors?.nip && (
              <p className="px-1 text-xs text-red-600">{t(errors.nip.message)}</p>
            )}
          </div>

        </CardContent>
        <CardFooter>
          <button
            type="submit"
            aria-label={t("send")}
            aria-labelledby={t("send")}
            title={t("send")}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), className)}
            disabled={isSending}
          >
            {isSending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{t("send")}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}