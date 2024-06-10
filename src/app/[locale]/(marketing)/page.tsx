import { Hero } from '@/components/Hero'
import { WhatIsOmnimes } from '@/components/WhatIsOmnimes';
import { Feature } from '@/components/Feature';
import { HeroImage } from '@/components/HeroImage'
import { unstable_setRequestLocale } from 'next-intl/server';
import { ComponentVideo } from '@/components/ComponentVideo';
import { Time } from '@/components/Time';
import { Cooperation } from '@/components/Cooperation';
import { SocialProf } from '@/components/SocialProf';
import { WhatPeopleSay } from '@/components/WhatPeopleSay';
import { Timeline } from '@/components/Timeline';
import { Performance } from '@/components/Performance';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';

export default function Home({params: { locale }}: {params: { locale: string }}) {
  unstable_setRequestLocale(locale);

  return (
    <>
        <HeroImage />
        <Hero />
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

