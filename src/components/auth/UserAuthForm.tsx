"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/utils/utils"
import { userAuthSchema } from "@/utils/validations/auth"
import { Button, Input, Spinner } from "@nextui-org/react"
import { LuGithub, LuMail } from "react-icons/lu";
import { useState, HTMLAttributes } from "react"
import { useTranslations } from "next-intl"
import { toast } from "../atoms/UseToast"

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  location: "login" | "register";
}
type FormData = z.infer<typeof userAuthSchema>

export const UserAuthForm = ({ className, location, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)
  const t = useTranslations("LoginForm");

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: location == 'login' ? "/dashboard" : "/verify-email",
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
          <span className="bg-background px-2 text-muted-foreground">
            {t("continue")}
          </span>
        </div>
      </div>
      <Button
        type="button"
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