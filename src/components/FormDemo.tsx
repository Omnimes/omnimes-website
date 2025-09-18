"use client"

import { FormEvent, useCallback, useMemo, useState } from "react"
import { sendDemoEmail } from "@/utils/sendDemoEmail"
import {
  Avatar,
  Button,
  Card,
  CardBody,
  cn,
  Input,
  Link,
  Select,
  SelectItem,
  Spinner,
  Switch,
  Textarea,
} from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { LuBuilding, LuMail, LuPhone, LuUser, LuUsers } from "react-icons/lu"
import { useWindowSize } from "usehooks-ts"

import { DangerAlert, SuccessAlert } from "./ui/Alerts"

export type DemoFormData = {
  name: string
  lastName: string
  company: string
  email: string
  phone: string
  country: string
  position: string
  industry: string
  employeeCount: string
  message: string
  locale?: string
}

export const FormDemo = () => {
  const t = useTranslations("DemoForm")
  const locale = useLocale()
  const { width = 0 } = useWindowSize()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [validPrivacy, setValidPrivacy] = useState<boolean>(false)
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false)
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
    phone: "",
    country: "poland",
    position: "",
    industry: "",
    employeeCount: "",
    message: "",
  })

  const onChange = (key: string, value: string) => {
    setAlert(false)
    setFormValues((prev) => ({ ...prev, ...{ [key]: value } }))
  }

  const validateEmail = (value: string) =>
    value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  const validateText = (value: string) => value.length >= 3
  const validateNumber = useCallback(
    (value: string) => {
      const country = formValues.country || "poland"
      if (country == "england") return /^\+44\d{10}$/.test("+44" + value)
      if (country == "poland") return /^\+48\d{9}$/.test("+48" + value)
      if (country == "switzerland") return /^\+41\d{9}$/.test("+41" + value)
      if (country == "germany") return /^\+49\d{10}$/.test("+49" + value)
      if (country == "spain") return /^\+34\d{9}$/.test("+34" + value)
      if (country == "france") return /^\+33\d{9}$/.test("+33" + value)
      if (country == "italy") return /^\+39\d{10}$/.test("+39" + value)
      return false
    },
    [formValues.country]
  )

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

  const isInvalidNumber = useMemo(() => {
    if (formValues.phone === "") return false
    const validate = validateNumber(formValues.phone)
    return validate ? false : true
  }, [formValues.phone, validateNumber])

  const isInvalidPosition = useMemo(() => {
    if (formValues.position === "") return false
    return validateText(formValues.position) ? false : true
  }, [formValues.position])

  const isInvalidMessage = useMemo(() => {
    if (formValues.message === "") return false
    return validateText(formValues.message) ? false : true
  }, [formValues.message])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (privacyConsent !== true) {
      setValidPrivacy(true)
      return
    }
    if (
      isInvalidName ||
      isInvalidLastName ||
      isInvalidCompany ||
      isInvalidEmail ||
      isInvalidNumber ||
      isInvalidPosition ||
      isInvalidMessage ||
      !formValues.industry ||
      !formValues.employeeCount
    ) {
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
      phone: "",
      country: "poland",
      position: "",
      industry: "",
      employeeCount: "",
      message: "",
    })
  }

  const industryOptions = [
    { key: "manufacturing", label: t("industries.manufacturing") },
    { key: "automotive", label: t("industries.automotive") },
    { key: "electronics", label: t("industries.electronics") },
    { key: "food", label: t("industries.food") },
    { key: "pharmaceutical", label: t("industries.pharmaceutical") },
    { key: "textile", label: t("industries.textile") },
    { key: "chemical", label: t("industries.chemical") },
    { key: "other", label: t("industries.other") },
  ]

  const employeeCountOptions = [
    { key: "1-10", label: "1-10" },
    { key: "11-50", label: "11-50" },
    { key: "51-200", label: "51-200" },
    { key: "201-1000", label: "201-1000" },
    { key: "1000+", label: "1000+" },
  ] // ← Dodany średnik tutaj

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
        <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-[#FF1CF7]/10 to-[#b249f8]/10 px-6 py-3">
          <span className="text-sm font-medium text-[#FF1CF7] dark:text-[#b249f8]">
            🚀 {t("freeDemoAccess")}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {t("formTitle") || "Przetestuj OmniMES"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          {t("formSubtitle") ||
            "Wypełnij formularz i otrzymaj natychmiastowy dostęp do w pełni funkcjonalnej wersji demonstracyjnej"}
        </p>
      </div>

      {/* Form Card */}
      <Card className="border-0 bg-white/80 shadow-2xl shadow-black/10 backdrop-blur-sm dark:bg-gray-900/80">
        <CardBody className="p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info Section */}
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
              <div className="grid gap-6 sm:grid-cols-2">
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
                <Input
                  type="text"
                  label={t("position") || "Stanowisko"}
                  placeholder={t("positionPlaceholder") || "Twoje stanowisko"}
                  labelPlacement="outside"
                  isRequired
                  isClearable
                  startContent={<LuUsers className="text-gray-400" />}
                  value={formValues.position}
                  isInvalid={isInvalidPosition}
                  errorMessage={
                    isInvalidPosition && (t("positionMessage") || "Stanowisko jest wymagane")
                  }
                  onValueChange={(evt) => onChange("position", evt)}
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

              <div className="grid gap-6 sm:grid-cols-2">
                <Select
                  label={t("industry") || "Branża"}
                  placeholder={t("industryPlaceholder") || "Wybierz branżę"}
                  labelPlacement="outside"
                  isRequired
                  startContent={<LuBuilding className="text-gray-400" />}
                  selectedKeys={formValues.industry ? [formValues.industry] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string
                    onChange("industry", selectedKey || "")
                  }}
                  variant="bordered"
                  classNames={{
                    base: "group",
                    trigger:
                      "border-gray-200 hover:border-[#FF1CF7]/30 focus:border-[#FF1CF7] dark:border-gray-700 dark:hover:border-[#b249f8]/30 dark:focus:border-[#b249f8]",
                    label: "text-gray-700 dark:text-gray-300 font-medium",
                    value: "text-gray-900 dark:text-white",
                  }}
                >
                  {industryOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label={t("employeeCount") || "Liczba pracowników"}
                  placeholder={t("employeeCountPlaceholder") || "Wybierz zakres"}
                  labelPlacement="outside"
                  isRequired
                  startContent={<LuUsers className="text-gray-400" />}
                  selectedKeys={formValues.employeeCount ? [formValues.employeeCount] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string
                    onChange("employeeCount", selectedKey || "")
                  }}
                  variant="bordered"
                  classNames={{
                    base: "group",
                    trigger:
                      "border-gray-200 hover:border-[#FF1CF7]/30 focus:border-[#FF1CF7] dark:border-gray-700 dark:hover:border-[#b249f8]/30 dark:focus:border-[#b249f8]",
                    label: "text-gray-700 dark:text-gray-300 font-medium",
                    value: "text-gray-900 dark:text-white",
                  }}
                >
                  {employeeCountOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("contactSection")}
              </h3>
              <div className="relative">
                <Input
                  type="tel"
                  label={t("phone") || "Telefon"}
                  placeholder={t("phonePlaceholder") || "123456789"}
                  labelPlacement="outside"
                  isRequired
                  isClearable
                  value={formValues.phone}
                  isInvalid={isInvalidNumber}
                  errorMessage={isInvalidNumber && (t("phoneMessage") || "Wprowadź poprawny numer")}
                  onValueChange={(evt) => onChange("phone", evt)}
                  variant="bordered"
                  classNames={{
                    base: "group",
                    input:
                      "text-gray-900 dark:text-white group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50 transition-colors",
                    inputWrapper:
                      "border-gray-200 hover:border-[#FF1CF7]/30 focus-within:border-[#FF1CF7] dark:border-gray-700 dark:hover:border-[#b249f8]/30 dark:focus-within:border-[#b249f8]",
                    label: "text-gray-700 dark:text-gray-300 font-medium",
                  }}
                  startContent={
                    <div className="flex items-center gap-2">
                      <LuPhone className="text-gray-400" />
                      <Select
                        aria-label="Kraj"
                        size="sm"
                        selectionMode="single"
                        defaultSelectedKeys={["poland"]}
                        classNames={{
                          base: "w-[90px] sm:w-[140px]",
                          trigger:
                            "border-0 shadow-none bg-transparent hover:bg-gray-50/50 dark:hover:bg-gray-800/50",
                        }}
                        onChange={(evt) => onChange("country", evt.target.value)}
                      >
                        <SelectItem
                          key="poland"
                          textValue="Poland"
                          startContent={
                            <Avatar
                              alt="Poland"
                              className="size-5"
                              src="https://flagcdn.com/pl.svg"
                            />
                          }
                        >
                          {width > 500 ? "Poland" : "PL"}
                        </SelectItem>
                        <SelectItem
                          key="england"
                          textValue="England"
                          startContent={
                            <Avatar
                              alt="England"
                              className="size-5"
                              src="https://flagcdn.com/gb-eng.svg"
                            />
                          }
                        >
                          {width > 500 ? "England" : "GB"}
                        </SelectItem>
                        <SelectItem
                          key="germany"
                          textValue="Germany"
                          startContent={
                            <Avatar
                              alt="Germany"
                              className="size-5"
                              src="https://flagcdn.com/de.svg"
                            />
                          }
                        >
                          {width > 500 ? "Germany" : "DE"}
                        </SelectItem>
                        <SelectItem
                          key="switzerland"
                          textValue="Switzerland"
                          startContent={
                            <Avatar
                              alt="Switzerland"
                              className="size-5"
                              src="https://flagcdn.com/ch.svg"
                            />
                          }
                        >
                          {width > 500 ? "Switzerland" : "CH"}
                        </SelectItem>
                        <SelectItem
                          key="spain"
                          textValue="Spain"
                          startContent={
                            <Avatar
                              alt="Spain"
                              className="size-5"
                              src="https://flagcdn.com/es.svg"
                            />
                          }
                        >
                          {width > 500 ? "Spain" : "ES"}
                        </SelectItem>
                        <SelectItem
                          key="france"
                          textValue="France"
                          startContent={
                            <Avatar
                              alt="France"
                              className="size-5"
                              src="https://flagcdn.com/fr.svg"
                            />
                          }
                        >
                          {width > 500 ? "France" : "FR"}
                        </SelectItem>
                        <SelectItem
                          key="italy"
                          textValue="Italy"
                          startContent={
                            <Avatar
                              alt="Italy"
                              className="size-5"
                              src="https://flagcdn.com/it.svg"
                            />
                          }
                        >
                          {width > 500 ? "Italy" : "IT"}
                        </SelectItem>
                      </Select>
                    </div>
                  }
                />
              </div>

              <Textarea
                label={t("message") || "Dodatkowe informacje"}
                placeholder={t("messagePlaceholder") || "Opisz swoje potrzeby..."}
                labelPlacement="outside"
                isRequired
                value={formValues.message}
                isInvalid={isInvalidMessage}
                errorMessage={
                  isInvalidMessage && (t("messageMessage") || "Wiadomość jest wymagana")
                }
                onValueChange={(evt) => onChange("message", evt)}
                variant="bordered"
                minRows={4}
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

            {/* Privacy Section */}
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
