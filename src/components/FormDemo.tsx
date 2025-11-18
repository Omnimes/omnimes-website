"use client"

import { FormEvent, useMemo, useState } from "react"
import { sendDemoEmail } from "@/utils/sendDemoEmail"
import { Button, Card, CardBody, cn, Input, Link, Spinner, Switch } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { LuBuilding, LuMail, LuUser } from "react-icons/lu"

import { DangerAlert, SuccessAlert } from "./ui/Alerts"

export type DemoFormData = {
  name: string
  lastName: string
  company: string
  email: string
  locale?: string
}

export const FormDemo = () => {
  const t = useTranslations("DemoForm")
  const locale = useLocale()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [validPrivacy, setValidPrivacy] = useState<boolean>(false)
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false)
  const [validMarketing, setValidMarketing] = useState<boolean>(false)
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<{ type: string; message: string }>({
    message: "",
    type: "",
  })
  const [formValues, setFormValues] = useState<DemoFormData>({
    name: "",
    lastName: "",
    company: "",
    email: "",
  })

  const onChange = (key: string, value: string) => {
    setAlert(false)
    setFormValues((prev) => ({ ...prev, ...{ [key]: value } }))
  }

  const validateEmail = (value: string) =>
    value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  const validateText = (value: string) => value.length >= 3

  const isInvalidName = useMemo(() => {
    if (formValues.name === "") return false
    return validateText(formValues.name) ? false : true
  }, [formValues.name])

  const isInvalidLastName = useMemo(() => {
    if (formValues.lastName === "") return false
    return validateText(formValues.lastName) ? false : true
  }, [formValues.lastName])

  const isInvalidCompany = useMemo(() => {
    if (formValues.company === "") return false
    return validateText(formValues.company) ? false : true
  }, [formValues.company])

  const isInvalidEmail = useMemo(() => {
    if (formValues.email === "") return false
    return validateEmail(formValues.email) ? false : true
  }, [formValues.email])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (privacyConsent !== true) {
      setValidPrivacy(true)
      return
    }
    if (marketingConsent !== true) {
      setValidMarketing(true)
      return
    }
    if (isInvalidName || isInvalidLastName || isInvalidCompany || isInvalidEmail) {
      setAlert(true)
      return
    }

    setIsPending(true)

    const response = await sendDemoEmail({ ...formValues, locale })
    if (response) {
      setResponseMessage({
        message: response.message,
        type: response.type,
      })

      if (response.type != "error") {
        clearForm()
        setPrivacyConsent(false)
        setMarketingConsent(false)
      }

      setTimeout(() => {
        setResponseMessage({
          message: "",
          type: "",
        })
      }, 5000)
    }

    setIsPending(false)
  }

  const clearForm = () => {
    setFormValues({
      name: "",
      lastName: "",
      company: "",
      email: "",
    })
  }

  return (
    <section className="relative isolate mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
      {/* Abstract Background */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Header Section */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          {t("formTitle")}
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          {t("formSubtitle")}
        </p>
      </div>

      {/* Main Form Card */}
      <Card
        shadow="lg"
        className="border border-gray-200/50 bg-white/50 backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/50"
      >
        <CardBody className="p-8 sm:p-12">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("personalData")}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  type="text"
                  label={t("firstName") || "Imię"}
                  placeholder={t("firstNamePlaceholder") || "Wprowadź swoje imię"}
                  labelPlacement="outside"
                  isRequired
                  isClearable
                  startContent={<LuUser className="text-gray-400" />}
                  value={formValues.name}
                  isInvalid={isInvalidName}
                  errorMessage={isInvalidName && (t("firstNameMessage") || "Imię jest wymagane")}
                  onValueChange={(evt) => onChange("name", evt)}
                  variant="bordered"
                  classNames={{
                    base: "group",
                    input:
                      "text-gray-900 dark:text-white group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50 transition-colors",
                    inputWrapper:
                      "border-gray-200 hover:border-[#FF1CF7]/30 focus-within:border-[#FF1CF7] dark:border-gray-700 dark:hover:border-[#b249f8]/30 dark:focus-within:border-[#b249f8]",
                    label: "text-gray-700 dark:text-gray-300 font-medium",
                  }}
                />

                <Input
                  type="text"
                  label={t("lastName") || "Nazwisko"}
                  placeholder={t("lastNamePlaceholder") || "Wprowadź swoje nazwisko"}
                  labelPlacement="outside"
                  isRequired
                  isClearable
                  startContent={<LuUser className="text-gray-400" />}
                  value={formValues.lastName}
                  isInvalid={isInvalidLastName}
                  errorMessage={
                    isInvalidLastName && (t("lastNameMessage") || "Nazwisko jest wymagane")
                  }
                  onValueChange={(evt) => onChange("lastName", evt)}
                  variant="bordered"
                  classNames={{
                    base: "group",
                    input:
                      "text-gray-900 dark:text-white group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50 transition-colors",
                    inputWrapper:
                      "border-gray-200 hover:border-[#FF1CF7]/30 focus-within:border-[#FF1CF7] dark:border-gray-700 dark:hover:border-[#b249f8]/30 dark:focus-within:border-[#b249f8]",
                    label: "text-gray-700 dark:text-gray-300 font-medium",
                  }}
                />
              </div>

              <Input
                type="email"
                label={t("email") || "E-mail"}
                placeholder={t("emailPlaceholder") || "twoj.email@firma.com"}
                labelPlacement="outside"
                isRequired
                isClearable
                startContent={<LuMail className="text-gray-400" />}
                value={formValues.email}
                isInvalid={isInvalidEmail}
                errorMessage={
                  isInvalidEmail && (t("emailMessage") || "Wprowadź poprawny adres e-mail")
                }
                onValueChange={(evt) => onChange("email", evt)}
                variant="bordered"
                classNames={{
                  base: "group",
                  input:
                    "text-gray-900 dark:text-white group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50 transition-colors",
                  inputWrapper:
                    "border-gray-200 hover:border-[#FF1CF7]/30 focus-within:border-[#FF1CF7] dark:border-gray-700 dark:hover:border-[#b249f8]/30 dark:focus-within:border-[#b249f8]",
                  label: "text-gray-700 dark:text-gray-300 font-medium",
                }}
              />
            </div>

            {/* Company Info Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("companyInfo")}
              </h3>
              <Input
                type="text"
                label={t("company") || "Nazwa firmy"}
                placeholder={t("companyPlaceholder") || "Wprowadź nazwę firmy"}
                labelPlacement="outside"
                isRequired
                isClearable
                startContent={<LuBuilding className="text-gray-400" />}
                value={formValues.company}
                isInvalid={isInvalidCompany}
                errorMessage={
                  isInvalidCompany && (t("companyMessage") || "Nazwa firmy jest wymagana")
                }
                onValueChange={(evt) => onChange("company", evt)}
                variant="bordered"
                classNames={{
                  base: "group",
                  input:
                    "text-gray-900 dark:text-white group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50 transition-colors",
                  inputWrapper:
                    "border-gray-200 hover:border-[#FF1CF7]/30 focus-within:border-[#FF1CF7] dark:border-gray-700 dark:hover:border-[#b249f8]/30 dark:focus-within:border-[#b249f8]",
                  label: "text-gray-700 dark:text-gray-300 font-medium",
                }}
              />
            </div>

            {/* Privacy Consent Section */}
            <div className="rounded-lg bg-gray-50/50 p-6 dark:bg-gray-800/30">
              <Switch
                required
                isSelected={privacyConsent}
                onValueChange={() => {
                  setPrivacyConsent(!privacyConsent)
                  setValidPrivacy(false)
                }}
                classNames={{
                  base: cn(
                    "inline-flex w-full cursor-pointer items-center gap-4 rounded-lg p-4 transition-all",
                    "hover:bg-gray-100/50 dark:hover:bg-gray-700/30",
                    validPrivacy && "bg-red-50/50 ring-2 ring-red-500/20 dark:bg-red-900/10"
                  ),
                  wrapper:
                    "group-data-[selected=true]:bg-gradient-to-r group-data-[selected=true]:from-[#FF1CF7] group-data-[selected=true]:to-[#b249f8]",
                  thumb: "group-data-[selected=true]:bg-white",
                }}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("privacyConsent") || "Wyrażam zgodę na przetwarzanie danych osobowych"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {t("privacyMessage") ||
                      "Twoje dane będą wykorzystane wyłącznie w celu udostępnienia demo"}
                    &nbsp;
                    <Link
                      isExternal
                      href="/privacy-policy"
                      className="font-medium text-[#FF1CF7] hover:text-[#b249f8] dark:text-[#b249f8] dark:hover:text-[#FF1CF7]"
                      size="sm"
                    >
                      {t("privacyPolicy") || "Polityka prywatności"}
                    </Link>
                    .
                  </p>
                </div>
              </Switch>
            </div>

            {/* Marketing Consent Section */}
            <div className="rounded-lg bg-gray-50/50 p-6 dark:bg-gray-800/30">
              <Switch
                required
                isSelected={marketingConsent}
                onValueChange={() => {
                  setMarketingConsent(!marketingConsent)
                  setValidMarketing(false)
                }}
                classNames={{
                  base: cn(
                    "inline-flex w-full cursor-pointer items-center gap-4 rounded-lg p-4 transition-all",
                    "hover:bg-gray-100/50 dark:hover:bg-gray-700/30",
                    validMarketing && "bg-red-50/50 ring-2 ring-red-500/20 dark:bg-red-900/10"
                  ),
                  wrapper:
                    "group-data-[selected=true]:bg-gradient-to-r group-data-[selected=true]:from-[#FF1CF7] group-data-[selected=true]:to-[#b249f8]",
                  thumb: "group-data-[selected=true]:bg-white",
                }}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("dataProtectionInfo2")}
                  </p>
                </div>
              </Switch>
            </div>

            {/* Alerts */}
            {alert && <DangerAlert title={t("alertTitle")} text={t("alertMessage")} />}
            {responseMessage.type == "success" && (
              <SuccessAlert title={t("success")} text={responseMessage.message} />
            )}
            {responseMessage.type == "error" && (
              <DangerAlert title={t("error")} text={t("errorMessage")} />
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                className="w-full bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                size="lg"
              >
                {isPending ? (
                  <>
                    <Spinner size="sm" color="white" />
                    {t("submitting") || "Wysyłanie..."}
                  </>
                ) : (
                  <>🚀 {t("submitButton") || "Wyślij i otrzymaj dostęp"}</>
                )}
              </Button>
            </div>

            {/* Info Box */}
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-full bg-blue-100 p-2 dark:bg-blue-800/50">
                  <svg
                    className="size-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                    {t("dataProtection")}
                  </h4>
                  <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                    {t("dataProtectionInfo")}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </section>
  )
}
