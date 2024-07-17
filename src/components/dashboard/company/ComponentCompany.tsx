import { Badge } from "@/components/atoms/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
export const ComponentCompany = (
  {
    status,
    data
  }: {
    status: "belongs" | "sended" | "noData";
    data: {
      id: string;
      name: string;
      nip: string;
      phoneNumber: string;
      email: string;
      website: string;
    } | null
  }
) => {

  const t = useTranslations('ComponentCompany');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex gap-2">
            {t('status')}
            {status == 'belongs' && (<Badge variant={"outline"}>{t("BelongsTo")}{data?.name}</Badge>)}
            {status == 'sended' && (<Badge variant={"outline"}>{t("sended")}</Badge>)}
            {status == 'noData' && (<Badge variant={"outline"}><Link href={"/dashboard/settings#company"} className="flex gap-1 items-center"><LuPlus /> {t("add")}</Link></Badge>)}
          </div>
          {data !== null && <section>
            {Object.entries(data).map(([key, value]) => {
                if (key == 'id') return
                return (
                  <p key={key} className="mb-2">
                    {t(key)}:&nbsp;<strong>{value}</strong> 
                  </p>
                )
              })}
            </section>
          }
        </div>
      </CardContent>
    </Card>
  )
}