"use client"

import * as React from "react"
import {
  createCompany,
  createPromisesToCompany,
  getCompany,
  getCompanyInGUSDatabaseServer,
  sendResetRequest,
  updateCompany,
} from "@/actions/company"
import { cn, getInputType } from "@/utils/utils"
import { companySchema } from "@/utils/validations/company"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { LuLoaderCircle } from "react-icons/lu"
import { useDebouncedCallback } from "use-debounce"
import * as z from "zod"

import { Label } from "@/components/ui/Label"

import { Button, buttonVariants } from "../../ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card"
import { Input } from "../../ui/Input"
import { toast } from "../../ui/UseToast"

type FormData = z.infer<typeof companySchema>

interface Props {
  user: Pick<User, "id">
  company: Company | null
  belongCompany: boolean
  requestCompany: ReqCompany | null
  isAdminCompany: boolean
  className?: string
}

export type ReqCompany = {
  id: string
  userId: string
  companyId: string
}

export type Company = {
  id?: string
  name: string
  nip: string
  streetAddress: string
  postalCode: string
  city: string
  country: string
  industry: string
  phoneNumber: string
  email: string
  website: string
}

export const CompanyForm = ({
  user,
  company,
  belongCompany,
  requestCompany,
  isAdminCompany,
  className,
  ...props
}: Props) => {
  const t = useTranslations("CompanyForm")
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isSendPromise, setIsSendPromise] = React.useState<boolean>(false)
  const [sendPromise, setSendPromise] = React.useState<boolean>(false)

  const defVal = {
    name: "",
    nip: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    industry: "",
    phoneNumber: "",
    email: "",
    website: "",
  }
  const defaultCompanyValues =
    company == null
      ? defVal
      : { ...company, website: company.website == null ? "" : company.website }

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultCompanyValues,
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    const response = belongCompany
      ? await updateCompany(company?.id ?? "", data)
      : await createCompany(data, user.id)

    if (response.success) {
      toast({
        description: t(response.message),
        variant: "success",
      })
    } else if (response.error && response.message) {
      toast({
        description: t(response.message),
        variant: "destructive",
      })
    } else if (response.error && response.errors && response.errors.length > 0) {
      response.errors.map((error) =>
        toast({
          description: error.message,
          variant: "destructive",
        })
      )
    }
    setIsSaving(false)
  }

  const getCompanyInOwnDatabase = async (nip: string) => {
    const response = await getCompany(nip)
    if (response.success && response.company) {
      setIsSendPromise(true)
      reset({
        name: response.company.name,
        nip: response.company.nip,
        streetAddress: response.company.streetAddress,
        postalCode: response.company.postalCode,
        city: response.company.city,
        country: response.company.country,
        industry: response.company.industry,
        phoneNumber: response.company.phoneNumber,
        email: response.company.email,
        website: response.company.website ?? "",
      })
      return true
    } else if (response.error) {
      toast({
        description: t(response.message),
        variant: "destructive",
      })
      return false
    } else {
      reset((values) => ({ ...values }))
      return false
    }
  }

  const getCompanyInGUSDatabase = async (nip: string) => {
    const data = await getCompanyInGUSDatabaseServer(nip)
    if (data && data.nip) {
      setError("nip", { type: "custom", message: "Podany nip jest niepoprawny" })
      reset((values) => ({ ...values }))
      return
    } else if (data.error) {
      setError("nip", { type: "custom", message: "Nie znaleziono Nipu w bazie" })
      reset((values) => ({ ...values }))
      return
    } else if (JSON.parse(data)) {
      const company = JSON.parse(data)
      reset({
        name: company.Nazwa,
        nip: company.Nip,
        streetAddress:
          `${company.Ulica !== null ? company.Ulica : ""} ${company.NrNieruchomosci !== null ? company.NrNieruchomosci : ""} ${company.NrLokalu !== null ? company.NrLokalu : ""}`.trim(),
        postalCode: company.KodPocztowy,
        city: company.Miejscowosc,
        country: "",
        industry: "",
        phoneNumber: "",
        email: "",
        website: "",
      })
      clearErrors("nip")
    } else {
      reset((values) => ({ ...values }))
    }
  }

  const checkCompany = useDebouncedCallback(async (nip: string) => {
    if (nip.length !== 10) {
      setError("nip", { type: "custom", message: "Podany nip jest niepoprawny" })
      return
    }
    clearErrors("nip")

    const isCompanyData = await getCompanyInOwnDatabase(nip)
    if (!isCompanyData) await getCompanyInGUSDatabase(nip)

    return
  }, 500)

  const handleReset = async (
    e: React.MouseEvent<HTMLButtonElement>,
    isRequest: boolean = false
  ) => {
    e.preventDefault()
    e.stopPropagation()

    if (isRequest && requestCompany) {
      const response = await sendResetRequest(requestCompany.id)
      if (response.success) {
        toast({
          description: t(response.message),
          variant: "success",
        })
      } else if (response.error) {
        toast({
          description: t(response.message),
          variant: "destructive",
        })
      }
    } else {
      setIsSendPromise(false)
    }

    reset(defVal)
  }

  const sendPromiseFunc = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    nip: string
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setSendPromise(true)
    const response = await createPromisesToCompany(user.id, nip)
    if (response.success) {
      toast({
        description: t(response.message),
        variant: "success",
      })
    } else if (response.error) {
      toast({
        description: t(response.message),
        variant: "destructive",
      })
    }
    setSendPromise(false)
    setIsSendPromise(false)
  }

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Card className="relative">
        {(requestCompany || isSendPromise) && (
          <div className="absolute z-10 flex size-full flex-col items-center justify-center gap-4 border p-4 backdrop-blur-md">
            <h3 className="text-2xl font-medium">
              {requestCompany && t("titleRequestPending")}
              {isSendPromise && t("ifCompanyExist", { company: getValues("name") })}
            </h3>
            <p className="pb-4">
              {requestCompany && t("descRequestPending")}
              {isSendPromise && t("descIfCompanyExist")}
            </p>
            <section className="flex gap-2">
              {requestCompany && (
                <Button variant={"outline"} onClick={(e) => handleReset(e, true)}>
                  {t("enterOtherData")}
                </Button>
              )}

              {isSendPromise && (
                <>
                  <Button variant={"primary"} onClick={(e) => sendPromiseFunc(e, getValues("nip"))}>
                    {sendPromise && <LuLoaderCircle className="mr-2 size-4 animate-spin" />}
                    <span>{t("sendRequest")}</span>
                  </Button>
                  <Button variant={"outline"} onClick={(e) => handleReset(e)}>
                    {t("enterOtherData")}
                  </Button>
                </>
              )}
            </section>
          </div>
        )}
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {Object.keys(companySchema.shape).map((fieldName) => (
            <div key={fieldName} className={cn(fieldName)}>
              <Label htmlFor={fieldName}>{t(fieldName)}</Label>
              <Input
                id={fieldName}
                type={getInputType(fieldName)}
                min={0}
                className="w-full"
                size={32}
                disabled={fieldName === "nip" ? belongCompany : isSendPromise}
                {...register(fieldName as keyof typeof companySchema.shape)}
                onInput={(e) =>
                  fieldName === "nip" && checkCompany((e.target as HTMLInputElement).value)
                }
              />
              {errors[fieldName as keyof typeof companySchema.shape] && (
                <p className="px-1 text-xs text-red-600">
                  {errors[fieldName as keyof typeof companySchema.shape]?.message}
                </p>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            aria-label={t("save")}
            aria-labelledby={t("save")}
            title={t("save")}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), className)}
            disabled={isAdminCompany ? isSaving : isSaving || belongCompany}
          >
            {isSaving && <LuLoaderCircle className="mr-2 size-4 animate-spin" />}
            <span>{t("save")}</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
