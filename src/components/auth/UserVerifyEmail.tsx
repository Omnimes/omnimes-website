"use client"

import { newVerification } from "@/actions/new-verification";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { Alert, AlertDescription, AlertTitle } from "../atoms/Alerts";
import { LuTerminal, LuCircleEllipsis, LuAlertCircle } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { revalidatePath } from 'next/cache';

export const UserVerifyEmail = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [timeoutMessage, setTimeoutMessage] = useState<string>("");
    const searchParams = useSearchParams();
    const token = searchParams?.get("token");
    const router = useRouter();
    const t = useTranslations("VerifyEmailPage");

    const onSubmit = useCallback(() => {
        if (success || error) { return }

        if (!token) {
            setError("NoTokenProvided")
            return
        }

        newVerification(token).then((data) => {
            if (data.success) {
                setSuccess(data.success);
            }
            if (data.error) {
                setError(data.error);
            }
        }).catch((error) => {
            console.error(error)
            setError("unexpectedError");
        }).finally(() => {
            setTimeoutMessage("redirectedSoon");
            setTimeout(() => {
                router.push('/dashboard');
                revalidatePath('/');
            },2000)
        })
    }, [success, error, token, router])

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <main className="px-4">
            {!success && !error
                ? (
                    <Alert
                        variant={"loading"}
                        className="max-w-[500px] mx-auto mt-20"
                    >
                        <LuCircleEllipsis className="h-4 w-4" />
                        <AlertTitle>{t("loading")}</AlertTitle>
                        <AlertDescription>{t("loadingDesc")}</AlertDescription>
                    </Alert>
                )
                : (
                    <Alert
                        variant={!success ? "destructive" : "success"}
                        className="max-w-[500px] mx-auto mt-20"
                    >
                        {!success 
                            ? <LuAlertCircle className="h-4 w-4" /> 
                            : <LuTerminal className="h-4 w-4" />
                        }
                        <AlertTitle>
                            {success ? t("success") : t("error")}
                        </AlertTitle>
                        <AlertDescription>
                            {success}
                            {error}
                            {timeoutMessage && (
                                <p>
                                    {timeoutMessage}
                                </p>
                            )}
                        </AlertDescription>
                    </Alert>
                )
            }
        </main>
    )
}
