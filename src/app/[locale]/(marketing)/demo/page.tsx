import { genPageMetadata } from "@/app/seo";
import { IFrame } from "@/components/Iframe";
import { getLocalePrimaryDialects } from "@/data/locales";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "DemoMeta" });
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

export default function DemoPage() {
  return (
    <IFrame src="http://194.150.98.171:5000/public/dashboards/YdhGQ19emHi6AqvwWwETtGgaYhzDVZRLZ8ZEeADN" /> 
  )
}
