import { Hero } from '@/components/Hero'
import { WhatIsOmnimes } from '@/components/WhatIsOmnimes';
import { Feature } from '@/components/Feature';
import { HeroImage } from '@/components/HeroImage'
import { unstable_setRequestLocale } from 'next-intl/server';
import { ComponentVideo } from '@/components/ComponentVideo';
import { Time } from '@/components/Time';
import { WhatPeopleSay } from '@/components/WhatPeopleSay';
import { Timeline } from '@/components/Timeline';
import { Performance } from '@/components/Performance';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { LastUpdates } from '@/components/LastUpdates';
import { OstDocument } from "outstatic";
import { load } from "outstatic/server";
import { Skeleton } from '@/components/atoms/Skeleton';
import { Suspense } from 'react';

async function getData(locale: string) {
  const db = await load();
  const allNews = await db
  .find<OstDocument>({ collection: 'news', status: 'published', lang: locale }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
  ])
  .sort({ publishedAt: -1 })
  .limit(3)
  .toArray();

  const allPosts = await db
  .find<OstDocument>({ collection: 'posts', status: 'published', lang: locale }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
  ])
  .sort({ publishedAt: -1 })
  .limit(5)
  .toArray();

  return {
    allNews,
    allPosts
  }
}

export default async function Home(
  {params: { locale }}: 
  {
    params: { locale: string },
}) {
  unstable_setRequestLocale(locale);
  const {allNews, allPosts} = await getData(locale);
  return (
    <>
        <HeroImage />
        <Hero />
        <Suspense fallback={<Skeleton className="h-8 w-full" />}>
          <LastUpdates allNews={allNews} allPosts={allPosts} locale={locale} />
        </Suspense>
        <WhatIsOmnimes />
        <Feature />
        <ComponentVideo />
        <Time />
        <Performance /> 
        <Timeline />
        <WhatPeopleSay />
        {/* <SocialProf />   */}
        {/* <Cooperation /> */}
        <ScrollTopAndComment />
    </>
  )
}

