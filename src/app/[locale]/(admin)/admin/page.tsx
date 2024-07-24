import { getAllRequests } from '@/actions/become-developer';
import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getCurrentUser } from '@/utils/session';
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

  const requests = await getAllRequests();

  return (
    <main>
      // lista zgloszen developerów
      // tabela role requests

      {requests?.map(item => {
        return (
          <div key={item.userId}>
            <p>{item.user.email}</p>
            <p>{item.company?.name}</p>
          </div>
        )
      })}

    </main>
  );
}