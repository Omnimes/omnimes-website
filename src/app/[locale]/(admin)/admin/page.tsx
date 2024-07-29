import { getAllRequests, RoleRequest } from '@/actions/become-developer';
import { genPageMetadata } from '@/app/seo';
import { DeveloperTable } from '@/components/dashboard/requsets/DeveloperTable';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getCurrentUser } from '@/utils/session';
import { cn } from '@/utils/utils';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
//   const t = await getTranslations({ locale, namespace: "Admin" });
//   const title = t('title');
//   const description = t('desc');
//   const keywords = t('keywords');
//   const localeShort = getLocalePrimaryDialects(locale);
//   const obj = {
//     title,
//     description,
//     keywords,
//     localeShort,
//   }
//   const meta = genPageMetadata(obj)
//   return meta
// }

export default async function AdminPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const requests = await getAllRequests() as RoleRequest[];

  return (
    <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-[1fr_250px] xl:grid-cols-3 xl:gap-8")}>
      <div className="md:grid auto-rows-max items-start gap-4 xl:col-span-2 xl:gap-8">
        <DeveloperTable requests={requests} />
      </div>
    </div>
  );
}