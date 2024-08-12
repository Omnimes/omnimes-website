import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/session";
import { DashboardShell } from "@/components/dashboard/Shell"
import { DashboardHeader } from "@/components/dashboard/Header"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { getLocalePrimaryDialects } from "@/data/locales"
import { genPageMetadata } from "@/app/seo"
import { BecomeDeveloperForm } from "@/components/forms/become-developer/BecomeDeveloper"
import { getCompanyAndRoleRequestStatus } from "@/actions/become-developer"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "BecomeDeveloperPage" });
  const title = t('title');
  const description = t('desc');
  const keywords = t('keywords');
  const localeShort = getLocalePrimaryDialects(locale);
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  return genPageMetadata(obj) 
}
export default async function SettingsPage({ params: { locale } }: { params: { locale: string } }) {

  const user = await getCurrentUser();
  if (!user) redirect("/login")
  if (user.role == 'developer') redirect("/dashboard")
    
  unstable_setRequestLocale(locale);
  const t = await getTranslations("BecomeDeveloperPage");

  const data = await getCompanyAndRoleRequestStatus(user.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading={t("title")}
        text={t("desc")}
      />
      <div className="grid gap-10">
        <BecomeDeveloperForm
          user={{ id: user.id, name: user.name || "" }}
          data={data}
        />
      </div>
    </DashboardShell>
  )
}