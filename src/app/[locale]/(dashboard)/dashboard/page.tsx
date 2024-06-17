import { unstable_setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/utils/session'
import { getTranslations } from 'next-intl/server';
import { getLocalePrimaryDialects } from '@/data/locales';
import { genPageMetadata } from '@/app/seo';
// import { EmptyPlaceholder } from "@/components/empty-placeholder"
// import { DashboardHeader } from "@/components/header"
// import { PostCreateButton } from "@/components/post-create-button"
// import { PostItem } from "@/components/post-item"
// import { DashboardShell } from "@/components/shell"


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

  if (!user) {
    redirect('/login')
  }

  return (
    <main>
      już wkrótce...
    </main>
    // <DashboardShell>
    //   <DashboardHeader heading="Posts" text="Create and manage posts.">
    //     <PostCreateButton />
    //   </DashboardHeader>
    //   <div>
    //     {posts?.length ? (
    //       <div className="divide-y divide-border rounded-md border">
    //         {posts.map((post) => (
    //           <PostItem key={post.id} post={post} />
    //         ))}
    //       </div>
    //     ) : (
    //       <EmptyPlaceholder>
    //         <EmptyPlaceholder.Icon name="post" />
    //         <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
    //         <EmptyPlaceholder.Description>
    //           You don&apos;t have any posts yet. Start creating content.
    //         </EmptyPlaceholder.Description>
    //         <PostCreateButton variant="outline" />
    //       </EmptyPlaceholder>
    //     )}
    //   </div>
    // </DashboardShell>
  )
}
