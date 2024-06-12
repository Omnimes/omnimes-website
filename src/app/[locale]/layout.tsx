import { locales } from "../../config";
import { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import { getLocalePrimaryDialects } from "@/data/locales";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { siteMetadata } from "@/data/siteMetadata";
import { Widget } from '@/components/atoms/Widget';
import { useTranslations } from 'next-intl';
import { NextUIProviders } from "@/components/providers/nextui-providers";
import { ThemeProviders } from "@/components/providers/theme-providers";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/components/atoms/Toaster";
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: t(siteMetadata.title),
    description: t(siteMetadata.description),
    keywords: t(siteMetadata.keywords),
    openGraph: {
      title: t(siteMetadata.title),
      description: t(siteMetadata.description),
      url: "./",
      siteName: t(siteMetadata.title),
      images: [siteMetadata.socialBanner],
      locale: locale,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: t(siteMetadata.title),
      card: "summary_large_image",
      images: [siteMetadata.socialBanner],
    },
  };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  const t = useTranslations('Widget');
  return (
    <html
      lang={getLocalePrimaryDialects(locale)}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning>
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="author" content={siteMetadata.author} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <body className="min-h-screen overflow-x-hidden h-full relative">
        <NextUIProviders>
          <NextIntlClientProvider messages={messages}>
            <ThemeProviders>
                <Widget text={t("title")} href={"/contact"} buttonText={t("text")} />
                {/* {navbar} */}
                {/* <Widget text={t("titleHanover")}  href={"https://www.multiprojekt.pl/multiprojekt-wystawca-na-targach-w-hanowerze/"} buttonText={t("textButton")}  /> */}
                {children}   
              <Toaster />
              <Analytics />
              <SpeedInsights />
            </ThemeProviders>
          </NextIntlClientProvider>
        </NextUIProviders>
      </body>
    </html>
  );
}
// test