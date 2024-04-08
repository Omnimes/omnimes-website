import { genPageMetadata } from '@/app/seo'
import { getLocalePrimaryDialects } from '@/data/locales'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/data/logo.svg'
import { UserAuthForm } from '@/components/auth/user-auth-form'
import { LuMoveLeft  } from 'react-icons/lu'
import { useTranslations } from 'next-intl'
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Login' })
  const title = t('title')
  const description = t('desc')
  const keywords = t('keywords')
  const localeShort = getLocalePrimaryDialects(locale)
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  const meta = genPageMetadata(obj)
  return meta
}

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = useTranslations("LoginPage")
  return (
    <div className="h-screen flex w-full flex-col items-center md:justify-center py-16 md:py-0 px-4">
      <Link
        href="/"
        className="hover:bg-accent hover:text-accent-foreground absolute left-4 top-8 md:left-8 flex gap-2 justify-center items-center"
      >
        <LuMoveLeft className="h-4 w-4" />
        {t("back")}
      </Link>
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
          <h1 className="text-2xl font-semibold tracking-tight">{t("welcome")}</h1>
          <p className="text-muted-foreground text-sm">
            {t("info")}
          </p>
        </div>
        <UserAuthForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            {t("link")}
          </Link>
        </p>
      </div>
    </div>
  )
}
