import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getLocalePrimaryDialects } from '@/data/locales';
import { genPageMetadata } from '@/app/seo';
import { getCompanyUser, GetIsAdminCompany, getRequestsForAdmin } from '@/actions/company';
import { getCurrentUser } from '@/utils/session';
import { redirect } from 'next/navigation';
import { ComponentRequests } from '@/components/dashboard/requsets/ComponentRequests';
import { ComponentCompany } from '@/components/dashboard/company/ComponentCompany';
import { cn } from '@/utils/utils';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "DashboardPanelMeta" });
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

export default async function DashboardPage({params: { locale }}: {params: { locale: string }}) {
  unstable_setRequestLocale(locale);
  const user = await getCurrentUser();
  if (!user) redirect("/login")
  const {status, data} = await getCompanyUser(user.id);
  const isAdminCompany = await GetIsAdminCompany(user.id);

  if(!isAdminCompany.isAdmin) {
    return (
      <div className={"grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}>
        <ComponentCompany    
          status={status}
          data={data}
        />
      </div>
    )
  }

  const CompanyRequset = async() => {
    if(isAdminCompany.user?.adminCompanyId) {
      const requests = await getRequestsForAdmin(isAdminCompany.user?.adminCompanyId);
      return <ComponentRequests requests={requests} />
    }
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-[1fr_250px] xl:grid-cols-3 xl:gap-8")}>
      <div className="md:grid auto-rows-max items-start gap-4 xl:col-span-2 xl:gap-8">
        <CompanyRequset />
      </div>
      <div className="md:grid auto-rows-max items-start gap-4 xl:gap-8">
        <ComponentCompany    
          status={status}
          data={data}  
        />
      </div>
    </div>
  )
}
