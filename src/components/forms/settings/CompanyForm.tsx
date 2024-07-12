"use client"

import * as React from "react"
import * as z from "zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../atoms/Card"
import { Label } from "@/components/atoms/Label"
import { Input } from "../../atoms/Input"
import { Button, buttonVariants } from "../../atoms/Button"
import { useTranslations } from "next-intl"
import { Loader2 } from "lucide-react"
import { toast } from "../../atoms/UseToast"
import { cn, getInputType } from "@/utils/utils"
import { companySchema } from "@/utils/validations/company"
import { createCompany, createPromisesToCompany, getCompany, sendResetRequest } from "@/actions/company"
import { useDebouncedCallback } from 'use-debounce';
type FormData = z.infer<typeof companySchema>

interface Props {
  user: Pick<User, "id">;
  company: Company | null;
  belongCompany: boolean;
  requestCompany: boolean;
  requestCompanyData: ReqCompany;
  className?: string;
}

export type ReqCompany = {
  id: string;
  userId: string;
  companyId: string;
}

export type Company = {
  id?: string;
  name: string;
  nip: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  industry: string;
  phoneNumber: string;
  email: string;
  website: string;
}

export const CompanyForm = ({ user, company, belongCompany, requestCompany, requestCompanyData, className, ...props }: Props) => {
  const t = useTranslations("CompanyForm")
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isSendPromise, setIsSendPromise] = React.useState<boolean>(false);
  const [sendPromise, setSendPromise] = React.useState<boolean>(false);

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
  let defaultCompanyValues = company == null ? defVal : { ...company, website: company.website == null ? "" : company.website };

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultCompanyValues,
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    const response = await createCompany(data, user.id);

    setIsSaving(false)
  }

  const checkCompany = useDebouncedCallback(async (nip: string) => {
    try {
      const response = await getCompany(nip);
      if (response.status == 'success' && response.company) {
        setIsSendPromise(true);
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
        });
      }

      else {
        reset((values) => ({
          ...values, // Keep the current values
          name: "",
          streetAddress: "",
          postalCode: "",
          city: "",
          country: "",
          industry: "",
          phoneNumber: "",
          email: "",
          website: "",
        }));
      }
    } catch (error) {
      console.log(error)
    }
  }, 300)

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSendPromise(false);
    reset(defVal);
  }

  const resetFormReq = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    sendResetRequest(requestCompanyData.id);
    reset(defVal);
  }

  const sendPromiseFunc = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, nip: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSendPromise(true)
    const data = await createPromisesToCompany(user.id, nip);
    setSendPromise(false)
    setIsSendPromise(false)
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card className="relative">
        {(requestCompany || isSendPromise) && (
          <div className="absolute z-10 w-full h-full backdrop-blur-md border flex flex-col justify-center items-center gap-4 p-4">
            <h3 className="text-2xl font-medium">
              {requestCompany && "Twoja prośba oczekuje na potwierdzenie"}
              {isSendPromise && `Firma ${getValues("name")} znajduję się w bazie`}
            </h3>
            <p className="pb-4">
              {requestCompany && "Twoja prośba została wysłana do administratora firmy. Prosimy o cierpliwość, już wkrótce wniosek zostanie rozpatrzony."}
              {isSendPromise && "Wyślij prośbę o zatwierdzenie do administratora firmy"}
            </p>

            <section className="flex gap-2">
              {requestCompany && <Button variant={"outline"} onClick={(e) => resetFormReq(e)}>
                Wpowadź inne dane
              </Button>}

              {isSendPromise && (<>
                <Button variant={"primary"} onClick={(e) => sendPromiseFunc(e, getValues("nip"))}>
                  {sendPromise && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <span>Wyślij prośbę</span>
                </Button>
                <Button variant={"outline"} onClick={resetForm}>
                  Wpowadź inne dane
                </Button>
              </>)}
            </section>
          </div>
        )}
        {/* {requestCompany && (
          <div className="absolute z-10 w-full h-full backdrop-blur-md border flex flex-col justify-center items-center gap-4 p-4">
            <h3 className="text-2xl font-medium">Twoja prośba oczekuje na potwierdzenie</h3>
            <p className="pb-4">Twoja prośba została wysłana do administratora firmy. Prosimy o cierpliwość, już wkrótce wniosek zostanie rozpatrzony.</p>
            <section className="flex gap-2">
              <Button variant={"outline"} onClick={(e) => resetFormReq(e)}>
                Wpowadź inne dane
              </Button>
            </section>
          </div>
        )}
        {isSendPromise && (
          <div className="absolute z-10 w-full h-full backdrop-blur-md border flex flex-col justify-center items-center gap-4 p-4">
            <h3 className="text-2xl font-medium">Firma {getValues("name")} znajduję się w bazie</h3>
            <p className="pb-4">Wyślij prośbę o zatwierdzenie do administratora firmy</p>
            <section className="flex gap-2">
              <Button variant={"primary"} onClick={(e) => sendPromiseFunc(e, getValues("nip"))}>
                {sendPromise && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Wyślij prośbę</span>
              </Button>
              <Button variant={"outline"} onClick={resetForm}>
                Wpowadź inne dane
              </Button>
            </section>
          </div>
        )} */}
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {Object.keys(companySchema.shape).map((fieldName) => (
            <div key={fieldName} className={cn(
              fieldName
            )}>
              <Label htmlFor={fieldName}>
                {t(fieldName)}
              </Label>
              <Input
                id={fieldName}
                type={getInputType(fieldName)}
                min={0}
                className="w-full"
                size={32}
                disabled={fieldName === "nip" ? belongCompany : isSendPromise}
                {...register(fieldName as keyof typeof companySchema.shape)}
                onInput={(e) => fieldName === "nip" && checkCompany((e.target as HTMLInputElement).value)}
              />
              {errors[fieldName as keyof typeof companySchema.shape] && (
                <p className="px-1 text-xs text-red-600">{errors[fieldName as keyof typeof companySchema.shape]?.message}</p>
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
            disabled={isSaving}
          >
            {isSaving && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{t("save")}</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
} 