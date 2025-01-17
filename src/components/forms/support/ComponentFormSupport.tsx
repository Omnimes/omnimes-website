"use client"

import * as React from "react"
import { sendSupportMail } from "@/actions/send-support-form"
import { cn } from "@/utils/utils"
import { FormSchemaSupport } from "@/utils/validations/support"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { LuLoaderCircle } from "react-icons/lu"
import { z } from "zod"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { toast } from "@/components/ui/UseToast"
import { UserAccountNavProps } from "@/components/auth/UserAccountNavServer"

import { buttonVariants } from "../../ui/Button"

export function ComponentFormSupport({ user }: UserAccountNavProps) {
  const t = useTranslations("SupportPage")

  const form = useForm<z.infer<typeof FormSchemaSupport>>({
    resolver: zodResolver(FormSchemaSupport),
    defaultValues: {
      problem: "",
      other: "",
    },
  })
  const watchProblem = form.watch("problem", "")
  const [isSending, setIsSending] = React.useState<boolean>(false)
  const userData = {
    email: user?.email ?? "",
    name: user?.name ?? "",
    // phone: user?.phone ?? ""
  }

  function onSubmit(values: z.infer<typeof FormSchemaSupport>) {
    setIsSending(true)
    sendSupportMail({ values, userData })
      .then((data) => {
        if (data.success) {
          toast({
            description: t("toastSuccessDesc"),
          })
        }
        if (data.error) {
          toast({
            title: t("toastWrong"),
            description: t("toastWrongDesc"),
            variant: "destructive",
          })
        }
      })
      .catch((error) => {
        console.error(error)
        toast({
          title: t("toastWrong"),
          description: t("toastWrongDesc"),
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsSending(false)
      })

    toast({
      description: t("toastSuccessDesc"),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg border p-6 shadow-sm"
      >
        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("SelectLabel")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("ProblemPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={t("item1")}>{t("item1")}</SelectItem>
                  <SelectItem value={t("item2")}>{t("item2")}</SelectItem>
                  <SelectItem value={t("item3")}>{t("item3")}</SelectItem>
                  <SelectItem value={t("item4")}>{t("item4")}</SelectItem>
                  <SelectItem value={"other"}>{t("item5")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {watchProblem == "other" && (
          <FormField
            control={form.control}
            name="other"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("otherLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("otherPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("messageLabel")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("messagePlaceholder")}
                  className="h-48 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          aria-label={t("send")}
          aria-labelledby={t("send")}
          title={t("send")}
          className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          disabled={isSending}
        >
          {isSending && <LuLoaderCircle className="mr-2 size-4 animate-spin" />}
          <span>{t("send")}</span>
        </Button>
      </form>
    </Form>
  )
}
