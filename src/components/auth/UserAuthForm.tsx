"use client"

import { HTMLAttributes, useState } from "react"
import { cn } from "@/utils/utils"
import { userAuthSchema } from "@/utils/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Spinner } from "@nextui-org/react"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { LuGithub, LuMail } from "react-icons/lu"
import * as z from "zod"

import { toast } from "../ui/UseToast"

type FormData = z.infer<typeof userAuthSchema>

export const UserAuthForm = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)
  const t = useTranslations("LoginForm")

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    /* Zmieniony callback na /dashboard co spowodowało nie potwierdzeniu adresu email */
    /* bug: prisma adapter zapisuje inny token do bazy danych i inny wysyła w mailu */
    /* rozwiązanie tymczasowe: w ustawieniach przycisk który spowoduje potwierdzenie adresu email ?? */
    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      // callbackUrl: location == 'login' ? "/dashboard" : "/verify-email",
      callbackUrl: "/dashboard",
    })
    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: t("toastWrong"),
        description: t("toastWrongDesc"),
        variant: "destructive",
      })
    }

    return toast({
      title: t("toastSuccess"),
      description: t("toastSuccessDesc"),
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <Input
          type="email"
          label={t("EmailLabel")}
          placeholder={t("EmailPlaceholder")}
          labelPlacement="outside"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          isRequired
          isDisabled={isLoading || isGitHubLoading}
          isInvalid={errors?.email ? true : false}
          errorMessage={errors?.email && t(errors.email.message)}
          {...register("email")}
        />
        <Button
          type="submit"
          aria-label={t("loginMailAria")}
          aria-labelledby={t("loginMailAria")}
          title={t("loginMailAria")}
          variant="bordered"
          spinner={<Spinner size="sm" />}
          spinnerPlacement={"start"}
          isLoading={isLoading}
          isDisabled={isLoading || isGitHubLoading}
          startContent={!isLoading && <LuMail />}
        >
          {t("mail")}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">{t("continue")}</span>
        </div>
      </div>
      <Button
        type="button"
        aria-label={t("loginGithubAria")}
        aria-labelledby={t("loginGithubAria")}
        title={t("loginGithubAria")}
        variant="bordered"
        spinner={<Spinner size="sm" />}
        spinnerPlacement={"start"}
        isLoading={isGitHubLoading}
        isDisabled={isLoading || isGitHubLoading}
        startContent={!isGitHubLoading && <LuGithub />}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github", { callbackUrl: `/dashboard` })
        }}
      >
        Github
      </Button>
    </div>
  )
}
