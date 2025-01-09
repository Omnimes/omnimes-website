"use client"

import { FormEvent, useCallback, useMemo, useState } from "react"
import { sendEmail } from "@/utils/sendEmail"
import {
  Avatar,
  Button,
  cn,
  Input,
  Link,
  Select,
  SelectItem,
  Spinner,
  Switch,
  Textarea,
} from "@nextui-org/react"
import { useTranslations } from "next-intl"
import { LuBuilding, LuMail, LuPhone, LuUser, LuUsers } from "react-icons/lu"
import { useWindowSize } from "usehooks-ts"

import { DangerAlert, SuccessAlert } from "./ui/Alerts"

export type FormData = {
  name: string
  lastName: string
  company: string
  email: string
  phone: string
  country: string
  message: string
}

export const Form = () => {
  const t = useTranslations("Form")
  const { width = 0 } = useWindowSize()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [validPrivacy, setValidPrivacy] = useState<boolean>(false)
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<{ type: string; message: string }>({
    message: "",
    type: "",
  })
  const [formValues, setFormValues] = useState<FormData>({
    name: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    country: "poland",
    message: "",
  })

  const onChange = (key: string, value: string) => {
    setAlert(false)
    setFormValues((prev) => ({ ...prev, ...{ [key]: value } }))
  }

  const validateEmail = (value: string) =>
    value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
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
      isInvalidMessage
    ) {
      setAlert(true)
      return
    }

    setIsPending(true)

    const response = await sendEmail(formValues)
    if (response) {
      setResponseMessage({
        message: response.message,
        type: response.type,
      })

      if (response.type != "error") {
        clearForm()
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
      message: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-3xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <Input
          type="text"
          label={t("FirstNameLabel")}
          placeholder={t("FirstNamePlaceholder")}
          labelPlacement="outside"
          isRequired
          isClearable
          startContent={<LuUser />}
          value={formValues.name}
          isInvalid={isInvalidName}
          errorMessage={isInvalidName && t("FirstNameMessage")}
          onValueChange={(evt) => onChange("name", evt)}
        />
        <Input
          type="text"
          label={t("LastNameLabel")}
          placeholder={t("LastNamePlaceholder")}
          labelPlacement="outside"
          isRequired
          isClearable
          startContent={<LuUsers />}
          value={formValues.lastName}
          isInvalid={isInvalidLastName}
          errorMessage={isInvalidLastName && t("LastNameMessage")}
          onValueChange={(evt) => onChange("lastName", evt)}
        />
        <div className="sm:col-span-2">
          <Input
            type="text"
            label={t("CompanyLabel")}
            placeholder={t("CompanyPlaceholder")}
            labelPlacement="outside"
            isRequired
            isClearable
            startContent={<LuBuilding />}
            value={formValues.company}
            isInvalid={isInvalidCompany}
            errorMessage={isInvalidCompany && t("CompanyMessage")}
            onValueChange={(evt) => onChange("company", evt)}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="email"
            label={t("EmailLabel")}
            placeholder={t("EmailPlaceholder")}
            labelPlacement="outside"
            isRequired
            isClearable
            startContent={<LuMail />}
            value={formValues.email}
            isInvalid={isInvalidEmail}
            errorMessage={isInvalidEmail && t("EmailMessage")}
            onValueChange={(evt) => onChange("email", evt)}
          />
        </div>
        <div className="sm:col-span-2">
          <div className="relative mt-2.5">
            <Input
              type="tel"
              label={t("PhoneLabel")}
              placeholder={t("PhonePlaceholder")}
              labelPlacement="outside"
              isRequired
              isClearable
              value={formValues.phone}
              isInvalid={isInvalidNumber}
              errorMessage={isInvalidNumber && t("PhoneMessage")}
              onValueChange={(evt) => onChange("phone", evt)}
              startContent={
                <div className="flex items-center justify-center gap-2 align-middle">
                  <LuPhone />
                  <Select
                    aria-label={t("SelectLabel")}
                    aria-labelledby={t("SelectLabel")}
                    labelPlacement="outside"
                    size="sm"
                    placeholder={t("SelectLabel")}
                    selectionMode="single"
                    defaultSelectedKeys={["poland"]}
                    classNames={{
                      base: "w-[90px] sm:w-[200px] shadow-none",
                      trigger: "shadow-none",
                    }}
                    isRequired
                    onChange={(evt) => onChange("country", evt.target.value)}
                  >
                    <SelectItem
                      key="poland"
                      textValue={t("Poland")}
                      startContent={
                        <Avatar
                          alt={t("Poland")}
                          className="size-6"
                          src="https://flagcdn.com/pl.svg"
                        />
                      }
                    >
                      {width > 500 ? t("Poland") : ""}
                    </SelectItem>
                    <SelectItem
                      key="england"
                      textValue={t("England")}
                      startContent={
                        <Avatar
                          alt={t("England")}
                          className="size-6"
                          src="https://flagcdn.com/gb-eng.svg"
                        />
                      }
                    >
                      {width > 500 ? t("England") : ""}
                    </SelectItem>
                    <SelectItem
                      key="switzerland"
                      textValue={t("Switzerland")}
                      startContent={
                        <Avatar
                          alt={t("Switzerland")}
                          className="size-6"
                          src="https://flagcdn.com/ch.svg"
                        />
                      }
                    >
                      {width > 500 ? t("Switzerland") : ""}
                    </SelectItem>
                    <SelectItem
                      key="germany"
                      textValue={t("Germany")}
                      startContent={
                        <Avatar
                          alt={t("Germany")}
                          className="size-6"
                          src="https://flagcdn.com/de.svg"
                        />
                      }
                    >
                      {width > 500 ? t("Germany") : ""}
                    </SelectItem>
                    <SelectItem
                      key="spain"
                      textValue={t("Spain")}
                      startContent={
                        <Avatar
                          alt={t("Spain")}
                          className="size-6"
                          src="https://flagcdn.com/es.svg"
                        />
                      }
                    >
                      {width > 500 ? t("Spain") : ""}
                    </SelectItem>
                    <SelectItem
                      key="france"
                      textValue={t("France")}
                      startContent={
                        <Avatar
                          alt={t("France")}
                          className="size-6"
                          src="https://flagcdn.com/fr.svg"
                        />
                      }
                    >
                      {width > 500 ? t("France") : ""}
                    </SelectItem>
                    <SelectItem
                      key="italy"
                      textValue={t("Italy")}
                      startContent={
                        <Avatar
                          alt={t("Italy")}
                          className="size-6"
                          src="https://flagcdn.com/it.svg"
                        />
                      }
                    >
                      {width > 500 ? t("Italy") : ""}
                    </SelectItem>
                  </Select>
                </div>
              }
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label={t("TextareaLabel")}
            labelPlacement="outside"
            placeholder={t("TextareaPlaceholder")}
            aria-label={t("TextareaLabel")}
            disableAnimation
            disableAutosize
            classNames={{
              base: "max-w-full",
              input: "resize-y min-h-[80px]",
            }}
            isRequired
            value={formValues.message}
            isInvalid={isInvalidMessage}
            errorMessage={isInvalidMessage && t("TextareaMessage")}
            onValueChange={(evt) => onChange("message", evt)}
          />
        </div>

        <div className="flex gap-x-4 sm:col-span-2">
          <Switch
            required
            defaultSelected={false}
            isSelected={privacyConsent}
            onValueChange={() => {
              setPrivacyConsent(!privacyConsent)
              setValidPrivacy(false)
            }}
            classNames={{
              base: cn(
                "bg-content2 hover:bg-content3 inline-flex w-full flex-row items-center",
                "max-w-full cursor-pointer gap-2 rounded-lg border-2 border-transparent p-4",
                validPrivacy && "border-danger"
              ),
              wrapper: "p-0 h-4 overflow-visible bg-default-400 ",
              thumb: cn(
                "size-6 border-2 shadow-lg",
                "group-data-[hover=true]:border-primary-500",
                //selected
                "group-data-[selected=true]:bg-primary-500 group-data-[selected=true]:ml-6 ",
                // pressed
                "group-data-[pressed=true]:w-7",
                "group-data-[selected]:group-data-[pressed]:ml-4"
              ),
            }}
          >
            <div className="flex flex-col gap-1">
              <span className="sr-only">{t("Agree")}</span>
              <p className="text-medium">{t("Agree")}</p>
              <p className="text-tiny text-default-400">
                {t("AgreeMessage")}&nbsp;
                <Link
                  isExternal
                  href="/privacy-policy"
                  className="text-primary-600 font-semibold"
                  size="sm"
                  showAnchorIcon
                >
                  {t("Privacy")}
                </Link>
                .
              </p>
            </div>
          </Switch>
        </div>
      </div>
      {alert && <DangerAlert title={t("DangerAlertTitle")} text={t("DangerAlertMessage")} />}
      {responseMessage.type == "success" && (
        <SuccessAlert title={t("SuccessForm")} text={t("SuccessFormMessage")} />
      )}
      {responseMessage.type == "error" && (
        <DangerAlert title={t("ErrorForm")} text={t("ErrorFormMessage")} />
      )}
      <div className="mt-10">
        <Button
          radius="md"
          fullWidth={true}
          variant="shadow"
          className=" bg-primary-600 hover:bg-primary-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          isLoading={isPending}
          spinner={<Spinner size="sm" />}
          spinnerPlacement={"end"}
          aria-label={t("AriaButton")}
          aria-labelledby={t("AriaButton")}
          title={t("AriaButton")}
          type="submit"
        >
          {t("Button")}
        </Button>
      </div>
    </form>
  )
}
