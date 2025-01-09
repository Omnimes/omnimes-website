import { sendResetRequestDeveloper } from "@/actions/become-developer"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/Button"
import { toast } from "@/components/ui/UseToast"
import { CustomLink } from "@/components/Link"

interface Props {
  status: "belongs" | "noData" | "sended"
  haveRequest: boolean
  userId: string
}

export const ComponentFormBlurInfo = ({ status, haveRequest, userId }: Props) => {
  const t = useTranslations("ComponentBluredInfo")
  const reset = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const result = await sendResetRequestDeveloper(userId)
    if (result.success) {
      toast({
        description: t(result.message),
        variant: "success",
      })
    } else if (result.error) {
      toast({
        description: t(result.message),
        variant: "destructive",
      })
    }
  }

  if (haveRequest) {
    return (
      <BlurComponent title={t("titleHaveRequest")} text={t("descHaveRequest")}>
        <Button variant={"outline"} onClick={(e) => reset(e)}>
          {t("resign")}
        </Button>
      </BlurComponent>
    )
  }
  if (status == "noData") {
    return (
      <BlurComponent title={t("titleNoData")} text={t("descNoData")}>
        <CustomLink
          href="/dashboard/settings"
          className="focus-visible:ring-ring ring-offset-background border-input hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-1 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {t("goToSettings")}
        </CustomLink>
      </BlurComponent>
    )
  } else if (status == "sended") {
    return <BlurComponent title={t("titleSended")} text={t("descSended")} />
  } else if (status == "belongs") {
    return null
  }
  return null
}

const BlurComponent = ({
  title,
  text,
  children,
}: {
  title: string
  text: string
  children?: React.ReactNode
}) => {
  return (
    <div className="absolute z-10 flex size-full flex-col items-center justify-center gap-4 border p-4 backdrop-blur-md">
      <h3 className="text-2xl font-medium">{title}</h3>
      <p className="pb-4">{text}</p>
      {children}
    </div>
  )
}
