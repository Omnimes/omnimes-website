"use client"
import * as React from "react"
import * as z from "zod"
import { cn } from "@/utils/utils"
import { User } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userNameSchema } from "@/utils/validations/user"
import { useTranslations } from "next-intl"
import { changeName } from "@/actions/user"
import { toast } from "@/components/atoms/UseToast"
import { Label } from "@/components/atoms/Label"
import { Input } from "@/components/atoms/Input"
import { buttonVariants } from "@/components/atoms/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms/Card"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">
}
type FormData = z.infer<typeof userNameSchema>
export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const t = useTranslations("SettingsForm")

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    const response = await changeName(data.name, user.id);
    if(response.success) {
      toast({
        description: t(response.message),
        variant: "success"
      });
    } else if (response.error) {
      toast({
        description: t(response.message),
        variant: "destructive",
      });
    }
    setIsSaving(false);
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
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
            {t("name")}
            </Label>
            <Input
              id="name"
              className="w-full"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{t(errors.name.message)}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            aria-label={t("save")}
            aria-labelledby={t("save")}
            title={t("save")}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{t("save")}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}