import { genPageMetadata } from '@/app/seo';
import { UsersTable } from '@/components/UsersTable';
import { Search } from '@/components/dashboard/Search';
import { SearchRole } from '@/components/dashboard/SearchRole';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getUsers } from '@/utils/user';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "AdminUsersMeta" });
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

export default async function UsersPage({
  searchParams, params: { locale }
}: {
  searchParams: { q: string; offset: string; r: string };
  params: { locale: string }
}) {
    unstable_setRequestLocale(locale);
  const search = searchParams.q ?? '';
  const searchRole = searchParams.r ?? '';
  const offset =  searchParams.offset != null ? (Number(searchParams.offset) < 0 ? 0 : searchParams.offset) : 0;
  const { users, newOffset, prevOffset } = await getUsers(search, Number(offset), searchRole);
  const t = await getTranslations("AdminUsers")

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">{t("users")}</h1>
      </div>
      <div className="w-full mb-4 flex gap-4">
        <Search value={searchParams.q} />
        <SearchRole value={searchParams.r} />
      </div>
      <UsersTable users={users} offset={newOffset} prevOffset={prevOffset} />
    </main>
  );
}