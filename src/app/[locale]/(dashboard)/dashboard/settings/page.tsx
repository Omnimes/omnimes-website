import { redirect } from "next/navigation"
import { getCurrentUser } from "@/utils/session"
import { DashboardShell } from "@/components/dashboard/Shell"
import { DashboardHeader } from "@/components/dashboard/Header"
import { UserNameForm } from "@/components/settings/UserNameForm"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { getLocalePrimaryDialects } from "@/data/locales"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "SettingsPage" });
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
  const meta = genPageMetadata(obj)
  return meta
}
export default async function SettingsPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const user = await getCurrentUser();
  const t = await getTranslations("SettingsPage");

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={t("title")}
        text={t("desc")}
      />
      
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  )
}