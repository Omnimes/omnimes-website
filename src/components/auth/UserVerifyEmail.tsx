import { useCallback, useEffect, useState } from "react"
import { revalidatePath } from "next/cache"
import { useRouter, useSearchParams } from "next/navigation"
import { newVerification } from "@/actions/verification"
import { useTranslations } from "next-intl"
import { LuCircleAlert, LuCircleEllipsis, LuTerminal } from "react-icons/lu"

import { Alert, AlertDescription, AlertTitle } from "../ui/Alerts"

export const UserVerifyEmail = () => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)
  const [timeoutMessage, setTimeoutMessage] = useState<string>("")
  const searchParams = useSearchParams()
  const token = searchParams?.get("token")
  const router = useRouter()
  const t = useTranslations("VerifyEmailPage")

  const onSubmit = useCallback(() => {
    if (success || error) {
      return
    }

    if (!token) {
      setError("NoTokenProvided")
      return
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success)
        }
        if (data.error) {
          setError(data.error)
        }
      })
      .catch((error) => {
        console.error(error)
        setError("unexpectedError")
      })
      .finally(() => {
        setTimeoutMessage("redirectedSoon")
        setTimeout(() => {
          router.push("/dashboard")
          revalidatePath("/")
        }, 2000)
      })
  }, [success, error, token, router])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <main className="px-4">
      {!success && !error ? (
        <Alert variant={"loading"} className="mx-auto mt-20 max-w-[500px]">
          <LuCircleEllipsis className="size-4" />
          <AlertTitle>{t("loading")}</AlertTitle>
          <AlertDescription>{t("loadingDesc")}</AlertDescription>
        </Alert>
      ) : (
        <Alert
          variant={!success ? "destructive" : "success"}
          className="mx-auto mt-20 max-w-[500px]"
        >
          {!success ? <LuCircleAlert className="size-4" /> : <LuTerminal className="size-4" />}
          <AlertTitle>{success ? t("success") : t("error")}</AlertTitle>
          <AlertDescription>
            {success}
            {error}
            {timeoutMessage && <p>{timeoutMessage}</p>}
          </AlertDescription>
        </Alert>
      )}
    </main>
  )
}
