import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image'
import Logo from '@/data/logo.svg'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { LuMoveLeft  } from 'react-icons/lu'
import { UserAuthForm } from '@/components/auth/UserAuthForm'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Register" });
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

export default function RegisterPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("RegisterPage");
  
  return (
    <div className="grid h-screen w-screen flex-col py-16 md:py-0 md:items-center justify-center lg:max-w-none lg:grid-cols-2 px-4 lg:px-0">
      <Link
        href="/"
        className="z-[2] text-white md:text-dark dark:md:text-dark hover:bg-accent hover:text-accent-foreground absolute left-4 top-8 md:left-8 flex gap-2 justify-center items-center"
      >
        <LuMoveLeft className="h-4 w-4" />
        {t("back")}
      </Link>
      <div className="h-full overflow-hidden bg-slate-100 dark:bg-zinc-950 lg:block relative shadow-xl rounded-none">
        <video aria-label='video Omnimes'  className="absolute min-h-full min-w-full object-cover rounded-none" src="/videos/register.mp4" autoPlay muted loop />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center items-center">
            <Image
              src={Logo.src}
              alt={'OmniMES logo'}
              width={44}
              height={36}
              priority
              className="mr-2"
              style={{ width: '44px', height: 'auto' }}
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("create")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("info")}
            </p>
          </div>
          <UserAuthForm location={"register"} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t("info2")}{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              {t("info3")}
            </Link>{" "}
            {t("info4")}{" "}
            <Link
              href="/privacy-policy"
              className="hover:text-brand underline underline-offset-4"
            >
              {t("info5")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}