import { getUserCount, getUsers } from '@/actions/user';
import { genPageMetadata } from '@/app/seo';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Search } from '@/components/dashboard/Search';
import { SearchRole } from '@/components/dashboard/SearchRole';
import { getLocalePrimaryDialects } from '@/data/locales';
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
  const offset = searchParams.offset != null ? (Number(searchParams.offset) < 0 ? 0 : searchParams.offset) : 0;
  const { users, newOffset, prevOffset } = await getUsers(search, Number(offset), searchRole);
  const totalUsers = await getUserCount();
  const t = await getTranslations("AdminUsers")

  return (
    <section className="flex flex-1 flex-col md:p-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle>{t("users")}</CardTitle>
          <CardDescription>{t('descUsers')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full mb-4 flex gap-4">
            <Search value={searchParams.q} />
            <SearchRole value={searchParams.r} />
          </div>
          <UsersTable users={users} offset={newOffset} prevOffset={prevOffset} totalUsers={totalUsers} />
        </CardContent>
      </Card>
    </section>
  );
}