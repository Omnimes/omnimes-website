import { sendResetRequestDeveloper } from "@/actions/become-developer";
import { Button } from "@/components/atoms/Button";
import { toast } from "@/components/atoms/UseToast";
import { CustomLink } from "@/components/Link";
import { useTranslations } from "next-intl";

interface Props {
    status: 'belongs' | 'noData' | 'sended',
    haveRequest: boolean,
    userId: string,
}

export const ComponentFormBlurInfo = ({status, haveRequest, userId}: Props) => {
    const t = useTranslations("ComponentBluredInfo");
    const reset = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const result = await sendResetRequestDeveloper(userId);
        if(result.success) {
            toast({
                description: t(result.message),
                variant: "success",
              })
        } else if(result.error) {
            toast({
                description: t(result.message),
                variant: "destructive",
              })
        }
    }

    if(haveRequest) {
        return <BlurComponent
                    title={t("titleHaveRequest")}
                    text={t("descHaveRequest")}
                >
                    <Button variant={"outline"} onClick={(e) => reset(e)}>
                        {t('resign')}
                    </Button>
                </BlurComponent>
    }
    if(status == "noData") {
        return <BlurComponent 
                    title={t("titleNoData")} 
                    text={t("descNoData")} 
                >
                     <CustomLink 
                        href="/dashboard/settings" 
                        className="h-10 py-1 px-4 inline-flex shadow items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background whitespace-nowrap border border-input hover:bg-accent hover:text-accent-foreground"
                    >
                        {t("goToSettings")}
                    </CustomLink>
                </BlurComponent>
    } else if (status == "sended") {
        return <BlurComponent 
                    title={t("titleSended")} 
                    text={t("descSended")} 
                />
    } else if (status == "belongs") {
        return null
    }
    return null
}
 
const BlurComponent = ({title, text, children}: {title: string, text: string, children?: React.ReactNode}) => {
    return (
        <div className="absolute z-10 w-full h-full backdrop-blur-md border flex flex-col justify-center items-center gap-4 p-4">
            <h3 className="text-2xl font-medium">
                {title}
            </h3>
            <p className="pb-4">
                {text}
            </p>
            {children}
        </div>
    )
}